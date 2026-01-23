-- Create regions table
CREATE TABLE public.regions (
  id SERIAL PRIMARY KEY,
  country TEXT NOT NULL,
  region_name TEXT NOT NULL,
  region_slug TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (country, region_name)
);

-- Create indexes on regions
CREATE INDEX idx_regions_country ON public.regions(country);
CREATE INDEX idx_regions_region_slug ON public.regions(region_slug);

-- Enable RLS on regions
ALTER TABLE public.regions ENABLE ROW LEVEL SECURITY;

-- Regions are publicly readable
CREATE POLICY "Regions are publicly readable"
ON public.regions
FOR SELECT
USING (true);

-- Admins can manage regions
CREATE POLICY "Admins can insert regions"
ON public.regions
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update regions"
ON public.regions
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete regions"
ON public.regions
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add region_id to listings table
ALTER TABLE public.listings
ADD COLUMN region_id INTEGER REFERENCES public.regions(id);

-- Create index on region_id
CREATE INDEX idx_listings_region_id ON public.listings(region_id);