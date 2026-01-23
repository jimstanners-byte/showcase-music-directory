'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { SearchAutocomplete } from "@/components/SearchAutocomplete";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ListingRow } from "@/components/ListingRow";
import { useListings } from "@/hooks/useListings";
import { useSearchAutocomplete } from "@/hooks/useSearchAutocomplete";
import { ChevronRight, Building2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams?.get("q") || "";
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Update activeQuery when URL changes
  useEffect(() => {
    setActiveQuery(initialQuery);
    setCurrentPage(1);
  }, [initialQuery]);

  const { data: listings, isLoading: listingsLoading } = useListings({ searchQuery: activeQuery });
  const { data: autocompleteData, isLoading: categoriesLoading } = useSearchAutocomplete(activeQuery);

  const matchingCategories = autocompleteData?.categories || [];
  const isLoading = listingsLoading || categoriesLoading;

  // Auto-redirect to category page when there's exactly 1 category match and 0 listings
  const shouldRedirect =
    !isLoading && activeQuery && matchingCategories.length === 1 && (!listings || listings.length === 0);

  // Pagination
  const totalEntries = listings?.length || 0;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalEntries);
  const paginatedListings = listings?.slice(startIndex, endIndex) || [];

  // Reset to page 1 when page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  useEffect(() => {
    if (shouldRedirect) {
      const category = matchingCategories[0];
      router.replace(`/${category.url_slug || category.slug}`);
    }
  }, [shouldRedirect, matchingCategories, router]);

  // Early return while redirecting to prevent page flash
  if (isLoading || shouldRedirect) {
    return null;
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "ellipsis", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages);
      }
    }
    return pages;
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Search</span>
        </nav>

        <h1 className="text-3xl font-bold mb-6">
          {activeQuery ? `Search Results for "${activeQuery}"` : "Search Directory"}
        </h1>

        <div className="max-w-xl mb-8">
          <SearchAutocomplete />
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <div className="h-6 w-48 bg-muted animate-pulse rounded" />
            <div className="h-64 bg-muted animate-pulse rounded" />
          </div>
        ) : activeQuery ? (
          <div className="space-y-6">
            {/* Categories - Prominent Full Width */}
            {matchingCategories.length > 0 && (
              <CategoryFilter searchTerm={activeQuery} categories={matchingCategories} />
            )}

            {/* Main Content - Listings (Full Width) */}
            {listings && listings.length > 0 && (
              <div className="bg-card border rounded-lg overflow-hidden">
                {/* Header - only show when categories are also displayed */}
                {matchingCategories.length > 0 && (
                  <div className="flex items-center gap-2 p-4 border-b">
                    <Building2 className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold text-lg">Company names matching "{activeQuery}"</h2>
                  </div>
                )}

                {/* Controls Header */}
                <div className="flex items-center justify-between p-4 border-b bg-muted/30">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Show</span>
                    <Select value={String(pageSize)} onValueChange={(value) => setPageSize(Number(value))}>
                      <SelectTrigger className="w-20 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PAGE_SIZE_OPTIONS.map((size) => (
                          <SelectItem key={size} value={String(size)}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground">entries</span>
                  </div>
                </div>

                {/* Listing Rows */}
                {paginatedListings.length > 0 && (
                  <>
                    <div className="divide-y divide-border">
                      {paginatedListings.map((listing) => (
                        <ListingRow key={listing.id} listing={listing} locationMode="country" />
                      ))}
                    </div>

                    {/* Pagination Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-t bg-muted/30">
                      <p className="text-sm text-muted-foreground">
                        Showing {startIndex + 1} to {endIndex} of {totalEntries} entries
                      </p>

                      {totalPages > 1 && (
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                              />
                            </PaginationItem>

                            {getPageNumbers().map((page, idx) =>
                              page === "ellipsis" ? (
                                <PaginationItem key={`ellipsis-${idx}`}>
                                  <PaginationEllipsis />
                                </PaginationItem>
                              ) : (
                                <PaginationItem key={page}>
                                  <PaginationLink
                                    onClick={() => setCurrentPage(page)}
                                    isActive={currentPage === page}
                                    className="cursor-pointer"
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                              ),
                            )}

                            <PaginationItem>
                              <PaginationNext
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                className={
                                  currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
                                }
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* No results message - only when no categories AND no listings */}
            {listings?.length === 0 && matchingCategories.length === 0 && (
              <div className="bg-card border rounded-lg p-8 text-center text-muted-foreground">
                No results found for "{activeQuery}".
              </div>
            )}
          </div>
        ) : (
          <div className="bg-card border rounded-lg p-8 text-center text-muted-foreground">
            Enter a search term to find categories and companies.
          </div>
        )}
      </div>
    </Layout>
  );
}