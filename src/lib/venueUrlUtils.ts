'use client';

import { CONTINENT_COUNTRIES, getContinentSlug } from './continents';
import { countryToSlug, slugToCountry } from './countryAliases';
import { isCityRegion } from './cityRegions';

// Convert display name to URL slug
export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Convert slug back to display name by matching against known values
export function fromSlug(slug: string, knownValues: string[]): string | null {
  const normalized = slug.toLowerCase();
  return knownValues.find(v => toSlug(v) === normalized) || null;
}

// Convert country slug back to display name (with alias support)
export function fromCountrySlug(slug: string, knownCountries: string[]): string | null {
  return slugToCountry(slug, knownCountries);
}

// Get continent from country
export function getContinentForCountry(country: string): string | null {
  for (const [continent, countries] of Object.entries(CONTINENT_COUNTRIES)) {
    if (countries.includes(country)) {
      return continent;
    }
  }
  return null;
}

// Countries that have regions configured (normalized names)
export const COUNTRIES_WITH_REGIONS = ['UK', 'United Kingdom', 'USA', 'United States'];

export function countryHasRegions(country: string): boolean {
  return COUNTRIES_WITH_REGIONS.some(c => 
    c.toLowerCase() === country.toLowerCase()
  );
}

// Build venue URL from location parameters
// For city-regions (London, New York), the region IS the city - don't add city segment
export function buildVenueUrl(params: {
  continent?: string | null;
  country?: string | null;
  regionSlug?: string | null;
  city?: string | null;
}): string {
  const parts = ['/venues'];
  
  if (params.continent) {
    parts.push(getContinentSlug(params.continent));
    
    if (params.country) {
      parts.push(countryToSlug(params.country));
      
      if (params.regionSlug) {
        parts.push(params.regionSlug);
        
        // Add city if present
        if (params.city) {
          parts.push(toSlug(params.city));
        }
      } else if (params.city) {
        parts.push(toSlug(params.city));
      }
    }
  }
  
  return parts.join('/');
}

// Re-export for convenience
export { isCityRegion } from './cityRegions';
export { countryToSlug } from './countryAliases';
