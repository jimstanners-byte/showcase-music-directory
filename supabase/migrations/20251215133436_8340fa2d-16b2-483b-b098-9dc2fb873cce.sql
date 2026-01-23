-- Add check constraint to limit short_description to 80 characters
ALTER TABLE listings 
ADD CONSTRAINT short_description_length 
CHECK (char_length(short_description) <= 80 OR short_description IS NULL);