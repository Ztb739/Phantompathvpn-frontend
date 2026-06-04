import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Clock, Zap, CreditCard, Wallet, Smartphone, ShieldAlert } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const PaymentBadges = ({ methods = ['carrier'] }) => (
  <div className="flex flex-col items-center mt-5 w-full">
    <div className="flex flex-col gap-2 justify-start items-center text-gray-400 w-full mb-3 min-h-[68px]">
      {methods.includes('carrier') && (
        <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-md text-xs border border-[#00ffc8]/40 text-[#00ffc8] shadow-[0_0_10px_rgba(0,255,200,0.2)] transition-transform duration-300 hover:scale-110 cursor-default">
          <Smartphone className="w-4 h-4 scale-[1.15] drop-shadow-[0_0_10px_rgba(0,255,200,0.7)] text-[#00ffc8]" /> Carrier Billing
        </div>
      )}
      {(methods.includes('stripe') || methods.includes('paypal')) && (
        <div className="flex flex-row justify-center items-center gap-2">
          {methods.includes('stripe') && (
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-md text-xs border border-white/10 transition-transform duration-300 hover:scale-110 cursor-default">
              <CreditCard className="w-4 h-4 scale-[1.15] drop-shadow-[0_0_10px_rgba(0,255,200,0.7)] text-white" /> Stripe
            </div>
          )}
          {methods.includes('paypal') && (
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-md text-xs border border-white/10 transition-transform duration-300 hover:scale-110 cursor-default">
              <Wallet className="w-4 h-4 scale-[1.15] drop-shadow-[0_0_10px_rgba(0,255,200,0.7)] text-white" /> PayPal
            </div>
          )}
        </div>
      )}
    </div>
    <p className="text-[10px] text-gray-500 text-center max-w-xs leading-tight">
      ⚠️ 18+ ONLY. By clicking Carrier Billing, PayPal, or Stripe, you request immediate supply of this digital service and acknowledge that your 14-day cooling-off period is waived once access is activated. Carrier charges apply to mobile bills. No auto-renewal. Services subject to abuse monitoring and UK law compliance.
    </p>
  </div>
);

const plans = [
  {
    name: "Instant 1-Hour Access",
    price: "£0.20",
    duration: "1 Hour Access",
    desc: "Instant access — pay only for what you need",
    highlight: false,
    methods: ['carrier'],
    subtitle: "(carrier billing only)"
  },
  {
    name: "24-Hour Pass",
    price: "£1.00",
    duration: "24 Hours Access",
    desc: "Full day access — perfect for trying it out",
    highlight: false,
    methods: ['carrier', 'stripe', 'paypal']
  },
  {
    name: "2-Week Pass",
    price: "£2.00",
    duration: "14 Days Access",
    desc: "Best value — ~14p/day",
    highlight: true,
    methods: ['carrier', 'stripe', 'paypal']
  },
  {
    name: "Monthly Pass",
    price: "£3.50",
    duration: "30 Days Access",
    desc: "Ultimate convenience — lowest daily cost (~11p/day)",
    highlight: false,
    methods: ['carrier', 'stripe', 'paypal']
  }
];

const Pricing = () => {
  const { toast } = useToast();

  const handleBuy = () => {
    toast({ title: "Private Beta", description: "Payments are disabled during the private beta. Coming soon." });
  };

  return (
    <section id="pricing" className="pt-4 pb-16 px-4 bg-[#0a0a0a]">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#00ffc8] font-bold tracking-wider text-sm uppercase mb-2 block">Simple Pricing</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">VPN Passes</h2>
          <p className="text-gray-400 text-lg">No recurring payments. No surprise bills. Just access.</p>
          <p className="text-[#00ffc8] font-semibold mt-2">No subscription. No commitment.</p>
        </motion.div>

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-8 lg:gap-6 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative flex flex-col p-6 lg:p-8 rounded-3xl transition-all duration-300 group mb-8 md:mb-0 h-full ${
                plan.highlight 
                  ? 'bg-[#151515] border-[2px] border-[#00ffc8] animate-breathe-border z-10' 
                  : 'bg-[#111] border border-white/5 hover:border-white/20'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00ffc8] text-[#0a0a0a] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg whitespace-nowrap z-20">
                  <Zap className="w-3 h-3 fill-current" /> MOST POPULAR
                </div>
              )}

              <div className="mb-6 shrink-0">
                <h3 className={`font-bold text-lg mb-0 ${plan.highlight ? 'text-[#00ffc8]' : 'text-white'}`}>
                  {plan.name}
                </h3>
                {plan.subtitle && (
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight mb-2">
                    {plan.subtitle}
                  </p>
                )}
                <div className="flex items-baseline gap-1 mb-2 mt-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                </div>
                <p className="text-sm text-gray-400">{plan.duration}</p>
              </div>

              <div className="flex-grow mb-8">
                <p className="text-sm text-gray-300 font-medium mb-4 pb-4 border-b border-white/10">{plan.desc}</p>
                <ul className="space-y-3">
                   <li className="flex items-center gap-3 text-sm text-gray-300">
                     <Check className={`w-4 h-4 ${plan.highlight ? 'text-[#00ffc8]' : 'text-gray-500'}`} />
                     <span>Instant Access</span>
                   </li>
                   <li className="flex items-center gap-3 text-sm text-gray-300">
                     <Clock className={`w-4 h-4 ${plan.highlight ? 'text-[#00ffc8]' : 'text-gray-500'}`} />
                     <span>No recurring fees</span>
                   </li>
                </ul>
              </div>

              <div className="mt-auto shrink-0 flex flex-col items-center">
                <Button 
                  onClick={handleBuy}
                  className="w-full font-bold rounded-xl h-12 uppercase tracking-wide text-[#68b8ff] hover:text-white bg-transparent border-2 border-[#68b8ff] hover:bg-[#68b8ff] transition-all duration-300 scale-100 hover:scale-105 glow-phantom glow-phantom-hover mt-auto"
                >
                  Get Instant Access
                </Button>
                <PaymentBadges methods={plan.methods} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default Pricing;