'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// =============================================================================
// SECURITY NOTE: Query functions use listings_public view (no contact data)
// Mutation functions use base listings table (admin access via RLS)
// =============================================================================

export interface Region {
  id: number;
  country: string;
  region_name: string;
  region_slug: string;
}

export interface UnmatchedListing {
  id: string;
  name: string;
  town_city: string | null;
  country: string | null;
}

export interface RegionStats {
  ukNeedRegion: number;
  usaNeedRegion: number;
  total: number;
  ukWithRegion: number;
  usaWithRegion: number;
  ukTotal: number;
  usaTotal: number;
  ukUnmatched: number;
  usaUnmatched: number;
  totalUnmatched: number;
}

export function useRegionStats() {
  return useQuery({
    queryKey: ["region-stats"],
    queryFn: async (): Promise<RegionStats> => {
      // Use full country names as stored in listings table
      const ukCountry = "United Kingdom";
      const usaCountry = "United States";

      // First get the Unmatched region IDs
      const { data: unmatchedRegions } = await supabase
        .from("regions")
        .select("id, country")
        .eq("region_name", "Unmatched");

      const ukUnmatchedRegionId = unmatchedRegions?.find(r => r.country === "UK")?.id;
      const usaUnmatchedRegionId = unmatchedRegions?.find(r => r.country === "USA")?.id;

      // Use listings_public view for all count queries
      const queries = [
        supabase
          .from("listings_public")
          .select("*", { count: "exact", head: true })
          .is("region_id", null)
          .eq("country", ukCountry),
        supabase
          .from("listings_public")
          .select("*", { count: "exact", head: true })
          .is("region_id", null)
          .eq("country", usaCountry),
        supabase
          .from("listings_public")
          .select("*", { count: "exact", head: true })
          .not("region_id", "is", null)
          .eq("country", ukCountry),
        supabase
          .from("listings_public")
          .select("*", { count: "exact", head: true })
          .not("region_id", "is", null)
          .eq("country", usaCountry),
        supabase
          .from("listings_public")
          .select("*", { count: "exact", head: true })
          .eq("country", ukCountry),
        supabase
          .from("listings_public")
          .select("*", { count: "exact", head: true })
          .eq("country", usaCountry),
      ];

      // Add unmatched count queries if regions exist
      if (ukUnmatchedRegionId) {
        queries.push(
          supabase
            .from("listings_public")
            .select("*", { count: "exact", head: true })
            .eq("region_id", ukUnmatchedRegionId)
            .eq("country", ukCountry)
        );
      }
      if (usaUnmatchedRegionId) {
        queries.push(
          supabase
            .from("listings_public")
            .select("*", { count: "exact", head: true })
            .eq("region_id", usaUnmatchedRegionId)
            .eq("country", usaCountry)
        );
      }

      const results = await Promise.all(queries);

      const ukNeedRes = results[0];
      const usaNeedRes = results[1];
      const ukWithRes = results[2];
      const usaWithRes = results[3];
      const ukTotalRes = results[4];
      const usaTotalRes = results[5];
      const ukUnmatchedRes = ukUnmatchedRegionId ? results[6] : { count: 0 };
      const usaUnmatchedRes = usaUnmatchedRegionId ? results[ukUnmatchedRegionId ? 7 : 6] : { count: 0 };

      const ukUnmatched = ukUnmatchedRes?.count || 0;
      const usaUnmatched = usaUnmatchedRes?.count || 0;

      return {
        ukNeedRegion: ukNeedRes.count || 0,
        usaNeedRegion: usaNeedRes.count || 0,
        total: (ukNeedRes.count || 0) + (usaNeedRes.count || 0),
        ukWithRegion: ukWithRes.count || 0,
        usaWithRegion: usaWithRes.count || 0,
        ukTotal: ukTotalRes.count || 0,
        usaTotal: usaTotalRes.count || 0,
        ukUnmatched,
        usaUnmatched,
        totalUnmatched: ukUnmatched + usaUnmatched,
      };
    },
  });
}

// Normalize country names to match regions table format (UK, USA instead of full names)
function normalizeCountryForRegions(country: string): string {
  if (country === "United States" || country === "US") {
    return "USA";
  }
  if (country === "United Kingdom") {
    return "UK";
  }
  return country;
}

export function useRegions(country: string | null, initialData?: any[]) {
  return useQuery({
    queryKey: ["regions", country],
    queryFn: async () => {
      if (!country) return [];
      const regionCountry = normalizeCountryForRegions(country);
      const { data, error } = await supabase
        .from("regions")
        .select("*")
        .eq("country", regionCountry)
        .order("region_name");
      if (error) throw error;
      return data as Region[];
    },
    enabled: !!country,
    initialData,
  });
}

