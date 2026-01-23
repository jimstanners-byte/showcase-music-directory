-- Add SEO content fields to categories table
ALTER TABLE public.categories
ADD COLUMN seo_intro_text TEXT,
ADD COLUMN seo_meta_description TEXT,
ADD COLUMN seo_meta_keywords TEXT;