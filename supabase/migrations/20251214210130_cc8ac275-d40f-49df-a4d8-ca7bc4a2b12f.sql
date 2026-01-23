-- Add ip_hash column to analytics tables for deduplication
ALTER TABLE public.page_views ADD COLUMN IF NOT EXISTS ip_hash text;
ALTER TABLE public.listing_views ADD COLUMN IF NOT EXISTS ip_hash text;
ALTER TABLE public.ad_views ADD COLUMN IF NOT EXISTS ip_hash text;
ALTER TABLE public.ad_clicks ADD COLUMN IF NOT EXISTS ip_hash text;
ALTER TABLE public.category_page_views ADD COLUMN IF NOT EXISTS ip_hash text;
ALTER TABLE public.listing_link_clicks ADD COLUMN IF NOT EXISTS ip_hash text;

-- Create indexes for faster duplicate checking
CREATE INDEX IF NOT EXISTS idx_page_views_ip_hash_viewed_at ON public.page_views(ip_hash, viewed_at);
CREATE INDEX IF NOT EXISTS idx_listing_views_ip_hash_viewed_at ON public.listing_views(ip_hash, viewed_at);
CREATE INDEX IF NOT EXISTS idx_ad_views_ip_hash_viewed_at ON public.ad_views(ip_hash, viewed_at);
CREATE INDEX IF NOT EXISTS idx_ad_clicks_ip_hash_clicked_at ON public.ad_clicks(ip_hash, clicked_at);
CREATE INDEX IF NOT EXISTS idx_category_page_views_ip_hash ON public.category_page_views(ip_hash, viewed_at);
CREATE INDEX IF NOT EXISTS idx_listing_link_clicks_ip_hash ON public.listing_link_clicks(ip_hash, clicked_at);