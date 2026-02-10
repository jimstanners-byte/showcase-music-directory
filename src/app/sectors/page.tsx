import { Metadata } from 'next';
import { supabaseServer } from '@/integrations/supabase/server';
import { getTopLevelCategories } from '@/lib/data/categories';
import CategoriesDisplay from '@/components/CategoriesDisplay';

// Category display order preference
const categoryOrder = [
  "live-event-services",
  "the-business",
  "venues",
  "equipment",
  "studios",
  "uk-recording-services",
  "festivals-events",
];

export async function generateMetadata(): Promise<Metadata> {
  // Query database for SEO data
  const { data: seoData } = await supabaseServer
    .from('page_content')
    .select('title, meta_description, meta_keywords')
    .eq('page_key', 'categories')
    .single();
  
  const title = seoData?.title || 'Browse Sectors | Showcase Music Directory';
  const description = seoData?.meta_description || 'Browse all sectors in the Showcase Music Directory. Find suppliers, venues, studios, and services for the music production industry.';
  
  return {
    title,
    description,
    keywords: seoData?.meta_keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: 'https://www.showcase-music.com/sectors'
    },
    openGraph: {
      title,
      description,
      url: 'https://www.showcase-music.com/sectors',
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

export default async function CategoriesPage() {
  // Fetch categories server-side
  const categories = await getTopLevelCategories();
  
  // Sort categories according to preferred order
  const sortedCategories = categories.slice().sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a.slug);
    const bIndex = categoryOrder.indexOf(b.slug);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return <CategoriesDisplay categories={sortedCategories} />;
}