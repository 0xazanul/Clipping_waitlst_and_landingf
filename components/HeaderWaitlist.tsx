"use client";

import { useRealtimeWaitlist } from "@/hooks/useRealtimeWaitlist";
import { useState } from "react";

export default function HeaderWaitlist() {
  const waitlistCount = useRealtimeWaitlist();
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");

  if (waitlistCount === null || waitlistCount === 0) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
    setShowEmailInput(false);
  };

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
        
        <div className="relative flex items-center">
          <button 
            onClick={() => setShowEmailInput(true)}
            className={`relative px-2.5 sm:px-3.5 text-xs sm:text-sm font-medium text-white/90 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:border-white/30 transition-all duration-500 hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:bg-white/[0.15] active:scale-[0.98] group overflow-hidden flex items-center justify-center gap-1.5 ${
              showEmailInput 
                ? 'opacity-0 scale-95 pointer-events-none' 
                : 'opacity-100 scale-100'
            }`}
            style={{ minHeight: '0', height: '28px' }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="relative whitespace-nowrap">Join Waitlist</span>
            <div className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shadow-lg border border-white/10">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/80 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <div 
            className={`absolute left-0 transition-all duration-500 ease-out ${
              showEmailInput 
                ? 'opacity-100 translate-x-0 pointer-events-auto' 
                : 'opacity-0 -translate-x-4 pointer-events-none'
            }`}
          >
            <form onSubmit={handleSubmit} className="flex items-center gap-1.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoFocus={showEmailInput}
                required
                className="px-3 sm:px-4 text-xs sm:text-sm font-medium text-white/90 placeholder:text-white/40 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 focus:border-white/40 focus:outline-none transition-all duration-300 focus:shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
                style={{ minHeight: '0', height: '28px', width: '180px' }}
              />
              <button
                type="submit"
                className="relative px-2.5 text-xs sm:text-sm font-medium text-white/90 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:bg-white/[0.15] active:scale-[0.98] group overflow-hidden flex items-center justify-center"
                style={{ minHeight: '0', height: '28px' }}
              >
                <div className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shadow-lg border border-white/10">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/80 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowEmailInput(false);
                  setEmail("");
                }}
                className="relative w-5 h-5 flex items-center justify-center text-white/60 hover:text-white/90 transition-colors duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
