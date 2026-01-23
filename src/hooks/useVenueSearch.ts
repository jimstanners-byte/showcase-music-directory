'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// =============================================================================
// SECURITY NOTE: Uses listings_public view (no contact data)
// =============================================================================

interface VenueSearchResult {
  id: string;
  name: string;
  slug: string;
  venue_type: string | null;
  town_city: string | null;
  country: string | null;
}

export function useVenueSearch(query: string) {
  return useQuery({
    queryKey: ["venue-search", query],
    queryFn: async (): Promise<VenueSearchResult[]> => {
      if (!query || query.length < 2) return [];

      const searchTerm = query.trim().toLowerCase();

      if (!searchTerm) return [];

      // Search venues directly - venue_type is only populated for venue listings
      // This avoids the massive .in() clause that was causing 400 errors
      const { data, error } = await supabase
        .from("listings_public")
        .select("id, name, slug, venue_type, town_city, country")
        .not("venue_type", "is", null)
        .ilike("name", `%${searchTerm}%`)
        .order("name")
        .limit(10);

      if (error) throw error;

      return (data || []).filter((v): v is VenueSearchResult => v.id !== null && v.name !== null && v.slug !== null);
    },
    enabled: query.length >= 2,
    staleTime: 1000 * 60,
  });
}
