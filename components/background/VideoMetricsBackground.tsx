"use client";

import { useEffect, useState } from "react";
import { useRealtimeWaitlist } from "@/hooks/useRealtimeWaitlist";

interface VideoMetricsBackgroundProps {
  onJoinWaitlist?: () => void;
}

export default function VideoMetricsBackground({ onJoinWaitlist }: VideoMetricsBackgroundProps = {}) {
  const [views, setViews] = useState(1247);
  const [likes, setLikes] = useState(342);
  const [subscribers, setSubscribers] = useState(1850);
  const [earnings, setEarnings] = useState(47.5);
  const [isDesktop, setIsDesktop] = useState(false);
  const waitlistCount = useRealtimeWaitlist();

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    
    const animate = () => {
      setViews(prev => prev < 9000 ? prev + 50 : 1247);
      setLikes(prev => prev < 2500 ? prev + 15 : 342);
      setSubscribers(prev => prev < 5000 ? prev + 25 : 1850);
      setEarnings(prev => prev < 250 ? prev + 2.5 : 47.5);
    };
    const interval = setInterval(animate, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed-youtube-bg absolute inset-0 flex items-start justify-center"
      style={{ 
        height: '100vh',
        maxHeight: '100vh',
        zIndex: 10,
        paddingLeft: '8px',
        paddingRight: '8px',
        paddingTop: '70px',
        paddingBottom: '8px',
      }}
    >
      <div className="w-full mx-auto" style={{ maxHeight: '100%', maxWidth: '98%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', height: '100%' }}>
        <div 
          className="relative bg-gradient-to-b from-black/80 via-slate-950/90 to-slate-900/80 rounded-lg md:rounded-xl shadow-2xl border border-white/[0.03] w-full"
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '100%',
            maxWidth: '100%',
          }}
        >
        <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-4 sm:px-6 md:px-8" style={{ width: '100%', paddingBottom: '35%', position: 'relative', flexShrink: 0 }}>
            {/* Video Background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-30"
              style={{ zIndex: 0 }}
            >
              <source src="/videos/video-bg.mp4" type="video/mp4" />
            </video>

            {/* Dark overlay for text visibility */}
            <div className="absolute inset-0 bg-black/40" style={{ zIndex: 1 }} />

            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/5 via-blue-900/3 to-cyan-900/5 pointer-events-none" style={{ zIndex: 2 }} />
            
            <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 3 }}>
            <div className="relative z-10 w-full max-w-xl text-center">
              <h1 className="font-sans text-[2rem] leading-[1.2] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] font-extralight tracking-tight text-white/90 mb-2 sm:mb-3 md:mb-4 px-2">
                make videos and
                <br />
                earn crypto
              </h1>
              
              <p className="font-sans text-[0.9375rem] leading-[1.5] sm:text-[1.0625rem] md:text-[1.1875rem] lg:text-[1.3125rem] text-gray-400/80 font-extralight px-4 sm:px-6">
                post brand content on your channel.
                <br />
                hit view targets. earn money.
              </p>
            </div>

            <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 md:bottom-3 md:right-3 bg-black/95 px-1.5 py-0.5 md:px-2 md:py-1 rounded text-[9px] sm:text-[10px] md:text-xs font-semibold text-white/60 pointer-events-none">
              10:24
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-white/5 pointer-events-none">
              <div className="yt-progress h-full bg-red-600/70 transition-all duration-300" />
            </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-b from-black/80 via-slate-950/90 to-slate-900/80 p-1.5 sm:p-2 md:p-2.5" style={{ flexShrink: 0 }}>
            <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
              <div className="yt-avatar w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-blue-500/70 via-indigo-500/70 to-purple-600/70 flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white/80 font-bold text-[10px] sm:text-[11px] md:text-xs">TC</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white/70 font-semibold text-[0.6875rem] leading-snug sm:text-xs md:text-sm line-clamp-2 mb-0.5">
                      From 0 to Viral: The Clipping Company Changed Everything
                    </h3>
                    <div className="flex items-center gap-2 text-[0.6875rem] sm:text-xs md:text-sm text-slate-400/90 mt-1">
                      <span className="font-semibold">TheClippingCompany</span>
                    </div>
                    <div className="flex items-center gap-2 text-[0.6875rem] sm:text-xs md:text-sm text-slate-500/80 mt-1">
                      <span className="font-semibold">{views.toLocaleString()} views</span>
                      <span>•</span>
                      <span className="font-medium">2 days ago</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-0.5 flex-shrink-0 mr-10">
                    <div className="flex items-center gap-1 bg-white/[0.02] rounded px-2 py-1 border border-white/[0.03]">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400/60" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      <span className="text-xs sm:text-sm font-semibold text-white/80 tabular-nums">{likes.toLocaleString()}</span>
                      <span className="text-[0.625rem] text-emerald-400/70 font-medium">+{Math.round(likes * 0.15)}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 bg-white/[0.02] rounded px-2 py-1 border border-white/[0.03]">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400/60" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <span className="text-xs sm:text-sm font-semibold text-white/80 tabular-nums">{subscribers.toLocaleString()}</span>
                      <span className="text-[0.625rem] text-emerald-400/70 font-medium">+{Math.round(subscribers * 0.12)}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 bg-white/[0.02] rounded px-2 py-1 border border-white/[0.03]">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400/60" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs sm:text-sm font-semibold text-white/80 tabular-nums">${earnings.toFixed(1)}</span>
                      <span className="text-[0.625rem] text-emerald-400/70 font-medium">+${(earnings * 0.18).toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-1.5 sm:px-2 md:px-3 pt-1.5 sm:pt-2 pb-1.5 sm:pb-2">
              {/* Waitlist section moved to header */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
