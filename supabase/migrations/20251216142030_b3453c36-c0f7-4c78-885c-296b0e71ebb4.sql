-- Add About section fields to categories table
ALTER TABLE categories 
ADD COLUMN seo_about_heading TEXT,
ADD COLUMN seo_about_content TEXT;