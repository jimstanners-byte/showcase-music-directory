// Approve Bulk Enquiry Edge Function
// Admin function to approve pending bulk enquiry and send emails to all companies

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get auth token from request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Set auth token for Supabase client
    supabase.auth.setSession({
      access_token: authHeader.replace("Bearer ", ""),
      refresh_token: "",
    });

    // Verify user is admin
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check admin role using service role key
    const supabaseServiceRole = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data: userRole, error: roleError } = await supabaseServiceRole
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (roleError || !userRole || userRole.role !== "admin") {
      return new Response(
        JSON.stringify({ error: "Admin access required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { enquiryId } = await req.json();

    if (!enquiryId) {
      return new Response(
        JSON.stringify({ error: "Enquiry ID required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get the enquiry
    const { data: enquiry, error: enquiryError } = await supabaseServiceRole
      .from("bulk_enquiries")
      .select("*")
      .eq("id", enquiryId)
      .single();

    if (enquiryError || !enquiry) {
      return new Response(
        JSON.stringify({ error: "Enquiry not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (enquiry.status !== "pending") {
      return new Response(
        JSON.stringify({ error: "Enquiry already processed" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send emails to all companies using Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    let emailsSent = 0;
    let emailsFailed = 0;

    if (resendApiKey) {
      for (let i = 0; i < enquiry.listing_emails.length; i++) {
        const email = enquiry.listing_emails[i];
        const name = enquiry.listing_names[i];
        const listingId = enquiry.listing_ids[i];

        try {
          const emailResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
              from: "Showcase Music Directory <noreply@showcase.com>", // Update with your domain
              to: [email],
              reply_to: enquiry.sender_email,
              subject: `New enquiry from ${enquiry.sender_name} via Showcase Music Directory`,
              html: `
                <h2>New Contact Form Enquiry</h2>
                <p><strong>From:</strong> ${enquiry.sender_name} (${enquiry.sender_email})</p>
                <p><strong>Company:</strong> ${name}</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p>${enquiry.message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p style="color: #666; font-size: 12px;">
                  This message was sent via the Showcase Music Directory bulk contact form.
                  Reply directly to this email to respond to ${enquiry.sender_name}.
                </p>
              `,
            }),
          });

          if (emailResponse.ok) {
            emailsSent++;
            
            // Store individual contact message
            await supabaseServiceRole.from("contact_messages").insert({
              listing_id: listingId,
              bulk_enquiry_id: enquiryId,
              sender_name: enquiry.sender_name,
              sender_email: enquiry.sender_email,
              message: enquiry.message,
              status: "sent",
            });
          } else {
            emailsFailed++;
            console.error(`Failed to send email to ${email}`);
          }
        } catch (error) {
          emailsFailed++;
          console.error(`Error sending email to ${email}:`, error);
        }
      }
    }

    // Update enquiry status
    const { error: updateError } = await supabaseServiceRole
      .from("bulk_enquiries")
      .update({
        status: "approved",
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id,
      })
      .eq("id", enquiryId);

    if (updateError) {
      console.error("Error updating enquiry:", updateError);
    }

    return new Response(
      JSON.stringify({ 
        message: `Enquiry approved. Sent ${emailsSent} emails${emailsFailed > 0 ? `, ${emailsFailed} failed` : ''}.`,
        emailsSent,
        emailsFailed,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in approve-bulk-enquiry:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
