import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

const RestrictedAccess = () => {
  return (
    <section className="py-24 px-4 bg-[#0d0d0d]">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-[#111] border border-[#68b8ff]/30 flex items-center justify-center">
              <ShieldAlert className="w-8 h-8 text-[#68b8ff]" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Access on Restricted Networks</h2>
          
          <div className="bg-[#111] p-8 md:p-10 rounded-3xl border border-white/5 text-center mb-8 mx-auto max-w-3xl">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Increasing network-level filters and policy-based access controls in regions such as the UK and Australia can unintentionally restrict access to lawful online services for adults. In the UK, ongoing discussions around digital identity and age-assurance systems highlight a growing shift toward more controlled access to online content.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              While these measures aim to improve safety, they can also lead to over-blocking or inconsistent access on certain networks. PhantomPathVPN helps adults maintain reliable access to legitimate, lawful online services when using restricted or filtered networks, particularly on public Wi-Fi, mobile networks, or shared connections.
            </p>
            <p className="text-gray-400 font-semibold text-sm">
              For adults aged 18+. Users are responsible for complying with local laws, platform terms, and acceptable-use policies.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RestrictedAccess;