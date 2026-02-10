'use client';

import { countryToSlug } from "./countryAliases";
import { getContinentSlug } from "./continents";
import { getContinentForCountry, toSlug } from "./venueUrlUtils";
import { isCityRegion } from "./cityRegions";

interface VenueUrlParams {
  slug: string;
  country: string | null;
  regionSlug: string | null;
  city: string | null;
}

/**
 * Builds the full SEO-friendly URL path for a venue
 * Example output: /venues/europe/uk/south-east/london/o2-arena
 *
 * For city-regions (London, New York), skip the redundant city segment:
 * /venues/europe/uk/london/o2-arena (not /venues/europe/uk/london/london/o2-arena)
 */
export function buildVenueProfileUrl(venue: VenueUrlParams): string {
  const { slug, country, regionSlug, city } = venue;

  // Fallback to basic listing URL if we don't have location data
  if (!country) {
    return `/listing/${slug}`;
  }

  let continent = getContinentForCountry(country);

  // Fallback: If country not in mapping, try to infer continent from country name patterns
  if (!continent) {
    console.warn(`Country "${country}" not found in continent mapping, using fallback`);

    // Try to infer from common patterns or default to listing URL
    const countryLower = country.toLowerCase();
    if (countryLower.includes("island") || countryLower.includes("pacific")) {
      continent = "Oceania";
    } else if (
      countryLower.includes("africa") ||
      ["nigeria", "ghana", "kenya", "egypt"].some((c) => countryLower.includes(c))
    ) {
      continent = "Africa";
    } else if (
      ["arab", "dubai", "saudi", "qatar", "israel", "jordan", "lebanon"].some((c) => countryLower.includes(c))
    ) {
      continent = "Asia";
    } else {
      // If we really can't determine, fall back to listing URL
      return `/listing/${slug}`;
    }
  }

  const parts = ["/venues", getContinentSlug(continent), countryToSlug(country)];

  // Add region if present
  if (regionSlug) {
    parts.push(regionSlug);

    // Add city if present
    if (city) {
      parts.push(toSlug(city));
    }
  } else if (city) {
    // No region, just add city
    parts.push(toSlug(city));
  }

  // Add venue slug
  parts.push(slug);

  return parts.join("/");
}
