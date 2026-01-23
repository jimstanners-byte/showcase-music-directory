import { Metadata } from 'next';
import CategoryPage from '@/components/CategoryPage';
import { supabaseServer } from '@/integrations/supabase/server';
import { getCategoryBySlug, getSubcategories, getListingsByCategory } from '@/lib/data/categories';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  
  const { data: category, error } = await supabaseServer
    .from('categories')
    .select('name, seo_title, seo_meta_description, seo_meta_keywords')
    .eq('slug', slug)
    .single();

  console.log('Metadata query result:', { category, error });

  if (!category) {
    return {
      title: 'Category Not Found | Showcase Music Directory',
      description: 'The requested category could not be found'
    };
  }

  const baseUrl = 'https://www.showcase-music.com';
  const pageUrl = `${baseUrl}/${slug}`;

  // Use SEO overrides if they exist, otherwise use defaults
  const title = category.seo_title || `${category.name} | Showcase Music Directory`;
  const description = category.seo_meta_description || `Find ${category.name} companies and services on Showcase Music Directory`;
  const keywords = category.seo_meta_keywords?.split(',').map((k: string) => k.trim()) || [];

  return {
    title,
    description,
    ...(keywords.length > 0 && { keywords }),
    alternates: {
      canonical: pageUrl
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'Showcase Music Directory',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default async function CategoryPageRoute({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  
  // Fetch initial data server-side in parallel
  const [category, subcategories] = await Promise.all([
    getCategoryBySlug(slug),
    getCategoryBySlug(slug).then(cat => cat ? getSubcategories(cat.id) : [])
  ]);

  // Pass initial data to client component (listings fetched client-side with filters)
  return (
    <CategoryPage 
      initialCategory={category}
      initialSubcategories={subcategories}
    />
  );
}