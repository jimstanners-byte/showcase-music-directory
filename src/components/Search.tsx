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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const PAGE_SIZE = 10;

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams?.get("q") || "";
  const [activeQuery, setActiveQuery] = useState(initialQuery);
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
  const totalPages = Math.ceil(totalEntries / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, totalEntries);
  const paginatedListings = listings?.slice(startIndex, endIndex) || [];

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
      <div className="container py-4">
        {/* Breadcrumb - mobile only */}
        <nav className="flex md:hidden items-center gap-2 text-sm text-muted-foreground mb-3">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Search</span>
        </nav>

        <h1 className="text-lg sm:text-xl font-semibold mb-4">
          Search Results
        </h1>

        <div className="max-w-xl mb-6">
          <SearchAutocomplete defaultValue={activeQuery} />
        </div>

        {isLoading ? (
          <div className="space-y-3">
            <div className="h-6 w-48 bg-muted animate-pulse rounded" />
            <div className="h-64 bg-muted animate-pulse rounded" />
          </div>
        ) : activeQuery ? (
          <div className="space-y-4">
            {/* Categories - Prominent Full Width */}
            {matchingCategories.length > 0 && (
              <CategoryFilter categories={matchingCategories} />
            )}

            {/* Main Content - Listings */}
            {listings && listings.length > 0 && (
              <div className="border-t border-border pt-4">
                {/* Simple header */}
                <div className="flex items-center gap-2 px-1 mb-3">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {totalEntries} matching {totalEntries === 1 ? 'company' : 'companies'}
                  </span>
                </div>

                {/* Listing Rows */}
                {paginatedListings.length > 0 && (
                  <>
                    <div className="divide-y divide-border border rounded-lg overflow-hidden bg-card">
                      {paginatedListings.map((listing) => (
                        <ListingRow key={listing.id} listing={listing} locationMode="country" />
                      ))}
                    </div>

                    {/* Pagination Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1 py-3">
                      <p className="text-xs text-muted-foreground">
                        Showing {startIndex + 1} to {endIndex} of {totalEntries}
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
              <div className="bg-card border rounded-lg p-6 text-center text-muted-foreground">
                No results found for "{activeQuery}".
              </div>
            )}
          </div>
        ) : (
          <div className="bg-card border rounded-lg p-6 text-center text-muted-foreground">
            Enter a search term to find categories and companies.
          </div>
        )}
      </div>
    </Layout>
  );
}