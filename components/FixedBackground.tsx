"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Eye, Heart, MessageCircle, TrendingUp, Users } from "lucide-react";

export default function FixedBackground() {
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
    const loopDuration = 11000;
    let startTime = Date.now();
    let toastCounter = 0;

    const animate = () => {
      const elapsed = (Date.now() - startTime) % loopDuration;
      const progress = elapsed / loopDuration;

      if (progress > 0.95) {
        setViews(1247);
        setLikes(89);
        setComments(23);
        setSubscribers(2841);
        setShowToasts([]);
        setGraphData([20, 25, 30, 28, 35, 40, 38, 45, 52, 60]);
        startTime = Date.now();
      } else {
        if (progress < 0.7) {
          setViews(Math.floor(1247 + progress * 8000));
          setLikes(Math.floor(89 + progress * 450));
          setComments(Math.floor(23 + progress * 180));
        }
        
        if (progress < 0.75) {
          setSubscribers(Math.floor(2841 + progress * 1200));
        }

        if (progress > 0.3 && progress < 0.8) {
          const newValue = 60 + Math.floor((progress - 0.3) * 40);
          if (graphData.length < 15) {
            setGraphData(prev => [...prev, newValue]);
          }
        }

        if (progress > 0.2 && progress < 0.85) {
          toastCounter++;
          if (toastCounter % 4 === 0 && showToasts.length < 2) {
            const randomToast = toastMessages[Math.floor(Math.random() * toastMessages.length)];
            setShowToasts(prev => [...prev, { id: Date.now(), text: randomToast }]);
            setTimeout(() => {
              setShowToasts(prev => prev.slice(1));
            }, 2000);
          }
        }
      }

      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-slate-950">
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="grain-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-noise)" />
        </svg>
      </div>

      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
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

      {/* Main content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto px-4">
          {/* Video Card */}
          <div className="relative bg-black/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl">
            {/* Video Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-blue-900/20 to-cyan-900/30" />
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
              </div>
              
              {/* Duration badge */}
              <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-xs font-semibold text-white">
                10:24
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <motion.div
                  className="h-full bg-red-600"
                  animate={{ width: ["0%", "60%", "0%"] }}
                  transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>

            {/* Video Info */}
            <div className="bg-black/40 backdrop-blur-md p-4">
              <div className="flex items-start gap-3">
                <motion.div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <span className="text-white font-bold text-sm">TC</span>
                </motion.div>
                
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base leading-tight line-clamp-2 mb-1">
                    How I Grew My Channel to 100K Subscribers | TheClippingCompany Success Story
                  </h3>
                  
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
              </div>
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="absolute -right-16 top-1/2 -translate-y-1/2 space-y-3 w-56">
            <motion.div
              className="bg-slate-800/60 backdrop-blur-xl rounded-xl p-4 border border-white/10 shadow-lg"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Eye className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-slate-300">Views</span>
              </div>
              <div className="text-3xl font-bold text-white tabular-nums">{views.toLocaleString()}</div>
            </motion.div>

            <motion.div
              className="bg-slate-800/60 backdrop-blur-xl rounded-xl p-4 border border-white/10 shadow-lg"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="text-sm text-slate-300">Likes</span>
              </div>
              <div className="text-3xl font-bold text-white tabular-nums">{likes.toLocaleString()}</div>
            </motion.div>

            <motion.div
              className="bg-slate-800/60 backdrop-blur-xl rounded-xl p-4 border border-white/10 shadow-lg"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-sm text-slate-300">Comments</span>
              </div>
              <div className="text-3xl font-bold text-white tabular-nums">{comments}</div>
            </motion.div>
          </div>

          {/* Subscribers */}
          <motion.div
            className="absolute -left-8 bottom-12 bg-gradient-to-r from-purple-600/80 to-blue-600/80 backdrop-blur-xl rounded-full px-5 py-3 border border-white/20 shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-white" />
              <span className="text-base font-semibold text-white tabular-nums">
                {subscribers.toLocaleString()} subscribers
              </span>
            </div>
          </motion.div>

          {/* Graph */}
          <motion.div
            className="absolute -right-20 -bottom-8 bg-slate-800/60 backdrop-blur-xl rounded-xl p-4 border border-white/10 shadow-lg w-48"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 100 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">Growth</span>
            </div>
            <div className="h-16 flex items-end gap-1">
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

          {/* Toasts */}
          <div className="absolute -top-4 -right-20 w-56 space-y-2">
            {showToasts.map((toast) => (
              <motion.div
                key={toast.id}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="bg-slate-700/60 backdrop-blur-lg rounded-lg px-3 py-2 border border-white/10 shadow-lg"
              >
                <p className="text-xs text-slate-200">{toast.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
