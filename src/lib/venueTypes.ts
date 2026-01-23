// Venue type display names mapped to URL slugs (pluralised for SEO)
export const VENUE_TYPE_SLUGS: Record<string, string> = {
  'Arena': 'arenas',
  'Amphitheatre': 'amphitheatres',
  'Bar': 'bars',
  'Club': 'clubs',
  'Concert Hall': 'concert-halls',
  'Convention Centre': 'convention-centres',
  'Cultural Centre': 'cultural-centres',
  'Opera House': 'opera-houses',
  'Outdoor Venue': 'outdoor-venues',
  'Performing Arts Centre': 'performing-arts-centres',
  'Stadium': 'stadiums',
  'Theatre': 'theatres',
};

// Reverse lookup: slug to display name
export const VENUE_TYPE_FROM_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(VENUE_TYPE_SLUGS).map(([name, slug]) => [slug, name])
);

// Array of all valid slugs for route matching
export const VENUE_TYPE_SLUG_LIST = Object.values(VENUE_TYPE_SLUGS);

// Check if a string is a venue type slug
export function isVenueTypeSlug(slug: string): boolean {
  return VENUE_TYPE_SLUG_LIST.includes(slug);
}

// Get display name from slug (e.g., 'arenas' → 'Arena')
export function getVenueTypeFromSlug(slug: string): string | null {
  return VENUE_TYPE_FROM_SLUG[slug] || null;
}

// Get slug from display name (e.g., 'Arena' → 'arenas')
export function getVenueTypeSlug(typeName: string): string | null {
  return VENUE_TYPE_SLUGS[typeName] || null;
}
