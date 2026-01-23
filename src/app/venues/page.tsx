import { Metadata } from 'next';
import { supabaseServer } from '@/integrations/supabase/server';
import VenueFinder from '@/components/VenueFinder';

export async function generateMetadata(): Promise<Metadata> {
  // Query database for SEO data
  const { data: seoData } = await supabaseServer
    .from('page_content')
    .select('title, meta_description, meta_keywords')
    .eq('page_key', 'venues')
    .single();
  
  const title = seoData?.title || 'Venues | Showcase Music Directory';
  const description = seoData?.meta_description || 'Find music venues worldwide. Search by location, capacity, and type.';
  
  return {
    title,
    description,
    keywords: seoData?.meta_keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: 'https://www.showcase-music.com/venues'
    },
    openGraph: {
      title,
      description,
      url: 'https://www.showcase-music.com/venues',
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

export default function VenueFinderPage() {
  return <VenueFinder />;
}
