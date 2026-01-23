-- Step 1: Delete duplicate venue_location_seo records, keeping only the most recent one for each location combination
DELETE FROM venue_location_seo
WHERE id NOT IN (
  SELECT DISTINCT ON (
    COALESCE(continent, ''), 
    COALESCE(country, ''), 
    COALESCE(region_slug, ''), 
    COALESCE(city, '')
  ) id
  FROM venue_location_seo
  ORDER BY 
    COALESCE(continent, ''), 
    COALESCE(country, ''), 
    COALESCE(region_slug, ''), 
    COALESCE(city, ''),
    updated_at DESC
);

-- Step 2: Drop the existing unique CONSTRAINT that doesn't handle NULLs properly
ALTER TABLE venue_location_seo DROP CONSTRAINT IF EXISTS venue_location_seo_unique_location;

-- Step 3: Create a new unique index that properly handles NULL values using COALESCE
CREATE UNIQUE INDEX venue_location_seo_unique_location 
ON venue_location_seo (
  COALESCE(continent, ''), 
  COALESCE(country, ''), 
  COALESCE(region_slug, ''), 
  COALESCE(city, '')
);