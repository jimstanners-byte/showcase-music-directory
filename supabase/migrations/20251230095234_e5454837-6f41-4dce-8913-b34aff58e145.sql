-- Add target_pages column to ads table for page-based targeting
ALTER TABLE public.ads
ADD COLUMN target_pages text[] DEFAULT '{}'::text[];