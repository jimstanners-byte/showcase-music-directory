'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List, FolderTree, Newspaper, Star } from "lucide-react";

export default function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [listings, categories, news] = await Promise.all([
        supabase.from("listings").select("id, tier", { count: "exact" }),
        supabase.from("categories").select("id", { count: "exact" }),
        supabase.from("news").select("id", { count: "exact" }),
      ]);

      const premierCount = listings.data?.filter(l => l.tier === "premier").length || 0;
      const enhancedCount = listings.data?.filter(l => l.tier === "enhanced").length || 0;
      const freeCount = listings.data?.filter(l => l.tier === "free").length || 0;

      return {
        totalListings: listings.count || 0,
        premierCount,
        enhancedCount,
        freeCount,
        totalCategories: categories.count || 0,
        totalNews: news.count || 0,
      };
    },
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
            <List className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalListings || 0}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-tier-premier">●</span> {stats?.premierCount || 0} Premier
              <span className="ml-2 text-tier-enhanced">●</span> {stats?.enhancedCount || 0} Enhanced
              <span className="ml-2 text-tier-free">●</span> {stats?.freeCount || 0} Free
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premier Listings</CardTitle>
            <Star className="h-4 w-4 text-tier-premier" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.premierCount || 0}</div>
            <p className="text-xs text-muted-foreground">Top tier listings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <FolderTree className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalCategories || 0}</div>
            <p className="text-xs text-muted-foreground">Directory categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">News Articles</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalNews || 0}</div>
            <p className="text-xs text-muted-foreground">Published articles</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
