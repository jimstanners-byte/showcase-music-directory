'use client';

export const VENUE_ROUTING_DOCS = `# Venue Routing System - Technical Documentation

> **Last Updated:** January 2025  
> **Purpose:** Developer reference for the Showcase Music venue URL routing, SEO, and filtering system

---

## Table of Contents

1. [Overview](#overview)
2. [URL Structure](#url-structure)
3. [Country Types](#country-types)
4. [Route Handlers](#route-handlers)
5. [SEO System](#seo-system)
6. [Key Files](#key-files)
7. [Common Pitfalls](#common-pitfalls)
8. [Debugging Guide](#debugging-guide)

---

## Overview

The venue routing system handles dynamic URLs for browsing venues by location and type. It supports:

- **Geographic hierarchy:** Continent → Country → Region (optional) → City
- **Venue type filtering:** Via URL path (SEO-friendly) or query params (multi-select)
- **Two country types:** Countries with regions (UK, USA) and without (Germany, France, etc.)
- **City-regions:** Special cases like London and New York where the region IS the city

---

## URL Structure

### Pattern Variations

| Segments | Pattern | Example | Handler |
|----------|---------|---------|---------|
| 1 | \`/venues/:continent\` | \`/venues/europe\` | VenueFinder |
| 2 | \`/venues/:continent/:country\` | \`/venues/europe/germany\` | VenueTwoSegmentHandler |
| 2 | \`/venues/:continent/:venueType\` | \`/venues/europe/arenas\` | VenueTwoSegmentHandler |
| 3 | \`/venues/:continent/:country/:cityOrRegion\` | \`/venues/europe/germany/berlin\` | VenueRouteHandler |
| 3 | \`/venues/:continent/:country/:venueType\` | \`/venues/europe/uk/arenas\` | VenueRouteHandler |
| 4 | \`/venues/:continent/:country/:city/:venueType\` | \`/venues/europe/germany/berlin/clubs\` | VenueFourSegmentHandler |
| 4 | \`/venues/:continent/:country/:region/:city\` | \`/venues/europe/uk/north-west/manchester\` | VenueFourSegmentHandler |
| 4 | \`/venues/:continent/:country/:region/:venueType\` | \`/venues/europe/uk/north-west/arenas\` | VenueFourSegmentHandler |
| 5 | \`/venues/:continent/:country/:region/:city/:venueType\` | \`/venues/europe/uk/north-west/manchester/clubs\` | VenueFiveSegmentHandler |

### Venue Type in URL vs Query Params

- **Single venue type:** Appears in URL path for SEO (e.g., \`/berlin/clubs\`)
- **Multiple venue types:** Uses query param \`?type=Club,Arena\`
- **No venue type:** Shows all venues for that location

---

## Country Types

### Countries WITH Regions (UK, USA)

These countries have a \`regions\` table with regional subdivisions.

\`\`\`
URL: /venues/europe/uk/north-west/manchester/clubs
     └─continent─┘ └country┘ └─region─┘ └─city─┘ └type┘
\`\`\`

**Region sources:**
- UK: 11 regions (London, South East, North West, Midlands, etc.)
- USA: 50 states

**Defined in:** \`src/lib/venueUrlUtils.ts\`
\`\`\`typescript
export const COUNTRIES_WITH_REGIONS = ['UK', 'United Kingdom', 'USA', 'United States'];
\`\`\`

### Countries WITHOUT Regions (Germany, France, Spain, etc.)

City appears directly under country - no region segment.

\`\`\`
URL: /venues/europe/germany/munich/clubs
     └─continent─┘ └country┘ └city┘ └type┘
\`\`\`

### City-Regions (London, New York)

Special cases where the region IS the city. Prevents URL duplication like \`/uk/london/london/venue\`.

\`\`\`
URL: /venues/europe/uk/london/o2-arena
     └─continent─┘ └country┘ └city-region┘ └venue┘

NOT: /venues/europe/uk/london/london/o2-arena ❌
\`\`\`

**Defined in:** \`src/lib/cityRegions.ts\`

---

## Route Handlers

### VenueTwoSegmentHandler.tsx
**Route:** \`/venues/:continentSlug/:countrySlug\`

Determines if second segment is:
- A venue type slug → Show venue type page for continent
- A country slug → Show country page

### VenueRouteHandler.tsx (3-segment)
**Route:** \`/venues/:continentSlug/:countrySlug/:param3\`

Determines if param3 is:
- A venue type slug → Show venue type page for country
- A region (for UK/USA) → Show region page
- A city (for non-regional countries) → Show city page
- A venue slug → Show venue profile

### VenueFourSegmentHandler.tsx
**Route:** \`/venues/:continentSlug/:countrySlug/:param3/:param4\`

Complex handler that must distinguish:

**For countries WITH regions:**
- param3=region, param4=city → City page
- param3=region, param4=venueType → Venue type page for region

**For countries WITHOUT regions:**
- param3=city, param4=venueType → Venue type page for city
- param3=city, param4=venue → Venue profile page

**For city-regions:**
- Handles redirects (e.g., \`/uk/london/london\` → \`/uk/london\`)

### VenueFiveSegmentHandler.tsx
**Route:** \`/venues/:continentSlug/:countrySlug/:param3/:param4/:param5\`

Only valid for countries with regions:
- param3=region, param4=city, param5=venueType → Venue type page
- param3=region, param4=city, param5=venue → Venue profile page

---

## SEO System

### Two SEO Tables

1. **\`venue_location_seo\`** - Location-based SEO (no venue type filter)
   - Fields: continent, country, region_slug, city
   - Used when browsing all venues in a location

2. **\`venue_type_seo\`** - Venue type + location SEO
   - Fields: venue_type, continent, country, region_slug, city
   - Used when filtering by a specific venue type

### SEO Cascade Logic

Both hooks use a cascade from most specific to least specific:

\`\`\`
1. City + Region + Country + Continent (exact match)
2. City + Country + Continent (no region - for non-regional countries)
3. Region + Country + Continent (no city)
4. Country + Continent (no region/city)
5. Continent only
6. Venue type only (for venue_type_seo)
\`\`\`

### Critical: Null vs Empty String

**Database stores \`null\` for missing values, not empty strings!**

\`\`\`typescript
// ❌ WRONG - searches for empty string
.eq("region_slug", regionSlug || "")

// ✅ CORRECT - properly handles null
if (regionSlug) {
  query = query.eq("region_slug", regionSlug);
} else {
  query = query.is("region_slug", null);
}
\`\`\`

### URL-Derived City (displayCity)

To prevent race conditions during async loading, we derive the city name synchronously from the URL for display/SEO purposes:

\`\`\`typescript
// Synchronous - available immediately
const urlDerivedCity = useMemo(() => {
  if (!selectedCountry || countryHasRegions(selectedCountry)) return null;
  if (!thirdSegment || thirdSegment === activeVenueTypeSlug) return null;
  
  return thirdSegment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}, [selectedCountry, thirdSegment, activeVenueTypeSlug]);

// Use for display, falls back to async-validated city
const displayCity = urlDerivedCity || selectedCity;
\`\`\`

**Use \`displayCity\` for:** SEO hooks, H1, H2, meta tags, breadcrumbs
**Use \`selectedCity\` for:** Data filtering (useVenues hook)

---

## Key Files

### Route Handlers
- \`src/pages/VenueTwoSegmentHandler.tsx\`
- \`src/pages/VenueRouteHandler.tsx\`
- \`src/pages/VenueFourSegmentHandler.tsx\`
- \`src/pages/VenueFiveSegmentHandler.tsx\`

### Main Component
- \`src/pages/VenueFinder.tsx\` - Main venue listing/filtering UI

### URL Utilities
- \`src/lib/venueUrlUtils.ts\` - URL building, slug conversion, country type checks
- \`src/lib/countryAliases.ts\` - Country name/slug mapping
- \`src/lib/cityRegions.ts\` - City-region definitions (London, New York)
- \`src/lib/continents.ts\` - Continent definitions and country mapping
- \`src/lib/venueTypes.ts\` - Venue type slug mapping

### SEO Hooks
- \`src/hooks/useVenueLocationSeo.ts\` - Location-based SEO lookup
- \`src/hooks/useVenueTypeSeo.ts\` - Venue type + location SEO lookup

### Data Hooks
- \`src/hooks/useVenues.ts\` - Venue listing queries
- \`src/hooks/useListings.ts\` - Regions and cities queries

---

## Common Pitfalls

### 1. Forgetting Country Type Check

When writing routing logic, always check if country has regions:

\`\`\`typescript
import { countryHasRegions } from '@/lib/venueUrlUtils';

if (countryHasRegions(selectedCountry)) {
  // UK/USA logic - thirdSegment is region
} else {
  // Germany/France logic - thirdSegment is city
}
\`\`\`

### 2. Null vs Empty String in Database Queries

Supabase/SQL treats \`null\` and \`''\` differently:

\`\`\`typescript
// For optional fields, always use .is() for null checks
.is("region_slug", null)  // ✅
.eq("region_slug", "")    // ❌ Won't match null values
\`\`\`

### 3. Race Conditions with Async City Resolution

The \`selectedCity\` value depends on async data (\`cities\` array from database). During loading/refetch, it can briefly become \`null\`, causing SEO content to flash incorrectly.

**Solution:** Use \`displayCity\` (URL-derived) for display, \`selectedCity\` for data filtering.

### 4. Venue Type Slug in URL Segments

When parsing URL segments, always check if a segment is a venue type before treating it as a location:

\`\`\`typescript
import { isVenueTypeSlug } from '@/lib/venueTypes';

// Filter out venue type from geographic segments
const thirdSegment = (rawThirdSegment === activeVenueTypeSlug) ? null : rawThirdSegment;
\`\`\`

### 5. City-Region Redundancy

Never create URLs like \`/uk/london/london/venue\`. The city-region check prevents this:

\`\`\`typescript
import { isCityRegion } from '@/lib/cityRegions';

if (isCityRegion(country, regionSlug)) {
  // Don't add separate city segment - region IS the city
}
\`\`\`

---

## Debugging Guide

### URL Not Parsing Correctly

1. Check which handler is being used (add console.log to each handler)
2. Log the raw params: \`console.log({ continentSlug, countrySlug, param3, param4, param5 })\`
3. Check if venue type detection is correct: \`isVenueTypeSlug(segment)\`
4. Verify country type: \`countryHasRegions(country)\`

### SEO Showing Wrong Content

1. Check \`displayCity\` vs \`selectedCity\` values in React DevTools
2. Verify SEO hook parameters: \`console.log({ venueType, continent, country, regionSlug, city })\`
3. Check database for matching SEO record with exact field values
4. Remember: \`null\` ≠ \`''\` in database queries

### Filters Not Updating URL

1. Check the URL update \`useEffect\` in VenueFinder.tsx (~line 215)
2. Look for early returns that might block navigation
3. Verify \`buildVenueUrl\` is receiving correct parameters
4. Check if \`selectedCity\`/\`selectedRegionSlug\` have resolved

### Flash of Incorrect Content

1. Likely race condition - async data not loaded yet
2. Ensure using \`displayCity\` (sync) not \`selectedCity\` (async) for display
3. Add \`staleTime\` to relevant queries to prevent refetches
4. Check component re-render triggers in React DevTools

---

## Adding New Features

### Adding a New Country with Regions

1. Add to \`COUNTRIES_WITH_REGIONS\` in \`src/lib/venueUrlUtils.ts\`
2. Add regions to \`regions\` table in database
3. Test all URL patterns for that country

### Adding a New City-Region

1. Add to \`CITY_REGIONS\` in \`src/lib/cityRegions.ts\`
2. Ensure region exists in \`regions\` table
3. Test that \`/country/city-region/venue\` works without duplication

### Adding a New Venue Type

1. Add to venue type mappings in \`src/lib/venueTypes.ts\`
2. Add SEO records to \`venue_type_seo\` table as needed
3. Test URL patterns: \`/continent/type\`, \`/country/type\`, \`/city/type\`

---

## Database Tables Reference

### \`regions\`
\`\`\`sql
id, country, region_name, region_slug, created_at
\`\`\`

### \`venue_location_seo\`
\`\`\`sql
id, continent, country, region_slug, city,
seo_title, h1_override, h2_override, meta_description, 
meta_keywords, intro_text, about_heading, about_content,
created_at, updated_at
\`\`\`

### \`venue_type_seo\`
\`\`\`sql
id, venue_type, continent, country, region_slug, city,
seo_title, h1_override, h2_override, meta_description,
meta_keywords, intro_text, about_heading, about_content,
created_at, updated_at
\`\`\`

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| Jan 2025 | Fixed race condition for non-regional country SEO | Claude/Lovable |
| Jan 2025 | Fixed null vs empty string bug in useVenueTypeSeo | Lovable |
| Jan 2025 | Added displayCity for synchronous URL-derived city | Claude/Lovable |
| Jan 2025 | Initial documentation created | Claude |

---

*This documentation should be updated whenever significant changes are made to the venue routing system.*
`;
