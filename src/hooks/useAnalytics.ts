'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useRef } from 'react';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Helper to track events directly to database
async function trackEvent(eventType: string, data: Record<string, unknown>) {
  try {
    // Map event types to their respective tables
    const tableMap: Record<string, string> = {
      'page_view': 'page_views',
      'category_view': 'category_page_views',
      'ad_view': 'ad_views',
      'ad_click': 'ad_clicks',
      'listing_view': 'listing_views',
      'link_click': 'listing_link_clicks',
    };

    const tableName = tableMap[eventType];
    if (!tableName) {
      console.warn(`Unknown event type: ${eventType}`);
      return;
    }

    console.log('Attempting to insert:', { tableName, data });
    const { data: result, error } = await supabase.from(tableName).insert(data);
    
    if (error) {
      console.error(`Failed to track ${eventType}:`, {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        tableName: tableName,
        eventType: eventType
      });
    } else {
      console.log('Successfully tracked:', eventType);
    }
  } catch (error) {
    console.error(`Failed to track ${eventType}:`, {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      eventType: eventType
    });
  }
}

// Track page view
export const usePageViewTracking = () => {
  const pathname = usePathname();
  const trackedRef = useRef<string | null>(null);

  useEffect(() => {
    // Don't track admin pages or dashboard-login
    if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard-login')) {
      return;
    }

    // Only track once per page
    if (trackedRef.current === pathname) {
      return;
    }

    trackedRef.current = pathname;

    trackEvent('page_view', {
      page_url: pathname,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
    });
  }, [pathname]);
};

// Track category page views
export const useCategoryViewTracking = (categoryId: string | null, categoryName: string | null) => {
  const trackedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!categoryId || trackedRef.current === categoryId) {
      return;
    }

    trackedRef.current = categoryId;

    trackEvent('category_view', {
      category_id: categoryId,
      category_name: categoryName,
    });
  }, [categoryId, categoryName]);
};

// Direct tracking function for category page views with location
export const trackCategoryPageView = (
  categoryId: string,
  categoryName: string,
  country: string | null = null,
  city: string | null = null
) => {
  trackEvent('category_view', {
    category_id: categoryId,
    category_name: categoryName,
    country: country,
    city: city,
  });
};

// Track ad view
export const trackAdView = (adId: string) => {
  trackEvent('ad_view', { ad_id: adId });
};

// Track ad click
export const trackAdClick = (adId: string, targetUrl: string) => {
  trackEvent('ad_click', { ad_id: adId, target_url: targetUrl });
};

// Track listing view
export const trackListingView = (listingId: string) => {
  trackEvent('listing_view', { listing_id: listingId });
};

// Track link clicks from listing pages
export const trackLinkClick = (listingId: string, linkType: string, linkUrl?: string) => {
  trackEvent('link_click', {
    listing_id: listingId,
    link_type: linkType,
    link_url: linkUrl || null,
  });
};

// Fetch analytics data - Page Views (with count)
export function usePageViews(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ['analytics', 'page-views', startDate, endDate],
    queryFn: async () => {
      let query = supabase
        .from('page_views')
        .select('*', { count: 'exact', head: false })
        .order('viewed_at', { ascending: false })
        .limit(1000);

      if (startDate) {
        query = query.gte('viewed_at', startDate);
      }
      if (endDate) {
        query = query.lte('viewed_at', endDate);
      }

      const { data, count, error } = await query;
      if (error) throw error;
      return { data: data || [], count: count || 0 };
    },
  });
}

// Fetch analytics data - Category Views (with count)
export function useCategoryViews(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ['analytics', 'category-views', startDate, endDate],
    queryFn: async () => {
      let query = supabase
        .from('category_page_views')
        .select('*', { count: 'exact', head: false })
        .order('viewed_at', { ascending: false })
        .limit(1000);

      if (startDate) {
        query = query.gte('viewed_at', startDate);
      }
      if (endDate) {
        query = query.lte('viewed_at', endDate);
      }

      const { data, count, error } = await query;
      if (error) throw error;
      return { data: data || [], count: count || 0 };
    },
  });
}

// Fetch analytics data - Ad Views (with count)
export function useAdViews(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ['analytics', 'ad-views', startDate, endDate],
    queryFn: async () => {
      let query = supabase
        .from('ad_views')
        .select('*', { count: 'exact', head: false })
        .order('viewed_at', { ascending: false })
        .limit(1000);

      if (startDate) {
        query = query.gte('viewed_at', startDate);
      }
      if (endDate) {
        query = query.lte('viewed_at', endDate);
      }

      const { data, count, error } = await query;
      if (error) throw error;
      return { data: data || [], count: count || 0 };
    },
  });
}

