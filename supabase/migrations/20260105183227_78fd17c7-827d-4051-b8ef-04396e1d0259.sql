-- Add region column to category_location_seo table
ALTER TABLE category_location_seo ADD COLUMN region text;

-- Drop the old unique constraint
DROP INDEX IF EXISTS category_location_seo_unique_location;

-- Create new unique constraint including region
CREATE UNIQUE INDEX category_location_seo_unique_location 
ON category_location_seo (
  category_id,
  COALESCE(country, ''), 
  COALESCE(region, ''),
  COALESCE(city, '')
);