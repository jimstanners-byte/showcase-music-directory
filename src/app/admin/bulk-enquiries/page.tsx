import { Metadata } from 'next';
import AdminBulkEnquiries from '@/components/admin/AdminBulkEnquiries';

export const metadata: Metadata = {
  title: 'Bulk Enquiries',
  description: 'Bulk Enquiries page - Access and manage your content',
};

export default function AdminBulkEnquiriesPage() {
  return <AdminBulkEnquiries />;
}
