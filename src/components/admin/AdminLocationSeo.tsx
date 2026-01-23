'use client';

import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAllCategoryLocationSeo } from "@/hooks/useCategoryLocationSeo";
import { useCategories } from "@/hooks/useCategories";
import { useCountries, useCitiesByCountryOption } from "@/hooks/useLocationOptions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Upload, Download, Check, AlertCircle, Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CsvRow {
  category_slug: string;
  country: string;
  region: string;
  city: string;
  seo_title: string;
  h1_override: string;
  h2_override: string;
  meta_description: string;
  meta_keywords: string;
  intro_text: string;
  about_heading: string;
  about_content: string;
  isValid?: boolean;
  categoryId?: string;
  error?: string;
}

const AdminLocationSeo = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { data: locationSeoRecords, isLoading } = useAllCategoryLocationSeo();
  const { data: categories } = useCategories();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [csvData, setCsvData] = useState<CsvRow[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  
  // Search and pagination state
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;
  
  // Character count state
  const [seoTitleCount, setSeoTitleCount] = useState(0);
  const [h1Count, setH1Count] = useState(0);
  const [h2Count, setH2Count] = useState(0);
  const [metaDescCount, setMetaDescCount] = useState(0);
  const [metaKeywordsCount, setMetaKeywordsCount] = useState(0);
  const [introTextCount, setIntroTextCount] = useState(0);
  const [aboutHeadingCount, setAboutHeadingCount] = useState(0);
  const [aboutContentCount, setAboutContentCount] = useState(0);
  
  const { data: countries } = useCountries();
  const { data: cities } = useCitiesByCountryOption(selectedCountry || null);

  // Reset selectedCountry and character counts when dialog opens/closes or editing changes
  useEffect(() => {
    if (editingRecord?.country) {
      setSelectedCountry(editingRecord.country);
    } else {
      setSelectedCountry("");
    }
    // Reset character counts
    setSeoTitleCount(editingRecord?.seo_title?.length || 0);
    setH1Count(editingRecord?.h1_override?.length || 0);
    setH2Count(editingRecord?.h2_override?.length || 0);
    setMetaDescCount(editingRecord?.meta_description?.length || 0);
    setMetaKeywordsCount(editingRecord?.meta_keywords?.length || 0);
    setIntroTextCount(editingRecord?.intro_text?.length || 0);
    setAboutHeadingCount(editingRecord?.about_heading?.length || 0);
    setAboutContentCount(editingRecord?.about_content?.length || 0);
  }, [editingRecord, isDialogOpen]);

  const createMutation = useMutation({
    mutationFn: async (record: {
      category_id: string;
      country: string | null;
      city: string | null;
      seo_title: string | null;
      h1_override: string | null;
      h2_override: string | null;
      meta_description: string | null;
      meta_keywords: string | null;
      intro_text: string | null;
      about_heading: string | null;
      about_content: string | null;
    }) => {
      const { error } = await supabase
        .from("category_location_seo")
        .insert([record]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category-location-seo-all"] });
      toast({ title: "Location SEO record created" });
      setIsDialogOpen(false);
      setEditingRecord(null);
    },
    onError: (error: any) => {
      toast({ 
        title: "Error creating record", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (record: {
      id: string;
      category_id: string;
      country: string | null;
      city: string | null;
      seo_title: string | null;
      h1_override: string | null;
      h2_override: string | null;
      meta_description: string | null;
      meta_keywords: string | null;
      intro_text: string | null;
      about_heading: string | null;
      about_content: string | null;
    }) => {
      const { id, ...data } = record;
      const { error } = await supabase
        .from("category_location_seo")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category-location-seo-all"] });
      toast({ title: "Location SEO record updated" });
      setIsDialogOpen(false);
      setEditingRecord(null);
    },
    onError: (error: any) => {
      toast({ 
        title: "Error updating record", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("category_location_seo")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category-location-seo-all"] });
      toast({ title: "Location SEO record deleted" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error deleting record", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const countryValue = formData.get("country") as string;
    const cityValue = formData.get("city") as string;
    
    const record = {
      category_id: formData.get("category_id") as string,
      country: countryValue === "__all__" || !countryValue?.trim() ? null : countryValue.trim(),
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
    const comment1 = "# Location SEO Template";
    const comment2 = "# Recommended character counts: seo_title (60), h1_override (70), h2_override (60), meta_description (160), intro_text (500), about_heading (60)";
    const headers = "category_slug,country,region,city,seo_title,h1_override,h2_override,meta_description,meta_keywords,intro_text,about_heading,about_content";
    const example1 = 'backline,United Kingdom,,"Backline Hire UK | Showcase Music","Backline Hire in the UK","Backline Companies in the UK",UK backline providers and rental services...,backline uk rental hire,Find professional backline providers across the UK...,About Backline Hire,Backline hire services provide...';
    const example2 = 'backline,United Kingdom,,London,"London Backline Hire | Showcase Music","Backline Hire in London","London Backline Companies",London backline specialists...,backline london rental,Browse London\'s top backline rental companies...,About London Backline,London is home to...';
    const example3 = 'backline,United States,California,,"California Backline Hire | Showcase Music","Backline Hire in California","California Backline Companies",California backline specialists...,backline california rental,Browse California backline rental companies...,About California Backline,California is home to...';
    const csv = `${comment1}\n${comment2}\n${headers}\n${example1}\n${example2}\n${example3}`;
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "location_seo_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const parseCsv = (text: string): CsvRow[] => {
    const lines = text.trim().split("\n").filter(line => !line.trim().startsWith("#"));
    
    if (lines.length < 2) {
      return [];
    }
    
    // Parse header row
    const headerLine = lines[0];
    
    const headers: string[] = [];
    let current = "";
    let inQuotes = false;
    
    for (const char of headerLine) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        headers.push(current.trim().toLowerCase());
        current = "";
      } else {
        current += char;
      }
    }
    headers.push(current.trim().toLowerCase());
    
    // Map header aliases
    const headerAliases: Record<string, string> = {
      h1: "h1_override",
      h2: "h2_override",
    };
    
    // Expected columns (we'll only extract these, ignoring extras)
    const expectedColumns = [
      "category_slug", "country", "region", "city", "seo_title", "h1_override", "h2_override",
      "meta_description", "meta_keywords", "intro_text", "about_heading", "about_content"
    ];
    
    const rows = lines.slice(1).map((line) => {
      // Skip empty lines
      if (!line.trim()) {
        return null;
      }
      
      // Handle quoted values with commas
      const values: string[] = [];
      current = "";
      inQuotes = false;
      
      for (const char of line) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          values.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      values.push(current.trim());

      // Build row by mapping header names to values
      const row: any = {};
      
      // Initialize expected columns with empty strings
      expectedColumns.forEach(col => {
        row[col] = "";
      });
      
      // Map values by header name, applying aliases
      headers.forEach((header, i) => {
        const normalizedHeader = headerAliases[header] || header;
        const value = values[i]?.replace(/^"|"$/g, "") || "";
        
        // Only include if it's an expected column
        if (expectedColumns.includes(normalizedHeader)) {
          row[normalizedHeader] = value;
        }
      });

      return row as CsvRow;
    }).filter((row): row is CsvRow => row !== null);
    
    return rows;
  };

  const validateCsvData = (rows: CsvRow[]): CsvRow[] => {
    return rows.map((row) => {
      // Skip empty rows
      if (!row.category_slug?.trim()) {
        return { ...row, isValid: false, error: "Missing category_slug" };
      }
      
      // A row is valid if it has category_slug and country (city can be empty for country-level)
      if (!row.country?.trim()) {
        return { ...row, isValid: false, error: "Missing country" };
      }
      
      // Find category by url_slug first, then by slug
      const categorySlug = row.category_slug.trim();
      const category = categories?.find(c => 
        c.url_slug === categorySlug || c.slug === categorySlug
      );
      
      if (!category) {
        return { ...row, isValid: false, error: `Category "${categorySlug}" not found` };
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

  const handleImport = async () => {
    const validRows = csvData.filter(row => row.isValid && row.categoryId);
    if (validRows.length === 0) {
      toast({ title: "No valid rows to import", variant: "destructive" });
      return;
    }

    setIsImporting(true);
    let inserted = 0;
    let updated = 0;
    let errors = 0;
    const errorDetails: string[] = [];

    for (const row of validRows) {
      try {
        // Use SELECT-then-UPDATE/INSERT pattern for better control
        // Build the query to check for existing record
        let existingQuery = supabase
          .from("category_location_seo")
          .select("id,region")
          .eq("category_id", row.categoryId!);
        
        // Handle country
        if (row.country) {
          existingQuery = existingQuery.eq("country", row.country);
        } else {
          existingQuery = existingQuery.is("country", null);
        }
        
        // Handle region
        if (row.region) {
          existingQuery = existingQuery.eq("region", row.region);
        } else {
          existingQuery = existingQuery.is("region", null);
        }
        
        // Handle city
        if (row.city) {
          existingQuery = existingQuery.eq("city", row.city);
        } else {
          existingQuery = existingQuery.is("city", null);
        }
        
        const { data: existingRecords, error: selectError } = await existingQuery;
        
        if (selectError) {
          errors++;
          errorDetails.push(`${row.category_slug}/${row.country}/${row.region || ''}/${row.city || ''}: Select error - ${selectError.message}`);
          continue;
        }
        
        const recordData = {
          category_id: row.categoryId!,
          country: row.country || null,
          region: row.region || null,
          city: row.city || null,
          seo_title: row.seo_title || null,
          h1_override: row.h1_override || null,
          h2_override: row.h2_override || null,
          meta_description: row.meta_description || null,
          meta_keywords: row.meta_keywords || null,
          intro_text: row.intro_text || null,
          about_heading: row.about_heading || null,
          about_content: row.about_content || null,
        };
        
        if (existingRecords && existingRecords.length > 0) {
          // Update existing record
          const { error: updateError } = await supabase
            .from("category_location_seo")
            .update(recordData)
            .eq("id", existingRecords[0].id);
          
          if (updateError) {
            errors++;
            errorDetails.push(`${row.category_slug}/${row.country}/${row.region || ''}/${row.city || ''}: Update error - ${updateError.message}`);
          } else {
            updated++;
          }
        } else {
          // Insert new record
          const { error: insertError } = await supabase
            .from("category_location_seo")
            .insert(recordData);
          
          if (insertError) {
            errors++;
            errorDetails.push(`${row.category_slug}/${row.country}/${row.region || ''}/${row.city || ''}: Insert error - ${insertError.message}`);
          } else {
            inserted++;
          }
        }
      } catch (e: any) {
        errors++;
        errorDetails.push(`${row.category_slug}/${row.country}/${row.region || ''}/${row.city || ''}: ${e.message || 'Unknown error'}`);
      }
    }

    setIsImporting(false);
    setCsvData([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
    queryClient.invalidateQueries({ queryKey: ["category-location-seo-all"] });
    
    // Log errors to console for debugging
    if (errorDetails.length > 0) {
      console.error("Import errors:", errorDetails);
    }
    
    toast({ 
      title: "Import complete", 
      description: `${inserted} inserted, ${updated} updated, ${errors} errors${errors > 0 ? ' (check console for details)' : ''}` 
    });
  };

  // Get leaf categories only (those without children)
  const leafCategories = categories?.filter(cat => 
    !categories.some(c => c.parent_id === cat.id)
  );

  // Filter and paginate records
  const filteredRecords = locationSeoRecords?.filter((record: any) => {
    if (!searchTerm.trim()) return true;
    const search = searchTerm.toLowerCase();
    return (
      record.categories?.name?.toLowerCase().includes(search) ||
      record.country?.toLowerCase().includes(search) ||
      record.city?.toLowerCase().includes(search) ||
      record.seo_title?.toLowerCase().includes(search) ||
      record.h1_override?.toLowerCase().includes(search)
    );
  }) || [];

  const totalPages = Math.ceil(filteredRecords.length / pageSize);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Location SEO</h1>
          <p className="text-muted-foreground">
            Manage location-specific SEO content for category pages
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingRecord(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Override
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRecord ? "Edit Location SEO" : "Add Location SEO Override"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category_id">Category *</Label>
                  <Select 
                    name="category_id" 
                    defaultValue={editingRecord?.category_id}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {leafCategories?.map(cat => (
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
                      <SelectValue placeholder="All countries (category default)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__all__">All countries (category default)</SelectItem>
                      {countries?.map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Leave empty for category-level default</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select 
                  name="city" 
                  defaultValue={editingRecord?.city || "__all__"}
                  disabled={!selectedCountry}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={selectedCountry ? "All cities in country" : "Select country first"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">All cities in country</SelectItem>
                    {cities?.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Leave empty for country-level content</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seo_title">SEO Title <span className="text-muted-foreground font-normal">(tab/google header)</span></Label>
                <Input 
                  id="seo_title" 
                  name="seo_title" 
                  defaultValue={editingRecord?.seo_title || ""}
                  placeholder="Custom page title (browser tab & search results)"
                  onChange={(e) => setSeoTitleCount(e.target.value.length)}
                />
                <p className={cn("text-xs", seoTitleCount > 60 ? "text-orange-500" : "text-muted-foreground")}>
                  {seoTitleCount}/60 characters
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="h1_override">H1 Override</Label>
                  <Input 
                    id="h1_override" 
                    name="h1_override" 
                    defaultValue={editingRecord?.h1_override || ""}
                    placeholder="Custom main heading"
                    onChange={(e) => setH1Count(e.target.value.length)}
                  />
                  <p className={cn("text-xs", h1Count > 70 ? "text-orange-500" : "text-muted-foreground")}>
                    {h1Count}/70 characters
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="h2_override">H2 Override <span className="text-muted-foreground font-normal">(next to listing count)</span></Label>
                  <Input 
                    id="h2_override" 
                    name="h2_override" 
                    defaultValue={editingRecord?.h2_override || ""}
                    placeholder="Custom listings heading"
                    onChange={(e) => setH2Count(e.target.value.length)}
                  />
                  <p className={cn("text-xs", h2Count > 60 ? "text-orange-500" : "text-muted-foreground")}>
                    {h2Count}/60 characters
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_description">Meta Description <span className="text-muted-foreground font-normal">(google snippet)</span></Label>
                <Textarea 
                  id="meta_description" 
                  name="meta_description" 
                  defaultValue={editingRecord?.meta_description || ""}
                  placeholder="SEO meta description for this location..."
                  rows={2}
                  onChange={(e) => setMetaDescCount(e.target.value.length)}
                />
                <p className={cn("text-xs", metaDescCount > 160 ? "text-orange-500" : "text-muted-foreground")}>
                  {metaDescCount}/160 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_keywords">Meta Keywords <span className="text-muted-foreground font-normal">(off page)</span></Label>
                <Input 
                  id="meta_keywords" 
                  name="meta_keywords" 
                  defaultValue={editingRecord?.meta_keywords || ""}
                  placeholder="keyword1, keyword2, keyword3"
                  onChange={(e) => setMetaKeywordsCount(e.target.value.length)}
                />
                <p className="text-xs text-muted-foreground">
                  {metaKeywordsCount} characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="intro_text">Intro Text <span className="text-muted-foreground font-normal">(under listing count)</span></Label>
                <Textarea 
                  id="intro_text" 
                  name="intro_text" 
                  defaultValue={editingRecord?.intro_text || ""}
                  placeholder="The introductory paragraph displayed on the page..."
                  rows={3}
                  onChange={(e) => setIntroTextCount(e.target.value.length)}
                />
                <p className={cn("text-xs", introTextCount > 500 ? "text-orange-500" : "text-muted-foreground")}>
                  {introTextCount}/500 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="about_heading">About Heading</Label>
                <Input 
                  id="about_heading" 
                  name="about_heading" 
                  defaultValue={editingRecord?.about_heading || ""}
                  placeholder="About section heading"
                  onChange={(e) => setAboutHeadingCount(e.target.value.length)}
                />
                <p className={cn("text-xs", aboutHeadingCount > 60 ? "text-orange-500" : "text-muted-foreground")}>
                  {aboutHeadingCount}/60 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="about_content">About Content</Label>
                <Textarea 
                  id="about_content" 
                  name="about_content" 
                  defaultValue={editingRecord?.about_content || ""}
                  placeholder="Rich content for about section (HTML supported)..."
                  rows={5}
                  onChange={(e) => setAboutContentCount(e.target.value.length)}
                />
                <p className="text-xs text-muted-foreground">
                  {aboutContentCount} characters • HTML supported
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingRecord ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* CSV Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk CSV Upload</CardTitle>
          <CardDescription>
            Upload a CSV file to import multiple location SEO overrides at once
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button variant="outline" onClick={downloadTemplate}>
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
            <div>
              <Input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="max-w-xs"
              />
            </div>
          </div>

          {csvData.length > 0 && (
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Status</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Meta Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {csvData.slice(0, 10).map((row, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          {row.isValid ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-destructive" />
                          )}
                        </TableCell>
                        <TableCell>
                          {row.category_slug}
                          {row.error && (
                            <span className="text-xs text-destructive ml-2">
                              ({row.error})
                            </span>
                          )}
                        </TableCell>
                        <TableCell>{row.country || "-"}</TableCell>
                        <TableCell>{row.city || "-"}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {row.meta_description || "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {csvData.length > 10 && (
                <p className="text-sm text-muted-foreground">
                  Showing 10 of {csvData.length} rows
                </p>
              )}

              <div className="flex items-center gap-4">
                <Button onClick={handleImport} disabled={isImporting}>
                  <Upload className="h-4 w-4 mr-2" />
                  {isImporting ? "Importing..." : `Import ${csvData.filter(r => r.isValid).length} Valid Rows`}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCsvData([]);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                >
                  Clear
                </Button>
                <span className="text-sm text-muted-foreground">
                  {csvData.filter(r => r.isValid).length} valid, {csvData.filter(r => !r.isValid).length} invalid
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Existing Records Table */}
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
                placeholder="Search by category, country, city..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {locationSeoRecords && locationSeoRecords.length > 0 ? (
            <>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>SEO Title</TableHead>
                      <TableHead>H1 Override</TableHead>
                      <TableHead className="w-24">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedRecords.length > 0 ? (
                      paginatedRecords.map((record: any) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">
                            {record.categories?.name || "Unknown"}
                          </TableCell>
                          <TableCell>{record.country || "-"}</TableCell>
                          <TableCell>{record.city || "-"}</TableCell>
                          <TableCell className="max-w-[150px] truncate text-xs">
                            {record.seo_title || "-"}
                          </TableCell>
                          <TableCell className="max-w-[150px] truncate text-xs">
                            {record.h1_override || "-"}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
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
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  if (confirm("Delete this location SEO override?")) {
                                    deleteMutation.mutate(record.id);
                                  }
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No results matching "{searchTerm}"
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, filteredRecords.length)} of {filteredRecords.length}
                  </p>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
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
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No location SEO overrides configured yet. Add one manually or upload a CSV.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLocationSeo;
