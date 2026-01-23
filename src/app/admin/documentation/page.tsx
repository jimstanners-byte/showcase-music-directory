import { Metadata } from 'next';
import AdminDocumentation from '@/components/admin/AdminDocumentation';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Documentation page - Access and manage your content',
};

export default function AdminDocumentationPage() {
  return <AdminDocumentation />;
}
