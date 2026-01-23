'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { slugToCountry } from '@/lib/countryAliases';
import { isVenueTypeSlug, getVenueTypeFromSlug } from '@/lib/venueTypes';
import { isCityRegion } from '@/lib/cityRegions';
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
 * 
 * For countries WITHOUT regions:
 * - /venues/europe/germany/berlin/berghain → venue page (param3=city, param4=venue)
 * - /venues/europe/germany/berlin/clubs → venue type page (param3=city, param4=venueType)
 * 
 * For city-regions (London, New York):
 * - /venues/europe/uk/london/london → redirect to /venues/europe/uk/london
 * - /venues/europe/uk/london/o2-academy → venue page
 * 
 * Logic:
 * 1. Check if param4 is a venue type → VenueFinder with preSelectedVenueType
 * 2. Check if param3 is a city-region → check for redirect or show venue profile
 * 3. Check if param3 is a region → if yes, param4 is a city → VenueFinder
 * 4. Otherwise, param4 is a venue slug → VenueProfile
 */
export default function VenueFourSegmentHandler() {
  const router = useRouter();
  const { continentSlug, countrySlug, param3, param4 } = useParams<{
    continentSlug: string;
    countrySlug: string;
    param3: string;
    param4: string;
  }>();

  // FIRST: Check if param4 is a venue type slug (instant, no DB query)
  if (param4 && isVenueTypeSlug(param4)) {
    const venueType = getVenueTypeFromSlug(param4);
    return (
      <VenueFinder 
        preSelectedVenueType={venueType} 
        venueTypeSlug={param4} 
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
  const { data: regionCheck, isLoading } = useQuery({
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

  // Loading state
  if (isLoading || !countriesData) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="h-8 w-64 bg-muted animate-pulse rounded mb-4" />
          <div className="h-96 bg-muted animate-pulse rounded" />
        </div>
      </Layout>
    );
  }

  // Check for city-region redirect (e.g., /uk/london/london → /uk/london)
  // If param3 is a city-region and param4 matches the region slug, redirect
  if (regionCheck?.isRegion && isCityRegion(country, param3) && param3 && param4) {
    // Normalize comparison (both lowercase, handle slug format)
    const regionSlug = param3.toLowerCase();
    const fourthSlug = param4.toLowerCase();
    
    // Redirect if param4 matches the region (city-region redundancy)
    if (regionSlug === fourthSlug) {
      useEffect(() => {
        router.replace(`/venues/${continentSlug}/${countrySlug}/${param3}`);
      }, [router, continentSlug, countrySlug, param3]);
      return null;
    }
    
    // Otherwise param4 is a venue slug, show profile
    return <VenueProfile />;
  }

  // If param3 is a region → param4 is a city → show city page via VenueFinder
  if (regionCheck?.isRegion) {
    return <VenueFinder />;
  }

  // Otherwise, param3 is a city and param4 is a venue slug → show venue page
  return <VenueProfile />;
}
