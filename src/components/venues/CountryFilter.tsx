'use client';

import { useRef, useEffect, memo, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface CountryOption {
  country: string;
  count: number;
}

interface CountryFilterProps {
  countries: CountryOption[];
  selectedCountries: string[];
  onChange: (countries: string[]) => void;
}

export const CountryFilter = memo(function CountryFilter({
  countries,
  selectedCountries,
  onChange,
}: CountryFilterProps) {
  const KEEP_OPEN_KEY = 'venue-country-filter-keep-open';
  
  // Check if we should restore open state on mount
  const shouldStartOpen = () => {
    if (typeof window === 'undefined') return false;
    const keepOpen = sessionStorage.getItem(KEEP_OPEN_KEY);
    if (keepOpen) {
      sessionStorage.removeItem(KEEP_OPEN_KEY);
      return true;
    }
    return false;
  };

  const [open, setOpen] = useState(shouldStartOpen);
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on scroll outside
  useEffect(() => {
    if (!open) return;

    function handleScroll(event: Event) {
      if (ref.current && ref.current.contains(event.target as Node)) {
        return;
      }
      setOpen(false);
    }

    document.addEventListener("scroll", handleScroll, true);
    return () => document.removeEventListener("scroll", handleScroll, true);
  }, [open]);

  const handleToggle = (country: string) => {
    // Mark that we want to keep the dropdown open after navigation
    sessionStorage.setItem('venue-country-filter-keep-open', 'true');
    
    if (selectedCountries.includes(country)) {
      onChange(selectedCountries.filter((c) => c !== country));
    } else {
      onChange([...selectedCountries, country]);
    }
  };

  const handleClearAll = () => {
    // Mark that we want to keep the dropdown open after clearing
    sessionStorage.setItem('venue-country-filter-keep-open', 'true');
    onChange([]);
  };

  const handleClose = () => {
    // User explicitly closed - clear the keep-open flag
    sessionStorage.removeItem('venue-country-filter-keep-open');
    setOpen(false);
  };

  const triggerLabel =
    selectedCountries.length === 0
      ? "All Countries"
      : selectedCountries.length === 1
        ? selectedCountries[0]
        : `${selectedCountries.length} Countries`;

  return (
    <div ref={ref} className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
        className={cn(
          "h-9 w-full gap-1.5 px-3 justify-between text-xs font-normal",
          selectedCountries.length > 0
            ? "border-primary bg-primary/10 text-primary hover:bg-primary/20"
            : "border-input bg-background text-foreground hover:bg-muted hover:border-input",
        )}
      >
        <span className="truncate">{triggerLabel}</span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 opacity-50 transition-transform", open && "rotate-180")} />
      </Button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1 z-50 w-64 rounded-md border bg-popover p-1 shadow-lg"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-1">
            {selectedCountries.length > 0 ? (
              <button
                type="button"
                onClick={handleClearAll}
                className="flex items-center gap-1 px-2 py-1.5 rounded-sm hover:bg-muted text-sm text-muted-foreground"
              >
                <X className="h-3 w-3" />
                <span className="md:hidden">Clear</span>
                <span className="hidden md:inline">Clear selection</span>
              </button>
            ) : (
              <span />
            )}
            <button
              type="button"
              onClick={handleClose}
              className="flex items-center gap-1 px-2 py-1.5 rounded-sm hover:bg-muted text-sm text-muted-foreground"
            >
              <X className="h-3 w-3" />
              Close
            </button>
          </div>
          <div className="max-h-64 overflow-y-auto overscroll-contain">
            {countries.map(({ country, count }) => (
              <label
                key={country}
                className="flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-muted cursor-pointer text-sm"
              >
                <Checkbox 
                  checked={selectedCountries.includes(country)} 
                  onCheckedChange={() => handleToggle(country)}
                />
                <span className="flex-1">{country}</span>
                <span className="text-muted-foreground text-xs">({count})</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});