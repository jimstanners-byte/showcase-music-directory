'use client';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Resource } from './useResources';

// Path type for determining breadcrumb logic
export type ResourcePathType = 'category' | 'listing' | 'other';

// Fetch single published resource by full slug path
export const useResourceBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['resource', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();

      if (error) throw error;
      return data as Resource | null;
    },
    enabled: !!slug,
  });
};

// Helper to parse slug segments and build breadcrumb data
export interface BreadcrumbSegment {
  label: string;
  href: string;
}

export interface ParsedSlug {
  segments: string[];
  articleSlug: string;
  pathType: ResourcePathType;
  listingSlug?: string;
}

export const parseSlugForBreadcrumbs = (slug: string): ParsedSlug => {
  const parts = slug.split('/').filter(Boolean);
  const articleSlug = parts[parts.length - 1] || '';
  const segments = parts.slice(0, -1);
  
  // Determine path type based on first segment
  let pathType: ResourcePathType = 'other';
  let listingSlug: string | undefined;
  
  if (parts[0] === 'categories') {
    pathType = 'category';
  } else if (parts[0] === 'listing' && parts.length >= 2) {
    pathType = 'listing';
    listingSlug = parts[1]; // The listing slug is the second segment
  }
  
  return { segments, articleSlug, pathType, listingSlug };
};

// Convert slug to display name (e.g., "backline-musical-instrument-hire" -> "Backline Musical Instrument Hire")
export const slugToDisplayName = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
