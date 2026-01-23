-- Add social media and business info columns to listings
ALTER TABLE public.listings 
ADD COLUMN facebook_url text,
ADD COLUMN instagram_url text,
ADD COLUMN linkedin_url text,
ADD COLUMN twitter_url text,
ADD COLUMN youtube_url text,
ADD COLUMN latitude decimal(10, 8),
ADD COLUMN longitude decimal(11, 8),
ADD COLUMN year_established integer,
ADD COLUMN employee_count text;

-- Create listing_photos table for photo gallery
CREATE TABLE public.listing_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  photo_url text NOT NULL,
  caption text,
  display_order integer DEFAULT 0,
  is_hero boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS on listing_photos
ALTER TABLE public.listing_photos ENABLE ROW LEVEL SECURITY;

-- RLS policies for listing_photos
CREATE POLICY "Photos are publicly readable for active listings"
ON public.listing_photos
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.listings 
    WHERE listings.id = listing_photos.listing_id 
    AND listings.is_active = true
  )
);

CREATE POLICY "Admins can insert listing photos"
ON public.listing_photos
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update listing photos"
ON public.listing_photos
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete listing photos"
ON public.listing_photos
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create storage bucket for listing photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('listing-photos', 'listing-photos', true);

-- Storage policies for listing photos
CREATE POLICY "Listing photos are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'listing-photos');

CREATE POLICY "Admins can upload listing photos"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'listing-photos' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update listing photos"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'listing-photos' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete listing photos"
ON storage.objects
FOR DELETE
USING (bucket_id = 'listing-photos' AND has_role(auth.uid(), 'admin'::app_role));