-- Add geocoding tracking columns
ALTER TABLE listings ADD COLUMN geocoded_at TIMESTAMPTZ;
ALTER TABLE listings ADD COLUMN coordinates_manual BOOLEAN DEFAULT FALSE;

-- Create index for map queries (only on rows with coordinates)
CREATE INDEX idx_listings_coordinates ON listings(latitude, longitude) 
WHERE latitude IS NOT NULL AND longitude IS NOT NULL;