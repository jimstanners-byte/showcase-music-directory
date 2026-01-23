import { Metadata } from 'next';
import AdminImportListings from '@/components/admin/AdminImportListings';

export const metadata: Metadata = {
  title: 'Import Listings',
  description: 'Import Listings page - Access and manage your content',
};

export default function AdminImportListingsPage() {
  return <AdminImportListings />;
}
