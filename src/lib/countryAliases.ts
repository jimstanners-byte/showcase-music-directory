// Canonical slug → display name mapping
export const COUNTRY_ALIASES: Record<string, string> = {
  'uk': 'United Kingdom',
  'usa': 'United States',
  'us': 'United States',
};

// Display name → preferred slug mapping
export const COUNTRY_PREFERRED_SLUGS: Record<string, string> = {
  'United Kingdom': 'uk',
  'United States': 'usa',
  'USA': 'usa',
};

// Convert country name to URL slug (using preferred short form if available)
export function countryToSlug(country: string): string {
  if (COUNTRY_PREFERRED_SLUGS[country]) {
    return COUNTRY_PREFERRED_SLUGS[country];
  }
  return country
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Convert URL slug to country name (handling aliases)
export function slugToCountry(slug: string, knownCountries: string[]): string | null {
  // Check aliases first
  const normalizedSlug = slug.toLowerCase();
  if (COUNTRY_ALIASES[normalizedSlug]) {
    return COUNTRY_ALIASES[normalizedSlug];
  }
  
  // Fall back to matching against known countries
  return knownCountries.find(c => 
    c.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === normalizedSlug
  ) || null;
}
