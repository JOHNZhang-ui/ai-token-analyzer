// ============================================================
// TokenCost — Supabase Edge Function: ls-webhook
// Listens for Lemon Squeezy events and updates user subscription status.
// ============================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { crypto } from 'https://deno.land/std@0.224.0/crypto/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Convert hex string to ArrayBuffer for HMAC
function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

async function verifySignature(body: string, signature: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
  const computedHex = Array.from(new Uint8Array(sig))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  return computedHex === signature;
}

Deno.serve(async (req) => {
  // -- 1. Only accept POST --
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  const signature = req.headers.get('x-signature');
  if (!signature) {
    return new Response('Missing x-signature header', { status: 400, headers: corsHeaders });
  }

  const webhookSecret = Deno.env.get('LEMONSQUEEZY_WEBHOOK_SECRET') ?? '';
  if (!webhookSecret) {
    console.error('LEMONSQUEEZY_WEBHOOK_SECRET not configured');
    return new Response('Webhook secret not configured', { status: 500, headers: corsHeaders });
  }

  const body = await req.text();

  // -- 2. Verify signature --
  const valid = await verifySignature(body, signature, webhookSecret);
  if (!valid) {
    console.error('Invalid webhook signature');
    return new Response('Invalid signature', { status: 401, headers: corsHeaders });
  }

  let event;
  try {
    event = JSON.parse(body);
  } catch {
    return new Response('Invalid JSON', { status: 400, headers: corsHeaders });
  }

  const eventName = event?.meta?.event_name;
  const customData = event?.meta?.custom_data || {};
  const eventData = event?.data;

  console.log(`Received LS event: ${eventName}`);

  // -- 3. Init Supabase --
  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  try {
    switch (eventName) {

      // -- Order created (one-time or first subscription payment) --
      case 'order_created': {
        const userId = customData?.user_id;
        const plan = customData?.plan || 'pro_monthly';
        const orderId = eventData?.id?.toString() || '';
        const customerId = eventData?.attributes?.customer_id?.toString() || '';
        const subscriptionId = eventData?.attributes?.subscription_id?.toString() || '';
        const variantId = eventData?.attributes?.variant_id?.toString() || '';
        const status = eventData?.attributes?.status === 'paid' ? 'active' : 'pending';
        const renewsAt = eventData?.attributes?.renews_at || null;

        if (!userId) {
          console.error('No user_id in custom_data');
          break;
        }

        // Upsert subscription record
        await supabase.from('subscriptions').upsert({
          user_id: userId,
          ls_customer_id: customerId,
          ls_subscription_id: subscriptionId || orderId,
          ls_variant_id: variantId,
          status: status,
          plan: plan,
          current_period_start: new Date().toISOString(),
          current_period_end: renewsAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'ls_subscription_id' });

        if (status === 'active') {
          await supabase.from('profiles')
            .update({ plan: 'pro', updated_at: new Date().toISOString() })
            .eq('id', userId);
        }

        console.log(`User ${userId} ${status === 'active' ? 'activated' : 'pending'} plan ${plan}`);
        break;
      }

      // -- Subscription created --
      case 'subscription_created': {
        const userId = customData?.user_id;
        const plan = customData?.plan || 'pro_monthly';
        const subId = eventData?.id?.toString() || '';
        const customerId = eventData?.attributes?.customer_id?.toString() || '';
        const variantId = eventData?.attributes?.variant_id?.toString() || '';
        const renewsAt = eventData?.attributes?.renews_at || null;

        if (!userId) break;

        await supabase.from('subscriptions').upsert({
          user_id: userId,
          ls_customer_id: customerId,
          ls_subscription_id: subId,
          ls_variant_id: variantId,
          status: 'active',
          plan: plan,
          current_period_start: new Date().toISOString(),
          current_period_end: renewsAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'ls_subscription_id' });

        await supabase.from('profiles')
          .update({ plan: 'pro', updated_at: new Date().toISOString() })
          .eq('id', userId);

        console.log(`Subscription created for user ${userId}, plan ${plan}`);
        break;
      }

      // -- Subscription updated (renewal, plan change) --
      case 'subscription_updated': {
        const subId = eventData?.id?.toString() || '';
        const newStatus = eventData?.attributes?.status === 'active' ? 'active'
          : eventData?.attributes?.status === 'cancelled' ? 'canceled'
          : eventData?.attributes?.status === 'expired' ? 'expired'
          : eventData?.attributes?.status === 'past_due' ? 'past_due'
          : 'active';
        const renewsAt = eventData?.attributes?.renews_at || null;

        if (!subId) break;

        await supabase.from('subscriptions')
          .update({
            status: newStatus,
            current_period_end: renewsAt,
            updated_at: new Date().toISOString(),
          })
          .eq('ls_subscription_id', subId);

        // If cancelled/expired, downgrade user
        if (newStatus === 'canceled' || newStatus === 'expired') {
          const { data: subData } = await supabase.from('subscriptions')
            .select('user_id')
            .eq('ls_subscription_id', subId)
            .single();

          if (subData?.user_id) {
            await supabase.from('profiles')
              .update({ plan: 'free', updated_at: new Date().toISOString() })
              .eq('id', subData.user_id);
            console.log(`User ${subData.user_id} downgraded to free`);
          }
        }

        console.log(`Subscription ${subId} updated, status: ${newStatus}`);
        break;
      }

      // -- Subscription cancelled --
      case 'subscription_cancelled': {
        const subId = eventData?.id?.toString() || '';

        if (!subId) break;

        await supabase.from('subscriptions')
          .update({
            status: 'canceled',
            updated_at: new Date().toISOString(),
          })
          .eq('ls_subscription_id', subId);

        const { data: subData } = await supabase.from('subscriptions')
          .select('user_id')
          .eq('ls_subscription_id', subId)
          .single();

        if (subData?.user_id) {
          await supabase.from('profiles')
            .update({ plan: 'free', updated_at: new Date().toISOString() })
            .eq('id', subData.user_id);
          console.log(`User ${subData.user_id} downgraded to free (cancelled)`);
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${eventName}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Webhook handler error:', err);
    return new Response(
      JSON.stringify({ error: err?.message || 'Internal error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
