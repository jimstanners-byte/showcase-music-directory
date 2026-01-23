/**
 * City-Regions: Regions that contain only one city with the same name.
 * These are treated as cities, not regions, to avoid redundant URLs like /london/london.
 *
 * For these regions:
 * - /uk/london is the city page (not region page)
 * - /uk/london/london redirects to /uk/london
 * - Breadcrumbs show: UK > London (not UK > London > London)
 *
 * Proximity Configuration:
 * - City-regions use larger proximity radius (metropolitan areas)
 * - Regular cities use smaller default radius
 * - Proximity shows venues within radius, not just exact city match
 */

// Default proximity radii (in kilometers)
export const DEFAULT_CITY_PROXIMITY_KM = 25; // Regular cities (Manchester, Birmingham)
export const DEFAULT_CITY_REGION_PROXIMITY_KM = 40; // City-regions (London, NYC)

interface CityRegionConfig {
  country: string;
  countryAliases: string[];
  region: string;
  regionSlug: string;
  proximityRadiusKm?: number; // Optional override - uses DEFAULT_CITY_REGION_PROXIMITY_KM if not set
}

const CITY_REGIONS: CityRegionConfig[] = [
  {
    country: "United Kingdom",
    countryAliases: ["uk", "united kingdom"],
    region: "London",
    regionSlug: "london",
  },
  {
    country: "United States",
    countryAliases: ["usa", "united states", "us"],
    region: "New York",
    regionSlug: "new-york",
    proximityRadiusKm: 50, // Large metro area - includes Newark, Jersey City, parts of Long Island
  },
];

/**
 * Check if a region is a "city-region" - a region that should be treated as a city
 * because it only contains one city with the same name.
 *
 * @param country - Country name or slug (e.g., "United Kingdom", "uk")
 * @param region - Region name or slug (e.g., "London", "london")
 * @returns true if this region should be treated as a city
 */
export function isCityRegion(country: string | null, region: string | null): boolean {
  if (!country || !region) return false;

  const normalizedCountry = country.toLowerCase();
  const normalizedRegion = region.toLowerCase();

  return CITY_REGIONS.some((config) => {
    const countryMatches =
      config.country.toLowerCase() === normalizedCountry || config.countryAliases.includes(normalizedCountry);

    const regionMatches = config.region.toLowerCase() === normalizedRegion || config.regionSlug === normalizedRegion;

    return countryMatches && regionMatches;
  });
}

/**
 * Get the city-region configuration for a given country/region combination
 */
export function getCityRegionConfig(country: string | null, region: string | null): CityRegionConfig | null {
  if (!country || !region) return null;

  const normalizedCountry = country.toLowerCase();
  const normalizedRegion = region.toLowerCase();

  return (
    CITY_REGIONS.find((config) => {
      const countryMatches =
        config.country.toLowerCase() === normalizedCountry || config.countryAliases.includes(normalizedCountry);

      const regionMatches = config.region.toLowerCase() === normalizedRegion || config.regionSlug === normalizedRegion;

      return countryMatches && regionMatches;
    }) || null
  );
}

/**
 * Get the display name for a city-region (always returns the city name)
 */
export function getCityRegionDisplayName(country: string | null, region: string | null): string | null {
  const config = getCityRegionConfig(country, region);
  return config?.region || null;
}

/**
 * Get the proximity radius for a city-region
 * Returns the configured radius or default if not specified
 */
export function getCityRegionProximityRadius(country: string | null, region: string | null): number {
  const config = getCityRegionConfig(country, region);
  return config?.proximityRadiusKm || DEFAULT_CITY_REGION_PROXIMITY_KM;
}
