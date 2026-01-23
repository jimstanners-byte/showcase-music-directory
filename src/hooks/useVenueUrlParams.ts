'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { useVenueCountries } from './useVenues';
import { useRegionsByCountry, useCitiesByRegion, useCitiesByCountry } from './useListings';
import { getContinentFromSlug } from '@/lib/continents';
import { fromSlug, fromCountrySlug, countryHasRegions } from '@/lib/venueUrlUtils';

interface VenueUrlParams {
  continent: string | null;
  country: string | null;
  regionId: number | null;
  regionSlug: string | null;
  city: string | null;
  isLoading: boolean;
}

export function useVenueUrlParams(): VenueUrlParams {
  const params = useParams<{
    continent?: string;
    country?: string;
    regionOrCity?: string;
    region?: string;
    city?: string;
  }>();

  const { 
    continent: continentSlug, 
    country: countrySlug, 
    regionOrCity, 
    region: regionSlug, 
    city: citySlug 
  } = params;

  // Resolve continent
  const continent = continentSlug ? getContinentFromSlug(continentSlug) : null;

  // Get all venue countries to resolve country slug
  const { data: allCountries, isLoading: countriesLoading } = useVenueCountries();

  // Resolve country from slug (with alias support)
  const country = useMemo(() => {
    if (!countrySlug || !allCountries) return null;
    const countryNames = allCountries.map(c => c.country);
    return fromCountrySlug(countrySlug, countryNames);
  }, [countrySlug, allCountries]);

  // Get regions for country (if applicable)
  const { data: regions, isLoading: regionsLoading } = useRegionsByCountry(country || undefined);

  // Determine if regionOrCity is a region or a city
  const { resolvedRegionId, resolvedRegionSlug, resolvedCity, needsCityLookup } = useMemo(() => {
    // If we have explicit region and city params (4-segment URL)
    if (regionSlug && citySlug) {
      const region = regions?.find(r => r.region_slug === regionSlug);
      return {
        resolvedRegionId: region?.id || null,
        resolvedRegionSlug: regionSlug,
        resolvedCity: citySlug, // Will be resolved below
        needsCityLookup: true
      };
    }

    // If we have regionOrCity (3-segment URL), determine what it is
    if (regionOrCity && country) {
      // Check if country has regions
      if (countryHasRegions(country) && regions) {
        // Try to match as region first
        const region = regions.find(r => r.region_slug === regionOrCity);
        if (region) {
          return {
            resolvedRegionId: region.id,
            resolvedRegionSlug: regionOrCity,
            resolvedCity: null,
            needsCityLookup: false
          };
        }
      }
      // It's a city (either country has no regions, or regionOrCity didn't match a region)
      return {
        resolvedRegionId: null,
        resolvedRegionSlug: null,
        resolvedCity: regionOrCity,
        needsCityLookup: true
      };
    }

    return {
      resolvedRegionId: null,
      resolvedRegionSlug: null,
      resolvedCity: null,
      needsCityLookup: false
    };
  }, [regionOrCity, regionSlug, citySlug, country, regions]);

  // Get cities to resolve city slug
  const { data: citiesByRegion } = useCitiesByRegion(resolvedRegionId || undefined);
  const { data: citiesByCountry } = useCitiesByCountry(undefined, country || undefined);
  const cities = resolvedRegionId ? citiesByRegion : citiesByCountry;

  // Resolve city name from slug
  const city = useMemo(() => {
    if (!needsCityLookup || !resolvedCity || !cities) return null;
    return fromSlug(resolvedCity, cities);
  }, [needsCityLookup, resolvedCity, cities]);

  const isLoading = countriesLoading || regionsLoading;

  return {
    continent,
    country,
    regionId: resolvedRegionId,
    regionSlug: resolvedRegionSlug,
    city: needsCityLookup ? city : null,
    isLoading
  };
}
