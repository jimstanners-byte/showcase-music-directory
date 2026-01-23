import { COUNTRY_ALIASES, COUNTRY_PREFERRED_SLUGS, countryToSlug } from './countryAliases';

/**
 * Converts a string to a URL-friendly slug
 * e.g., "United Kingdom" -> "united-kingdom"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Remove consecutive hyphens
}

/**
 * Converts a country name to a URL-friendly slug
 * Uses short aliases for UK/USA
 * e.g., "United Kingdom" -> "uk"
 */
export function slugifyCountry(country: string): string {
  return countryToSlug(country);
}

/**
 * Finds the original name from a list that matches the given slug
 * e.g., "united-kingdom" -> "United Kingdom" (if found in list)
 */
export function deslugify(slug: string, options: string[]): string | null {
  const normalizedSlug = slug.toLowerCase();
  
  // Check country aliases first
  if (COUNTRY_ALIASES[normalizedSlug]) {
    const aliasedCountry = COUNTRY_ALIASES[normalizedSlug];
    // Return it only if it's in the options list
    if (options.includes(aliasedCountry)) {
      return aliasedCountry;
    }
  }
  
  // Fall back to standard slug matching
  return options.find(option => slugify(option) === normalizedSlug) || null;
}
