// ============================================================
// TokenCost — Lemon Squeezy Payment Integration
// Handles checkout initiation, subscription status polling,
// and Pro feature unlocking after successful payment.
// ============================================================

const PAYMENT = {
  plans: {
    pro_monthly: {
      id: 'pro_monthly',
      name: 'Pro Monthly',
      price: 9.90,
      interval: 'month',
      features: ['unlimited_compare', 'history_trends', 'csv_export', 'alerts'],
      get variantId() {
        const cfg = window.TC_CONFIG || {};
        return cfg.variants?.proMonthly || '';
      },
    },
    pro_annual: {
      id: 'pro_annual',
      name: 'Pro Annual',
      price: 95.00,
      interval: 'year',
      features: ['unlimited_compare', 'history_trends', 'csv_export', 'alerts', 'priority_support'],
      get variantId() {
        const cfg = window.TC_CONFIG || {};
        return cfg.variants?.proAnnual || '';
      },
    }
  },

  // -- Start checkout for a plan --
  async checkout(planId) {
    if (!AUTH.user) {
      localStorage.setItem('tc_intended_plan', planId);
      window.location.href = 'auth.html';
      return;
    }

    const plan = this.plans[planId];
    if (!plan) {
      showToast('Invalid plan selected');
      return;
    }

    // Demo mode: simulate payment
    if (AUTH.isDemo) {
      AUTH.startCheckout(planId);
      return;
    }

    try {
      const { data, error } = await AUTH.client.functions.invoke('create-checkout', {
        body: {
          variantId: plan.variantId,
          planId: plan.id,
          successUrl: window.location.origin + '?checkout=success',
          cancelUrl: window.location.origin + '?checkout=canceled',
        }
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (e) {
      console.error('Checkout failed:', e);
      showToast('Payment system is being set up. Please check back soon.');
    }
  },

  // -- Handle return from Lemon Squeezy checkout --
  handleReturn() {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('checkout');

    if (status === 'success') {
      window.history.replaceState({}, '', window.location.pathname);
      this._refreshSubscription();

      const lang = I18N.current;
      showToast(lang === 'zh'
        ? '支付成功！Pro 功能已解锁。'
        : 'Payment successful! Pro features unlocked.');
    } else if (status === 'canceled') {
      window.history.replaceState({}, '', window.location.pathname);
    }

    const intendedPlan = localStorage.getItem('tc_intended_plan');
    if (intendedPlan && AUTH.user) {
      localStorage.removeItem('tc_intended_plan');
      setTimeout(() => this.checkout(intendedPlan), 500);
    }
  },

  // -- Refresh subscription status --
  async _refreshSubscription() {
    if (!AUTH.client || !AUTH.user) return;

    const { data } = await AUTH.client
      .from('subscriptions')
      .select('*')
      .eq('user_id', AUTH.user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (data && data.status === 'active') {
      await AUTH.client
        .from('profiles')
        .update({ plan: data.plan === 'pro_monthly' || data.plan === 'pro_annual' ? 'pro' : 'free' })
        .eq('id', AUTH.user.id);

      await AUTH._loadProfile();
      AUTH._renderAuthState();
    }
  },

  // -- Manage subscription (Lemon Squeezy customer portal) --
  async manageSubscription() {
    if (!AUTH.user) return;

    try {
      const { data } = await AUTH.client.functions.invoke('create-portal-session', {
        body: { returnUrl: window.location.origin }
      });
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      console.error('Portal session failed:', e);
    }
  }
};
