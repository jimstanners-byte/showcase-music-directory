'use client';

import { useState, useMemo, useCallback, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { useSubmitBulkEnquiry } from '@/hooks/useBulkEnquiries';
import { Listing } from '@/types/database';
import { AlertCircle, Mail, Building2 } from 'lucide-react';

// =============================================================================
// SECURITY NOTE: This component no longer sends emails to the server.
// Only listing IDs are sent - the Edge Function looks up emails server-side.
// =============================================================================

interface BulkContactFormDialogProps {
  listings: Listing[];
  trigger?: React.ReactNode;
}

const MAX_SELECTIONS = 10;
const MIN_MESSAGE_LENGTH = 50;

// Separate the form content into its own component to avoid re-render issues
function BulkContactForm({ 
  listings, 
  onClose 
}: { 
  listings: Listing[]; 
  onClose: () => void;
}) {
  // All listings are potentially contactable - server will verify which have emails
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => 
    new Set(listings.slice(0, MAX_SELECTIONS).map(l => l.id))
  );
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const timestampRef = useRef(Date.now());
  
  const submitMutation = useSubmitBulkEnquiry();

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else if (newSelected.size < MAX_SELECTIONS) {
        newSelected.add(id);
      }
      return newSelected;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(listings.slice(0, MAX_SELECTIONS).map(l => l.id)));
  }, [listings]);

  const selectNone = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const selectedCount = selectedIds.size;
  const messageLength = formData.message.trim().length;
  const isMessageValid = messageLength >= MIN_MESSAGE_LENGTH;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedCount === 0) {
      toast({
        title: 'No companies selected',
        description: 'Please select at least one company to contact.',
        variant: 'destructive',
      });
      return;
    }

    if (!isMessageValid) {
      toast({
        title: 'Message too short',
        description: `Please write at least ${MIN_MESSAGE_LENGTH} characters.`,
        variant: 'destructive',
      });
      return;
    }

    // SECURITY: Only send listing IDs - server looks up emails
    const payload = {
      listingIds: Array.from(selectedIds),
      senderName: formData.senderName.trim(),
      senderEmail: formData.senderEmail.trim(),
      message: formData.message.trim(),
      honeypot,
      timestamp: timestampRef.current,
    };

    try {
      const result = await submitMutation.mutateAsync(payload);
      toast({
        title: 'Enquiry Submitted',
        description: result.message,
      });
      onClose();
    } catch {
      // Error handled by mutation
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Company Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Select Companies</Label>
          <div className="flex gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={selectAll}>
              Select All
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={selectNone}>
              Select None
            </Button>
          </div>
        </div>
        
        <div className="h-[180px] border rounded-md p-2 overflow-y-auto">
          <div className="space-y-1">
            {listings.map(listing => (
              <label 
                key={listing.id} 
                className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedIds.has(listing.id)}
                  onChange={() => toggleSelection(listing.id)}
                  disabled={!selectedIds.has(listing.id) && selectedCount >= MAX_SELECTIONS}
                  className="h-4 w-4 rounded border-input"
                />
                <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm truncate flex-1">{listing.name}</span>
                {listing.country && (
                  <span className="text-xs text-muted-foreground">{listing.country}</span>
                )}
              </label>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {selectedCount} of {listings.length} selected (max {MAX_SELECTIONS})
          </span>
          {selectedCount >= MAX_SELECTIONS && (
            <Badge variant="secondary" className="text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />
              Maximum reached
            </Badge>
          )}
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="bulk-senderName">Your Name *</Label>
            <Input
              id="bulk-senderName"
              value={formData.senderName}
              onChange={e => setFormData(prev => ({ ...prev, senderName: e.target.value }))}
              placeholder="Your name"
              required
              minLength={2}
              maxLength={100}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bulk-senderEmail">Your Email *</Label>
            <Input
              id="bulk-senderEmail"
              type="email"
              value={formData.senderEmail}
              onChange={e => setFormData(prev => ({ ...prev, senderEmail: e.target.value }))}
              placeholder="you@example.com"
              required
              maxLength={255}
            />
          </div>
        </div>
        
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="bulk-message">Message *</Label>
            <span className={`text-xs ${isMessageValid ? 'text-muted-foreground' : 'text-destructive'}`}>
              {messageLength}/{MIN_MESSAGE_LENGTH} min
            </span>
          </div>
          <Textarea
            id="bulk-message"
            value={formData.message}
            onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
            placeholder={`Describe your requirements (minimum ${MIN_MESSAGE_LENGTH} characters)...`}
            required
            minLength={MIN_MESSAGE_LENGTH}
            maxLength={5000}
            rows={5}
          />
        </div>
      </div>

      {/* Honeypot (hidden) */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={e => setHoneypot(e.target.value)}
        style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Info text */}
      <p className="text-xs text-muted-foreground">
        Your enquiry will be reviewed before being sent to ensure quality. 
        You'll receive an email confirmation once approved.
      </p>

      {/* Submit */}
      <Button 
        type="submit" 
        className="w-full" 
        disabled={selectedCount === 0 || submitMutation.isPending}
      >
        {submitMutation.isPending ? (
          'Submitting...'
        ) : (
          `Submit Enquiry for ${selectedCount} ${selectedCount === 1 ? 'Company' : 'Companies'}`
        )}
      </Button>
    </form>
  );
}

export function BulkContactFormDialog({ listings, trigger }: BulkContactFormDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Contact Favourites
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Multiple Companies
          </DialogTitle>
          <DialogDescription>
            Send a single enquiry to multiple companies at once. Select up to {MAX_SELECTIONS} companies.
          </DialogDescription>
        </DialogHeader>
        
        {/* Only render form when dialog is open - this resets state on each open */}
        {open && (
          <BulkContactForm 
            listings={listings} 
            onClose={() => setOpen(false)} 
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
