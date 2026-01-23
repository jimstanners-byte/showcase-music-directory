'use client';

import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Play, RefreshCw, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { RegionAssignmentSection } from "@/components/admin/RegionAssignmentSection";

interface GeocodingStats {
  total: number;
  geocoded: number;
  failed: number;
  manual: number;
  remaining: number;
}

interface BatchResult {
  processed: number;
  failed: number;
  regionsAssigned: number;
  duration?: number;
}

export default function AdminGeocoding() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [autoRun, setAutoRun] = useState(false);
  const [lastResult, setLastResult] = useState<BatchResult | null>(null);

  // Fetch current stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["geocoding-stats"],
    queryFn: async (): Promise<GeocodingStats> => {
      const [totalRes, geocodedRes, failedRes, manualRes, remainingRes] = await Promise.all([
        supabase
          .from("listings")
          .select("*", { count: "exact", head: true })
          .eq("is_active", true),
        // Geocoded: geocoded_at IS NOT NULL AND latitude IS NOT NULL
        supabase
          .from("listings")
          .select("*", { count: "exact", head: true })
          .eq("is_active", true)
          .not("geocoded_at", "is", null)
          .not("latitude", "is", null),
        // Failed: geocoded_at IS NOT NULL AND latitude IS NULL
        supabase
          .from("listings")
          .select("*", { count: "exact", head: true })
          .eq("is_active", true)
          .not("geocoded_at", "is", null)
          .is("latitude", null),
        supabase
          .from("listings")
          .select("*", { count: "exact", head: true })
          .eq("is_active", true)
          .eq("coordinates_manual", true),
        // Remaining: geocoded_at IS NULL
        supabase
          .from("listings")
          .select("*", { count: "exact", head: true })
          .eq("is_active", true)
          .is("geocoded_at", null)
          .or("coordinates_manual.is.null,coordinates_manual.eq.false"),
      ]);

      return {
        total: totalRes.count || 0,
        geocoded: geocodedRes.count || 0,
        failed: failedRes.count || 0,
        manual: manualRes.count || 0,
        remaining: remainingRes.count || 0,
      };
    },
  });

  // Retry failed listings mutation
  const retryFailedMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("listings")
        .update({ geocoded_at: null })
        .is("latitude", null)
        .not("geocoded_at", "is", null)
        .eq("is_active", true);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["geocoding-stats"] });
      toast({
        title: "Failed listings reset",
        description: "Failed listings can now be re-attempted.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Reset failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Run geocoding batch
  const geocodeMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("geocode-listings");
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      setLastResult({ 
        processed: data.processed, 
        failed: data.failed,
        regionsAssigned: data.regionsAssigned || 0,
        duration: data.duration
      });
      queryClient.invalidateQueries({ queryKey: ["geocoding-stats"] });
      
      if (data.processed > 0) {
        const durationText = data.duration ? ` in ${data.duration}s` : '';
        toast({
          title: "Geocoding batch complete",
          description: `Processed ${data.processed} listings${durationText}. ${data.remaining} remaining.`,
        });
      } else if (data.remaining === 0) {
        setAutoRun(false);
        toast({
          title: "All listings geocoded",
          description: "No more listings to process.",
        });
      } else {
        toast({
          title: "Batch complete",
          description: `${data.failed} listings could not be geocoded. ${data.remaining} remaining.`,
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      setAutoRun(false);
      toast({
        title: "Geocoding failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Auto-run effect - reduced delay since Google Maps is faster
  useEffect(() => {
    if (autoRun && !geocodeMutation.isPending && stats?.remaining && stats.remaining > 0) {
      const timer = setTimeout(() => {
        geocodeMutation.mutate();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [autoRun, geocodeMutation.isPending, stats?.remaining]);

  const progressPercentage = stats
    ? Math.round(((stats.geocoded) / stats.total) * 100) || 0
    : 0;

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <MapPin className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Geocoding</h1>
          <p className="text-muted-foreground">
            Convert listing addresses to map coordinates using Google Maps API
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Geocoding Progress
            </CardTitle>
            <CardDescription>
              Track how many listings have been geocoded
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {statsLoading ? (
              <div className="h-20 bg-muted animate-pulse rounded" />
            ) : (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">
                      {stats?.geocoded} of {stats?.total} listings
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <p className="text-xs text-muted-foreground text-right">
                    {progressPercentage}% complete
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {stats?.geocoded}
                    </p>
                    <p className="text-xs text-muted-foreground">Geocoded</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">
                      {stats?.failed}
                    </p>
                    <p className="text-xs text-muted-foreground">Failed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {stats?.manual}
                    </p>
                    <p className="text-xs text-muted-foreground">Manual</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">
                      {stats?.remaining}
                    </p>
                    <p className="text-xs text-muted-foreground">Remaining</p>
                  </div>
                </div>

                {(stats?.failed ?? 0) > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4"
                    onClick={() => retryFailedMutation.mutate()}
                    disabled={retryFailedMutation.isPending}
                  >
                    {retryFailedMutation.isPending ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Resetting...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Retry Failed ({stats?.failed})
                      </>
                    )}
                  </Button>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Run Geocoding Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-primary" />
              Run Geocoding Batch
            </CardTitle>
            <CardDescription>
              Process up to 100 listings per batch with parallel requests.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg">
              <Clock className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-green-700 dark:text-green-400">Fast Processing</p>
                <p className="text-green-600 dark:text-green-500">
                  Uses Google Maps Geocoding API with 10 parallel requests.
                  Each batch of 100 completes in ~10 seconds.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg mb-4">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                <span className="text-sm font-medium">Auto-continue until complete</span>
              </div>
              <Switch checked={autoRun} onCheckedChange={setAutoRun} />
            </div>

            <Button
              onClick={() => geocodeMutation.mutate()}
              disabled={geocodeMutation.isPending || stats?.remaining === 0 || autoRun}
              className="w-full"
              size="lg"
            >
              {autoRun ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Running automatically...
                </>
              ) : geocodeMutation.isPending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Processing batch...
                </>
              ) : stats?.remaining === 0 ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  All listings geocoded
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run Geocoding Batch ({stats?.remaining} remaining)
                </>
              )}
            </Button>

            {lastResult && (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                {lastResult.processed > 0 ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                )}
                <div className="text-sm flex-1">
                  <div className="flex items-center justify-between">
                    <p>
                      <span className="font-medium text-green-600">
                        {lastResult.processed} geocoded
                      </span>
                      {lastResult.regionsAssigned > 0 && (
                        <span className="text-blue-600 ml-2">
                          • {lastResult.regionsAssigned} regions
                        </span>
                      )}
                      {lastResult.failed > 0 && (
                        <span className="text-orange-600 ml-2">
                          • {lastResult.failed} failed
                        </span>
                      )}
                    </p>
                    {lastResult.duration && (
                      <span className="text-xs text-muted-foreground">
                        {lastResult.duration}s
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How it works</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground">
          <ul className="space-y-2">
            <li>
              <strong>Automatic geocoding:</strong> Converts address, town/city, county, and country to
              latitude/longitude coordinates using Google Maps Geocoding API.
            </li>
            <li>
              <strong>Parallel processing:</strong> Processes 10 requests concurrently for fast batch completion.
              Each batch of 100 listings completes in approximately 10 seconds.
            </li>
            <li>
              <strong>Manual override:</strong> Listings with manually entered coordinates
              (set in the listing edit form) are skipped.
            </li>
            <li>
              <strong>Retry logic:</strong> Failed requests are automatically retried up to 2 times
              with exponential backoff.
            </li>
            <li>
              <strong>Failed lookups:</strong> Listings with incomplete addresses or
              unrecognized locations are marked as attempted but won't show on maps.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Region Assignment Section */}
      <div className="mt-8 pt-8 border-t">
        <RegionAssignmentSection />
      </div>
    </div>
  );
}
