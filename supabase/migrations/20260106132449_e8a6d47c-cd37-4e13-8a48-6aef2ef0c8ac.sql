-- Add contact and venue columns to listings table
ALTER TABLE public.listings 
ADD COLUMN contact_name text,
ADD COLUMN contact_email text,
ADD COLUMN contact_phone text,
ADD COLUMN contact_job_title text,
ADD COLUMN capacity integer,
ADD COLUMN box_office_phone text;