'use client';
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useRegions, useBulkAssignRegions, type UnmatchedListing } from "@/hooks/useRegions";
import { Label } from "@/components/ui/label";

interface BulkAssignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedListings: UnmatchedListing[];
  onSuccess: () => void;
}

export function BulkAssignModal({
  open,
  onOpenChange,
  selectedListings,
  onSuccess,
}: BulkAssignModalProps) {
  const [selectedRegionId, setSelectedRegionId] = useState<string>("");
  const [addToLookup, setAddToLookup] = useState(false);

  const bulkAssignMutation = useBulkAssignRegions();

  // Determine the country of selected listings
  const countries = new Set(selectedListings.map((l) => l.country).filter(Boolean));
  const isMixedCountries = countries.size > 1;
  const singleCountry = countries.size === 1 ? Array.from(countries)[0] : null;

  const { data: regions } = useRegions(singleCountry);

  const handleAssign = () => {
    if (!selectedRegionId || !regions) return;

    const region = regions.find((r) => r.id === parseInt(selectedRegionId));
    if (!region) return;

    bulkAssignMutation.mutate(
      {
        listingIds: selectedListings.map((l) => l.id),
        regionId: region.id,
        addToLookup,
        listings: selectedListings,
        regionName: region.region_name,
      },
      {
        onSuccess: () => {
          setSelectedRegionId("");
          setAddToLookup(false);
          onSuccess();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bulk Assign Region</DialogTitle>
          <DialogDescription>
            Assign a region to {selectedListings.length} selected listings
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {isMixedCountries ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Cannot bulk assign: Selected listings have mixed countries ({Array.from(countries).join(", ")}).
                Please select listings from the same country.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="space-y-2">
                <Label>Region ({singleCountry})</Label>
                <Select value={selectedRegionId} onValueChange={setSelectedRegionId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions?.map((region) => (
                      <SelectItem key={region.id} value={region.id.toString()}>
                        {region.region_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="addToLookup"
                  checked={addToLookup}
                  onCheckedChange={(checked) => setAddToLookup(checked === true)}
                />
                <Label htmlFor="addToLookup" className="text-sm cursor-pointer">
                  Add all to lookup table (for future auto-matching)
                </Label>
              </div>

              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Selected listings:</p>
                <ul className="list-disc list-inside max-h-32 overflow-y-auto">
                  {selectedListings.slice(0, 10).map((listing) => (
                    <li key={listing.id}>{listing.name}</li>
                  ))}
                  {selectedListings.length > 10 && (
                    <li className="text-muted-foreground">...and {selectedListings.length - 10} more</li>
                  )}
                </ul>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={isMixedCountries || !selectedRegionId || bulkAssignMutation.isPending}
          >
            {bulkAssignMutation.isPending ? "Assigning..." : "Assign Region"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
