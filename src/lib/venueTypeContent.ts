// Venue type descriptions for programmatic SEO content
'use client';
export const VENUE_TYPE_DESCRIPTIONS: Record<string, string> = {
  "Arena": "Arenas are large-scale indoor venues designed for major concerts, sporting events, and entertainment shows. With capacities typically ranging from 5,000 to 20,000+, arenas offer professional staging, advanced acoustics, and comprehensive facilities for artists and audiences alike.",
  "Amphitheatre": "Amphitheatres are outdoor or semi-outdoor venues that combine natural settings with professional concert facilities. Their tiered seating and open-air design create unique acoustic experiences, making them popular choices for summer concerts and festivals.",
  "Bar": "Bars and pub venues offer intimate settings for live music, typically hosting acoustic acts, solo performers, and small bands. These venues provide an up-close experience where audiences can connect directly with artists in a relaxed atmosphere.",
  "Club": "Clubs are nightlife venues that host DJs, electronic music acts, and live bands. Known for their sound systems, lighting rigs, and late-night programming, clubs are essential venues for dance music, indie acts, and emerging artists.",
  "Concert Hall": "Concert halls are purpose-built venues designed for optimal acoustics and audience experience. These prestigious spaces host classical performances, orchestras, and acoustic concerts, offering superior sound quality and elegant surroundings.",
  "Convention Centre": "Convention centres are versatile multi-purpose facilities that can be configured for concerts, exhibitions, and large-scale events. Their flexible spaces accommodate varying audience sizes and production requirements.",
  "Cultural Centre": "Cultural centres are community-focused venues that host diverse programming including concerts, theatre, and arts events. These spaces often showcase local talent alongside touring artists, serving as cultural hubs for their communities.",
  "Opera House": "Opera houses are historic and architecturally significant venues that host opera, ballet, classical concerts, and theatrical productions. Known for their ornate interiors and exceptional acoustics, they represent the pinnacle of performing arts venues.",
  "Outdoor Venue": "Outdoor venues encompass parks, fields, and open-air spaces used for concerts and festivals. These locations offer flexibility for large-scale events and create memorable experiences under open skies.",
  "Performing Arts Centre": "Performing arts centres are multi-venue complexes housing theatres, concert halls, and rehearsal spaces. They support diverse programming from concerts to dance, theatre, and educational events.",
  "Stadium": "Stadiums are the largest concert venues, hosting major tours and festival events for audiences of 20,000 to 100,000+. These iconic venues create unforgettable experiences for landmark concerts and tours.",
  "Theatre": "Theatres are versatile venues hosting concerts, musicals, comedy, and dramatic performances. With fixed seating and professional staging, they offer excellent sightlines and acoustics for mid-sized audiences."
};

// Get venue type description with location context for about section
export function getVenueTypeAboutContent(venueType: string, location: string): string {
  const description = VENUE_TYPE_DESCRIPTIONS[venueType];
  if (!description) {
    return `Browse our directory of ${venueType.toLowerCase()}s in ${location} to find the perfect venue for your next event.`;
  }
  return `${description} Browse our directory of ${venueType.toLowerCase()}s in ${location} to find the perfect venue for your next event.`;
}

// Get pluralized venue type name
export function getVenueTypePlural(venueType: string): string {
  return `${venueType}s`;
}
