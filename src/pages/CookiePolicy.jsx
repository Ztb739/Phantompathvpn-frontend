import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const CookiePolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Cookie Policy - PhantomPathVPN Ltd</title>
        <meta name="description" content="Cookie Policy for PhantomPathVPN Ltd." />
      </Helmet>
      <div className="pt-32 pb-24 px-4 bg-[#0a0a0a] min-h-screen text-gray-300">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#3affc2]">Cookie Policy</h1>
          <p className="text-gray-400 mb-12">PhantomPathVPN Ltd | Company Number: 16958507</p>

          <div className="space-y-8 leading-relaxed bg-[#111] p-8 rounded-2xl border border-white/10">
            <p className="text-lg">
              PhantomPathVPN Ltd uses cookies to ensure the proper functioning of our website and to improve user experience. This policy explains what cookies are and how we use them.
            </p>
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Types of Cookies We Use</h2>
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  <strong className="text-[#3affc2]">Essential Cookies:</strong> Required for the website to function properly. These include security, identity verification, and core functionality cookies that cannot be turned off.
                </li>
                <li>
                  <strong className="text-[#3affc2]">Analytics Cookies:</strong> Optional cookies used to collect anonymous information about how visitors use our website, allowing us to improve performance and usability.
                </li>
                <li>
                  <strong className="text-[#3affc2]">Preference Cookies:</strong> Optional cookies used to remember your choices such as language, display settings, or consent preferences.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">User Control Options</h2>
              <p>
                You have the right to choose whether to accept or reject non-essential cookies. Users may accept or reject non‑essential cookies via the cookie banner displayed upon first visiting our website, or by modifying browser settings.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicy;