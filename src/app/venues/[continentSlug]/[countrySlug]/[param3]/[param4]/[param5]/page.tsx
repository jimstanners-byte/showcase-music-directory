import { Metadata } from 'next';
import { supabaseServer } from '@/integrations/supabase/server';
import VenueFiveSegmentHandler from '@/components/VenueFiveSegmentHandler';
import { cityToDisplay } from '@/lib/locationUtils';

const SITE_URL = "https://www.showcase-music.com";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ 
    continentSlug: string;
    countrySlug: string;
    param3: string;
    param4: string;
    param5: string;
  }> 
}): Promise<Metadata> {
  const { continentSlug, countrySlug, param3, param4, param5 } = await params;
  
  // First check if param5 is a venue slug
  const { data: venueData } = await supabaseServer
    .from('listings')
    .select('name, description, slug')
    .eq('slug', param5)
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
        canonical: `${SITE_URL}/venues/${continentSlug}/${countrySlug}/${param3}/${param4}/${param5}`
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/venues/${continentSlug}/${countrySlug}/${param3}/${param4}/${param5}`,
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
  
  // 5-param route - region + city + venue type
  const { data: seoData } = await supabaseServer
    .from('venue_location_seo')
    .select('seo_title, meta_description, meta_keywords')
    .eq('continent', continentSlug)
    .eq('country', countrySlug)
    .eq('region_slug', param3)
    .eq('city', param4)
    .single();
  
  // Build fallback title (param5 might be venue type)
  const locationName = cityToDisplay(param4);
  const venueType = cityToDisplay(param5); // Reuse for title case conversion
  const title = seoData?.seo_title || `${venueType}s in ${locationName} | Showcase Music Directory`;
  const description = seoData?.meta_description || `Find ${venueType.toLowerCase()}s in ${locationName}.`;
  
  return {
    title,
    description,
    keywords: seoData?.meta_keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: `${SITE_URL}/venues/${continentSlug}/${countrySlug}/${param3}/${param4}/${param5}`
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/venues/${continentSlug}/${countrySlug}/${param3}/${param4}/${param5}`,
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

export default function VenueFiveSegmentPage() {
  return <VenueFiveSegmentHandler />;
}