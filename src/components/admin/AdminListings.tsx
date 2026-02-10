'use client';

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Listing, ListingTier } from "@/types/database";
import { VENUE_TYPE_SLUGS } from "@/lib/venueTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Badge } from "@/components/ui/badge";
import { TierBadge } from "@/components/TierBadge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Search, X, MapPin, Info, RotateCcw } from "lucide-react";
import { AdminLogoUpload } from "@/components/admin/AdminLogoUpload";
import { AdminCategorySelector } from "@/components/admin/AdminCategorySelector";
import { AdminPhotoManager } from "@/components/admin/AdminPhotoManager";
import { AdminContactsManager } from "@/components/admin/AdminContactsManager";
import { useListingCategoryIds, useUpdateListingCategories } from "@/hooks/useListingCategories";
import { useCategories } from "@/hooks/useCategories";
import { useDebounce } from "@/hooks/useDebounce";

const PAGE_SIZE = 25;

export default function AdminListings() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false); // NEW: Track if categories loaded
  const [primaryCategoryId, setPrimaryCategoryId] = useState<string | null>(null);
  const [currentTier, setCurrentTier] = useState<string>("free");
  const [selectedRegionId, setSelectedRegionId] = useState<number | null>(null);
  const [showContacts, setShowContacts] = useState<boolean>(false);
  
  // Search & filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(0);
  
  const debouncedSearch = useDebounce(searchQuery, 300);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Reset to page 0 when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearch, tierFilter, statusFilter]);

  // Fetch regions for mapping
  const { data: regions } = useQuery({
    queryKey: ["all-regions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("regions")
        .select("id, region_name, country")
        .order("country")
        .order("region_name");
      if (error) throw error;
      return data;
    },
  });

  const { data: listingsData, isLoading } = useQuery({
    queryKey: ["admin-listings", debouncedSearch, tierFilter, statusFilter, currentPage],
    queryFn: async () => {
      let query = supabase
        .from("listings")
        .select("*", { count: "exact" });
      
      // Apply search filter
      if (debouncedSearch) {
        query = query.or(`name.ilike.%${debouncedSearch}%,country.ilike.%${debouncedSearch}%,town_city.ilike.%${debouncedSearch}%`);
      }
      
      // Apply tier filter
      if (tierFilter && tierFilter !== "all") {
        query = query.eq("tier", tierFilter as ListingTier);
      }
      
      // Apply status filter
      if (statusFilter && statusFilter !== "all") {
        query = query.eq("is_active", statusFilter === "active");
      }
      
      // Pagination
      const from = currentPage * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to).order("name");
      
      const { data, error, count } = await query;
      if (error) throw error;
      return { listings: data as Listing[], totalCount: count || 0 };
    },
  });

  // Helper to get region name from region_id
  const getRegionName = (regionId: number | null) => {
    if (!regionId || !regions) return null;
    const region = regions.find(r => r.id === regionId);
    return region ? region.region_name : null;
  };

  const listings = listingsData?.listings;
  const totalCount = listingsData?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const hasFilters = debouncedSearch || tierFilter !== "all" || statusFilter !== "all";

  const { data: categories } = useCategories();
  const { data: currentCategoryIds } = useListingCategoryIds(editingListing?.id);
  const updateCategoriesMutation = useUpdateListingCategories();

  // Sync selected categories when editing a listing
  useEffect(() => {
    if (currentCategoryIds) {
      setSelectedCategoryIds(currentCategoryIds);
      setCategoriesLoaded(true); // NEW: Mark as loaded
    }
  }, [currentCategoryIds]);

  // Get category names for display
  const getCategoryNames = (listingId: string) => {
    // This is a simplified version - in production you'd fetch this data
    return [];
  };

  const createMutation = useMutation({
    mutationFn: async (listing: Partial<Listing>) => {
      const slug = listing.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "";
      const { data, error } = await supabase.from("listings").insert([{
        id: crypto.randomUUID(),
        name: listing.name!,
        slug,
        tier: listing.tier || "free",
        description: listing.description,
        short_description: listing.short_description,
        logo_url: listing.logo_url,
        website: listing.website,
        email: listing.email,
        phone: listing.phone,
        country: listing.country,
        county: listing.county || null,
        town_city: listing.town_city,
        postcode: listing.postcode || null,
        address: listing.address,
        facebook_url: listing.facebook_url,
        instagram_url: listing.instagram_url,
        linkedin_url: listing.linkedin_url,
        twitter_url: listing.twitter_url,
        youtube_url: listing.youtube_url,
        latitude: listing.latitude,
        longitude: listing.longitude,
        coordinates_manual: listing.coordinates_manual || false,
        year_established: listing.year_established,
        primary_category_id: listing.primary_category_id || null,
        region_id: listing.region_id || null,
        venue_type: listing.venue_type || null,
        capacity: listing.capacity || null,
        show_contacts: listing.show_contacts || false,
        is_active: true,
      }]).select().single();
      if (error) {
        console.error("createMutation: Supabase error:", error);
        throw error;
      }
      return data;
    },
    onSuccess: async (data) => {
      // Save categories for the new listing
      if (selectedCategoryIds.length > 0 && data) {
        await updateCategoriesMutation.mutateAsync({
          listingId: data.id,
          categoryIds: selectedCategoryIds,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["admin-listings"] });
      queryClient.invalidateQueries({ queryKey: ["listing-categories", data.id] });
      setIsDialogOpen(false);
      toast({ title: "Listing created successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error creating listing", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (listing: Partial<Listing> & { id: string }) => {
      console.log("updateMutation: Starting update for listing", listing.id);
      console.log("updateMutation: Data to update:", listing);
      
      const { data, error } = await supabase
        .from("listings")
        .update(listing)
        .eq("id", listing.id)
        .select();
      
      if (error) {
        console.error("updateMutation: Supabase error:", error);
        throw error;
      }
      
      console.log("updateMutation: Update successful, data:", data);
      return listing.id;
    },
    onSuccess: async (listingId) => {
      console.log("updateMutation: onSuccess called for listing", listingId);
      console.log("updateMutation: categoriesLoaded:", categoriesLoaded);
      console.log("updateMutation: selectedCategoryIds:", selectedCategoryIds);
      
      try {
        // ONLY update categories if they were actually loaded
        if (categoriesLoaded) {
          console.log("updateMutation: Updating categories", selectedCategoryIds);
          await updateCategoriesMutation.mutateAsync({
            listingId,
            categoryIds: selectedCategoryIds,
          });
          console.log("updateMutation: Categories updated successfully");
        } else {
          console.log("updateMutation: Skipping category update - categories not loaded yet");
        }
        
        queryClient.invalidateQueries({ queryKey: ["admin-listings"] });
        queryClient.invalidateQueries({ queryKey: ["listing-categories", listingId] });
        setIsDialogOpen(false);
        setEditingListing(null);
        toast({ title: "Listing updated successfully" });
      } catch (error: any) {
        console.error("updateMutation: Error updating categories:", error);
        toast({ 
          title: "Listing updated but categories failed", 
          description: error.message, 
          variant: "destructive" 
        });
      }
    },
    onError: (error: any) => {
      console.error("updateMutation: onError called:", error);
      toast({ title: "Error updating listing", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("listings").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-listings"] });
      toast({ title: "Listing deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error deleting listing", description: error.message, variant: "destructive" });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from("listings")
        .update({ is_active })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-listings"] });
      toast({ title: `Listing ${variables.is_active ? "activated" : "deactivated"}` });
    },
    onError: (error: any) => {
      toast({ title: "Error updating status", description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit: Form submitted");
    console.log("handleSubmit: Editing listing:", editingListing?.id);
    
    const formData = new FormData(e.currentTarget);
    
    const latitudeVal = formData.get("latitude") as string;
    const longitudeVal = formData.get("longitude") as string;
    const yearVal = formData.get("year_established") as string;

    const listing = {
      name: formData.get("name") as string,
      tier: formData.get("tier") as ListingTier,
      short_description: formData.get("short_description") as string || null,
      description: formData.get("description") as string || null,
      logo_url: logoUrl,
      website: formData.get("website") as string || null,
      email: formData.get("email") as string || null,
      phone: formData.get("phone") as string || null,
      country: formData.get("country") as string || null,
      county: formData.get("county") as string || null,
      town_city: formData.get("town_city") as string || null,
      postcode: formData.get("postcode") as string || null,
      address: formData.get("address") as string || null,
      facebook_url: formData.get("facebook_url") as string || null,
      instagram_url: formData.get("instagram_url") as string || null,
      linkedin_url: formData.get("linkedin_url") as string || null,
      twitter_url: formData.get("twitter_url") as string || null,
      youtube_url: formData.get("youtube_url") as string || null,
      latitude: latitudeVal ? parseFloat(latitudeVal) : null,
      longitude: longitudeVal ? parseFloat(longitudeVal) : null,
      coordinates_manual: (latitudeVal && longitudeVal) ? true : editingListing?.coordinates_manual ?? false,
      year_established: yearVal ? parseInt(yearVal) : null,
      primary_category_id: primaryCategoryId,
      region_id: selectedRegionId,
      venue_type: (formData.get("venue_type") as string) === "none" ? null : (formData.get("venue_type") as string || null),
      capacity: formData.get("capacity") ? parseInt(formData.get("capacity") as string) : null,
      show_contacts: showContacts,
    };

    console.log("handleSubmit: Listing data:", listing);

    if (editingListing) {
      console.log("handleSubmit: Calling updateMutation");
      updateMutation.mutate({ ...listing, id: editingListing.id });
    } else {
      console.log("handleSubmit: Calling createMutation");
      createMutation.mutate(listing);
    }
  };

  const openEditDialog = (listing: Listing) => {
    setEditingListing(listing);
    setLogoUrl(listing.logo_url);
    setSelectedCategoryIds([]); // Reset to empty
    setCategoriesLoaded(false); // NEW: Mark as not loaded yet
    setPrimaryCategoryId(listing.primary_category_id || null);
    setCurrentTier(listing.tier);
    setSelectedRegionId(listing.region_id || null);
    setShowContacts(listing.show_contacts || false);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingListing(null);
    setLogoUrl(null);
    setSelectedCategoryIds([]);
    setCategoriesLoaded(false); // NEW: No categories to load for new listing
    setPrimaryCategoryId(null);
    setCurrentTier("free");
    setSelectedRegionId(null);
    setShowContacts(false);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Listings</h1>
        <Dialog 
          open={isDialogOpen} 
          onOpenChange={(open) => {
            // Prevent closing if mutation is in progress
            if (!open && (updateMutation.isPending || createMutation.isPending)) {
              console.log("Prevented dialog close during mutation");
              return;
            }
            setIsDialogOpen(open);
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Listing
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingListing ? "Edit Listing" : "Add New Listing"}
              </DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="contact">Location</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="contacts" disabled={!editingListing}>Contacts</TabsTrigger>
                <TabsTrigger value="photos" disabled={!editingListing}>Photos</TabsTrigger>
              </TabsList>

              {/* Form wraps only tabs 1-5 to prevent Photos tab from triggering form submission */}
              <form onSubmit={handleSubmit} id="listing-form" className="space-y-4">
                <TabsContent value="basic" forceMount className="space-y-4 mt-4 data-[state=inactive]:hidden">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={editingListing?.name}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tier">Tier *</Label>
                      <Select 
                        name="tier" 
                        defaultValue={editingListing?.tier || "free"}
                        onValueChange={(val) => {
                          setCurrentTier(val);
                          // Clear primary category if switching to free tier
                          if (val === "free") {
                            setPrimaryCategoryId(null);
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="premier">Premier</SelectItem>
                          <SelectItem value="enhanced">Enhanced</SelectItem>
                          <SelectItem value="free">Free</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="short_description">Short Description</Label>
                    <Input
                      id="short_description"
                      name="short_description"
                      maxLength={80}
                      defaultValue={editingListing?.short_description || ""}
                      onChange={(e) => {
                        const counter = document.getElementById('short-desc-counter');
                        if (counter) counter.textContent = `${e.target.value.length}/80`;
                      }}
                    />
                    <p id="short-desc-counter" className="text-xs text-muted-foreground text-right">
                      {editingListing?.short_description?.length || 0}/80
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Full Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      rows={4}
                      defaultValue={editingListing?.description || ""}
                    />
                  </div>

                  <AdminLogoUpload
                    currentLogoUrl={logoUrl}
                    onLogoChange={setLogoUrl}
                    listingId={editingListing?.id}
                  />
                </TabsContent>

                <TabsContent value="categories" forceMount className="space-y-4 mt-4 data-[state=inactive]:hidden">
                  <div className="space-y-2">
                    <Label>Assign Categories</Label>
                    <p className="text-sm text-muted-foreground">
                      Select one or more categories for this listing
                    </p>
                  </div>
                  <AdminCategorySelector
                    selectedIds={selectedCategoryIds}
                    onChange={(ids) => {
                      setSelectedCategoryIds(ids);
                      setCategoriesLoaded(true); // NEW: User changed categories, mark as loaded
                      // Clear primary category if it's no longer in the selected categories
                      if (primaryCategoryId && !ids.includes(primaryCategoryId)) {
                        setPrimaryCategoryId(null);
                      }
                    }}
                  />
                  
                  {/* Primary Category Selector - only for paid tiers */}
                  {currentTier !== "free" && selectedCategoryIds.length > 0 && (
                    <div className="space-y-2 pt-4 border-t">
                      <Label htmlFor="primary_category">Primary Category (used in page title for SEO)</Label>
                      <Select 
                        value={primaryCategoryId || "none"} 
                        onValueChange={(val) => setPrimaryCategoryId(val === "none" ? null : val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a primary category (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          {categories?.filter(cat => selectedCategoryIds.includes(cat.id)).map(cat => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Optional. The primary category will appear in the listing's page title for better SEO.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="contact" forceMount className="space-y-4 mt-4 data-[state=inactive]:hidden">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        defaultValue={editingListing?.website || ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        defaultValue={editingListing?.email || ""}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      defaultValue={editingListing?.phone || ""}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        defaultValue={editingListing?.country || ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="county">County</Label>
                      <Input
                        id="county"
                        name="county"
                        defaultValue={editingListing?.county || ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="town_city">Town/City</Label>
                      <Input
                        id="town_city"
                        name="town_city"
                        defaultValue={editingListing?.town_city || ""}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="postcode">Postcode</Label>
                      <Input
                        id="postcode"
                        name="postcode"
                        defaultValue={editingListing?.postcode || ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        defaultValue={editingListing?.address || ""}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="venue_type">Venue Type</Label>
                      <Select name="venue_type" defaultValue={editingListing?.venue_type || "none"}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select venue type" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                          <SelectItem value="none">None</SelectItem>
                          {Object.keys(VENUE_TYPE_SLUGS).map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input
                        id="capacity"
                        name="capacity"
                        type="number"
                        defaultValue={editingListing?.capacity || ""}
                        placeholder="e.g. 5000"
                      />
                    </div>
                  </div>

                  {/* Region Assignment */}
                  <div className="space-y-2">
                    <Label>Region</Label>
                    <Select 
                      value={selectedRegionId?.toString() || "none"} 
                      onValueChange={(val) => setSelectedRegionId(val === "none" ? null : parseInt(val))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No region assigned</SelectItem>
                        {regions?.map(region => (
                          <SelectItem key={region.id} value={region.id.toString()}>
                            {region.region_name} ({region.country})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Assign this listing to a geographic region for filtering purposes.
                    </p>
                  </div>

                  {/* Map Coordinates Section */}
                  <div className="border rounded-lg p-4 space-y-4 bg-muted/30">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <Label className="font-medium">Map Coordinates</Label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Coordinates are auto-generated from the address. Override manually if the location is incorrect.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="latitude">Latitude</Label>
                        <Input
                          id="latitude"
                          name="latitude"
                          type="number"
                          step="any"
                          placeholder="e.g., 51.5074"
                          defaultValue={editingListing?.latitude || ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="longitude">Longitude</Label>
                        <Input
                          id="longitude"
                          name="longitude"
                          type="number"
                          step="any"
                          placeholder="e.g., -0.1278"
                          defaultValue={editingListing?.longitude || ""}
                        />
                      </div>
                    </div>
                    
                    {editingListing?.coordinates_manual && (
                      <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 p-2 rounded">
                        <Info className="h-3 w-3" />
                        <span>Manual coordinates set — will not be auto-updated</span>
                      </div>
                    )}
                    
                    {editingListing?.geocoded_at && !editingListing?.coordinates_manual && (
                      <p className="text-xs text-muted-foreground">
                        Auto-geocoded: {new Date(editingListing.geocoded_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="social" forceMount className="space-y-4 mt-4 data-[state=inactive]:hidden">
                  <div className="space-y-2">
                    <Label htmlFor="facebook_url">Facebook URL</Label>
                    <Input
                      id="facebook_url"
                      name="facebook_url"
                      placeholder="https://facebook.com/yourpage"
                      defaultValue={editingListing?.facebook_url || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram_url">Instagram URL</Label>
                    <Input
                      id="instagram_url"
                      name="instagram_url"
                      placeholder="https://instagram.com/yourprofile"
                      defaultValue={editingListing?.instagram_url || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                    <Input
                      id="linkedin_url"
                      name="linkedin_url"
                      placeholder="https://linkedin.com/company/yourcompany"
                      defaultValue={editingListing?.linkedin_url || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter_url">Twitter/X URL</Label>
                    <Input
                      id="twitter_url"
                      name="twitter_url"
                      placeholder="https://twitter.com/yourhandle"
                      defaultValue={editingListing?.twitter_url || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="youtube_url">YouTube URL</Label>
                    <Input
                      id="youtube_url"
                      name="youtube_url"
                      placeholder="https://youtube.com/@yourchannel"
                      defaultValue={editingListing?.youtube_url || ""}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="details" forceMount className="space-y-4 mt-4 data-[state=inactive]:hidden">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="year_established">Year Established</Label>
                      <Input
                        id="year_established"
                        name="year_established"
                        type="number"
                        min="1800"
                        max={new Date().getFullYear()}
                        placeholder="e.g., 2005"
                        defaultValue={editingListing?.year_established || ""}
                      />
                    </div>
                  </div>
                </TabsContent>
              </form>

              {/* Contacts tab is OUTSIDE the form - uses its own mutations */}
              <TabsContent value="contacts" className="space-y-4 mt-4">
                {editingListing ? (
                  <AdminContactsManager 
                    listingId={editingListing.id}
                    showContacts={showContacts}
                    onShowContactsChange={setShowContacts}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Save the listing first to add contacts.
                  </p>
                )}
              </TabsContent>

              {/* Photos tab is OUTSIDE the form - uses its own mutations */}
              <TabsContent value="photos" className="space-y-4 mt-4">
                {editingListing ? (
                  <AdminPhotoManager listingId={editingListing.id} />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Save the listing first to add photos.
                  </p>
                )}
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="button"
                disabled={updateMutation.isPending || createMutation.isPending}
                onClick={(e) => {
                  console.log("Submit button clicked");
                  e.stopPropagation(); // Prevent event bubbling
                  const form = document.getElementById('listing-form') as HTMLFormElement;
                  if (form) {
                    console.log("Form found, calling requestSubmit");
                    form.requestSubmit();
                  } else {
                    console.error("Form not found!");
                  }
                }}
              >
                {updateMutation.isPending || createMutation.isPending ? "Saving..." : (editingListing ? "Update" : "Create")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 min-w-[250px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name, city, or country..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Select value={tierFilter} onValueChange={setTierFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All tiers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All tiers</SelectItem>
            <SelectItem value="premier">Premier</SelectItem>
            <SelectItem value="enhanced">Enhanced</SelectItem>
            <SelectItem value="free">Free</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setTierFilter("all");
              setStatusFilter("all");
            }}
          >
            <X className="h-4 w-4 mr-1" />
            Clear filters
          </Button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        {isLoading ? "Loading..." : `Showing ${listings?.length || 0} of ${totalCount} listings`}
      </p>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-muted animate-pulse rounded" />
          ))}
        </div>
      ) : (
        <>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No listings found{hasFilters ? " matching your filters" : ""}
                    </TableCell>
                  </TableRow>
                ) : (
                  listings?.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          {listing.logo_url && (
                            <img
                              src={listing.logo_url}
                              alt={listing.name}
                              className="h-8 w-8 rounded object-cover"
                            />
                          )}
                          {listing.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <TierBadge tier={listing.tier} />
                      </TableCell>
                      <TableCell>
                        {listing.town_city && listing.country
                          ? `${listing.town_city}, ${listing.country}`
                          : listing.country || listing.town_city || "—"}
                      </TableCell>
                      <TableCell>
                        {listing.region_id ? (
                          <span className={`text-sm ${getRegionName(listing.region_id) === "Unmatched" ? "text-amber-600" : ""}`}>
                            {getRegionName(listing.region_id) || "—"}
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => toggleActiveMutation.mutate({ id: listing.id, is_active: !listing.is_active })}
                          disabled={toggleActiveMutation.isPending}
                          title={listing.is_active ? "Click to deactivate" : "Click to activate"}
                        >
                          <Badge 
                            variant={listing.is_active ? "default" : "secondary"}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                          >
                            {listing.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </button>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(listing)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this listing?")) {
                                deleteMutation.mutate(listing.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Page {currentPage + 1} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage(p => p - 1)}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPage >= totalPages - 1}
                  onClick={() => setCurrentPage(p => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}