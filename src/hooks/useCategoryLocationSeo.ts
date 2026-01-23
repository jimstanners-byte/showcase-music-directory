'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/supabasePagination";

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
}

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

      // Priority 1: Exact match (category + country + region + city)
      if (country && region && city) {
        const { data: exactMatch } = await supabase
          .from("category_location_seo")
          .select("*")
          .eq("category_id", categoryId)
          .eq("country", country)
          .eq("region", region)
          .eq("city", city)
          .limit(1);

        if (exactMatch && exactMatch.length > 0) return exactMatch[0] as CategoryLocationSeo;
      }

      // Priority 2: Region-level match (category + country + region, city = null)
      if (country && region) {
        const { data: regionMatch } = await supabase
          .from("category_location_seo")
          .select("*")
          .eq("category_id", categoryId)
          .eq("country", country)
          .eq("region", region)
          .is("city", null)
          .limit(1);

        if (regionMatch && regionMatch.length > 0) return regionMatch[0] as CategoryLocationSeo;
      }

      // Priority 3: City-level match for countries without regions (category + country + city, region = null)
      if (country && city && !region) {
        const { data: cityMatch } = await supabase
          .from("category_location_seo")
          .select("*")
          .eq("category_id", categoryId)
          .eq("country", country)
          .is("region", null)
          .eq("city", city)
          .limit(1);

        if (cityMatch && cityMatch.length > 0) return cityMatch[0] as CategoryLocationSeo;
      }

      // Priority 4: Country-level match (category + country, region = null, city = null)
      if (country) {
        const { data: countryMatch } = await supabase
          .from("category_location_seo")
          .select("*")
          .eq("category_id", categoryId)
          .eq("country", country)
          .is("region", null)
          .is("city", null)
          .limit(1);

        if (countryMatch && countryMatch.length > 0) return countryMatch[0] as CategoryLocationSeo;
      }

      // Priority 5: Category-level match (category only, no location)
      const { data: categoryMatch } = await supabase
        .from("category_location_seo")
        .select("*")
        .eq("category_id", categoryId)
        .is("country", null)
        .is("region", null)
        .is("city", null)
        .limit(1);

      if (categoryMatch && categoryMatch.length > 0) return categoryMatch[0] as CategoryLocationSeo;

      // No custom content found
      return null;
    },
    enabled: !!categoryId,
  });
};

// Hook to fetch all location SEO records (for admin)
export const useAllCategoryLocationSeo = () => {
  return useQuery({
    queryKey: ["category-location-seo-all"],
    queryFn: async () => {
      // First, fetch all SEO records
      const seoData = await fetchAllRows(() =>
        supabase
          .from("category_location_seo")
          .select("*")
          .order("created_at", { ascending: false })
      );

      // Then fetch all categories separately
      const { data: categories } = await supabase
        .from("categories")
        .select("id, name, slug, url_slug");

      // Manually join them
      const joined = seoData.map((seo: any) => ({
        ...seo,
        categories: categories?.find((c) => c.id === seo.category_id) || null,
      }));

      return joined;
    },
  });
};
