'use client';

import { useParams } from 'next/navigation';
import { isVenueTypeSlug, getVenueTypeFromSlug } from '@/lib/venueTypes';
import VenueFinder from './VenueFinder';

/**
 * Handler for 2-segment venue URLs: /venues/:continentSlug/:secondSegment
 * 
 * The second segment could be:
 * - A venue type slug (arenas, clubs) → show venue type page for continent
 * - A country slug (germany, uk) → show country page
 */
export default function VenueTwoSegmentHandler() {
  const { continentSlug, countrySlug } = useParams<{
    continentSlug: string;
    countrySlug: string;
  }>();

  // Check if second segment is a venue type
  if (countrySlug && isVenueTypeSlug(countrySlug)) {
    const venueType = getVenueTypeFromSlug(countrySlug);
    return (
      <VenueFinder 
        preSelectedVenueType={venueType} 
        venueTypeSlug={countrySlug} 
      />
    );
  }

  // Not a venue type - treat as country, render normal VenueFinder
  return <VenueFinder />;
}
