'use client';

import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAllVenueTypeSeo } from "@/hooks/useVenueTypeSeo";
import { useRegionsByCountry, useCitiesByRegion, useCitiesByCountry } from "@/hooks/useListings";
import { CONTINENT_COUNTRIES } from "@/lib/continents";
import { VENUE_TYPES } from "@/hooks/useVenues";
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
import { Plus, Pencil, Trash2, Upload, Download, Check, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CsvRow {
  venue_type: string;
  continent: string;
  country: string;
  region_slug: string;
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
  error?: string;
}

const continents = Object.keys(CONTINENT_COUNTRIES);

const AdminVenueTypeSeo = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { data: typeSeoRecords, isLoading } = useAllVenueTypeSeo();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [csvData, setCsvData] = useState<CsvRow[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  
  // Form state for cascading dropdowns
  const [selectedVenueType, setSelectedVenueType] = useState<string>("");
  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedRegionSlug, setSelectedRegionSlug] = useState<string>("");
  
  // Character count state
  const [seoTitleCount, setSeoTitleCount] = useState(0);
  const [h1Count, setH1Count] = useState(0);
  const [h2Count, setH2Count] = useState(0);
  const [metaDescCount, setMetaDescCount] = useState(0);
  const [metaKeywordsCount, setMetaKeywordsCount] = useState(0);
  const [introTextCount, setIntroTextCount] = useState(0);
  const [aboutHeadingCount, setAboutHeadingCount] = useState(0);
  const [aboutContentCount, setAboutContentCount] = useState(0);
  
  // Get countries for selected continent
  const countriesForContinent = selectedContinent ? CONTINENT_COUNTRIES[selectedContinent] || [] : [];
  
  // Get regions for selected country
  const { data: regions } = useRegionsByCountry(selectedCountry || undefined);
  
  // Get cities - by region if selected, otherwise by country
  const selectedRegionId = regions?.find(r => r.region_slug === selectedRegionSlug)?.id;
  const { data: citiesByRegion } = useCitiesByRegion(selectedRegionId || undefined);
  const { data: citiesByCountry } = useCitiesByCountry(undefined, selectedCountry || undefined);
  const cities = selectedRegionId ? citiesByRegion : citiesByCountry;

  // Reset form state when dialog opens/closes or editing changes
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

  // Reset country when continent changes
  useEffect(() => {
    if (!editingRecord) {
      setSelectedCountry("");
      setSelectedRegionSlug("");
    }
  }, [selectedContinent, editingRecord]);

  // Reset region when country changes
  useEffect(() => {
    if (!editingRecord) {
      setSelectedRegionSlug("");
    }
  }, [selectedCountry, editingRecord]);

  const createMutation = useMutation({
    mutationFn: async (record: {
      venue_type: string;
      continent: string | null;
      country: string | null;
      region_slug: string | null;
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
        .from("venue_type_seo")
        .insert([record]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venue-type-seo-all"] });
      toast({ title: "Venue type SEO record created" });
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
      venue_type: string;
      continent: string | null;
      country: string | null;
      region_slug: string | null;
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
        .from("venue_type_seo")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venue-type-seo-all"] });
      toast({ title: "Venue type SEO record updated" });
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
        .from("venue_type_seo")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venue-type-seo-all"] });
      toast({ title: "Venue type SEO record deleted" });
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
    const comment1 = "# Venue Type SEO Template";
    const comment2 = "# Recommended character counts: seo_title (60), h1_override (70), h2_override (60), meta_description (160), intro_text (500), about_heading (60)";
    const headers = "venue_type,continent,country,region_slug,city,seo_title,h1_override,h2_override,meta_description,meta_keywords,intro_text,about_heading,about_content";
    const example1 = 'Arena,Europe,,,,"European Arenas | Showcase Music","Arenas in Europe","European Arenas",Find arenas across Europe...,arenas europe stadiums,Browse arenas from intimate to massive...,About European Arenas,Europe has a vibrant arena scene...';
    const example2 = 'Arena,Europe,United Kingdom,,,"UK Arenas | Showcase Music","Arenas in the UK","UK Arenas",UK arenas...,uk arenas stadiums,Browse UK arenas...,About UK Arenas,The UK has world-class arenas...';
    const csv = `${comment1}\n${comment2}\n${headers}\n${example1}\n${example2}`;
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "venue_type_seo_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const parseCsv = (text: string): CsvRow[] => {
    const lines = text.trim().split("\n").filter(line => !line.startsWith("#"));
    const headers = lines[0].split(",").map(h => h.trim().toLowerCase());
    
    return lines.slice(1).map(line => {
      // Handle quoted values with commas
      const values: string[] = [];
      let current = "";
      let inQuotes = false;
      
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

      const row: any = {};
      headers.forEach((h, i) => {
        row[h] = values[i]?.replace(/^"|"$/g, "") || "";
      });

      return row as CsvRow;
    });
  };

  const validateCsvData = (rows: CsvRow[]): CsvRow[] => {
    return rows.map(row => {
      // Validate venue type exists
      if (!row.venue_type || !VENUE_TYPES.includes(row.venue_type as any)) {
        return { ...row, isValid: false, error: `Invalid venue type: ${row.venue_type}` };
      }
      // Validate continent exists if provided
      if (row.continent && !continents.includes(row.continent)) {
        return { ...row, isValid: false, error: `Unknown continent: ${row.continent}` };
      }
      // Validate country is in continent
      if (row.continent && row.country) {
        const validCountries = CONTINENT_COUNTRIES[row.continent] || [];
        if (!validCountries.includes(row.country)) {
          return { ...row, isValid: false, error: `Country not in ${row.continent}` };
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
    const validRows = csvData.filter(row => row.isValid);
    if (validRows.length === 0) {
      toast({ title: "No valid rows to import", variant: "destructive" });
      return;
    }

    setIsImporting(true);
    let imported = 0;
    let errors = 0;

    for (const row of validRows) {
      try {
        const { error } = await supabase
          .from("venue_type_seo")
          .upsert({
            venue_type: row.venue_type,
            continent: row.continent || null,
            country: row.country || null,
            region_slug: row.region_slug || null,
            city: row.city || null,
            seo_title: row.seo_title || null,
            h1_override: row.h1_override || null,
            h2_override: row.h2_override || null,
            meta_description: row.meta_description || null,
            meta_keywords: row.meta_keywords || null,
            intro_text: row.intro_text || null,
            about_heading: row.about_heading || null,
            about_content: row.about_content || null,
          }, {
            onConflict: "venue_type,continent,country,region_slug,city",
          });

        if (error) {
          errors++;
        } else {
          imported++;
        }
      } catch {
        errors++;
      }
    }

    setIsImporting(false);
    setCsvData([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
    queryClient.invalidateQueries({ queryKey: ["venue-type-seo-all"] });
    toast({ 
      title: "Import complete", 
      description: `${imported} records imported, ${errors} errors` 
    });
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Venue Type SEO</h1>
          <p className="text-muted-foreground">
            Manage venue type-specific SEO content for venue finder pages (e.g., /venues/europe/arenas)
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
                {editingRecord ? "Edit Venue Type SEO" : "Add Venue Type SEO Override"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="venue_type">Venue Type *</Label>
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
                    <SelectItem value="__all__">Select venue type...</SelectItem>
                    {VENUE_TYPES.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="continent">Continent</Label>
                  <Select 
                    name="continent" 
                    value={selectedContinent || "__all__"}
                    onValueChange={(val) => setSelectedContinent(val === "__all__" ? "" : val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All continents (type-only)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__all__">All continents (type-only)</SelectItem>
                      {continents.map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Leave empty for type-only default</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select 
                    name="country" 
                    value={selectedCountry || "__all__"}
                    onValueChange={(val) => setSelectedCountry(val === "__all__" ? "" : val)}
                    disabled={!selectedContinent}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={selectedContinent ? "All countries" : "Select continent first"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__all__">All countries (continent level)</SelectItem>
                      {countriesForContinent.map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Leave empty for continent-level default</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="region_slug">Region</Label>
                  <Select 
                    name="region_slug" 
                    value={selectedRegionSlug || "__all__"}
                    onValueChange={(val) => setSelectedRegionSlug(val === "__all__" ? "" : val)}
                    disabled={!selectedCountry || !regions?.length}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={!selectedCountry ? "Select country first" : regions?.length ? "All regions" : "No regions"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__all__">All regions (country level)</SelectItem>
                      {regions?.map(r => (
                        <SelectItem key={r.id} value={r.region_slug}>{r.region_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Leave empty for country-level content</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Select 
                    name="city" 
                    defaultValue={editingRecord?.city || "__all__"}
                    disabled={!selectedCountry || !cities?.length}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={!selectedCountry ? "Select country first" : cities?.length ? "All cities" : "No cities"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__all__">All cities</SelectItem>
                      {cities?.map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Leave empty for region/country-level content</p>
                </div>
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
                  <Label htmlFor="h2_override">H2 Override <span className="text-muted-foreground font-normal">(next to venue count)</span></Label>
                  <Input 
                    id="h2_override" 
                    name="h2_override" 
                    defaultValue={editingRecord?.h2_override || ""}
                    placeholder="Custom results heading"
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
                  placeholder="SEO meta description for this venue type..."
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
                <Label htmlFor="intro_text">Intro Text <span className="text-muted-foreground font-normal">(under venue count)</span></Label>
                <Textarea 
                  id="intro_text" 
                  name="intro_text" 
                  defaultValue={editingRecord?.intro_text || ""}
                  placeholder="The introductory paragraph displayed below H1..."
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
                <Button type="submit" disabled={!selectedVenueType}>
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
            Upload a CSV file to import multiple venue type SEO overrides at once
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
                      <TableHead>Venue Type</TableHead>
                      <TableHead>Continent</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>H1 Override</TableHead>
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
                        <TableCell className="font-medium">
                          {row.venue_type || "-"}
                          {row.error && (
                            <span className="text-xs text-destructive ml-2">
                              ({row.error})
                            </span>
                          )}
                        </TableCell>
                        <TableCell>{row.continent || "-"}</TableCell>
                        <TableCell>{row.country || "-"}</TableCell>
                        <TableCell>{row.region_slug || "-"}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {row.h1_override || "-"}
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
          <CardTitle>Venue Type SEO Overrides</CardTitle>
          <CardDescription>
            {typeSeoRecords?.length || 0} venue type-specific overrides configured
          </CardDescription>
        </CardHeader>
        <CardContent>
          {typeSeoRecords && typeSeoRecords.length > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Venue Type</TableHead>
                    <TableHead>Continent</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>H1 Override</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {typeSeoRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {record.venue_type}
                      </TableCell>
                      <TableCell>{record.continent || "-"}</TableCell>
                      <TableCell>{record.country || "-"}</TableCell>
                      <TableCell>{record.region_slug || "-"}</TableCell>
                      <TableCell>{record.city || "-"}</TableCell>
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
                              if (confirm("Delete this venue type SEO override?")) {
                                deleteMutation.mutate(record.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No venue type SEO overrides configured yet. Add one manually or upload a CSV.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVenueTypeSeo;
