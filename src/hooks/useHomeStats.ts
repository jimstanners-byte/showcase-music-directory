'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// =============================================================================
// SECURITY NOTE: Uses listings_public view (no contact data)
// =============================================================================

export function useHomeStats() {
  return useQuery({
    queryKey: ["home-stats"],
    queryFn: async () => {
      // Get total active listings count using listings_public view
      const { count: listingsCount } = await supabase
        .from("listings_public" as any)
        .select("*", { count: "exact", head: true });

      // Get total subcategories count (categories with a parent)
      const { count: categoriesCount } = await supabase
        .from("categories")
        .select("*", { count: "exact", head: true })
        .not("parent_id", "is", null);

      // Get unique countries count using DISTINCT query (much faster)
      const { data: countriesData } = await supabase
        .rpc('get_unique_countries_count');

      // Fallback if RPC doesn't exist yet
      const countries = countriesData ?? 0;

      return {
        listings: listingsCount ?? 0,
        categories: categoriesCount ?? 0,
        countries: countries,
      };
    },
  });
}