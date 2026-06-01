// ============================================================
// TokenCost — Production Configuration
// ============================================================
// Fill in your real credentials below. When all values are set,
// the site switches from Demo Mode to Production Mode automatically.
//
// Setup guide: open setup.html in your browser.
// ============================================================

window.TC_CONFIG = {

  // -- Supabase -------------------------------------------------------
  supabase: {
    url: 'https://qjtrbztxnmemmlstttib.supabase.co',
    anonKey: 'sb_publishable_W2vAurHDdgOs-tBpXs2buA_JWf9d21E',
  },

  // -- Lemon Squeezy --------------------------------------------------
  // 1. Register at https://www.lemonsqueezy.com
  // 2. Settings → API → Generate API Key
  // 3. Create Products → copy Variant IDs and Store ID
  lemonsqueezy: {
    storeId: 'YOUR_STORE_ID',
    apiKey:  'YOUR_LS_API_KEY',
  },

  // -- Lemon Squeezy Variant IDs --
  // TokenCost Pro Monthly ($9.90/mo) and Pro Annual ($95/yr)
  variants: {
    proMonthly: 'YOUR_MONTHLY_VARIANT_ID',
    proAnnual:  'YOUR_ANNUAL_VARIANT_ID',
  },

  // -- Edge Function URL (after deploying to Supabase) ----------------
  edgeFunctionUrl: 'https://qjtrbztxnmemmlstttib.supabase.co/functions/v1/create-checkout',
};
