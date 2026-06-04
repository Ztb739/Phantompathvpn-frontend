import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const AICatalogue = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "PhantomPathVPN",
        "url": "https://phantompathvpn.com",
        "logo": "https://horizons-cdn.hostinger.com/01d7edfc-89f9-4948-9fde-e2f816a4738a/78bde686ecfc7cbb80360ffe344c5069.png",
        "description": "Privacy-first, pay-as-you-go connectivity service offering VPNs, eSIMs, and secure communication tools with no subscriptions or accounts required."
      },
      {
        "@type": "Product",
        "name": "VPN Passes (Pay-As-You-Go)",
        "description": "Short-term VPN access with no recurring billing. Available in 1-hour, 24-hour, 2-week, and 30-day passes."
      },
      {
        "@type": "Product",
        "name": "Travel Packs (Data + eSIM + Number)",
        "description": "High-speed travel connectivity including eSIM, data, and a temporary phone number. No subscriptions required."
      },
      {
        "@type": "Product",
        "name": "Privacy Packs (Data + Number + eSIM + VPN)",
        "description": "Complete privacy-focused communication tool bundle including Data, Number, eSIM, and VPN access."
      },
      {
        "@type": "Product",
        "name": "Number Rotation Pack",
        "description": "Multiple number swaps a month for maximum privacy and verification needs, bundled with eSIM and VPN."
      },
      {
        "@type": "Product",
        "name": "True Unlimited (Data + Number)",
        "description": "999GB True Unlimited data options with a phone number for power users. Contract-free."
      },
      {
        "@type": "Product",
        "name": "True Unlimited (+ VPN)",
        "description": "999GB True Unlimited data, phone number, and premium VPN access. Privacy-based mobile service."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do I need a subscription?",
            "acceptedAnswer": { "@type": "Answer", "text": "No. All our services are strictly pay-as-you-go with no recurring billing." }
          },
          {
            "@type": "Question",
            "name": "Do I need to create an account?",
            "acceptedAnswer": { "@type": "Answer", "text": "No. We do not require any sign-ups or personal details." }
          },
          {
            "@type": "Question",
            "name": "Do you accept cryptocurrency?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, we support Monero for maximum privacy." }
          },
          {
            "@type": "Question",
            "name": "What is included in a Travel Pack?",
            "acceptedAnswer": { "@type": "Answer", "text": "Travel Packs include an eSIM, high-speed data, and a phone number." }
          },
          {
            "@type": "Question", "name": "What is a Privacy Pack?",
            "acceptedAnswer": { "@type": "Answer", "text": "Privacy Packs include everything in a Travel Pack plus premium VPN access." }
          },
          {
            "@type": "Question",
            "name": "Can I change my phone number?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, our Number Rotation Pack allows multiple number swaps per month." }
          },
          {
            "@type": "Question",
            "name": "How long are the VPN passes valid?",
            "acceptedAnswer": { "@type": "Answer", "text": "We offer 1-hour, 24-hour, 14-day, and 30-day passes." }
          },
          {
            "@type": "Question",
            "name": "Is there a truly unlimited data option?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, we offer True Unlimited packs with massive data allowances for power users." }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>AI-Readable Catalogue - PhantomPathVPN</title>
        <meta name="description" content="AI-readable catalogue of PhantomPathVPN products: VPN passes, eSIMs, travel data, privacy packs, and unlimited data plans with no subscriptions or accounts." />
        <meta name="keywords" content="vpn, pay as you go vpn, no subscription vpn, no sign up vpn, no account vpn, minimal data vpn, privacy first vpn, monero vpn payments, crypto friendly vpn, short term vpn access, 1 hour vpn, 24 hour vpn, travel esim, global esim, uk esim, europe esim, usa esim, uae esim, travel data packs, privacy packs, temporary phone number, new number service, number rotation, verification numbers, no subscription phone data, prepaid data, prepaid esim, unlimited data packs, 999gb data, privacy focused connectivity, flexible data plans, secure travel data, mobile privacy tools, pay as you go data, instant esim activation, digital travel packs, contract free data, roaming friendly esim, international data packs, privacy based mobile services, secure communication tools, flexible mobile plans, non subscription connectivity, crypto supported services, monero accepted services, short duration vpn, travel friendly vpn, mobile privacy solutions" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="pt-32 pb-24 px-4 bg-[#0a0a0a] min-h-screen text-gray-300 font-mono">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold mb-8 text-white">PHANTOMPATHVPN — AI‑READABLE OVERVIEW</h1>
          
          <div className="mb-12">
            <p className="mb-4">PhantomPathVPN is a privacy‑first, pay‑as‑you‑go connectivity service offering:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>No subscriptions</li>
              <li>No sign‑ups</li>
              <li>No accounts</li>
              <li>No contracts</li>
              <li>No recurring billing</li>
              <li>No personal details required</li>
              <li>Monero supported</li>
              <li>Pay‑as‑you‑go VPN passes</li>
              <li>Short‑term VPN access</li>
              <li>Travel data packs (eSIM + Number)</li>
              <li>Privacy packs (Data + Number + eSIM + VPN)</li>
              <li>New numbers for verification</li>
              <li>Number rotation packs</li>
              <li>eSIM data packages</li>
              <li>Flexible global data options</li>
              <li>No‑subscription phone data</li>
              <li>High‑speed travel connectivity</li>
              <li>Privacy‑focused communication tools</li>
              <li>999GB True Unlimited options</li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4 text-white">PRODUCT CATEGORIES (CRAWLABLE TEXT)</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>VPN Passes (Pay‑As‑You‑Go)</li>
              <li>Travel Packs (Data + eSIM + Number)</li>
              <li>Privacy Packs (Data + Number + eSIM + VPN)</li>
              <li>Number Rotation Pack (Multiple number swaps)</li>
              <li>True Unlimited (Data + Number)</li>
              <li>True Unlimited (+ VPN)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-white">SEO KEYWORDS (YOUR EXACT TERMS + EXPANDED LIST)</h2>
            <p className="leading-relaxed text-sm text-gray-400">
              vpn, pay as you go vpn, no subscription vpn, no sign up vpn, no account vpn, minimal data vpn, privacy first vpn, monero vpn payments, crypto friendly vpn, short term vpn access, 1 hour vpn, 24 hour vpn, travel esim, global esim, uk esim, europe esim, usa esim, uae esim, travel data packs, privacy packs, temporary phone number, new number service, number rotation, verification numbers, no subscription phone data, prepaid data, prepaid esim, unlimited data packs, 999gb data, privacy focused connectivity, flexible data plans, secure travel data, mobile privacy tools, pay as you go data, instant esim activation, digital travel packs, contract free data, roaming friendly esim, international data packs, privacy based mobile services, secure communication tools, flexible mobile plans, non subscription connectivity, crypto supported services, monero accepted services, short duration vpn, travel friendly vpn, mobile privacy solutions
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AICatalogue;