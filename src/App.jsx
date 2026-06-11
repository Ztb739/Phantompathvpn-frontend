import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Hero from '@/components/Hero.jsx';
import HeroSocialIcons from '@/components/HeroSocialIcons.jsx';
import RestrictedAccess from '@/components/RestrictedAccess.jsx';
import WhyPeopleUseIt from '@/components/WhyPeopleUseIt.jsx';
import Features from '@/components/Features.jsx';
import HowItWorks from '@/components/HowItWorks.jsx';
import Pricing from '@/components/Pricing.jsx';
import TravelPacks from '@/components/TravelPacks.jsx';
import PrivacyPacks from '@/components/PrivacyPacks.jsx';
import UnlimitedPacks from '@/components/UnlimitedPacks.jsx';
import VirtualNumbers from '@/components/VirtualNumbers.jsx';
import WhyChoosePP from '@/components/WhyChoosePP.jsx';
import Footer from '@/components/Footer.jsx';
import CookieBanner from '@/components/CookieBanner.jsx';

import PrivacySecurity from '@/components/PrivacySecurity.jsx';
import WhyChoose from '@/components/WhyChoose.jsx';
import WhoItsFor from '@/components/WhoItsFor.jsx';
import OurPhilosophy from '@/components/OurPhilosophy.jsx';
import FAQ from '@/components/FAQ.jsx';
import ResponsibleUse from '@/components/ResponsibleUse.jsx';

import PrivacyPolicy from '@/pages/PrivacyPolicy.jsx';
import TermsConditions from '@/pages/TermsConditions.jsx';
import TermsOfService from '@/pages/TermsOfService.jsx';
import AcceptableUsePolicy from '@/pages/AcceptableUsePolicy.jsx';
import CustomerCareComplaints from '@/pages/CustomerCareComplaints.jsx';
import RefundPolicy from '@/pages/RefundPolicy.jsx';
import VulnerablePersonsPolicy from '@/pages/VulnerablePersonsPolicy.jsx';
import PricingPage from '@/pages/PricingPage.jsx';
import AICatalogue from '@/pages/AICatalogue.jsx';
import ADRPage from '@/pages/ADRPage.jsx';
import CookiePolicyPage from '@/pages/CookiePolicyPage.jsx';
import PortalPage from '@/pages/PortalPage.jsx';
import AdminGodMode from '@/pages/AdminGodMode';
import SuccessPage from '@/pages/SuccessPage.jsx';

const LandingPage = () => (
  <main>
    <Hero />
    <HeroSocialIcons />
    <RestrictedAccess />
    <WhyPeopleUseIt />
    <Features />
    <HowItWorks />
    <Pricing />
    <TravelPacks />
    <PrivacyPacks />
    <UnlimitedPacks />
    <VirtualNumbers />
    <WhyChoosePP />
    <WhyChoose />
    <WhoItsFor />
    <PrivacySecurity />
    <OurPhilosophy />
    <FAQ />
    <ResponsibleUse />
  </main>
);

function App() {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PhantomPathVPN",
    "url": "https://phantompathvpn.com",
    "logo": "https://phantompathvpn.com/logo.png",
    "sameAs": [
      "https://twitter.com/phantompathvpn",
      "https://github.com/phantompathvpn"
    ]
  };

  const schemaWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PhantomPathVPN",
    "url": "https://phantompathvpn.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://phantompathvpn.com/portal?code={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "hasPart": [
      {
        "@type": "WebPage",
        "name": "PhantomPath Portal",
        "url": "https://phantompathvpn.com/portal",
        "description": "Secure access gateway for PhantomPath services."
      }
    ]
  };

  return (
    <Router>
      <Helmet>
        <title>PhantomPathVPN - Secure eSIM Data & Virtual Numbers</title>
        <meta name="description" content="Stay connected abroad with high-speed eSIM data and optional UK/USA virtual numbers. Privacy-focused, one-time purchases, no subscriptions." />
        <meta name="keywords" content="PhantomPathVPN, pay as you go VPN, on demand VPN, eSIM, virtual numbers, privacy tools, secure connection" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PhantomPathVPN - Secure eSIM Data & Virtual Numbers" />
        <meta property="og:description" content="Stay connected abroad with high-speed eSIM data and optional UK/USA virtual numbers. Privacy-focused, one-time purchases, no subscriptions." />
        <meta property="og:url" content="https://phantompathvpn.com" />
        <meta property="og:site_name" content="PhantomPathVPN" />
        <meta property="og:image" content="https://horizons-cdn.hostinger.com/01d7edfc-89f9-4948-9fde-e2f816a4738a/78bde686ecfc7cbb80360ffe344c5069.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PhantomPathVPN - Secure eSIM Data & Virtual Numbers" />
        <meta name="twitter:description" content="Stay connected abroad with high-speed eSIM data and optional UK/USA virtual numbers. Privacy-focused, one-time purchases, no subscriptions." />
        <meta name="twitter:image" content="https://horizons-cdn.hostinger.com/01d7edfc-89f9-4948-9fde-e2f816a4738a/78bde686ecfc7cbb80360ffe344c5069.png" />

        <script type="application/ld+json">
          {JSON.stringify(schemaOrg)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(schemaWebSite)}
        </script>
      </Helmet>
      <div className="min-h-screen bg-[#050b14] text-white selection:bg-[#2dd4bf] selection:text-[#020617] font-sans flex flex-col">
        <CookieBanner />
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/portal" replace />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/portal" element={<PortalPage />} />
            <Route path="/god-mode" element={<AdminGodMode />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/acceptable-use-policy" element={<AcceptableUsePolicy />} />
            <Route path="/customer-care" element={<CustomerCareComplaints />} />
            <Route path="/complaints" element={<CustomerCareComplaints />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/vulnerable-persons-policy" element={<VulnerablePersonsPolicy />} />
            <Route path="/adr" element={<ADRPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/ai-catalogue" element={<AICatalogue />} />
          </Routes>
        </div>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;