import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/types/database";
import { Music, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { categoryIcons } from "@/components/CategoryIcons";

interface CategoryCardProps {
  category: Category;
  listingCount?: number;
  className?: string;
}

export function CategoryCard({ category, listingCount, className }: CategoryCardProps) {
  const slug = category.url_slug || category.slug;
  const CustomIcon = categoryIcons[slug as keyof typeof categoryIcons];
  const categoryUrl = `/${slug}`;

  return (
    <Link href={categoryUrl} className="h-full block">
      <Card
        className={cn(
          "transition-all duration-200 hover:shadow-md hover:border-primary/50 group hover-glow h-full",
          className,
        )}
      >
        <CardContent className="p-3 md:p-6 flex flex-col md:flex-row items-center gap-2 md:gap-4 h-full">
          <div className="p-2 md:p-3 rounded-lg bg-primary/10 text-primary group-hover:gradient-brand group-hover:text-primary-foreground transition-all duration-200 shrink-0">
            {CustomIcon ? (
              <CustomIcon className="h-5 w-5 md:h-6 md:w-6" />
            ) : (
              <Music className="h-5 w-5 md:h-6 md:w-6" />
            )}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm md:text-base">
              {category.name}
            </h3>
            {category.card_tagline && (
              <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 md:mt-1 line-clamp-2">
                {category.card_tagline}
              </p>
            )}
            {listingCount !== undefined && (
              <p className="text-xs md:text-sm text-muted-foreground">
                {listingCount} listing{listingCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
