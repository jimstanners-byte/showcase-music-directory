'use client';
import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCategories } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CsvRow {
  category_slug: string;
  seo_title: string;
  seo_meta_description: string;
  seo_meta_keywords: string;
  isValid?: boolean;
  categoryId?: string;
  error?: string;
}

export const CategorySeoImport = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { data: categories } = useCategories();
  
  const [csvData, setCsvData] = useState<CsvRow[]>([]);
  const [isImporting, setIsImporting] = useState(false);

  const downloadTemplate = () => {
    const headers = ["category_slug", "seo_title", "seo_meta_description", "seo_meta_keywords"];
    const exampleRows = [
      ["backline-hire", "Backline Hire in {location} | Showcase", "Find professional backline hire services in {location}.", "backline, hire, rental"],
      ["pa-hire", "PA Hire in {location} | Showcase", "Professional PA system hire in {location}.", "pa, hire, sound"],
    ];
    
    const csvContent = [
      "# Category SEO Import Template",
      "# category_slug: Use the URL slug (e.g., backline-hire)",
      "# seo_title: Use {location} placeholder for dynamic location (max 60 chars)",
      "# seo_meta_description: Use {location} placeholder (max 160 chars)",
      "# seo_meta_keywords: Comma-separated keywords",
      "",
      headers.join(","),
      ...exampleRows.map(row => row.map(cell => `"${cell}"`).join(",")),
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "category_seo_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const parseCsv = (text: string): CsvRow[] => {
    const lines = text.trim().split("\n").filter(line => !line.trim().startsWith("#"));
    
    if (lines.length < 2) {
      return [];
    }
    
    const headerLine = lines[0];
    const headers: string[] = [];
    let current = "";
    let inQuotes = false;
    
    for (const char of headerLine) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        headers.push(current.trim().toLowerCase());
        current = "";
      } else {
        current += char;
      }
    }
    headers.push(current.trim().toLowerCase());
    
    const expectedColumns = ["category_slug", "seo_title", "seo_meta_description", "seo_meta_keywords"];
    
    const rows = lines.slice(1).map((line) => {
      if (!line.trim()) {
        return null;
      }
      
      const values: string[] = [];
      current = "";
      inQuotes = false;
      
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
      expectedColumns.forEach(col => {
        row[col] = "";
      });
      
      headers.forEach((header, i) => {
        const value = values[i]?.replace(/^"|"$/g, "") || "";
        if (expectedColumns.includes(header)) {
          row[header] = value;
        }
      });

      return row as CsvRow;
    }).filter((row): row is CsvRow => row !== null);
    
    return rows;
  };

  const validateCsvData = (rows: CsvRow[]): CsvRow[] => {
    return rows.map((row) => {
      if (!row.category_slug?.trim()) {
        return { ...row, isValid: false, error: "Missing category_slug" };
      }
      
      const categorySlug = row.category_slug.trim();
      const category = categories?.find(c => 
        c.url_slug === categorySlug || c.slug === categorySlug
      );
      
      if (!category) {
        return { ...row, isValid: false, error: `Category "${categorySlug}" not found` };
      }
      
      // At least one SEO field must have content
      if (!row.seo_title?.trim() && !row.seo_meta_description?.trim() && !row.seo_meta_keywords?.trim()) {
        return { ...row, isValid: false, error: "At least one SEO field required" };
      }
      
      return { ...row, isValid: true, categoryId: category.id };
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
    const validRows = csvData.filter(row => row.isValid && row.categoryId);
    if (validRows.length === 0) {
      toast({ title: "No valid rows to import", variant: "destructive" });
      return;
    }

    setIsImporting(true);
    let updated = 0;
    let errors = 0;

    for (const row of validRows) {
      try {
        const updateData: any = {};
        
        if (row.seo_title?.trim()) {
          updateData.seo_title = row.seo_title.trim();
        }
        if (row.seo_meta_description?.trim()) {
          updateData.seo_meta_description = row.seo_meta_description.trim();
        }
        if (row.seo_meta_keywords?.trim()) {
          updateData.seo_meta_keywords = row.seo_meta_keywords.trim();
        }
        
        const { error } = await supabase
          .from("categories")
          .update(updateData)
          .eq("id", row.categoryId);

        if (error) throw error;
        updated++;
      } catch (err) {
        console.error("Import error:", err);
        errors++;
      }
    }

    setIsImporting(false);
    setCsvData([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    
    toast({
      title: "Import Complete",
      description: `Updated ${updated} categories. ${errors > 0 ? `${errors} errors.` : ""}`,
    });
  };

  const validCount = csvData.filter(r => r.isValid).length;
  const invalidCount = csvData.filter(r => !r.isValid).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Category Template Upload</CardTitle>
        <CardDescription>
          Update the default SEO templates for categories (uses <code className="bg-muted px-1 py-0.5 rounded text-xs">{'{location}'}</code> and <code className="bg-muted px-1 py-0.5 rounded text-xs">{'{in_location}'}</code> placeholders)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={downloadTemplate}>
            <Download className="h-4 w-4 mr-2" />
            Download Template
          </Button>
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload CSV
            </Button>
          </div>
        </div>

        {csvData.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-sm">
                <span className="text-green-600">{validCount} valid</span>
                {invalidCount > 0 && <span className="text-red-600">{invalidCount} invalid</span>}
              </div>
              <Button 
                onClick={handleImport} 
                disabled={validCount === 0 || isImporting}
                size="sm"
              >
                {isImporting ? "Importing..." : `Import ${validCount} Categories`}
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="max-h-64 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10">Status</TableHead>
                      <TableHead>Category Slug</TableHead>
                      <TableHead>SEO Title</TableHead>
                      <TableHead>Meta Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {csvData.slice(0, 20).map((row, i) => (
                      <TableRow key={i} className={cn(!row.isValid && "bg-red-50 dark:bg-red-950/20")}>
                        <TableCell>
                          {row.isValid ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <span title={row.error}>
                              <AlertCircle className="h-4 w-4 text-red-600" />
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="font-mono text-xs">{row.category_slug}</TableCell>
                        <TableCell className="text-xs max-w-48 truncate" title={row.seo_title}>
                          {row.seo_title || <span className="text-muted-foreground">—</span>}
                        </TableCell>
                        <TableCell className="text-xs max-w-48 truncate" title={row.seo_meta_description}>
                          {row.seo_meta_description || <span className="text-muted-foreground">—</span>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {csvData.length > 20 && (
                <div className="p-2 text-center text-xs text-muted-foreground border-t">
                  Showing first 20 of {csvData.length} rows
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
