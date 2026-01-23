'use client';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * Fetches distinct countries from active listings
 */
export const useCountries = () => {
  return useQuery({
    queryKey: ['distinct-countries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('country')
        .eq('is_active', true)
        .not('country', 'is', null);
      
      if (error) throw error;
      
      const countries = [...new Set(data?.map(l => l.country).filter(Boolean) as string[])];
      return countries.sort();
    },
  });
};

/**
 * Fetches distinct cities for a given country from active listings
 */
export const useCitiesByCountryOption = (country: string | null) => {
  return useQuery({
    queryKey: ['distinct-cities', country],
    queryFn: async () => {
      if (!country) return [];
      
      const { data, error } = await supabase
        .from('listings')
        .select('town_city')
        .eq('is_active', true)
        .eq('country', country)
        .not('town_city', 'is', null);
      
      if (error) throw error;
      
      const cities = [...new Set(data?.map(l => l.town_city).filter(Boolean) as string[])];
      return cities.sort();
    },
    enabled: !!country,
  });
};
