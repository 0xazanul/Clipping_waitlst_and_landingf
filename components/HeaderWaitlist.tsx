"use client";

import { useRealtimeWaitlist } from "@/hooks/useRealtimeWaitlist";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import posthog from "@/lib/instrumentation-client";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { RainbowButton } from "@/components/ui/rainbow-button";

const avatarUrls = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
    profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
    profileUrl: "https://github.com/safethecode",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
    profileUrl: "https://github.com/sanjay-mali",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/89768406",
    profileUrl: "https://github.com/itsarghyadas",
  },
];

export default function HeaderWaitlist() {
  const waitlistCount = useRealtimeWaitlist();
  const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  if (waitlistCount === null || waitlistCount === 0) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !email) return;

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const client = supabase;
      if (!client) {
        setSubmitMessage("Service unavailable");
        setIsSubmitting(false);
        return;
      }

      const { error } = await client
        .from("waitlist")
        .insert([{ email: email.trim().toLowerCase() }]);

      if (error) {
        if (error.code === "23505") {
          setSubmitMessage("Already on the waitlist!");
        } else {
          setSubmitMessage("Error joining. Try again.");
        }
        console.error("Waitlist error:", error);
      } else {
        setSubmitMessage("Successfully joined! 🎉");
        posthog.capture("waitlist_joined", { email: email.trim().toLowerCase() });
        setEmail("");
        setTimeout(() => {
          setShowInput(false);
          setSubmitMessage("");
        }, 2000);
      }
    } catch (err) {
      setSubmitMessage("Error joining. Try again.");
      console.error("Unexpected error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="w-full px-2 sm:px-4">
        <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
          
          <div className="flex items-center flex-wrap justify-center gap-1 sm:gap-1.5 text-center">
            <span className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 font-normal antialiased">
              Join
            </span>
            <span className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg text-orange-400 antialiased">
              {waitlistCount.toLocaleString()}+
            </span>
            <span className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 font-normal antialiased whitespace-nowrap">
              others on the waitlist
            </span>
          </div>

          <div className="relative flex items-center justify-center">
            {!showInput ? (
              <RainbowButton 
                onClick={() => setShowInput(true)}
                className="px-6 sm:px-8 md:px-10 h-8 sm:h-9"
              >
                Join Waitlist
              </RainbowButton>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 w-full max-w-sm">
                <div className="flex items-center gap-2 w-full">
                  <div className="relative flex-1 group">
                    <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-orange-500/50 via-purple-500/50 to-orange-500/50 opacity-75 group-focus-within:opacity-100 transition-opacity duration-300" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      autoFocus
                      required
                      disabled={isSubmitting}
                      className="
                        relative w-full h-8 sm:h-9
                        px-4 sm:px-5
                        bg-black/95 backdrop-blur-xl
                        text-white placeholder:text-gray-500
                        text-xs sm:text-sm font-normal antialiased
                        rounded-full
                        focus:outline-none
                        disabled:opacity-50 disabled:cursor-not-allowed
                        transition-all duration-300
                      "
                    />
                  </div>
                  
                  <RainbowButton
                    type="submit"
                    disabled={isSubmitting}
                    className="h-8 sm:h-9 px-4 sm:px-5 text-xs sm:text-sm shrink-0"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : (
                      "Join →"
                    )}
                  </RainbowButton>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setShowInput(false);
                      setEmail("");
                      setSubmitMessage("");
                    }}
                    className="h-8 sm:h-9 w-8 sm:w-9 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200 shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {submitMessage && (
                  <div className={`
                    px-4 py-2 rounded-full text-xs sm:text-sm font-medium
                    ${submitMessage.includes('Successfully') 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}
                    backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-300
                  `}>
                    {submitMessage}
                  </div>
                )}
              </form>
            )}
          </div>

            <AvatarCircles 
              avatarUrls={avatarUrls}
              className="justify-center"
            />
          </div>
        </div>
      </div>
  );
}
