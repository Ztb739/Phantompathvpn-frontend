import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Phone, Shield } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const dataCountries = ['United Kingdom', 'United States', 'Netherlands', 'Belgium', 'Sweden', 'Spain', 'France', 'Italy', 'Germany', 'Greece', 'Portugal'];
const numberCountries = ['United Kingdom', 'United States', 'Belgium', 'Sweden', 'Czech Republic', 'Finland', 'Denmark', 'Hungary', 'Ireland'];

const packData = {
  '1-week': [
    { id: '1w-1g', data: '1GB', duration: '7 Days', basePrice: 10.99, highlight: false, baseDesc: 'Entry-level privacy protection' },
    { id: '1w-5g', data: '5GB', duration: '7 Days', basePrice: 17.99, highlight: false, baseDesc: 'More privacy — lower cost' },
    { id: '1w-10g', data: '10GB', duration: '7 Days', basePrice: 24.99, highlight: true, baseDesc: 'Best value — double the data', badgeText: 'MOST POPULAR' },
    { id: '1w-50g', data: '50GB', duration: '7 Days', basePrice: 49.99, highlight: false, baseDesc: 'Ultimate privacy & data — lowest cost' },
  ],
  '2-weeks': [
    { id: '2w-1g', data: '1GB', duration: '14 Days', basePrice: 18.99, highlight: false, baseDesc: 'Entry-level protection' },
    { id: '2w-5g', data: '5GB', duration: '14 Days', basePrice: 29.99, highlight: false, baseDesc: 'More privacy' },
    { id: '2w-10g', data: '10GB', duration: '14 Days', basePrice: 41.99, highlight: true, baseDesc: 'Best value', badgeText: 'MOST POPULAR' },
    { id: '2w-50g', data: '50GB', duration: '14 Days', basePrice: 84.99, highlight: false, baseDesc: 'Ultimate privacy & data' },
  ],
  '1-month': [
    { id: '1m-10g', data: '10GB', duration: '30 Days', basePrice: 42.99, highlight: false, baseDesc: 'More privacy' },
    { id: '1m-20g', data: '20GB', duration: '30 Days', basePrice: 72.99, highlight: true, baseDesc: 'Best value', badgeText: 'MOST POPULAR' },
    { id: '1m-50g', data: '50GB', duration: '30 Days', basePrice: 129.99, highlight: false, baseDesc: 'Ultimate privacy & data' },
  ]
};

const numberPricing = {
  '1-week': { price: 2.00, included: '30 min + 20 SMS' },
  '2-weeks': { price: 3.50, included: '60 min + 40 SMS' },
  '1-month': { price: 6.00, included: '120 min + 60 SMS' },
};

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

