import { Metadata } from 'next';
import AdminClaimRequests from '@/components/admin/AdminClaimRequests';

export const metadata: Metadata = {
  title: 'Claim Requests',
  description: 'Claim Requests page - Access and manage your content',
};

export default function AdminClaimRequestsPage() {
  return <AdminClaimRequests />;
}
