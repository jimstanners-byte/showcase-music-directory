'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ResourceArticle from './ResourceArticle';
import NotFound from './NotFound';
import { Layout } from '@/components/Layout';
import { Loader2 } from 'lucide-react';

export default function DynamicRoute() {
  const pathname = usePathname();
  // Remove leading slash to get the full path as slug
  const slug = pathname.slice(1);

  const { data: resource, isLoading, error } = useQuery({
    queryKey: ['resource-check', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('id, slug')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  // If resource exists, render ResourceArticle
  if (resource) {
    return <ResourceArticle slug={slug} />;
  }

  // Otherwise show NotFound
  return <NotFound />;
}
