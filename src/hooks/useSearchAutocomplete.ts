'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Category } from "@/types/database";
import { stripLocationFromQuery, isOnlyLocation } from "@/lib/searchUtils";

// =============================================================================
// SECURITY NOTE: Uses listings_public view (no contact data)
// =============================================================================

// Extended listing type with venue fields for URL building
export interface SearchListing {
  id: string;
  name: string;
  slug: string;
  country: string | null;
  town_city: string | null;
  venue_type: string | null;
  region_slug: string | null;
}

interface SearchAutocompleteResult {
  categories: Category[];
  listings: SearchListing[];
}

export function useSearchAutocomplete(query: string) {
  return useQuery({
    queryKey: ["search-autocomplete", query],
    queryFn: async (): Promise<SearchAutocompleteResult> => {
      if (!query || query.length < 2) {
        return { categories: [], listings: [] };
      }

      // Strip location terms from the query for better matching
      const strippedQuery = stripLocationFromQuery(query);

      // If query is only a location with no search term, use empty results
      if (!strippedQuery || isOnlyLocation(query)) {
        return { categories: [], listings: [] };
      }

      const searchTerm = strippedQuery.toLowerCase();

      // Search categories by name AND search_terms - fetch all and filter in JS
      const { data: allCategories, error: catError } = await supabase
        .from("categories")
        .select("*");

      if (catError) throw catError;

      // Filter categories that match name OR any search_term contains the search term
      // Only include child categories (those with a parent_id)
      // Exception: Include "Venues" parent category if search_terms match (for arena, concert hall, etc.)
      const categories = (allCategories || [])
        .filter((cat) => {
          const nameMatch = cat.name.toLowerCase().includes(searchTerm);
          
          // Parse search_terms if it's a string
          let searchTermsArray: string[] = [];
          if (typeof cat.search_terms === 'string') {
            try {
              searchTermsArray = JSON.parse(cat.search_terms);
            } catch {
              searchTermsArray = [];
            }
          } else if (Array.isArray(cat.search_terms)) {
            searchTermsArray = cat.search_terms;
          }
          
          const searchTermsMatch = searchTermsArray.some((term: string) => {
            const lowerTerm = term.toLowerCase().trim();
            return lowerTerm.includes(searchTerm) || searchTerm.includes(lowerTerm);
          });

          // For parent categories, only include Venues and only if search_terms match
          if (!cat.parent_id) {
            const isVenues = cat.slug === "venues" || cat.url_slug === "venues";
            return isVenues && searchTermsMatch;
          }

          // For child categories, include if name OR search_terms match
          return nameMatch || searchTermsMatch;
        })
        // Sort by relevance: name matches first, then alphabetically
        .sort((a, b) => {
          const aNameMatch = a.name.toLowerCase().includes(searchTerm);
          const bNameMatch = b.name.toLowerCase().includes(searchTerm);

          // Name matches come first
          if (aNameMatch && !bNameMatch) return -1;
          if (!aNameMatch && bNameMatch) return 1;

          // Within same match type, sort alphabetically
          return a.name.localeCompare(b.name);
        });

      // Search listings using listings_public view
      const { data: listings, error: listError } = await supabase
        .from("listings_public")
        .select(
          `
          id,
          name,
          slug,
          country,
          town_city,
          venue_type,
          region_id
        `,
        )
        .ilike("name", `%${searchTerm}%`);

      if (listError) throw listError;

      // Get region slugs for listings that have region_id
      const regionIds = [...new Set((listings || []).filter((l) => l.region_id).map((l) => l.region_id))] as number[];
      let regionMap: Record<number, string> = {};

      if (regionIds.length > 0) {
        const { data: regions } = await supabase.from("regions").select("id, region_slug").in("id", regionIds);

        if (regions) {
          regionMap = Object.fromEntries(regions.map((r) => [r.id, r.region_slug]));
        }
      }

      // Add region_slug to listings
      const flattenedListings = (listings || []).map((l) => ({
        id: l.id,
        name: l.name,
        slug: l.slug,
        country: l.country,
        town_city: l.town_city,
        venue_type: l.venue_type,
        region_slug: l.region_id ? regionMap[l.region_id] || null : null,
      })) as SearchListing[];

      return {
        categories: categories as Category[],
        listings: flattenedListings,
      };
    },
    enabled: query.length >= 2,
    staleTime: 1000 * 60, // 1 minute
  });
}