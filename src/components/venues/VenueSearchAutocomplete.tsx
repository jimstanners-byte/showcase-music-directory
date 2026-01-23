'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useVenueSearch } from "@/hooks/useVenueSearch";
import { useDebounce } from "@/hooks/useDebounce";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface VenueSearchAutocompleteProps {
  placeholder?: string;
}

export function VenueSearchAutocomplete({ placeholder = "Search venues..." }: VenueSearchAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debouncedQuery = useDebounce(query, 300);
  const { data: venues = [], isLoading } = useVenueSearch(debouncedQuery);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    if (!isOpen || venues.length === 0) {
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < venues.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : venues.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && venues[selectedIndex]) {
          handleSelect(selectedIndex);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  const handleSelect = (index: number) => {
    const venue = venues[index];
    if (venue) {
      router.push(`/listing/${venue.slug}?from=venues`);
      setIsOpen(false);
      setQuery("");
    }
  };

  const highlightMatch = (text: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="text-primary font-semibold">
          {part}
        </span>
      ) : (
        part
      )
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
          className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-50 max-h-[300px] overflow-y-auto"
          onMouseLeave={() => setSelectedIndex(-1)}
        >
          {venues.length === 0 && !isLoading && (
            <div className="p-4 text-sm text-muted-foreground text-center">
              No venues found for "{query}"
            </div>
          )}

          {venues.map((venue, index) => (
            <button
              key={venue.id}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-left text-foreground hover:bg-primary/10 hover:text-primary transition-colors",
                selectedIndex === index && "bg-primary/10 text-primary"
              )}
              onClick={() => handleSelect(index)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="truncate">{highlightMatch(venue.name)}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {venue.venue_type && (
                    <Badge variant="secondary" className="text-xs px-1.5 py-0">
                      {venue.venue_type}
                    </Badge>
                  )}
                  {venue.town_city && (
                    <span className="truncate">
                      {venue.town_city}
                      {venue.country && `, ${venue.country}`}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
