'use client';

import { ArrowRight, MapPin } from "lucide-react";
import { CONTINENT_COLORS, CONTINENT_ORDER } from "@/lib/continents";
import { useVenueCountsByContinent, useTotalVenueCount } from "@/hooks/useVenueCounts";
import { WorldMap } from "./WorldMap";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ContinentSelectorProps {
  onSelectContinent: (continent: string) => void;
  onBrowseAll: () => void;
}

export function ContinentSelector({ onSelectContinent, onBrowseAll }: ContinentSelectorProps) {
  const { data: continentCounts, isLoading: countsLoading } = useVenueCountsByContinent();
  const { data: totalCount, isLoading: totalLoading } = useTotalVenueCount();

  // Abbreviated names for mobile display only
  const getDisplayName = (continent: string): string => {
    const abbreviations: Record<string, string> = {
      "North America": "N. America",
      "South America": "S. America",
    };
    return abbreviations[continent] || continent;
  };

  const getCount = (continent: string): number => {
    return continentCounts?.find((c) => c.continent === continent)?.count || 0;
  };

  // Convert continent counts array to object for WorldMap
  const venueCountsMap = useMemo(() => {
    if (!continentCounts) return {};
    return continentCounts.reduce(
      (acc, { continent, count }) => {
        acc[continent] = count;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [continentCounts]);

  return (
    <div className="py-2">
      {/* Desktop: Interactive World Map */}
      <div className="hidden md:block">
        <WorldMap venueCounts={venueCountsMap} onSelectContinent={onSelectContinent} />
      </div>

      {/* Mobile/Tablet: Continent Cards - always 2 columns, smaller on very small screens */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:hidden">
        {CONTINENT_ORDER.map((continent) => {
          const count = getCount(continent);
          const color = CONTINENT_COLORS[continent];

          return (
            <button
              key={continent}
              onClick={() => onSelectContinent(continent)}
              disabled={count === 0}
              className={cn("h-full block text-left", count === 0 && "opacity-50 cursor-not-allowed")}
            >
              <Card
                className={cn(
                  "transition-all duration-200 hover:shadow-md hover:border-primary/50 group hover-glow h-full",
                  count === 0 && "pointer-events-none",
                )}
              >
                <CardContent className="p-3 sm:p-6 h-full flex flex-col">
                  {/* MapPin icon with continent name inline */}
                  <div className="flex items-start gap-2 flex-1">
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-all duration-200 group-hover:gradient-brand"
                      style={{ backgroundColor: `${color}26` }}
                    >
                      <MapPin size={20} className="group-hover:hidden" style={{ color }} />
                      <MapPin size={20} className="hidden group-hover:block text-primary-foreground" />
                    </div>
                    <h3
                      className="font-semibold text-sm sm:text-base text-foreground transition-colors duration-200"
                      style={{ "--hover-color": color } as React.CSSProperties}
                    >
                      <span className="group-hover:hidden">{getDisplayName(continent)}</span>
                      <span className="hidden group-hover:inline" style={{ color }}>
                        {getDisplayName(continent)}
                      </span>
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground pl-9 mt-1">
                    {countsLoading ? (
                      <span className="inline-block w-10 sm:w-12 h-3 bg-muted animate-pulse rounded" />
                    ) : (
                      `${count.toLocaleString()} venue${count !== 1 ? "s" : ""}`
                    )}
                  </p>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
}
