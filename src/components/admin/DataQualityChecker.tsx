'use client';

import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, AlertCircle, CheckCircle, MapPin, Building2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DataIssue {
  id: string;
  name: string;
  town_city: string | null;
  country: string | null;
  region_id: number | null;
  region_name: string | null;
  latitude: number | null;
  longitude: number | null;
  venue_type: string | null;
  tier: string;
}

interface IssueCategory {
  title: string;
  description: string;
  issues: DataIssue[];
  severity: "high" | "medium" | "low";
}

export default function DataQualityChecker() {
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<IssueCategory[]>([]);
  const [error, setError] = useState<string | null>(null);

  const runQualityCheck = async () => {
    setIsChecking(true);
    setError(null);
    setResults([]);

    try {
      // 1. Listings with city but no region
      const { data: noRegion, error: noRegionError } = await supabase
        .from("listings")
        .select("id, name, town_city, country, region_id, latitude, longitude, venue_type, tier")
        .not("town_city", "is", null)
        .is("region_id", null)
        .in("country", ["United Kingdom", "United States", "UK", "USA"]);

      if (noRegionError) throw noRegionError;

      // 2. Listings missing coordinates
      const { data: noCoords, error: noCoordsError } = await supabase
        .from("listings")
        .select("id, name, town_city, country, region_id, latitude, longitude, venue_type, tier")
        .not("town_city", "is", null)
        .or("latitude.is.null,longitude.is.null");

      if (noCoordsError) throw noCoordsError;

      // 3. Get all cities with listing counts
      const { data: allListings, error: allListingsError } = await supabase
        .from("listings")
        .select("id, name, town_city, country, region_id, latitude, longitude, venue_type, tier")
        .not("town_city", "is", null);

      if (allListingsError) throw allListingsError;

      // Count listings per city
      const cityCount = new Map<string, { count: number; listings: DataIssue[] }>();
      allListings?.forEach((listing) => {
        const key = `${listing.town_city}|${listing.country}`;
        const existing = cityCount.get(key) || { count: 0, listings: [] };
        existing.count++;
        existing.listings.push(listing as DataIssue);
        cityCount.set(key, existing);
      });

      // Filter to cities with only 1 listing (orphaned cities)
      const orphanedCities: DataIssue[] = [];
      cityCount.forEach((value, key) => {
        if (value.count === 1) {
          orphanedCities.push(value.listings[0]);
        }
      });

      // 4. Get regions to check for listings with regions
      const { data: regions, error: regionsError } = await supabase.from("regions").select("id, region_name");

      if (regionsError) throw regionsError;

      // Add region names to results
      const regionMap = new Map(regions?.map((r) => [r.id, r.region_name]) || []);

      const enrichResults = (items: any[]): DataIssue[] => {
        return items.map((item) => ({
          ...item,
          region_name: item.region_id ? regionMap.get(item.region_id) || null : null,
        }));
      };

      // Build results
      const issueCategories: IssueCategory[] = [
        {
          title: "Listings with City but No Region (UK/USA only)",
          description: "These UK/USA listings have a city but no region assigned. Other countries don't use regions.",
          issues: enrichResults(noRegion || []),
          severity: "high",
        },
        {
          title: "Listings Missing Coordinates",
          description:
            "These listings are missing latitude/longitude. Coordinates are needed for maps and proximity search.",
          issues: enrichResults(noCoords || []),
          severity: "high",
        },
        {
          title: "Orphaned Cities (Only 1 Listing)",
          description: "Cities that only have 1 listing. Might be typos or need verification.",
          issues: enrichResults(orphanedCities),
          severity: "medium",
        },
      ];

      setResults(issueCategories);
    } catch (err) {
      console.error("Error checking data quality:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setIsChecking(false);
    }
  };

  const exportToCSV = (category: IssueCategory) => {
    const headers = ["ID", "Name", "City", "Country", "Region", "Latitude", "Longitude", "Type", "Tier"];
    const rows = category.issues.map((issue) => [
      issue.id,
      issue.name,
      issue.town_city || "",
      issue.country || "",
      issue.region_name || "",
      issue.latitude || "",
      issue.longitude || "",
      issue.venue_type || "listing",
      issue.tier,
    ]);

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${category.title.replace(/\s+/g, "_")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSeverityColor = (severity: "high" | "medium" | "low") => {
    switch (severity) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-blue-500";
    }
  };

  const getSeverityIcon = (severity: "high" | "medium" | "low") => {
    switch (severity) {
      case "high":
        return <AlertCircle className="h-5 w-5" />;
      case "medium":
        return <AlertCircle className="h-5 w-5" />;
      case "low":
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Data Quality Checker</h1>
        <p className="text-muted-foreground">
          Find and review listings with city/region data issues, missing coordinates, and potential duplicates.
        </p>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">Run Quality Check</h2>
            <p className="text-sm text-muted-foreground">This will scan all listings for common data quality issues.</p>
          </div>
          <Button onClick={runQualityCheck} disabled={isChecking}>
            {isChecking && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {isChecking ? "Checking..." : "Run Check"}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Card>

      {results.length > 0 && (
        <div className="space-y-6">
          {/* Summary */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {results.map((category, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-lg border">
                  <div className={getSeverityColor(category.severity)}>{getSeverityIcon(category.severity)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-2xl font-bold">{category.issues.length}</div>
                    <div className="text-sm text-muted-foreground truncate">{category.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Detailed Results */}
          {results.map((category, idx) => (
            <Card key={idx} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={getSeverityColor(category.severity)}>{getSeverityIcon(category.severity)}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{category.issues.length} issues</span>
                  <Button size="sm" variant="outline" onClick={() => exportToCSV(category)}>
                    Export CSV
                  </Button>
                </div>
              </div>

              {category.issues.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>No issues found in this category</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {category.issues.slice(0, 20).map((issue) => (
                    <div
                      key={issue.id}
                      className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      {issue.venue_type ? (
                        <MapPin className="h-4 w-4 text-primary shrink-0 mt-1" />
                      ) : (
                        <Building2 className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{issue.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {issue.town_city && <span>{issue.town_city}</span>}
                          {issue.country && <span>, {issue.country}</span>}
                          {issue.region_name && <span> ({issue.region_name})</span>}
                        </div>
                        {!issue.latitude && !issue.longitude && (
                          <div className="text-xs text-red-500 mt-1">Missing coordinates</div>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground shrink-0">
                        {issue.tier} {issue.venue_type ? "venue" : "listing"}
                      </div>
                    </div>
                  ))}
                  {category.issues.length > 20 && (
                    <div className="text-center py-2 text-sm text-muted-foreground">
                      Showing 20 of {category.issues.length} issues. Export CSV to see all.
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {!isChecking && results.length === 0 && (
        <Card className="p-12 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Click "Run Check" to scan for data quality issues</p>
        </Card>
      )}
    </div>
  );
}
