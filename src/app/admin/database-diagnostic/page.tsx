import { Metadata } from 'next';
import DatabaseDiagnostic from '@/components/admin/DatabaseDiagnostic';

export const metadata: Metadata = {
  title: 'Database Diagnostic',
  description: 'Database Diagnostic page - Access and manage your content',
};

export default function DatabaseDiagnosticPage() {
  return <DatabaseDiagnostic />;
}