"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Upload, TrendingUp, Coins } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    id: 1,
    icon: Search,
    title: "Find Campaigns",
    description: "Browse active brand campaigns with clear view targets and payouts",
  },
  {
    id: 2,
    icon: Upload,
    title: "Create & Upload",
    description: "Make your video and post it directly on your own channel",
  },
  {
    id: 3,
    icon: TrendingUp,
    title: "Grow Your Views",
    description: "Promote your content and track progress toward the view target",
  },
  {
    id: 4,
    icon: Coins,
    title: "Get Paid",
    description: "Once you hit the target views, receive payment from the brand",
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-normal text-white mb-4">
            How it works
          </h2>
          
          <p className="text-base text-gray-500 max-w-xl mx-auto font-light tracking-wide">
            Post on your channel, hit targets, earn money
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          
          {/* Animated progress line */}
          <motion.div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500 via-indigo-500 to-violet-500 origin-top"
            style={{
              scaleY: useTransform(scrollYProgress, [0.2, 0.8], [0, 1]),
            }}
          />

          <div className="space-y-20">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className={`flex flex-col md:flex-row items-start md:items-center gap-6 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Content */}
                    <div className={`flex-1 ${isEven ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'} ml-16 md:ml-0`}>
                      <div className={`inline-block ${isEven ? 'md:text-right' : 'md:text-left'} text-left`}>
                        <h3 className="text-2xl md:text-3xl font-light text-white mb-3 tracking-normal">
                          {step.title}
                        </h3>
                        
                        <p className="text-base text-gray-500 font-light leading-relaxed max-w-sm tracking-wide">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Icon - centered on timeline */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center"
                    >
                      <Icon className="w-6 h-6 text-white/70" strokeWidth={1.5} />
                    </motion.div>

                    {/* Spacer for even layout */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
