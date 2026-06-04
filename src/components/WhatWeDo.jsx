import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Globe, Wifi } from 'lucide-react';

const features = [
  {
    icon: Lock,
    title: "Encrypted Connections",
    description: "Your data is wrapped in military-grade encryption from the moment you click connect. We ensure your digital footprint remains invisible to prying eyes."
  },
  {
    icon: Globe,
    title: "IP Masking While Connected",
    description: "Your real location vanishes. Browse the web with a new digital identity that shields your physical whereabouts and protects your anonymity."
  },
  {
    icon: Wifi,
    title: "Safer Public Wi-Fi Use",
    description: "Transform vulnerable coffee shop and airport networks into your own private fortress. Connect confidently without fear of data interception."
  }
];

const WhatWeDo = () => {
  return (
    <section id="features" className="py-24 px-4 bg-[#0d0d0d] relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
      
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">What We Do</h2>
          <p className="text-gray-400">Essential protection for the modern digital life.</p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="group bg-[#111111] p-8 rounded-2xl border border-white/5 hover:border-[#3affc2]/40 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#1a1a1a] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#3affc2]/10 transition-colors">
                <feature.icon className="w-7 h-7 text-white group-hover:text-[#3affc2] transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-[#3affc2] transition-colors">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;