'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CONTINENT_ORDER } from "@/lib/continents";

// =============================================================================
// SECURITY NOTE: Uses listings_public view (no contact data)
// =============================================================================

interface ContinentCount {
  continent: string;
  count: number;
}

export function useVenueCountsByContinent() {
  return useQuery({
    queryKey: ["venue-counts-by-continent"],
    queryFn: async () => {
      // Get counts for each continent individually to avoid row limits
      const counts: Record<string, number> = {};
      
      for (const continent of CONTINENT_ORDER) {
        const { count, error } = await supabase
          .from("listings_public")
          .select("*", { count: "exact", head: true })
          .not("venue_type", "is", null)
          .eq("continent", continent);

        if (error) throw error;
        counts[continent] = count || 0;
      }

      return CONTINENT_ORDER.map(continent => ({
        continent,
        count: counts[continent] || 0
      })) as ContinentCount[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useTotalVenueCount() {
  return useQuery({
    queryKey: ["total-venue-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("listings_public")
        .select("*", { count: "exact", head: true })
        .not("venue_type", "is", null);

      if (error) throw error;
      return count || 0;
    },
    staleTime: 5 * 60 * 1000,
  });
}
