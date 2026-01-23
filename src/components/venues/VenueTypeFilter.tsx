'use client';

import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { VENUE_TYPES } from "@/hooks/useVenues";
import { cn } from "@/lib/utils";

interface VenueTypeFilterProps {
  selectedTypes: string[];
  onChange: (types: string[]) => void;
}

export function VenueTypeFilter({ selectedTypes, onChange }: VenueTypeFilterProps) {
  const [open, setOpen] = useState(false);
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
      // Check if scroll happened inside the dropdown
      if (ref.current && ref.current.contains(event.target as Node)) {
        return;
      }
      setOpen(false);
    }

    document.addEventListener("scroll", handleScroll, true);
    return () => document.removeEventListener("scroll", handleScroll, true);
  }, [open]);

  const handleToggle = (type: string) => {
    if (selectedTypes.includes(type)) {
      onChange(selectedTypes.filter((t) => t !== type));
    } else {
      onChange([...selectedTypes, type]);
    }
  };

  const triggerLabel =
    selectedTypes.length === 0
      ? "Venue Type"
      : selectedTypes.length === 1
        ? selectedTypes[0]
        : `Venue Type (${selectedTypes.length})`;

  return (
    <div ref={ref} className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
        className={cn(
          "h-9 w-full gap-1.5 px-3 justify-between text-xs font-normal",
          selectedTypes.length > 0
            ? "border-primary bg-primary/10 text-primary hover:bg-primary/20"
            : "border-input bg-background text-foreground hover:bg-muted hover:border-input",
        )}
      >
        <span className="truncate">{triggerLabel}</span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 opacity-50 transition-transform", open && "rotate-180")} />
      </Button>

      {open && (
        <div className="absolute top-full right-0 md:left-0 md:right-auto mt-1 z-50 w-48 md:w-56 rounded-md border bg-popover p-1 shadow-lg">
          <div className="flex items-center justify-between mb-1">
            {selectedTypes.length > 0 ? (
              <button
                onClick={() => onChange([])}
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
              onClick={() => setOpen(false)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-sm hover:bg-muted text-sm text-muted-foreground"
            >
              <X className="h-3 w-3" />
              Close
            </button>
          </div>
          <div className="max-h-64 overflow-y-auto overscroll-contain">
            {VENUE_TYPES.map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-muted cursor-pointer text-sm"
              >
                <Checkbox checked={selectedTypes.includes(type)} onCheckedChange={() => handleToggle(type)} />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
