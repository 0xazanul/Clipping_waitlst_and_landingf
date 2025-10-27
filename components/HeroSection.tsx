"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onJoinWaitlist: () => void;
}

export default function HeroSection({ onJoinWaitlist }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center space-y-16">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <h1 className="text-6xl md:text-8xl font-light tracking-normal leading-[1.1] text-white">
            Make videos and 
            <br />
            Get paid.
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
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button
            onClick={onJoinWaitlist}
            className="h-11 px-6 bg-white text-black hover:bg-white/90 font-medium text-sm transition-all duration-150 border-0 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] inline-flex items-center justify-center gap-2"
          >
            Join Waitlist
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
