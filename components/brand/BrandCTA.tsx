"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function BrandCTA() {
  return (
    <section className="relative w-full py-32 sm:py-40 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="w-full max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
            Ready to start?
          </h2>
          
          <p className="text-base sm:text-lg text-white/40 max-w-xl mx-auto font-light">
            Join brands leveraging creator content for measurable growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <a
              href="https://cal.com/shadan/qaslylabs"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white text-slate-950 font-normal hover:bg-white/90 transition-all text-sm text-center"
            >
              Schedule a call
            </a>
            
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all font-light text-sm text-center"
            >
              View creator portal
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
