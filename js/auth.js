// ============================================================
// TokenCost — Auth Client
// Supports BOTH Supabase (production) and Demo Mode (localStorage).
// Demo mode auto-enables when Supabase URL is not configured.
// ============================================================

const AUTH = {
  // ── Configuration ──
  supabaseUrl: '',
  supabaseAnonKey: '',
  client: null,
  user: null,
  profile: null,
  isPro: false,
  isDemo: false,

  // ── Initialize ──
  async init(url, anonKey) {
    // Priority: 1) config.js  2) function args  3) localStorage  4) demo mode
    const cfg = window.TC_CONFIG || {};
    this.supabaseUrl = cfg.supabase?.url || url || localStorage.getItem('tc_supabase_url') || '';
    this.supabaseAnonKey = cfg.supabase?.anonKey || anonKey || localStorage.getItem('tc_supabase_anon_key') || '';

    if (!this.supabaseUrl || !this.supabaseAnonKey) {
      // No Supabase config → enable DEMO mode
      this.isDemo = true;
      this._restoreDemoSession();
      this._renderAuthState();
      console.info('[TokenCost Auth] Demo mode enabled. Set credentials in config.js or setup.html.');
      return !!this.user;
    }

    // Production: load Supabase SDK
    if (typeof supabase === 'undefined') {
      await this._loadSDK();
    }

    try {
      this.client = supabase.createClient(this.supabaseUrl, this.supabaseAnonKey);
      const { data: { session } } = await this.client.auth.getSession();
      if (session) {
        this.user = session.user;
        await this._loadProfile();
      }
      // Listen for auth state changes (email confirmation, OAuth redirect, multi-tab sync)
      this.client.auth.onAuthStateChange((_event, session) => {
        if (session) {
          this.user = session.user;
          this._loadProfile().then(() => this._renderAuthState());
        } else {
          this.user = null;
          this.profile = null;
          this.isPro = false;
          this._renderAuthState();
        }
      });
    } catch (e) {
      console.warn('[TokenCost Auth] Supabase init failed, falling back to demo:', e.message);
      this.isDemo = true;
      this.client = null;
      this._restoreDemoSession();
    }

    this._renderAuthState();
    return !!this.user;
  },

  async _loadSDK() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
      script.type = 'module';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  },

  async _loadProfile() {
    if (!this.client || !this.user) return;
    try {
      const { data } = await this.client
        .from('profiles')
        .select('*')
        .eq('id', this.user.id)
        .single();
      if (data) {
        this.profile = data;
        this.isPro = data.plan === 'pro';
      }
    } catch (e) {
      console.warn('[TokenCost Auth] Could not load profile:', e.message);
    }
  },

  // ── Demo Mode (localStorage) ──
  _restoreDemoSession() {
    const saved = localStorage.getItem('tc_demo_user');
    if (saved) {
      try {
        const d = JSON.parse(saved);
        this.user = d.user || null;
        this.profile = d.profile || null;
        this.isPro = d.profile?.plan === 'pro';
      } catch { this.user = null; }
    }
  },

  _saveDemoSession() {
    localStorage.setItem('tc_demo_user', JSON.stringify({
      user: this.user,
      profile: this.profile
    }));
  },

  _clearDemoSession() {
    localStorage.removeItem('tc_demo_user');
  },

  _makeDemoUser(email, name) {
    const id = 'demo_' + Math.random().toString(36).slice(2, 10);
    return {
      id,
      email,
      user_metadata: { full_name: name || email.split('@')[0] },
      created_at: new Date().toISOString()
    };
  },

  // ── Auth actions ──
  async signUp(email, password, fullName) {
    if (this.isDemo) {
      const existing = localStorage.getItem('tc_demo_' + email);
      if (existing) return { error: { message: 'An account with this email already exists.' } };
      const user = this._makeDemoUser(email, fullName);
      const profile = { id: user.id, full_name: fullName || email.split('@')[0], plan: 'free' };
      localStorage.setItem('tc_demo_' + email, JSON.stringify({ password, user, profile }));
      this.user = user;
      this.profile = profile;
      this.isPro = false;
      this._saveDemoSession();
      this._renderAuthState();
      return { data: { user }, error: null };
    }
    if (!this.client) return { error: { message: 'Auth not configured' } };
    const { data, error } = await this.client.auth.signUp({
      email, password,
      options: {
        data: { full_name: fullName || '' },
        emailRedirectTo: window.location.origin + '/auth.html'
      }
    });
    if (!error && data.user) {
      // Only auto-login if a session was created (email confirmation disabled)
      if (data.session) {
        this.user = data.user;
        await this._loadProfile();
        this._renderAuthState();
      }
    }
    return { data, error };
  },

  async signIn(email, password) {
    if (this.isDemo) {
      const saved = localStorage.getItem('tc_demo_' + email);
      if (!saved) return { error: { message: 'No account found with this email.' } };
      const d = JSON.parse(saved);
      if (d.password !== password) return { error: { message: 'Incorrect password.' } };
      this.user = d.user;
      this.profile = d.profile;
      this.isPro = d.profile?.plan === 'pro';
      this._saveDemoSession();
      this._renderAuthState();
      return { data: { user: d.user }, error: null };
    }
    if (!this.client) return { error: { message: 'Auth not configured' } };
    const { data, error } = await this.client.auth.signInWithPassword({ email, password });
    if (!error && data.user) {
      this.user = data.user;
      await this._loadProfile();
      this._renderAuthState();
    }
    return { data, error };
  },

  async signInWithOAuth(provider) {
    if (this.isDemo) {
      // Simulate OAuth in demo mode
      const email = 'demo_' + provider + '@tokencost.app';
      const user = this._makeDemoUser(email, 'Demo ' + provider.charAt(0).toUpperCase() + provider.slice(1));
      const profile = { id: user.id, full_name: user.user_metadata.full_name, plan: 'free' };
      localStorage.setItem('tc_demo_' + email, JSON.stringify({ password: 'oauth', user, profile }));
      this.user = user;
      this.profile = profile;
      this.isPro = false;
      this._saveDemoSession();
      this._renderAuthState();
      return { error: null };
    }
    if (!this.client) return { error: { message: 'Auth not configured' } };
    return await this.client.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin + '/auth.html' }
    });
  },

  async signOut() {
    if (this.isDemo) {
      this.user = null;
      this.profile = null;
      this.isPro = false;
      this._clearDemoSession();
      this._renderAuthState();
      return;
    }
    if (!this.client) return;
    await this.client.auth.signOut();
    this.user = null;
    this.profile = null;
    this.isPro = false;
    this._renderAuthState();
  },

  async resendVerification(email) {
    if (this.isDemo || !this.client) return { error: { message: 'Not available in demo mode' } };
    const { error } = await this.client.auth.resend({
      type: 'signup',
      email,
      options: { emailRedirectTo: window.location.origin + '/auth.html' }
    });
    return { error };
  },

  // ── Demo: simulate Pro upgrade ──
  async simulateUpgrade(plan) {
    if (!this.isDemo || !this.user) return;
    this.profile = { ...(this.profile || {}), plan: plan || 'pro' };
    this.isPro = true;
    const email = this.user.email;
    const saved = localStorage.getItem('tc_demo_' + email);
    if (saved) {
      const d = JSON.parse(saved);
      d.profile = this.profile;
      localStorage.setItem('tc_demo_' + email, JSON.stringify(d));
    }
    this._saveDemoSession();
    this._renderAuthState();
  },

  // ── Payment checkout (initiates from frontend) ──
  async startCheckout(plan) {
    if (!this.user) {
      showToast('Please sign in first');
      return;
    }
    if (this.isDemo) {
      // Demo mode: simulate successful upgrade after 1s
      showToast('Processing demo payment...');
      setTimeout(() => {
        this.simulateUpgrade(plan);
        showToast('Upgraded to Pro! (Demo Mode)');
        if (typeof PAYMENT !== 'undefined') PAYMENT.handleReturn();
      }, 800);
      return;
    }
    if (!this.client) {
      showToast('Auth not configured');
      return;
    }
    try {
      const { data, error } = await this.client.functions.invoke('create-checkout-session', {
        body: { plan, userId: this.user.id, email: this.user.email }
      });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (e) {
      console.error('Checkout error:', e);
      showToast('Payment initiation failed. Please try again.');
    }
  },

  // ── UI rendering ──
  _renderAuthState() {
    document.querySelectorAll('[data-auth-role]').forEach(el => {
      const role = el.dataset.authRole;
      if (role === 'logged-out' && !this.user) el.style.display = '';
      else if (role === 'logged-in' && this.user) el.style.display = '';
      else if (role === 'pro' && this.isPro) el.style.display = '';
      else el.style.display = 'none';
    });

    document.querySelectorAll('[data-auth-user-name]').forEach(el => {
      el.textContent = this.profile?.full_name || this.user?.user_metadata?.full_name || this.user?.email?.split('@')[0] || 'User';
    });

    document.querySelectorAll('[data-auth-pro-badge]').forEach(el => {
      el.style.display = this.isPro ? '' : 'none';
    });

    document.querySelectorAll('[data-pro-only]').forEach(el => {
      el.style.display = this.isPro ? '' : 'none';
    });
    document.querySelectorAll('[data-free-only]').forEach(el => {
      el.style.display = this.isPro && el.dataset.freeOnly === 'hide' ? 'none' : '';
    });

    document.querySelectorAll('.pro-locked').forEach(el => {
      if (this.isPro) {
        el.classList.remove('pro-locked');
        el.classList.add('pro-unlocked');
      }
    });

    // Trigger custom event for other modules
    window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user: this.user, isPro: this.isPro } }));
  },

  _renderUnauthenticated() {
    document.querySelectorAll('[data-auth-role]').forEach(el => {
      const role = el.dataset.authRole;
      el.style.display = role === 'logged-out' ? '' : 'none';
    });
  }
};

// ── Initialize on page load ──
document.addEventListener('DOMContentLoaded', () => {
  const url = localStorage.getItem('tc_supabase_url');
  const key = localStorage.getItem('tc_supabase_anon_key');
  if (url && key) {
    AUTH.init(url, key);
  } else {
    AUTH.init(window.TC_SUPABASE_URL, window.TC_SUPABASE_ANON_KEY);
  }
});
