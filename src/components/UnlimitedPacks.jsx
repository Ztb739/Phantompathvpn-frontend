import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Globe, Phone, Infinity, Zap } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const regions = ['United Kingdom', 'United States', 'Belgium', 'Sweden', 'Czech Republic', 'Finland', 'Denmark', 'Hungary', 'Ireland'];

const pricing = {
  'United Kingdom': { base: 129.99, vpn: 139.99 },
  'United States': { base: 149.99, vpn: 159.99 },
  'Belgium': { base: 139.99, vpn: 149.99 },
  'Sweden': { base: 139.99, vpn: 149.99 },
  'Czech Republic': { base: 139.99, vpn: 149.99 },
  'Finland': { base: 139.99, vpn: 149.99 },
  'Denmark': { base: 139.99, vpn: 149.99 },
  'Hungary': { base: 139.99, vpn: 149.99 },
  'Ireland': { base: 139.99, vpn: 149.99 },
};

const numberCountries = ['United Kingdom', 'United States', 'Belgium', 'Sweden', 'Czech Republic', 'Finland', 'Denmark', 'Hungary', 'Ireland'];

const minuteOptions = [
  { label: 'None', price: 0 },
  { label: '+1 hour £3.00', price: 3.00 },
  { label: '+2 hours £5.00', price: 5.00 },
];

