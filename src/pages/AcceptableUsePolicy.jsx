import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
const AcceptableUsePolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <>
      <Helmet>
        <title>PhantomPathVPN Ltd | Acceptable Use Policy</title>
        <meta name="description" content="Acceptable Use Policy for PhantomPathVPN Ltd." />
      </Helmet>
      <div className="pt-32 pb-24 px-4 bg-[#0a0a0a] min-h-screen text-gray-300">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#3affc2]">PhantomPathVPN Ltd | Acceptable Use Policy</h1>
          <p className="text-gray-400 mb-12">PhantomPathVPN Ltd | Company Number: 16958507</p>

          <div className="space-y-8 leading-relaxed bg-[#111] p-8 rounded-2xl border border-white/10">
            <section>
              <p className="mb-4">This Acceptable Use Policy outlines the rules regarding the use of our services. Violation of this AUP will result in immediate suspension or termination of services without a refund. We reserve the right to report egregious violations to law enforcement agencies and take appropriate action to protect our network.</p>
              <p className="mb-4">If you need to report abuse, please contact <a href="mailto:support@phantompathvpn.com" className="text-[#3affc2] hover:underline">support@phantompathvpn.com</a> or call 0333 313 0127.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. ILLEGAL ACTIVITY</h2>
              <p>Any activity that violates UK law or the laws of the jurisdiction in which you reside is strictly prohibited. This includes distribution of illegal material, intellectual property violations, and facilitation of illicit commerce. Usage by individuals under the age of 18 is strictly prohibited.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. FRAUD & OTP ABUSE</h2>
              <p>Engaging in financial or identity fraud, creating accounts en masse, or deliberately subverting identity verification platforms is forbidden. Abusing SMS/Voice systems for bulk OTP generation or bypassing limits will result in an immediate ban.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. SCAMS & SPAM</h2>
              <p>Distributing unsolicited messages, phishing, operating scams, or stalking, threatening, or harassing others is not tolerated. We and our partners use automated systems to detect abuse patterns without inspecting personal content.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. NETWORK ABUSE</h2>
              <p>Activities that degrade network performance, such as denial-of-service (DoS) attacks, malware distribution, network scanning, probing, or exploiting vulnerabilities in third-party systems are forbidden.</p>
            </section>
          </div>
        </div>
      </div>
    </>;
};
export default AcceptableUsePolicy;