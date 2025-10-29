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
      className="fixed-youtube-bg absolute block"
      style={{ 
        position: 'absolute',
        top: '50vh',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(92vw, 850px)',
        maxWidth: '850px',
        zIndex: 10,
      }}
    >
      <div className="relative bg-gradient-to-b from-black/30 via-slate-950/40 to-blue-950/40 rounded-lg md:rounded-xl overflow-visible shadow-2xl border border-white/5">
        <div className="relative aspect-video bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-blue-900/20 to-cyan-900/30 pointer-events-none" />
            
            <div className="relative z-10 w-full max-w-xl text-center">
              <h1 className="text-[1.75rem] leading-[1.2] sm:text-[2.25rem] md:text-[3rem] lg:text-[3.75rem] font-light tracking-tight text-white mb-3 sm:mb-4 md:mb-5 px-2">
                Make videos and 
                <br />
                Earn Crypto.
              </h1>
              
              <p className="text-[0.875rem] leading-[1.5] sm:text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] text-gray-400/90 font-light px-4 sm:px-6">
                Post brand content on your channel.
                <br />
                Hit view targets. Earn money.
              </p>
            </div>

            <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 md:bottom-3 md:right-3 bg-black/80 px-1.5 py-0.5 md:px-2 md:py-1 rounded text-[9px] sm:text-[10px] md:text-xs font-semibold text-white pointer-events-none">
              10:24
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-white/20 pointer-events-none">
              <div className="yt-progress h-full bg-red-600 transition-all duration-300" />
            </div>
          </div>
          
          <div className="bg-gradient-to-b from-black/30 via-slate-950/40 to-blue-950/40 p-2 sm:p-2.5 md:p-3 lg:p-4">
            <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
              <div className="yt-avatar w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white font-bold text-[10px] sm:text-[11px] md:text-xs lg:text-sm">TC</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-[0.6875rem] leading-snug sm:text-xs md:text-sm lg:text-base line-clamp-2 mb-1">
                  From 0 to Viral: The Clipping Company Changed Everything
                </h3>
                <div className="flex items-center gap-1.5 text-[0.625rem] sm:text-[0.6875rem] md:text-xs text-slate-400">
                  <span className="font-medium text-slate-300">TheClippingCompany</span>
                </div>
                <div className="flex items-center gap-1.5 text-[0.625rem] sm:text-[0.6875rem] md:text-xs text-slate-400 mt-0.5">
                  <span>{views.toLocaleString()} views</span>
                  <span>•</span>
                  <span>2 days ago</span>
                </div>
              </div>
            </div>

            <div className="mt-2.5 sm:mt-3 md:mt-3.5 lg:mt-4 pt-2.5 sm:pt-3 md:pt-3.5 lg:pt-4 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-2.5 md:gap-3">
              <div className="flex flex-col items-center bg-black/20 rounded-lg p-2 sm:p-2.5 border border-white/5 transition-all duration-300 hover:bg-black/30">
                <div className="flex items-center gap-1 mb-1">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span className="text-[0.625rem] sm:text-[0.6875rem] md:text-[0.75rem] font-medium text-slate-300 uppercase tracking-wide">Likes</span>
                </div>
                <span className="text-sm sm:text-base md:text-lg font-bold text-white tabular-nums">{likes.toLocaleString()}</span>
                <span className="text-[0.625rem] sm:text-[0.6875rem] md:text-[0.75rem] text-green-400 font-medium mt-0.5">+{Math.round(likes * 0.15)}</span>
              </div>

              <div className="flex flex-col items-center bg-black/20 rounded-lg p-2 sm:p-2.5 border border-white/5 transition-all duration-300 hover:bg-black/30">
                <div className="flex items-center gap-1 mb-1">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span className="text-[0.625rem] sm:text-[0.6875rem] md:text-[0.75rem] font-medium text-slate-300 uppercase tracking-wide">Subs</span>
                </div>
                <span className="text-sm sm:text-base md:text-lg font-bold text-white tabular-nums">{subscribers.toLocaleString()}</span>
                <span className="text-[0.625rem] sm:text-[0.6875rem] md:text-[0.75rem] text-green-400 font-medium mt-0.5">+{Math.round(subscribers * 0.12)}</span>
              </div>

              <div className="flex flex-col items-center bg-black/20 rounded-lg p-2 sm:p-2.5 border border-white/5 transition-all duration-300 hover:bg-black/30">
                <div className="flex items-center gap-1 mb-1">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[0.625rem] sm:text-[0.6875rem] md:text-[0.75rem] font-medium text-slate-300 uppercase tracking-wide">Earned</span>
                </div>
                <span className="text-sm sm:text-base md:text-lg font-bold text-white tabular-nums">${earnings.toFixed(1)}</span>
                <span className="text-[0.625rem] sm:text-[0.6875rem] md:text-[0.75rem] text-green-400 font-medium mt-0.5">+${(earnings * 0.18).toFixed(1)}</span>
              </div>
            </div>

            <div className="px-4 sm:px-5 md:px-6 pt-4 sm:pt-5 md:pt-6 pb-5 sm:pb-6 md:pb-7">
              <button
                onClick={onJoinWaitlist}
                className="w-full bg-white/95 hover:bg-white text-black font-medium text-sm sm:text-base md:text-lg py-3 sm:py-3.5 rounded-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
              >
                Join Waitlist →
              </button>
              
              {waitlistCount !== null && waitlistCount > 0 && (
                <p className="text-center mt-3 sm:mt-3.5 md:mt-4 text-[0.6875rem] sm:text-xs md:text-sm text-gray-400/80 font-light">
                  <span className="font-medium text-white">{waitlistCount.toLocaleString()}</span> {waitlistCount === 1 ? "person" : "people"} already joined
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
