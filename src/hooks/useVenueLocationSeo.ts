'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/supabasePagination";
import { continentToSlug, countryToSlug, cityToSlug } from "@/lib/locationUtils";

export interface VenueLocationSeo {
  id: string;
  continent: string | null;
  country: string | null;
  region_slug: string | null;
  city: string | null;
  seo_title: string | null;
  h1_override: string | null;
  h2_override: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  intro_text: string | null;
  about_heading: string | null;
  about_content: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Hook to fetch venue location SEO data with cascading fallback
 * 
 * Accepts either display names or slugs for all parameters - 
 * internally converts to slugs for database matching.
 * 
 * Cascading priority (most specific to least):
 * 1. continent + country + region + city
 * 2. continent + country + city (no region)
 * 3. continent + country + region (no city)
 * 4. continent + country
 * 5. continent only
 */
export const useVenueLocationSeo = (
  continent: string | null,
  country: string | null,
  regionSlug: string | null,
  city: string | null
) => {
  return useQuery({
    queryKey: ["venue-location-seo", continent, country, regionSlug, city],
    queryFn: async () => {
      if (!continent) return null;

      // Convert inputs to slugs for database matching
      const continentSlug = continentToSlug(continent);
      const countrySlugNorm = countryToSlug(country);
      const regionSlugNorm = regionSlug ? regionSlug.toLowerCase() : null; // Already a slug
      const citySlug = cityToSlug(city);

      // Fetch all overrides for this continent
      const { data: allOverrides, error } = await supabase
        .from("venue_location_seo")
        .select("*")
        .eq("continent", continentSlug);

      if (error) throw error;
      if (!allOverrides || allOverrides.length === 0) return null;

      // Try most specific match first, then cascade to less specific
      
      // 1. Exact match: continent + country + region + city
      if (countrySlugNorm && regionSlugNorm && citySlug) {
        const exactMatch = allOverrides.find(o => 
          o.country === countrySlugNorm &&
          o.region_slug === regionSlugNorm &&
          o.city === citySlug
        );
        if (exactMatch) return exactMatch as VenueLocationSeo;
      }

      // 2. City without region: continent + country + city (region_slug = null)
      if (countrySlugNorm && citySlug && !regionSlugNorm) {
        const cityNoRegionMatch = allOverrides.find(o => 
          o.country === countrySlugNorm &&
          !o.region_slug &&
          o.city === citySlug
        );
        if (cityNoRegionMatch) return cityNoRegionMatch as VenueLocationSeo;
      }

      // 3. Region level: continent + country + region (city = null)
      if (countrySlugNorm && regionSlugNorm) {
        const regionMatch = allOverrides.find(o => 
          o.country === countrySlugNorm &&
          o.region_slug === regionSlugNorm &&
          !o.city
        );
        if (regionMatch) return regionMatch as VenueLocationSeo;
      }

      // 4. Country level: continent + country (region = null, city = null)
      if (countrySlugNorm) {
        const countryMatch = allOverrides.find(o => 
          o.country === countrySlugNorm &&
          !o.region_slug &&
          !o.city
        );
        if (countryMatch) return countryMatch as VenueLocationSeo;
      }

      // 5. Continent level: continent only (all other fields null)
      const continentMatch = allOverrides.find(o => 
        !o.country &&
        !o.region_slug &&
        !o.city
      );

      return continentMatch ? (continentMatch as VenueLocationSeo) : null;
    },
    enabled: !!continent,
  });
};

/**
 * Hook to fetch all venue location SEO records (for admin)
 * Uses pagination to bypass Supabase's 1000 row limit
 * 
 * FIX: Added .order("id") as tie-breaker to ensure deterministic ordering
 * across pagination boundaries. Without this, rows with the same created_at
 * could appear in multiple pages.
 */
export const useAllVenueLocationSeo = () => {
  return useQuery({
    queryKey: ["venue-location-seo-all"],
    queryFn: async () => {
      const data = await fetchAllRows<VenueLocationSeo>(
        () => supabase
          .from("venue_location_seo")
          .select("*")
          .order("created_at", { ascending: false })
          .order("id", { ascending: true })  // Tie-breaker for deterministic pagination
      );
      return data;
    },
  });
};
