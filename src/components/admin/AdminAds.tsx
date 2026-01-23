'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAds, useCreateAd, useUpdateAd, useDeleteAd, Ad } from '@/hooks/useAds';
import { useCategories } from '@/hooks/useCategories';
import { useCategoryCountries } from '@/hooks/useCategoryCountries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { AdminAdUpload } from '@/components/admin/AdminAdUpload';
import { AdminCategorySelector } from '@/components/admin/AdminCategorySelector';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2, ExternalLink, Globe, Folder, FileText, ChevronDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const POSITIONS = [
  { value: 'sponsor-logo', label: 'Sponsor Logo (Header - 192×56)' },
  { value: 'featured', label: 'Featured Advertiser (120×240)' },
];

const PAGE_OPTIONS = [
  { value: 'home', label: 'Homepage' },
  { value: 'a-z-listing', label: 'A-Z Listing' },
  { value: 'parent:live-event-services', label: 'Live Event Services' },
  { value: 'parent:the-business', label: 'The Business' },
  { value: 'parent:venues', label: 'Venues' },
  { value: 'parent:equipment', label: 'Equipment' },
  { value: 'parent:studios', label: 'Studios' },
  { value: 'parent:uk-recording-services', label: 'UK Recording' },
];

export default function AdminAds() {
  const { data: ads, isLoading } = useAds();
  const { data: categories } = useCategories();
  const createMutation = useCreateAd();
  const updateMutation = useUpdateAd();
  const deleteMutation = useDeleteAd();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [targetingOpen, setTargetingOpen] = useState(false);
  const [countriesPopoverOpen, setCountriesPopoverOpen] = useState(false);

  // Fetch available countries based on selected categories
  const { data: availableCountries, isLoading: countriesLoading } = useCategoryCountries(selectedCategoryIds);

  // Build targeting summary for collapsed state
  const targetingSummary = useMemo(() => {
    const parts: string[] = [];
    
    if (selectedCategoryIds.length > 0) {
      const catNames = categories?.filter(c => selectedCategoryIds.includes(c.id)).map(c => c.name) || [];
      if (catNames.length <= 2) {
        parts.push(catNames.join(' & '));
      } else {
        parts.push(`${catNames.length} categories`);
      }
    }
    
    if (selectedCountries.length > 0) {
      if (selectedCountries.length <= 2) {
        parts.push(selectedCountries.join(' & '));
      } else {
        parts.push(`${selectedCountries.length} countries`);
      }
    }
    
    if (selectedPages.length > 0) {
      const pageLabels = selectedPages.map(p => PAGE_OPTIONS.find(o => o.value === p)?.label || p);
      if (pageLabels.length <= 2) {
        parts.push(pageLabels.join(', '));
      } else {
        parts.push(`${pageLabels.length} pages`);
      }
    }
    
    return parts.length > 0 ? parts.join(' + ') : 'Site-wide';
  }, [selectedCategoryIds, selectedCountries, selectedPages, categories]);

  // Reset form state when dialog opens/closes
  useEffect(() => {
    if (isDialogOpen && editingAd) {
      setSelectedCategoryIds(editingAd.target_category_ids || []);
      setSelectedCountries(editingAd.target_countries || []);
      setSelectedPages(editingAd.target_pages || []);
      setImageUrl(editingAd.image_url);
    }
  }, [isDialogOpen, editingAd]);

  // Clear countries that are no longer available when categories change
  useEffect(() => {
    if (availableCountries && selectedCountries.length > 0) {
      const validCountries = selectedCountries.filter(c => availableCountries.includes(c));
      if (validCountries.length !== selectedCountries.length) {
        setSelectedCountries(validCountries);
      }
    }
  }, [availableCountries, selectedCountries]);

  const toggleCountry = (country: string) => {
    setSelectedCountries(prev => 
      prev.includes(country) 
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const togglePage = (page: string) => {
    setSelectedPages(prev => 
      prev.includes(page) 
        ? prev.filter(p => p !== page)
        : [...prev, page]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!imageUrl) {
      toast.error('Please upload an image');
      return;
    }

    const adData = {
      name: formData.get('name') as string,
      position: formData.get('position') as Ad['position'],
      image_url: imageUrl,
      link_url: (formData.get('link_url') as string) || null,
      alt_text: (formData.get('alt_text') as string) || null,
      is_active: formData.get('is_active') === 'on',
      start_date: (formData.get('start_date') as string) || null,
      end_date: (formData.get('end_date') as string) || null,
      target_category_ids: selectedCategoryIds,
      target_countries: selectedCountries,
      target_pages: selectedPages,
      rotation_interval: 6,
    };

    try {
      if (editingAd) {
        await updateMutation.mutateAsync({ id: editingAd.id, ...adData });
        toast.success('Ad updated successfully');
      } else {
        await createMutation.mutateAsync(adData);
        toast.success('Ad created successfully');
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Failed to save ad');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this ad?')) {
      try {
        await deleteMutation.mutateAsync(id);
        toast.success('Ad deleted successfully');
      } catch (error) {
        toast.error('Failed to delete ad');
      }
    }
  };

  const openEditDialog = (ad: Ad) => {
    setEditingAd(ad);
    setImageUrl(ad.image_url);
    setSelectedCategoryIds(ad.target_category_ids || []);
    setSelectedCountries(ad.target_countries || []);
    setSelectedPages(ad.target_pages || []);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingAd(null);
    setImageUrl(null);
    setSelectedCategoryIds([]);
    setSelectedCountries([]);
    setSelectedPages([]);
    setTargetingOpen(false);
    setCountriesPopoverOpen(false);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const getStatusBadge = (ad: Ad) => {
    if (!ad.is_active) {
      return <Badge variant="secondary">Inactive</Badge>;
    }
    const now = new Date();
    const start = ad.start_date ? new Date(ad.start_date) : null;
    const end = ad.end_date ? new Date(ad.end_date) : null;

    if (start && start > now) {
      return <Badge variant="outline">Scheduled</Badge>;
    }
    if (end && end < now) {
      return <Badge variant="secondary">Expired</Badge>;
    }
    return <Badge className="bg-green-600">Active</Badge>;
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories?.find(c => c.id === categoryId);
    return category?.name || null;
  };

  const getTargetingBadges = (ad: Ad) => {
    const badges = [];
    
    // Show category badges
    if (ad.target_category_ids && ad.target_category_ids.length > 0) {
      if (ad.target_category_ids.length <= 2) {
        ad.target_category_ids.forEach((catId, idx) => {
          const categoryName = getCategoryName(catId);
          if (categoryName) {
            badges.push(
              <Badge key={`cat-${idx}`} variant="outline" className="text-xs gap-1">
                <Folder className="h-3 w-3" />
                {categoryName}
              </Badge>
            );
          }
        });
      } else {
        badges.push(
          <Badge key="categories" variant="outline" className="text-xs gap-1">
            <Folder className="h-3 w-3" />
            {ad.target_category_ids.length} categories
          </Badge>
        );
      }
    }
    
    // Show country badges
    if (ad.target_countries && ad.target_countries.length > 0) {
      if (ad.target_countries.length <= 2) {
        ad.target_countries.forEach((country, idx) => {
          badges.push(
            <Badge key={`country-${idx}`} variant="outline" className="text-xs gap-1">
              <Globe className="h-3 w-3" />
              {country}
            </Badge>
          );
        });
      } else {
        badges.push(
          <Badge key="countries" variant="outline" className="text-xs gap-1">
            <Globe className="h-3 w-3" />
            {ad.target_countries.length} countries
          </Badge>
        );
      }
    }
    
    // Show page badges
    if (ad.target_pages && ad.target_pages.length > 0) {
      if (ad.target_pages.length <= 2) {
        ad.target_pages.forEach((page, idx) => {
          const pageLabel = PAGE_OPTIONS.find(p => p.value === page)?.label || page;
          badges.push(
            <Badge key={`page-${idx}`} variant="outline" className="text-xs gap-1">
              <FileText className="h-3 w-3" />
              {pageLabel}
            </Badge>
          );
        });
      } else {
        badges.push(
          <Badge key="pages" variant="outline" className="text-xs gap-1">
            <FileText className="h-3 w-3" />
            {ad.target_pages.length} pages
          </Badge>
        );
      }
    }
    
    if (badges.length === 0) {
      return <span className="text-xs text-muted-foreground">Site-wide</span>;
    }
    
    return <div className="flex flex-wrap gap-1">{badges}</div>;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Advertisements</h1>
          <p className="text-muted-foreground">Manage banner ads across your site</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Ad
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>{editingAd ? 'Edit Ad' : 'Create Ad'}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[calc(90vh-100px)] pr-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={editingAd?.name || ''}
                    required
                    placeholder="Ad campaign name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Select name="position" defaultValue={editingAd?.position || 'leaderboard'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {POSITIONS.map(pos => (
                        <SelectItem key={pos.value} value={pos.value}>
                          {pos.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <AdminAdUpload
                  currentImageUrl={imageUrl}
                  onImageChange={setImageUrl}
                  position={editingAd?.position || 'leaderboard'}
                />

                {/* Targeting Section - Collapsible */}
                <Collapsible open={targetingOpen} onOpenChange={setTargetingOpen} className="border rounded-lg">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-muted/50">
                    <span className="font-medium text-sm">Ad Targeting</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground max-w-[180px] truncate">{targetingSummary}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${targetingOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="border-t">
                    <div className="p-3 space-y-4">
                      {/* Categories */}
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium">Categories</Label>
                        <AdminCategorySelector
                          selectedIds={selectedCategoryIds}
                          onChange={setSelectedCategoryIds}
                        />
                      </div>

                      {/* Countries */}
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium">Countries</Label>
                        <Popover open={countriesPopoverOpen} onOpenChange={setCountriesPopoverOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full justify-between text-xs h-8"
                              type="button"
                            >
                              <span className="text-muted-foreground">
                                {selectedCountries.length === 0 
                                  ? 'All countries' 
                                  : `${selectedCountries.length} selected`}
                              </span>
                              <ChevronDown className="h-3 w-3 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-56 p-2" align="start">
                            {countriesLoading ? (
                              <div className="flex items-center justify-center py-4">
                                <Loader2 className="h-4 w-4 animate-spin" />
                              </div>
                            ) : availableCountries && availableCountries.length > 0 ? (
                              <ScrollArea className="h-48">
                                <div className="space-y-0.5">
                                  {availableCountries.map(country => (
                                    <div
                                      key={country}
                                      className="flex items-center gap-2 py-1 px-1 rounded hover:bg-muted/50 cursor-pointer"
                                      onClick={() => toggleCountry(country)}
                                    >
                                      <Checkbox
                                        checked={selectedCountries.includes(country)}
                                        onCheckedChange={() => toggleCountry(country)}
                                        className="h-3 w-3"
                                      />
                                      <span className="text-xs">{country}</span>
                                    </div>
                                  ))}
                                </div>
                              </ScrollArea>
                            ) : (
                              <p className="text-xs text-muted-foreground text-center py-2">
                                No countries available
                              </p>
                            )}
                          </PopoverContent>
                        </Popover>
                        {selectedCountries.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {selectedCountries.map(country => (
                              <Badge key={country} variant="secondary" className="text-xs">
                                {country}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Pages */}
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium">Pages</Label>
                        <div className="flex flex-wrap gap-1.5">
                          {PAGE_OPTIONS.map(page => (
                            <Button
                              key={page.value}
                              type="button"
                              variant={selectedPages.includes(page.value) ? "default" : "outline"}
                              size="sm"
                              onClick={() => togglePage(page.value)}
                              className="text-xs h-7 px-2"
                            >
                              {page.label}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <div className="space-y-2">
                  <Label htmlFor="link_url">Link URL</Label>
                  <Input
                    id="link_url"
                    name="link_url"
                    type="url"
                    defaultValue={editingAd?.link_url || ''}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alt_text">Alt Text</Label>
                  <Input
                    id="alt_text"
                    name="alt_text"
                    defaultValue={editingAd?.alt_text || ''}
                    placeholder="Description for accessibility"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start_date">Start Date</Label>
                    <Input
                      id="start_date"
                      name="start_date"
                      type="date"
                      defaultValue={editingAd?.start_date?.split('T')[0] || ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end_date">End Date</Label>
                    <Input
                      id="end_date"
                      name="end_date"
                      type="date"
                      defaultValue={editingAd?.end_date?.split('T')[0] || ''}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="is_active"
                    name="is_active"
                    defaultChecked={editingAd?.is_active ?? true}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={createMutation.isPending || updateMutation.isPending}
                  >
                    {(createMutation.isPending || updateMutation.isPending) && (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    )}
                    {editingAd ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      {ads?.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/50">
          <p className="text-muted-foreground">No ads created yet</p>
          <Button onClick={openCreateDialog} variant="link">
            Create your first ad
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Targeting</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Link</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ads?.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell>
                    <img
                      src={ad.image_url}
                      alt={ad.alt_text || ad.name}
                      className="h-12 max-w-24 object-contain rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{ad.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {POSITIONS.find(p => p.value === ad.position)?.label || ad.position}
                    </Badge>
                  </TableCell>
                  <TableCell>{getTargetingBadges(ad)}</TableCell>
                  <TableCell>{getStatusBadge(ad)}</TableCell>
                  <TableCell>
                    {ad.link_url && (
                      <a
                        href={ad.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Link
                      </a>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(ad)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(ad.id)}
                        disabled={deleteMutation.isPending}
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
    </div>
  );
}
