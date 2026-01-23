import { Metadata } from 'next';
import AdminPageSeo from '@/components/admin/AdminPageSeo';

export const metadata: Metadata = {
  title: 'Page Seo',
  description: 'Page Seo page - Access and manage your content',
};

export default function AdminPageSeoPage() {
  return <AdminPageSeo />;
}
