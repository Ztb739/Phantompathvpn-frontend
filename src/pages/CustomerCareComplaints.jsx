import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const CustomerCareComplaints = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>PhantomPathVPN Ltd | Customer Care & Complaints</title>
        <meta name="description" content="Submit a complaint to PhantomPathVPN Ltd. We aim to resolve all complaints fairly." />
      </Helmet>
      <div className="pt-32 pb-24 px-4 bg-[#0a0a0a] min-h-screen text-gray-300">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#3affc2]">PhantomPathVPN Ltd | Customer Care & Complaints</h1>
          <p className="text-gray-400 mb-12">PhantomPathVPN Ltd | Company Number: 16958507</p>

          <div className="space-y-8 leading-relaxed bg-[#111] p-8 rounded-2xl border border-white/10">
            <section>
              <p className="mb-6">
                At PhantomPathVPN Ltd, we aim to provide excellent service. However, if something goes wrong, we want to know so we can fix it. Please follow our 3-step complaints procedure below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">STEP 1: Contact Support</h2>
              <p className="mb-4">First, get in touch with our Customer Care team. We aim to resolve most issues on the first contact.</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Email: <a href="mailto:support@phantompathvpn.com" className="text-[#3affc2] hover:underline">support@phantompathvpn.com</a></li>
                <li>Phone: <span className="text-[#3affc2]">0333 313 0127</span></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">STEP 2: Formal Escalation</h2>
              <p className="mb-4">
                If the front-line team cannot resolve your issue, it will be escalated to a manager. We will provide a formal response within 14 days. If we cannot reach an agreement, we may issue a "Deadlock Letter".
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">STEP 3: Alternative Dispute Resolution (ADR)</h2>
              <p className="mb-4">
                If your complaint remains unresolved after 6 weeks, or if you receive a Deadlock Letter, you may escalate the issue to our independent ADR provider, CISAS, for free independent review.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerCareComplaints;