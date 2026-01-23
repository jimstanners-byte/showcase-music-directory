'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// =============================================================================
// SECURITY NOTE: Uses listings_public view (no contact data)
// =============================================================================

interface RecentListing {
  id: string;
  name: string;
  slug: string;
  town_city: string | null;
  country: string | null;
  tier: string;
  primary_category_id: string | null;
  created_at: string;
}

export function useRecentListings(limit: number = 6) {
  return useQuery({
    queryKey: ["recent-listings", limit],
    queryFn: async () => {
      // Get recent listings from the public view
      const { data: listings, error } = await supabase
        .from("listings_public" as any)
        .select(`
          id,
          name,
          slug,
          town_city,
          country,
          tier,
          primary_category_id,
          created_at
        `)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;

      const typedListings = (listings as unknown) as RecentListing[] | null;

      // Get categories for these listings
      const listingIds = typedListings?.map(l => l.id) || [];
      
      if (listingIds.length === 0) return [];

      const { data: listingCategories } = await supabase
        .from("listing_categories")
        .select(`
          listing_id,
          category:categories(id, name, slug)
        `)
        .in("listing_id", listingIds);

      // Map categories to listings
      const categoriesByListing = new Map<string, any[]>();
      listingCategories?.forEach(lc => {
        if (!categoriesByListing.has(lc.listing_id)) {
          categoriesByListing.set(lc.listing_id, []);
        }
        if (lc.category) {
          categoriesByListing.get(lc.listing_id)!.push({ category: lc.category });
        }
      });

      // Combine listings with their categories
      return typedListings?.map(listing => ({
        ...listing,
        categories: categoriesByListing.get(listing.id) || [],
      })) || [];
    },
  });
}
