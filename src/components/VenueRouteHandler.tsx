'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { slugToCountry } from '@/lib/countryAliases';
import { isVenueTypeSlug, getVenueTypeFromSlug } from '@/lib/venueTypes';
import { Layout } from '@/components/Layout';
import VenueFinder from './VenueFinder';
import VenueProfile from './VenueProfile';

// =============================================================================
// SECURITY NOTE: Uses listings_public view (no contact data)
// =============================================================================

// Normalize country names to match regions table format (UK, USA)
function normalizeCountryForRegions(country: string): string {
  if (country === "United States" || country === "US") {
    return "USA";
  }
  if (country === "United Kingdom") {
    return "UK";
  }
  return country;
}

/**
 * Smart route handler for 3-segment venue URLs
 * 
 * For countries WITHOUT regions:
 * - /venues/europe/germany/berlin → city page (show all Berlin venues)
 * - /venues/europe/germany/berghain-berlin → venue page
 * 
 * For countries WITH regions (UK/USA):
 * - /venues/north-america/usa/tennessee → region page (show all Tennessee venues)
 * - /venues/europe/uk/north-west → region page (show all North West venues)
 * 
 * For venue type pages:
 * - /venues/europe/uk/arenas → venue type page (show all arenas in UK)
 * 
 * This handler checks if the 3rd segment is a venue type, region, city, or venue slug.
 */
export default function VenueRouteHandler() {
  const { continentSlug, countrySlug, param3 } = useParams<{
    continentSlug: string;
    countrySlug: string;
    param3: string;
  }>();

  // FIRST: Check if param3 is a venue type slug (instant, no DB query)
  if (param3 && isVenueTypeSlug(param3)) {
    const venueType = getVenueTypeFromSlug(param3);
    return (
      <VenueFinder 
        preSelectedVenueType={venueType} 
        venueTypeSlug={param3} 
      />
    );
  }

  // Get all venue countries to resolve slug
  const { data: countriesData } = useQuery({
    queryKey: ['venue-countries-list'],
    queryFn: async () => {
      const { data } = await supabase
        .from('listings_public')
        .select('country')
        .not('venue_type', 'is', null)
        .not('country', 'is', null);
      return [...new Set(data?.map(d => d.country).filter(Boolean))] as string[];
    },
  });

  const country = countrySlug && countriesData 
    ? slugToCountry(countrySlug, countriesData) 
    : null;

  // Check if param3 is a region (for UK/USA)
  const { data: regionCheck, isLoading: regionLoading } = useQuery({
    queryKey: ['region-check', country, param3],
    queryFn: async () => {
      if (!param3 || !country) return { isRegion: false };
      
      const regionCountry = normalizeCountryForRegions(country);
      
      // Check if this slug matches a region in the regions table
      const { data } = await supabase
        .from('regions')
        .select('id, region_name, region_slug')
        .eq('country', regionCountry)
        .eq('region_slug', param3)
        .maybeSingle();
      
      return { 
        isRegion: !!data, 
        regionData: data 
      };
    },
    enabled: !!param3 && !!country,
  });

  // Check if param3 is a city with venues in this country
  const { data: cityCheck, isLoading: cityLoading } = useQuery({
    queryKey: ['city-check', country, param3],
    queryFn: async () => {
      if (!param3 || !country) return { isCity: false, venueCount: 0 };
      
      // Convert slug to search pattern (berlin → berlin, new-york → new york)
      const cityPattern = param3.replace(/-/g, ' ');
      
      // Check if there are venues in this city for this country
      const { count } = await supabase
        .from('listings_public')
        .select('id', { count: 'exact', head: true })
        .not('venue_type', 'is', null)
        .eq('country', country)
        .ilike('town_city', cityPattern);
      
      return { 
        isCity: (count || 0) > 0, 
        venueCount: count || 0 
      };
    },
    enabled: !!param3 && !!country,
  });

  const isLoading = regionLoading || cityLoading || !countriesData;

  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="h-8 w-64 bg-muted animate-pulse rounded mb-4" />
          <div className="h-96 bg-muted animate-pulse rounded" />
        </div>
      </Layout>
    );
  }

  // If param3 is a region → show region page via VenueFinder
  if (regionCheck?.isRegion) {
    return <VenueFinder />;
  }

  // If param3 is a city (has venues in this country) → show city page via VenueFinder
  if (cityCheck?.isCity) {
    return <VenueFinder />;
  }

  // Otherwise, treat param3 as a venue slug → show venue page
  return <VenueProfile />;
}
