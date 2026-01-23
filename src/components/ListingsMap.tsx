'use client';

import Link from 'next/link';
import { useMemo, useCallback, useEffect, useRef, useState } from "react";
import Map, { Marker, Popup, NavigationControl, MapRef } from "react-map-gl/maplibre";
import Supercluster from "supercluster";
import { Listing, ListingPublic } from "@/types/database";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FavouriteButton } from "@/components/FavouriteButton";
import { cn } from "@/lib/utils";
import "maplibre-gl/dist/maplibre-gl.css";

// Free map style - using Carto's positron style for cleaner look
const MAP_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

interface ListingsMapProps {
  listings: (Listing | ListingPublic)[];
  selectedListing?: Listing | ListingPublic | null;
  onSelectListing?: (listing: Listing | ListingPublic | null) => void;
  highlightedListingId?: string | null;
  onBoundsChange?: (bounds: MapBounds, zoom: number) => void;
  initialState?: {
    bounds: MapBounds;
    zoom: number;
  } | null;
  resetTrigger?: number; // Increment to force map to re-fit to bounds
}

// Type for our cluster points
interface ListingProperties {
  id: string;
  listing: Listing | ListingPublic;
}

type ListingPoint = GeoJSON.Feature<GeoJSON.Point, ListingProperties>;

