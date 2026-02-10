import { Metadata } from 'next';
import { Layout } from '@/components/Layout';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeSectorHighlights } from '@/components/home/HomeSectorHighlights';
import { ClientLogoTickerServer } from '@/components/home/ClientLogoTickerServer';
import { getHomeStats, getPaidListings } from '@/lib/data/home';
import { getTopLevelCategories } from '@/lib/data/categories';
import { supabaseServer } from '@/integrations/supabase/server';

export async function generateMetadata(): Promise<Metadata> {
  const { data: pageSeo } = await supabaseServer
    .from('page_content')          // ✓ CORRECT TABLE (matches admin)
    .select('title, meta_description, meta_keywords')
    .eq('page_key', 'home')        // ✓ CORRECT FIELD (matches admin)
    .single();

  const title = pageSeo?.title || 'Showcase Music Directory | The Music Production Industry Resource';
  const description = pageSeo?.meta_description || 'The only fully comprehensive online resource for the music production industry. Find suppliers, venues, studios, business contacts and more.';
  const keywords = pageSeo?.meta_keywords;

  return {
    title,
    description,
    keywords: keywords?.split(',').map((k: string) => k.trim()),
    alternates: {
      canonical: 'https://www.showcase-music.com'
    },
    openGraph: {
      title,
      description,
      url: 'https://www.showcase-music.com',
      siteName: 'Showcase Music Directory',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    }
  };
}

// Category display order preference (same as sectors page)
const categoryOrder = [
  "live-event-services",
  "the-business",
  "venues",
  "equipment",
  "studios",
  "uk-recording-services",
  "festivals-events",
];

export default async function HomePage() {
  const [stats, paidListings, categories] = await Promise.all([
    getHomeStats(),
    getPaidListings(),
    getTopLevelCategories()
  ]);

  // Sort categories according to preferred order
  const sortedCategories = categories.slice().sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a.slug);
    const bIndex = categoryOrder.indexOf(b.slug);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  // Take first 6 for homepage display
  const featuredCategories = sortedCategories.slice(0, 6);

  return (
    <Layout>
      <HomeHero stats={stats} />
      <HomeSectorHighlights categories={featuredCategories} />
      <ClientLogoTickerServer listings={paidListings} />
    </Layout>
  );
}