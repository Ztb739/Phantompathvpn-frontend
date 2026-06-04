import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { HeaderSocialLinks } from './SocialLinks';

const Header = () => {
  const location = useLocation();
  const [legalDropdownOpen, setLegalDropdownOpen] = useState(false);

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#050b14]/80 backdrop-blur-lg border-b border-white/5 shadow-sm"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between w-full">
          {/* LEFT: Logo + Title */}
          <Link to="/" onClick={handleLogoClick} className="flex items-center gap-3 shrink-0" style={{ overflow: 'visible' }}>
            <img 
              src="https://horizons-cdn.hostinger.com/01d7edfc-89f9-4948-9fde-e2f816a4738a/78bde686ecfc7cbb80360ffe344c5069.png" 
              alt="PhantomPath Logo" 
              className="w-10 h-10 rounded-lg shadow-sm shrink-0"
            />
            <h1 
              className="font-extrabold text-white m-0 p-0 hidden lg:block"
              style={{ fontSize: '1.2rem', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}
            >
              PHANTOMPATH
            </h1>
            <h1 
              className="font-bold text-white m-0 p-0 lg:hidden"
              style={{ 
                fontSize: '3.8vw', 
                letterSpacing: '0.05em', 
                whiteSpace: 'nowrap', 
                overflow: 'visible', 
                textOverflow: 'clip',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              PHANTOMPATH
            </h1>
          </Link>
          
          {/* CENTER/RIGHT: Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-end gap-6 xl:gap-8 flex-grow">
            <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-[#00ffc8] font-medium transition-colors text-sm">Features</button>
            <button onClick={() => scrollToSection('why-choose-pp')} className="text-gray-300 hover:text-[#00ffc8] font-medium transition-colors text-sm whitespace-nowrap">Why Choose Us</button>
            <button onClick={() => scrollToSection('who-its-for')} className="text-gray-300 hover:text-[#00ffc8] font-medium transition-colors text-sm">Who It's For</button>
            
            <button onClick={() => scrollToSection('pricing')} className={`text-gray-300 hover:text-[#00ffc8] font-medium transition-colors text-sm ${location.pathname === '/pricing' ? 'text-[#00ffc8] font-bold' : ''}`}>
              Pricing
            </button>

            {/* Legal Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setLegalDropdownOpen(true)}
              onMouseLeave={() => setLegalDropdownOpen(false)}
            >
              <button className="text-gray-300 hover:text-[#00ffc8] font-medium transition-colors flex items-center gap-1 text-sm py-2">
                Legal <ChevronDown className="w-4 h-4 opacity-70" />
              </button>
              {legalDropdownOpen && (
                <div className="absolute top-full right-0 mt-0 w-64 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2">
                  <Link to="/privacy-policy" className="block px-5 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-[#00ffc8] transition-colors">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" className="block px-5 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-[#00ffc8] transition-colors">
                    Terms & Conditions
                  </Link>
                  <Link to="/refund-policy" className="block px-5 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-[#00ffc8] transition-colors">
                    Refund Policy
                  </Link>
                  <Link to="/customer-care" className="block px-5 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-[#00ffc8] transition-colors">
                    Customer Care
                  </Link>
                  <Link to="/vulnerable-persons-policy" className="block px-5 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-[#00ffc8] transition-colors">
                    Vulnerable Persons
                  </Link>
                  <Link to="/acceptable-use-policy" className="block px-5 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-[#00ffc8] transition-colors">
                    Acceptable Use
                  </Link>
                  <Link to="/cookie-policy" className="block px-5 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-[#00ffc8] transition-colors">
                    Cookie Policy
                  </Link>
                  <Link to="/adr" className="block px-5 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-[#00ffc8] transition-colors">
                    Alternative Dispute Resolution
                  </Link>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 border-l border-white/10 pl-6 xl:pl-8">
              <HeaderSocialLinks />
            </div>

            <button onClick={() => scrollToSection('pricing')} className="ml-2">
              <Button className="bg-[#00ffc8] text-[#0a0a0a] hover:bg-[#00ffc8]/90 font-bold text-sm rounded-lg px-6 shadow-[0_0_15px_rgba(0,255,200,0.3)] whitespace-nowrap">
                Become a Phantom
              </Button>
            </button>
          </nav>
          
          {/* FAR RIGHT: Mobile Nav */}
          <div className="lg:hidden flex items-center justify-end gap-5 shrink-0">
             <div className="hidden sm:flex items-center gap-3 mr-2">
              <HeaderSocialLinks />
            </div>
             <button onClick={() => scrollToSection('pricing')}>
              <Button className="bg-[#00ffc8] text-[#0a0a0a] hover:bg-[#00ffc8]/90 font-bold text-xs sm:text-sm h-9 rounded-lg px-3 sm:px-4 shadow-[0_0_10px_rgba(0,255,200,0.3)] whitespace-nowrap">
                Become a Phantom
              </Button>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;