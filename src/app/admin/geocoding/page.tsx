import { Metadata } from 'next';
import AdminGeocoding from '@/components/admin/AdminGeocoding';

export const metadata: Metadata = {
  title: 'Geocoding',
  description: 'Geocoding page - Access and manage your content',
};

export default function AdminGeocodingPage() {
  return <AdminGeocoding />;
}
