'use client';

import Link from 'next/link';
import { Layout } from "@/components/Layout";
import { useNews } from "@/hooks/useNews";
import { ChevronRight } from "lucide-react";

export default function News({ initialNews }: { initialNews?: any[] } = {}) {
  const { data: news, isLoading } = useNews(undefined, initialNews);

  return (
    <Layout>
      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">News</span>
        </nav>

        <h1 className="text-3xl font-bold mb-8">Latest News</h1>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : news && news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <Link key={item.id} href={`/news/${item.slug}`}>
                <article className="p-6 bg-card rounded-lg border hover:shadow-md transition-shadow h-full">
                  <h2 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {item.content.substring(0, 200)}...
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.published_at && new Date(item.published_at).toLocaleDateString()}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No news articles yet.
          </p>
        )}
      </div>
    </Layout>
  );
}