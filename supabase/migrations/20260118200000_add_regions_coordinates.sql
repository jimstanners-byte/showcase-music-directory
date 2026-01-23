-- Add latitude and longitude columns to regions table for proximity filtering
-- This allows city-regions (London, NYC) to have center coordinates for geographic searches

ALTER TABLE regions 
ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;

-- Add index for potential future geographic queries
CREATE INDEX IF NOT EXISTS idx_regions_coordinates 
ON regions (latitude, longitude) 
WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

-- Add comments
COMMENT ON COLUMN regions.latitude IS 'Latitude coordinate for region center (used for proximity filtering)';
COMMENT ON COLUMN regions.longitude IS 'Longitude coordinate for region center (used for proximity filtering)';

-- Populate coordinates for city-regions
-- London
UPDATE regions 
SET latitude = 51.5074, longitude = -0.1276 
WHERE region_slug = 'london' AND country = 'UK';

-- New York
UPDATE regions 
SET latitude = 40.7128, longitude = -74.0060 
WHERE region_slug = 'new-york' AND country = 'USA';
