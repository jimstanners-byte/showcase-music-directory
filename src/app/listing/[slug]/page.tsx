import { Metadata } from 'next';
import { supabaseServer } from '@/integrations/supabase/server';
import ListingProfile from '@/components/ListingProfile';
import {
  getListingBySlug,
  getListingCategories,
  getListingPhotos,
  getListingContacts,
  getPrimaryCategory,
  getRegionsByCountry,
} from '@/lib/data/listings';

const SITE_URL = "https://www.showcase-music.com";
const SITE_NAME = "Showcase Music Directory";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  
  // Fetch listing data server-side
  const { data: listing } = await supabaseServer
    .from('listings')
    .select(`
      id,
      name,
      slug,
      description,
      short_description,
      logo_url,
      website,
      phone,
      email,
      address,
      town_city,
      country,
      latitude,
      longitude,
      primary_category_id,
      tier,
      facebook_url,
      instagram_url,
      linkedin_url,
      twitter_url,
      youtube_url,
      tiktok_url,
      pinterest_url,
      whatsapp_url,
      threads_url,
      year_established
    `)
    .eq('slug', slug)
    .single();

  if (!listing) {
    return {
      title: 'Listing Not Found | Showcase Music Directory',
      description: 'The requested listing could not be found.',
    };
  }

  // Fetch primary category
  const { data: primaryCategory } = listing.primary_category_id 
    ? await supabaseServer
        .from('categories')
        .select('name')
        .eq('id', listing.primary_category_id)
        .single()
    : { data: null };

  // Fetch listing categories for keywords
  const { data: listingCategoriesData } = await supabaseServer
    .from('listing_categories')
    .select('categories(name)')
    .eq('listing_id', listing.id);

  const listingCategories = listingCategoriesData?.map((lc: any) => lc.categories) || [];

  // Build metadata
  const location = [listing.town_city, listing.country].filter(Boolean).join(", ");
  const primaryCategoryName = primaryCategory?.name;

  let pageTitle = listing.name;
  if (primaryCategoryName) pageTitle += ` | ${primaryCategoryName}`;
  if (location) pageTitle += ` | ${location}`;
  pageTitle += " | Showcase";

  const pageDescription =
    listing.short_description ||
    (listing.description
      ? listing.description.substring(0, 155) + "..."
      : `${listing.name} - Find contact details, location, and more in the Showcase Music Directory.`);

  const canonicalUrl = `${SITE_URL}/listing/${listing.slug}`;

  // Build keywords from category names
  const categoryKeywords = listingCategories
    ?.map((cat: any) => cat?.name)
    .filter(Boolean)
    .join(", ");

  // Build sameAs array for social profiles
  const sameAsLinks = [
    listing.website && (listing.website.startsWith("http") ? listing.website : `https://${listing.website}`),
    listing.facebook_url,
    listing.instagram_url,
    listing.linkedin_url,
    listing.twitter_url,
    listing.youtube_url,
    listing.tiktok_url,
    listing.pinterest_url,
    listing.whatsapp_url,
    listing.threads_url,
  ].filter(Boolean) as string[];

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: categoryKeywords,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: 'website',
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: listing.logo_url ? [{ url: listing.logo_url }] : undefined,
    },
    twitter: {
      card: 'summary',
      title: pageTitle,
      description: pageDescription,
      images: listing.logo_url ? [listing.logo_url] : undefined,
    },
    other: {
      // JSON-LD Structured Data
      'structured-data': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: listing.name,
        description: listing.description || listing.short_description,
        image: listing.logo_url || undefined,
        url: listing.website
          ? listing.website.startsWith("http")
            ? listing.website
            : `https://${listing.website}`
          : undefined,
        telephone: listing.phone || undefined,
        email: listing.email || undefined,
        address:
          listing.address || listing.town_city || listing.country
            ? {
                "@type": "PostalAddress",
                streetAddress: listing.address || undefined,
                addressLocality: listing.town_city || undefined,
                addressCountry: listing.country || undefined,
              }
            : undefined,
        geo:
          listing.latitude && listing.longitude
            ? {
                "@type": "GeoCoordinates",
                latitude: listing.latitude,
                longitude: listing.longitude,
              }
            : undefined,
        sameAs: sameAsLinks.length > 0 ? sameAsLinks : undefined,
        foundingDate: listing.year_established ? `${listing.year_established}-01-01` : undefined,
      }),
    },
  };
}

export default async function ListingProfilePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  // Fetch all data server-side in parallel
  const listing = await getListingBySlug(slug);

  if (!listing) {
    return <ListingProfile />;
  }

  const [categories, photos, contacts, primaryCategory, regions] = await Promise.all([
    getListingCategories(listing.id),
    getListingPhotos(listing.id),
    getListingContacts(listing.id, listing.show_contacts || false),
    getPrimaryCategory(listing.primary_category_id),
    getRegionsByCountry(listing.country),
  ]);

  return (
    <ListingProfile
      initialListing={listing}
      initialCategories={categories}
      initialPhotos={photos}
      initialContacts={contacts}
      initialPrimaryCategory={primaryCategory}
      initialRegions={regions}
    />
  );
}