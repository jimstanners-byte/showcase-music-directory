-- Add card_tagline column to categories
ALTER TABLE categories ADD COLUMN card_tagline text;

-- Populate with dummy taglines for main categories
UPDATE categories SET card_tagline = 'Professional services for live music and events' WHERE slug = 'live-event-services';
UPDATE categories SET card_tagline = 'Essential services powering the music industry' WHERE slug = 'the-business';
UPDATE categories SET card_tagline = 'Discover the perfect space for your event' WHERE slug = 'venues';
UPDATE categories SET card_tagline = 'Find the gear that makes the difference' WHERE slug = 'equipment';
UPDATE categories SET card_tagline = 'World-class recording and production spaces' WHERE slug = 'studios';
UPDATE categories SET card_tagline = 'Recording services across the United Kingdom' WHERE slug = 'uk-recording-services';
UPDATE categories SET card_tagline = 'Celebrate music and live entertainment' WHERE slug = 'festivals-events';