export function ListingsMap({
  listings,
  selectedListing,
  onSelectListing,
  highlightedListingId,
  onBoundsChange,
  initialState,
  resetTrigger,
}: ListingsMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [zoom, setZoom] = useState(3);
  const [bounds, setBounds] = useState<[number, number, number, number] | null>(null);
  const [internalSelectedListing, setInternalSelectedListing] = useState<Listing | ListingPublic | null>(null);

  // Use internal state if no external control
  const actualSelectedListing = selectedListing !== undefined ? selectedListing : internalSelectedListing;
  const handleSelectListing = onSelectListing || setInternalSelectedListing;

  // Smart auto-pan: only pan if popup would be clipped, with smooth animation
  const ensurePopupVisible = useCallback((lng: number, lat: number) => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const point = map.project([lng, lat]);
    const container = map.getContainer();
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Popup dimensions (approximate) + padding
    const popupHeight = 160; // Approximate popup height including offset
    const popupWidth = 100; // Half of popup width (centered on point)
    const padding = 20; // Edge padding

    let panX = 0;
    let panY = 0;

    // Check if popup would be clipped at top
    if (point.y - popupHeight - padding < 0) {
      panY = point.y - popupHeight - padding;
    }

    // Check if popup would be clipped at bottom (unlikely with bottom anchor, but check anyway)
    if (point.y + padding > height) {
      panY = point.y + padding - height;
    }

    // Check left edge
    if (point.x - popupWidth - padding < 0) {
      panX = point.x - popupWidth - padding;
    }

    // Check right edge
    if (point.x + popupWidth + padding > width) {
      panX = point.x + popupWidth + padding - width;
    }

    // Only pan if needed
    if (panX !== 0 || panY !== 0) {
      map.panBy([panX, panY], { duration: 300 });
    }
  }, []);

  // Filter listings with valid coordinates
  const mappableListings = useMemo(
    () => listings.filter((l) => l.latitude !== null && l.longitude !== null),
    [listings],
  );

  // Create supercluster instance - smaller radius for more granular clusters
  const supercluster = useMemo(() => {
    const cluster = new Supercluster<ListingProperties>({
      radius: 40, // Reduced from 60 for more granular clusters
      maxZoom: 16,
      minZoom: 0,
    });

    const points: ListingPoint[] = mappableListings.map((listing) => ({
      type: "Feature",
      properties: {
        id: listing.id,
        listing,
      },
      geometry: {
        type: "Point",
        coordinates: [listing.longitude!, listing.latitude!],
      },
    }));

    cluster.load(points);
    return cluster;
  }, [mappableListings]);

  // Get clusters for current viewport
  const clusters = useMemo(() => {
    if (!bounds) return [];
    return supercluster.getClusters(bounds, Math.floor(zoom));
  }, [supercluster, bounds, zoom]);

  // Find which cluster contains the highlighted listing (if any)
  const highlightedClusterId = useMemo(() => {
    if (!highlightedListingId || !bounds) return null;

    // Check if the highlighted listing is visible as an individual marker
    const isIndividualMarker = clusters.some((cluster) => {
      const props = cluster.properties as any;
      return !props.cluster && props.listing?.id === highlightedListingId;
    });

    if (isIndividualMarker) return null; // No need to highlight cluster

    // Find which cluster contains this listing
    for (const cluster of clusters) {
      const props = cluster.properties as any;
      if (props.cluster) {
        const leaves = supercluster.getLeaves(props.cluster_id, Infinity);
        const containsListing = leaves.some((leaf) => leaf.properties.id === highlightedListingId);
        if (containsListing) {
          return props.cluster_id;
        }
      }
    }
    return null;
  }, [highlightedListingId, clusters, supercluster, bounds]);

  // Calculate initial bounds
  const initialBounds = useMemo(() => {
    if (mappableListings.length === 0) return null;

    const lats = mappableListings.map((l) => l.latitude!);
    const lngs = mappableListings.map((l) => l.longitude!);

    return {
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats),
      minLng: Math.min(...lngs),
      maxLng: Math.max(...lngs),
    };
  }, [mappableListings]);

  // Fit to bounds when listings change (but not if we have saved state to restore)
  const hasRestoredState = useRef(false);
  const prevBoundsRef = useRef<typeof initialBounds>(null);
  const prevResetTrigger = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!mapRef.current || !initialBounds) return;

    // Check if this is a forced reset (resetTrigger changed)
    const isForceReset = resetTrigger !== undefined && resetTrigger !== prevResetTrigger.current;
    prevResetTrigger.current = resetTrigger;

    // If force reset, clear the restored state and fit to bounds
    if (isForceReset) {
      hasRestoredState.current = false;
      prevBoundsRef.current = initialBounds;
      const map = mapRef.current;
      map.fitBounds(
        [
          [initialBounds.minLng, initialBounds.minLat],
          [initialBounds.maxLng, initialBounds.maxLat],
        ],
        { padding: 50, maxZoom: 12, duration: 500 },
      );
      return;
    }

    // If we have saved state to restore, mark as restored and skip (onMapLoad handles it)
    if (initialState) {
      hasRestoredState.current = true;
      prevBoundsRef.current = initialBounds;
      return;
    }

    // Check if bounds actually changed (different listings)
    const boundsChanged =
      !prevBoundsRef.current ||
      prevBoundsRef.current.minLat !== initialBounds.minLat ||
      prevBoundsRef.current.maxLat !== initialBounds.maxLat ||
      prevBoundsRef.current.minLng !== initialBounds.minLng ||
      prevBoundsRef.current.maxLng !== initialBounds.maxLng;

    prevBoundsRef.current = initialBounds;

    // If bounds changed (filter change), fit to new bounds
    // If bounds same and we restored, skip (user is browsing same data)
    if (!boundsChanged && hasRestoredState.current) {
      return;
    }

    // Reset restored flag when bounds change
    if (boundsChanged) {
      hasRestoredState.current = false;
    }

    const map = mapRef.current;
    map.fitBounds(
      [
        [initialBounds.minLng, initialBounds.minLat],
        [initialBounds.maxLng, initialBounds.maxLat],
      ],
      { padding: 50, maxZoom: 12, duration: 500 },
    );
  }, [initialBounds, initialState, resetTrigger]);

  // Handle map load
  const onMapLoad = useCallback(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // If we have saved state to restore, use it
    if (initialState) {
      map.fitBounds(
        [
          [initialState.bounds.west, initialState.bounds.south],
          [initialState.bounds.east, initialState.bounds.north],
        ],
        { padding: 0, duration: 0 },
      );
    } else if (initialBounds) {
      // Otherwise fit to all listings
      map.fitBounds(
        [
          [initialBounds.minLng, initialBounds.minLat],
          [initialBounds.maxLng, initialBounds.maxLat],
        ],
        { padding: 50, maxZoom: 12, duration: 0 },
      );
    }

    // Set initial bounds state
    const mapBounds = map.getBounds();
    if (mapBounds) {
      const newBounds: [number, number, number, number] = [
        mapBounds.getWest(),
        mapBounds.getSouth(),
        mapBounds.getEast(),
        mapBounds.getNorth(),
      ];
      setBounds(newBounds);
      setZoom(map.getZoom());

      // Notify parent
      onBoundsChange?.(
        {
          west: newBounds[0],
          south: newBounds[1],
          east: newBounds[2],
          north: newBounds[3],
        },
        map.getZoom(),
      );
    }
  }, [initialBounds, initialState, onBoundsChange]);

  // Handle map move
  const onMoveEnd = useCallback(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const mapBounds = map.getBounds();
    const newZoom = map.getZoom();

    if (mapBounds) {
      const newBounds: [number, number, number, number] = [
        mapBounds.getWest(),
        mapBounds.getSouth(),
        mapBounds.getEast(),
        mapBounds.getNorth(),
      ];
      setBounds(newBounds);
      setZoom(newZoom);

      // Notify parent of bounds change for list filtering and state persistence
      onBoundsChange?.(
        {
          west: newBounds[0],
          south: newBounds[1],
          east: newBounds[2],
          north: newBounds[3],
        },
        newZoom,
      );
    }
  }, [onBoundsChange]);

  // Handle cluster click - smart zoom based on cluster size
  const handleClusterClick = useCallback(
    (clusterId: number, clusterLng: number, clusterLat: number) => {
      if (!mapRef.current) return;

      const leaves = supercluster.getLeaves(clusterId, Infinity);
      if (leaves.length === 0) return;

      // For large clusters (100+), use expansion zoom (one level at a time)
      if (leaves.length > 100) {
        const expansionZoom = supercluster.getClusterExpansionZoom(clusterId);
        mapRef.current.flyTo({
          center: [clusterLng, clusterLat],
          zoom: Math.min(expansionZoom + 1, 14),
          duration: 500,
        });
        return;
      }

      // For smaller clusters, fit bounds to show all listings
      const lngs = leaves.map((l) => l.geometry.coordinates[0]);
      const lats = leaves.map((l) => l.geometry.coordinates[1]);

      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);

      const lngPad = Math.max((maxLng - minLng) * 0.15, 0.01);
      const latPad = Math.max((maxLat - minLat) * 0.15, 0.01);

      mapRef.current.fitBounds(
        [
          [minLng - lngPad, minLat - latPad],
          [maxLng + lngPad, maxLat + latPad],
        ],
        { padding: 50, maxZoom: 16, duration: 500 },
      );
    },
    [supercluster],
  );

  // Format count for display
  const formatCount = (count: number): string => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  // Empty state
  if (mappableListings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-card border rounded-lg p-8">
        <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-lg font-medium text-foreground">No locations to display</p>
        <p className="text-sm text-muted-foreground mt-1">Locations will appear once geocoded</p>
      </div>
    );
  }

  return (
    <div className="h-full rounded-lg overflow-hidden border bg-card">
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: initialBounds ? (initialBounds.minLat + initialBounds.maxLat) / 2 : 50,
          longitude: initialBounds ? (initialBounds.minLng + initialBounds.maxLng) / 2 : 0,
          zoom: 3,
        }}
        mapStyle={MAP_STYLE}
        style={{ width: "100%", height: "100%" }}
        onLoad={onMapLoad}
        onMoveEnd={onMoveEnd}
        onClick={() => handleSelectListing(null)}
      >
        <NavigationControl position="top-right" />

        {/* Render clusters and individual markers */}
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const properties = cluster.properties as any;

          // It's a cluster
          if (properties.cluster) {
            const count = properties.point_count;
            const isHighlighted = properties.cluster_id === highlightedClusterId;
            const baseSize = Math.min(28 + Math.sqrt(count) * 2, 50);
            const size = isHighlighted ? baseSize * 1.3 : baseSize;

            return (
              <Marker
                key={`cluster-${properties.cluster_id}`}
                longitude={longitude}
                latitude={latitude}
                anchor="center"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  handleClusterClick(properties.cluster_id, longitude, latitude);
                }}
              >
                <div
                  className={cn(
                    "flex items-center justify-center rounded-full cursor-pointer transition-all duration-150",
                    isHighlighted ? "scale-110 ring-4 ring-accent/50" : "hover:scale-110",
                  )}
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: isHighlighted ? "hsl(var(--accent))" : "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    fontSize: Math.max(11, baseSize * 0.32),
                    fontWeight: 600,
                    boxShadow: isHighlighted ? "0 4px 12px rgba(0,0,0,0.4)" : "0 2px 8px rgba(0,0,0,0.3)",
                    border: isHighlighted ? "3px solid white" : "2px solid white",
                  }}
                >
                  {formatCount(count)}
                </div>
              </Marker>
            );
          }

          // It's an individual listing
          const listing = properties.listing as Listing;
          const isHighlighted = highlightedListingId === listing.id;

          // Handler for both mouse and touch interactions
          const handleMarkerInteraction = (e: React.MouseEvent | React.TouchEvent) => {
            e.stopPropagation();
            handleSelectListing(listing);
            // Smart pan to ensure popup is visible
            if (listing.longitude && listing.latitude) {
              setTimeout(() => ensurePopupVisible(listing.longitude!, listing.latitude!), 50);
            }
          };

          return (
            <Marker key={listing.id} longitude={longitude} latitude={latitude} anchor="bottom">
              <div
                className={`cursor-pointer transition-transform duration-150 ${
                  isHighlighted ? "scale-150 z-10" : "hover:scale-125"
                }`}
                onMouseEnter={handleMarkerInteraction}
                onClick={handleMarkerInteraction}
                onTouchStart={handleMarkerInteraction}
              >
                <MapPin
                  className="h-7 w-7 drop-shadow-lg"
                  style={{
                    fill: isHighlighted ? "hsl(var(--accent))" : "hsl(var(--primary))",
                    stroke: "white",
                    strokeWidth: 1.5,
                  }}
                />
              </div>
            </Marker>
          );
        })}

        {/* Popup for selected listing */}
        {actualSelectedListing && actualSelectedListing.latitude && actualSelectedListing.longitude && (
          <Popup
            longitude={actualSelectedListing.longitude}
            latitude={actualSelectedListing.latitude}
            anchor="bottom"
            onClose={() => handleSelectListing(null)}
            closeOnClick={false}
            offset={25}
            maxWidth="200px"
          >
            <div className="p-2.5 min-w-[160px]">
              <div className="flex items-start justify-between gap-1 mb-1">
                <h3 className="font-semibold leading-tight line-clamp-2">{actualSelectedListing.name}</h3>
                <FavouriteButton listingId={actualSelectedListing.id} size="sm" className="h-5 w-5 p-0 shrink-0" />
              </div>

              {actualSelectedListing.town_city && (
                <p className="text-muted-foreground mb-2">
                  {actualSelectedListing.town_city}, {actualSelectedListing.country}
                </p>
              )}

              <Button asChild size="sm" className="w-full h-7 text-xs">
                <Link href={`/listing/${actualSelectedListing.slug}`}>View Details</Link>
              </Button>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

// Default export for backward compatibility with lazy loading
export default ListingsMap;
