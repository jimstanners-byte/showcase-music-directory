'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/supabasePagination";
import { haversineDistance, findCenterPoint } from "@/lib/geoUtils";
import { isCityRegion, getCityRegionProximityRadius, DEFAULT_CITY_PROXIMITY_KM } from "@/lib/cityRegions";

// =============================================================================
// SECURITY NOTE: All queries use listings_public view (no contact data)
// Venues are identified by having a venue_type value (not null)
// =============================================================================

// Tier ordering: premier (0) > enhanced (1) > free (2)
const TIER_ORDER: Record<string, number> = {
  premier: 0,
  enhanced: 1,
  free: 2,
};

export const VENUE_TYPES = [
  "Arena",
  "Amphitheatre",
  "Bar",
  "Club",
  "Concert Hall",
  "Convention Centre",
  "Cultural Centre",
  "Opera House",
  "Outdoor Venue",
  "Performing Arts Centre",
  "Stadium",
  "Theatre",
] as const;

export type VenueType = (typeof VENUE_TYPES)[number];

export interface VenueListing {
  id: string;
  name: string;
  slug: string;
  venue_type: string | null;
  venue_capacity: number | null;
  country: string | null;
  town_city: string | null;
  latitude: number | null;
  longitude: number | null;
  logo_url: string | null;
  tier: string;
  region_id?: number | null;
  region_slug?: string | null;
}

interface UseVenuesOptions {
  venueTypes?: string[];
  capacityMin?: number;
  capacityMax?: number;
  country?: string;
  regionId?: number;
  city?: string;
  continent?: string;
}

export function useVenues(options: UseVenuesOptions = {}) {
  const { venueTypes, capacityMin, capacityMax, country, regionId, city, continent } = options;

  return useQuery({
    queryKey: ["venues", venueTypes, capacityMin, capacityMax, country, regionId, city, continent],
    queryFn: async () => {
      // Determine if we need proximity filtering
      const needsCityProximityFilter = !!city && !!country;
      const needsRegionProximityFilter = !!regionId && !!country && !city;

      // Query venues directly - identified by having venue_type set
      const data = await fetchAllRows<{
        id: string;
        name: string;
        slug: string;
        venue_type: string | null;
        venue_capacity: number | null;
        country: string | null;
        town_city: string | null;
        latitude: number | null;
        longitude: number | null;
        logo_url: string | null;
        tier: string;
        region_id: number | null;
        continent: string | null;
      }>(() => {
        let query = supabase
          .from("listings_public")
          .select(
            `
            id,
            name,
            slug,
            venue_type,
            venue_capacity,
            country,
            town_city,
            latitude,
            longitude,
            logo_url,
            tier,
            region_id,
            continent
          `,
          )
          .not("venue_type", "is", null);

        // Add continent filter
        if (continent) {
          query = query.eq("continent", continent);
        }

        if (venueTypes && venueTypes.length > 0) {
          query = query.in("venue_type", venueTypes);
        }

        if (capacityMin !== undefined && capacityMin > 0) {
          query = query.gte("venue_capacity", capacityMin);
        }
        if (capacityMax !== undefined && capacityMax < 100000) {
          query = query.lte("venue_capacity", capacityMax);
        }

        if (country) {
          query = query.eq("country", country);
        }

        // For proximity filtering, we fetch broader dataset and filter client-side
        // For exact filtering, we filter at database level (more efficient)
        if (regionId && !needsRegionProximityFilter) {
          query = query.eq("region_id", regionId);
        }
        if (city && !needsCityProximityFilter) {
          query = query.eq("town_city", city);
        }

        return query;
      });

      // Apply proximity filtering if needed
      let filteredData = data;

      // CITY PROXIMITY FILTERING
      if (needsCityProximityFilter && city && country) {
        // Find center point of the city from venues in that city
        const cityVenues = data.filter((v) => v.town_city === city && v.latitude && v.longitude);

        if (cityVenues.length > 0) {
          const cityCenter = findCenterPoint(
            cityVenues.map((v) => ({ latitude: v.latitude!, longitude: v.longitude! })),
          );

          if (cityCenter) {
            const radiusKm = DEFAULT_CITY_PROXIMITY_KM;

            filteredData = data.filter((venue) => {
              // Always include exact city matches
              if (venue.town_city === city) return true;

              // Filter others by proximity
              if (!venue.latitude || !venue.longitude) return false;

              const distance = haversineDistance(
                cityCenter.latitude,
                cityCenter.longitude,
                venue.latitude,
                venue.longitude,
              );

              return distance <= radiusKm;
            });
          } else {
            // Fallback to exact match if we can't determine city center
            filteredData = data.filter((v) => v.town_city === city);
          }
        } else {
          // No venues with coordinates in this city - use exact match
          filteredData = data.filter((v) => v.town_city === city);
        }
      }

      // REGION PROXIMITY FILTERING (for city-regions like London, NYC)
      if (needsRegionProximityFilter && regionId && country) {
        // Check if this region is a city-region that needs proximity
        const { data: regionData } = await supabase
          .from("regions")
          .select("region_slug, latitude, longitude")
          .eq("id", regionId)
          .single();

        if (regionData && isCityRegion(country, regionData.region_slug)) {
          // This is a city-region - apply proximity
          if (regionData.latitude && regionData.longitude) {
            const radiusKm = getCityRegionProximityRadius(country, regionData.region_slug);

            filteredData = data.filter((venue) => {
              // Always include venues explicitly in this region
              if (venue.region_id === regionId) return true;

              // Filter others by proximity
              if (!venue.latitude || !venue.longitude) return false;

              const distance = haversineDistance(
                regionData.latitude,
                regionData.longitude,
                venue.latitude,
                venue.longitude,
              );

              return distance <= radiusKm;
            });
          } else {
            // Region doesn't have coordinates - fallback to exact match
            filteredData = data.filter((v) => v.region_id === regionId);
          }
        } else {
          // Not a city-region - use exact region match
          filteredData = data.filter((v) => v.region_id === regionId);
        }
      }

      // Get region slugs for venues that have region_id
      const regionIds = [...new Set(filteredData.filter((v) => v.region_id).map((v) => v.region_id))] as number[];
      let regionMap: Record<number, string> = {};

      if (regionIds.length > 0) {
        const { data: regions } = await supabase.from("regions").select("id, region_slug").in("id", regionIds);

        if (regions) {
          regionMap = Object.fromEntries(regions.map((r) => [r.id, r.region_slug]));
        }
      }

      // Add region_slug and sort by tier (premier > enhanced > free), then name
      return filteredData
        .map((v) => ({
          ...v,
          region_slug: v.region_id ? regionMap[v.region_id] || null : null,
        }))
        .sort((a, b) => {
          const tierA = TIER_ORDER[a.tier] ?? 2;
          const tierB = TIER_ORDER[b.tier] ?? 2;
          if (tierA !== tierB) return tierA - tierB;
          return (a.name || "").localeCompare(b.name || "");
        }) as VenueListing[];
    },
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes - prevents refetch on focus/mount
  });
}

