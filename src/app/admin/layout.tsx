'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayout>{children}</AdminLayout>
    </AuthProvider>
  );
}