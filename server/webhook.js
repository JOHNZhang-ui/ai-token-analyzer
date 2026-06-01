// ============================================================
// TokenCost — Stripe Webhook Server
// Handles Stripe events, syncs subscription status to Supabase.
//
// Usage:
//   1. Copy .env.example → .env, fill in keys
//   2. npm install && npm start
//   3. Expose via ngrok for local dev: ngrok http 3000
//   4. Set Stripe webhook endpoint: https://xxx.ngrok.io/webhook
// ============================================================

require('dotenv').config();

const express = require('express');
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// ── Stripe requires raw body for signature verification ──
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('[Webhook] Signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`[Webhook] ${event.type}`);

  try {
    switch (event.type) {
      // ── Checkout completed → activate subscription ──
      case 'checkout.session.completed': {
        const session = event.data.object;
        await handleCheckoutCompleted(session);
        break;
      }

      // ── Subscription updated (renewal, plan change) ──
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      // ── Subscription deleted (canceled/expired) ──
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      // ── Invoice paid (recurring billing) ──
      case 'invoice.paid': {
        const invoice = event.data.object;
        if (invoice.subscription) {
          console.log(`[Webhook] Invoice paid for subscription ${invoice.subscription}`);
        }
        break;
      }

      // ── Invoice payment failed ──
      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        console.warn(`[Webhook] Payment failed for subscription ${invoice.subscription}`);
        if (invoice.subscription) {
          await supabase
            .from('subscriptions')
            .update({ status: 'past_due', updated_at: new Date().toISOString() })
            .eq('stripe_subscription_id', invoice.subscription);
        }
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event: ${event.type}`);
    }
  } catch (err) {
    console.error(`[Webhook] Error handling ${event.type}:`, err);
    return res.status(500).send('Internal error');
  }

  res.json({ received: true });
});

// ── Health check ──
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Event Handlers ──

async function handleCheckoutCompleted(session) {
  const { client_reference_id, subscription: subscriptionId, customer: customerId } = session;

  if (!client_reference_id) {
    console.warn('[Webhook] No client_reference_id in session');
    return;
  }

  const userId = client_reference_id; // We pass userId as client_reference_id

  // Upsert subscription record
  const { error } = await supabase
    .from('subscriptions')
    .upsert({
      user_id: userId,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      status: 'active',
      plan: session.metadata?.plan || 'pro_monthly',
      current_period_start: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'stripe_subscription_id' });

  if (error) {
    console.error('[Webhook] Failed to upsert subscription:', error);
    return;
  }

  // Update profile plan to 'pro'
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ plan: 'pro', updated_at: new Date().toISOString() })
    .eq('id', userId);

  if (profileError) {
    console.error('[Webhook] Failed to update profile:', profileError);
  }

  console.log(`[Webhook] Pro activated for user ${userId}`);
}

async function handleSubscriptionUpdated(subscription) {
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      canceled_at: subscription.cancel_at_period_end ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('[Webhook] Failed to update subscription:', error);
    return;
  }
  console.log(`[Webhook] Subscription ${subscription.id} updated: ${subscription.status}`);
}

async function handleSubscriptionDeleted(subscription) {
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      canceled_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('[Webhook] Failed to cancel subscription:', error);
    return;
  }

  // Downgrade user to free
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_subscription_id', subscription.id)
    .single();

  if (sub) {
    await supabase
      .from('profiles')
      .update({ plan: 'free', updated_at: new Date().toISOString() })
      .eq('id', sub.user_id);
  }

  console.log(`[Webhook] Subscription ${subscription.id} canceled`);
}

// ── Start server ──
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[TokenCost Server] Running on port ${PORT}`);
  console.log(`[TokenCost Server] Webhook endpoint: POST /webhook`);
});
