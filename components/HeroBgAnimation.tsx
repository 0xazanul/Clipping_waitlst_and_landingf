"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Eye, Heart, MessageCircle, TrendingUp, Users } from "lucide-react";

export default function HeroBgAnimation() {
  const [views, setViews] = useState(1247);
  const [likes, setLikes] = useState(89);
  const [comments, setComments] = useState(23);
  const [subscribers, setSubscribers] = useState(2841);
  const [showToasts, setShowToasts] = useState<Array<{ id: number; text: string }>>([]);
  const [graphData, setGraphData] = useState([20, 25, 30, 28, 35, 40, 38, 45, 52, 60]);

  const toastMessages = [
    "Great content!",
    "Love this 🔥",
    "More please",
    "Amazing work",
    "Keep it up!",
  ];

  useEffect(() => {
    const loopDuration = 11000; // 11 seconds
    let startTime = Date.now();
    let toastCounter = 0;

    const animate = () => {
      const elapsed = (Date.now() - startTime) % loopDuration;
      const progress = elapsed / loopDuration;

      // Reset at loop end
      if (progress > 0.95) {
        setViews(1247);
        setLikes(89);
        setComments(23);
        setSubscribers(2841);
        setShowToasts([]);
        setGraphData([20, 25, 30, 28, 35, 40, 38, 45, 52, 60]);
        startTime = Date.now();
      } else {
        // Animate counters
        if (progress < 0.7) {
          setViews(Math.floor(1247 + progress * 8000));
          setLikes(Math.floor(89 + progress * 450));
          setComments(Math.floor(23 + progress * 180));
        }
        
        if (progress < 0.75) {
          setSubscribers(Math.floor(2841 + progress * 1200));
        }

        // Add graph points
        if (progress > 0.3 && progress < 0.8) {
          const newValue = 60 + Math.floor((progress - 0.3) * 60);
          setGraphData(prev => [...prev.slice(-9), newValue]);
        }

        // Show toasts
        if (Math.floor(progress * 20) % 4 === 0 && progress > 0.2 && progress < 0.85) {
          const currentToast = Math.floor(progress * 20);
          if (currentToast !== toastCounter) {
            toastCounter = currentToast;
            const newToast = {
              id: Date.now(),
              text: toastMessages[Math.floor(Math.random() * toastMessages.length)]
            };
            setShowToasts(prev => [...prev.slice(-2), newToast]);
          }
        }
      }

      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Subtle grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Ambient glows */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content - Full screen responsive */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center px-4 py-8">
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Video Card */}
            <motion.div
              className="relative w-full max-w-6xl mx-auto bg-black/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
                {/* Realistic video preview background */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-blue-900/20 to-cyan-900/30" />
                  {/* Simulated video content with geometric shapes */}
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                  <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
                </div>
                
                {/* Video duration badge */}
                <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-xs font-semibold text-white">
                  10:24
                </div>

                {/* Progress bar - YouTube style */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <motion.div
                    className="h-full bg-red-600"
                    animate={{ width: ["0%", "60%", "0%"] }}
                    transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
              </div>

              {/* Video Info - YouTube style */}
              <div className="bg-black/40 backdrop-blur-md p-4">
                <div className="flex items-start gap-3">
                  {/* Channel Avatar */}
                  <motion.div
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0 flex items-center justify-center shadow-lg"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <span className="text-white font-bold text-sm">TC</span>
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    {/* Video Title */}
                    <h3 className="text-white font-semibold text-sm md:text-base leading-tight line-clamp-2 mb-1">
                      How I Grew My Channel to 100K Subscribers | TheClippingCompany Success Story
                    </h3>
                    
                    {/* Channel Name & Stats */}
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-medium text-slate-300">TheClippingCompany</span>
                      <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span>{views.toLocaleString()} views</span>
                      <span>•</span>
                      <span>2 days ago</span>
                    </div>
                  </div>

                  {/* Three dots menu */}
                  <button className="text-slate-400 hover:text-white p-1 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Engagement Metrics - Responsive positioning */}
            <div className="absolute -right-4 sm:-right-8 md:-right-12 lg:-right-16 top-1/2 -translate-y-1/2 space-y-2 md:space-y-3 w-36 sm:w-44 md:w-52 lg:w-56">
              {/* Views */}
              <motion.div
                className="bg-slate-800/60 backdrop-blur-xl rounded-lg md:rounded-xl p-2 md:p-3 lg:p-4 border border-white/10 shadow-lg"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              >
                <div className="flex items-center gap-1.5 md:gap-2 mb-0.5 md:mb-1">
                  <Eye className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-blue-400" />
                  <span className="text-[10px] md:text-xs lg:text-sm text-slate-300">Views</span>
                </div>
                <div className="text-lg md:text-2xl lg:text-3xl font-bold text-white tabular-nums">{views.toLocaleString()}</div>
              </motion.div>

              {/* Likes */}
              <motion.div
                className="bg-slate-800/60 backdrop-blur-xl rounded-lg md:rounded-xl p-2 md:p-3 lg:p-4 border border-white/10 shadow-lg"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
              >
                <div className="flex items-center gap-1.5 md:gap-2 mb-0.5 md:mb-1">
                  <Heart className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-red-400" />
                  <span className="text-[10px] md:text-xs lg:text-sm text-slate-300">Likes</span>
                </div>
                <div className="text-lg md:text-2xl lg:text-3xl font-bold text-white tabular-nums">{likes.toLocaleString()}</div>
              </motion.div>

              {/* Comments */}
              <motion.div
                className="bg-slate-800/60 backdrop-blur-xl rounded-lg md:rounded-xl p-2 md:p-3 lg:p-4 border border-white/10 shadow-lg"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
              >
                <div className="flex items-center gap-1.5 md:gap-2 mb-0.5 md:mb-1">
                  <MessageCircle className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-emerald-400" />
                  <span className="text-[10px] md:text-xs lg:text-sm text-slate-300">Comments</span>
                </div>
                <div className="text-lg md:text-2xl lg:text-3xl font-bold text-white tabular-nums">{comments}</div>
              </motion.div>
            </div>

            {/* Subscribers Pill - Responsive */}
            <motion.div
              className="absolute -left-2 sm:-left-4 md:-left-6 lg:-left-8 bottom-6 md:bottom-8 lg:bottom-12 bg-gradient-to-r from-purple-600/80 to-blue-600/80 backdrop-blur-xl rounded-full px-3 py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-3 border border-white/20 shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
            >
              <div className="flex items-center gap-1.5 md:gap-2">
                <Users className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
                <span className="text-xs md:text-sm lg:text-base font-semibold text-white tabular-nums">
                  {subscribers.toLocaleString()} subscribers
                </span>
              </div>
            </motion.div>

            {/* Mini Graph - Responsive */}
            <motion.div
              className="absolute -right-4 sm:-right-8 md:-right-12 lg:-right-20 -bottom-2 sm:-bottom-4 md:-bottom-6 lg:-bottom-8 bg-slate-800/60 backdrop-blur-xl rounded-lg md:rounded-xl p-2 md:p-3 lg:p-4 border border-white/10 shadow-lg w-32 sm:w-36 md:w-40 lg:w-48"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 100 }}
            >
              <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                <TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 text-green-400" />
                <span className="text-[8px] md:text-[10px] lg:text-xs text-slate-400 uppercase tracking-wider">Growth</span>
              </div>
              <div className="h-10 md:h-12 lg:h-16 flex items-end gap-0.5 md:gap-1">
                {graphData.map((value, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-sm"
                    initial={{ height: 0 }}
                    animate={{ height: `${value}%` }}
                    transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Floating Comment Toasts - Responsive */}
            <div className="absolute -top-2 sm:-top-4 -right-4 sm:-right-8 md:-right-12 lg:-right-20 w-36 sm:w-44 md:w-52 lg:w-56 space-y-1.5 md:space-y-2">
              {showToasts.map((toast) => (
                <motion.div
                  key={toast.id}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="bg-slate-700/60 backdrop-blur-lg rounded-md md:rounded-lg px-2 py-1.5 md:px-3 md:py-2 border border-white/10 shadow-lg"
                >
                  <p className="text-[10px] md:text-xs text-slate-200">{toast.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
