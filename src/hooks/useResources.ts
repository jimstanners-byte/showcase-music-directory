'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

export interface Resource {
  id: string;
  keyword: string | null;
  slug: string;
  article_title: string;
  content: string | null;
  image_url: string | null;
  image_alt: string | null;
  word_count: number | null;
  internal_links: Json | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_title: string | null;
  og_description: string | null;
  h1: string | null;
  h2s: Json | null;
  schema_markup: Json | null;
  local_focus: string | null;
  search_intent: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  listing_id: string | null;
}

export type ResourceInsert = {
  keyword?: string | null;
  slug: string;
  article_title: string;
  content?: string | null;
  image_url?: string | null;
  image_alt?: string | null;
  word_count?: number | null;
  internal_links?: Json | null;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  h1?: string | null;
  h2s?: Json | null;
  schema_markup?: Json | null;
  local_focus?: string | null;
  search_intent?: string | null;
  status?: string;
  published_at?: string | null;
  listing_id?: string | null;
};

export type ResourceUpdate = Partial<ResourceInsert> & { id: string };

// Fetch single published resource by slug (for public page)
export const useResource = (slug: string) => {
  return useQuery({
    queryKey: ['resource', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      return data as Resource;
    },
    enabled: !!slug,
  });
};

// Fetch all resources (for admin)
export const useResources = (statusFilter?: 'all' | 'draft' | 'published') => {
  return useQuery({
    queryKey: ['resources', statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter && statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Resource[];
    },
  });
};

// Create resource
export const useCreateResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resource: ResourceInsert) => {
      const { data, error } = await supabase
        .from('resources')
        .insert([resource])
        .select()
        .single();

      if (error) throw error;
      return data as Resource;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
  });
};

// Update resource
export const useUpdateResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: ResourceUpdate) => {
      const { data, error } = await supabase
        .from('resources')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Resource;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
  });
};

// Delete resource
export const useDeleteResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
  });
};

// Bulk update status
export const useBulkUpdateResourceStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ids, status }: { ids: string[]; status: 'draft' | 'published' }) => {
      const updates: { status: string; published_at?: string } = { status };
      if (status === 'published') {
        updates.published_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('resources')
        .update(updates)
        .in('id', ids);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
  });
};

// Bulk delete
export const useBulkDeleteResources = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const { error } = await supabase
        .from('resources')
        .delete()
        .in('id', ids);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
  });
};

// Upsert resource (for CSV import)
export const useUpsertResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resource: ResourceInsert) => {
      const { data, error } = await supabase
        .from('resources')
        .upsert([resource], { onConflict: 'slug' })
        .select()
        .single();

      if (error) throw error;
      return data as Resource;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
  });
};
