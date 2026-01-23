-- Create bulk_enquiries table for Contact Favourites feature
CREATE TABLE public.bulk_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  message TEXT NOT NULL,
  listing_ids UUID[] NOT NULL,
  listing_names TEXT[] NOT NULL,
  listing_emails TEXT[] NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  rejection_reason TEXT,
  ip_address TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id)
);

-- Create validation trigger instead of CHECK constraint for status
CREATE OR REPLACE FUNCTION public.validate_bulk_enquiry_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status NOT IN ('pending', 'approved', 'rejected') THEN
    RAISE EXCEPTION 'Invalid status. Must be pending, approved, or rejected';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER validate_bulk_enquiry_status_trigger
BEFORE INSERT OR UPDATE ON public.bulk_enquiries
FOR EACH ROW
EXECUTE FUNCTION public.validate_bulk_enquiry_status();

-- Enable RLS
ALTER TABLE public.bulk_enquiries ENABLE ROW LEVEL SECURITY;

-- Admin can view all bulk enquiries
CREATE POLICY "Admins can view all bulk enquiries" ON public.bulk_enquiries
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin can update bulk enquiries (approve/reject)
CREATE POLICY "Admins can update bulk enquiries" ON public.bulk_enquiries
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

-- Anyone can submit bulk enquiries
CREATE POLICY "Anyone can submit bulk enquiries" ON public.bulk_enquiries
  FOR INSERT WITH CHECK (true);

-- Add columns to contact_messages for bulk tracking
ALTER TABLE public.contact_messages ADD COLUMN is_bulk BOOLEAN DEFAULT FALSE;
ALTER TABLE public.contact_messages ADD COLUMN bulk_enquiry_id UUID REFERENCES public.bulk_enquiries(id);