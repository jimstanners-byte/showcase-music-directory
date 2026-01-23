import { Metadata } from 'next';
import { Layout } from '@/components/Layout';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeStatsDisplay } from '@/components/home/HomeStatsDisplay';
import { ClientLogoTickerServer } from '@/components/home/ClientLogoTickerServer';
import { getHomeStats, getPaidListings } from '@/lib/data/home';
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

export default async function HomePage() {
  const [stats, paidListings] = await Promise.all([
    getHomeStats(),
    getPaidListings()
  ]);

  return (
    <Layout>
      <HomeHero />
      <HomeStatsDisplay stats={stats} />
      <ClientLogoTickerServer listings={paidListings} />
    </Layout>
  );
}