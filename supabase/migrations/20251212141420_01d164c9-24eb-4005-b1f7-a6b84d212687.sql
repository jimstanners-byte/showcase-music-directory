-- Add target_category_ids array column
ALTER TABLE public.ads ADD COLUMN target_category_ids UUID[] DEFAULT '{}';

-- Migrate existing category_id data to the new array column
UPDATE public.ads SET target_category_ids = ARRAY[category_id] WHERE category_id IS NOT NULL;

-- Drop the old category_id column and its foreign key
ALTER TABLE public.ads DROP CONSTRAINT IF EXISTS ads_category_id_fkey;
ALTER TABLE public.ads DROP COLUMN category_id;