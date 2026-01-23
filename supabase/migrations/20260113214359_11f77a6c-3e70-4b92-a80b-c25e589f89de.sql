-- Create listing_contacts table for storing multiple contacts per listing
CREATE TABLE public.listing_contacts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  contact_name text NOT NULL,
  contact_email text,
  contact_phone text,
  job_title text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add show_contacts toggle to listings table
ALTER TABLE public.listings ADD COLUMN show_contacts boolean NOT NULL DEFAULT false;

-- Enable RLS on listing_contacts
ALTER TABLE public.listing_contacts ENABLE ROW LEVEL SECURITY;

-- Admin can manage all contacts
CREATE POLICY "Admins can view all contacts" ON public.listing_contacts
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert contacts" ON public.listing_contacts
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update contacts" ON public.listing_contacts
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete contacts" ON public.listing_contacts
  FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Public can view contacts for active listings with show_contacts enabled
CREATE POLICY "Public can view contacts for visible listings" ON public.listing_contacts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.listings 
      WHERE listings.id = listing_contacts.listing_id 
      AND listings.is_active = true 
      AND listings.show_contacts = true
    )
  );

-- Create index for faster lookups
CREATE INDEX idx_listing_contacts_listing_id ON public.listing_contacts(listing_id);
CREATE INDEX idx_listing_contacts_display_order ON public.listing_contacts(listing_id, display_order);

-- Migrate existing contact data from listings table to listing_contacts
INSERT INTO public.listing_contacts (listing_id, contact_name, contact_email, contact_phone, job_title, display_order)
SELECT 
  id,
  contact_name,
  contact_email,
  contact_phone,
  contact_job_title,
  0
FROM public.listings
WHERE contact_name IS NOT NULL AND contact_name != '';

-- Set show_contacts = true for listings that had contact data migrated
UPDATE public.listings
SET show_contacts = true
WHERE contact_name IS NOT NULL AND contact_name != '';