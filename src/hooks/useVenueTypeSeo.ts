'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

      // Try most specific match first (city level), then cascade up
      // Priority: city > region > country > continent > type-only

      // 1. Try exact match with city
      if (city) {
        let query = supabase
          .from("venue_type_seo")
          .select("*")
          .eq("venue_type", venueType)
          .eq("continent", continent)
          .eq("country", country)
          .eq("city", city);
        
        // Handle null vs non-null region_slug
        if (regionSlug) {
          query = query.eq("region_slug", regionSlug);
        } else {
          query = query.is("region_slug", null);
        }
        
        const { data } = await query.maybeSingle();
        if (data) return data as VenueTypeSeo;
      }

      // 2. Try region level (city null)
      if (regionSlug) {
        const { data } = await supabase
          .from("venue_type_seo")
          .select("*")
          .eq("venue_type", venueType)
          .eq("continent", continent)
          .eq("country", country)
          .eq("region_slug", regionSlug)
          .is("city", null)
          .maybeSingle();
        if (data) return data as VenueTypeSeo;
      }

      // 3. Try country level (region and city null)
      if (country) {
        const { data } = await supabase
          .from("venue_type_seo")
          .select("*")
          .eq("venue_type", venueType)
          .eq("continent", continent)
          .eq("country", country)
          .is("region_slug", null)
          .is("city", null)
          .maybeSingle();
        if (data) return data as VenueTypeSeo;
      }

      // 4. Try continent level (country, region, city null)
      if (continent) {
        const { data } = await supabase
          .from("venue_type_seo")
          .select("*")
          .eq("venue_type", venueType)
          .eq("continent", continent)
          .is("country", null)
          .is("region_slug", null)
          .is("city", null)
          .maybeSingle();
        if (data) return data as VenueTypeSeo;
      }

      // 5. Try type-only (all location fields null)
      const { data } = await supabase
        .from("venue_type_seo")
        .select("*")
        .eq("venue_type", venueType)
        .is("continent", null)
        .is("country", null)
        .is("region_slug", null)
        .is("city", null)
        .maybeSingle();
      
      return data as VenueTypeSeo | null;
    },
    enabled: !!venueType,
  });
};

// Hook to fetch all venue type SEO records (for admin)
export const useAllVenueTypeSeo = () => {
  return useQuery({
    queryKey: ["venue-type-seo-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("venue_type_seo")
        .select("*")
        .order("venue_type", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as VenueTypeSeo[];
    },
  });
};
