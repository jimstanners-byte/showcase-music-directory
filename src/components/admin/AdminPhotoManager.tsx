'use client';
import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ListingPhoto } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useListingPhotos } from "@/hooks/useListingPhotos";
import { ImagePlus, Trash2, Loader2, Copy, Search } from "lucide-react";

interface AdminPhotoManagerProps {
  listingId: string;
}

export function AdminPhotoManager({ listingId }: AdminPhotoManagerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [copySearch, setCopySearch] = useState("");
  const [copyResults, setCopyResults] = useState<{ id: string; name: string }[]>([]);
  const [isCopying, setIsCopying] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: photos, isLoading } = useListingPhotos(listingId);

  // Debounced search for listings
  const handleCopySearch = (value: string) => {
    setCopySearch(value);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    
    if (value.trim().length < 2) {
      setCopyResults([]);
      return;
    }

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("id, name")
        .ilike("name", `%${value.trim()}%`)
        .neq("id", listingId)
        .limit(10);

      if (!error && data) {
        setCopyResults(data);
      }
      setIsSearching(false);
    }, 300);
  };

  // Copy photos from another listing
  const copyPhotosFrom = async (sourceListingId: string, sourceName: string) => {
    setIsCopying(true);
    try {
      // Fetch source photos
      const { data: sourcePhotos, error: fetchError } = await supabase
        .from("listing_photos")
        .select("*")
        .eq("listing_id", sourceListingId)
        .order("display_order", { ascending: true });

      if (fetchError) throw fetchError;
      if (!sourcePhotos || sourcePhotos.length === 0) {
        toast({ title: "No photos found", description: `${sourceName} has no photos to copy`, variant: "destructive" });
        setIsCopying(false);
        return;
      }

      // Get current max display order
      const maxOrder = photos?.reduce((max, p) => Math.max(max, p.display_order || 0), 0) || 0;

      // Insert photo records pointing to the same URLs
      for (let i = 0; i < sourcePhotos.length; i++) {
        const sp = sourcePhotos[i];
        const { error: insertError } = await supabase
          .from("listing_photos")
          .insert({
            id: crypto.randomUUID(),
            listing_id: listingId,
            photo_url: sp.photo_url,
            caption: sp.caption,
            display_order: maxOrder + i + 1,
            is_hero: false,
          });
        if (insertError) throw insertError;
      }

      queryClient.invalidateQueries({ queryKey: ["listing-photos", listingId] });
      toast({ title: `Copied ${sourcePhotos.length} photo(s) from ${sourceName}` });
      setCopySearch("");
      setCopyResults([]);
    } catch (error: any) {
      toast({ title: "Error copying photos", description: error.message, variant: "destructive" });
    }
    setIsCopying(false);
  };

  const uploadPhotoMutation = useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split(".").pop();
      const fileName = `${listingId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("listing-photos")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("listing-photos")
        .getPublicUrl(fileName);

      // Get max display order
      const maxOrder = photos?.reduce((max, p) => Math.max(max, p.display_order || 0), 0) || 0;

      const { error: insertError } = await supabase
        .from("listing_photos")
        .insert({
          id: crypto.randomUUID(),
          listing_id: listingId,
          photo_url: publicUrl,
          display_order: maxOrder + 1,
          is_hero: false,
        });

      if (insertError) throw insertError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listing-photos", listingId] });
      toast({ title: "Photo uploaded successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error uploading photo", description: error.message, variant: "destructive" });
    },
  });

  const updatePhotoMutation = useMutation({
    mutationFn: async ({ photoId, updates }: { photoId: string; updates: Partial<ListingPhoto> }) => {
      const { error } = await supabase
        .from("listing_photos")
        .update(updates)
        .eq("id", photoId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listing-photos", listingId] });
    },
    onError: (error: any) => {
      toast({ title: "Error updating photo", description: error.message, variant: "destructive" });
    },
  });

  const deletePhotoMutation = useMutation({
    mutationFn: async (photo: ListingPhoto) => {
      // Delete from storage
      const urlParts = photo.photo_url.split("/");
      const fileName = urlParts.slice(-2).join("/");
      
      await supabase.storage.from("listing-photos").remove([fileName]);

      // Delete from database
      const { error } = await supabase
        .from("listing_photos")
        .delete()
        .eq("id", photo.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listing-photos", listingId] });
      toast({ title: "Photo deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error deleting photo", description: error.message, variant: "destructive" });
    },
  });

  const processFiles = async (files: FileList | File[]) => {
    setIsUploading(true);

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) {
        toast({ title: "Invalid file type", description: "Please select an image file", variant: "destructive" });
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File too large", description: "Please select an image under 5MB", variant: "destructive" });
        continue;
      }
      await uploadPhotoMutation.mutateAsync(file);
    }

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    processFiles(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFiles(files);
    }
  };

  const handleCaptionChange = async (photoId: string, caption: string) => {
    await updatePhotoMutation.mutateAsync({
      photoId,
      updates: { caption: caption || null },
    });
  };

  const handleDelete = (photo: ListingPhoto) => {
    if (confirm("Are you sure you want to delete this photo?")) {
      deletePhotoMutation.mutate(photo);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upload Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        {isUploading ? (
          <>
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Uploading...</span>
          </>
        ) : (
          <>
            <ImagePlus className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Drag & drop images here or click to browse
            </span>
            <span className="text-xs text-muted-foreground">
              Max 5MB per image. JPG, PNG, WebP supported.
            </span>
          </>
        )}
      </div>

      {/* Copy Photos From Another Listing */}
      <div className="space-y-2 p-4 border rounded-lg bg-muted/30">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Copy className="h-4 w-4" />
          Copy Photos From Another Listing
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search listing by name..."
            value={copySearch}
            onChange={(e) => handleCopySearch(e.target.value)}
            className="pl-9"
            disabled={isCopying}
          />
        </div>
        {isSearching && (
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Loader2 className="h-3 w-3 animate-spin" /> Searching...
          </div>
        )}
        {copyResults.length > 0 && (
          <div className="border rounded-md divide-y max-h-48 overflow-y-auto">
            {copyResults.map((result) => (
              <div key={result.id} className="flex items-center justify-between p-2 hover:bg-muted/50">
                <span className="text-sm truncate">{result.name}</span>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => copyPhotosFrom(result.id, result.name)}
                  disabled={isCopying}
                >
                  {isCopying ? <Loader2 className="h-3 w-3 animate-spin" /> : <Copy className="h-3 w-3 mr-1" />}
                  Copy
                </Button>
              </div>
            ))}
          </div>
        )}
        {copySearch.length >= 2 && !isSearching && copyResults.length === 0 && (
          <p className="text-sm text-muted-foreground">No listings found</p>
        )}
      </div>

      {/* Gallery Photos */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Photos</Label>
        <p className="text-sm text-muted-foreground">
          These photos appear in the photo gallery section of the listing profile.
        </p>
        
        {photos && photos.length === 0 ? (
          <div className="border-2 border-dashed rounded-lg p-8 text-center bg-muted/50">
            <ImagePlus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No photos uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos?.map((photo) => (
              <div
                key={photo.id}
                className="relative group rounded-lg overflow-hidden border border-border"
              >
                <div className="aspect-square">
                  <img
                    src={photo.photo_url}
                    alt={photo.caption || "Listing photo"}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Hover actions */}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(photo)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>

                {/* Caption input */}
                <div className="p-2 bg-background">
                  <Input
                    type="text"
                    placeholder="Add caption..."
                    defaultValue={photo.caption || ""}
                    onBlur={(e) => {
                      if (e.target.value !== (photo.caption || "")) {
                        handleCaptionChange(photo.id, e.target.value);
                      }
                    }}
                    className="text-xs h-7"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}