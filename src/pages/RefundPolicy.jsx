import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const RefundPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>PhantomPathVPN Ltd | Refund Policy</title>
        <meta name="description" content="Refund Policy for PhantomPathVPN Ltd." />
      </Helmet>
      <div className="pt-32 pb-24 px-4 bg-[#0a0a0a] min-h-screen text-gray-300">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#3affc2]">PhantomPathVPN Ltd | Refund Policy</h1>
          <p className="text-gray-400 mb-12">PhantomPathVPN Ltd | Company Number: 16958507</p>

          <div className="space-y-8 leading-relaxed bg-[#111] p-8 rounded-2xl border border-white/10">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. OVERVIEW</h2>
              <p className="mb-4">
                Refunds are available within 14 days of purchase for unused services, subject to our Terms & Conditions. 
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. DIGITAL SERVICES & COOLING-OFF</h2>
              <p className="mb-4">
                Please note that due to the instant-access nature of our services, digital services that have been activated immediately upon purchase cannot be refunded under the Consumer Contracts Regulations. By completing your purchase, you consent to immediate provision of the service and waive your right to cancel.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. ELIGIBLE SCENARIOS</h2>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Technical service failure on our end preventing you from using the service.</li>
                <li>Duplicate payments processed in error.</li>
                <li>The service has not yet been activated or used (within 14 days).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. PROCESSING</h2>
              <p className="mb-4">
                Approved refunds are typically processed and returned to the original payment method within 5 working days.
              </p>
              <p>
                To request a refund, please contact our support team with your order details and reason for the request at <a href="mailto:support@phantompathvpn.com" className="text-[#3affc2] hover:underline">support@phantompathvpn.com</a> or call 0333 313 0127.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefundPolicy;