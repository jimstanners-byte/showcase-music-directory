'use client';

import Link from 'next/link';
import { useParams, useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useMemo, useEffect, useRef, lazy, Suspense, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "isomorphic-dompurify";
import NotFound from "./NotFound";
import ResourceArticle from "./ResourceArticle";
import { Layout, BreadcrumbItem } from "@/components/Layout";
import { VirtualListingList } from "@/components/VirtualListingList";
import { SubcategorySidebar } from "@/components/SubcategorySidebar";
import { SearchAutocomplete } from "@/components/SearchAutocomplete";
import { CategoryCountryFilter } from "@/components/CategoryCountryFilter";
import { useCategoryBySlug, useSubcategories } from "@/hooks/useCategories";
import {
  useListings,
  useListingLocations,
  useCitiesByCountry,
  useRegionsByCountry,
  useCitiesByRegion,
  useCategoryCountryCounts,
  useCategoryRegionCounts,
} from "@/hooks/useListings";
import { useCategoryLocationSeo } from "@/hooks/useCategoryLocationSeo";
import { supabase } from "@/integrations/supabase/client";
import { deslugify, slugifyCountry, slugify } from "@/lib/slugify";
import { isCityRegion } from "@/lib/cityRegions";
import {
  CONTINENT_ORDER,
  CONTINENT_COUNTRIES,
  CONTINENT_COLORS,
  getContinentFromSlug,
  getContinentSlug,
  getContinent,
} from "@/lib/continents";
import { ChevronRight, ChevronDown, MapPin, X, List, Map, Globe, RotateCcw } from "lucide-react";
import { Listing, ListingPublic } from "@/types/database";
import { trackCategoryPageView } from "@/hooks/useAnalytics";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MapBounds } from "@/components/ListingsMap";

const ListingsMap = lazy(() => import("@/components/ListingsMap").then((m) => ({ default: m.ListingsMap })));

