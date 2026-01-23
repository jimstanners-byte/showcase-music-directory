import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Resources page - Industry resources and guides',
};

export default function ResourcesPage() {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-4">Resources</h1>
        <p>Resources content coming soon.</p>
      </div>
    </Layout>
  );
}