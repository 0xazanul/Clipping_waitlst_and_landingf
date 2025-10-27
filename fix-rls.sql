-- Fix RLS policies for waitlist table
-- Run this in your Supabase SQL Editor

-- Enable RLS (if not already enabled)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the count (for the counter display)
CREATE POLICY "Allow public read access for count"
ON waitlist
FOR SELECT
TO public
USING (true);

-- Allow anyone to insert (for joining waitlist)
CREATE POLICY "Allow public insert"
ON waitlist
FOR INSERT
TO public
WITH CHECK (true);
