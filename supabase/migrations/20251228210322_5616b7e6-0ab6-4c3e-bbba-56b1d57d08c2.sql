-- UK County Lookup Table
CREATE TABLE IF NOT EXISTS uk_county_region_lookup (
    id SERIAL PRIMARY KEY,
    county TEXT NOT NULL UNIQUE,
    region_name TEXT NOT NULL
);

-- UK Town Lookup Table
CREATE TABLE IF NOT EXISTS uk_town_region_lookup (
    id SERIAL PRIMARY KEY,
    town TEXT NOT NULL UNIQUE,
    region_name TEXT NOT NULL
);

-- RLS policies for lookup tables (public read access)
ALTER TABLE uk_county_region_lookup ENABLE ROW LEVEL SECURITY;
ALTER TABLE uk_town_region_lookup ENABLE ROW LEVEL SECURITY;

CREATE POLICY "County lookup is publicly readable" ON uk_county_region_lookup FOR SELECT USING (true);
CREATE POLICY "Town lookup is publicly readable" ON uk_town_region_lookup FOR SELECT USING (true);
CREATE POLICY "Admins can manage county lookup" ON uk_county_region_lookup FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage town lookup" ON uk_town_region_lookup FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));