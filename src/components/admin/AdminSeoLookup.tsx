'use client';

import Link from 'next/link';
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, AlertCircle } from "lucide-react";
import { VENUE_TYPES } from "@/hooks/useVenues";
import { VENUE_TYPE_DESCRIPTIONS, getVenueTypeAboutContent } from "@/lib/venueTypeContent";

type PageType = 
  | { type: "category"; slug: string; country?: string; city?: string }
  | { type: "venue-location"; continent?: string; country?: string; region?: string; city?: string }
  | { type: "venue-type"; venueType: string; continent?: string; country?: string; region?: string; city?: string }
  | { type: "unknown" };

type SeoFieldSource = {
  value: string | null;
  source: "Category default" | "Location SEO override" | "Venue Location SEO override" | "Venue Type SEO override" | "Auto-generated" | "Not set";
  editLink?: string;
};

type SeoResult = {
  seoTitle: SeoFieldSource;
  h1: SeoFieldSource;
  h2: SeoFieldSource;
  metaDescription: SeoFieldSource;
  introText: SeoFieldSource;
  aboutHeading: SeoFieldSource;
  aboutContent: SeoFieldSource;
};

const venueTypeSlugs = VENUE_TYPES.map(vt => vt.toLowerCase().replace(/\s+/g, '-'));

function parseUrl(url: string): PageType {
  // Remove leading slash and split
  const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
  const segments = cleanUrl.split("/").filter(Boolean);

  if (segments.length === 0) {
    return { type: "unknown" };
  }

  // Check if it's a venue page
  if (segments[0] === "venues") {
    const rest = segments.slice(1);
    
    if (rest.length === 0) {
      return { type: "venue-location" };
    }

    // Check if any segment is a venue type
    const venueTypeIndex = rest.findIndex(seg => venueTypeSlugs.includes(seg));
    
    if (venueTypeIndex !== -1) {
      const venueTypeSlug = rest[venueTypeIndex];
      const venueType = VENUE_TYPES.find(vt => vt.toLowerCase().replace(/\s+/g, '-') === venueTypeSlug) || venueTypeSlug;
      
      // Segments before venue type are location
      const locationSegments = rest.slice(0, venueTypeIndex);
      
      return {
        type: "venue-type",
        venueType,
        continent: locationSegments[0],
        country: locationSegments[1],
        region: locationSegments[2],
        city: locationSegments[3],
      };
    }

    // No venue type found - it's a location page
    return {
      type: "venue-location",
      continent: rest[0],
      country: rest[1],
      region: rest[2],
      city: rest[3],
    };
  }

  // Otherwise it's a category page
  return {
    type: "category",
    slug: segments[0],
    country: segments[1],
    city: segments[2],
  };
}

function formatLocationString(parts: (string | undefined)[]): string {
  return parts
    .filter(Boolean)
    .map(p => p!.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))
    .join(", ");
}

