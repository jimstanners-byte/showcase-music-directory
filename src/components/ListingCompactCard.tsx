'use client';

import { useRouter } from 'next/navigation';
import { Listing, ListingPublic, ListingTier } from "@/types/database";
import { FavouriteButton } from "@/components/FavouriteButton";
import { TierStar } from "@/components/TierBadge";
import { cn } from "@/lib/utils";
import { trackListingView } from "@/hooks/useAnalytics";

interface ListingCompactCardProps {
  listing: Listing | ListingPublic;
  isHighlighted?: boolean;
  onHover?: () => void;
  onHoverEnd?: () => void;
  locationMode?: "country" | "city";
  // Referrer context for breadcrumbs
  categoryName?: string;
  categorySlug?: string;
  locationName?: string;
  referrerPath?: string; // Full path back to the listing page (e.g., /backline-hire/europe/bulgaria/sofia)
}

export function ListingCompactCard({
  listing,
  isHighlighted,
  onHover,
  onHoverEnd,
  locationMode = "city",
  categoryName,
  categorySlug,
  locationName,
  referrerPath,
}: ListingCompactCardProps) {
  const router = useRouter();
  const tier = (listing.tier || "free") as ListingTier;
  const isPremier = tier === "premier";
  const isEnhanced = tier === "enhanced";
  const isFree = tier === "free";

  const location = locationMode === "country" ? listing.country : listing.town_city;

  const handleClick = (e: React.MouseEvent) => {
    // Track view for free listings
    if (isFree) {
      trackListingView(listing.id);
    }
    // Build URL with referrer context for breadcrumbs
    const params = new URLSearchParams();
    if (categoryName) params.set("cat", categoryName);
    if (categorySlug) params.set("catSlug", categorySlug);
    if (locationName) params.set("loc", locationName);
    if (referrerPath) params.set("ref", referrerPath);

    const queryString = params.toString();
    const url = `/listing/${listing.slug}${queryString ? `?${queryString}` : ""}`;
    router.push(url);
  };

  return (
    <div className="group block">
      <div
        className={cn(
          "px-3 py-2 rounded-lg border transition-all duration-200 relative flex items-center gap-3 cursor-pointer",
          // Background tint based on tier
          isPremier && !isHighlighted && "bg-primary/[0.03]",
          isEnhanced && !isHighlighted && "bg-accent/[0.03]",
          // Highlighted state (from map)
          isHighlighted && "bg-primary/10 border-primary shadow-glow-pink",
          // Default border
          !isHighlighted && "border-border",
          // Hover states based on tier
          !isHighlighted &&
            isPremier &&
            "hover:bg-primary/[0.08] hover:border-primary/50 hover:shadow-[0_0_15px_hsl(330_80%_55%/0.15)]",
          !isHighlighted &&
            isEnhanced &&
            "hover:bg-accent/[0.08] hover:border-accent/50 hover:shadow-[0_0_15px_hsl(185_100%_50%/0.15)]",
          !isHighlighted && isFree && "hover:bg-muted/50 hover:border-muted-foreground/30",
        )}
        onMouseEnter={onHover}
        onMouseLeave={onHoverEnd}
        onClick={handleClick}
        data-listing-id={listing.id}
      >
        {/* Tier Star */}
        <TierStar tier={tier} className="flex-shrink-0" />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <span
            className={cn(
              "font-medium text-sm transition-colors line-clamp-1",
              isPremier && "group-hover:text-primary",
              isEnhanced && "group-hover:text-accent",
              !isPremier && !isEnhanced && "group-hover:text-foreground",
            )}
          >
            {listing.name}
          </span>

          {location && (
            <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
              <span className="text-[11px] text-muted-foreground">{location}</span>
            </div>
          )}
        </div>

        {/* Favourite button - stop propagation to prevent navigation when clicking */}
        <div onClick={(e) => e.stopPropagation()}>
          <FavouriteButton listingId={listing.id} size="sm" />
        </div>
      </div>
    </div>
  );
}
