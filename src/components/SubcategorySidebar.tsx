import Link from 'next/link';
import { Category } from "@/types/database";
import { ChevronRight } from "lucide-react";

interface SubcategorySidebarProps {
  subcategories: Category[];
  parentSlug: string;
}

export function SubcategorySidebar({ subcategories, parentSlug }: SubcategorySidebarProps) {
  return (
    <aside className="bg-card border rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b bg-muted/30">
        <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
          Subcategories
        </h3>
      </div>
      <nav className="divide-y divide-border">
        {subcategories.map((sub) => (
          <Link
            key={sub.id}
            href={`/${sub.url_slug || sub.slug}`}
            className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors group"
          >
            <span className="text-sm font-medium group-hover:text-primary transition-colors">
              {sub.name}
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </nav>
    </aside>
  );
}
