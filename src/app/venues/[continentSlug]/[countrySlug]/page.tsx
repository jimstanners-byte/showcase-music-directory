import { Metadata } from 'next';
import { supabaseServer } from '@/integrations/supabase/server';
import VenueFinderWrapper from '@/components/VenueFinderWrapper';

const SITE_URL = "https://www.showcase-music.com";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ 
    continentSlug: string;
    countrySlug: string;
  }> 
}): Promise<Metadata> {
  const { continentSlug, countrySlug } = await params;
  
  // Query venue_location_seo for this location
  const { data: seoData } = await supabaseServer
    .from('venue_location_seo')
    .select('seo_title, meta_description, meta_keywords')
    .eq('continent', continentSlug)
    .eq('country', countrySlug)
    .is('region', null)
    .is('city', null)
    .single();
  
  // Build title and description with fallbacks
  const countryName = countrySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const title = seoData?.seo_title || `Venues in ${countryName} | Showcase Music Directory`;
  const description = seoData?.meta_description || `Find concert venues in ${countryName}. Browse arenas, theatres, clubs and stadiums.`;
  
  return {
    title,
    description,
    keywords: seoData?.meta_keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: `${SITE_URL}/venues/${continentSlug}/${countrySlug}`
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/venues/${continentSlug}/${countrySlug}`,
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

export default function VenueFinderWrapperPage() {
  return <VenueFinderWrapper />;
}
