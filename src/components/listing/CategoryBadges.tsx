'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/database";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CategoryBadgesProps {
  categories: Category[];
  primaryCategoryId?: string | null;
}

export function CategoryBadges({ categories, primaryCategoryId }: CategoryBadgesProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  // Sort categories: primary first, then rest
  const sortedCategories = [...categories].sort((a, b) => {
    if (a.id === primaryCategoryId) return -1;
    if (b.id === primaryCategoryId) return 1;
    return 0;
  });

  // Measure which badges fit in 2 lines
  const calculateVisibleCount = useCallback(() => {
    if (!measureRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const badges = measureRef.current.querySelectorAll("[data-badge]");
    if (badges.length === 0) return;

    const containerWidth = container.offsetWidth;
    const lineHeight = 32; // Approximate badge height + gap
    const maxHeight = lineHeight * 2 + 8; // 2 lines with some buffer

    let currentLineTop = 0;
    let lineCount = 1;
    let lastVisibleIndex = badges.length - 1;

    badges.forEach((badge, index) => {
      const rect = badge.getBoundingClientRect();
      const containerRect = measureRef.current!.getBoundingClientRect();
      const relativeTop = rect.top - containerRect.top;

      if (relativeTop > currentLineTop + lineHeight / 2) {
        lineCount++;
        currentLineTop = relativeTop;
      }

      if (lineCount > 2 && lastVisibleIndex === badges.length - 1) {
        // Found first badge on line 3+
        lastVisibleIndex = Math.max(0, index - 1);
      }
    });

    if (lineCount <= 2) {
      setVisibleCount(null); // All fit
    } else {
      setVisibleCount(lastVisibleIndex);
    }
  }, []);

  // Calculate on mount and resize
  useEffect(() => {
    calculateVisibleCount();

    const handleResize = () => {
      setIsExpanded(false);
      calculateVisibleCount();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateVisibleCount, categories]);

  // Recalculate when categories change
  useEffect(() => {
    calculateVisibleCount();
  }, [categories, calculateVisibleCount]);

  // Auto-collapse on scroll
  useEffect(() => {
    if (!isExpanded) return;

    const handleScroll = () => {
      setIsExpanded(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isExpanded]);

  if (categories.length === 0) return null;

  const displayCategories =
    isExpanded || visibleCount === null ? sortedCategories : sortedCategories.slice(0, visibleCount);

  const hiddenCount = visibleCount !== null ? sortedCategories.length - visibleCount : 0;

  return (
    <div ref={containerRef} className="relative">
      {/* Hidden measurement container */}
      <div ref={measureRef} className="flex flex-wrap gap-2 invisible absolute top-0 left-0 right-0" aria-hidden="true">
        {sortedCategories.map((category) => (
          <div key={category.id} data-badge>
            <Badge variant="secondary" className="whitespace-nowrap">
              {category.name}
            </Badge>
          </div>
        ))}
      </div>
      {/* Visible badges */}
      <div className="flex flex-wrap gap-2 items-center">
        {displayCategories.map((category) => (
          <Link key={category.id} href={`/${category.url_slug || category.slug}`}>
            <Badge
              variant="secondary"
              className={`hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer whitespace-nowrap animate-in fade-in-0 slide-in-from-left-1 ${
                category.id === primaryCategoryId ? "ring-1 ring-primary/50" : ""
              }`}
            >
              {category.name}
            </Badge>
          </Link>
        ))}

        {/* Show more/less button */}
        {visibleCount !== null && hiddenCount > 0 && !isExpanded && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-all duration-200 animate-in fade-in-0"
            onClick={() => setIsExpanded(true)}
          >
            <span>+{hiddenCount} more</span>
            <ChevronDown className="h-3 w-3 transition-transform duration-200" />
          </Button>
        )}

        {isExpanded && visibleCount !== null && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-all duration-200 animate-in fade-in-0"
            onClick={() => setIsExpanded(false)}
          >
            <span>Show less</span>
            <ChevronUp className="h-3 w-3 transition-transform duration-200" />
          </Button>
        )}
      </div>
    </div>
  );
}
