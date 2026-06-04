import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <>
      <Helmet>
        <title>Terms & Conditions - PhantomPathVPN Ltd</title>
        <meta name="description" content="Terms and Conditions for PhantomPathVPN Ltd." />
      </Helmet>
      <div className="pt-32 pb-24 px-4 bg-[#0a0a0a] min-h-screen text-gray-300">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#3affc2]">Terms & Conditions</h1>
          <p className="text-gray-400 mb-12">PhantomPathVPN Ltd | Company Number: 16958507</p>

          <div className="space-y-8 leading-relaxed bg-[#111] p-8 rounded-2xl border border-white/10">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p className="mb-4">
                By accessing or using the PhantomPathVPN website and services, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Services Provided</h2>
              <p className="mb-4">
                PhantomPathVPN Ltd provides privacy, security, and connectivity services (including VPN and virtual numbers) under UK law. All services are provided on a pay-as-you-go basis without auto-renewal.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. User Obligations</h2>
              <p className="mb-4">
                By using our services, you agree to comply with all applicable local, national, and international laws, as well as our Acceptable Use Policy. You are responsible for all activity that occurs under your assigned access credentials. You must be at least 18 years of age to purchase or use PhantomPath services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Disclaimers and Limitation of Liability</h2>
              <p className="mb-4">
                Services are provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. PhantomPathVPN Ltd is not liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Governing Law</h2>
              <p className="mb-4">
                These terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the English courts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Contact Information</h2>
              <p>
                For full terms or any inquiries, please contact our support team at <a href="mailto:support@phantompathvpn.com" className="text-[#3affc2] hover:underline">support@phantompathvpn.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>;
};
export default TermsConditions;