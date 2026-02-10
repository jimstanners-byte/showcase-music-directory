import { Metadata } from 'next';
import { supabaseServer } from '@/integrations/supabase/server';
import VenueRouteHandler from '@/components/VenueRouteHandler';
import { cityToDisplay } from '@/lib/locationUtils';

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
  
  // First check if param3 is a venue slug
  const { data: venueData } = await supabaseServer
    .from('listings')
    .select('name, description, slug')
    .eq('slug', param3)
    .not('venue_type', 'is', null)
    .eq('is_active', true)
    .maybeSingle();
  
  // If it's a venue, return venue-specific metadata
  if (venueData) {
    const title = `${venueData.name} | Showcase Music Directory`;
    const description = venueData.description?.slice(0, 160) || `View ${venueData.name} venue details, capacity, and contact information.`;
    
    return {
      title,
      description,
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
  
  // param3 could be region_slug or city - try both
  const { data: seoData } = await supabaseServer
    .from('venue_location_seo')
    .select('seo_title, meta_description, meta_keywords')
    .eq('continent', continentSlug)
    .eq('country', countrySlug)
    .or(`region_slug.eq.${param3},city.eq.${param3}`)
    .single();
  
  // Build fallback title
  const locationName = cityToDisplay(param3);
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

export default function VenueThreeSegmentPage() {
  return <VenueRouteHandler />;
}