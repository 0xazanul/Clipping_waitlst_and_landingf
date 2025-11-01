"use client";

import { useEffect, useState } from "react";
import { useRealtimeWaitlist } from "@/hooks/useRealtimeWaitlist";
import HeaderWaitlist from "@/components/HeaderWaitlist";

interface VideoMetricsBackgroundProps {
  onJoinWaitlist?: () => void;
}

export default function VideoMetricsBackground({ onJoinWaitlist }: VideoMetricsBackgroundProps = {}) {
  const [views, setViews] = useState(1247);
  const [likes, setLikes] = useState(342);
  const [subscribers, setSubscribers] = useState(1850);
  const [earnings, setEarnings] = useState(47.5);
  const [isDesktop, setIsDesktop] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
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

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const progress = (video.currentTime / video.duration) * 100;
    setVideoProgress(progress);
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`Video time: ${video.currentTime.toFixed(2)}s / ${video.duration.toFixed(2)}s - Progress: ${progress.toFixed(2)}%`);
    }
  };

  return (
    <div 
      className="w-full min-h-screen flex items-center justify-center"
      style={{ 
        zIndex: 10,
      }}
    >
      <div className="w-full h-screen flex items-center justify-center p-0">
        <div 
          className="relative bg-gradient-to-b from-black/80 via-slate-950/90 to-slate-900/80 w-full h-full flex flex-col"
        >
          <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-black flex-1 flex items-center justify-center px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8" style={{ minHeight: 0 }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              onTimeUpdate={handleVideoTimeUpdate}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
              style={{ zIndex: 0 }}
            >
              <source src="/videos/video-bg.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/40" style={{ zIndex: 1 }} />

            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/5 via-blue-900/3 to-cyan-900/5 pointer-events-none" style={{ zIndex: 2 }} />
            
            <div className="relative z-10 w-full max-w-2xl mx-auto text-center px-4">
              <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tight text-white/90 mb-3 sm:mb-4 md:mb-5">
                make videos and
                <br />
                earn crypto
              </h1>
              
              <p className="font-sans text-sm sm:text-base md:text-lg lg:text-xl text-gray-400/80 font-extralight mb-4 sm:mb-6 md:mb-8">
                post brand content on your channel.
                <br />
                hit view targets. earn money.
              </p>

              <div className="flex items-center justify-center w-full">
                <HeaderWaitlist />
              </div>
            </div>

            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-black/95 px-2 py-1 rounded text-[10px] sm:text-xs font-semibold text-white/60 pointer-events-none z-10">
              10:24
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 pointer-events-none z-10">
              <div className="yt-progress h-full bg-red-600/70 transition-all duration-100 ease-linear" style={{ width: `${videoProgress}%` }} />
            </div>
          </div>
          
          <div className="bg-gradient-to-b from-black/80 via-slate-950/90 to-slate-900/80 flex-shrink-0 p-2 sm:p-3 md:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-500/70 via-indigo-500/70 to-purple-600/70 flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white/80 font-bold text-xs sm:text-sm">TC</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white/70 font-semibold text-xs sm:text-sm md:text-base line-clamp-2 mb-1">
                      From 0 to Viral: The Clipping Company Changed Everything
                    </h3>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400/90 mt-1">
                      <span className="font-semibold">TheClippingCompany</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500/80 mt-1">
                      <span className="font-semibold">{views.toLocaleString()} views</span>
                      <span>•</span>
                      <span className="font-medium">2 days ago</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <div className="flex items-center gap-1 bg-white/[0.02] rounded px-2 py-1 border border-white/[0.03]">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400/60" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      <span className="text-xs sm:text-sm font-semibold text-white/80 tabular-nums">{likes.toLocaleString()}</span>
                      <span className="text-[10px] sm:text-xs text-emerald-400/70 font-medium">+{Math.round(likes * 0.15)}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 bg-white/[0.02] rounded px-2 py-1 border border-white/[0.03]">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-400/60" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <span className="text-xs sm:text-sm font-semibold text-white/80 tabular-nums">{subscribers.toLocaleString()}</span>
                      <span className="text-[10px] sm:text-xs text-emerald-400/70 font-medium">+{Math.round(subscribers * 0.12)}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 bg-white/[0.02] rounded px-2 py-1 border border-white/[0.03]">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400/60" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs sm:text-sm font-semibold text-white/80 tabular-nums">${earnings.toFixed(1)}</span>
                      <span className="text-[10px] sm:text-xs text-emerald-400/70 font-medium">+${(earnings * 0.18).toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