export default function AdminSeoLookup() {
  const [urlInput, setUrlInput] = useState("");
  const [parsedUrl, setParsedUrl] = useState<PageType | null>(null);
  const [isLooking, setIsLooking] = useState(false);

  // Fetch category data if needed
  const { data: categoryData } = useQuery({
    queryKey: ["seo-lookup-category", parsedUrl],
    queryFn: async () => {
      if (!parsedUrl || parsedUrl.type !== "category") return null;
      
      const { data: category } = await supabase
        .from("categories")
        .select("*")
        .or(`slug.eq.${parsedUrl.slug},url_slug.eq.${parsedUrl.slug}`)
        .single();
      
      return category;
    },
    enabled: parsedUrl?.type === "category",
  });

  // Fetch category location SEO override
  const { data: categoryLocationSeo } = useQuery({
    queryKey: ["seo-lookup-category-location", categoryData?.id, parsedUrl],
    queryFn: async () => {
      if (!categoryData?.id || parsedUrl?.type !== "category") return null;
      
      const { country, city } = parsedUrl;
      
      // Try most specific first (city), then country, then none
      if (city && country) {
        const { data } = await supabase
          .from("category_location_seo")
          .select("*")
          .eq("category_id", categoryData.id)
          .ilike("country", country.replace(/-/g, ' '))
          .ilike("city", city.replace(/-/g, ' '))
          .maybeSingle();
        if (data) return data;
      }
      
      if (country) {
        const { data } = await supabase
          .from("category_location_seo")
          .select("*")
          .eq("category_id", categoryData.id)
          .ilike("country", country.replace(/-/g, ' '))
          .is("city", null)
          .maybeSingle();
        if (data) return data;
      }
      
      return null;
    },
    enabled: !!categoryData?.id && parsedUrl?.type === "category",
  });

  // Fetch venue location SEO
  const { data: venueLocationSeo } = useQuery({
    queryKey: ["seo-lookup-venue-location", parsedUrl],
    queryFn: async () => {
      if (!parsedUrl || (parsedUrl.type !== "venue-location" && parsedUrl.type !== "venue-type")) return null;
      
      const { continent, country, region, city } = parsedUrl.type === "venue-location" ? parsedUrl : parsedUrl;
      
      // Try most specific first
      if (city) {
        const { data } = await supabase
          .from("venue_location_seo")
          .select("*")
          .ilike("city", city.replace(/-/g, ' '))
          .maybeSingle();
        if (data) return data;
      }
      
      if (region) {
        const { data } = await supabase
          .from("venue_location_seo")
          .select("*")
          .eq("region_slug", region)
          .is("city", null)
          .maybeSingle();
        if (data) return data;
      }
      
      if (country) {
        const { data } = await supabase
          .from("venue_location_seo")
          .select("*")
          .ilike("country", country.replace(/-/g, ' '))
          .is("region_slug", null)
          .is("city", null)
          .maybeSingle();
        if (data) return data;
      }
      
      if (continent) {
        const { data } = await supabase
          .from("venue_location_seo")
          .select("*")
          .ilike("continent", continent.replace(/-/g, ' '))
          .is("country", null)
          .maybeSingle();
        if (data) return data;
      }
      
      return null;
    },
    enabled: parsedUrl?.type === "venue-location" || parsedUrl?.type === "venue-type",
  });

  // Fetch venue type SEO
  const { data: venueTypeSeo } = useQuery({
    queryKey: ["seo-lookup-venue-type", parsedUrl],
    queryFn: async () => {
      if (!parsedUrl || parsedUrl.type !== "venue-type") return null;
      
      const { venueType, continent, country, region, city } = parsedUrl;
      
      // Try most specific first
      if (city) {
        const { data } = await supabase
          .from("venue_type_seo")
          .select("*")
          .eq("venue_type", venueType)
          .ilike("city", city.replace(/-/g, ' '))
          .maybeSingle();
        if (data) return data;
      }
      
      if (region) {
        const { data } = await supabase
          .from("venue_type_seo")
          .select("*")
          .eq("venue_type", venueType)
          .eq("region_slug", region)
          .is("city", null)
          .maybeSingle();
        if (data) return data;
      }
      
      if (country) {
        const { data } = await supabase
          .from("venue_type_seo")
          .select("*")
          .eq("venue_type", venueType)
          .ilike("country", country.replace(/-/g, ' '))
          .is("region_slug", null)
          .is("city", null)
          .maybeSingle();
        if (data) return data;
      }
      
      if (continent) {
        const { data } = await supabase
          .from("venue_type_seo")
          .select("*")
          .eq("venue_type", venueType)
          .ilike("continent", continent.replace(/-/g, ' '))
          .is("country", null)
          .maybeSingle();
        if (data) return data;
      }
      
      // Type-only (no location)
      const { data } = await supabase
        .from("venue_type_seo")
        .select("*")
        .eq("venue_type", venueType)
        .is("continent", null)
        .is("country", null)
        .maybeSingle();
      
      return data;
    },
    enabled: parsedUrl?.type === "venue-type",
  });

  const handleLookup = () => {
    const parsed = parseUrl(urlInput);
    setParsedUrl(parsed);
    setIsLooking(true);
  };

  // Build SEO results
  const getSeoResults = (): SeoResult | null => {
    if (!parsedUrl || !isLooking) return null;

    if (parsedUrl.type === "category") {
      const locationParts = [parsedUrl.city, parsedUrl.country].filter(Boolean);
      const locationStr = formatLocationString(locationParts);
      const categoryName = categoryData?.name || parsedUrl.slug;
      
      // Placeholder replacement helper
      const replacePlaceholders = (template: string | null | undefined): string => {
        if (!template) return '';
        let result = template;
        if (locationStr) {
          result = result.replace(/\{in_location\}/gi, `in ${locationStr}`);
          result = result.replace(/\{location\}/gi, locationStr);
        } else {
          result = result.replace(/\{in_location\}/gi, '');
          result = result.replace(/\{location\}/gi, '');
        }
        // Clean up double spaces and awkward punctuation
        return result.replace(/\s{2,}/g, ' ').replace(/\s+\./g, '.').replace(/\s+,/g, ',').trim();
      };

      // For SEO title, we need special handling to support placeholders
      const generateCategorySeoTitle = (): SeoFieldSource => {
        // Priority 1: Location-specific SEO override
        if (categoryLocationSeo?.seo_title) {
          return {
            value: categoryLocationSeo.seo_title,
            source: "Location SEO override",
            editLink: `/admin/location-seo`,
          };
        }
        
        // Priority 2: Category-level seo_title with placeholders
        if (categoryData?.seo_title) {
          return {
            value: replacePlaceholders(categoryData.seo_title),
            source: "Category default",
            editLink: `/admin/categories`,
          };
        }
        
        // Priority 3: Auto-generated fallback
        return {
          value: locationStr ? `${categoryName} in ${locationStr} | Showcase Music` : `${categoryName} | Showcase Music`,
          source: "Auto-generated",
        };
      };
      
      const makeField = (
        overrideValue: string | null | undefined,
        defaultValue: string | null | undefined,
        autoValue: string,
        overrideId?: string
      ): SeoFieldSource => {
        if (overrideValue) {
          return {
            value: overrideValue,
            source: "Location SEO override",
            editLink: overrideId ? `/admin/location-seo` : undefined,
          };
        }
        if (defaultValue) {
          return {
            value: replacePlaceholders(defaultValue),
            source: "Category default",
            editLink: categoryData?.id ? `/admin/categories` : undefined,
          };
        }
        return {
          value: autoValue,
          source: "Auto-generated",
        };
      };

      return {
        seoTitle: generateCategorySeoTitle(),
        h1: makeField(
          categoryLocationSeo?.h1_override,
          null,
          locationStr ? `${categoryName} in ${locationStr}` : categoryName,
          categoryLocationSeo?.id
        ),
        h2: makeField(
          categoryLocationSeo?.h2_override,
          categoryData?.seo_h2_override,
          locationStr ? `Browse ${categoryName} in ${locationStr}` : `Browse ${categoryName}`,
          categoryLocationSeo?.id
        ),
        metaDescription: makeField(
          categoryLocationSeo?.meta_description,
          categoryData?.seo_meta_description,
          `Find ${categoryName.toLowerCase()} services${locationStr ? ` in ${locationStr}` : ''}. Browse our directory of trusted suppliers.`,
          categoryLocationSeo?.id
        ),
        introText: makeField(
          categoryLocationSeo?.intro_text,
          categoryData?.seo_intro_text,
          "",
          categoryLocationSeo?.id
        ),
        aboutHeading: makeField(
          categoryLocationSeo?.about_heading,
          categoryData?.seo_about_heading,
          locationStr ? `About ${categoryName} in ${locationStr}` : `About ${categoryName}`,
          categoryLocationSeo?.id
        ),
        aboutContent: makeField(
          categoryLocationSeo?.about_content,
          categoryData?.seo_about_content,
          "",
          categoryLocationSeo?.id
        ),
      };
    }

    if (parsedUrl.type === "venue-location") {
      const locationParts = [parsedUrl.city, parsedUrl.region, parsedUrl.country, parsedUrl.continent];
      const locationStr = formatLocationString(locationParts) || "Worldwide";
      
      const makeField = (
        overrideValue: string | null | undefined,
        autoValue: string
      ): SeoFieldSource => {
        if (overrideValue) {
          return {
            value: overrideValue,
            source: "Venue Location SEO override",
            editLink: `/admin/venue-location-seo`,
          };
        }
        return {
          value: autoValue,
          source: "Auto-generated",
        };
      };

      return {
        seoTitle: makeField(venueLocationSeo?.seo_title, `Music Venues in ${locationStr} | Showcase Music`),
        h1: makeField(venueLocationSeo?.h1_override, `Music Venues in ${locationStr}`),
        h2: makeField(venueLocationSeo?.h2_override, `Browse Venues in ${locationStr}`),
        metaDescription: makeField(venueLocationSeo?.meta_description, `Discover music venues in ${locationStr}. Browse venues with capacity, contact details, and booking information.`),
        introText: makeField(venueLocationSeo?.intro_text, ""),
        aboutHeading: makeField(venueLocationSeo?.about_heading, `About Music Venues in ${locationStr}`),
        aboutContent: makeField(venueLocationSeo?.about_content, ""),
      };
    }

    if (parsedUrl.type === "venue-type") {
      const { venueType } = parsedUrl;
      const locationParts = [parsedUrl.city, parsedUrl.region, parsedUrl.country, parsedUrl.continent];
      const locationStr = formatLocationString(locationParts) || "Worldwide";
      const pluralType = venueType.endsWith('s') ? venueType : `${venueType}s`;
      
      const makeField = (
        typeOverrideValue: string | null | undefined,
        locationOverrideValue: string | null | undefined,
        autoValue: string,
        fieldName: string
      ): SeoFieldSource => {
        if (typeOverrideValue) {
          return {
            value: typeOverrideValue,
            source: "Venue Type SEO override",
            editLink: `/admin/venue-type-seo`,
          };
        }
        if (locationOverrideValue) {
          return {
            value: locationOverrideValue,
            source: "Venue Location SEO override",
            editLink: `/admin/venue-location-seo`,
          };
        }
        return {
          value: autoValue,
          source: "Auto-generated",
        };
      };

      const typeDescription = VENUE_TYPE_DESCRIPTIONS[venueType] || "";
      const aboutContent = typeDescription 
        ? getVenueTypeAboutContent(venueType, locationStr)
        : `Browse our directory of ${pluralType.toLowerCase()} in ${locationStr} to find the perfect venue for your next event.`;

      return {
        seoTitle: makeField(
          venueTypeSeo?.seo_title,
          venueLocationSeo?.seo_title,
          `${pluralType} in ${locationStr} | Showcase Music`,
          "seoTitle"
        ),
        h1: makeField(
          venueTypeSeo?.h1_override,
          venueLocationSeo?.h1_override,
          `${pluralType} in ${locationStr}`,
          "h1"
        ),
        h2: makeField(
          venueTypeSeo?.h2_override,
          venueLocationSeo?.h2_override,
          `Browse ${pluralType} in ${locationStr}`,
          "h2"
        ),
        metaDescription: makeField(
          venueTypeSeo?.meta_description,
          venueLocationSeo?.meta_description,
          `Discover ${pluralType.toLowerCase()} in ${locationStr}. Browse venues with capacity, contact details, and booking information for your next event.`,
          "metaDescription"
        ),
        introText: makeField(
          venueTypeSeo?.intro_text,
          venueLocationSeo?.intro_text,
          "",
          "introText"
        ),
        aboutHeading: makeField(
          venueTypeSeo?.about_heading,
          venueLocationSeo?.about_heading,
          `About ${pluralType} in ${locationStr}`,
          "aboutHeading"
        ),
        aboutContent: makeField(
          venueTypeSeo?.about_content,
          venueLocationSeo?.about_content,
          aboutContent,
          "aboutContent"
        ),
      };
    }

    return null;
  };

  const seoResults = getSeoResults();

  const getPageTypeLabel = () => {
    if (!parsedUrl) return "";
    switch (parsedUrl.type) {
      case "category":
        if (parsedUrl.city) return "Category + Country + City Page";
        if (parsedUrl.country) return "Category + Country Page";
        return "Category Landing Page";
      case "venue-location":
        if (parsedUrl.city) return "Venue City Page";
        if (parsedUrl.region) return "Venue Region Page";
        if (parsedUrl.country) return "Venue Country Page";
        if (parsedUrl.continent) return "Venue Continent Page";
        return "Venue Finder Home";
      case "venue-type":
        return `Venue Type Page (${parsedUrl.venueType})`;
      default:
        return "Unknown Page Type";
    }
  };

  const getSourceBadgeColor = (source: SeoFieldSource["source"]) => {
    switch (source) {
      case "Category default":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30";
      case "Location SEO override":
        return "bg-green-500/20 text-green-600 border-green-500/30";
      case "Venue Location SEO override":
        return "bg-purple-500/20 text-purple-600 border-purple-500/30";
      case "Venue Type SEO override":
        return "bg-orange-500/20 text-orange-600 border-orange-500/30";
      case "Auto-generated":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">SEO Lookup</h1>
        <p className="text-muted-foreground">
          Enter a page URL to see what controls the SEO for that page
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lookup URL</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="url-input" className="sr-only">Page URL</Label>
              <Input
                id="url-input"
                placeholder="/backline-hire/united-kingdom or /venues/europe/united-kingdom/arenas"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLookup()}
              />
            </div>
            <Button onClick={handleLookup}>
              <Search className="h-4 w-4 mr-2" />
              Lookup
            </Button>
          </div>
        </CardContent>
      </Card>
      {parsedUrl && parsedUrl.type === "unknown" && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <span>Could not parse this URL. Make sure it's a valid category or venue page URL.</span>
            </div>
          </CardContent>
        </Card>
      )}
      {parsedUrl && parsedUrl.type !== "unknown" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-3">
              Page Type
              <Badge variant="outline">{getPageTypeLabel()}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {parsedUrl.type === "category" && (
                <div className="space-y-1">
                  <p><strong>Category slug:</strong> {parsedUrl.slug}</p>
                  {parsedUrl.country && <p><strong>Country:</strong> {parsedUrl.country}</p>}
                  {parsedUrl.city && <p><strong>City:</strong> {parsedUrl.city}</p>}
                  {categoryData && <p><strong>Category name:</strong> {categoryData.name}</p>}
                </div>
              )}
              {parsedUrl.type === "venue-location" && (
                <div className="space-y-1">
                  {parsedUrl.continent && <p><strong>Continent:</strong> {parsedUrl.continent}</p>}
                  {parsedUrl.country && <p><strong>Country:</strong> {parsedUrl.country}</p>}
                  {parsedUrl.region && <p><strong>Region:</strong> {parsedUrl.region}</p>}
                  {parsedUrl.city && <p><strong>City:</strong> {parsedUrl.city}</p>}
                </div>
              )}
              {parsedUrl.type === "venue-type" && (
                <div className="space-y-1">
                  <p><strong>Venue type:</strong> {parsedUrl.venueType}</p>
                  {parsedUrl.continent && <p><strong>Continent:</strong> {parsedUrl.continent}</p>}
                  {parsedUrl.country && <p><strong>Country:</strong> {parsedUrl.country}</p>}
                  {parsedUrl.region && <p><strong>Region:</strong> {parsedUrl.region}</p>}
                  {parsedUrl.city && <p><strong>City:</strong> {parsedUrl.city}</p>}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      {seoResults && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">SEO Field Sources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(seoResults).map(([fieldKey, field]) => {
              const fieldLabels: Record<string, string> = {
                seoTitle: "SEO Title",
                h1: "H1",
                h2: "H2",
                metaDescription: "Meta Description",
                introText: "Intro Text",
                aboutHeading: "About Heading",
                aboutContent: "About Content",
              };

              return (
                <div key={fieldKey} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{fieldLabels[fieldKey]}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getSourceBadgeColor(field.source)}>
                        {field.source}
                      </Badge>
                      {field.editLink && (
                        <Link
                          href={field.editLink}
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          Edit <ExternalLink className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                    {field.value || <span className="italic">Empty</span>}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
