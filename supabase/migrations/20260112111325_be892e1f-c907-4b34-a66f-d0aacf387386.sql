-- ============================================================================
-- SECURITY MIGRATION: Protect sensitive contact data from bulk extraction
-- ============================================================================

-- First, drop the existing functions that have different return types
DROP FUNCTION IF EXISTS public.get_listings_by_category(uuid, integer, integer, text, integer, text);
DROP FUNCTION IF EXISTS public.get_all_listings_with_categories();
DROP FUNCTION IF EXISTS public.get_all_listings_with_categories(integer, integer);

-- STEP 1: Create the public view (excludes sensitive contact fields)
CREATE OR REPLACE VIEW public.listings_public AS
SELECT 
  id,
  name,
  slug,
  tier,
  description,
  short_description,
  keywords,
  logo_url,
  website,
  country,
  county,
  town_city,
  postcode,
  address,
  is_active,
  created_at,
  updated_at,
  facebook_url,
  instagram_url,
  linkedin_url,
  twitter_url,
  youtube_url,
  tiktok_url,
  pinterest_url,
  whatsapp_url,
  threads_url,
  latitude,
  longitude,
  geocoded_at,
  coordinates_manual,
  region_id,
  year_established,
  employee_count,
  venue_type,
  venue_capacity,
  capacity,
  primary_category_id,
  continent,
  source_company_id
FROM public.listings
WHERE is_active = true;

-- Grant SELECT on the view to anon and authenticated roles
GRANT SELECT ON public.listings_public TO anon, authenticated;

-- STEP 2: Lock down the base listings table - ADMIN ONLY
DROP POLICY IF EXISTS "Active listings are publicly readable" ON public.listings;

-- STEP 3: Create SECURITY DEFINER function for single-listing detail pages
CREATE OR REPLACE FUNCTION public.get_listing_by_slug(p_slug text)
RETURNS TABLE (
  id uuid,
  name text,
  slug text,
  tier text,
  description text,
  short_description text,
  logo_url text,
  website text,
  email text,
  phone text,
  country text,
  county text,
  town_city text,
  postcode text,
  address text,
  is_active boolean,
  created_at timestamptz,
  updated_at timestamptz,
  facebook_url text,
  instagram_url text,
  linkedin_url text,
  twitter_url text,
  youtube_url text,
  tiktok_url text,
  pinterest_url text,
  whatsapp_url text,
  threads_url text,
  latitude double precision,
  longitude double precision,
  region_id integer,
  year_established integer,
  employee_count text,
  venue_type text,
  venue_capacity integer,
  capacity integer,
  box_office_phone text,
  contact_name text,
  contact_email text,
  contact_phone text,
  contact_job_title text,
  primary_category_id uuid,
  continent text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    l.id,
    l.name,
    l.slug,
    l.tier::text,
    l.description,
    l.short_description,
    l.logo_url,
    l.website,
    l.email,
    l.phone,
    l.country,
    l.county,
    l.town_city,
    l.postcode,
    l.address,
    l.is_active,
    l.created_at,
    l.updated_at,
    l.facebook_url,
    l.instagram_url,
    l.linkedin_url,
    l.twitter_url,
    l.youtube_url,
    l.tiktok_url,
    l.pinterest_url,
    l.whatsapp_url,
    l.threads_url,
    l.latitude,
    l.longitude,
    l.region_id,
    l.year_established,
    l.employee_count,
    l.venue_type,
    l.venue_capacity,
    l.capacity,
    l.box_office_phone,
    l.contact_name,
    l.contact_email,
    l.contact_phone,
    l.contact_job_title,
    l.primary_category_id,
    l.continent
  FROM listings l
  WHERE l.slug = p_slug
    AND l.is_active = true
  LIMIT 1;
$$;

-- Grant execute to all users
GRANT EXECUTE ON FUNCTION public.get_listing_by_slug(text) TO anon, authenticated;

-- STEP 4: Recreate get_listings_by_category RPC (now without sensitive fields)
CREATE OR REPLACE FUNCTION public.get_listings_by_category(
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
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT 
    l.id, l.name, l.slug, l.tier::text, l.country, l.town_city,
    l.region_id, l.logo_url, l.short_description, l.website, l.is_active,
    l.description, l.address, l.postcode,
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

-- STEP 5: Recreate get_all_listings_with_categories (now without sensitive fields)
CREATE OR REPLACE FUNCTION public.get_all_listings_with_categories(
  p_limit integer DEFAULT 100000,
  p_offset integer DEFAULT 0
)
RETURNS TABLE (
  id uuid,
  name text,
  slug text,
  description text,
  short_description text,
  keywords text,
  website text,
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
  created_at timestamptz,
  updated_at timestamptz,
  contact_job_title text,
  employee_count text,
  year_established integer,
  venue_type text,
  venue_capacity integer,
  capacity integer,
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
  geocoded_at timestamptz,
  region_slug text,
  category_ids uuid[]
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    l.id,
    l.name,
    l.slug,
    l.description,
    l.short_description,
    l.keywords,
    l.website,
    l.address,
    l.town_city,
    l.county,
    l.postcode,
    l.country,
    l.continent,
    l.latitude,
    l.longitude,
    l.logo_url,
    l.tier::text,
    l.is_active,
    l.created_at,
    l.updated_at,
    l.contact_job_title,
    l.employee_count,
    l.year_established,
    l.venue_type,
    l.venue_capacity,
    l.capacity,
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
  LIMIT p_limit
  OFFSET p_offset;
$$;