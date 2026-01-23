-- Create table for homepage featured listings
CREATE TABLE public.homepage_featured_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  position integer NOT NULL UNIQUE CHECK (position >= 1 AND position <= 6),
  listing_id uuid REFERENCES public.listings(id) ON DELETE SET NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.homepage_featured_listings ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Homepage featured listings are publicly readable"
ON public.homepage_featured_listings
FOR SELECT
USING (true);

-- Admin write access
CREATE POLICY "Admins can insert homepage featured listings"
ON public.homepage_featured_listings
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update homepage featured listings"
ON public.homepage_featured_listings
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete homepage featured listings"
ON public.homepage_featured_listings
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert empty slots for positions 1-6
INSERT INTO public.homepage_featured_listings (position, listing_id)
VALUES (1, NULL), (2, NULL), (3, NULL), (4, NULL), (5, NULL), (6, NULL);