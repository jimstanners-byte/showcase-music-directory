import { Star } from "lucide-react";
import { ListingTier } from "@/types/database";
import { cn } from "@/lib/utils";

interface TierBadgeProps {
  tier: ListingTier;
  showLabel?: boolean;
  className?: string;
}

const tierConfig = {
  premier: {
    label: "Premier",
    colorClass: "text-tier-premier",
    bgClass: "bg-tier-premier/20 border-tier-premier/40",
    glowClass: "shadow-glow-pink",
  },
  enhanced: {
    label: "Enhanced",
    colorClass: "text-tier-enhanced",
    bgClass: "bg-tier-enhanced/20 border-tier-enhanced/40",
    glowClass: "shadow-glow-cyan",
  },
  free: {
    label: "Free",
    colorClass: "text-tier-free",
    bgClass: "bg-tier-free/20 border-tier-free/40",
    glowClass: "",
  },
};

export function TierBadge({ tier, showLabel = false, className }: TierBadgeProps) {
  const config = tierConfig[tier];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border",
        config.bgClass,
        config.colorClass,
        tier !== 'free' && config.glowClass,
        className
      )}
    >
      <Star className="h-3 w-3 fill-current" />
      {showLabel && <span>{config.label}</span>}
    </div>
  );
}

export function TierStar({ tier, className }: { tier: ListingTier; className?: string }) {
  const config = tierConfig[tier];
  
  return (
    <Star className={cn("h-4 w-4 fill-current", config.colorClass, className)} />
  );
}