const MapLoadingFallback = () => (
  <div className="flex items-center justify-center h-full bg-card border rounded-lg">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

const COUNTRIES_WITH_REGIONS = ["United Kingdom", "UK", "United States", "USA"];

function countryHasRegions(country: string): boolean {
  return COUNTRIES_WITH_REGIONS.some((c) => c.toLowerCase() === country.toLowerCase());
}

export default function CategoryPage({
  initialCategory,
  initialSubcategories
}: {
  initialCategory?: any;
  initialSubcategories?: any[];
} = {}) {
  const {
    slug,
    continent: continentSlug,
    country: countrySlug,
    regionOrCity: regionOrCitySlug,
    region: regionSlug,
    city: citySlug,
  } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentSlug = slug || "";

  const [locationFilterOpen, setLocationFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [highlightedListingId, setHighlightedListingId] = useState<string | null>(null);
  const [selectedMapListing, setSelectedMapListing] = useState<Listing | null>(null);
  const [flyToLocation, setFlyToLocation] = useState<{ lat: number; lng: number; id: string } | null>(null);
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(2);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [initialScrollTop, setInitialScrollTop] = useState<number | undefined>(undefined);

  const mapStateKey = `map-state-${currentSlug}`;
  const countriesStorageKey = `category-countries-${currentSlug}`;

  // Resolve continent from URL slug
  const selectedContinent = useMemo(() => {
    if (!continentSlug) return null;
    return getContinentFromSlug(continentSlug) || null;
  }, [continentSlug]);

  const [initialMapState, setInitialMapState] = useState<{ bounds: MapBounds; zoom: number } | null>(null);
  const [mapResetTrigger, setMapResetTrigger] = useState(0);

  // Check if this is a fresh navigation (from breadcrumb) - should not restore map state
  const isFreshNavigation = searchParams?.get("nav") === "1";

  // Check if this is a browser back/forward navigation
  const isBackForwardNav = useRef(false);
  
  useEffect(() => {
    // Detect back/forward navigation using Navigation API or performance API
    const checkNavType = () => {
      if (typeof window !== 'undefined') {
        // Check if this is a back/forward navigation
        const perfEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (perfEntries.length > 0) {
          isBackForwardNav.current = perfEntries[0].type === 'back_forward';
        }
      }
    };
    checkNavType();
  }, [pathname]);

  // Restore map state and scroll position from sessionStorage on mount - only if URL matches and not fresh nav
  useEffect(() => {
    // Skip restoration if this is a fresh navigation from breadcrumb
    if (isFreshNavigation) {
      sessionStorage.removeItem(mapStateKey);
      return;
    }

    try {
      const saved = sessionStorage.getItem(mapStateKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only restore if the saved URL matches current URL AND it's a back/forward navigation
        if (parsed.url === pathname + searchParams.toString() && isBackForwardNav.current) {
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
        sessionStorage.removeItem(mapStateKey);
      }
    } catch {
      sessionStorage.removeItem(mapStateKey);
    }

    // Cleanup: Clear map state when navigating away
    return () => {
      sessionStorage.removeItem(mapStateKey);
    };
  }, [mapStateKey, pathname, searchParams.toString(), isFreshNavigation]);

  const { data: category, isLoading: categoryLoading } = useCategoryBySlug(currentSlug, initialCategory);
  
  // Fetch parent category if this category has a parent
  const { data: parentCategory } = useQuery({
    queryKey: ["category", category?.parent_id],
    queryFn: async () => {
      if (!category?.parent_id) return null;
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("id", category.parent_id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!category?.parent_id,
  });
  
  const { data: subcategories } = useSubcategories(category?.id || null, initialSubcategories);
  const { data: locations } = useListingLocations(category?.id);
  const { data: countryCounts } = useCategoryCountryCounts(category?.id);

  const hasSubcategories = subcategories && subcategories.length > 0;

  // Resolve country from URL slug
  const countryFromUrl = useMemo(() => {
    if (!countrySlug || !locations?.countries) return null;
    return deslugify(countrySlug, locations.countries);
  }, [countrySlug, locations?.countries]);

  // Sync selectedCountries from URL/sessionStorage on mount
  useEffect(() => {
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
        // Check sessionStorage for persisted multi-country selection
        try {
          const saved = sessionStorage.getItem(countriesStorageKey);
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 1) {
              setSelectedCountries(parsed);
              // Restore query params
              const params = new URLSearchParams(searchParams);
              params.set("countries", parsed.join(","));
              router.replace(`?${params.toString()}`);
            }
            sessionStorage.removeItem(countriesStorageKey);
          } else {
            setSelectedCountries([]);
          }
        } catch {
          setSelectedCountries([]);
        }
      }
    }
  }, [countryFromUrl, searchParams, countriesStorageKey]);

  // Save multi-country selection to sessionStorage
  useEffect(() => {
    if (selectedCountries.length > 1) {
      sessionStorage.setItem(countriesStorageKey, JSON.stringify(selectedCountries));
    } else {
      sessionStorage.removeItem(countriesStorageKey);
    }
  }, [selectedCountries, countriesStorageKey]);

  // Save viewMode to sessionStorage whenever it changes (for restoration after navigation)
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(mapStateKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.viewMode = viewMode;
        sessionStorage.setItem(mapStateKey, JSON.stringify(parsed));
      } else if (mapBounds) {
        // If no saved state but we have bounds, create initial state
        sessionStorage.setItem(
          mapStateKey,
          JSON.stringify({
            bounds: mapBounds,
            zoom: mapZoom,
            viewMode,
            url: pathname + searchParams.toString(),
          }),
        );
      }
    } catch {}
  }, [viewMode, mapStateKey, mapBounds, mapZoom, pathname, searchParams.toString()]);

  // For backwards compatibility - single country for region/city logic
  const selectedCountry = selectedCountries.length === 1 ? selectedCountries[0] : null;

  const { data: regionsForCountry } = useRegionsByCountry(selectedCountry || undefined, category?.id);
  const { data: regionCounts } = useCategoryRegionCounts(selectedCountry || undefined, category?.id);

  const { resolvedRegionId, resolvedCity, resolvedCityFromFourSegment } = useMemo(() => {
    // Handle 5-segment route: /category/continent/country/region/city
    // In this route, regionOrCitySlug is the region and citySlug is the city
    if (regionOrCitySlug && citySlug && selectedCountry && regionsForCountry) {
      const region = regionsForCountry.find((r) => r.region_slug === regionOrCitySlug);
      if (region) {
        return { resolvedRegionId: region.id, resolvedCity: null, resolvedCityFromFourSegment: citySlug };
      }
    }
    
    // Handle 4-segment route where regionOrCitySlug could be either region or city
    if (regionOrCitySlug && selectedCountry) {
      if (countryHasRegions(selectedCountry) && regionsForCountry) {
        const region = regionsForCountry.find((r) => r.region_slug === regionOrCitySlug);
        if (region) return { resolvedRegionId: region.id, resolvedCity: null, resolvedCityFromFourSegment: null };
      }
      return { resolvedRegionId: null, resolvedCity: regionOrCitySlug, resolvedCityFromFourSegment: null };
    }
    return { resolvedRegionId: null, resolvedCity: null, resolvedCityFromFourSegment: null };
  }, [regionOrCitySlug, citySlug, selectedCountry, regionsForCountry]);

  const selectedRegion = resolvedRegionId;
  const selectedRegionData = regionsForCountry?.find((r) => r.id === selectedRegion);
  const selectedRegionName = selectedRegionData?.region_name || null;

  const isCurrentCityRegion = useMemo(() => {
    return selectedRegionData && isCityRegion(selectedCountry, selectedRegionData.region_slug);
  }, [selectedCountry, selectedRegionData]);

  // Call hooks BEFORE any conditional returns (Rules of Hooks)
  const { data: citiesByRegion } = useCitiesByRegion(selectedRegion || undefined, category?.id);
  const { data: citiesForCountryDirect } = useCitiesByCountry(category?.id, selectedCountry || undefined);
  // When a region is selected, show only cities in that region
  // When no region, show all cities in the country
  const citiesForCountry = selectedRegion ? citiesByRegion : citiesForCountryDirect;

  // Handle city-region redirect in useEffect (can't return early before all hooks)
  useEffect(() => {
    if (regionSlug && citySlug && isCityRegion(selectedCountry, regionSlug)) {
      if (regionSlug.toLowerCase() === citySlug.toLowerCase()) {
        const categoryUrlSlug = category?.url_slug || category?.slug || currentSlug;
        router.replace(`/${categoryUrlSlug}/${continentSlug}/${countrySlug}/${regionSlug}`);
      }
    }
  }, [regionSlug, citySlug, selectedCountry, category, currentSlug, continentSlug, countrySlug, router]);

  const selectedCity = useMemo(() => {
    const citySlugToResolve = resolvedCityFromFourSegment || resolvedCity;
    if (!citySlugToResolve || !citiesForCountry) return null;
    return deslugify(citySlugToResolve, citiesForCountry);
  }, [resolvedCity, resolvedCityFromFourSegment, citiesForCountry]);

  // Fetch listings - pass single country to RPC, multi-country filtered client-side
  const { data: allListings, isLoading: listingsLoading } = useListings({
    categoryId: hasSubcategories ? undefined : category?.id,
    continent: selectedContinent || undefined,
    country: selectedCountry || undefined,
    regionId: selectedRegion || undefined,
    city: selectedCity || undefined,
  });

  // Filter by multiple countries client-side
  const listings = useMemo(() => {
    if (!allListings) return [];
    if (selectedCountries.length <= 1) return allListings;
    // Multi-country: filter client-side
    return allListings.filter((l) => l.country && selectedCountries.includes(l.country));
  }, [allListings, selectedCountries]);

  const { data: locationSeo } = useCategoryLocationSeo(category?.id, selectedCountry, selectedRegionName, selectedCity);

  const { data: resourceExists, isLoading: resourceLoading } = useQuery({
    queryKey: ["resource-exists", currentSlug],
    queryFn: async () => {
      const { data } = await supabase
        .from("resources")
        .select("id")
        .eq("slug", currentSlug)
        .eq("status", "published")
        .maybeSingle();
      return !!data;
    },
    enabled: !category && !categoryLoading,
  });

  const locationMode = selectedCountry ? "city" : "country";
  const activeLocationFilters =
    (selectedContinent ? 1 : 0) +
    (selectedCountries.length > 0 ? 1 : 0) +
    (selectedRegion ? 1 : 0) +
    (selectedCity ? 1 : 0);

  const locationSuffix = useMemo(() => {
    if (selectedCity && selectedRegionName && selectedCountry)
      return ` in ${selectedCity}, ${selectedRegionName}, ${selectedCountry}`;
    if (selectedCity && selectedCountry) return ` in ${selectedCity}, ${selectedCountry}`;
    if (selectedRegionName && selectedCountry) return ` in ${selectedRegionName}, ${selectedCountry}`;
    if (selectedCountry) return ` in ${selectedCountry}`;
    if (selectedCountries.length > 1) return ` in ${selectedCountries.length} countries`;
    return "";
  }, [selectedCity, selectedRegionName, selectedCountry, selectedCountries]);

  const injectLocation = (text: string | null | undefined): string | null => {
    if (!text) return null;
    let result = text;
    let locationString = "";
    if (selectedCity && selectedRegionName && selectedCountry)
      locationString = `${selectedCity}, ${selectedRegionName}, ${selectedCountry}`;
    else if (selectedCity && selectedCountry) locationString = `${selectedCity}, ${selectedCountry}`;
    else if (selectedRegionName && selectedCountry) locationString = `${selectedRegionName}, ${selectedCountry}`;
    else if (selectedCountry) locationString = selectedCountry;

    if (locationString) {
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
  };

  const trackedRef = useRef<string | null>(null);
  useEffect(() => {
    if (category) {
      const trackingKey = `${category.id}|${countrySlug || ""}|${citySlug || ""}`;
      if (trackedRef.current !== trackingKey) {
        trackedRef.current = trackingKey;
        trackCategoryPageView(
          category.id,
          category.name,
          countrySlug?.replace(/-/g, " ") || null,
          citySlug?.replace(/-/g, " ") || null,
        );
      }
    }
  }, [category, countrySlug, citySlug]);

  const visibleListings = useMemo(() => {
    if (!listings) return [];
    if (!mapBounds) return listings;
    return listings.filter(
      (l) =>
        l.latitude &&
        l.longitude &&
        l.latitude >= mapBounds.south &&
        l.latitude <= mapBounds.north &&
        l.longitude >= mapBounds.west &&
        l.longitude <= mapBounds.east,
    );
  }, [listings, mapBounds]);

  // Track current scroll position for saving
  const scrollTopRef = useRef<number>(0);

  const handleBoundsChange = useCallback(
    (bounds: MapBounds, zoom: number) => {
      setMapBounds(bounds);
      setMapZoom(zoom);
      try {
        sessionStorage.setItem(
          mapStateKey,
          JSON.stringify({
            bounds,
            zoom,
            viewMode,
            scrollTop: scrollTopRef.current,
            url: pathname + searchParams.toString(),
          }),
        );
      } catch {}
    },
    [mapStateKey, pathname, searchParams.toString(), viewMode],
  );

  // Handle scroll position changes - save to ref and sessionStorage
  const handleScrollPositionChange = useCallback(
    (scrollTop: number) => {
      scrollTopRef.current = scrollTop;
      try {
        const saved = sessionStorage.getItem(mapStateKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          parsed.scrollTop = scrollTop;
          sessionStorage.setItem(mapStateKey, JSON.stringify(parsed));
        } else {
          // Create state if it doesn't exist
          sessionStorage.setItem(
            mapStateKey,
            JSON.stringify({
              bounds: mapBounds,
              zoom: mapZoom,
              viewMode,
              scrollTop,
              url: pathname + searchParams.toString(),
            }),
          );
        }
      } catch {}
    },
    [mapStateKey, mapBounds, mapZoom, viewMode, pathname, searchParams.toString()],
  );

  const handleHoverListing = useCallback((listingId: string | null) => setHighlightedListingId(listingId), []);
  const handleMapListingSelect = useCallback((listing: Listing | null) => setSelectedMapListing(listing), []);

  // Fly map to a specific listing's location
  const handleFlyToListing = useCallback((listing: Listing | ListingPublic) => {
    if (listing.latitude && listing.longitude) {
      setFlyToLocation({ lat: listing.latitude, lng: listing.longitude, id: `${listing.id}-${Date.now()}` });
      setHighlightedListingId(listing.id);
      setTimeout(() => setHighlightedListingId(null), 3000);
    }
  }, []);

  const filteredCountries = useMemo(() => {
    if (!locations?.countries) return [];
    if (!selectedContinent) return locations.countries;

    // Filter by checking each country's continent via getContinent()
    return locations.countries.filter((c) => {
      const countryContinent = getContinent(c);
      return countryContinent === selectedContinent;
    });
  }, [locations?.countries, selectedContinent]);

  const availableContinents = useMemo(() => {
    if (!locations?.countries) return [];
    return CONTINENT_ORDER.filter((continent) =>
      locations.countries.some((c) => (CONTINENT_COUNTRIES[continent] || []).includes(c)),
    );
  }, [locations?.countries]);

  const buildUrl = (params: {
    continent?: string | null;
    country?: string | null;
    region?: typeof selectedRegionData | null;
    city?: string | null;
  }) => {
    const categoryUrlSlug = category?.url_slug || currentSlug;
    const parts = [`/${categoryUrlSlug}`];

    // Add continent if provided
    if (params.continent) {
      parts.push(getContinentSlug(params.continent));
    }

    if (params.country) {
      // If we have a country but no explicit continent, derive it
      if (!params.continent) {
        const derivedContinent = getContinent(params.country);
        if (derivedContinent) {
          parts.push(getContinentSlug(derivedContinent));
        }
      }
      parts.push(slugifyCountry(params.country));
      if (params.region) {
        parts.push(params.region.region_slug);
        if (params.city) parts.push(slugify(params.city));
      } else if (params.city) parts.push(slugify(params.city));
    }
    return parts.join("/");
  };

  const handleContinentChange = (continent: string | null) => {
    // Clear countries when changing continent
    setSelectedCountries([]);
    sessionStorage.removeItem(mapStateKey);
    sessionStorage.removeItem(countriesStorageKey);
    setInitialMapState(null);

    const categoryUrlSlug = category?.url_slug || currentSlug;

    if (continent) {
      // Navigate to continent URL
      router.push(`/${categoryUrlSlug}/${getContinentSlug(continent)}`);
    } else {
      // Navigate to base category URL (no continent)
      router.push(`/${categoryUrlSlug}`);
    }
  };

  const handleCountryChange = (newCountries: string[]) => {
    setSelectedCountries(newCountries);
    sessionStorage.removeItem(mapStateKey);
    setInitialMapState(null);

    const categoryUrlSlug = category?.url_slug || currentSlug;

    if (newCountries.length === 1) {
      // Single country - use SEO URL path with continent
      router.push(buildUrl({ continent: selectedContinent, country: newCountries[0] }));
    } else if (newCountries.length === 0) {
      // Clear country - go back to continent level (or base if no continent)
      sessionStorage.removeItem(countriesStorageKey);
      const params = new URLSearchParams(searchParams);
      params.delete("countries");
      if (selectedContinent) {
        router.push(`/${categoryUrlSlug}/${getContinentSlug(selectedContinent)}`);
      } else {
        router.push(`/${categoryUrlSlug}`);
      }
    } else {
      // Multiple countries - use query param
      const params = new URLSearchParams();
      params.set("countries", newCountries.join(","));
      if (selectedContinent) {
        router.push(`/${categoryUrlSlug}/${getContinentSlug(selectedContinent)}?${params.toString()}`);
      } else {
        router.push(`/${categoryUrlSlug}?${params.toString()}`);
      }
    }
  };

  const handleRegionChange = (regionSlugVal: string) => {
    if (regionSlugVal === "all") {
      // Clear map state when deselecting region so map resets to show broader area
      sessionStorage.removeItem(mapStateKey);
      setInitialMapState(null);
      setMapResetTrigger((t) => t + 1); // Force map to re-fit to bounds
      router.push(buildUrl({ continent: selectedContinent, country: selectedCountry }));
    } else {
      const region = regionsForCountry?.find((r) => r.region_slug === regionSlugVal);
      if (region) router.push(buildUrl({ continent: selectedContinent, country: selectedCountry, region }));
    }
  };

  const handleCityChange = (city: string) => {
    if (city === "all") {
      // Clear map state when deselecting city so map resets to show broader area
      sessionStorage.removeItem(mapStateKey);
      setInitialMapState(null);
      setMapResetTrigger((t) => t + 1); // Force map to re-fit to bounds
      router.push(buildUrl({ continent: selectedContinent, country: selectedCountry, region: selectedRegionData }));
    } else {
      router.push(buildUrl({ continent: selectedContinent, country: selectedCountry, region: selectedRegionData, city }));
    }
  };

  // Calculate display location - must be before early returns (Rules of Hooks)
  const displayLocation = useMemo(() => {
    return (
      selectedCity ||
      selectedRegionData?.region_name ||
      (selectedCountries.length === 1
        ? selectedCountries[0]
        : selectedCountries.length > 1
          ? `${selectedCountries.length} countries`
          : null) ||
      selectedContinent
    );
  }, [selectedCity, selectedRegionData, selectedCountries, selectedContinent]);

  // Build breadcrumbs - must be before early returns (Rules of Hooks)
  const breadcrumbs: BreadcrumbItem[] = useMemo(() => {
    if (!category) return [{ label: "Home", to: "/" }];
    
    const categoryUrlSlug = category.url_slug || category.slug;
    
    const baseBreadcrumbs: BreadcrumbItem[] = [
      { label: "Home", to: "/" },
    ];
    
    // If this category has a parent (it's a subcategory), skip "Categories" and go straight to parent
    if (parentCategory) {
      baseBreadcrumbs.push({
        label: parentCategory.name,
        to: `/${parentCategory.url_slug || parentCategory.slug}`,
      });
    } else {
      // Only show "Categories" for top-level categories (no parent)
      baseBreadcrumbs.push({ label: "Sectors", to: "/sectors" });
    }
    
    // Add current category
    if (displayLocation) {
      baseBreadcrumbs.push(
        { label: category.name, to: `/${categoryUrlSlug}` },
        { label: displayLocation }
      );
    } else {
      baseBreadcrumbs.push({ label: category.name });
    }
    
    return baseBreadcrumbs;
  }, [category, parentCategory, displayLocation]);

  if (categoryLoading) {
    return (
      <Layout>
        <div className="container py-4 sm:py-8">
          <div className="h-8 w-48 bg-muted animate-pulse rounded mb-4 sm:mb-8" />
          <div className="h-64 bg-muted animate-pulse rounded" />
        </div>
      </Layout>
    );
  }

  if (!category) {
    if (resourceLoading)
      return (
        <Layout>
          <div className="container py-4 sm:py-8">
            <div className="h-8 w-48 bg-muted animate-pulse rounded mb-4 sm:mb-8" />
            <div className="h-64 bg-muted animate-pulse rounded" />
          </div>
        </Layout>
      );
    if (resourceExists) return <ResourceArticle slug={currentSlug} />;
    return <NotFound />;
  }

  const categoryUrlSlug = category.url_slug || category.slug;

  return (
    <Layout hideFooter={!hasSubcategories} breadcrumbs={breadcrumbs}>
      {hasSubcategories && (
        <div className="container py-4 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold">{category.name}</h1>
            <div className="relative flex-1 min-w-0 sm:max-w-xs">
              <SearchAutocomplete />
            </div>
          </div>
          <SubcategorySidebar subcategories={subcategories} parentSlug={categoryUrlSlug} />
        </div>
      )}
      {!hasSubcategories && (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="container flex-shrink-0 py-2 border-b border-border bg-background">
            {/* H1 Title + Search */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <h1 className="text-sm sm:text-lg font-semibold truncate">
                {(() => {
                  // Check if locationSeo override matches current specificity
                  const seoMatchesSpecificity =
                    locationSeo &&
                    // SEO has city: we must have city selected
                    ((locationSeo.city && selectedCity) ||
                      // SEO has region but no city: we must have region selected
                      (locationSeo.region && !locationSeo.city && selectedRegionData) ||
                      // SEO has country only: we must have single country, no region/city
                      (locationSeo.country &&
                        !locationSeo.region &&
                        !locationSeo.city &&
                        selectedCountries.length === 1 &&
                        !selectedRegionData &&
                        !selectedCity) ||
                      // SEO is category-level (no location): no location filters
                      (!locationSeo.country && !selectedContinent && selectedCountries.length === 0));

                  // Use override if it matches specificity
                  if (seoMatchesSpecificity && locationSeo?.h1_override) {
                    return locationSeo.h1_override;
                  }

                  // Single location (city, region, or single country)
                  if (selectedCity) return `${category.name} in ${selectedCity}, ${selectedCountries[0]}`;
                  if (selectedRegionData)
                    return `${category.name} in ${selectedRegionData.region_name}, ${selectedCountries[0]}`;
                  if (selectedCountries.length === 1) return `${category.name} in ${selectedCountries[0]}`;

                  // Continent selected (with or without multiple countries)
                  if (selectedContinent) return `${category.name} in ${selectedContinent}`;

                  // Multiple countries without continent - just category name
                  if (selectedCountries.length > 1) return category.name;

                  // Default - just category name
                  return category.name;
                })()}
              </h1>
              <div className="hidden md:block w-48">
                <SearchAutocomplete />
              </div>
            </div>

            <div className="md:hidden mb-2 [&_input]:h-9 [&_input]:text-sm">
              <SearchAutocomplete placeholder="Search listings..." />
            </div>

            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-1.5 lg:gap-3 flex-nowrap">
              {selectedContinent ? (
                <button
                  onClick={() => handleContinentChange(null)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium hover:opacity-80"
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
              ) : (
                <Select value="all" onValueChange={(v) => v !== "all" && handleContinentChange(v)}>
                  <SelectTrigger className="w-[130px] h-8 text-xs px-2 hover:bg-muted">
                    <SelectValue placeholder="All Continents" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Continents</SelectItem>
                    {availableContinents.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <div className="h-4 w-px bg-border" />

              {/* Multi-select Country Filter - hide when drilled down to region or city */}
              {!selectedRegionData && !selectedCity ? (
                <CategoryCountryFilter
                  countries={filteredCountries}
                  countryCounts={countryCounts}
                  selectedCountries={selectedCountries}
                  onChange={handleCountryChange}
                />
              ) : selectedCountry ? (
                <Badge
                  variant="secondary"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 h-8 text-xs"
                >
                  {selectedCountry}
                  <button
                    onClick={() => {
                      setSelectedCountries([]);
                      sessionStorage.removeItem(mapStateKey);
                      sessionStorage.removeItem(countriesStorageKey);
                      setInitialMapState(null);
                      router.push(`/${categoryUrlSlug}`);
                    }}
                    className="ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ) : null}

              {/* Region filter - only for single country with regions */}
              {selectedCountry &&
                regionsForCountry &&
                regionsForCountry.length > 0 &&
                (selectedRegionData ? (
                  <Badge
                    variant="secondary"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 h-8 text-xs"
                  >
                    {selectedRegionData.region_name}
                    <button
                      onClick={() => handleRegionChange("all")}
                      className="ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ) : (
                  <Select value="all" onValueChange={handleRegionChange}>
                    <SelectTrigger className="w-[130px] h-8 text-xs px-2 hover:bg-muted">
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Select Region</SelectItem>
                      {regionsForCountry.map((r) => (
                        <SelectItem key={r.id} value={r.region_slug}>
                          {r.region_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ))}

              {/* City filter - only for single country, hide for city-regions */}
              {selectedCountry &&
                citiesForCountry &&
                citiesForCountry.length > 0 &&
                (selectedCity ? (
                  <Badge
                    variant="secondary"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 h-8 text-xs"
                  >
                    {selectedCity}
                    <button
                      onClick={() => handleCityChange("all")}
                      className="ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ) : (
                  <Select onValueChange={handleCityChange}>
                    <SelectTrigger className="w-[130px] h-8 text-xs px-2 hover:bg-muted">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      {citiesForCountry.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ))}

              {(selectedCountries.length > 0 || selectedRegionData || selectedCity) && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setSelectedCountries([]);
                    sessionStorage.removeItem(mapStateKey);
                    sessionStorage.removeItem(countriesStorageKey);
                    setInitialMapState(null);
                    const categoryUrlSlug = category?.url_slug || currentSlug;
                    if (selectedContinent) {
                      router.push(`/${categoryUrlSlug}/${getContinentSlug(selectedContinent)}`);
                    } else {
                      router.push(`/${categoryUrlSlug}`);
                    }
                  }}
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            {/* Mobile Filters */}
            <div className="md:hidden">
              <Collapsible open={locationFilterOpen} onOpenChange={setLocationFilterOpen}>
                <div className="flex items-center gap-2">
                  <CollapsibleTrigger className="flex-1 min-w-0">
                    <div className="flex items-center justify-between p-2.5 bg-card rounded-lg border">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm">Filter Listings</span>
                        {activeLocationFilters > 0 && (
                          <Badge variant="secondary" className="ml-1 bg-primary text-primary-foreground text-xs">
                            {activeLocationFilters}
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
                <CollapsibleContent className="mt-2">
                  <div className="p-3 bg-card border border-border rounded-lg space-y-3">
                    {/* Active filter badges - dismissible */}
                    {(selectedCountries.length > 0 || selectedRegionData || selectedCity || selectedContinent) && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {selectedContinent && (
                          <Badge variant="secondary" className="bg-primary text-primary-foreground gap-1 pr-1 text-xs">
                            {selectedContinent}
                            <button
                              onClick={() => handleContinentChange(null)}
                              className="ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        )}
                        {selectedCountries.map((c) => (
                          <Badge
                            key={c}
                            variant="secondary"
                            className="bg-primary text-primary-foreground gap-1 pr-1 text-xs"
                          >
                            {c}
                            <button
                              onClick={() => handleCountryChange(selectedCountries.filter((x) => x !== c))}
                              className="ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                        {selectedRegionData && (
                          <Badge variant="secondary" className="bg-primary text-primary-foreground gap-1 pr-1 text-xs">
                            {selectedRegionData.region_name}
                            <button
                              onClick={() => handleRegionChange("all")}
                              className="ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        )}
                        {selectedCity && (
                          <Badge variant="secondary" className="bg-primary text-primary-foreground gap-1 pr-1 text-xs">
                            {selectedCity}
                            <button
                              onClick={() => handleCityChange("all")}
                              className="ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        )}
                        {/* Clear All button - only show when countries/regions/cities are selected */}
                        {(selectedCountries.length > 0 || selectedRegionData || selectedCity) && (
                          <button
                            onClick={() => {
                              setSelectedCountries([]);
                              sessionStorage.removeItem(mapStateKey);
                              sessionStorage.removeItem(countriesStorageKey);
                              setInitialMapState(null);
                              setLocationFilterOpen(false);
                              // Navigate to continent level (preserve continent)
                              const categoryUrlSlug = category?.url_slug || currentSlug;
                              if (selectedContinent) {
                                router.push(`/${categoryUrlSlug}/${getContinentSlug(selectedContinent)}`);
                              } else {
                                router.push(`/${categoryUrlSlug}`);
                              }
                            }}
                            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 ml-1"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    )}
                    {/* Dropdowns - only show for unselected filter levels */}
                    <div className="grid grid-cols-2 gap-2">
                      {!selectedContinent && (
                        <Select value="all" onValueChange={(v) => handleContinentChange(v === "all" ? null : v)}>
                          <SelectTrigger className="h-9 text-xs">
                            <SelectValue placeholder="Continent" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Continents</SelectItem>
                            {availableContinents.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {selectedContinent && !selectedRegionData && !selectedCity && (
                        <div className="col-span-2">
                          <CategoryCountryFilter
                            countries={filteredCountries}
                            countryCounts={countryCounts}
                            selectedCountries={selectedCountries}
                            onChange={handleCountryChange}
                          />
                        </div>
                      )}
                      {!selectedContinent && !selectedRegionData && !selectedCity && (
                        <div className="col-span-1">
                          <CategoryCountryFilter
                            countries={filteredCountries}
                            countryCounts={countryCounts}
                            selectedCountries={selectedCountries}
                            onChange={handleCountryChange}
                          />
                        </div>
                      )}
                      {selectedCountry && !selectedRegionData && regionsForCountry && regionsForCountry.length > 0 && (
                        <Select value="all" onValueChange={handleRegionChange}>
                          <SelectTrigger className="h-9 text-xs">
                            <SelectValue placeholder="Region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Regions</SelectItem>
                            {regionsForCountry.map((r) => (
                              <SelectItem key={r.id} value={r.region_slug}>
                                {r.region_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {selectedCountry &&
                        !selectedCity &&
                        citiesForCountry &&
                        citiesForCountry.length > 0 && (
                          <Select onValueChange={handleCityChange}>
                            <SelectTrigger className="h-9 text-xs">
                              <SelectValue placeholder="City" />
                            </SelectTrigger>
                            <SelectContent>
                              {citiesForCountry.map((c) => (
                                <SelectItem key={c} value={c}>
                                  {c}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* Main Content */}
          <div className="container flex-1 flex gap-4 min-h-0 overflow-hidden py-4">
            <div className={cn("flex-1 flex flex-col min-h-0", viewMode === "map" && "hidden md:flex")}>
              {listingsLoading ? (
                <div className="space-y-1.5 overflow-hidden">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-14 bg-card border rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : !listings || listings.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No listings found</p>
                  <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
                  {activeLocationFilters > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedCountries([]);
                        sessionStorage.removeItem(mapStateKey);
                        sessionStorage.removeItem(countriesStorageKey);
                        setInitialMapState(null);
                        router.push(`/${categoryUrlSlug}`);
                      }}
                      className="mt-4"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  <div className="px-3 py-2 bg-card border rounded-lg mb-3 flex-shrink-0">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-sm font-medium flex-1 min-w-0">
                        <span className="text-muted-foreground">
                          {visibleListings.length === listings.length
                            ? `${listings.length} listing${listings.length !== 1 ? "s" : ""}`
                            : `${visibleListings.length} of ${listings.length} in view`}
                        </span>
                        <span className="mx-1.5 text-muted-foreground">—</span>
                        <span className="text-foreground">
                          {locationSeo?.h2_override ||
                            injectLocation(category.seo_h2_override) ||
                            `${category.name} Companies${locationSuffix}`}
                        </span>
                      </h2>
                      {visibleListings.length < listings.length && (
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
                  <VirtualListingList
                    listings={visibleListings}
                    highlightedListingId={highlightedListingId}
                    onHoverListing={handleHoverListing}
                    onFlyToListing={handleFlyToListing}
                    locationMode={locationMode}
                    className="flex-1 min-h-0 pr-2"
                    categoryName={category.name}
                    categorySlug={categoryUrlSlug}
                    locationName={displayLocation || undefined}
                    referrerPath={pathname}
                    onScroll={() => setLocationFilterOpen(false)}
                    initialScrollTop={initialScrollTop}
                    onScrollPositionChange={handleScrollPositionChange}
                    footer={
                      <section className="pt-4 border-t border-border">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          {locationSeo?.about_heading || `About ${category.name}${locationSuffix}`}
                        </h3>
                        {locationSeo?.about_content ? (
                          <div
                            className="text-xs text-muted-foreground/80 leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(locationSeo.about_content) }}
                          />
                        ) : (
                          <p className="text-xs text-muted-foreground/80 leading-relaxed">
                            {selectedCity
                              ? `Discover ${category.name.toLowerCase()} companies in ${selectedCity}. Browse our directory to find the best ${category.name.toLowerCase()} services and solutions for your needs.`
                              : selectedRegionName
                                ? `Explore ${category.name.toLowerCase()} companies across ${selectedRegionName}. Our directory features leading businesses in the ${category.name.toLowerCase()} sector.`
                                : selectedCountry
                                  ? `Find top ${category.name.toLowerCase()} companies in ${selectedCountry}. Browse our comprehensive directory of ${category.name.toLowerCase()} businesses and services.`
                                  : `Browse our directory of ${category.name.toLowerCase()} companies. Find the best ${category.name.toLowerCase()} services and solutions from industry-leading businesses worldwide.`}
                          </p>
                        )}
                      </section>
                    }
                  />
                </>
              )}
            </div>
            <div
              className={cn(
                "flex-1 rounded-lg overflow-hidden min-h-0 h-full",
                viewMode === "list" && "hidden md:block",
              )}
            >
              <Suspense fallback={<MapLoadingFallback />}>
                <ListingsMap
                  listings={listings || []}
                  selectedListing={selectedMapListing}
                  onSelectListing={handleMapListingSelect}
                  highlightedListingId={highlightedListingId}
                  onBoundsChange={handleBoundsChange}
                  initialState={initialMapState}
                  resetTrigger={mapResetTrigger}
                  flyToLocation={flyToLocation}
                />
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}