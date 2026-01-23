import { Metadata } from 'next';
import AdminAnalytics from '@/components/admin/AdminAnalytics';

export const metadata: Metadata = {
  title: 'Analytics',
  description: 'Analytics page - Access and manage your content',
};

export default function AdminAnalyticsPage() {
  return <AdminAnalytics />;
}
