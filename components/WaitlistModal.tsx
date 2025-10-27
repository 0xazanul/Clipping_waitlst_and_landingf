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
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
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
      const supabase = getSupabase();
      if (!supabase) {
        toast.error("Database connection not available");
        return;
      }

      const { error } = await supabase.from("waitlist").insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          portfolio: formData.portfolio.trim(),
          description: formData.description.trim() || null,
        },
      ]);

      if (error) {
        // Check for unique constraint violation (duplicate email)
        if (error.code === "23505") {
          toast.error("This email is already on the waitlist!");
        } else {
          console.error("Supabase error:", error);
          toast.error("Something went wrong. Please try again.");
        }
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
      <DialogContent className="bg-black/95 backdrop-blur-xl border border-white/10 text-white sm:max-w-md">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center justify-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                className="relative mb-6"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="absolute inset-0 bg-white/10 rounded-full blur-2xl"
                />
                <div className="relative w-20 h-20 rounded-full bg-white/5 border border-white/20 flex items-center justify-center">
                  <motion.div
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                  >
                    <Check className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-2xl font-light tracking-normal text-white mb-2"
              >
                You're In
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="text-gray-400 text-sm font-light tracking-wide text-center"
              >
                We'll be in touch soon
              </motion.p>
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
                <DialogTitle className="text-2xl font-light tracking-normal text-white">
                  Join the Waitlist
                </DialogTitle>
                <DialogDescription className="text-gray-500 text-sm font-light tracking-wide">
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
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-white/20 focus:ring-0 h-11 tracking-wide"
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
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-white/20 focus:ring-0 h-11 tracking-wide"
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
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-white/20 focus:ring-0 h-11 tracking-wide"
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
                    className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-white/20 focus:ring-0 px-3 py-2 tracking-wide resize-none"
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
