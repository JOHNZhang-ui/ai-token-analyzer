// ============================================================
// TokenCost — Supabase Edge Function: create-checkout
// Creates a Lemon Squeezy checkout and returns the URL.
// ============================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { variantId, planId, successUrl, cancelUrl } = await req.json();

    if (!variantId || !planId) {
      return new Response(
        JSON.stringify({ error: 'Missing variantId or planId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // -- Verify user auth --
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing Authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', detail: authError?.message }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // -- Lemon Squeezy Checkout --
    const lsApiKey = Deno.env.get('LEMONSQUEEZY_API_KEY') ?? '';
    const lsStoreId = Deno.env.get('LEMONSQUEEZY_STORE_ID') ?? '';

    if (!lsApiKey || !lsStoreId) {
      console.error('Lemon Squeezy config missing');
      return new Response(
        JSON.stringify({ error: 'Payment system not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const lsRes = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${lsApiKey}`,
      },
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            product_options: {
              enabled_variants: [Number(variantId)],
            },
            checkout_options: {
              button_color: '#2563eb',
            },
            checkout_data: {
              email: user.email || '',
              custom: {
                user_id: user.id,
                plan: planId,
              },
            },
          },
          relationships: {
            store: {
              data: { type: 'stores', id: String(lsStoreId) },
            },
            variant: {
              data: { type: 'variants', id: String(variantId) },
            },
          },
        },
      }),
    });

    const lsData = await lsRes.json();

    if (!lsRes.ok) {
      console.error('LS checkout error:', JSON.stringify(lsData));
      return new Response(
        JSON.stringify({ error: lsData?.errors?.[0]?.detail || 'Checkout creation failed' }),
        { status: lsRes.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const checkoutUrl = lsData?.data?.attributes?.url;
    if (!checkoutUrl) {
      return new Response(
        JSON.stringify({ error: 'No checkout URL in LS response' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ url: checkoutUrl }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('FUNCTION ERROR:', err);
    return new Response(
      JSON.stringify({
        error: err?.message || 'Unknown error',
        name: err?.name || 'Error',
        stack: err?.stack?.substring(0, 500),
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
