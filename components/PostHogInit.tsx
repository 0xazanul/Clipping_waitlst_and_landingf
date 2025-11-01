"use client";

import { useEffect } from "react";
import { initPostHog } from "@/lib/instrumentation-client";

export default function PostHogInit() {
  useEffect(() => {
    initPostHog();
    // optional: capture a page view or custom event
    // import posthog dynamically if you need to capture here
    // const posthog = await import('posthog-js');
    // posthog.capture('page_view');
  }, []);

  return null;
}
