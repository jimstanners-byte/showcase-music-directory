'use client';

import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import { useResourceBySlug, parseSlugForBreadcrumbs, slugToDisplayName } from '@/hooks/useResourceBySlug';
import { useListingBySlug } from '@/hooks/useListings';
import { useIsAdmin } from '@/hooks/useAuth';
import { useCategories } from '@/hooks/useCategories';
import { Layout } from '@/components/Layout';
import { Loader2, ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// Helper to generate slug from heading text
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

interface ResourceArticleProps {
  slug: string;
}

export default function ResourceArticle({ slug }: ResourceArticleProps) {
  const { isAdmin } = useIsAdmin();
  const { data: resource, isLoading, error } = useResourceBySlug(slug);
  const { data: categories } = useCategories();
  
  // Parse slug segments for breadcrumbs
  const { segments, pathType, listingSlug } = parseSlugForBreadcrumbs(slug);
  
  // Fetch listing data if this is a listing-based path
  const { data: listing } = useListingBySlug(pathType === 'listing' ? listingSlug || '' : '');

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (error || !resource) {
    return null; // DynamicRoute handles the NotFound case
  }

  // Process content to add IDs to h2 elements
  let processedContent = resource.content || '';
  const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gi;
  processedContent = processedContent.replace(h2Regex, (match, content) => {
    const textContent = content.replace(/<[^>]*>/g, ''); // Strip inner HTML tags
    const id = generateSlug(textContent);
    return `<h2 id="${id}">${content}</h2>`;
  });

  // Sanitize HTML content
  const sanitizedContent = processedContent 
    ? DOMPurify.sanitize(processedContent, {
        ADD_TAGS: ['iframe'],
        ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'id'],
      })
    : '';

  // Parse internal links from JSON
  const internalLinks: { text: string; url: string }[] = 
    Array.isArray(resource.internal_links) 
      ? (resource.internal_links as unknown as { text: string; url: string }[]) 
      : [];


  // Build breadcrumb items from segments
  const buildBreadcrumbItems = () => {
    const items: { label: string; href: string }[] = [];

    // Handle listing-based paths: Home > {Listing Name} > Article
    if (pathType === 'listing' && listingSlug) {
      const listingName = listing?.name || slugToDisplayName(listingSlug);
      items.push({
        label: listingName,
        href: `/listing/${listingSlug}`,
      });
      return items;
    }

    // Handle category-based and other paths
    let currentPath = '';
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      currentPath += `/${segment}`;

      // Check if this segment is "categories" - just use the label
      if (segment === 'categories') {
        items.push({
          label: 'Categories',
          href: '/categories',
        });
      } else if (segment === 'listing') {
        // Skip the "listing" segment itself for listing paths
        continue;
      } else {
        // Try to find a matching category by slug
        const category = categories?.find(c => c.slug === segment || c.url_slug === segment);
        const label = category?.name || slugToDisplayName(segment);
        
        items.push({
          label,
          href: currentPath,
        });
      }
    }

    return items;
  };

  const breadcrumbItems = buildBreadcrumbItems();

  return (
    <Layout>
      <article className="min-h-screen bg-background pt-8">
        {/* Hero Image with Gradient Overlay */}
        {resource.image_url && (
          <div className="w-full h-64 md:h-80 lg:h-96 relative overflow-hidden -mt-8">
            <img
              src={resource.image_url}
              alt={resource.image_alt || resource.article_title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
        )}

        <div className={`container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${resource.image_url ? '-mt-20' : ''}`}>
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="text-muted-foreground hover:text-foreground">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbItems.map((item, index) => (
                <span key={item.href} className="contents">
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </span>
              ))}
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-foreground truncate max-w-[200px]">
                  {resource.article_title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Main Content Card */}
          <div className="bg-card rounded-lg border border-border shadow-lg p-6 md:p-10 lg:p-12">
            {/* Back Button - Admin only */}
            {isAdmin && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = '/admin/resources'}
                className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Resources
              </Button>
            )}

            {/* H1 Heading - Proportional scaling: ~2.25rem mobile, ~2.75rem tablet, ~3.25rem desktop */}
            <h1 className="text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] font-bold mb-8 text-foreground leading-[1.15]">
              {resource.h1 || resource.article_title}
            </h1>

            {/* Main Content - Editorial-style typography */}
            <div 
              className="prose prose-lg md:prose-xl max-w-none dark:prose-invert
                prose-headings:text-foreground prose-headings:scroll-mt-20
                prose-h2:text-[1.5rem] prose-h2:md:text-[1.85rem] prose-h2:lg:text-[2.15rem] prose-h2:mt-12 prose-h2:mb-5 prose-h2:font-bold prose-h2:border-b prose-h2:border-border/50 prose-h2:pb-3 prose-h2:leading-[1.2]
                prose-h3:text-lg prose-h3:md:text-xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:font-semibold
                prose-p:text-foreground/90 prose-p:leading-[1.8] prose-p:mb-6 prose-p:text-base prose-p:md:text-lg
                [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors
                prose-strong:text-foreground prose-strong:font-semibold
                prose-ul:text-foreground/90 prose-ol:text-foreground/90 prose-ul:my-6 prose-ol:my-6
                prose-li:marker:text-primary prose-li:my-2 prose-li:leading-[1.7] prose-li:text-base prose-li:md:text-lg
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:text-foreground/80 prose-blockquote:bg-muted/30 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:my-8 prose-blockquote:italic
                prose-img:rounded-lg prose-img:shadow-md prose-img:my-8
                prose-hr:border-border prose-hr:my-10
                [&_a:hover]:text-primary
                [&_p+p]:mt-6
                [&_h2+p]:mt-5
                [&_h3+p]:mt-4
                [&_p+h2]:mt-14
                [&_p+h3]:mt-12
                [&_ul+h2]:mt-14
                [&_ol+h2]:mt-14
                [&_ul+h3]:mt-12
                [&_ol+h3]:mt-12"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />

            {/* Internal Links */}
            {internalLinks.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h2 className="font-semibold mb-4 text-foreground text-lg">Related Links</h2>
                <ul className="space-y-2">
                  {internalLinks.map((link, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary/50" />
                      <a
                        href={link.url}
                        className="text-primary hover:underline"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Bottom spacing */}
          <div className="h-12" />
        </div>
      </article>
    </Layout>
  );
}
