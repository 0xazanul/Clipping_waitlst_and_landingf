"use client";

import { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import WaitlistModal from "@/components/WaitlistModal";
import { Toaster } from "sonner";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-slate-950 to-blue-950 text-white overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

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
