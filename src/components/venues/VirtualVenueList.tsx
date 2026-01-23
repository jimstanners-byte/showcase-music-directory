'use client';

import { useRef, useCallback, memo, ReactNode, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { VenueListing } from "@/hooks/useVenues";
import { VenueCard } from "./VenueCard";

interface VirtualVenueListProps {
  venues: VenueListing[];
  highlightedVenueId: string | null;
  onHoverVenue: (venueId: string | null) => void;
  className?: string;
  footer?: ReactNode;
  onScroll?: () => void;
  // Scroll position persistence
  initialScrollTop?: number;
  onScrollPositionChange?: (scrollTop: number) => void;
}

// Memoized venue card to prevent unnecessary re-renders
const MemoizedVenueCard = memo(function MemoizedVenueCard({
  venue,
  isHighlighted,
  onHover,
  onHoverEnd,
}: {
  venue: VenueListing;
  isHighlighted: boolean;
  onHover: () => void;
  onHoverEnd: () => void;
}) {
  return <VenueCard venue={venue} isHighlighted={isHighlighted} onHover={onHover} onHoverEnd={onHoverEnd} />;
});

export function VirtualVenueList({
  venues,
  highlightedVenueId,
  onHoverVenue,
  className,
  footer,
  onScroll,
  initialScrollTop,
  onScrollPositionChange,
}: VirtualVenueListProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const hasRestoredScroll = useRef(false);

  // Virtual list - only renders visible items
  const virtualizer = useVirtualizer({
    count: venues.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72, // Height estimate - accounts for 2-line cards with badges
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
      venues.length > 0
    ) {
      // Small delay to ensure virtualizer has rendered
      requestAnimationFrame(() => {
        if (parentRef.current) {
          parentRef.current.scrollTop = initialScrollTop;
          hasRestoredScroll.current = true;
        }
      });
    }
  }, [initialScrollTop, venues.length]);

  // Debounced hover handlers
  const handleHover = useCallback(
    (venueId: string) => {
      onHoverVenue(venueId);
    },
    [onHoverVenue],
  );

  const handleHoverEnd = useCallback(() => {
    onHoverVenue(null);
  }, [onHoverVenue]);

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
          const venue = venues[virtualItem.index];
          return (
            <div
              key={venue.id}
              data-venue-id={venue.id}
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
              <MemoizedVenueCard
                venue={venue}
                isHighlighted={highlightedVenueId === venue.id}
                onHover={() => handleHover(venue.id)}
                onHoverEnd={handleHoverEnd}
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
