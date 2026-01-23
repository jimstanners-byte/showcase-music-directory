'use client';
import { useState, useEffect, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCategories } from "@/hooks/useCategories";
import { Search, ChevronDown, X } from "lucide-react";

interface AdminCategorySelectorProps {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export const AdminCategorySelector = ({ selectedIds, onChange }: AdminCategorySelectorProps) => {
  const { data: categories, isLoading } = useCategories();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  // Build flat list of selectable categories:
  // - All subcategories (with parent context)
  // - Parent categories that have NO children (e.g., Venues)
  const selectableCategories = useMemo(() => {
    if (!categories) return [];
    const parents = categories.filter((c) => !c.parent_id);
    const children = categories.filter((c) => c.parent_id);

    // Find parent IDs that have children
    const parentIdsWithChildren = new Set(children.map((c) => c.parent_id));

    // Parents without children should be directly selectable
    const standaloneParents = parents
      .filter((p) => !parentIdsWithChildren.has(p.id))
      .map((p) => ({
        ...p,
        parentName: "",
        displayName: p.name,
        searchText: p.name.toLowerCase(),
      }));

    // Subcategories with parent context
    const subcats = children.map((child) => {
      const parent = parents.find((p) => p.id === child.parent_id);
      return {
        ...child,
        parentName: parent?.name || "",
        displayName: child.name,
        searchText: `${parent?.name || ""} ${child.name}`.toLowerCase(),
      };
    });

    return [...standaloneParents, ...subcats].sort((a, b) => a.displayName.localeCompare(b.displayName));
  }, [categories]);

  const filteredCategories = useMemo(() => {
    if (!search) return selectableCategories;
    const searchLower = search.toLowerCase();
    return selectableCategories.filter((c) => c.searchText.includes(searchLower));
  }, [selectableCategories, search]);

  const toggleCategory = (categoryId: string) => {
    if (selectedIds.includes(categoryId)) {
      onChange(selectedIds.filter((id) => id !== categoryId));
    } else {
      onChange([...selectedIds, categoryId]);
    }
  };

  const removeCategory = (categoryId: string) => {
    onChange(selectedIds.filter((id) => id !== categoryId));
  };

  const getSelectedCategories = () => {
    return selectableCategories.filter((c) => selectedIds.includes(c.id));
  };

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }

  const selectedCats = getSelectedCategories();

  return (
    <div className="space-y-2">
      {/* Selected badges */}
      {selectedCats.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedCats.map((cat) => (
            <Badge key={cat.id} variant="secondary" className="text-xs gap-1 pr-1">
              {cat.name}
              <button
                type="button"
                onClick={() => removeCategory(cat.id)}
                className="ml-0.5 hover:bg-muted rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Compact dropdown */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-full justify-between text-xs h-8" type="button">
            <span className="text-muted-foreground">
              {selectedIds.length === 0 ? "Select categories..." : `${selectedIds.length} selected`}
            </span>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-2" align="start">
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                className="pl-7 h-7 text-xs"
              />
            </div>
            <ScrollArea className="h-48">
              <div className="space-y-0.5">
                {filteredCategories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center gap-2 py-1 px-1 rounded hover:bg-muted/50 cursor-pointer"
                    onClick={() => toggleCategory(cat.id)}
                  >
                    <Checkbox
                      checked={selectedIds.includes(cat.id)}
                      onCheckedChange={() => toggleCategory(cat.id)}
                      className="h-3 w-3"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs">{cat.name}</span>
                      <span className="text-xs text-muted-foreground ml-1">({cat.parentName})</span>
                    </div>
                  </div>
                ))}
                {filteredCategories.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-2">No categories found</p>
                )}
              </div>
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
