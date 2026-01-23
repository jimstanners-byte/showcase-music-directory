'use client';

import { Layout } from "@/components/Layout";
import { CategoryCard } from "@/components/CategoryCard";
import { useSubcategories } from "@/hooks/useCategories";
import { useMemo } from "react";

const SITE_URL = "https://www.showcase-music.com";
const SITE_NAME = "Showcase Music Directory";

const categoryOrder = [
  "live-event-services",
  "the-business",
  "venues",
  "equipment",
  "studios",
  "uk-recording-services",
  "festivals-events",
];

export default function Categories() {
  const { data: categories, isLoading } = useSubcategories(null);

  const sortedCategories = useMemo(() => {
    if (!categories) return [];
    return categories.slice().sort((a, b) => {
      const aIndex = categoryOrder.indexOf(a.slug);
      const bIndex = categoryOrder.indexOf(b.slug);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
  }, [categories]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categories",
      },
    ],
  };

  const itemListSchema =
    sortedCategories.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Showcase Music Directory Categories",
          description: "Browse all categories in the Showcase Music Directory.",
          url: `${SITE_URL}/categories`,
          numberOfItems: sortedCategories.length,
          itemListElement: sortedCategories.map((category, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Thing",
              name: category.name,
              url: `${SITE_URL}/${category.url_slug || category.slug}`,
            },
          })),
        }
      : null;

  return (
    <Layout>
      {/* Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {itemListSchema && (
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      
      <div className="container py-4 md:py-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Browse Categories</h1>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 md:h-32 bg-card border rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
            {sortedCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
