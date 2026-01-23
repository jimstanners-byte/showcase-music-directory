import { Metadata } from 'next';
import Categories from '@/components/admin/AdminCategories';

export const metadata: Metadata = {
  title: 'Categories - Showcase Music Directory',
  description: 'Browse all categories in the Showcase Music Directory',
};

export default function CategoriesPage() {
  return <Categories />;
}
