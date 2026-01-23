import { Metadata } from 'next';
import NewsArticle from '@/components/NewsArticle';
import { getNewsBySlug } from '@/lib/data/news';

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'News article not found',
    };
  }

  return {
    title: article.title,
    description: article.content?.substring(0, 155) || 'Read the full article',
  };
}

export default async function NewsArticlePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  return <NewsArticle initialArticle={article} />;
}