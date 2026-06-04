import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Status88ProgressBox = ({ isOpen, onOpenChange, autoClose = true }) => {
  const [showProgress, setShowProgress] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setShowProgress(true);
      
      // Speed up: Hide progress bar after 1.5 seconds (when it hits 90%)
      const progressTimer = setTimeout(() => {
        setShowProgress(false);
      }, 1500);

      // Auto-close functionality after 2.5 seconds total
      let closeTimer;
      if (autoClose) {
        closeTimer = setTimeout(() => {
          onOpenChange(false);
        }, 2500);
      }

      return () => {
        clearTimeout(progressTimer);
        if (closeTimer) clearTimeout(closeTimer);
      };
    }
  }, [isOpen, onOpenChange, autoClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-5 right-5 z-[9999] w-[240px] bg-[#1a1a1a] p-3 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_10px_rgba(0,255,200,0.1)] overflow-hidden pointer-events-auto border border-white/5"
        >
          <button 
            onClick={() => onOpenChange(false)}
            className="absolute top-1.5 right-1.5 text-gray-500 hover:text-[#00ffc8] transition-colors z-20 cursor-pointer p-1 rounded-sm hover:bg-white/5"
            aria-label="Close status widget"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          <div className="flex flex-col w-full h-full justify-between font-mono tracking-widest">
            <span className="block text-[9px] text-gray-400 mb-1.5">
              STATUS: FINAL PROTOCOLS INITIATED...
            </span>
            
            <span className="block text-xl text-[#00ffc8] font-bold mb-1.5 drop-shadow-[0_0_5px_rgba(0,255,200,0.5)]">
              90%
            </span>

            <span className="block text-[8px] text-gray-500 mb-2 uppercase leading-tight">
              establishing secure connection path coming soon
            </span>
            
            {showProgress && (
              <div className="w-full h-[2px] bg-[#0a0a0a] rounded-full overflow-hidden relative shadow-inner z-10">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "90%" }}
                  transition={{ duration: 1.5, ease: "linear" }}
                  className="absolute top-0 left-0 h-full bg-[#00ffc8] rounded-full"
                  style={{ boxShadow: "0 0 5px rgba(0, 255, 200, 0.8)" }}
                >
                  <motion.div 
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full bg-white/50"
                  />
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Status88ProgressBox;