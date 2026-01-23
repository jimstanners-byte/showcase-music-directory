'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useMemo } from 'react';
import {
  useResources,
  useCreateResource,
  useUpdateResource,
  useDeleteResource,
  useBulkUpdateResourceStatus,
  useBulkDeleteResources,
  Resource,
  ResourceInsert,
} from '@/hooks/useResources';
import { useListings } from '@/hooks/useListings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AdminResourceImageUpload } from '@/components/admin/AdminResourceImageUpload';
import { toast } from 'sonner';
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Search,
  Upload,
  Eye,
  ExternalLink,
  FileText,
  CheckCircle,
  XCircle,
  ChevronsUpDown,
  X,
  Building2,
} from 'lucide-react';
import type { Json } from '@/integrations/supabase/types';
import { cn } from '@/lib/utils';

export default function AdminResources() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: resources, isLoading } = useResources(statusFilter);
  const { data: listings } = useListings({});
  
  const createMutation = useCreateResource();
  const updateMutation = useUpdateResource();
  const deleteMutation = useDeleteResource();
  const bulkStatusMutation = useBulkUpdateResourceStatus();
  const bulkDeleteMutation = useBulkDeleteResources();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [listingComboOpen, setListingComboOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<Partial<ResourceInsert & { listing_id?: string | null }>>({});
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  // CSV Import state
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [csvData, setCsvData] = useState<ResourceInsert[]>([]);
  const [importMode, setImportMode] = useState<'skip' | 'update'>('skip');
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Create a map for quick listing lookup by ID
  const listingsMap = useMemo(() => {
    const map = new Map<string, { name: string; slug: string }>();
    listings?.forEach(l => map.set(l.id, { name: l.name, slug: l.slug }));
    return map;
  }, [listings]);

  // Filter resources by search
  const filteredResources = resources?.filter(r => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      r.article_title.toLowerCase().includes(query) ||
      r.keyword?.toLowerCase().includes(query) ||
      r.slug.toLowerCase().includes(query)
    );
  });

  const resetForm = () => {
    setEditingResource(null);
    setFormData({});
    setImageUrl(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (resource: Resource) => {
    setEditingResource(resource);
    setFormData({
      keyword: resource.keyword,
      slug: resource.slug,
      article_title: resource.article_title,
      content: resource.content,
      image_alt: resource.image_alt,
      word_count: resource.word_count,
      internal_links: resource.internal_links,
      meta_title: resource.meta_title,
      meta_description: resource.meta_description,
      meta_keywords: resource.meta_keywords,
      og_title: resource.og_title,
      og_description: resource.og_description,
      h1: resource.h1,
      h2s: resource.h2s,
      schema_markup: resource.schema_markup,
      local_focus: resource.local_focus,
      search_intent: resource.search_intent,
      status: resource.status,
      published_at: resource.published_at,
      listing_id: resource.listing_id,
    });
    setImageUrl(resource.image_url);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.slug || !formData.article_title) {
      toast.error('Slug and Article Title are required');
      return;
    }

    const resourceData = {
      ...formData,
      slug: formData.slug,
      article_title: formData.article_title,
      image_url: imageUrl,
      listing_id: formData.listing_id || null,
      published_at: formData.status === 'published' && !formData.published_at 
        ? new Date().toISOString() 
        : formData.published_at,
    } as ResourceInsert;

    try {
      if (editingResource) {
        await updateMutation.mutateAsync({ id: editingResource.id, ...resourceData });
        toast.success('Resource updated');
      } else {
        await createMutation.mutateAsync(resourceData);
        toast.success('Resource created');
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Failed to save resource');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      try {
        await deleteMutation.mutateAsync(id);
        toast.success('Resource deleted');
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredResources?.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredResources?.map(r => r.id) || []);
    }
  };

  const handleBulkPublish = async () => {
    if (selectedIds.length === 0) return;
    try {
      await bulkStatusMutation.mutateAsync({ ids: selectedIds, status: 'published' });
      toast.success(`${selectedIds.length} resources published`);
      setSelectedIds([]);
    } catch (error) {
      toast.error('Failed to publish');
    }
  };

  const handleBulkUnpublish = async () => {
    if (selectedIds.length === 0) return;
    try {
      await bulkStatusMutation.mutateAsync({ ids: selectedIds, status: 'draft' });
      toast.success(`${selectedIds.length} resources unpublished`);
      setSelectedIds([]);
    } catch (error) {
      toast.error('Failed to unpublish');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (confirm(`Delete ${selectedIds.length} resources?`)) {
      try {
        await bulkDeleteMutation.mutateAsync(selectedIds);
        toast.success(`${selectedIds.length} resources deleted`);
        setSelectedIds([]);
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  // CSV Import functions
  const parseCSV = (text: string): ResourceInsert[] => {
    // Parse CSV properly handling multi-line quoted fields
    const parseCSVRows = (csvText: string): string[][] => {
      const rows: string[][] = [];
      let currentRow: string[] = [];
      let currentField = '';
      let inQuotes = false;
      
      for (let i = 0; i < csvText.length; i++) {
        const char = csvText[i];
        const nextChar = csvText[i + 1];
        
        if (inQuotes) {
          if (char === '"') {
            if (nextChar === '"') {
              // Escaped quote
              currentField += '"';
              i++; // Skip next quote
            } else {
              // End of quoted field
              inQuotes = false;
            }
          } else {
            currentField += char;
          }
        } else {
          if (char === '"') {
            inQuotes = true;
          } else if (char === ',') {
            currentRow.push(currentField.trim());
            currentField = '';
          } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
            currentRow.push(currentField.trim());
            if (currentRow.some(f => f !== '')) {
              rows.push(currentRow);
            }
            currentRow = [];
            currentField = '';
            if (char === '\r') i++; // Skip \n in \r\n
          } else if (char !== '\r') {
            currentField += char;
          }
        }
      }
      
      // Push last field and row
      currentRow.push(currentField.trim());
      if (currentRow.some(f => f !== '')) {
        rows.push(currentRow);
      }
      
      return rows;
    };

    const rows = parseCSVRows(text);
    if (rows.length < 2) return [];
    
    const headers = rows[0].map(h => h.replace(/^"|"$/g, ''));
    
    const columnMap: Record<string, keyof ResourceInsert> = {
      'keyword': 'keyword',
      'suggestedUrl': 'slug',
      'article_title': 'article_title',
      'content': 'content',
      'image_alt': 'image_alt',
      'word_count': 'word_count',
      'internal_links': 'internal_links',
      'meta_title': 'meta_title',
      'meta_description': 'meta_description',
      'meta_keywords': 'meta_keywords',
      'og_title': 'og_title',
      'og_description': 'og_description',
      'h1': 'h1',
      'h2s': 'h2s',
      'schema_markup': 'schema_markup',
      'localFocus': 'local_focus',
      'intent': 'search_intent',
    };

    const results: ResourceInsert[] = [];

    for (let i = 1; i < rows.length; i++) {
      const values = rows[i];

      const resource: Partial<ResourceInsert> = {
        status: 'draft',
      };

      headers.forEach((header, idx) => {
        const dbField = columnMap[header];
        if (dbField && values[idx]) {
          let value: string | number | Json = values[idx].replace(/^"|"$/g, '');
          
          // Parse JSON fields
          if (['internal_links', 'h2s', 'schema_markup'].includes(dbField)) {
            try {
              value = JSON.parse(value) as Json;
            } catch {
              value = dbField === 'h2s' ? [] : (dbField === 'internal_links' ? [] : null);
            }
          }
          
          // Parse number fields
          if (dbField === 'word_count') {
            value = parseInt(value as string, 10) || null;
          }

          (resource as Record<string, unknown>)[dbField] = value;
        }
      });

      if (resource.slug && resource.article_title) {
        results.push(resource as ResourceInsert);
      }
    }

    return results;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const parsed = parseCSV(text);
      setCsvData(parsed);
      setIsImportDialogOpen(true);
    };
    reader.readAsText(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImport = async () => {
    if (csvData.length === 0) return;
    setIsImporting(true);

    const existingSlugs = new Set(resources?.map(r => r.slug) || []);
    let created = 0;
    let updated = 0;
    let skipped = 0;
    let errors = 0;

    for (const resource of csvData) {
      try {
        if (existingSlugs.has(resource.slug)) {
          if (importMode === 'update') {
            const existing = resources?.find(r => r.slug === resource.slug);
            if (existing) {
              await updateMutation.mutateAsync({ id: existing.id, ...resource });
              updated++;
            }
          } else {
            skipped++;
          }
        } else {
          await createMutation.mutateAsync(resource);
          created++;
        }
      } catch (error) {
        console.error('Import error:', error);
        errors++;
      }
    }

    toast.success(`Import complete: ${created} created, ${updated} updated, ${skipped} skipped, ${errors} errors`);
    setIsImportDialogOpen(false);
    setCsvData([]);
    setIsImporting(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Resources</h1>
          <p className="text-muted-foreground">Manage SEO content articles</p>
        </div>
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
          <Button onClick={openCreateDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Add Resource
          </Button>
        </div>
      </div>
      {/* Filters and Search */}
      <div className="flex flex-wrap gap-4 items-center">
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {selectedIds.length > 0 && (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleBulkPublish}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Publish ({selectedIds.length})
            </Button>
            <Button size="sm" variant="outline" onClick={handleBulkUnpublish}>
              <XCircle className="h-4 w-4 mr-1" />
              Unpublish ({selectedIds.length})
            </Button>
            <Button size="sm" variant="destructive" onClick={handleBulkDelete}>
              <Trash2 className="h-4 w-4 mr-1" />
              Delete ({selectedIds.length})
            </Button>
          </div>
        )}
      </div>
      {/* Table */}
      {filteredResources?.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/50">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No resources found</p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedIds.length === filteredResources?.length && filteredResources.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Keyword</TableHead>
                <TableHead>Linked Listing</TableHead>
                <TableHead>URL Path</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Words</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResources?.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(resource.id)}
                      onCheckedChange={() => toggleSelect(resource.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium max-w-[200px] truncate">
                    {resource.article_title}
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-[150px] truncate">
                    {resource.keyword || '-'}
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-[150px] truncate">
                    {(() => {
                      const listingInfo = resource.listing_id ? listingsMap.get(resource.listing_id) : null;
                      return listingInfo ? (
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {listingInfo.name}
                        </span>
                      ) : '-';
                    })()}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">
                    /{resource.slug}
                  </TableCell>
                  <TableCell>
                    <Badge variant={resource.status === 'published' ? 'default' : 'secondary'}>
                      {resource.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {resource.word_count?.toLocaleString() || '-'}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {resource.published_at 
                      ? new Date(resource.published_at).toLocaleDateString()
                      : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push(`/${resource.slug}`)}
                        title="Preview in app"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {resource.status === 'published' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => window.open(`/${resource.slug}`, '_blank')}
                          title="View public page"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(resource)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(resource.id)}
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
      )}
      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{editingResource ? 'Edit Resource' : 'Add Resource'}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[calc(90vh-100px)]">
            <form onSubmit={handleSubmit} className="space-y-4 pr-4">
              <Tabs defaultValue="content">
                <TabsList className="mb-4">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                  <TabsTrigger value="image">Image</TabsTrigger>
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                  <TabsTrigger value="status">Status</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Keyword</Label>
                      <Input
                        value={formData.keyword || ''}
                        onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                        placeholder="Target keyword"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Slug (URL Path) *</Label>
                      <Input
                        value={formData.slug || ''}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="category/article-name"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Linked Listing (optional)</Label>
                    <Popover open={listingComboOpen} onOpenChange={setListingComboOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={listingComboOpen}
                          className="w-full justify-between"
                        >
                          {formData.listing_id
                            ? listingsMap.get(formData.listing_id)?.name || 'Select listing...'
                            : 'Select listing...'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[400px] p-0">
                        <Command>
                          <CommandInput placeholder="Search listings..." />
                          <CommandList>
                            <CommandEmpty>No listing found.</CommandEmpty>
                            <CommandGroup>
                              {listings?.map((listing) => (
                                <CommandItem
                                  key={listing.id}
                                  value={listing.name}
                                  onSelect={() => {
                                    setFormData({
                                      ...formData,
                                      listing_id: formData.listing_id === listing.id ? null : listing.id,
                                    });
                                    setListingComboOpen(false);
                                  }}
                                >
                                  <span className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.listing_id === listing.id ? "opacity-100" : "opacity-0"
                                  )}>✓</span>
                                  {listing.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {formData.listing_id && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setFormData({ ...formData, listing_id: null })}
                        className="text-xs text-muted-foreground"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Clear selection
                      </Button>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Link this article to a listing for listing/{'{slug}'}/article-name URLs
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Article Title *</Label>
                    <Input
                      value={formData.article_title || ''}
                      onChange={(e) => setFormData({ ...formData, article_title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>H1 Heading</Label>
                    <Input
                      value={formData.h1 || ''}
                      onChange={(e) => setFormData({ ...formData, h1: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Content (HTML)</Label>
                    <Textarea
                      value={formData.content || ''}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={10}
                      placeholder="<p>Your content here...</p>"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>H2 Headings (JSON array)</Label>
                    <Textarea
                      value={typeof formData.h2s === 'string' ? formData.h2s : JSON.stringify(formData.h2s || [], null, 2)}
                      onChange={(e) => {
                        try {
                          setFormData({ ...formData, h2s: JSON.parse(e.target.value) });
                        } catch {
                          setFormData({ ...formData, h2s: e.target.value as unknown as Json });
                        }
                      }}
                      rows={3}
                      placeholder='["Heading 1", "Heading 2"]'
                    />
                  </div>
                </TabsContent>

                <TabsContent value="seo" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Meta Title</Label>
                    <Input
                      value={formData.meta_title || ''}
                      onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                      placeholder="Page title for search engines"
                    />
                    <p className="text-xs text-muted-foreground">
                      {(formData.meta_title || '').length}/60 characters
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Meta Description</Label>
                    <Textarea
                      value={formData.meta_description || ''}
                      onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                      {(formData.meta_description || '').length}/160 characters
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Meta Keywords</Label>
                    <Input
                      value={formData.meta_keywords || ''}
                      onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>OG Title (Social)</Label>
                    <Input
                      value={formData.og_title || ''}
                      onChange={(e) => setFormData({ ...formData, og_title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>OG Description (Social)</Label>
                    <Textarea
                      value={formData.og_description || ''}
                      onChange={(e) => setFormData({ ...formData, og_description: e.target.value })}
                      rows={2}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="image" className="space-y-4">
                  <AdminResourceImageUpload
                    currentImageUrl={imageUrl}
                    onImageChange={setImageUrl}
                  />
                  <div className="space-y-2">
                    <Label>Image Alt Text</Label>
                    <Input
                      value={formData.image_alt || ''}
                      onChange={(e) => setFormData({ ...formData, image_alt: e.target.value })}
                      placeholder="Descriptive alt text for the image"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="technical" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Word Count</Label>
                      <Input
                        type="number"
                        value={formData.word_count || ''}
                        onChange={(e) => setFormData({ ...formData, word_count: parseInt(e.target.value) || null })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Local Focus</Label>
                      <Input
                        value={formData.local_focus || ''}
                        onChange={(e) => setFormData({ ...formData, local_focus: e.target.value })}
                        placeholder="e.g., UK, London"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Search Intent</Label>
                    <Select
                      value={formData.search_intent || ''}
                      onValueChange={(v) => setFormData({ ...formData, search_intent: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select intent" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="informational">Informational</SelectItem>
                        <SelectItem value="transactional">Transactional</SelectItem>
                        <SelectItem value="navigational">Navigational</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Internal Links (JSON)</Label>
                    <Textarea
                      value={typeof formData.internal_links === 'string' ? formData.internal_links : JSON.stringify(formData.internal_links || [], null, 2)}
                      onChange={(e) => {
                        try {
                          setFormData({ ...formData, internal_links: JSON.parse(e.target.value) });
                        } catch {
                          setFormData({ ...formData, internal_links: e.target.value as unknown as Json });
                        }
                      }}
                      rows={4}
                      placeholder='[{"text": "Link text", "url": "/categories/example"}]'
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Schema Markup (JSON-LD)</Label>
                    <Textarea
                      value={typeof formData.schema_markup === 'string' ? formData.schema_markup : JSON.stringify(formData.schema_markup || {}, null, 2)}
                      onChange={(e) => {
                        try {
                          setFormData({ ...formData, schema_markup: JSON.parse(e.target.value) });
                        } catch {
                          setFormData({ ...formData, schema_markup: e.target.value as unknown as Json });
                        }
                      }}
                      rows={6}
                      placeholder='{"@context": "https://schema.org", "@type": "Article"}'
                    />
                  </div>
                </TabsContent>

                <TabsContent value="status" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={formData.status || 'draft'}
                      onValueChange={(v) => setFormData({ ...formData, status: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Published Date</Label>
                    <Input
                      type="datetime-local"
                      value={formData.published_at?.slice(0, 16) || ''}
                      onChange={(e) => setFormData({ ...formData, published_at: e.target.value ? new Date(e.target.value).toISOString() : null })}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={createMutation.isPending || updateMutation.isPending}>
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  {editingResource ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      {/* CSV Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Import CSV Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Found {csvData.length} resources to import
            </p>
            
            <div className="space-y-2">
              <Label>Duplicate Handling</Label>
              <Select value={importMode} onValueChange={(v) => setImportMode(v as 'skip' | 'update')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="skip">Skip existing (keep current)</SelectItem>
                  <SelectItem value="update">Update existing (overwrite)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ScrollArea className="h-64 border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {csvData.slice(0, 50).map((resource, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="truncate max-w-[200px]">{resource.article_title}</TableCell>
                      <TableCell className="truncate max-w-[200px] text-xs">{resource.slug}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{resource.status || 'draft'}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {csvData.length > 50 && (
                <p className="text-center text-sm text-muted-foreground py-2">
                  ... and {csvData.length - 50} more
                </p>
              )}
            </ScrollArea>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsImportDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleImport} className="flex-1" disabled={isImporting}>
                {isImporting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Import {csvData.length} Resources
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
