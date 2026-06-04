import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import TravelPacks from '@/components/TravelPacks';
import PrivacyPacks from '@/components/PrivacyPacks';
import UnlimitedPacks from '@/components/UnlimitedPacks';
import VirtualNumbers from '@/components/VirtualNumbers';

const PricingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>PhantomPathVPN Pricing - eSIM Data & Virtual Numbers</title>
        <meta name="description" content="Stay connected abroad with high-speed eSIM data and optional UK/USA virtual numbers. View our flexible, commitment-free pricing plans from PhantomPathVPN." />
        <meta property="og:title" content="PhantomPathVPN Pricing - eSIM Data & Virtual Numbers" />
        <meta property="og:description" content="Stay connected abroad with high-speed eSIM data and optional UK/USA virtual numbers. View our flexible, commitment-free pricing plans from PhantomPathVPN." />
        <meta property="og:site_name" content="PhantomPathVPN" />
      </Helmet>
      
      <main className="pt-20">
        <div className="bg-[#050b14] pt-24 pb-12 px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Complete Access Plans</h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Choose the perfect pack for your needs. No hidden fees, no auto-renewals, just secure and reliable connectivity anywhere you go.
          </p>
        </div>

        <TravelPacks />
        <PrivacyPacks />
        <UnlimitedPacks />
        <VirtualNumbers />
      </main>
    </>
  );
};

export default PricingPage;