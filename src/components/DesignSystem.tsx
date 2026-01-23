'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { TierBadge } from "@/components/TierBadge";
import { CategoryCard } from "@/components/CategoryCard";
import { ListingCard } from "@/components/ListingCard";
import { AdBanner } from "@/components/AdBanner";
import { AdSkyscraper } from "@/components/AdSkyscraper";
import { Category, Listing } from "@/types/database";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Music,
  Mic,
  Speaker,
  Building,
  Briefcase,
  Radio,
  MapPin,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ExternalLink,
  Star,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Loader2,
  Plus,
  Minus,
  Edit,
  Trash2,
  Download,
  Upload,
  Share,
  Heart,
  Bookmark,
  Filter,
  Grid,
  List,
  Eye,
  EyeOff,
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
  Home,
  Settings,
  User,
  LogOut,
  Camera,
  Image,
  FileText,
  Headphones,
  Video,
  Printer,
} from "lucide-react";

const DesignSystem = () => {
  const [activeLetter, setActiveLetter] = useState<string>("");

  const handlePrint = () => {
    window.print();
  };

  // Sample category data
  const sampleCategory: Category = {
    id: "cat-1",
    name: "Recording Studios",
    slug: "recording-studios",
    url_slug: "recording-studios",
    parent_id: null,
    description: "Professional recording facilities",
    card_tagline: "World-class recording and production spaces",
    icon: "mic",
    search_terms: null,
    seo_intro_text: null,
    seo_about_heading: null,
    seo_about_content: null,
    seo_h2_override: null,
    seo_meta_description: null,
    seo_meta_keywords: null,
    seo_title: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // Sample listing data
  const sampleListing: Listing = {
    id: "sample-1",
    name: "Sample Music Studio",
    slug: "sample-music-studio",
    short_description: "Professional recording studio with state-of-the-art equipment",
    description: null,
    logo_url: null,
    town_city: "London",
    county: null,
    postcode: null,
    country: "United Kingdom",
    address: null,
    tier: "premier",
    website: "https://example.com",
    email: "info@example.com",
    phone: "+44 123 456 789",
    is_active: true,
    facebook_url: null,
    instagram_url: null,
    linkedin_url: null,
    twitter_url: null,
    youtube_url: null,
    tiktok_url: null,
    pinterest_url: null,
    whatsapp_url: null,
    threads_url: null,
    latitude: null,
    longitude: null,
    geocoded_at: null,
    coordinates_manual: false,
    region_id: null,
    year_established: null,
    employee_count: null,
    venue_type: null,
    capacity: null,
    primary_category_id: null,
    continent: null,
    show_contacts: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return (
    <div className="min-h-screen bg-background print:bg-white">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 px-4 print:py-4 print:bg-white print:text-foreground print:border-b-2 print:border-primary">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold print:text-2xl">Entourage Pro Design System</h1>
              <p className="text-primary-foreground/80 mt-2 print:text-muted-foreground">
                Live visual and specification reference document
              </p>
            </div>
            <Button
              onClick={handlePrint}
              variant="secondary"
              className="print:hidden"
            >
              <Printer className="mr-2 h-4 w-4" />
              Download as PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4 space-y-12 print:space-y-8">
        {/* Table of Contents */}
        <section className="print:break-after-page">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Table of Contents</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {[
              "1. Color Palette",
              "2. Typography",
              "3. Buttons",
              "4. Form Elements",
              "5. Cards",
              "6. Badges & Chips",
              "7. Icons",
              "8. Navigation",
              "9. Advertising Slots",
              "10. Custom Classes",
              "11. Special Components",
            ].map((item) => (
              <div key={item} className="py-1">{item}</div>
            ))}
          </div>
        </section>

        {/* 1. Color Palette */}
        <section className="print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">1. Color Palette</h2>
          
          <div className="space-y-6">
            {/* Primary Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Primary Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <LiveColorSwatch
                  name="Primary (Magenta)"
                  cssVar="--primary"
                  usage="Main brand color, primary buttons, links"
                />
                <LiveColorSwatch
                  name="Primary Foreground"
                  cssVar="--primary-foreground"
                  usage="Text on primary backgrounds"
                />
                <LiveColorSwatch
                  name="Secondary"
                  cssVar="--secondary"
                  usage="Secondary buttons, subtle backgrounds"
                />
                <LiveColorSwatch
                  name="Accent (Cyan)"
                  cssVar="--accent"
                  usage="Hover states, highlights, accent elements"
                />
              </div>
            </div>

            {/* Background Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Background Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <LiveColorSwatch
                  name="Background"
                  cssVar="--background"
                  usage="Main page background"
                />
                <LiveColorSwatch
                  name="Card"
                  cssVar="--card"
                  usage="Card backgrounds"
                />
                <LiveColorSwatch
                  name="Popover"
                  cssVar="--popover"
                  usage="Popover, dropdown backgrounds"
                />
                <LiveColorSwatch
                  name="Muted"
                  cssVar="--muted"
                  usage="Muted backgrounds, disabled states"
                />
              </div>
            </div>

            {/* Text & Border Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Text & Border Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <LiveColorSwatch
                  name="Foreground"
                  cssVar="--foreground"
                  usage="Primary text"
                />
                <LiveColorSwatch
                  name="Muted Foreground"
                  cssVar="--muted-foreground"
                  usage="Secondary text, placeholders"
                />
                <LiveColorSwatch
                  name="Border"
                  cssVar="--border"
                  usage="Borders, dividers"
                />
                <LiveColorSwatch
                  name="Ring"
                  cssVar="--ring"
                  usage="Focus ring color"
                />
              </div>
            </div>

            {/* Accent Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Accent Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <LiveColorSwatch
                  name="Accent Cyan"
                  cssVar="--accent-cyan"
                  usage="Secondary accent, links"
                />
                <LiveColorSwatch
                  name="Accent Violet"
                  cssVar="--accent-violet"
                  usage="Tertiary accent"
                />
                <LiveColorSwatch
                  name="Accent Teal"
                  cssVar="--accent-teal"
                  usage="Success-adjacent accent"
                />
              </div>
            </div>

            {/* Tier Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Tier Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <LiveColorSwatch
                  name="Premier"
                  cssVar="--tier-premier"
                  usage="Premier tier badges and highlights"
                />
                <LiveColorSwatch
                  name="Enhanced"
                  cssVar="--tier-enhanced"
                  usage="Enhanced tier badges"
                />
                <LiveColorSwatch
                  name="Free"
                  cssVar="--tier-free"
                  usage="Free tier badges"
                />
              </div>
            </div>

            {/* Sidebar Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Sidebar Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <LiveColorSwatch
                  name="Sidebar Background"
                  cssVar="--sidebar-background"
                  usage="Sidebar background"
                />
                <LiveColorSwatch
                  name="Sidebar Accent"
                  cssVar="--sidebar-accent"
                  usage="Sidebar hover/active states"
                />
                <LiveColorSwatch
                  name="Sidebar Border"
                  cssVar="--sidebar-border"
                  usage="Sidebar dividers"
                />
              </div>
            </div>

            {/* Status Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Status Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <LiveColorSwatch
                  name="Destructive"
                  cssVar="--destructive"
                  usage="Error states, delete actions"
                />
              </div>
            </div>

            {/* Glow Shadows */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Glow Shadows</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 rounded-lg bg-card" style={{ boxShadow: 'var(--shadow-glow-pink)' }}>
                  <p className="text-sm font-semibold">Pink Glow</p>
                  <code className="text-xs text-muted-foreground">--shadow-glow-pink</code>
                </div>
                <div className="p-6 rounded-lg bg-card" style={{ boxShadow: 'var(--shadow-glow-cyan)' }}>
                  <p className="text-sm font-semibold">Cyan Glow</p>
                  <code className="text-xs text-muted-foreground">--shadow-glow-cyan</code>
                </div>
                <div className="p-6 rounded-lg bg-card" style={{ boxShadow: 'var(--shadow-glow-violet)' }}>
                  <p className="text-sm font-semibold">Violet Glow</p>
                  <code className="text-xs text-muted-foreground">--shadow-glow-violet</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Typography */}
        <section className="print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">2. Typography</h2>
          
          <div className="space-y-6">
            {/* Font Families */}
            <div className="bg-muted/50 p-4 rounded-lg space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Display Font</h3>
                <p className="font-display text-3xl uppercase tracking-wider">Bebas Neue</p>
                <code className="text-sm text-muted-foreground mt-2 block">
                  font-family: var(--font-display) → 'Bebas Neue', 'Oswald', sans-serif
                </code>
                <p className="text-sm text-muted-foreground mt-1">Used for: H1, H2, section headings, display text</p>
              </div>
              <div className="border-t border-border pt-4">
                <h3 className="text-lg font-semibold mb-2">Body Font</h3>
                <p className="font-sans text-lg">Montserrat</p>
                <code className="text-sm text-muted-foreground mt-2 block">
                  font-family: var(--font-sans) → 'Montserrat', ui-sans-serif, system-ui, sans-serif
                </code>
                <p className="text-sm text-muted-foreground mt-1">Used for: Body text, H3-H6, UI elements</p>
              </div>
              <div className="border-t border-border pt-4">
                <h3 className="text-lg font-semibold mb-2">Monospace Font</h3>
                <p className="font-mono text-lg">Space Mono</p>
                <code className="text-sm text-muted-foreground mt-2 block">
                  font-family: var(--font-mono) → 'Space Mono', ui-monospace, monospace
                </code>
                <p className="text-sm text-muted-foreground mt-1">Used for: Code, technical values</p>
              </div>
            </div>

            {/* Headings */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Headings</h3>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-24 flex-shrink-0">
                      <span className="text-sm font-medium text-muted-foreground">H1</span>
                    </div>
                    <div className="flex-1">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl">Display Heading</h1>
                    </div>
                    <div className="md:w-80 flex-shrink-0 md:text-right">
                      <code className="text-xs text-muted-foreground">font-display, uppercase, tracking-wider</code>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-24 flex-shrink-0">
                      <span className="text-sm font-medium text-muted-foreground">H2</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl md:text-4xl">Section Heading</h2>
                    </div>
                    <div className="md:w-80 flex-shrink-0 md:text-right">
                      <code className="text-xs text-muted-foreground">font-display, uppercase, tracking-wide</code>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-24 flex-shrink-0">
                      <span className="text-sm font-medium text-muted-foreground">H3</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold tracking-tight">Subsection Heading</h3>
                    </div>
                    <div className="md:w-80 flex-shrink-0 md:text-right">
                      <code className="text-xs text-muted-foreground">font-sans, font-bold, tracking-tight</code>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-24 flex-shrink-0">
                      <span className="text-sm font-medium text-muted-foreground">H4-H6</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold tracking-tight">Card/Component Heading</h4>
                    </div>
                    <div className="md:w-80 flex-shrink-0 md:text-right">
                      <code className="text-xs text-muted-foreground">font-sans, font-bold, tracking-tight</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Body Text */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Body Text</h3>
              <div className="space-y-4">
                <TypographySample
                  element="Body Large"
                  className="text-lg"
                  specs="text-lg (18px), font-normal (400), line-height 1.75"
                />
                <TypographySample
                  element="Body"
                  className="text-base"
                  specs="text-base (16px), font-normal (400), line-height 1.5"
                />
                <TypographySample
                  element="Body Small"
                  className="text-sm"
                  specs="text-sm (14px), font-normal (400), line-height 1.43"
                />
                <TypographySample
                  element="Caption"
                  className="text-xs text-muted-foreground"
                  specs="text-xs (12px), text-muted-foreground"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Buttons */}
        <section className="print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">3. Buttons</h2>
          
          <div className="space-y-8">
            {/* Custom EP Buttons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Entourage Pro Custom Buttons</h3>
              <div className="space-y-4">
                <ComponentSpec
                  name="EP Primary Button (.btn-ep)"
                  specs="Gradient background (magenta), glow on hover, translateY(-1px) lift effect"
                >
                  <button className="btn-ep">
                    <Star className="h-4 w-4" />
                    Primary CTA
                  </button>
                </ComponentSpec>

                <ComponentSpec
                  name="EP Outline Button (.btn-ep-outline)"
                  specs="Transparent with primary border, fills on hover with glow"
                >
                  <button className="btn-ep-outline">
                    <Plus className="h-4 w-4" />
                    Secondary Action
                  </button>
                </ComponentSpec>
              </div>
            </div>

            {/* Shadcn Button Variants */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Shadcn Button Variants</h3>
              <div className="space-y-4">
                <ComponentSpec
                  name="Primary Button"
                  specs="Height: 40px | Padding: 16px horizontal | Border-radius: 6px | Font: 14px medium"
                >
                  <Button>Primary Button</Button>
                </ComponentSpec>

                <ComponentSpec
                  name="Secondary Button"
                  specs="Same dimensions | Background: secondary | Text: secondary-foreground"
                >
                  <Button variant="secondary">Secondary Button</Button>
                </ComponentSpec>

                <ComponentSpec
                  name="Outline Button"
                  specs="Same dimensions | Border: 1px input | Background: transparent → accent on hover"
                >
                  <Button variant="outline">Outline Button</Button>
                </ComponentSpec>

                <ComponentSpec
                  name="Ghost Button"
                  specs="Same dimensions | Background: transparent → accent on hover"
                >
                  <Button variant="ghost">Ghost Button</Button>
                </ComponentSpec>

                <ComponentSpec
                  name="Destructive Button"
                  specs="Same dimensions | Background: destructive (red)"
                >
                  <Button variant="destructive">Destructive Button</Button>
                </ComponentSpec>

                <ComponentSpec
                  name="Link Button"
                  specs="No background | Text: primary | Underline on hover"
                >
                  <Button variant="link">Link Button</Button>
                </ComponentSpec>
              </div>
            </div>

            {/* Button Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
              <div className="space-y-4">
                <ComponentSpec
                  name="Small Button"
                  specs="Height: 36px | Padding: 12px horizontal | Font: 14px"
                >
                  <Button size="sm">Small Button</Button>
                </ComponentSpec>

                <ComponentSpec
                  name="Default Button"
                  specs="Height: 40px | Padding: 16px horizontal | Font: 14px"
                >
                  <Button size="default">Default Button</Button>
                </ComponentSpec>

                <ComponentSpec
                  name="Large Button"
                  specs="Height: 44px | Padding: 32px horizontal | Font: 14px"
                >
                  <Button size="lg">Large Button</Button>
                </ComponentSpec>

                <ComponentSpec
                  name="Icon Button"
                  specs="Size: 40x40px | Square aspect ratio"
                >
                  <Button size="icon"><Search className="h-4 w-4" /></Button>
                </ComponentSpec>
              </div>
            </div>

            {/* Button with Icons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Buttons with Icons</h3>
              <div className="space-y-4">
                <ComponentSpec
                  name="Icon Left"
                  specs="Icon: 16x16px | Gap: 8px between icon and text"
                >
                  <Button><Plus className="mr-2 h-4 w-4" /> Add Item</Button>
                </ComponentSpec>

                <ComponentSpec
                  name="Icon Right"
                  specs="Icon: 16x16px | Gap: 8px between text and icon"
                >
                  <Button>Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </ComponentSpec>

                <ComponentSpec
                  name="Loading State"
                  specs="Spinner icon replaces content or appears left"
                >
                  <Button disabled><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...</Button>
                </ComponentSpec>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Form Elements */}
        <section className="print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">4. Form Elements</h2>
          
          <div className="space-y-8">
            {/* Text Input */}
            <ComponentSpec
              name="Text Input"
              specs="Height: 40px | Padding: 12px | Border: 1px input | Border-radius: 6px | Font: 14px | Focus: ring-2 ring-ring"
            >
              <div className="w-64">
                <Input placeholder="Enter text..." />
              </div>
            </ComponentSpec>

            {/* Input with Label */}
            <ComponentSpec
              name="Input with Label"
              specs="Label: 14px medium | Gap: 8px between label and input"
            >
              <div className="w-64 space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
            </ComponentSpec>

            {/* Textarea */}
            <ComponentSpec
              name="Textarea"
              specs="Min-height: 80px | Same border/padding as input | Resizable vertically"
            >
              <div className="w-64">
                <Textarea placeholder="Enter your message..." />
              </div>
            </ComponentSpec>

            {/* Select */}
            <ComponentSpec
              name="Select Dropdown"
              specs="Height: 40px | Same styling as input | Chevron icon right-aligned"
            >
              <div className="w-64">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </ComponentSpec>

            {/* Search Input */}
            <ComponentSpec
              name="Search Input"
              specs="Same as text input | Search icon (20x20) positioned left with 12px padding"
            >
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="Search..." />
              </div>
            </ComponentSpec>
          </div>
        </section>

        {/* 5. Cards */}
        <section className="print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">5. Cards</h2>
          
          <div className="space-y-8">
            {/* Basic Card */}
            <ComponentSpec
              name="Basic Card"
              specs="Background: card | Border: 1px border | Border-radius: 8px | Shadow: shadow-sm | Padding: 24px"
            >
              <Card className="w-80">
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card description text goes here</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card content area</p>
                </CardContent>
                <CardFooter>
                  <Button>Action</Button>
                </CardFooter>
              </Card>
            </ComponentSpec>

            {/* Elevated Card */}
            <ComponentSpec
              name="Elevated Card (.card-elevated)"
              specs="No border, elevation shadow, pink glow on hover"
            >
              <div className="card-elevated w-80">
                <h4 className="font-semibold mb-2">Elevated Card</h4>
                <p className="text-sm text-muted-foreground">This card has subtle elevation and glows on hover.</p>
              </div>
            </ComponentSpec>

            {/* Category Card */}
            <ComponentSpec
              name="Category Card"
              specs="Size: ~200px wide | Icon container: 48x48px | Title: 18px semibold | Count badge below"
            >
              <div className="w-64">
                <CategoryCard
                  category={sampleCategory}
                  listingCount={42}
                />
              </div>
            </ComponentSpec>

            {/* Listing Card (Grid) */}
            <ComponentSpec
              name="Listing Card (Grid View)"
              specs="Width: responsive | Logo: 64x64px | Tier badge top-right | Title: 16px semibold | Location with MapPin icon"
            >
              <div className="w-72">
                <ListingCard listing={sampleListing} />
              </div>
            </ComponentSpec>
          </div>
        </section>

        {/* 6. Badges & Chips */}
        <section className="print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">6. Badges & Chips</h2>
          
          <div className="space-y-8">
            {/* Tier Badges */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Tier Badges</h3>
              <div className="space-y-4">
                <ComponentSpec
                  name="Premier Badge"
                  specs="Background: tier-premier (magenta) | Text: white | Icon: Star | Padding: 4px 12px | Border-radius: full"
                >
                  <TierBadge tier="premier" />
                </ComponentSpec>

                <ComponentSpec
                  name="Enhanced Badge"
                  specs="Background: tier-enhanced (cyan) | Text: dark | Icon: Sparkles | Same dimensions"
                >
                  <TierBadge tier="enhanced" />
                </ComponentSpec>

                <ComponentSpec
                  name="Free Badge"
                  specs="Background: tier-free (gray) | Text: white | No icon | Same dimensions"
                >
                  <TierBadge tier="free" />
                </ComponentSpec>
              </div>
            </div>

            {/* Standard Badges */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Standard Badges</h3>
              <div className="space-y-4">
                <ComponentSpec
                  name="Default Badge"
                  specs="Background: primary | Text: primary-foreground | Padding: 2px 10px | Border-radius: full | Font: 12px semibold"
                >
                  <Badge>Default</Badge>
                </ComponentSpec>

                <ComponentSpec
                  name="Secondary Badge"
                  specs="Background: secondary | Text: secondary-foreground"
                >
                  <Badge variant="secondary">Secondary</Badge>
                </ComponentSpec>

                <ComponentSpec
                  name="Outline Badge"
                  specs="Border: 1px | Background: transparent"
                >
                  <Badge variant="outline">Outline</Badge>
                </ComponentSpec>

                <ComponentSpec
                  name="Destructive Badge"
                  specs="Background: destructive | Text: destructive-foreground"
                >
                  <Badge variant="destructive">Destructive</Badge>
                </ComponentSpec>
              </div>
            </div>

            {/* Category Badges */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Category Badges (Usage Examples)</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Recording Studios</Badge>
                <Badge variant="secondary">Live Sound</Badge>
                <Badge variant="secondary">Equipment Hire</Badge>
                <Badge variant="secondary">Venues</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Specs: Secondary variant | Used for category tags on listings
              </p>
            </div>
          </div>
        </section>

        {/* 7. Icons */}
        <section className="print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">7. Icons</h2>
          
          <div className="space-y-6">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Icon Library</h3>
              <p className="text-sm text-muted-foreground">Lucide React | Default size: 24x24px (h-6 w-6) | Stroke width: 2</p>
            </div>

            {/* Navigation Icons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation Icons</h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                <IconDisplay icon={Menu} name="Menu" />
                <IconDisplay icon={X} name="X (Close)" />
                <IconDisplay icon={ChevronDown} name="ChevronDown" />
                <IconDisplay icon={ChevronRight} name="ChevronRight" />
                <IconDisplay icon={ArrowLeft} name="ArrowLeft" />
                <IconDisplay icon={ArrowRight} name="ArrowRight" />
                <IconDisplay icon={Home} name="Home" />
                <IconDisplay icon={Search} name="Search" />
              </div>
            </div>

            {/* Category Icons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Category Icons</h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                <IconDisplay icon={Music} name="Music" />
                <IconDisplay icon={Mic} name="Mic" />
                <IconDisplay icon={Speaker} name="Speaker" />
                <IconDisplay icon={Building} name="Building" />
                <IconDisplay icon={Briefcase} name="Briefcase" />
                <IconDisplay icon={Radio} name="Radio" />
                <IconDisplay icon={Headphones} name="Headphones" />
                <IconDisplay icon={Video} name="Video" />
              </div>
            </div>

            {/* Contact Icons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact & Social Icons</h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                <IconDisplay icon={Phone} name="Phone" />
                <IconDisplay icon={Mail} name="Mail" />
                <IconDisplay icon={Globe} name="Globe" />
                <IconDisplay icon={MapPin} name="MapPin" />
                <IconDisplay icon={Facebook} name="Facebook" />
                <IconDisplay icon={Twitter} name="Twitter" />
                <IconDisplay icon={Instagram} name="Instagram" />
                <IconDisplay icon={Linkedin} name="Linkedin" />
                <IconDisplay icon={Youtube} name="Youtube" />
              </div>
            </div>

            {/* Action Icons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Action Icons</h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                <IconDisplay icon={Plus} name="Plus" />
                <IconDisplay icon={Minus} name="Minus" />
                <IconDisplay icon={Edit} name="Edit" />
                <IconDisplay icon={Trash2} name="Trash2" />
                <IconDisplay icon={Download} name="Download" />
                <IconDisplay icon={Upload} name="Upload" />
                <IconDisplay icon={Share} name="Share" />
                <IconDisplay icon={Copy} name="Copy" />
                <IconDisplay icon={ExternalLink} name="ExternalLink" />
              </div>
            </div>

            {/* Status Icons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Status Icons</h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                <IconDisplay icon={CheckCircle} name="CheckCircle" />
                <IconDisplay icon={AlertCircle} name="AlertCircle" />
                <IconDisplay icon={Info} name="Info" />
                <IconDisplay icon={Loader2} name="Loader2" />
                <IconDisplay icon={Star} name="Star" />
                <IconDisplay icon={Heart} name="Heart" />
                <IconDisplay icon={Eye} name="Eye" />
                <IconDisplay icon={EyeOff} name="EyeOff" />
              </div>
            </div>

            {/* Misc Icons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Miscellaneous Icons</h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                <IconDisplay icon={User} name="User" />
                <IconDisplay icon={Users} name="Users" />
                <IconDisplay icon={Settings} name="Settings" />
                <IconDisplay icon={Calendar} name="Calendar" />
                <IconDisplay icon={Clock} name="Clock" />
                <IconDisplay icon={Filter} name="Filter" />
                <IconDisplay icon={Grid} name="Grid" />
                <IconDisplay icon={List} name="List" />
                <IconDisplay icon={Camera} name="Camera" />
                <IconDisplay icon={Image} name="Image" />
                <IconDisplay icon={FileText} name="FileText" />
                <IconDisplay icon={LogOut} name="LogOut" />
              </div>
            </div>

            {/* Icon Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Icon Sizes</h3>
              <div className="flex items-end gap-8">
                <div className="text-center">
                  <Search className="h-3 w-3 mx-auto mb-2" />
                  <span className="text-xs">12px (h-3)</span>
                </div>
                <div className="text-center">
                  <Search className="h-4 w-4 mx-auto mb-2" />
                  <span className="text-xs">16px (h-4)</span>
                </div>
                <div className="text-center">
                  <Search className="h-5 w-5 mx-auto mb-2" />
                  <span className="text-xs">20px (h-5)</span>
                </div>
                <div className="text-center">
                  <Search className="h-6 w-6 mx-auto mb-2" />
                  <span className="text-xs">24px (h-6)</span>
                </div>
                <div className="text-center">
                  <Search className="h-8 w-8 mx-auto mb-2" />
                  <span className="text-xs">32px (h-8)</span>
                </div>
                <div className="text-center">
                  <Search className="h-10 w-10 mx-auto mb-2" />
                  <span className="text-xs">40px (h-10)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Navigation */}
        <section className="print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">8. Navigation Components</h2>
          
          <div className="space-y-8">
            {/* Breadcrumbs */}
            <ComponentSpec
              name="Breadcrumbs"
              specs="Font: 14px | Color: muted-foreground → foreground for current | Separator: ChevronRight | Gap: 8px"
            >
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Recording Studios</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </ComponentSpec>

          </div>
        </section>

        {/* 9. Advertising Slots */}
        <section className="print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">9. Advertising Slots</h2>
          
          <div className="space-y-8">
            {/* Leaderboard */}
            <ComponentSpec
              name="Leaderboard Ad"
              specs="Size: 728x90px (desktop) | Responsive: Full width on mobile | Position: Below header, between sections"
            >
              <AdBanner size="leaderboard" />
            </ComponentSpec>

            {/* Banner */}
            <ComponentSpec
              name="Banner Ad"
              specs="Size: 468x60px | Position: Within content areas, sidebar top"
            >
              <AdBanner size="banner" />
            </ComponentSpec>

            {/* Mobile Banner */}
            <ComponentSpec
              name="Mobile Banner Ad"
              specs="Size: 320x50px | Position: Mobile-only placements"
            >
              <AdBanner size="mobile-banner" />
            </ComponentSpec>

            {/* Skyscraper */}
            <ComponentSpec
              name="Skyscraper Ad"
              specs="Size: 180x110px per slot, stacked | Position: Right sidebar (desktop only)"
            >
              <div className="w-[200px]">
                <AdSkyscraper />
              </div>
            </ComponentSpec>
          </div>
        </section>

        {/* 10. Custom Classes */}
        <section className="print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">10. Custom Component Classes</h2>
          
          <div className="space-y-8">
            {/* Section Number */}
            <ComponentSpec
              name="Section Number (.section-number)"
              specs="text-7xl, font-display, muted color at 25% opacity, for editorial numbering"
            >
              <div className="flex items-center gap-4">
                <span className="section-number">01</span>
                <span className="section-number">02</span>
                <span className="section-number">03</span>
              </div>
            </ComponentSpec>

            {/* Display Heading */}
            <ComponentSpec
              name="Display Heading (.heading-display)"
              specs="font-display, uppercase, tracking-wider, responsive sizing"
            >
              <h2 className="heading-display">Display Heading</h2>
            </ComponentSpec>

            {/* Partner Logo */}
            <ComponentSpec
              name="Partner Logo (.partner-logo)"
              specs="Grayscale at 60% opacity, transitions to full color on hover"
            >
              <div className="flex items-center gap-8">
                <div className="partner-logo p-4 bg-card rounded">
                  <Music className="h-8 w-8" />
                </div>
                <div className="partner-logo p-4 bg-card rounded">
                  <Headphones className="h-8 w-8" />
                </div>
                <div className="partner-logo p-4 bg-card rounded">
                  <Radio className="h-8 w-8" />
                </div>
              </div>
            </ComponentSpec>

            {/* Gradient Utilities */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Gradient Utilities</h3>
              <div className="space-y-4">
                <ComponentSpec
                  name="Gradient Background (.gradient-bg)"
                  specs="Diagonal gradient from primary to accent-violet"
                >
                  <div className="gradient-bg p-6 rounded-lg text-white">
                    Gradient Background
                  </div>
                </ComponentSpec>

                <ComponentSpec
                  name="Gradient Text (.gradient-text)"
                  specs="Text with gradient fill (primary to accent)"
                >
                  <span className="gradient-text text-3xl font-bold">Gradient Text Effect</span>
                </ComponentSpec>

                <ComponentSpec
                  name="Gradient Border (.gradient-border)"
                  specs="1px gradient border effect"
                >
                  <div className="gradient-border p-6 rounded-lg">
                    Card with Gradient Border
                  </div>
                </ComponentSpec>

                <ComponentSpec
                  name="Glow Effect (.glow-effect)"
                  specs="Animating glow shadow on primary elements"
                >
                  <div className="glow-effect bg-primary text-primary-foreground p-4 rounded-lg inline-block">
                    Glowing Element
                  </div>
                </ComponentSpec>
              </div>
            </div>
          </div>
        </section>

        {/* 11. Special Components */}
        <section className="print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">11. Special Components</h2>
          
          <div className="space-y-8">
            {/* View Toggle */}
            <ComponentSpec
              name="View Toggle (Grid/List)"
              specs="Two icon buttons | Active: primary background | Inactive: ghost | Size: 32x32px each"
            >
              <div className="flex border rounded-md overflow-hidden">
                <Button variant="ghost" size="icon" className="rounded-none bg-primary text-primary-foreground">
                  <Grid className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-none">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </ComponentSpec>

            {/* Location Display */}
            <ComponentSpec
              name="Location Display"
              specs="MapPin icon (16px) + City, Country text | Font: 14px | Color: muted-foreground"
            >
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>London, United Kingdom</span>
              </div>
            </ComponentSpec>

            {/* Loading States */}
            <ComponentSpec
              name="Loading Spinner"
              specs="Loader2 icon | animate-spin class | Size varies by context (16-24px)"
            >
              <div className="flex items-center gap-4">
                <Loader2 className="h-4 w-4 animate-spin" />
                <Loader2 className="h-6 w-6 animate-spin" />
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            </ComponentSpec>

            {/* Empty State */}
            <ComponentSpec
              name="Empty State"
              specs="Centered layout | Icon: 48px muted | Title: 18px semibold | Description: 14px muted"
            >
              <div className="text-center py-8 px-4 border rounded-lg border-dashed">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            </ComponentSpec>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t pt-8 mt-12 text-center text-sm text-muted-foreground print:mt-4">
          <p>Entourage Pro Design System v2.0</p>
          <p className="mt-1">Generated {new Date().toLocaleDateString()}</p>
        </footer>
      </div>
    </div>
  );
};

// Helper Components

interface LiveColorSwatchProps {
  name: string;
  cssVar: string;
  usage: string;
}

const LiveColorSwatch = ({ name, cssVar, usage }: LiveColorSwatchProps) => {
  const [computedColor, setComputedColor] = useState<string>("");
  const [hslValue, setHslValue] = useState<string>("");

  useEffect(() => {
    // Get the computed color from CSS variable
    const root = document.documentElement;
    const style = getComputedStyle(root);
    const value = style.getPropertyValue(cssVar).trim();
    setHslValue(value);
    
    // Convert to displayable format
    if (value) {
      setComputedColor(`hsl(${value})`);
    }
  }, [cssVar]);

  return (
    <div className="border rounded-lg overflow-hidden">
      <div 
        className="h-16 w-full" 
        style={{ backgroundColor: computedColor || `hsl(var(${cssVar}))` }}
      />
      <div className="p-3 text-xs space-y-1">
        <p className="font-semibold">{name}</p>
        <p className="text-muted-foreground font-mono">{cssVar}</p>
        <p className="font-mono text-muted-foreground">{hslValue || "loading..."}</p>
        <p className="text-muted-foreground mt-2">{usage}</p>
      </div>
    </div>
  );
};

interface TypographySampleProps {
  element: string;
  className: string;
  specs: string;
}

const TypographySample = ({ element, className, specs }: TypographySampleProps) => (
  <div className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-4">
    <div className="w-32 flex-shrink-0">
      <span className="text-sm font-medium text-muted-foreground">{element}</span>
    </div>
    <div className="flex-1">
      <p className={className}>The quick brown fox jumps over the lazy dog</p>
    </div>
    <div className="md:w-64 flex-shrink-0 md:text-right">
      <code className="text-xs text-muted-foreground">{specs}</code>
    </div>
  </div>
);

interface ComponentSpecProps {
  name: string;
  specs: string;
  children: React.ReactNode;
}

const ComponentSpec = ({ name, specs, children }: ComponentSpecProps) => (
  <div className="border rounded-lg p-4">
    <div className="flex flex-col md:flex-row md:items-start gap-4">
      <div className="flex-shrink-0">
        {children}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-muted-foreground mt-1">{specs}</p>
      </div>
    </div>
  </div>
);

interface IconDisplayProps {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
}

const IconDisplay = ({ icon: Icon, name }: IconDisplayProps) => (
  <div className="text-center p-2 border rounded hover:bg-muted/50 transition-colors">
    <Icon className="h-6 w-6 mx-auto mb-1" />
    <span className="text-xs text-muted-foreground">{name}</span>
  </div>
);

export default DesignSystem;
