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
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
      loaded: (posthogInstance) => {
        // Expose PostHog globally for console access
        if (typeof window !== 'undefined') {
          (window as any).posthog = posthogInstance;
        }
        if (process.env.NODE_ENV !== 'production') {
          console.info('[PostHog] ✅ Initialized successfully', { key, host });
        }
      }
    });
  } catch (err) {
    if (typeof window !== 'undefined') console.error('[PostHog] init error', err);
  }
};

export { initPostHog };
export default posthog;
