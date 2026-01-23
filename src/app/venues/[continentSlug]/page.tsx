import { Metadata } from 'next';
import { supabaseServer } from '@/integrations/supabase/server';
import VenueFinderWrapper from '@/components/VenueFinderWrapper';

const SITE_URL = "https://www.showcase-music.com";

interface PageProps {
  params: {
    continentSlug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { continentSlug } = await params;
  
  // Capitalize first letter for display
  const continentName = continentSlug.charAt(0).toUpperCase() + continentSlug.slice(1);
  
  const title = `Venues in ${continentName} | Showcase Music`;
  const description = `Browse music venues across ${continentName}. Find the perfect venue for your performance.`;
  const canonicalUrl = `${SITE_URL}/venues/${continentSlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Showcase Music',
      type: 'website',
    },
  };
}

export default async function VenueContinentPage({ params }: PageProps) {
  const { continentSlug } = await params;
  
  // Use VenueFinderWrapper to prevent unmounting on navigation
  // VenueFinder will get continent from URL params automatically
  return <VenueFinderWrapper />;
}