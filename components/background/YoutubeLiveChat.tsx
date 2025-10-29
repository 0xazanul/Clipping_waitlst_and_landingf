"use client";

import { useEffect, useState } from "react";

interface ChatMessage {
  id: number;
  username: string;
  message: string;
  color: string;
}

const chatMessages = [
  { username: "CryptoKing", message: "🔥 This is amazing!", color: "#3b82f6" },
  { username: "VideoMaster", message: "Wow! 😍 Love this!", color: "#8b5cf6" },
  { username: "ContentCreator", message: "Super nice! 🚀", color: "#ec4899" },
  { username: "StreamerPro", message: "Absolutely lovely! 💜", color: "#06b6d4" },
  { username: "GamerGirl", message: "This is fire! 🔥", color: "#f59e0b" },
  { username: "TechGuru", message: "Good stuff! 👏", color: "#10b981" },
  { username: "DigitalNomad", message: "Amazing work! 🌟", color: "#6366f1" },
  { username: "CreativeMinds", message: "So cool! 😎✨", color: "#14b8a6" },
  { username: "EpicVibes", message: "LEGENDARY! 🏆", color: "#f97316" },
  { username: "ChillWatcher", message: "Loving it! 💖", color: "#a855f7" },
  { username: "ProGamer99", message: "Next level! 🚀", color: "#0ea5e9" },
  { username: "ArtisticSoul", message: "Beautiful! 🎨", color: "#d946ef" },
  { username: "MusicLover", message: "Vibing! 🎵", color: "#84cc16" },
  { username: "TrendSetter", message: "So fresh! 🌊", color: "#22d3ee" },
  { username: "NightOwl", message: "Can't stop watching! 👀", color: "#a78bfa" },
  { username: "DreamChaser", message: "Inspiring! 💪", color: "#fb923c" },
  { username: "PixelPerfect", message: "Quality! 📸", color: "#34d399" },
  { username: "WaveRider", message: "Awesome! 🌊", color: "#60a5fa" },
  { username: "StarGazer", message: "Out of this world! 🌟", color: "#c084fc" },
  { username: "BeatMaker", message: "Sick beats! 🎧", color: "#fbbf24" },
];

export default function YoutubeLiveChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    let messageId = 0;
    
    // Add initial messages
    const initialMessages = chatMessages.slice(0, 6).map((msg, i) => ({
      ...msg,
      id: messageId++,
    }));
    setMessages(initialMessages);

    // Keep adding new messages from bottom
    const interval = setInterval(() => {
      const randomMessage = chatMessages[Math.floor(Math.random() * chatMessages.length)];
      const newMessage = {
        ...randomMessage,
        id: messageId++,
      };

      setMessages(prev => {
        const updated = [newMessage, ...prev];
        // Keep only last 10 messages
        return updated.slice(0, 10);
      });
    }, 2500 + Math.random() * 1500); // Random interval 2.5-4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="pointer-events-none absolute hidden lg:block"
      style={{ 
        top: '50vh',
        left: '50%',
        marginLeft: 'calc(min(92vw, 850px) / 2 + clamp(0.75rem, 1.5vw, 1.5rem))',
        transform: 'translateY(-50%)',
        zIndex: 0,
        width: 'clamp(200px, 18vw, 280px)',
      }}
    >
        <div 
          className="relative bg-black/20 backdrop-blur-sm rounded-lg md:rounded-xl overflow-hidden shadow-2xl border border-white/5 flex flex-col"
          style={{
            height: 'clamp(350px, 50vh, 550px)',
          }}
        >
          <div className="bg-black/40 px-2.5 md:px-4 py-1.5 md:py-2.5 border-b border-white/5 flex-shrink-0">
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="text-white text-[10px] md:text-xs font-medium tracking-wide">Live Chat</span>
              <div className="ml-auto flex items-center gap-1 md:gap-1.5">
                <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-slate-400 text-[8px] md:text-[10px]">LIVE</span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="flex flex-col-reverse gap-0 p-2 md:p-3 h-full overflow-hidden">
              {messages.map((msg, index) => (
                <div
                  key={msg.id}
                  className="animate-slide-in-bottom opacity-0 py-1 md:py-1.5 transition-all duration-300"
                  style={{
                    animation: `slideInBottom 0.4s ease-out forwards`,
                  }}
                >
                  <div className="flex items-start gap-1.5 md:gap-2">
                    <div 
                      className="w-4 h-4 md:w-5 md:h-5 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[8px] md:text-[10px] font-bold"
                      style={{ backgroundColor: msg.color }}
                    >
                      {msg.username[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span 
                        className="font-semibold text-[9px] md:text-[11px] mr-1"
                        style={{ color: msg.color }}
                      >
                        {msg.username}
                      </span>
                      <span className="text-white/90 text-[9px] md:text-[11px] leading-snug">
                        {msg.message}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}
