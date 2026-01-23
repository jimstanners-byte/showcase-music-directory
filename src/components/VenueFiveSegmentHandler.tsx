'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { isVenueTypeSlug, getVenueTypeFromSlug } from '@/lib/venueTypes';
import { isCityRegion } from '@/lib/cityRegions';
import VenueFinder from './VenueFinder';
import VenueProfile from './VenueProfile';

/**
 * Handler for 5-segment venue URLs
 * 
 * Could be:
 * - /venues/europe/uk/midlands/birmingham/clubs → venue type page (city + type)
 * - /venues/europe/uk/midlands/birmingham/o2-academy → venue profile page
 * 
 * For city-regions (London, New York):
 * - /venues/europe/uk/london/london/o2-academy → redirect to /venues/europe/uk/london/o2-academy
 * - /venues/europe/uk/london/london/clubs → redirect to /venues/europe/uk/london/clubs
 */
export default function VenueFiveSegmentHandler() {
  const router = useRouter();
  const { continentSlug, countrySlug, param3, param4, param5 } = useParams<{
    continentSlug: string;
    countrySlug: string;
    param3: string;
    param4: string;
    param5: string;
  }>();

  // Check for city-region redirect (e.g., /uk/london/london/venue → /uk/london/venue)
  // If param3 is a city-region and param4 matches the region slug, redirect to 4-segment URL
  if (param3 && param4 && param5 && isCityRegion(countrySlug, param3)) {
    const regionSlug = param3.toLowerCase();
    const fourthSlug = param4.toLowerCase();
    
    // Redirect if param4 matches the region (city-region redundancy)
    if (regionSlug === fourthSlug) {
      useEffect(() => {
        router.replace(`/venues/${continentSlug}/${countrySlug}/${param3}/${param5}`);
      }, [router, continentSlug, countrySlug, param3, param5]);
      return null;
    }
  }

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
