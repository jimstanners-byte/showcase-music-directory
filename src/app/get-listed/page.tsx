import { Metadata } from 'next';
import { supabaseServer } from '@/integrations/supabase/server';
import GetListed from '@/components/GetListed';

export async function generateMetadata(): Promise<Metadata> {
  // Query database for SEO data
  const { data: seoData } = await supabaseServer
    .from('page_content')
    .select('title, meta_description, meta_keywords')
    .eq('page_key', 'get-listed')
    .single();
  
  const title = seoData?.title || 'Get Listed | Showcase Music Directory';
  const description = seoData?.meta_description || 'Add your music industry business to the Showcase Music Directory and connect with professionals worldwide.';
  
  return {
    title,
    description,
    keywords: seoData?.meta_keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: 'https://www.showcase-music.com/get-listed'
    },
    openGraph: {
      title,
      description,
      url: 'https://www.showcase-music.com/get-listed',
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

export default function GetListedPage() {
  return <GetListed />;
}
