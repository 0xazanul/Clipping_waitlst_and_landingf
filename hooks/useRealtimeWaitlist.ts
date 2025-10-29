import { useState, useEffect } from "react";
import { getSupabase, isSupabaseConfigured, getWaitlistCount } from "@/lib/supabase";

export function useRealtimeWaitlist() {
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchWaitlistCount = async () => {
      if (!isSupabaseConfigured()) {
        setWaitlistCount(0);
        return;
      }

      const count = await getWaitlistCount();
      setWaitlistCount(count);
    };

    fetchWaitlistCount();

    // Set up real-time subscription
    if (isSupabaseConfigured()) {
      const supabase = getSupabase();
      if (supabase) {
        const channel = supabase
          .channel("waitlist-banner")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "waitlist" },
            () => {
              fetchWaitlistCount();
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      }
    }
  }, []);

  return waitlistCount;
}
