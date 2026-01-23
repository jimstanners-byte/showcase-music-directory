'use client';
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { MapPin, Play, RefreshCw, CheckCircle, AlertCircle, Globe } from "lucide-react";
import Link from "next/link";
import {
  useRegionStats,
  useUnmatchedListings,
  useBackfillRegions,
  useAssignRegion,
  useAllRegions,
  type UnmatchedListing,
} from "@/hooks/useRegions";
import { BulkAssignModal } from "./BulkAssignModal";

export function RegionAssignmentSection() {
  const [page, setPage] = useState(0);
  const [selectedListings, setSelectedListings] = useState<Set<string>>(new Set());
  const [addToLookup, setAddToLookup] = useState<Record<string, boolean>>({});
  const [bulkModalOpen, setBulkModalOpen] = useState(false);

  const { data: stats, isLoading: statsLoading } = useRegionStats();
  const { data: unmatchedData, isLoading: listingsLoading } = useUnmatchedListings(page, 25);
  const { data: allRegions } = useAllRegions();
  const backfillMutation = useBackfillRegions();
  const assignMutation = useAssignRegion();

  const ukWithRegion = stats?.ukWithRegion || 0;
  const usaWithRegion = stats?.usaWithRegion || 0;
  const ukTotal = stats?.ukTotal || 0;
  const usaTotal = stats?.usaTotal || 0;
  const regionProgress = ukTotal + usaTotal > 0
    ? Math.round(((ukWithRegion + usaWithRegion) / (ukTotal + usaTotal)) * 100)
    : 0;

  const totalPages = unmatchedData ? Math.ceil(unmatchedData.total / 25) : 0;

  const toggleListing = (id: string) => {
    setSelectedListings((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (!unmatchedData) return;
    const allIds = unmatchedData.listings.map((l) => l.id);
    const allSelected = allIds.every((id) => selectedListings.has(id));
    if (allSelected) {
      setSelectedListings(new Set());
    } else {
      setSelectedListings(new Set(allIds));
    }
  };

  const handleAssign = (listing: UnmatchedListing, regionId: number) => {
    const region = allRegions?.find((r) => r.id === regionId);
    if (!region) return;

    assignMutation.mutate({
      listingId: listing.id,
      regionId,
      addToLookup: addToLookup[listing.id] || false,
      townCity: listing.town_city,
      regionName: region.region_name,
      country: listing.country || "",
    });
  };

  const getRegionsForCountry = (country: string | null) => {
    if (!allRegions || !country) return [];
    // Normalize country names to match regions table format
    let regionCountry = country;
    if (country === "United States" || country === "US") {
      regionCountry = "USA";
    } else if (country === "United Kingdom") {
      regionCountry = "UK";
    }
    return allRegions.filter((r) => r.country === regionCountry);
  };

  const selectedListingObjects = unmatchedData?.listings.filter((l) =>
    selectedListings.has(l.id)
  ) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Globe className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Region Assignment</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Region Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Region Assignment Progress
            </CardTitle>
            <CardDescription>
              Track how many UK/USA listings have regions assigned
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {statsLoading ? (
              <div className="h-20 bg-muted animate-pulse rounded" />
            ) : (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">
                      {ukWithRegion + usaWithRegion} of {ukTotal + usaTotal} listings
                    </span>
                  </div>
                  <Progress value={regionProgress} className="h-3" />
                  <p className="text-xs text-muted-foreground text-right">
                    {regionProgress}% complete
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {ukWithRegion}/{ukTotal}
                    </p>
                    <p className="text-xs text-muted-foreground">UK Listings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {usaWithRegion}/{usaTotal}
                    </p>
                    <p className="text-xs text-muted-foreground">USA Listings</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Backfill Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-primary" />
              Backfill Regions
            </CardTitle>
            <CardDescription>
              Assign regions to all UK/USA listings that don't have one yet.
              Processes 100 listings per batch.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => backfillMutation.mutate()}
              disabled={backfillMutation.isPending || stats?.total === 0}
              className="w-full"
              size="lg"
            >
              {backfillMutation.isPending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Processing batch...
                </>
              ) : stats?.total === 0 ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  All regions assigned
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run Backfill ({stats?.total} remaining)
                </>
              )}
            </Button>

            {backfillMutation.data && (
              <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                {backfillMutation.data.assigned > 0 ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                )}
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-medium text-green-600">
                      {backfillMutation.data.assigned} assigned
                    </span>
                    {backfillMutation.data.unmatched > 0 && (
                      <span className="text-orange-600 ml-2">
                        • {backfillMutation.data.unmatched} unmatched
                      </span>
                    )}
                  </p>
                  {backfillMutation.data.unmatchedSample?.length > 0 && (
                    <div className="text-xs text-muted-foreground mt-2">
                      <p className="font-medium mb-1">Sample unmatched:</p>
                      <ul className="list-disc list-inside">
                        {backfillMutation.data.unmatchedSample.slice(0, 5).map((item: { id: string; name: string; town_city: string | null; county: string | null; country: string | null }, i: number) => (
                          <li key={item.id || i}>{item.name} ({item.town_city || 'No city'}, {item.country || 'No country'})</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Listings Needing Region Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          {stats?.total === 0 ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">All regions assigned</span>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold">{stats?.ukNeedRegion || 0}</p>
                <p className="text-sm text-muted-foreground">UK listings</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold">{stats?.usaNeedRegion || 0}</p>
                <p className="text-sm text-muted-foreground">USA listings</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold text-primary">{stats?.total || 0}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-2xl font-bold text-orange-600">{stats?.totalUnmatched || 0}</p>
                <p className="text-sm text-muted-foreground">Marked Unmatched</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Listings in Unmatched Region - need manual assignment */}
      {unmatchedData && unmatchedData.total > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Listings in Unmatched Region ({unmatchedData.total})</CardTitle>
              <CardDescription>
                These listings are currently in the "Unmatched" region. Assign them to the correct region.
              </CardDescription>
            </div>
            {selectedListings.size > 0 && (
              <Button onClick={() => setBulkModalOpen(true)}>
                Bulk Assign ({selectedListings.size})
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {listingsLoading ? (
              <div className="h-40 bg-muted animate-pulse rounded" />
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={
                            unmatchedData.listings.length > 0 &&
                            unmatchedData.listings.every((l) => selectedListings.has(l.id))
                          }
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Company Name</TableHead>
                      <TableHead>Town/City</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead className="w-48">Assign Region</TableHead>
                      <TableHead className="w-32">Add to Lookup</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unmatchedData.listings.map((listing) => (
                      <TableRow key={listing.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedListings.has(listing.id)}
                            onCheckedChange={() => toggleListing(listing.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Link
                            href={`/admin/listings?edit=${listing.id}`}
                            className="text-primary hover:underline font-medium"
                          >
                            {listing.name}
                          </Link>
                        </TableCell>
                        <TableCell>{listing.town_city || "-"}</TableCell>
                        <TableCell>{listing.country || "-"}</TableCell>
                        <TableCell>
                          <Select
                            onValueChange={(value) => handleAssign(listing, parseInt(value))}
                            disabled={assignMutation.isPending}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select region" />
                            </SelectTrigger>
                            <SelectContent>
                              {getRegionsForCountry(listing.country).map((region) => (
                                <SelectItem key={region.id} value={region.id.toString()}>
                                  {region.region_name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={addToLookup[listing.id] || false}
                            onCheckedChange={(checked) =>
                              setAddToLookup((prev) => ({
                                ...prev,
                                [listing.id]: checked === true,
                              }))
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {totalPages > 1 && (
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setPage((p) => Math.max(0, p - 1))}
                            className={page === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const pageNum = page < 2 ? i : page - 2 + i;
                          if (pageNum >= totalPages) return null;
                          return (
                            <PaginationItem key={pageNum}>
                              <PaginationLink
                                onClick={() => setPage(pageNum)}
                                isActive={page === pageNum}
                                className="cursor-pointer"
                              >
                                {pageNum + 1}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        })}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                            className={page >= totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}

      <BulkAssignModal
        open={bulkModalOpen}
        onOpenChange={setBulkModalOpen}
        selectedListings={selectedListingObjects}
        onSuccess={() => {
          setSelectedListings(new Set());
          setBulkModalOpen(false);
        }}
      />
    </div>
  );
}
