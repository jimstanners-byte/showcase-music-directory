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
 * Smart route handler for 4-segment venue URLs
 * 
 * Must distinguish between:
 * 
 * For countries WITH regions (UK/USA):
 * - /venues/north-america/usa/tennessee/nashville → city page (param3=region, param4=city)
 * - /venues/europe/uk/midlands/arenas → venue type page (param3=region, param4=venueType)
 * - /venues/europe/uk/london/london → city page (London city within London region)
 * - /venues/north-america/usa/new-york/new-york → city page (NYC within NY state)
 * - /venues/north-america/usa/new-york/ralph-wilson-stadium → venue profile
 * 
 * For countries WITHOUT regions:
 * - /venues/europe/germany/berlin/berghain → venue page (param3=city, param4=venue)
 * - /venues/europe/germany/berlin/clubs → venue type page (param3=city, param4=venueType)
 * 
 * Logic:
 * 1. Check if param4 is a venue type → VenueFinder with preSelectedVenueType
 * 2. Check if param3 is a region → if yes, check if param4 is a city in that region
 *    - If param4 is a city → VenueFinder (city page)
 *    - If param4 is not a city → VenueProfile (venue page)
 * 3. Otherwise, param4 is a venue slug → VenueProfile
 */
export default function VenueFourSegmentHandler() {
  const { continentSlug, countrySlug, param3, param4 } = useParams<{
    continentSlug: string;
    countrySlug: string;
    param3: string;
    param4: string;
  }>();

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
    queryKey: ['region-check-4seg', country, param3],
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

  // Check if param4 is a city within the region (only if param3 is a region)
  const { data: cityCheck, isLoading: cityLoading } = useQuery({
    queryKey: ['city-check-4seg', regionCheck?.regionData?.id, param4],
    queryFn: async () => {
      if (!regionCheck?.regionData?.id || !param4) return { isCity: false };
      
      // Check if param4 matches a city slug in listings for this region
      const { data } = await supabase
        .from('listings_public')
        .select('town_city')
        .eq('region_id', regionCheck.regionData.id)
        .not('venue_type', 'is', null)
        .not('town_city', 'is', null);
      
      if (!data || data.length === 0) return { isCity: false };
      
      // Get unique cities and check if param4 matches any city slug
      const cities = [...new Set(data.map(d => d.town_city).filter(Boolean))];
      const citySlugMatch = cities.find(city => {
        const citySlug = city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        return citySlug === param4;
      });
      
      return { 
        isCity: !!citySlugMatch,
        cityName: citySlugMatch || null
      };
    },
    enabled: !!regionCheck?.regionData?.id && !!param4,
  });

  // Check if param4 is a venue type slug (instant, no DB query)
  if (param4 && isVenueTypeSlug(param4)) {
    const venueType = getVenueTypeFromSlug(param4);
    return (
      <VenueFinder 
        preSelectedVenueType={venueType} 
        venueTypeSlug={param4} 
      />
    );
  }

  // Loading state
  if (regionLoading || cityLoading || !countriesData) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="h-8 w-64 bg-muted animate-pulse rounded mb-4" />
          <div className="h-96 bg-muted animate-pulse rounded" />
        </div>
      </Layout>
    );
  }

  // If param3 is a region AND param4 is a city → show city page via VenueFinder
  if (regionCheck?.isRegion && cityCheck?.isCity) {
    return <VenueFinder />;
  }

  // If param3 is a region but param4 is NOT a city → it's a venue profile
  if (regionCheck?.isRegion && !cityCheck?.isCity) {
    return <VenueProfile />;
  }

  // Otherwise, param3 is a city and param4 is a venue slug → show venue page
  return <VenueProfile />;
}