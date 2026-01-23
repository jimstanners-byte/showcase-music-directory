import { Metadata } from 'next';
import AdminResources from '@/components/admin/AdminResources';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Resources page - Access and manage your content',
};

export default function AdminResourcesPage() {
  return <AdminResources />;
}
