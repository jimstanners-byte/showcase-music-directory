-- Add target_country column to ads table for country-specific targeting
ALTER TABLE public.ads ADD COLUMN target_country TEXT;