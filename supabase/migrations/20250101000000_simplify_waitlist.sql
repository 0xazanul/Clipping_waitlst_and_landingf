-- Simplify waitlist table to only collect email
-- Drop the old table if it exists and recreate with just email field

DROP TABLE IF EXISTS waitlist CASCADE;

CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index on email for fast lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);

-- Index on created_at for sorting by join date
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at DESC);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (join waitlist)
CREATE POLICY "Anyone can join waitlist"
  ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Policy: Public read access (for count, etc.)
CREATE POLICY "Public can view waitlist count"
  ON waitlist
  FOR SELECT
  USING (true);

-- Add comment
COMMENT ON TABLE waitlist IS 'Simplified waitlist - stores only email addresses';