export function useVenueCountries(continent?: string) {
  return useQuery({
    queryKey: ["venue-countries", continent],
    queryFn: async () => {
      // Query venues directly - identified by having venue_type set
      const data = await fetchAllRows<{ id: string; country: string | null; continent: string | null }>(() => {
        let query = supabase
          .from("listings_public")
          .select("id, country, continent")
          .not("venue_type", "is", null)
          .not("country", "is", null);

        // Filter by continent at database level
        if (continent) {
          query = query.eq("continent", continent);
        }

        return query;
      });

      const countMap = new Map<string, number>();
      data.forEach((item) => {
        if (item.country) {
          countMap.set(item.country, (countMap.get(item.country) || 0) + 1);
        }
      });

      return Array.from(countMap.entries())
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => a.country.localeCompare(b.country));
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes - country list rarely changes
  });
}

// Get regions that have venues for a specific country
export function useVenueRegionsByCountry(country?: string) {
  return useQuery({
    queryKey: ["venue-regions-by-country", country],
    queryFn: async () => {
      if (!country) return [];

      // Query venues directly - identified by having venue_type set
      const data = await fetchAllRows<{ id: string; region_id: number | null }>(() =>
        supabase
          .from("listings_public")
          .select("id, region_id")
          .not("venue_type", "is", null)
          .eq("country", country)
          .not("region_id", "is", null),
      );

      // Get unique region IDs that have venues
      const regionIds = [...new Set(data.map((v) => v.region_id).filter(Boolean))] as number[];

      if (regionIds.length === 0) return [];

      // Fetch region details
      const { data: regions } = await supabase
        .from("regions")
        .select("id, region_name, region_slug")
        .in("id", regionIds)
        .order("region_name");

      return regions || [];
    },
    enabled: !!country,
    staleTime: 5 * 60 * 1000,
  });
}

// Get cities that have venues for a specific country (no region filter)
export function useVenueCitiesByCountry(country?: string) {
  return useQuery({
    queryKey: ["venue-cities-by-country", country],
    queryFn: async () => {
      if (!country) return [];

      // Query venues directly - identified by having venue_type set
      const data = await fetchAllRows<{ id: string; town_city: string | null }>(() =>
        supabase
          .from("listings_public")
          .select("id, town_city")
          .not("venue_type", "is", null)
          .eq("country", country)
          .not("town_city", "is", null),
      );

      // Get unique cities
      const cities = [...new Set(data.map((v) => v.town_city).filter(Boolean))] as string[];

      return cities.sort((a, b) => a.localeCompare(b));
    },
    enabled: !!country,
    staleTime: 5 * 60 * 1000,
  });
}

// Get cities that have venues for a specific region
export function useVenueCitiesByRegion(regionId?: number) {
  return useQuery({
    queryKey: ["venue-cities-by-region", regionId],
    queryFn: async () => {
      if (!regionId) return [];

      // Query venues directly - identified by having venue_type set
      const data = await fetchAllRows<{ id: string; town_city: string | null }>(() =>
        supabase
          .from("listings_public")
          .select("id, town_city")
          .not("venue_type", "is", null)
          .eq("region_id", regionId)
          .not("town_city", "is", null),
      );

      // Get unique cities
      const cities = [...new Set(data.map((v) => v.town_city).filter(Boolean))] as string[];

      return cities.sort((a, b) => a.localeCompare(b));
    },
    enabled: !!regionId,
    staleTime: 5 * 60 * 1000,
  });
}
