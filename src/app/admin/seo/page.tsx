import { Metadata } from 'next';
import AdminSeo from '@/components/admin/AdminSeo';

export const metadata: Metadata = {
  title: 'Seo',
  description: 'Seo page - Access and manage your content',
};

export default function AdminSeoPage() {
  return <AdminSeo />;
}
