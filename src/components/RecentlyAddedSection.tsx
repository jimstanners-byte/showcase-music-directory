'use client';

import Link from 'next/link';
import { useRecentListings } from "@/hooks/useRecentListings";

export function RecentlyAddedSection() {
  const { data: listings, isLoading } = useRecentListings(6);

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16">
        <div className="container">
          <div className="mb-8 text-center sm:text-left">
            <h2 className="text-2xl font-bold">Recently Added</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
                <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!listings || listings.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="container">
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-2xl font-bold">Recently Added</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {listings.map((listing) => {
            const location = [listing.town_city, listing.country]
              .filter(Boolean)
              .join(", ");

            return (
              <div key={listing.id}>
                <Link
                  href={`/listing/${listing.slug}`}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {listing.name}
                </Link>
                {location && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {location}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
