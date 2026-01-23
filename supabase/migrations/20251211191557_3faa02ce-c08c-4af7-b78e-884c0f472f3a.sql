-- Add search_terms column to categories for enhanced search
ALTER TABLE categories ADD COLUMN search_terms text[] DEFAULT '{}';