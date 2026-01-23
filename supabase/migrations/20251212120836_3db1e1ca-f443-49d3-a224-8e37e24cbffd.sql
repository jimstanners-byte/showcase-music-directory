-- Add category targeting and rotation interval to ads table
ALTER TABLE public.ads 
ADD COLUMN category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
ADD COLUMN rotation_interval integer DEFAULT 6;

-- Create index for faster category lookups
CREATE INDEX idx_ads_category_id ON public.ads(category_id);
CREATE INDEX idx_ads_position_active ON public.ads(position, is_active);