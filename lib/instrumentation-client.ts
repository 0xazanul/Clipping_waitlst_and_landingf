"use client";

import posthog from "posthog-js";

/**
 * Initializes PostHog analytics safely in production with:
 * - Domain guard (only on allowed domains)
 * - Automatic pageview/session tracking
 * - Device fingerprint identification via FingerprintJS
 * - Clean debug logs and error handling
 */
const initPostHog = () => {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
  const isBrowser = typeof window !== "undefined";
  const isProd = process.env.NODE_ENV === "production";
  const allowedHosts = ["theclippingcompany.com", "www.theclippingcompany.com"];

  console.log("[PostHog] 🔧 Init called", {
    isBrowser,
    isProd,
    host,
    currentHost: isBrowser ? window.location.hostname : "N/A",
    hasKey: !!key,
  });

  // 🧱 SSR Guard
  if (!isBrowser) return;

  const currentHost = window.location.hostname;

  // 🚫 Guard: only run on production & allowed domains
  if (!isProd || !allowedHosts.includes(currentHost)) {
    console.info(`[PostHog] ⏩ Skipped (env: ${process.env.NODE_ENV}, host: ${currentHost})`);
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

  // 🚫 Prevent duplicate initialization
  if ((window as any).__posthog_initialized) {
    console.log("[PostHog] ⚠️ Already initialized, skipping.");
    return;
  }
  (window as any).__posthog_initialized = true;

  if (!key) {
    console.warn("[PostHog] ❌ Missing NEXT_PUBLIC_POSTHOG_KEY");
    return;
  }

  console.log("[PostHog] 🚀 Starting initialization...");

  try {
    posthog.init(key, {
      api_host: host,
      // ⚙️ Allow PostHog to create anonymous sessions so "Visitors" counts work
      person_profiles: "always",
      capture_pageview: true,
      autocapture: true,
      capture_pageleave: true,
      persistence: "localStorage+cookie",
      loaded: async (posthogInstance) => {
        (window as any).posthog = posthogInstance;
        console.info("[PostHog] ✅ Initialized", {
          host,
          key: `${key.substring(0, 8)}...`,
        });

        // 🔍 Register device metadata for richer analytics
        try {
          const deviceProps = {
            ua: navigator.userAgent,
            platform: navigator.platform,
            screen: `${window.screen.width}x${window.screen.height}`,
            lang: navigator.language,
            tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
          };
          posthogInstance.register(deviceProps);
          console.log("[PostHog] 🧠 Device properties registered:", deviceProps);
        } catch (e) {
          console.warn("[PostHog] ⚠️ Device props error", e);
        }

        // 🧩 Fire guaranteed pageview to ensure visitor/session counted
        try {
          posthogInstance.capture("$pageview", { url: window.location.href });
          console.log("[PostHog] 📊 Pageview captured");
        } catch (e) {
          console.warn("[PostHog] ⚠️ Pageview capture failed", e);
        }

        // 🪪 Load FingerprintJS and identify visitor (with safe delay)
        const userGaveConsent = true;
        if (userGaveConsent) {
          try {
            console.log("[PostHog] 🧩 Loading FingerprintJS...");
            const FingerprintJS = await import("@fingerprintjs/fingerprintjs");
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            const visitorId = result.visitorId;

            // Identify visitor with fingerprint (delayed slightly to avoid conflicts)
            setTimeout(() => {
              posthogInstance.identify(visitorId, { device_fingerprint: visitorId });
              console.log("[PostHog] 🆔 Identified visitor:", visitorId);
            }, 800);
          } catch (err) {
            console.warn("[PostHog] ❗ Fingerprint generation failed", err);
          }
        }
      },
    });
  } catch (err) {
    console.error("[PostHog] 💥 Init error:", err);
  }
};

export { initPostHog };
export default posthog;
