'use client';

import Link from 'next/link';
import { useSearchParams, useRouter, useParams, usePathname } from 'next/navigation';
import { useState, useEffect, useMemo, useCallback, Suspense, lazy, useRef } from "react";
import DOMPurify from "isomorphic-dompurify";
import { Layout, BreadcrumbItem } from "@/components/Layout";
import { VenueSearchAutocomplete } from "@/components/venues/VenueSearchAutocomplete";
import { VenueTypeFilter } from "@/components/venues/VenueTypeFilter";
import { CountryFilter } from "@/components/venues/CountryFilter";
import { CapacitySlider } from "@/components/venues/CapacitySlider";
import { VenueCard } from "@/components/venues/VenueCard";
import { ContinentSelector } from "@/components/venues/ContinentSelector";
import { VirtualVenueList } from "@/components/venues/VirtualVenueList";
import {
  useVenues,
  useVenueCountries,
  useVenueRegionsByCountry,
  useVenueCitiesByCountry,
  useVenueCitiesByRegion,
  VenueListing,
} from "@/hooks/useVenues";
import { useVenueLocationSeo } from "@/hooks/useVenueLocationSeo";
import { useVenueTypeSeo } from "@/hooks/useVenueTypeSeo";
import { useCategoryBySlug } from "@/hooks/useCategories";
import { CONTINENT_COUNTRIES, CONTINENT_COLORS, getContinentFromSlug, getContinentSlug } from "@/lib/continents";
import { buildVenueUrl, toSlug, fromSlug, fromCountrySlug, countryHasRegions, isCityRegion } from "@/lib/venueUrlUtils";
import { getVenueUrl } from "@/hooks/useVenueUrl";
import { isVenueTypeSlug, getVenueTypeFromSlug, getVenueTypeSlug } from "@/lib/venueTypes";
import { VENUE_TYPE_DESCRIPTIONS, getVenueTypeAboutContent } from "@/lib/venueTypeContent";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronDown, MapPin, List, Map, X, Globe, SlidersHorizontal, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapBounds } from "@/components/venues/VenueMap";

// Lazy load the map
const VenueMap = lazy(() => import("@/components/venues/VenueMap").then((m) => ({ default: m.VenueMap })));

