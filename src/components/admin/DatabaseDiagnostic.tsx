'use client';

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/supabasePagination";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, XCircle, RefreshCw, AlertTriangle } from "lucide-react";
import { getContinent } from "@/lib/continents";
import { useToast } from "@/hooks/use-toast";

/**
 * Enhanced Database Diagnostic & Fix Tool
 *
 * Checks ALL listings across ALL categories for continent field issues
 * Provides one-click fix to populate missing continent fields
 */
export default function EnhancedDatabaseDiagnostic() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [fixingData, setFixingData] = useState(false);

  // Check all listings (not filtered by category or venue)
  const { data: allListings, isLoading: loadingAll } = useQuery({
    queryKey: ["diagnostic-all-listings"],
    queryFn: async () => {
      const data = await fetchAllRows<{ id: string; country: string | null; continent: string | null }>(() =>
        supabase.from("listings_public").select("id, country, continent").not("country", "is", null),
      );

      if (!data) return { total: 0, withContinent: 0, withoutContinent: 0, byCountry: [] };

      const total = data.length;
      const withContinent = data.filter((l) => l.continent).length;
      const withoutContinent = data.filter((l) => !l.continent).length;

      // Group by country
      const countryMap = new Map<
        string,
        { country: string; continent: string | null; hasContinent: number; missingContinent: number }
      >();

      data.forEach((item) => {
        if (item.country) {
          const existing = countryMap.get(item.country);
          if (existing) {
            if (item.continent) {
              existing.hasContinent++;
            } else {
              existing.missingContinent++;
            }
          } else {
            countryMap.set(item.country, {
              country: item.country,
              continent: item.continent,
              hasContinent: item.continent ? 1 : 0,
              missingContinent: item.continent ? 0 : 1,
            });
          }
        }
      });

      const byCountry = Array.from(countryMap.values()).sort(
        (a, b) => b.missingContinent - a.missingContinent || a.country.localeCompare(b.country),
      );

      return { total, withContinent, withoutContinent, byCountry };
    },
  });

  // Check all categories
  const { data: categoriesData, isLoading: loadingCategories } = useQuery({
    queryKey: ["diagnostic-all-categories"],
    queryFn: async () => {
      // Get all categories
      const { data: categories } = await supabase.from("categories").select("id, name, slug").order("name");

      if (!categories) return [];

      const results = [];

      for (const category of categories) {
        // Get listing IDs for this category
        const { data: listingIds } = await supabase
          .from("listing_categories")
          .select("listing_id")
          .eq("category_id", category.id);

        if (!listingIds || listingIds.length === 0) {
          results.push({
            ...category,
            totalListings: 0,
            withContinent: 0,
            withoutContinent: 0,
            countries: [],
          });
          continue;
        }

        const ids = listingIds.map((l) => l.listing_id);

        // Get listings with country/continent info
        const { data: listings } = await supabase
          .from("listings_public")
          .select("country, continent")
          .in("id", ids)
          .not("country", "is", null);

        const totalListings = listings?.length || 0;
        const withContinent = listings?.filter((l) => l.continent).length || 0;
        const withoutContinent = totalListings - withContinent;

        // Get unique countries
        const countries = [...new Set(listings?.map((l) => l.country).filter(Boolean))] as string[];

        results.push({
          ...category,
          totalListings,
          withContinent,
          withoutContinent,
          countries: countries.sort(),
        });
      }

      return results.sort((a, b) => b.withoutContinent - a.withoutContinent);
    },
  });

  // Fix continent fields mutation
  const fixContinentsMutation = useMutation({
    mutationFn: async () => {
      setFixingData(true);

      // Get all listings without continent using fetchAllRows
      const listingsToFix = await fetchAllRows<{ id: string; country: string | null }>(() =>
        supabase
          .from("listings")
          .select("id, country")
          .not("country", "is", null)
          .or("continent.is.null,continent.eq."),
      );

      if (!listingsToFix || listingsToFix.length === 0) {
        return { fixed: 0, failed: 0 };
      }

      let fixed = 0;
      let failed = 0;

      // Update in batches of 100
      const batchSize = 100;
      for (let i = 0; i < listingsToFix.length; i += batchSize) {
        const batch = listingsToFix.slice(i, i + batchSize);

        // Update each listing individually with its continent
        for (const listing of batch) {
          const continent = getContinent(listing.country || "");

          if (continent) {
            const { error } = await supabase.from("listings").update({ continent }).eq("id", listing.id);

            if (error) {
              console.error("Update error for listing:", listing.id, error);
              failed++;
            } else {
              fixed++;
            }
          } else {
            // Couldn't determine continent
            failed++;
          }
        }
      }

      return { fixed, failed };
    },
    onSuccess: (result) => {
      setFixingData(false);
      toast({
        title: "Continent Fields Updated",
        description: `Successfully updated ${result.fixed} listings. ${result.failed > 0 ? `${result.failed} could not be updated (unknown country mapping).` : ""}`,
      });
      // Refresh all queries
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      setFixingData(false);
      toast({
        title: "Error",
        description: "Failed to update continent fields. Check console for details.",
        variant: "destructive",
      });
      console.error("Fix error:", error);
    },
  });

  const needsFix = allListings && allListings.withoutContinent > 0;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Complete Database Diagnostic & Fix</h1>
        <p className="text-muted-foreground">
          Comprehensive check of continent field population across all listings and categories
        </p>
      </div>

      {/* Overall Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Database Status</CardTitle>
          <CardDescription>All listings across the entire site</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingAll ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : allListings ? (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border rounded">
                  <div className="text-2xl font-bold">{allListings.total.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Listings</div>
                </div>
                <div className="p-4 border rounded border-green-200 bg-green-50">
                  <div className="text-2xl font-bold text-green-600">{allListings.withContinent.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">With Continent</div>
                </div>
                <div className="p-4 border rounded border-red-200 bg-red-50">
                  <div className="text-2xl font-bold text-red-600">{allListings.withoutContinent.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Missing Continent</div>
                </div>
              </div>

              {needsFix && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Action Required</AlertTitle>
                  <AlertDescription>
                    <div className="space-y-2">
                      <p>
                        {allListings.withoutContinent.toLocaleString()} listings are missing the continent field. This
                        prevents them from appearing in continent-based filters.
                      </p>
                      <Button onClick={() => fixContinentsMutation.mutate()} disabled={fixingData} className="mt-2">
                        {fixingData ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Fixing...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Fix All Continent Fields
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        This will automatically populate the continent field based on country names using the mapping in
                        continents.ts
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {!needsFix && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-600">All Good!</AlertTitle>
                  <AlertDescription>All listings have the continent field populated correctly.</AlertDescription>
                </Alert>
              )}
            </div>
          ) : null}
        </CardContent>
      </Card>

      {/* Countries with Missing Continents */}
      {allListings && allListings.byCountry.filter((c) => c.missingContinent > 0).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Countries with Missing Continent Data</CardTitle>
            <CardDescription>
              {allListings.byCountry.filter((c) => c.missingContinent > 0).length} countries have listings without
              continent field
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {allListings.byCountry
                .filter((c) => c.missingContinent > 0)
                .map((item) => {
                  const expectedContinent = getContinent(item.country);
                  return (
                    <div key={item.country} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{item.country}</span>
                        {expectedContinent ? (
                          <Badge variant="outline">{expectedContinent}</Badge>
                        ) : (
                          <Badge variant="destructive">Unknown Mapping</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-green-600">{item.hasContinent} with continent</span>
                        <span className="text-red-600 font-medium">{item.missingContinent} missing</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Categories Breakdown</CardTitle>
          <CardDescription>
            {loadingCategories ? "Loading..." : `${categoriesData?.length || 0} categories analyzed`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingCategories ? (
            <p className="text-muted-foreground">Analyzing all categories...</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {categoriesData?.map((cat) => (
                <div key={cat.id} className="p-3 border rounded">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-medium">{cat.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">/{cat.slug}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{cat.totalListings} total</Badge>
                      {cat.withoutContinent > 0 ? (
                        <Badge variant="destructive">{cat.withoutContinent} missing</Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Complete
                        </Badge>
                      )}
                    </div>
                  </div>
                  {cat.countries.length > 0 && (
                    <div className="text-xs text-muted-foreground">Countries: {cat.countries.join(", ")}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Unknown Country Mappings - Always show prominently */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Unknown Country Mappings</CardTitle>
          <CardDescription>Countries in database but not in continents.ts mapping</CardDescription>
        </CardHeader>
        <CardContent>
          {allListings ? (
            (() => {
              const unknownCountries = allListings.byCountry.filter((c) => !getContinent(c.country));
              if (unknownCountries.length === 0) {
                return (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-600">
                      All countries in the database have continent mappings in continents.ts
                    </AlertDescription>
                  </Alert>
                );
              }
              return (
                <div className="space-y-4">
                  <Alert className="border-orange-200 bg-orange-50">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <AlertTitle className="text-orange-600">Action Required</AlertTitle>
                    <AlertDescription>
                      <strong>{unknownCountries.length} countries</strong> need to be added to continents.ts
                    </AlertDescription>
                  </Alert>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Countries to Add:</h4>
                    {unknownCountries.map((c) => (
                      <div key={c.country} className="p-4 border-2 border-orange-300 rounded bg-orange-50">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-orange-800">{c.country}</span>
                          <Badge variant="outline" className="text-base">
                            {c.hasContinent + c.missingContinent} listings
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          This country needs to be added to the appropriate continent array in continents.ts
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()
          ) : (
            <p className="text-muted-foreground">Loading...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
