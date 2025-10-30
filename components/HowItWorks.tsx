"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Upload, TrendingUp, Coins } from "lucide-react";
import { useRef, memo } from "react";

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

function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="relative py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6 md:px-8 overflow-hidden mt-48 sm:mt-56 md:mt-64 lg:mt-72">
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20 md:mb-24"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-tight text-white mb-3 sm:mb-4">
            How it works
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-400/90 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
            Post on your channel, hit targets, earn money
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-indigo-500 to-violet-500 origin-top"
            style={{
              scaleY: useTransform(scrollYProgress, [0.2, 0.8], [0, 1]),
            }}
          />

          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isEven ? -16 : 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px", amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <div className={`flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} ml-16 md:ml-0`}>
                      <div className={`inline-block ${isEven ? 'md:text-right' : 'md:text-left'} text-left`}>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-2 sm:mb-3 tracking-tight">
                          {step.title}
                        </h3>
                        
                        <p className="text-base sm:text-lg md:text-xl text-gray-400/90 font-light leading-relaxed max-w-md tracking-wide">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-b from-white/10 to-white/5 border border-white/20 flex items-center justify-center rounded-xl transition-all duration-300 hover:bg-white/15 hover:border-white/30 shadow-lg"
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white/80" strokeWidth={1.5} />
                    </motion.div>

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

export default memo(HowItWorks);
