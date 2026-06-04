import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'all');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'essential');
    setIsVisible(false);
  };

  const handleSettings = () => {
    localStorage.setItem('cookieConsent', 'essential');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 pointer-events-none"
        >
          <div className="container mx-auto max-w-5xl pointer-events-auto">
            <div className="bg-[#111] border border-white/10 shadow-2xl rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-sm text-gray-300 leading-relaxed">
                PhantomPathVPN uses cookies to ensure the website functions correctly and to improve your experience. You may accept or reject non‑essential cookies.
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <Button 
                  onClick={handleSettings}
                  variant="outline" 
                  className="bg-transparent border-white/10 text-white hover:bg-white/5 text-xs h-9"
                >
                  Cookie Settings
                </Button>
                <Button 
                  onClick={handleReject}
                  variant="outline" 
                  className="bg-transparent border-white/10 text-white hover:bg-white/5 text-xs h-9"
                >
                  Reject Non‑Essential Cookies
                </Button>
                <Button 
                  onClick={handleAcceptAll}
                  className="bg-[#3affc2] text-[#0a0a0a] hover:bg-[#3affc2]/90 font-bold text-xs h-9"
                >
                  Accept All Cookies
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;