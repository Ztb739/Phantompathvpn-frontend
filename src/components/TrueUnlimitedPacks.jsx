import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Globe, Phone } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const regions = ['United Kingdom', 'European Union', 'United States', 'UAE'];

const pricing = {
  'United Kingdom': { base: 129.99, vpn: 139.99 },
  'European Union': { base: 139.99, vpn: 149.99 },
  'United States': { base: 149.99, vpn: 159.99 },
  'UAE': { base: 169.99, vpn: 179.99 },
};

const numberCountries = ['UK', 'US'];

const usageOptions = [
  { label: 'No extra usage', price: 0 },
  { label: '+1 hour + 100 SMS – £3.00', price: 3.00 },
  { label: '+2 hours + 200 SMS – £5.00', price: 5.00 },
];

const UnlimitedCard = ({ title, basePrice, isVpn, region, handleBuy }) => {
  const [addNumber, setAddNumber] = useState(false);
  const [numberCountry, setNumberCountry] = useState('UK');
  const [extraUsage, setExtraUsage] = useState(0);
  const [usaConsent, setUsaConsent] = useState(false);
  const [userMobile, setUserMobile] = useState('');

  const numberBasePrice = 6.00;

  const calculateTotal = () => {
    let total = basePrice;
    if (addNumber) {
      total += numberBasePrice;
      total += extraUsage;
    }
    return total.toFixed(2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative flex flex-col p-8 rounded-xl border transition-all duration-300 group overflow-visible ${isVpn
          ? 'bg-[#151515] border-[#3affc2] shadow-[0_4px_40px_rgba(58,255,194,0.15)]'
          : 'bg-[#111] border-white/5 hover:border-white/20 hover:shadow-lg'
        }`}
    >
      <div className="mb-6">
        <h3 className={`font-bold text-2xl mb-2 ${isVpn ? 'text-[#3affc2]' : 'text-white'}`}>
          {title}
        </h3>
        <p className="text-sm text-gray-400 mb-2">{region} • 30-Day Duration</p>
        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-4xl font-bold text-white">£{calculateTotal()}</span>
        </div>

        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-3 text-sm text-gray-300">
            <Check className={`w-4 h-4 mt-0.5 shrink-0 ${isVpn ? 'text-[#3affc2]' : 'text-gray-500'}`} />
            <span>True Unlimited High-Speed Data</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-300">
            <Check className={`w-4 h-4 mt-0.5 shrink-0 ${isVpn ? 'text-[#3affc2]' : 'text-gray-500'}`} />
            <span>eSIM Included</span>
          </li>
          {isVpn && (
            <li className="flex items-start gap-3 text-sm text-white font-medium">
              <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#3affc2]" />
              <span>Premium VPN Access Included</span>
            </li>
          )}
        </ul>
      </div>

      <div className="flex-grow space-y-4 mb-8">
        <div className="p-4 rounded-xl bg-black/40 border border-white/5">
          <label className="flex items-center justify-between cursor-pointer mb-3">
            <span className="text-sm font-semibold flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#68b8ff]" /> Add Virtual Number (Optional)
            </span>
            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${addNumber ? 'bg-[#3affc2]' : 'bg-gray-700'}`} onClick={() => setAddNumber(!addNumber)}>
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${addNumber ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          </label>

          {addNumber && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 mt-4 overflow-hidden">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Choose Number Country</label>
                <select
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-[#3affc2]"
                  value={numberCountry}
                  onChange={(e) => setNumberCountry(e.target.value)}
                >
                  {numberCountries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="text-xs text-[#3affc2] bg-[#3affc2]/10 p-2.5 rounded-lg border border-[#3affc2]/20 font-medium">
                Included: 2 hours + 200 SMS (+£{numberBasePrice.toFixed(2)})
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Enhance Usage (Optional)</label>
                <select
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-[#3affc2]"
                  value={extraUsage}
                  onChange={(e) => setExtraUsage(parseFloat(e.target.value))}
                >
                  {usageOptions.map(opt => (
                    <option key={opt.label} value={opt.price}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </div>

        {addNumber && (
          <p className="text-[11px] text-gray-500 leading-relaxed bg-black/20 p-3 rounded-lg">
            <strong className="text-gray-400">IMPORTANT:</strong> PhantomPath numbers DO NOT support emergency calling (999, 112, or 911). You must maintain an alternative means of contacting emergency services.
          </p>
        )}
      </div>

      <div className="space-y-3 mt-auto">
        {addNumber && numberCountry === 'US' && (
          <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-3">
            <div>
              <label className="text-[10px] font-medium text-amber-400 uppercase tracking-wider block mb-1.5">Your mobile number (required for USA)</label>
              <input type="tel" value={userMobile} onChange={e => setUserMobile(e.target.value)} placeholder="+1 (555) 000-0000"
                className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all" />
            </div>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" checked={usaConsent} onChange={e => setUsaConsent(e.target.checked)} className="mt-0.5 w-4 h-4 accent-amber-500 shrink-0" />
              <span className="text-[10px] text-gray-300 leading-relaxed">
                I consent to receive transactional SMS from PhantomPathVPN regarding my service activation, access codes, and security alerts. Msg &amp; data rates may apply. Msg frequency varies. Reply STOP to opt-out, HELP for help. View <a href="/terms" className="text-[#38bdf8] underline">Terms</a> and <a href="/privacy-policy" className="text-[#38bdf8] underline">Privacy Policy</a>.
              </span>
            </label>
          </div>
        )}
        <Button
          onClick={handleBuy}
          disabled={addNumber && numberCountry === 'US' && (!usaConsent || !userMobile.trim())}
          className={`w-full font-bold rounded-xl h-12 uppercase tracking-wide transition-all duration-300 ${addNumber && numberCountry === 'US' && (!usaConsent || !userMobile.trim())
              ? 'bg-white/5 text-gray-600 border border-white/10 cursor-not-allowed'
              : isVpn
                ? 'text-[#0a0a0a] bg-[#3affc2] hover:bg-white hover:text-black shadow-[0_0_20px_rgba(58,255,194,0.3)]'
                : 'text-white bg-white/10 hover:bg-white/20'
            }`}
        >
          Select Plan
        </Button>
      </div>
    </motion.div>
  );
};

const TrueUnlimitedPacks = () => {
  const [activeRegion, setActiveRegion] = useState('United Kingdom');
  const { toast } = useToast();

  const handleBuy = () => {
    toast({ title: "Private Beta", description: "Payments are disabled during the private beta. Coming soon." });
  };

  return (
    <section className="py-20 px-4 bg-[#0a0a0a] border-t border-white/5">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">True Unlimited Packs</h2>
          <p className="text-gray-400 text-lg mb-10">Massive data allowances for power users without limits.</p>

          <div className="flex flex-col items-center justify-center space-y-4">
            <span className="text-white font-medium text-lg flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#3affc2]" /> Choose Data Region:
            </span>
            <select
              className="bg-[#111] border-2 border-white/10 hover:border-white/30 rounded-xl px-6 py-4 text-lg md:text-xl font-bold text-white focus:outline-none focus:border-[#3affc2] transition-colors shadow-lg max-w-xs w-full text-center"
              value={activeRegion}
              onChange={(e) => setActiveRegion(e.target.value)}
            >
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <UnlimitedCard
            title="Unlimited Data"
            basePrice={pricing[activeRegion].base}
            isVpn={false}
            region={activeRegion}
            handleBuy={handleBuy}
          />
          <UnlimitedCard
            title="Unlimited Data + VPN"
            basePrice={pricing[activeRegion].vpn}
            isVpn={true}
            region={activeRegion}
            handleBuy={handleBuy}
          />
        </div>
      </div>

    </section>
  );
};

export default TrueUnlimitedPacks;