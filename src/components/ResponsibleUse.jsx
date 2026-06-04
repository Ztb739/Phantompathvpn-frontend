import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const ResponsibleUse = () => {
  return (
    <section className="py-24 px-4 bg-[#0d0d0d]">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#111] to-[#0d0d0d] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div>
              <h3 className="font-bold text-white text-2xl mb-4 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-[#68b8ff]" />
                The Issue
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                Many ISPs, mobile networks, and public Wi-Fi providers apply broad filtering and policy-based restrictions that can limit access to lawful content for adult users, sometimes requiring repeated verification or causing inconsistent availability across networks.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white text-2xl mb-4 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#3affc2]" />
                The Solution
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                PhantomPathVPN provides a secure, encrypted connection that helps reduce the impact of local network restrictions, allowing adults to access lawful online services more reliably while browsing responsibly.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResponsibleUse;