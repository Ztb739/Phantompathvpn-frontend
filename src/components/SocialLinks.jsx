import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram } from 'lucide-react';

const TikTokIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const HeaderSocialLinks = () => {
  return (
    <div className="flex items-center gap-3">
      <a href="https://www.tiktok.com/@phantompathvpn.com?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#3affc2] transition-colors">
        <TikTokIcon className="w-4 h-4" />
      </a>
      <a href="https://www.facebook.com/share/17t99Te3UD/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#3affc2] transition-colors">
        <Facebook className="w-4 h-4" />
      </a>
      <a href="https://www.instagram.com/phantompathvpn?igsh=MWNmbHAxdzh0a3VoNA==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#3affc2] transition-colors">
        <Instagram className="w-4 h-4" />
      </a>
    </div>
  );
};

export const HeroSocialLinks = () => {
  return (
    <section className="py-6 bg-[#0a0a0a] border-b border-white/5">
      <div className="container mx-auto max-w-5xl flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-6"
        >
          <a 
            href="https://www.tiktok.com/@phantompathvpn.com?is_from_webapp=1&sender_device=pc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#3affc2] hover:border-[#3affc2]/50 transition-all hover:-translate-y-1"
            aria-label="TikTok"
          >
            <TikTokIcon className="w-5 h-5" />
          </a>
          <a 
            href="https://www.facebook.com/share/17t99Te3UD/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#3affc2] hover:border-[#3affc2]/50 transition-all hover:-translate-y-1"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a 
            href="https://www.instagram.com/phantompathvpn?igsh=MWNmbHAxdzh0a3VoNA==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#3affc2] hover:border-[#3affc2]/50 transition-all hover:-translate-y-1"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};