const PackCard = ({ plan, activeTab, dataCountry, previousTierPrice, handleBuy }) => {
  const [expanded, setExpanded] = useState(false);
  const [numberCountry, setNumberCountry] = useState('United Kingdom');
  const [extraMinutes, setExtraMinutes] = useState(0);
  const [extraSms, setExtraSms] = useState(0);
  const [usaConsent, setUsaConsent] = useState(false);
  const [userMobile, setUserMobile] = useState('');

  const [isNumberCountryDropdownOpen, setIsNumberCountryDropdownOpen] = useState(false);
  const [isMinutesDropdownOpen, setIsMinutesDropdownOpen] = useState(false);
  const [isSmsDropdownOpen, setIsSmsDropdownOpen] = useState(false);

  const onToggle = () => setExpanded(prev => !prev);

  const numData = numberPricing[activeTab];
  
  const calculateTotal = () => {
    let total = plan.basePrice;
    if (expanded) {
      total += numData.price;
      total += extraMinutes;
      total += extraSms;
    }
    return total.toFixed(2);
  };

  const getDynamicDesc = () => {
    const totalNum = parseFloat(calculateTotal());
    const gb = parseInt(plan.data);
    const perGb = (totalNum / gb).toFixed(2);

    if (plan.highlight && previousTierPrice) {
      const addonCost = totalNum - plan.basePrice;
      const previousTotal = previousTierPrice + addonCost;
      const diff = totalNum - previousTotal;
      return `${plan.baseDesc} for only +£${Math.round(diff)}`;
    } else {
      return `${plan.baseDesc} (~£${perGb}/GB)`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative flex flex-col p-5 rounded-xl border transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl overflow-visible h-full mb-8 md:mb-0 ${
        plan.highlight 
          ? 'bg-[#0f172a] border-[#6366f1] shadow-[0_4px_30px_rgba(99,102,241,0.15)]' 
          : 'bg-[#1e293b] border-white/5 hover:border-white/20 shadow-lg'
      }`}
    >
      {plan.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6366f1] text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg whitespace-nowrap z-20">
          <Shield className="w-3 h-3 fill-current" /> {plan.badgeText || 'MOST POPULAR'}
        </div>
      )}

      <div className="shrink-0 mb-3">
        <h3 className={`font-bold text-lg mb-1 ${plan.highlight ? 'text-[#818cf8]' : 'text-white'}`}>
          {plan.data} Privacy Pack
        </h3>
        <p className="text-xs text-gray-400 mb-2">{dataCountry} • {plan.duration}</p>
        <p className={`text-xs font-medium mb-3 pb-3 border-b border-white/5 ${plan.highlight ? 'text-[#818cf8]/80' : 'text-gray-400'}`}>
          {getDynamicDesc()}
        </p>
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-2xl font-black text-white">£{calculateTotal()}</span>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 mb-4 flex flex-col gap-4">
        <ul className="space-y-2 shrink-0 pt-1">
           <li className="flex items-start gap-2 text-xs text-gray-300">
             <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${plan.highlight ? 'text-[#818cf8]' : 'text-gray-400'}`} />
             <span>eSIM Data Included</span>
           </li>
           <li className="flex items-start gap-2 text-xs text-[#818cf8] font-medium">
             <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#818cf8]" />
             <span>VPN Access Included</span>
           </li>
           <li className="flex items-start gap-2 text-xs text-gray-300">
             <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${plan.highlight ? 'text-[#818cf8]' : 'text-gray-400'}`} />
             <span>Optional UK/USA Number</span>
           </li>
        </ul>

        <div className="space-y-3 shrink-0 pb-1">
          <div className="p-3 rounded-xl bg-black/30 border border-white/5">
            <div className="flex items-center justify-between cursor-pointer" onClick={(e) => { e.preventDefault(); onToggle(); }}>
              <span className="text-xs font-semibold flex items-center gap-2 text-gray-200">
                <Phone className="w-3.5 h-3.5 text-[#818cf8]" /> Add Virtual Number
              </span>
              <div className={`w-10 h-5 rounded-full p-0.5 transition-colors ${expanded ? 'bg-[#6366f1]' : 'bg-gray-600'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${expanded ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>
            
            <AnimatePresence>
              {expanded && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-2.5 mt-3 overflow-visible">
                  <div>
                    <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1">Choose Number Country</label>
                    <CustomSelect
                      value={numberCountry}
                      onChange={setNumberCountry}
                      options={numberCountries}
                      isOpen={isNumberCountryDropdownOpen}
                      setIsOpen={setIsNumberCountryDropdownOpen}
                      className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-2 text-xs text-white transition-colors"
                      focusBorderColor="border-[#6366f1]"
                    />
                  </div>
                  
                  <div className="text-[10px] text-[#818cf8] bg-[#818cf8]/10 p-2 rounded-lg border border-[#818cf8]/20 font-medium flex justify-between">
                    <span>Included:</span>
                    <span>{numData.included} (+£{numData.price.toFixed(2)})</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    <div>
                      <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1">Add Extra Minutes</label>
                      <CustomSelect
                        value={extraMinutes}
                        onChange={setExtraMinutes}
                        options={minuteOptions.map(opt => ({ label: opt.label, value: opt.price }))}
                        isOpen={isMinutesDropdownOpen}
                        setIsOpen={setIsMinutesDropdownOpen}
                        className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-2 text-xs text-white transition-colors"
                        focusBorderColor="border-[#6366f1]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1">Add Extra SMS</label>
                      <CustomSelect
                        value={extraSms}
                        onChange={setExtraSms}
                        options={smsOptions.map(opt => ({ label: opt.label, value: opt.price }))}
                        isOpen={isSmsDropdownOpen}
                        setIsOpen={setIsSmsDropdownOpen}
                        className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-2 text-xs text-white transition-colors"
                        focusBorderColor="border-[#6366f1]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <AnimatePresence>
            {expanded && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-gray-500 leading-relaxed bg-black/20 p-2.5 rounded-lg overflow-hidden">
                <strong className="text-red-400 font-medium">IMPORTANT:</strong> PhantomPath numbers DO NOT support emergency calling (999, 112, or 911). You must maintain an alternative means of contacting emergency services.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-auto shrink-0 pt-2 w-full flex flex-col gap-3">
        {expanded && numberCountry === 'United States' && (
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
          disabled={expanded && numberCountry === 'United States' && (!usaConsent || !userMobile.trim())}
          className={`w-full font-bold rounded-lg h-10 text-xs uppercase tracking-wider transition-all duration-300 glow-phantom glow-phantom-hover mt-auto ${
            expanded && numberCountry === 'United States' && (!usaConsent || !userMobile.trim())
              ? 'bg-white/5 text-gray-600 border border-white/10 cursor-not-allowed'
              : plan.highlight
                ? 'bg-[#6366f1] text-white hover:bg-white hover:text-black'
                : 'bg-[#6366f1]/10 text-[#818cf8] border border-[#6366f1]/30 hover:bg-[#6366f1] hover:text-white'
          }`}
        >
          Get Privacy Pack
        </Button>
        <p className="text-[10px] text-gray-500 text-center leading-tight">
          🔒 18+ SECURE ACCESS: By purchasing via PayPal or Stripe, you request immediate activation of VPN and eSIM credentials. You acknowledge your 14-day cooling-off period is waived upon the start of service.
        </p>
      </div>
    </motion.div>
  );
};

const PrivacyPacks = () => {
  const [activeTab, setActiveTab] = useState('1-week');
  const [globalDataCountry, setGlobalDataCountry] = useState('United Kingdom');
  const { toast } = useToast();
  const [isGlobalCountryDropdownOpen, setIsGlobalCountryDropdownOpen] = useState(false);

  const handleBuy = () => {
    toast({ title: "Private Beta", description: "Payments are disabled during the private beta. Coming soon." });
  };

  return (
    <section id="privacy-packs" className="py-12 lg:py-16 px-4 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#6366f1]/10 via-transparent to-transparent pointer-events-none" />
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-black mb-3 text-white tracking-tight">Privacy Packs - Ultimate protection with bundled VPN access.</h2>
          <p className="text-[#818cf8] font-semibold text-base">No subscription. No commitment.</p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 mt-6">
            <div className="inline-flex bg-[#1e293b] p-1 rounded-xl border border-white/5 shadow-lg">
              {[
                { id: '1-week', label: '1 Week' },
                { id: '2-weeks', label: '2 Weeks' },
                { id: '1-month', label: '1 Month' }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-[#6366f1] text-white shadow-md' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-[#1e293b] p-2 rounded-xl border border-white/5 shadow-lg">
              <span className="text-xs font-semibold text-gray-300 pl-2">Travel Country:</span>
              <div className="min-w-[160px]">
                <CustomSelect
                  value={globalDataCountry}
                  onChange={setGlobalDataCountry}
                  options={dataCountries}
                  isOpen={isGlobalCountryDropdownOpen}
                  setIsOpen={setIsGlobalCountryDropdownOpen}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white font-medium transition-colors cursor-pointer"
                  focusBorderColor="border-[#6366f1]"
                  dropdownTextClass="text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-8 lg:gap-6 justify-center max-w-6xl mx-auto mb-8 items-stretch">
          {packData[activeTab].map((plan, index) => (
            <PackCard 
              key={plan.id} 
              plan={plan} 
              activeTab={activeTab} 
              dataCountry={globalDataCountry}
              previousTierPrice={index > 0 ? packData[activeTab][index-1].basePrice : null}
              handleBuy={handleBuy}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-10 space-y-3">
          <div className="text-center text-[11px] text-gray-400 bg-[#1e293b]/50 p-4 rounded-xl border-l-4 border-l-[#6366f1] border-white/5 space-y-2">
            <p>VPN service is intended for lawful privacy and security purposes. Users remain responsible for complying with applicable laws and service terms.</p>
            <p>Telecom services are subject to fair use, abuse monitoring, and automated fraud prevention systems.</p>
            <p>Virtual numbers are provided through third-party telecommunications providers. Compatibility with verification services depends on the policies of each platform. SMS delivery is not guaranteed for all services.</p>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default PrivacyPacks;