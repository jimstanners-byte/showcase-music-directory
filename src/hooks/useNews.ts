'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { News } from "@/types/database";

export function useNews(limit?: number, initialData?: any[]) {
  return useQuery({
    queryKey: ["news", limit],
    queryFn: async () => {
      let query = supabase
        .from("news")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as News[];
    },
    initialData,
  });
}

export function useNewsBySlug(slug: string, initialData?: any) {
  return useQuery({
    queryKey: ["news", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (error) throw error;
      return data as News | null;
    },
    enabled: !!slug,
    initialData,
  });
}