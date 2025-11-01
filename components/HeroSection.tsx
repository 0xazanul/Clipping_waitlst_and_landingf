"use client";

import { motion } from "framer-motion";
import { memo } from "react";

interface HeroSectionProps {
  onJoinWaitlist?: () => void;
}

function HeroSection({ onJoinWaitlist }: HeroSectionProps) {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center">
      <div className="w-full h-full"></div>
    </section>
  );
}

export default memo(HeroSection);
