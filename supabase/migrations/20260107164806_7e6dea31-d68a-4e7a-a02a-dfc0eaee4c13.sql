-- Create cache_store table for caching listing and venue data
CREATE TABLE public.cache_store (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_key text UNIQUE NOT NULL,
  data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cache_store ENABLE ROW LEVEL SECURITY;

-- Anyone can read cache data (public access for performance)
CREATE POLICY "Cache data is publicly readable" 
ON public.cache_store 
FOR SELECT 
USING (true);

-- Only service role (edge functions) can insert/update/delete
-- Edge functions use service_role key which bypasses RLS
-- No explicit policies needed for service role access

-- Create index for faster cache_key lookups
CREATE INDEX idx_cache_store_cache_key ON public.cache_store(cache_key);
CREATE INDEX idx_cache_store_updated_at ON public.cache_store(updated_at);