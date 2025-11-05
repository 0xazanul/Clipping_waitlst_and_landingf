"use client";

import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const steps = [
    {
      id: 1,
      title: "Project funds are deposited into escrow up-front",
      description: "The project must fund the full payout before the campaign goes live.",
    },
    {
      id: 2,
      title: "Creator delivers + provides proof",
      description: "Creators upload their video link and required proof (platform link, watch timestamp screenshots, or analytics CSV). The platform timestamps submission.",
    },
    {
      id: 3,
      title: "Verification window (7 days)",
      description: "The project has 7 days to review the proof and either approve or raise a dispute. If no action, the escrow is auto-released on day 8.",
    },
    {
      id: 4,
      title: "Disputes are handled transparently",
      description: "If a dispute is raised, our team reviews the documented proof and platform data within 72 hours. If unresolved, an independent arbiter (third-party) will decide.",
    },
    {
      id: 5,
      title: "Payouts are verifiable",
      description: "Payout receipts include a transaction ID (if crypto) or a bank/processor ID and are visible on the creator's dashboard.",
    },
    {
      id: 6,
      title: "Refunds & cancellations",
      description: "Campaigns cannot be canceled after posting unless both parties agree or a valid breach is verified by our dispute team.",
    },
  ];

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
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-500/30" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-orange-400/60">
                Trust & Security
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-orange-500/30" />
            </div>
            
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white/95 tracking-tight leading-tight mb-4 sm:mb-5 max-w-3xl">
              Why choose us as a creator?
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
            {steps.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="p-4 sm:p-5 border border-white/[0.06] bg-white/[0.01] rounded-lg hover:border-white/[0.1] transition-colors">
                  <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="text-xs sm:text-sm text-white/50 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
