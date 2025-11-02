"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function HowItWorks() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  const togglePlay = async () => {
    if (videoRef.current) {
      try {
        if (isPlaying) {
          if (playPromiseRef.current) {
            await playPromiseRef.current;
          }
          videoRef.current.pause();
          setIsPlaying(false);
          playPromiseRef.current = null;
        } else {
          playPromiseRef.current = videoRef.current.play();
          await playPromiseRef.current;
          setIsPlaying(true);
        }
      } catch (error) {
        console.log('Play/Pause interrupted:', error);
        playPromiseRef.current = null;
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const newTime = videoRef.current.currentTime;
      setCurrentTime(newTime);
      console.log('Time updated:', newTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration;
      setDuration(videoDuration);
      setIsLoaded(true);
      console.log('Video loaded, duration:', videoDuration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video error:', e);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="flex flex-col items-center mb-10 sm:mb-12 md:mb-14 lg:mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-5 sm:mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-xs sm:text-sm text-white/40 font-light tracking-[0.15em] uppercase">
                How It Works
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] text-white/90 mb-4 sm:mb-5 max-w-3xl">
              See how simple it is to get started<br />and grow your content
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl shadow-black/50 bg-black/40 backdrop-blur-sm">
              <video
                ref={videoRef}
                className="w-full h-auto object-contain"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onLoadedData={() => console.log('Video data loaded')}
                onCanPlay={() => console.log('Video can play')}
                onError={handleError}
                onEnded={() => {
                  setIsPlaying(false);
                  playPromiseRef.current = null;
                }}
                onPlay={() => {
                  setIsPlaying(true);
                  console.log('Video playing');
                }}
                onPause={() => {
                  setIsPlaying(false);
                  console.log('Video paused');
                }}
                preload="auto"
                playsInline
              >
                <source src="/videos/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 sm:p-4">
                {!isLoaded && (
                  <div className="text-white text-xs mb-2">Loading video...</div>
                )}
                <div className="relative w-full mb-3 sm:mb-4">
                  <div className="w-full h-1 sm:h-1.5 bg-white/20 rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-white/80 transition-all duration-100"
                      style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    step="0.1"
                    value={currentTime}
                    onChange={handleSeek}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={togglePlay}
                      className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      {isPlaying ? (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>

                    <span className="text-white text-xs sm:text-sm font-light">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
