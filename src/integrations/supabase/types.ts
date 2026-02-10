export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ad_clicks: {
        Row: {
          ad_id: string
          clicked_at: string
          id: string
          ip_hash: string | null
          page_url: string | null
        }
        Insert: {
          ad_id: string
          clicked_at?: string
          id?: string
          ip_hash?: string | null
          page_url?: string | null
        }
        Update: {
          ad_id?: string
          clicked_at?: string
          id?: string
          ip_hash?: string | null
          page_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_clicks_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_views: {
        Row: {
          ad_id: string
          id: string
          ip_hash: string | null
          page_url: string | null
          viewed_at: string
        }
        Insert: {
          ad_id: string
          id?: string
          ip_hash?: string | null
          page_url?: string | null
          viewed_at?: string
        }
        Update: {
          ad_id?: string
          id?: string
          ip_hash?: string | null
          page_url?: string | null
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_views_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
        ]
      }
      ads: {
        Row: {
          alt_text: string | null
          created_at: string
          end_date: string | null
          id: string
          image_url: string
          is_active: boolean
          link_url: string | null
          name: string
          position: string
          rotation_interval: number | null
          start_date: string | null
          target_category_ids: string[] | null
          target_countries: string[] | null
          target_pages: string[] | null
          updated_at: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          image_url: string
          is_active?: boolean
          link_url?: string | null
          name: string
          position: string
          rotation_interval?: number | null
          start_date?: string | null
          target_category_ids?: string[] | null
          target_countries?: string[] | null
          target_pages?: string[] | null
          updated_at?: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          image_url?: string
          is_active?: boolean
          link_url?: string | null
          name?: string
          position?: string
          rotation_interval?: number | null
          start_date?: string | null
          target_category_ids?: string[] | null
          target_countries?: string[] | null
          target_pages?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      bulk_enquiries: {
        Row: {
          id: string
          ip_address: string | null
          listing_emails: string[]
          listing_ids: string[]
          listing_names: string[]
          message: string
          rejection_reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          sender_email: string
          sender_name: string
          status: string
          submitted_at: string | null
        }
        Insert: {
          id?: string
          ip_address?: string | null
          listing_emails: string[]
          listing_ids: string[]
          listing_names: string[]
          message: string
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          sender_email: string
          sender_name: string
          status?: string
          submitted_at?: string | null
        }
        Update: {
          id?: string
          ip_address?: string | null
          listing_emails?: string[]
          listing_ids?: string[]
          listing_names?: string[]
          message?: string
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          sender_email?: string
          sender_name?: string
          status?: string
          submitted_at?: string | null
        }
        Relationships: []
      }
      cache_store: {
        Row: {
          cache_key: string
          created_at: string | null
          data: Json
          id: string
          updated_at: string | null
        }
        Insert: {
          cache_key: string
          created_at?: string | null
          data: Json
          id?: string
          updated_at?: string | null
        }
        Update: {
          cache_key?: string
          created_at?: string | null
          data?: Json
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          card_tagline: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          parent_id: string | null
          search_terms: string[] | null
          seo_about_content: string | null
          seo_about_heading: string | null
          seo_h2_override: string | null
          seo_intro_text: string | null
          seo_meta_description: string | null
          seo_meta_keywords: string | null
          seo_title: string | null
          slug: string
          updated_at: string
          url_slug: string | null
        }
        Insert: {
          card_tagline?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          parent_id?: string | null
          search_terms?: string[] | null
          seo_about_content?: string | null
          seo_about_heading?: string | null
          seo_h2_override?: string | null
          seo_intro_text?: string | null
          seo_meta_description?: string | null
          seo_meta_keywords?: string | null
          seo_title?: string | null
          slug: string
          updated_at?: string
          url_slug?: string | null
        }
        Update: {
          card_tagline?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          search_terms?: string[] | null
          seo_about_content?: string | null
          seo_about_heading?: string | null
          seo_h2_override?: string | null
          seo_intro_text?: string | null
          seo_meta_description?: string | null
          seo_meta_keywords?: string | null
          seo_title?: string | null
          slug?: string
          updated_at?: string
          url_slug?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      category_location_seo: {
        Row: {
          about_content: string | null
          about_heading: string | null
          category_id: string
          city: string | null
          country: string | null
          created_at: string
          h1_override: string | null
          h2_override: string | null
          id: string
          intro_text: string | null
          meta_description: string | null
          meta_keywords: string | null
          region: string | null
          seo_title: string | null
          updated_at: string
        }
        Insert: {
          about_content?: string | null
          about_heading?: string | null
          category_id: string
          city?: string | null
          country?: string | null
          created_at?: string
          h1_override?: string | null
          h2_override?: string | null
          id?: string
          intro_text?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          region?: string | null
          seo_title?: string | null
          updated_at?: string
        }
        Update: {
          about_content?: string | null
          about_heading?: string | null
          category_id?: string
          city?: string | null
          country?: string | null
          created_at?: string
          h1_override?: string | null
          h2_override?: string | null
          id?: string
          intro_text?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          region?: string | null
          seo_title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_location_seo_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      category_page_views: {
        Row: {
          category_id: string | null
          category_name: string
          city: string | null
          country: string | null
          id: string
          ip_hash: string | null
          viewed_at: string
        }
        Insert: {
          category_id?: string | null
          category_name: string
          city?: string | null
          country?: string | null
          id?: string
          ip_hash?: string | null
          viewed_at?: string
        }
        Update: {
          category_id?: string | null
          category_name?: string
          city?: string | null
          country?: string | null
          id?: string
          ip_hash?: string | null
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_page_views_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      claim_requests: {
        Row: {
          created_at: string
          email: string
          id: string
          ip_address: string | null
          listing_id: string
          listing_name: string
          message: string | null
          name: string
          reviewed_at: string | null
          reviewed_by: string | null
          role_at_company: string | null
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          ip_address?: string | null
          listing_id: string
          listing_name: string
          message?: string | null
          name: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          role_at_company?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          ip_address?: string | null
          listing_id?: string
          listing_name?: string
          message?: string | null
          name?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          role_at_company?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "claim_requests_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claim_requests_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings_public"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          bulk_enquiry_id: string | null
          id: string
          ip_address: string | null
          is_bulk: boolean | null
          listing_id: string
          listing_name: string
          message: string
          sender_email: string
          sender_name: string
          sent_at: string
        }
        Insert: {
          bulk_enquiry_id?: string | null
          id?: string
          ip_address?: string | null
          is_bulk?: boolean | null
          listing_id: string
          listing_name: string
          message: string
          sender_email: string
          sender_name: string
          sent_at?: string
        }
        Update: {
          bulk_enquiry_id?: string | null
          id?: string
          ip_address?: string | null
          is_bulk?: boolean | null
          listing_id?: string
          listing_name?: string
          message?: string
          sender_email?: string
          sender_name?: string
          sent_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_messages_bulk_enquiry_id_fkey"
            columns: ["bulk_enquiry_id"]
            isOneToOne: false
            referencedRelation: "bulk_enquiries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_messages_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_messages_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings_public"
            referencedColumns: ["id"]
          },
        ]
      }
      general_enquiries: {
        Row: {
          company: string | null
          id: string
          ip_address: string | null
          message: string
          sender_email: string
          sender_name: string
          subject: string
          submitted_at: string
        }
        Insert: {
          company?: string | null
          id?: string
          ip_address?: string | null
          message: string
          sender_email: string
          sender_name: string
          subject: string
          submitted_at?: string
        }
        Update: {
          company?: string | null
          id?: string
          ip_address?: string | null
          message?: string
          sender_email?: string
          sender_name?: string
          subject?: string
          submitted_at?: string
        }
        Relationships: []
      }
      homepage_featured_listings: {
        Row: {
          id: string
          listing_id: string | null
          position: number
          updated_at: string | null
        }
        Insert: {
          id?: string
          listing_id?: string | null
          position: number
          updated_at?: string | null
        }
        Update: {
          id?: string
          listing_id?: string | null
          position?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "homepage_featured_listings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "homepage_featured_listings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings_public"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_categories: {
        Row: {
          category_id: string
          created_at: string
          id: string
          listing_id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          listing_id: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          listing_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_categories_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_categories_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings_public"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_contacts: {
        Row: {
          contact_email: string | null
          contact_name: string
          contact_phone: string | null
          created_at: string
          display_order: number
          id: string
          job_title: string | null
          listing_id: string
          show_phone: boolean
          show_email: boolean
        }
        Insert: {
          contact_email?: string | null
          contact_name: string
          contact_phone?: string | null
          created_at?: string
          display_order?: number
          id?: string
          job_title?: string | null
          listing_id: string
          show_phone?: boolean
          show_email?: boolean
        }
        Update: {
          contact_email?: string | null
          contact_name?: string
          contact_phone?: string | null
          created_at?: string
          display_order?: number
          id?: string
          job_title?: string | null
          listing_id?: string
          show_phone?: boolean
          show_email?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "listing_contacts_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_contacts_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings_public"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_link_clicks: {
        Row: {
          clicked_at: string
          id: string
          ip_hash: string | null
          link_type: string
          link_url: string | null
          listing_id: string
        }
        Insert: {
          clicked_at?: string
          id?: string
          ip_hash?: string | null
          link_type: string
          link_url?: string | null
          listing_id: string
        }
        Update: {
          clicked_at?: string
          id?: string
          ip_hash?: string | null
          link_type?: string
          link_url?: string | null
          listing_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_link_clicks_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_link_clicks_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings_public"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_photos: {
        Row: {
          caption: string | null
          created_at: string
          display_order: number | null
          id: string
          is_hero: boolean | null
          listing_id: string
          photo_url: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          is_hero?: boolean | null
          listing_id: string
          photo_url: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          is_hero?: boolean | null
          listing_id?: string
          photo_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_photos_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_photos_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings_public"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_submissions: {
        Row: {
          category_ids: string[] | null
          category_names: string[] | null
          city: string
          company_name: string
          contact_name: string
          country: string
          description: string
          email: string
          id: string
          ip_address: string | null
          phone: string | null
          status: string
          submitted_at: string
          website: string | null
        }
        Insert: {
          category_ids?: string[] | null
          category_names?: string[] | null
          city: string
          company_name: string
          contact_name: string
          country: string
          description: string
          email: string
          id?: string
          ip_address?: string | null
          phone?: string | null
          status?: string
          submitted_at?: string
          website?: string | null
        }
        Update: {
          category_ids?: string[] | null
          category_names?: string[] | null
          city?: string
          company_name?: string
          contact_name?: string
          country?: string
          description?: string
          email?: string
          id?: string
          ip_address?: string | null
          phone?: string | null
          status?: string
          submitted_at?: string
          website?: string | null
        }
        Relationships: []
      }
      listing_views: {
        Row: {
          id: string
          ip_hash: string | null
          listing_id: string
          viewed_at: string
        }
        Insert: {
          id?: string
          ip_hash?: string | null
          listing_id: string
          viewed_at?: string
        }
        Update: {
          id?: string
          ip_hash?: string | null
          listing_id?: string
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_views_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_views_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings_public"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          address: string | null
          box_office_phone: string | null
          capacity: number | null
          contact_email: string | null
          contact_job_title: string | null
          contact_name: string | null
          contact_phone: string | null
          continent: string | null
          coordinates_manual: boolean | null
          country: string | null
          county: string | null
          created_at: string
          description: string | null
          email: string | null
          employee_count: string | null
          facebook_url: string | null
          geocoded_at: string | null
          id: string
          instagram_url: string | null
          is_active: boolean
          keywords: string | null
          latitude: number | null
          linkedin_url: string | null
          logo_url: string | null
          longitude: number | null
          name: string
          phone: string | null
          pinterest_url: string | null
          postcode: string | null
          primary_category_id: string | null
          region_id: number | null
          short_description: string | null
          show_contacts: boolean
          slug: string
          source_company_id: number | null
          threads_url: string | null
          tier: Database["public"]["Enums"]["listing_tier"]
          tiktok_url: string | null
          town_city: string | null
          twitter_url: string | null
          updated_at: string
          venue_capacity: number | null
          venue_type: string | null
          website: string | null
          whatsapp_url: string | null
          year_established: number | null
          youtube_url: string | null
        }
        Insert: {
          address?: string | null
          box_office_phone?: string | null
          capacity?: number | null
          contact_email?: string | null
          contact_job_title?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          continent?: string | null
          coordinates_manual?: boolean | null
          country?: string | null
          county?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          employee_count?: string | null
          facebook_url?: string | null
          geocoded_at?: string | null
          id?: string
          instagram_url?: string | null
          is_active?: boolean
          keywords?: string | null
          latitude?: number | null
          linkedin_url?: string | null
          logo_url?: string | null
          longitude?: number | null
          name: string
          phone?: string | null
          pinterest_url?: string | null
          postcode?: string | null
          primary_category_id?: string | null
          region_id?: number | null
          short_description?: string | null
          show_contacts?: boolean
          slug: string
          source_company_id?: number | null
          threads_url?: string | null
          tier?: Database["public"]["Enums"]["listing_tier"]
          tiktok_url?: string | null
          town_city?: string | null
          twitter_url?: string | null
          updated_at?: string
          venue_capacity?: number | null
          venue_type?: string | null
          website?: string | null
          whatsapp_url?: string | null
          year_established?: number | null
          youtube_url?: string | null
        }
        Update: {
          address?: string | null
          box_office_phone?: string | null
          capacity?: number | null
          contact_email?: string | null
          contact_job_title?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          continent?: string | null
          coordinates_manual?: boolean | null
          country?: string | null
          county?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          employee_count?: string | null
          facebook_url?: string | null
          geocoded_at?: string | null
          id?: string
          instagram_url?: string | null
          is_active?: boolean
          keywords?: string | null
          latitude?: number | null
          linkedin_url?: string | null
          logo_url?: string | null
          longitude?: number | null
          name?: string
          phone?: string | null
          pinterest_url?: string | null
          postcode?: string | null
          primary_category_id?: string | null
          region_id?: number | null
          short_description?: string | null
          show_contacts?: boolean
          slug?: string
          source_company_id?: number | null
          threads_url?: string | null
          tier?: Database["public"]["Enums"]["listing_tier"]
          tiktok_url?: string | null
          town_city?: string | null
          twitter_url?: string | null
          updated_at?: string
          venue_capacity?: number | null
          venue_type?: string | null
          website?: string | null
          whatsapp_url?: string | null
          year_established?: number | null
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_primary_category_id_fkey"
            columns: ["primary_category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          content: string
          created_at: string
          id: string
          is_published: boolean
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      page_content: {
        Row: {
          content: string | null
          created_at: string
          id: string
          is_active: boolean
          meta_description: string | null
          meta_keywords: string | null
          page_key: string
          title: string | null
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          meta_description?: string | null
          meta_keywords?: string | null
          page_key: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          meta_description?: string | null
          meta_keywords?: string | null
          page_key?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      page_views: {
        Row: {
          id: string
          ip_hash: string | null
          page_url: string
          viewed_at: string
        }
        Insert: {
          id?: string
          ip_hash?: string | null
          page_url: string
          viewed_at?: string
        }
        Update: {
          id?: string
          ip_hash?: string | null
          page_url?: string
          viewed_at?: string
        }
        Relationships: []
      }
      regions: {
        Row: {
          country: string
          created_at: string
          id: number
          latitude: number | null
          longitude: number | null
          region_name: string
          region_slug: string
        }
        Insert: {
          country: string
          created_at?: string
          id?: number
          latitude?: number | null
          longitude?: number | null
          region_name: string
          region_slug: string
        }
        Update: {
          country?: string
          created_at?: string
          id?: number
          latitude?: number | null
          longitude?: number | null
          region_name?: string
          region_slug?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          article_title: string
          content: string | null
          created_at: string | null
          h1: string | null
          h2s: Json | null
          id: string
          image_alt: string | null
          image_url: string | null
          internal_links: Json | null
          keyword: string | null
          listing_id: string | null
          local_focus: string | null
          meta_description: string | null
          meta_keywords: string | null
          meta_title: string | null
          og_description: string | null
          og_title: string | null
          published_at: string | null
          schema_markup: Json | null
          search_intent: string | null
          slug: string
          status: string | null
          updated_at: string | null
          word_count: number | null
        }
        Insert: {
          article_title: string
          content?: string | null
          created_at?: string | null
          h1?: string | null
          h2s?: Json | null
          id?: string
          image_alt?: string | null
          image_url?: string | null
          internal_links?: Json | null
          keyword?: string | null
          listing_id?: string | null
          local_focus?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_title?: string | null
          published_at?: string | null
          schema_markup?: Json | null
          search_intent?: string | null
          slug: string
          status?: string | null
          updated_at?: string | null
          word_count?: number | null
        }
        Update: {
          article_title?: string
          content?: string | null
          created_at?: string | null
          h1?: string | null
          h2s?: Json | null
          id?: string
          image_alt?: string | null
          image_url?: string | null
          internal_links?: Json | null
          keyword?: string | null
          listing_id?: string | null
          local_focus?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_title?: string | null
          published_at?: string | null
          schema_markup?: Json | null
          search_intent?: string | null
          slug?: string
          status?: string | null
          updated_at?: string | null
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "resources_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resources_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings_public"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: string | null
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      uk_county_region_lookup: {
        Row: {
          county: string
          id: number
          region_name: string
        }
        Insert: {
          county: string
          id?: number
          region_name: string
        }
        Update: {
          county?: string
          id?: number
          region_name?: string
        }
        Relationships: []
      }
      uk_town_region_lookup: {
        Row: {
          id: number
          region_name: string
          town: string
        }
        Insert: {
          id?: number
          region_name: string
          town: string
        }
        Update: {
          id?: number
          region_name?: string
          town?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      venue_location_seo: {
        Row: {
          about_content: string | null
          about_heading: string | null
          city: string | null
          continent: string | null
          country: string | null
          created_at: string
          h1_override: string | null
          h2_override: string | null
          id: string
          intro_text: string | null
          meta_description: string | null
          meta_keywords: string | null
          region_slug: string | null
          seo_title: string | null
          updated_at: string
        }
        Insert: {
          about_content?: string | null
          about_heading?: string | null
          city?: string | null
          continent?: string | null
          country?: string | null
          created_at?: string
          h1_override?: string | null
          h2_override?: string | null
          id?: string
          intro_text?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          region_slug?: string | null
          seo_title?: string | null
          updated_at?: string
        }
        Update: {
          about_content?: string | null
          about_heading?: string | null
          city?: string | null
          continent?: string | null
          country?: string | null
          created_at?: string
          h1_override?: string | null
          h2_override?: string | null
          id?: string
          intro_text?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          region_slug?: string | null
          seo_title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      venue_type_seo: {
        Row: {
          about_content: string | null
          about_heading: string | null
          city: string | null
          continent: string | null
          country: string | null
          created_at: string
          h1_override: string | null
          h2_override: string | null
          id: string
          intro_text: string | null
          meta_description: string | null
          meta_keywords: string | null
          region_slug: string | null
          seo_title: string | null
          updated_at: string
          venue_type: string
        }
        Insert: {
          about_content?: string | null
          about_heading?: string | null
          city?: string | null
          continent?: string | null
          country?: string | null
          created_at?: string
          h1_override?: string | null
          h2_override?: string | null
          id?: string
          intro_text?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          region_slug?: string | null
          seo_title?: string | null
          updated_at?: string
          venue_type: string
        }
        Update: {
          about_content?: string | null
          about_heading?: string | null
          city?: string | null
          continent?: string | null
          country?: string | null
          created_at?: string
          h1_override?: string | null
          h2_override?: string | null
          id?: string
          intro_text?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          region_slug?: string | null
          seo_title?: string | null
          updated_at?: string
          venue_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      listings_public: {
        Row: {
          address: string | null
          capacity: number | null
          continent: string | null
          coordinates_manual: boolean | null
          country: string | null
          county: string | null
          created_at: string | null
          description: string | null
          employee_count: string | null
          facebook_url: string | null
          geocoded_at: string | null
          id: string | null
          instagram_url: string | null
          is_active: boolean | null
          keywords: string | null
          latitude: number | null
          linkedin_url: string | null
          logo_url: string | null
          longitude: number | null
          name: string | null
          pinterest_url: string | null
          postcode: string | null
          primary_category_id: string | null
          region_id: number | null
          short_description: string | null
          slug: string | null
          source_company_id: number | null
          threads_url: string | null
          tier: Database["public"]["Enums"]["listing_tier"] | null
          tiktok_url: string | null
          town_city: string | null
          twitter_url: string | null
          updated_at: string | null
          venue_capacity: number | null
          venue_type: string | null
          website: string | null
          whatsapp_url: string | null
          year_established: number | null
          youtube_url: string | null
        }
        Insert: {
          address?: string | null
          capacity?: number | null
          continent?: string | null
          coordinates_manual?: boolean | null
          country?: string | null
          county?: string | null
          created_at?: string | null
          description?: string | null
          employee_count?: string | null
          facebook_url?: string | null
          geocoded_at?: string | null
          id?: string | null
          instagram_url?: string | null
          is_active?: boolean | null
          keywords?: string | null
          latitude?: number | null
          linkedin_url?: string | null
          logo_url?: string | null
          longitude?: number | null
          name?: string | null
          pinterest_url?: string | null
          postcode?: string | null
          primary_category_id?: string | null
          region_id?: number | null
          short_description?: string | null
          slug?: string | null
          source_company_id?: number | null
          threads_url?: string | null
          tier?: Database["public"]["Enums"]["listing_tier"] | null
          tiktok_url?: string | null
          town_city?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          venue_capacity?: number | null
          venue_type?: string | null
          website?: string | null
          whatsapp_url?: string | null
          year_established?: number | null
          youtube_url?: string | null
        }
        Update: {
          address?: string | null
          capacity?: number | null
          continent?: string | null
          coordinates_manual?: boolean | null
          country?: string | null
          county?: string | null
          created_at?: string | null
          description?: string | null
          employee_count?: string | null
          facebook_url?: string | null
          geocoded_at?: string | null
          id?: string | null
          instagram_url?: string | null
          is_active?: boolean | null
          keywords?: string | null
          latitude?: number | null
          linkedin_url?: string | null
          logo_url?: string | null
          longitude?: number | null
          name?: string | null
          pinterest_url?: string | null
          postcode?: string | null
          primary_category_id?: string | null
          region_id?: number | null
          short_description?: string | null
          slug?: string | null
          source_company_id?: number | null
          threads_url?: string | null
          tier?: Database["public"]["Enums"]["listing_tier"] | null
          tiktok_url?: string | null
          town_city?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          venue_capacity?: number | null
          venue_type?: string | null
          website?: string | null
          whatsapp_url?: string | null
          year_established?: number | null
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_primary_category_id_fkey"
            columns: ["primary_category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      get_all_listings_with_categories: {
        Args: { p_limit?: number; p_offset?: number }
        Returns: {
          address: string
          capacity: number
          category_ids: string[]
          contact_job_title: string
          continent: string
          coordinates_manual: boolean
          country: string
          county: string
          created_at: string
          description: string
          employee_count: string
          facebook_url: string
          geocoded_at: string
          id: string
          instagram_url: string
          is_active: boolean
          keywords: string
          latitude: number
          linkedin_url: string
          logo_url: string
          longitude: number
          name: string
          pinterest_url: string
          postcode: string
          primary_category_id: string
          region_id: number
          region_slug: string
          short_description: string
          slug: string
          source_company_id: number
          threads_url: string
          tier: string
          tiktok_url: string
          town_city: string
          twitter_url: string
          updated_at: string
          venue_capacity: number
          venue_type: string
          website: string
          whatsapp_url: string
          year_established: number
          youtube_url: string
        }[]
      }
      get_all_venues: {
        Args: { p_limit?: number; p_offset?: number }
        Returns: {
          continent: string
          country: string
          id: string
          latitude: number
          logo_url: string
          longitude: number
          name: string
          region_id: number
          region_slug: string
          slug: string
          tier: string
          town_city: string
          venue_capacity: number
          venue_type: string
        }[]
      }
      get_listing_by_slug: {
        Args: { p_slug: string }
        Returns: {
          address: string
          box_office_phone: string
          capacity: number
          contact_email: string
          contact_job_title: string
          contact_name: string
          contact_phone: string
          continent: string
          country: string
          county: string
          created_at: string
          description: string
          email: string
          employee_count: string
          facebook_url: string
          id: string
          instagram_url: string
          is_active: boolean
          latitude: number
          linkedin_url: string
          logo_url: string
          longitude: number
          name: string
          phone: string
          pinterest_url: string
          postcode: string
          primary_category_id: string
          region_id: number
          short_description: string
          show_contacts: boolean
          slug: string
          threads_url: string
          tier: string
          tiktok_url: string
          town_city: string
          twitter_url: string
          updated_at: string
          venue_capacity: number
          venue_type: string
          website: string
          whatsapp_url: string
          year_established: number
          youtube_url: string
        }[]
      }
      get_listings_by_category: {
        Args: {
          p_category_id: string
          p_city?: string
          p_country?: string
          p_limit?: number
          p_offset?: number
          p_region_id?: number
        }
        Returns: {
          address: string
          country: string
          description: string
          facebook_url: string
          id: string
          instagram_url: string
          is_active: boolean
          latitude: number
          linkedin_url: string
          logo_url: string
          longitude: number
          name: string
          postcode: string
          region_id: number
          short_description: string
          slug: string
          tier: string
          tiktok_url: string
          town_city: string
          twitter_url: string
          website: string
          youtube_url: string
        }[]
      }
      get_venue_continent_counts: {
        Args: never
        Returns: {
          continent: string
          count: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      listing_tier: "premier" | "enhanced" | "free"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      listing_tier: ["premier", "enhanced", "free"],
    },
  },
} as const