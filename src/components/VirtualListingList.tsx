'use client';

import { useRef, useCallback, memo, ReactNode, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Listing, ListingPublic } from "@/types/database";
import { ListingCompactCard } from "./ListingCompactCard";

interface VirtualListingListProps {
  listings: (Listing | ListingPublic)[];
  highlightedListingId: string | null;
  onHoverListing: (listingId: string | null) => void;
  onFlyToListing?: (listing: Listing | ListingPublic) => void;
  locationMode?: "country" | "city";
  className?: string;
  footer?: ReactNode;
  // Referrer context for breadcrumbs
  categoryName?: string;
  categorySlug?: string;
  locationName?: string;
  referrerPath?: string;
  onScroll?: () => void;
  // Scroll position persistence
  initialScrollTop?: number;
  onScrollPositionChange?: (scrollTop: number) => void;
}

// Memoized listing card to prevent unnecessary re-renders
const MemoizedListingCard = memo(function MemoizedListingCard({
  listing,
  isHighlighted,
  onHover,
  onHoverEnd,
  onFlyTo,
  locationMode,
  categoryName,
  categorySlug,
  locationName,
  referrerPath,
}: {
  listing: Listing | ListingPublic;
  isHighlighted: boolean;
  onHover: () => void;
  onHoverEnd: () => void;
  onFlyTo?: (listing: Listing | ListingPublic) => void;
  locationMode: "country" | "city";
  categoryName?: string;
  categorySlug?: string;
  locationName?: string;
  referrerPath?: string;
}) {
  return (
    <ListingCompactCard
      listing={listing}
      isHighlighted={isHighlighted}
      onHover={onHover}
      onHoverEnd={onHoverEnd}
      onFlyTo={onFlyTo}
      locationMode={locationMode}
      categoryName={categoryName}
      categorySlug={categorySlug}
      locationName={locationName}
      referrerPath={referrerPath}
    />
  );
});

export function VirtualListingList({
  listings,
  highlightedListingId,
  onHoverListing,
  onFlyToListing,
  locationMode = "city",
  className,
  footer,
  categoryName,
  categorySlug,
  locationName,
  referrerPath,
  onScroll,
  initialScrollTop,
  onScrollPositionChange,
}: VirtualListingListProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const hasRestoredScroll = useRef(false);

  // Virtual list - only renders visible items
  const virtualizer = useVirtualizer({
    count: listings.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 68, // Height estimate - accounts for 2-line cards
    overscan: 5, // Render 5 extra items above/below viewport for smooth scrolling
  });

  const items = virtualizer.getVirtualItems();

  // Restore scroll position after initial render
  useEffect(() => {
    if (
      initialScrollTop !== undefined &&
      initialScrollTop > 0 &&
      parentRef.current &&
      !hasRestoredScroll.current &&
      listings.length > 0
    ) {
      // Small delay to ensure virtualizer has rendered
      requestAnimationFrame(() => {
        if (parentRef.current) {
          parentRef.current.scrollTop = initialScrollTop;
          hasRestoredScroll.current = true;
        }
      });
    }
  }, [initialScrollTop, listings.length]);

  // Debounced hover handlers
  const handleHover = useCallback(
    (listingId: string) => {
      onHoverListing(listingId);
    },
    [onHoverListing],
  );

  const handleHoverEnd = useCallback(() => {
    onHoverListing(null);
  }, [onHoverListing]);

  // Combined scroll handler
  const handleScroll = useCallback(() => {
    onScroll?.();
    if (parentRef.current && onScrollPositionChange) {
      onScrollPositionChange(parentRef.current.scrollTop);
    }
  }, [onScroll, onScrollPositionChange]);

  return (
    <div ref={parentRef} className={className} style={{ overflow: "auto", contain: "strict" }} onScroll={handleScroll}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {items.map((virtualItem) => {
          const listing = listings[virtualItem.index];
          return (
            <div
              key={listing.id}
              data-listing-id={listing.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
                padding: "3px 0",
              }}
            >
              <MemoizedListingCard
                listing={listing}
                isHighlighted={highlightedListingId === listing.id}
                onHover={() => handleHover(listing.id)}
                onHoverEnd={handleHoverEnd}
                onFlyTo={onFlyToListing}
                locationMode={locationMode}
                categoryName={categoryName}
                categorySlug={categorySlug}
                locationName={locationName}
                referrerPath={referrerPath}
              />
            </div>
          );
        })}
      </div>
      {/* Footer section - rendered after virtual list, in DOM for SEO */}
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}