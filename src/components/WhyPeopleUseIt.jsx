import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Globe, Clock, ShieldAlert } from 'lucide-react';

const reasons = [
  {
    icon: ShieldAlert,
    question: "Restricted networks?",
    answer: "Some workplaces and ISPs apply broad content filtering that affects lawful websites."
  },
  {
    icon: Wifi,
    question: "Using public Wi-Fi?",
    answer: "Protect your connection from hackers in cafés, airports, hotels, and shared networks."
  },
  {
    icon: Globe,
    question: "Travelling abroad?",
    answer: "Maintain consistent access to lawful online streaming services while away from home."
  },
  {
    icon: Clock,
    question: "No long-term commitment?",
    answer: "Pay only when you need private access — from as little as 20p."
  }
];

const WhyPeopleUseIt = () => {
  return (
    <section id="why-people-use" className="py-24 px-4 bg-[#0a0a0a] relative overflow-hidden">
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Why People Use PhantomPathVPN</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real-world solutions for your digital privacy and freedom.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-[#111] p-8 rounded-3xl border border-white/10 hover:border-[#3affc2]/50 transition-all duration-300 group shadow-lg hover:shadow-[#3affc2]/10 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#0a0a0a] border border-[#3affc2]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-6 h-6 text-[#3affc2]" />
              </div>
              
              <h3 className="text-xl font-bold text-[#3affc2] mb-3 leading-tight">
                {item.question}
              </h3>
              
              <p className="text-gray-300 leading-relaxed text-sm">
                {item.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPeopleUseIt;