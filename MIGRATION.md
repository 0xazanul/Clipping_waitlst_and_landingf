# 🔄 Migration Guide: From Insecure to Secure Waitlist

## ⚠️ CRITICAL: Run This in Your Supabase Dashboard

### Step 1: Backup Your Data (Optional but Recommended)
```sql
-- Export existing waitlist data
SELECT * FROM public.waitlist;
-- Save this somewhere safe
```

### Step 2: Run Security Setup SQL
1. Open Supabase Dashboard
2. Go to **SQL Editor**
3. Copy entire contents of `supabase-security-setup.sql`
4. Paste and click **Run**

Expected output:
```
DROP POLICY
DROP POLICY
CREATE POLICY
CREATE POLICY
CREATE TABLE
ALTER TABLE
CREATE FUNCTION
GRANT
CREATE FUNCTION
GRANT
```

### Step 3: Verify Setup
```sql
-- Should return your current count (e.g., 9)
SELECT public.get_waitlist_count();
```

If you get an error about function not existing, the SQL didn't run properly. Try again.

### Step 4: Test Insert
```sql
SELECT public.add_to_waitlist(
  'Test User',
  'test123@example.com', 
  'https://test.com',
  '127.0.0.1'
);
```

Expected response:
```json
{"success": true, "message": "Successfully added to waitlist"}
```

### Step 5: Test Duplicate Email
```sql
SELECT public.add_to_waitlist(
  'Another User',
  'test123@example.com',  -- Same email
  'https://test2.com',
  '127.0.0.1'
);
```

Expected response:
```json
{"success": false, "error": "This email is already on the waitlist"}
```

### Step 6: Deploy Frontend Changes
The code has already been updated. Just deploy:

```bash
# Commit changes
git add .
git commit -m "🔒 Security: Implement secure RPC functions and rate limiting"

# Push to main
git push origin main
```

If using Vercel, it will auto-deploy.

## ✅ Verification Checklist

After deployment, test on your live site:

- [ ] Waitlist count shows correctly in sticky banner
- [ ] Can submit new email successfully
- [ ] Duplicate email shows error message
- [ ] Invalid email format shows error
- [ ] Count updates in real-time after submission
- [ ] After 5 submissions from same IP, get rate limit error

## 🚨 Rollback Plan (If Something Breaks)

### Emergency Rollback SQL
```sql
-- Re-enable old insecure policies
DROP POLICY IF EXISTS "service_role_read_only" ON public.waitlist;
DROP POLICY IF EXISTS "no_public_access" ON public.waitlist;

-- Add back old policies (TEMPORARY - NOT SECURE!)
CREATE POLICY "allow_all_reads" ON public.waitlist
FOR SELECT USING (true);

CREATE POLICY "allow_all_inserts" ON public.waitlist
FOR INSERT WITH CHECK (true);
```

Then revert frontend code:
```bash
git revert HEAD
git push origin main
```

## 📊 What Changed

### Database Layer
| Component | Before | After |
|-----------|--------|-------|
| Policies | Public read/write | Service role only |
| Access | Direct table | RPC functions |
| Validation | None | Server-side |
| Rate limiting | None | IP-based |

### Frontend Layer
| File | What Changed |
|------|--------------|
| `lib/supabase.ts` | Added `getWaitlistCount()` and `addToWaitlist()` |
| `app/page.tsx` | Uses `getWaitlistCount()` instead of `.select()` |
| `components/WaitlistModal.tsx` | Uses `addToWaitlist()` instead of `.insert()` |

## 🎯 Post-Migration Tasks

### 1. Monitor Rate Limiting
Check if legitimate users are getting blocked:
```sql
SELECT * FROM public.waitlist_rate_limit 
WHERE blocked_until > NOW();
```

### 2. Clean Up Old Rate Limit Data
Run weekly:
```sql
DELETE FROM public.waitlist_rate_limit
WHERE last_attempt < NOW() - INTERVAL '7 days';
```

Or set up automatic cleanup (requires pg_cron extension).

### 3. Review Waitlist Submissions
Check for spam entries:
```sql
SELECT * FROM public.waitlist 
ORDER BY created_at DESC 
LIMIT 20;
```

## 💡 Tips

- **Keep `supabase-security-setup.sql`** in your repo for reference
- **Test rate limiting** by submitting 6 times quickly
- **Monitor Supabase logs** for any unusual activity
- **Consider adding CAPTCHA** for extra protection

## ❓ FAQ

**Q: Will existing waitlist entries be lost?**
A: No, the migration only changes policies, not data.

**Q: Do I need to redeploy?**
A: Yes, but Vercel does this automatically on git push.

**Q: What if RPC functions fail?**
A: Check Supabase logs and verify SQL ran successfully.

**Q: Can I still see waitlist in Supabase dashboard?**
A: Yes, you have service role access in the dashboard.

**Q: Will real-time updates still work?**
A: Yes, the subscription still listens for table changes.

## 🆘 Need Help?

If migration fails:
1. Check Supabase SQL Editor logs
2. Verify all functions created: `\df public.*`
3. Check policies: `SELECT * FROM pg_policies WHERE tablename = 'waitlist';`
4. Review rate limit table: `\d public.waitlist_rate_limit`

---

**Ready to migrate?** Just run the SQL and push to main! 🚀
