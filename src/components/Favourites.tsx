'use client';

import Link from 'next/link';
import { Layout } from "@/components/Layout";
import { useFavourites } from "@/hooks/useFavourites";
import { useListingsByIds } from "@/hooks/useListings";
import { ListingRow } from "@/components/ListingRow";
import { Heart, Mail, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import { BulkContactFormDialog } from "@/components/BulkContactFormDialog";
import { FavouriteButton } from "@/components/FavouriteButton";
import { cn } from "@/lib/utils";

type TabType = "all" | "venues" | "companies";

// Extended listing type that includes venue fields
interface ListingWithVenue {
  id: string;
  name: string;
  slug: string;
  email?: string | null;
  town_city?: string | null;
  country?: string | null;
  venue_type?: string | null;
  venue_capacity?: number | null;
  [key: string]: any;
}

const VENUE_TYPE_COLORS: Record<string, string> = {
  Arena: "bg-accent/20 text-accent border-accent/40",
  Amphitheatre: "bg-accent-teal/20 text-accent-teal border-accent-teal/40",
  Bar: "bg-tier-free/20 text-tier-free border-tier-free/40",
  Club: "bg-accent-violet/20 text-accent-violet border-accent-violet/40",
  "Concert Hall": "bg-primary/20 text-primary border-primary/40",
  "Convention Centre": "bg-muted-foreground/20 text-muted-foreground border-muted-foreground/40",
  "Cultural Centre": "bg-accent-teal/20 text-accent-teal border-accent-teal/40",
  "Opera House": "bg-primary/20 text-primary border-primary/40",
  "Outdoor Venue": "bg-accent/20 text-accent border-accent/40",
  "Performing Arts Centre": "bg-accent-violet/20 text-accent-violet border-accent-violet/40",
  Stadium: "bg-accent/20 text-accent border-accent/40",
  Theatre: "bg-primary/20 text-primary border-primary/40",
};

function formatCapacity(capacity: number | null): string {
  if (!capacity) return "";
  if (capacity >= 1000) {
    return `${(capacity / 1000).toFixed(capacity >= 10000 ? 0 : 1)}k cap`;
  }
  return `${capacity} cap`;
}

export default function Favourites() {
  const { favourites, count } = useFavourites();
  const { data: listings, isLoading } = useListingsByIds(favourites) as {
    data: ListingWithVenue[] | undefined;
    isLoading: boolean;
  };
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const contactableCount = listings?.filter((l) => l.email).length || 0;

  // Split listings into venues and companies
  const { venues, companies } = useMemo(() => {
    if (!listings) return { venues: [], companies: [] };
    return {
      venues: listings.filter((l) => l.venue_type !== null),
      companies: listings.filter((l) => l.venue_type === null),
    };
  }, [listings]);

  // Count contactable companies (those with emails)
  const contactableCompaniesCount = companies.filter((l) => l.email).length;

  // Determine which tabs to show
  const showVenuesTab = venues.length > 0;
  const showCompaniesTab = companies.length > 0;

  // Get filtered listings based on active tab
  const filteredListings = useMemo(() => {
    if (!listings) return [];
    switch (activeTab) {
      case "venues":
        return venues;
      case "companies":
        return companies;
      default:
        return listings;
    }
  }, [listings, venues, companies, activeTab]);

  // Get empty state message based on tab
  const getEmptyMessage = () => {
    switch (activeTab) {
      case "venues":
        return {
          title: "No venues saved yet",
          description: "Browse venues to find some.",
          linkTo: "/venues",
          linkText: "Browse Venues",
        };
      case "companies":
        return {
          title: "No companies saved yet",
          description: "Browse the directory to find companies.",
          linkTo: "/categories",
          linkText: "Browse Categories",
        };
      default:
        return {
          title: "No favourites saved yet",
          description: "Start adding favourites from listings and venues.",
          linkTo: "/categories",
          linkText: "Browse Categories",
        };
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">My Favourites</h1>

        {isLoading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-14 bg-muted animate-pulse rounded" />
            ))}
          </div>
        ) : count === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-lg text-muted-foreground mb-4">No favourites saved yet</p>
            <Link href="/categories">
              <Button>Browse Categories</Button>
            </Link>
          </div>
        ) : (
          <div>
            {/* Tabs */}
            <div className="flex items-center gap-1 mb-6 border-b border-border">
              <button
                onClick={() => setActiveTab("all")}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors relative",
                  activeTab === "all" ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                All ({count})
                {activeTab === "all" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
              </button>

              {showVenuesTab && (
                <button
                  onClick={() => setActiveTab("venues")}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors relative",
                    activeTab === "venues" ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Venues ({venues.length})
                  {activeTab === "venues" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                </button>
              )}

              {showCompaniesTab && (
                <button
                  onClick={() => setActiveTab("companies")}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors relative",
                    activeTab === "companies" ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Companies ({companies.length})
                  {activeTab === "companies" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                </button>
              )}
            </div>

            {/* Action bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4">
              <span className="text-sm text-muted-foreground">
                {filteredListings.length} saved {activeTab === "all" ? "listing" : activeTab.slice(0, -1)}
                {filteredListings.length !== 1 ? "s" : ""}
              </span>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Show both buttons on All tab if both types exist */}
                {activeTab === "all" && (
                  <>
                    {venues.length > 0 && (
                      <BulkContactFormDialog
                        listings={venues as any}
                        trigger={
                          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                            <Mail className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Contact Venues</span>
                            <span className="sm:hidden">Venues</span>
                          </Button>
                        }
                      />
                    )}
                    {companies.length > 0 && (
                      <BulkContactFormDialog
                        listings={companies as any}
                        trigger={
                          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                            <Mail className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Contact Companies</span>
                            <span className="sm:hidden">Companies</span>
                          </Button>
                        }
                      />
                    )}
                  </>
                )}

                {/* Show single button on specific tabs */}
                {activeTab === "companies" && companies.length > 0 && (
                  <BulkContactFormDialog
                    listings={companies as any}
                    trigger={
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact Companies
                      </Button>
                    }
                  />
                )}

                {activeTab === "venues" && venues.length > 0 && (
                  <BulkContactFormDialog
                    listings={venues as any}
                    trigger={
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact Venues
                      </Button>
                    }
                  />
                )}
              </div>
            </div>

            {/* Listings */}
            {filteredListings.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">{getEmptyMessage().title}</p>
                <p className="text-sm text-muted-foreground mb-4">{getEmptyMessage().description}</p>
                <Link href={getEmptyMessage().linkTo}>
                  <Button variant="outline">{getEmptyMessage().linkText}</Button>
                </Link>
              </div>
            ) : (
              <div className="bg-card rounded-lg border">
                {filteredListings.map((listing) => {
                  // Unified card design for both venues and companies
                  const isVenue = listing.venue_type !== null;
                  const typeColorClass =
                    isVenue && listing.venue_type
                      ? VENUE_TYPE_COLORS[listing.venue_type] || "bg-muted text-muted-foreground"
                      : "bg-muted/50 text-muted-foreground border-muted";

                  return (
                    <div key={listing.id} className="p-4 border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/listing/${listing.slug}`}
                            className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
                          >
                            {listing.name}
                          </Link>

                          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                            {isVenue && listing.venue_type && (
                              <Badge variant="outline" className={cn("text-xs px-1.5 py-0", typeColorClass)}>
                                {listing.venue_type}
                              </Badge>
                            )}
                            {isVenue && listing.venue_capacity && (
                              <Badge variant="outline" className="text-xs px-1.5 py-0 bg-muted/50 gap-1">
                                <Users className="h-3 w-3" />
                                {formatCapacity(listing.venue_capacity)}
                              </Badge>
                            )}
                          </div>

                          {(listing.town_city || listing.country) && (
                            <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {[listing.town_city, listing.country].filter(Boolean).join(", ")}
                            </p>
                          )}
                        </div>

                        <FavouriteButton listingId={listing.id} size="sm" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
