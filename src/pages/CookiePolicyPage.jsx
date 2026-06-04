import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
const CookiePolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <>
      <Helmet>
        <title>Cookie Policy - PhantomPathVPN Ltd</title>
        <meta name="description" content="Cookie Policy for PhantomPathVPN Ltd." />
      </Helmet>
      <div className="pt-32 pb-24 px-4 bg-[#0a0a0a] min-h-screen text-gray-300">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#3affc2]">Cookie Policy</h1>
          <p className="text-gray-400 mb-12">PhantomPathVPN Ltd | Company Number: 16958507</p>

          <div className="space-y-8 leading-relaxed bg-[#111] p-8 rounded-2xl border border-white/10">
            <section>
              <p className="text-lg">
                PhantomPathVPN Ltd uses cookies to ensure the proper functioning of our website and to improve user experience. ​Compliance & Minors: PhantomPath services are strictly for users aged 18 and over. In accordance with our data minimisation philosophy, we do not use cookies or any tracking technologies for the purpose of identifying, profiling, or monitoring minors.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Essential Cookies:</h2>
              <p>
                Required for the website to function.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Analytics Cookies:</h2>
              <p>
                Optional cookies used to improve performance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Preference Cookies:</h2>
              <p>
                Store user choices such as language or display settings.
              </p>
            </section>
            
            <section>
              <p className="font-medium text-white p-4 bg-[#1e293b]/50 rounded-lg border-l-4 border-[#3affc2]">
                Users may accept or reject non‑essential cookies via the cookie banner or browser settings.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>;
};
export default CookiePolicyPage;