import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    num: "01",
    title: "Choose Your Access",
    text: "Select the pass that fits your needs — from a quick session to extended access. No subscriptions, no accounts, no long‑term commitment."
  },
  {
    num: "02",
    title: "Secure Payment",
    text: "Pay securely using supported payment methods. No sign‑up, no personal information, and no email required."
  },
  {
    num: "03",
    title: "Instant Access Details",
    text: "Your private connection details appear immediately on‑screen the moment payment is completed. Nothing is stored or sent by email."
  },
  {
    num: "04",
    title: "Connect & Go Private",
    text: "Follow the simple on‑screen instructions to activate your pass and enjoy fast, private, encrypted internet access."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-[#0a0a0a] relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">How It Works</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-[#1a1a1a] -z-10"></div>
              )}
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#111] border border-[#3affc2]/30 flex items-center justify-center text-[#3affc2] font-bold text-xl mb-6 shadow-[0_0_15px_rgba(58,255,194,0.1)] relative z-10">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-[220px]">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;