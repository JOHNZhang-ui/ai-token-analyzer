// ============================================================
// TokenCost — Production Configuration
// ============================================================
// Fill in your real credentials below. When all values are set,
// the site switches from Demo Mode to Production Mode automatically.
//
// Setup guide: open setup.html in your browser.
// ============================================================

window.TC_CONFIG = {

  // ── Supabase ────────────────────────────────────────────
  // 1. Go to https://supabase.com → Create Project
  // 2. Settings → API → copy "Project URL" and "anon public" key
  supabase: {
    url: 'https://qjtrbztxnmemmlstttib.supabase.co',
    anonKey: 'sb_publishable_W2vAurHDdgOs-tBpXs2buA_JWf9d21E',
  },

  // ── Stripe ──────────────────────────────────────────────
  stripe: {
    publishableKey: 'pk_test_51TbzomBJHE0CouxZctfec1h7fmqI95iHVrClCYOJ3mpQFaVcpHeaTVrrnw67tsW45GCjWUblpUpvQNLTEsM8UQHA00khPK15ia',
  },

  // ── Stripe Price IDs ──
  // TokenCost Pro Monthly ($9.90/mo) and Pro Annual ($95/yr)
  prices: {
    proMonthly: 'price_1TcOG4BJHE0CouxZsRI2Q3U0',
    proAnnual:  'price_1TcOH3BJHE0CouxZExZYr1TS',
  },

  // ── Edge Function URL (after deploying to Supabase) ─────
  edgeFunctionUrl: 'https://qjtrbztxnmemmlstttib.supabase.co/functions/v1/create-checkout',
};
