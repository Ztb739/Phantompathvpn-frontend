import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
const VulnerablePersonsPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <>
      <Helmet>
        <title>PhantomPathVPN Ltd | Vulnerable Persons Policy</title>
        <meta name="description" content="Vulnerable Persons Policy for PhantomPathVPN Ltd." />
      </Helmet>
      <div className="pt-32 pb-24 px-4 bg-[#0a0a0a] min-h-screen text-gray-300">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#3affc2]">PhantomPathVPN Ltd | Vulnerable Persons Policy</h1>
          <p className="text-gray-400 mb-12">PhantomPathVPN Ltd | Company Number: 16958507</p>

          <div className="space-y-8 leading-relaxed bg-[#111] p-8 rounded-2xl border border-white/10">
            <section>
              <p className="mb-6">
                PhantomPathVPN Ltd is committed to treating all customers fairly and providing additional support to those who may be vulnerable. Vulnerability can be temporary or permanent due to health conditions, cognitive impairments, financial hardship, or communication difficulties. Our service is strictly for adults aged 18 and over.
              </p>
              <p className="mb-4">Our commitments to safeguarding vulnerable individuals:</p>
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  <strong>Clarity:</strong> We provide clear, simple explanations of our service and pricing.
                </li>
                <li>
                  <strong>Patience:</strong> We allow additional time for decision-making and offer alternative communication methods.
                </li>
                <li>
                  <strong>Safeguarding:</strong> Our service is strictly for adults aged 18 and over, and it is not designed to encourage addictive or compulsive usage patterns.
                </li>
                <li>
                  <strong>Financial Protection:</strong> Our pay-as-you-go model naturally limits potential overspending without automatic renewals.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">Contacting Us for Support</h2>
              <p>
                If you are a vulnerable person or are concerned about a vulnerable person using our service, please contact our Customer Care team at <a href="mailto:support@phantompathvpn.com" className="text-[#3affc2] hover:underline">support@phantompathvpn.com</a> or call 0333 313 0127. All communications will be treated with the utmost confidentiality and sensitivity.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>;
};
export default VulnerablePersonsPolicy;