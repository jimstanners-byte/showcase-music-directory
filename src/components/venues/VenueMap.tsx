'use client';

import Link from 'next/link';
import { useMemo, useCallback, useEffect, useRef, useState } from "react";
import Map, { Marker, Popup, NavigationControl, MapRef } from "react-map-gl/maplibre";
import Supercluster from "supercluster";
import { VenueListing } from "@/hooks/useVenues";
import { getVenueUrl } from "@/hooks/useVenueUrl";
import { MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FavouriteButton } from "@/components/FavouriteButton";
import { cn } from "@/lib/utils";
import "maplibre-gl/dist/maplibre-gl.css";

// Free map style
const MAP_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

interface VenueMapProps {
  venues: VenueListing[];
  selectedVenue: VenueListing | null;
  onSelectVenue: (venue: VenueListing | null) => void;
  highlightedVenueId?: string | null;
  onBoundsChange?: (bounds: MapBounds, zoom: number) => void;
  initialState?: {
    bounds: MapBounds;
    zoom: number;
  } | null;
}

// Type for our cluster points
interface VenueProperties {
  id: string;
  venue: VenueListing;
}

type VenuePoint = GeoJSON.Feature<GeoJSON.Point, VenueProperties>;

export function VenueMap({
  venues,
  selectedVenue,
  onSelectVenue,
  highlightedVenueId,
  onBoundsChange,
  initialState,
}: VenueMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [zoom, setZoom] = useState(3);
  const [bounds, setBounds] = useState<[number, number, number, number] | null>(null);

  // Smart auto-pan: only pan if popup would be clipped, with smooth animation
  const ensurePopupVisible = useCallback((lng: number, lat: number) => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const point = map.project([lng, lat]);
    const container = map.getContainer();
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Popup dimensions (approximate) + padding
    const popupHeight = 180; // Slightly taller for venue popup with capacity
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

  // Filter venues with valid coordinates
  const mappableVenues = useMemo(() => venues.filter((v) => v.latitude !== null && v.longitude !== null), [venues]);

  // Create supercluster instance - smaller radius for more granular clusters
  const supercluster = useMemo(() => {
    const cluster = new Supercluster<VenueProperties>({
      radius: 15, // Small radius so only very close venues cluster
      maxZoom: 8, // Stop clustering at zoom 8 - show all individual pins beyond this
      minZoom: 0,
    });

    const points: VenuePoint[] = mappableVenues.map((venue) => ({
      type: "Feature",
      properties: {
        id: venue.id,
        venue,
      },
      geometry: {
        type: "Point",
        coordinates: [venue.longitude!, venue.latitude!],
      },
    }));

    cluster.load(points);
    return cluster;
  }, [mappableVenues]);

  // Get clusters for current viewport
  const clusters = useMemo(() => {
    if (!bounds) return [];
    return supercluster.getClusters(bounds, Math.floor(zoom));
  }, [supercluster, bounds, zoom]);

  // Find which cluster contains the highlighted venue (if any)
  const highlightedClusterId = useMemo(() => {
    if (!highlightedVenueId || !bounds) return null;

    // Check if the highlighted venue is visible as an individual marker
    const isIndividualMarker = clusters.some((cluster) => {
      const props = cluster.properties as any;
      return !props.cluster && props.venue?.id === highlightedVenueId;
    });

    if (isIndividualMarker) return null; // No need to highlight cluster

    // Find which cluster contains this venue
    for (const cluster of clusters) {
      const props = cluster.properties as any;
      if (props.cluster) {
        const leaves = supercluster.getLeaves(props.cluster_id, Infinity);
        const containsVenue = leaves.some((leaf) => leaf.properties.id === highlightedVenueId);
        if (containsVenue) {
          return props.cluster_id;
        }
      }
    }
    return null;
  }, [highlightedVenueId, clusters, supercluster, bounds]);

  // Calculate initial bounds
  const initialBounds = useMemo(() => {
    if (mappableVenues.length === 0) return null;

    const lats = mappableVenues.map((v) => v.latitude!);
    const lngs = mappableVenues.map((v) => v.longitude!);

    return {
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats),
      minLng: Math.min(...lngs),
      maxLng: Math.max(...lngs),
    };
  }, [mappableVenues]);

  // Fit to bounds when venues change (but not on initial load if we have saved state)
  const hasRestoredState = useRef(false);

  useEffect(() => {
    if (!mapRef.current || !initialBounds) return;

    // Skip auto-fit if we're restoring saved state on first load
    if (initialState && !hasRestoredState.current) {
      hasRestoredState.current = true;
      return;
    }

    const map = mapRef.current;
    map.fitBounds(
      [
        [initialBounds.minLng, initialBounds.minLat],
        [initialBounds.maxLng, initialBounds.maxLat],
      ],
      { padding: 50, maxZoom: 12, duration: 0 },
    );
  }, [initialBounds, initialState]);

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
      // Otherwise fit to all venues
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
      // This prevents zooming out when clicking a cluster that spans a huge area
      if (leaves.length > 100) {
        const expansionZoom = supercluster.getClusterExpansionZoom(clusterId);
        mapRef.current.flyTo({
          center: [clusterLng, clusterLat],
          zoom: Math.min(expansionZoom + 1, 14),
          duration: 500,
        });
        return;
      }

      // For smaller clusters, fit bounds to show all venues
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
  if (mappableVenues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-card border rounded-lg p-8">
        <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-lg font-medium text-foreground">No venues with locations</p>
        <p className="text-sm text-muted-foreground mt-1">Venues will appear once geocoded</p>
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
        onClick={() => onSelectVenue(null)}
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

          // It's an individual venue
          const venue = properties.venue as VenueListing;
          const isHighlighted = highlightedVenueId === venue.id;

          // Handler for both mouse and touch interactions
          const handleMarkerInteraction = (e: React.MouseEvent | React.TouchEvent) => {
            e.stopPropagation();
            onSelectVenue(venue);
            // Smart pan to ensure popup is visible
            if (venue.longitude && venue.latitude) {
              setTimeout(() => ensurePopupVisible(venue.longitude!, venue.latitude!), 50);
            }
          };

          return (
            <Marker key={venue.id} longitude={longitude} latitude={latitude} anchor="bottom">
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

        {/* Popup for selected venue */}
        {selectedVenue && selectedVenue.latitude && selectedVenue.longitude && (
          <Popup
            longitude={selectedVenue.longitude}
            latitude={selectedVenue.latitude}
            anchor="bottom"
            onClose={() => onSelectVenue(null)}
            closeOnClick={false}
            offset={25}
            maxWidth="200px"
          >
            <div className="p-2.5 min-w-[160px]">
              <div className="flex items-start justify-between gap-1 mb-1">
                <h3 className="font-semibold leading-tight line-clamp-2">{selectedVenue.name}</h3>
                <FavouriteButton listingId={selectedVenue.id} size="sm" className="h-5 w-5 p-0 shrink-0" />
              </div>

              {selectedVenue.venue_type && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 mb-1.5">
                  {selectedVenue.venue_type}
                </Badge>
              )}

              <div className="text-muted-foreground mb-2">
                {selectedVenue.town_city && (
                  <p>
                    {selectedVenue.town_city}, {selectedVenue.country}
                  </p>
                )}
                {selectedVenue.venue_capacity && (
                  <p className="flex items-center gap-1">
                    <Users className="h-2.5 w-2.5" />
                    {selectedVenue.venue_capacity.toLocaleString()} capacity
                  </p>
                )}
              </div>

              <Button asChild size="sm" className="w-full h-7 text-xs">
                <Link
                  href={getVenueUrl({
                    slug: selectedVenue.slug,
                    country: selectedVenue.country,
                    region_slug: selectedVenue.region_slug,
                    town_city: selectedVenue.town_city,
                  })}
                >
                  View Details
                </Link>
              </Button>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
