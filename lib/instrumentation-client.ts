"use client";

import posthog from 'posthog-js';

const initPostHog = () => {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';
  const isBrowser = typeof window !== 'undefined';
  const isProd = process.env.NODE_ENV === 'production';
  const allowedHosts = ['theclippingcompany.com', 'www.theclippingcompany.com'];

  if (!isBrowser) return; // SSR guard

  const currentHost = window.location.hostname;

  // 🚫 Skip initialization if not production or not on your live domain
  if (!isProd || !allowedHosts.includes(currentHost)) {
    if (process.env.NODE_ENV !== 'production') {
      console.info(`[PostHog] Skipped on ${currentHost} (${process.env.NODE_ENV})`);
    }
    // Optional: create dummy posthog object so console calls don't break
    (window as any).posthog = {
      capture: () => {},
      identify: () => {},
      reset: () => {},
      opt_out_capturing: () => {},
      opt_in_capturing: () => {},
      isDisabled: true,
    };
    return;
  }

  // ✅ Avoid re-init
  if ((window as any).__posthog_initialized) return;
  (window as any).__posthog_initialized = true;

  if (!key) {
    console.warn('[PostHog] Missing NEXT_PUBLIC_POSTHOG_KEY');
    return;
  }

  try {
    posthog.init(key, {
      api_host: host,
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
      loaded: (posthogInstance) => {
        (window as any).posthog = posthogInstance;
        console.info('[PostHog] ✅ Initialized (production)', { host, key });
      },
    });
  } catch (err) {
    console.error('[PostHog] init error', err);
  }
};

export { initPostHog };
export default posthog;
