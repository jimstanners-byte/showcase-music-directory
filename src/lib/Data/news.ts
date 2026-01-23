import { supabaseServer } from '@/integrations/supabase/server';
import { cache } from 'react';

/**
 * Get all published news articles
 */
export const getNews = cache(async (limit?: number) => {
  let query = supabaseServer
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching news:', error);
    return [];
  }

  return data || [];
});

/**
 * Get news article by slug
 */
export const getNewsBySlug = cache(async (slug: string) => {
  const { data, error } = await supabaseServer
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error) {
    console.error('Error fetching news by slug:', error);
    return null;
  }

  return data;
});