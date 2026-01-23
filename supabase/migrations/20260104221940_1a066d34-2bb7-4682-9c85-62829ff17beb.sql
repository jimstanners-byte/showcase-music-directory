-- Create venue_type_seo table for venue type specific SEO content
CREATE TABLE public.venue_type_seo (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  venue_type text NOT NULL,
  continent text,
  country text,
  region_slug text,
  city text,
  seo_title text,
  h1_override text,
  h2_override text,
  meta_description text,
  meta_keywords text,
  intro_text text,
  about_heading text,
  about_content text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add unique constraint on venue_type + location combination
ALTER TABLE public.venue_type_seo 
ADD CONSTRAINT venue_type_seo_unique_combination 
UNIQUE (venue_type, continent, country, region_slug, city);

-- Add index for faster lookups
CREATE INDEX idx_venue_type_seo_lookup 
ON public.venue_type_seo (venue_type, continent, country, region_slug, city);

-- Enable Row Level Security
ALTER TABLE public.venue_type_seo ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Venue type SEO is publicly readable"
ON public.venue_type_seo
FOR SELECT
USING (true);

-- Admin insert access
CREATE POLICY "Admins can insert venue type SEO"
ON public.venue_type_seo
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admin update access
CREATE POLICY "Admins can update venue type SEO"
ON public.venue_type_seo
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin delete access
CREATE POLICY "Admins can delete venue type SEO"
ON public.venue_type_seo
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add updated_at trigger
CREATE TRIGGER update_venue_type_seo_updated_at
BEFORE UPDATE ON public.venue_type_seo
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();