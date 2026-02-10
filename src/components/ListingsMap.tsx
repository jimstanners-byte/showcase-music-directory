'use client';

import Link from 'next/link';
import { useMemo, useCallback, useEffect, useRef, useState } from "react";
import Map, { Marker, Popup, NavigationControl, MapRef } from "react-map-gl/maplibre";
import Supercluster from "supercluster";
import { Listing, ListingPublic } from "@/types/database";
import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  flyToLocation?: { lat: number; lng: number; id: string } | null; // Fly to a specific listing location
}

// Type for our cluster points
interface ListingProperties {
  id: string;
  listing: Listing | ListingPublic;
}

type ListingPoint = GeoJSON.Feature<GeoJSON.Point, ListingProperties>;

// ============================================================
// Tier-aware pin components (only used when ENHANCED_PINS=true)
// ============================================================

function PremierPin({ listing, isHighlighted, isSelected }: { listing: Listing | ListingPublic; isHighlighted: boolean; isSelected?: boolean }) {
  const hasLogo = !!listing.logo_url;
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
              src={listing.logo_url!}
              alt={listing.name}
              className="w-full h-full object-contain p-1"
              loading="lazy"
            />
          ) : (
            <span className="text-xs font-bold text-gray-600">
              {listing.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
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
          {listing.name}
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

function FreePin({ isHighlighted }: { isHighlighted: boolean }) {
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

export function ListingsMap({
  listings,
  selectedListing,
  onSelectListing,
  highlightedListingId,
  onBoundsChange,
  initialState,
  resetTrigger,
  flyToLocation,
}: ListingsMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [zoom, setZoom] = useState(3);
  const [bounds, setBounds] = useState<[number, number, number, number] | null>(null);
  const [internalSelectedListing, setInternalSelectedListing] = useState<Listing | ListingPublic | null>(null);
  const [hoveredListingId, setHoveredListingId] = useState<string | null>(null);

  // Use internal state if no external control
  const actualSelectedListing = selectedListing !== undefined ? selectedListing : internalSelectedListing;
  const handleSelectListing = onSelectListing || setInternalSelectedListing;

  // Fly to a specific location when flyToLocation changes
  const lastFlyToRef = useRef<string | null>(null);
  useEffect(() => {
    if (!flyToLocation || !mapRef.current) return;
    // Prevent flying to the same location twice
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
    const popupHeight = ENHANCED_PINS ? 200 : 160;
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

  // Create supercluster instance
  const supercluster = useMemo(() => {
    const cluster = new Supercluster<ListingProperties>({
      radius: 40,
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

  // Get the popup offset based on tier (premier pins are taller)
  const getPopupOffset = (): number => {
    if (!ENHANCED_PINS || !actualSelectedListing) return 25;
    const tier = (actualSelectedListing as any).tier;
    if (tier === 'premier') return 55; // Taller pin + label
    if (tier === 'enhanced') return 35;
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

          // It's an individual listing
          const listing = properties.listing as Listing;
          const isHighlighted = highlightedListingId === listing.id;
          const isHovered = hoveredListingId === listing.id;
          const tier = (listing as any).tier as string | undefined;

          // Click to open popup
          const handleMarkerClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            handleSelectListing(listing);
            if (listing.longitude && listing.latitude) {
              setTimeout(() => ensurePopupVisible(listing.longitude!, listing.latitude!), 50);
            }
          };

          // Check if pin is near edges of map — reposition tooltip accordingly
          const tooltipPosition = (() => {
            if (!mapRef.current || !listing.longitude || !listing.latitude) return { vertical: 'above' as const, align: 'center' as const };
            const point = mapRef.current.project([listing.longitude!, listing.latitude!]);
            const container = mapRef.current.getContainer();
            return {
              vertical: point.y < 40 ? 'below' as const : 'above' as const,
              align: point.x < 80 ? 'left' as const : point.x > container.offsetWidth - 80 ? 'right' as const : 'center' as const,
            };
          })();

          // Name tooltip (shown on hover for non-premier pins; premier already has a permanent label)
          const nameTooltip = tier !== 'premier' && isHovered && !actualSelectedListing ? (
            <div className={cn(
              "absolute pointer-events-none z-30",
              tooltipPosition.vertical === 'below' ? "top-full mt-1" : "-top-1 -translate-y-full",
              tooltipPosition.align === 'left' ? "left-0" : tooltipPosition.align === 'right' ? "right-0" : "left-1/2 -translate-x-1/2",
            )}>
              <div className="bg-gray-900/90 text-white text-[9px] font-medium px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap max-w-[140px] truncate">
                {listing.name}
              </div>
            </div>
          ) : null;

          // Enhanced tier-based pins
          if (ENHANCED_PINS && tier === 'premier') {
            return (
              <Marker key={listing.id} longitude={longitude} latitude={latitude} anchor="bottom" style={{ zIndex: isHovered ? 10 : 0 }}>
                <div
                  className={cn(
                    "cursor-pointer transition-transform duration-150",
                    isHighlighted || isHovered ? "scale-110 z-20" : "hover:scale-105 z-10"
                  )}
                  onClick={handleMarkerClick}
                  onMouseEnter={() => setHoveredListingId(listing.id)}
                  onMouseLeave={() => setHoveredListingId(null)}
                >
                  <PremierPin listing={listing} isHighlighted={isHighlighted || isHovered} isSelected={actualSelectedListing?.id === listing.id} />
                </div>
              </Marker>
            );
          }

          if (ENHANCED_PINS && tier === 'enhanced') {
            return (
              <Marker key={listing.id} longitude={longitude} latitude={latitude} anchor="bottom" style={{ zIndex: isHovered ? 10 : 0 }}>
                <div
                  className={cn(
                    "relative cursor-pointer transition-transform duration-150",
                    isHighlighted || isHovered ? "scale-150 z-10" : "hover:scale-125"
                  )}
                  onClick={handleMarkerClick}
                  onMouseEnter={() => setHoveredListingId(listing.id)}
                  onMouseLeave={() => setHoveredListingId(null)}
                >
                  {nameTooltip}
                  <EnhancedPin isHighlighted={isHighlighted || isHovered} />
                </div>
              </Marker>
            );
          }

          if (ENHANCED_PINS) {
            // Free tier pin
            return (
              <Marker key={listing.id} longitude={longitude} latitude={latitude} anchor="bottom" style={{ zIndex: isHovered ? 10 : 0 }}>
                <div
                  className={cn(
                    "relative cursor-pointer transition-transform duration-150",
                    isHighlighted || isHovered ? "scale-150 z-10" : "hover:scale-125"
                  )}
                  onClick={handleMarkerClick}
                  onMouseEnter={() => setHoveredListingId(listing.id)}
                  onMouseLeave={() => setHoveredListingId(null)}
                >
                  {nameTooltip}
                  <FreePin isHighlighted={isHighlighted || isHovered} />
                </div>
              </Marker>
            );
          }

          // Original pin (when ENHANCED_PINS = false)
          return (
            <Marker key={listing.id} longitude={longitude} latitude={latitude} anchor="bottom" style={{ zIndex: isHovered ? 10 : 0 }}>
              <div
                className={`relative cursor-pointer transition-transform duration-150 ${
                  isHighlighted || isHovered ? "scale-150 z-10" : "hover:scale-125"
                }`}
                onClick={handleMarkerClick}
                onMouseEnter={() => setHoveredListingId(listing.id)}
                onMouseLeave={() => setHoveredListingId(null)}
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

        {/* Popup for selected listing */}
        {actualSelectedListing && actualSelectedListing.latitude && actualSelectedListing.longitude && (
          <Popup
            longitude={actualSelectedListing.longitude}
            latitude={actualSelectedListing.latitude}
            anchor="bottom"
            onClose={() => handleSelectListing(null)}
            closeOnClick={false}
            offset={getPopupOffset()}
            maxWidth={ENHANCED_PINS && (actualSelectedListing as any).tier === 'premier' ? "240px" : "200px"}
          >
            {ENHANCED_PINS && (actualSelectedListing as any).tier === 'premier' ? (
              /* Enhanced premier popup — clean vertical layout with gold accent */
              <div className="min-w-[200px] max-w-[240px] pr-6">
                <div className="border-l-[3px] border-amber-400 pl-3 py-2.5 pr-2">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold leading-tight text-sm">{actualSelectedListing.name}</h3>
                    <FavouriteButton listingId={actualSelectedListing.id} size="sm" className="h-5 w-5 p-0 shrink-0 mt-0.5" />
                  </div>

                  {actualSelectedListing.town_city && (
                    <p className="text-[11px] text-muted-foreground mb-2">
                      {actualSelectedListing.town_city}, {actualSelectedListing.country}
                    </p>
                  )}

                  {actualSelectedListing.short_description && (
                    <p className="text-[11px] text-muted-foreground/80 line-clamp-2 mb-2">
                      {actualSelectedListing.short_description}
                    </p>
                  )}

                  <Button asChild size="sm" className="w-full h-7 text-xs">
                    <Link href={`/listing/${actualSelectedListing.slug}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ) : ENHANCED_PINS && (actualSelectedListing as any).tier === 'enhanced' ? (
              /* Enhanced tier popup */
              <div className="p-2.5 min-w-[160px] pr-8">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold leading-tight line-clamp-2">{actualSelectedListing.name}</h3>
                  <FavouriteButton listingId={actualSelectedListing.id} size="sm" className="h-5 w-5 p-0 shrink-0 mt-0.5" />
                </div>

                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-white bg-blue-500 px-1.5 py-0.5 rounded-full mb-1.5">
                  Enhanced
                </span>

                {actualSelectedListing.town_city && (
                  <p className="text-muted-foreground mb-2">
                    {actualSelectedListing.town_city}, {actualSelectedListing.country}
                  </p>
                )}

                <Button asChild size="sm" className="w-full h-7 text-xs">
                  <Link href={`/listing/${actualSelectedListing.slug}`}>View Details</Link>
                </Button>
              </div>
            ) : (
              /* Standard popup (free tier or ENHANCED_PINS off) */
              <div className="p-2.5 min-w-[160px] pr-8">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold leading-tight line-clamp-2">{actualSelectedListing.name}</h3>
                  <FavouriteButton listingId={actualSelectedListing.id} size="sm" className="h-5 w-5 p-0 shrink-0 mt-0.5" />
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
            )}
          </Popup>
        )}
      </Map>
    </div>
  );
}

// Default export for backward compatibility with lazy loading
export default ListingsMap;