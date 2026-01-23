import { Metadata } from 'next';
import AdminListings from '@/components/admin/AdminListings';

export const metadata: Metadata = {
  title: 'Listings',
  description: 'Listings page - Access and manage your content',
};

export default function AdminListingsPage() {
  return <AdminListings />;
}
