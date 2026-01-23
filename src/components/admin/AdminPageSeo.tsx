'use client';

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAllPageSeo } from "@/hooks/usePageSeo";
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
import { Plus, Pencil, Trash2 } from "lucide-react";

const PAGE_SLUGS = [
  { value: "home", label: "Home" },
  { value: "directory", label: "Directory" },
  { value: "categories", label: "Categories" },
  { value: "about", label: "About" },
  { value: "contact", label: "Contact" },
  { value: "promote", label: "Promote" },
  { value: "get-listed", label: "Get Listed" },
];

const AdminPageSeo = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: pageSeoRecords, isLoading } = useAllPageSeo();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const createMutation = useMutation({
    mutationFn: async (record: {
      page_key: string;
      title: string | null;
      meta_description: string | null;
      meta_keywords: string | null;
    }) => {
      const { error } = await supabase
        .from("page_content")
        .insert([{ ...record, is_active: true }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page-seo-all"] });
      toast({ title: "Page SEO record created" });
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
      page_key: string;
      title: string | null;
      meta_description: string | null;
      meta_keywords: string | null;
    }) => {
      const { id, ...data } = record;
      const { error } = await supabase
        .from("page_content")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page-seo-all"] });
      toast({ title: "Page SEO record updated" });
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
        .from("page_content")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page-seo-all"] });
      toast({ title: "Page SEO record deleted" });
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
    
    const record = {
      page_key: formData.get("page_key") as string,
      title: (formData.get("title") as string)?.trim() || null,
      meta_description: (formData.get("meta_description") as string)?.trim() || null,
      meta_keywords: (formData.get("meta_keywords") as string)?.trim() || null,
    };

    if (editingRecord) {
      updateMutation.mutate({ id: editingRecord.id, ...record });
    } else {
      createMutation.mutate(record);
    }
  };

  // Get used page slugs to prevent duplicates
  const usedSlugs = pageSeoRecords?.map(r => r.page_key) || [];
  const availableSlugs = PAGE_SLUGS.filter(
    s => !usedSlugs.includes(s.value) || editingRecord?.page_key === s.value
  );

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Page SEO</h1>
          <p className="text-muted-foreground">
            Manage SEO content for static pages
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => setEditingRecord(null)}
              disabled={availableSlugs.length === 0 && !editingRecord}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Page SEO
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingRecord ? "Edit Page SEO" : "Add Page SEO"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="page_key">Page *</Label>
                <Select 
                  name="page_key" 
                  defaultValue={editingRecord?.page_key}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select page" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSlugs.map(slug => (
                      <SelectItem key={slug.value} value={slug.value}>
                        {slug.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">SEO Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  defaultValue={editingRecord?.title || ""}
                  placeholder="Page title for search engines..."
                />
                <p className="text-xs text-muted-foreground">
                  Leave empty to use the default title
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea 
                  id="meta_description" 
                  name="meta_description" 
                  defaultValue={editingRecord?.meta_description || ""}
                  placeholder="SEO meta description for this page..."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: 150-160 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_keywords">Meta Keywords</Label>
                <Input 
                  id="meta_keywords" 
                  name="meta_keywords" 
                  defaultValue={editingRecord?.meta_keywords || ""}
                  placeholder="keyword1, keyword2, keyword3"
                />
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

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page</TableHead>
              <TableHead>SEO Title</TableHead>
              <TableHead>Meta Description</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageSeoRecords && pageSeoRecords.length > 0 ? (
              pageSeoRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">
                    {PAGE_SLUGS.find(s => s.value === record.page_key)?.label || record.page_key}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {record.title || <span className="text-muted-foreground italic">Using default</span>}
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {record.meta_description || <span className="text-muted-foreground italic">Using default</span>}
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
                          if (confirm("Delete this page SEO record?")) {
                            deleteMutation.mutate(record.id);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  No page SEO records yet. Click "Add Page SEO" to create one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <h3 className="font-medium mb-2">Default Fallbacks</h3>
        <p className="text-sm text-muted-foreground">
          If no custom SEO content is set for a page, the following defaults are used:
        </p>
        <ul className="text-sm text-muted-foreground mt-2 space-y-1">
          <li><strong>Home:</strong> Showcase Music Directory | The Music Production Industry Resource</li>
          <li><strong>Directory:</strong> A-Z Directory | Showcase Music Directory</li>
          <li><strong>Categories:</strong> Browse Categories | Showcase Music Directory</li>
          <li><strong>About:</strong> About Us | Showcase Music Directory</li>
          <li><strong>Contact:</strong> Contact Us | Showcase Music Directory</li>
          <li><strong>Promote:</strong> Promote Your Business | Showcase Music Directory</li>
          <li><strong>Get Listed:</strong> Get Listed | Showcase Music Directory</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPageSeo;
