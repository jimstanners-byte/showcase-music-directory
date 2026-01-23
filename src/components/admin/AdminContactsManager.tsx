'use client';
import { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, GripVertical, User } from "lucide-react";
import { useAdminListingContacts } from "@/hooks/useListingContacts";
import { ListingContact } from "@/types/database";

interface AdminContactsManagerProps {
  listingId: string;
  showContacts: boolean;
  onShowContactsChange: (value: boolean) => void;
}

interface ContactForm {
  id?: string;
  contact_name: string;
  job_title: string;
  contact_phone: string;
  contact_email: string;
}

const emptyContact: ContactForm = {
  contact_name: "",
  job_title: "",
  contact_phone: "",
  contact_email: "",
};

const MAX_CONTACTS = 5;

export function AdminContactsManager({ 
  listingId, 
  showContacts, 
  onShowContactsChange 
}: AdminContactsManagerProps) {
  const { data: existingContacts = [], isLoading } = useAdminListingContacts(listingId);
  const [contacts, setContacts] = useState<ContactForm[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const initializedRef = useRef(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Initialize contacts from existing data only once when data loads
  useEffect(() => {
    if (initializedRef.current) return;
    if (isLoading) return;
    
    initializedRef.current = true;
    if (existingContacts.length > 0) {
      setContacts(existingContacts.map(c => ({
        id: c.id,
        contact_name: c.contact_name || "",
        job_title: c.job_title || "",
        contact_phone: c.contact_phone || "",
        contact_email: c.contact_email || "",
      })));
    } else {
      setContacts([]);
    }
    setHasChanges(false);
  }, [existingContacts, isLoading]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      // Delete removed contacts
      const existingIds = existingContacts.map(c => c.id);
      const currentIds = contacts.filter(c => c.id).map(c => c.id);
      const toDelete = existingIds.filter(id => !currentIds.includes(id));
      
      if (toDelete.length > 0) {
        const { error: deleteError } = await supabase
          .from("listing_contacts")
          .delete()
          .in("id", toDelete);
        if (deleteError) throw deleteError;
      }

      // Upsert all contacts with correct display_order
      for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        if (!contact.contact_name.trim()) continue;

        if (contact.id) {
          // Update existing
          const { error } = await supabase
            .from("listing_contacts")
            .update({
              contact_name: contact.contact_name.trim(),
              job_title: contact.job_title.trim() || null,
              contact_phone: contact.contact_phone.trim() || null,
              contact_email: contact.contact_email.trim() || null,
              display_order: i,
            })
            .eq("id", contact.id);
          if (error) throw error;
        } else {
          // Insert new
          const { error } = await supabase
            .from("listing_contacts")
            .insert({
              listing_id: listingId,
              contact_name: contact.contact_name.trim(),
              job_title: contact.job_title.trim() || null,
              contact_phone: contact.contact_phone.trim() || null,
              contact_email: contact.contact_email.trim() || null,
              display_order: i,
            });
          if (error) throw error;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-listing-contacts", listingId] });
      setHasChanges(false);
      toast({ title: "Contacts saved successfully" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error saving contacts", 
        description: error.message, 
        variant: "destructive" 
      });
    },
  });

  const addContact = () => {
    if (contacts.length >= MAX_CONTACTS) return;
    setContacts([...contacts, { ...emptyContact }]);
    setHasChanges(true);
  };

  const removeContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
    setHasChanges(true);
  };

  const updateContact = (index: number, field: keyof ContactForm, value: string) => {
    const updated = [...contacts];
    updated[index] = { ...updated[index], [field]: value };
    setContacts(updated);
    setHasChanges(true);
  };

  const moveContact = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === contacts.length - 1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...contacts];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setContacts(updated);
    setHasChanges(true);
  };

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading contacts...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Show Contacts Toggle */}
      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
        <div>
          <Label htmlFor="show-contacts" className="font-medium">Show Contacts on Profile</Label>
          <p className="text-sm text-muted-foreground">
            When enabled, key contacts will be visible on the public profile page
          </p>
        </div>
        <Switch 
          id="show-contacts"
          checked={showContacts} 
          onCheckedChange={onShowContactsChange}
        />
      </div>

      {/* Contacts List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium flex items-center gap-2">
            <User className="h-4 w-4" />
            Key Contacts ({contacts.length}/{MAX_CONTACTS})
          </Label>
        </div>

        {contacts.map((contact, index) => (
          <div key={index} className="p-4 border rounded-lg bg-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GripVertical className="h-4 w-4" />
                <span>Contact {index + 1}</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveContact(index, 'up')}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveContact(index, 'down')}
                  disabled={index === contacts.length - 1}
                >
                  ↓
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeContact(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor={`contact-name-${index}`} className="text-xs">Name *</Label>
                <Input
                  id={`contact-name-${index}`}
                  placeholder="Full name"
                  value={contact.contact_name}
                  onChange={(e) => updateContact(index, 'contact_name', e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor={`contact-title-${index}`} className="text-xs">Job Title</Label>
                <Input
                  id={`contact-title-${index}`}
                  placeholder="e.g. Marketing Manager"
                  value={contact.job_title}
                  onChange={(e) => updateContact(index, 'job_title', e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor={`contact-phone-${index}`} className="text-xs">Phone</Label>
                <Input
                  id={`contact-phone-${index}`}
                  placeholder="Phone number"
                  value={contact.contact_phone}
                  onChange={(e) => updateContact(index, 'contact_phone', e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor={`contact-email-${index}`} className="text-xs">Email</Label>
                <Input
                  id={`contact-email-${index}`}
                  type="email"
                  placeholder="Email address"
                  value={contact.contact_email}
                  onChange={(e) => updateContact(index, 'contact_email', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}

        {contacts.length < MAX_CONTACTS && (
          <Button
            type="button"
            variant="outline"
            onClick={addContact}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        )}
      </div>

      {/* Save Button */}
      {hasChanges && (
        <div className="pt-4 border-t">
          <Button 
            type="button"
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending}
            className="w-full"
          >
            {saveMutation.isPending ? "Saving..." : "Save Contacts"}
          </Button>
        </div>
      )}
    </div>
  );
}
