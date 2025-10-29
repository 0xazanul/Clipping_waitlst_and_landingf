"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { isSupabaseConfigured, addToWaitlist } from "@/lib/supabase";
import { toast } from "sonner";
import { Check } from "lucide-react";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolio: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.portfolio.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      toast.error("Supabase is not configured. Please add your credentials to .env.local", {
        duration: 5000,
      });
      console.error(
        "Supabase not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Use secure RPC function with server-side validation and rate limiting
      const result = await addToWaitlist(
        formData.name.trim(),
        formData.email.trim(),
        formData.portfolio.trim(),
        formData.description.trim() || undefined
      );

      if (!result.success) {
        toast.error(result.error || "Failed to join waitlist");
        return;
      }

      // Success - Show success animation without toast
      setIsSuccess(true);

      // Reset form and close modal
      setFormData({ name: "", email: "", portfolio: "", description: "" });
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2500);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to join waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-b from-black via-slate-950 to-blue-950/50 backdrop-blur-xl border border-white/20 text-white sm:max-w-md max-w-[95vw] mx-4">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center py-12 md:py-16"
            >
              {/* Animated Check Circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.1, 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20 
                }}
                className="relative mb-8"
              >
                {/* Outer Glow Rings */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ 
                    scale: [0.5, 1.3, 1], 
                    opacity: [0, 0.6, 0] 
                  }}
                  transition={{ 
                    delay: 0.15, 
                    duration: 1.2,
                    times: [0, 0.5, 1],
                    ease: "easeOut"
                  }}
                  className="absolute -inset-6 md:-inset-8 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-2xl"
                />
                
                {/* Inner Circle */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                  className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/30 flex items-center justify-center shadow-2xl backdrop-blur-sm"
                >
                  {/* Checkmark with draw animation */}
                  <motion.svg
                    className="w-10 h-10 md:w-12 md:h-12 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <motion.path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ 
                        delay: 0.4, 
                        duration: 0.6, 
                        ease: [0.16, 1, 0.3, 1] 
                      }}
                    />
                  </motion.svg>
                </motion.div>
              </motion.div>
              
              {/* Success Text */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.6, 
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="text-2xl md:text-3xl font-light tracking-tight text-white mb-3"
              >
                You're All Set!
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.7, 
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="text-gray-400 text-sm md:text-base font-light tracking-wide text-center max-w-xs px-4"
              >
                We'll notify you as soon as we launch
              </motion.p>
              
              {/* Subtle particles effect */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: 0,
                    y: 0
                  }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: Math.cos(i * 60 * Math.PI / 180) * 80,
                    y: Math.sin(i * 60 * Math.PI / 180) * 80
                  }}
                  transition={{ 
                    delay: 0.3 + i * 0.05, 
                    duration: 1.2,
                    ease: "easeOut"
                  }}
                  className="absolute w-1.5 h-1.5 bg-white/60 rounded-full"
                  style={{
                    top: '40%',
                    left: '50%'
                  }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="text-xl md:text-2xl font-light tracking-normal text-white">
                  Join the Waitlist
                </DialogTitle>
                <DialogDescription className="text-gray-500 text-xs md:text-sm font-light tracking-wide">
                  Get early access when we launch
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-400">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 h-11 tracking-wide transition-all"
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-400">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 h-11 tracking-wide transition-all"
                  />
                </div>

                {/* Portfolio Input */}
                <div className="space-y-2">
                  <label htmlFor="portfolio" className="text-sm font-medium text-gray-400">
                    Portfolio Link
                  </label>
                  <Input
                    id="portfolio"
                    name="portfolio"
                    type="text"
                    placeholder="instagram.com/yourhandle"
                    value={formData.portfolio}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 h-11 tracking-wide transition-all"
                  />
                </div>

                {/* Description Input */}
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium text-gray-400">
                    About You <span className="text-gray-600 font-light"></span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Describe anything about yourself"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full bg-white/5 border border-white/20 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 px-3 py-2 tracking-wide resize-none rounded-md transition-all"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-full bg-white text-black hover:bg-white/90 font-medium h-12 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6 relative overflow-hidden"
                >
                  <span className="relative z-10 inline-flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
                      />
                    ) : (
                      "Join Waitlist"
                    )}
                  </span>
                  
                  {!isSubmitting && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
