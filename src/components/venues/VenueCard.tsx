'use client';

import Link from 'next/link';
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { VenueListing } from "@/hooks/useVenues";
import { FavouriteButton } from "@/components/FavouriteButton";
import { TierStar } from "@/components/TierBadge";
import { cn } from "@/lib/utils";
import { getVenueUrl } from "@/hooks/useVenueUrl";
import { ListingTier } from "@/types/database";

interface VenueCardProps {
  venue: VenueListing;
  isHighlighted?: boolean;
  onHover?: () => void;
  onHoverEnd?: () => void;
}

const VENUE_TYPE_COLORS: Record<string, string> = {
  "Arena": "bg-accent/20 text-accent border-accent/40",
  "Amphitheatre": "bg-accent-teal/20 text-accent-teal border-accent-teal/40",
  "Bar": "bg-tier-free/20 text-tier-free border-tier-free/40",
  "Club": "bg-accent-violet/20 text-accent-violet border-accent-violet/40",
  "Concert Hall": "bg-primary/20 text-primary border-primary/40",
  "Convention Centre": "bg-muted-foreground/20 text-muted-foreground border-muted-foreground/40",
  "Cultural Centre": "bg-accent-teal/20 text-accent-teal border-accent-teal/40",
  "Opera House": "bg-primary/20 text-primary border-primary/40",
  "Outdoor Venue": "bg-accent/20 text-accent border-accent/40",
  "Performing Arts Centre": "bg-accent-violet/20 text-accent-violet border-accent-violet/40",
  "Stadium": "bg-accent/20 text-accent border-accent/40",
  "Theatre": "bg-primary/20 text-primary border-primary/40",
};

function formatCapacity(capacity: number | null): string {
  if (!capacity) return "";
  if (capacity >= 1000) {
    return `${(capacity / 1000).toFixed(capacity >= 10000 ? 0 : 1)}k cap`;
  }
  return `${capacity} cap`;
}

export function VenueCard({
  venue,
  isHighlighted,
  onHover,
  onHoverEnd,
}: VenueCardProps) {
  const typeColorClass = venue.venue_type ? VENUE_TYPE_COLORS[venue.venue_type] || "bg-muted text-muted-foreground" : "";
  const tier = (venue.tier || 'free') as ListingTier;
  const isPremier = tier === 'premier';
  const isEnhanced = tier === 'enhanced';
  
  // Build SEO-friendly venue URL
  const venueUrl = getVenueUrl({
    slug: venue.slug,
    country: venue.country,
    region_slug: venue.region_slug || null,
    town_city: venue.town_city,
  });

  const cardContent = (
    <div
      className={cn(
        "px-3 py-2 rounded-lg border transition-all duration-200 relative flex items-center gap-3",
        // Background tint based on tier
        isPremier && !isHighlighted && "bg-primary/[0.03]",
        isEnhanced && !isHighlighted && "bg-accent/[0.03]",
        // Highlighted state (from map)
        isHighlighted && "bg-primary/10 border-primary shadow-glow-pink",
        // Default border
        !isHighlighted && "border-border",
        // Hover states based on tier
        !isHighlighted && isPremier && "hover:bg-primary/[0.08] hover:border-primary/50 hover:shadow-[0_0_15px_hsl(330_80%_55%/0.15)]",
        !isHighlighted && isEnhanced && "hover:bg-accent/[0.08] hover:border-accent/50 hover:shadow-[0_0_15px_hsl(185_100%_50%/0.15)]",
        !isHighlighted && !isPremier && !isEnhanced && "hover:bg-muted/50 hover:border-muted-foreground/30"
      )}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
      data-venue-id={venue.id}
    >
      {/* Tier Star */}
      <TierStar tier={tier} className="flex-shrink-0" />
      
      {/* Main content */}
      <div className="flex-1 min-w-0">
        <span className={cn(
          "font-medium text-sm transition-colors line-clamp-1",
          isPremier && "group-hover:text-primary",
          isEnhanced && "group-hover:text-accent",
          !isPremier && !isEnhanced && "group-hover:text-foreground"
        )}>
          {venue.name}
        </span>
        
        <div className="flex flex-wrap items-center gap-1.5 mt-1">
          {venue.venue_type && (
            <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 h-4", typeColorClass)}>
              {venue.venue_type}
            </Badge>
          )}
          {venue.venue_capacity && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-muted/50 gap-0.5">
              <Users className="h-2.5 w-2.5" />
              {formatCapacity(venue.venue_capacity)}
            </Badge>
          )}
          {(venue.town_city || venue.country) && (
            <span className="text-[10px] text-muted-foreground">
              {[venue.town_city, venue.country].filter(Boolean).join(", ")}
            </span>
          )}
        </div>
      </div>

      {/* Favourite button - stop propagation to prevent navigation when clicking */}
      <div onClick={(e) => e.stopPropagation()}>
        <FavouriteButton listingId={venue.id} size="sm" />
      </div>
    </div>
  );

  if (venueUrl) {
    return (
      <Link href={venueUrl} className="group block cursor-pointer">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
