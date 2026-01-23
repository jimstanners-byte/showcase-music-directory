'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function usePendingClaimRequestsCount() {
  return useQuery({
    queryKey: ["claim-requests-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("claim_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      if (error) throw error;
      return count || 0;
    },
  });
}
