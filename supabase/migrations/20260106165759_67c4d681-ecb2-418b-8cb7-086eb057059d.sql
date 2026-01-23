-- Insert "Unmatched" region for UK and USA
INSERT INTO public.regions (country, region_name, region_slug)
VALUES 
  ('UK', 'Unmatched', 'unmatched'),
  ('USA', 'Unmatched', 'unmatched')
ON CONFLICT DO NOTHING;