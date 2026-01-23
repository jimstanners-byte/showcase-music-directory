import { Metadata } from 'next';
import AdminSeoLookup from '@/components/admin/AdminSeoLookup';

export const metadata: Metadata = {
  title: 'Seo Lookup',
  description: 'Seo Lookup page - Access and manage your content',
};

export default function AdminSeoLookupPage() {
  return <AdminSeoLookup />;
}
