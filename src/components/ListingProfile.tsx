'use client';

import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useMemo } from "react";
import { Layout, BreadcrumbItem } from "@/components/Layout";
import { TierBadge } from "@/components/TierBadge";
import { Button } from "@/components/ui/button";
import { useListingBySlug, useListingCategories } from "@/hooks/useListings";
import { useListingPhotos } from "@/hooks/useListingPhotos";
import { usePrimaryCategory } from "@/hooks/usePrimaryCategory";
import { useRegions } from "@/hooks/useRegions";
import { useListingContacts } from "@/hooks/useListingContacts";
import { MapPin, Globe, Phone, ChevronRight, ArrowLeft, Building2, Mail } from "lucide-react";

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
import { buildVenueProfileUrl } from "@/lib/buildVenueUrl";
import { formatPhoneForTelLink, formatPhoneForDisplay } from "@/lib/phoneUtils";

const SITE_URL = "https://www.showcase-music.com";
const SITE_NAME = "Showcase Music Directory";

export default function ListingProfile({
  initialListing,
  initialCategories,
  initialPhotos,
  initialContacts,
  initialPrimaryCategory,
  initialRegions,
}: {
  initialListing?: any;
  initialCategories?: any[];
  initialPhotos?: any[];
  initialContacts?: any[];
  initialPrimaryCategory?: any;
  initialRegions?: any[];
} = {}) {
  const { slug } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromVenues = searchParams?.get("from") === "venues";

  // Referrer context for breadcrumbs (passed when clicking from category listings)
  const refCategory = searchParams?.get("cat"); // Category name
  const refSlug = searchParams?.get("slug"); // Category slug
  const refLocation = searchParams?.get("loc"); // Location name (e.g., "California")
  const referrerPath = searchParams?.get("ref"); // Full path back to listings (e.g., /backline-hire/europe/bulgaria/sofia)
  const refCategorySlug = refSlug; // Using refSlug as the category slug for breadcrumbs
  const refPath = referrerPath; // Using referrerPath as the full path back


  const { data: listing, isLoading } = useListingBySlug(slug || "", initialListing);
  const { data: categories = [] } = useListingCategories(listing?.id, initialCategories);
  const { data: primaryCategory } = usePrimaryCategory(listing?.primary_category_id, initialPrimaryCategory);
  const { data: photos = [] } = useListingPhotos(listing?.id, initialPhotos);
  const { data: contacts = [] } = useListingContacts(listing?.id, listing?.show_contacts || false, initialContacts);
  const trackedRef = useRef<string | null>(null);

  // Fetch regions for the listing's country to get region_slug
  const listingCountry = (listing as any)?.country || null;
  const listingRegionId = (listing as any)?.region_id;
  const { data: regions, isLoading: regionsLoading } = useRegions(listingCountry, initialRegions);

  // Find the region slug for this listing
  const regionSlug = useMemo(() => {
    if (!listingRegionId || !regions) return null;
    const region = regions.find((r) => r.id === listingRegionId);
    return region?.region_slug || null;
  }, [listingRegionId, regions]);

  // Redirect to venue URL if this is a venue
  useEffect(() => {
    if (!listing || isLoading) return;

    const venueType = (listing as any)?.venue_type;
    if (venueType && listing.country) {
      // Wait for regions to load if this listing has a region_id
      if (listingRegionId && regionsLoading) return;

      // Build the proper venue URL and redirect
      const venueUrl = buildVenueProfileUrl({
        slug: listing.slug,
        country: listing.country,
        regionSlug: regionSlug,
        city: listing.town_city,
      });

      // Only redirect if not already at a venue URL
      if (!venueUrl.startsWith("/listing/")) {
        router.replace(venueUrl);
        return;
      }
    }
  }, [listing, isLoading, listingRegionId, regionsLoading, regionSlug, router]);

  // Track listing view on page mount (for all tiers now)
  useEffect(() => {
    if (listing && trackedRef.current !== listing.id) {
      trackedRef.current = listing.id;
      trackListingView(listing.id);
    }
  }, [listing]);

  const handleLinkClick = (linkType: string, linkUrl?: string) => {
    if (listing) {
      trackLinkClick(listing.id, linkType, linkUrl);
    }
  };

  // Build breadcrumbs for header (safe for null listing)
  const headerBreadcrumbs: BreadcrumbItem[] = useMemo(() => {
    const crumbs: BreadcrumbItem[] = [
      { label: "Home", to: "/" },
      { label: "Sectors", to: "/sectors" },
    ];

    // If we have referrer context (came from a category listing), show full path
    if (refCategory && refCategorySlug) {
      // Add nav=1 to reset map state when clicking breadcrumb
      crumbs.push({ label: refCategory, to: `/${refCategorySlug}?nav=1` });

      if (refLocation && refPath) {
        // Link location back to the full referrer path with nav=1 to reset map
        crumbs.push({ label: refLocation, to: `${refPath}?nav=1` });
      } else if (refLocation) {
        // No path available, just show as text
        crumbs.push({ label: refLocation });
      }
      // Current page - use listing name if available
      if (listing?.name) {
        crumbs.push({ label: listing.name });
      }
    } else if (listing?.name) {
      // Direct landing - just show company name
      crumbs.push({ label: listing.name });
    }

    return crumbs;
  }, [refCategory, refCategorySlug, refLocation, refPath, listing?.name]);

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

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-6">
          <div className="h-9 w-20 bg-muted animate-pulse rounded mb-4 sm:mb-6" />

          {/* Hero Section Skeleton */}
          <div className="bg-card rounded-lg border overflow-hidden mb-4 sm:mb-6">
            <div className="p-6 sm:p-8">
              <div className="max-w-5xl mx-auto">
                {/* Mobile skeleton */}
                <div className="md:hidden flex flex-col items-center space-y-4">
                  <div className="w-40 h-40 bg-muted animate-pulse rounded-lg" />
                  <div className="w-48 h-8 bg-muted animate-pulse rounded" />
                  <div className="w-32 h-6 bg-muted animate-pulse rounded" />
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
                    <div className="h-6 w-48 bg-muted animate-pulse rounded" />
                    <div className="flex gap-2">
                      <div className="h-10 w-40 bg-muted animate-pulse rounded" />
                      <div className="h-10 w-32 bg-muted animate-pulse rounded" />
                      <div className="h-10 w-10 bg-muted animate-pulse rounded" />
                      <div className="h-10 w-10 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                </div>

                {/* Category badges skeleton */}
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="flex gap-2">
                    <div className="h-6 w-24 bg-muted animate-pulse rounded-full" />
                    <div className="h-6 w-32 bg-muted animate-pulse rounded-full" />
                    <div className="h-6 w-28 bg-muted animate-pulse rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Main content skeleton */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
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

  if (!listing) {
    return (
      <Layout>
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-4">Listing not found</h1>
          <Link href="/directory" className="text-primary hover:underline">
            Back to directory
          </Link>
        </div>
      </Layout>
    );
  }

  // If we're about to redirect, show loading skeleton
  const venueType = (listing as any)?.venue_type;
  if (venueType && listing.country) {
    return (
      <Layout>
        <div className="container py-6">
          <div className="h-9 w-20 bg-muted animate-pulse rounded mb-4" />
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="max-w-5xl mx-auto flex gap-6">
                <div className="w-48 h-48 bg-muted animate-pulse rounded-lg shrink-0" />
                <div className="flex-1 space-y-4">
                  <div className="h-8 w-64 bg-muted animate-pulse rounded" />
                  <div className="h-6 w-48 bg-muted animate-pulse rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout breadcrumbs={headerBreadcrumbs}>
      <div className="container py-6">
        <Button variant="ghost" size="sm" className="mb-4 sm:mb-6" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Hero Section with Logo and Company Info - Compact Layout */}
        <div className="bg-card rounded-lg border overflow-hidden mb-4 sm:mb-6">
          <div className={`p-6 sm:p-8 ${getGradientClasses(listing.tier)}`}>
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                {/* Logo Display */}
                {listing.logo_url && (
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg overflow-hidden bg-white border-2 shadow-lg flex items-center justify-center shrink-0">
                    <img
                      src={listing.logo_url}
                      alt={`${listing.name} logo`}
                      className="w-full h-full object-contain p-3"
                    />
                  </div>
                )}

                {/* Company Information */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold">{listing.name}</h1>
                    <TierBadge tier={listing.tier} showLabel />
                  </div>

                  {/* Primary Contact Info */}
                  <div className="flex flex-wrap gap-3 mb-3 text-sm">
                    {listing.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-4 w-4 text-primary" />
                        <a
                          href={`tel:${formatPhoneForTelLink(listing.phone, listing.country)}`}
                          className="hover:text-primary transition-colors font-medium"
                          onClick={() => handleLinkClick("phone", listing.phone || undefined)}
                        >
                          {formatPhoneForDisplay(listing.phone, listing.country)}
                        </a>
                      </div>
                    )}
                    {(listing.town_city || listing.country) && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-medium">
                          {[listing.town_city, listing.country].filter(Boolean).join(", ")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {listing.website && (
                      <Button
                        size="default"
                        asChild
                        onClick={() => handleLinkClick("website", listing.website || undefined)}
                      >
                        <a
                          href={listing.website.startsWith("http") ? listing.website : `https://${listing.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Website
                        </a>
                      </Button>
                    )}
                    {listing.email && (
                      <ContactFormDialog
                        listingId={listing.id}
                        listingName={listing.name}
                        listingEmail={listing.email}
                        trigger={
                          <Button variant="outline" size="default">
                            <Mail className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                        }
                      />
                    )}
                    <ShareButton businessName={listing.name} size="default" variant="outline" />
                    <FavouriteButton listingId={listing.id} size="default" variant="outline" />
                  </div>
                </div>
              </div>

              {/* Category badges - Now in its own row below logo and contact info */}
              {categories.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border/50">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Our Areas of Expertise
                  </h3>
                  <CategoryBadges categories={categories} primaryCategoryId={listing.primary_category_id} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 order-last lg:order-first">
            {/* About Section */}
            {(listing.description || listing.year_established) && (
              <div className="bg-card rounded-lg border overflow-hidden">
                <div
                  className={`px-6 py-4 border-b ${listing.tier === "premier" ? "bg-primary/5" : listing.tier === "enhanced" ? "bg-cyan-500/5" : "bg-gray-500/5"}`}
                >
                  <h2 className="text-lg font-semibold">About</h2>
                </div>

                <div className="p-6">
                  {/* Business Info */}
                  {listing.year_established && (
                    <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b">
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="h-4 w-4 text-primary" />
                        <span className="font-medium">Established {listing.year_established}</span>
                      </div>
                    </div>
                  )}

                  {listing.description && (
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-wrap leading-relaxed">{listing.description}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Photo Gallery - Premier and Enhanced only */}
            {(listing.tier === "premier" || listing.tier === "enhanced") && <PhotoGallery photos={photos} />}

            {/* Location Map */}
            <LocationMap listing={listing} />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-40 lg:self-start order-first lg:order-last">
            {/* Contact Information Card */}
            <div className="bg-card rounded-lg border overflow-hidden">
              <div
                className={`px-6 py-4 border-b ${listing.tier === "premier" ? "bg-primary/5" : listing.tier === "enhanced" ? "bg-cyan-500/5" : "bg-gray-500/5"}`}
              >
                <h2 className="text-lg font-semibold">Contact Information</h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Company Name */}
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Company:</div>
                  <div className="font-medium">{listing.name}</div>
                </div>

                {/* Address */}
                {(listing.address || listing.town_city || listing.country) && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Address:</div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <div className="text-sm">
                        {listing.address && <div>{listing.address}</div>}
                        <div>{[listing.town_city, listing.country].filter(Boolean).join(", ")}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Phone */}
                {listing.phone && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Phone:</div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary shrink-0" />
                      <a
                        href={`tel:${formatPhoneForTelLink(listing.phone, listing.country)}`}
                        className="hover:text-primary transition-colors text-sm font-medium"
                        onClick={() => handleLinkClick("phone", listing.phone || undefined)}
                      >
                          {formatPhoneForDisplay(listing.phone, listing.country)}
                        </a>
                    </div>
                  </div>
                )}

                {/* Action Buttons - Website and Contact only, NO display of URL or email */}
                <div className="pt-4 border-t space-y-2">
                  {listing.website && (
                    <Button className="w-full" asChild>
                      <a
                        href={listing.website.startsWith("http") ? listing.website : `https://${listing.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleLinkClick("website", listing.website || undefined)}
                      >
                        Visit Our Website
                        <Globe className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  )}

                  {listing.email && (
                    <ContactFormDialog
                      listingId={listing.id}
                      listingName={listing.name}
                      listingEmail={listing.email}
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
                      listingId={listing.id}
                      listingName={listing.name}
                      listingCountry={listing.country}
                  onLinkClick={handleLinkClick}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            <SocialLinks listing={listing} onLinkClick={handleLinkClick} />

            {/* Claim This Listing */}
            <div className="bg-card rounded-lg border p-6">
              <ClaimListingDialog listingId={listing.id} listingName={listing.name} />
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}