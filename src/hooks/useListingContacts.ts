'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ListingContact } from "@/types/database";

export function useListingContacts(listingId: string | undefined, showContacts: boolean = false, initialData?: any[]) {
  return useQuery({
    queryKey: ["listing-contacts", listingId],
    queryFn: async () => {
      if (!listingId) return [];
      
      const { data, error } = await supabase
        .from("listing_contacts")
        .select("*")
        .eq("listing_id", listingId)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as ListingContact[];
    },
    enabled: !!listingId && showContacts,
    initialData,
  });
}

// Admin hook - fetches contacts regardless of show_contacts setting
export function useAdminListingContacts(listingId: string | undefined) {
  return useQuery({
    queryKey: ["admin-listing-contacts", listingId],
    queryFn: async () => {
      if (!listingId) return [];
      
      const { data, error } = await supabase
        .from("listing_contacts")
        .select("*")
        .eq("listing_id", listingId)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as ListingContact[];
    },
    enabled: !!listingId,
  });
}