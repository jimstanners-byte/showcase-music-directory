'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

      // Try most specific match first, then cascade to less specific
      
      // 1. Try exact match: continent + country + region + city
      if (country && regionSlug && city) {
        const { data: exactMatch } = await supabase
          .from("venue_location_seo")
          .select("*")
          .eq("continent", continent)
          .eq("country", country)
          .eq("region_slug", regionSlug)
          .eq("city", city)
          .limit(1)
          .maybeSingle();
        
        if (exactMatch) return exactMatch as VenueLocationSeo;
      }

      // 2. Try city without region: continent + country + city (region_slug = null)
      if (country && city) {
        const { data: cityNoRegionMatch } = await supabase
          .from("venue_location_seo")
          .select("*")
          .eq("continent", continent)
          .eq("country", country)
          .is("region_slug", null)
          .eq("city", city)
          .limit(1)
          .maybeSingle();
        
        if (cityNoRegionMatch) return cityNoRegionMatch as VenueLocationSeo;
      }

      // 3. Try region level: continent + country + region (city = null)
      if (country && regionSlug) {
        const { data: regionMatch } = await supabase
          .from("venue_location_seo")
          .select("*")
          .eq("continent", continent)
          .eq("country", country)
          .eq("region_slug", regionSlug)
          .is("city", null)
          .limit(1)
          .maybeSingle();
        
        if (regionMatch) return regionMatch as VenueLocationSeo;
      }

      // 4. Try country level: continent + country (region = null, city = null)
      if (country) {
        const { data: countryMatch } = await supabase
          .from("venue_location_seo")
          .select("*")
          .eq("continent", continent)
          .eq("country", country)
          .is("region_slug", null)
          .is("city", null)
          .limit(1)
          .maybeSingle();
        
        if (countryMatch) return countryMatch as VenueLocationSeo;
      }

      // 5. Try continent level: continent only (country = null, region = null, city = null)
      const { data: continentMatch } = await supabase
        .from("venue_location_seo")
        .select("*")
        .eq("continent", continent)
        .is("country", null)
        .is("region_slug", null)
        .is("city", null)
        .limit(1)
        .maybeSingle();

      return continentMatch as VenueLocationSeo | null;
    },
    enabled: !!continent,
  });
};

// Hook to fetch all venue location SEO records (for admin)
export const useAllVenueLocationSeo = () => {
  return useQuery({
    queryKey: ["venue-location-seo-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("venue_location_seo")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as VenueLocationSeo[];
    },
  });
};
