'use client';

import { useParams } from 'next/navigation';
import { isVenueTypeSlug, getVenueTypeFromSlug } from '@/lib/venueTypes';
import VenueFinder from './VenueFinder';
import VenueProfile from './VenueProfile';

/**
 * Handler for 5-segment venue URLs
 * 
 * Could be:
 * - /venues/europe/uk/midlands/birmingham/clubs → venue type page (city + type)
 * - /venues/europe/uk/midlands/birmingham/o2-academy → venue profile page
 * - /venues/europe/uk/london/london/clubs → venue type page (London city + type)
 * - /venues/europe/uk/london/london/o2-academy → venue profile page
 * - /venues/north-america/usa/new-york/new-york/arenas → venue type page (NYC + type)
 */
export default function VenueFiveSegmentHandler() {
  const { param5 } = useParams<{
    continentSlug: string;
    countrySlug: string;
    param3: string;
    param4: string;
    param5: string;
  }>();

  // Check if param5 is a venue type slug
  if (param5 && isVenueTypeSlug(param5)) {
    const venueType = getVenueTypeFromSlug(param5);
    return (
      <VenueFinder 
        preSelectedVenueType={venueType} 
        venueTypeSlug={param5} 
      />
    );
  }

  // Not a venue type - it's a venue slug, show profile
  return <VenueProfile />;
}