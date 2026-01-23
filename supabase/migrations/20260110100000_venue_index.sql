-- Index for continent-based venue queries
   CREATE INDEX IF NOT EXISTS idx_listings_continent_venue 
   ON listings(continent, is_active) 
   WHERE venue_type IS NOT NULL;

   -- Composite index for venue filtering
   CREATE INDEX IF NOT EXISTS idx_listings_venue_filters 
   ON listings(is_active, continent, country, region_id, venue_type);
