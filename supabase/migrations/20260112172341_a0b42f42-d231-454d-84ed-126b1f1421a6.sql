-- Fix get_all_venues RPC to check slug OR url_slug (url_slug is null for venues category)
CREATE OR REPLACE FUNCTION public.get_all_venues(p_limit integer DEFAULT 100000, p_offset integer DEFAULT 0)
 RETURNS TABLE(id uuid, name text, slug text, venue_type text, venue_capacity integer, country text, town_city text, latitude double precision, longitude double precision, logo_url text, tier text, region_id integer, continent text, region_slug text)
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
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
    AND (c.url_slug = 'venues' OR c.slug = 'venues')
    AND c.parent_id IS NULL
  ORDER BY l.id
  LIMIT p_limit
  OFFSET p_offset
$function$;

-- Also fix get_venue_continent_counts which has the same issue
CREATE OR REPLACE FUNCTION public.get_venue_continent_counts()
 RETURNS TABLE(continent text, count bigint)
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
  SELECT 
    l.continent,
    COUNT(DISTINCT l.id)
  FROM listings l
  INNER JOIN listing_categories lc ON l.id = lc.listing_id
  INNER JOIN categories c ON lc.category_id = c.id
  WHERE l.is_active = true
    AND (c.url_slug = 'venues' OR c.slug = 'venues')
    AND c.parent_id IS NULL
    AND l.continent IS NOT NULL
  GROUP BY l.continent
$function$;