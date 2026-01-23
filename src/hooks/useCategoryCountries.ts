'use client';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// =============================================================================
// SECURITY NOTE: Uses listings_public view (no contact data)
// =============================================================================

/**
 * Fetches distinct countries from listings that belong to the selected categories.
 * This enables cascading country selection based on actual listing data.
 */
export const useCategoryCountries = (categoryIds: string[]) => {
  return useQuery({
    queryKey: ['category-countries', categoryIds],
    queryFn: async () => {
      if (categoryIds.length === 0) {
        // If no categories selected, return all distinct countries from all listings
        const { data, error } = await supabase
          .from('listings_public')
          .select('country')
          .not('country', 'is', null);
        
        if (error) throw error;
        
        // Get unique countries and sort alphabetically
        const countries = [...new Set(data?.map(l => l.country).filter(Boolean) as string[])];
        return countries.sort();
      }
      
      // Get listing IDs for selected categories
      const { data: listingCategories, error: lcError } = await supabase
        .from('listing_categories')
        .select('listing_id')
        .in('category_id', categoryIds);
      
      if (lcError) throw lcError;
      
      if (!listingCategories || listingCategories.length === 0) {
        return [];
      }
      
      const listingIds = listingCategories.map(lc => lc.listing_id);
      
      // Get countries from those listings
      const { data: listings, error: listingsError } = await supabase
        .from('listings_public')
        .select('country')
        .in('id', listingIds)
        .not('country', 'is', null);
      
      if (listingsError) throw listingsError;
      
      // Get unique countries and sort alphabetically
      const countries = [...new Set(listings?.map(l => l.country).filter(Boolean) as string[])];
      return countries.sort();
    },
    enabled: true,
  });
};
