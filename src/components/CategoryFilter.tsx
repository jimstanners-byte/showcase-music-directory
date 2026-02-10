import Link from 'next/link';
import { Category } from "@/types/database";
import { Badge } from "@/components/ui/badge";
import { Folder } from "lucide-react";

interface CategoryFilterProps {
  categories: Category[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  if (categories.length === 0) return null;

  return (
    <div className="bg-card border border-primary/20 rounded-lg px-4 py-4 space-y-3">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-md bg-primary/10">
          <Folder className="h-4 w-4 text-primary" />
        </div>
        <h2 className="text-sm font-medium text-foreground">
          Matching Categories
        </h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/${category.url_slug || category.slug}`}
          >
            <Badge 
              variant="secondary" 
              className="text-sm py-1.5 px-3 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            >
              {category.name}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}