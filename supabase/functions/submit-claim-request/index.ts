import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ClaimRequest {
  listingId: string;
  listingName: string;
  name: string;
  email: string;
  role?: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { listingId, listingName, name, email, role, message }: ClaimRequest = await req.json();

    // Validate required fields
    if (!listingId || !listingName || !name || !email) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Invalid email format");
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get IP address for rate limiting / tracking
    const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                      req.headers.get("x-real-ip") || 
                      "unknown";

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check for recent duplicate requests (rate limiting)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("claim_requests")
      .select("*", { count: "exact", head: true })
      .eq("listing_id", listingId)
      .eq("email", email)
      .gte("created_at", oneHourAgo);

    if (count && count > 0) {
      console.log("Duplicate claim request blocked");
      return new Response(
        JSON.stringify({ error: "You have already submitted a claim request for this listing recently" }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Store the claim request
    const { error: insertError } = await supabase.from("claim_requests").insert({
      listing_id: listingId,
      listing_name: listingName,
      name: name.substring(0, 100),
      email: email.substring(0, 255),
      role_at_company: role?.substring(0, 100) || null,
      message: message?.substring(0, 1000) || null,
      ip_address: ipAddress,
      status: "pending",
    });

    if (insertError) {
      console.error("Error inserting claim request:", insertError);
      throw insertError;
    }

    console.log(`Claim request stored for listing: ${listingName}`);

    // Send admin notification email if Resend is configured
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const adminEmail = Deno.env.get("ADMIN_EMAIL");

    if (resendApiKey && adminEmail) {
      try {
        const resend = new Resend(resendApiKey);
        const siteUrl = Deno.env.get("SITE_URL") || "https://www.showcase-music.com";

        await resend.emails.send({
          from: "Showcase Directory <notifications@showcase-music.com>",
          to: [adminEmail],
          subject: `New Claim Request: ${listingName}`,
          html: `
            <h2>New Listing Claim Request</h2>
            <p>Someone has requested to claim a listing on Showcase Music Directory.</p>
            
            <h3>Listing Details</h3>
            <ul>
              <li><strong>Listing:</strong> ${listingName}</li>
              <li><strong>Listing URL:</strong> <a href="${siteUrl}/listing/${listingId}">${siteUrl}/listing/${listingId}</a></li>
            </ul>
            
            <h3>Claimant Details</h3>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              ${role ? `<li><strong>Role:</strong> ${role}</li>` : ""}
              ${message ? `<li><strong>Message:</strong> ${message}</li>` : ""}
            </ul>
            
            <p>Please review this request in the admin panel.</p>
          `,
        });
        console.log("Admin notification email sent");
      } catch (emailError) {
        console.error("Error sending admin email:", emailError);
        // Don't fail the request if email fails
      }
    } else {
      console.log("Resend not configured, skipping email notification");
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    console.error("Error in submit-claim-request:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
