import { supabaseServer } from '@/integrations/supabase/server';
import { cache } from 'react';
import { Category } from '@/types/database';

/**
 * Get all top-level categories (parent_id is null)
 * Cached to prevent duplicate fetches in the same request
 */
export const getTopLevelCategories = cache(async (): Promise<Category[]> => {
  const { data, error } = await supabaseServer
    .from('categories')
    .select('*')
    .is('parent_id', null)
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data as Category[];
});

/**
 * Get category by slug (checks both url_slug and slug fields)
 */
export const getCategoryBySlug = cache(async (slug: string): Promise<Category | null> => {
  // First try to find by url_slug
  const { data: byUrlSlug, error: urlSlugError } = await supabaseServer
    .from('categories')
    .select('*')
    .eq('url_slug', slug)
    .maybeSingle();

  if (urlSlugError) {
    console.error('Error fetching category by url_slug:', urlSlugError);
  }
  
  if (byUrlSlug) {
    return byUrlSlug as Category;
  }

  // Fallback to regular slug
  const { data, error } = await supabaseServer
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('Error fetching category by slug:', error);
    return null;
  }

  return data as Category | null;
});

/**
 * Get subcategories for a given parent category
 */
export const getSubcategories = cache(async (parentId: string): Promise<Category[]> => {
  const { data, error } = await supabaseServer
    .from('categories')
    .select('*')
    .eq('parent_id', parentId)
    .order('name');

  if (error) {
    console.error('Error fetching subcategories:', error);
    return [];
  }

  return data as Category[];
});

/**
 * Get all categories
 */
export const getAllCategories = cache(async (): Promise<Category[]> => {
  const { data, error } = await supabaseServer
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching all categories:', error);
    return [];
  }

  return data as Category[];
});

/**
 * Get listings for a category with optional filters
 */
export const getListingsByCategory = cache(async (
  categoryId: string,
  options?: {
    continent?: string;
    country?: string;
    region?: string;
    city?: string;
  }
): Promise<any[]> => {
  let query = supabaseServer
    .from('listings')
    .select(`
      *,
      listing_categories!inner(category_id)
    `)
    .eq('listing_categories.category_id', categoryId)
    .eq('is_active', true)
    .order('tier', { ascending: false })
    .order('name');

  if (options?.continent) {
    query = query.eq('continent', options.continent);
  }
  if (options?.country) {
    query = query.eq('country', options.country);
  }
  if (options?.region) {
    query = query.eq('region', options.region);
  }
  if (options?.city) {
    query = query.eq('city', options.city);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching listings:', error);
    return [];
  }

  return data || [];
});