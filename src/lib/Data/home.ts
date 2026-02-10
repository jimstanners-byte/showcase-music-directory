import { supabaseServer } from '@/integrations/supabase/server';
import { cache } from 'react';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const getHomeStats = cache(async () => {
  const [listingsResult, categoriesResult, countriesData] = await Promise.all([
    supabaseServer
      .from("listings_public" as any)
      .select("*", { count: "exact", head: true }),
    supabaseServer
      .from("categories")
      .select("*", { count: "exact", head: true })
      .not("parent_id", "is", null),
    supabaseServer.rpc('get_unique_countries_count')
  ]);

  return {
    listings: listingsResult.count ?? 0,
    sectors: categoriesResult.count ?? 0,
    countries: countriesData?.data ?? 0,
  };
});

export const getPaidListings = cache(async (limit = 50) => {
  const { data } = await supabaseServer
    .from('listings_public' as any)
    .select('id, name, slug, tier')
    .in('tier', ['premier', 'enhanced'])
    .limit(limit);
  
  if (!data) return [];
  
  const premier = shuffleArray(data.filter(l => l.tier === 'premier'));
  const enhanced = shuffleArray(data.filter(l => l.tier === 'enhanced'));
  
  return [...premier, ...enhanced];
});