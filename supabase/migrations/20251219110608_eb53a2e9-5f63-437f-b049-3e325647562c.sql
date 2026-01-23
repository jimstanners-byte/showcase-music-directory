-- Add primary_category_id column to listings table
ALTER TABLE public.listings 
ADD COLUMN primary_category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL;

-- Add index for the foreign key
CREATE INDEX idx_listings_primary_category_id ON public.listings(primary_category_id);