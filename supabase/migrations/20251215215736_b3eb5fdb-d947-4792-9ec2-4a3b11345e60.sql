-- Create resources table for SEO content pages
CREATE TABLE public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword TEXT,
  slug TEXT UNIQUE NOT NULL,
  article_title TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  image_alt TEXT,
  word_count INTEGER,
  internal_links JSONB DEFAULT '[]'::jsonb,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  og_title TEXT,
  og_description TEXT,
  h1 TEXT,
  h2s JSONB DEFAULT '[]'::jsonb,
  schema_markup JSONB,
  local_focus TEXT,
  search_intent TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Public can view published resources
CREATE POLICY "Published resources are publicly readable" 
  ON public.resources FOR SELECT USING (status = 'published');

-- Admins can view all resources
CREATE POLICY "Admins can view all resources" 
  ON public.resources FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can insert resources
CREATE POLICY "Admins can insert resources" 
  ON public.resources FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update resources
CREATE POLICY "Admins can update resources" 
  ON public.resources FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete resources
CREATE POLICY "Admins can delete resources" 
  ON public.resources FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Updated_at trigger
CREATE TRIGGER update_resources_updated_at 
  BEFORE UPDATE ON public.resources 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for resource images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resource-images', 'resource-images', true);

-- Storage policies
CREATE POLICY "Resource images are publicly accessible" 
  ON storage.objects FOR SELECT USING (bucket_id = 'resource-images');

CREATE POLICY "Admins can upload resource images" 
  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'resource-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update resource images" 
  ON storage.objects FOR UPDATE USING (bucket_id = 'resource-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete resource images" 
  ON storage.objects FOR DELETE USING (bucket_id = 'resource-images' AND has_role(auth.uid(), 'admin'::app_role));