import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  return (
    url !== undefined &&
    url !== "your_supabase_url" &&
    url.startsWith("http") &&
    key !== undefined &&
    key !== "your_supabase_anon_key"
  );
};

// Lazy initialization - only create client when needed and properly configured
let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = () => {
  if (!supabaseInstance && isSupabaseConfigured()) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
};

// Export for backward compatibility
export const supabase = getSupabase();

// ============================================
// SECURE API FUNCTIONS
// ============================================

/**
 * Get waitlist count securely via RPC
 * No data exposure - only returns count
 */
export async function getWaitlistCount(): Promise<number> {
  const supabase = getSupabase();
  if (!supabase) return 0;

  try {
    const { data, error } = await supabase.rpc('get_waitlist_count');
    
    if (error) {
      console.error('Error fetching waitlist count:', error);
      return 0;
    }
    
    return data || 0;
  } catch (err) {
    console.error('Failed to get waitlist count:', err);
    return 0;
  }
}

/**
 * Add user to waitlist securely via RPC
 * Includes server-side validation and rate limiting
 */
export async function addToWaitlist(
  name: string,
  email: string,
  portfolio: string
): Promise<{ success: boolean; error?: string; message?: string }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, error: 'Database not configured' };
  }

  try {
    // Get user's IP (client-side approximation - better to use Edge Function)
    let ipAddress: string | null = null;
    try {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipRes.json();
      ipAddress = ipData.ip;
    } catch {
      // IP fetch failed, continue without it
      ipAddress = null;
    }

    const { data, error } = await supabase.rpc('add_to_waitlist', {
      p_name: name,
      p_email: email,
      p_portfolio: portfolio,
      p_ip_address: ipAddress,
    });

    if (error) {
      console.error('Error adding to waitlist:', error);
      return { success: false, error: 'Failed to join waitlist. Please try again.' };
    }

    // Data is a JSON object from the function
    if (data && typeof data === 'object') {
      return data as { success: boolean; error?: string; message?: string };
    }

    return { success: false, error: 'Unexpected response from server' };
  } catch (err) {
    console.error('Failed to add to waitlist:', err);
    return { success: false, error: 'An error occurred. Please try again.' };
  }
}

