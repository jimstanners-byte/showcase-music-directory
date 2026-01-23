'use client';

import { useMemo } from 'react';
import { buildVenueProfileUrl } from '@/lib/buildVenueUrl';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface VenueListing {
  id: string;
  slug: string;
  country: string | null;
  region_id?: number | null;
  region_slug?: string | null;
  town_city: string | null;
}

export function useVenueUrl(venue: VenueListing | null): string | null {
  // Fetch region slug if venue has region_id but no region_slug
  const { data: region } = useQuery({
    queryKey: ['region', venue?.region_id],
    queryFn: async () => {
      if (!venue?.region_id) return null;
      const { data } = await supabase
        .from('regions')
        .select('region_slug')
        .eq('id', venue.region_id)
        .single();
      return data;
    },
    enabled: !!venue?.region_id && !venue?.region_slug,
  });
  
  return useMemo(() => {
    if (!venue) return null;
    
    return buildVenueProfileUrl({
      slug: venue.slug,
      country: venue.country,
      regionSlug: venue.region_slug || region?.region_slug || null,
      city: venue.town_city,
    });
  }, [venue, region]);
}

/**
 * Synchronous version for when you already have region_slug
 */
export function getVenueUrl(venue: {
  slug: string;
  country: string | null;
  region_slug?: string | null;
  town_city: string | null;
}): string {
  return buildVenueProfileUrl({
    slug: venue.slug,
    country: venue.country,
    regionSlug: venue.region_slug || null,
    city: venue.town_city,
  });
}
