'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// =============================================================================
// SECURITY NOTE: useSubmitBulkEnquiry now only sends listing IDs to the server.
// The Edge Function looks up emails server-side - client never sees bulk emails.
// =============================================================================

export interface BulkEnquiry {
  id: string;
  sender_name: string;
  sender_email: string;
  message: string;
  listing_ids: string[];
  listing_names: string[];
  listing_emails: string[];
  status: 'pending' | 'approved' | 'rejected';
  rejection_reason: string | null;
  ip_address: string | null;
  submitted_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
}

export function useBulkEnquiries(status?: 'pending' | 'approved' | 'rejected') {
  return useQuery({
    queryKey: ['bulk-enquiries', status],
    queryFn: async () => {
      let query = supabase
        .from('bulk_enquiries')
        .select('*')
        .order('submitted_at', { ascending: false });
      
      if (status) {
        query = query.eq('status', status);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as BulkEnquiry[];
    },
  });
}

export function usePendingEnquiriesCount() {
  return useQuery({
    queryKey: ['bulk-enquiries-pending-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('bulk_enquiries')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      
      if (error) throw error;
      return count || 0;
    },
  });
}

export function useApproveBulkEnquiry() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (enquiryId: string) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');
      
      const response = await supabase.functions.invoke('approve-bulk-enquiry', {
        body: { enquiryId },
      });
      
      if (response.error) throw response.error;
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bulk-enquiries'] });
      queryClient.invalidateQueries({ queryKey: ['bulk-enquiries-pending-count'] });
      toast({
        title: 'Enquiry Approved',
        description: data.message,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useRejectBulkEnquiry() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ enquiryId, rejectionReason }: { enquiryId: string; rejectionReason: string }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');
      
      const response = await supabase.functions.invoke('reject-bulk-enquiry', {
        body: { enquiryId, rejectionReason },
      });
      
      if (response.error) throw response.error;
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bulk-enquiries'] });
      queryClient.invalidateQueries({ queryKey: ['bulk-enquiries-pending-count'] });
      toast({
        title: 'Enquiry Rejected',
        description: data.message,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

// SECURITY: Only sends listing IDs - server looks up emails
export function useSubmitBulkEnquiry() {
  return useMutation({
    mutationFn: async (payload: {
      listingIds: string[];
      senderName: string;
      senderEmail: string;
      message: string;
      honeypot: string;
      timestamp: number;
    }) => {
      const response = await supabase.functions.invoke('submit-bulk-enquiry', {
        body: payload,
      });
      
      if (response.error) throw response.error;
      if (response.data?.error) throw new Error(response.data.error);
      return response.data;
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
