// Reject Bulk Enquiry Edge Function
// Admin function to reject pending bulk enquiry with reason

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

    const { enquiryId, rejectionReason } = await req.json();

    if (!enquiryId) {
      return new Response(
        JSON.stringify({ error: "Enquiry ID required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!rejectionReason || rejectionReason.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Rejection reason required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get the enquiry
    const { data: enquiry, error: enquiryError } = await supabaseServiceRole
      .from("bulk_enquiries")
      .select("status")
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

    // Update enquiry status to rejected
    const { error: updateError } = await supabaseServiceRole
      .from("bulk_enquiries")
      .update({
        status: "rejected",
        rejection_reason: rejectionReason.trim(),
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id,
      })
      .eq("id", enquiryId);

    if (updateError) {
      console.error("Error updating enquiry:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to reject enquiry" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ 
        message: "Enquiry rejected successfully",
        success: true
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in reject-bulk-enquiry:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
