"use client";

import { motion } from "framer-motion";
import { memo } from "react";

interface HeroSectionProps {
  onJoinWaitlist: () => void;
}

function HeroSection({ onJoinWaitlist }: HeroSectionProps) {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center px-[clamp(1rem,5vw,1.5rem)] py-[clamp(2rem,10vh,4rem)]">
      <div className="w-full max-w-[clamp(20rem,90vw,60rem)] mx-auto text-center">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="space-y-[clamp(1rem,4vw,1.5rem)] mb-[clamp(1.5rem,5vw,2rem)]"
        >
          <h1 className="text-[clamp(2.5rem,12vw,6rem)] font-light tracking-tight leading-[1.1] text-white">
            Make videos and 
            <br />
            Earn Crypto.
          </h1>
          
          <p className="text-[clamp(1rem,3.5vw,1.25rem)] text-gray-500 max-w-[clamp(18rem,60vw,32rem)] mx-auto font-light leading-relaxed tracking-wide">
            Post brand content on your channel.
            <br />
            Hit view targets. Earn money.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
        >
          <button
            onClick={onJoinWaitlist}
            className="text-white hover:text-gray-300 font-light text-[clamp(0.875rem,2.5vw,1rem)] transition-all duration-300 underline underline-offset-[clamp(0.25rem,0.8vw,0.375rem)] decoration-white/30 hover:decoration-white/60 hover:scale-105 active:scale-95"
          >
            Join Waitlist →
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(HeroSection);
