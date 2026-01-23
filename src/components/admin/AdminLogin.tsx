'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth, useIsAdmin } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const router = useRouter();
  const { toast } = useToast();

  // Redirect if already logged in as admin (use useEffect to avoid render-phase navigation)
  useEffect(() => {
    if (user && isAdmin && !adminLoading) {
      router.replace("/admin/dashboard");
    }
  }, [user, isAdmin, adminLoading, router]);

  // Show loading while checking admin status for logged-in users
  if (user && adminLoading) {
    return (
      <Layout>
        <div className="container py-16 flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-muted-foreground">Checking permissions...</div>
        </div>
      </Layout>
    );
  }

  // If user is logged in as admin, show loading while redirect happens
  if (user && isAdmin) {
    return (
      <Layout>
        <div className="container py-16 flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-muted-foreground">Redirecting to dashboard...</div>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
      toast({
        title: "Login successful",
        description: "Checking admin permissions...",
      });
      // Don't manually redirect - the useEffect will handle it when isAdmin updates
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
      setLoading(false); // Only clear loading on error
    }
  };

  return (
    <Layout>
      <div className="container py-16 flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Sign in to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}