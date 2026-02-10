'use client';

import Link from 'next/link';
import { useMemo, useCallback, useEffect, useRef, useState } from "react";
import Map, { Marker, Popup, NavigationControl, MapRef } from "react-map-gl/maplibre";
import Supercluster from "supercluster";
import { VenueListing } from "@/hooks/useVenues";
import { getVenueUrl } from "@/hooks/useVenueUrl";
import { MapPin, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FavouriteButton } from "@/components/FavouriteButton";
import { cn } from "@/lib/utils";
import "maplibre-gl/dist/maplibre-gl.css";

// ============================================================
// ROLLBACK TOGGLE — set to false to revert to original design
// ============================================================
const ENHANCED_PINS = true;

// Map style: Voyager (detailed) when enhanced, Positron (minimal) when not
const MAP_STYLE = ENHANCED_PINS
  ? "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
  : "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

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
  resetTrigger?: number;
  flyToLocation?: { lat: number; lng: number; id: string } | null;
}

// Type for our cluster points
interface VenueProperties {
  id: string;
  venue: VenueListing;
}

type VenuePoint = GeoJSON.Feature<GeoJSON.Point, VenueProperties>;

// ============================================================
// Tier-aware pin components (only used when ENHANCED_PINS=true)
// ============================================================

function PremierPin({ venue, isHighlighted, isSelected }: { venue: VenueListing; isHighlighted: boolean; isSelected?: boolean }) {
  const hasLogo = !!venue.logo_url;
  return (
    <div className="relative flex flex-col items-center">
      {/* Glow */}
      <div className={cn(
        "absolute -inset-2 rounded-full blur-md transition-opacity",
        isHighlighted ? "bg-amber-400/40" : "bg-amber-400/20"
      )} />
      <div className="relative">
        {/* Circle with logo or initials */}
        <div
          className={cn(
            "relative rounded-full border-[3px] border-amber-400 bg-white flex items-center justify-center overflow-hidden",
            isHighlighted ? "w-14 h-14" : "w-12 h-12"
          )}
          style={{
            boxShadow: "0 0 0 2px rgba(245,158,11,0.3), 0 4px 12px rgba(0,0,0,0.25)",
          }}
        >
          {hasLogo ? (
            <img
              src={venue.logo_url!}
              alt={venue.name}
              className="w-full h-full object-contain p-1"
              loading="lazy"
            />
          ) : (
            <span className="text-xs font-bold text-gray-600">
              {venue.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        {/* Star badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center border-2 border-white">
          <Star className="w-2.5 h-2.5 text-white fill-white" />
        </div>
        {/* Pointer triangle */}
        <div className="flex justify-center">
          <div
            className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-amber-400"
            style={{ marginTop: "-1px" }}
          />
        </div>
      </div>
      {/* Name label — hidden when popup is open */}
      {!isSelected && (
        <span className="mt-0.5 text-[10px] font-semibold text-gray-800 bg-white/90 px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap max-w-[120px] truncate">
          {venue.name}
        </span>
      )}
    </div>
  );
}

function EnhancedPin({ isHighlighted }: { isHighlighted: boolean }) {
  return (
    <svg
      width="36"
      height="44"
      viewBox="0 0 24 30"
      style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.3))" }}
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        fill={isHighlighted ? "hsl(var(--accent))" : "#3B82F6"}
        stroke="white"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="9" r="2.5" fill="white" />
    </svg>
  );
}

function FreePinSvg({ isHighlighted }: { isHighlighted: boolean }) {
  return (
    <svg
      width="28"
      height="36"
      viewBox="0 0 24 30"
      style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        fill={isHighlighted ? "hsl(var(--accent))" : "#94A3B8"}
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// ============================================================
// Main component
// ============================================================

export function VenueMap({
  venues,
  selectedVenue,
  onSelectVenue,
  highlightedVenueId,
  onBoundsChange,
  initialState,
  resetTrigger,
  flyToLocation,
}: VenueMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [zoom, setZoom] = useState(3);
  const [bounds, setBounds] = useState<[number, number, number, number] | null>(null);
  const [hoveredVenueId, setHoveredVenueId] = useState<string | null>(null);

  // Fly to a specific location when flyToLocation changes
  const lastFlyToRef = useRef<string | null>(null);
  useEffect(() => {
    if (!flyToLocation || !mapRef.current) return;
    if (lastFlyToRef.current === flyToLocation.id) return;
    lastFlyToRef.current = flyToLocation.id;

    mapRef.current.flyTo({
      center: [flyToLocation.lng, flyToLocation.lat],
      zoom: 12,
      duration: 800,
    });
  }, [flyToLocation]);

  // Smart auto-pan: only pan if popup would be clipped, with smooth animation
  const ensurePopupVisible = useCallback((lng: number, lat: number) => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const point = map.project([lng, lat]);
    const container = map.getContainer();
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Popup dimensions (approximate) + padding
    const popupHeight = ENHANCED_PINS ? 200 : 180;
    const popupWidth = 100;
    const padding = 20;

    let panX = 0;
    let panY = 0;

    if (point.y - popupHeight - padding < 0) {
      panY = point.y - popupHeight - padding;
    }
    if (point.y + padding > height) {
      panY = point.y + padding - height;
    }
    if (point.x - popupWidth - padding < 0) {
      panX = point.x - popupWidth - padding;
    }
    if (point.x + popupWidth + padding > width) {
      panX = point.x + popupWidth + padding - width;
    }

    if (panX !== 0 || panY !== 0) {
      map.panBy([panX, panY], { duration: 300 });
    }
  }, []);

  // Filter venues with valid coordinates
  const mappableVenues = useMemo(() => venues.filter((v) => v.latitude !== null && v.longitude !== null), [venues]);

  // Create supercluster instance
  const supercluster = useMemo(() => {
    const cluster = new Supercluster<VenueProperties>({
      radius: 15,
      maxZoom: 8,
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

    const isIndividualMarker = clusters.some((cluster) => {
      const props = cluster.properties as any;
      return !props.cluster && props.venue?.id === highlightedVenueId;
    });

    if (isIndividualMarker) return null;

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
  const prevResetTrigger = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!mapRef.current || !initialBounds) return;

    const isForceReset = resetTrigger !== undefined && resetTrigger !== prevResetTrigger.current;
    prevResetTrigger.current = resetTrigger;

    if (initialState && !hasRestoredState.current && !isForceReset) {
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
  }, [initialBounds, initialState, resetTrigger]);

  // Handle map load
  const onMapLoad = useCallback(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    if (initialState) {
      map.fitBounds(
        [
          [initialState.bounds.west, initialState.bounds.south],
          [initialState.bounds.east, initialState.bounds.north],
        ],
        { padding: 0, duration: 0 },
      );
    } else if (initialBounds) {
      map.fitBounds(
        [
          [initialBounds.minLng, initialBounds.minLat],
          [initialBounds.maxLng, initialBounds.maxLat],
        ],
        { padding: 50, maxZoom: 12, duration: 0 },
      );
    }

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

      if (leaves.length > 100) {
        const expansionZoom = supercluster.getClusterExpansionZoom(clusterId);
        mapRef.current.flyTo({
          center: [clusterLng, clusterLat],
          zoom: Math.min(expansionZoom + 1, 14),
          duration: 500,
        });
        return;
      }

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

  // Get the popup offset based on tier
  const getPopupOffset = (): number => {
    if (!ENHANCED_PINS || !selectedVenue) return 25;
    if (selectedVenue.tier === 'premier') return 55;
    if (selectedVenue.tier === 'enhanced') return 35;
    return 25;
  };

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
                <div className="relative">
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-full cursor-pointer transition-all duration-150",
                      isHighlighted ? "scale-110 ring-4 ring-accent/50" : "hover:scale-110",
                    )}
                    style={{
                      width: size,
                      height: size,
                      background: ENHANCED_PINS
                        ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                        : undefined,
                      backgroundColor: !ENHANCED_PINS
                        ? (isHighlighted ? "hsl(var(--accent))" : "hsl(var(--primary))")
                        : undefined,
                      color: "hsl(var(--primary-foreground))",
                      fontSize: Math.max(11, baseSize * 0.32),
                      fontWeight: 600,
                      boxShadow: isHighlighted
                          ? "0 4px 12px rgba(0,0,0,0.4)"
                          : "0 2px 8px rgba(0,0,0,0.3)",
                      border: isHighlighted ? "3px solid white" : "2px solid white",
                    }}
                  >
                    {formatCount(count)}
                  </div>
                </div>
              </Marker>
            );
          }

          // It's an individual venue
          const venue = properties.venue as VenueListing;
          const isHighlighted = highlightedVenueId === venue.id;
          const isHovered = hoveredVenueId === venue.id;
          const tier = venue.tier;

          // Click to open popup
          const handleMarkerClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            onSelectVenue(venue);
            if (venue.longitude && venue.latitude) {
              setTimeout(() => ensurePopupVisible(venue.longitude!, venue.latitude!), 50);
            }
          };

          // Check if pin is near edges of map — reposition tooltip accordingly
          const tooltipPosition = (() => {
            if (!mapRef.current || !venue.longitude || !venue.latitude) return { vertical: 'above' as const, align: 'center' as const };
            const point = mapRef.current.project([venue.longitude!, venue.latitude!]);
            const container = mapRef.current.getContainer();
            return {
              vertical: point.y < 40 ? 'below' as const : 'above' as const,
              align: point.x < 80 ? 'left' as const : point.x > container.offsetWidth - 80 ? 'right' as const : 'center' as const,
            };
          })();

          // Name tooltip (shown on hover for non-premier pins; premier already has a permanent label)
          const nameTooltip = tier !== 'premier' && isHovered && !selectedVenue ? (
            <div className={cn(
              "absolute pointer-events-none z-30",
              tooltipPosition.vertical === 'below' ? "top-full mt-1" : "-top-1 -translate-y-full",
              tooltipPosition.align === 'left' ? "left-0" : tooltipPosition.align === 'right' ? "right-0" : "left-1/2 -translate-x-1/2",
            )}>
              <div className="bg-gray-900/90 text-white text-[9px] font-medium px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap max-w-[140px] truncate">
                {venue.name}
              </div>
            </div>
          ) : null;

          // Enhanced tier-based pins
          if (ENHANCED_PINS && tier === 'premier') {
            return (
              <Marker key={venue.id} longitude={longitude} latitude={latitude} anchor="bottom" style={{ zIndex: isHovered ? 10 : 0 }}>
                <div
                  className={cn(
                    "cursor-pointer transition-transform duration-150",
                    isHighlighted || isHovered ? "scale-110 z-20" : "hover:scale-105 z-10"
                  )}
                  onClick={handleMarkerClick}
                  onMouseEnter={() => setHoveredVenueId(venue.id)}
                  onMouseLeave={() => setHoveredVenueId(null)}
                >
                  <PremierPin venue={venue} isHighlighted={isHighlighted || isHovered} isSelected={selectedVenue?.id === venue.id} />
                </div>
              </Marker>
            );
          }

          if (ENHANCED_PINS && tier === 'enhanced') {
            return (
              <Marker key={venue.id} longitude={longitude} latitude={latitude} anchor="bottom" style={{ zIndex: isHovered ? 10 : 0 }}>
                <div
                  className={cn(
                    "relative cursor-pointer transition-transform duration-150",
                    isHighlighted || isHovered ? "scale-150 z-10" : "hover:scale-125"
                  )}
                  onClick={handleMarkerClick}
                  onMouseEnter={() => setHoveredVenueId(venue.id)}
                  onMouseLeave={() => setHoveredVenueId(null)}
                >
                  {nameTooltip}
                  <EnhancedPin isHighlighted={isHighlighted || isHovered} />
                </div>
              </Marker>
            );
          }

          if (ENHANCED_PINS) {
            return (
              <Marker key={venue.id} longitude={longitude} latitude={latitude} anchor="bottom" style={{ zIndex: isHovered ? 10 : 0 }}>
                <div
                  className={cn(
                    "relative cursor-pointer transition-transform duration-150",
                    isHighlighted || isHovered ? "scale-150 z-10" : "hover:scale-125"
                  )}
                  onClick={handleMarkerClick}
                  onMouseEnter={() => setHoveredVenueId(venue.id)}
                  onMouseLeave={() => setHoveredVenueId(null)}
                >
                  {nameTooltip}
                  <FreePinSvg isHighlighted={isHighlighted || isHovered} />
                </div>
              </Marker>
            );
          }

          // Original pin (when ENHANCED_PINS = false)
          return (
            <Marker key={venue.id} longitude={longitude} latitude={latitude} anchor="bottom" style={{ zIndex: isHovered ? 10 : 0 }}>
              <div
                className={`relative cursor-pointer transition-transform duration-150 ${
                  isHighlighted || isHovered ? "scale-150 z-10" : "hover:scale-125"
                }`}
                onClick={handleMarkerClick}
                onMouseEnter={() => setHoveredVenueId(venue.id)}
                onMouseLeave={() => setHoveredVenueId(null)}
              >
                {nameTooltip}
                <MapPin
                  className="h-7 w-7 drop-shadow-lg"
                  style={{
                    fill: isHighlighted || isHovered ? "hsl(var(--accent))" : "hsl(var(--primary))",
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
            offset={getPopupOffset()}
            maxWidth={ENHANCED_PINS && selectedVenue.tier === 'premier' ? "240px" : "200px"}
          >
            {ENHANCED_PINS && selectedVenue.tier === 'premier' ? (
              /* Enhanced premier popup — clean vertical layout with gold accent */
              <div className="min-w-[200px] max-w-[240px] pr-6">
                <div className="border-l-[3px] border-amber-400 pl-3 py-2.5 pr-2">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold leading-tight text-sm">{selectedVenue.name}</h3>
                    <FavouriteButton listingId={selectedVenue.id} size="sm" className="h-5 w-5 p-0 shrink-0 mt-0.5" />
                  </div>

                  <div className="flex items-center gap-1.5 mb-2">
                    {selectedVenue.venue_type && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                        {selectedVenue.venue_type}
                      </Badge>
                    )}
                    {selectedVenue.venue_capacity && (
                      <span className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                        <Users className="h-2.5 w-2.5" />
                        {selectedVenue.venue_capacity.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {selectedVenue.town_city && (
                    <p className="text-[11px] text-muted-foreground mb-2">
                      {selectedVenue.town_city}, {selectedVenue.country}
                    </p>
                  )}

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
              </div>
            ) : (
              /* Standard popup (enhanced/free tier or ENHANCED_PINS off) */
              <div className="p-2.5 min-w-[160px] pr-8">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold leading-tight line-clamp-2">{selectedVenue.name}</h3>
                  <FavouriteButton listingId={selectedVenue.id} size="sm" className="h-5 w-5 p-0 shrink-0 mt-0.5" />
                </div>

                {selectedVenue.venue_type && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 mb-1.5">
                    {selectedVenue.venue_type}
                  </Badge>
                )}

                {ENHANCED_PINS && selectedVenue.tier === 'enhanced' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-white bg-blue-500 px-1.5 py-0.5 rounded-full mb-1.5">
                    Enhanced
                  </span>
                )}

                <div className="text-muted-foreground mb-2">
                  {selectedVenue.town_city && (
                    <p>{selectedVenue.town_city}, {selectedVenue.country}</p>
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
            )}
          </Popup>
        )}
      </Map>
    </div>
  );
}