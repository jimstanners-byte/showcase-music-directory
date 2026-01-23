-- Add venue-specific fields to listings table
ALTER TABLE public.listings 
ADD COLUMN IF NOT EXISTS venue_type text,
ADD COLUMN IF NOT EXISTS venue_capacity integer;

-- Add index for venue filtering
CREATE INDEX IF NOT EXISTS idx_listings_venue_type ON public.listings(venue_type) WHERE venue_type IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_listings_venue_capacity ON public.listings(venue_capacity) WHERE venue_capacity IS NOT NULL;