-- Remove single country column and add array column for multiple countries
ALTER TABLE public.ads DROP COLUMN IF EXISTS target_country;
ALTER TABLE public.ads ADD COLUMN target_countries TEXT[] DEFAULT '{}'::TEXT[];