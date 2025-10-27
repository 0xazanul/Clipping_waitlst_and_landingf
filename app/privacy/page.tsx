import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-blue-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link 
          href="/" 
          className="inline-block mb-8 text-gray-400 hover:text-white transition-colors font-light"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-light tracking-normal mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-gray-300 font-light tracking-wide leading-relaxed">
          <section>
            <h2 className="text-2xl font-light text-white mb-4">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
              <li>Name and email address</li>
              <li>Portfolio links and social media profiles</li>
              <li>Payment information for creator payouts</li>
              <li>Content and campaign performance data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Connect creators with brand campaigns</li>
              <li>Monitor and analyze trends and usage</li>
              <li>Send technical notices and support messages</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">3. Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
              <li>Brands when you participate in their campaigns</li>
              <li>Service providers who assist our operations</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">5. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
              <li>Access and receive a copy of your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">6. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our platform and hold certain information to improve your experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">7. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">8. Children's Privacy</h2>
            <p>
              Our service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">9. Changes to Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through our platform.
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
