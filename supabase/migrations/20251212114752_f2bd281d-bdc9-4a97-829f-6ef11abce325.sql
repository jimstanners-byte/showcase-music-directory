-- Create ads table for advertisement management
CREATE TABLE public.ads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL CHECK (position IN ('leaderboard', 'banner', 'skyscraper', 'mobile-banner')),
  image_url text NOT NULL,
  link_url text,
  alt_text text,
  is_active boolean NOT NULL DEFAULT true,
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create analytics tables
CREATE TABLE public.ad_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ad_id uuid REFERENCES public.ads(id) ON DELETE CASCADE NOT NULL,
  page_url text,
  viewed_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.ad_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ad_id uuid REFERENCES public.ads(id) ON DELETE CASCADE NOT NULL,
  page_url text,
  clicked_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_url text NOT NULL,
  viewed_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.listing_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  viewed_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create page content table for CMS
CREATE TABLE public.page_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key text UNIQUE NOT NULL,
  title text,
  content text,
  meta_description text,
  meta_keywords text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listing_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- Ads policies
CREATE POLICY "Active ads are publicly readable" ON public.ads FOR SELECT USING (
  is_active = true AND 
  (start_date IS NULL OR start_date <= now()) AND 
  (end_date IS NULL OR end_date >= now())
);
CREATE POLICY "Admins can view all ads" ON public.ads FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert ads" ON public.ads FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update ads" ON public.ads FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete ads" ON public.ads FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Analytics policies - public insert, admin read
CREATE POLICY "Anyone can insert ad views" ON public.ad_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view ad views" ON public.ad_views FOR SELECT USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can insert ad clicks" ON public.ad_clicks FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view ad clicks" ON public.ad_clicks FOR SELECT USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can insert page views" ON public.page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view page views" ON public.page_views FOR SELECT USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can insert listing views" ON public.listing_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view listing views" ON public.listing_views FOR SELECT USING (has_role(auth.uid(), 'admin'));

-- Page content policies
CREATE POLICY "Active content is publicly readable" ON public.page_content FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all content" ON public.page_content FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert content" ON public.page_content FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update content" ON public.page_content FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete content" ON public.page_content FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Create indexes for analytics queries
CREATE INDEX idx_ad_views_ad_id ON public.ad_views(ad_id);
CREATE INDEX idx_ad_views_viewed_at ON public.ad_views(viewed_at);
CREATE INDEX idx_ad_clicks_ad_id ON public.ad_clicks(ad_id);
CREATE INDEX idx_ad_clicks_clicked_at ON public.ad_clicks(clicked_at);
CREATE INDEX idx_page_views_viewed_at ON public.page_views(viewed_at);
CREATE INDEX idx_listing_views_listing_id ON public.listing_views(listing_id);
CREATE INDEX idx_listing_views_viewed_at ON public.listing_views(viewed_at);

-- Create triggers for updated_at
CREATE TRIGGER update_ads_updated_at BEFORE UPDATE ON public.ads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_page_content_updated_at BEFORE UPDATE ON public.page_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for ad images
INSERT INTO storage.buckets (id, name, public) VALUES ('ad-images', 'ad-images', true);

-- Storage policies for ad images
CREATE POLICY "Ad images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'ad-images');
CREATE POLICY "Admins can upload ad images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'ad-images' AND has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update ad images" ON storage.objects FOR UPDATE USING (bucket_id = 'ad-images' AND has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete ad images" ON storage.objects FOR DELETE USING (bucket_id = 'ad-images' AND has_role(auth.uid(), 'admin'));