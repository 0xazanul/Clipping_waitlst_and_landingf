"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function BrandHero() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    window.location.href = `mailto:contact@theclippingcompany.com?subject=Brand%20Partnership%20-%20${encodeURIComponent(email)}&body=Hi,%0A%0AI'm%20interested%20in%20partnering%20with%20The%20Clipping%20Company.%0A%0AEmail:%20${encodeURIComponent(email)}`;
    
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-32 sm:py-40 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-8 sm:space-y-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="text-xs font-light tracking-wider uppercase text-white/60">For Brands</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.1]">
              Partner with creators.
              <br />
              <span className="text-white/40">Drive real results.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
              Access vetted creators who deliver authentic content that converts.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-12">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-all text-sm"
                required
              />
              <button
                type="submit"
                disabled={isSubmitted}
                className="px-8 py-3.5 rounded-lg bg-white text-slate-950 font-normal hover:bg-white/90 transition-all disabled:opacity-50 text-sm whitespace-nowrap"
              >
                {isSubmitted ? "Sent" : "Get access"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
