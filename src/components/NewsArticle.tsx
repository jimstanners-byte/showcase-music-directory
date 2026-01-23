'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useNewsBySlug } from "@/hooks/useNews";
import { ChevronRight, ArrowLeft } from "lucide-react";

export default function NewsArticle({ initialArticle }: { initialArticle?: any } = {}) {
  const { slug } = useParams();
  const { data: article, isLoading } = useNewsBySlug(slug || "", initialArticle);

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8 max-w-3xl">
          <div className="h-8 w-48 bg-muted animate-pulse rounded mb-4" />
          <div className="h-64 bg-muted animate-pulse rounded" />
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Link href="/news" className="text-primary hover:underline">
            Back to news
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 max-w-3xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/news" className="hover:text-primary">News</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground line-clamp-1">{article.title}</span>
        </nav>

        <Link href="/news">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </Button>
        </Link>

        <article className="bg-card rounded-lg border p-8">
          <header className="mb-6">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <p className="text-sm text-muted-foreground">
              {article.published_at && new Date(article.published_at).toLocaleDateString('en-GB', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </header>

          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-wrap text-foreground/80">{article.content}</p>
          </div>
        </article>
      </div>
    </Layout>
  );
}