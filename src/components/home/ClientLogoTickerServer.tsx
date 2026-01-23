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

  const splitName = (name: string) => {
    const words = name.split(' ');
    if (words.length === 1) return { line1: name, line2: '' };
    
    const midpoint = Math.ceil(words.length / 2);
    return {
      line1: words.slice(0, midpoint).join(' '),
      line2: words.slice(midpoint).join(' ')
    };
  };

  const animationDuration = `${listings.length * 2}s`;

  return (
    <section className="py-10 sm:py-14 bg-card border-t border-border overflow-hidden">
      <div className="container mb-3">
        <p className="text-xs text-muted-foreground uppercase tracking-widest text-center font-medium">
          Featured Clients
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div 
          className="inline-flex gap-10 md:gap-16 hover:[animation-play-state:paused] animate-marquee w-max items-center"
          style={{ animationDuration }}
        >
          {[...listings, ...listings].map((listing, index) => {
            const { line1, line2 } = splitName(listing.name);
            return (
              <Link
                key={`${listing.id}-${index}`}
                href={`/listing/${listing.slug}`}
                className="flex-shrink-0 font-display text-lg md:text-xl text-foreground/65 hover:text-primary transition-colors duration-300 tracking-wider text-center leading-tight"
              >
                <span className="block">{line1}</span>
                {line2 && <span className="block">{line2}</span>}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}