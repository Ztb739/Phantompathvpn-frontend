import React from 'react';
import { motion } from 'framer-motion';
import { UserX, Wallet, Zap, Shield, Tag, Globe } from 'lucide-react';

const differences = [
  {
    icon: UserX,
    title: "No traditional accounts or profiles required.",
    desc: "You don't sign up, create profiles, or hand over personal details. Access is instant, temporary, and entirely on your terms."
  },
  {
    icon: Wallet,
    title: "One-Off Payments Only",
    desc: "No subscriptions, no renewals, no commitments. You choose exactly when you want private access — nothing continues automatically."
  },
  {
    icon: Zap,
    title: "Instant Access on Every Purchase",
    desc: "The moment payment clears, your connection details appear on-screen. No emails, no waiting, no stored credentials."
  },
  {
    icon: Shield,
    title: "Built for Privacy from the Ground Up",
    desc: "Our service is designed around data minimisation and user control. We collect only what's required to deliver your pass and prevent abuse — nothing more."
  },
  {
    icon: Tag,
    title: "Transparent, Straightforward Pricing",
    desc: "Clear passes, clear durations, clear costs. No hidden fees, no upsells, no confusing bundles — just simple, pay-as-you-go privacy."
  },
  {
    icon: Globe,
    title: "Designed for Real-World Use",
    desc: "Whether you're travelling, using public Wi-Fi, or dealing with restrictive networks, PhantomPathVPN gives you reliable, lawful access without the friction of traditional VPNs."
  }
];

const WhyChoose = () => {
  return (
    <section id="why-choose" className="py-24 px-4 bg-[#0a0a0a] relative border-t border-white/5">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">What Makes Us Different</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A fundamental shift in how connectivity and privacy are delivered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-[#111] p-8 rounded-3xl border border-white/10 hover:border-[#3affc2]/40 transition-all duration-300 group shadow-lg hover:shadow-[0_10px_30px_-15px_rgba(58,255,194,0.2)] flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#1a1a1a] border border-white/5 group-hover:border-[#3affc2]/30 flex items-center justify-center mb-6 transition-colors duration-300">
                <item.icon className="w-6 h-6 text-[#3affc2]" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">
                {item.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed text-sm flex-grow">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;