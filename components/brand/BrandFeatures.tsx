"use client";

import { motion } from "framer-motion";

export default function BrandFeatures() {
  const features = [
    {
      id: 1,
      title: "Vetted creators",
      description: "Pre-screened talent with proven track records. No bots, no fake engagement.",
    },
    {
      id: 2,
      title: "Performance tracking",
      description: "Real-time analytics and ROI metrics. Pay for results, not impressions.",
    },
    {
      id: 3,
      title: "Transparent pricing",
      description: "Escrow-based payments. See exactly where your budget goes.",
    },
    {
      id: 4,
      title: "Content ownership",
      description: "Full rights to repurpose creator content across all your channels.",
    },
    {
      id: 5,
      title: "Dedicated support",
      description: "We handle outreach, negotiations, and dispute resolution.",
    },
    {
      id: 6,
      title: "Data insights",
      description: "Detailed analytics on performance, demographics, and conversions.",
    },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight mb-4">
              Everything you need
            </h2>
            <p className="text-base sm:text-lg text-white/40 font-light">
              Built for brands who value quality over quantity
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-slate-950 p-8 hover:bg-white/2 transition-colors group"
              >
                <h3 className="text-lg font-normal text-white mb-2 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
