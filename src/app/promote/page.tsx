import { Metadata } from 'next';
import { supabaseServer } from '@/integrations/supabase/server';
import Promote from '@/components/Promote';

export async function generateMetadata(): Promise<Metadata> {
  // Query database for SEO data
  const { data: seoData } = await supabaseServer
    .from('page_content')
    .select('title, meta_description, meta_keywords')
    .eq('page_key', 'promote')
    .single();
  
  const title = seoData?.title || 'Promote Your Business | Showcase Music Directory';
  const description = seoData?.meta_description || 'Get your music industry business listed in the Showcase Music Directory. Reach thousands of industry professionals looking for suppliers and services.';
  
  return {
    title,
    description,
    keywords: seoData?.meta_keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: 'https://www.showcase-music.com/promote'
    },
    openGraph: {
      title,
      description,
      url: 'https://www.showcase-music.com/promote',
      siteName: 'Showcase Music Directory',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default function PromotePage() {
  return <Promote />;
}
