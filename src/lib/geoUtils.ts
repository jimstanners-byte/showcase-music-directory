/**
 * Geographic utility functions for distance calculations and proximity filtering
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Calculate distance between two points using Haversine formula
 * Returns distance in kilometers
 * 
 * @param lat1 - Latitude of first point
 * @param lon1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lon2 - Longitude of second point
 * @returns Distance in kilometers
 */
export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Check if a point is within a given radius of a center point
 * 
 * @param centerLat - Latitude of center point
 * @param centerLon - Longitude of center point
 * @param pointLat - Latitude of point to check
 * @param pointLon - Longitude of point to check
 * @param radiusKm - Radius in kilometers
 * @returns true if point is within radius
 */
export function isWithinRadius(
  centerLat: number,
  centerLon: number,
  pointLat: number,
  pointLon: number,
  radiusKm: number
): boolean {
  const distance = haversineDistance(centerLat, centerLon, pointLat, pointLon);
  return distance <= radiusKm;
}

/**
 * Find the center point (mean latitude/longitude) of a collection of coordinates
 * Useful for finding city center from venues in that city
 * 
 * @param coordinates - Array of coordinate objects
 * @returns Center point or null if no valid coordinates
 */
export function findCenterPoint(coordinates: Coordinates[]): Coordinates | null {
  const validCoords = coordinates.filter(
    (c) => c.latitude !== null && c.longitude !== null
  );
  
  if (validCoords.length === 0) return null;
  
  const sumLat = validCoords.reduce((sum, c) => sum + c.latitude, 0);
  const sumLon = validCoords.reduce((sum, c) => sum + c.longitude, 0);
  
  return {
    latitude: sumLat / validCoords.length,
    longitude: sumLon / validCoords.length,
  };
}
