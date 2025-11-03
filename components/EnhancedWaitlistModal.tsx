"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface EnhancedWaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnhancedWaitlistModal({ isOpen, onClose }: EnhancedWaitlistModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    socialMediaLinks: [""],
    about: "",
    portfolioLink: "",
    followerCount: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.paddingRight = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (typeof window !== 'undefined' && (window as any).posthog) {
        (window as any).posthog.capture('waitlist_form_submitted', {
          has_social: formData.socialMediaLinks.filter(link => link.trim()).length > 0,
          social_count: formData.socialMediaLinks.filter(link => link.trim()).length,
          has_portfolio: !!formData.portfolioLink,
          has_about: !!formData.about,
        });
      }

      if (!supabase) {
        setError("Service unavailable. Please try again later.");
        setIsSubmitting(false);
        return;
      }

      const socialMediaLinksString = formData.socialMediaLinks
        .filter(link => link.trim())
        .join(', ');

      const { error: supabaseError } = await supabase
        .from("waitlist")
        .insert([
          {
            email: formData.email,
            name: formData.name,
            social_media_link: socialMediaLinksString || null,
            about: formData.about || null,
            portfolio_link: formData.portfolioLink || null,
            follower_count: formData.followerCount || null,
          },
        ]);

      if (supabaseError) {
        if (supabaseError.code === '23505') {
          setError("This email is already on the waitlist!");
        } else {
          setError("Something went wrong. Please try again.");
        }
        setIsSubmitting(false);
        return;
      }

      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        socialMediaLinks: [""],
        about: "",
        portfolioLink: "",
        followerCount: "",
      });

      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2500);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSocialMediaChange = (index: number, value: string) => {
    const newLinks = [...formData.socialMediaLinks];
    newLinks[index] = value;
    setFormData(prev => ({
      ...prev,
      socialMediaLinks: newLinks,
    }));
  };

  const addSocialMediaField = () => {
    if (formData.socialMediaLinks.length < 3) {
      setFormData(prev => ({
        ...prev,
        socialMediaLinks: [...prev.socialMediaLinks, ""],
      }));
    }
  };

  const removeSocialMediaField = (index: number) => {
    if (formData.socialMediaLinks.length > 1) {
      const newLinks = formData.socialMediaLinks.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        socialMediaLinks: newLinks,
      }));
    }
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const preventScroll = (e: React.WheelEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onWheel={preventScroll}
      onTouchMove={preventScroll}
    >
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={handleBackdropClick}
      />
      
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-zinc-950 rounded-lg border border-zinc-800 shadow-2xl">
        {!showSuccess ? (
          <>
            <div className="flex items-start justify-between p-5 border-b border-zinc-800">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold text-white">Join Waitlist</h2>
                <p className="text-sm text-zinc-400 mt-0.5">Get early access when we launch</p>
              </div>
              <button
                onClick={onClose}
                className="ml-4 text-zinc-400 hover:text-white transition-colors flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="space-y-2 text-left">
                <label className="block text-sm font-medium text-zinc-200 text-left">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-white text-left placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700"
                />
              </div>

              <div className="space-y-2 text-left">
                <label className="block text-sm font-medium text-zinc-200 text-left">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-white text-left placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700"
                />
              </div>

              <div className="space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-zinc-200 text-left">Social Media</label>
                  {formData.socialMediaLinks.length < 3 && (
                    <button
                      type="button"
                      onClick={addSocialMediaField}
                      className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add more
                    </button>
                  )}
                </div>
                {formData.socialMediaLinks.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => handleSocialMediaChange(index, e.target.value)}
                      placeholder="https://twitter.com/yourhandle"
                      className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-white text-left placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700"
                    />
                    {formData.socialMediaLinks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSocialMediaField(index)}
                        className="px-2 text-zinc-400 hover:text-red-400 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-left">
                <label className="block text-sm font-medium text-zinc-200 text-left">Portfolio</label>
                <input
                  type="url"
                  name="portfolioLink"
                  value={formData.portfolioLink}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-white text-left placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700"
                />
              </div>

              <div className="space-y-2 text-left">
                <label className="block text-sm font-medium text-zinc-200 text-left">Follower Count</label>
                <input
                  type="number"
                  name="followerCount"
                  value={formData.followerCount}
                  onChange={handleChange}
                  placeholder="1000"
                  min="0"
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-white text-left placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700"
                />
              </div>

              <div className="space-y-2 text-left">
                <label className="block text-sm font-medium text-zinc-200 text-left">About</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  rows={3}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-white text-left placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 resize-none"
                />
              </div>

              {error && (
                <div className="bg-red-950/50 border border-red-900/50 rounded-md p-3">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white hover:bg-zinc-100 text-black font-medium py-2.5 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isSubmitting ? "Joining..." : "Join Waitlist"}
              </button>
            </form>
          </>
        ) : (
          <div className="p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">You're on the list!</h3>
            <p className="text-sm text-zinc-400">We'll notify you when we launch.</p>
          </div>
        )}
      </div>
    </div>
  );
}
