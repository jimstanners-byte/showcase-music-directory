import { Metadata } from 'next';
import AdminNews from '@/components/admin/AdminNews';

export const metadata: Metadata = {
  title: 'News - Admin',
  description: 'Manage news articles',
};

export default function AdminNewsPage() {
  return <AdminNews />;
}