// Fetch analytics data - Ad Clicks (with count)
export function useAdClicks(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ['analytics', 'ad-clicks', startDate, endDate],
    queryFn: async () => {
      let query = supabase
        .from('ad_clicks')
        .select('*', { count: 'exact', head: false })
        .order('clicked_at', { ascending: false })
        .limit(1000);

      if (startDate) {
        query = query.gte('clicked_at', startDate);
      }
      if (endDate) {
        query = query.lte('clicked_at', endDate);
      }

      const { data, count, error } = await query;
      if (error) throw error;
      return { data: data || [], count: count || 0 };
    },
  });
}

// Fetch analytics data - Listing Views (with count)
export function useListingViews(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ['analytics', 'listing-views', startDate, endDate],
    queryFn: async () => {
      let query = supabase
        .from('listing_views')
        .select('*', { count: 'exact', head: false })
        .order('viewed_at', { ascending: false })
        .limit(1000);

      if (startDate) {
        query = query.gte('viewed_at', startDate);
      }
      if (endDate) {
        query = query.lte('viewed_at', endDate);
      }

      const { data, count, error } = await query;
      if (error) throw error;
      return { data: data || [], count: count || 0 };
    },
  });
}

// Fetch analytics data - Link Clicks (with count)
export function useLinkClicks(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ['analytics', 'link-clicks', startDate, endDate],
    queryFn: async () => {
      let query = supabase
        .from('listing_link_clicks')
        .select('*', { count: 'exact', head: false })
        .order('clicked_at', { ascending: false })
        .limit(1000);

      if (startDate) {
        query = query.gte('clicked_at', startDate);
      }
      if (endDate) {
        query = query.lte('clicked_at', endDate);
      }

      const { data, count, error } = await query;
      if (error) throw error;
      return { data: data || [], count: count || 0 };
    },
  });
}

// Aggregated analytics for dashboard
export function useAnalyticsSummary(startDate?: string, endDate?: string) {
  const { data: pageViews } = usePageViews(startDate, endDate);
  const { data: categoryViews } = useCategoryViews(startDate, endDate);
  const { data: adViews } = useAdViews(startDate, endDate);
  const { data: adClicks } = useAdClicks(startDate, endDate);
  const { data: listingViews } = useListingViews(startDate, endDate);
  const { data: linkClicks } = useLinkClicks(startDate, endDate);

  return {
    pageViews: pageViews?.count || 0,
    categoryViews: categoryViews?.count || 0,
    adViews: adViews?.count || 0,
    adClicks: adClicks?.count || 0,
    listingViews: listingViews?.count || 0,
    linkClicks: linkClicks?.count || 0,
  };
}

// Top performing listings by views
export function useTopListings(limit: number = 10, startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ['analytics', 'top-listings', limit, startDate, endDate],
    queryFn: async () => {
      let query = supabase
        .from('listing_views')
        .select('listing_id');

      if (startDate) {
        query = query.gte('viewed_at', startDate);
      }
      if (endDate) {
        query = query.lte('viewed_at', endDate);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Count views per listing
      const viewCounts = data.reduce((acc: Record<string, number>, view) => {
        acc[view.listing_id] = (acc[view.listing_id] || 0) + 1;
        return acc;
      }, {});

      // Sort and limit
      const sorted = Object.entries(viewCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, limit)
        .map(([listing_id, views]) => ({ listing_id, views }));

      return sorted;
    },
  });
}

// Top performing categories by views
export function useTopCategories(limit: number = 10, startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ['analytics', 'top-categories', limit, startDate, endDate],
    queryFn: async () => {
      let query = supabase
        .from('category_page_views')
        .select('category_id, category_name');

      if (startDate) {
        query = query.gte('viewed_at', startDate);
      }
      if (endDate) {
        query = query.lte('viewed_at', endDate);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Count views per category
      const viewCounts = data.reduce((acc: Record<string, { name: string; views: number }>, view) => {
        if (!acc[view.category_id]) {
          acc[view.category_id] = { name: view.category_name || 'Unknown', views: 0 };
        }
        acc[view.category_id].views++;
        return acc;
      }, {});

      // Sort and limit
      const sorted = Object.entries(viewCounts)
        .sort(([, a], [, b]) => b.views - a.views)
        .slice(0, limit)
        .map(([category_id, data]) => ({ category_id, ...data }));

      return sorted;
    },
  });
}

