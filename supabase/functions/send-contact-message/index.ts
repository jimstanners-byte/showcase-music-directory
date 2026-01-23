// Send Contact Message Edge Function
// Validates spam protection and sends individual contact message immediately

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactMessagePayload {
  listingId: string;
  listingName: string;
  listingEmail: string;
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

    const payload: ContactMessagePayload = await req.json();
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
    const { count: recentMessages } = await supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .eq("ip_address", ipAddress)
      .gte("created_at", oneHourAgo);

    if (recentMessages && recentMessages >= 5) {
      console.log("Rate limit exceeded for IP:", ipAddress);
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validation
    if (!payload.message || payload.message.length < 10) {
      return new Response(
        JSON.stringify({ error: "Message must be at least 10 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!payload.listingEmail) {
      return new Response(
        JSON.stringify({ error: "Listing has no email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Store contact message in database
    const { error: insertError } = await supabase
      .from("contact_messages")
      .insert({
        listing_id: payload.listingId,
        sender_name: payload.senderName.trim(),
        sender_email: payload.senderEmail.trim(),
        message: payload.message.trim(),
        ip_address: ipAddress,
        status: "sent",
      });

    if (insertError) {
      console.error("Error storing contact message:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to store message" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send email using Resend (if RESEND_API_KEY is set)
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Showcase Music Directory <noreply@showcase.com>", // Update with your domain
            to: [payload.listingEmail],
            reply_to: payload.senderEmail,
            subject: `New enquiry from ${payload.senderName} via Showcase Music Directory`,
            html: `
              <h2>New Contact Form Enquiry</h2>
              <p><strong>From:</strong> ${payload.senderName} (${payload.senderEmail})</p>
              <p><strong>Company:</strong> ${payload.listingName}</p>
              <hr>
              <p><strong>Message:</strong></p>
              <p>${payload.message.replace(/\n/g, '<br>')}</p>
              <hr>
              <p style="color: #666; font-size: 12px;">
                This message was sent via the Showcase Music Directory contact form.
                Reply directly to this email to respond to ${payload.senderName}.
              </p>
            `,
          }),
        });

        if (!emailResponse.ok) {
          const errorData = await emailResponse.text();
          console.error("Resend API error:", errorData);
          // Don't fail - message is stored in database
        }
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Don't fail - message is stored in database
      }
    } else {
      console.warn("RESEND_API_KEY not set - email not sent");
    }

    return new Response(
      JSON.stringify({ 
        message: "Message sent successfully",
        success: true
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in send-contact-message:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
