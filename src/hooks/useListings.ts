'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Listing, ListingPublic, ListingTier } from "@/types/database";
import { stripLocationFromQuery, isOnlyLocation } from "@/lib/searchUtils";
import { fetchAllRows } from "@/lib/supabasePagination";
import { CONTINENT_COUNTRIES } from "@/lib/continents";
import { haversineDistance, findCenterPoint } from "@/lib/geoUtils";
import { isCityRegion, getCityRegionProximityRadius, DEFAULT_CITY_PROXIMITY_KM } from "@/lib/cityRegions";

interface UseListingsOptions {
  categoryId?: string;
  continent?: string;
  country?: string;
  regionId?: number;
  city?: string;
  letter?: string;
  searchQuery?: string;
}

const TIER_ORDER: Record<ListingTier, number> = {
  premier: 0,
  enhanced: 1,
  free: 2,
};

// =============================================================================
// SECURITY NOTE: All bulk queries use listings_public view (no contact data)
// Single-listing queries use get_listing_by_slug RPC (includes contact data)
// =============================================================================

export function useListings(options: UseListingsOptions = {}) {
  const { categoryId, continent, country, regionId, city, letter, searchQuery } = options;

  return useQuery({
    queryKey: ["listings", options],
    queryFn: async () => {
      // Determine if we need proximity filtering
      const needsCityProximityFilter = !!city && city !== "all" && !!country;
      const needsRegionProximityFilter = !!regionId && !!country && !city;

      // Use RPC for category-based queries to avoid URI length issues with large IN clauses
      if (categoryId) {
        // For proximity filtering, we need to fetch broader and filter client-side
        // Otherwise, let RPC do the filtering (more efficient)
        const { data, error } = await supabase.rpc("get_listings_by_category", {
          p_category_id: categoryId,
          p_limit: 100000,
          p_offset: 0,
          p_country: country && country !== "all" ? country : null,
          p_region_id: needsRegionProximityFilter ? null : regionId || null, // Don't filter by region if doing proximity
          p_city: needsCityProximityFilter ? null : city && city !== "all" ? city : null, // Don't filter by city if doing proximity
        });

        if (error) throw error;

        let listings = (data || []) as ListingPublic[];

        // Apply continent filter client-side (RPC doesn't support it yet)
        if (continent && !country) {
          const continentCountries = CONTINENT_COUNTRIES[continent] || [];
          listings = listings.filter((l) => l.country && continentCountries.includes(l.country));
        }

        // CITY PROXIMITY FILTERING (for category searches)
        if (needsCityProximityFilter && city && country) {
          const cityListings = listings.filter((l) => l.town_city === city && l.latitude && l.longitude);

          if (cityListings.length > 0) {
            const cityCenter = findCenterPoint(
              cityListings.map((l) => ({ latitude: l.latitude!, longitude: l.longitude! })),
            );

            if (cityCenter) {
              const radiusKm = DEFAULT_CITY_PROXIMITY_KM;

              listings = listings.filter((listing) => {
                // Always include exact city matches
                if (listing.town_city === city) return true;

                // Filter others by proximity
                if (!listing.latitude || !listing.longitude) return false;

                const distance = haversineDistance(
                  cityCenter.latitude,
                  cityCenter.longitude,
                  listing.latitude,
                  listing.longitude,
                );

                return distance <= radiusKm;
              });
            } else {
              // Fallback to exact match
              listings = listings.filter((l) => l.town_city === city);
            }
          } else {
            // No listings with coordinates - exact match
            listings = listings.filter((l) => l.town_city === city);
          }
        }

        // REGION PROXIMITY FILTERING (for city-regions like London, NYC)
        if (needsRegionProximityFilter && regionId && country) {
          const { data: regionData } = await supabase
            .from("regions")
            .select("region_slug, latitude, longitude")
            .eq("id", regionId)
            .single();

          if (regionData && isCityRegion(country, regionData.region_slug)) {
            if (regionData.latitude && regionData.longitude) {
              const radiusKm = getCityRegionProximityRadius(country, regionData.region_slug);

              listings = listings.filter((listing) => {
                // Always include listings explicitly in this region
                if (listing.region_id === regionId) return true;

                // Filter others by proximity
                if (!listing.latitude || !listing.longitude) return false;

                const distance = haversineDistance(
                  regionData.latitude,
                  regionData.longitude,
                  listing.latitude,
                  listing.longitude,
                );

                return distance <= radiusKm;
              });
            } else {
              // Region doesn't have coordinates - exact match
              listings = listings.filter((l) => l.region_id === regionId);
            }
          } else {
            // Not a city-region - exact region match
            listings = listings.filter((l) => l.region_id === regionId);
          }
        }

        // Apply letter filter client-side (RPC doesn't support it)
        if (letter) {
          listings = listings.filter((l) => l.name.toLowerCase().startsWith(letter.toLowerCase()));
        }

        // Apply search filter client-side
        if (searchQuery) {
          const strippedQuery = stripLocationFromQuery(searchQuery);
          if (strippedQuery && !isOnlyLocation(searchQuery)) {
            const lowerQuery = strippedQuery.toLowerCase();
            listings = listings.filter((l) => l.name.toLowerCase().includes(lowerQuery));
          }
        }

        return listings;
      }

      // Non-category queries use listings_public view (no sensitive data)
      const data = await fetchAllRows<ListingPublic>(() => {
        let query = supabase.from("listings_public").select("*");

        if (country && country !== "all") {
          query = query.eq("country", country);
        }

        // For proximity filtering, we fetch broader and filter client-side
        if (regionId && !needsRegionProximityFilter) {
          query = query.eq("region_id", regionId);
        }

        if (city && city !== "all" && !needsCityProximityFilter) {
          query = query.eq("town_city", city);
        }

        if (letter) {
          query = query.ilike("name", `${letter}%`);
        }

        if (searchQuery) {
          const strippedQuery = stripLocationFromQuery(searchQuery);
          if (strippedQuery && !isOnlyLocation(searchQuery)) {
            query = query.ilike("name", `%${strippedQuery}%`);
          }
        }

        return query.order("name");
      });

      let listings = data;

      // CITY PROXIMITY FILTERING (for non-category searches)
      if (needsCityProximityFilter && city && country) {
        const cityListings = listings.filter((l) => l.town_city === city && l.latitude && l.longitude);

        if (cityListings.length > 0) {
          const cityCenter = findCenterPoint(
            cityListings.map((l) => ({ latitude: l.latitude!, longitude: l.longitude! })),
          );

          if (cityCenter) {
            const radiusKm = DEFAULT_CITY_PROXIMITY_KM;

            listings = listings.filter((listing) => {
              // Always include exact city matches
              if (listing.town_city === city) return true;

              // Filter others by proximity
              if (!listing.latitude || !listing.longitude) return false;

              const distance = haversineDistance(
                cityCenter.latitude,
                cityCenter.longitude,
                listing.latitude,
                listing.longitude,
              );

              return distance <= radiusKm;
            });
          } else {
            // Fallback to exact match
            listings = listings.filter((l) => l.town_city === city);
          }
        } else {
          // No listings with coordinates - exact match
          listings = listings.filter((l) => l.town_city === city);
        }
      }

      // REGION PROXIMITY FILTERING (for city-regions like London, NYC)
      if (needsRegionProximityFilter && regionId && country) {
        const { data: regionData } = await supabase
          .from("regions")
          .select("region_slug, latitude, longitude")
          .eq("id", regionId)
          .single();

        if (regionData && isCityRegion(country, regionData.region_slug)) {
          if (regionData.latitude && regionData.longitude) {
            const radiusKm = getCityRegionProximityRadius(country, regionData.region_slug);

            listings = listings.filter((listing) => {
              // Always include listings explicitly in this region
              if (listing.region_id === regionId) return true;

              // Filter others by proximity
              if (!listing.latitude || !listing.longitude) return false;

              const distance = haversineDistance(
                regionData.latitude,
                regionData.longitude,
                listing.latitude,
                listing.longitude,
              );

              return distance <= radiusKm;
            });
          } else {
            // Region doesn't have coordinates - exact match
            listings = listings.filter((l) => l.region_id === regionId);
          }
        } else {
          // Not a city-region - exact region match
          listings = listings.filter((l) => l.region_id === regionId);
        }
      }

      // Sort by tier (premier -> enhanced -> free), then alphabetically
      listings = listings.sort((a, b) => {
        const tierDiff = TIER_ORDER[a.tier] - TIER_ORDER[b.tier];
        if (tierDiff !== 0) return tierDiff;
        return a.name.localeCompare(b.name);
      });

      return listings;
    },
  });
}

