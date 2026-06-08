import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
const Hero = () => {
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const scrollToPricing = () => {
    if (location.pathname !== '/') {
      window.location.href = '/#pricing';
    } else {
      const element = document.getElementById('pricing');
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  };
  return <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-4 overflow-hidden bg-[#0a0a0a]">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[#00ffc8]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-[#68b8ff]/5 rounded-full blur-[120px]" />
      </div>
      
      {/* Transparent Blue Lightning Pattern */}
      <div className="absolute inset-0 bg-[url('https://horizons-cdn.hostinger.com/01d7edfc-89f9-4948-9fde-e2f816a4738a/c4f013f043fc8c88074d83913ee03930.jpg')] bg-cover bg-center opacity-10 mix-blend-screen pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      
      <div className="container mx-auto max-w-5xl relative z-10 text-center flex flex-col items-center">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="flex flex-col items-center w-full">
          {/* Logo, H1, Subtitle, and Tracker Wrapper */}
          <div className="flex flex-col items-center text-center gap-5 mb-10 w-full max-w-[90vw] mx-auto hero-text-area">
            <div className="p-1 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm mt-4">
               <img src="https://horizons-cdn.hostinger.com/01d7edfc-89f9-4948-9fde-e2f816a4738a/78bde686ecfc7cbb80360ffe344c5069.png" alt="PhantomPath Logo" className="h-24 md:h-32 w-auto rounded-xl" />
            </div>

            <h1 className="text-[clamp(1.8rem,8vw,2.5rem)] font-black tracking-[0.1em] md:tracking-[0.2em] lg:tracking-[0.25em] uppercase leading-[1.1] text-white text-center w-full whitespace-nowrap m-0">
              PHANTOMPΑΤΗ
            </h1>
            
            {/* Subtitle updated to thinner text, letter spacing, glow only */}
            <div className="text-sm sm:text-base md:text-lg lg:text-xl text-[#00ffc8] text-glow-sharp text-center w-fit mx-auto leading-tight whitespace-nowrap mt-1 uppercase" style={{
            fontWeight: 400,
            letterSpacing: '0.05em'
          }}>
              THE PATH IS OPENING SOON
            </div>

            {/* Terminal Status Tracker */}
            <div className="w-full max-w-lg mt-4 flex flex-col items-center bg-[var(--matte-charcoal)] p-4 rounded-xl border border-white/5 shadow-xl">
              <div className="font-terminal text-[10px] sm:text-xs text-gray-300 mb-3 tracking-widest uppercase w-full flex justify-between items-center text-center">
                <span>STATUS: FINAL PROTOCOLS INITIATED...</span>
                <span className="text-[#00ffc8] font-bold ml-2">97%</span>
              </div>
              <div className="w-full h-[4px] bg-[#0a0a0a] rounded-full overflow-hidden relative shadow-inner">
                <motion.div initial={{
                width: 0
              }} animate={{
                width: "96%"
              }} transition={{
                duration: 2,
                ease: "easeOut",
                delay: 0.3
              }} className="absolute top-0 left-0 h-full bg-[#00ffc8] rounded-full animate-pulse-glow" />
              </div>
            </div>

            {/* Telegram Waitlist CTA */}
            <a
              href="https://t.me/PhantomPathOfficial"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#00ffc8]/30 bg-[#00ffc8]/10 text-[#00ffc8] text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-[#00ffc8]/20 hover:border-[#00ffc8]/50 hover:shadow-[0_0_30px_rgba(0,255,200,0.15)] transition-all duration-300"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#00ffc8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
              Join the PhantomPath encrypted Telegram channel for updates
            </a>
          </div>
          
          <h2 className="text-xl md:text-3xl font-bold mb-8 text-[#68b8ff] max-w-4xl mx-auto">
            Modern infrastructure built on the principle of least privilege. Architected for strict data minimisation. We retain only what is necessary to connect you - nothing more.
          </h2>
          
          <p className="text-base md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Experience fast, on-demand private access. Includes eSIM, high-speed data, and an integrated privacy browser with network-level ad filtering. Optional UK, USA, and selected EU numbers available. Pay-as-you-go VPN access keeps your connection secure on public Wi-Fi and ensures lawful content remains accessible - without long-term contracts.
          </p>
          
          <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
            <div className="relative group z-20" style={{
            width: '95%',
            margin: '0 auto'
          }}>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00ffc8] via-[#20b2aa] to-[#00ffc8] rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-tilt"></div>
              <Button onClick={() => navigate('/portal')} className="relative bg-gradient-to-r from-[#111] to-[#0a0a0a] border border-[#00ffc8]/50 text-white font-bold h-16 px-4 sm:px-12 rounded-full transition-all backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,200,0.4)] group-hover:shadow-[0_0_40px_rgba(0,255,200,0.7)] group-hover:scale-105 flex items-center justify-center glow-phantom glow-phantom-hover w-full">
                <span className="tracking-wider text-[#00ffc8] drop-shadow-[0_0_8px_rgba(0,255,200,0.8)] mr-3 sm:mr-4 whitespace-nowrap text-[0.9rem] sm:text-lg">
                  PHANTOMPATH PORTAL
                </span>
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#00ffc8]/20 border border-[#00ffc8]/30 group-hover:bg-[#00ffc8]/30 transition-colors shrink-0">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-[#00ffc8]" />
                </div>
              </Button>
            </div>
            
            <div className="flex flex-col items-center justify-center w-full mt-2">
              <Button onClick={scrollToPricing} className="w-full sm:w-auto bg-[#00ffc8] text-[#0a0a0a] hover:bg-[#00ffc8]/90 font-bold text-lg h-14 px-8 rounded-full transition-all hover:-translate-y-1 glow-phantom glow-phantom-hover flex justify-center items-center">
                View Access Options
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default Hero;