'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Listing, ListingPublic } from "@/types/database";
import { TierStar } from "@/components/TierBadge";
import { cn } from "@/lib/utils";
import { FavouriteButton } from "@/components/FavouriteButton";

interface ListingRowProps {
  listing: Listing | ListingPublic;
  locationMode: "country" | "city";
  expandedId?: string | null;
  onToggleExpand?: (id: string) => void;
  index?: number;
}

export function ListingRow({ listing, locationMode }: ListingRowProps) {
  const router = useRouter();
  const isPremier = listing.tier === "premier";
  const isEnhanced = listing.tier === "enhanced";
  const isFree = listing.tier === "free";

  const location = locationMode === "country" ? listing.country : listing.town_city;

  const handleClick = () => {
    // All listings now have their own pages - navigate directly
    router.push(`/listing/${listing.slug}`);
  };

  const NameContent = () => (
    <span className="font-medium text-sm sm:text-base transition-colors duration-200">{listing.name}</span>
  );

  // Tier-based styling
  const rowStyles = cn(
    // Base styles - transparent left border at rest, CSS handles hover color via data-tier
    "border-b border-border last:border-b-0 transition-all duration-200 border-l-[3px] border-l-transparent",
    // Background tint based on tier
    isPremier && "bg-primary/[0.03]",
    isEnhanced && "bg-accent/[0.03]",
  );

  // Tier-based hover styles
  const hoverStyles = cn(
    "flex items-center justify-between px-3 py-2.5 sm:px-4 sm:py-3 gap-2 sm:gap-4 cursor-pointer transition-all duration-200 group",
    // Hover states based on tier
    isPremier && "hover:bg-primary/[0.08] hover:shadow-[0_0_20px_hsl(330_80%_55%/0.15)]",
    isEnhanced && "hover:bg-accent/[0.08] hover:shadow-[0_0_20px_hsl(185_100%_50%/0.15)]",
    isFree && "hover:bg-muted/50",
  );

  return (
    <div className={rowStyles} data-tier={listing.tier}>
      {/* Main Row */}
      <div className={hoverStyles} onClick={handleClick}>
        {/* Mobile: Stack name and location */}
        <div className="flex items-start sm:items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <TierStar tier={listing.tier} className="flex-shrink-0 mt-0.5 sm:mt-0" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between min-w-0 flex-1 gap-0.5 sm:gap-4">
            {/* Name - all listings link to their profile page */}
            <Link
              href={`/listing/${listing.slug}`}
              className="text-foreground group-hover:text-primary transition-colors duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <NameContent />
            </Link>

            {/* Location - below name on mobile, inline on desktop */}
            {location && <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">{location}</span>}
          </div>
        </div>

        {/* Favourite Button */}
        <FavouriteButton listingId={listing.id} size="sm" />
      </div>
    </div>
  );
}
