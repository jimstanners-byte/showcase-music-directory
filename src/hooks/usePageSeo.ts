'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PageSeo {
  id: string;
  page_key: string;
  title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  content: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const usePageSeo = (pageSlug: string) => {
  return useQuery({
    queryKey: ["page-seo", pageSlug],
    queryFn: async () => {
      if (!pageSlug) return null;

      const { data } = await supabase
        .from("page_content")
        .select("*")
        .eq("page_key", pageSlug)
        .eq("is_active", true)
        .maybeSingle();

      return data as PageSeo | null;
    },
    enabled: !!pageSlug,
  });
};

// Hook to fetch all page SEO records  (for admin)
export const useAllPageSeo = () => {
  return useQuery({
    queryKey: ["page-seo-all"],
    queryFn: async () => {
      const { data, error } = await supabase.from("page_content").select("*").order("page_key", { ascending: true });

      if (error) throw error;
      return data as PageSeo[];
    },
  });
};
