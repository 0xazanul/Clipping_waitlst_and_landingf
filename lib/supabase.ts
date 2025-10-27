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
