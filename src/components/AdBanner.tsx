'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from "@/lib/utils";
import { useRotatingAds } from '@/hooks/useAds';
import { trackAdView, trackAdClick } from '@/hooks/useAnalytics';
import { useEffect, useRef, useState } from 'react';

type BannerSize = "leaderboard" | "banner" | "mobile-banner";

interface AdBannerProps {
  size?: BannerSize;
  className?: string;
  adSlot?: string;
  categoryId?: string | null;
  country?: string | null;
}

const sizeClasses: Record<BannerSize, string> = {
  leaderboard: "h-[90px] w-full max-w-full",
  banner: "h-[60px] max-w-[468px]",
  "mobile-banner": "h-[50px] max-w-[320px]",
};

const DEFAULT_ROTATION_INTERVAL = 6000; // 6 seconds in ms

export const AdBanner = ({ size = "leaderboard", className, adSlot, categoryId, country }: AdBannerProps) => {
  const { data: ads } = useRotatingAds(size, categoryId, country);
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackedAdsRef = useRef<Set<string>>(new Set());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get current ad
  const currentAd = ads && ads.length > 0 ? ads[currentIndex % ads.length] : null;
  
  // Get rotation interval from current ad or use default
  const rotationInterval = currentAd?.rotation_interval 
    ? currentAd.rotation_interval * 1000 
    : DEFAULT_ROTATION_INTERVAL;

  // Track ad view when current ad changes
  useEffect(() => {
    if (currentAd && !trackedAdsRef.current.has(currentAd.id)) {
      trackedAdsRef.current.add(currentAd.id);
      trackAdView(currentAd.id, pathname);
    }
  }, [currentAd, pathname]);

  // Rotation logic
  useEffect(() => {
    if (!ads || ads.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % ads.length);
        setIsTransitioning(false);
      }, 300); // Transition duration
    }, rotationInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [ads, rotationInterval]);

  // Reset index when ads change
  useEffect(() => {
    setCurrentIndex(0);
    trackedAdsRef.current.clear();
  }, [pathname]);

  const handleClick = () => {
    if (currentAd) {
      trackAdClick(currentAd.id, pathname);
    }
  };

  // Show placeholder if no active ads
  if (!ads || ads.length === 0) {
    return (
      <div className={cn("w-full flex justify-center lg:justify-start", className)}>
        <div
          className={cn(
            "w-full bg-secondary/50 border border-dashed border-border rounded-lg flex items-center justify-center",
            sizeClasses[size]
          )}
          data-ad-slot={adSlot}
        >
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            Advertisement
          </span>
        </div>
      </div>
    );
  }

  // Show actual ad with rotation
  const adContent = currentAd && (
    <img
      src={currentAd.image_url}
      alt={currentAd.alt_text || currentAd.name}
      className={cn(
        "object-contain rounded-lg transition-opacity duration-300",
        sizeClasses[size],
        isTransitioning ? "opacity-0" : "opacity-100"
      )}
    />
  );

  return (
    <div className={cn("w-full flex justify-center lg:justify-start", className)}>
      <div className="relative">
        {currentAd?.link_url ? (
          <a
            href={currentAd.link_url}
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
        
        {/* Rotation indicators */}
        {ads.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {ads.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  index === currentIndex % ads.length
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdBanner;