import React from 'react';
import { motion } from 'framer-motion';

const OurPhilosophy = () => {
  return (
    <section id="philosophy" className="py-24 px-4 bg-[#0d0d0d]">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Our Philosophy</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            We are built on the principle of data minimization. In an age where every click is tracked and every service demands a profile, PhantomPathVPN stands apart. We believe that privacy is a right, not a product feature that requires you to sell your identity.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-[#3affc2] mb-6 text-center">What Makes Us Different</h3>
          <ul className="space-y-4 max-w-2xl mx-auto">
            {[
              "No Email Required: We don't want your spam.",
              "No Passwords to Remember: Access codes are temporary.",
              "No Auto-Renewal: We never charge you without your explicit action.",
              "No Upselling: What you see is what you get.",
              "Designed around data minimisation and user control."
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300 bg-[#151515] p-4 rounded-lg border border-white/5">
                <span className="w-2 h-2 bg-[#3affc2] rounded-full shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default OurPhilosophy;