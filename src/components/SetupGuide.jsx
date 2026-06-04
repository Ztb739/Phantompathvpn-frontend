import React, { useState } from 'react';
import { X, Smartphone, Shield, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const mono = { fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace" };

export const EsimSetupGuide = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState('ios');
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-[#0a1120] border border-[#3affc2]/20 rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto shadow-[0_0_40px_rgba(58,255,194,0.1)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-blue-400" />
            <h3 className="text-white font-semibold" style={mono}>eSIM Setup Guide</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center"><X className="w-4 h-4 text-gray-400" /></button>
        </div>

        <div className="flex border-b border-white/5">
          <button onClick={() => setTab('ios')} className={cn("flex-1 py-3 text-xs font-bold transition-all", tab === 'ios' ? "text-[#3affc2] border-b-2 border-[#3affc2]" : "text-gray-500")} style={mono}>iOS</button>
          <button onClick={() => setTab('android')} className={cn("flex-1 py-3 text-xs font-bold transition-all", tab === 'android' ? "text-[#3affc2] border-b-2 border-[#3affc2]" : "text-gray-500")} style={mono}>Android</button>
        </div>

        <div className="p-4 space-y-3">
          {tab === 'ios' ? (
            <>
              <Step n={1} text="Go to Settings → Cellular (or Mobile Data)" />
              <Step n={2} text="Tap 'Add eSIM' or 'Add Cellular Plan'" />
              <Step n={3} text="Scan the QR code from your dashboard" />
              <Step n={4} text="Select your new Travel eSIM for Cellular Data" />
              <Step n={5} text='Ensure "Allow Cellular Data Switching" is OFF' />
              <Step n={6} text="Primary SIM → Turn Data Roaming OFF" />
              <Step n={7} text="Travel eSIM → Turn Data Roaming ON" />
            </>
          ) : (
            <>
              <Step n={1} text="Go to Settings → Network & Internet → SIMs" />
              <Step n={2} text="Tap 'Add eSIM' or 'Download SIM'" />
              <Step n={3} text="Scan the QR code from your dashboard" />
              <Step n={4} text="Set Data preference to Travel eSIM" />
              <Step n={5} text="Primary SIM → Data Roaming OFF" />
              <Step n={6} text="Travel eSIM → Data Roaming ON" />
              <Step n={7} text='Disable any "Auto Data Switching" features' />
            </>
          )}
          <div className="bg-[#050b14] rounded-lg p-3 mt-4">
            <p className="text-[#3affc2] text-[10px]" style={mono}>You should be fully connected within 30 seconds.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const VpnSetupGuide = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-[#0a1120] border border-[#3affc2]/20 rounded-2xl w-full max-w-md shadow-[0_0_40px_rgba(58,255,194,0.1)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#3affc2]" />
            <h3 className="text-white font-semibold" style={mono}>VPN Quick Start</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center"><X className="w-4 h-4 text-gray-400" /></button>
        </div>

        <div className="p-4 space-y-3">
          <Step n={1} text='Download WireGuard from App Store or Play Store' />
          <Step n={2} text='Tap "Download Config (.conf)" on your dashboard' />
          <Step n={3} text='Open WireGuard → Tap "+" → "Import from file"' />
          <Step n={4} text='Select the downloaded .conf file' />
          <Step n={5} text='Toggle the connection ON and confirm status shows "Connected"' />
          <div className="bg-[#050b14] rounded-lg p-3 mt-4">
            <p className="text-[#3affc2] text-[10px]" style={mono}>Your traffic is now encrypted via WireGuard. All DNS queries routed through our private resolver.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Step = ({ n, text }) => (
  <div className="flex items-start gap-3">
    <div className="w-6 h-6 rounded-full bg-[#3affc2]/10 border border-[#3affc2]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
      <span className="text-[#3affc2] text-[10px] font-bold" style={mono}>{n}</span>
    </div>
    <p className="text-[#e9edef] text-sm leading-relaxed">{text}</p>
  </div>
);

export default { EsimSetupGuide, VpnSetupGuide };
