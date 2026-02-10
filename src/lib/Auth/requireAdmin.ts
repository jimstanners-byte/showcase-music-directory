import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Verifies that the request comes from an authenticated admin user
 * Use this in API routes to protect admin-only endpoints
 * 
 * @example
 * // In an API route:
 * import { requireAdmin } from '@/lib/auth/requireAdmin';
 * 
 * export async function POST(request: NextRequest) {
 *   const adminCheck = await requireAdmin(request);
 *   if (adminCheck.error) {
 *     return adminCheck.error; // Returns 401/403 response
 *   }
 *   
 *   const { user, supabase } = adminCheck;
 *   // Proceed with admin action...
 * }
 */
export async function requireAdmin(request: NextRequest) {
  const cookieStore = cookies();

  // Create Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle error for server components
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Handle error for server components
          }
        },
      },
    }
  );

  // Check authentication
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    console.log('[API SECURITY] ❌ Unauthorized API access attempt:', {
      path: request.nextUrl.pathname,
      method: request.method,
      error: sessionError?.message,
    });

    return {
      error: NextResponse.json(
        { error: 'Unauthorized', message: 'You must be logged in to access this resource' },
        { status: 401 }
      ),
    };
  }

  // Check admin status
  const { data: userRole, error: roleError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', session.user.id)
    .eq('role', 'admin')
    .maybeSingle();

  if (roleError || !userRole) {
    console.log('[API SECURITY] ❌ Forbidden API access attempt:', {
      path: request.nextUrl.pathname,
      method: request.method,
      userId: session.user.id,
      email: session.user.email,
    });

    return {
      error: NextResponse.json(
        { error: 'Forbidden', message: 'You do not have permission to access this resource' },
        { status: 403 }
      ),
    };
  }

  // Success
  console.log('[API SECURITY] ✅ Admin API access granted:', {
    path: request.nextUrl.pathname,
    method: request.method,
    userId: session.user.id,
    email: session.user.email,
  });

  return {
    user: session.user,
    session,
    supabase,
  };
}

/**
 * Alternative: Simpler version for Server Actions
 * Use this in Server Actions instead of API routes
 */
export async function requireAdminAction() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle error
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Handle error
          }
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('Unauthorized: You must be logged in');
  }

  const { data: userRole } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', session.user.id)
    .eq('role', 'admin')
    .maybeSingle();

  if (!userRole) {
    throw new Error('Forbidden: Admin access required');
  }

  return { user: session.user, session, supabase };
}
