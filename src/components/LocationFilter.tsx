'use client';

import { useRouter } from 'next/navigation';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { slugify } from "@/lib/slugify";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Region {
  id: number;
  region_name: string;
  region_slug: string;
}

interface LocationFilterProps {
  countries: string[];
  regions: Region[];
  cities: string[];
  selectedCountry: string | null;
  selectedRegion: number | null;
  selectedCity: string | null;
  categorySlug: string;
  onRegionChange: (regionId: number | null) => void;
}

export function LocationFilter({
  countries,
  regions,
  cities,
  selectedCountry,
  selectedRegion,
  selectedCity,
  categorySlug,
  onRegionChange,
}: LocationFilterProps) {
  const router = useRouter();

  const handleCountryChange = (country: string) => {
    if (country === "all") {
      onRegionChange(null);
      router.push(`/${categorySlug}`);
    } else {
      onRegionChange(null);
      router.push(`/${categorySlug}/${slugify(country)}`);
    }
  };

  const handleRegionChange = (regionIdStr: string) => {
    if (regionIdStr === "all") {
      onRegionChange(null);
    } else {
      onRegionChange(Number(regionIdStr));
    }
  };

  const handleCityChange = (city: string) => {
    if (!selectedCountry) return;
    
    if (city === "all") {
      router.push(`/${categorySlug}/${slugify(selectedCountry)}`);
    } else {
      router.push(`/${categorySlug}/${slugify(selectedCountry)}/${slugify(city)}`);
    }
  };

  const clearFilters = () => {
    onRegionChange(null);
    router.push(`/${categorySlug}`);
  };

  const hasActiveFilters = selectedCountry || selectedRegion || selectedCity;
  const hasRegions = regions.length > 0;

  return (
    <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 bg-card rounded-lg border">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm sm:text-base">Filter by Location</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-auto p-1 text-muted-foreground hover:text-foreground text-xs sm:text-sm"
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
      
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="country" className="text-xs sm:text-sm">Country</Label>
        <Select 
          value={selectedCountry || "all"} 
          onValueChange={handleCountryChange}
        >
          <SelectTrigger id="country" className="h-8 sm:h-10 text-xs sm:text-sm">
            <SelectValue placeholder="All Countries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Region dropdown - only show when country has regions */}
      {selectedCountry && hasRegions && (
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="region" className="text-xs sm:text-sm">Region / State</Label>
          <Select 
            value={selectedRegion?.toString() || "all"} 
            onValueChange={handleRegionChange}
          >
            <SelectTrigger id="region" className="h-8 sm:h-10 text-xs sm:text-sm">
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region.id} value={region.id.toString()}>
                  {region.region_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="city" className="text-xs sm:text-sm">Town/City</Label>
        <Select 
          value={selectedCity || "all"} 
          onValueChange={handleCityChange}
          disabled={!selectedCountry || (hasRegions && !selectedRegion)}
        >
          <SelectTrigger id="city" className="h-8 sm:h-10 text-xs sm:text-sm">
            <SelectValue placeholder={
              !selectedCountry 
                ? "Select a country first" 
                : hasRegions && !selectedRegion
                  ? "Select a region first"
                  : "All Towns/Cities"
            } />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Towns/Cities</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
