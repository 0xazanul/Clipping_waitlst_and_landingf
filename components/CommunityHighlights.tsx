"use client";

export default function CommunityHighlights() {
  const avatars = [
    { id: 1, src: "https://avatars.githubusercontent.com/u/16860528", position: "top-[10%] left-[15%]" },
    { id: 2, src: "https://avatars.githubusercontent.com/u/20110627", position: "top-[8%] left-[45%]" },
    { id: 3, src: "https://avatars.githubusercontent.com/u/106103625", position: "top-[12%] right-[20%]" },
    { id: 4, src: "https://avatars.githubusercontent.com/u/59228569", position: "top-[35%] right-[8%]" },
    { id: 5, src: "https://avatars.githubusercontent.com/u/59442788", position: "top-[40%] right-[35%]" },
    { id: 6, src: "https://avatars.githubusercontent.com/u/89768406", position: "bottom-[35%] left-[12%]" },
  ];

  const logos = [
    { 
      id: 1, 
      icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
      position: "top-[15%] left-[8%]",
      bgColor: "bg-white/5"
    },
    { 
      id: 2, 
      icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
      position: "top-[45%] left-[25%]",
      bgColor: "bg-white/5"
    },
    { 
      id: 3, 
      icon: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z",
      position: "top-[25%] right-[15%]",
      bgColor: "bg-indigo-500/10"
    },
    { 
      id: 4, 
      icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
      position: "bottom-[25%] right-[12%]",
      bgColor: "bg-white/5"
    },
  ];

  return (
    <section className="relative w-full py-32 sm:py-40 md:py-48 lg:py-56 overflow-visible">
      {/* Radial Ripple Effect Background */}
      <div className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none">
        {/* Diagonal Spotlight Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />
        
        {/* Single Rotating Radar Line */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="absolute bottom-0 left-0 origin-bottom animate-radar-sweep"
            style={{
              width: '2px',
              height: '50vh',
              background: `linear-gradient(to top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3) 50%, transparent)`,
              boxShadow: `0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.4)`,
            }}
          />
        </div>
        
        {/* Concentric Ripple Circles */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px]">
          {[...Array(12)].map((_, i) => {
            const size = 150 + (i * 90); // Fixed pixel sizing: 150px, 240px, 330px, etc.
            const opacity = Math.max(0.02, 0.15 - i * 0.01); // Gradient attenuation
            
            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  border: `1px solid rgba(255, 255, 255, ${opacity})`,
                  boxShadow: `0 0 ${20 - i}px rgba(255, 255, 255, ${opacity * 0.3})`,
                }}
              />
            );
          })}
        </div>
        
        {/* Subtle radial gradient overlay */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px]"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
          }}
        />
      </div>
      
      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          <div className="relative text-center space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-xs sm:text-sm text-gray-400 font-light tracking-wide">
                medusa
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight">
              Community
              <br />
              Highlights
            </h2>

            <p className="text-sm sm:text-base text-gray-500 font-light tracking-wide">
              January 2024
            </p>
          </div>

          <div className="relative mt-12 sm:mt-16 md:mt-20 h-64 sm:h-80 md:h-96">
            {avatars.map((avatar) => (
              <div
                key={avatar.id}
                className={`absolute ${avatar.position} w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] animate-float`}
              >
                <img
                  src={avatar.src}
                  alt={`Community member ${avatar.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {logos.map((logo) => (
              <div
                key={logo.id}
                className={`absolute ${logo.position} w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-2xl ${logo.bgColor} border border-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] animate-float`}
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white/60"
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
