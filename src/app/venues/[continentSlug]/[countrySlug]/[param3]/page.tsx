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
    param3: string;
  }> 
}): Promise<Metadata> {
  const { continentSlug, countrySlug, param3 } = await params;
  
  // param3 could be region or city - try both
  const { data: seoData } = await supabaseServer
    .from('venue_location_seo')
    .select('seo_title, meta_description, meta_keywords')
    .eq('continent', continentSlug)
    .eq('country', countrySlug)
    .or(`region.eq.${param3},city.eq.${param3}`)
    .single();
  
  // Build fallback title
  const locationName = param3.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const title = seoData?.seo_title || `Venues in ${locationName} | Showcase Music Directory`;
  const description = seoData?.meta_description || `Find concert venues in ${locationName}. Browse arenas, theatres, clubs and stadiums.`;
  
  return {
    title,
    description,
    keywords: seoData?.meta_keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: `${SITE_URL}/venues/${continentSlug}/${countrySlug}/${param3}`
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/venues/${continentSlug}/${countrySlug}/${param3}`,
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