export function useAllRegions() {
  return useQuery({
    queryKey: ["all-regions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("regions")
        .select("*")
        .order("country")
        .order("region_name");
      if (error) throw error;
      return data as Region[];
    },
  });
}

export function useUnmatchedListings(page: number, pageSize: number = 25) {
  return useQuery({
    queryKey: ["unmatched-listings", page, pageSize],
    queryFn: async () => {
      // First get the Unmatched region IDs
      const { data: unmatchedRegions } = await supabase
        .from("regions")
        .select("id, country")
        .eq("region_name", "Unmatched");

      const ukUnmatchedRegionId = unmatchedRegions?.find(r => r.country === "UK")?.id;
      const usaUnmatchedRegionId = unmatchedRegions?.find(r => r.country === "USA")?.id;

      const unmatchedRegionIds = [ukUnmatchedRegionId, usaUnmatchedRegionId].filter(Boolean) as number[];

      if (unmatchedRegionIds.length === 0) {
        return { listings: [], total: 0 };
      }

      const from = page * pageSize;
      const to = from + pageSize - 1;

      // Use listings_public view
      const { data, error, count } = await supabase
        .from("listings_public")
        .select("id, name, town_city, country, region_id", { count: "exact" })
        .in("region_id", unmatchedRegionIds)
        .order("name")
        .range(from, to);

      if (error) throw error;
      return { listings: data as (UnmatchedListing & { region_id: number })[], total: count || 0 };
    },
  });
}

export function useBackfillRegions() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("backfill-regions");
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["region-stats"] });
      queryClient.invalidateQueries({ queryKey: ["unmatched-listings"] });

      if (data.assigned > 0) {
        toast({
          title: "Region backfill complete",
          description: `Assigned ${data.assigned} regions. ${data.unmatched} unmatched. ${data.remaining} remaining.`,
        });
      } else if (data.remaining === 0) {
        toast({
          title: "All regions assigned",
          description: "No more listings to process.",
        });
      } else {
        toast({
          title: "Backfill complete",
          description: `${data.unmatched} listings could not be matched. ${data.remaining} remaining.`,
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Backfill failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// ADMIN MUTATION - uses base listings table (admin has RLS access)
export function useAssignRegion() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      listingId,
      regionId,
      addToLookup,
      townCity,
      regionName,
      country,
    }: {
      listingId: string;
      regionId: number;
      addToLookup: boolean;
      townCity: string | null;
      regionName: string;
      country: string;
    }) => {
      // Update the listing (admin RLS policy allows this)
      const { error: updateError } = await supabase
        .from("listings")
        .update({ region_id: regionId })
        .eq("id", listingId);

      if (updateError) throw updateError;

      // Add to lookup table if requested (town only, no county column)
      if (addToLookup && country === "UK" && townCity) {
        const normalizedTown = townCity.toLowerCase().trim();
        await supabase
          .from("uk_town_region_lookup")
          .upsert({ town: normalizedTown, region_name: regionName }, { onConflict: "town" });
      }

      return { listingId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["region-stats"] });
      queryClient.invalidateQueries({ queryKey: ["unmatched-listings"] });
      toast({
        title: "Region assigned",
        description: "Listing region updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Assignment failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// ADMIN MUTATION - uses base listings table (admin has RLS access)
export function useBulkAssignRegions() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      listingIds,
      regionId,
      addToLookup,
      listings,
      regionName,
    }: {
      listingIds: string[];
      regionId: number;
      addToLookup: boolean;
      listings: UnmatchedListing[];
      regionName: string;
    }) => {
      // Update all listings (admin RLS policy allows this)
      const { error: updateError } = await supabase
        .from("listings")
        .update({ region_id: regionId })
        .in("id", listingIds);

      if (updateError) throw updateError;

      // Add to lookup tables if requested (town only, no county column)
      if (addToLookup) {
        for (const listing of listings) {
          if (listing.country === "UK" && listing.town_city) {
            const normalizedTown = listing.town_city.toLowerCase().trim();
            await supabase
              .from("uk_town_region_lookup")
              .upsert({ town: normalizedTown, region_name: regionName }, { onConflict: "town" });
          }
        }
      }

      return { count: listingIds.length };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["region-stats"] });
      queryClient.invalidateQueries({ queryKey: ["unmatched-listings"] });
      toast({
        title: "Regions assigned",
        description: `Updated ${data.count} listings.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Bulk assignment failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}