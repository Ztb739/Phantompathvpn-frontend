import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <>
      <Helmet>
        <title>PhantomPathVPN Ltd | Privacy Policy & Technical Manifesto | Updated: March 30, 2026.</title>
        <meta name="description" content="Privacy Policy for PhantomPathVPN Ltd." />
        <meta name="robots" content="noarchive, max-snippet:50, max-image-preview:none" />
      </Helmet>
      <div className="pt-32 pb-24 px-4 bg-[#0a0a0a] min-h-screen text-gray-300">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#3affc2]">PhantomPathVPN Ltd | Privacy Policy & Technical Manifesto | Updated: April 20, 2026.</h1>
          <p className="text-gray-400 mb-12">PhantomPathVPN Ltd | Company Number: 16958507</p>

          <div className="space-y-8 leading-relaxed bg-[#111] p-8 rounded-2xl border border-white/10">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. RESELLER ROLE</h2>
              <p>PhantomPathVPN Ltd operates as a reseller. We do not directly own or operate the underlying network infrastructure but partner with trusted providers to deliver our privacy-focused services. PhantomPath services are strictly for users aged 18 and over.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. REGULATORY COMPLIANCE</h2>
              <p>We respect user privacy but must comply with UK law. Data may be disclosed only when legally mandated by a valid court order, warrant, or other binding legal directive from authorized UK authorities. SMS Consent and Mobile Data:

PhantomPathVPN does not sell, rent, or share mobile phone numbers or SMS opt-in data with third parties or affiliates for marketing or promotional purposes. All SMS consent data is used solely for service-related communication.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. DATA MINIMISATION & PRIVACY</h2>
              <p className="mb-2">We adhere to a strict data minimization philosophy. The information we collect may include:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Payment Info:</strong> Processed securely via third-party gateways. We do not store full credit card numbers.</li>
                <li><strong>Technical Data:</strong> Minimal technical metrics required to enforce data caps and ensure service health.</li>
                <li><strong>Contact Info:</strong> Email addresses or phone numbers provided voluntarily for customer support. Phone: 0333 313 0127.</li>
              </ul>
              <p>Collected data is used exclusively to provision your service, process payments, provide customer support, and prevent network abuse. We do not sell your personal data to advertisers.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. TECHNICAL MANIFESTO</h2>
              <p>We work with trusted telecommunications partners, including Telnyx and eSIM Go, to provision virtual numbers, messaging services, and data connectivity.</p>
              <p className="mt-4">We do not log, store, or monitor browsing activity, DNS queries, or traffic content. Any automated systems used for security and abuse prevention operate on limited technical metadata and do not inspect personal data content.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. DATA RETENTION & SECURITY</h2>
              <p>Data is retained only as long as necessary to fulfill the purpose for which it was collected or to comply with legal, tax, or regulatory requirements. Technical connection logs are purged every 24 hours unless required for ongoing security or fraud investigation.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. YOUR RIGHTS</h2>
              <p>Under the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018, you have the right to access, rectify, or request the deletion of your personal data. To exercise these rights, please contact our support team at <a href="mailto:support@phantompathvpn.com" className="text-[#3affc2] hover:underline">support@phantompathvpn.com</a> or call 0333 313 0127.</p>
            </section>
          </div>
        </div>
      </div>
    </>;
};
export default PrivacyPolicy;