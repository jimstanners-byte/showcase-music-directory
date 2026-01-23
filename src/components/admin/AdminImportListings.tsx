'use client';

import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface CSVRow {
  [key: string]: string;
}

function parseCSV(text: string, delimiter: string = ','): CSVRow[] {
  const lines = text.split('\n');
  const headers = parseCSVLine(lines[0], delimiter);
  const rows: CSVRow[] = [];
  
  let currentLine = '';
  for (let i = 1; i < lines.length; i++) {
    currentLine += (currentLine ? '\n' : '') + lines[i];
    
    const quoteCount = (currentLine.match(/"/g) || []).length;
    if (quoteCount % 2 === 0) {
      if (currentLine.trim()) {
        const values = parseCSVLine(currentLine, delimiter);
        const row: Record<string, string> = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        rows.push(row);
      }
      currentLine = '';
    }
  }
  
  return rows;
}

function parseCSVLine(line: string, delimiter: string = ','): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  
  return result;
}

interface ImportState {
  file: File | null;
  importing: boolean;
  progress: number;
  stats: { total: number; success: number; failed: number };
  errors: string[];
}

const initialImportState: ImportState = {
  file: null,
  importing: false,
  progress: 0,
  stats: { total: 0, success: 0, failed: 0 },
  errors: [],
};

export default function AdminImportListings() {
  const [listings, setListings] = useState<ImportState>(initialImportState);
  const [categories, setCategories] = useState<ImportState>(initialImportState);
  const [venueUpdate, setVenueUpdate] = useState<ImportState>(initialImportState);
  const [phoneUpdate, setPhoneUpdate] = useState<ImportState>(initialImportState);
  const { toast } = useToast();
  const router = useRouter();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'listings' | 'categories' | 'venueUpdate' | 'phoneUpdate'
  ) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv'))) {
      const setter = type === 'listings' ? setListings : type === 'categories' ? setCategories : type === 'venueUpdate' ? setVenueUpdate : setPhoneUpdate;
      setter(prev => ({ ...prev, file: selectedFile, errors: [], stats: { total: 0, success: 0, failed: 0 } }));
    } else {
      toast({
        title: "Invalid file",
        description: "Please select a CSV file",
        variant: "destructive",
      });
    }
  };

  const importListings = async () => {
    if (!listings.file) return;

    setListings(prev => ({ ...prev, importing: true, progress: 0, errors: [] }));

    try {
      const text = await listings.file.text();
      const rows = parseCSV(text);
      
      setListings(prev => ({ ...prev, stats: { total: rows.length, success: 0, failed: 0 } }));
      
      const BATCH_SIZE = 100;
      let successCount = 0;
      let failedCount = 0;
      const errorMessages: string[] = [];

      for (let i = 0; i < rows.length; i += BATCH_SIZE) {
        const batch = rows.slice(i, i + BATCH_SIZE);
        
        const data = batch.map(row => ({
          id: row.id || undefined,
          source_company_id: row.source_company_id ? parseInt(row.source_company_id) : null,
          name: row.name,
          slug: row.slug,
          description: row.description || null,
          short_description: row.short_description || null,
          email: row.email || null,
          website: row.website || null,
          phone: row.phone || null,
          address: row.address || null,
          town_city: row.town_city || null,
          county: row.county || null,
          country: row.country || null,
          is_active: row.is_active?.toLowerCase() === 'true',
          tier: (row.tier as 'free' | 'enhanced' | 'premier') || 'free',
          primary_category_id: row.primary_category_id || null,
          keywords: row.keywords || null,
          contact_name: row.contact_name || null,
          contact_job_title: row.contact_job_title || null,
          contact_email: row.contact_email || null,
          contact_phone: row.contact_phone || null,
          capacity: row.capacity ? parseInt(row.capacity) : null,
          venue_type: row.venue_type || null,
          box_office_phone: row.box_office_phone || null,
        }));

        const { error } = await supabase
          .from('listings')
          .upsert(data, { onConflict: 'id' });

        if (error) {
          failedCount += batch.length;
          errorMessages.push(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${error.message}`);
        } else {
          successCount += batch.length;
        }

        setListings(prev => ({
          ...prev,
          progress: Math.round(((i + batch.length) / rows.length) * 100),
          stats: { total: rows.length, success: successCount, failed: failedCount },
        }));
      }

      setListings(prev => ({ ...prev, errors: errorMessages }));

      toast({
        title: failedCount === 0 ? "Import complete" : "Import completed with errors",
        description: `${successCount} succeeded, ${failedCount} failed`,
        variant: failedCount === 0 ? "default" : "destructive",
      });
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setListings(prev => ({ ...prev, importing: false }));
    }
  };

  const importCategories = async () => {
    if (!categories.file) return;

    setCategories(prev => ({ ...prev, importing: true, progress: 0, errors: [] }));

    try {
      const text = await categories.file.text();
      const rows = parseCSV(text);
      
      setCategories(prev => ({ ...prev, stats: { total: rows.length, success: 0, failed: 0 } }));
      
      const BATCH_SIZE = 100;
      let successCount = 0;
      let failedCount = 0;
      const errorMessages: string[] = [];

      for (let i = 0; i < rows.length; i += BATCH_SIZE) {
        const batch = rows.slice(i, i + BATCH_SIZE);
        
        const data = batch.map(row => ({
  	  id: row.id || crypto.randomUUID(),
          listing_id: row.listing_id,
          category_id: row.category_id,
        }));

        const { error } = await supabase
          .from('listing_categories')
          .upsert(data, { onConflict: 'id' });

        if (error) {
          failedCount += batch.length;
          errorMessages.push(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${error.message}`);
        } else {
          successCount += batch.length;
        }

        setCategories(prev => ({
          ...prev,
          progress: Math.round(((i + batch.length) / rows.length) * 100),
          stats: { total: rows.length, success: successCount, failed: failedCount },
        }));
      }

      setCategories(prev => ({ ...prev, errors: errorMessages }));

      toast({
        title: failedCount === 0 ? "Import complete" : "Import completed with errors",
        description: `${successCount} succeeded, ${failedCount} failed`,
        variant: failedCount === 0 ? "default" : "destructive",
      });
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setCategories(prev => ({ ...prev, importing: false }));
    }
  };

  const importVenueUpdates = async () => {
    if (!venueUpdate.file) return;

    setVenueUpdate(prev => ({ ...prev, importing: true, progress: 0, errors: [] }));

    try {
      const text = await venueUpdate.file.text();
      // Detect delimiter - check if semicolon is used
      const delimiter = text.split('\n')[0].includes(';') ? ';' : ',';
      const rows = parseCSV(text, delimiter);
      
      // Filter to only rows that have data to update
      const validRows = rows.filter(row => 
        row.id && (row.venue_capacity?.trim() || row.postcode?.trim())
      );
      
      setVenueUpdate(prev => ({ ...prev, stats: { total: validRows.length, success: 0, failed: 0 } }));
      
      const BATCH_SIZE = 100;
      let successCount = 0;
      let failedCount = 0;
      const errorMessages: string[] = [];

      for (let i = 0; i < validRows.length; i += BATCH_SIZE) {
        const batch = validRows.slice(i, i + BATCH_SIZE);
        
        // Process each row individually since we're doing conditional updates
        for (const row of batch) {
          const updateData: { venue_capacity?: number; postcode?: string } = {};
          
          if (row.venue_capacity?.trim()) {
            const capacity = parseInt(row.venue_capacity.trim());
            if (!isNaN(capacity)) {
              updateData.venue_capacity = capacity;
            }
          }
          
          if (row.postcode?.trim()) {
            updateData.postcode = row.postcode.trim();
          }
          
          if (Object.keys(updateData).length > 0) {
            const { error } = await supabase
              .from('listings')
              .update(updateData)
              .eq('id', row.id);

            if (error) {
              failedCount++;
              if (errorMessages.length < 10) {
                errorMessages.push(`ID ${row.id}: ${error.message}`);
              }
            } else {
              successCount++;
            }
          }
        }

        setVenueUpdate(prev => ({
          ...prev,
          progress: Math.round(((i + batch.length) / validRows.length) * 100),
          stats: { total: validRows.length, success: successCount, failed: failedCount },
        }));
      }

      if (errorMessages.length >= 10) {
        errorMessages.push(`... and ${failedCount - 10} more errors`);
      }
      
      setVenueUpdate(prev => ({ ...prev, errors: errorMessages }));

      toast({
        title: failedCount === 0 ? "Update complete" : "Update completed with errors",
        description: `Updated ${successCount} of ${validRows.length} listings`,
        variant: failedCount === 0 ? "default" : "destructive",
      });
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setVenueUpdate(prev => ({ ...prev, importing: false }));
    }
  };

  const importPhoneUpdates = async () => {
    if (!phoneUpdate.file) return;

    setPhoneUpdate(prev => ({ ...prev, importing: true, progress: 0, errors: [] }));

    try {
      const text = await phoneUpdate.file.text();
      // Detect delimiter - check if semicolon is used
      const delimiter = text.split('\n')[0].includes(';') ? ';' : ',';
      const rows = parseCSV(text, delimiter);
      
      // Filter to only rows that have showcase_id and phone_to_add
      const validRows = rows.filter(row => 
        row.showcase_id?.trim() && row.phone_to_add?.trim()
      );
      
      setPhoneUpdate(prev => ({ ...prev, stats: { total: validRows.length, success: 0, failed: 0 } }));
      
      const BATCH_SIZE = 100;
      let successCount = 0;
      let failedCount = 0;
      const errorMessages: string[] = [];

      for (let i = 0; i < validRows.length; i += BATCH_SIZE) {
        const batch = validRows.slice(i, i + BATCH_SIZE);
        
        // Process each row individually
        for (const row of batch) {
          const phone = row.phone_to_add.trim();
          const showcaseId = row.showcase_id.trim();
          
          const { error } = await supabase
            .from('listings')
            .update({ phone })
            .eq('id', showcaseId);

          if (error) {
            failedCount++;
            if (errorMessages.length < 10) {
              errorMessages.push(`ID ${showcaseId} (${row.company_name || 'Unknown'}): ${error.message}`);
            }
          } else {
            successCount++;
          }
        }

        setPhoneUpdate(prev => ({
          ...prev,
          progress: Math.round(((i + batch.length) / validRows.length) * 100),
          stats: { total: validRows.length, success: successCount, failed: failedCount },
        }));
      }

      if (errorMessages.length >= 10) {
        errorMessages.push(`... and ${failedCount - 10} more errors`);
      }
      
      setPhoneUpdate(prev => ({ ...prev, errors: errorMessages }));

      toast({
        title: failedCount === 0 ? "Phone update complete" : "Phone update completed with errors",
        description: `Updated ${successCount} of ${validRows.length} listings`,
        variant: failedCount === 0 ? "default" : "destructive",
      });
    } catch (error) {
      console.error('Phone update error:', error);
      toast({
        title: "Phone update failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setPhoneUpdate(prev => ({ ...prev, importing: false }));
    }
  };

  const renderImportCard = (
    title: string,
    description: string,
    state: ImportState,
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onImport: () => void
  ) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept=".csv"
            onChange={onFileChange}
            disabled={state.importing}
            className="max-w-md"
          />
          <Button onClick={onImport} disabled={!state.file || state.importing}>
            {state.importing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Import
              </>
            )}
          </Button>
        </div>

        {state.file && (
          <p className="text-sm text-muted-foreground">Selected: {state.file.name}</p>
        )}

        {(state.importing || state.stats.total > 0) && (
          <div className="space-y-4">
            <Progress value={state.progress} />
            <div className="flex gap-6 text-sm">
              <div><span className="font-medium">Total:</span> {state.stats.total}</div>
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span>Success:</span> {state.stats.success}
              </div>
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span>Failed:</span> {state.stats.failed}
              </div>
            </div>
          </div>
        )}

        {state.errors.length > 0 && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4">
            <h4 className="font-medium text-destructive mb-2">Errors:</h4>
            <ul className="text-sm space-y-1">
              {state.errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Import Data</h1>
          <p className="text-muted-foreground">Bulk import listings and categories from CSV files</p>
        </div>
        <Button variant="outline" onClick={() => router.push('/admin/listings')}>
          Back to Listings
        </Button>
      </div>
      {renderImportCard(
        "Import Listings",
        "Upload a CSV with listings data. Required columns: id, name, slug. Upserts on id.",
        listings,
        (e) => handleFileChange(e, 'listings'),
        importListings
      )}
      {renderImportCard(
        "Import Listing Categories",
        "Upload a CSV with listing-category relationships. Required columns: id, listing_id, category_id. Upserts on id.",
        categories,
        (e) => handleFileChange(e, 'categories'),
        importCategories
      )}
      {renderImportCard(
        "Update Venue Capacity & Postcode",
        "Upload a CSV to update existing listings. Required columns: id, venue_capacity, postcode. Only non-empty values will be updated. Supports semicolon or comma delimiters.",
        venueUpdate,
        (e) => handleFileChange(e, 'venueUpdate'),
        importVenueUpdates
      )}
      {renderImportCard(
        "Bulk Update Phone Numbers",
        "Upload a CSV to update phone numbers. Required columns: showcase_id, company_name, source_company_id, phone_to_add. The showcase_id maps to the listing id. Supports semicolon or comma delimiters.",
        phoneUpdate,
        (e) => handleFileChange(e, 'phoneUpdate'),
        importPhoneUpdates
      )}
    </div>
  );
}