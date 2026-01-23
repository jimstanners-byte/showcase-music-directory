-- Drop and recreate get_all_listings_with_categories with pagination support
DROP FUNCTION IF EXISTS public.get_all_listings_with_categories();

CREATE OR REPLACE FUNCTION public.get_all_listings_with_categories(
  p_limit integer DEFAULT 100000,
  p_offset integer DEFAULT 0
)
RETURNS TABLE(
  id uuid, 
  name text, 
  slug text, 
  description text, 
  short_description text, 
  keywords text, 
  website text, 
  email text, 
  phone text, 
  address text, 
  town_city text, 
  county text, 
  postcode text, 
  country text, 
  continent text, 
  latitude double precision, 
  longitude double precision, 
  logo_url text, 
  tier text, 
  is_active boolean, 
  created_at timestamp with time zone, 
  updated_at timestamp with time zone, 
  contact_name text, 
  contact_email text, 
  contact_phone text, 
  contact_job_title text, 
  employee_count text, 
  year_established integer, 
  venue_type text, 
  venue_capacity integer, 
  capacity integer, 
  box_office_phone text, 
  facebook_url text, 
  twitter_url text, 
  instagram_url text, 
  linkedin_url text, 
  youtube_url text, 
  tiktok_url text, 
  pinterest_url text, 
  threads_url text, 
  whatsapp_url text, 
  primary_category_id uuid, 
  region_id integer, 
  source_company_id integer, 
  coordinates_manual boolean, 
  geocoded_at timestamp with time zone, 
  region_slug text, 
  category_ids uuid[]
)
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $$
  SELECT 
    l.id,
    l.name,
    l.slug,
    l.description,
    l.short_description,
    l.keywords,
    l.website,
    l.email,
    l.phone,
    l.address,
    l.town_city,
    l.county,
    l.postcode,
    l.country,
    l.continent,
    l.latitude::double precision,
    l.longitude::double precision,
    l.logo_url,
    l.tier::text,
    l.is_active,
    l.created_at,
    l.updated_at,
    l.contact_name,
    l.contact_email,
    l.contact_phone,
    l.contact_job_title,
    l.employee_count,
    l.year_established,
    l.venue_type,
    l.venue_capacity,
    l.capacity,
    l.box_office_phone,
    l.facebook_url,
    l.twitter_url,
    l.instagram_url,
    l.linkedin_url,
    l.youtube_url,
    l.tiktok_url,
    l.pinterest_url,
    l.threads_url,
    l.whatsapp_url,
    l.primary_category_id,
    l.region_id,
    l.source_company_id,
    l.coordinates_manual,
    l.geocoded_at,
    r.region_slug,
    array_agg(lc.category_id) FILTER (WHERE lc.category_id IS NOT NULL)
  FROM listings l
  LEFT JOIN regions r ON l.region_id = r.id
  LEFT JOIN listing_categories lc ON l.id = lc.listing_id
  WHERE l.is_active = true
  GROUP BY l.id, r.region_slug
  ORDER BY l.id
  LIMIT p_limit
  OFFSET p_offset
$$;

-- Drop and recreate get_all_venues with pagination support
DROP FUNCTION IF EXISTS public.get_all_venues();

CREATE OR REPLACE FUNCTION public.get_all_venues(
  p_limit integer DEFAULT 100000,
  p_offset integer DEFAULT 0
)
RETURNS TABLE(
  id uuid, 
  name text, 
  slug text, 
  venue_type text, 
  venue_capacity integer, 
  country text, 
  town_city text, 
  latitude double precision, 
  longitude double precision, 
  logo_url text, 
  tier text, 
  region_id integer, 
  continent text, 
  region_slug text
)
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $$
  SELECT DISTINCT
    l.id,
    l.name,
    l.slug,
    l.venue_type,
    l.venue_capacity,
    l.country,
    l.town_city,
    l.latitude::double precision,
    l.longitude::double precision,
    l.logo_url,
    l.tier::text,
    l.region_id,
    l.continent,
    r.region_slug
  FROM listings l
  INNER JOIN listing_categories lc ON l.id = lc.listing_id
  INNER JOIN categories c ON lc.category_id = c.id
  LEFT JOIN regions r ON l.region_id = r.id
  WHERE l.is_active = true
    AND c.url_slug = 'venues'
    AND c.parent_id IS NULL
  ORDER BY l.id
  LIMIT p_limit
  OFFSET p_offset
$$;