// Analytics Overview
export function useAnalyticsOverview(startDate?: string, endDate?: string) {
  const { data: pageViews, isLoading: pageViewsLoading } = usePageViews(startDate, endDate);
  const { data: categoryViews, isLoading: categoryViewsLoading } = useCategoryViews(startDate, endDate);
  const { data: adViews, isLoading: adViewsLoading } = useAdViews(startDate, endDate);
  const { data: adClicks, isLoading: adClicksLoading } = useAdClicks(startDate, endDate);
  const { data: listingViews, isLoading: listingViewsLoading } = useListingViews(startDate, endDate);
  const { data: linkClicks, isLoading: linkClicksLoading } = useLinkClicks(startDate, endDate);

  const isLoading = pageViewsLoading || categoryViewsLoading || adViewsLoading || 
                    adClicksLoading || listingViewsLoading || linkClicksLoading;

  const totalAdViews = adViews?.count || 0;
  const totalAdClicks = adClicks?.count || 0;
  const ctr = totalAdViews > 0 ? ((totalAdClicks / totalAdViews) * 100).toFixed(2) : '0.00';

  return {
    data: {
      pageViews: pageViews?.count || 0,
      categoryViews: categoryViews?.count || 0,
      adViews: totalAdViews,
      adClicks: totalAdClicks,
      ctr: ctr,
      listingViews: listingViews?.count || 0,
      linkClicks: linkClicks?.count || 0,
    },
    isLoading,
    error: null
  };
}

// Ad Analytics - aggregated by ad
export function useAdAnalytics() {
  return useQuery({
    queryKey: ['ad-analytics'],
    queryFn: async () => {
      // Get all ads
      const { data: ads, error: adsError } = await supabase
        .from('ads')
        .select('id, name, position')
        .order('name');

      if (adsError) throw adsError;

      // Get views and clicks for each ad
      const results = await Promise.all(
        ads.map(async (ad) => {
          const [viewsRes, clicksRes] = await Promise.all([
            supabase.from('ad_views').select('id', { count: 'exact', head: true }).eq('ad_id', ad.id),
            supabase.from('ad_clicks').select('id', { count: 'exact', head: true }).eq('ad_id', ad.id)
          ]);

          const views = viewsRes.count || 0;
          const clicks = clicksRes.count || 0;
          const ctr = views > 0 ? ((clicks / views) * 100).toFixed(2) : '0.00';

          return {
            id: ad.id,
            name: ad.name,
            position: ad.position,
            views,
            clicks,
            ctr
          };
        })
      );

      return results;
    },
  });
}

// Time series analytics
export function useAnalyticsTimeSeries(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ['analytics-timeseries', startDate, endDate],
    queryFn: async () => {
      const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const end = endDate || new Date().toISOString();

      // Get page views
      const { data: pageViews } = await supabase
        .from('page_views')
        .select('viewed_at')
        .gte('viewed_at', start)
        .lte('viewed_at', end);

      // Get ad views
      const { data: adViews } = await supabase
        .from('ad_views')
        .select('viewed_at')
        .gte('viewed_at', start)
        .lte('viewed_at', end);

      // Get ad clicks
      const { data: adClicks } = await supabase
        .from('ad_clicks')
        .select('clicked_at')
        .gte('clicked_at', start)
        .lte('clicked_at', end);

      // Group by date
      const dateMap: Record<string, { pageViews: number; adViews: number; adClicks: number }> = {};

      pageViews?.forEach((view) => {
        const date = view.viewed_at.split('T')[0];
        if (!dateMap[date]) dateMap[date] = { pageViews: 0, adViews: 0, adClicks: 0 };
        dateMap[date].pageViews++;
      });

      adViews?.forEach((view) => {
        const date = view.viewed_at.split('T')[0];
        if (!dateMap[date]) dateMap[date] = { pageViews: 0, adViews: 0, adClicks: 0 };
        dateMap[date].adViews++;
      });

      adClicks?.forEach((click) => {
        const date = click.clicked_at.split('T')[0];
        if (!dateMap[date]) dateMap[date] = { pageViews: 0, adViews: 0, adClicks: 0 };
        dateMap[date].adClicks++;
      });

      // Convert to array and sort
      return Object.entries(dateMap)
        .map(([date, counts]) => ({ date, ...counts }))
        .sort((a, b) => a.date.localeCompare(b.date));
    },
  });
}

