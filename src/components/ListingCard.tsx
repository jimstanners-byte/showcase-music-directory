import Link from 'next/link';
import { MapPin, Globe, Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TierStar } from "@/components/TierBadge";
import { Listing, ListingPublic } from "@/types/database";
import { cn } from "@/lib/utils";

interface ListingCardProps {
  listing: Listing | ListingPublic;
  className?: string;
}

// Generate a deterministic color based on the company name - updated for dark theme
const AVATAR_COLORS = [
  "bg-primary/80",
  "bg-accent-cyan/80",
  "bg-accent-violet/80",
  "bg-accent-teal/80",
  "bg-primary/60",
  "bg-accent-cyan/60",
  "bg-accent-violet/60",
  "bg-accent-teal/60",
];

function getInitials(name: string): string {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
}

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function ListingCard({ listing, className }: ListingCardProps) {
  const isPaid = listing.tier === 'premier' || listing.tier === 'enhanced';
  const initials = getInitials(listing.name);
  const avatarColor = getAvatarColor(listing.name);

  const content = (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md h-full",
      isPaid && "hover:border-primary/50 hover-glow",
      listing.tier === 'premier' && "border-primary/30",
      className
    )}>
      <CardContent className="p-3 sm:p-4 h-full">
        <div className="flex items-start gap-3 sm:gap-4 h-full">
          {/* Avatar/Logo box - shown for all tiers */}
          <div className={cn(
            "shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden flex items-center justify-center",
            !listing.logo_url && avatarColor
          )}>
            {listing.logo_url ? (
              <img
                src={listing.logo_url}
                alt={`${listing.name} logo`}
                className="w-full h-full object-contain bg-secondary"
              />
            ) : (
              <span className="text-primary-foreground font-bold text-lg">{initials}</span>
            )}
          </div>

          <div className="flex-1 min-w-0 overflow-hidden flex flex-col h-full">
            <div className="flex items-center gap-2 mb-1">
              <TierStar tier={listing.tier} />
              <h3 className={cn(
                "font-semibold truncate",
                isPaid && "text-foreground",
                !isPaid && "text-muted-foreground"
              )}>
                {listing.name}
              </h3>
            </div>

            {/* Short description for paid tiers */}
            {isPaid && listing.short_description && (
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2">
                {listing.short_description}
              </p>
            )}

            {/* Spacer to push location and website to bottom */}
            <div className="flex-1" />

            {/* Location and website - pinned to bottom */}
            <div className="mt-auto pt-2 space-y-1">
              {(listing.town_city || listing.country) && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>
                    {[listing.town_city, listing.country].filter(Boolean).join(", ")}
                  </span>
                </div>
              )}

              {isPaid && listing.website && (
                <div className="flex items-center gap-1 text-sm text-primary">
                  <Globe className="h-3 w-3" />
                  <span className="truncate">{listing.website.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
            </div>

            {/* Contact info for free tier (inline) */}
            {!isPaid && (
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                {listing.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {listing.phone}
                  </span>
                )}
                {listing.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {listing.email}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Paid tiers link to profile page, free tier doesn't
  if (isPaid) {
    return (
      <Link href={`/listing/${listing.slug}`} className="block">
        {content}
      </Link>
    );
  }

  return content;
}