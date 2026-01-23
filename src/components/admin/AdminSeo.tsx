'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAllCategoryLocationSeo } from "@/hooks/useCategoryLocationSeo";
import { useAllVenueLocationSeo } from "@/hooks/useVenueLocationSeo";
import { useAllVenueTypeSeo } from "@/hooks/useVenueTypeSeo";
import { useCategories } from "@/hooks/useCategories";
import { useCountries } from "@/hooks/useLocationOptions";
import { useRegionsByCountry, useCitiesByRegion, useCitiesByCountry } from "@/hooks/useListings";
import { CONTINENT_COUNTRIES } from "@/lib/continents";
import { VENUE_TYPES } from "@/hooks/useVenues";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  Download,
  Check,
  AlertCircle,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { SeoReferenceGuide } from "@/components/admin/SeoReferenceGuide";
import { ExportCategoryUrls } from "@/components/admin/ExportCategoryUrls";
import { ExportVenueUrls } from "@/components/admin/ExportVenueUrls";
import { ExportVenueTypeUrls } from "@/components/admin/ExportVenueTypeUrls";
import { CategorySeoImport } from "@/components/admin/CategorySeoImport";

const continents = Object.keys(CONTINENT_COUNTRIES);

// ============ CATEGORY LOCATION SEO TAB ============
const CategoryLocationSeoTab = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: locationSeoRecords, isLoading } = useAllCategoryLocationSeo();
  const { data: categories } = useCategories();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  // Search and pagination state
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  const [seoTitleCount, setSeoTitleCount] = useState(0);
  const [h1Count, setH1Count] = useState(0);
  const [h2Count, setH2Count] = useState(0);
  const [metaDescCount, setMetaDescCount] = useState(0);
  const [metaKeywordsCount, setMetaKeywordsCount] = useState(0);
  const [introTextCount, setIntroTextCount] = useState(0);
  const [aboutHeadingCount, setAboutHeadingCount] = useState(0);
  const [aboutContentCount, setAboutContentCount] = useState(0);
  const [isExportingMissing, setIsExportingMissing] = useState(false);

  const { data: countries } = useCountries();
  const { data: regions } = useRegionsByCountry(selectedCountry || undefined);
  const { data: citiesByRegionData } = useCitiesByRegion(
    regions?.find((r) => r.region_name === selectedRegion)?.id || undefined,
  );
  const { data: citiesByCountryData } = useCitiesByCountry(undefined, selectedCountry || undefined);

  // Use region cities if region is selected, otherwise country cities
  const cities = selectedRegion ? citiesByRegionData : citiesByCountryData;

  // Countries that have regions
  const COUNTRIES_WITH_REGIONS = ["United Kingdom", "UK", "United States", "USA"];
  const countryHasRegions = (country: string) =>
    COUNTRIES_WITH_REGIONS.some((c) => c.toLowerCase() === country.toLowerCase());

  useEffect(() => {
    if (editingRecord?.country) {
      setSelectedCountry(editingRecord.country);
    } else {
      setSelectedCountry("");
    }
    if (editingRecord?.region) {
      setSelectedRegion(editingRecord.region);
    } else {
      setSelectedRegion("");
    }
    setSeoTitleCount(editingRecord?.seo_title?.length || 0);
    setH1Count(editingRecord?.h1_override?.length || 0);
    setH2Count(editingRecord?.h2_override?.length || 0);
    setMetaDescCount(editingRecord?.meta_description?.length || 0);
    setMetaKeywordsCount(editingRecord?.meta_keywords?.length || 0);
    setIntroTextCount(editingRecord?.intro_text?.length || 0);
    setAboutHeadingCount(editingRecord?.about_heading?.length || 0);
    setAboutContentCount(editingRecord?.about_content?.length || 0);
  }, [editingRecord, isDialogOpen]);

  // Reset region when country changes
  useEffect(() => {
    if (!editingRecord) {
      setSelectedRegion("");
    }
  }, [selectedCountry, editingRecord]);

  const createMutation = useMutation({
    mutationFn: async (record: any) => {
      const { error } = await supabase.from("category_location_seo").insert([record]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category-location-seo-all"] });
      toast({ title: "Location SEO record created" });
      setIsDialogOpen(false);
      setEditingRecord(null);
    },
    onError: (error: any) => {
      toast({ title: "Error creating record", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (record: any) => {
      const { id, ...data } = record;
      const { error } = await supabase.from("category_location_seo").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category-location-seo-all"] });
      toast({ title: "Location SEO record updated" });
      setIsDialogOpen(false);
      setEditingRecord(null);
    },
    onError: (error: any) => {
      toast({ title: "Error updating record", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("category_location_seo").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category-location-seo-all"] });
      toast({ title: "Location SEO record deleted" });
    },
    onError: (error: any) => {
      toast({ title: "Error deleting record", description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const countryValue = formData.get("country") as string;
    const regionValue = formData.get("region") as string;
    const cityValue = formData.get("city") as string;

    const record = {
      category_id: formData.get("category_id") as string,
      country: countryValue === "__all__" || !countryValue?.trim() ? null : countryValue.trim(),
      region: regionValue === "__all__" || !regionValue?.trim() ? null : regionValue.trim(),
      city: cityValue === "__all__" || !cityValue?.trim() ? null : cityValue.trim(),
      seo_title: (formData.get("seo_title") as string)?.trim() || null,
      h1_override: (formData.get("h1_override") as string)?.trim() || null,
      h2_override: (formData.get("h2_override") as string)?.trim() || null,
      meta_description: (formData.get("meta_description") as string)?.trim() || null,
      meta_keywords: (formData.get("meta_keywords") as string)?.trim() || null,
      intro_text: (formData.get("intro_text") as string)?.trim() || null,
      about_heading: (formData.get("about_heading") as string)?.trim() || null,
      about_content: (formData.get("about_content") as string)?.trim() || null,
    };

    if (editingRecord) {
      updateMutation.mutate({ id: editingRecord.id, ...record });
    } else {
      createMutation.mutate(record);
    }
  };

  const downloadTemplate = () => {
    const headers =
      "category_slug,country,region,city,seo_title,h1_override,h2_override,meta_description,meta_keywords,intro_text,about_heading,about_content";
    const example =
      'backline,United Kingdom,London,,"London Backline | Showcase","Backline Hire London","London Backline",Description...,keywords,Intro...,About,Content...';
    const csv = `${headers}\n${example}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "category_location_seo_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const parseCsv = (text: string): any[] => {
    const lines = text
      .trim()
      .split("\n")
      .filter((line) => !line.trim().startsWith("#"));
    if (lines.length < 2) return [];

    // Parse headers
    const headerLine = lines[0];
    const headers: string[] = [];
    let current = "";
    let inQuotes = false;
    for (const char of headerLine) {
      if (char === '"') inQuotes = !inQuotes;
      else if (char === "," && !inQuotes) {
        headers.push(current.trim().toLowerCase());
        current = "";
      } else current += char;
    }
    headers.push(current.trim().toLowerCase());

    // Aliases for column names
    const headerAliases: Record<string, string> = { h1: "h1_override", h2: "h2_override" };
    const expectedColumns = [
      "category_slug",
      "country",
      "region",
      "city",
      "seo_title",
      "h1_override",
      "h2_override",
      "meta_description",
      "meta_keywords",
      "intro_text",
      "about_heading",
      "about_content",
    ];

    return lines
      .slice(1)
      .filter((line) => line.trim())
      .map((line, idx) => {
        const values: string[] = [];
        current = "";
        inQuotes = false;
        for (const char of line) {
          if (char === '"') inQuotes = !inQuotes;
          else if (char === "," && !inQuotes) {
            values.push(current.trim());
            current = "";
          } else current += char;
        }
        values.push(current.trim());

        const row: any = {};
        expectedColumns.forEach((col) => {
          row[col] = "";
        });
        headers.forEach((h, i) => {
          const normalized = headerAliases[h] || h;
          if (expectedColumns.includes(normalized)) {
            row[normalized] = values[i]?.replace(/^"|"$/g, "") || "";
          }
        });
        return row;
      });
  };

  const validateCsvData = (rows: any[]): any[] => {
    return rows.map((row, idx) => {
      if (!row.category_slug?.trim()) {
        return { ...row, isValid: false, error: "Missing category_slug" };
      }
      const slug = row.category_slug.trim();
      const category = categories?.find((c) => c.url_slug === slug || c.slug === slug);
      if (!category) {
        return { ...row, isValid: false, error: `Category "${slug}" not found` };
      }
      return { ...row, isValid: true, categoryId: category.id };
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const parsed = parseCsv(text);
      const validated = validateCsvData(parsed);
      setCsvData(validated);
    };
    reader.readAsText(file);
  };

  // Build location string - concise format for UK/USA (no country), full format for others
  const buildLocationString = (country: string | null, region: string | null, city: string | null): string => {
    const isRegionCountry = country && countryHasRegions(country);
    if (city && region && isRegionCountry) return `${city}, ${region}`;
    if (region && isRegionCountry) return region;
    if (city && region && country) return `${city}, ${region}, ${country}`;
    if (city && country) return `${city}, ${country}`;
    if (region && country) return `${region}, ${country}`;
    if (country) return country;
    return "";
  };

  // Generate auto values for a given category name and location
  const generateAutoValues = (
    categoryName: string,
    country: string | null,
    region: string | null,
    city: string | null,
  ) => {
    const locationString = buildLocationString(country, region, city);
    const locationSuffix = locationString ? ` in ${locationString}` : "";

    return {
      seo_title: `${categoryName}${locationSuffix} | Showcase`,
      h1_override: `${categoryName}${locationSuffix}`,
      h2_override: `${categoryName} Companies${locationSuffix}`,
      meta_description: `Find ${categoryName.toLowerCase()} companies${locationSuffix}. Browse our directory of trusted suppliers.`,
      intro_text: `Discover ${categoryName.toLowerCase()} services${locationSuffix}.`,
      about_heading: `About ${categoryName}`,
      about_content: `Find the best ${categoryName.toLowerCase()} providers${locationSuffix}.`,
    };
  };

  // Process {location} placeholder in category defaults
  const processLocationPlaceholder = (
    text: string | null,
    country: string | null,
    region: string | null,
    city: string | null,
  ): string | null => {
    if (!text) return null;
    const locationString = buildLocationString(country, region, city);
    const locationSuffix = locationString ? `in ${locationString}` : "";
    return text
      .replace(/\{location\}/g, locationSuffix)
      .replace(/\s+/g, " ")
      .trim();
  };

  // Check if any SEO field differs from effective value (category default or auto)
  const hasOverrideValues = (row: any, category: any): boolean => {
    const country = row.country?.trim() || null;
    const region = row.region?.trim() || null;
    const city = row.city?.trim() || null;
    const auto = generateAutoValues(category.name, country, region, city);

    // Get effective values: category default (with location placeholder) or auto
    const effectiveValues = {
      seo_title: auto.seo_title, // No category default for seo_title
      h1_override: auto.h1_override, // No category default for h1
      h2_override: processLocationPlaceholder(category.seo_h2_override, country, region, city) || auto.h2_override,
      meta_description:
        processLocationPlaceholder(category.seo_meta_description, country, region, city) || auto.meta_description,
      intro_text: processLocationPlaceholder(category.seo_intro_text, country, region, city) || auto.intro_text,
      about_heading: category.seo_about_heading || auto.about_heading,
      about_content: category.seo_about_content || auto.about_content,
    };

    const fields = [
      { name: "seo_title", csv: row.seo_title?.trim(), effective: effectiveValues.seo_title },
      { name: "h1_override", csv: row.h1_override?.trim(), effective: effectiveValues.h1_override },
      { name: "h2_override", csv: row.h2_override?.trim(), effective: effectiveValues.h2_override },
      { name: "meta_description", csv: row.meta_description?.trim(), effective: effectiveValues.meta_description },
      { name: "intro_text", csv: row.intro_text?.trim(), effective: effectiveValues.intro_text },
      { name: "about_heading", csv: row.about_heading?.trim(), effective: effectiveValues.about_heading },
      { name: "about_content", csv: row.about_content?.trim(), effective: effectiveValues.about_content },
      { name: "meta_keywords", csv: row.meta_keywords?.trim(), effective: "" },
    ];

    const differences: string[] = [];

    for (const field of fields) {
      const csvValue = field.csv || "";
      const effectiveValue = field.effective || "";

      if (csvValue && csvValue !== effectiveValue) {
        differences.push(field.name);
      }
    }

    const hasOverride = differences.length > 0;

    return hasOverride;
  };

  const handleImport = async () => {
    const validRows = csvData.filter((row) => row.isValid && row.categoryId);

    if (validRows.length === 0) {
      toast({ title: "No valid rows to import", variant: "destructive" });
      return;
    }
    setIsImporting(true);
    let created = 0,
      skipped = 0,
      errors = 0;

    for (const row of validRows) {
      try {
        const category = categories?.find((c) => c.id === row.categoryId);

        if (!category) {
          errors++;
          continue;
        }

        // Check if this row has any values that differ from effective defaults
        if (!hasOverrideValues(row, category)) {
          skipped++;
          continue;
        }

        // Build the data for insert
        const insertData = {
          category_id: row.categoryId,
          country: row.country?.trim() || null,
          region: row.region?.trim() || null,
          city: row.city?.trim() || null,
          seo_title: row.seo_title?.trim() || null,
          h1_override: row.h1_override?.trim() || null,
          h2_override: row.h2_override?.trim() || null,
          meta_description: row.meta_description?.trim() || null,
          meta_keywords: row.meta_keywords?.trim() || null,
          intro_text: row.intro_text?.trim() || null,
          about_heading: row.about_heading?.trim() || null,
          about_content: row.about_content?.trim() || null,
        };

        // First try to find existing record with exact match (including region)
        let existingQuery = supabase
          .from("category_location_seo")
          .select("id, region")
          .eq("category_id", insertData.category_id);

        // Handle country matching (NULL vs value)
        if (insertData.country) {
          existingQuery = existingQuery.eq("country", insertData.country);
        } else {
          existingQuery = existingQuery.is("country", null);
        }

        // Handle city matching (NULL vs value)
        if (insertData.city) {
          existingQuery = existingQuery.eq("city", insertData.city);
        } else {
          existingQuery = existingQuery.is("city", null);
        }

        const { data: existingRecords } = await existingQuery;

        // Find exact match (same region) or legacy record (NULL region)
        const existing = existingRecords?.find((r) => r.region === insertData.region);
        const legacyRecord = existingRecords?.find((r) => r.region === null && insertData.region !== null);

        let result;
        if (existing) {
          // Update existing record with exact match
          result = await supabase
            .from("category_location_seo")
            .update({
              seo_title: insertData.seo_title,
              h1_override: insertData.h1_override,
              h2_override: insertData.h2_override,
              meta_description: insertData.meta_description,
              meta_keywords: insertData.meta_keywords,
              intro_text: insertData.intro_text,
              about_heading: insertData.about_heading,
              about_content: insertData.about_content,
            })
            .eq("id", existing.id);
        } else if (legacyRecord) {
          // Update legacy record (add region and update SEO fields)
          result = await supabase
            .from("category_location_seo")
            .update({
              region: insertData.region,
              seo_title: insertData.seo_title,
              h1_override: insertData.h1_override,
              h2_override: insertData.h2_override,
              meta_description: insertData.meta_description,
              meta_keywords: insertData.meta_keywords,
              intro_text: insertData.intro_text,
              about_heading: insertData.about_heading,
              about_content: insertData.about_content,
            })
            .eq("id", legacyRecord.id);
        } else {
          // Insert new record
          result = await supabase.from("category_location_seo").insert(insertData);
        }

        if (result.error) {
          errors++;
          console.error(`Import error for ${row.category_slug}:`, result.error.message);
        } else {
          created++;
        }
      } catch (e) {
        errors++;
        console.error(`Import exception:`, e);
      }
    }

    setIsImporting(false);
    setCsvData([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    queryClient.invalidateQueries({ queryKey: ["category-location-seo-all"] });

    const description =
      errors > 0
        ? `Created ${created} overrides, skipped ${skipped} rows (no changes from defaults), ${errors} errors`
        : `Created ${created} overrides, skipped ${skipped} rows (no changes from defaults)`;
    toast({ title: "Import complete", description });
  };

  const leafCategories = categories?.filter((cat) => !categories.some((c) => c.parent_id === cat.id));

  // Filter and paginate records
  const filteredRecords =
    locationSeoRecords?.filter((record: any) => {
      if (!searchTerm.trim()) return true;
      const search = searchTerm.toLowerCase();
      return (
        record.categories?.name?.toLowerCase().includes(search) ||
        record.country?.toLowerCase().includes(search) ||
        record.region?.toLowerCase().includes(search) ||
        record.city?.toLowerCase().includes(search) ||
        record.seo_title?.toLowerCase().includes(search) ||
        record.h1_override?.toLowerCase().includes(search)
      );
    }) || [];

  const totalPages = Math.ceil(filteredRecords.length / pageSize);
  const paginatedRecords = filteredRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Reset to page 1 when search changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  const exportOverrides = () => {
    if (!locationSeoRecords?.length) return;
    const headers =
      "category_slug,country,region,city,seo_title,h1_override,h2_override,meta_description,meta_keywords,intro_text,about_heading,about_content";
    const escapeField = (val: string | null | undefined) => {
      if (!val) return "";
      if (val.includes(",") || val.includes('"') || val.includes("\n")) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    };
    const rows = locationSeoRecords.map((record: any) =>
      [
        escapeField(record.categories?.url_slug || record.categories?.slug || ""),
        escapeField(record.country),
        escapeField(record.region),
        escapeField(record.city),
        escapeField(record.seo_title),
        escapeField(record.h1_override),
        escapeField(record.h2_override),
        escapeField(record.meta_description),
        escapeField(record.meta_keywords),
        escapeField(record.intro_text),
        escapeField(record.about_heading),
        escapeField(record.about_content),
      ].join(","),
    );
    const csv = `${headers}\n${rows.join("\n")}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `category_location_seo_export_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // isExportingMissing state moved to top of component

  // Build category URL from location parameters
  const buildCategoryUrl = (
    categorySlug: string,
    continent: string | null,
    country: string | null,
    region: string | null,
    city: string | null,
  ): string => {
    const parts = [`/${categorySlug}`];

    if (continent && country) {
      const continentSlug = continent.toLowerCase().replace(/\s+/g, "-");
      parts.push(continentSlug);

      // Use preferred country slug (uk, usa) if available
      let countrySlug = country
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      if (country === "United Kingdom") countrySlug = "uk";
      if (country === "United States") countrySlug = "usa";
      parts.push(countrySlug);

      if (region) {
        const regionSlug = region
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        parts.push(regionSlug);

        if (city) {
          const citySlug = city
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
          parts.push(citySlug);
        }
      } else if (city) {
        // City without region (non-UK/USA countries)
        const citySlug = city
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        parts.push(citySlug);
      }
    }

    return parts.join("/");
  };

  // Get continent for a country
  const getContinentForCountry = (country: string): string | null => {
    for (const [continent, countries] of Object.entries(CONTINENT_COUNTRIES)) {
      if (countries.includes(country)) {
        return continent;
      }
    }
    return null;
  };

  const exportMissingOverrides = async () => {
    if (!categories?.length) {
      toast({ title: "Categories not loaded", variant: "destructive" });
      return;
    }

    setIsExportingMissing(true);

    try {
      console.log('Export missing overrides starting...');
      
      // Fetch all listings with their category relationships
      // Query from listings table with inner join to listing_categories
      const { data: listings, error } = await supabase
        .from("listings")
        .select(`
          country,
          region_id,
          town_city,
          listing_categories!inner(category_id)
        `)
        .not("country", "is", null);

      if (error) {
        console.error('Query error:', error);
        throw error;
      }

      console.log('Listings result:', listings?.length || 0, 'listings found');

      // Get regions for region_id mapping
      const { data: regionsData } = await supabase.from("regions").select("id, region_name");

      const regionMap = new Map(regionsData?.map((r) => [r.id, r.region_name]) || []);

      // Get leaf categories only
      const leafCats = categories.filter((cat) => !categories.some((c) => c.parent_id === cat.id));

      // Build all possible URL variations based on listing data
      // We track at all levels: category-only, country, region, city
      interface UrlVariation {
        category_id: string;
        country: string | null;
        region: string | null;
        city: string | null;
        url: string;
        level: "category" | "country" | "region" | "city";
      }

      const allVariations = new Map<string, UrlVariation>();

      // Helper to add a variation
      const addVariation = (
        categoryId: string,
        country: string | null,
        region: string | null,
        city: string | null,
        level: "category" | "country" | "region" | "city",
      ) => {
        const key = `${categoryId}|${country || ""}|${region || ""}|${city || ""}`;
        if (!allVariations.has(key)) {
          const cat = leafCats.find((c) => c.id === categoryId);
          if (!cat) return; // Skip if not a leaf category

          const categorySlug = cat.url_slug || cat.slug;
          const continent = country ? getContinentForCountry(country) : null;
          const url = buildCategoryUrl(categorySlug, continent, country, region, city);

          allVariations.set(key, {
            category_id: categoryId,
            country,
            region,
            city,
            url,
            level,
          });
        }
      };

      // Process each listing to build all variations
      listings?.forEach((listing: any) => {
        const country = listing.country;
        const regionId = listing.region_id;
        const region = regionId ? regionMap.get(regionId) || null : null;
        const city = listing.town_city || null;

        // listing_categories can be array or single object
        const listingCategories = Array.isArray(listing.listing_categories) 
          ? listing.listing_categories 
          : [listing.listing_categories];

        listingCategories.forEach((lc: any) => {
          const categoryId = lc.category_id;
          
          if (!categoryId) return;

          // Level 1: Category only (no location filter)
          addVariation(categoryId, null, null, null, "category");

          if (country) {
            // Level 2: Category + Country
            addVariation(categoryId, country, null, null, "country");

            if (region) {
              // Level 3: Category + Country + Region
              addVariation(categoryId, country, region, null, "region");

              if (city) {
                // Level 4: Category + Country + Region + City
                addVariation(categoryId, country, region, city, "city");
              }
            } else if (city) {
              // Level 4 (no region): Category + Country + City (for non-UK/USA)
              addVariation(categoryId, country, null, city, "city");
            }
          }
        });
      });

      console.log('Generated', allVariations.size, 'URL variations');

      // Build a set of existing overrides for quick lookup
      // Key format: category_id|country|region|city (all normalized to empty string if null)
      const existingSet = new Set(
        locationSeoRecords?.map((r: any) => `${r.category_id}|${r.country || ""}|${r.region || ""}|${r.city || ""}`) ||
          [],
      );

      // Filter to only those WITHOUT overrides
      const missing: UrlVariation[] = [];
      allVariations.forEach((variation, key) => {
        if (!existingSet.has(key)) {
          missing.push(variation);
        }
      });

      console.log('Missing overrides:', missing.length);

      if (missing.length === 0) {
        toast({ title: "All URLs have overrides", description: "No missing overrides found." });
        setIsExportingMissing(false);
        return;
      }

      // Build CSV with URL column
      const headers =
        "url,category_slug,country,region,city,level,seo_title,h1_override,h2_override,meta_description,meta_keywords,intro_text,about_heading,about_content";
      const escapeField = (val: string | null | undefined) => {
        if (!val) return "";
        if (val.includes(",") || val.includes('"') || val.includes("\n")) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      };

      const rows = missing
        .sort((a, b) => {
          const catA = categories.find((c) => c.id === a.category_id)?.slug || "";
          const catB = categories.find((c) => c.id === b.category_id)?.slug || "";
          // Sort by category, then level order (category < country < region < city), then location
          const levelOrder = { category: 0, country: 1, region: 2, city: 3 };
          return (
            catA.localeCompare(catB) ||
            levelOrder[a.level] - levelOrder[b.level] ||
            (a.country || "").localeCompare(b.country || "") ||
            (a.region || "").localeCompare(b.region || "") ||
            (a.city || "").localeCompare(b.city || "")
          );
        })
        .map((variation) => {
          const cat = categories.find((c) => c.id === variation.category_id);
          const slug = cat?.url_slug || cat?.slug || "";
          return [
            escapeField(variation.url),
            escapeField(slug),
            escapeField(variation.country),
            escapeField(variation.region),
            escapeField(variation.city),
            escapeField(variation.level),
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "", // empty SEO fields for user to fill
          ].join(",");
        });

      const csv = `${headers}\n${rows.join("\n")}`;
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `missing_category_seo_overrides_${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);

      // Count by level for the toast message
      const counts = { category: 0, country: 0, region: 0, city: 0 };
      missing.forEach((v) => counts[v.level]++);

      toast({
        title: "Export complete",
        description: `Exported ${missing.length} missing URLs: ${counts.category} category, ${counts.country} country, ${counts.region} region, ${counts.city} city level.`,
      });
    } catch (e: any) {
      toast({ title: "Export failed", description: e.message, variant: "destructive" });
    } finally {
      setIsExportingMissing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="secondary">{locationSeoRecords?.length || 0} overrides</Badge>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportMissingOverrides} disabled={isExportingMissing}>
            <Download className="h-4 w-4 mr-2" />
            {isExportingMissing ? "Exporting..." : "Export Missing"}
          </Button>
          <Button variant="outline" onClick={exportOverrides} disabled={!locationSeoRecords?.length}>
            <Download className="h-4 w-4 mr-2" />
            Export Overrides
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingRecord(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Override
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingRecord ? "Edit" : "Add"} Category Location SEO</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category_id">Category *</Label>
                    <Select name="category_id" defaultValue={editingRecord?.category_id} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
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
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      name="country"
                      value={selectedCountry || "__all__"}
                      onValueChange={(val) => setSelectedCountry(val === "__all__" ? "" : val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All countries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__all__">All countries</SelectItem>
                        {countries?.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {/* Region dropdown - only show for UK/USA */}
                {selectedCountry && countryHasRegions(selectedCountry) && (
                  <div className="space-y-2">
                    <Label htmlFor="region">Region / State</Label>
                    <Select
                      name="region"
                      value={selectedRegion || "__all__"}
                      onValueChange={(val) => setSelectedRegion(val === "__all__" ? "" : val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All regions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__all__">All regions</SelectItem>
                        {regions?.map((r) => (
                          <SelectItem key={r.id} value={r.region_name}>
                            {r.region_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Select
                    name="city"
                    defaultValue={editingRecord?.city || "__all__"}
                    disabled={!selectedCountry || (countryHasRegions(selectedCountry) && !selectedRegion)}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          !selectedCountry
                            ? "Select country first"
                            : countryHasRegions(selectedCountry) && !selectedRegion
                              ? "Select region first"
                              : "All cities"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__all__">All cities</SelectItem>
                      {cities?.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>SEO Title</Label>
                  <Input
                    name="seo_title"
                    defaultValue={editingRecord?.seo_title || ""}
                    onChange={(e) => setSeoTitleCount(e.target.value.length)}
                  />
                  <p className={cn("text-xs", seoTitleCount > 60 ? "text-orange-500" : "text-muted-foreground")}>
                    {seoTitleCount}/60
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>H1 Override</Label>
                    <Input
                      name="h1_override"
                      defaultValue={editingRecord?.h1_override || ""}
                      onChange={(e) => setH1Count(e.target.value.length)}
                    />
                    <p className={cn("text-xs", h1Count > 70 ? "text-orange-500" : "text-muted-foreground")}>
                      {h1Count}/70
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>H2 Override</Label>
                    <Input
                      name="h2_override"
                      defaultValue={editingRecord?.h2_override || ""}
                      onChange={(e) => setH2Count(e.target.value.length)}
                    />
                    <p className={cn("text-xs", h2Count > 60 ? "text-orange-500" : "text-muted-foreground")}>
                      {h2Count}/60
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Meta Description</Label>
                  <Textarea
                    name="meta_description"
                    defaultValue={editingRecord?.meta_description || ""}
                    onChange={(e) => setMetaDescCount(e.target.value.length)}
                  />
                  <p className={cn("text-xs", metaDescCount > 160 ? "text-orange-500" : "text-muted-foreground")}>
                    {metaDescCount}/160
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Meta Keywords</Label>
                  <Input
                    name="meta_keywords"
                    defaultValue={editingRecord?.meta_keywords || ""}
                    onChange={(e) => setMetaKeywordsCount(e.target.value.length)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Intro Text</Label>
                  <Textarea
                    name="intro_text"
                    rows={3}
                    defaultValue={editingRecord?.intro_text || ""}
                    onChange={(e) => setIntroTextCount(e.target.value.length)}
                  />
                  <p className={cn("text-xs", introTextCount > 500 ? "text-orange-500" : "text-muted-foreground")}>
                    {introTextCount}/500
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>About Heading</Label>
                  <Input
                    name="about_heading"
                    defaultValue={editingRecord?.about_heading || ""}
                    onChange={(e) => setAboutHeadingCount(e.target.value.length)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>About Content</Label>
                  <Textarea
                    name="about_content"
                    rows={4}
                    defaultValue={editingRecord?.about_content || ""}
                    onChange={(e) => setAboutContentCount(e.target.value.length)}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingRecord ? "Update" : "Create"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Location Override Upload</CardTitle>
          <CardDescription>Create SEO overrides for specific category + country + city combinations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={downloadTemplate}>
              <Download className="h-4 w-4 mr-2" />
              Template
            </Button>
            <Input type="file" accept=".csv" ref={fileInputRef} onChange={handleFileUpload} className="max-w-xs" />
          </div>
          {csvData.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm">
                {csvData.filter((r) => r.isValid).length} valid / {csvData.length} total
              </p>
              <Button onClick={handleImport} disabled={isImporting}>
                <Upload className="h-4 w-4 mr-2" />
                {isImporting ? "Importing..." : "Import"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Location SEO Overrides</CardTitle>
              <CardDescription>
                {filteredRecords.length} of {locationSeoRecords?.length || 0} overrides
                {searchTerm && ` matching "${searchTerm}"`}
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search category, country, city..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>City</TableHead>
                <TableHead>SEO Title</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRecords.length > 0 ? (
                paginatedRecords.map((record: any) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.categories?.name || "—"}</TableCell>
                    <TableCell>{record.country || "—"}</TableCell>
                    <TableCell>{record.region || "—"}</TableCell>
                    <TableCell>{record.city || "—"}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{record.seo_title || "—"}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingRecord(record);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(record.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    {searchTerm ? `No results matching "${searchTerm}"` : "No overrides yet"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, filteredRecords.length)} of{" "}
                {filteredRecords.length}
              </p>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {getPageNumbers().map((page, idx) => (
                    <PaginationItem key={idx}>
                      {page === "ellipsis" ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      <CategorySeoImport />

      <ExportCategoryUrls />
    </div>
  );
};

// ============ VENUE LOCATION SEO TAB ============
const VenueLocationSeoTab = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: locationSeoRecords, isLoading } = useAllVenueLocationSeo();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [isImporting, setIsImporting] = useState(false);

  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedRegionSlug, setSelectedRegionSlug] = useState<string>("");

  const [seoTitleCount, setSeoTitleCount] = useState(0);
  const [h1Count, setH1Count] = useState(0);
  const [h2Count, setH2Count] = useState(0);
  const [metaDescCount, setMetaDescCount] = useState(0);
  const [introTextCount, setIntroTextCount] = useState(0);
  const [aboutHeadingCount, setAboutHeadingCount] = useState(0);
  const [aboutContentCount, setAboutContentCount] = useState(0);

  const countriesForContinent = selectedContinent ? CONTINENT_COUNTRIES[selectedContinent] || [] : [];
  const { data: regions } = useRegionsByCountry(selectedCountry || undefined);
  const selectedRegionId = regions?.find((r) => r.region_slug === selectedRegionSlug)?.id;
  const { data: citiesByRegion } = useCitiesByRegion(selectedRegionId || undefined);
  const { data: citiesByCountry } = useCitiesByCountry(undefined, selectedCountry || undefined);
  const cities = selectedRegionId ? citiesByRegion : citiesByCountry;

  useEffect(() => {
    if (editingRecord) {
      setSelectedContinent(editingRecord.continent || "");
      setSelectedCountry(editingRecord.country || "");
      setSelectedRegionSlug(editingRecord.region_slug || "");
    } else {
      setSelectedContinent("");
      setSelectedCountry("");
      setSelectedRegionSlug("");
    }
    setSeoTitleCount(editingRecord?.seo_title?.length || 0);
    setH1Count(editingRecord?.h1_override?.length || 0);
    setH2Count(editingRecord?.h2_override?.length || 0);
    setMetaDescCount(editingRecord?.meta_description?.length || 0);
    setIntroTextCount(editingRecord?.intro_text?.length || 0);
    setAboutHeadingCount(editingRecord?.about_heading?.length || 0);
    setAboutContentCount(editingRecord?.about_content?.length || 0);
  }, [editingRecord, isDialogOpen]);

  useEffect(() => {
    if (!editingRecord) {
      setSelectedCountry("");
      setSelectedRegionSlug("");
    }
  }, [selectedContinent, editingRecord]);
  useEffect(() => {
    if (!editingRecord) {
      setSelectedRegionSlug("");
    }
  }, [selectedCountry, editingRecord]);

  const createMutation = useMutation({
    mutationFn: async (record: any) => {
      const { error } = await supabase.from("venue_location_seo").insert([record]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venue-location-seo-all"] });
      toast({ title: "Venue location SEO record created" });
      setIsDialogOpen(false);
      setEditingRecord(null);
    },
    onError: (error: any) => {
      toast({ title: "Error creating record", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (record: any) => {
      const { id, ...data } = record;
      const { error } = await supabase.from("venue_location_seo").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venue-location-seo-all"] });
      toast({ title: "Venue location SEO record updated" });
      setIsDialogOpen(false);
      setEditingRecord(null);
    },
    onError: (error: any) => {
      toast({ title: "Error updating record", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("venue_location_seo").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venue-location-seo-all"] });
      toast({ title: "Venue location SEO record deleted" });
    },
    onError: (error: any) => {
      toast({ title: "Error deleting record", description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const continentValue = formData.get("continent") as string;
    const countryValue = formData.get("country") as string;
    const regionSlugValue = formData.get("region_slug") as string;
    const cityValue = formData.get("city") as string;

    const record = {
      continent: continentValue === "__all__" || !continentValue?.trim() ? null : continentValue.trim(),
      country: countryValue === "__all__" || !countryValue?.trim() ? null : countryValue.trim(),
      region_slug: regionSlugValue === "__all__" || !regionSlugValue?.trim() ? null : regionSlugValue.trim(),
      city: cityValue === "__all__" || !cityValue?.trim() ? null : cityValue.trim(),
      seo_title: (formData.get("seo_title") as string)?.trim() || null,
      h1_override: (formData.get("h1_override") as string)?.trim() || null,
      h2_override: (formData.get("h2_override") as string)?.trim() || null,
      meta_description: (formData.get("meta_description") as string)?.trim() || null,
      meta_keywords: (formData.get("meta_keywords") as string)?.trim() || null,
      intro_text: (formData.get("intro_text") as string)?.trim() || null,
      about_heading: (formData.get("about_heading") as string)?.trim() || null,
      about_content: (formData.get("about_content") as string)?.trim() || null,
    };

    if (editingRecord) {
      updateMutation.mutate({ id: editingRecord.id, ...record });
    } else {
      createMutation.mutate(record);
    }
  };

  const downloadTemplate = () => {
    const headers =
      "continent,country,region_slug,city,seo_title,h1_override,h2_override,meta_description,meta_keywords,intro_text,about_heading,about_content";
    const example =
      'Europe,United Kingdom,london,London,"London Venues","Venues in London","London Venues",Description...,keywords,Intro...,About,Content...';
    const csv = `${headers}\n${example}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "venue_location_seo_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const parseCsv = (text: string): any[] => {
    const lines = text
      .trim()
      .split("\n")
      .filter((line) => !line.startsWith("#"));
    const rawHeaders = lines[0].split(",").map((h) => h.trim().toLowerCase());

    // Aliases for column names (support export format)
    const headerAliases: Record<string, string> = { h1: "h1_override", h2: "h2_override" };
    const expectedColumns = [
      "continent",
      "country",
      "region_slug",
      "city",
      "seo_title",
      "h1_override",
      "h2_override",
      "meta_description",
      "meta_keywords",
      "intro_text",
      "about_heading",
      "about_content",
    ];

    return lines
      .slice(1)
      .filter((line) => line.trim())
      .map((line) => {
        const values: string[] = [];
        let current = "";
        let inQuotes = false;
        for (const char of line) {
          if (char === '"') inQuotes = !inQuotes;
          else if (char === "," && !inQuotes) {
            values.push(current.trim());
            current = "";
          } else current += char;
        }
        values.push(current.trim());

        const row: any = {};
        expectedColumns.forEach((col) => {
          row[col] = "";
        });
        rawHeaders.forEach((h, i) => {
          const normalized = headerAliases[h] || h;
          if (expectedColumns.includes(normalized)) {
            row[normalized] = values[i]?.replace(/^"|"$/g, "") || "";
          }
        });
        return row;
      });
  };

  // Generate auto values for a given location
  const generateVenueAutoValues = (
    continent: string | null,
    country: string | null,
    regionName: string | null,
    city: string | null,
  ) => {
    let locationPart = continent || "Venues";
    if (country) locationPart = country;
    if (regionName) locationPart = `${regionName}, ${country}`;
    if (city && regionName) locationPart = `${city}, ${regionName}`;
    else if (city) locationPart = `${city}, ${country}`;

    return {
      seo_title: `Venues in ${locationPart} | Showcase`,
      h1_override: `Venues in ${locationPart}`,
      h2_override: `Find Venues in ${locationPart}`,
      meta_description: `Discover venues in ${locationPart}. Browse our directory of event spaces, concert halls, and more.`,
      intro_text: `Find the perfect venue in ${locationPart} for your next event.`,
      about_heading: `About Venues in ${locationPart}`,
      about_content: `Explore our comprehensive directory of venues in ${locationPart}.`,
    };
  };

  // Check if any SEO field differs from auto-generated value
  const hasVenueOverrideValues = (row: any): boolean => {
    const continent = row.continent?.trim() || null;
    const country = row.country?.trim() || null;
    const regionSlug = row.region_slug?.trim() || null;
    const city = row.city?.trim() || null;

    // For region name, we don't have it in CSV - use regionSlug as approximation
    // (The comparison will still work for detecting changes)
    const regionName = regionSlug ? regionSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) : null;

    const auto = generateVenueAutoValues(continent, country, regionName, city);

    const fields = [
      { name: "seo_title", csv: row.seo_title?.trim(), auto: auto.seo_title },
      { name: "h1_override", csv: row.h1_override?.trim(), auto: auto.h1_override },
      { name: "h2_override", csv: row.h2_override?.trim(), auto: auto.h2_override },
      { name: "meta_description", csv: row.meta_description?.trim(), auto: auto.meta_description },
      { name: "intro_text", csv: row.intro_text?.trim(), auto: auto.intro_text },
      { name: "about_heading", csv: row.about_heading?.trim(), auto: auto.about_heading },
      { name: "about_content", csv: row.about_content?.trim(), auto: auto.about_content },
      { name: "meta_keywords", csv: row.meta_keywords?.trim(), auto: "" },
    ];

    for (const field of fields) {
      const csvValue = field.csv || "";
      const autoValue = field.auto || "";

      // If CSV has a value and it differs from auto, it's an override
      if (csvValue && csvValue !== autoValue) {
        return true;
      }
    }

    return false;
  };

  const validateCsvData = (rows: any[]): any[] => {
    return rows.map((row) => {
      if (!row.continent?.trim()) {
        return { ...row, isValid: false, error: "Missing continent" };
      }
      if (row.continent && !continents.includes(row.continent)) {
        return { ...row, isValid: false, error: `Unknown continent` };
      }
      if (row.continent && row.country) {
        const validCountries = CONTINENT_COUNTRIES[row.continent] || [];
        if (!validCountries.includes(row.country)) {
          return { ...row, isValid: false, error: `Country not in continent` };
        }
      }
      return { ...row, isValid: true };
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const parsed = parseCsv(text);
      const validated = validateCsvData(parsed);
      setCsvData(validated);
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    const validRows = csvData.filter((row) => row.isValid);
    if (validRows.length === 0) {
      toast({ title: "No valid rows to import", variant: "destructive" });
      return;
    }
    setIsImporting(true);
    let created = 0,
      updated = 0,
      skipped = 0,
      errors = 0;

    for (const row of validRows) {
      try {
        // Check if this row has any values that differ from auto defaults
        if (!hasVenueOverrideValues(row)) {
          skipped++;
          continue;
        }

        const continent = row.continent?.trim() || null;
        const country = row.country?.trim() || null;
        const regionSlug = row.region_slug?.trim() || null;
        const city = row.city?.trim() || null;

        // Build query to find existing record - handle NULLs explicitly
        let query = supabase.from("venue_location_seo").select("id");

        if (continent) query = query.eq("continent", continent);
        else query = query.is("continent", null);

        if (country) query = query.eq("country", country);
        else query = query.is("country", null);

        if (regionSlug) query = query.eq("region_slug", regionSlug);
        else query = query.is("region_slug", null);

        if (city) query = query.eq("city", city);
        else query = query.is("city", null);

        const { data: existing } = await query.limit(1).maybeSingle();

        const record = {
          continent,
          country,
          region_slug: regionSlug,
          city,
          seo_title: row.seo_title?.trim() || null,
          h1_override: row.h1_override?.trim() || null,
          h2_override: row.h2_override?.trim() || null,
          meta_description: row.meta_description?.trim() || null,
          meta_keywords: row.meta_keywords?.trim() || null,
          intro_text: row.intro_text?.trim() || null,
          about_heading: row.about_heading?.trim() || null,
          about_content: row.about_content?.trim() || null,
        };

        if (existing?.id) {
          // Update existing record
          const { error } = await supabase.from("venue_location_seo").update(record).eq("id", existing.id);
          if (error) errors++;
          else updated++;
        } else {
          // Insert new record
          const { error } = await supabase.from("venue_location_seo").insert([record]);
          if (error) errors++;
          else created++;
        }
      } catch {
        errors++;
      }
    }
    setIsImporting(false);
    setCsvData([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    queryClient.invalidateQueries({ queryKey: ["venue-location-seo-all"] });
    toast({
      title: "Import complete",
      description: `${created} created, ${updated} updated, ${skipped} unchanged rows skipped, ${errors} errors`,
    });
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  const exportOverrides = () => {
    if (!locationSeoRecords?.length) return;
    const headers =
      "continent,country,region_slug,city,seo_title,h1_override,h2_override,meta_description,meta_keywords,intro_text,about_heading,about_content";
    const escapeField = (val: string | null | undefined) => {
      if (!val) return "";
      if (val.includes(",") || val.includes('"') || val.includes("\n")) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    };
    const rows = locationSeoRecords.map((record: any) =>
      [
        escapeField(record.continent),
        escapeField(record.country),
        escapeField(record.region_slug),
        escapeField(record.city),
        escapeField(record.seo_title),
        escapeField(record.h1_override),
        escapeField(record.h2_override),
        escapeField(record.meta_description),
        escapeField(record.meta_keywords),
        escapeField(record.intro_text),
        escapeField(record.about_heading),
        escapeField(record.about_content),
      ].join(","),
    );
    const csv = `${headers}\n${rows.join("\n")}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `venue_location_seo_export_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="secondary">{locationSeoRecords?.length || 0} overrides</Badge>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportOverrides} disabled={!locationSeoRecords?.length}>
            <Download className="h-4 w-4 mr-2" />
            Export Overrides
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingRecord(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Override
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingRecord ? "Edit" : "Add"} Venue Location SEO</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Continent *</Label>
                    <Select
                      name="continent"
                      value={selectedContinent || "__all__"}
                      onValueChange={(val) => setSelectedContinent(val === "__all__" ? "" : val)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select continent" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__all__">Select...</SelectItem>
                        {continents.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Select
                      name="country"
                      value={selectedCountry || "__all__"}
                      onValueChange={(val) => setSelectedCountry(val === "__all__" ? "" : val)}
                      disabled={!selectedContinent}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All countries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__all__">All countries</SelectItem>
                        {countriesForContinent.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Region</Label>
                    <Select
                      name="region_slug"
                      value={selectedRegionSlug || "__all__"}
                      onValueChange={(val) => setSelectedRegionSlug(val === "__all__" ? "" : val)}
                      disabled={!selectedCountry || !regions?.length}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All regions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__all__">All regions</SelectItem>
                        {regions?.map((r) => (
                          <SelectItem key={r.region_slug} value={r.region_slug}>
                            {r.region_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Select name="city" defaultValue={editingRecord?.city || "__all__"} disabled={!selectedCountry}>
                      <SelectTrigger>
                        <SelectValue placeholder="All cities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__all__">All cities</SelectItem>
                        {cities?.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>SEO Title</Label>
                  <Input
                    name="seo_title"
                    defaultValue={editingRecord?.seo_title || ""}
                    onChange={(e) => setSeoTitleCount(e.target.value.length)}
                  />
                  <p className={cn("text-xs", seoTitleCount > 60 ? "text-orange-500" : "text-muted-foreground")}>
                    {seoTitleCount}/60
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>H1 Override</Label>
                    <Input
                      name="h1_override"
                      defaultValue={editingRecord?.h1_override || ""}
                      onChange={(e) => setH1Count(e.target.value.length)}
                    />
                    <p className={cn("text-xs", h1Count > 70 ? "text-orange-500" : "text-muted-foreground")}>
                      {h1Count}/70
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>H2 Override</Label>
                    <Input
                      name="h2_override"
                      defaultValue={editingRecord?.h2_override || ""}
                      onChange={(e) => setH2Count(e.target.value.length)}
                    />
                    <p className={cn("text-xs", h2Count > 60 ? "text-orange-500" : "text-muted-foreground")}>
                      {h2Count}/60
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Meta Description</Label>
                  <Textarea
                    name="meta_description"
                    defaultValue={editingRecord?.meta_description || ""}
                    onChange={(e) => setMetaDescCount(e.target.value.length)}
                  />
                  <p className={cn("text-xs", metaDescCount > 160 ? "text-orange-500" : "text-muted-foreground")}>
                    {metaDescCount}/160
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Meta Keywords</Label>
                  <Input name="meta_keywords" defaultValue={editingRecord?.meta_keywords || ""} />
                </div>
                <div className="space-y-2">
                  <Label>Intro Text</Label>
                  <Textarea
                    name="intro_text"
                    rows={3}
                    defaultValue={editingRecord?.intro_text || ""}
                    onChange={(e) => setIntroTextCount(e.target.value.length)}
                  />
                  <p className={cn("text-xs", introTextCount > 500 ? "text-orange-500" : "text-muted-foreground")}>
                    {introTextCount}/500
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>About Heading</Label>
                  <Input
                    name="about_heading"
                    defaultValue={editingRecord?.about_heading || ""}
                    onChange={(e) => setAboutHeadingCount(e.target.value.length)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>About Content</Label>
                  <Textarea
                    name="about_content"
                    rows={4}
                    defaultValue={editingRecord?.about_content || ""}
                    onChange={(e) => setAboutContentCount(e.target.value.length)}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingRecord ? "Update" : "Create"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bulk CSV Upload</CardTitle>
          <CardDescription>Import multiple records at once</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={downloadTemplate}>
              <Download className="h-4 w-4 mr-2" />
              Template
            </Button>
            <Input type="file" accept=".csv" ref={fileInputRef} onChange={handleFileUpload} className="max-w-xs" />
          </div>
          {csvData.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm">
                {csvData.filter((r) => r.isValid).length} valid / {csvData.length} total
              </p>
              <Button onClick={handleImport} disabled={isImporting}>
                <Upload className="h-4 w-4 mr-2" />
                {isImporting ? "Importing..." : "Import"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Continent</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>City</TableHead>
            <TableHead>SEO Title</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locationSeoRecords?.map((record: any) => (
            <TableRow key={record.id}>
              <TableCell>{record.continent || "—"}</TableCell>
              <TableCell>{record.country || "—"}</TableCell>
              <TableCell>{record.region_slug || "—"}</TableCell>
              <TableCell>{record.city || "—"}</TableCell>
              <TableCell className="max-w-[200px] truncate">{record.seo_title || "—"}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingRecord(record);
                    setIsDialogOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(record.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ExportVenueUrls />
    </div>
  );
};

// ============ VENUE TYPE SEO TAB ============
const VenueTypeSeoTab = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: typeSeoRecords, isLoading } = useAllVenueTypeSeo();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [isImporting, setIsImporting] = useState(false);

  const [selectedVenueType, setSelectedVenueType] = useState<string>("");
  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedRegionSlug, setSelectedRegionSlug] = useState<string>("");

  const [seoTitleCount, setSeoTitleCount] = useState(0);
  const [h1Count, setH1Count] = useState(0);
  const [h2Count, setH2Count] = useState(0);
  const [metaDescCount, setMetaDescCount] = useState(0);
  const [introTextCount, setIntroTextCount] = useState(0);
  const [aboutHeadingCount, setAboutHeadingCount] = useState(0);
  const [aboutContentCount, setAboutContentCount] = useState(0);

  const countriesForContinent = selectedContinent ? CONTINENT_COUNTRIES[selectedContinent] || [] : [];
  const { data: regions } = useRegionsByCountry(selectedCountry || undefined);
  const selectedRegionId = regions?.find((r) => r.region_slug === selectedRegionSlug)?.id;
  const { data: citiesByRegion } = useCitiesByRegion(selectedRegionId || undefined);
  const { data: citiesByCountry } = useCitiesByCountry(undefined, selectedCountry || undefined);
  const cities = selectedRegionId ? citiesByRegion : citiesByCountry;

  useEffect(() => {
    if (editingRecord) {
      setSelectedVenueType(editingRecord.venue_type || "");
      setSelectedContinent(editingRecord.continent || "");
      setSelectedCountry(editingRecord.country || "");
      setSelectedRegionSlug(editingRecord.region_slug || "");
    } else {
      setSelectedVenueType("");
      setSelectedContinent("");
      setSelectedCountry("");
      setSelectedRegionSlug("");
    }
    setSeoTitleCount(editingRecord?.seo_title?.length || 0);
    setH1Count(editingRecord?.h1_override?.length || 0);
    setH2Count(editingRecord?.h2_override?.length || 0);
    setMetaDescCount(editingRecord?.meta_description?.length || 0);
    setIntroTextCount(editingRecord?.intro_text?.length || 0);
    setAboutHeadingCount(editingRecord?.about_heading?.length || 0);
    setAboutContentCount(editingRecord?.about_content?.length || 0);
  }, [editingRecord, isDialogOpen]);

  useEffect(() => {
    if (!editingRecord) {
      setSelectedCountry("");
      setSelectedRegionSlug("");
    }
  }, [selectedContinent, editingRecord]);
  useEffect(() => {
    if (!editingRecord) {
      setSelectedRegionSlug("");
    }
  }, [selectedCountry, editingRecord]);

  const createMutation = useMutation({
    mutationFn: async (record: any) => {
      const { error } = await supabase.from("venue_type_seo").insert([record]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venue-type-seo-all"] });
      toast({ title: "Venue type SEO record created" });
      setIsDialogOpen(false);
      setEditingRecord(null);
    },
    onError: (error: any) => {
      toast({ title: "Error creating record", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (record: any) => {
      const { id, ...data } = record;
      const { error } = await supabase.from("venue_type_seo").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venue-type-seo-all"] });
      toast({ title: "Venue type SEO record updated" });
      setIsDialogOpen(false);
      setEditingRecord(null);
    },
    onError: (error: any) => {
      toast({ title: "Error updating record", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("venue_type_seo").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venue-type-seo-all"] });
      toast({ title: "Venue type SEO record deleted" });
    },
    onError: (error: any) => {
      toast({ title: "Error deleting record", description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const venueTypeValue = formData.get("venue_type") as string;
    const continentValue = formData.get("continent") as string;
    const countryValue = formData.get("country") as string;
    const regionSlugValue = formData.get("region_slug") as string;
    const cityValue = formData.get("city") as string;

    if (!venueTypeValue || venueTypeValue === "__all__") {
      toast({ title: "Venue type is required", variant: "destructive" });
      return;
    }

    const record = {
      venue_type: venueTypeValue,
      continent: continentValue === "__all__" || !continentValue?.trim() ? null : continentValue.trim(),
      country: countryValue === "__all__" || !countryValue?.trim() ? null : countryValue.trim(),
      region_slug: regionSlugValue === "__all__" || !regionSlugValue?.trim() ? null : regionSlugValue.trim(),
      city: cityValue === "__all__" || !cityValue?.trim() ? null : cityValue.trim(),
      seo_title: (formData.get("seo_title") as string)?.trim() || null,
      h1_override: (formData.get("h1_override") as string)?.trim() || null,
      h2_override: (formData.get("h2_override") as string)?.trim() || null,
      meta_description: (formData.get("meta_description") as string)?.trim() || null,
      meta_keywords: (formData.get("meta_keywords") as string)?.trim() || null,
      intro_text: (formData.get("intro_text") as string)?.trim() || null,
      about_heading: (formData.get("about_heading") as string)?.trim() || null,
      about_content: (formData.get("about_content") as string)?.trim() || null,
    };

    if (editingRecord) {
      updateMutation.mutate({ id: editingRecord.id, ...record });
    } else {
      createMutation.mutate(record);
    }
  };

  const downloadTemplate = () => {
    const headers =
      "venue_type,continent,country,region_slug,city,seo_title,h1_override,h2_override,meta_description,meta_keywords,intro_text,about_heading,about_content";
    const example =
      'Arena,Europe,United Kingdom,,,"UK Arenas","Arenas in the UK","UK Arenas",Description...,keywords,Intro...,About,Content...';
    const csv = `${headers}\n${example}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "venue_type_seo_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const parseCsv = (text: string): any[] => {
    const lines = text
      .trim()
      .split("\n")
      .filter((line) => !line.startsWith("#"));
    const rawHeaders = lines[0].split(",").map((h) => h.trim().toLowerCase());

    // Aliases for column names (support export format)
    const headerAliases: Record<string, string> = { h1: "h1_override", h2: "h2_override" };
    const expectedColumns = [
      "venue_type",
      "continent",
      "country",
      "region_slug",
      "city",
      "seo_title",
      "h1_override",
      "h2_override",
      "meta_description",
      "meta_keywords",
      "intro_text",
      "about_heading",
      "about_content",
    ];

    return lines
      .slice(1)
      .filter((line) => line.trim())
      .map((line) => {
        const values: string[] = [];
        let current = "";
        let inQuotes = false;
        for (const char of line) {
          if (char === '"') inQuotes = !inQuotes;
          else if (char === "," && !inQuotes) {
            values.push(current.trim());
            current = "";
          } else current += char;
        }
        values.push(current.trim());

        const row: any = {};
        expectedColumns.forEach((col) => {
          row[col] = "";
        });
        rawHeaders.forEach((h, i) => {
          const normalized = headerAliases[h] || h;
          if (expectedColumns.includes(normalized)) {
            row[normalized] = values[i]?.replace(/^"|"$/g, "") || "";
          }
        });
        return row;
      });
  };

  // Generate auto values for a given venue type and location
  const generateVenueTypeAutoValues = (
    venueType: string,
    continent: string | null,
    country: string | null,
    regionName: string | null,
    city: string | null,
  ) => {
    let locationPart = continent || "Worldwide";
    if (country) locationPart = country;
    if (regionName) locationPart = `${regionName}, ${country}`;
    if (city && regionName) locationPart = `${city}, ${regionName}`;
    else if (city) locationPart = `${city}, ${country}`;

    const venueTypePlural = venueType.endsWith("s") ? venueType : `${venueType}s`;

    return {
      seo_title: `${venueTypePlural} in ${locationPart} | Showcase`,
      h1_override: `${venueTypePlural} in ${locationPart}`,
      h2_override: `Find ${venueTypePlural} in ${locationPart}`,
      meta_description: `Discover ${venueTypePlural.toLowerCase()} in ${locationPart}. Browse our directory of ${venueType.toLowerCase()} venues.`,
      intro_text: `Find the perfect ${venueType.toLowerCase()} in ${locationPart} for your next event.`,
      about_heading: `About ${venueTypePlural} in ${locationPart}`,
      about_content: `Explore our comprehensive directory of ${venueTypePlural.toLowerCase()} in ${locationPart}.`,
    };
  };

  // Check if any SEO field differs from auto-generated value
  const hasVenueTypeOverrideValues = (row: any): boolean => {
    const venueType = row.venue_type?.trim() || "";
    const continent = row.continent?.trim() || null;
    const country = row.country?.trim() || null;
    const regionSlug = row.region_slug?.trim() || null;
    const city = row.city?.trim() || null;

    if (!venueType) return false;

    // For region name, we don't have it in CSV - use regionSlug as approximation
    const regionName = regionSlug ? regionSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) : null;

    const auto = generateVenueTypeAutoValues(venueType, continent, country, regionName, city);

    const fields = [
      { name: "seo_title", csv: row.seo_title?.trim(), auto: auto.seo_title },
      { name: "h1_override", csv: row.h1_override?.trim(), auto: auto.h1_override },
      { name: "h2_override", csv: row.h2_override?.trim(), auto: auto.h2_override },
      { name: "meta_description", csv: row.meta_description?.trim(), auto: auto.meta_description },
      { name: "intro_text", csv: row.intro_text?.trim(), auto: auto.intro_text },
      { name: "about_heading", csv: row.about_heading?.trim(), auto: auto.about_heading },
      { name: "about_content", csv: row.about_content?.trim(), auto: auto.about_content },
      { name: "meta_keywords", csv: row.meta_keywords?.trim(), auto: "" },
    ];

    for (const field of fields) {
      const csvValue = field.csv || "";
      const autoValue = field.auto || "";

      // If CSV has a value and it differs from auto, it's an override
      if (csvValue && csvValue !== autoValue) {
        return true;
      }
    }

    return false;
  };

  const validateCsvData = (rows: any[]): any[] => {
    return rows.map((row) => {
      if (!row.venue_type?.trim()) {
        return { ...row, isValid: false, error: "Missing venue_type" };
      }
      if (!VENUE_TYPES.includes(row.venue_type)) {
        return { ...row, isValid: false, error: `Invalid venue type` };
      }
      if (row.continent && !continents.includes(row.continent)) {
        return { ...row, isValid: false, error: `Unknown continent` };
      }
      if (row.continent && row.country) {
        const validCountries = CONTINENT_COUNTRIES[row.continent] || [];
        if (!validCountries.includes(row.country)) {
          return { ...row, isValid: false, error: `Country not in continent` };
        }
      }
      return { ...row, isValid: true };
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const parsed = parseCsv(text);
      const validated = validateCsvData(parsed);
      setCsvData(validated);
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    const validRows = csvData.filter((row) => row.isValid);
    if (validRows.length === 0) {
      toast({ title: "No valid rows to import", variant: "destructive" });
      return;
    }
    setIsImporting(true);
    let created = 0,
      skipped = 0,
      errors = 0;

    for (const row of validRows) {
      try {
        // Check if this row has any values that differ from auto defaults
        if (!hasVenueTypeOverrideValues(row)) {
          skipped++;
          continue;
        }

        const { error } = await supabase.from("venue_type_seo").upsert(
          {
            venue_type: row.venue_type?.trim(),
            continent: row.continent?.trim() || null,
            country: row.country?.trim() || null,
            region_slug: row.region_slug?.trim() || null,
            city: row.city?.trim() || null,
            seo_title: row.seo_title?.trim() || null,
            h1_override: row.h1_override?.trim() || null,
            h2_override: row.h2_override?.trim() || null,
            meta_description: row.meta_description?.trim() || null,
            meta_keywords: row.meta_keywords?.trim() || null,
            intro_text: row.intro_text?.trim() || null,
            about_heading: row.about_heading?.trim() || null,
            about_content: row.about_content?.trim() || null,
          },
          { onConflict: "venue_type,continent,country,region_slug,city" },
        );

        if (error) {
          errors++;
        } else {
          created++;
        }
      } catch {
        errors++;
      }
    }
    setIsImporting(false);
    setCsvData([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    queryClient.invalidateQueries({ queryKey: ["venue-type-seo-all"] });
    toast({
      title: "Import complete",
      description: `${created} overrides created, ${skipped} unchanged rows skipped, ${errors} errors`,
    });
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  const exportOverrides = () => {
    if (!typeSeoRecords?.length) return;
    const headers =
      "venue_type,continent,country,region_slug,city,seo_title,h1_override,h2_override,meta_description,meta_keywords,intro_text,about_heading,about_content";
    const escapeField = (val: string | null | undefined) => {
      if (!val) return "";
      if (val.includes(",") || val.includes('"') || val.includes("\n")) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    };
    const rows = typeSeoRecords.map((record: any) =>
      [
        escapeField(record.venue_type),
        escapeField(record.continent),
        escapeField(record.country),
        escapeField(record.region_slug),
        escapeField(record.city),
        escapeField(record.seo_title),
        escapeField(record.h1_override),
        escapeField(record.h2_override),
        escapeField(record.meta_description),
        escapeField(record.meta_keywords),
        escapeField(record.intro_text),
        escapeField(record.about_heading),
        escapeField(record.about_content),
      ].join(","),
    );
    const csv = `${headers}\n${rows.join("\n")}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `venue_type_seo_export_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="secondary">{typeSeoRecords?.length || 0} overrides</Badge>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportOverrides} disabled={!typeSeoRecords?.length}>
            <Download className="h-4 w-4 mr-2" />
            Export Overrides
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingRecord(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Override
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingRecord ? "Edit" : "Add"} Venue Type SEO</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Venue Type *</Label>
                  <Select
                    name="venue_type"
                    value={selectedVenueType || "__all__"}
                    onValueChange={(val) => setSelectedVenueType(val === "__all__" ? "" : val)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select venue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__all__">Select...</SelectItem>
                      {VENUE_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Continent</Label>
                    <Select
                      name="continent"
                      value={selectedContinent || "__all__"}
                      onValueChange={(val) => setSelectedContinent(val === "__all__" ? "" : val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All continents" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__all__">All continents</SelectItem>
                        {continents.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Select
                      name="country"
                      value={selectedCountry || "__all__"}
                      onValueChange={(val) => setSelectedCountry(val === "__all__" ? "" : val)}
                      disabled={!selectedContinent}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All countries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__all__">All countries</SelectItem>
                        {countriesForContinent.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Region</Label>
                    <Select
                      name="region_slug"
                      value={selectedRegionSlug || "__all__"}
                      onValueChange={(val) => setSelectedRegionSlug(val === "__all__" ? "" : val)}
                      disabled={!selectedCountry || !regions?.length}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All regions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__all__">All regions</SelectItem>
                        {regions?.map((r) => (
                          <SelectItem key={r.region_slug} value={r.region_slug}>
                            {r.region_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Select name="city" defaultValue={editingRecord?.city || "__all__"} disabled={!selectedCountry}>
                      <SelectTrigger>
                        <SelectValue placeholder="All cities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__all__">All cities</SelectItem>
                        {cities?.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>SEO Title</Label>
                  <Input
                    name="seo_title"
                    defaultValue={editingRecord?.seo_title || ""}
                    onChange={(e) => setSeoTitleCount(e.target.value.length)}
                  />
                  <p className={cn("text-xs", seoTitleCount > 60 ? "text-orange-500" : "text-muted-foreground")}>
                    {seoTitleCount}/60
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>H1 Override</Label>
                    <Input
                      name="h1_override"
                      defaultValue={editingRecord?.h1_override || ""}
                      onChange={(e) => setH1Count(e.target.value.length)}
                    />
                    <p className={cn("text-xs", h1Count > 70 ? "text-orange-500" : "text-muted-foreground")}>
                      {h1Count}/70
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>H2 Override</Label>
                    <Input
                      name="h2_override"
                      defaultValue={editingRecord?.h2_override || ""}
                      onChange={(e) => setH2Count(e.target.value.length)}
                    />
                    <p className={cn("text-xs", h2Count > 60 ? "text-orange-500" : "text-muted-foreground")}>
                      {h2Count}/60
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Meta Description</Label>
                  <Textarea
                    name="meta_description"
                    defaultValue={editingRecord?.meta_description || ""}
                    onChange={(e) => setMetaDescCount(e.target.value.length)}
                  />
                  <p className={cn("text-xs", metaDescCount > 160 ? "text-orange-500" : "text-muted-foreground")}>
                    {metaDescCount}/160
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Meta Keywords</Label>
                  <Input name="meta_keywords" defaultValue={editingRecord?.meta_keywords || ""} />
                </div>
                <div className="space-y-2">
                  <Label>Intro Text</Label>
                  <Textarea
                    name="intro_text"
                    rows={3}
                    defaultValue={editingRecord?.intro_text || ""}
                    onChange={(e) => setIntroTextCount(e.target.value.length)}
                  />
                  <p className={cn("text-xs", introTextCount > 500 ? "text-orange-500" : "text-muted-foreground")}>
                    {introTextCount}/500
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>About Heading</Label>
                  <Input
                    name="about_heading"
                    defaultValue={editingRecord?.about_heading || ""}
                    onChange={(e) => setAboutHeadingCount(e.target.value.length)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>About Content</Label>
                  <Textarea
                    name="about_content"
                    rows={4}
                    defaultValue={editingRecord?.about_content || ""}
                    onChange={(e) => setAboutContentCount(e.target.value.length)}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingRecord ? "Update" : "Create"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bulk CSV Upload</CardTitle>
          <CardDescription>Import multiple records at once</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={downloadTemplate}>
              <Download className="h-4 w-4 mr-2" />
              Template
            </Button>
            <Input type="file" accept=".csv" ref={fileInputRef} onChange={handleFileUpload} className="max-w-xs" />
          </div>
          {csvData.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm">
                {csvData.filter((r) => r.isValid).length} valid / {csvData.length} total
              </p>
              <Button onClick={handleImport} disabled={isImporting}>
                <Upload className="h-4 w-4 mr-2" />
                {isImporting ? "Importing..." : "Import"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Venue Type</TableHead>
            <TableHead>Continent</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>City</TableHead>
            <TableHead>SEO Title</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {typeSeoRecords?.map((record: any) => (
            <TableRow key={record.id}>
              <TableCell>{record.venue_type}</TableCell>
              <TableCell>{record.continent || "All"}</TableCell>
              <TableCell>{record.country || "—"}</TableCell>
              <TableCell>{record.region_slug || "—"}</TableCell>
              <TableCell>{record.city || "—"}</TableCell>
              <TableCell className="max-w-[200px] truncate">{record.seo_title || "—"}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingRecord(record);
                    setIsDialogOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(record.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ExportVenueTypeUrls />
    </div>
  );
};

// ============ MAIN SEO DASHBOARD PAGE ============
export default function AdminSeo() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">SEO Dashboard</h1>
          <p className="text-muted-foreground">
            Manage SEO overrides for category and venue pages. Overrides take priority over auto-generated defaults.
          </p>
        </div>
        <Link href="/admin/seo-lookup">
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            SEO Lookup Tool
            <ExternalLink className="h-3 w-3 ml-2" />
          </Button>
        </Link>
      </div>
      {/* Reference Guide */}
      <SeoReferenceGuide />
      {/* Tabs */}
      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="venues">Venue Locations</TabsTrigger>
          <TabsTrigger value="venue-types">Venue Types</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <CategoryLocationSeoTab />
        </TabsContent>

        <TabsContent value="venues">
          <VenueLocationSeoTab />
        </TabsContent>

        <TabsContent value="venue-types">
          <VenueTypeSeoTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
