"use client";

import { motion } from "framer-motion";

export default function PlatformsPayments() {
  const platforms = [
    { name: "TikTok", icon: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" },
    { name: "Shorts", icon: "M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" },
    { name: "Facebook", icon: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" },
    { name: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
    { name: "Snapchat", icon: "M5.829 4.533c-.6 1.344-.363 3.752-.267 5.436-.648.359-1.48-.271-1.951-.271-.49 0-1.075.322-1.167.802-.066.346.089.85 1.201 1.289.43.17 1.453.37 1.69.928.333.784-1.71 4.403-4.918 4.931-.251.041-.43.265-.416.519.056.975 2.242 1.357 3.211 1.507.099.134.179.7.306 1.131.057.193.204.424.582.424.493 0 1.312-.38 2.738-.144 1.398.233 2.712 2.215 5.235 2.215 2.345 0 3.744-1.991 5.09-2.215.779-.129 1.448-.088 2.196.058.515.101.910.24 1.252.24.374 0 .544-.247.608-.464.124-.413.172-.945.281-1.102.915-.151 3.055-.533 3.111-1.481.014-.254-.165-.477-.416-.519-3.154-.52-5.259-4.128-4.918-4.931.236-.557 1.252-.755 1.69-.928.814-.321 1.222-.716 1.213-1.173-.011-.585-.715-.934-1.233-.934-.527 0-1.284.624-1.897.286.096-1.698.332-4.095-.267-5.438-1.135-2.543-3.66-3.829-6.184-3.829-2.508 0-5.014 1.268-6.158 3.833z" },
    { name: "X", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  ];

  const payments = [
    { name: "PayPal", icon: "M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.76-4.852a.971.971 0 0 1 .958-.788h.604c3.776 0 6.724-1.536 7.59-5.981.362-1.857.2-3.402-.805-4.474z" },
    { name: "Venmo", icon: "M21.754 6.522c.554 1.446.789 2.82.789 4.549 0 5.671-4.819 12.326-8.76 12.326-2.314 0-3.674-1.446-3.674-3.322 0-2.892 2.673-12.326 2.673-12.326h4.532s-2.104 8.146-2.104 10.537c0 .697.288 1.158.864 1.158 2.031 0 4.748-4.837 4.748-9.242 0-1.59-.217-2.675-.504-3.609L23.752 5l-2-.478z" },
    { name: "Cash App", icon: "M23.59 3.475a5.1 5.1 0 0 0-3.05-3.05c-1.93-.512-4.62-.512-13.13-.512S-1.147.437-3.076.95a5.1 5.1 0 0 0-3.051 3.05c-.512 1.93-.512 4.62-.512 13.13s0 11.2.512 13.13a5.1 5.1 0 0 0 3.05 3.05c1.93.512 4.62.512 13.13.512s11.2 0 13.13-.512a5.1 5.1 0 0 0 3.051-3.05c.512-1.93.512-4.62.512-13.13s0-11.2-.512-13.13zM8.89 18.932l1.92-3.3h5.88v-3.3l-4.5-.87c-1.86-.36-3.06-1.92-3.06-3.66 0-2.1 1.68-3.78 3.78-3.78h3.06c1.08 0 2.1.42 2.88 1.2l2.22 2.22-2.52 2.52-2.22-2.22h-3.06l4.5.84c1.86.36 3.06 1.92 3.06 3.66v3.78c0 2.1-1.68 3.78-3.78 3.78h-3.06c-1.08 0-2.1-.42-2.88-1.2l-2.22-2.22z" },
    { name: "Zelle", icon: "M19.134 6.685c.326-.87.326-1.087.326-1.413 0-.543-.435-.978-.978-.978h-7.173a.978.978 0 0 0-.978.978v1.413h7.063l-.76 2.065h-6.303v1.195h5.978l-.76 2.065H9.331v1.195h5.435l-.76 2.065H9.331v1.195h3.891l-.76 2.065H9.331v1.195h2.348l-.761 2.065H4.866c-.544 0-.978-.435-.978-.978v-1.413h7.063l.76-2.065H5.735v-1.195h6.412l.76-2.065H5.735v-1.195h7.628l.76-2.065H5.735V9.532h8.845l.76-2.065H5.735V6.262h10.062z" },
    { name: "Bitcoin", icon: "M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z" },
    { name: "Ethereum", icon: "M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" },
  ];

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
      <div className="relative w-full px-4 sm:px-6 lg:px-8 z-10">
        
        <div className="flex flex-col gap-20 sm:gap-24 md:gap-28 lg:gap-32 max-w-5xl mx-auto">
          {/* Platforms Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="flex flex-col items-start mb-8 sm:mb-10 md:mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4 sm:mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs sm:text-sm text-white/40 font-light tracking-[0.15em] uppercase">
                  Platforms we work with
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-[1.3] text-white/90 mb-3 sm:mb-4">
                From TikTok to Instagram Reels,<br />we help you stand out and win<br />on every platform.
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-white/20 to-transparent" />
            </div>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 md:gap-6">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative flex items-center gap-2.5 sm:gap-3 px-0 transition-all duration-300"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300">
                    <svg
                      className="w-4.5 h-4.5 sm:w-5 sm:h-5 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6 fill-white/70 group-hover:fill-white transition-all duration-300"
                      viewBox="0 0 24 24"
                    >
                      <path d={platform.icon} />
                    </svg>
                  </div>
                  <span className="text-white/50 text-sm sm:text-base md:text-lg font-light tracking-wide group-hover:text-white/80 transition-colors duration-300">
                    {platform.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Payment Systems Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative"
          >
            <div className="flex flex-col items-start mb-8 sm:mb-10 md:mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4 sm:mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs sm:text-sm text-white/40 font-light tracking-[0.15em] uppercase">
                  We pay through trusted payment systems
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-[1.3] text-white/90 mb-3 sm:mb-4">
                Your transactions are protected<br />through industry-standard security<br />and reliable payment gateways.
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-white/20 to-transparent" />
            </div>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 md:gap-6">
              {payments.map((payment, index) => (
                <motion.div
                  key={payment.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative flex items-center gap-2.5 sm:gap-3 px-0 transition-all duration-300"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300">
                    <svg
                      className="w-4.5 h-4.5 sm:w-5 sm:h-5 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6 fill-white/70 group-hover:fill-white transition-all duration-300"
                      viewBox="0 0 24 24"
                    >
                      <path d={payment.icon} />
                    </svg>
                  </div>
                  <span className="text-white/50 text-sm sm:text-base md:text-lg font-light tracking-wide group-hover:text-white/80 transition-colors duration-300">
                    {payment.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
