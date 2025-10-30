"use client";

import { useRealtimeWaitlist } from "@/hooks/useRealtimeWaitlist";

export default function HeaderWaitlist() {
  const waitlistCount = useRealtimeWaitlist();

  if (waitlistCount === null || waitlistCount === 0) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center py-1 sm:py-1.5 px-4 bg-black/80 backdrop-blur-md border-b border-white/5">
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
        
        <button className="relative px-3 h-7 sm:h-8 !min-h-0 text-xs sm:text-sm font-medium text-white bg-gradient-to-br from-slate-900 to-slate-950 rounded border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(251,146,60,0.3)] hover:scale-[1.02] active:scale-[0.98] group overflow-hidden flex items-center justify-center">
          <span className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-orange-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative whitespace-nowrap">Join Waitlist</span>
        </button>
      </div>
    </header>
  );
}
