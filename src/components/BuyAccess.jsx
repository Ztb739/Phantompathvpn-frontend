import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CreditCard, Wallet, Smartphone, ShieldAlert } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BuyAccess = () => {
  const { toast } = useToast();

  const comingSoon = () => {
    toast({ title: 'Private Beta', description: 'Payments are disabled during the private beta. Coming soon.' });
  };

  return (
    <section className="pt-24 pb-8 px-4 bg-[#0a0a0a] border-t border-white/5">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Buy Access</h2>
          
          <p className="text-xs text-gray-400 mb-6 bg-white/5 p-3 rounded-lg border border-white/10 max-w-2xl mx-auto">
            By completing this purchase, you consent to immediate activation of the digital service and waive your 14-day cooling-off right under the Consumer Contracts Regulations.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <Button onClick={comingSoon} variant="outline"
              className="h-12 border-[#635bff]/30 bg-[#635bff]/10 hover:bg-[#635bff]/20 text-white hover:text-white transition-all px-6">
              <CreditCard className="w-4 h-4 mr-2 text-[#635bff]" />
              Card / Apple Pay
            </Button>
            
            <Button onClick={comingSoon} variant="outline"
              className="h-12 border-[#ffc439]/30 bg-[#ffc439]/10 hover:bg-[#ffc439]/20 text-white hover:text-white transition-all px-6">
              <Wallet className="w-4 h-4 mr-2 text-[#ffc439]" />
              PayPal
            </Button>
            
            <Button onClick={comingSoon} variant="outline"
              className="h-12 border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-white hover:text-white transition-all px-6">
              <Smartphone className="w-4 h-4 mr-2 text-purple-400" />
              Carrier Billing
            </Button>
          </div>
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <ShieldAlert className="w-3 h-3" /> Services are subject to abuse monitoring and UK law compliance.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BuyAccess;