const MapLoadingFallback = () => (
  <div className="flex items-center justify-center h-full bg-card border rounded-lg">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

// Pure function to parse venue URL and get display location
// This has ZERO dependencies on React state - just the pathname string
function parseVenueUrlForDisplay(pathname: string): {
  continentSlug: string | null;
  countrySlug: string | null;
  thirdSlug: string | null;
  fourthSlug: string | null;
  fifthSlug: string | null;
  displayLocation: string;
  venueTypeSlug: string | null;
} {
  const segments = pathname.split("/").filter(Boolean);
  // segments[0] = "venues"
  // segments[1] = continent
  // segments[2] = country OR venueType (if no country)
  // segments[3] = region/city/venueType
  // segments[4] = city/venueType
  // segments[5] = venueType

  const continentSlug = segments[1] || null;
  const rawCountrySlug = segments[2] || null;
  const thirdSlug = segments[3] || null;
  const fourthSlug = segments[4] || null;
  const fifthSlug = segments[5] || null;

  // Check if "country" position is actually a venue type (e.g., /venues/europe/arenas)
  const countryIsVenueType = rawCountrySlug && isVenueTypeSlug(rawCountrySlug);
  const countrySlug = countryIsVenueType ? null : rawCountrySlug;

  // Helper to convert slug to display name
  const toDisplayName = (slug: string) =>
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  // Find venue type slug (check country position first, then from end of remaining segments)
  let venueTypeSlug: string | null = countryIsVenueType ? rawCountrySlug : null;
  let locationSegments = [thirdSlug, fourthSlug, fifthSlug].filter(Boolean) as string[];

  // If venue type wasn't in country position, check remaining segments from end
  if (!venueTypeSlug) {
    for (let i = locationSegments.length - 1; i >= 0; i--) {
      if (isVenueTypeSlug(locationSegments[i])) {
        venueTypeSlug = locationSegments[i];
        locationSegments = locationSegments.slice(0, i);
        break;
      }
    }
  }

  // Build display location from remaining segments
  const countryDisplay = countrySlug ? toDisplayName(countrySlug) : null;
  const continentDisplay = continentSlug ? getContinentFromSlug(continentSlug) || toDisplayName(continentSlug) : null;

  let displayLocation: string;

  if (locationSegments.length >= 2 && countryDisplay) {
    // Have region AND city: "City, Country"
    const cityDisplay = toDisplayName(locationSegments[1]);
    displayLocation = `${cityDisplay}, ${countryDisplay}`;
  } else if (locationSegments.length === 1 && countryDisplay) {
    // Have region OR city: "RegionOrCity, Country"
    const thirdDisplay = toDisplayName(locationSegments[0]);
    displayLocation = `${thirdDisplay}, ${countryDisplay}`;
  } else if (countryDisplay) {
    // Just country
    displayLocation = countryDisplay;
  } else if (continentDisplay) {
    // Just continent
    displayLocation = continentDisplay;
  } else {
    displayLocation = "All Venues";
  }

  return {
    continentSlug,
    countrySlug,
    thirdSlug: locationSegments[0] || null,
    fourthSlug: locationSegments[1] || null,
    fifthSlug: locationSegments[2] || null,
    displayLocation,
    venueTypeSlug,
  };
}

interface VenueFinderProps {
  preSelectedVenueType?: string | null;
  venueTypeSlug?: string | null;
}

export default function VenueFinder({ preSelectedVenueType = null, venueTypeSlug = null }: VenueFinderProps = {}) {
  const router = useRouter();
  const pathname = usePathname();  // ← ADD THIS LINE
  const searchParams = useSearchParams();

  // Parse URL ONCE at the top - this is the source of truth for display
  // This is completely synchronous and has no dependencies on async state
  const urlParsed = parseVenueUrlForDisplay(pathname);

  // This is THE display location for H1/H2/About headings - stable, no flicker
  const displayLocationTitle = urlParsed.displayLocation;

  // Detect venue type from URL path (final segment)
  const detectedVenueType = useMemo(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    if (lastSegment && isVenueTypeSlug(lastSegment)) {
      return {
        type: getVenueTypeFromSlug(lastSegment),
        slug: lastSegment,
      };
    }
    return null;
  }, [pathname]);

  // Use detected value, falling back to props
  const activeVenueType = detectedVenueType?.type || preSelectedVenueType || null;
  const activeVenueTypeSlug = detectedVenueType?.slug || venueTypeSlug || null;

  // Parse URL path params for location
  // Routes may use different param names depending on the route path
  const params = useParams<{
    continent?: string;
    continentSlug?: string;
    country?: string;
    countrySlug?: string;
    regionOrCity?: string;
    param3?: string;
    param4?: string;
    region?: string;
    city?: string;
  }>();

  // Normalize param names (routes may use either naming convention)
  const continentParam = params.continent || params.continentSlug;
  const countryParam = params.country || params.countrySlug;
  // thirdSegment can be region or city depending on country type
  // BUT if it matches the venueTypeSlug, it's not a geographic segment
  const rawThirdSegment = params.regionOrCity || params.param3 || params.region;
  const thirdSegment = rawThirdSegment === activeVenueTypeSlug ? null : rawThirdSegment;
  // fourthSegment is city when third is region
  // BUT if it matches the venueTypeSlug, it's not a geographic segment
  const rawFourthSegment = params.param4 || params.city;
  const fourthSegment = rawFourthSegment === activeVenueTypeSlug ? null : rawFourthSegment;

  // Resolve continent from URL
  const selectedContinent = continentParam ? getContinentFromSlug(continentParam) : null;

  // Determine if we should show the finder (any path param means we're in finder mode)
  const showFinder = !!continentParam;

  // Parse non-location filter state from query params
  const initialTypes = searchParams.get("type")?.split(",").filter(Boolean) || [];
  const initialCapacityMin = parseInt(searchParams.get("capacity_min") || "0");
  const initialCapacityMax = parseInt(searchParams.get("capacity_max") || "100000");

  // Filter state (non-location filters from query params)
  const [selectedTypes, setSelectedTypes] = useState<string[]>(activeVenueType ? [activeVenueType] : initialTypes);
  const [capacityMin, setCapacityMin] = useState(initialCapacityMin);
  const [capacityMax, setCapacityMax] = useState(initialCapacityMax);

  // Sync selectedTypes when venue type is detected from URL (handles internal navigation)
  useEffect(() => {
    if (activeVenueType) {
      setSelectedTypes([activeVenueType]);
    }
  }, [activeVenueType]);

  // View state
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [highlightedVenueId, setHighlightedVenueId] = useState<string | null>(null);
  const [selectedMapVenue, setSelectedMapVenue] = useState<VenueListing | null>(null);
  const [flyToLocation, setFlyToLocation] = useState<{ lat: number; lng: number; id: string } | null>(null);
  const [locationFilterOpen, setLocationFilterOpen] = useState(true);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [filtersPopoverOpen, setFiltersPopoverOpen] = useState(false);
  const [countryFilterOpen, setCountryFilterOpen] = useState(false);
  const [initialScrollTop, setInitialScrollTop] = useState<number | undefined>(undefined);

  // Map viewport bounds for filtering list
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null);
  const [mapResetTrigger, setMapResetTrigger] = useState(0);

  // Track current scroll position for saving
  const scrollTopRef = useRef<number>(0);

  // Stored map state to restore after navigation
  const [initialMapState, setInitialMapState] = useState<{
    bounds: MapBounds;
    zoom: number;
  } | null>(null);

  // Restore map state from sessionStorage on mount - only if URL matches
  useEffect(() => {
    if (!showFinder) return;

    const saved = sessionStorage.getItem("venueFinderMapState");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Only restore if the saved URL matches current URL (same filters/location)
        if (parsed.url === pathname + searchParams.toString()) {
          setInitialMapState({ bounds: parsed.bounds, zoom: parsed.zoom });
          // Restore viewMode if it was saved (e.g., user was on map view)
          if (parsed.viewMode) {
            setViewMode(parsed.viewMode);
          }
          // Restore scroll position if it was saved
          if (parsed.scrollTop !== undefined) {
            setInitialScrollTop(parsed.scrollTop);
          }
        }
        // Always clear after checking
        sessionStorage.removeItem("venueFinderMapState");
      } catch (e) {
        sessionStorage.removeItem("venueFinderMapState");
      }
    }
  }, [showFinder, pathname, searchParams.toString()]);

  // Save map state with URL context before navigating away
  const saveMapState = useCallback(
    (bounds: MapBounds, zoom: number) => {
      sessionStorage.setItem(
        "venueFinderMapState",
        JSON.stringify({
          bounds,
          zoom,
          viewMode,
          scrollTop: scrollTopRef.current,
          url: pathname + searchParams.toString(),
        }),
      );
    },
    [pathname, searchParams.toString(), viewMode],
  );

  // Get all venue countries (filtered by continent at database level)
  const { data: allCountries, isLoading: countriesLoading, error: countriesError } = useVenueCountries(selectedContinent || undefined);

  // Resolve country from URL slug (with alias support)
  const countryFromUrl = useMemo(() => {
    if (!countryParam || !allCountries) return null;
    const countryNames = allCountries.map((c) => c.country);
    return fromCountrySlug(countryParam, countryNames);
  }, [countryParam, allCountries]);

  // Support multiple country selection via state
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  // Track the URL we just navigated to (to skip URL sync for that specific URL)
  const lastNavigatedUrlRef = useRef<string | null>(null);

  // Sync selected countries from URL on mount/URL change
  // But skip if we just navigated to this exact URL ourselves
  useEffect(() => {
    const currentUrl = pathname + searchParams.toString();

    if (lastNavigatedUrlRef.current === currentUrl) {
      // We navigated here ourselves, skip sync
      return;
    }

    // Clear the ref since this is a different URL (user navigated, back button, etc.)
    lastNavigatedUrlRef.current = null;

    if (countryFromUrl) {
      // Single country from URL path
      setSelectedCountries([countryFromUrl]);
    } else {
      // Check for multi-country in query params
      const countriesParam = searchParams.get("countries");
      if (countriesParam) {
        const countryList = countriesParam.split(",").map((c) => decodeURIComponent(c.trim()));
        setSelectedCountries(countryList);
      } else {
        setSelectedCountries([]);
      }
    }
  }, [countryFromUrl, searchParams, pathname, searchParams.toString()]);

  // For backwards compatibility - single country for region/city logic
  const selectedCountry = selectedCountries.length === 1 ? selectedCountries[0] : null;

  // Countries are already filtered by continent at database level
  const countries = allCountries || [];

  // Get regions for selected country (only regions that have venues)
  const { data: regions } = useVenueRegionsByCountry(selectedCountry || undefined);

  // Resolve region from URL
  const { selectedRegionId, selectedRegionSlug } = useMemo(() => {
    if (!thirdSegment && !params.region) {
      return { selectedRegionId: null, selectedRegionSlug: null };
    }

    const regionSlugToCheck = params.region || thirdSegment;

    if (regionSlugToCheck && regions && selectedCountry && countryHasRegions(selectedCountry)) {
      const region = regions.find((r) => r.region_slug === regionSlugToCheck);
      if (region) {
        return { selectedRegionId: region.id, selectedRegionSlug: regionSlugToCheck };
      }
    }

    return { selectedRegionId: null, selectedRegionSlug: null };
  }, [thirdSegment, params.region, regions, selectedCountry]);

  // Get cities based on region or country (only cities that have venues)
  const { data: citiesByRegion } = useVenueCitiesByRegion(selectedRegionId || undefined);
  const { data: citiesByCountry } = useVenueCitiesByCountry(selectedCountry || undefined);
  const cities = selectedRegionId ? citiesByRegion : citiesByCountry;

  // Resolve city from URL (async - requires cities to load)
  const selectedCity = useMemo(() => {
    // 4-segment URL: /venues/continent/country/region/city (fourthSegment has the city)
    if (fourthSegment && cities) {
      return fromSlug(fourthSegment, cities);
    }

    // 3-segment URL: /venues/continent/country/cityOrRegion
    // Only treat as city if no region was found (i.e., not a country with regions)
    if (thirdSegment && !selectedRegionId && cities) {
      return fromSlug(thirdSegment, cities);
    }

    return null;
  }, [fourthSegment, thirdSegment, selectedRegionId, cities]);

  // Derive city directly from URL for non-regional countries (synchronous, no async dependency)
  // This is used for display/SEO purposes and doesn't require database validation
  const urlDerivedCity = useMemo(() => {
    // Only for countries without regions where thirdSegment is the city
    if (!selectedCountry || countryHasRegions(selectedCountry)) return null;

    // thirdSegment should be the city slug for non-regional countries
    // BUT only if it's not the venue type slug
    const citySlug = thirdSegment;
    if (!citySlug || citySlug === activeVenueTypeSlug) return null;

    // Convert slug to display name: "new-york" → "New York", "munich" → "Munich"
    return citySlug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, [selectedCountry, thirdSegment, activeVenueTypeSlug]);

  // For display/SEO: use URL-derived city immediately, or validated city once loaded
  // This prevents flash of incorrect content during async loading
  const displayCity = useMemo(() => {
    // For non-regional countries, prefer URL-derived value (instant, no loading state)
    if (urlDerivedCity) return urlDerivedCity;

    // For regional countries or when we have validated data, use selectedCity
    return selectedCity;
  }, [urlDerivedCity, selectedCity]);

  // Fetch "Venues" category for default templates
  const { data: venuesCategory } = useCategoryBySlug("venues");

  // Helper to inject location into template strings (like CategoryPage)
  const injectLocation = useCallback(
    (text: string | null | undefined): string | null => {
      if (!text) return null;
      let result = text;
      let locationString = displayLocationTitle;

      if (locationString && locationString !== "All Venues") {
        result = result.replace(/\{in_location\}/gi, `in ${locationString}`);
        result = result.replace(/\{location\}/gi, locationString);
      } else {
        result = result.replace(/\{in_location\}/gi, "");
        result = result.replace(/\{location\}/gi, "");
      }
      return result
        .replace(/\s{2,}/g, " ")
        .replace(/\s+\./g, ".")
        .replace(/\s+,/g, ",")
        .trim();
    },
    [displayLocationTitle],
  );

  // Display location for title - ALWAYS use URL-derived for consistency
  // Fetch location-specific SEO content (use displayCity for stable SEO)
  const { data: locationSeo } = useVenueLocationSeo(
    selectedContinent,
    selectedCountry,
    selectedRegionSlug,
    displayCity,
  );

  // Fetch venue type-specific SEO content (use displayCity for stable SEO)
  const { data: venueTypeSeo } = useVenueTypeSeo(
    activeVenueType,
    selectedContinent,
    selectedCountry,
    selectedRegionSlug,
    displayCity,
  );

  // Fetch venues with filters - pass continent for server-side filtering when no country selected
  const { data: allVenues = [], isLoading } = useVenues({
    venueTypes: selectedTypes.length > 0 ? selectedTypes : undefined,
    capacityMin: capacityMin > 0 ? capacityMin : undefined,
    capacityMax: capacityMax < 100000 ? capacityMax : undefined,
    country: selectedCountry || undefined,
    regionId: selectedRegionId || undefined,
    city: selectedCity || undefined,
    continent: !selectedCountry ? selectedContinent || undefined : undefined, // Only filter by continent if no country selected
  });

  // Filter venues for multiple country selection (rare case)
  const venues = useMemo(() => {
    if (!showFinder) return [];

    // If multiple countries selected, filter client-side (rare use case)
    if (selectedCountries.length > 1) {
      return allVenues.filter((v) => v.country && selectedCountries.includes(v.country));
    }

    // Otherwise, server already filtered by continent or country
    return allVenues;
  }, [allVenues, showFinder, selectedCountries]);

  // Filter venues by map viewport bounds (for list display)
  const visibleVenues = useMemo(() => {
    if (!mapBounds) return venues;

    return venues.filter((v) => {
      if (!v.latitude || !v.longitude) return false;
      return (
        v.latitude >= mapBounds.south &&
        v.latitude <= mapBounds.north &&
        v.longitude >= mapBounds.west &&
        v.longitude <= mapBounds.east
      );
    });
  }, [venues, mapBounds]);

  // Handle map bounds change - track for list filtering
  const handleBoundsChange = useCallback(
    (bounds: MapBounds, zoom?: number) => {
      setMapBounds(bounds);
      // Save state for restoration after navigation
      if (zoom !== undefined) {
        saveMapState(bounds, zoom);
      }
    },
    [saveMapState],
  );

  // Save selected countries to sessionStorage when they change (for multi-select)
  useEffect(() => {
    if (selectedCountries.length > 1) {
      sessionStorage.setItem("venueFinderSelectedCountries", JSON.stringify(selectedCountries));
    } else {
      sessionStorage.removeItem("venueFinderSelectedCountries");
    }
  }, [selectedCountries]);

  // Save viewMode to sessionStorage whenever it changes (for restoration after navigation)
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("venueFinderMapState");
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.viewMode = viewMode;
        sessionStorage.setItem("venueFinderMapState", JSON.stringify(parsed));
      } else if (mapBounds) {
        // If no saved state but we have bounds, create initial state
        sessionStorage.setItem(
          "venueFinderMapState",
          JSON.stringify({
            bounds: mapBounds,
            zoom: 3,
            viewMode,
            url: pathname + searchParams.toString(),
          }),
        );
      }
    } catch {}
  }, [viewMode, mapBounds, pathname, searchParams.toString()]);

  // Handle scroll position changes - save to ref and sessionStorage
  const handleScrollPositionChange = useCallback(
    (scrollTop: number) => {
      scrollTopRef.current = scrollTop;
      try {
        const saved = sessionStorage.getItem("venueFinderMapState");
        if (saved) {
          const parsed = JSON.parse(saved);
          parsed.scrollTop = scrollTop;
          sessionStorage.setItem("venueFinderMapState", JSON.stringify(parsed));
        } else {
          // Create state if it doesn't exist
          sessionStorage.setItem(
            "venueFinderMapState",
            JSON.stringify({
              bounds: mapBounds,
              zoom: 3,
              viewMode,
              scrollTop,
              url: pathname + searchParams.toString(),
            }),
          );
        }
      } catch {}
    },
    [mapBounds, viewMode, pathname, searchParams.toString()],
  );

  // Ref to track initial mount for venue type URL handling
  const isInitialMount = useRef(true);

  // Ref to prevent URL sync effect from overriding intentional navigation back to continent selector
  const isNavigatingToSelectionRef = useRef(false);

  // Helper to get filter query params (capacity + multi-country)
  const getFilterParams = useCallback(() => {
    const params = new URLSearchParams();
    if (capacityMin > 0) {
      params.set("capacity_min", capacityMin.toString());
    }
    if (capacityMax < 100000) {
      params.set("capacity_max", capacityMax.toString());
    }
    // Preserve multi-country selection
    if (selectedCountries.length > 1) {
      params.set("countries", selectedCountries.join(","));
    }
    return params;
  }, [capacityMin, capacityMax, selectedCountries]);

  // Handle URL updates when selectedTypes changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Bail out if we're intentionally navigating back to the continent selector
    // The state changes from clearNonLocationFilters would otherwise override the router.push
    if (isNavigatingToSelectionRef.current) {
      return;
    }

    if (!showFinder) return;

    // Don't update URL until geographic context is fully resolved
    // If we have a countryParam in the URL but selectedCountry isn't resolved yet, wait
    // BUT skip this check if countryParam is actually a venue type slug (e.g., /venues/europe/arenas)
    const countryParamIsVenueType = countryParam && isVenueTypeSlug(countryParam);
    if (countryParam && !selectedCountry && !countryParamIsVenueType) {
      return;
    }

    // If we have a thirdSegment that isn't the venue type, it's a region or city
    // Wait for that to resolve before updating URL
    const thirdIsVenueType = rawThirdSegment === activeVenueTypeSlug;
    const fourthIsVenueType = rawFourthSegment === activeVenueTypeSlug;
    const fifthIsVenueType = activeVenueTypeSlug && !thirdIsVenueType && !fourthIsVenueType;

    // If third segment exists and isn't the venue type, it should resolve to region or city
    if (rawThirdSegment && !thirdIsVenueType) {
      // 4-segment URL with venue type in 4th position
      // For countries WITH regions (UK/USA): wait for region to resolve
      if (fourthIsVenueType && !selectedRegionSlug && selectedCountry && countryHasRegions(selectedCountry)) {
        return;
      }
      // For countries WITHOUT regions (Germany, France, etc.): wait for city to resolve
      if (fourthIsVenueType && !selectedCity && selectedCountry && !countryHasRegions(selectedCountry)) {
        return;
      }
      // 5-segment URL with venue type in 5th position (e.g., /uk/north-west/manchester/arenas)
      // Wait for both region AND city to resolve
      if (fifthIsVenueType && rawFourthSegment && (!selectedRegionSlug || !selectedCity)) {
        return;
      }
    }

    // Build base geographic URL
    const baseUrl = buildVenueUrl({
      continent: selectedContinent,
      country: selectedCountry,
      regionSlug: selectedRegionSlug,
      city: selectedCity,
    });

    // Determine current URL state
    const currentPath = pathname;
    const currentlyOnVenueTypePage = activeVenueTypeSlug !== null;

    // Get filter params to preserve (capacity + multi-country)
    const filterParams = getFilterParams();
    const filterQueryString = filterParams.toString();

    if (selectedTypes.length === 0) {
      if (currentlyOnVenueTypePage) {
        const targetUrl = filterQueryString ? `${baseUrl}?${filterQueryString}` : baseUrl;
        router.replace(targetUrl);
      } else {
        const params = new URLSearchParams(searchParams);
        params.delete("type");
        router.replace(`?${params.toString()}`);
      }
    } else if (selectedTypes.length === 1) {
      const typeSlug = getVenueTypeSlug(selectedTypes[0]);
      const targetUrl = `${baseUrl}/${typeSlug}`;
      const fullUrl = filterQueryString ? `${targetUrl}?${filterQueryString}` : targetUrl;

      if (pathname + searchParams.toString() !== fullUrl) {
        router.replace(fullUrl);
      }
    } else {
      // Multiple types - use query param, preserve filters
      const params = getFilterParams();
      params.set("type", selectedTypes.join(","));

      if (currentlyOnVenueTypePage) {
        router.replace(`${baseUrl}?${params.toString()}`);
      } else {
        router.replace(`?${params.toString()}`);
      }
    }
  }, [
    selectedTypes,
    showFinder,
    selectedContinent,
    selectedCountry,
    selectedCountries,
    selectedRegionSlug,
    selectedCity,
    activeVenueTypeSlug,
    activeVenueType,
    pathname,
    searchParams.toString(),
    router,
    searchParams,
    countryParam,
    rawThirdSegment,
    rawFourthSegment,
    getFilterParams,
  ]);

  // Update query params for capacity filters only (separate from venue type handling)
  useEffect(() => {
    if (!showFinder) return;
    if (isNavigatingToSelectionRef.current) return;

    const params = new URLSearchParams(searchParams);

    // Only handle capacity params here - venue type is handled by the effect above
    if (capacityMin > 0) {
      params.set("capacity_min", capacityMin.toString());
    } else {
      params.delete("capacity_min");
    }
    if (capacityMax < 100000) {
      params.set("capacity_max", capacityMax.toString());
    } else {
      params.delete("capacity_max");
    }

    router.replace(`?${params.toString()}`);
  }, [showFinder, capacityMin, capacityMax, searchParams]);

  // Handle continent selection
  const handleSelectContinent = (continent: string) => {
    router.push(`/venues/${getContinentSlug(continent)}`);
    window.scrollTo(0, 0);
  };

  // Handle browse all (navigate to a default continent or show all)
  const handleBrowseAll = () => {
    // Navigate to Europe as default "browse all" starting point
    router.push("/venues/europe");
    window.scrollTo(0, 0);
  };

  // Handle back to continent selection
  const handleBackToSelection = () => {
    isNavigatingToSelectionRef.current = true;
    router.push("/venues");
    clearNonLocationFilters();
    // Clear saved map state
    sessionStorage.removeItem("venueFinderMapState");
    sessionStorage.removeItem("venueFinderSelectedCountries");
    setInitialMapState(null);
  };

  // Clear non-location filters
  const clearNonLocationFilters = () => {
    setSelectedTypes([]);
    setCapacityMin(0);
    setCapacityMax(100000);
    setSelectedCountries([]);
  };

  // Clear all filters and go back to continent level
  const clearFilters = () => {
    setSelectedTypes([]);
    setCapacityMin(0);
    setCapacityMax(100000);
    setSelectedCountries([]);
    // Clear saved map state so it resets to default view
    sessionStorage.removeItem("venueFinderMapState");
    setInitialMapState(null);
    if (selectedContinent) {
      router.push(`/venues/${getContinentSlug(selectedContinent)}`);
    }
  };

  // Reset everything and go back to continent view (when clicking continent badge)
  const resetToContinent = () => {
    setSelectedTypes([]);
    setCapacityMin(0);
    setCapacityMax(100000);
    setSelectedCountries([]);
    sessionStorage.removeItem("venueFinderMapState");
    sessionStorage.removeItem("venueFinderSelectedCountries");
    setInitialMapState(null);
    if (selectedContinent) {
      router.push(`/venues/${getContinentSlug(selectedContinent)}`);
    }
  };

  // Helper to build URL with preserved non-location filter params
  const buildUrlWithFilters = (basePath: string, extraParams?: Record<string, string>) => {
    const params = new URLSearchParams();

    // Preserve capacity filters
    if (capacityMin > 0) {
      params.set("capacity_min", capacityMin.toString());
    }
    if (capacityMax < 100000) {
      params.set("capacity_max", capacityMax.toString());
    }

    // Preserve venue type if multiple selected (single type goes in URL path)
    if (selectedTypes.length > 1) {
      params.set("type", selectedTypes.join(","));
    }

    // Add any extra params
    if (extraParams) {
      Object.entries(extraParams).forEach(([key, value]) => {
        params.set(key, value);
      });
    }

    // For single venue type, append to path
    let finalPath = basePath;
    if (selectedTypes.length === 1) {
      finalPath = `${basePath}/${getVenueTypeSlug(selectedTypes[0])}`;
    }

    const queryString = params.toString();
    return queryString ? `${finalPath}?${queryString}` : finalPath;
  };

  // Handle country change - update state and URL
  // Update state and navigate
  const handleCountryChange = async (newCountries: string[]) => {
    console.log('🟢 VenueFinder handleCountryChange called with:', newCountries);
    console.log('🟢 Current selectedContries state:', selectedCountries);
    console.log('🟢 selectedContinent:', selectedContinent);
    
    // Clear saved map state when changing geographic scope
    sessionStorage.removeItem("venueFinderMapState");
    setInitialMapState(null);

    let targetUrl: string;

    if (newCountries.length === 1) {
      // Single country - use SEO URL path, preserve filters
      const basePath = buildVenueUrl({
        continent: selectedContinent,
        country: newCountries[0],
      });
      targetUrl = buildUrlWithFilters(basePath);
    } else if (newCountries.length === 0) {
      // Clear country - go back to continent level, preserve filters
      const basePath = buildVenueUrl({ continent: selectedContinent });
      targetUrl = buildUrlWithFilters(basePath);
    } else {
      // Multiple countries - use query param, preserve filters
      const basePath = buildVenueUrl({ continent: selectedContinent });
      targetUrl = buildUrlWithFilters(basePath, { countries: newCountries.join(",") });
    }

    console.log('🟢 About to navigate to:', targetUrl);
    
    // Store the URL we're navigating to so the sync effect skips it
    lastNavigatedUrlRef.current = targetUrl;
router.push(targetUrl);

console.log('🟢 router.push called');
  };

  // Handle region change - navigate to new URL
  const handleRegionChange = (value: string) => {
    // Clear saved map state when changing geographic scope
    sessionStorage.removeItem("venueFinderMapState");
    setInitialMapState(null);

    if (value === "all") {
      const basePath = buildVenueUrl({
        continent: selectedContinent,
        country: selectedCountry,
      });
      router.push(buildUrlWithFilters(basePath));
    } else {
      const basePath = buildVenueUrl({
        continent: selectedContinent,
        country: selectedCountry,
        regionSlug: value,
      });
      router.push(buildUrlWithFilters(basePath));
    }
  };

  // Handle city change - navigate to new URL
  const handleCityChange = (value: string) => {
    // Clear saved map state when changing geographic scope
    sessionStorage.removeItem("venueFinderMapState");
    setInitialMapState(null);

    if (value === "all") {
      const basePath = buildVenueUrl({
        continent: selectedContinent,
        country: selectedCountry,
        regionSlug: selectedRegionSlug,
      });
      router.push(buildUrlWithFilters(basePath));
    } else {
      const basePath = buildVenueUrl({
        continent: selectedContinent,
        country: selectedCountry,
        regionSlug: selectedRegionSlug,
        city: value,
      });
      router.push(buildUrlWithFilters(basePath));
    }
  };

  // Check if any filters are active
  const hasActiveFilters =
    selectedTypes.length > 0 || capacityMin > 0 || capacityMax < 100000 || selectedCountries.length > 0 || selectedCity;

  // Count active location filters (for badge on filter trigger)
  const activeLocationFilterCount = selectedCountries.length + (selectedRegionId ? 1 : 0) + (selectedCity ? 1 : 0);

  // Count active secondary filters (venue type + capacity) for collapsed Filters button
  const hasSecondaryFilters = selectedTypes.length > 0 || capacityMin > 0 || capacityMax < 100000;
  const secondaryFilterCount = (selectedTypes.length > 0 ? 1 : 0) + (capacityMin > 0 || capacityMax < 100000 ? 1 : 0);

  // Get selected region data
  const selectedRegionData = selectedRegionId ? regions?.find((r) => r.id === selectedRegionId) : null;

  // Close filter panel and dropdowns on scroll
  const handleContentScroll = useCallback(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setLocationFilterOpen(false);
    setRegionDropdownOpen(false);
    setCityDropdownOpen(false);
  }, []);

  // Close dropdowns on click outside, scroll, or wheel anywhere
  useEffect(() => {
    if (!regionDropdownOpen && !cityDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const isInsideDropdown =
        target.closest("[data-radix-popper-content-wrapper]") || target.closest('[role="listbox"]');
      if (isInsideDropdown) return;

      const filterContent = document.querySelector("[data-filter-content]");
      if (filterContent?.contains(target)) return;

      setRegionDropdownOpen(false);
      setCityDropdownOpen(false);
    };

    const handleScrollOrWheel = (event: Event) => {
      const target = event.target as Element;
      if (!target.closest) return;

      const isInsideDropdown =
        target.closest("[data-radix-popper-content-wrapper]") ||
        target.closest('[role="listbox"]') ||
        target.closest("[data-radix-select-viewport]");
      if (isInsideDropdown) return;

      setRegionDropdownOpen(false);
      setCityDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleScrollOrWheel, true);
    document.addEventListener("wheel", handleScrollOrWheel, { passive: true, capture: true });
    window.addEventListener("scroll", handleScrollOrWheel, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScrollOrWheel, true);
      document.removeEventListener("wheel", handleScrollOrWheel);
      window.removeEventListener("scroll", handleScrollOrWheel, true);
    };
  }, [regionDropdownOpen, cityDropdownOpen]);

  // Scroll to venue card when map pin clicked
  const scrollToVenue = useCallback((venueId: string) => {
    const element = document.querySelector(`[data-venue-id="${venueId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedVenueId(venueId);
      setTimeout(() => setHighlightedVenueId(null), 2000);
    }
  }, []);

  // Handle map venue selection
  const handleMapVenueSelect = (venue: VenueListing | null) => {
    setSelectedMapVenue(venue);
    if (venue) {
      scrollToVenue(venue.id);
    }
  };

  // Debounced hover handler for better performance
  const handleHoverVenue = useCallback((venueId: string | null) => {
    setHighlightedVenueId(venueId);
  }, []);

  // Fly map to a specific venue's location
  const handleFlyToVenue = useCallback((venue: VenueListing) => {
    if (venue.latitude && venue.longitude) {
      setFlyToLocation({ lat: venue.latitude, lng: venue.longitude, id: `${venue.id}-${Date.now()}` });
      setHighlightedVenueId(venue.id);
      setTimeout(() => setHighlightedVenueId(null), 3000);
    }
  }, []);

  // Helper to get location string for SEO content (uses displayCity for stability)
  const getLocationString = useCallback(() => {
    if (displayCity) return displayCity;
    if (selectedRegionData) return selectedRegionData.region_name;
    if (selectedCountry) return selectedCountry;
    if (selectedContinent) return selectedContinent;
    return null;
  }, [displayCity, selectedRegionData, selectedCountry, selectedContinent]);

  // SEO meta content
  // Venue type SEO takes priority over location SEO when on a venue type page
  const pageTitle = useMemo(() => {
    // Venue type SEO override takes priority when on venue type page
    if (activeVenueType && venueTypeSeo?.seo_title) return venueTypeSeo.seo_title;
    // Location SEO override (only when not on venue type page)
    if (!activeVenueType && locationSeo?.seo_title) return locationSeo.seo_title;

    // Use category template if available
    if (!activeVenueType && venuesCategory?.seo_title) {
      const injected = injectLocation(venuesCategory.seo_title);
      if (injected) return injected;
    }

    const location = getLocationString();

    // Venue type specific titles: "{VenueType}s in {Location} | Showcase Music"
    if (activeVenueType && location) {
      return `${activeVenueType}s in ${location} | Showcase Music`;
    }

    // Template fallbacks for non-venue-type pages
    if (displayCity) return `Venues in ${displayCity}, ${selectedCountry} | Showcase Music`;
    if (selectedRegionData) return `Venues in ${selectedRegionData.region_name}, ${selectedCountry} | Showcase Music`;
    if (selectedCountry) return `Venues in ${selectedCountry} | Showcase Music`;
    if (selectedContinent) return `Venues in ${selectedContinent} | Showcase Music`;
    return "Venue Finder | Showcase Music";
  }, [
    displayCity,
    selectedCountry,
    selectedRegionData,
    selectedContinent,
    locationSeo,
    activeVenueType,
    venueTypeSeo,
    getLocationString,
    venuesCategory,
    injectLocation,
  ]);

  const pageDescription = useMemo(() => {
    // Venue type SEO override takes priority when on venue type page
    if (activeVenueType && venueTypeSeo?.meta_description) return venueTypeSeo.meta_description;
    // Location SEO override (only when not on venue type page)
    if (!activeVenueType && locationSeo?.meta_description) return locationSeo.meta_description;

    // Use category template if available
    if (!activeVenueType && venuesCategory?.seo_meta_description) {
      const injected = injectLocation(venuesCategory.seo_meta_description);
      if (injected) return injected;
    }

    const location = getLocationString();

    // Venue type specific descriptions with venue count
    if (activeVenueType && location) {
      const typeLower = activeVenueType.toLowerCase();
      return `Discover ${typeLower}s in ${location}. Browse ${venues.length} ${typeLower}${venues.length !== 1 ? "s" : ""} with capacity, contact details, and booking information for your next event.`;
    }

    // Existing geographic fallbacks
    if (displayCity)
      return `Find concert venues in ${displayCity}, ${selectedCountry}. Browse arenas, theatres, clubs and stadiums.`;
    if (selectedRegionData)
      return `Find concert venues in ${selectedRegionData.region_name}, ${selectedCountry}. Browse arenas, theatres, clubs and stadiums.`;
    if (selectedCountry)
      return `Find concert venues in ${selectedCountry}. Browse arenas, theatres, clubs and stadiums across all regions.`;
    if (selectedContinent)
      return `Find concert venues in ${selectedContinent}. Browse arenas, theatres, clubs and stadiums.`;
    return "Find concert venues worldwide. Browse arenas, theatres, clubs and stadiums across Europe, North America, Asia and more.";
  }, [
    displayCity,
    selectedCountry,
    selectedRegionData,
    selectedContinent,
    locationSeo,
    activeVenueType,
    venueTypeSeo,
    getLocationString,
    venues.length,
    venuesCategory,
    injectLocation,
  ]);

  const pageKeywords = useMemo(() => {
    // Venue type SEO override takes priority when on venue type page
    if (activeVenueType && venueTypeSeo?.meta_keywords) return venueTypeSeo.meta_keywords;
    // Location SEO override
    if (locationSeo?.meta_keywords) return locationSeo.meta_keywords;

    const keywords = ["concert venues", "music venues", "live music"];

    if (activeVenueType) {
      keywords.push(activeVenueType.toLowerCase(), `${activeVenueType.toLowerCase()}s`);
    }

    if (displayCity) {
      keywords.push(`venues in ${displayCity}`, `${displayCity} concert halls`, `${displayCity} live music`);
    }

    if (selectedRegionData) {
      keywords.push(`${selectedRegionData.region_name} venues`, `${selectedRegionData.region_name} concerts`);
    }

    if (selectedCountry) {
      keywords.push(`${selectedCountry} venues`, `${selectedCountry} arenas`, `${selectedCountry} theatres`);
    }

    if (selectedContinent) {
      keywords.push(`${selectedContinent} venues`);
    }

    keywords.push("arenas", "theatres", "clubs", "stadiums");

    return keywords.join(", ");
  }, [displayCity, selectedRegionData, selectedCountry, selectedContinent, locationSeo, activeVenueType, venueTypeSeo]);

  const canonicalUrl = useMemo(() => {
    let path = buildVenueUrl({
      continent: selectedContinent,
      country: selectedCountry,
      regionSlug: selectedRegionSlug,
      city: selectedCity,
    });

    // Add venue type slug for venue type pages (single type only)
    if (activeVenueTypeSlug && selectedTypes.length === 1) {
      path = `${path}/${activeVenueTypeSlug}`;
    }

    return `https://www.showcase-music.com${path}`;
  }, [selectedContinent, selectedCountry, selectedRegionSlug, selectedCity, activeVenueTypeSlug, selectedTypes]);

  // Determine if page should be noindexed (has query filters)
  const shouldNoIndex = searchParams.toString().length > 0;

  // Check if current region is a city-region (London, New York)
  const isCurrentCityRegion = useMemo(() => {
    return isCityRegion(selectedCountry, selectedRegionSlug);
  }, [selectedCountry, selectedRegionSlug]);

  const breadcrumbSchema = useMemo(() => {
    const SITE_URL = "https://www.showcase-music.com";

    const items: { name: string; item?: string }[] = [
      { name: "Home", item: SITE_URL },
      { name: "Venues", item: `${SITE_URL}/venues` },
    ];

    if (selectedContinent) {
      items.push({
        name: selectedContinent,
        item: `${SITE_URL}/venues/${getContinentSlug(selectedContinent)}`,
      });
    }

    if (selectedCountry && countryParam) {
      items.push({
        name: selectedCountry,
        item: `${SITE_URL}/venues/${getContinentSlug(selectedContinent)}/${countryParam}`,
      });
    }

    // For city-regions (London, New York), show region name as the final city-level crumb
    // Don't add a separate region + city crumb
    if (selectedRegionData && selectedRegionSlug) {
      if (isCurrentCityRegion) {
        // City-region: region IS the city, this is the final breadcrumb
        items.push({ name: selectedRegionData.region_name });
      } else {
        // Normal region: add region as a link
        items.push({
          name: selectedRegionData.region_name,
          item: `${SITE_URL}/venues/${getContinentSlug(selectedContinent)}/${countryParam}/${selectedRegionSlug}`,
        });

        // Add city if present (use displayCity for stable SEO)
        if (displayCity) {
          items.push({ name: displayCity });
        }
      }
    } else if (displayCity) {
      // No region, just city
      items.push({ name: displayCity });
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        ...(crumb.item && { item: crumb.item }),
      })),
    };
  }, [
    selectedContinent,
    selectedCountry,
    countryParam,
    selectedRegionData,
    selectedRegionSlug,
    displayCity,
    isCurrentCityRegion,
  ]);

  const itemListSchema = useMemo(() => {
    if (!showFinder || !venues || venues.length === 0) return null;

    const SITE_URL = "https://www.showcase-music.com";

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      numberOfItems: venues.length,
      itemListElement: venues.slice(0, 10).map((venue, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "EventVenue",
          name: venue.name,
          url: `${SITE_URL}${getVenueUrl({
            slug: venue.slug,
            country: venue.country,
            region_slug: venue.region_slug,
            town_city: venue.town_city,
          })}`,
          ...(venue.venue_type && { additionalType: venue.venue_type }),
          ...(venue.venue_capacity && { maximumAttendeeCapacity: venue.venue_capacity }),
          ...((venue.town_city || venue.country) && {
            address: {
              "@type": "PostalAddress",
              ...(venue.town_city && { addressLocality: venue.town_city }),
              ...(venue.country && { addressCountry: venue.country }),
            },
          }),
        },
      })),
    };
  }, [showFinder, venues, pageTitle, pageDescription, canonicalUrl, selectedContinent]);

  // Compute the H1 title for the venue finder
  const venueH1Title = useMemo(() => {
    if (!showFinder) return "VENUE FINDER";

    // Use URL segments to check SEO match (not async state)
    const urlHasThirdSegment = !!urlParsed.thirdSlug;
    const urlHasFourthSegment = !!urlParsed.fourthSlug;
    const urlHasCountry = !!urlParsed.countrySlug;

    // Venue type page
    if (activeVenueType) {
      // Check if venueTypeSeo matches URL specificity exactly
      if (venueTypeSeo?.h1_override) {
        const seoHasCity = !!venueTypeSeo.city;
        const seoHasRegion = !!venueTypeSeo.region_slug;
        const seoHasCountry = !!venueTypeSeo.country;

        // URL has city (4th segment): SEO must have city
        if (urlHasFourthSegment && seoHasCity) return venueTypeSeo.h1_override;
        // URL has region/city (3rd only): SEO must match
        if (urlHasThirdSegment && !urlHasFourthSegment) {
          if (seoHasCity && !seoHasRegion) return venueTypeSeo.h1_override; // city for non-regional
          if (seoHasRegion && !seoHasCity) return venueTypeSeo.h1_override; // region only
        }
        // URL has country only: SEO must be country-level
        if (urlHasCountry && !urlHasThirdSegment && seoHasCountry && !seoHasRegion && !seoHasCity) {
          return venueTypeSeo.h1_override;
        }
        // URL is continent only: SEO must be continent-level
        if (!urlHasCountry && !seoHasCountry) return venueTypeSeo.h1_override;
      }
      return `${activeVenueType}s in ${displayLocationTitle}`;
    }

    // Location page (no venue type)
    if (locationSeo?.h1_override) {
      const seoHasCity = !!locationSeo.city;
      const seoHasRegion = !!locationSeo.region_slug;
      const seoHasCountry = !!locationSeo.country;

      // URL has city (4th segment): SEO must have city
      if (urlHasFourthSegment && seoHasCity) return locationSeo.h1_override;
      // URL has region/city (3rd only): SEO must match
      if (urlHasThirdSegment && !urlHasFourthSegment) {
        if (seoHasCity && !seoHasRegion) return locationSeo.h1_override; // city for non-regional
        if (seoHasRegion && !seoHasCity) return locationSeo.h1_override; // region only
      }
      // URL has country only: SEO must be country-level
      if (urlHasCountry && !urlHasThirdSegment && seoHasCountry && !seoHasRegion && !seoHasCity) {
        return locationSeo.h1_override;
      }
      // URL is continent only: SEO must be continent-level
      if (!urlHasCountry && !seoHasCountry) return locationSeo.h1_override;
    }

    // Use category name as template (e.g., "Venues in {location}")
    const categoryName = venuesCategory?.name || "Venues";
    return `${categoryName} in ${displayLocationTitle}`;
  }, [showFinder, urlParsed, activeVenueType, venueTypeSeo, locationSeo, venuesCategory, displayLocationTitle]);

  // Build the custom nav content for venue pages
  const venueNavContent = showFinder ? (
    <>
      <Link href="/" className="text-muted-foreground hover:text-primary transition-colors whitespace-nowrap font-medium">
        Home
      </Link>
      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
      <h1
        className="!text-xs lg:!text-sm !font-medium !tracking-normal !normal-case text-muted-foreground whitespace-nowrap truncate"
        style={{ fontFamily: "inherit" }}
      >
        {venueH1Title}
      </h1>
    </>
  ) : null;

  // Breadcrumbs for continent selector page
  const venueBreadcrumbs = !showFinder ? [{ label: "Home", to: "/" }, { label: "Venues" }] : undefined;

  return (
    <Layout hideFooter={!!showFinder} breadcrumbs={venueBreadcrumbs} customNavContent={venueNavContent}>
      {/* Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {itemListSchema && (
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      
      {/* Continent Selection - normal scrolling page */}
      {!showFinder ? (
        <div className="container py-3 sm:py-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 sm:mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">VENUE FINDER</h1>
              <p className="text-muted-foreground text-sm mt-1">Find the perfect venue for your tour</p>
            </div>

            <div className="hidden sm:block w-64">
              <VenueSearchAutocomplete />
            </div>
          </div>

          {/* Mobile Search */}
          <div className="sm:hidden mb-4">
            <VenueSearchAutocomplete />
          </div>

          <ContinentSelector onSelectContinent={handleSelectContinent} onBrowseAll={handleBrowseAll} />
        </div>
      ) : (
        /* Venue Finder - flex to fill remaining space */
        (<div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Fixed header area */}
          <div className="container flex-shrink-0 py-2 border-b border-border bg-background">
            {/* H1 Title - mobile only (desktop shows in NavBar) */}
            <h1 className="md:hidden text-sm font-semibold truncate mb-2">
              {venueH1Title}
            </h1>
            
            {/* Search - own row on mobile/tablet */}
            <div className="md:hidden mb-2 [&_input]:h-9 [&_input]:text-sm [&_input]:py-1">
              <VenueSearchAutocomplete placeholder="Search venues..." />
            </div>

            {/* Filters Row - Desktop */}
            <div className="hidden md:flex items-center gap-1.5 lg:gap-3 flex-nowrap">
              {/* Continent badge - with X to go back to venue finder map */}
              {selectedContinent && (
                <button
                  onClick={handleBackToSelection}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: `${CONTINENT_COLORS[selectedContinent]}20`,
                    color: CONTINENT_COLORS[selectedContinent],
                    border: `1px solid ${CONTINENT_COLORS[selectedContinent]}40`,
                  }}
                >
                  <Globe className="h-3 w-3" />
                  {selectedContinent}
                  <X className="h-3 w-3" />
                </button>
              )}

              <div className="h-4 w-px bg-border" />

              {/* Country dropdown - always interactive */}
              <CountryFilter
                key="country-filter-stable"
                countries={countries || []}
                selectedCountries={selectedCountries}
                onChange={handleCountryChange}
              />

              {/* Region - badge when selected, dropdown when not */}
              {selectedCountry && regions && regions.length > 0 && (
                <>
                  {selectedRegionId && selectedRegionData ? (
                    <Badge
                      variant="secondary"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 h-8 lg:h-9 text-xs lg:text-sm"
                    >
                      {selectedRegionData.region_name}
                      <button
                        onClick={() => handleRegionChange("all")}
                        className="ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5"
                        aria-label={`Remove ${selectedRegionData.region_name} filter`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ) : (
                    <Select value="all" onValueChange={handleRegionChange}>
                      <SelectTrigger className="w-[100px] lg:w-[150px] h-8 lg:h-9 text-xs lg:text-sm px-2 lg:px-3 hover:bg-muted">
                        <SelectValue placeholder="Select Region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Select Region</SelectItem>
                        {regions.map((region) => (
                          <SelectItem key={region.id} value={region.region_slug}>
                            {region.region_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </>
              )}

              {/* City - badge when selected, dropdown when not */}
              {/* Hide city dropdown for city-regions (London, New York) since region IS the city */}
              {(() => {
                // City dropdown - show for all regions, but filter out city matching region name

                const selectedRegionName = selectedRegionId
                  ? regions?.find((r) => r.id === selectedRegionId)?.region_name
                  : null;
                const shouldShowCityDropdown =
                  selectedCountry &&
                  cities &&
                  cities.length > 0 &&
                  !(cities.length === 1 && selectedRegionName && cities[0] === selectedRegionName);

                if (!shouldShowCityDropdown) return null;

                return selectedCity ? (
                  <Badge
                    variant="secondary"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 h-8 lg:h-9 text-xs lg:text-sm"
                  >
                    {selectedCity}
                    <button
                      onClick={() => handleCityChange("all")}
                      className="ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5"
                      aria-label={`Remove ${selectedCity} filter`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ) : (
                  <Select value="all" onValueChange={handleCityChange}>
                    <SelectTrigger className="w-[100px] lg:w-[150px] h-8 lg:h-9 text-xs lg:text-sm px-2 lg:px-3 hover:bg-muted">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Select City</SelectItem>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              })()}

              {/* Venue Type & Capacity - INLINE at xl+, COLLAPSED below xl */}
              {/* Extra large screens: show inline */}
              <div className="hidden xl:contents">
                <VenueTypeFilter selectedTypes={selectedTypes} onChange={setSelectedTypes} />

                <CapacitySlider
                  min={capacityMin}
                  max={capacityMax}
                  onChange={(min, max) => {
                    setCapacityMin(min);
                    setCapacityMax(max);
                  }}
                  variant="inline"
                />
              </div>

              {/* Below xl: collapsed Filters button */}
              <div className="xl:hidden flex-shrink-0">
                <Popover open={filtersPopoverOpen} onOpenChange={setFiltersPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "h-8 gap-1.5 px-2.5 justify-between",
                        hasSecondaryFilters
                          ? "border-primary bg-primary/10 text-primary hover:bg-primary/20"
                          : "border-input bg-background text-foreground hover:bg-muted",
                      )}
                    >
                      <SlidersHorizontal className="h-3.5 w-3.5" />
                      <span className="text-xs">Filters</span>
                      {secondaryFilterCount > 0 && (
                        <Badge
                          variant="secondary"
                          className="h-4 min-w-4 px-1 text-[10px] bg-primary text-primary-foreground"
                        >
                          {secondaryFilterCount}
                        </Badge>
                      )}
                      <ChevronDown className={cn("h-3 w-3 transition-transform", filtersPopoverOpen && "rotate-180")} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-3 bg-card border rounded-lg shadow-lg" align="start" sideOffset={4}>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-2 block">Venue Type</label>
                        <VenueTypeFilter selectedTypes={selectedTypes} onChange={setSelectedTypes} />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-2 block">Capacity</label>
                        <CapacitySlider
                          min={capacityMin}
                          max={capacityMax}
                          onChange={(min, max) => {
                            setCapacityMin(min);
                            setCapacityMax(max);
                          }}
                          variant="stacked"
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground h-8 lg:h-9 px-1.5 lg:px-3 flex-shrink-0"
                >
                  <X className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                  <span className="hidden lg:inline ml-1">Clear</span>
                </Button>
              )}
            </div>

            {/* Row 2 - Mobile: Collapsible Filter with progressive disclosure */}
            <div className="md:hidden">
              <Collapsible open={locationFilterOpen} onOpenChange={setLocationFilterOpen}>
                {/* Row: Filter trigger + View toggle */}
                <div className="flex items-center gap-2">
                  {/* Collapsible filter trigger */}
                  <CollapsibleTrigger className="flex-1 min-w-0">
                    <div className="flex items-center justify-between p-2.5 bg-card rounded-lg border">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm">Filter Venues</span>
                        {selectedTypes.length +
                          activeLocationFilterCount +
                          (capacityMin > 0 || capacityMax < 100000 ? 1 : 0) >
                          0 && (
                          <Badge variant="secondary" className="ml-1 bg-primary text-primary-foreground text-xs">
                            {selectedTypes.length +
                              activeLocationFilterCount +
                              (capacityMin > 0 || capacityMax < 100000 ? 1 : 0)}
                          </Badge>
                        )}
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform",
                          locationFilterOpen && "rotate-180",
                        )}
                      />
                    </div>
                  </CollapsibleTrigger>

                  {/* View Toggle - always visible */}
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      className="h-9 w-9 p-0"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "map" ? "default" : "outline"}
                      size="sm"
                      className="h-9 w-9 p-0"
                      onClick={() => setViewMode("map")}
                    >
                      <Map className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Expandable filter content with progressive disclosure */}
                <CollapsibleContent data-filter-content className="mt-2 overscroll-contain">
                  <div className="p-3 bg-card border border-border rounded-lg space-y-3">
                    {/* Selected filters as removable chips - always show if continent selected */}
                    {(selectedContinent ||
                      selectedTypes.length > 0 ||
                      selectedCountry ||
                      selectedRegionId ||
                      selectedCity ||
                      capacityMin > 0 ||
                      capacityMax < 100000) && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {/* Continent chip - clicking X goes back to continent selector */}
                        {selectedContinent && (
                          <Badge
                            variant="secondary"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 text-xs"
                          >
                            {selectedContinent}
                            <button
                              onClick={handleBackToSelection}
                              className="ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        )}

                        {/* Country badges - show each selected country as a badge when multi-selecting (not drilled to region/city) */}
                        {selectedCountries.length > 0 &&
                          !selectedRegionId &&
                          !selectedCity &&
                          selectedCountries.map((country) => (
                            <Badge
                              key={country}
                              variant="secondary"
                              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 text-xs"
                            >
                              {country}
                              <button
                                onClick={() => {
                                  const newCountries = selectedCountries.filter((c) => c !== country);
                                  handleCountryChange(newCountries);
                                }}
                                className="ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}

                        {/* Country chip - show when drilled down to region or city */}
                        {selectedCountry && (selectedRegionId || selectedCity) && (
                          <Badge
                            variant="secondary"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 text-xs"
                          >
                            {selectedCountry}
                            <button
                              onClick={() => {
                                sessionStorage.removeItem("venueFinderMapState");
                                sessionStorage.removeItem("venueFinderSelectedCountries");
                                setInitialMapState(null);
                                router.push(buildVenueUrl({ continent: selectedContinent }));
                              }}
                              className="ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        )}

                        {/* Venue type chips */}
                        {selectedTypes.map((type) => (
                          <Badge
                            key={type}
                            variant="secondary"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 text-xs"
                          >
                            {type}
                            <button
                              onClick={() => setSelectedTypes(selectedTypes.filter((t) => t !== type))}
                              className="ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}

                        {/* Capacity chip */}
                        {(capacityMin > 0 || capacityMax < 100000) && (
                          <Badge
                            variant="secondary"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 text-xs"
                          >
                            {capacityMin > 0 && capacityMax < 100000
                              ? `${capacityMin.toLocaleString()}-${capacityMax.toLocaleString()}`
                              : capacityMin > 0
                                ? `${capacityMin.toLocaleString()}+`
                                : `Up to ${capacityMax.toLocaleString()}`}
                            <button
                              onClick={() => {
                                setCapacityMin(0);
                                setCapacityMax(100000);
                              }}
                              className="ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        )}

                        {/* City chip */}
                        {selectedCity && (
                          <Badge
                            variant="secondary"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 text-xs"
                          >
                            {selectedCity}
                            <button
                              onClick={() =>
                                router.push(
                                  buildVenueUrl({
                                    continent: selectedContinent,
                                    country: selectedCountry,
                                    regionSlug: selectedRegionSlug,
                                  }),
                                )
                              }
                              className="ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        )}

                        {/* Region chip */}
                        {selectedRegionData && !selectedCity && (
                          <Badge
                            variant="secondary"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 text-xs"
                          >
                            {selectedRegionData.region_name}
                            <button
                              onClick={() =>
                                router.push(
                                  buildVenueUrl({
                                    continent: selectedContinent,
                                    country: selectedCountry,
                                  }),
                                )
                              }
                              className="ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        )}

                        {/* Clear all - only show when there's something to clear beyond continent */}
                        {(selectedCountries.length > 0 ||
                          selectedTypes.length > 0 ||
                          capacityMin > 0 ||
                          capacityMax < 100000) && (
                          <button
                            onClick={clearFilters}
                            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 ml-1"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    )}

                    {/* Row: Location dropdown + Venue Type side by side */}
                    <div className="grid grid-cols-2 gap-2">
                      {/* Show country filter only when not drilled down to region or city */}
                      {!selectedRegionId && !selectedCity && (
                        <CountryFilter
                          key="mobile-country-filter-stable"
                          countries={countries || []}
                          selectedCountries={selectedCountries}
                          onChange={handleCountryChange}
                        />
                      )}

                      {/* Show venue type filter alongside */}
                      <VenueTypeFilter selectedTypes={selectedTypes} onChange={setSelectedTypes} />

                      {/* Show region dropdown when single country with regions selected */}
                      {selectedCountry && regions && regions.length > 0 && !selectedRegionId && (
                        <Select
                          key="region-select"
                          open={regionDropdownOpen}
                          onOpenChange={setRegionDropdownOpen}
                          onValueChange={(v) => {
                            handleRegionChange(v);
                            setRegionDropdownOpen(false);
                          }}
                        >
                          <SelectTrigger className="h-9 text-sm">
                            <SelectValue placeholder="All Regions" />
                          </SelectTrigger>
                          <SelectContent>
                            {regions.map((region) => (
                              <SelectItem key={region.id} value={region.region_slug}>
                                {region.region_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}

                      {/* Show city dropdown when appropriate */}
                      {selectedCountry &&
                        cities &&
                        cities.length > 0 &&
                        !selectedCity &&
                        (() => {
                          const selectedRegionName = selectedRegionId
                            ? regions?.find((r) => r.id === selectedRegionId)?.region_name
                            : null;
                          const shouldShowCityDropdown = !(
                            cities.length === 1 &&
                            selectedRegionName &&
                            cities[0] === selectedRegionName
                          );

                          if (!shouldShowCityDropdown) return null;

                          return (
                            <Select
                              key="city-select"
                              open={cityDropdownOpen}
                              onOpenChange={setCityDropdownOpen}
                              onValueChange={(v) => {
                                handleCityChange(v);
                                setCityDropdownOpen(false);
                              }}
                            >
                              <SelectTrigger className="h-9 text-sm">
                                <SelectValue placeholder="All Cities" />
                              </SelectTrigger>
                              <SelectContent>
                                {cities.map((city) => (
                                  <SelectItem key={city} value={city}>
                                    {city}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          );
                        })()}
                    </div>

                    {/* Capacity slider */}
                    <CapacitySlider
                      min={capacityMin}
                      max={capacityMax}
                      onChange={(min, max) => {
                        setCapacityMin(min);
                        setCapacityMax(max);
                      }}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
          {/* Main Content - Split View - fills remaining height */}
          <div className="container flex-1 flex gap-4 min-h-0 max-h-[790px] overflow-hidden py-4">
            {/* Venue List - uses virtual scrolling for performance */}
            <div className={cn("flex-1 flex flex-col min-h-0", viewMode === "map" && "hidden md:flex")}>
              {isLoading ? (
                <div className="space-y-1.5 overflow-hidden">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-14 bg-card border rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : venues.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No venues found</p>
                  <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
                  {hasActiveFilters && (
                    <Button variant="outline" size="sm" onClick={clearFilters} className="mt-4">
                      Clear Filters
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  {/* Header - fixed, shows visible count vs total */}
                  <div className="px-3 py-2 bg-card border rounded-lg mb-3 flex-shrink-0">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-sm font-medium">
                        <span className="text-muted-foreground">
                          {visibleVenues.length === venues.length
                            ? `${venues.length} venue${venues.length !== 1 ? "s" : ""}`
                            : `${visibleVenues.length} of ${venues.length} venues in view`}
                        </span>
                        <span className="mx-1.5 text-muted-foreground">—</span>
                        <span className="text-foreground">
                          {(() => {
                          // Check URL specificity for SEO matching
                          const urlHasThirdSegment = !!urlParsed.thirdSlug;
                          const urlHasFourthSegment = !!urlParsed.fourthSlug;
                          const urlHasCountry = !!urlParsed.countrySlug;

                          // Venue type SEO
                          if (activeVenueType && venueTypeSeo?.h2_override) {
                            const seoHasCity = !!venueTypeSeo.city;
                            const seoHasRegion = !!venueTypeSeo.region_slug;
                            const seoHasCountry = !!venueTypeSeo.country;
                            if (
                              (urlHasFourthSegment && seoHasCity) ||
                              (urlHasThirdSegment &&
                                !urlHasFourthSegment &&
                                ((seoHasCity && !seoHasRegion) || (seoHasRegion && !seoHasCity))) ||
                              (urlHasCountry && !urlHasThirdSegment && seoHasCountry && !seoHasRegion && !seoHasCity) ||
                              (!urlHasCountry && !seoHasCountry)
                            ) {
                              return venueTypeSeo.h2_override;
                            }
                          }
                          if (activeVenueType) {
                            return `Browse ${activeVenueType}s in ${getLocationString() || "All Locations"}`;
                          }

                          // Location SEO - check specificity
                          if (locationSeo?.h2_override) {
                            const seoHasCity = !!locationSeo.city;
                            const seoHasRegion = !!locationSeo.region_slug;
                            const seoHasCountry = !!locationSeo.country;
                            if (
                              (urlHasFourthSegment && seoHasCity) ||
                              (urlHasThirdSegment &&
                                !urlHasFourthSegment &&
                                ((seoHasCity && !seoHasRegion) || (seoHasRegion && !seoHasCity))) ||
                              (urlHasCountry && !urlHasThirdSegment && seoHasCountry && !seoHasRegion && !seoHasCity) ||
                              (!urlHasCountry && !seoHasCountry)
                            ) {
                              return locationSeo.h2_override;
                            }
                          }

                          // Category template
                          if (venuesCategory?.seo_h2_override) {
                            return (
                              injectLocation(venuesCategory.seo_h2_override) ||
                              `Live Music Venues in ${displayLocationTitle}`
                            );
                          }

                          return `Live Music Venues in ${displayLocationTitle}`;
                        })()}
                      </span>
                    </h2>
                    {visibleVenues.length < venues.length && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setMapBounds(null);
                          setMapResetTrigger((t) => t + 1);
                        }}
                        className="h-7 text-xs shrink-0"
                      >
                        <RotateCcw className="h-3 w-3 md:mr-1" />
                        <span className="hidden md:inline">Reset View</span>
                      </Button>
                    )}
                    </div>
                  </div>

                  {/* Virtual scrolling list - shows only venues visible on map */}
                  <VirtualVenueList
                    venues={visibleVenues}
                    highlightedVenueId={highlightedVenueId}
                    onHoverVenue={handleHoverVenue}
                    onFlyToVenue={handleFlyToVenue}
                    className="flex-1 min-h-0 pr-2"
                    initialScrollTop={initialScrollTop}
                    onScrollPositionChange={handleScrollPositionChange}
                    onScroll={() => setLocationFilterOpen(false)}
                    footer={
                      selectedCountry || selectedContinent ? (
                        <section className="pt-4 border-t border-border">
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">
                            {(() => {
                              const urlHasThirdSegment = !!urlParsed.thirdSlug;
                              const urlHasFourthSegment = !!urlParsed.fourthSlug;
                              const urlHasCountry = !!urlParsed.countrySlug;

                              // Venue type SEO
                              if (activeVenueType && venueTypeSeo?.about_heading) {
                                const seoHasCity = !!venueTypeSeo.city;
                                const seoHasRegion = !!venueTypeSeo.region_slug;
                                const seoHasCountry = !!venueTypeSeo.country;
                                if (
                                  (urlHasFourthSegment && seoHasCity) ||
                                  (urlHasThirdSegment &&
                                    !urlHasFourthSegment &&
                                    ((seoHasCity && !seoHasRegion) || (seoHasRegion && !seoHasCity))) ||
                                  (urlHasCountry &&
                                    !urlHasThirdSegment &&
                                    seoHasCountry &&
                                    !seoHasRegion &&
                                    !seoHasCity) ||
                                  (!urlHasCountry && !seoHasCountry)
                                ) {
                                  return venueTypeSeo.about_heading;
                                }
                              }
                              if (activeVenueType) {
                                return `About ${activeVenueType}s in ${getLocationString() || "All Locations"}`;
                              }

                              // Location SEO - check specificity
                              if (locationSeo?.about_heading) {
                                const seoHasCity = !!locationSeo.city;
                                const seoHasRegion = !!locationSeo.region_slug;
                                const seoHasCountry = !!locationSeo.country;
                                if (
                                  (urlHasFourthSegment && seoHasCity) ||
                                  (urlHasThirdSegment &&
                                    !urlHasFourthSegment &&
                                    ((seoHasCity && !seoHasRegion) || (seoHasRegion && !seoHasCity))) ||
                                  (urlHasCountry &&
                                    !urlHasThirdSegment &&
                                    seoHasCountry &&
                                    !seoHasRegion &&
                                    !seoHasCity) ||
                                  (!urlHasCountry && !seoHasCountry)
                                ) {
                                  return locationSeo.about_heading;
                                }
                              }

                              // Category template
                              if (venuesCategory?.seo_about_heading) {
                                return (
                                  injectLocation(venuesCategory.seo_about_heading) ||
                                  `About Venues in ${displayLocationTitle}`
                                );
                              }

                              return `About Venues in ${displayLocationTitle}`;
                            })()}
                          </h3>
                          {(() => {
                            const urlHasThirdSegment = !!urlParsed.thirdSlug;
                            const urlHasFourthSegment = !!urlParsed.fourthSlug;
                            const urlHasCountry = !!urlParsed.countrySlug;

                            // Venue type SEO content
                            if (activeVenueType && venueTypeSeo?.about_content) {
                              const seoHasCity = !!venueTypeSeo.city;
                              const seoHasRegion = !!venueTypeSeo.region_slug;
                              const seoHasCountry = !!venueTypeSeo.country;
                              if (
                                (urlHasFourthSegment && seoHasCity) ||
                                (urlHasThirdSegment &&
                                  !urlHasFourthSegment &&
                                  ((seoHasCity && !seoHasRegion) || (seoHasRegion && !seoHasCity))) ||
                                (urlHasCountry &&
                                  !urlHasThirdSegment &&
                                  seoHasCountry &&
                                  !seoHasRegion &&
                                  !seoHasCity) ||
                                (!urlHasCountry && !seoHasCountry)
                              ) {
                                return (
                                  <div
                                    className="text-xs text-muted-foreground/80 leading-relaxed prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(venueTypeSeo.about_content) }}
                                  />
                                );
                              }
                            }

                            // Location SEO content - check specificity
                            if (!activeVenueType && locationSeo?.about_content) {
                              const seoHasCity = !!locationSeo.city;
                              const seoHasRegion = !!locationSeo.region_slug;
                              const seoHasCountry = !!locationSeo.country;
                              if (
                                (urlHasFourthSegment && seoHasCity) ||
                                (urlHasThirdSegment &&
                                  !urlHasFourthSegment &&
                                  ((seoHasCity && !seoHasRegion) || (seoHasRegion && !seoHasCity))) ||
                                (urlHasCountry &&
                                  !urlHasThirdSegment &&
                                  seoHasCountry &&
                                  !seoHasRegion &&
                                  !seoHasCity) ||
                                (!urlHasCountry && !seoHasCountry)
                              ) {
                                return (
                                  <div
                                    className="text-xs text-muted-foreground/80 leading-relaxed prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(locationSeo.about_content) }}
                                  />
                                );
                              }
                            }

                            // Category template content
                            if (!activeVenueType && venuesCategory?.seo_about_content) {
                              const injected = injectLocation(venuesCategory.seo_about_content);
                              if (injected) {
                                return (
                                  <div
                                    className="text-xs text-muted-foreground/80 leading-relaxed prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(injected) }}
                                  />
                                );
                              }
                            }

                            // Fallback content
                            return (
                              <p className="text-xs text-muted-foreground/80 leading-relaxed">
                                {activeVenueType
                                  ? getVenueTypeAboutContent(activeVenueType, getLocationString() || "this region")
                                  : selectedCity
                                    ? `${selectedCity} offers a diverse range of concert venues, from intimate clubs to large arenas. Whether you're planning a small acoustic show or a major tour stop, you'll find suitable venues for any capacity and genre.`
                                    : selectedRegionData
                                      ? `${selectedRegionData.region_name} is home to numerous live music venues across its cities and towns. From historic theatres to modern arenas, the region offers diverse options for touring artists.`
                                      : selectedCountry
                                        ? `${selectedCountry} has a vibrant live music scene with venues ranging from intimate clubs to world-famous arenas. Browse our directory to find the perfect venue for your next show.`
                                        : `${selectedContinent} offers thousands of concert venues across its many countries. Use the filters above to narrow down by country, region, and city.`}
                              </p>
                            );
                          })()}
                        </section>
                      ) : undefined
                    }
                  />
                </>
              )}
            </div>

            {/* Map - fills remaining height */}
            <div
              className={cn(
                "flex-1 rounded-lg overflow-hidden min-h-0 h-full",
                viewMode === "list" && "hidden md:block",
              )}
            >
              <Suspense fallback={<MapLoadingFallback />}>
                <VenueMap
                  venues={venues}
                  selectedVenue={selectedMapVenue}
                  onSelectVenue={handleMapVenueSelect}
                  highlightedVenueId={highlightedVenueId}
                  onBoundsChange={handleBoundsChange}
                  initialState={initialMapState}
                  resetTrigger={mapResetTrigger}
                  flyToLocation={flyToLocation}
                />
              </Suspense>
            </div>
          </div>
        </div>)
      )}
    </Layout>
  );
}