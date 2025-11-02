"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import { Toaster } from "sonner";
import VideoMetricsBackground from "@/components/background/VideoMetricsBackground";

const CommunityHighlights = dynamic(() => import("@/components/CommunityHighlights"), {
  loading: () => <div className="w-full h-96" />,
});

const PlatformsPayments = dynamic(() => import("@/components/PlatformsPayments"), {
  loading: () => <div className="w-full h-96" />,
});

const HowItWorks = dynamic(() => import("@/components/HowItWorks"), {
  loading: () => <div className="w-full h-96" />,
});

export default function Home() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <VideoMetricsBackground />
      
      <CommunityHighlights />
      
      <HowItWorks />

      <PlatformsPayments />

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

      <HeroSection />

      <footer className="w-full border-t border-white/[0.05] mt-8">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 sm:py-10 md:py-12 flex flex-col items-center gap-6 sm:gap-8">
          {/* Email */}
          <a
            href="mailto:contact@theclippingcompany.com"
            className="group inline-flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="font-light text-sm tracking-wide">contact@theclippingcompany.com</span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg/RACEATtXTc"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span className="font-light text-sm tracking-wide">Join Discord</span>
          </a>

          {/* Logo */}
          <div className="flex justify-center">
            <img 
              src="/logos/bg.png" 
              alt="The Clipping Company" 
              className="h-10 sm:h-12 md:h-14 w-auto object-contain"
            />
          </div>

          {/* Copyright */}
          <p className="text-gray-700 font-light text-xs sm:text-sm tracking-wide">
            © 2025 The Clipping Company
          </p>
        </div>
      </footer>
    </div>
  );
}