// Uses RPC function to get single listing WITH contact data (secure single-record access)
export function useListingBySlug(slug: string, initialData?: any) {
  return useQuery({
    queryKey: ["listing", slug],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_listing_by_slug" as any, {
        p_slug: slug,
      });

      if (error) throw error;

      // RPC returns an array, get first item
      const listing = Array.isArray(data) ? data[0] : data;
      return listing as Listing | null;
    },
    enabled: !!slug,
    initialData,
  });
}

export function useListingLocations(categoryId?: string) {
  return useQuery({
    queryKey: ["listing-locations", categoryId],
    queryFn: async () => {
      let categoryListingIds: string[] | null = null;
      if (categoryId) {
        const { data: listingIds } = await supabase
          .from("listing_categories")
          .select("listing_id")
          .eq("category_id", categoryId);

        if (listingIds && listingIds.length > 0) {
          categoryListingIds = listingIds.map((l) => l.listing_id);
        }
      }

      // Use listings_public view
      const data = await fetchAllRows<{ country: string | null; town_city: string | null }>(() => {
        let query = supabase.from("listings_public").select("country, town_city");

        if (categoryListingIds) {
          query = query.in("id", categoryListingIds);
        }

        return query;
      });

      const countries = [...new Set(data.map((d) => d.country).filter(Boolean))] as string[];
      const cities = [...new Set(data.map((d) => d.town_city).filter(Boolean))] as string[];

      return { countries: countries.sort(), cities: cities.sort() };
    },
  });
}

