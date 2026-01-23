-- Add new social media URL columns to listings table
ALTER TABLE public.listings
ADD COLUMN tiktok_url text,
ADD COLUMN pinterest_url text,
ADD COLUMN whatsapp_url text,
ADD COLUMN threads_url text;