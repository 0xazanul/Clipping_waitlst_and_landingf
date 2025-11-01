# Waitlist Migration & Setup

## What Changed
Simplified the waitlist to only collect email addresses (removed extra fields).

## Files Added/Modified
1. **Migration**: `supabase/migrations/20250101000000_simplify_waitlist.sql`
   - Drops old waitlist table
   - Creates new table with just: `id`, `email`, `created_at`
   - Adds unique constraint on email
   - Sets up RLS policies (anyone can insert, anyone can read count)

2. **Component**: `components/HeaderWaitlist.tsx`
   - Now saves email to Supabase on submit
   - Shows success/error feedback messages
   - Tracks `waitlist_joined` event in PostHog
   - Handles duplicate email gracefully
   - Loading spinner during submission

## How to Apply Migration

### If you're using Supabase CLI locally:
```powershell
supabase db reset
# or
supabase migration up
```

### If you're using Supabase Dashboard:
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy the contents of `supabase/migrations/20250101000000_simplify_waitlist.sql`
4. Paste and run it

### Quick SQL (run in Supabase SQL Editor):
```sql
DROP TABLE IF EXISTS waitlist CASCADE;

CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at DESC);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join waitlist"
  ON waitlist FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view waitlist count"
  ON waitlist FOR SELECT USING (true);
```

## Testing the Integration

1. Make sure you have PostHog installed:
```powershell
npm install posthog-js
```

2. Set up your `.env.local` with Supabase + PostHog keys:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_POSTHOG_KEY=phc_YOUR_KEY
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

3. Start the dev server:
```powershell
npm run dev
```

4. Test the flow:
   - Click "Join Waitlist" button
   - Enter an email
   - Click submit (arrow button)
   - Should see "Successfully joined! 🎉"
   - Check Supabase table to confirm email saved
   - Check PostHog events to see `waitlist_joined` event

5. Test duplicate handling:
   - Try submitting the same email again
   - Should see "Already on the waitlist!" message

## What Gets Tracked in PostHog
- Event: `waitlist_joined`
- Properties: `{ email: "user@example.com" }`

## Error Handling
- Duplicate email → Shows "Already on the waitlist!"
- Network error → Shows "Error joining. Try again."
- Missing Supabase config → Shows "Service unavailable"
- Form stays open with error message for user to retry

## Notes
- Email is normalized (trimmed & lowercased) before saving
- Success message auto-closes form after 2 seconds
- Submit button shows spinner while processing
- Form inputs are disabled during submission
