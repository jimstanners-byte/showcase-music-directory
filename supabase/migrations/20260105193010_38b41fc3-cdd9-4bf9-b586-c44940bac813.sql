
-- Drop the old constraint that doesn't include region
ALTER TABLE category_location_seo 
DROP CONSTRAINT IF EXISTS category_location_seo_category_id_country_city_key;

-- Create new constraint that includes region (using COALESCE to handle NULLs)
ALTER TABLE category_location_seo 
ADD CONSTRAINT category_location_seo_unique 
UNIQUE (category_id, country, region, city);
