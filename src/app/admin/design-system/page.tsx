import { Metadata } from 'next';
import DesignSystem from '@/components/DesignSystem';

export const metadata: Metadata = {
  title: 'Design System',
  description: 'Design System page - Access and manage your content',
};

export default function DesignSystemPage() {
  return <DesignSystem />;
}