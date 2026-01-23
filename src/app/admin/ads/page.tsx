import { Metadata } from 'next';
import AdminAds from '@/components/admin/AdminAds';

export const metadata: Metadata = {
  title: 'Ads',
  description: 'Ads page - Access and manage your content',
};

export default function AdminAdsPage() {
  return <AdminAds />;
}
