-- Create claim_requests table for tracking business claim requests
CREATE TABLE public.claim_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  listing_name text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  role_at_company text,
  message text,
  status text NOT NULL DEFAULT 'pending',
  ip_address text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  reviewed_at timestamp with time zone,
  reviewed_by uuid
);

-- Enable Row Level Security
ALTER TABLE public.claim_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can submit claim requests"
ON public.claim_requests
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all claim requests"
ON public.claim_requests
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update claim requests"
ON public.claim_requests
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete claim requests"
ON public.claim_requests
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));