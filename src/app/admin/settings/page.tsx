import { Metadata } from 'next';
import AdminSettings from '@/components/admin/AdminSettings';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Settings page - Access and manage your content',
};

export default function AdminSettingsPage() {
  return <AdminSettings />;
}