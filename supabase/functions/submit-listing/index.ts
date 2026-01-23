import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ListingSubmissionRequest {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  website?: string;
  city: string;
  country: string;
  description: string;
  categoryIds: string[];
  categoryNames: string[];
  honeypot?: string;
  pageLoadTime?: number;
}

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body: ListingSubmissionRequest = await req.json();
    console.log("Received listing submission request");

    // Spam protection: Honeypot check
    if (body.honeypot && body.honeypot.trim() !== "") {
      console.log("Honeypot triggered - likely spam");
      return new Response(
        JSON.stringify({ success: true, message: "Submission received" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Spam protection: Timing check (minimum 3 seconds)
    const currentTime = Date.now();
    const pageLoadTime = body.pageLoadTime || currentTime;
    const timeDiff = (currentTime - pageLoadTime) / 1000;
    
    if (timeDiff < 3) {
      console.log(`Form submitted too quickly: ${timeDiff}s`);
      return new Response(
        JSON.stringify({ error: "Please take your time filling out the form" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get client IP for rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";

    // Rate limiting: Max 3 submissions per IP per day
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count: recentSubmissions } = await supabase
      .from("listing_submissions")
      .select("*", { count: "exact", head: true })
      .eq("ip_address", clientIP)
      .gte("submitted_at", oneDayAgo);

    if (recentSubmissions && recentSubmissions >= 3) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many submissions. Please try again tomorrow." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate required fields
    if (!body.companyName?.trim() || !body.contactName?.trim() || !body.email?.trim() ||
        !body.city?.trim() || !body.country?.trim() || !body.description?.trim()) {
      return new Response(
        JSON.stringify({ error: "Please fill in all required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email.trim())) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize inputs
    const sanitize = (str: string) => str.trim().substring(0, 1000);
    const sanitizedData = {
      company_name: sanitize(body.companyName),
      contact_name: sanitize(body.contactName),
      email: body.email.trim().toLowerCase().substring(0, 255),
      phone: body.phone ? sanitize(body.phone) : null,
      website: body.website ? sanitize(body.website) : null,
      city: sanitize(body.city),
      country: sanitize(body.country),
      description: body.description.trim().substring(0, 5000),
      category_ids: body.categoryIds || [],
      category_names: body.categoryNames || [],
      ip_address: clientIP,
    };

    // Store submission in database
    const { error: insertError } = await supabase
      .from("listing_submissions")
      .insert(sanitizedData);

    if (insertError) {
      console.error("Failed to store submission:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to submit your request. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Listing submission stored successfully");

    // Send email notification
    if (resendApiKey) {
      try {
        // Get admin email from site settings
        const { data: settingsData } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", "bcc_email")
          .maybeSingle();

        const adminEmail = settingsData?.value;

        if (adminEmail) {
          const resend = new Resend(resendApiKey);
          
          const categoryList = sanitizedData.category_names.length > 0 
            ? sanitizedData.category_names.join(", ") 
            : "None selected";

          await resend.emails.send({
            from: "Showcase Music Directory <onboarding@resend.dev>",
            to: [adminEmail],
            subject: `New Listing Request: ${sanitizedData.company_name}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Listing Request</h1>
                
                <h2 style="color: #555;">Company Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Company Name:</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${sanitizedData.company_name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Contact Name:</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${sanitizedData.contact_name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${sanitizedData.phone || "Not provided"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Website:</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${sanitizedData.website ? `<a href="${sanitizedData.website}">${sanitizedData.website}</a>` : "Not provided"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Location:</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${sanitizedData.city}, ${sanitizedData.country}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Categories:</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${categoryList}</td>
                  </tr>
                </table>

                <h2 style="color: #555; margin-top: 20px;">Description</h2>
                <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${sanitizedData.description}</p>

                <p style="color: #888; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
                  Submitted at: ${new Date().toISOString()}<br>
                  IP Address: ${clientIP}
                </p>
              </div>
            `,
          });
          console.log("Admin notification email sent");
        } else {
          console.log("No admin email configured in site settings");
        }
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Don't fail the request if email fails
      }
    } else {
      console.log("RESEND_API_KEY not configured");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Your listing request has been submitted successfully!" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error processing listing submission:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
