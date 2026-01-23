export type ListingTier = 'premier' | 'enhanced' | 'free';

export interface Category {
  id: string;
  name: string;
  slug: string;
  url_slug: string | null;
  parent_id: string | null;
  icon: string | null;
  search_terms: string[] | null;
  description: string | null;
  card_tagline: string | null;
  seo_intro_text: string | null;
  seo_about_heading: string | null;
  seo_about_content: string | null;
  seo_h2_override: string | null;
  seo_meta_description: string | null;
  seo_meta_keywords: string | null;
  seo_title: string | null;
  created_at: string;
  updated_at: string;
}

// Base listing fields shared by both public view and full listing
interface ListingBase {
  id: string;
  name: string;
  slug: string;
  tier: ListingTier;
  description: string | null;
  short_description: string | null;
  logo_url: string | null;
  website: string | null;
  country: string | null;
  county: string | null;
  town_city: string | null;
  postcode: string | null;
  address: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Social media
  facebook_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  youtube_url: string | null;
  tiktok_url: string | null;
  pinterest_url: string | null;
  whatsapp_url: string | null;
  threads_url: string | null;
  // Location
  latitude: number | null;
  longitude: number | null;
  geocoded_at: string | null;
  coordinates_manual: boolean | null;
  region_id: number | null;
  // Business info
  year_established: number | null;
  employee_count: string | null;
  venue_type: string | null;
  venue_capacity?: number | null;
  capacity: number | null;
  // SEO
  primary_category_id: string | null;
  continent: string | null;
  keywords?: string | null;
  source_company_id?: number | null;
  // Contacts visibility
  show_contacts?: boolean;
}

// Public listing view - NO sensitive contact data
// Used for category pages, search results, lists
// email/phone are optional and will be undefined when coming from listings_public view
export interface ListingPublic extends ListingBase {
  email?: string | null;
  phone?: string | null;
}

// Full listing with contact data - ONLY for detail pages via RPC
export interface Listing extends ListingBase {
  email: string | null;
  phone: string | null;
  box_office_phone?: string | null;
  contact_name?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  contact_job_title?: string | null;
}

export interface ListingPhoto {
  id: string;
  listing_id: string;
  photo_url: string;
  caption: string | null;
  display_order: number;
  is_hero: boolean;
  created_at: string;
}

export interface ListingCategory {
  id: string;
  listing_id: string;
  category_id: string;
  created_at: string;
}

export interface ListingContact {
  id: string;
  listing_id: string;
  contact_name: string;
  contact_email: string | null;
  contact_phone: string | null;
  job_title: string | null;
  display_order: number;
  created_at: string;
}

export interface ListingWithCategories extends Listing {
  categories?: Category[];
}

export interface News {
  id: string;
  title: string;
  content: string;
  slug: string;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export type AppRole = 'admin' | 'moderator' | 'user';

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
}
