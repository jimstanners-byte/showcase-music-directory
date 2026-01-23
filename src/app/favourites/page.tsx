import { Metadata } from 'next';
import Favourites from '@/components/Favourites';

export const metadata: Metadata = {
  title: 'Favourites',
  description: 'Favourites page - Access and manage your content',
};

export default function FavouritesPage() {
  return <Favourites />;
}