// Category views analytics with search
export function useCategoryViewsAnalytics(search?: string) {
  return useQuery({
    queryKey: ['category-views-analytics', search],
    queryFn: async () => {
      let query = supabase
        .from('category_page_views')
        .select('category_name, country, city');

      const { data, error } = await query;
      if (error) throw error;

      // Group by category + location
      const grouped: Record<string, { category: string; country: string | null; city: string | null; views: number }> = {};
      
      data?.forEach((view) => {
        const key = `${view.category_name}-${view.country}-${view.city}`;
        if (!grouped[key]) {
          grouped[key] = {
            category: view.category_name,
            country: view.country,
            city: view.city,
            views: 0
          };
        }
        grouped[key].views++;
      });

      let results = Object.values(grouped);

      // Filter by search
      if (search) {
        const searchLower = search.toLowerCase();
        results = results.filter(item => 
          item.category.toLowerCase().includes(searchLower) ||
          item.country?.toLowerCase().includes(searchLower) ||
          item.city?.toLowerCase().includes(searchLower)
        );
      }

      // Sort by views descending
      return results.sort((a, b) => b.views - a.views);
    },
  });
}

// Company views analytics with search
export function useCompanyViewsAnalytics(search?: string) {
  return useQuery({
    queryKey: ['company-views-analytics', search],
    queryFn: async () => {
      const { data: views, error: viewsError } = await supabase
        .from('listing_views')
        .select('listing_id');

      if (viewsError) throw viewsError;

      // Count views per listing
      const viewCounts: Record<string, number> = {};
      views?.forEach((view) => {
        viewCounts[view.listing_id] = (viewCounts[view.listing_id] || 0) + 1;
      });

      // Get listing details
      const listingIds = Object.keys(viewCounts);
      if (listingIds.length === 0) return [];

      let query = supabase
        .from('listings')
        .select('id, name, slug')
        .in('id', listingIds);

      if (search) {
        query = query.ilike('name', `%${search}%`);
      }

      const { data: listings, error: listingsError } = await query;
      if (listingsError) throw listingsError;

      // Combine data
      const results = listings?.map((listing) => ({
        id: listing.id,
        name: listing.name,
        slug: listing.slug,
        views: viewCounts[listing.id] || 0
      })) || [];

      // Sort by views descending
      return results.sort((a, b) => b.views - a.views);
    },
  });
}

// Link clicks analytics with search
export function useLinkClicksAnalytics(search?: string) {
  return useQuery({
    queryKey: ['link-clicks-analytics', search],
    queryFn: async () => {
      const { data: clicks, error: clicksError } = await supabase
        .from('listing_link_clicks')
        .select('listing_id, link_type');

      if (clicksError) throw clicksError;

      // Group by listing + link type
      const grouped: Record<string, { listingId: string; linkType: string; clicks: number }> = {};
      
      clicks?.forEach((click) => {
        const key = `${click.listing_id}-${click.link_type}`;
        if (!grouped[key]) {
          grouped[key] = {
            listingId: click.listing_id,
            linkType: click.link_type,
            clicks: 0
          };
        }
        grouped[key].clicks++;
      });

      // Get listing details
      const listingIds = [...new Set(Object.values(grouped).map(g => g.listingId))];
      if (listingIds.length === 0) return [];

      let query = supabase
        .from('listings')
        .select('id, name, slug')
        .in('id', listingIds);

      if (search) {
        query = query.ilike('name', `%${search}%`);
      }

      const { data: listings, error: listingsError } = await query;
      if (listingsError) throw listingsError;

      const listingMap = new Map(listings?.map(l => [l.id, l]) || []);

      // Combine data
      const results = Object.values(grouped)
        .map((item) => {
          const listing = listingMap.get(item.listingId);
          return listing ? {
            listingId: item.listingId,
            companyName: listing.name,
            slug: listing.slug,
            linkType: item.linkType,
            clicks: item.clicks
          } : null;
        })
        .filter(Boolean) as Array<{
          listingId: string;
          companyName: string;
          slug: string;
          linkType: string;
          clicks: number;
        }>;

      // Sort by clicks descending
      return results.sort((a, b) => b.clicks - a.clicks);
    },
  });
}