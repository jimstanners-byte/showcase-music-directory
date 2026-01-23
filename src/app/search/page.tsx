import { Metadata } from 'next';
import SearchPage from '@/components/Search';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search page - Access and manage your content',
};

export default function SearchPagePage() {
  return <SearchPage />;
}