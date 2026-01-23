-- Create venue_location_seo table for location-specific SEO content
CREATE TABLE public.venue_location_seo (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  continent TEXT,
  country TEXT,
  region_slug TEXT,
  city TEXT,
  seo_title TEXT,
  h1_override TEXT,
  h2_override TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  intro_text TEXT,
  about_heading TEXT,
  about_content TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Unique constraint to prevent duplicate location entries
  CONSTRAINT venue_location_seo_unique_location UNIQUE (continent, country, region_slug, city)
);

-- Enable Row Level Security
ALTER TABLE public.venue_location_seo ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anyone can read venue location SEO content
CREATE POLICY "Venue location SEO is publicly readable"
ON public.venue_location_seo
FOR SELECT
USING (true);

-- Only admins can insert venue location SEO
CREATE POLICY "Admins can insert venue location SEO"
ON public.venue_location_seo
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update venue location SEO
CREATE POLICY "Admins can update venue location SEO"
ON public.venue_location_seo
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete venue location SEO
CREATE POLICY "Admins can delete venue location SEO"
ON public.venue_location_seo
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_venue_location_seo_updated_at
BEFORE UPDATE ON public.venue_location_seo
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();