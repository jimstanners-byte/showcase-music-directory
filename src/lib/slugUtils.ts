/**
 * Slug Utilities
 * 
 * Re-exports from locationUtils for backwards compatibility.
 * New code should import directly from @/lib/locationUtils
 */

export {
  toSlug,
  countryToSlug,
  countryToDisplay as slugToCountryDisplay,
  continentToSlug,
  continentToDisplay as slugToContinentDisplay,
  cityToSlug,
  cityToDisplay as slugToLocationDisplay,
  regionToSlug,
  regionToDisplay,
  locationToSlugs,
  locationToDisplay,
} from './locationUtils';

// Additional exports for backwards compatibility with existing code
export { countryToDisplay, continentToDisplay, cityToDisplay } from './locationUtils';

// Alias maps for direct access (backwards compatibility)
export const COUNTRY_SLUG_ALIASES: Record<string, string> = {
  'United Kingdom': 'uk',
  'United States': 'usa',
  'UAE': 'uae',
};

export const COUNTRY_SLUG_REVERSE: Record<string, string> = {
  'uk': 'United Kingdom',
  'usa': 'United States',
  'united-kingdom': 'United Kingdom',
  'united-states': 'United States',
  'uae': 'UAE',
};