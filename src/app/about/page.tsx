import { Metadata } from 'next';
import { supabaseServer } from '@/integrations/supabase/server';
import About from '@/components/About';

export async function generateMetadata(): Promise<Metadata> {
  // Query database for SEO data
  const { data: seoData } = await supabaseServer
    .from('page_content')
    .select('title, meta_description, meta_keywords')
    .eq('page_key', 'about')
    .single();
  
  const title = seoData?.title || 'About Us | Showcase Music Directory';
  const description = seoData?.meta_description || 'Showcase Music Directory is the comprehensive online resource for the music production industry, connecting professionals with suppliers, venues, and services worldwide.';
  
  return {
    title,
    description,
    keywords: seoData?.meta_keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: 'https://www.showcase-music.com/about'
    },
    openGraph: {
      title,
      description,
      url: 'https://www.showcase-music.com/about',
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

export default function AboutPage() {
  return <About />;
}
