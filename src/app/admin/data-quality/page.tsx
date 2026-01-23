import { Metadata } from 'next';
import DataQualityChecker from '@/components/admin/DataQualityChecker';

export const metadata: Metadata = {
  title: 'Data Quality',
  description: 'Data Quality page - Access and manage your content',
};

export default function DataQualityCheckerPage() {
  return <DataQualityChecker />;
}