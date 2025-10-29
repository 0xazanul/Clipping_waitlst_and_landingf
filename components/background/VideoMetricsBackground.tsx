"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function VideoMetricsBackground() {
  const [views, setViews] = useState(1247);

  useEffect(() => {
    const animate = () => {
      setViews(prev => prev < 9000 ? prev + 50 : 1247);
    };
    const interval = setInterval(animate, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed-youtube-bg pointer-events-none"
      style={{ 
        position: 'fixed',
        top: '50%', 
        left: '50%', 
        width: 'min(95vw, 80rem)',
        zIndex: 0,
        transform: 'translate(-50%, -50%)'
      }}
    >
        <div className="relative bg-black/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl">
          <div className="relative aspect-video bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-blue-900/20 to-cyan-900/30" />
            <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-xs font-semibold text-white">10:24</div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <motion.div className="h-full bg-red-600" animate={{ width: ["0%", "60%", "0%"] }} transition={{ duration: 11, repeat: Infinity, ease: "linear" }} />
            </div>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-4">
            <div className="flex items-start gap-3">
              <motion.div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0" animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <span className="text-white font-bold text-sm">TC</span>
              </motion.div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-base leading-tight line-clamp-2 mb-1">How I Grew My Channel to 100K Subscribers</h3>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-medium text-slate-300">TheClippingCompany</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span>{views.toLocaleString()} views</span>
                  <span></span>
                  <span>2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
