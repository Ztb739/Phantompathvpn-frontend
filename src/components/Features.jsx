import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, CreditCard, UserX, Globe2, LayoutDashboard, Phone } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "Bank-Grade Encryption",
    desc: "Your data is secured with AES-256 encryption, protecting you from snooping on public Wi-Fi."
  },
  {
    icon: UserX,
    title: "No traditional accounts or profiles required.",
    desc: "We don't ask for your name, email, or phone number. Just pay and connect."
  },
  {
    icon: Phone,
    title: "Virtual Numbers",
    desc: "Includes: eSIM + High-Speed Data. Optional UK/USA Number available for total privacy."
  },
  {
    icon: Zap,
    title: "High-Speed Servers",
    desc: "Optimized for streaming and browsing with minimal speed loss."
  },
  {
    icon: Globe2,
    title: "Global Server Network",
    desc: "Access content from multiple regions with our growing server list."
  },
  {
    icon: LayoutDashboard,
    title: "User-Friendly Dashboard",
    desc: "Simple interface to manage your temporary access credentials."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-4 bg-[#0d0d0d] relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Features</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Everything you need for secure, private browsing and communication.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-[#111] border border-white/5 hover:border-[#3affc2]/30 transition-colors flex flex-col items-center text-center"
            >
              <feature.icon className="w-10 h-10 text-[#3affc2] mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;