"use client";

import { useState, useEffect } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import WaitlistModal from "@/components/WaitlistModal";
import { StickyBanner } from "@/components/ui/sticky-banner";
import { Toaster } from "sonner";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchWaitlistCount = async () => {
      if (!isSupabaseConfigured()) {
        setWaitlistCount(0);
        return;
      }
      
      const supabase = getSupabase();
      if (!supabase) {
        setWaitlistCount(0);
        return;
      }

      const { count } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true });

      setWaitlistCount(count || 0);
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

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-slate-950 to-blue-950 text-white overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Sticky Banner */}
      {waitlistCount !== null && waitlistCount > 0 && (
        <StickyBanner 
          hideOnScroll={true}
          className="bg-gradient-to-b from-black/80 via-slate-950/80 to-blue-950/80 backdrop-blur-xl border-b border-white/10"
        >
          <p className="text-sm text-gray-300 font-light tracking-wide">
            <span className="font-medium text-white">{waitlistCount.toLocaleString()}</span>
            {" "}{waitlistCount === 1 ? "person" : "people"} already joined — be the next
          </p>
        </StickyBanner>
      )}

      {/* Toast Notifications */}
      <Toaster
        position="top-center"
        theme="dark"
        toastOptions={{
          style: {
            background: "rgba(0, 0, 0, 0.9)",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
          },
        }}
      />

      {/* Hero Section */}
      <HeroSection onJoinWaitlist={() => setIsModalOpen(true)} />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Footer */}
      <footer className="relative w-full py-12 text-center text-sm border-t border-white/[0.05]">
        <div className="space-y-4">
          <p className="text-gray-500 font-light">© 2025 The Clipping Company. All rights reserved.</p>
          <div className="flex justify-center gap-8">
            <a href="/terms" className="text-gray-500 hover:text-white transition-colors font-light">
              Terms
            </a>
            <a href="/privacy" className="text-gray-500 hover:text-white transition-colors font-light">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
