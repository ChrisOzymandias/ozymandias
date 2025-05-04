
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get request data
    const requestData = await req.json();
    
    if (req.method === "POST") {
      // Process incoming webhook data and save to database
      console.log("Received webhook data:", requestData);
      
      // Check if we have valid data
      if (!requestData.email || !requestData.name) {
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          { 
            status: 400, 
            headers: { 
              "Content-Type": "application/json",
              ...corsHeaders 
            } 
          }
        );
      }
      
      // Insert or update website request in database
      const { data, error } = await supabase
        .from("website_requests")
        .upsert([
          {
            email: requestData.email,
            name: requestData.name,
            phone: requestData.phone || null,
            company_name: requestData.company_name || null,
            project_details: requestData.project_details || "",
            status: requestData.status || "new",
            has_existing_website: requestData.has_existing_website || null,
            website_expectation: requestData.website_expectation || null,
            launch_timeline: requestData.launch_timeline || null,
            theme: requestData.theme || "no-theme",
            profession: requestData.profession || "unspecified",
            features: Array.isArray(requestData.features) ? requestData.features : [],
            quote_amount: requestData.quote_amount || null
          }
        ], { 
          onConflict: "email" 
        });
      
      if (error) {
        console.error("Error saving webhook data:", error);
        return new Response(
          JSON.stringify({ error: error.message }),
          { 
            status: 500, 
            headers: { 
              "Content-Type": "application/json",
              ...corsHeaders 
            } 
          }
        );
      }
      
      return new Response(
        JSON.stringify({ success: true, data }),
        { 
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          } 
        }
      );
    } else if (req.method === "GET") {
      // Retrieve website requests
      const { data, error } = await supabase
        .from("website_requests")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching website requests:", error);
        return new Response(
          JSON.stringify({ error: error.message }),
          { 
            status: 500, 
            headers: { 
              "Content-Type": "application/json",
              ...corsHeaders 
            } 
          }
        );
      }
      
      return new Response(
        JSON.stringify(data),
        { 
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          } 
        }
      );
    }
    
    // Method not allowed
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { 
        status: 405, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );

  } catch (error) {
    console.error("Error in webhook handler:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  }
});
