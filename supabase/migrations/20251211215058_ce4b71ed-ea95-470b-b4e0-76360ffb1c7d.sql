-- Add url_slug column for custom URL paths
ALTER TABLE public.categories ADD COLUMN url_slug text;

-- Create unique index for URL routing (only on non-null values)
CREATE UNIQUE INDEX categories_url_slug_key ON public.categories(url_slug) WHERE url_slug IS NOT NULL;