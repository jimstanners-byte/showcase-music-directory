-- Add listing_id column to resources table for listing-based article URLs
ALTER TABLE public.resources ADD COLUMN listing_id UUID REFERENCES public.listings(id) ON DELETE SET NULL;