-- Create table for Get Listed form submissions
CREATE TABLE public.listing_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  description TEXT NOT NULL,
  category_ids UUID[] DEFAULT '{}',
  category_names TEXT[] DEFAULT '{}',
  ip_address TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending'
);

-- Create table for Contact Us form submissions
CREATE TABLE public.general_enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  ip_address TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.listing_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.general_enquiries ENABLE ROW LEVEL SECURITY;

-- Listing submissions policies
CREATE POLICY "Anyone can submit listing requests"
ON public.listing_submissions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view listing submissions"
ON public.listing_submissions
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update listing submissions"
ON public.listing_submissions
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete listing submissions"
ON public.listing_submissions
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- General enquiries policies
CREATE POLICY "Anyone can submit general enquiries"
ON public.general_enquiries
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view general enquiries"
ON public.general_enquiries
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete general enquiries"
ON public.general_enquiries
FOR DELETE
USING (has_role(auth.uid(), 'admin'));