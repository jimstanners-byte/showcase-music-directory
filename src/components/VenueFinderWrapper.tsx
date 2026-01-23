'use client';

import { useParams } from 'next/navigation';
import { isVenueTypeSlug, getVenueTypeFromSlug } from '@/lib/venueTypes';
import VenueFinder from './VenueFinder';

/**
 * Unified wrapper for VenueFinder that handles all route variations.
 * This ensures VenueFinder doesn't unmount when navigating between
 * different venue URLs (which would reset its internal state).
 */
export default function VenueFinderWrapper() {
  const params = useParams<{
    continentSlug?: string;
    countrySlug?: string;
  }>();

  // Check if second segment is a venue type (e.g., /venues/europe/arenas)
  const secondSegmentIsVenueType = params.countrySlug && isVenueTypeSlug(params.countrySlug);
  
  if (secondSegmentIsVenueType) {
    const venueType = getVenueTypeFromSlug(params.countrySlug!);
    return (
      <VenueFinder 
        preSelectedVenueType={venueType} 
        venueTypeSlug={params.countrySlug} 
      />
    );
  }

  // Normal case - just render VenueFinder
  return <VenueFinder />;
}
