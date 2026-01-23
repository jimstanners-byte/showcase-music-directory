import { Layout } from "@/components/Layout";
import { CategoryCard } from "@/components/CategoryCard";
import { Category } from "@/types/database";

const SITE_URL = "https://www.showcase-music.com";

interface CategoriesDisplayProps {
  categories: Category[];
}

export default function CategoriesDisplay({ categories }: CategoriesDisplayProps) {
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

  const itemListSchema = categories.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Showcase Music Directory Categories",
        description: "Browse all categories in the Showcase Music Directory.",
        url: `${SITE_URL}/categories`,
        numberOfItems: categories.length,
        itemListElement: categories.map((category, index) => ({
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

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </Layout>
  );
}