const smsOptions = [
  { label: 'None', price: 0 },
  { label: '+100 SMS £3.00', price: 3.00 },
  { label: '+200 SMS £5.00', price: 5.00 },
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

const UnlimitedCard = ({ title, basePrice, isVpn, region, baseDesc, comparePrice, badgeLabel, buttonText, handleBuy }) => {
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

  const numberBasePrice = 6.00;

  const getAddonCost = () => {
    let cost = 0;
    if (expanded) {
      cost += numberBasePrice + extraMinutes + extraSms;
    }
    return cost;
  };

  const calculateTotal = () => {
    return (basePrice + getAddonCost()).toFixed(2);
  };

  const getDynamicDesc = () => {
    if (isVpn && comparePrice) {
      const currentTotal = basePrice + getAddonCost();
      const compareTotal = comparePrice + getAddonCost();
      const diff = currentTotal - compareTotal;
      return `${baseDesc} for only +£${diff.toFixed(2)}`;
    }
    return baseDesc;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative flex flex-col p-6 rounded-xl border transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl overflow-visible h-full mb-8 md:mb-0 ${
        isVpn 
          ? 'bg-[#0f172a] border-[#eab308] shadow-[0_4px_40px_rgba(234,179,8,0.15)]' 
          : 'bg-[#1e293b] border-white/5 hover:border-white/20 shadow-lg'
      }`}
    >
      {badgeLabel && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#eab308] text-[#020617] text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg whitespace-nowrap z-20">
          <Zap className="w-3 h-3 fill-current" /> {badgeLabel}
        </div>
      )}

      <div className="shrink-0 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Infinity className={`w-6 h-6 ${isVpn ? 'text-[#eab308]' : 'text-gray-400'}`} />
          <h3 className={`font-bold text-xl ${isVpn ? 'text-[#fde047]' : 'text-white'}`}>
            {title}
          </h3>
        </div>
        <p className="text-xs text-gray-400 mb-2">{region} • 30-Day Duration</p>
        <p className={`text-xs font-medium mb-3 pb-3 border-b border-white/5 ${isVpn ? 'text-[#fde047]/80' : 'text-gray-400'}`}>
          {getDynamicDesc()}
        </p>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-3xl font-black text-white">£{calculateTotal()}</span>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 mb-4 flex flex-col gap-4">
        <ul className="space-y-2 shrink-0 pt-1">
           <li className="flex items-start gap-2 text-xs text-gray-300">
             <Check className={`w-4 h-4 mt-0.5 shrink-0 ${isVpn ? 'text-[#eab308]' : 'text-gray-400'}`} />
             <span className="font-medium text-white">True Unlimited High-Speed Data</span>
           </li>
           <li className="flex items-start gap-2 text-xs text-gray-300">
             <Check className={`w-4 h-4 mt-0.5 shrink-0 ${isVpn ? 'text-[#eab308]' : 'text-gray-400'}`} />
             <span>eSIM Included</span>
           </li>
           {isVpn && (
             <li className="flex items-start gap-2 text-xs text-white font-medium">
               <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#eab308]" />
               <span className="text-[#fde047]">Premium VPN Access Included</span>
             </li>
           )}
        </ul>

        <div className="space-y-3 shrink-0 pb-1">
          <div className="p-3 rounded-xl bg-black/30 border border-white/5">
            <div className="flex items-center justify-between cursor-pointer mb-1" onClick={(e) => { e.preventDefault(); onToggle(); }}>
              <span className="text-xs font-semibold flex items-center gap-2 text-gray-200">
                <Phone className={`w-3.5 h-3.5 ${isVpn ? 'text-[#eab308]' : 'text-gray-400'}`} /> Add Virtual Number
              </span>
              <div className={`w-10 h-5 rounded-full p-0.5 transition-colors ${expanded ? (isVpn ? 'bg-[#eab308]' : 'bg-[#38bdf8]') : 'bg-gray-600'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${expanded ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>
            
            <AnimatePresence>
              {expanded && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-3 mt-3 overflow-visible">
                  <div>
                    <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1">Number Country</label>
                    <CustomSelect
                      value={numberCountry}
                      onChange={setNumberCountry}
                      options={numberCountries}
                      isOpen={isNumberCountryDropdownOpen}
                      setIsOpen={setIsNumberCountryDropdownOpen}
                      className={`w-full bg-[#0f172a] border border-white/10 rounded-lg p-2 text-xs text-white transition-colors`}
                      focusBorderColor={isVpn ? 'border-[#eab308]' : 'border-[#38bdf8]'}
                    />
                  </div>
                  
                  <div className={`text-[10px] ${isVpn ? 'text-[#fde047] bg-[#eab308]/10 border-[#eab308]/20' : 'text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/20'} p-2 rounded-lg border font-medium flex justify-between`}>
                    <span>Included: 2 hours + 200 SMS</span>
                    <span>+£{numberBasePrice.toFixed(2)}</span>
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
                        className={`w-full bg-[#0f172a] border border-white/10 rounded-lg p-2 text-xs text-white transition-colors`}
                        focusBorderColor={isVpn ? 'border-[#eab308]' : 'border-[#38bdf8]'}
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
                        className={`w-full bg-[#0f172a] border border-white/10 rounded-lg p-2 text-xs text-white transition-colors`}
                        focusBorderColor={isVpn ? 'border-[#eab308]' : 'border-[#38bdf8]'}
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
          className={`w-full font-bold rounded-lg h-12 text-sm uppercase tracking-wider transition-all duration-300 glow-phantom glow-phantom-hover mt-auto ${
            expanded && numberCountry === 'United States' && (!usaConsent || !userMobile.trim())
              ? 'bg-white/5 text-gray-600 border border-white/10 cursor-not-allowed'
              : isVpn 
                ? 'bg-[#eab308] text-[#020617] hover:bg-white hover:text-black' 
                : 'bg-white/10 text-white border border-white/20 hover:bg-white hover:text-black'
          }`}
        >
          {buttonText}
        </Button>
        <p className="text-[10px] text-gray-500 text-center leading-tight">
          🏛️ COMPLIANCE NOTICE: Strictly for users 18+. By paying via PayPal, Stripe, or Bank Transfer, you request immediate delivery and waive your 14-day right to cancel once the Stateless connection is initiated.
        </p>
      </div>
    </motion.div>
  );
};

const UnlimitedPacks = () => {
  const [activeRegion, setActiveRegion] = useState('United Kingdom');
  const { toast } = useToast();
  const [isRegionSelectOpen, setIsRegionSelectOpen] = useState(false);

  const handleBuy = () => {
    toast({ title: "Private Beta", description: "Payments are disabled during the private beta. Coming soon." });
  };

  return (
    <section id="unlimited-packs" className="py-12 lg:py-16 px-4 bg-[#050b14]">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-black mb-3 text-white tracking-tight">Unlimited Packs - True unlimited data for heavy travellers and power users.</h2>
          <p className="text-[#eab308] font-semibold text-base">No subscription. No commitment.</p>
          
          <div className="flex flex-col items-center justify-center space-y-3 mt-6">
            <span className="text-gray-300 font-medium text-xs uppercase tracking-widest flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[#eab308]" /> Choose Data Region
            </span>
            <div className="relative group w-full max-w-[280px]">
              <CustomSelect
                value={activeRegion}
                onChange={setActiveRegion}
                options={regions}
                isOpen={isRegionSelectOpen}
                setIsOpen={setIsRegionSelectOpen}
                className="w-full bg-[#1e293b] border border-white/10 hover:border-white/30 rounded-xl px-6 py-3 text-lg font-bold text-white transition-all shadow-lg text-center cursor-pointer"
                focusBorderColor="border-[#eab308]"
                dropdownTextClass="text-base"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-0 md:gap-6 max-w-4xl mx-auto mb-10 items-stretch">
          <UnlimitedCard 
            title="Unlimited Data" 
            basePrice={pricing[activeRegion].base} 
            isVpn={false} 
            region={activeRegion}
            baseDesc="Unlimited data for power users"
            buttonText="Go Unlimited"
            handleBuy={handleBuy}
          />
          <UnlimitedCard 
            title="Unlimited Data + VPN" 
            basePrice={pricing[activeRegion].vpn} 
            comparePrice={pricing[activeRegion].base}
            isVpn={true} 
            region={activeRegion}
            baseDesc="Ultimate privacy — VPN included"
            badgeLabel="Ultimate"
            buttonText="Go Unlimited + VPN"
            handleBuy={handleBuy}
          />
        </div>

        <div className="max-w-4xl mx-auto space-y-3">
          <div className="text-center text-[11px] text-gray-400 bg-[#1e293b]/50 p-4 rounded-xl border-l-4 border-l-[#eab308] border-white/5 space-y-2">
            <p>VPN service is intended for lawful privacy and security purposes. Users remain responsible for complying with applicable laws and service terms.</p>
            <p>Telecom services are subject to fair use, abuse monitoring, and automated fraud prevention systems.</p>
            <p>Virtual numbers are provided through third-party telecommunications providers. Compatibility with verification services depends on the policies of each platform. SMS delivery is not guaranteed for all services.</p>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default UnlimitedPacks;