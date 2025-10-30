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
  const waitlistCount = useRealtimeWaitlist();

  useEffect(() => {
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
      className="fixed-youtube-bg absolute inset-0 flex items-center justify-center"
      style={{ 
        height: '100vh',
        maxHeight: '100vh',
        zIndex: 10,
        paddingLeft: '5px',
        paddingRight: '5px',
        paddingTop: '10px',
        paddingBottom: '10px',
      }}
    >
      <div className="w-full mx-auto" style={{ maxHeight: 'calc(100vh - 20px)', maxWidth: '95%' }}>
        <div 
          className="relative bg-gradient-to-b from-black/80 via-slate-950/90 to-slate-900/80 rounded-lg md:rounded-xl shadow-2xl border border-white/[0.03] w-full overflow-auto"
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '100%',
          }}
        >
        <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-4 sm:px-6 md:px-8" style={{ aspectRatio: '16/9', flexShrink: 0 }}>
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/5 via-blue-900/3 to-cyan-900/5 pointer-events-none" />
            
            <div className="relative z-10 w-full max-w-xl text-center">
              <h1 className="text-[1.75rem] leading-[1.2] sm:text-[2.25rem] md:text-[3rem] lg:text-[3.75rem] font-light tracking-tight text-white/70 mb-3 sm:mb-4 md:mb-5 px-2">
                make videos and
                <br />
                earn crypto
              </h1>
              
              <p className="text-[0.875rem] leading-[1.5] sm:text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] text-gray-500/60 font-light px-4 sm:px-6">
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
          
          <div className="bg-gradient-to-b from-black/80 via-slate-950/90 to-slate-900/80 p-2 sm:p-2.5 md:p-3" style={{ flexShrink: 0 }}>
            <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
              <div className="yt-avatar w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-blue-500/70 via-indigo-500/70 to-purple-600/70 flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white/80 font-bold text-[10px] sm:text-[11px] md:text-xs">TC</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white/70 font-semibold text-[0.6875rem] leading-snug sm:text-xs md:text-sm line-clamp-2 mb-0.5">
                  From 0 to Viral: The Clipping Company Changed Everything
                </h3>
                <div className="flex items-center gap-1.5 text-[0.625rem] sm:text-[0.6875rem] md:text-xs text-slate-500/70">
                  <span className="font-medium text-slate-400/80">TheClippingCompany</span>
                </div>
                <div className="flex items-center gap-1.5 text-[0.625rem] sm:text-[0.6875rem] md:text-xs text-slate-500/70 mt-0.5">
                  <span>{views.toLocaleString()} views</span>
                  <span>•</span>
                  <span>2 days ago</span>
                </div>
              </div>
            </div>

            <div className="mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-white/[0.03] grid grid-cols-3 gap-1.5 sm:gap-2">
              <div className="flex flex-col items-center bg-gradient-to-b from-white/[0.02] to-transparent rounded-lg p-1.5 sm:p-2 border border-white/[0.03] transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.06]">
                <div className="flex items-center gap-1 mb-0.5">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-blue-400/60" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span className="text-[0.625rem] sm:text-[0.6875rem] font-medium text-slate-400/80 uppercase tracking-wide">Likes</span>
                </div>
                <span className="text-sm sm:text-base font-bold text-white/80 tabular-nums">{likes.toLocaleString()}</span>
                <span className="text-[0.625rem] sm:text-[0.6875rem] text-emerald-400/70 font-medium mt-0.5">+{Math.round(likes * 0.15)}</span>
              </div>

              <div className="flex flex-col items-center bg-gradient-to-b from-white/[0.02] to-transparent rounded-lg p-1.5 sm:p-2 border border-white/[0.03] transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.06]">
                <div className="flex items-center gap-1 mb-0.5">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-red-400/60" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span className="text-[0.625rem] sm:text-[0.6875rem] font-medium text-slate-400/80 uppercase tracking-wide">Subs</span>
                </div>
                <span className="text-sm sm:text-base font-bold text-white/80 tabular-nums">{subscribers.toLocaleString()}</span>
                <span className="text-[0.625rem] sm:text-[0.6875rem] text-emerald-400/70 font-medium mt-0.5">+{Math.round(subscribers * 0.12)}</span>
              </div>

              <div className="flex flex-col items-center bg-gradient-to-b from-white/[0.02] to-transparent rounded-lg p-1.5 sm:p-2 border border-white/[0.03] transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.06]">
                <div className="flex items-center gap-1 mb-0.5">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-emerald-400/60" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[0.625rem] sm:text-[0.6875rem] font-medium text-slate-400/80 uppercase tracking-wide">Earned</span>
                </div>
                <span className="text-sm sm:text-base font-bold text-white/80 tabular-nums">${earnings.toFixed(1)}</span>
                <span className="text-[0.625rem] sm:text-[0.6875rem] text-emerald-400/70 font-medium mt-0.5">+${(earnings * 0.18).toFixed(1)}</span>
              </div>
            </div>

            <div className="px-2 sm:px-3 md:px-4 pt-2 sm:pt-3 pb-2 sm:pb-3">
              <button
                onClick={onJoinWaitlist}
                className="w-full bg-white/95 hover:bg-white text-black font-medium text-sm sm:text-base py-2 sm:py-2.5 rounded-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
              >
                Join Waitlist →
              </button>
              
              {waitlistCount !== null && waitlistCount > 0 && (
                <p className="text-center mt-1.5 sm:mt-2 text-[0.6875rem] sm:text-xs text-gray-500/50 font-light">
                  <span className="font-medium text-white/70">{waitlistCount.toLocaleString()}</span> {waitlistCount === 1 ? "person" : "people"} already joined
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
