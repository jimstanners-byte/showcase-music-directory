'use client';

import { useAuthContext } from "@/contexts/AuthContext";

export function useAuth() {
  const { user, loading, signIn, signOut } = useAuthContext();
  return { user, loading, signIn, signOut };
}

export function useIsAdmin() {
  const { isAdmin, adminLoading: loading } = useAuthContext();
  return { isAdmin, loading };
}
