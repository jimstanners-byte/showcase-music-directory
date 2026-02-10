import Link from 'next/link';

interface Listing {
  id: string;
  name: string;
  slug: string;
  tier: string;
}

interface ClientLogoTickerServerProps {
  listings: Listing[];
}

export function ClientLogoTickerServer({ listings }: ClientLogoTickerServerProps) {
  if (listings.length === 0) return null;

  const animationDuration = `${listings.length * 2.5}s`;

  return (
    <section className="relative py-6 sm:py-8 bg-card border-t border-border overflow-hidden">
      <div className="container mb-3">
        <p className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.25em] text-center font-medium">
          Featured Clients
        </p>
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div
          className="inline-flex items-center w-max animate-marquee hover:[animation-play-state:paused]"
          style={{ animationDuration }}
        >
          {[...listings, ...listings].map((listing, index) => (
            <Link
              key={`${listing.id}-${index}`}
              href={`/listing/${listing.slug}`}
              className="flex-shrink-0 group flex items-center"
            >
              <span className="font-display text-base md:text-lg text-foreground/40 group-hover:text-primary transition-colors duration-300 tracking-wider whitespace-nowrap px-4 md:px-6">
                {listing.name}
              </span>
              <span className="text-foreground/15 text-xs select-none" aria-hidden="true">·</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}