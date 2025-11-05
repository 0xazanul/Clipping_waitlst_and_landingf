"use client";

export default function Navbar() {
  return (
    <div className="fixed top-6 right-4 sm:right-6 lg:right-8 z-50">
      <button
        onClick={() => window.open('https://discord.gg/RACEATtXTc', '_blank')}
        className="px-6 sm:px-8 md:px-10 h-8 sm:h-9 rounded-lg border border-white/10 bg-white/[0.02] text-white/80 text-sm font-medium hover:border-white/20 hover:bg-white/[0.04] hover:text-white transition-all duration-200"
      >
        I'm a Brand
      </button>
    </div>
  );
}
