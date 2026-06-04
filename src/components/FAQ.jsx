import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Do I need to create an account?",
    a: "No. PhantomPathVPN is completely account-free. You simply purchase a pass and receive temporary credentials."
  },
  {
    q: "How do I receive my login details?",
    a: "Your username and password are displayed on the screen immediately after payment and can also be emailed to you if you choose."
  },
  {
    q: "What devices are supported?",
    a: "PhantomPathVPN works on any device that supports standard VPN protocols, including Windows, macOS, iOS, Android, and Linux."
  },
  {
    q: "Is there a limit on data usage?",
    a: "No, we offer unlimited bandwidth during your active access period."
  },
  {
    q: "Can I use it for streaming?",
    a: "Yes, our high-speed servers are optimized for streaming lawful content."
  },
  {
    q: "What happens when my time runs out?",
    a: "Your credentials will automatically stop working. To continue using the service, simply purchase another pass."
  },
  {
    q: "Do you keep logs of my activity?",
    a: "No. We have a strict no-logs policy regarding your browsing history, traffic destination, and data content."
  },
  {
    q: "Can I get a refund?",
    a: "Due to the nature of the service (immediate, temporary access), we generally do not offer refunds unless the service was unavailable during your purchase period."
  },
  {
    q: "Which countries can I connect to?",
    a: "We currently offer servers in key locations including the UK, USA, and Europe, with more being added regularly."
  },
  {
    q: "How secure is the payment process?",
    a: "All payments are processed by secure, third-party payment providers (like Stripe). We do not store your financial details."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 px-4 bg-[#0a0a0a]">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
        </motion.div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-white/10 rounded-lg bg-[#111] px-4">
              <AccordionTrigger className="text-white hover:text-[#3affc2] text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;