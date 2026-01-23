'use client';

import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { PublicCategorySelector } from "@/components/PublicCategorySelector";
import { supabase } from "@/integrations/supabase/client";
import { useCategories } from "@/hooks/useCategories";

const SITE_URL = "https://www.showcase-music.com";
const SITE_NAME = "Showcase Music Directory";

export default function GetListed() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { data: categories } = useCategories();
  const pageLoadTime = useRef(Date.now());

  // Reset page load time when component mounts
  useEffect(() => {
    pageLoadTime.current = Date.now();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (selectedCategories.length === 0) {
      toast({
        title: "Category Required",
        description: "Please select at least one category for your listing.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Get category names from IDs
    const categoryNames = selectedCategories.map(id => {
      const category = categories?.find(c => c.id === id);
      return category?.name || "";
    }).filter(Boolean);
    
    // Honeypot check
    const honeypot = formData.get('website_url');
    if (honeypot) {
      // Silent fail for spam
      setIsSubmitting(false);
      toast({
        title: "Request submitted",
        description: "We'll review your submission and get back to you soon.",
      });
      form.reset();
      setSelectedCategories([]);
      return;
    }

    // Time-based check (must take at least 3 seconds to fill form)
    const timeSpent = Date.now() - pageLoadTime.current;
    if (timeSpent < 3000) {
      // Silent fail for bots
      setIsSubmitting(false);
      toast({
        title: "Request submitted",
        description: "We'll review your submission and get back to you soon.",
      });
      form.reset();
      setSelectedCategories([]);
      return;
    }

    try {
      const { error } = await supabase
        .from('listing_requests')
        .insert({
          company_name: formData.get('companyName') as string,
          contact_name: formData.get('contactName') as string,
          email: formData.get('email') as string,
          phone: formData.get('phone') as string || null,
          website: formData.get('website') as string || null,
          city: formData.get('city') as string,
          country: formData.get('country') as string,
          description: formData.get('description') as string,
          categories: categoryNames.join(', '),
        });

      if (error) throw error;

      toast({
        title: "Request submitted successfully!",
        description: "We'll review your submission and get back to you within 48 hours.",
      });
      
      // Reset form
      form.reset();
      setSelectedCategories([]);
    } catch (error) {
      console.error('Error submitting listing request:', error);
      toast({
        title: "Error submitting request",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Get Listed</h1>
            <p className="text-xl text-muted-foreground">
              Join the world's leading music industry directory and connect with professionals worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Free Listing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Basic listing with company name, contact details, and category placement.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="h-10 w-10 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Quick Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Submit your details and be listed within 48 hours after verification.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Star className="h-10 w-10 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Upgrade Anytime</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Enhance your listing with premium features whenever you're ready.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Submit Your Listing</CardTitle>
              <CardDescription>
                Fill in the form below to submit your business for inclusion in our directory.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field - hidden from users */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <Input 
                    type="text" 
                    name="website_url" 
                    tabIndex={-1} 
                    autoComplete="off" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input id="companyName" name="companyName" required placeholder="Your company name" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Categories * (select up to 2)</Label>
                  <PublicCategorySelector
                    selectedIds={selectedCategories}
                    onChange={setSelectedCategories}
                    maxCategories={2}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">

                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Name *</Label>
                    <Input id="contactName" name="contactName" required placeholder="Primary contact person" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" name="email" type="email" required placeholder="contact@company.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+44 123 456 7890" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" name="website" type="url" placeholder="https://www.yourcompany.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" name="city" required placeholder="City" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input id="country" name="country" required placeholder="Country" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Company Description *</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    required 
                    placeholder="Tell us about your company, services, and what makes you unique..."
                    className="min-h-[120px]"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Listing"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
