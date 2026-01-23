import Link from 'next/link';
import { Category } from "@/types/database";
import { Badge } from "@/components/ui/badge";
import { Folder } from "lucide-react";

interface CategoryFilterProps {
  searchTerm: string;
  categories: Category[];
}

export function CategoryFilter({ searchTerm, categories }: CategoryFilterProps) {
  if (categories.length === 0) return null;

  return (
    <div className="bg-card border rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Folder className="h-5 w-5 text-primary" />
        <h2 className="font-semibold text-lg">
          Categories matching "{searchTerm}"
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
