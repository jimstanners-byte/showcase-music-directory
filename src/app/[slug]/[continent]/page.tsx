import { Metadata } from 'next';
import { supabaseServer } from '@/integrations/supabase/server';
import CategoryPage from '@/components/CategoryPage';
import { continentToDisplay } from '@/lib/locationUtils';

const SITE_URL = "https://www.showcase-music.com";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ 
    slug: string;
    continent: string;
  }> 
}): Promise<Metadata> {
  const { slug, continent } = await params;
  
  // First get category from slug
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

  // Note: category_location_seo doesn't have a continent column
  // For continent-level pages, we use the category's default SEO with location placeholder
  const continentName = continentToDisplay(continent);
  const title = category.seo_title?.replace(/{location}/gi, continentName) ||
    `${category.name} in ${continentName} | Showcase Music Directory`;
  const description = category.seo_meta_description?.replace(/{location}/gi, continentName) ||
    `Find ${category.name.toLowerCase()} in ${continentName}.`;
  
  return {
    title,
    description,
    keywords: category.seo_meta_keywords?.split(',').map((k: string) => k.trim()),
    alternates: {
      canonical: `${SITE_URL}/${slug}/${continent}`
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${slug}/${continent}`,
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