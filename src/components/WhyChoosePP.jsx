import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Wallet, FastForward, UserX } from 'lucide-react';

const reasons = [
  {
    icon: UserX,
    title: "Instant Access. Minimal Data Required.",
    desc: "Connect in seconds with no accounts, no emails, and no personal data. You leave nothing behind — not even a login."
  },
  {
    icon: Shield,
    title: "Engineered for Practical Privacy",
    desc: "Your traffic is encrypted and isolated from ISPs, trackers, and anyone else on the network. We focus on data minimisation, retaining only what is essential for service delivery."
  },
  {
    icon: Wallet,
    title: "Pay-As-You-Go, Reinvented",
    desc: "Buy access only when you need it. One-off passes, no subscriptions, no renewals, no strings attached."
  },
  {
    icon: FastForward,
    title: "Optimised for Speed & Stability",
    desc: "A lightweight, high-performance setup designed for fast, consistent, low-latency browsing — wherever you are."
  },
  {
    icon: Zap,
    title: "Privacy-Focused by Default",
    desc: "No sign-up. We do not store browsing history or personal identity logs. Just clean, private, secure access on demand."
  }
];

const WhyChoosePP = () => {
  return (
    <section id="why-choose-pp" className="py-24 px-4 bg-[#0d0d0d] relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Why Choose PhantomPathVPN</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-[#111] border border-white/5 hover:border-[#3affc2]/30 transition-colors text-center flex flex-col items-center"
            >
              <reason.icon className="w-10 h-10 text-[#3affc2] mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoosePP;