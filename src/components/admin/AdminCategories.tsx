'use client';

import React from 'react';
import Link from 'next/link';
import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Category } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Search, FolderOpen, Tag, Info, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

// Helper to safely parse search_terms - MOVED TO TOP
const getSearchTermsArray = (search_terms: any): string[] => {
  if (!search_terms) return [];
  if (Array.isArray(search_terms)) return search_terms;
  if (typeof search_terms === 'string') {
    try {
      const parsed = JSON.parse(search_terms);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return search_terms.split(',').map(t => t.trim()).filter(Boolean);
    }
  }
  return [];
};

export default function AdminCategories() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchFilter, setSearchFilter] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const scrollPositionRef = useRef<number>(0);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  
  // Character count state
  const [aboutHeadingCount, setAboutHeadingCount] = useState(0);
  const [aboutContentCount, setAboutContentCount] = useState(0);
  const [metaDescCount, setMetaDescCount] = useState(0);
  const [seoTitleCount, setSeoTitleCount] = useState(0);

  // Field value state for live previews
  const [aboutHeadingValue, setAboutHeadingValue] = useState('');
  const [aboutContentValue, setAboutContentValue] = useState('');
  const [metaDescValue, setMetaDescValue] = useState('');
  const [seoTitleValue, setSeoTitleValue] = useState('');

  // Reset counts and values when dialog opens/closes or editing changes
  useEffect(() => {
    setAboutHeadingCount(editingCategory?.seo_about_heading?.length || 0);
    setAboutContentCount(editingCategory?.seo_about_content?.length || 0);
    setMetaDescCount(editingCategory?.seo_meta_description?.length || 0);
    setSeoTitleCount(editingCategory?.seo_title?.length || 0);
    // Initialize field values for previews
    setAboutHeadingValue(editingCategory?.seo_about_heading || '');
    setAboutContentValue(editingCategory?.seo_about_content || '');
    setMetaDescValue(editingCategory?.seo_meta_description || '');
    setSeoTitleValue(editingCategory?.seo_title || '');
  }, [editingCategory, isDialogOpen]);

  // Query for location SEO override count when editing
  const { data: locationSeoCount } = useQuery({
    queryKey: ["category-location-seo-count", editingCategory?.id],
    queryFn: async () => {
      if (!editingCategory?.id) return 0;
      const { count, error } = await supabase
        .from("category_location_seo")
        .select("*", { count: "exact", head: true })
        .eq("category_id", editingCategory.id);
      if (error) throw error;
      return count || 0;
    },
    enabled: !!editingCategory?.id,
  });

  // Placeholder replacement helper
  const replacePlaceholders = (template: string, location: string): string => {
    let result = template;
    if (location) {
      result = result.replace(/\{in_location\}/gi, `in ${location}`);
      result = result.replace(/\{location\}/gi, location);
    } else {
      result = result.replace(/\s*\{in_location\}/gi, '');
      result = result.replace(/\{location\}/gi, '');
    }
    return result.trim();
  };

  // Query for all categories with parent info
  const { data: categories, isLoading } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
  .from("categories")
  .select("*")
  .order("name");
      if (error) throw error;
      return data as Category[];
    },
  });

  // Get parent categories for dropdown
  const parentCategories = categories?.filter(c => !c.parent_id) || [];

  // Get hierarchical structure
  const categoriesHierarchy = parentCategories.map(parent => ({
    ...parent,
    children: categories?.filter(c => c.parent_id === parent.id) || [],
  }));

  // Filter logic for search
  const filteredCategories = categoriesHierarchy.filter(parent => {
    if (!searchFilter) return true;
    const parentMatches = 
      parent.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      getSearchTermsArray(parent.search_terms).some((term) => term.toLowerCase().includes(searchFilter.toLowerCase()));
    
    const childMatches = parent.children.some(child =>
      child.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        getSearchTermsArray(child.search_terms).some((term) => term.toLowerCase().includes(searchFilter.toLowerCase()))
    );
    return parentMatches || childMatches;
  });

  const createMutation = useMutation({
    mutationFn: async (category: Partial<Category> & { search_terms_input?: string; url_slug?: string; card_tagline?: string | null; seo_about_heading?: string | null; seo_about_content?: string | null; seo_meta_description?: string | null; seo_meta_keywords?: string | null; seo_title?: string | null }) => {
      const slug = category.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "";
      const searchTerms = category.search_terms_input
        ? category.search_terms_input.split(",").map((t) => t.trim()).filter(Boolean)
        : [];
      const { error } = await supabase.from("categories").insert([{
        id: crypto.randomUUID(),
        name: category.name!,
        slug,
        url_slug: category.url_slug?.trim() || null,
        icon: category.icon || null,
        parent_id: category.parent_id || null,
        card_tagline: category.card_tagline || null,
        seo_about_heading: category.seo_about_heading || null,
        seo_about_content: category.seo_about_content || null,
        seo_h2_override: category.seo_h2_override || null,
        search_terms: searchTerms,
        seo_meta_description: category.seo_meta_description || null,
        seo_meta_keywords: category.seo_meta_keywords || null,
        seo_title: category.seo_title || null,
      }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      setIsDialogOpen(false);
      toast({ title: "Category created successfully" });
      setEditingCategory(null);
    },
    onError: (error: Error) => {
      toast({ title: "Error creating category", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (category: Partial<Category> & { id: string; search_terms_input?: string; url_slug?: string; card_tagline?: string | null; seo_about_heading?: string | null; seo_about_content?: string | null; seo_meta_description?: string | null; seo_meta_keywords?: string | null; seo_title?: string | null }) => {
      const searchTerms = category.search_terms_input
        ? category.search_terms_input.split(",").map((t) => t.trim()).filter(Boolean)
        : [];
      
      // Generate slug from name if name changed
      const slug = category.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "";

      const { error } = await supabase
        .from("categories")
        .update({
          name: category.name,
          slug,
          url_slug: category.url_slug?.trim() || null,
          icon: category.icon || null,
          parent_id: category.parent_id || null,
          card_tagline: category.card_tagline || null,
          seo_about_heading: category.seo_about_heading || null,
          seo_about_content: category.seo_about_content || null,
          seo_h2_override: category.seo_h2_override || null,
          search_terms: searchTerms,
          seo_meta_description: category.seo_meta_description || null,
          seo_meta_keywords: category.seo_meta_keywords || null,
          seo_title: category.seo_title || null,
        })
        .eq("id", category.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      setIsDialogOpen(false);
      toast({ title: "Category updated successfully" });
      setEditingCategory(null);
    },
    onError: (error: Error) => {
      toast({ title: "Error updating category", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast({ title: "Category deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error deleting category", description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const categoryData = {
      name: formData.get("name") as string,
      url_slug: formData.get("url_slug") as string,
      icon: formData.get("icon") as string,
      parent_id: (formData.get("parent_id") as string === "__none__" ? null : formData.get("parent_id") as string) || null,
      card_tagline: formData.get("card_tagline") as string || null,
      seo_about_heading: formData.get("seo_about_heading") as string || null,
      seo_about_content: formData.get("seo_about_content") as string || null,
      seo_h2_override: formData.get("seo_h2_override") as string || null,
      search_terms_input: formData.get("search_terms") as string,
      seo_meta_description: formData.get("seo_meta_description") as string || null,
      seo_meta_keywords: formData.get("seo_meta_keywords") as string || null,
      seo_title: formData.get("seo_title") as string || null,
    };

    if (editingCategory) {
      updateMutation.mutate({ ...categoryData, id: editingCategory.id });
    } else {
      createMutation.mutate(categoryData);
    }
  };

  const CategoryRow = ({ category, isChild = false }: { category: Category; isChild?: boolean }) => {
    const searchTerms = getSearchTermsArray(category.search_terms);
    return (
    <TableRow className={isChild ? "bg-muted/30" : ""}>
      <TableCell className={cn("font-medium", isChild && "pl-8")}>
        {isChild && <span className="text-muted-foreground mr-2">└─</span>}
        {category.name}
      </TableCell>
      <TableCell>
        <code className="text-xs bg-muted px-2 py-1 rounded">
          /{category.url_slug || category.slug}
        </code>
      </TableCell>
      <TableCell>{category.icon}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1 max-w-md">
          {searchTerms.slice(0, 3).map((term, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {term}
            </Badge>
          ))}
          {searchTerms.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{searchTerms.length - 3} more
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setEditingCategory(category);
              setIsDialogOpen(true);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (confirm(`Delete "${category.name}"?`)) {
                deleteMutation.mutate(category.id);
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground">Manage sectors and services</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingCategory(null);
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCategory ? "Edit Category" : "Create Category"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* BASIC INFORMATION */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">BASIC INFORMATION</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      <h1>Category Name</h1>
                    </Label>
                    <Input 
                      id="name" 
                      name="name" 
                      defaultValue={editingCategory?.name || ""} 
                      placeholder="e.g., PA Hire" 
                      required 
                    />
                    <p className="text-xs text-muted-foreground">
                      Becomes the page H1. Location is appended automatically (e.g., "PA Hire in France")
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parent_id">Parent Category</Label>
                    <Select name="parent_id" defaultValue={editingCategory?.parent_id || "__none__"}>
                      <SelectTrigger>
                        <SelectValue placeholder="None (Top Level)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__none__">None (Top Level)</SelectItem>
                        {parentCategories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="url_slug">URL Slug</Label>
                    <Input 
                      id="url_slug" 
                      name="url_slug" 
                      defaultValue={editingCategory?.url_slug || ""} 
                      placeholder="Leave blank for auto-generation" 
                    />
                    <p className="text-xs text-muted-foreground">
                      Custom URL: /equip
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="icon">Icon</Label>
                    <Select name="icon" defaultValue={editingCategory?.icon || ""}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Music">Music</SelectItem>
                        <SelectItem value="Mic">Mic</SelectItem>
                        <SelectItem value="Radio">Radio</SelectItem>
                        <SelectItem value="Volume2">Volume2</SelectItem>
                        <SelectItem value="Headphones">Headphones</SelectItem>
                        <SelectItem value="Video">Video</SelectItem>
                        <SelectItem value="Camera">Camera</SelectItem>
                        <SelectItem value="Film">Film</SelectItem>
                        <SelectItem value="Lightbulb">Lightbulb</SelectItem>
                        <SelectItem value="Zap">Zap</SelectItem>
                        <SelectItem value="Users">Users</SelectItem>
                        <SelectItem value="Building">Building</SelectItem>
                        <SelectItem value="MapPin">MapPin</SelectItem>
                        <SelectItem value="Truck">Truck</SelectItem>
                        <SelectItem value="Package">Package</SelectItem>
                        <SelectItem value="Settings">Settings</SelectItem>
                        <SelectItem value="Wrench">Wrench</SelectItem>
                        <SelectItem value="Star">Star</SelectItem>
                        <SelectItem value="Award">Award</SelectItem>
                        <SelectItem value="Shield">Shield</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="card_tagline">Card Tagline</Label>
                  <Input
                    id="card_tagline"
                    name="card_tagline"
                    defaultValue={editingCategory?.card_tagline || ""}
                    placeholder="Short description for category cards"
                  />
                  <p className="text-xs text-muted-foreground">
                    Appears on category cards on the homepage and category listing pages
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="search_terms">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Search Keywords
                    </div>
                  </Label>
                  <Textarea
                    id="search_terms"
                    name="search_terms"
                    defaultValue={getSearchTermsArray(editingCategory?.search_terms).join(", ")}
                    placeholder="PA hire, sound system hire, speaker hire, audio hire"
                    rows={2}
                  />
                  <p className="text-xs text-muted-foreground">
                    Comma-separated. Helps users find this category when searching.
                  </p>
                </div>
              </div>

              {/* Section 2: Listings H2 */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <h2 className="text-lg font-semibold">LISTINGS SECTION</h2>
                  <Badge variant="outline" className="text-xs">+location</Badge>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                  <div className="text-sm">
                    <div className="font-medium mb-1">Format: {"{count}"} results found — {"{H2 Override or Category Name}"} Companies{"{location}"}</div>
                    <div className="text-muted-foreground">Example: "12 results found — Backline Hire Companies in France"</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seo_h2_override">
                    H2 Override
                    <Badge variant="secondary" className="ml-2 text-xs">+location</Badge>
                  </Label>
                  <Input
                    id="seo_h2_override"
                    name="seo_h2_override"
                    defaultValue={editingCategory?.seo_h2_override || ""}
                    placeholder="Equipment Hire"
                  />
                  <p className="text-xs text-muted-foreground">
                    Replaces category name in listings H2. Leave blank to use category name. 
                    Location appended automatically.
                  </p>
                </div>
              </div>

              {/* Section 3: About Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <h2 className="text-lg font-semibold">ABOUT SECTION</h2>
                  <Badge variant="outline" className="text-xs">+location</Badge>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                  <div className="text-sm font-medium">Location Placeholders:</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <code className="bg-background px-1 rounded">{"{location}"}</code> → "France"</li>
                    <li>• <code className="bg-background px-1 rounded">{"{in_location}"}</code> → "in France"</li>
                  </ul>
                  <div className="text-xs text-muted-foreground mt-2">
                    These are replaced automatically based on user's location filter.
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seo_about_heading">
                    About Heading (H2)
                    <span className="text-xs text-muted-foreground ml-2">
                      ({aboutHeadingCount}/100 recommended)
                    </span>
                  </Label>
                  <Input
                    id="seo_about_heading"
                    name="seo_about_heading"
                    defaultValue={editingCategory?.seo_about_heading || ""}
                    placeholder="About Backline Hire {in_location}"
                    onChange={(e) => {
                      setAboutHeadingCount(e.target.value.length);
                      setAboutHeadingValue(e.target.value);
                    }}
                  />
                  {aboutHeadingValue && (
                    <div className="text-xs bg-muted p-2 rounded">
                      <div className="font-medium mb-1">Preview with location "France":</div>
                      <div className="text-muted-foreground">{replacePlaceholders(aboutHeadingValue, 'France')}</div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seo_about_content">
                    About Content
                    <span className="text-xs text-muted-foreground ml-2">
                      ({aboutContentCount}/500 recommended)
                    </span>
                  </Label>
                  <Textarea
                    id="seo_about_content"
                    name="seo_about_content"
                    defaultValue={editingCategory?.seo_about_content || ""}
                    placeholder="Professional backline hire services {in_location}..."
                    rows={4}
                    onChange={(e) => {
                      setAboutContentCount(e.target.value.length);
                      setAboutContentValue(e.target.value);
                    }}
                  />
                  {aboutContentValue && (
                    <div className="text-xs bg-muted p-2 rounded">
                      <div className="font-medium mb-1">Preview with location "France":</div>
                      <div className="text-muted-foreground whitespace-pre-wrap">{replacePlaceholders(aboutContentValue, 'France')}</div>
                    </div>
                  )}
                </div>

                {editingCategory && (
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="space-y-2 flex-1">
                      <div className="text-sm">
                        <div className="font-medium text-blue-900 dark:text-blue-100">
                          {locationSeoCount || 0} Location-Specific Override{(locationSeoCount || 0) !== 1 ? 's' : ''}
                        </div>
                        <div className="text-blue-700 dark:text-blue-300 mt-1">
                          These overrides take precedence over the category defaults above for specific locations.
                        </div>
                      </div>
                      {(locationSeoCount || 0) > 0 && (
                        <Link 
                          href={`/admin/seo?category=${editingCategory.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            className="mt-2"
                          >
                            View Location Overrides
                            <ExternalLink className="h-3 w-3 ml-2" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Section 4: SEO Meta */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold border-b pb-2">SEO META TAGS</h2>

                <div className="space-y-2">
                  <Label htmlFor="seo_title">
                    Meta Title
                    <span className="text-xs text-muted-foreground ml-2">
                      ({seoTitleCount}/60 recommended)
                    </span>
                  </Label>
                  <Input
                    id="seo_title"
                    name="seo_title"
                    defaultValue={editingCategory?.seo_title || ""}
                    placeholder="Backline Hire Companies | Showcase Music Directory"
                    onChange={(e) => {
                      setSeoTitleCount(e.target.value.length);
                      setSeoTitleValue(e.target.value);
                    }}
                  />
                  {seoTitleValue && (
                    <div className="text-xs bg-muted p-2 rounded">
                      <div className="font-medium mb-1">Preview:</div>
                      <div className="text-blue-600 underline">{seoTitleValue}</div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seo_meta_description">
                    Meta Description
                    <span className="text-xs text-muted-foreground ml-2">
                      ({metaDescCount}/160 recommended)
                    </span>
                  </Label>
                  <Textarea
                    id="seo_meta_description"
                    name="seo_meta_description"
                    defaultValue={editingCategory?.seo_meta_description || ""}
                    placeholder="Find professional backline hire companies..."
                    rows={3}
                    onChange={(e) => {
                      setMetaDescCount(e.target.value.length);
                      setMetaDescValue(e.target.value);
                    }}
                  />
                  {metaDescValue && (
                    <div className="text-xs bg-muted p-2 rounded">
                      <div className="font-medium mb-1">Preview:</div>
                      <div className="text-muted-foreground">{metaDescValue}</div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seo_meta_keywords">Meta Keywords</Label>
                  <Input
                    id="seo_meta_keywords"
                    name="seo_meta_keywords"
                    defaultValue={editingCategory?.seo_meta_keywords || ""}
                    placeholder="backline hire, instrument hire, equipment rental"
                  />
                  <p className="text-xs text-muted-foreground">
                    Comma-separated. Mostly for legacy SEO support.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : editingCategory
                    ? "Update Category"
                    : "Create Category"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingCategory(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories or keywords..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>URL Slug</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Search Keywords</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No categories found
                </TableCell>
              </TableRow>
            ) : (
              <>
                {filteredCategories.map((parent) => (
                  <React.Fragment key={parent.id}>
                    <CategoryRow category={parent} />
                    {parent.children.map((child) => (
                      <CategoryRow key={child.id} category={child} isChild />
                    ))}
                  </React.Fragment>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}