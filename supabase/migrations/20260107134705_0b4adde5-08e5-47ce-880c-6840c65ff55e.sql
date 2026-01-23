-- Add continent column to listings
ALTER TABLE public.listings ADD COLUMN IF NOT EXISTS continent TEXT;

-- Update continents based on country mappings
UPDATE public.listings SET continent = 'Europe' WHERE country IN ('United Kingdom', 'Germany', 'The Netherlands', 'France', 'Belgium', 'Spain', 'Norway', 'Sweden', 'Italy', 'Switzerland', 'Denmark', 'Ireland', 'Poland', 'Austria', 'Finland', 'Czech Republic', 'Russia', 'Portugal', 'Turkey', 'Hungary', 'Greece', 'Romania', 'Croatia', 'Slovak Republic', 'Estonia', 'Lithuania', 'Slovenia', 'Luxembourg', 'Cyprus', 'Bulgaria', 'Iceland', 'Latvia', 'Serbia', 'Malta', 'Ukraine', 'Macedonia', 'Belarus', 'Liechtenstein', 'Gibraltar', 'Monaco', 'Albania', 'Bosnia', 'Scotland');

UPDATE public.listings SET continent = 'North America' WHERE country IN ('United States', 'Canada', 'Mexico', 'Costa Rica', 'Panama', 'Guatemala', 'Honduras', 'El Salvador', 'Jamaica', 'Puerto Rico', 'Bermuda');

UPDATE public.listings SET continent = 'South America' WHERE country IN ('Brazil', 'Argentina', 'Colombia', 'Peru', 'Chile', 'Venezuela', 'Ecuador', 'Uruguay', 'Bolivia', 'Paraguay');

UPDATE public.listings SET continent = 'Asia' WHERE country IN ('Japan', 'China', 'UAE', 'United Arab Emirates', 'Israel', 'India', 'Singapore', 'Hong Kong', 'Thailand', 'South Korea', 'Korea', 'Lebanon', 'Philippines', 'Malaysia', 'Indonesia', 'Taiwan', 'Vietnam', 'Qatar', 'Oman', 'Kazakhstan', 'Azerbaijan');

UPDATE public.listings SET continent = 'Africa' WHERE country IN ('South Africa', 'Egypt', 'Morocco', 'Tunisia', 'Angola');

UPDATE public.listings SET continent = 'Oceania' WHERE country IN ('Australia', 'New Zealand');