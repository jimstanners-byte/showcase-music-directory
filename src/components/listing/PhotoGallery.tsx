'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ListingPhoto } from "@/types/database";

interface PhotoGalleryProps {
  photos: ListingPhoto[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  const minSwipeDistance = 50;

  useEffect(() => {
    if (photos.length > 0) {
      const timer = setTimeout(() => setIsLoading(false), 100);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [photos]);

  // Don't render anything if there are no photos
  if (photos.length === 0) {
    return null;
  }

  // Skeleton loader - only show while loading and we know photos exist
  if (isLoading) {
    return (
      <div className="bg-card rounded-lg border p-6">
        <div className="h-6 w-32 bg-muted animate-pulse rounded mb-4" />
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  // Use photos directly (no hero filtering needed)
  const galleryPhotos = photos;

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? galleryPhotos.length - 1 : selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === galleryPhotos.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  // Show first 4 photos in preview, rest in full gallery
  const previewPhotos = galleryPhotos.slice(0, 4);
  const remainingCount = galleryPhotos.length - 4;

  return (
    <>
      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">Photo Gallery</h2>
        <div className="grid grid-cols-2 gap-3">
          {previewPhotos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => setSelectedIndex(index)}
              className="aspect-square rounded-lg overflow-hidden bg-muted hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary relative group"
            >
              {!imageLoaded[index] && <div className="absolute inset-0 bg-muted animate-pulse" />}
              <img
                src={photo.photo_url}
                alt={photo.caption || "Gallery photo"}
                loading="lazy"
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded[index] ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded((prev) => ({ ...prev, [index]: true }))}
              />
              {/* Show "+X more" overlay on 4th image if there are more photos */}
              {index === 3 && remainingCount > 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity group-hover:bg-black/70">
                  <span className="text-white text-xl font-semibold">+{remainingCount} more</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-4xl p-0 bg-background/95 backdrop-blur-sm border-none animate-in fade-in-0 zoom-in-95 duration-300">
          <div className="relative">
            {selectedIndex !== null && (
              <div
                className="relative aspect-video"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <img
                  src={galleryPhotos[selectedIndex].photo_url}
                  alt={galleryPhotos[selectedIndex].caption || "Gallery photo"}
                  className="w-full h-full object-contain transition-opacity duration-200"
                />

                {galleryPhotos.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background transition-all duration-200"
                      onClick={handlePrev}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background transition-all duration-200"
                      onClick={handleNext}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </>
                )}

                {galleryPhotos[selectedIndex].caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-background/90 p-4 animate-in slide-in-from-bottom-2 duration-300">
                    <p className="text-sm text-center">{galleryPhotos[selectedIndex].caption}</p>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-center gap-1 p-4">
              {galleryPhotos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === selectedIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
