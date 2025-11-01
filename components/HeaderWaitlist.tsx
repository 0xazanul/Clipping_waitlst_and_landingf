"use client";

import { useRealtimeWaitlist } from "@/hooks/useRealtimeWaitlist";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import posthog from "@/lib/instrumentation-client";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { RainbowButton } from "@/components/ui/rainbow-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const [open, setOpen] = useState(false);
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
          setOpen(false);
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

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <RainbowButton className="px-6 sm:px-8 md:px-10 h-8 sm:h-9">
                Join Waitlist
              </RainbowButton>
            </DialogTrigger>
            
            <DialogContent className="w-full max-w-lg bg-slate-900/40 border border-white/20 p-0 overflow-hidden backdrop-blur-2xl shadow-2xl">
              <div className="relative">
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
                
                {/* Content */}
                <div className="relative p-8 sm:p-10">
                  <DialogHeader className="space-y-3">
                    <DialogTitle className="text-white text-3xl font-light tracking-tight">
                      Join the waitlist
                    </DialogTitle>
                    <DialogDescription className="text-gray-400 text-base font-light leading-relaxed">
                      Get early access and exclusive updates when we launch.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                    {/* Email Input */}
                    <div className="relative group">
                      <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:border-white/20 group-focus-within:border-white/30 transition-all duration-300">
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="
                            w-full h-14 px-5
                            bg-transparent
                            text-white placeholder:text-gray-500
                            text-base font-normal antialiased
                            rounded-2xl
                            focus:outline-none
                            disabled:opacity-50 disabled:cursor-not-allowed
                            transition-all duration-300
                          "
                          placeholder="Enter your email address"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    {/* Success/Error Messages */}
                    {submitMessage && (
                      <div className={`
                        px-5 py-4 rounded-2xl text-sm font-medium
                        backdrop-blur-xl border
                        ${submitMessage.includes('Successfully') 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}
                        animate-in fade-in slide-in-from-top-3 duration-500
                      `}>
                        {submitMessage}
                      </div>
                    )}

                    {/* Submit Button */}
                    <RainbowButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 text-base font-medium tracking-wide"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Joining waitlist...</span>
                        </div>
                      ) : (
                        <span>Join now →</span>
                      )}
                    </RainbowButton>
                  </form>
                  
                  {/* Footer Note */}
                  <p className="mt-6 text-center text-xs text-gray-500 font-light">
                    We'll never share your email with anyone else.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

            <AvatarCircles 
              avatarUrls={avatarUrls}
              className="justify-center"
            />
          </div>
        </div>
      </div>
  );
}
