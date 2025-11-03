"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function CommunityHighlights() {
  const [totalFollowers, setTotalFollowers] = useState<number | null>(null);

  useEffect(() => {
    const fetchTotalFollowers = async () => {
      try {
        if (!supabase) return;

        const { data, error } = await supabase
          .from("waitlist")
          .select("follower_count");

        if (error) {
          console.error("Error fetching follower counts:", error);
          return;
        }

        const total = data?.reduce((sum, row) => {
          const count = parseInt(row.follower_count) || 0;
          return sum + count;
        }, 0) || 0;

        setTotalFollowers(total);
      } catch (err) {
        console.error("Failed to fetch total followers:", err);
      }
    };

    fetchTotalFollowers();
  }, []);

  const formatFollowerCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const avatars = [
    { id: 1, src: "https://avatars.githubusercontent.com/u/16860528", position: "top-[8%] left-[8%] sm:top-[10%] sm:left-[15%]" },
    { id: 2, src: "https://avatars.githubusercontent.com/u/20110627", position: "top-[6%] left-[42%] sm:top-[8%] sm:left-[45%]" },
    { id: 3, src: "https://avatars.githubusercontent.com/u/106103625", position: "top-[10%] right-[12%] sm:top-[12%] sm:right-[20%]" },
    { id: 4, src: "https://avatars.githubusercontent.com/u/59228569", position: "top-[32%] right-[5%] sm:top-[35%] sm:right-[8%]" },
    { id: 5, src: "https://avatars.githubusercontent.com/u/59442788", position: "top-[38%] right-[30%] sm:top-[40%] sm:right-[35%]" },
    { id: 6, src: "https://avatars.githubusercontent.com/u/89768406", position: "bottom-[32%] left-[8%] sm:bottom-[35%] sm:left-[12%]" },
  ];

  const logos = [
    { 
      id: 1, 
      icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
      position: "top-[18%] left-[12%] sm:top-[20%] sm:left-[18%]",
      bgColor: "bg-white/5"
    },
    { 
      id: 2, 
      icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
      position: "top-[48%] left-[25%] sm:top-[50%] sm:left-[30%]",
      bgColor: "bg-white/5"
    },
    { 
      id: 3, 
      icon: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z",
      position: "top-[28%] right-[18%] sm:top-[30%] sm:right-[22%]",
      bgColor: "bg-indigo-500/10"
    },
    { 
      id: 4, 
      icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
      position: "bottom-[28%] right-[15%] sm:bottom-[30%] sm:right-[18%]",
      bgColor: "bg-white/5"
    },
  ];

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 overflow-hidden">
      {/* Radial Ripple Effect Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Diagonal Spotlight Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent" />
        
        {/* Single Rotating Radar Line - Positioned lower and contained */}
        <div className="absolute top-[85%] sm:top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40">
          <div
            className="absolute bottom-0 left-0 origin-bottom animate-radar-sweep will-change-transform"
            style={{
              width: '1.5px',
              height: 'min(40vh, 400px)',
              background: `linear-gradient(to top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2) 50%, transparent)`,
              boxShadow: `0 0 10px rgba(255, 255, 255, 0.4), 0 0 20px rgba(255, 255, 255, 0.2)`,
            }}
          />
        </div>
        
        {/* Concentric Ripple Circles - Positioned lower with fade */}
        <div className="absolute top-[85%] sm:top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] sm:w-full max-w-[1000px] h-[90vw] sm:h-[100vw] max-h-[1000px] opacity-50">
          {[...Array(10)].map((_, i) => {
            const baseSize = 120;
            const increment = 80;
            const size = baseSize + (i * increment);
            const opacity = Math.max(0.015, 0.12 - i * 0.012);
            
            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: `min(${size}px, ${(size / 1000) * 100}vw)`,
                  height: `min(${size}px, ${(size / 1000) * 100}vw)`,
                  border: `1px solid rgba(255, 255, 255, ${opacity})`,
                  boxShadow: `0 0 ${Math.max(6, 16 - i)}px rgba(255, 255, 255, ${opacity * 0.25})`,
                  maskImage: 'linear-gradient(to bottom, white 0%, white 60%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, white 0%, white 60%, transparent 100%)',
                }}
              />
            );
          })}
        </div>
        
        {/* Subtle radial gradient overlay - Positioned lower */}
        <div 
          className="absolute top-[85%] sm:top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] sm:w-full max-w-[900px] h-[80vw] sm:h-[85vw] max-h-[900px] opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 65%)',
          }}
        />
      </div>
      
      {/* Content Container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="relative">
          {/* Text Content - Clean spacing */}
          <div className="relative text-center space-y-3 sm:space-y-4 md:space-y-5">
            {/* Section Label */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-500/30" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-orange-400/60">
                The Clipping Company
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-orange-500/30" />
            </div>
            
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white/95 tracking-tight leading-tight px-4 sm:px-6 md:px-0 max-w-3xl mx-auto">
              Supercharge your company with a strong community of content creators and its <br></br> {" "}
              {totalFollowers !== null && (
                <>
                  <span className="text-orange-400 font-medium">
                    {totalFollowers.toLocaleString()}+
                  </span>{" "}
                 followers.
                </>
              )}
              {totalFollowers === null && "community of"}
              <br className="hidden xs:block" />
            
            </h2>
          </div>

          {/* Avatar and Logo Grid - Proper containment */}
          <div className="relative mt-8 sm:mt-10 md:mt-12 lg:mt-14 h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 max-w-5xl mx-auto">
            {avatars.map((avatar) => (
              <div
                key={avatar.id}
                className={`absolute ${avatar.position} w-10 h-10 xs:w-11 xs:h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 lg:w-15 lg:h-15 rounded-full overflow-hidden border-[1.5px] sm:border-2 border-white/[0.15] backdrop-blur-sm bg-black/20 transition-all duration-300 hover:scale-110 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-float`}
              >
                <img
                  src={avatar.src}
                  alt={`Community member ${avatar.id}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}

            {logos.map((logo) => (
              <div
                key={logo.id}
                className={`absolute ${logo.position} w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-13 lg:h-13 rounded-xl sm:rounded-2xl ${logo.bgColor} border border-white/[0.12] backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] animate-float`}
              >
                <svg
                  className="w-4.5 h-4.5 xs:w-5 xs:h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 lg:w-6.5 lg:h-6.5 text-white/70"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={logo.icon} />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
