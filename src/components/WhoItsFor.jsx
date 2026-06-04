import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Plane, Coffee, Smartphone, Laptop, Lock } from 'lucide-react';

const users = [
  {
    icon: Briefcase,
    title: "Remote Workers",
    text: "Secure your connection when working from co-working spaces or cafes."
  },
  {
    icon: Plane,
    title: "Travelers",
    text: "Access home content and banking apps securely while abroad."
  },
  {
    icon: Coffee,
    title: "Casual Users",
    text: "Protect yourself on public Wi-Fi without a monthly subscription."
  },
  {
    icon: Smartphone,
    title: "Mobile-First",
    text: "Easy configuration for iOS and Android devices."
  },
  {
    icon: Laptop,
    title: "Freelancers",
    text: "Keep client data safe on untrusted networks."
  },
  {
    icon: Lock,
    title: "Privacy Advocates",
    text: "Minimize your digital footprint with no-account access."
  }
];

const WhoItsFor = () => {
  return (
    <section id="who-its-for" className="py-24 px-4 bg-[#0a0a0a]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Who It's For</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-6 rounded-xl bg-[#111] border border-white/5"
            >
              <div className="bg-[#3affc2]/10 p-3 rounded-lg">
                <user.icon className="w-6 h-6 text-[#3affc2]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{user.title}</h3>
                <p className="text-gray-400 text-sm">{user.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;