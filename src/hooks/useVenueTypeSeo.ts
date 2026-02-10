'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/supabasePagination";
import { continentToSlug, countryToSlug, cityToSlug } from "@/lib/locationUtils";

export interface VenueTypeSeo {
  id: string;
  venue_type: string;
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
 * Hook to fetch venue type SEO data with cascading fallback
 * 
 * Accepts either display names or slugs for location parameters - 
 * internally converts to slugs for database matching.
 * 
 * Note: venue_type is stored as display name in database (e.g., "Arena")
 * 
 * Cascading priority (most specific to least):
 * 1. venue_type + continent + country + region + city
 * 2. venue_type + continent + country + region
 * 3. venue_type + continent + country
 * 4. venue_type + continent
 * 5. venue_type only
 */
export const useVenueTypeSeo = (
  venueType: string | null,
  continent: string | null,
  country: string | null,
  regionSlug: string | null,
  city: string | null
) => {
  return useQuery({
    queryKey: ["venue-type-seo", venueType, continent, country, regionSlug, city],
    queryFn: async () => {
      if (!venueType) return null;

      // Convert location inputs to slugs for database matching
      const continentSlug = continentToSlug(continent);
      const countrySlugNorm = countryToSlug(country);
      const regionSlugNorm = regionSlug ? regionSlug.toLowerCase() : null; // Already a slug
      const citySlug = cityToSlug(city);

      // venue_type is stored as display name, so use ilike for case-insensitive match
      const { data: allOverrides, error } = await supabase
        .from("venue_type_seo")
        .select("*")
        .ilike("venue_type", venueType);

      if (error) throw error;
      if (!allOverrides || allOverrides.length === 0) return null;

      // Try most specific match first (city level), then cascade up

      // 1. Exact match with city
      if (citySlug) {
        const cityMatch = allOverrides.find(o =>
          o.continent === continentSlug &&
          o.country === countrySlugNorm &&
          o.city === citySlug &&
          (regionSlugNorm ? o.region_slug === regionSlugNorm : !o.region_slug)
        );
        if (cityMatch) return cityMatch as VenueTypeSeo;
      }

      // 2. Region level (city null)
      if (regionSlugNorm) {
        const regionMatch = allOverrides.find(o =>
          o.continent === continentSlug &&
          o.country === countrySlugNorm &&
          o.region_slug === regionSlugNorm &&
          !o.city
        );
        if (regionMatch) return regionMatch as VenueTypeSeo;
      }

      // 3. Country level (region and city null)
      if (countrySlugNorm) {
        const countryMatch = allOverrides.find(o =>
          o.continent === continentSlug &&
          o.country === countrySlugNorm &&
          !o.region_slug &&
          !o.city
        );
        if (countryMatch) return countryMatch as VenueTypeSeo;
      }

      // 4. Continent level (country, region, city null)
      if (continentSlug) {
        const continentMatch = allOverrides.find(o =>
          o.continent === continentSlug &&
          !o.country &&
          !o.region_slug &&
          !o.city
        );
        if (continentMatch) return continentMatch as VenueTypeSeo;
      }

      // 5. Type-only (all location fields null)
      const typeOnlyMatch = allOverrides.find(o =>
        !o.continent &&
        !o.country &&
        !o.region_slug &&
        !o.city
      );
      
      return (typeOnlyMatch as VenueTypeSeo) ?? null;
    },
    enabled: !!venueType,
  });
};

/**
 * Hook to fetch all venue type SEO records (for admin)
 * Uses pagination to bypass Supabase's 1000 row limit
 * 
 * FIX: Added .order("id") as tie-breaker to ensure deterministic ordering
 * across pagination boundaries. Without this, rows with the same venue_type
 * and created_at could appear in multiple pages.
 */
export const useAllVenueTypeSeo = () => {
  return useQuery({
    queryKey: ["venue-type-seo-all"],
    queryFn: async () => {
      const data = await fetchAllRows<VenueTypeSeo>(
        () => supabase
          .from("venue_type_seo")
          .select("*")
          .order("venue_type", { ascending: true })
          .order("created_at", { ascending: false })
          .order("id", { ascending: true })  // Tie-breaker for deterministic pagination
      );
      return data;
    },
  });
};
