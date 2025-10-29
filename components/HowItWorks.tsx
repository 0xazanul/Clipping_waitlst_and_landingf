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
    <section ref={containerRef} className="relative py-[clamp(4rem,15vh,8rem)] px-[clamp(1rem,5vw,1.5rem)] overflow-hidden">
      <div className="max-w-[clamp(20rem,90vw,60rem)] mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center mb-[clamp(3rem,12vw,6rem)]"
        >
          <h2 className="text-[clamp(2rem,8vw,3.5rem)] font-light tracking-tight text-white mb-[clamp(0.75rem,2vw,1rem)]">
            How it works
          </h2>
          
          <p className="text-[clamp(0.875rem,2.5vw,1rem)] text-gray-500 max-w-[clamp(18rem,70vw,38rem)] mx-auto font-light tracking-wide leading-relaxed">
            Post on your channel, hit targets, earn money
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[clamp(1.5rem,5vw,3rem)] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          
          {/* Animated progress line */}
          <motion.div
            className="absolute left-[clamp(1.5rem,5vw,3rem)] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500 via-indigo-500 to-violet-500 origin-top"
            style={{
              scaleY: useTransform(scrollYProgress, [0.2, 0.8], [0, 1]),
            }}
          />

          <div className="space-y-[clamp(3rem,10vw,5rem)]">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px", amount: 0.3 }}
                  transition={{ duration: 0.3, delay: index * 0.03, ease: "easeOut" }}
                  className="relative"
                >
                  <div className={`flex flex-col md:flex-row items-start md:items-center gap-[clamp(1rem,4vw,1.5rem)] ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Content */}
                    <div className={`flex-1 ${isEven ? 'md:text-right md:pr-[clamp(2rem,8vw,4rem)]' : 'md:text-left md:pl-[clamp(2rem,8vw,4rem)]'} ml-[clamp(3rem,12vw,4rem)] md:ml-0`}>
                      <div className={`inline-block ${isEven ? 'md:text-right' : 'md:text-left'} text-left`}>
                        <h3 className="text-[clamp(1.5rem,5vw,2rem)] font-light text-white mb-[clamp(0.5rem,2vw,0.75rem)] tracking-tight">
                          {step.title}
                        </h3>
                        
                        <p className="text-[clamp(0.875rem,2.5vw,1rem)] text-gray-500 font-light leading-relaxed max-w-[clamp(16rem,60vw,28rem)] tracking-wide">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Icon - centered on timeline */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-[clamp(1.5rem,5vw,3rem)] md:left-1/2 md:-translate-x-1/2 w-[clamp(2.5rem,8vw,3rem)] h-[clamp(2.5rem,8vw,3rem)] bg-white/5 border border-white/10 flex items-center justify-center rounded-[clamp(0.25rem,1vw,0.5rem)] transition-all duration-300"
                    >
                      <Icon className="w-[clamp(1.25rem,4vw,1.5rem)] h-[clamp(1.25rem,4vw,1.5rem)] text-white/70" strokeWidth={1.5} />
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

export default memo(HowItWorks);
