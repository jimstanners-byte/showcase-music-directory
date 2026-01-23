-- Delete duplicate category_location_seo records, keeping the most recent one
DELETE FROM category_location_seo
WHERE id NOT IN (
  SELECT DISTINCT ON (category_id, COALESCE(country, ''), COALESCE(city, '')) id
  FROM category_location_seo
  ORDER BY category_id, COALESCE(country, ''), COALESCE(city, ''), updated_at DESC
);

-- Drop old constraint if exists and create new one with COALESCE
DROP INDEX IF EXISTS category_location_seo_unique_location;
CREATE UNIQUE INDEX category_location_seo_unique_location 
ON category_location_seo (
  category_id,
  COALESCE(country, ''), 
  COALESCE(city, '')
);