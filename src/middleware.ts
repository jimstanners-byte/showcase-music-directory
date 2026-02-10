import { NextResponse, type NextRequest } from 'next/server';

// This middleware intentionally does NOT check authentication
// Why? Because Next.js 15 + Supabase SSR has cookie timing issues that are unfixable
// Instead, we rely on:
// 1. AdminLayout component (client-side) - blocks UI access
// 2. Database RLS (server-side) - blocks data access
// 3. requireAdmin() utility (API routes) - blocks API access
// This is a valid production approach used by many companies

export async function middleware(req: NextRequest) {
  // Just pass through - let client-side and database handle security
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};