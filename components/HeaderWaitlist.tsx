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
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="w-full px-2 sm:px-4">
        <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
          
          <div className="flex items-center flex-wrap justify-center gap-1 sm:gap-1.5 text-center">
            <span className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 font-normal antialiased">
              Join
            </span>
            <span className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg text-orange-400 antialiased">
              {waitlistCount.toLocaleString()}+
            </span>
            <span className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 font-normal antialiased whitespace-nowrap">
              others on the waitlist
            </span>
          </div>

          <div className="relative flex items-center shrink-0">
              
              <button 
                onClick={() => setShowEmailInput(true)}
                className={`
                  relative flex items-center justify-center gap-1
                  px-2.5 sm:px-3 md:px-4
                  text-[10px] sm:text-xs md:text-sm font-medium antialiased
                  text-white/90 bg-white/10 
                  backdrop-blur-xl rounded-full 
                  border border-white/20 
                  hover:border-white/30 hover:bg-white/15 hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)]
                  active:scale-[0.98]
                  transition-all duration-500 ease-out
                  ${showEmailInput ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}
                `}
                style={{ minHeight: 0, height: '24px', display: 'flex', alignItems: 'center' }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                
                <span className="relative whitespace-nowrap" style={{ lineHeight: '1', display: 'flex', alignItems: 'center' }}>Join Waitlist</span>
                
                <div className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-white/10 shadow-sm">
                  <svg 
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white/80 group-hover:translate-x-0.5 transition-transform duration-200" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              <div 
                className={`
                  absolute left-0 top-0
                  transition-all duration-500 ease-out
                  ${showEmailInput ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-4 pointer-events-none'}
                `}
              >
                <form onSubmit={handleSubmit} className="flex items-center gap-1.5">
                  
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    autoFocus={showEmailInput}
                    required
                    className="
                      w-[140px] sm:w-[160px] md:w-[180px]
                      px-2.5 sm:px-3 md:px-4
                      text-[10px] sm:text-xs md:text-sm font-medium antialiased
                      text-white/90 placeholder:text-white/40
                      bg-white/10 backdrop-blur-xl
                      rounded-full border border-white/20
                      focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/10
                      transition-all duration-300
                    "
                    style={{ minHeight: 0, height: '24px' }}
                  />

                  <button
                    type="submit"
                    className="
                      relative flex items-center justify-center
                      p-0.5
                      text-white/90 bg-white/10 backdrop-blur-xl
                      rounded-full border border-white/20
                      hover:border-white/30 hover:bg-white/15
                      active:scale-95
                      transition-all duration-300
                      group
                    "
                    style={{ minHeight: 0, height: '24px', width: '24px' }}
                  >
                    <div className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-white/10">
                      <svg 
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white/80 group-hover:translate-x-0.5 transition-transform duration-200" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth="2.5"
                      >
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
                    className="
                      relative flex items-center justify-center
                      w-5 h-5 sm:w-6 sm:h-6
                      text-white/60 hover:text-white/90
                      transition-colors duration-200
                    "
                  >
                    <svg 
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>

            <div className="flex items-center justify-center -space-x-1 sm:-space-x-1.5">
              <img 
                src="https://i.pravatar.cc/150?img=1" 
                alt="User avatar" 
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full border-2 border-black object-cover"
              />
              <img 
                src="https://i.pravatar.cc/150?img=2" 
                alt="User avatar" 
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full border-2 border-black object-cover"
              />
              <img 
                src="https://i.pravatar.cc/150?img=3" 
                alt="User avatar" 
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full border-2 border-black object-cover"
              />
              <img 
                src="https://i.pravatar.cc/150?img=4" 
                alt="User avatar" 
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full border-2 border-black object-cover"
              />
              <img 
                src="https://i.pravatar.cc/150?img=5" 
                alt="User avatar" 
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full border-2 border-black object-cover"
              />
            </div>
          </div>
        </div>
      </div>
  );
}
