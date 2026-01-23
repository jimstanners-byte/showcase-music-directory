import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface GeneralEnquiryRequest {
  senderName: string;
  senderEmail: string;
  company?: string;
  subject: string;
  message: string;
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

    const body: GeneralEnquiryRequest = await req.json();
    console.log("Received general enquiry request");

    // Spam protection: Honeypot check
    if (body.honeypot && body.honeypot.trim() !== "") {
      console.log("Honeypot triggered - likely spam");
      return new Response(
        JSON.stringify({ success: true, message: "Message received" }),
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

    // Rate limiting: Max 5 enquiries per IP per hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: recentEnquiries } = await supabase
      .from("general_enquiries")
      .select("*", { count: "exact", head: true })
      .eq("ip_address", clientIP)
      .gte("submitted_at", oneHourAgo);

    if (recentEnquiries && recentEnquiries >= 5) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many messages. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate required fields
    if (!body.senderName?.trim() || !body.senderEmail?.trim() || 
        !body.subject?.trim() || !body.message?.trim()) {
      return new Response(
        JSON.stringify({ error: "Please fill in all required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.senderEmail.trim())) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate message length
    if (body.message.trim().length < 10) {
      return new Response(
        JSON.stringify({ error: "Please provide a more detailed message" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize inputs
    const sanitize = (str: string) => str.trim().substring(0, 1000);
    const sanitizedData = {
      sender_name: sanitize(body.senderName),
      sender_email: body.senderEmail.trim().toLowerCase().substring(0, 255),
      company: body.company ? sanitize(body.company) : null,
      subject: sanitize(body.subject),
      message: body.message.trim().substring(0, 5000),
      ip_address: clientIP,
    };

    // Store enquiry in database
    const { error: insertError } = await supabase
      .from("general_enquiries")
      .insert(sanitizedData);

    if (insertError) {
      console.error("Failed to store enquiry:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to send your message. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("General enquiry stored successfully");

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

          await resend.emails.send({
            from: "Showcase Music Directory <onboarding@resend.dev>",
            to: [adminEmail],
            reply_to: sanitizedData.sender_email,
            subject: `Contact Form: ${sanitizedData.subject}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Contact Form Submission</h1>
                
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                  <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">From:</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${sanitizedData.sender_name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${sanitizedData.sender_email}">${sanitizedData.sender_email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${sanitizedData.company || "Not provided"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Subject:</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${sanitizedData.subject}</td>
                  </tr>
                </table>

                <h2 style="color: #555; margin-top: 20px;">Message</h2>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${sanitizedData.message}</div>

                <p style="color: #888; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
                  Submitted at: ${new Date().toISOString()}<br>
                  IP Address: ${clientIP}
                </p>
                
                <p style="margin-top: 20px;">
                  <a href="mailto:${sanitizedData.sender_email}?subject=Re: ${encodeURIComponent(sanitizedData.subject)}" 
                     style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                    Reply to ${sanitizedData.sender_name}
                  </a>
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
      JSON.stringify({ success: true, message: "Your message has been sent successfully!" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error processing general enquiry:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
