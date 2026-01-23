'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useListingCategoryIds = (listingId: string | undefined) => {
  return useQuery({
    queryKey: ['listing-category-ids', listingId],
    queryFn: async () => {
      if (!listingId) return [];
      
      const { data, error } = await supabase
        .from('listing_categories')
        .select('category_id')
        .eq('listing_id', listingId);
      
      if (error) throw error;
      return data.map(lc => lc.category_id);
    },
    enabled: !!listingId,
  });
};

export const useUpdateListingCategories = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ listingId, categoryIds }: { listingId: string; categoryIds: string[] }) => {
      // Delete existing categories
      const { error: deleteError } = await supabase
        .from('listing_categories')
        .delete()
        .eq('listing_id', listingId);
      
      if (deleteError) throw deleteError;
      
      // Insert new categories
      if (categoryIds.length > 0) {
        const { error: insertError } = await supabase
          .from('listing_categories')
          .insert(
            categoryIds.map(categoryId => ({
              id: crypto.randomUUID(), // Generate UUID for each row
              listing_id: listingId,
              category_id: categoryId,
            }))
          );
        
        if (insertError) throw insertError;
      }
    },
    onSuccess: (_, { listingId }) => {
      queryClient.invalidateQueries({ queryKey: ['listing-category-ids', listingId] });
      queryClient.invalidateQueries({ queryKey: ['listing-categories'] });
    },
  });
};
