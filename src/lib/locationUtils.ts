/**
 * Location Utilities
 * 
 * This module provides a single source of truth for converting between
 * display names (used in UI) and slugs (used in URLs and database).
 * 
 * DATABASE FORMAT: All location fields in SEO tables store slugs
 * - continent: "europe", "north-america"
 * - country: "uk", "usa", "czech-republic"
 * - region: "south-east", "london"
 * - city: "manchester", "new-york"
 * 
 * UI FORMAT: Display names for user-facing text
 * - continent: "Europe", "North America"
 * - country: "United Kingdom", "Czech Republic"
 * - region: "South East", "London"
 * - city: "Manchester", "New York"
 */

// ============================================================================
// SLUG CONVERSION
// ============================================================================

/**
 * Convert any string to a URL-safe slug
 * Works with both display names and already-slugified values (idempotent)
 */
export function toSlug(input: string | null | undefined): string {
  if (!input) return '';
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// ============================================================================
// COUNTRY ALIASES
// ============================================================================

// Special country slug mappings (long form → short form)
const COUNTRY_SLUG_ALIASES: Record<string, string> = {
  'united-kingdom': 'uk',
  'united-states': 'usa',
  'united-arab-emirates': 'uae',
};

// Reverse mapping (short form → display name)
const COUNTRY_DISPLAY_NAMES: Record<string, string> = {
  'uk': 'United Kingdom',
  'usa': 'United States',
  'uae': 'UAE',
};

/**
 * Convert a country to its slug form
 * Handles display names ("United Kingdom") and already-slugified ("united-kingdom")
 * Returns preferred short form where applicable ("uk" not "united-kingdom")
 */
export function countryToSlug(country: string | null | undefined): string {
  if (!country) return '';
  const slug = toSlug(country);
  return COUNTRY_SLUG_ALIASES[slug] || slug;
}

/**
 * Convert a country slug to display name
 */
export function countryToDisplay(slug: string | null | undefined): string {
  if (!slug) return '';
  
  // Check for known aliases first
  if (COUNTRY_DISPLAY_NAMES[slug]) {
    return COUNTRY_DISPLAY_NAMES[slug];
  }
  
  // Convert slug to title case: "czech-republic" → "Czech Republic"
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// ============================================================================
// CONTINENT HELPERS
// ============================================================================

/**
 * Convert continent to slug (simple lowercase with hyphens)
 */
export function continentToSlug(continent: string | null | undefined): string {
  if (!continent) return '';
  return toSlug(continent);
}

/**
 * Convert continent slug to display name
 */
export function continentToDisplay(slug: string | null | undefined): string {
  if (!slug) return '';
  
  // Handle "north-america" → "North America"
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// ============================================================================
// CITY/REGION HELPERS  
// ============================================================================

/**
 * Convert city to slug
 */
export function cityToSlug(city: string | null | undefined): string {
  return toSlug(city);
}

/**
 * Convert city slug to display name
 */
export function cityToDisplay(slug: string | null | undefined): string {
  if (!slug) return '';
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Convert region to slug
 */
export function regionToSlug(region: string | null | undefined): string {
  return toSlug(region);
}

/**
 * Convert region slug to display name
 */
export function regionToDisplay(slug: string | null | undefined): string {
  if (!slug) return '';
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// ============================================================================
// COMBINED LOCATION OBJECT HELPERS
// ============================================================================

export interface LocationSlugs {
  continent: string;
  country: string;
  region: string;
  city: string;
}

export interface LocationDisplay {
  continent: string;
  country: string;
  region: string;
  city: string;
}

/**
 * Convert a location object with display names to slugs
 */
export function locationToSlugs(location: {
  continent?: string | null;
  country?: string | null;
  region?: string | null;
  city?: string | null;
}): LocationSlugs {
  return {
    continent: continentToSlug(location.continent),
    country: countryToSlug(location.country),
    region: regionToSlug(location.region),
    city: cityToSlug(location.city),
  };
}

/**
 * Convert a location object with slugs to display names
 */
export function locationToDisplay(location: {
  continent?: string | null;
  country?: string | null;
  region?: string | null;
  city?: string | null;
}): LocationDisplay {
  return {
    continent: continentToDisplay(location.continent),
    country: countryToDisplay(location.country),
    region: regionToDisplay(location.region),
    city: cityToDisplay(location.city),
  };
}