'use client';

import { useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Download, Loader2 } from "lucide-react";
import { CONTINENT_COUNTRIES } from "@/lib/continents";
import { toSlug, countryToSlug, slugToCountryDisplay, slugToContinentDisplay, slugToLocationDisplay } from "@/lib/slugUtils";

const CONTINENT_ORDER = ["Europe", "North America", "Asia", "South America", "Africa", "Oceania"];

function getContinentSlug(continent: string): string {
  return continent.toLowerCase().replace(/\s+/g, '-');
}

function isCityRegion(country: string, regionSlug: string): boolean {
  const cityRegions: Record<string, string[]> = {
    "United Kingdom": ["london"],
    "UK": ["london"],
    "United States": ["new-york-city"],
    "USA": ["new-york-city"]
  };
  return cityRegions[country]?.includes(regionSlug) || false;
}

export function ExportVenueUrls() {
  const { toast } = useToast();
  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [isExporting, setIsExporting] = useState(false);

  const countriesInContinent = useMemo(() => {
    if (!selectedContinent) return [];
    return CONTINENT_COUNTRIES[selectedContinent] || [];
  }, [selectedContinent]);

  // Find exact override - database now stores slugs
  const findExactOverride = (overrides: any[], continentSlug: string, countrySlug: string | null, regionSlug: string | null, citySlug: string | null) => {
    return overrides.find((o) => 
      o.continent === continentSlug &&
      o.country === countrySlug &&
      o.region_slug === regionSlug &&
      o.city === citySlug
    ) || null;
  };

  const getSeoValue = (override: any, overrideField: string, autoValue: string) => {
    if (override && override[overrideField]) {
      return { value: override[overrideField], source: "override" };
    }
    return { value: autoValue, source: "auto" };
  };

  const generateAutoValues = (continent: string, country: string | null, regionName: string | null, city: string | null) => {
    let locationPart = continent;
    if (country) locationPart = country;
    if (regionName) locationPart = `${regionName}, ${country}`;
    if (city && regionName) locationPart = `${city}, ${regionName}`;
    else if (city) locationPart = `${city}, ${country}`;

    return {
      seo_title: `Venues in ${locationPart} | Showcase`,
      h1: `Venues in ${locationPart}`,
      h2: `Find Venues in ${locationPart}`,
      meta_description: `Discover venues in ${locationPart}. Browse our directory of event spaces, concert halls, and more.`,
      intro_text: `Find the perfect venue in ${locationPart} for your next event.`,
      about_heading: `About Venues in ${locationPart}`,
      about_content: `Explore our comprehensive directory of venues in ${locationPart}.`,
    };
  };

  const handleExport = async () => {
    if (!selectedContinent) {
      toast({ title: "Please select a continent", variant: "destructive" });
      return;
    }

    setIsExporting(true);

    try {
      const continentSlug = getContinentSlug(selectedContinent);

      // Fetch all overrides with pagination to handle >1000 rows
      const fetchAllOverrides = async () => {
        const allOverrides: any[] = [];
        const batchSize = 1000;
        let offset = 0;
        let hasMore = true;

        while (hasMore) {
          const { data, error } = await supabase
            .from("venue_location_seo")
            .select("continent, country, region_slug, city, seo_title, h1_override, h2_override, meta_description, intro_text, about_heading, about_content")
            .range(offset, offset + batchSize - 1);

          if (error) throw error;

          if (data && data.length > 0) {
            allOverrides.push(...data);
            offset += batchSize;
            hasMore = data.length === batchSize;
          } else {
            hasMore = false;
          }
        }

        return allOverrides;
      };

      const overrides = await fetchAllOverrides();

      const countriesToQuery = selectedCountry ? [selectedCountry] : countriesInContinent;

      // Fetch all listings with pagination to handle >1000 rows
      const fetchAllListings = async () => {
        const allListings: any[] = [];
        const batchSize = 1000;
        let offset = 0;
        let hasMore = true;

        while (hasMore) {
          const { data, error } = await supabase
            .from("listings")
            .select("country, town_city, region_id")
            .eq("is_active", true)
            .not("venue_type", "is", null)
            .in("country", countriesToQuery)
            .range(offset, offset + batchSize - 1);

          if (error) throw error;

          if (data && data.length > 0) {
            allListings.push(...data);
            offset += batchSize;
            hasMore = data.length === batchSize;
          } else {
            hasMore = false;
          }
        }

        return allListings;
      };

      const listings = await fetchAllListings();

      const regionIds = [...new Set(listings?.filter(l => l.region_id).map(l => l.region_id))];
      
      let regionsMap = new Map<number, { region_name: string; region_slug: string; country: string }>();
      if (regionIds.length > 0) {
        const { data: regions } = await supabase
          .from("regions")
          .select("id, region_name, region_slug, country")
          .in("id", regionIds);
        
        regions?.forEach(r => {
          regionsMap.set(r.id, { region_name: r.region_name, region_slug: r.region_slug, country: r.country });
        });
      }

      const countriesSet = new Set<string>();
      const regionsByCountry = new Map<string, Map<string, string>>();
      const citiesByCountryRegion = new Map<string, Set<string>>();
      const citiesByCountryNoRegion = new Map<string, Set<string>>();

      listings?.forEach((listing) => {
        if (!listing.country) return;
        countriesSet.add(listing.country);

        const regionInfo = listing.region_id ? regionsMap.get(listing.region_id) : null;

        if (regionInfo) {
          if (!regionsByCountry.has(listing.country)) {
            regionsByCountry.set(listing.country, new Map());
          }
          regionsByCountry.get(listing.country)!.set(regionInfo.region_slug, regionInfo.region_name);

          if (listing.town_city) {
            const key = `${listing.country}|${regionInfo.region_slug}`;
            if (!citiesByCountryRegion.has(key)) {
              citiesByCountryRegion.set(key, new Set());
            }
            citiesByCountryRegion.get(key)!.add(listing.town_city);
          }
        } else if (listing.town_city) {
          if (!citiesByCountryNoRegion.has(listing.country)) {
            citiesByCountryNoRegion.set(listing.country, new Set());
          }
          citiesByCountryNoRegion.get(listing.country)!.add(listing.town_city);
        }
      });

      const countries = Array.from(countriesSet).sort();
      const urlRows: any[] = [];

      // addRow now takes slugs for DB columns, display names are only used in generateAutoValues
      const addRow = (url: string, continentSlug: string, countrySlug: string, regionSlug: string, citySlug: string, override: any, autoValues: any) => {
        const seoTitle = getSeoValue(override, "seo_title", autoValues.seo_title);
        const h1 = getSeoValue(override, "h1_override", autoValues.h1);
        const h2 = getSeoValue(override, "h2_override", autoValues.h2);
        const metaDesc = getSeoValue(override, "meta_description", autoValues.meta_description);
        const intro = getSeoValue(override, "intro_text", autoValues.intro_text);
        const aboutHeading = getSeoValue(override, "about_heading", autoValues.about_heading);
        const aboutContent = getSeoValue(override, "about_content", autoValues.about_content);

        // Export slugs in CSV (matches database format for re-import)
        urlRows.push({
          url,
          continent: continentSlug,
          country: countrySlug,
          region_slug: regionSlug,
          city: citySlug,
          seo_title: seoTitle.value,
          seo_title_source: seoTitle.source,
          h1: h1.value,
          h1_source: h1.source,
          h2: h2.value,
          h2_source: h2.source,
          meta_description: metaDesc.value,
          meta_description_source: metaDesc.source,
          intro_text: intro.value,
          intro_text_source: intro.source,
          about_heading: aboutHeading.value,
          about_heading_source: aboutHeading.source,
          about_content: aboutContent.value,
          about_content_source: aboutContent.source,
        });
      };

      // 1. Continent page
      if (!selectedCountry) {
        const continentAuto = generateAutoValues(selectedContinent, null, null, null);
        const continentOverride = findExactOverride(overrides || [], continentSlug, null, null, null);
        addRow(`/venues/${continentSlug}`, continentSlug, "", "", "", continentOverride, continentAuto);
      }

      // 2. Country pages
      for (const country of countries) {
        const countrySlugVal = countryToSlug(country);
        const countryAuto = generateAutoValues(selectedContinent, country, null, null);
        const countryOverride = findExactOverride(overrides || [], continentSlug, countrySlugVal, null, null);
        
        addRow(`/venues/${continentSlug}/${countrySlugVal}`, continentSlug, countrySlugVal, "", "", countryOverride, countryAuto);

        // 3. Region pages
        const regions = regionsByCountry.get(country);
        if (regions) {
          for (const [regionSlug, regionName] of regions) {
            const regionAuto = generateAutoValues(selectedContinent, country, regionName, null);
            const regionOverride = findExactOverride(overrides || [], continentSlug, countrySlugVal, regionSlug, null);
            
            addRow(`/venues/${continentSlug}/${countrySlugVal}/${regionSlug}`, continentSlug, countrySlugVal, regionSlug, "", regionOverride, regionAuto);

            // 4. City pages within region
            if (true) {
              const citiesInRegion = citiesByCountryRegion.get(`${country}|${regionSlug}`);
              if (citiesInRegion) {
                for (const city of Array.from(citiesInRegion).sort()) {
                  const citySlug = toSlug(city);
                  const cityAuto = generateAutoValues(selectedContinent, country, regionName, city);
                  const cityOverride = findExactOverride(overrides || [], continentSlug, countrySlugVal, regionSlug, citySlug);
                  
                  addRow(`/venues/${continentSlug}/${countrySlugVal}/${regionSlug}/${citySlug}`, continentSlug, countrySlugVal, regionSlug, citySlug, cityOverride, cityAuto);
                }
              }
            }
          }
        }

        // 5. City pages without region
        const citiesNoRegion = citiesByCountryNoRegion.get(country);
        if (citiesNoRegion) {
          for (const city of Array.from(citiesNoRegion).sort()) {
            const citySlug = toSlug(city);
            const cityAuto = generateAutoValues(selectedContinent, country, null, city);
            const cityOverride = findExactOverride(overrides || [], continentSlug, countrySlugVal, null, citySlug);
            
            addRow(`/venues/${continentSlug}/${countrySlugVal}/${citySlug}`, continentSlug, countrySlugVal, "", citySlug, cityOverride, cityAuto);
          }
        }
      }

      // Generate CSV
      const headers = [
        "url", "continent", "country", "region_slug", "city",
        "seo_title", "seo_title_source",
        "h1", "h1_source",
        "h2", "h2_source",
        "meta_description", "meta_description_source",
        "intro_text", "intro_text_source",
        "about_heading", "about_heading_source",
        "about_content", "about_content_source"
      ].join(",");

      const escapeField = (val: string | null | undefined) => {
        if (!val) return "";
        if (val.includes(",") || val.includes('"') || val.includes("\n")) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      };

      const rows = urlRows.map((row) =>
        [
          escapeField(row.url),
          escapeField(row.continent),
          escapeField(row.country),
          escapeField(row.region_slug),
          escapeField(row.city),
          escapeField(row.seo_title),
          escapeField(row.seo_title_source),
          escapeField(row.h1),
          escapeField(row.h1_source),
          escapeField(row.h2),
          escapeField(row.h2_source),
          escapeField(row.meta_description),
          escapeField(row.meta_description_source),
          escapeField(row.intro_text),
          escapeField(row.intro_text_source),
          escapeField(row.about_heading),
          escapeField(row.about_heading_source),
          escapeField(row.about_content),
          escapeField(row.about_content_source),
        ].join(",")
      );

      const csv = `${headers}\n${rows.join("\n")}`;
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      
      const countryPart = selectedCountry ? `_${toSlug(selectedCountry)}` : "";
      a.download = `venue_urls_${toSlug(selectedContinent)}${countryPart}_${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Export complete",
        description: `Exported ${urlRows.length} venue URLs`,
      });
    } catch (error: any) {
      toast({
        title: "Export failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Venue URLs</CardTitle>
        <CardDescription>
          Export all venue location URLs with their current SEO values
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <Label>Continent (required)</Label>
            <Select 
              value={selectedContinent} 
              onValueChange={(val) => {
                setSelectedContinent(val);
                setSelectedCountry("");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select continent..." />
              </SelectTrigger>
              <SelectContent>
                {CONTINENT_ORDER.map((continent) => (
                  <SelectItem key={continent} value={continent}>
                    {continent}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Country (optional)</Label>
            <Select 
              value={selectedCountry || "__all__"} 
              onValueChange={(val) => setSelectedCountry(val === "__all__" ? "" : val)}
              disabled={!selectedContinent}
            >
              <SelectTrigger>
                <SelectValue placeholder="All countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">All countries</SelectItem>
                {countriesInContinent.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Button
              onClick={handleExport}
              disabled={!selectedContinent || isExporting}
              className="w-full md:w-auto"
            >
              {isExporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export Venue URLs
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}