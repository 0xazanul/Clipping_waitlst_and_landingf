"use client";

import { useRealtimeWaitlist } from "@/hooks/useRealtimeWaitlist";

export default function HeaderWaitlist() {
  const waitlistCount = useRealtimeWaitlist();

  if (waitlistCount === null || waitlistCount === 0) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center py-1 sm:py-1.5 px-4 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <div className="flex -space-x-2">
            <img src="https://i.pravatar.cc/150?img=1" alt="" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-black object-cover" />
            <img src="https://i.pravatar.cc/150?img=2" alt="" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-black object-cover" />
            <img src="https://i.pravatar.cc/150?img=3" alt="" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-black object-cover" />
            <img src="https://i.pravatar.cc/150?img=4" alt="" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-black object-cover" />
            <img src="https://i.pravatar.cc/150?img=5" alt="" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-black object-cover" />
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xs sm:text-sm text-gray-400 font-normal">Join</span>
            <span className="font-bold text-xs sm:text-sm text-orange-400">
              {waitlistCount.toLocaleString()}+
            </span>
            <span className="text-xs sm:text-sm text-gray-400 font-normal">others on the waitlist</span>
          </div>
        </div>
        
        <button 
          className="relative px-2.5 sm:px-3.5 text-xs sm:text-sm font-medium text-white/90 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:bg-white/[0.15] active:scale-[0.98] group overflow-hidden flex items-center justify-center gap-1.5"
          style={{ minHeight: '0', height: '28px' }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          <span className="relative whitespace-nowrap">Get started</span>
          <div className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shadow-lg border border-white/10">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/80 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
    </header>
  );
}
