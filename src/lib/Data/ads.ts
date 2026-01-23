import { supabaseServer } from '@/integrations/supabase/server';
import { cache } from 'react';

export const getSponsorAd = cache(async () => {
  const now = new Date().toISOString();
  
  const { data, error } = await supabaseServer
    .from('ads')
    .select('*')
    .eq('position', 'sponsor-logo')
    .eq('is_active', true)
    .or(`start_date.is.null,start_date.lte.${now}`)
    .or(`end_date.is.null,end_date.gte.${now}`)
    .limit(1)
    .single();
  
  if (error) return null;
  return data;
});