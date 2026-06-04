import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>PhantomPathVPN Ltd | Terms & Conditions</title>
        <meta name="description" content="Terms of Service for PhantomPathVPN Ltd." />
      </Helmet>
      <div className="pt-32 pb-24 px-4 bg-[#0a0a0a] min-h-screen text-gray-300">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#3affc2]">PhantomPathVPN Ltd | Terms & Conditions</h1>
          <p className="text-gray-400 mb-12">PhantomPathVPN Ltd | Company Number: 16958507</p>

          <div className="space-y-8 leading-relaxed bg-[#111] p-8 rounded-2xl border border-white/10">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. AGREEMENT</h2>
              <p>PhantomPathVPN Ltd acts as a reseller of connectivity services. By accessing or using our services, you agree to be bound by these Terms & Conditions. You agree to use our services strictly for lawful purposes.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. SERVICES</h2>
              <p>We facilitate the provisioning of VPN, eSIM, and data services provided by third-party network operators. To maintain network integrity and comply with legal obligations, our network partners may employ automated abuse monitoring systems to detect volumetric anomalies, spam, or malicious traffic patterns.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. AVAILABILITY</h2>
              <p>Services are provided "as is" and "as available". We do not guarantee uninterrupted or error-free service. We rely on third-party infrastructure and are not liable for external outages.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. PAYMENTS</h2>
              <p>All services are provided on a pay-as-you-go basis. Service activation occurs upon successful payment processing. Prices are subject to change without prior notice, but any active passes will remain valid for their purchased duration.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. LIMITATION OF LIABILITY</h2>
              <p>PhantomPathVPN Ltd disclaims any implied warranties of fitness for a particular purpose. We are not liable for consequential, incidental, or indirect damages arising from the use or inability to use our services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. GOVERNING LAW</h2>
              <p>These Terms of Service are governed by and construed in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
              <p className="mt-4">For questions, contact support at <a href="mailto:support@phantompathvpn.com" className="text-[#3affc2] hover:underline">support@phantompathvpn.com</a> or call 0333 313 0127.</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;