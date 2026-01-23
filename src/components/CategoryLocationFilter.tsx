'use client';

import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { slugify, slugifyCountry } from "@/lib/slugify";
import { Button } from "@/components/ui/button";
import { isCityRegion } from "@/lib/cityRegions";
import { CONTINENT_ORDER, CONTINENT_COLORS, getContinent } from "@/lib/continents";

interface Region {
  id: number;
  region_name: string;
  region_slug: string;
}

interface CategoryLocationFilterProps {
  countries: string[];
  countryCounts: Record<string, number>;
  regions: Region[];
  regionCounts: Record<number, number>;
  cities: string[];
  selectedContinent: string | null;
  selectedCountry: string | null;
  selectedRegion: number | null;
  selectedCity: string | null;
  categorySlug: string;
  onContinentChange: (continent: string | null) => void;
  onClearFilters?: () => void;
  showMobileBadges?: boolean;
}

function formatCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return count.toLocaleString();
}

function FilterBadge({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <Badge
      variant="secondary"
      className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 text-xs sm:text-sm"
    >
      {label}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5"
        aria-label={`Remove ${label} filter`}
      >
        <X className="h-3 w-3" />
      </button>
    </Badge>
  );
}

export function CategoryLocationFilter({
  countries,
  countryCounts,
  regions,
  regionCounts,
  cities,
  selectedContinent,
  selectedCountry,
  selectedRegion,
  selectedCity,
  categorySlug,
  onContinentChange,
  onClearFilters,
  showMobileBadges = false,
}: CategoryLocationFilterProps) {
  const router = useRouter();

  const hasRegions = regions.length > 0;
  const selectedRegionData = regions.find((r) => r.id === selectedRegion);
  const activeLocationFilters =
    (selectedContinent ? 1 : 0) + (selectedCountry ? 1 : 0) + (selectedRegion ? 1 : 0) + (selectedCity ? 1 : 0);

  // Check if current region is a city-region (London, New York)
  const isCurrentCityRegion = selectedRegionData && isCityRegion(selectedCountry, selectedRegionData.region_slug);

  // Filter countries by selected continent using getContinent() function
  const filteredCountries = selectedContinent
    ? countries.filter((c) => getContinent(c) === selectedContinent)
    : countries;

  // Get continents that have countries with listings using getContinent()
  const availableContinents = CONTINENT_ORDER.filter((continent) =>
    countries.some((c) => getContinent(c) === continent),
  );

  // Build URL helper for path-based navigation
  // For city-regions, skip the city segment
  const buildUrl = (params: { country?: string | null; region?: Region | null; city?: string | null }) => {
    const parts = [`/${categorySlug}`];

    if (params.country) {
      parts.push(slugifyCountry(params.country));

      if (params.region) {
        parts.push(params.region.region_slug);

        // Skip city segment for city-regions (region IS the city)
        if (params.city && !isCityRegion(params.country, params.region.region_slug)) {
          parts.push(slugify(params.city));
        }
      } else if (params.city) {
        // City without region (countries without regions)
        parts.push(slugify(params.city));
      }
    }

    return parts.join("/");
  };

  const handleRemoveContinent = () => {
    onContinentChange(null);
  };

  const handleRemoveCountry = () => {
    router.push(`/${categorySlug}`);
  };

  const handleRemoveRegion = () => {
    // Keep country, remove region (and city if present)
    if (selectedCountry) {
      router.push(buildUrl({ country: selectedCountry }));
    }
  };

  const handleRemoveCity = () => {
    if (selectedCountry) {
      if (selectedRegionData) {
        // Keep country and region
        router.push(buildUrl({ country: selectedCountry, region: selectedRegionData }));
      } else {
        // Keep only country
        router.push(buildUrl({ country: selectedCountry }));
      }
    }
  };

  const handleContinentSelect = (continent: string) => {
    onContinentChange(continent);
  };

  const handleCountrySelect = (country: string) => {
    router.push(buildUrl({ country }));
  };

  const handleRegionSelect = (regionIdStr: string) => {
    const regionId = Number(regionIdStr);
    const region = regions.find((r) => r.id === regionId);
    if (region && selectedCountry) {
      router.push(buildUrl({ country: selectedCountry, region }));
    }
  };

  const handleCitySelect = (city: string) => {
    if (selectedCountry) {
      router.push(buildUrl({ country: selectedCountry, region: selectedRegionData, city }));
    }
  };

  // Mobile badges row - shown outside the collapsible content
  if (showMobileBadges) {
    if (activeLocationFilters === 0) return null;

    return (
      <div className="flex sm:hidden flex-wrap items-center gap-2 mt-2">
        {selectedContinent && <FilterBadge label={selectedContinent} onRemove={handleRemoveContinent} />}
        {selectedCountry && <FilterBadge label={selectedCountry} onRemove={handleRemoveCountry} />}
        {selectedRegion && selectedRegionData && (
          <FilterBadge label={selectedRegionData.region_name} onRemove={handleRemoveRegion} />
        )}
        {/* Don't show city badge for city-regions since region IS the city */}
        {selectedCity && !isCurrentCityRegion && <FilterBadge label={selectedCity} onRemove={handleRemoveCity} />}
        {onClearFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
            onClick={onClearFilters}
          >
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-card rounded-lg border">
      {/* Continent badge or dropdown */}
      {selectedContinent ? (
        <span className="hidden sm:inline-flex">
          <Badge
            variant="secondary"
            className="gap-1 pr-1 text-xs sm:text-sm"
            style={{
              backgroundColor: `${CONTINENT_COLORS[selectedContinent]}20`,
              color: CONTINENT_COLORS[selectedContinent],
              borderColor: `${CONTINENT_COLORS[selectedContinent]}40`,
            }}
          >
            {selectedContinent}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveContinent();
              }}
              className="ml-0.5 rounded-full hover:bg-black/10 p-0.5"
              aria-label={`Remove ${selectedContinent} filter`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        </span>
      ) : (
        <Select onValueChange={handleContinentSelect}>
          <SelectTrigger className="w-auto min-w-[140px] h-8 text-xs sm:text-sm gap-1">
            <SelectValue placeholder="All Continents" />
          </SelectTrigger>
          <SelectContent>
            {availableContinents.map((continent) => (
              <SelectItem key={continent} value={continent}>
                {continent}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Country badge or dropdown */}
      {selectedCountry ? (
        <span className="hidden sm:inline-flex">
          <FilterBadge label={selectedCountry} onRemove={handleRemoveCountry} />
        </span>
      ) : (
        <Select onValueChange={handleCountrySelect}>
          <SelectTrigger className="w-auto min-w-[140px] h-8 text-xs sm:text-sm gap-1">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            {filteredCountries.map((country) => (
              <SelectItem key={country} value={country}>
                <span className="flex items-center justify-between gap-2 w-full">
                  {country}
                  {countryCounts[country] > 0 && (
                    <span className="text-muted-foreground text-xs">({formatCount(countryCounts[country])})</span>
                  )}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Region badge or dropdown - show when country has regions */}
      {selectedCountry && hasRegions && (
        <>
          {selectedRegion && selectedRegionData ? (
            <span className="hidden sm:inline-flex">
              <FilterBadge label={selectedRegionData.region_name} onRemove={handleRemoveRegion} />
            </span>
          ) : (
            <Select onValueChange={handleRegionSelect}>
              <SelectTrigger className="w-auto min-w-[140px] h-8 text-xs sm:text-sm gap-1">
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.id} value={region.id.toString()}>
                    <span className="flex items-center justify-between gap-2 w-full">
                      {region.region_name}
                      {regionCounts[region.id] > 0 && (
                        <span className="text-muted-foreground text-xs">({formatCount(regionCounts[region.id])})</span>
                      )}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </>
      )}

      {/* City badge or dropdown - show when country is selected */}
      {/* Hide city dropdown for city-regions (London, New York) since region IS the city */}
      {selectedCountry && !isCurrentCityRegion && (
        <>
          {selectedCity ? (
            <span className="hidden sm:inline-flex">
              <FilterBadge label={selectedCity} onRemove={handleRemoveCity} />
            </span>
          ) : (
            <Select onValueChange={handleCitySelect}>
              <SelectTrigger className="w-auto min-w-[140px] h-8 text-xs sm:text-sm gap-1">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </>
      )}
    </div>
  );
}
