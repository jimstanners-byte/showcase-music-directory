-- Add new SEO control columns to category_location_seo
ALTER TABLE public.category_location_seo
ADD COLUMN seo_title TEXT,
ADD COLUMN h1_override TEXT,
ADD COLUMN h2_override TEXT,
ADD COLUMN about_heading TEXT,
ADD COLUMN about_content TEXT;