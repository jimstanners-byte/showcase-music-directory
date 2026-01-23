import { supabaseServer } from '@/integrations/supabase/server';
import { cache } from 'react';

/**
 * Get listing by slug
 */
export const getListingBySlug = cache(async (slug: string) => {
  const { data, error } = await supabaseServer
    .from('listings')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('Error fetching listing:', error);
    return null;
  }

  return data;
});

/**
 * Get listing categories
 */
export const getListingCategories = cache(async (listingId: string) => {
  const { data, error } = await supabaseServer
    .from('listing_categories')
    .select('categories(*)')
    .eq('listing_id', listingId);

  if (error) {
    console.error('Error fetching listing categories:', error);
    return [];
  }

  return data?.map((lc: any) => lc.categories).filter(Boolean) || [];
});

/**
 * Get listing photos
 */
export const getListingPhotos = cache(async (listingId: string) => {
  const { data, error } = await supabaseServer
    .from('listing_photos')
    .select('*')
    .eq('listing_id', listingId)
    .order('display_order');

  if (error) {
    console.error('Error fetching listing photos:', error);
    return [];
  }

  return data || [];
});

/**
 * Get listing contacts
 */
export const getListingContacts = cache(async (listingId: string, showContacts: boolean) => {
  if (!showContacts) return [];

  const { data, error } = await supabaseServer
    .from('listing_contacts')
    .select('*')
    .eq('listing_id', listingId)
    .order('display_order');

  if (error) {
    console.error('Error fetching listing contacts:', error);
    return [];
  }

  return data || [];
});

/**
 * Get primary category
 */
export const getPrimaryCategory = cache(async (categoryId: string | null) => {
  if (!categoryId) return null;

  const { data, error } = await supabaseServer
    .from('categories')
    .select('*')
    .eq('id', categoryId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching primary category:', error);
    return null;
  }

  return data;
});

/**
 * Get regions for a country
 */
export const getRegionsByCountry = cache(async (country: string | null) => {
  if (!country) return [];

  const { data, error } = await supabaseServer
    .from('regions')
    .select('*')
    .eq('country', country)
    .order('region_name');

  if (error) {
    console.error('Error fetching regions:', error);
    return [];
  }

  return data || [];
});