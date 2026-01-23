'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from "@/lib/utils";
import { useActiveAdsByPosition } from '@/hooks/useAds';
import { trackAdView, trackAdClick } from '@/hooks/useAnalytics';
import { useEffect, useRef } from 'react';

type SkyscraperSize = "wide" | "half-page" | "compact";

interface AdSkyscraperProps {
  size?: SkyscraperSize;
  sticky?: boolean;
  className?: string;
  adSlot?: string;
  categoryId?: string | null;
  country?: string | null;
}

const sizeClasses: Record<SkyscraperSize, string> = {
  wide: "w-[160px] h-[600px]",
  "half-page": "w-[300px] h-[600px]",
  compact: "w-[160px] h-[300px]",
};

export const AdSkyscraper = ({ size = "wide", sticky = false, className, adSlot, categoryId, country }: AdSkyscraperProps) => {
  const { data: ad } = useActiveAdsByPosition('skyscraper', categoryId, country);
  const pathname = usePathname();
  const trackedRef = useRef<string | null>(null);

  useEffect(() => {
    if (ad && trackedRef.current !== ad.id) {
      trackedRef.current = ad.id;
      trackAdView(ad.id, pathname);
    }
  }, [ad, pathname]);

  const handleClick = () => {
    if (ad) {
      trackAdClick(ad.id, pathname);
    }
  };

  // Show placeholder if no active ad
  if (!ad) {
    return (
      <div
        className={cn(
          "hidden lg:flex justify-center",
          sticky && "sticky top-4",
          className
        )}
      >
        <div
          className={cn(
            "bg-secondary/50 border border-dashed border-border rounded-lg flex items-center justify-center",
            sizeClasses[size]
          )}
          data-ad-slot={adSlot}
        >
          <span className="text-xs text-muted-foreground uppercase tracking-wide text-center">
            Advertisement
          </span>
        </div>
      </div>
    );
  }

  // Show actual ad
  const adContent = (
    <img
      src={ad.image_url}
      alt={ad.alt_text || ad.name}
      className={cn("object-contain rounded-lg", sizeClasses[size])}
    />
  );

  return (
    <div
      className={cn(
        "hidden lg:flex justify-center",
        sticky && "sticky top-4",
        className
      )}
    >
      {ad.link_url ? (
        <a
          href={ad.link_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="block"
        >
          {adContent}
        </a>
      ) : (
        adContent
      )}
    </div>
  );
};

export default AdSkyscraper;