export function useCitiesByCountry(categoryId?: string, country?: string) {
  return useQuery({
    queryKey: ["cities-by-country", categoryId, country],
    queryFn: async () => {
      if (!country) return [];

      let categoryListingIds: string[] | null = null;
      if (categoryId) {
        const { data: listingIds } = await supabase
          .from("listing_categories")
          .select("listing_id")
          .eq("category_id", categoryId);

        if (listingIds && listingIds.length > 0) {
          categoryListingIds = listingIds.map((l) => l.listing_id);
        } else {
          return [];
        }
      }

      // Use listings_public view
      const data = await fetchAllRows<{ town_city: string | null }>(() => {
        let query = supabase.from("listings_public").select("town_city").eq("country", country);

        if (categoryListingIds) {
          query = query.in("id", categoryListingIds);
        }

        return query;
      });

      const cities = [...new Set(data.map((d) => d.town_city).filter(Boolean))] as string[];
      return cities.sort();
    },
    enabled: !!country,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGlobalCitiesByCountry(country?: string) {
  return useQuery({
    queryKey: ["global-cities-by-country", country],
    queryFn: async () => {
      if (!country) return [];

      // Use listings_public view
      const data = await fetchAllRows<{ town_city: string | null }>(() =>
        supabase.from("listings_public").select("town_city").eq("country", country),
      );

      const cities = [...new Set(data.map((d) => d.town_city).filter(Boolean))] as string[];
      return cities.sort();
    },
    enabled: !!country,
  });
}

function normalizeCountryForRegions(country: string): string {
  if (country === "United States" || country === "US") {
    return "USA";
  }
  if (country === "United Kingdom") {
    return "UK";
  }
  return country;
}

export function useRegionsByCountry(country?: string, categoryId?: string) {
  return useQuery({
    queryKey: ["regions-by-country", country, categoryId],
    queryFn: async () => {
      if (!country) return [];

      const regionCountry = normalizeCountryForRegions(country);

      let categoryListingIds: string[] | null = null;
      if (categoryId) {
        const { data: listingIds } = await supabase
          .from("listing_categories")
          .select("listing_id")
          .eq("category_id", categoryId);

        if (listingIds && listingIds.length > 0) {
          categoryListingIds = listingIds.map((l) => l.listing_id);
        } else {
          return [];
        }
      }

      // Use listings_public view
      const listingsWithRegions = await fetchAllRows<{ region_id: number | null }>(() => {
        let query = supabase.from("listings_public").select("region_id").not("region_id", "is", null);

        if (categoryListingIds) {
          query = query.in("id", categoryListingIds);
        }

        return query;
      });

      const regionIds = [...new Set(listingsWithRegions?.map((l) => l.region_id).filter(Boolean))] as number[];

      if (regionIds.length === 0) return [];

      const { data, error } = await supabase
        .from("regions")
        .select("id, region_name, region_slug")
        .eq("country", regionCountry)
        .in("id", regionIds)
        .order("region_name");

      if (error) throw error;
      return data || [];
    },
    enabled: !!country,
  });
}

export function useCitiesByRegion(regionId?: number, categoryId?: string) {
  return useQuery({
    queryKey: ["cities-by-region", regionId, categoryId],
    queryFn: async () => {
      if (!regionId) return [];

      let categoryListingIds: string[] | null = null;
      if (categoryId) {
        const { data: listingIds } = await supabase
          .from("listing_categories")
          .select("listing_id")
          .eq("category_id", categoryId);

        if (listingIds && listingIds.length > 0) {
          categoryListingIds = listingIds.map((l) => l.listing_id);
        } else {
          return [];
        }
      }

      // Use listings_public view
      const data = await fetchAllRows<{ town_city: string | null }>(() => {
        let query = supabase.from("listings_public").select("town_city").eq("region_id", regionId);

        if (categoryListingIds) {
          query = query.in("id", categoryListingIds);
        }

        return query;
      });

      const cities = [...new Set(data.map((d) => d.town_city).filter(Boolean))] as string[];
      return cities.sort();
    },
    enabled: !!regionId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useFeaturedListings() {
  return useQuery({
    queryKey: ["featured-listings"],
    queryFn: async () => {
      const { data: featuredSlots, error: slotsError } = await supabase
        .from("homepage_featured_listings")
        .select("position, listing_id")
        .order("position");

      if (slotsError) throw slotsError;

      const selectedIds = featuredSlots?.filter((slot) => slot.listing_id).map((slot) => slot.listing_id) as string[];

      if (selectedIds && selectedIds.length > 0) {
        // Use listings_public view
        const { data: listings, error: listingsError } = await supabase
          .from("listings_public")
          .select("*")
          .in("id", selectedIds);

        if (listingsError) throw listingsError;

        const sortedListings = selectedIds
          .map((id) => listings?.find((l) => l.id === id))
          .filter(Boolean) as ListingPublic[];

        return sortedListings;
      }

      // Use listings_public view
      const { data, error } = await supabase
        .from("listings_public")
        .select("*")
        .eq("tier", "premier")
        .limit(6)
        .order("name");

      if (error) throw error;
      return data as ListingPublic[];
    },
  });
}

export function useListingCategories(listingId?: string, initialData?: any[]) {
  return useQuery({
    queryKey: ["listing-categories", listingId],
    queryFn: async () => {
      if (!listingId) return [];

      const { data, error } = await supabase
        .from("listing_categories")
        .select("category_id, categories(*)")
        .eq("listing_id", listingId);

      if (error) throw error;

      return data?.map((lc) => lc.categories).filter(Boolean) as import("@/types/database").Category[];
    },
    enabled: !!listingId,
    initialData,
  });
}

// Uses listings_public view - NO contact data returned
export function useListingsByIds(ids: string[]) {
  return useQuery({
    queryKey: ["listings", "by-ids", ids],
    queryFn: async () => {
      if (ids.length === 0) return [];
      // Use listings_public view - contact data will need separate fetch if needed
      const { data, error } = await supabase.from("listings_public").select("*").in("id", ids);
      if (error) throw error;
      return data as ListingPublic[];
    },
    enabled: ids.length > 0,
  });
}

export function useCountryCounts() {
  return useQuery({
    queryKey: ["country-counts"],
    queryFn: async () => {
      // Use listings_public view
      const data = await fetchAllRows<{ country: string | null }>(() =>
        supabase.from("listings_public").select("country"),
      );

      const counts: Record<string, number> = {};
      data.forEach((d) => {
        if (d.country) {
          counts[d.country] = (counts[d.country] || 0) + 1;
        }
      });
      return counts;
    },
  });
}

export function useCategoryCountryCounts(categoryId?: string) {
  return useQuery({
    queryKey: ["category-country-counts", categoryId],
    queryFn: async () => {
      if (!categoryId) return {};

      const { data: listingIds } = await supabase
        .from("listing_categories")
        .select("listing_id")
        .eq("category_id", categoryId);

      if (!listingIds || listingIds.length === 0) return {};

      // Use listings_public view
      const data = await fetchAllRows<{ country: string | null }>(() =>
        supabase
          .from("listings_public")
          .select("country")
          .in(
            "id",
            listingIds.map((l) => l.listing_id),
          ),
      );

      const counts: Record<string, number> = {};
      data.forEach((d) => {
        if (d.country) {
          counts[d.country] = (counts[d.country] || 0) + 1;
        }
      });
      return counts;
    },
    enabled: !!categoryId,
  });
}

export function useRegionCounts(country?: string) {
  return useQuery({
    queryKey: ["region-counts", country],
    queryFn: async () => {
      if (!country) return {};

      // Use listings_public view
      const data = await fetchAllRows<{ region_id: number | null }>(() =>
        supabase.from("listings_public").select("region_id").eq("country", country).not("region_id", "is", null),
      );

      const counts: Record<number, number> = {};
      data.forEach((d) => {
        if (d.region_id) {
          counts[d.region_id] = (counts[d.region_id] || 0) + 1;
        }
      });
      return counts;
    },
    enabled: !!country,
  });
}

export function useCategoryRegionCounts(country?: string, categoryId?: string) {
  return useQuery({
    queryKey: ["category-region-counts", country, categoryId],
    queryFn: async () => {
      if (!country) return {};

      let categoryListingIds: string[] | null = null;
      if (categoryId) {
        const { data: listingIds } = await supabase
          .from("listing_categories")
          .select("listing_id")
          .eq("category_id", categoryId);

        if (!listingIds || listingIds.length === 0) return {};
        categoryListingIds = listingIds.map((l) => l.listing_id);
      }

      // Use listings_public view
      const data = await fetchAllRows<{ region_id: number | null }>(() => {
        let query = supabase
          .from("listings_public")
          .select("region_id")
          .eq("country", country)
          .not("region_id", "is", null);

        if (categoryListingIds) {
          query = query.in("id", categoryListingIds);
        }

        return query;
      });

      const counts: Record<number, number> = {};
      data.forEach((d) => {
        if (d.region_id) {
          counts[d.region_id] = (counts[d.region_id] || 0) + 1;
        }
      });
      return counts;
    },
    enabled: !!country,
  });
}

// Continent counts for a specific category
export function useCategoryContinentCounts(categoryId?: string) {
  return useQuery({
    queryKey: ["category-continent-counts", categoryId],
    queryFn: async () => {
      if (!categoryId) return {};

      const { data: listingIds } = await supabase
        .from("listing_categories")
        .select("listing_id")
        .eq("category_id", categoryId);

      if (!listingIds || listingIds.length === 0) return {};

      // Use listings_public view
      const data = await fetchAllRows<{ continent: string | null }>(() =>
        supabase
          .from("listings_public")
          .select("continent")
          .in(
            "id",
            listingIds.map((l) => l.listing_id),
          ),
      );

      const counts: Record<string, number> = {};
      data.forEach((d) => {
        if (d.continent) {
          counts[d.continent] = (counts[d.continent] || 0) + 1;
        }
      });
      return counts;
    },
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
  });
}

// Total listing count for a category
export function useCategoryTotalCount(categoryId?: string) {
  return useQuery({
    queryKey: ["category-total-count", categoryId],
    queryFn: async () => {
      if (!categoryId) return 0;

      const { count, error } = await supabase
        .from("listing_categories")
        .select("*", { count: "exact", head: true })
        .eq("category_id", categoryId);

      if (error) throw error;
      return count || 0;
    },
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
  });
}

// Countries by continent for a category
export function useCategoryCountriesByContinent(categoryId?: string, continent?: string) {
  return useQuery({
    queryKey: ["category-countries-by-continent", categoryId, continent],
    queryFn: async () => {
      if (!categoryId || !continent) return [];

      const { data: listingIds } = await supabase
        .from("listing_categories")
        .select("listing_id")
        .eq("category_id", categoryId);

      if (!listingIds || listingIds.length === 0) return [];

      // Use listings_public view
      const data = await fetchAllRows<{ country: string | null }>(() =>
        supabase
          .from("listings_public")
          .select("country")
          .eq("continent", continent)
          .in(
            "id",
            listingIds.map((l) => l.listing_id),
          ),
      );

      const countries = [...new Set(data.map((d) => d.country).filter(Boolean))] as string[];
      return countries.sort();
    },
    enabled: !!categoryId && !!continent,
    staleTime: 5 * 60 * 1000,
  });
}