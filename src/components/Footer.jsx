import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8 px-4 text-sm text-gray-400">
      <div className="container mx-auto max-w-7xl flex flex-col items-center text-center space-y-6">
        <div className="space-y-1">
          <p className="font-bold text-white text-lg mb-2">PhantomPathVPN</p>
          <p>© 2026 PhantomPathVPN Ltd</p>
          <p>Company No: 16958507 | ICO Registration: ZC089271</p>
          <p>Registered Address: 6 Roger Street, Treboeth, Swansea SA5 9AS</p>
          <p>Email: <a href="mailto:support@phantompathvpn.com" className="text-[#3affc2] hover:underline">support@phantompathvpn.com</a> | Phone: <a href="tel:03333130127" className="text-[#3affc2] hover:underline">0333 313 0127</a></p>
        </div>
        
        <p className="max-w-2xl text-xs">
          Communications service provider operating under the UK electronic communications general authorisation framework.
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-xs mt-4">
          <Link to="/privacy-policy" className="hover:text-[#3affc2] transition-colors">Privacy Policy</Link>
          <span>|</span>
          <Link to="/terms-and-conditions" className="hover:text-[#3affc2] transition-colors">Terms & Conditions</Link>
          <span>|</span>
          <Link to="/acceptable-use-policy" className="hover:text-[#3affc2] transition-colors">Acceptable Use Policy</Link>
          <span>|</span>
          <Link to="/refund-policy" className="hover:text-[#3affc2] transition-colors">Refund Policy</Link>
          <span>|</span>
          <Link to="/complaints" className="hover:text-[#3affc2] transition-colors">Customer Care</Link>
          <span>|</span>
          <Link to="/adr" className="hover:text-[#3affc2] transition-colors">ADR</Link>
          <span>|</span>
          <Link to="/cookie-policy" className="hover:text-[#3affc2] transition-colors">Cookie Policy</Link>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 w-full max-w-4xl mx-auto">
          <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed text-center">
            <strong className="text-red-400 font-medium">IMPORTANT:</strong> PhantomPath numbers DO NOT support emergency calling (999, 112, or 911). You must maintain an alternative means of contacting emergency services. Services provided via licensed upstream partners including Telnyx and eSIM Go.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;