import { CategoryCard } from '@/components/CategoryCard';
import { Category } from '@/types/database';

interface HomeSectorHighlightsProps {
  categories: Category[];
}

export function HomeSectorHighlights({ categories }: HomeSectorHighlightsProps) {
  if (categories.length === 0) return null;

  return (
    <section className="py-10 sm:py-14 bg-background">
      <div className="container">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Browse by Sector
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}