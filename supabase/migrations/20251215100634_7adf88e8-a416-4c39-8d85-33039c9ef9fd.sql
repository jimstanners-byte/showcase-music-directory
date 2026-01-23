-- Drop the existing constraint
ALTER TABLE ads DROP CONSTRAINT IF EXISTS ads_position_check;

-- Add new constraint with sponsor-logo included
ALTER TABLE ads ADD CONSTRAINT ads_position_check 
  CHECK (position = ANY (ARRAY[
    'sponsor-logo'::text,
    'leaderboard'::text, 
    'banner'::text, 
    'skyscraper'::text, 
    'mobile-banner'::text, 
    'featured'::text
  ]));