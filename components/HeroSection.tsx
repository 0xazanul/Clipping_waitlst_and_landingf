"use client";

import { motion } from "framer-motion";

interface HeroSectionProps {
  onJoinWaitlist: () => void;
}

export default function HeroSection({ onJoinWaitlist }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-light tracking-normal leading-[1.1] text-white">
            Make videos and 
            <br />
            Earn Cypto.
          </h1>
          
          <p className="text-xl text-gray-500 max-w-lg mx-auto font-light leading-relaxed tracking-wide">
            Post brand content on your channel.
            <br />
            Hit view targets. Earn money.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            onClick={onJoinWaitlist}
            className="text-white hover:text-gray-300 font-light text-base transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white/60"
          >
            Join Waitlist →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
