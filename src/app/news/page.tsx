import { Metadata } from 'next';
import News from '@/components/News';
import { getNews } from '@/lib/data/news';

export const metadata: Metadata = {
  title: 'News',
  description: 'News page - Latest industry news and updates',
};

export default async function NewsPage() {
  const news = await getNews();
  
  return <News initialNews={news} />;
}