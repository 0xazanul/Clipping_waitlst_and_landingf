"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image 
            src="/logos/bg.png" 
            alt="The Clipping Company" 
            width={120}
            height={28}
            className="h-6 sm:h-7 w-auto object-contain opacity-90"
          />
        </div>
        
        <Link
          href="/brand"
          className="group relative inline-flex items-center gap-2 px-4 py-2 text-sm font-light text-white/80 hover:text-white transition-colors duration-200"
        >
          <span className="relative z-10">For brands</span>
          <svg 
            className="w-4 h-4 text-white/60 group-hover:text-white/90 group-hover:translate-x-0.5 transition-all duration-200" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
          <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-colors duration-200" />
        </Link>
      </div>
    </nav>
  );
}
