'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useMemo, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout, BreadcrumbItem } from "@/components/Layout";
import { TierBadge } from "@/components/TierBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ArrowLeft, MapPin, Globe, Phone, Mail, Building2, Users } from "lucide-react";
import { getContinentFromSlug } from "@/lib/continents";
import { slugToCountry } from "@/lib/countryAliases";
import NotFound from "./NotFound";
import { ListingPhoto } from "@/types/database";

import { CategoryBadges } from "@/components/listing/CategoryBadges";
import { SocialLinks } from "@/components/listing/SocialLinks";
import { PhotoGallery } from "@/components/listing/PhotoGallery";
import { LocationMap } from "@/components/listing/LocationMap";
import { ContactsList } from "@/components/listing/ContactsList";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { trackListingView, trackLinkClick } from "@/hooks/useAnalytics";
import { FavouriteButton } from "@/components/FavouriteButton";
import { ShareButton } from "@/components/ShareButton";
import { ClaimListingDialog } from "@/components/ClaimListingDialog";
import { useListingContacts } from "@/hooks/useListingContacts";

const SITE_URL = "https://www.showcase-music.com";
const SITE_NAME = "Showcase Music Directory";

export default function VenueProfile() {
  const router = useRouter();
  // Support both naming conventions from different routes
  const {
    continentSlug,
    countrySlug,
    // Named params (5-segment and 4-segment city routes)
    region: regionParam,
    city: cityParam,
    venue: venueParam,
    // Positional params (legacy/fallback)
    param3,
    param4,
    param5,
  } = useParams();
  const trackedRef = useRef<string | null>(null);

  // Resolve continent
  const continent = continentSlug ? getContinentFromSlug(continentSlug) : null;

  // Get all venue countries to resolve slug
  const { data: countriesData, isLoading: isLoadingCountries } = useQuery({
    queryKey: ["venue-countries-list"],
    queryFn: async () => {
      const { data } = await supabase
        .from("listings")
        .select("country")
        .not("venue_type", "is", null)
        .not("country", "is", null);
      return [...new Set(data?.map((d) => d.country).filter(Boolean))] as string[];
    },
  });

  const country = useMemo(() => {
    if (!countrySlug || !countriesData) return null;
    return slugToCountry(countrySlug, countriesData);
  }, [countrySlug, countriesData]);

  // Map country name to what's stored in regions table
  const getRegionCountryCode = (countryName: string): string => {
    const mapping: Record<string, string> = {
      "United Kingdom": "UK",
      "United States": "USA",
    };
    return mapping[countryName] || countryName;
  };

  // Parse URL params based on route structure
  // Routes now use named params (region, city, venue) but fallback to positional params
  const { regionSlug, citySlug, venueSlug } = useMemo(() => {
    // Named params take precedence (from new route structure)
    if (venueParam) {
      // Route: /venues/:continentSlug/:countrySlug/:region/:city/:venue (5-segment)
      // OR Route: /venues/:continentSlug/:countrySlug/:city/:venue (4-segment without region)
      return {
        regionSlug: regionParam || null,
        citySlug: cityParam || null,
        venueSlug: venueParam,
      };
    }

    // Fallback to positional params (legacy routes)
    if (param5) {
      // 5-segment URL: /continent/country/region/city/venue
      return { regionSlug: param3, citySlug: param4, venueSlug: param5 };
    } else if (param4) {
      // 4-segment URL: /continent/country/city/venue (countries without regions)
      return { regionSlug: null, citySlug: param3, venueSlug: param4 };
    } else {
      // 3-segment URL: /continent/country/venue (unlikely but handle it)
      return { regionSlug: null, citySlug: null, venueSlug: param3 };
    }
  }, [regionParam, cityParam, venueParam, param3, param4, param5]);

  // Fetch region data only if we have a regionSlug
  const { data: regionData, isLoading: isLoadingRegion } = useQuery({
    queryKey: ["region-data", regionSlug, country],
    queryFn: async () => {
      if (!regionSlug || !country) return null;

      const regionCountry = getRegionCountryCode(country);

      const { data } = await supabase
        .from("regions")
        .select("id, region_name, region_slug")
        .eq("region_slug", regionSlug)
        .eq("country", regionCountry)
        .maybeSingle();

      return data;
    },
    enabled: !!regionSlug && !!country,
  });

  // Fetch the venue by slug
  const {
    data: venue,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["venue-profile", venueSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("listings")
        .select(
          `
          *,
          regions (
            region_name,
            region_slug
          ),
          listing_categories (
            category:categories (
              id,
              name,
              slug
            )
          ),
          listing_photos (
            id,
            photo_url,
            caption,
            is_hero,
            display_order
          )
        `,
        )
        .eq("slug", venueSlug || "")
        .eq("is_active", true)
        .not("venue_type", "is", null)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!venueSlug,
  });

  // Track listing view on page mount
  useEffect(() => {
    if (venue && trackedRef.current !== venue.id) {
      trackedRef.current = venue.id;
      trackListingView(venue.id);
    }
  }, [venue]);

  const handleLinkClick = (linkType: string, linkUrl?: string) => {
    if (venue) {
      trackLinkClick(venue.id, linkType, linkUrl);
    }
  };

  // Resolve city from venue data
  const city = venue?.town_city || null;

  // Extract categories from the nested structure
  const categories = useMemo(() => {
    if (!venue?.listing_categories) return [];
    return venue.listing_categories.map((lc: any) => lc.category).filter(Boolean);
  }, [venue]);

  // Extract photos - cast to ListingPhoto type
  const photos: ListingPhoto[] = useMemo(() => {
    if (!venue?.listing_photos) return [];
    return venue.listing_photos
      .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
      .map((p: any) => ({
        id: p.id,
        listing_id: venue.id,
        photo_url: p.photo_url,
        caption: p.caption,
        display_order: p.display_order || 0,
        is_hero: p.is_hero || false,
        created_at: "",
      }));
  }, [venue]);

  // Fetch contacts for the venue
  const { data: contacts = [] } = useListingContacts(venue?.id, venue?.show_contacts || false);

  // Loading state - wait for region check to complete before determining URL structure
  const isLoadingParams = isLoadingCountries || (param3 && country && isLoadingRegion);

  if (isLoadingParams || isLoading) {
    return (
      <Layout>
        <div className="container py-4 sm:py-8">
          <div className="h-9 w-20 bg-muted animate-pulse rounded mb-3 sm:mb-4" />

          {/* Hero Section Skeleton */}
          <div className="bg-card rounded-lg border overflow-hidden mb-4 sm:mb-6">
            <div className="p-6 sm:p-8">
              <div className="max-w-5xl mx-auto">
                {/* Mobile skeleton */}
                <div className="md:hidden flex flex-col items-center space-y-4">
                  <div className="w-40 h-40 bg-muted animate-pulse rounded-lg" />
                  <div className="w-48 h-8 bg-muted animate-pulse rounded" />
                  <div className="flex gap-2">
                    <div className="w-20 h-6 bg-muted animate-pulse rounded-full" />
                    <div className="w-28 h-6 bg-muted animate-pulse rounded-full" />
                  </div>
                  <div className="w-64 h-4 bg-muted animate-pulse rounded" />
                  <div className="flex gap-2 w-full">
                    <div className="flex-1 h-10 bg-muted animate-pulse rounded" />
                    <div className="flex-1 h-10 bg-muted animate-pulse rounded" />
                    <div className="h-10 w-10 bg-muted animate-pulse rounded" />
                    <div className="h-10 w-10 bg-muted animate-pulse rounded" />
                  </div>
                </div>

                {/* Desktop skeleton */}
                <div className="hidden md:flex gap-6">
                  <div className="w-48 h-48 bg-muted animate-pulse rounded-lg shrink-0" />
                  <div className="flex-1 space-y-4">
                    <div className="h-8 w-64 bg-muted animate-pulse rounded" />
                    <div className="flex gap-2">
                      <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
                      <div className="h-6 w-32 bg-muted animate-pulse rounded-full" />
                    </div>
                    <div className="h-6 w-48 bg-muted animate-pulse rounded" />
                    <div className="flex gap-2">
                      <div className="h-10 w-40 bg-muted animate-pulse rounded" />
                      <div className="h-10 w-32 bg-muted animate-pulse rounded" />
                      <div className="h-10 w-10 bg-muted animate-pulse rounded" />
                      <div className="h-10 w-10 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Main content skeleton */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 order-last lg:order-first">
              <div className="bg-card rounded-lg border p-6">
                <div className="h-6 w-32 bg-muted animate-pulse rounded mb-4" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted animate-pulse rounded" />
                  <div className="h-4 w-full bg-muted animate-pulse rounded" />
                  <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                </div>
              </div>
              <div className="bg-card rounded-lg border p-6">
                <div className="h-6 w-32 bg-muted animate-pulse rounded mb-4" />
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar skeleton */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border p-6">
                <div className="h-6 w-40 bg-muted animate-pulse rounded mb-4" />
                <div className="space-y-4">
                  <div className="h-4 w-full bg-muted animate-pulse rounded" />
                  <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-full bg-muted animate-pulse rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Not found
  if (!venue || error) {
    return <NotFound />;
  }

  // Build breadcrumb data for header
  const headerBreadcrumbs: BreadcrumbItem[] = [
    { label: "Home", to: "/" },
    { label: "Venues", to: "/venues" },
  ];

  if (continent && continentSlug) {
    headerBreadcrumbs.push({
      label: continent,
      to: `/venues/${continentSlug}`,
    });
  }

  if (country && countrySlug) {
    headerBreadcrumbs.push({
      label: country,
      to: `/venues/${continentSlug}/${countrySlug}`,
    });
  }

  if (regionData && regionSlug) {
    headerBreadcrumbs.push({
      label: regionData.region_name,
      to: `/venues/${continentSlug}/${countrySlug}/${regionSlug}`,
    });
  }

  if (city && citySlug) {
    const cityPath = regionSlug
      ? `/venues/${continentSlug}/${countrySlug}/${regionSlug}/${citySlug}`
      : `/venues/${continentSlug}/${countrySlug}/${citySlug}`;
    headerBreadcrumbs.push({
      label: city,
      to: cityPath,
    });
  }

  // Current page - no link
  headerBreadcrumbs.push({
    label: venue.name,
  });

  // Keep original breadcrumbs format for schema markup
  const breadcrumbs = headerBreadcrumbs.map((b) => ({
    label: b.label,
    href: b.to || null,
  }));

  // Build canonical URL
  const canonicalParts = ["/venues", continentSlug, countrySlug];
  if (regionSlug) canonicalParts.push(regionSlug);
  if (citySlug) canonicalParts.push(citySlug);
  if (venueSlug) canonicalParts.push(venueSlug);

  // Schema markup for the venue
  const venueSchema = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: venue.name,
    description: venue.short_description || venue.description || undefined,
    url: canonicalUrl,
    ...(venue.venue_capacity && { maximumAttendeeCapacity: venue.venue_capacity }),
    ...(venue.logo_url && { image: venue.logo_url }),
    ...((venue.address || city || country) && {
      address: {
        "@type": "PostalAddress",
        ...(venue.address && { streetAddress: venue.address }),
        ...(city && { addressLocality: city }),
        ...(country && { addressCountry: country }),
      },
    }),
    ...(venue.latitude &&
      venue.longitude && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: Number(venue.latitude),
          longitude: Number(venue.longitude),
        },
      }),
    ...(venue.website && { sameAs: venue.website }),
    ...(venue.phone && { telephone: venue.phone }),
    ...(venue.email && { email: venue.email }),
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: crumb.href ? `${SITE_URL}${crumb.href}` : undefined,
    })),
  };

  // Format capacity for display
  const formatCapacity = (cap: number) => {
    if (cap >= 1000) {
      return `${(cap / 1000).toFixed(cap % 1000 === 0 ? 0 : 1)}k`;
    }
    return cap.toLocaleString();
  };

  // Get gradient classes based on tier
  const getGradientClasses = (tier: string) => {
    switch (tier) {
      case "premier":
        return "bg-gradient-to-br from-primary/5 to-primary/10";
      case "enhanced":
        return "bg-gradient-to-br from-cyan-500/5 to-cyan-600/10";
      default:
        return "bg-gradient-to-br from-gray-500/5 to-gray-600/10";
    }
  };

  // Get header background based on tier
  const getHeaderBg = (tier: string) => {
    switch (tier) {
      case "premier":
        return "bg-primary/5";
      case "enhanced":
        return "bg-cyan-500/5";
      default:
        return "bg-gray-500/5";
    }
  };

  return (
    <Layout breadcrumbs={headerBreadcrumbs}>
      {/* Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(venueSchema) }}
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container py-4 sm:py-8">
        <Button variant="ghost" size="sm" className="mb-3 sm:mb-4" onClick={() => router.push(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Hero Section with Logo and Venue Info */}
        <div className="bg-card rounded-lg border overflow-hidden mb-4 sm:mb-6">
          <div className={`p-6 sm:p-8 ${getGradientClasses(venue.tier)}`}>
            <div className="max-w-5xl mx-auto">
              {/* Mobile Layout: Centered Logo with Venue Info Below */}
              <div className="md:hidden flex flex-col items-center text-center space-y-4">
                {/* Centered Logo */}
                {venue.logo_url && (
                  <div className="w-40 h-40 rounded-lg overflow-hidden bg-white border-2 shadow-lg flex items-center justify-center">
                    <img src={venue.logo_url} alt={`${venue.name} logo`} className="w-full h-full object-contain p-4" />
                  </div>
                )}

                {/* Venue Name and Tier */}
                <div>
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold">{venue.name}</h1>
                    <TierBadge tier={venue.tier} showLabel />
                  </div>

                  {/* Venue meta badges */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
                    {venue.venue_type && <Badge variant="secondary">{venue.venue_type}</Badge>}
                    {venue.venue_capacity && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {formatCapacity(venue.venue_capacity)} capacity
                      </Badge>
                    )}
                  </div>

                  {venue.short_description && (
                    <p className="text-base text-muted-foreground mb-4">{venue.short_description}</p>
                  )}
                </div>

                {/* Primary Contact Info */}
                <div className="flex flex-col items-center gap-2 text-sm">
                  {venue.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <a
                        href={`tel:${venue.phone}`}
                        className="hover:text-primary transition-colors font-medium"
                        onClick={() => handleLinkClick("phone", venue.phone || undefined)}
                      >
                        {venue.phone}
                      </a>
                    </div>
                  )}
                  {(city || country) && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">{[city, country].filter(Boolean).join(", ")}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons - Keep Contact/Share/Favorite together */}
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  {venue.website && (
                    <Button
                      size="default"
                      className="w-full sm:w-auto"
                      asChild
                      onClick={() => handleLinkClick("website", venue.website || undefined)}
                    >
                      <a
                        href={venue.website.startsWith("http") ? venue.website : `https://${venue.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Website
                      </a>
                    </Button>
                  )}
                  {venue.email && (
                    <ContactFormDialog
                      listingId={venue.id}
                      listingName={venue.name}
                      listingEmail={venue.email}
                      trigger={
                        <Button variant="outline" size="default" className="w-full sm:w-auto">
                          <Mail className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      }
                    />
                  )}
                  <div className="flex gap-2 justify-center sm:justify-start">
                    <ShareButton businessName={venue.name} size="default" variant="outline" />
                    <FavouriteButton listingId={venue.id} size="default" variant="outline" />
                  </div>
                </div>
              </div>

              {/* Desktop Layout: Original Side-by-Side */}
              <div className="hidden md:flex flex-row items-start gap-6">
                {/* Large Logo Display */}
                {venue.logo_url && (
                  <div className="w-48 h-48 rounded-lg overflow-hidden bg-white border-2 shadow-lg flex items-center justify-center shrink-0">
                    <img src={venue.logo_url} alt={`${venue.name} logo`} className="w-full h-full object-contain p-4" />
                  </div>
                )}

                {/* Venue Information */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold">{venue.name}</h1>
                    <TierBadge tier={venue.tier} showLabel />
                  </div>

                  {/* Venue meta badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {venue.venue_type && <Badge variant="secondary">{venue.venue_type}</Badge>}
                    {venue.venue_capacity && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {formatCapacity(venue.venue_capacity)} capacity
                      </Badge>
                    )}
                  </div>

                  {venue.short_description && (
                    <p className="text-base text-muted-foreground mb-4">{venue.short_description}</p>
                  )}

                  {/* Primary Contact Info */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm">
                    {venue.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <a
                          href={`tel:${venue.phone}`}
                          className="hover:text-primary transition-colors font-medium"
                          onClick={() => handleLinkClick("phone", venue.phone || undefined)}
                        >
                          {venue.phone}
                        </a>
                      </div>
                    )}
                    {(city || country) && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-medium">{[city, country].filter(Boolean).join(", ")}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {venue.website && (
                      <Button
                        size="default"
                        asChild
                        onClick={() => handleLinkClick("website", venue.website || undefined)}
                      >
                        <a
                          href={venue.website.startsWith("http") ? venue.website : `https://${venue.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Visit Our Website
                        </a>
                      </Button>
                    )}
                    {venue.email && (
                      <ContactFormDialog
                        listingId={venue.id}
                        listingName={venue.name}
                        listingEmail={venue.email}
                        trigger={
                          <Button variant="outline" size="default">
                            <Mail className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                        }
                      />
                    )}
                    <ShareButton businessName={venue.name} size="default" variant="outline" />
                    <FavouriteButton listingId={venue.id} size="default" variant="outline" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:items-start">
          {/* Main Content - order-last on mobile to show after contact info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 order-last lg:order-first">
            {/* About Section */}
            {(venue.description || venue.year_established) && (
              <div className="bg-card rounded-lg border overflow-hidden">
                <div className={`px-6 py-4 border-b ${getHeaderBg(venue.tier)}`}>
                  <h2 className="text-lg font-semibold">About</h2>
                </div>

                <div className="p-6">
                  {venue.year_established && (
                    <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b">
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="h-4 w-4 text-primary" />
                        <span className="font-medium">Established {venue.year_established}</span>
                      </div>
                    </div>
                  )}

                  {venue.description && (
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-wrap leading-relaxed">{venue.description}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Photo Gallery - Premier and Enhanced only */}
            {(venue.tier === "premier" || venue.tier === "enhanced") && <PhotoGallery photos={photos} />}

            {/* Location Map */}
            <LocationMap listing={venue} />
          </div>

          {/* Sidebar - order-first on mobile to show contact info before map */}
          <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-40 lg:self-start order-first lg:order-last">
            {/* Contact Information Card */}
            <div className="bg-card rounded-lg border overflow-hidden">
              <div className={`px-6 py-4 border-b ${getHeaderBg(venue.tier)}`}>
                <h2 className="text-lg font-semibold">Contact Information</h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Venue Name */}
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Venue:</div>
                  <div className="font-medium">{venue.name}</div>
                </div>

                {/* Address */}
                {(venue.address || city || country) && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Address:</div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <div className="text-sm">
                        {venue.address && <div>{venue.address}</div>}
                        <div>{[city, country].filter(Boolean).join(", ")}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Phone */}
                {venue.phone && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Phone:</div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary shrink-0" />
                      <a
                        href={`tel:${venue.phone}`}
                        className="hover:text-primary transition-colors text-sm font-medium"
                        onClick={() => handleLinkClick("phone", venue.phone || undefined)}
                      >
                        {venue.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Action Buttons - Website and Contact only, NO display of URL or email */}
                <div className="pt-4 border-t space-y-2">
                  {venue.website && (
                    <Button className="w-full" asChild>
                      <a
                        href={venue.website.startsWith("http") ? venue.website : `https://${venue.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleLinkClick("website", venue.website || undefined)}
                      >
                        Visit Our Website
                        <Globe className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  )}

                  {venue.email && (
                    <ContactFormDialog
                      listingId={venue.id}
                      listingName={venue.name}
                      listingEmail={venue.email}
                      trigger={
                        <Button variant="outline" className="w-full">
                          <Mail className="h-4 w-4 mr-2" />
                          Contact This Company
                        </Button>
                      }
                    />
                  )}
                </div>

                {/* Key Contacts */}
                {contacts.length > 0 && (
                  <div className="pt-4 border-t">
                    <div className="text-sm font-medium text-muted-foreground mb-3">Key Contacts:</div>
                    <ContactsList
                      contacts={contacts}
                      listingId={venue.id}
                      listingName={venue.name}
                      onLinkClick={handleLinkClick}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            <SocialLinks listing={venue} onLinkClick={handleLinkClick} />

            {/* Claim This Listing */}
            <div className="bg-card rounded-lg border p-6">
              <ClaimListingDialog listingId={venue.id} listingName={venue.name} />
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
