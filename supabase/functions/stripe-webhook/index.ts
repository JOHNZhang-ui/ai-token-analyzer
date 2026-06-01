// ============================================================
// TokenCost — Supabase Edge Function: stripe-webhook
// Listens for Stripe events and updates user subscription status.
// ============================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'npm:stripe@17';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // ── 1. Only accept POST ──
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return new Response('Missing stripe-signature header', { status: 400, headers: corsHeaders });
  }

  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? '';
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not configured');
    return new Response('Webhook secret not configured', { status: 500, headers: corsHeaders });
  }

  const stripeKey = Deno.env.get('STRIPE_SECRET_KEY') ?? '';
  const stripe = new Stripe(stripeKey, { apiVersion: '2024-06-20' });

  let event: Stripe.Event;

  try {
    const body = await req.text();
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret
    );
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error('Webhook signature verification failed:', errMsg);
    return new Response(`Signature verification failed: ${errMsg}`, { status: 400, headers: corsHeaders });
  }

  // ── 3. Handle the event ──
  console.log(`Received event: ${event.type}`);

  try {
    switch (event.type) {

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        // Only handle subscription checkouts
        if (session.mode !== 'subscription') break;

        const userId = session.client_reference_id || session.metadata?.user_id;
        const plan = session.metadata?.plan || 'pro_monthly';
        const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id ?? '';
        const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id ?? '';

        if (!userId) {
          console.error('No user_id found in session metadata');
          break;
        }

        // Init Supabase with service_role (bypasses RLS)
        const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
        const supabase = createClient(supabaseUrl, serviceRoleKey, {
          auth: { autoRefreshToken: false, persistSession: false },
        });

        // ── Upsert subscription record ──
        const { error: subError } = await supabase
          .from('subscriptions')
          .upsert({
            user_id: userId,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            stripe_price_id: '', // We'll pull this from the expanded session
            status: 'active',
            plan: plan,
            current_period_start: new Date().toISOString(),
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'stripe_subscription_id',
          });

        if (subError) {
          console.error('Failed to upsert subscription:', subError.message);
        }

        // ── Update profile plan ──
        const profilePlan = plan === 'pro_annual' ? 'pro' : 'pro';
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ plan: profilePlan, updated_at: new Date().toISOString() })
          .eq('id', userId);

        if (profileError) {
          console.error('Failed to update profile plan:', profileError.message);
        }

        console.log(`User ${userId} upgraded to ${plan}. Subscription: ${subscriptionId}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer?.id ?? '';

        const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
        const supabase = createClient(supabaseUrl, serviceRoleKey, {
          auth: { autoRefreshToken: false, persistSession: false },
        });

        // Find the user by stripe_customer_id
        const { data: subData } = await supabase
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_subscription_id', subscription.id)
          .single();

        if (subData?.user_id) {
          // Update subscription status
          await supabase
            .from('subscriptions')
            .update({ status: 'canceled', updated_at: new Date().toISOString() })
            .eq('stripe_subscription_id', subscription.id);

          // Downgrade profile to free
          await supabase
            .from('profiles')
            .update({ plan: 'free', updated_at: new Date().toISOString() })
            .eq('id', subData.user_id);

          console.log(`User ${subData.user_id} subscription ${subscription.id} canceled — downgraded to free`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error('Webhook handler error:', errMsg);
    return new Response(JSON.stringify({ error: errMsg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
