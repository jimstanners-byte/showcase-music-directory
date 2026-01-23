'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ContactMessage {
  id: string;
  listing_id: string;
  listing_name: string;
  sender_name: string;
  sender_email: string;
  message: string;
  ip_address: string | null;
  sent_at: string;
}

export function useContactMessages(search?: string) {
  return useQuery({
    queryKey: ["contact-messages", search],
    queryFn: async () => {
      let query = supabase
        .from("contact_messages")
        .select("*")
        .order("sent_at", { ascending: false });

      if (search && search.trim()) {
        const searchTerm = `%${search.trim()}%`;
        query = query.or(`listing_name.ilike.${searchTerm},sender_name.ilike.${searchTerm},sender_email.ilike.${searchTerm}`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching contact messages:", {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        throw error;
      }

      return data as ContactMessage[];
    },
  });
}
