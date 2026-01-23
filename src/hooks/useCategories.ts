'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Category } from "@/types/database";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;
      return data as Category[];
    },
  });
}

export function useCategoryBySlug(slug: string, initialData?: Category | null) {
  return useQuery({
    queryKey: ["category", slug],
    queryFn: async () => {
      // First try to find by url_slug, then fallback to slug
      const { data: byUrlSlug, error: urlSlugError } = await supabase
        .from("categories")
        .select("*")
        .eq("url_slug", slug)
        .maybeSingle();

      if (urlSlugError) throw urlSlugError;
      if (byUrlSlug) return byUrlSlug as Category;

      // Fallback to regular slug
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      return data as Category | null;
    },
    enabled: !!slug,
    initialData,
  });
}

export function useSubcategories(parentId: string | null, initialData?: Category[]) {
  return useQuery({
    queryKey: ["subcategories", parentId],
    queryFn: async () => {
      const query = supabase.from("categories").select("*").order("name");
      
      if (parentId) {
        query.eq("parent_id", parentId);
      } else {
        query.is("parent_id", null);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Category[];
    },
    initialData,
  });
}