import { Metadata } from 'next';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard page - Access and manage your content',
};

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}
