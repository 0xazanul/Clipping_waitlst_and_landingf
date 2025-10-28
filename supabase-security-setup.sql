-- ============================================
-- SECURE SUPABASE SETUP FOR WAITLIST
-- ============================================
-- Run this in your Supabase SQL Editor
-- This replaces the previous insecure setup
-- ============================================

-- STEP 1: Drop existing insecure policies
DROP POLICY IF EXISTS "Allow public read access for count" ON public.waitlist;
DROP POLICY IF EXISTS "Allow public insert" ON public.waitlist;

-- STEP 2: Create restrictive RLS policies
-- Only service role and authenticated users can read
CREATE POLICY "service_role_read_only"
ON public.waitlist
FOR SELECT
TO service_role
USING (true);

-- No direct public inserts - must go through RPC function
-- This policy allows nothing by default
CREATE POLICY "no_public_access"
ON public.waitlist
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

-- STEP 3: Create rate limiting table
CREATE TABLE IF NOT EXISTS public.waitlist_rate_limit (
  ip_address TEXT PRIMARY KEY,
  attempt_count INTEGER DEFAULT 1,
  last_attempt TIMESTAMPTZ DEFAULT NOW(),
  blocked_until TIMESTAMPTZ
);

-- Enable RLS on rate limit table
ALTER TABLE public.waitlist_rate_limit ENABLE ROW LEVEL SECURITY;

-- STEP 4: Create secure RPC function to get waitlist count
CREATE OR REPLACE FUNCTION public.get_waitlist_count()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER -- Runs with function owner's privileges
AS $$
DECLARE
  total_count INTEGER;
BEGIN
  -- Only return the count, no data exposure
  SELECT COUNT(*) INTO total_count FROM public.waitlist;
  RETURN total_count;
END;
$$;

-- Grant execute permission to anon users
GRANT EXECUTE ON FUNCTION public.get_waitlist_count() TO anon;

-- STEP 5: Create secure RPC function to add to waitlist with validation
CREATE OR REPLACE FUNCTION public.add_to_waitlist(
  p_name TEXT,
  p_email TEXT,
  p_portfolio TEXT,
  p_ip_address TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_result JSON;
  v_attempt_count INTEGER;
  v_blocked_until TIMESTAMPTZ;
  v_email_exists BOOLEAN;
BEGIN
  -- Input validation
  IF p_name IS NULL OR LENGTH(TRIM(p_name)) = 0 THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Name is required'
    );
  END IF;

  IF p_email IS NULL OR LENGTH(TRIM(p_email)) = 0 THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Email is required'
    );
  END IF;

  -- Email format validation (basic)
  IF p_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Invalid email format'
    );
  END IF;

  -- Check if email already exists
  SELECT EXISTS (
    SELECT 1 FROM public.waitlist WHERE email = LOWER(TRIM(p_email))
  ) INTO v_email_exists;

  IF v_email_exists THEN
    RETURN json_build_object(
      'success', false,
      'error', 'This email is already on the waitlist'
    );
  END IF;

  -- Rate limiting (if IP provided)
  IF p_ip_address IS NOT NULL THEN
    -- Check if IP is blocked
    SELECT blocked_until INTO v_blocked_until
    FROM public.waitlist_rate_limit
    WHERE ip_address = p_ip_address;

    IF v_blocked_until IS NOT NULL AND v_blocked_until > NOW() THEN
      RETURN json_build_object(
        'success', false,
        'error', 'Too many attempts. Please try again later.'
      );
    END IF;

    -- Get attempt count
    SELECT attempt_count INTO v_attempt_count
    FROM public.waitlist_rate_limit
    WHERE ip_address = p_ip_address
    AND last_attempt > NOW() - INTERVAL '1 hour';

    -- Block if more than 5 attempts in 1 hour
    IF v_attempt_count >= 5 THEN
      UPDATE public.waitlist_rate_limit
      SET blocked_until = NOW() + INTERVAL '24 hours',
          attempt_count = attempt_count + 1,
          last_attempt = NOW()
      WHERE ip_address = p_ip_address;

      RETURN json_build_object(
        'success', false,
        'error', 'Too many attempts. Blocked for 24 hours.'
      );
    END IF;

    -- Update rate limit counter
    INSERT INTO public.waitlist_rate_limit (ip_address, attempt_count, last_attempt)
    VALUES (p_ip_address, 1, NOW())
    ON CONFLICT (ip_address)
    DO UPDATE SET
      attempt_count = CASE
        WHEN waitlist_rate_limit.last_attempt < NOW() - INTERVAL '1 hour' THEN 1
        ELSE waitlist_rate_limit.attempt_count + 1
      END,
      last_attempt = NOW();
  END IF;

  -- Insert into waitlist (sanitized)
  INSERT INTO public.waitlist (name, email, portfolio)
  VALUES (
    TRIM(p_name),
    LOWER(TRIM(p_email)),
    TRIM(p_portfolio)
  );

  RETURN json_build_object(
    'success', true,
    'message', 'Successfully added to waitlist'
  );

EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object(
      'success', false,
      'error', 'An error occurred. Please try again.'
    );
END;
$$;

-- Grant execute permission to anon users
GRANT EXECUTE ON FUNCTION public.add_to_waitlist(TEXT, TEXT, TEXT, TEXT) TO anon;

-- STEP 6: Create function to clean up old rate limit entries
CREATE OR REPLACE FUNCTION public.cleanup_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.waitlist_rate_limit
  WHERE last_attempt < NOW() - INTERVAL '7 days';
END;
$$;

-- STEP 7: Set up periodic cleanup (optional - requires pg_cron extension)
-- If you have pg_cron enabled, uncomment this:
-- SELECT cron.schedule('cleanup-rate-limits', '0 2 * * *', 'SELECT public.cleanup_rate_limits();');

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these to verify setup:

-- 1. Check RLS is enabled
-- SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'waitlist';

-- 2. Test count function
-- SELECT public.get_waitlist_count();

-- 3. Test insert function (should work)
-- SELECT public.add_to_waitlist('Test User', 'test@example.com', 'https://example.com', '127.0.0.1');

-- 4. Test duplicate email (should fail)
-- SELECT public.add_to_waitlist('Test User 2', 'test@example.com', 'https://example.com', '127.0.0.1');

-- 5. Check policies
-- SELECT * FROM pg_policies WHERE tablename = 'waitlist';

-- ============================================
-- NOTES
-- ============================================
-- ✅ No direct public access to table
-- ✅ Count exposed via RPC only (no data leak)
-- ✅ Inserts validated and rate-limited
-- ✅ Email deduplication
-- ✅ IP-based rate limiting (5 attempts/hour, 24hr block)
-- ✅ Input sanitization
-- ✅ Security definer functions (admin privileges)
-- ============================================
