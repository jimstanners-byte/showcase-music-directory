'use client';

import Link from 'next/link';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// =============================================================================
// SECURITY NOTE: Uses listings_public view (no contact data)
// =============================================================================

export function ClientLogoTicker() {
  const { data: paidListings, isLoading } = useQuery({
    queryKey: ['paid-listings-names'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings_public')
        .select('id, name, slug, tier')
        .in('tier', ['premier', 'enhanced']);
      if (error) throw error;
      if (!data) return [];
      
      // Shuffle function
      const shuffle = <T,>(array: T[]): T[] => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      };
      
      // Separate by tier, shuffle each, then combine (Premier first)
      const premier = shuffle(data.filter(l => l.tier === 'premier'));
      const enhanced = shuffle(data.filter(l => l.tier === 'enhanced'));
      
      return [...premier, ...enhanced];
    },
  });

  // Don't render if no listings available
  if (isLoading || !paidListings || paidListings.length === 0) {
    return null;
  }

  // Split a name into two lines at the best breakpoint
  const splitName = (name: string) => {
    const words = name.split(' ');
    if (words.length === 1) return { line1: name, line2: '' };
    
    const midpoint = Math.ceil(words.length / 2);
    return {
      line1: words.slice(0, midpoint).join(' '),
      line2: words.slice(midpoint).join(' ')
    };
  };

  // Calculate dynamic duration based on number of listings
  const animationDuration = `${paidListings.length * 2}s`;

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
          {[...paidListings, ...paidListings].map((listing, index) => {
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
