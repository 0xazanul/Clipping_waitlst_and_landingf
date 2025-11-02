"use client";

import { motion } from "framer-motion";
import { memo } from "react";

interface HeroSectionProps {
  onJoinWaitlist?: () => void;
}

function HeroSection({ onJoinWaitlist }: HeroSectionProps) {
  return (
    <section className="relative">
      <div className="w-full h-full"></div>
    </section>
  );
}

export default memo(HeroSection);
