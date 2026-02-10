'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { slugToCountry } from '@/lib/countryAliases';
import { isVenueTypeSlug, getVenueTypeFromSlug } from '@/lib/venueTypes';
import { countryHasRegions, toSlug } from '@/lib/venueUrlUtils';
import { getContinentFromSlug, getContinentCountries } from '@/lib/continents';
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

// Resolve country from slug using continent's country list (for countries with no venues)
function resolveCountryFromContinent(countrySlug: string, continentSlug: string): string | null {
  const continent = getContinentFromSlug(continentSlug);
  if (!continent) return null;
  
  const countries = getContinentCountries(continent);
  // Find country where slug matches
  return countries.find(c => toSlug(c) === countrySlug.toLowerCase()) || null;
}

/**
 * Smart route handler for 3-segment venue URLs
 * 
 * For countries WITHOUT regions (e.g., Australia, Germany):
 * - /venues/oceania/australia/brisbane → city page (show all Brisbane venues, or empty state)
 * - /venues/europe/germany/berlin → city page (show all Berlin venues)
 * - /venues/europe/germany/berghain-berlin → venue page (if slug matches a venue)
 * 
 * For countries WITH regions (UK/USA):
 * - /venues/north-america/usa/tennessee → region page (show all Tennessee venues)
 * - /venues/europe/uk/north-west → region page (show all North West venues)
 * 
 * For venue type pages:
 * - /venues/europe/uk/arenas → venue type page (show all arenas in UK)
 * 
 * Key logic:
 * - For countries WITHOUT regions: third segment is ALWAYS a city (show VenueFinder)
 *   UNLESS it exactly matches a venue slug
 * - For countries WITH regions: check if it's a region first, then city, then venue
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

  // Resolve country from venue data first, then fall back to continent's country list
  // This handles countries that exist but have no venues yet
  const country = (() => {
    if (!countrySlug) return null;
    
    // Try venue-based lookup first
    if (countriesData) {
      const fromVenues = slugToCountry(countrySlug, countriesData);
      if (fromVenues) return fromVenues;
    }
    
    // Fall back to continent's country list (for countries with no venues)
    if (continentSlug) {
      return resolveCountryFromContinent(countrySlug, continentSlug);
    }
    
    return null;
  })();

  // Check if this country has regions (UK/USA)
  const hasRegions = country ? countryHasRegions(country) : false;

  // Check if param3 is a region (only for UK/USA)
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
    enabled: !!param3 && !!country && hasRegions,
  });

  // Check if param3 is a venue slug (exact match)
  // This helps distinguish between city names and venue slugs
  const { data: venueCheck, isLoading: venueLoading } = useQuery({
    queryKey: ['venue-slug-check', param3],
    queryFn: async () => {
      if (!param3) return { isVenue: false };
      
      const { data } = await supabase
        .from('listings_public')
        .select('id, slug')
        .eq('slug', param3)
        .not('venue_type', 'is', null)
        .maybeSingle();
      
      return { isVenue: !!data };
    },
    enabled: !!param3,
  });

  // Check if param3 is a city with venues in this country
  // Use wildcard matching for more flexible city name matching
  const { data: cityCheck, isLoading: cityLoading } = useQuery({
    queryKey: ['city-check', country, param3],
    queryFn: async () => {
      if (!param3 || !country) return { isCity: false, venueCount: 0 };
      
      // Convert slug to search pattern (berlin → berlin, new-york → new york)
      // Add wildcards for partial matching (e.g., "brisbane" matches "Brisbane City")
      const cityPattern = `%${param3.replace(/-/g, ' ')}%`;
      
      // Check if there are venues in this city for this country
      // Use ilike with wildcards for flexible case-insensitive match
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

  // For countries without regions, we can determine routing without waiting for venue queries
  // if we can resolve the country from the continent's country list
  const canDetermineRouting = country && !hasRegions;

  const isLoading = !canDetermineRouting && (regionLoading || cityLoading || venueLoading);

  // Loading state - only show if we can't determine routing yet
  if (isLoading && !country) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="h-8 w-64 bg-muted animate-pulse rounded mb-4" />
          <div className="h-96 bg-muted animate-pulse rounded" />
        </div>
      </Layout>
    );
  }

  // For countries WITHOUT regions: treat param3 as a city (show VenueFinder)
  // This is checked FIRST because it doesn't require any DB queries
  // UNLESS param3 exactly matches a venue slug
  if (!hasRegions && country) {
    // Only check venue slug if the query has completed
    if (venueCheck?.isVenue) {
      return <VenueProfile />;
    }
    // If venue check is still loading, wait for it
    if (venueLoading) {
      return (
        <Layout>
          <div className="container py-8">
            <div className="h-8 w-64 bg-muted animate-pulse rounded mb-4" />
            <div className="h-96 bg-muted animate-pulse rounded" />
          </div>
        </Layout>
      );
    }
    // Not a venue slug, show VenueFinder (city page, possibly empty)
    return <VenueFinder />;
  }

  // Wait for queries to complete for countries WITH regions
  if (regionLoading || cityLoading || venueLoading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="h-8 w-64 bg-muted animate-pulse rounded mb-4" />
          <div className="h-96 bg-muted animate-pulse rounded" />
        </div>
      </Layout>
    );
  }

  // If param3 is a region (for UK/USA) → show region page via VenueFinder
  if (regionCheck?.isRegion) {
    return <VenueFinder />;
  }

  // If param3 matches an exact venue slug → show venue page
  if (venueCheck?.isVenue) {
    return <VenueProfile />;
  }

  // If param3 is a city (has venues in this country) → show city page via VenueFinder
  if (cityCheck?.isCity) {
    return <VenueFinder />;
  }

  // For countries WITH regions where param3 doesn't match region/city/venue:
  // Show venue profile which will 404
  return <VenueProfile />;
}