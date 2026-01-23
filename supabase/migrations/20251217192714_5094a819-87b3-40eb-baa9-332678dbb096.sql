-- Add seo_h2_override column to categories table
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS seo_h2_override text;