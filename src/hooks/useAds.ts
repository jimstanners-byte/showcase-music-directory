'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Ad {
  id: string;
  name: string;
  position: 'sponsor-logo' | 'featured';
  image_url: string;
  link_url: string | null;
  alt_text: string | null;
  is_active: boolean;
  start_date: string | null;
  end_date: string | null;
  target_category_ids: string[];
  target_countries: string[];
  target_pages: string[];
  rotation_interval: number | null;
  created_at: string;
  updated_at: string;
}

export const useAds = () => {
  return useQuery({
    queryKey: ['ads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Ad[];
    },
  });
};

export const useActiveAdsByPosition = (
  position: string, 
  categoryId?: string | null, 
  country?: string | null
) => {
  return useQuery({
    queryKey: ['active-ads', position, categoryId, country],
    queryFn: async () => {
      const now = new Date().toISOString();
      
      // Build query with targeting priority
      let query = supabase
        .from('ads')
        .select('*')
        .eq('position', position)
        .eq('is_active', true)
        .or(`start_date.is.null,start_date.lte.${now}`)
        .or(`end_date.is.null,end_date.gte.${now}`);
      
      const { data, error } = await query;
      if (error) throw error;
      
      const ads = data as Ad[];
      
      // Helper functions
      const hasTargetCategories = (ad: Ad) => ad.target_category_ids && ad.target_category_ids.length > 0;
      const hasTargetCountries = (ad: Ad) => ad.target_countries && ad.target_countries.length > 0;
      const categoryMatches = (ad: Ad) => categoryId && ad.target_category_ids?.includes(categoryId);
      const countryMatches = (ad: Ad) => country && ad.target_countries?.includes(country);
      
      // Prioritize: exact match > category only > country only > site-wide
      const exactMatch = ads.find(ad => 
        categoryMatches(ad) && countryMatches(ad)
      );
      if (exactMatch) return exactMatch;
      
      const categoryMatch = ads.find(ad => 
        categoryMatches(ad) && !hasTargetCountries(ad)
      );
      if (categoryMatch) return categoryMatch;
      
      const countryMatch = ads.find(ad => 
        !hasTargetCategories(ad) && countryMatches(ad)
      );
      if (countryMatch) return countryMatch;
      
      // Fall back to site-wide ad
      return ads.find(ad => !hasTargetCategories(ad) && !hasTargetCountries(ad));
    },
  });
};

// New hook for rotating banners - fetches ALL active ads for a position with targeting
export const useRotatingAds = (
  position: string,
  categoryId?: string | null,
  country?: string | null
) => {
  return useQuery({
    queryKey: ['rotating-ads', position, categoryId, country],
    queryFn: async () => {
      const now = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .eq('position', position)
        .eq('is_active', true)
        .or(`start_date.is.null,start_date.lte.${now}`)
        .or(`end_date.is.null,end_date.gte.${now}`)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const ads = data as Ad[];
      
      // Filter ads by targeting with AND logic:
      // - If ad has both categories AND countries: at least one category must match AND country must match
      // - If ad has only categories: at least one category must match (any country)
      // - If ad has only countries: country must match (any category)
      // - If ad has neither: site-wide (always show)
      return ads.filter(ad => {
        const hasCategories = ad.target_category_ids && ad.target_category_ids.length > 0;
        const hasTargetCountries = ad.target_countries && ad.target_countries.length > 0;
        const categoryMatches = categoryId && ad.target_category_ids?.includes(categoryId);
        const countryMatches = country && ad.target_countries?.includes(country);

        // Site-wide ad (no targeting)
        if (!hasCategories && !hasTargetCountries) return true;
        
        // Both categories and country specified: both must match
        if (hasCategories && hasTargetCountries) {
          return categoryMatches && countryMatches;
        }
        
        // Only categories specified
        if (hasCategories && !hasTargetCountries) {
          return categoryMatches;
        }
        
        // Only countries specified
        if (!hasCategories && hasTargetCountries) {
          return countryMatches;
        }
        
        return false;
      });
    },
  });
};

// New hook for featured ads with category, page, parent category priority and country filtering
export const useFeaturedAds = (categoryId?: string, pageId?: string, parentCategoryId?: string, country?: string) => {
  return useQuery({
    queryKey: ['featured-ads', categoryId, pageId, parentCategoryId, country],
    queryFn: async () => {
      const now = new Date().toISOString();
      
      // Fetch all featured ads
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .eq('position', 'featured')
        .eq('is_active', true)
        .or(`start_date.is.null,start_date.lte.${now}`)
        .or(`end_date.is.null,end_date.gte.${now}`);
      
      if (error) throw error;
      
      const ads = data as Ad[];
      
      // Filter by country if ad has country targeting
      const filterByCountry = (adsToFilter: Ad[]) => {
        return adsToFilter.filter(ad => {
          // If ad has no country targeting, it shows everywhere
          if (!ad.target_countries || ad.target_countries.length === 0) return true;
          // If ad has country targeting, only show if current country matches
          return country && ad.target_countries.includes(country);
        });
      };
      
      // Site-wide ads (no category, no page targeting)
      const siteWideAds = ads.filter(ad => 
        (!ad.target_category_ids || ad.target_category_ids.length === 0) &&
        (!ad.target_pages || ad.target_pages.length === 0)
      );
      
      // Page-specific ads
      const pageAds = pageId 
        ? ads.filter(ad => ad.target_pages?.includes(pageId))
        : [];
      
      // Exact match ads: category AND country both specified and matching
      const exactMatchAds = categoryId && country
        ? ads.filter(ad => 
            ad.target_category_ids?.includes(categoryId) && 
            ad.target_countries?.includes(country)
          )
        : [];
      
      // Category-only ads: category matches but NO country targeting
      const categoryOnlyAds = categoryId 
        ? ads.filter(ad => 
            ad.target_category_ids?.includes(categoryId) &&
            (!ad.target_countries || ad.target_countries.length === 0)
          )
        : [];
      
      // Child category ads (for parent pages) - fetch child category IDs
      let childCategoryAds: Ad[] = [];
      if (parentCategoryId) {
        const { data: childCategories } = await supabase
          .from('categories')
          .select('id')
          .eq('parent_id', parentCategoryId);
        
        const childIds = childCategories?.map(c => c.id) || [];
        childCategoryAds = ads.filter(ad => 
          ad.target_category_ids?.some(catId => childIds.includes(catId))
        );
      }
      
      // Apply country filter to page, child, and site-wide ads
      return {
        exactMatchAds,  // Already filtered by category + country
        categoryOnlyAds, // No country targeting, so no filter needed
        pageAds: filterByCountry(pageAds),
        childCategoryAds: filterByCountry(childCategoryAds),
        siteWideAds: filterByCountry(siteWideAds),
      };
    },
  });
};

export const useCreateAd = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (ad: Omit<Ad, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('ads')
        .insert(ad)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
    },
  });
};

export const useUpdateAd = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...ad }: Partial<Ad> & { id: string }) => {
      const { data, error } = await supabase
        .from('ads')
        .update(ad)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      queryClient.invalidateQueries({ queryKey: ['active-ads'] });
      queryClient.invalidateQueries({ queryKey: ['rotating-ads'] });
      queryClient.invalidateQueries({ queryKey: ['featured-ads'] });
    },
  });
};

export const useDeleteAd = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('ads')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      queryClient.invalidateQueries({ queryKey: ['active-ads'] });
      queryClient.invalidateQueries({ queryKey: ['rotating-ads'] });
      queryClient.invalidateQueries({ queryKey: ['featured-ads'] });
    },
  });
};
