// Submit Bulk Enquiry Edge Function
// Validates spam protection and stores bulk enquiry for admin review

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BulkEnquiryPayload {
  listingIds: string[];
  senderName: string;
  senderEmail: string;
  message: string;
  honeypot: string;
  timestamp: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const payload: BulkEnquiryPayload = await req.json();
    const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    // SPAM PROTECTION 1: Honeypot
    if (payload.honeypot && payload.honeypot.length > 0) {
      console.log("Spam detected: Honeypot filled");
      return new Response(
        JSON.stringify({ error: "Invalid submission" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // SPAM PROTECTION 2: Time-based validation (minimum 3 seconds)
    const timeSinceOpen = Date.now() - payload.timestamp;
    if (timeSinceOpen < 3000) {
      console.log("Spam detected: Form submitted too quickly", timeSinceOpen);
      return new Response(
        JSON.stringify({ error: "Please take your time filling out the form" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // SPAM PROTECTION 3: Rate limiting (5 per hour per IP)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: recentSubmissions } = await supabase
      .from("bulk_enquiries")
      .select("*", { count: "exact", head: true })
      .eq("ip_address", ipAddress)
      .gte("submitted_at", oneHourAgo);

    if (recentSubmissions && recentSubmissions >= 5) {
      console.log("Rate limit exceeded for IP:", ipAddress);
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validation
    if (!payload.listingIds || payload.listingIds.length === 0) {
      return new Response(
        JSON.stringify({ error: "No listings selected" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (payload.listingIds.length > 10) {
      return new Response(
        JSON.stringify({ error: "Maximum 10 companies can be contacted at once" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!payload.message || payload.message.length < 50) {
      return new Response(
        JSON.stringify({ error: "Message must be at least 50 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // SECURITY: Look up listing details server-side
    const { data: listings, error: listingsError } = await supabase
      .from("listings")
      .select("id, name, email")
      .in("id", payload.listingIds)
      .not("email", "is", null);

    if (listingsError) {
      console.error("Error fetching listings:", listingsError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch listing details" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!listings || listings.length === 0) {
      return new Response(
        JSON.stringify({ error: "No valid listings found with email addresses" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Store bulk enquiry for admin review
    const { error: insertError } = await supabase
      .from("bulk_enquiries")
      .insert({
        sender_name: payload.senderName.trim(),
        sender_email: payload.senderEmail.trim(),
        message: payload.message.trim(),
        listing_ids: listings.map(l => l.id),
        listing_names: listings.map(l => l.name),
        listing_emails: listings.map(l => l.email),
        status: "pending",
        ip_address: ipAddress,
        submitted_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error("Error inserting bulk enquiry:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to submit enquiry" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ 
        message: `Your enquiry to ${listings.length} companies has been submitted for review. You'll receive confirmation once approved.`,
        companiesCount: listings.length
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in submit-bulk-enquiry:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
