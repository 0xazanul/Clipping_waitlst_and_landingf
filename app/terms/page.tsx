import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-blue-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link 
          href="/" 
          className="inline-block mb-8 text-gray-400 hover:text-white transition-colors font-light"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-light tracking-normal mb-8">Terms of Service</h1>
        
        <div className="space-y-8 text-gray-300 font-light tracking-wide leading-relaxed">
          <section>
            <h2 className="text-2xl font-light text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using The Clipping Company platform, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily use The Clipping Company platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">3. Creator Obligations</h2>
            <p>
              As a creator on our platform, you agree to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
              <li>Post content on your own social media channels as agreed with brands</li>
              <li>Meet the view targets set by brands within the agreed timeframe</li>
              <li>Maintain authenticity and comply with platform advertising guidelines</li>
              <li>Not engage in fraudulent view generation or manipulation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">4. Payment Terms</h2>
            <p>
              Payments are processed after you successfully meet the view targets set by brands. Payment timelines and methods will be communicated separately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">5. Content Guidelines</h2>
            <p>
              All content must comply with applicable laws and platform policies. We reserve the right to remove any content that violates these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">6. Limitation of Liability</h2>
            <p>
              The Clipping Company shall not be liable for any damages arising from the use or inability to use the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">7. Changes to Terms</h2>
            <p>
              We reserve the right to revise these terms at any time. Continued use of the platform constitutes acceptance of revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">8. Contact</h2>
            <p>
              If you have any questions about these Terms, please contact us through our platform.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-sm text-gray-500">
          Last updated: October 27, 2025
        </div>
      </div>
    </div>
  );
}
