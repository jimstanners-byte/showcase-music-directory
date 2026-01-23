CREATE OR REPLACE FUNCTION get_listings_by_category(
  p_category_id uuid,
  p_limit integer DEFAULT 100000,
  p_offset integer DEFAULT 0,
  p_country text DEFAULT NULL,
  p_region_id integer DEFAULT NULL,
  p_city text DEFAULT NULL
)
RETURNS TABLE(
  id uuid,
  name text,
  slug text,
  tier text,
  country text,
  town_city text,
  region_id integer,
  logo_url text,
  short_description text,
  website text,
  is_active boolean,
  description text,
  email text,
  phone text,
  address text,
  postcode text,
  latitude numeric,
  longitude numeric,
  facebook_url text,
  instagram_url text,
  linkedin_url text,
  twitter_url text,
  youtube_url text,
  tiktok_url text
)
LANGUAGE sql
STABLE
SET search_path = 'public'
AS $$
  SELECT 
    l.id, l.name, l.slug, l.tier::text, l.country, l.town_city,
    l.region_id, l.logo_url, l.short_description, l.website, l.is_active,
    l.description, l.email, l.phone, l.address, l.postcode,
    l.latitude, l.longitude, l.facebook_url, l.instagram_url,
    l.linkedin_url, l.twitter_url, l.youtube_url, l.tiktok_url
  FROM listings l
  INNER JOIN listing_categories lc ON lc.listing_id = l.id
  WHERE lc.category_id = p_category_id
    AND l.is_active = true
    AND (p_country IS NULL OR l.country = p_country)
    AND (p_region_id IS NULL OR l.region_id = p_region_id)
    AND (p_city IS NULL OR l.town_city = p_city)
  ORDER BY 
    CASE l.tier 
      WHEN 'premier' THEN 0 
      WHEN 'enhanced' THEN 1 
      ELSE 2 
    END,
    l.name
  LIMIT p_limit
  OFFSET p_offset;
$$;