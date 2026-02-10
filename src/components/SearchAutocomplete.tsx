'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from "react";
import { Search, Building2, FolderOpen, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchAutocomplete } from "@/hooks/useSearchAutocomplete";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { buildVenueProfileUrl } from "@/lib/buildVenueUrl";

interface SearchAutocompleteProps {
  placeholder?: string;
  defaultValue?: string;
}

export function SearchAutocomplete({ placeholder = "Search...", defaultValue = "" }: SearchAutocompleteProps) {
  const [query, setQuery] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debouncedQuery = useDebounce(query, 300);
  const { data, isLoading } = useSearchAutocomplete(debouncedQuery);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = data?.categories || [];
  const listings = data?.listings || [];
  const hasResults = categories.length > 0 || listings.length > 0;
  const totalItems = categories.length + listings.length;

  // Sync query with defaultValue when it changes (e.g., URL navigation)
  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [debouncedQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || !hasResults) {
      if (e.key === "Enter" && query.trim()) {
        if (isLoading) {
          return;
        }
        // Single result = go directly to it
        if (categories.length === 1 && listings.length === 0) {
          // Single category, no listings
          router.push(`/${categories[0].url_slug || categories[0].slug}`);
        } else if (listings.length === 1 && categories.length === 0) {
          // Single listing, no categories
          router.push(getListingUrl(listings[0]));
        } else {
          // Multiple results or no results = go to search results page
          router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
        setIsOpen(false);
        setQuery("");
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelect(selectedIndex);
        } else if (query.trim()) {
          if (isLoading) {
            return;
          }
          // Single result = go directly to it
          if (categories.length === 1 && listings.length === 0) {
            // Single category, no listings
            router.push(`/${categories[0].url_slug || categories[0].slug}`);
          } else if (listings.length === 1 && categories.length === 0) {
            // Single listing, no categories
            router.push(getListingUrl(listings[0]));
          } else {
            // Multiple results or no results = go to search results page
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
          }
          setIsOpen(false);
          setQuery("");
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  // Build URL for a listing - use venue URL for venues, /listing/ for others
  const getListingUrl = (listing: (typeof listings)[0]): string => {
    if (listing.venue_type) {
      // It's a venue - use SEO-friendly venue URL
      return buildVenueProfileUrl({
        slug: listing.slug,
        country: listing.country,
        regionSlug: listing.region_slug,
        city: listing.town_city,
      });
    }
    // Regular listing
    return `/listing/${listing.slug}`;
  };

  const handleSelect = (index: number) => {
    if (index < categories.length) {
      // Category selected
      const category = categories[index];
      router.push(`/${category.url_slug || category.slug}`);
    } else {
      // Listing selected
      const listing = listings[index - categories.length];
      router.push(getListingUrl(listing));
    }
    setIsOpen(false);
    setQuery("");
  };

  const highlightMatch = (text: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="text-primary font-semibold">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
      <Input
        ref={inputRef}
        type="search"
        placeholder={placeholder}
        className="w-full pl-9 pr-9 bg-secondary/50 border-border focus-visible:border-primary focus-visible:ring-primary"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
      />
      {isLoading && <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-primary" />}
      {/* Dropdown */}
      {isOpen && query.length >= 2 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-50 max-h-[400px] overflow-y-auto"
          onMouseLeave={() => setSelectedIndex(-1)}
        >
          {!hasResults && !isLoading && (
            <div className="p-4 text-sm text-muted-foreground text-center">No results found for "{query}"</div>
          )}

          {categories.length > 0 && (
            <div>
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-secondary/50">
                Categories
              </div>
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-left text-foreground hover:bg-primary/10 hover:text-primary transition-colors",
                    selectedIndex === index && "bg-primary/10 text-primary",
                  )}
                  onClick={() => handleSelect(index)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <FolderOpen className="h-4 w-4 text-primary shrink-0" />
                  <span className="truncate">{highlightMatch(category.name)}</span>
                </button>
              ))}
            </div>
          )}

          {listings.length > 0 && (
            <div>
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-secondary/50">
                Companies
              </div>
              {listings.map((listing, index) => {
                const itemIndex = categories.length + index;
                return (
                  <button
                    key={listing.id}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 text-left text-foreground hover:bg-primary/10 hover:text-primary transition-colors",
                      selectedIndex === itemIndex && "bg-primary/10 text-primary",
                    )}
                    onClick={() => handleSelect(itemIndex)}
                    onMouseEnter={() => setSelectedIndex(itemIndex)}
                  >
                    <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="truncate">{highlightMatch(listing.name)}</div>
                      {listing.town_city && (
                        <div className="text-xs text-muted-foreground truncate">
                          {listing.town_city}
                          {listing.country && `, ${listing.country}`}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {hasResults && (
            <button
              className="w-full px-3 py-2 text-sm text-primary hover:bg-primary/10 transition-colors border-t border-border flex items-center justify-center gap-2"
              onClick={() => {
                if (categories.length === 1 && listings.length === 0) {
                  router.push(`/${categories[0].url_slug || categories[0].slug}`);
                } else {
                  router.push(`/search?q=${encodeURIComponent(query.trim())}`);
                }
                setIsOpen(false);
              }}
            >
              <Search className="h-4 w-4" />
              {categories.length === 1 && listings.length === 0
                ? `Go to ${categories[0].name}`
                : `View all results for "${query}"`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}