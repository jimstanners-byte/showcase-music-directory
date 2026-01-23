-- Add source_company_id column for tracking imported data
ALTER TABLE public.listings 
ADD COLUMN source_company_id integer UNIQUE;