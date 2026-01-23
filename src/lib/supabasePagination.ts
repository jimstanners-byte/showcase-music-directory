const PAGE_SIZE = 1000;

/**
 * Fetches all rows from a Supabase query by paginating through results.
 * Bypasses the server-side 1000 row limit by fetching in batches.
 * 
 * @param baseQuery - A function that returns a fresh Supabase query builder
 * @param pageSize - Number of rows per page (default: 1000)
 * @returns Promise<T[]> - All rows combined from all pages
 */
export async function fetchAllRows<T>(
  baseQuery: () => { range: (start: number, end: number) => PromiseLike<{ data: T[] | null; error: unknown }> },
  pageSize = PAGE_SIZE
): Promise<T[]> {
  let allData: T[] = [];
  let page = 0;
  let hasMore = true;

  while (hasMore) {
    const start = page * pageSize;
    const end = start + pageSize - 1;

    // Create a fresh query for each page to avoid mutation issues
    const result = await baseQuery().range(start, end);
    
    if (result.error) throw result.error;

    const rows = result.data || [];
    allData = [...allData, ...rows];
    
    // If we got fewer rows than requested, we've reached the end
    hasMore = rows.length === pageSize;
    page++;
    
    // Safety limit to prevent infinite loops (max 50 pages = 50,000 rows)
    if (page >= 50) break;
  }

  return allData;
}
