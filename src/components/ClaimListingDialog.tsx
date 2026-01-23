'use client';

import { useState } from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ClaimListingDialogProps {
  listingId: string;
  listingName: string;
  compact?: boolean;
}

export function ClaimListingDialog({ listingId, listingName, compact = false }: ClaimListingDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please fill in your name and email.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("submit-claim-request", {
        body: {
          listingId,
          listingName,
          name: formData.name.trim(),
          email: formData.email.trim(),
          role: formData.role.trim(),
          message: formData.message.trim(),
        },
      });

      if (error) throw error;

      toast({
        title: "Claim request submitted",
        description: "Thanks! We'll review your request and be in touch within 48 hours.",
      });

      setOpen(false);
      setFormData({ name: "", email: "", role: "", message: "" });
    } catch (error) {
      console.error("Error submitting claim request:", error);
      toast({
        title: "Error",
        description: "Failed to submit claim request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {compact ? (
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Shield className="h-3 w-3" />
            Is this your business?
          </button>
        ) : (
          <Button variant="outline" size="sm" className="w-full text-muted-foreground hover:text-foreground">
            <Shield className="h-4 w-4 mr-2" />
            Is this your business?
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Claim This Listing</DialogTitle>
          <DialogDescription>
            If you own or manage <strong>{listingName}</strong>, you can request to manage this listing. We'll verify your details and get in touch.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="claim-name">Your Name *</Label>
            <Input
              id="claim-name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="John Smith"
              required
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="claim-email">Your Email *</Label>
            <Input
              id="claim-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="john@company.com"
              required
              maxLength={255}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="claim-role">Your Role at Company</Label>
            <Input
              id="claim-role"
              value={formData.role}
              onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
              placeholder="e.g., Owner, Marketing Manager"
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="claim-message">Message (optional)</Label>
            <Textarea
              id="claim-message"
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Any additional information..."
              rows={3}
              maxLength={1000}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Claim Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
