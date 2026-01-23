-- Drop the existing check constraint and recreate with 'featured' position
ALTER TABLE public.ads DROP CONSTRAINT IF EXISTS ads_position_check;
ALTER TABLE public.ads ADD CONSTRAINT ads_position_check 
  CHECK (position IN ('leaderboard', 'banner', 'skyscraper', 'mobile-banner', 'featured'));