# 🔒 Supabase Security Implementation

## Overview
This project now uses **production-grade security** for the waitlist feature. No more direct table access!

## ⚠️ What Was Fixed

### Before (Insecure):
- ❌ Anyone could insert unlimited fake entries
- ❌ Public read access exposed user data
- ❌ No rate limiting or validation
- ❌ Direct table access from frontend

### After (Secure):
- ✅ All access goes through secure RPC functions
- ✅ Server-side validation and sanitization
- ✅ IP-based rate limiting (5 attempts/hour, 24hr block)
- ✅ Email deduplication
- ✅ Only count exposed (no data leaks)
- ✅ Row Level Security (RLS) enabled

## 🚀 Setup Instructions

### 1. Run the Security SQL
Go to your Supabase Dashboard → SQL Editor → paste and run:
```
supabase-security-setup.sql
```

This will:
- Drop old insecure policies
- Create secure RPC functions
- Add rate limiting table
- Enable proper RLS policies

### 2. Verify It Works
Run these test queries in SQL Editor:

```sql
-- Should return current count (e.g., 9)
SELECT public.get_waitlist_count();

-- Should successfully add user
SELECT public.add_to_waitlist(
  'Test User',
  'test@example.com',
  'https://example.com',
  '127.0.0.1'
);

-- Should fail (duplicate email)
SELECT public.add_to_waitlist(
  'Another User',
  'test@example.com',
  'https://example.com',
  '127.0.0.1'
);
```

### 3. Check RLS Policies
```sql
SELECT * FROM pg_policies WHERE tablename = 'waitlist';
```

Should show:
- `service_role_read_only` - Only admins can read
- `no_public_access` - Public blocked from direct access

## 🔐 Security Features

### 1. RPC Functions (Not Direct Table Access)
```typescript
// ❌ OLD WAY (Insecure)
await supabase.from("waitlist").insert([data]);

// ✅ NEW WAY (Secure)
await addToWaitlist(name, email, portfolio);
```

### 2. Rate Limiting
- Max 5 attempts per IP per hour
- Automatic 24-hour block after 5 attempts
- Prevents spam and abuse

### 3. Input Validation
Server-side checks:
- ✅ Required fields validation
- ✅ Email format regex
- ✅ Duplicate email detection
- ✅ Input sanitization (TRIM, LOWER)
- ✅ SQL injection prevention

### 4. Data Exposure Protection
```typescript
// Only count is exposed, never full data
const count = await getWaitlistCount(); // Returns: 9
// Can't access: names, emails, portfolios
```

## 📊 Frontend Changes

### app/page.tsx
```typescript
// Now uses secure RPC
const count = await getWaitlistCount();
```

### components/WaitlistModal.tsx
```typescript
// Server-side validation + rate limiting
const result = await addToWaitlist(name, email, portfolio);
if (!result.success) {
  toast.error(result.error);
}
```

### lib/supabase.ts
New secure functions:
- `getWaitlistCount()` - RPC for count only
- `addToWaitlist()` - RPC with validation

## 🛡️ What Happens Now

### When someone tries to join:
1. ✅ Frontend validates input
2. ✅ Fetches user's IP address
3. ✅ Calls secure RPC function
4. ✅ Server checks rate limit
5. ✅ Server validates email format
6. ✅ Server checks for duplicates
7. ✅ Server sanitizes input
8. ✅ Only then inserts into DB

### When showing count:
1. ✅ Calls `get_waitlist_count()` RPC
2. ✅ Returns only integer count
3. ✅ No user data exposed
4. ✅ Real-time updates still work

## 🚨 Important Notes

### Environment Variables
Make sure `.env.local` has:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Never expose** `SUPABASE_SERVICE_ROLE_KEY` in frontend!

### Real-time Updates
Still works! The real-time subscription listens for changes and refreshes count:
```typescript
supabase
  .channel("waitlist-banner")
  .on("postgres_changes", { event: "*", table: "waitlist" }, 
    () => fetchWaitlistCount()
  )
```

### Admin Access
To view/manage waitlist data:
1. Use Supabase Dashboard (Table Editor)
2. Or create admin dashboard with service role key (server-side only)

## 🧪 Testing

### Test Rate Limiting
Try submitting same email 6 times in 1 hour:
- First 5: Should work or show "duplicate email"
- 6th attempt: "Too many attempts. Blocked for 24 hours."

### Test Validation
Try:
- Empty fields → "Name is required"
- Invalid email → "Invalid email format"
- Duplicate email → "This email is already on the waitlist"

### Test Count
Add 3 users, check banner shows correct count in real-time.

## 📈 Next Steps (Optional)

### Add hCaptcha/reCAPTCHA
1. Install package: `npm install react-google-recaptcha`
2. Add to WaitlistModal before submit
3. Verify token in RPC function

### Create Admin Dashboard
1. Build separate admin page
2. Use service role key (server-side only)
3. Show full waitlist with filters

### Add Email Notifications
1. Use Supabase Edge Functions
2. Send confirmation emails via Resend/SendGrid
3. Trigger on successful insert

## 🎯 Summary

| Feature | Before | After |
|---------|--------|-------|
| Direct table access | ✅ Yes (bad) | ❌ No (good) |
| Rate limiting | ❌ None | ✅ 5/hour |
| Validation | ❌ Client only | ✅ Server-side |
| Data exposure | ❌ Full rows | ✅ Count only |
| SQL injection | ⚠️ Possible | ✅ Protected |
| Spam prevention | ❌ None | ✅ IP blocking |

Your waitlist is now **production-ready** and secure! 🎉
