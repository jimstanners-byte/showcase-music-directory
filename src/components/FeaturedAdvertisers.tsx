'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo, useEffect, useRef } from 'react';
import { useFeaturedAds, Ad } from '@/hooks/useAds';
import { trackAdView, trackAdClick } from '@/hooks/useAnalytics';
import { cn } from '@/lib/utils';

interface FeaturedAdvertisersProps {
  categoryId?: string;
  pageId?: string;
  parentCategoryId?: string;
  country?: string;
  className?: string;
}

// Fisher-Yates shuffle for true randomization
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const FeaturedAdvertisers = ({ categoryId, pageId, parentCategoryId, country, className }: FeaturedAdvertisersProps) => {
  const { data, isLoading } = useFeaturedAds(categoryId, pageId, parentCategoryId, country);
  const pathname = usePathname();
  const trackedAdsRef = useRef<Set<string>>(new Set());

  // Build the final 4 ads based on priority logic with randomization
  // Priority varies by page type
  const displayAds = useMemo(() => {
    if (!data) return [];

    const { exactMatchAds, categoryOnlyAds, pageAds, childCategoryAds, siteWideAds } = data;
    const result: Ad[] = [];
    const SLOTS = 5;
    const usedIds = new Set<string>();

    const addAds = (ads: Ad[], count: number) => {
      const shuffled = shuffleArray(ads.filter(ad => !usedIds.has(ad.id)));
      const toAdd = shuffled.slice(0, count);
      toAdd.forEach(ad => usedIds.add(ad.id));
      return toAdd;
    };

    // Homepage: site-wide only
    if (pageId === 'home') {
      return shuffleArray(siteWideAds).slice(0, SLOTS);
    }

    // A-Z Listing: page-specific → site-wide
    if (pageId === 'a-z-listing') {
      result.push(...addAds(pageAds, SLOTS));
      if (result.length < SLOTS) {
        result.push(...addAds(siteWideAds, SLOTS - result.length));
      }
      return result;
    }

    // Parent category: page-specific → child category ads → site-wide
    if (pageId?.startsWith('parent:')) {
      result.push(...addAds(pageAds, SLOTS));
      if (result.length < SLOTS) {
        result.push(...addAds(childCategoryAds, SLOTS - result.length));
      }
      if (result.length < SLOTS) {
        result.push(...addAds(siteWideAds, SLOTS - result.length));
      }
      return result;
    }

    // Leaf category: exact match (category + country) → category only → site-wide
    result.push(...addAds(exactMatchAds, SLOTS));
    if (result.length < SLOTS) {
      result.push(...addAds(categoryOnlyAds, SLOTS - result.length));
    }
    if (result.length < SLOTS) {
      result.push(...addAds(siteWideAds, SLOTS - result.length));
    }
    return result;
  }, [data, pageId]);

  // Track ad views
  useEffect(() => {
    displayAds.forEach(ad => {
      if (!trackedAdsRef.current.has(ad.id)) {
        trackedAdsRef.current.add(ad.id);
        trackAdView(ad.id, pathname);
      }
    });
  }, [displayAds, pathname]);

  const handleAdClick = (adId: string) => {
    trackAdClick(adId, pathname);
  };

  // Responsive: on small screens show max 4 ads in 2x2 grid
  const responsiveAds = displayAds;

  if (isLoading) {
    return (
      <div className={cn(
        "flex flex-col items-center", // Desktop: vertical stack
        "max-lg:grid max-lg:grid-cols-4 max-lg:gap-3 max-lg:justify-items-center", // Tablet: 4 columns
        "max-sm:grid-cols-2 max-sm:gap-2", // Mobile: 2 columns
        className
      )}>
        {[1, 2, 3, 4].map((slot, index) => (
          <div key={slot}>
            {/* Divider only on desktop */}
            {index > 0 && (
              <div className="w-[120px] h-8 flex items-center max-lg:hidden">
                <div className="w-full border-t border-white/20" />
              </div>
            )}
            {/* Divider only on desktop */}
            {index > 0 && (
              <div className="w-[120px] h-8 flex items-center max-lg:hidden">
                <div className="w-full border-t border-white/20" />
              </div>
            )}
            <div className="overflow-hidden h-[240px] w-[120px] max-lg:h-[200px] max-lg:w-[100px] max-sm:h-[160px] max-sm:w-[80px]">
              <div className="w-full h-full bg-muted/30 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Show placeholders if no ads available
  if (responsiveAds.length === 0) {
    return (
      <div className={cn(
        "flex flex-col items-center",
        "max-lg:grid max-lg:grid-cols-4 max-lg:gap-3 max-lg:justify-items-center", // Tablet: 4 columns
        "max-sm:grid-cols-2 max-sm:gap-2", // Mobile: 2 columns
        className
      )}>
        {[1, 2, 3, 4].map((slot, index) => (
          <div key={slot}>
            {index > 0 && (
              <div className="w-[120px] h-8 flex items-center max-lg:hidden">
                <div className="w-full border-t border-white/20" />
              </div>
            )}
            <div className="overflow-hidden h-[240px] w-[120px] max-lg:h-[200px] max-lg:w-[100px] max-sm:h-[160px] max-sm:w-[80px] bg-muted/20 flex items-center justify-center">
              <span className="text-muted-foreground text-xs">Ad Slot {slot}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
      <div className={cn(
        "flex flex-col items-center", // Desktop: vertical stack
        "max-lg:grid max-lg:grid-cols-4 max-lg:gap-3 max-lg:justify-items-center", // Tablet: 4 columns
        "max-sm:grid-cols-2 max-sm:gap-2", // Mobile: 2 columns
        className
      )}>
      {responsiveAds.map((ad, index) => (
        <div 
          key={`${ad.id}-${index}`}
          className={cn(
            // Hide 5th ad on tablet and below
            index >= 4 && "max-lg:hidden"
          )}
        >
          {/* Divider only on desktop */}
          {index > 0 && (
            <div className="w-[120px] h-8 flex items-center max-lg:hidden">
              <div className="w-full border-t border-white/20" />
            </div>
          )}
          <div className="overflow-hidden h-[240px] w-[120px] max-lg:h-[200px] max-lg:w-[100px] max-sm:h-[160px] max-sm:w-[80px]">
            {ad.link_url ? (
              <a
                href={ad.link_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleAdClick(ad.id)}
                className="block w-full h-full hover:opacity-90 transition-opacity"
              >
                <img
                  src={ad.image_url}
                  alt={ad.alt_text || ad.name}
                  className="w-full h-full object-cover"
                />
              </a>
            ) : (
              <img
                src={ad.image_url}
                alt={ad.alt_text || ad.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedAdvertisers;
