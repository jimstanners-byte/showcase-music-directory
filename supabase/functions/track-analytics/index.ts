import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Time window for deduplication (in minutes)
const DEDUP_WINDOW_MINUTES = 30;

// Hash IP address for privacy
async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')?.slice(0, 16)); // Salt with partial key
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Get client IP from headers
function getClientIP(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIP = req.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  return 'unknown';
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { event_type, data } = await req.json();
    
    if (!event_type) {
      return new Response(JSON.stringify({ error: 'event_type is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const clientIP = getClientIP(req);
    const ipHash = await hashIP(clientIP);
    
    console.log(`Tracking ${event_type} from IP hash: ${ipHash.slice(0, 8)}...`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const cutoffTime = new Date(Date.now() - DEDUP_WINDOW_MINUTES * 60 * 1000).toISOString();
    let isDuplicate = false;
    let insertResult;

    switch (event_type) {
      case 'page_view': {
        const { page_url } = data;
        if (!page_url) {
          return new Response(JSON.stringify({ error: 'page_url is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        // Check for duplicate
        const { data: existing } = await supabase
          .from('page_views')
          .select('id')
          .eq('ip_hash', ipHash)
          .eq('page_url', page_url)
          .gte('viewed_at', cutoffTime)
          .limit(1);
        
        if (existing && existing.length > 0) {
          isDuplicate = true;
        } else {
          insertResult = await supabase
            .from('page_views')
            .insert({ page_url, ip_hash: ipHash });
        }
        break;
      }

      case 'listing_view': {
        const { listing_id } = data;
        if (!listing_id) {
          return new Response(JSON.stringify({ error: 'listing_id is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        const { data: existing } = await supabase
          .from('listing_views')
          .select('id')
          .eq('ip_hash', ipHash)
          .eq('listing_id', listing_id)
          .gte('viewed_at', cutoffTime)
          .limit(1);
        
        if (existing && existing.length > 0) {
          isDuplicate = true;
        } else {
          insertResult = await supabase
            .from('listing_views')
            .insert({ listing_id, ip_hash: ipHash });
        }
        break;
      }

      case 'category_view': {
        const { category_id, category_name, country, city } = data;
        if (!category_name) {
          return new Response(JSON.stringify({ error: 'category_name is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        const { data: existing } = await supabase
          .from('category_page_views')
          .select('id')
          .eq('ip_hash', ipHash)
          .eq('category_name', category_name)
          .gte('viewed_at', cutoffTime)
          .limit(1);
        
        if (existing && existing.length > 0) {
          isDuplicate = true;
        } else {
          insertResult = await supabase
            .from('category_page_views')
            .insert({ 
              category_id: category_id || null, 
              category_name, 
              country: country || null, 
              city: city || null, 
              ip_hash: ipHash 
            });
        }
        break;
      }

      case 'ad_view': {
        const { ad_id, page_url } = data;
        if (!ad_id) {
          return new Response(JSON.stringify({ error: 'ad_id is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        // First verify the ad exists to avoid foreign key errors
        const { data: adExists } = await supabase
          .from('ads')
          .select('id')
          .eq('id', ad_id)
          .maybeSingle();
        
        if (!adExists) {
          console.log(`Ad ${ad_id} not found, skipping ad_view tracking`);
          return new Response(JSON.stringify({ success: true, skipped: true, reason: 'ad_not_found' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        const { data: existing } = await supabase
          .from('ad_views')
          .select('id')
          .eq('ip_hash', ipHash)
          .eq('ad_id', ad_id)
          .gte('viewed_at', cutoffTime)
          .limit(1);
        
        if (existing && existing.length > 0) {
          isDuplicate = true;
        } else {
          insertResult = await supabase
            .from('ad_views')
            .insert({ ad_id, page_url: page_url || null, ip_hash: ipHash });
        }
        break;
      }

      case 'ad_click': {
        const { ad_id, page_url } = data;
        if (!ad_id) {
          return new Response(JSON.stringify({ error: 'ad_id is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        // First verify the ad exists to avoid foreign key errors
        const { data: adExists } = await supabase
          .from('ads')
          .select('id')
          .eq('id', ad_id)
          .maybeSingle();
        
        if (!adExists) {
          console.log(`Ad ${ad_id} not found, skipping ad_click tracking`);
          return new Response(JSON.stringify({ success: true, skipped: true, reason: 'ad_not_found' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        // Clicks are always recorded (no dedup for clicks)
        insertResult = await supabase
          .from('ad_clicks')
          .insert({ ad_id, page_url: page_url || null, ip_hash: ipHash });
        break;
      }

      case 'link_click': {
        const { listing_id, link_type, link_url } = data;
        if (!listing_id || !link_type) {
          return new Response(JSON.stringify({ error: 'listing_id and link_type are required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        // Clicks are always recorded (no dedup for clicks)
        insertResult = await supabase
          .from('listing_link_clicks')
          .insert({ listing_id, link_type, link_url: link_url || null, ip_hash: ipHash });
        break;
      }

      default:
        return new Response(JSON.stringify({ error: `Unknown event_type: ${event_type}` }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    if (isDuplicate) {
      console.log(`Duplicate ${event_type} skipped for IP hash: ${ipHash.slice(0, 8)}...`);
      return new Response(JSON.stringify({ success: true, deduplicated: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (insertResult?.error) {
      console.error(`Error inserting ${event_type}:`, insertResult.error);
      return new Response(JSON.stringify({ error: insertResult.error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Successfully tracked ${event_type}`);
    return new Response(JSON.stringify({ success: true, deduplicated: false }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error in track-analytics:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
