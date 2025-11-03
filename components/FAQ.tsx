"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What is The Clipping Company?",
      answer: "The Clipping Company connects creators and brands to make short-form content that drives real results. Creators earn for posting, and brands get authentic reach through trusted voices.",
    },
    {
      question: "How does it work?",
      answer: "Creators pick brand campaigns, post videos on their own channels, and earn based on views and engagement. Brands launch campaigns, set goals, and track performance in real time.",
    },
    {
      question: "Who can join?",
      answer: "Anyone — whether you're a creator wanting to earn from content or a brand looking to grow through community-driven marketing.",
    },
    {
      question: "How do payments work?",
      answer: "All payments are secure and flexible. Creators can get paid through PayPal, Cash App, Zelle, Venmo, or crypto. Brands manage budgets transparently through an integrated dashboard.",
    },
    {
      question: "Which platforms are supported?",
      answer: "We support all major short-form platforms — TikTok, Instagram Reels, YouTube Shorts, Snapchat, Facebook, and X.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
          {/* Left Side - Heading and CTA */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-10">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-purple-500/30" />
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-purple-400/60">
                  The Clipping Company
                </span>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-purple-500/30" />
              </div>
              
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-light text-white/95 tracking-tight leading-[1.1]">
                Frequently asked
                <br />
                questions
              </h2>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
              <h3 className="text-xl sm:text-2xl font-light text-white/90 mb-4">
                Still have a questions?
              </h3>
              <p className="text-sm sm:text-base text-gray-400/90 mb-8 font-light leading-relaxed">
                Can't find the answer to your question? Join our Discord and we'll get back to you as soon as possible!
              </p>
              <a
                href="https://discord.gg/RACEATtXTc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white text-sm sm:text-base font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02]"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Join Discord
              </a>
            </div>
          </div>

          {/* Right Side - FAQ Items */}
          <div className="lg:col-span-3 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/[0.02] border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.03]"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-start justify-between gap-4 text-left group"
                >
                  <span className="text-base sm:text-lg font-light text-white/90 group-hover:text-white transition-colors leading-relaxed">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-6 h-6 flex-shrink-0 text-purple-400/60 transition-transform duration-300 mt-0.5 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 sm:px-8 pb-5 sm:pb-6 pt-0">
                    <p className="text-sm sm:text-base text-gray-400/90 font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
