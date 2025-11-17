"use client";

import { motion } from "framer-motion";

export default function BrandHowItWorks() {
  const steps = [
    {
      id: 1,
      number: "01",
      title: "Share your brief",
      description: "Tell us about your product, target audience, and campaign goals. Define your brand guidelines and budget.",
    },
    {
      id: 2,
      number: "02",
      title: "We match creators",
      description: "Our team identifies vetted creators whose audience aligns with your target market and brand values.",
    },
    {
      id: 3,
      number: "03",
      title: "Review & approve",
      description: "Preview creator proposals and content drafts. Approve creators and provide feedback before they publish.",
    },
    {
      id: 4,
      number: "04",
      title: "Track performance",
      description: "Monitor real-time metrics, engagement rates, and conversions. Get detailed analytics and ROI reports.",
    },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight mb-4">
              How it works
            </h2>
            <p className="text-base sm:text-lg text-white/40 font-light">
              From brief to results in four simple steps
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="mb-4">
                  <span className="text-5xl font-light text-white/10">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-normal text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {step.description}
                </p>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-3 w-6 h-px bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
