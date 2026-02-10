'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useCategories } from "@/hooks/useCategories";
import { CONTINENT_COUNTRIES } from "@/lib/continents";
import { toSlug, countryToSlug } from "@/lib/slugUtils";

const CONTINENT_ORDER = ["Europe", "North America", "Asia", "South America", "Africa", "Oceania"];

function getContinentSlug(continent: string): string {
  return continent.toLowerCase().replace(/\s+/g, '-');
}

function getContinent(country: string): string | null {
  for (const [continent, countries] of Object.entries(CONTINENT_COUNTRIES)) {
    if (countries.includes(country)) return continent;
  }
  return null;
}

function countryHasRegions(country: string): boolean {
  const withRegions = ["United Kingdom", "UK", "United States", "USA"];
  return withRegions.some((c) => c.toLowerCase() === country.toLowerCase());
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

export function ExportCategoryUrls() {
  const { toast } = useToast();
  const { data: categories } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [isExporting, setIsExporting] = useState(false);

  const leafCategories = categories?.filter((cat) => !categories.some((c) => c.parent_id === cat.id));

  const buildLocationString = (country: string | null, region: string | null, city: string | null): string => {
    const isRegionCountry = country && countryHasRegions(country);
    if (city && region && isRegionCountry) return `${city}, ${region}`;
    if (region && isRegionCountry) return region;
    if (city && country) return `${city}, ${country}`;
    if (country) return country;
    return "";
  };

  const generateAutoValues = (categoryName: string, country: string | null, region: string | null, city: string | null) => {
    const locationString = buildLocationString(country, region, city);
    const locationSuffix = locationString ? ` in ${locationString}` : "";
    return {
      seo_title: `${categoryName}${locationSuffix} | Showcase`,
      h1: `${categoryName}${locationSuffix}`,
      h2: `${categoryName} Companies${locationSuffix}`,
      meta_description: `Find ${categoryName.toLowerCase()} companies${locationSuffix}. Browse our directory of trusted suppliers.`,
      intro_text: `Discover ${categoryName.toLowerCase()} services${locationSuffix}.`,
      about_heading: `About ${categoryName}`,
      about_content: `Find the best ${categoryName.toLowerCase()} providers${locationSuffix}.`,
    };
  };

  const processLocationPlaceholder = (text: string | null, country: string | null, region: string | null, city: string | null): string | null => {
    if (!text) return null;
    const hasPlaceholder = /\{(in_)?location\}/i.test(text);
    if (!hasPlaceholder) return null;
    
    let result = text;
    const locationString = buildLocationString(country, region, city);
    if (locationString) {
      result = result.replace(/\{in_location\}/gi, `in ${locationString}`);
      result = result.replace(/\{location\}/gi, locationString);
    } else {
      result = result.replace(/\{in_location\}/gi, "");
      result = result.replace(/\{location\}/gi, "");
    }
    result = result.replace(/\s{2,}/g, " ").replace(/\s+\./g, ".").replace(/\s+,/g, ",").trim();
    return result;
  };

  const getSeoValue = (override: any, overrideField: string, categoryDefault: string | null, autoValue: string) => {
    if (override && override[overrideField]) {
      return { value: override[overrideField], source: "override" };
    }
    if (categoryDefault) {
      return { value: categoryDefault, source: "category_default" };
    }
    return { value: autoValue, source: "auto" };
  };

  // Find exact override - database now stores slugs
  const findExactOverride = (overrides: any[], countrySlug: string | null, regionSlug: string | null, citySlug: string | null) => {
    if (countrySlug && regionSlug && citySlug) {
      return overrides.find((o) => 
        o.country === countrySlug && 
        o.region === regionSlug && 
        o.city === citySlug
      ) || null;
    }
    if (countrySlug && citySlug && !regionSlug) {
      return overrides.find((o) => 
        o.country === countrySlug && 
        !o.region && 
        o.city === citySlug
      ) || null;
    }
    if (countrySlug && regionSlug && !citySlug) {
      return overrides.find((o) => 
        o.country === countrySlug && 
        o.region === regionSlug && 
        !o.city
      ) || null;
    }
    if (countrySlug && !regionSlug && !citySlug) {
      return overrides.find((o) => 
        o.country === countrySlug && 
        !o.region && 
        !o.city
      ) || null;
    }
    return overrides.find((o) => !o.country && !o.region && !o.city) || null;
  };

  const handleExport = async () => {
    if (!selectedCategoryId) {
      toast({ title: "Please select a category", variant: "destructive" });
      return;
    }

    setIsExporting(true);

    try {
      // Get category details
      const { data: category, error: catError } = await supabase
        .from("categories")
        .select("id, slug, url_slug, name, seo_title, seo_intro_text, seo_meta_description, seo_about_heading, seo_about_content, seo_h2_override")
        .eq("id", selectedCategoryId)
        .single();

      if (catError || !category) throw new Error("Category not found");

      const effectiveSlug = category.url_slug || category.slug;

      // Get all SEO overrides for this category
      const { data: overrides, error: overrideError } = await supabase
        .from("category_location_seo")
        .select("country, region, city, seo_title, h1_override, h2_override, meta_description, intro_text, about_heading, about_content")
        .eq("category_id", selectedCategoryId);

      if (overrideError) throw overrideError;

      // Get all listings in this category with pagination
      const fetchAllListingCategories = async () => {
        const allData: any[] = [];
        const batchSize = 1000;
        let offset = 0;
        let hasMore = true;

        while (hasMore) {
          const { data, error } = await supabase
            .from("listing_categories")
            .select("listing_id")
            .eq("category_id", selectedCategoryId)
            .range(offset, offset + batchSize - 1);

          if (error) throw error;

          if (data && data.length > 0) {
            allData.push(...data);
            offset += batchSize;
            hasMore = data.length === batchSize;
          } else {
            hasMore = false;
          }
        }

        return allData;
      };

      const listingCategories = await fetchAllListingCategories();
      const listingIds = listingCategories?.map((lc) => lc.listing_id) || [];

      // Get unique countries and cities from listings with pagination
      const fetchAllListings = async () => {
        if (listingIds.length === 0) return [];
        
        const allData: any[] = [];
        const batchSize = 500; // Smaller batch for IN queries
        
        for (let i = 0; i < listingIds.length; i += batchSize) {
          const batchIds = listingIds.slice(i, i + batchSize);
          const { data, error } = await supabase
            .from("listings")
            .select("country, town_city, region_id")
            .in("id", batchIds)
            .eq("is_active", true);

          if (error) throw error;
          if (data) allData.push(...data);
        }

        return allData;
      };

      const listings = await fetchAllListings();

      // Get regions
      const { data: regions, error: regionsError } = await supabase
        .from("regions")
        .select("id, country, region_name, region_slug");

      if (regionsError) throw regionsError;

      // Build location hierarchy
      const countriesSet = new Set<string>();
      const regionsByCountry = new Map<string, Map<number, { name: string; slug: string }>>();
      const citiesByCountryRegion = new Map<string, Set<string>>();

      listings?.forEach((listing) => {
        if (listing.country) {
          countriesSet.add(listing.country);

          if (listing.region_id && countryHasRegions(listing.country)) {
            const region = regions?.find((r) => r.id === listing.region_id);
            if (region) {
              if (!regionsByCountry.has(listing.country)) {
                regionsByCountry.set(listing.country, new Map());
              }
              regionsByCountry.get(listing.country)!.set(region.id, { name: region.region_name, slug: region.region_slug });

              const key = `${listing.country}|${region.id}`;
              if (listing.town_city) {
                if (!citiesByCountryRegion.has(key)) {
                  citiesByCountryRegion.set(key, new Set());
                }
                citiesByCountryRegion.get(key)!.add(listing.town_city);
              }
            }
          } else if (listing.town_city) {
            const key = `${listing.country}|`;
            if (!citiesByCountryRegion.has(key)) {
              citiesByCountryRegion.set(key, new Set());
            }
            citiesByCountryRegion.get(key)!.add(listing.town_city);
          }
        }
      });

      const countries = Array.from(countriesSet).sort();
      const urlRows: any[] = [];

      // 1. Landing page
      const landingAuto = generateAutoValues(category.name, null, null, null);
      const landingOverride = findExactOverride(overrides || [], null, null, null);
      urlRows.push({
        url: `/${effectiveSlug}`,
        category_slug: effectiveSlug,
        continent: "",
        country: "",
        region: "",
        city: "",
        ...getSeoValue(landingOverride, "seo_title", processLocationPlaceholder(category.seo_title, null, null, null), landingAuto.seo_title),
        h1: getSeoValue(landingOverride, "h1_override", null, landingAuto.h1).value,
        h1_source: getSeoValue(landingOverride, "h1_override", null, landingAuto.h1).source,
        h2: getSeoValue(landingOverride, "h2_override", processLocationPlaceholder(category.seo_h2_override, null, null, null), landingAuto.h2).value,
        h2_source: getSeoValue(landingOverride, "h2_override", processLocationPlaceholder(category.seo_h2_override, null, null, null), landingAuto.h2).source,
        meta_description: getSeoValue(landingOverride, "meta_description", processLocationPlaceholder(category.seo_meta_description, null, null, null), landingAuto.meta_description).value,
        meta_description_source: getSeoValue(landingOverride, "meta_description", processLocationPlaceholder(category.seo_meta_description, null, null, null), landingAuto.meta_description).source,
        intro_text: getSeoValue(landingOverride, "intro_text", processLocationPlaceholder(category.seo_intro_text, null, null, null), landingAuto.intro_text).value,
        intro_text_source: getSeoValue(landingOverride, "intro_text", processLocationPlaceholder(category.seo_intro_text, null, null, null), landingAuto.intro_text).source,
        about_heading: getSeoValue(landingOverride, "about_heading", processLocationPlaceholder(category.seo_about_heading, null, null, null), landingAuto.about_heading).value,
        about_heading_source: getSeoValue(landingOverride, "about_heading", processLocationPlaceholder(category.seo_about_heading, null, null, null), landingAuto.about_heading).source,
        about_content: getSeoValue(landingOverride, "about_content", processLocationPlaceholder(category.seo_about_content, null, null, null), landingAuto.about_content).value,
        about_content_source: getSeoValue(landingOverride, "about_content", processLocationPlaceholder(category.seo_about_content, null, null, null), landingAuto.about_content).source,
      });

      // Fix first row to include seo_title properly
      const landingSeoTitle = getSeoValue(landingOverride, "seo_title", processLocationPlaceholder(category.seo_title, null, null, null), landingAuto.seo_title);
      urlRows[0].seo_title = landingSeoTitle.value;
      urlRows[0].seo_title_source = landingSeoTitle.source;

      // 1b. Continent pages
      const continentsWithListings = new Set<string>();
      for (const country of countries) {
        const continent = getContinent(country);
        if (continent) continentsWithListings.add(continent);
      }

      for (const continent of CONTINENT_ORDER) {
        if (continentsWithListings.has(continent)) {
          const continentSlug = getContinentSlug(continent);
          const continentAuto = {
            seo_title: `${category.name} in ${continent} | Showcase`,
            h1: `${category.name} in ${continent}`,
            h2: `${category.name} Companies in ${continent}`,
            meta_description: `Find ${category.name.toLowerCase()} companies in ${continent}. Browse our directory of trusted suppliers.`,
            intro_text: `Discover ${category.name.toLowerCase()} services in ${continent}.`,
            about_heading: `About ${category.name} in ${continent}`,
            about_content: `Find the best ${category.name.toLowerCase()} providers in ${continent}.`,
          };

          urlRows.push({
            url: `/${effectiveSlug}/${continentSlug}`,
            category_slug: effectiveSlug,
            continent: continent,
            country: "",
            region: "",
            city: "",
            seo_title: continentAuto.seo_title,
            seo_title_source: "auto",
            h1: continentAuto.h1,
            h1_source: "auto",
            h2: continentAuto.h2,
            h2_source: "auto",
            meta_description: continentAuto.meta_description,
            meta_description_source: "auto",
            intro_text: continentAuto.intro_text,
            intro_text_source: "auto",
            about_heading: continentAuto.about_heading,
            about_heading_source: "auto",
            about_content: continentAuto.about_content,
            about_content_source: "auto",
          });
        }
      }

      // 2. Country pages and children
      for (const country of countries) {
        const countrySlugVal = countryToSlug(country) || "";
        const continent = getContinent(country);
        const continentSlug = continent ? getContinentSlug(continent) : "";
        const countryAuto = generateAutoValues(category.name, country, null, null);
        const countryOverride = findExactOverride(overrides || [], countrySlugVal, null, null);

        const countrySeoTitle = getSeoValue(countryOverride, "seo_title", processLocationPlaceholder(category.seo_title, country, null, null), countryAuto.seo_title);
        const countryH1 = getSeoValue(countryOverride, "h1_override", null, countryAuto.h1);
        const countryH2 = getSeoValue(countryOverride, "h2_override", processLocationPlaceholder(category.seo_h2_override, country, null, null), countryAuto.h2);
        const countryMetaDesc = getSeoValue(countryOverride, "meta_description", processLocationPlaceholder(category.seo_meta_description, country, null, null), countryAuto.meta_description);
        const countryIntro = getSeoValue(countryOverride, "intro_text", processLocationPlaceholder(category.seo_intro_text, country, null, null), countryAuto.intro_text);
        const countryAboutHeading = getSeoValue(countryOverride, "about_heading", processLocationPlaceholder(category.seo_about_heading, country, null, null), countryAuto.about_heading);
        const countryAboutContent = getSeoValue(countryOverride, "about_content", processLocationPlaceholder(category.seo_about_content, country, null, null), countryAuto.about_content);

        urlRows.push({
          url: `/${effectiveSlug}/${continentSlug}/${countrySlugVal}`,
          category_slug: effectiveSlug,
          continent: continentSlug,
          country: countrySlugVal,
          region: "",
          city: "",
          seo_title: countrySeoTitle.value,
          seo_title_source: countrySeoTitle.source,
          h1: countryH1.value,
          h1_source: countryH1.source,
          h2: countryH2.value,
          h2_source: countryH2.source,
          meta_description: countryMetaDesc.value,
          meta_description_source: countryMetaDesc.source,
          intro_text: countryIntro.value,
          intro_text_source: countryIntro.source,
          about_heading: countryAboutHeading.value,
          about_heading_source: countryAboutHeading.source,
          about_content: countryAboutContent.value,
          about_content_source: countryAboutContent.source,
        });

        // Regions and cities
        const countryRegions = regionsByCountry.get(country);
        if (countryRegions && countryRegions.size > 0) {
          for (const [regionId, regionData] of countryRegions) {
            const regionSlug = regionData.slug;
            const regionAuto = generateAutoValues(category.name, country, regionData.name, null);
            const regionOverride = findExactOverride(overrides || [], countrySlugVal, regionSlug, null);

            const regionSeoTitle = getSeoValue(regionOverride, "seo_title", processLocationPlaceholder(category.seo_title, country, regionData.name, null), regionAuto.seo_title);
            const regionH1 = getSeoValue(regionOverride, "h1_override", null, regionAuto.h1);
            const regionH2 = getSeoValue(regionOverride, "h2_override", processLocationPlaceholder(category.seo_h2_override, country, regionData.name, null), regionAuto.h2);
            const regionMetaDesc = getSeoValue(regionOverride, "meta_description", processLocationPlaceholder(category.seo_meta_description, country, regionData.name, null), regionAuto.meta_description);
            const regionIntro = getSeoValue(regionOverride, "intro_text", processLocationPlaceholder(category.seo_intro_text, country, regionData.name, null), regionAuto.intro_text);
            const regionAboutHeading = getSeoValue(regionOverride, "about_heading", processLocationPlaceholder(category.seo_about_heading, country, regionData.name, null), regionAuto.about_heading);
            const regionAboutContent = getSeoValue(regionOverride, "about_content", processLocationPlaceholder(category.seo_about_content, country, regionData.name, null), regionAuto.about_content);

            urlRows.push({
              url: `/${effectiveSlug}/${continentSlug}/${countrySlugVal}/${regionSlug}`,
              category_slug: effectiveSlug,
              continent: continentSlug,
              country: countrySlugVal,
              region: regionSlug,
              city: "",
              seo_title: regionSeoTitle.value,
              seo_title_source: regionSeoTitle.source,
              h1: regionH1.value,
              h1_source: regionH1.source,
              h2: regionH2.value,
              h2_source: regionH2.source,
              meta_description: regionMetaDesc.value,
              meta_description_source: regionMetaDesc.source,
              intro_text: regionIntro.value,
              intro_text_source: regionIntro.source,
              about_heading: regionAboutHeading.value,
              about_heading_source: regionAboutHeading.source,
              about_content: regionAboutContent.value,
              about_content_source: regionAboutContent.source,
            });

            // Cities in region
            if (true) {
              const regionCities = citiesByCountryRegion.get(`${country}|${regionId}`);
              if (regionCities) {
                for (const city of Array.from(regionCities).sort()) {
                  const citySlug = toSlug(city) || "";
                  const cityAuto = generateAutoValues(category.name, country, regionData.name, city);
                  const cityOverride = findExactOverride(overrides || [], countrySlugVal, regionSlug, citySlug);

                  const citySeoTitle = getSeoValue(cityOverride, "seo_title", processLocationPlaceholder(category.seo_title, country, regionData.name, city), cityAuto.seo_title);
                  const cityH1 = getSeoValue(cityOverride, "h1_override", null, cityAuto.h1);
                  const cityH2 = getSeoValue(cityOverride, "h2_override", processLocationPlaceholder(category.seo_h2_override, country, regionData.name, city), cityAuto.h2);
                  const cityMetaDesc = getSeoValue(cityOverride, "meta_description", processLocationPlaceholder(category.seo_meta_description, country, regionData.name, city), cityAuto.meta_description);
                  const cityIntro = getSeoValue(cityOverride, "intro_text", processLocationPlaceholder(category.seo_intro_text, country, regionData.name, city), cityAuto.intro_text);
                  const cityAboutHeading = getSeoValue(cityOverride, "about_heading", processLocationPlaceholder(category.seo_about_heading, country, regionData.name, city), cityAuto.about_heading);
                  const cityAboutContent = getSeoValue(cityOverride, "about_content", processLocationPlaceholder(category.seo_about_content, country, regionData.name, city), cityAuto.about_content);

                  urlRows.push({
                    url: `/${effectiveSlug}/${continentSlug}/${countrySlugVal}/${regionSlug}/${citySlug}`,
                    category_slug: effectiveSlug,
                    continent: continentSlug,
                    country: countrySlugVal,
                    region: regionSlug,
                    city: citySlug,
                    seo_title: citySeoTitle.value,
                    seo_title_source: citySeoTitle.source,
                    h1: cityH1.value,
                    h1_source: cityH1.source,
                    h2: cityH2.value,
                    h2_source: cityH2.source,
                    meta_description: cityMetaDesc.value,
                    meta_description_source: cityMetaDesc.source,
                    intro_text: cityIntro.value,
                    intro_text_source: cityIntro.source,
                    about_heading: cityAboutHeading.value,
                    about_heading_source: cityAboutHeading.source,
                    about_content: cityAboutContent.value,
                    about_content_source: cityAboutContent.source,
                  });
                }
              }
            }
          }
        } else {
          // Cities without regions
          const countryCities = citiesByCountryRegion.get(`${country}|`);
          if (countryCities) {
            for (const city of Array.from(countryCities).sort()) {
              const citySlug = toSlug(city) || "";
              const cityAuto = generateAutoValues(category.name, country, null, city);
              const cityOverride = findExactOverride(overrides || [], countrySlugVal, null, citySlug);

              const citySeoTitle = getSeoValue(cityOverride, "seo_title", processLocationPlaceholder(category.seo_title, country, null, city), cityAuto.seo_title);
              const cityH1 = getSeoValue(cityOverride, "h1_override", null, cityAuto.h1);
              const cityH2 = getSeoValue(cityOverride, "h2_override", processLocationPlaceholder(category.seo_h2_override, country, null, city), cityAuto.h2);
              const cityMetaDesc = getSeoValue(cityOverride, "meta_description", processLocationPlaceholder(category.seo_meta_description, country, null, city), cityAuto.meta_description);
              const cityIntro = getSeoValue(cityOverride, "intro_text", processLocationPlaceholder(category.seo_intro_text, country, null, city), cityAuto.intro_text);
              const cityAboutHeading = getSeoValue(cityOverride, "about_heading", processLocationPlaceholder(category.seo_about_heading, country, null, city), cityAuto.about_heading);
              const cityAboutContent = getSeoValue(cityOverride, "about_content", processLocationPlaceholder(category.seo_about_content, country, null, city), cityAuto.about_content);

              urlRows.push({
                url: `/${effectiveSlug}/${continentSlug}/${countrySlugVal}/${citySlug}`,
                category_slug: effectiveSlug,
                continent: continentSlug,
                country: countrySlugVal,
                region: "",
                city: citySlug,
                seo_title: citySeoTitle.value,
                seo_title_source: citySeoTitle.source,
                h1: cityH1.value,
                h1_source: cityH1.source,
                h2: cityH2.value,
                h2_source: cityH2.source,
                meta_description: cityMetaDesc.value,
                meta_description_source: cityMetaDesc.source,
                intro_text: cityIntro.value,
                intro_text_source: cityIntro.source,
                about_heading: cityAboutHeading.value,
                about_heading_source: cityAboutHeading.source,
                about_content: cityAboutContent.value,
                about_content_source: cityAboutContent.source,
              });
            }
          }
        }
      }

      // Generate CSV
      const headers = [
        "url", "category_slug", "continent", "country", "region", "city",
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
          escapeField(row.category_slug),
          escapeField(row.continent),
          escapeField(row.country),
          escapeField(row.region),
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
      a.download = `category_urls_${effectiveSlug}_${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Export complete",
        description: `Exported ${urlRows.length} URLs for ${category.name}`,
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
        <CardTitle>Export Category URLs</CardTitle>
        <CardDescription>
          Export all category location URLs with their current SEO values (includes regions for UK/USA)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="space-y-2 md:col-span-2">
            <Label>Select Category</Label>
            <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a category..." />
              </SelectTrigger>
              <SelectContent>
                {leafCategories?.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleExport} disabled={!selectedCategoryId || isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Export Category URLs
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}