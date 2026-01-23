import { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import AdminLogin from '@/components/admin/AdminLogin';

export const metadata: Metadata = {
  title: 'Dashboard Login',
  description: 'Dashboard Login page - Access and manage your content',
};

export default function AdminLoginPage() {
  return (
    <AuthProvider>
      <AdminLogin />
    </AuthProvider>
  );
}