import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const ADRPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <Helmet>
        <title>PhantomPathVPN Ltd | Alternative Dispute Resolution</title>
        <meta name="description" content="Alternative Dispute Resolution details for PhantomPathVPN Ltd." />
      </Helmet>
      <div className="pt-32 pb-24 px-4 bg-[#0a0a0a] min-h-screen text-gray-300">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#3affc2]">PhantomPathVPN Ltd | Alternative Dispute Resolution</h1>
          <p className="text-gray-400 mb-12">PhantomPathVPN Ltd | Company Number: 16958507</p>

          <div className="space-y-8 leading-relaxed bg-[#111] p-8 rounded-2xl border border-white/10">
            <section>
              <p className="mb-6">
                PhantomPathVPN Ltd is committed to resolving complaints fairly. If you are not satisfied with the outcome of your complaint, you may escalate your case to our independent Alternative Dispute Resolution (ADR) provider.
              </p>
              <p className="mb-4">In accordance with April 2026 Ofcom regulations, you can escalate your complaint to our independent ADR provider if:</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Your complaint is not resolved within 6 weeks of being lodged.</li>
                <li>We send you a "Deadlock Letter" before 6 weeks have passed.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Our ADR Provider: CISAS</h2>
              <p className="mb-4">
                PhantomPathVPN Ltd is a registered member of CISAS. ADR is free for consumers and provides an independent review of unresolved complaints.
              </p>
              <p className="mb-6 text-[#3affc2]">
                You may submit your complaint directly via CISAS at: <a href="https://www.cisas.org.uk" target="_blank" rel="noopener noreferrer" className="hover:underline">https://www.cisas.org.uk</a>
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-2">Contact Us</h2>
              <p className="text-[#3affc2] font-medium">
                Email: support@phantompathvpn.com | Phone: 0333 313 0127
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ADRPage;