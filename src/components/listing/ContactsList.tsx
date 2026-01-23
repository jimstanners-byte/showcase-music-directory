'use client';

import { User, Briefcase, Phone, Mail } from "lucide-react";
import { ListingContact } from "@/types/database";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { Button } from "@/components/ui/button";

interface ContactsListProps {
  contacts: ListingContact[];
  listingId: string;
  listingName: string;
  onLinkClick?: (linkType: string, linkUrl?: string) => void;
}

function getFirstName(fullName: string): string {
  return fullName.split(' ')[0];
}

export function ContactsList({ contacts, listingId, listingName, onLinkClick }: ContactsListProps) {
  if (!contacts || contacts.length === 0) return null;

  return (
    <div className="space-y-4 pt-4 border-t">
      <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
        <User className="h-4 w-4" />
        Key Contacts
      </h3>
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="text-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">{contact.contact_name}</span>
              {contact.job_title && (
                <>
                  <span className="text-muted-foreground">—</span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {contact.job_title}
                  </span>
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {contact.contact_phone && (
                <a 
                  href={`tel:${contact.contact_phone}`}
                  className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors text-xs"
                  onClick={() => onLinkClick?.('contact_phone', contact.contact_phone || undefined)}
                >
                  <Phone className="h-3 w-3" />
                  {contact.contact_phone}
                </a>
              )}
              {contact.contact_email && (
                <ContactFormDialog
                  listingId={listingId}
                  listingName={listingName}
                  listingEmail={contact.contact_email}
                  trigger={
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      <Mail className="h-3 w-3 mr-1" />
                      Contact {getFirstName(contact.contact_name)}
                    </Button>
                  }
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
