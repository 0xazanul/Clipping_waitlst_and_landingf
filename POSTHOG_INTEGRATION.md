PostHog integration (Next.js app router)

What I added
- `lib/instrumentation-client.ts` — a small client-side wrapper that initializes `posthog-js` using `process.env.NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`.
- `components/PostHogInit.tsx` — a client component that calls `initPostHog()` on mount. This is imported and rendered in `app/layout.tsx` so it runs in the browser.
- `.env.local.example` — added PostHog env var examples.

How to install
1. Install the PostHog package in your project (one of these):

npm install posthog-js
# or
# yarn add posthog-js
# or
# pnpm add posthog-js

Or run the AI wizard (optional):

npx -y @posthog/wizard@latest

Set environment variables
- Create `.env.local` (don't commit it) and add:

NEXT_PUBLIC_POSTHOG_KEY=phc_YOUR_PROJECT_API_KEY
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

(Use the values from your PostHog project settings.)

How it works
- On the client, `PostHogInit` calls `initPostHog()` from `lib/instrumentation-client.ts` which calls `posthog.init(...)`.
- The wrapper avoids initializing PostHog on the server and guards against double-init.
- You can use `posthog.capture('my event', { property: 'value' })` anywhere in client code after init.

Verification
- Start the app locally (npm run dev) and open the browser console.
- The instrumentation wrapper logs initialization in non-production.
- Navigate the site and check PostHog project -> Events to see captured events.
- You can also manually call `posthog.capture('test_event')` in console.

Notes & safety
- Do not store secrets with names not prefixed by NEXT_PUBLIC_. PostHog client SDK needs only public key.
- If you need server-side capture, use PostHog server libraries with server-only env keys.

If you want, I can also:
- Add TypeScript types for `posthog-js` (install @types if needed),
- Add a small example of capturing a custom event from a CTA component,
- Or run the AI PostHog setup wizard and apply the suggested changes automatically (requires running `npx` locally).
