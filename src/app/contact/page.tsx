import { Metadata } from 'next';
import { supabaseServer } from '@/integrations/supabase/server';
import Contact from '@/components/Contact';

export async function generateMetadata(): Promise<Metadata> {
  // Query database for SEO data
  const { data: seoData } = await supabaseServer
    .from('page_content')
    .select('title, meta_description, meta_keywords')
    .eq('page_key', 'contact')
    .single();
  
  const title = seoData?.title || 'Contact Us | Showcase Music Directory';
  const description = seoData?.meta_description || 'Get in touch with the Showcase Music Directory team. We\'re here to help with listings, advertising, and general enquiries.';
  
  return {
    title,
    description,
    keywords: seoData?.meta_keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: 'https://www.showcase-music.com/contact'
    },
    openGraph: {
      title,
      description,
      url: 'https://www.showcase-music.com/contact',
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

export default function ContactPage() {
  return <Contact />;
}
