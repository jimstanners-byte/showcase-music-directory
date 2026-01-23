'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ListingPhoto } from "@/types/database";

export function useListingPhotos(listingId?: string, initialData?: any[]) {
  return useQuery({
    queryKey: ["listing-photos", listingId],
    queryFn: async () => {
      if (!listingId) return [];

      const { data, error } = await supabase
        .from("listing_photos")
        .select("*")
        .eq("listing_id", listingId)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as ListingPhoto[];
    },
    enabled: !!listingId,
    initialData,
  });
}
