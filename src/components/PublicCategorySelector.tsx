'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCategories } from '@/hooks/useCategories';
import { Search, ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';

interface PublicCategorySelectorProps {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  maxCategories?: number;
}

export const PublicCategorySelector = ({ 
  selectedIds, 
  onChange, 
  maxCategories = 2 
}: PublicCategorySelectorProps) => {
  const { data: categories, isLoading } = useCategories();
  const [search, setSearch] = useState('');
  const [expandedParents, setExpandedParents] = useState<Set<string>>(new Set());
  const [showLimitWarning, setShowLimitWarning] = useState(false);
  const warningRef = useRef<HTMLDivElement>(null);

  // Organize categories by parent
  const parentCategories = categories?.filter(c => !c.parent_id) || [];
  const childCategories = categories?.filter(c => c.parent_id) || [];

  const getChildrenForParent = (parentId: string) => {
    return childCategories.filter(c => c.parent_id === parentId);
  };

  const filteredParents = parentCategories.filter(cat => 
    cat.name.toLowerCase().includes(search.toLowerCase()) ||
    getChildrenForParent(cat.id).some(child => 
      child.name.toLowerCase().includes(search.toLowerCase())
    )
  );

  const toggleCategory = (categoryId: string) => {
    if (selectedIds.includes(categoryId)) {
      // Always allow deselection
      onChange(selectedIds.filter(id => id !== categoryId));
      setShowLimitWarning(false);
    } else {
      // Check if we've hit the limit
      if (selectedIds.length >= maxCategories) {
        setShowLimitWarning(true);
        return;
      }
      onChange([...selectedIds, categoryId]);
      setShowLimitWarning(false);
    }
  };

  const toggleExpand = (parentId: string) => {
    const newExpanded = new Set(expandedParents);
    if (newExpanded.has(parentId)) {
      newExpanded.delete(parentId);
    } else {
      newExpanded.add(parentId);
    }
    setExpandedParents(newExpanded);
  };

  const getSelectedNames = () => {
    return categories?.filter(c => selectedIds.includes(c.id)).map(c => c.name) || [];
  };

  const removeCategory = (categoryId: string) => {
    onChange(selectedIds.filter(id => id !== categoryId));
    setShowLimitWarning(false);
  };

  // Auto-expand parents with selected children
  useEffect(() => {
    if (categories) {
      const parentsToExpand = new Set<string>();
      selectedIds.forEach(id => {
        const category = categories.find(c => c.id === id);
        if (category?.parent_id) {
          parentsToExpand.add(category.parent_id);
        }
      });
      setExpandedParents(prev => new Set([...prev, ...parentsToExpand]));
    }
  }, [selectedIds, categories]);

  // Hide warning after a few seconds and scroll into view when shown
  useEffect(() => {
    if (showLimitWarning) {
      // Scroll warning into view
      warningRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const timer = setTimeout(() => setShowLimitWarning(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showLimitWarning]);

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading categories...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Selected categories badges */}
      <div className="flex flex-wrap gap-1">
        {selectedIds.length === 0 ? (
          <span className="text-sm text-muted-foreground">No categories selected</span>
        ) : (
          getSelectedNames().map((name, index) => {
            const categoryId = categories?.find(c => c.name === name)?.id;
            return (
              <Badge 
                key={name} 
                variant="secondary" 
                className="text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                onClick={() => categoryId && removeCategory(categoryId)}
              >
                {name} ×
              </Badge>
            );
          })
        )}
      </div>
      {/* Limit warning */}
      {showLimitWarning && (
        <div ref={warningRef}>
          <Alert variant="destructive" className="py-2">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Free listings can appear in up to {maxCategories} categories.{' '}
              <Link href="/promote" className="underline font-medium hover:no-underline">
                Upgrade your listing
              </Link>{' '}
              for additional category placements.
            </AlertDescription>
          </Alert>
        </div>
      )}
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
          className="pl-9"
        />
      </div>
      {/* Category tree */}
      <ScrollArea className="h-64 border rounded-md p-3">
        <div className="space-y-2">
          {filteredParents.map(parent => {
            const children = getChildrenForParent(parent.id);
            const isExpanded = expandedParents.has(parent.id);
            const hasMatchingChildren = children.some(c => 
              c.name.toLowerCase().includes(search.toLowerCase())
            );

            return (
              <div key={parent.id} className="space-y-1">
                {/* Parent category - always clickable to expand */}
                <button
                  type="button"
                  onClick={() => toggleExpand(parent.id)}
                  className="p-0.5 hover:bg-muted rounded flex items-center gap-2 flex-1 text-left w-full"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  )}
                  <span className="font-medium">{parent.name}</span>
                </button>
                {/* Expanded content - either subcategories or parent checkbox if no children */}
                {(isExpanded || (search && hasMatchingChildren)) && (
                  <div className="ml-6 space-y-1 border-l pl-3">
                    {children.length > 0 ? (
                      // Show subcategories
                      (children
                        .filter(child => 
                          !search || child.name.toLowerCase().includes(search.toLowerCase())
                        )
                        .map(child => (
                          <div key={child.id} className="flex items-center gap-2">
                            <Checkbox
                              id={child.id}
                              checked={selectedIds.includes(child.id)}
                              onCheckedChange={() => toggleCategory(child.id)}
                            />
                            <Label
                              htmlFor={child.id}
                              className="cursor-pointer text-sm"
                            >
                              {child.name}
                            </Label>
                          </div>
                        )))
                    ) : (
                      // No subcategories - show parent as selectable
                      (<div className="flex items-center gap-2">
                        <Checkbox
                          id={parent.id}
                          checked={selectedIds.includes(parent.id)}
                          onCheckedChange={() => toggleCategory(parent.id)}
                        />
                        <Label
                          htmlFor={parent.id}
                          className="cursor-pointer text-sm"
                        >
                          {parent.name}
                        </Label>
                      </div>)
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
      {/* Count display */}
      <p className="text-xs text-muted-foreground">
        {selectedIds.length} of {maxCategories} categories selected
      </p>
    </div>
  );
};
