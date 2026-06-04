import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Smartphone, ShieldCheck } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const minuteOptions = [
  { label: 'None', price: 0 },
  { label: '+30 min £1.50', price: 1.50 },
  { label: '+1 hour £3.00', price: 3.00 },
];

const smsOptions = [
  { label: 'None', price: 0 },
  { label: '+50 SMS £1.50', price: 1.50 },
  { label: '+100 SMS £3.00', price: 3.00 },
];

const CustomSelect = ({ value, onChange, options, isOpen, setIsOpen, className, focusBorderColor, dropdownTextClass = "text-xs" }) => {
  const selectRef = useRef(null);
  const activeColorClass = focusBorderColor ? focusBorderColor.replace('border-', 'text-') : 'text-white';
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div className="relative w-full text-left" ref={selectRef}>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className={`${className} flex items-center justify-between ${isOpen ? focusBorderColor : 'border-white/10'}`}
      >
        <span className="truncate">{options.find(o => (o.value !== undefined ? o.value : o) === value)?.label || value}</span>
        <svg className={`w-4 h-4 ml-2 shrink-0 transition-colors ${isOpen ? activeColorClass : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className={`absolute z-[100] w-full mt-1 bg-[#0f172a] border ${focusBorderColor || 'border-white/20'} rounded-lg shadow-xl max-h-48 overflow-y-auto custom-scrollbar`}
          >
            {options.map((opt) => {
              const optValue = opt.value !== undefined ? opt.value : opt;
              const optLabel = opt.label !== undefined ? opt.label : opt;
              return (
                <div
                  key={optValue}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(optValue);
                    setIsOpen(false);
                  }}
                  className={`px-3 py-2 ${dropdownTextClass} text-white hover:bg-white/10 cursor-pointer transition-colors ${value === optValue ? 'bg-white/5 font-medium' : ''}`}
                >
                  {optLabel}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NumberCard = ({ country, flag, basePrice, handleBuy }) => {
  const [extraMinutes, setExtraMinutes] = useState(0);
  const [extraSms, setExtraSms] = useState(0);
  const [usaConsent, setUsaConsent] = useState(false);
  const [userMobile, setUserMobile] = useState('');
  
  const [isExtraMinutesOpen, setIsExtraMinutesOpen] = useState(false);
  const [isExtraSmsOpen, setIsExtraSmsOpen] = useState(false);

  const getAddonCost = () => extraMinutes + extraSms;

  const calculateTotal = () => {
    return (basePrice + getAddonCost()).toFixed(2);
  };

  const getDynamicDesc = () => {
    const addonCost = getAddonCost();
    if (addonCost > 0) {
      return `Private number (+£${addonCost.toFixed(2)} extras) — no contract`;
    }
    return `Private number — no contract`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col p-6 rounded-xl border bg-[#1e293b] border-white/5 hover:border-white/20 transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl shadow-lg overflow-visible h-full mb-8 md:mb-0"
    >
      <div className="shrink-0 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl" role="img" aria-label={`${country} flag`}>{flag}</span>
          <h3 className="font-bold text-xl text-white">
            {country} Virtual Number
          </h3>
        </div>
        <p className="text-xs font-medium text-[#38bdf8] mb-1">{getDynamicDesc()}</p>
        <p className="text-[10px] text-gray-500 mb-3">30-Day Duration</p>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-3xl font-black text-[#38bdf8]">£{calculateTotal()}</span>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 mb-4 flex flex-col gap-4">
        <ul className="space-y-2 shrink-0 pt-1">
           <li className="flex items-start gap-2 text-xs text-gray-300">
             <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#38bdf8]" />
             <span>Works with existing SIM/eSIM</span>
           </li>
           <li className="flex items-start gap-2 text-xs text-gray-300">
             <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#38bdf8]" />
             <span>Suitable for general communication and account verification where supported.</span>
           </li>
           <li className="flex items-start gap-2 text-xs text-gray-300">
             <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#38bdf8]" />
             <span>Stay reachable anywhere</span>
           </li>
        </ul>

        <div className="space-y-3 shrink-0 pb-1">
          <div className="p-3 rounded-xl bg-black/30 border border-white/5">
            <div className="mb-3">
              <span className="text-[10px] text-[#38bdf8] bg-[#38bdf8]/10 p-2 rounded-lg border border-[#38bdf8]/20 font-medium block text-center">
                Base plan does not include minutes/SMS
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              <div>
                <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1">Add Extra Minutes (Optional)</label>
                <CustomSelect
                  value={extraMinutes}
                  onChange={setExtraMinutes}
                  options={minuteOptions.map(opt => ({ label: opt.label, value: opt.price }))}
                  isOpen={isExtraMinutesOpen}
                  setIsOpen={setIsExtraMinutesOpen}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-2 text-xs text-white transition-colors"
                  focusBorderColor="border-[#38bdf8]"
                />
              </div>
              <div>
                <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1">Add Extra SMS (Optional)</label>
                <CustomSelect
                  value={extraSms}
                  onChange={setExtraSms}
                  options={smsOptions.map(opt => ({ label: opt.label, value: opt.price }))}
                  isOpen={isExtraSmsOpen}
                  setIsOpen={setIsExtraSmsOpen}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-2 text-xs text-white transition-colors"
                  focusBorderColor="border-[#38bdf8]"
                />
              </div>
            </div>
          </div>
          
          <p className="text-[10px] text-gray-500 leading-relaxed bg-black/20 p-2.5 rounded-lg">
            <strong className="text-red-400 font-medium">IMPORTANT:</strong> PhantomPath numbers DO NOT support emergency calling (999, 112, or 911). You must maintain an alternative means of contacting emergency services.
          </p>
        </div>
      </div>

      <div className="mt-auto shrink-0 pt-2 w-full flex flex-col gap-3">
        {country === 'USA' && (
          <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-3">
            <div>
              <label className="text-[10px] font-medium text-amber-400 uppercase tracking-wider block mb-1.5">Your mobile number (required for USA)</label>
              <input
                type="tel"
                value={userMobile}
                onChange={e => setUserMobile(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
              />
            </div>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" checked={usaConsent} onChange={e => setUsaConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-amber-500 shrink-0" />
              <span className="text-[10px] text-gray-300 leading-relaxed">
                I consent to receive transactional SMS from PhantomPathVPN regarding my service activation, access codes, and security alerts. Msg &amp; data rates may apply. Msg frequency varies. Reply STOP to opt-out, HELP for help. View <a href="/terms" className="text-[#38bdf8] underline">Terms</a> and <a href="/privacy-policy" className="text-[#38bdf8] underline">Privacy Policy</a>.
              </span>
            </label>
          </div>
        )}
        <Button 
          onClick={handleBuy}
          disabled={country === 'USA' && (!usaConsent || !userMobile.trim())}
          className={`w-full font-bold rounded-lg h-12 text-sm uppercase tracking-wider transition-all duration-300 glow-phantom glow-phantom-hover mt-auto ${
            country === 'USA' && (!usaConsent || !userMobile.trim())
              ? 'bg-white/5 text-gray-600 border border-white/10 cursor-not-allowed'
              : 'bg-white/10 text-white border border-white/20 hover:bg-white hover:text-black'
          }`}
        >
          Get {country} Number Instantly
        </Button>
        <p className="text-[10px] text-gray-500 text-center leading-tight">
          📞 18+ ONLY: By purchasing via PayPal or Stripe, you waive your 14-day cooling-off period for this digital number.<br />
          <strong className="text-red-400">IMPORTANT:</strong> PhantomPath numbers DO NOT support emergency calling (999, 112, or 911). You must maintain an alternative means of contacting emergency services.
        </p>
      </div>
    </motion.div>
  );
};

const VirtualNumbers = () => {
  const { toast } = useToast();

  const handleBuy = () => {
    toast({ title: "Private Beta", description: "Payments are disabled during the private beta. Coming soon." });
  };

  return (
    <section id="virtual-numbers" className="py-12 lg:py-16 px-4 bg-[#020617]">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-2.5 bg-[#38bdf8]/10 rounded-full mb-4">
            <Smartphone className="w-6 h-6 text-[#38bdf8]" />
          </div>
          <h2 className="text-2xl md:text-4xl font-black mb-3 text-white tracking-tight">Virtual Numbers - Keep a UK, USA or Selected EU number wherever you travel.</h2>
          <p className="text-[#38bdf8] font-semibold text-base mb-4">No subscription. No commitment.</p>
          <p className="text-gray-400 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
             Add a dedicated number to use with your existing SIM or eSIM. Suitable for general communication and account verification where supported.
          </p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-0 md:gap-6 max-w-4xl mx-auto mb-8 items-stretch">
          <NumberCard 
            country="UK" 
            flag="🇬🇧" 
            basePrice={4.99} 
            handleBuy={handleBuy}
          />
          <NumberCard 
            country="USA" 
            flag="🇺🇸" 
            basePrice={4.99} 
            handleBuy={handleBuy}
          />
        </div>
        
        <div className="max-w-4xl mx-auto space-y-2 mb-6">
          <div className="text-center text-[11px] text-gray-400 bg-[#1e293b]/50 p-4 rounded-xl border-l-4 border-l-[#38bdf8] border-white/5">
            <p className="mb-1">Virtual numbers are provided through third-party telecommunications providers. Compatibility with verification services depends on the policies of each platform. SMS delivery is not guaranteed for all services.</p>
            <p>Telecom services are subject to fair use, abuse monitoring, and automated fraud prevention systems.</p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-[#1e293b] px-5 py-2.5 rounded-full border border-white/10 text-xs text-gray-300 shadow-lg">
                <ShieldCheck className="w-4 h-4 text-[#2dd4bf]" />
                Kept separate from your primary mobile number.
            </div>
        </div>
      </div>
      
    </section>
  );
};

export default VirtualNumbers;