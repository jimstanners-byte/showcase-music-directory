'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/supabasePagination";
import { countryToSlug, regionToSlug, cityToSlug } from "@/lib/locationUtils";

export interface CategoryLocationSeo {
  id: string;
  category_id: string;
  country: string | null;
  region: string | null;
  city: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  intro_text: string | null;
  seo_title: string | null;
  h1_override: string | null;
  h2_override: string | null;
  about_heading: string | null;
  about_content: string | null;
  created_at: string;
  updated_at: string;
  // Enriched from categories table lookup
  categories?: {
    url_slug: string | null;
    slug: string | null;
  } | null;
}

/**
 * Hook to fetch category location SEO data with cascading fallback
 * 
 * Accepts either display names or slugs for location parameters - 
 * internally converts to slugs for database matching.
 * 
 * Cascading priority (most specific to least):
 * 1. category + country + region + city
 * 2. category + country + region
 * 3. category + country + city (no region)
 * 4. category + country
 * 5. category only
 */
export const useCategoryLocationSeo = (
  categoryId: string | undefined,
  country: string | null,
  region: string | null,
  city: string | null
) => {
  return useQuery({
    queryKey: ["category-location-seo", categoryId, country, region, city],
    queryFn: async () => {
      if (!categoryId) return null;

      // Convert inputs to slugs for database matching
      const countrySlug = countryToSlug(country);
      const regionSlugNorm = regionToSlug(region);
      const citySlug = cityToSlug(city);

      // Fetch all overrides for this category
      const { data: allOverrides, error } = await supabase
        .from("category_location_seo")
        .select("*")
        .eq("category_id", categoryId);

      if (error) throw error;
      if (!allOverrides || allOverrides.length === 0) return null;

      // Priority 1: Exact match (category + country + region + city)
      if (countrySlug && regionSlugNorm && citySlug) {
        const exactMatch = allOverrides.find(o =>
          o.country === countrySlug &&
          o.region === regionSlugNorm &&
          o.city === citySlug
        );
        if (exactMatch) return exactMatch as CategoryLocationSeo;
      }

      // Priority 2: Region-level match (category + country + region, city = null)
      if (countrySlug && regionSlugNorm) {
        const regionMatch = allOverrides.find(o =>
          o.country === countrySlug &&
          o.region === regionSlugNorm &&
          !o.city
        );
        if (regionMatch) return regionMatch as CategoryLocationSeo;
      }

      // Priority 3: City-level match for countries without regions
      if (countrySlug && citySlug && !regionSlugNorm) {
        const cityMatch = allOverrides.find(o =>
          o.country === countrySlug &&
          !o.region &&
          o.city === citySlug
        );
        if (cityMatch) return cityMatch as CategoryLocationSeo;
      }

      // Priority 4: Country-level match (category + country, region = null, city = null)
      if (countrySlug) {
        const countryMatch = allOverrides.find(o =>
          o.country === countrySlug &&
          !o.region &&
          !o.city
        );
        if (countryMatch) return countryMatch as CategoryLocationSeo;
      }

      // Priority 5: Category-level match (category only, no location)
      const categoryMatch = allOverrides.find(o =>
        !o.country &&
        !o.region &&
        !o.city
      );
      if (categoryMatch) return categoryMatch as CategoryLocationSeo;

      // No custom content found
      return null;
    },
    enabled: !!categoryId,
  });
};

/**
 * Hook to fetch ALL category location SEO records (for admin dashboard)
 * 
 * Fetches SEO records and categories separately, then merges them.
 * This avoids issues with joins during pagination.
 * 
 * FIX: Added .order("id") as tie-breaker to ensure deterministic ordering
 * across pagination boundaries.
 */
export const useAllCategoryLocationSeo = () => {
  return useQuery({
    queryKey: ["category-location-seo-all"],
    queryFn: async () => {
      // Fetch all SEO records with deterministic ordering
      const seoData = await fetchAllRows<CategoryLocationSeo>(
        () => supabase
          .from("category_location_seo")
          .select("*")
          .order("created_at", { ascending: false })
          .order("id", { ascending: true })
      );

      if (!seoData || seoData.length === 0) return [];

      // Get unique category IDs
      const categoryIds = [...new Set(seoData.map(r => r.category_id).filter(Boolean))];

      // Fetch all relevant categories in one query
      const { data: categories, error } = await supabase
        .from("categories")
        .select("id, url_slug, slug")
        .in("id", categoryIds);

      if (error) {
        console.error("Error fetching categories:", error);
        return seoData; // Return without category info on error
      }

      // Create lookup map
      const categoryMap = new Map(
        categories?.map(c => [c.id, { url_slug: c.url_slug, slug: c.slug }]) || []
      );

      // Merge category info into SEO records
      return seoData.map(record => ({
        ...record,
        categories: categoryMap.get(record.category_id) || null
      }));
    },
  });
};