"use client";

import posthog from 'posthog-js';

const initPostHog = () => {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!key) {
    if (typeof window !== 'undefined') console.warn('[PostHog] NEXT_PUBLIC_POSTHOG_KEY not set');
    return;
  }

  // init only once
  if ((window as any).__posthog_initialized) return;
  (window as any).__posthog_initialized = true;

  try {
    posthog.init(key as string, {
      api_host: host || 'https://app.posthog.com',
      // opt out of capture by default in dev if you want (optional)
      // autocapture and other defaults are enabled by posthog-js
    });
    // optional: enable debug logging in development
    if (process.env.NODE_ENV !== 'production') {
      // Enable posthog debug logging
      // posthog.debug(); // note: posthog-js exposes debug in some builds
      console.info('[PostHog] initialized', { key, host });
    }
  } catch (err) {
    // fail silently
    if (typeof window !== 'undefined') console.error('[PostHog] init error', err);
  }
};

export { initPostHog };
export default posthog;
