'use client';

import Link from 'next/link';
import { SearchAutocomplete } from '@/components/SearchAutocomplete';
import { AnimatedCounter } from '@/components/AnimatedCounter';

interface HomeHeroProps {
  stats?: {
    listings: number;
    sectors: number;
    countries: number;
  };
}

export function HomeHero({ stats }: HomeHeroProps) {
  const statItems = stats ? [
    { value: stats.listings, label: "Listings", suffix: "+" },
    { value: stats.sectors, label: "Services", suffix: "" },
    { value: stats.countries, label: "Countries", suffix: "+" },
  ] : [];

  return (
    <section className="relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="/videos/timelapse.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container py-10 sm:py-16 md:py-20 text-center space-y-4 sm:space-y-6">
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium">
            {stats ? (
              <>
                {stats.listings.toLocaleString()}+ music industry contacts.
                <span className="block sm:inline"> Suppliers, venues, studios, business contacts - one search.</span>
              </>
            ) : (
              <>
                The music industry at your fingertips.
                <span className="block sm:inline"> Studios, suppliers, venues, crew — one search.</span>
              </>
            )}
          </p>

          <div className="max-w-xl mx-auto p-6 rounded-2xl shadow-xl bg-black/40 backdrop-blur-sm border border-white/10 relative z-20">
            <div className="[&_input]:bg-white [&_input]:text-gray-800 [&_input]:placeholder-gray-500">
              <SearchAutocomplete />
            </div>

            <div className="pt-4 text-center">
              <Link 
                href="/sectors" 
                className="text-white/80 hover:text-white text-sm font-medium transition-colors inline-flex items-center gap-1"
              >
                Explore all sectors
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        {stats && (
          <div className="container py-10 sm:py-14">
            <div className="flex items-center justify-center gap-6 sm:gap-16 md:gap-24">
              {statItems.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-display text-4xl sm:text-5xl font-bold text-white">
                    <AnimatedCounter value={stat.value} duration={3500} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-white/70 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}