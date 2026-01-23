'use client';
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Loader2 } from "lucide-react";

interface AdminLogoUploadProps {
  currentLogoUrl: string | null;
  onLogoChange: (url: string | null) => void;
  listingId?: string;
}

export function AdminLogoUpload({ currentLogoUrl, onLogoChange, listingId }: AdminLogoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const processFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file type", description: "Please upload an image file", variant: "destructive" });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "File too large", description: "Logo must be under 2MB", variant: "destructive" });
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `logos/${listingId || "new"}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("listing-photos")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("listing-photos")
        .getPublicUrl(fileName);

      onLogoChange(publicUrl);
      toast({ title: "Logo uploaded successfully" });
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
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
    
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleRemove = () => {
    onLogoChange(null);
  };

  return (
    <div className="space-y-3">
      <Label>Company Logo</Label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex items-start gap-4 p-4 border-2 border-dashed rounded-lg transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25"
        }`}
      >
        {currentLogoUrl ? (
          <div className="relative">
            <img
              src={currentLogoUrl}
              alt="Logo preview"
              className="w-24 h-24 object-contain rounded-lg border bg-muted"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6"
              onClick={handleRemove}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="w-24 h-24 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/50">
            <Upload className="h-8 w-8 text-muted-foreground/50" />
          </div>
        )}
        <div className="flex-1 space-y-2">
          <input
            type="file"
            id="logo-upload"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => document.getElementById("logo-upload")?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                {currentLogoUrl ? "Replace Logo" : "Upload Logo"}
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground">
            Drag & drop or click to upload. 400x400px, PNG/JPG, max 2MB
          </p>
        </div>
      </div>
      <input type="hidden" name="logo_url" value={currentLogoUrl || ""} />
    </div>
  );
}
