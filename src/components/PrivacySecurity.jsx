import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock } from 'lucide-react';

const PrivacySecurity = () => {
  return (
    <section className="py-24 px-4 bg-[#0a0a0a] relative overflow-hidden">
      {/* Abstract Shapes */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-gradient-to-l from-[#3affc2]/5 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#68b8ff]/10 text-[#68b8ff] text-xs font-bold mb-6">
              <Shield className="w-3 h-3" />
              BANK-GRADE ENCRYPTION
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Privacy & Security First</h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              When you connect to PhantomPathVPN, your internet traffic is wrapped in an unbreakable layer of encryption. This means ISP tracking, data snooping, and malicious actors on shared networks cannot see what you are doing.
            </p>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We operate with a strict no-logs policy on connection content. Your browsing habits remain your business, and yours alone.
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#111] border border-white/5">
                <div className="w-10 h-10 rounded-full bg-[#3affc2]/10 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 text-[#3affc2]" />
                </div>
                <div>
                  <h4 className="font-bold text-white">AES-256 Encryption</h4>
                  <p className="text-sm text-gray-500">The same standard used by governments and banks.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 bg-gradient-to-br from-[#151515] to-[#0d0d0d] p-1 rounded-3xl border border-white/10 shadow-2xl">
               <div className="bg-[#0a0a0a] rounded-[22px] overflow-hidden aspect-video flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                 <div className="w-24 h-24 rounded-full bg-[#3affc2]/20 flex items-center justify-center animate-pulse">
                   <Shield className="w-12 h-12 text-[#3affc2]" />
                 </div>
                 <div className="absolute bottom-6 left-6 right-6 flex justify-between text-xs text-gray-500 font-mono">
                    <span>STATUS: PROTECTED</span>
                    <span>IP: Masked through our secure servers</span>
                 </div>
               </div>
            </div>
            {/* Glow behind */}
            <div className="absolute inset-0 bg-[#3affc2] blur-[100px] opacity-10 -z-10 rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PrivacySecurity;