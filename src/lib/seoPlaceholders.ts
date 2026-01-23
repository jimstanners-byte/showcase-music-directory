'use client';

/**
 * SEO Placeholder Utilities
 * 
 * Supports two placeholders:
 * - {location} — replaces with just the location name (e.g., "London, United Kingdom")
 * - {in_location} — replaces with "in " + location name (e.g., "in London, United Kingdom")
 * 
 * On landing pages (no location), both placeholders are replaced with empty strings
 * and any resulting double spaces or awkward punctuation is cleaned up.
 */

/**
 * Replace location placeholders in a template string
 * @param template - The template string containing {location} and/or {in_location} placeholders
 * @param location - The location string (e.g., "Paris, France") or empty/undefined for landing pages
 * @returns The processed string with placeholders replaced and cleaned up
 */
export function replaceLocationPlaceholders(template: string | null | undefined, location: string): string {
  if (!template) return '';
  
  let result = template;
  
  if (location) {
    // Replace {in_location} with "in " + location
    result = result.replace(/\{in_location\}/gi, `in ${location}`);
    // Replace {location} with just the location
    result = result.replace(/\{location\}/gi, location);
  } else {
    // Landing page: remove placeholders entirely
    result = result.replace(/\{in_location\}/gi, '');
    result = result.replace(/\{location\}/gi, '');
  }
  
  // Clean up double spaces
  result = result.replace(/\s{2,}/g, ' ');
  
  // Clean up awkward punctuation patterns: " ." " ," " |" "| " at edges
  result = result.replace(/\s+\./g, '.');
  result = result.replace(/\s+,/g, ',');
  result = result.replace(/\s+\|/g, ' |');
  result = result.replace(/\|\s+/g, '| ');
  
  // Trim leading/trailing whitespace
  result = result.trim();
  
  return result;
}

/**
 * Preview how a template will look on different page types
 * @param template - The template string containing placeholders
 * @returns Object with landing, country, and city previews
 */
export function getPlaceholderPreviews(template: string) {
  return {
    landing: replaceLocationPlaceholders(template, ''),
    country: replaceLocationPlaceholders(template, 'France'),
    city: replaceLocationPlaceholders(template, 'Paris, France'),
  };
}
