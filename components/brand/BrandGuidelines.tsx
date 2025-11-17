"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function BrandGuidelines() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const assets = [
    {
      id: 1,
      title: "Logo package",
      description: "SVG, PNG formats in all variations",
      link: "https://drive.google.com/your-logo-package",
      type: "Download",
    },
    {
      id: 2,
      title: "Brand colors",
      description: "Hex codes and color palette",
      link: "https://drive.google.com/your-brand-colors",
      type: "Download",
    },
    {
      id: 3,
      title: "Product images",
      description: "High-res product photography",
      link: "https://drive.google.com/your-product-images",
      type: "Download",
    },
    {
      id: 4,
      title: "Brand guidelines",
      description: "Complete brand style guide PDF",
      link: "https://drive.google.com/your-brand-guidelines",
      type: "Download",
    },
  ];

  const copyToClipboard = (link: string, index: number) => {
    navigator.clipboard.writeText(link);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight mb-4">
              Brand assets
            </h2>
            <p className="text-base sm:text-lg text-white/40 font-light">
              Everything creators need to represent your brand accurately
            </p>
          </div>

          <div className="space-y-3">
            {assets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center justify-between p-5 border border-white/10 rounded-lg hover:border-white/20 hover:bg-white/2 transition-all group"
              >
                <div className="flex-1">
                  <h3 className="text-base font-normal text-white mb-1">
                    {asset.title}
                  </h3>
                  <p className="text-sm text-white/40">
                    {asset.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(asset.link, index)}
                    className="px-4 py-2 text-xs text-white/60 hover:text-white border border-white/10 hover:border-white/20 rounded-md transition-all"
                  >
                    {copiedIndex === index ? "Copied!" : "Copy link"}
                  </button>
                  <a
                    href={asset.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-xs text-white bg-white/5 hover:bg-white/10 rounded-md transition-all"
                  >
                    {asset.type}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-6 border border-white/10 rounded-lg bg-white/2">
            <h3 className="text-sm font-normal text-white mb-3">
              Need custom assets?
            </h3>
            <p className="text-sm text-white/40 mb-4 leading-relaxed">
              If you need specific formats, sizes, or have special requests for your campaign assets, our team is here to help.
            </p>
            <a
              href="mailto:shadankhantech@gmail.com?subject=Custom%20Brand%20Assets"
              className="inline-block px-5 py-2.5 text-sm text-white border border-white/20 hover:bg-white/5 rounded-lg transition-all"
            >
              Request custom assets
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
