-- Create table for location-specific SEO overrides
CREATE TABLE public.category_location_seo (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  country text,
  city text,
  meta_description text,
  meta_keywords text,
  intro_text text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(category_id, country, city)
);

-- Enable RLS
ALTER TABLE public.category_location_seo ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Location SEO is publicly readable" ON public.category_location_seo
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert location SEO" ON public.category_location_seo
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update location SEO" ON public.category_location_seo
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete location SEO" ON public.category_location_seo
  FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Updated_at trigger
CREATE TRIGGER update_category_location_seo_updated_at
  BEFORE UPDATE ON public.category_location_seo
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();