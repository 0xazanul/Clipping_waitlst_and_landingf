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
    /**
     * HEADER CONTAINER
     * - Fixed positioning with full-width coverage ensures navbar stays at top
     * - z-[100] keeps it above all content
     * - backdrop-blur-md provides glassmorphism effect across all platforms
     * - border-b with low opacity creates subtle separation without harsh lines
     */
    <header className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-md border-b border-white/5">
      {/**
       * RESPONSIVE PADDING WRAPPER
       * - Mobile-first: py-2 (8px) provides comfortable touch targets
       * - sm: py-2.5 (10px) scales up slightly for tablets
       * - lg: py-3 (12px) gives desktop the breathing room it needs
       * - Horizontal padding uses standard container pattern for consistency
       */}
      <div className="w-full py-2 sm:py-2.5 lg:py-3 px-4 sm:px-6 lg:px-8">
        {/**
         * MAX-WIDTH CONTAINER
         * - max-w-7xl prevents over-stretching on ultra-wide displays
         * - mx-auto centers content horizontally on all screen sizes
         * - This is the standard container pattern for responsive layouts
         */}
        <div className="max-w-7xl mx-auto">
          {/**
           * MAIN FLEX LAYOUT
           * - Flexbox provides reliable cross-platform alignment
           * - items-center ensures vertical centering of all elements
           * - justify-center keeps content centered (can be changed to justify-between for logo/nav/cta layout)
           * - gap uses responsive values to prevent cramping on small screens
           */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6">
            
            {/**
             * LEFT SECTION: Avatars + Waitlist Text
             * - Wrapped in its own flex container for independent alignment
             * - Items stay together as a group and won't break apart
             */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              
              {/**
               * AVATAR STACK
               * - Negative space (-space-x) creates overlapping effect
               * - Each avatar uses aspect-ratio-preserving sizing
               * - Border prevents avatars from visually merging
               */}
              <div className="flex items-center -space-x-1.5 sm:-space-x-2">
                <img 
                  src="https://i.pravatar.cc/150?img=1" 
                  alt="User avatar" 
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full border-2 border-black object-cover"
                />
                <img 
                  src="https://i.pravatar.cc/150?img=2" 
                  alt="User avatar" 
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full border-2 border-black object-cover"
                />
                <img 
                  src="https://i.pravatar.cc/150?img=3" 
                  alt="User avatar" 
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full border-2 border-black object-cover"
                />
                <img 
                  src="https://i.pravatar.cc/150?img=4" 
                  alt="User avatar" 
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full border-2 border-black object-cover"
                />
                <img 
                  src="https://i.pravatar.cc/150?img=5" 
                  alt="User avatar" 
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full border-2 border-black object-cover"
                />
              </div>

              {/**
               * WAITLIST TEXT
               * - flex-wrap allows text to wrap gracefully on narrow screens
               * - Consistent gap prevents text from appearing too tight
               * - Font sizes scale proportionally with screen size
               * - antialiased ensures consistent font rendering on Windows/Mac
               */}
              <div className="flex items-center flex-wrap gap-1 sm:gap-1.5 lg:gap-2">
                <span className="text-xs sm:text-sm lg:text-base text-gray-400 font-normal antialiased">
                  Join
                </span>
                <span className="font-semibold text-xs sm:text-sm lg:text-base text-orange-400 antialiased">
                  {waitlistCount.toLocaleString()}+
                </span>
                <span className="text-xs sm:text-sm lg:text-base text-gray-400 font-normal antialiased whitespace-nowrap">
                  others on the waitlist
                </span>
              </div>
            </div>

            {/**
             * RIGHT SECTION: CTA Button + Email Form
             * - Positioned relatively to contain the absolutely positioned email form
             * - Ensures form slides over content without breaking layout
             */}
            <div className="relative flex items-center shrink-0">
              
              {/**
               * JOIN WAITLIST BUTTON
               * - Glass design matches overall theme
               * - Smooth transitions for cross-fade animation
               * - Fixed inline height prevents browser default button height inconsistencies
               * - Font-medium provides better readability than font-bold on small sizes
               */}
              <button 
                onClick={() => setShowEmailInput(true)}
                className={`
                  relative flex items-center justify-center gap-1.5 sm:gap-2
                  px-3 sm:px-4 lg:px-5
                  text-xs sm:text-sm lg:text-base font-medium antialiased
                  text-white/90 bg-white/10 
                  backdrop-blur-xl rounded-full 
                  border border-white/20 
                  hover:border-white/30 hover:bg-white/15 hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)]
                  active:scale-[0.98]
                  transition-all duration-500 ease-out
                  ${showEmailInput ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}
                `}
                style={{ minHeight: 0, height: '32px' }}
              >
                {/* Subtle shimmer effect on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                
                {/* Button text */}
                <span className="relative whitespace-nowrap leading-none">Join Waitlist</span>
                
                {/**
                 * ARROW ICON CIRCLE
                 * - Self-contained visual element
                 * - Scales proportionally with button
                 * - Uses gradient for depth without heavy shadows
                 */}
                <div className="relative w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-white/10 shadow-sm">
                  <svg 
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 text-white/80 group-hover:translate-x-0.5 transition-transform duration-200" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/**
               * EMAIL INPUT FORM (SLIDE-IN)
               * - Absolutely positioned to overlay button space
               * - Slides in from left with opacity transition
               * - pointer-events-none when hidden prevents accidental clicks
               */}
              <div 
                className={`
                  absolute left-0 top-0
                  transition-all duration-500 ease-out
                  ${showEmailInput ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-4 pointer-events-none'}
                `}
              >
                <form onSubmit={handleSubmit} className="flex items-center gap-1.5 sm:gap-2">
                  
                  {/**
                   * EMAIL INPUT
                   * - Fixed width prevents layout shift
                   * - Matches button styling for visual consistency
                   * - Placeholder opacity matches overall design language
                   */}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    autoFocus={showEmailInput}
                    required
                    className="
                      w-[160px] sm:w-[180px] lg:w-[200px]
                      px-3 sm:px-4
                      text-xs sm:text-sm lg:text-base font-medium antialiased
                      text-white/90 placeholder:text-white/40
                      bg-white/10 backdrop-blur-xl
                      rounded-full border border-white/20
                      focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/10
                      transition-all duration-300
                    "
                    style={{ minHeight: 0, height: '32px' }}
                  />

                  {/**
                   * SUBMIT BUTTON (ARROW ONLY)
                   * - Icon-only design keeps form compact
                   * - Matches main button's arrow design for consistency
                   */}
                  <button
                    type="submit"
                    className="
                      relative flex items-center justify-center
                      p-1 sm:p-1.5
                      text-white/90 bg-white/10 backdrop-blur-xl
                      rounded-full border border-white/20
                      hover:border-white/30 hover:bg-white/15
                      active:scale-95
                      transition-all duration-300
                      group
                    "
                    style={{ minHeight: 0, height: '32px', width: '32px' }}
                  >
                    <div className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-white/10">
                      <svg 
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/80 group-hover:translate-x-0.5 transition-transform duration-200" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>

                  {/**
                   * CLOSE BUTTON
                   * - Simple X icon for dismissing form
                   * - Minimal styling to not compete with submit button
                   */}
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
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4" 
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
          </div>
        </div>
      </div>
    </header>
  );
}
