import { Metadata } from 'next';
import { supabaseServer } from '@/integrations/supabase/server';
import CategoryPage from '@/components/CategoryPage';

const SITE_URL = "https://www.showcase-music.com";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ 
    slug: string;
    continent: string;
    country: string;
    regionOrCity: string;
    city: string;
  }> 
}): Promise<Metadata> {
  const { slug, continent, country, regionOrCity, city } = await params;
  
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

  // Query category_location_seo - regionOrCity is region, city is city
  const { data: seoData } = await supabaseServer
    .from('category_location_seo')
    .select('seo_title, meta_description, meta_keywords')
    .eq('category_id', category.id)
    .eq('country', country)
    .eq('region', regionOrCity)
    .eq('city', city)
    .single();
  
  // Build title with fallbacks
  const cityName = city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const title = seoData?.seo_title || 
    category.seo_title?.replace(/{location}/gi, cityName) ||
    `${category.name} in ${cityName} | Showcase Music Directory`;
  const description = seoData?.meta_description || 
    category.seo_meta_description?.replace(/{location}/gi, cityName) ||
    `Find ${category.name.toLowerCase()} in ${cityName}.`;
  
  return {
    title,
    description,
    keywords: seoData?.meta_keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: `${SITE_URL}/${slug}/${continent}/${country}/${regionOrCity}/${city}`
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${slug}/${continent}/${country}/${regionOrCity}/${city}`,
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
