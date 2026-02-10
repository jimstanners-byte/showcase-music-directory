import { Metadata } from 'next';
import { supabaseServer } from '@/integrations/supabase/server';
import CategoryPage from '@/components/CategoryPage';
import { cityToDisplay } from '@/lib/locationUtils';

const SITE_URL = "https://www.showcase-music.com";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ 
    slug: string;
    continent: string;
    country: string;
    regionOrCity: string;
  }> 
}): Promise<Metadata> {
  const { slug, continent, country, regionOrCity } = await params;
  
  // First get category ID from slug
  const { data: category } = await supabaseServer
    .from('categories')
    .select('id, name, seo_title, seo_meta_description, seo_meta_keywords')
    .eq('slug', slug)
    .single();

  if (!category) {
    return {
      title: 'Category Not Found | Showcase Music Directory',
      description: 'The requested category could not be found.',
    };
  }

  // Query category_location_seo - regionOrCity could be region OR city
  // Database stores slugs, URL params are already slugs
  const { data: seoData } = await supabaseServer
    .from('category_location_seo')
    .select('seo_title, meta_description, meta_keywords')
    .eq('category_id', category.id)
    .eq('country', country)
    .or(`region.eq.${regionOrCity},city.eq.${regionOrCity}`)
    .single();
  
  // Build title with fallbacks
  const locationName = cityToDisplay(regionOrCity);
  const title = seoData?.seo_title || 
    category.seo_title?.replace(/{location}/gi, locationName) ||
    `${category.name} in ${locationName} | Showcase Music Directory`;
  const description = seoData?.meta_description || 
    category.seo_meta_description?.replace(/{location}/gi, locationName) ||
    `Find ${category.name.toLowerCase()} in ${locationName}.`;
  
  return {
    title,
    description,
    keywords: seoData?.meta_keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: `${SITE_URL}/${slug}/${continent}/${country}/${regionOrCity}`
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${slug}/${continent}/${country}/${regionOrCity}`,
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

export default function CategoryPagePage() {
  return <CategoryPage />;
}