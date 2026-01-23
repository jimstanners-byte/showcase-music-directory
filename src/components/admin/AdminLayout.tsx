'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from "react";
import { useAuth, useIsAdmin } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePendingEnquiriesCount } from "@/hooks/useBulkEnquiries";
import { usePendingClaimRequestsCount } from "@/hooks/useClaimRequests";
import {
  Music,
  LayoutDashboard,
  List,
  FolderTree,
  Newspaper,
  LogOut,
  Megaphone,
  BarChart3,
  Settings,
  Globe,
  Palette,
  FileText,
  BookOpen,
  Mail,
  MapPin,
  Shield,
  Search,
  Upload,
  AlertCircle,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading, signOut } = useAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const router = useRouter();
  const [hasInitialized, setHasInitialized] = useState(false);
  const wasAuthenticated = useRef(false);
  const { data: pendingCount } = usePendingEnquiriesCount();
  const { data: pendingClaimCount } = usePendingClaimRequestsCount();

  useEffect(() => {
    // CRITICAL: Wait for BOTH auth and admin checks to complete
    if (authLoading || adminLoading) {
      console.log('[AdminLayout] Still loading...', { authLoading, adminLoading });
      return;
    }

    // Debug logging
    console.log('[AdminLayout] Auth check:', { user: !!user, isAdmin, hasInitialized });
    
    if (user && isAdmin) {
      // User is authenticated and is admin - mark as initialized
      console.log('[AdminLayout] ✅ Admin authenticated');
      setHasInitialized(true);
      wasAuthenticated.current = true;
    } else if (!user && !hasInitialized) {
      // Not authenticated - redirect to login (only if not already initialized)
      console.log('[AdminLayout] ❌ No user - redirecting to login');
      router.push("/dashboard-login");
    } else if (user && !isAdmin) {
      // User exists but not admin - just block render, don't redirect
      console.log('[AdminLayout] ❌ User exists but not admin - blocking access');
      setHasInitialized(false);
    }
  }, [user, isAdmin, authLoading, adminLoading, router, hasInitialized]);

  // Only show loading on initial mount, not during background re-validations
  if (!hasInitialized && (authLoading || adminLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Show unauthorized message if user is logged in but not admin
  if (user && !isAdmin && !authLoading && !adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-destructive">Unauthorized Access</h1>
          <p className="text-muted-foreground">You don't have permission to access the admin dashboard.</p>
          <Button onClick={() => router.push("/")}>Go to Homepage</Button>
        </div>
      </div>
    );
  }

  // CRITICAL: Don't render admin interface unless user is authenticated AND admin
  if (!hasInitialized || !user || !isAdmin) {
    console.log('[AdminLayout] Blocking render - not authenticated/admin');
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/dashboard-login");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Sticky */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground border-r flex flex-col h-screen sticky top-0">
        <div className="p-4 border-b border-sidebar-border shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <Music className="h-6 w-6 text-sidebar-primary" />
            <span className="font-bold">Showcase Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link href="/admin/dashboard">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/listings">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <List className="h-4 w-4 mr-2" />
              Listings
            </Button>
          </Link>
          <Link href="/admin/import-listings">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import Listings
            </Button>
          </Link>
          <Link href="/admin/categories">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <FolderTree className="h-4 w-4 mr-2" />
              Categories
            </Button>
          </Link>
          <Link href="/admin/news">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Newspaper className="h-4 w-4 mr-2" />
              News
            </Button>
          </Link>
          <Link href="/admin/ads">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Megaphone className="h-4 w-4 mr-2" />
              Ads
            </Button>
          </Link>
          <Link href="/admin/analytics">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </Link>
          <Link href="/admin/seo">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Globe className="h-4 w-4 mr-2" />
              SEO Dashboard
            </Button>
          </Link>
          <Link href="/admin/seo-lookup">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Search className="h-4 w-4 mr-2" />
              SEO Lookup
            </Button>
          </Link>
          <Link href="/admin/geocoding">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Geocoding
            </Button>
          </Link>
          <Link href="/admin/data-quality">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Data Quality
            </Button>
          </Link>
          <Link href="/admin/page-seo">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <FileText className="h-4 w-4 mr-2" />
              Page SEO
            </Button>
          </Link>
          <Link href="/admin/resources">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Resources
            </Button>
          </Link>
          <Link href="/admin/bulk-enquiries">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Mail className="h-4 w-4 mr-2" />
              Bulk Enquiries
              {pendingCount && pendingCount > 0 && (
                <Badge variant="destructive" className="ml-auto text-xs px-1.5 py-0.5 h-5 min-w-5">
                  {pendingCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link href="/admin/claim-requests">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Shield className="h-4 w-4 mr-2" />
              Claim Requests
              {pendingClaimCount && pendingClaimCount > 0 && (
                <Badge variant="destructive" className="ml-auto text-xs px-1.5 py-0.5 h-5 min-w-5">
                  {pendingClaimCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </Link>
          <Link href="/admin/design-system">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Palette className="h-4 w-4 mr-2" />
              Design System
            </Button>
          </Link>
          <Link href="/admin/documentation">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <FileText className="h-4 w-4 mr-2" />
              Documentation
            </Button>
          </Link>
        </nav>

        <div className="p-4 border-t border-sidebar-border shrink-0">
          <p className="text-xs text-sidebar-foreground/60 mb-2 truncate">{user.email}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 bg-background overflow-y-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
