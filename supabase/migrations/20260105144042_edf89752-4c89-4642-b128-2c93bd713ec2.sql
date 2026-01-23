-- Add seo_title column to categories table for SEO title templates
ALTER TABLE public.categories
ADD COLUMN seo_title text;