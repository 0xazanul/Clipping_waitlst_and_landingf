"use client";

import { useEffect, useState, useRef } from "react";

export default function VideoMetricsBackground() {
  const [views, setViews] = useState(1247);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = () => {
      setViews(prev => prev < 9000 ? prev + 50 : 1247);
    };
    const interval = setInterval(animate, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Debug: Log computed styles
    if (bgRef.current) {
      const computed = window.getComputedStyle(bgRef.current);
      console.log("🎬 BACKGROUND DEBUG:");
      console.log("  position:", computed.position);
      console.log("  transform:", computed.transform);
      console.log("  will-change:", computed.willChange);
      console.log("  top:", computed.top);
      console.log("  left:", computed.left);
      console.log("  z-index:", computed.zIndex);
      
      // Check parent elements for transforms
      let parent = bgRef.current.parentElement;
      let level = 1;
      while (parent && level <= 5) {
        const parentStyle = window.getComputedStyle(parent);
        if (parentStyle.transform !== 'none' || 
            parentStyle.filter !== 'none' || 
            parentStyle.perspective !== 'none' ||
            parentStyle.willChange !== 'auto') {
          console.log(`  ⚠️ PARENT ${level} (${parent.tagName}):`, {
            transform: parentStyle.transform,
            filter: parentStyle.filter,
            perspective: parentStyle.perspective,
            willChange: parentStyle.willChange
          });
        }
        parent = parent.parentElement;
        level++;
      }
    }
    
    // Track scroll position
    const handleScroll = () => {
      if (bgRef.current) {
        const rect = bgRef.current.getBoundingClientRect();
        console.log("📍 Scroll Position:", window.scrollY, "| Element Top:", rect.top);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={bgRef}
      className="fixed-youtube-bg pointer-events-none"
      style={{ 
        position: 'absolute',
        top: '50vh', 
        left: '50%', 
        width: 'min(95vw, 80rem)',
        maxWidth: '80rem',
        zIndex: 0,
        marginLeft: 'calc(min(95vw, 80rem) / -2)',
        marginTop: 'calc(min(95vw, 80rem) * 9 / 16 / -2)'
      }}
    >
        <div className="relative bg-black/80 rounded-xl overflow-hidden shadow-2xl border border-white/5">
          <div className="relative aspect-video bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-blue-900/20 to-cyan-900/30" />
            <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-xs font-semibold text-white">10:24</div>
            
            {/* Progress bar - pure CSS animation */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div className="yt-progress h-full bg-red-600" />
            </div>
          </div>
          <div className="bg-black/60 p-4">
            <div className="flex items-start gap-3">
              {/* Avatar - pure CSS animation */}
              <div className="yt-avatar w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white font-bold text-sm">TC</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-base leading-tight line-clamp-2 mb-1">How I Grew My Channel to 100K Subscribers</h3>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-medium text-slate-300">TheClippingCompany</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span>{views.toLocaleString()} views</span>
                  <span>•</span>
                  <span>2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
