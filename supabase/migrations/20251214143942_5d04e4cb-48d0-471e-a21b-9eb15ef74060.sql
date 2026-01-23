-- Create category_page_views table for tracking category page visits with location context
CREATE TABLE public.category_page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  category_name TEXT NOT NULL,
  country TEXT,
  city TEXT,
  viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.category_page_views ENABLE ROW LEVEL SECURITY;

-- Anyone can insert views
CREATE POLICY "Anyone can insert category page views"
ON public.category_page_views
FOR INSERT
WITH CHECK (true);

-- Only admins can read
CREATE POLICY "Admins can view category page views"
ON public.category_page_views
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create listing_link_clicks table for tracking outbound link clicks
CREATE TABLE public.listing_link_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  link_type TEXT NOT NULL,
  link_url TEXT,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.listing_link_clicks ENABLE ROW LEVEL SECURITY;

-- Anyone can insert clicks
CREATE POLICY "Anyone can insert link clicks"
ON public.listing_link_clicks
FOR INSERT
WITH CHECK (true);

-- Only admins can read
CREATE POLICY "Admins can view link clicks"
ON public.listing_link_clicks
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add indexes for performance
CREATE INDEX idx_category_page_views_category_id ON public.category_page_views(category_id);
CREATE INDEX idx_category_page_views_viewed_at ON public.category_page_views(viewed_at);
CREATE INDEX idx_listing_link_clicks_listing_id ON public.listing_link_clicks(listing_id);
CREATE INDEX idx_listing_link_clicks_clicked_at ON public.listing_link_clicks(clicked_at);