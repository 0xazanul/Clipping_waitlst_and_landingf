"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Generate particle positions with consistent seed-based randomness
  const particles = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => {
      // Use index as seed for consistent "random" values
      const seed1 = (i * 9301 + 49297) % 233280;
      const seed2 = (i * 1234 + 5678) % 233280;
      const seed3 = (i * 4321 + 8765) % 233280;
      const seed4 = (i * 7890 + 1234) % 233280;
      
      return {
        id: i,
        initialX: (seed1 / 233280) * 100,
        initialY: (seed2 / 233280) * 100,
        duration: 15 + (seed3 / 233280) * 20,
        delay: (seed4 / 233280) * 5,
        size: (seed1 / 233280) * 3 + 1,
      };
    })
  , []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Deep gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950" />
      
      {/* Animated gradient orbs - more visible */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 800px 600px at 20% 40%, rgba(59, 130, 246, 0.25) 0%, transparent 50%),
            radial-gradient(ellipse 600px 500px at 80% 30%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse 700px 600px at 50% 80%, rgba(99, 102, 241, 0.18) 0%, transparent 50%)
          `,
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Mouse spotlight effect */}
      {isMounted && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: 800,
            height: 800,
            left: mousePosition.x - 400,
            top: mousePosition.y - 400,
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 60,
          }}
        />
      )}

      {/* Floating particles - more visible */}
      {isMounted && particles.slice(0, 30).map((particle) => {
        // Use particle id as seed for consistent animation values
        const seed1 = (particle.id * 5432 + 1111) % 233280;
        const seed2 = (particle.id * 6543 + 2222) % 233280;
        const seed3 = (particle.id * 7654 + 3333) % 233280;
        
        const xOffset1 = (seed1 / 233280) * 200 - 100;
        const xOffset2 = (seed2 / 233280) * 200 - 100;
        const yOffset1 = (seed2 / 233280) * 200 - 100;
        const yOffset2 = (seed3 / 233280) * 200 - 100;
        
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
              background: `radial-gradient(circle, rgba(96, 165, 250, 0.8), rgba(139, 92, 246, 0.4))`,
              boxShadow: "0 0 30px rgba(96, 165, 250, 0.5)",
            }}
            animate={{
              x: [0, xOffset1, xOffset2, 0],
              y: [0, yOffset1, yOffset2, 0],
              opacity: [0, 0.8, 0.8, 0],
              scale: [0, 1, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Large animated orbs - more prominent */}
      <motion.div
        className="absolute w-[1000px] h-[1000px] -top-[500px] -left-[500px]"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.15, 1],
        }}
        transition={{
          rotate: { duration: 50, repeat: Infinity, ease: "linear" },
          scale: { duration: 15, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-transparent rounded-full blur-[120px]" />
      </motion.div>

      <motion.div
        className="absolute w-[900px] h-[900px] -bottom-[450px] -right-[450px]"
        animate={{
          rotate: [360, 0],
          scale: [1.1, 0.95, 1.1],
        }}
        transition={{
          rotate: { duration: 45, repeat: Infinity, ease: "linear" },
          scale: { duration: 18, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="w-full h-full bg-gradient-to-tl from-violet-600/35 via-purple-600/25 to-transparent rounded-full blur-[100px]" />
      </motion.div>

      <motion.div
        className="absolute w-[1100px] h-[1100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: [0, -360],
          scale: [1, 1.25, 1],
        }}
        transition={{
          rotate: { duration: 65, repeat: Infinity, ease: "linear" },
          scale: { duration: 20, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-indigo-600/25 via-purple-600/20 to-blue-600/25 rounded-full blur-[90px]" />
      </motion.div>

      {/* Animated gradient beams */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`beam-${i}`}
          className="absolute left-0 right-0 h-[1px]"
          style={{
            top: `${15 + i * 15}%`,
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(59, 130, 246, ${0.08 + i * 0.03}) 50%, 
              transparent 100%)`,
            filter: "blur(0.5px)",
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scaleX: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Scanning effect */}
      <motion.div
        className="absolute left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)",
          boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)",
          filter: "blur(1px)",
        }}
        animate={{
          top: ["-5%", "105%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Grid effect - more visible */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(96, 165, 250, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96, 165, 250, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 10%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 10%, transparent 70%)",
        }}
      />

      {/* Animated dots grid */}
      <div className="absolute inset-0">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${(i % 6) * 20 + 10}%`,
              top: `${Math.floor(i / 6) * 25 + 10}%`,
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Radial fade - less aggressive */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.8)_100%)]" />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    </div>
  );
}
