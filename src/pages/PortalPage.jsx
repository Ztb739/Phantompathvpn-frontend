import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, ArrowRight, Smartphone, Tv, Gamepad2, Laptop, Shield, Phone, LogOut, RefreshCw, AlertTriangle, Download, Zap, MessageCircle, Globe, Tablet, Clock, Mail, PhoneCall, Users, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import MessagingPanel from '@/components/MessagingPanel';
import CallPanel from '@/components/CallPanel';
import BurnerRoomsPanel from '@/components/BurnerRoomsPanel';
import ContactsPanel from '@/components/ContactsPanel';
import { EsimSetupGuide, VpnSetupGuide } from '@/components/SetupGuide';

const API_BASE = 'https://api.phantompathvpn.com/api';
const FLAGS = { AU: '🇦🇺', GB: '🇬🇧', US: '🇺🇸', DE: '🇩🇪', CA: '🇨🇦', JP: '🇯🇵', NL: '🇳🇱', SG: '🇸🇬', FR: '🇫🇷', AE: '🇦🇪', IN: '🇮🇳', IE: '🇮🇪' };

const PortalPage = () => {
  const [accessCode, setAccessCode] = useState('');
  const [view, setView] = useState(() => localStorage.getItem('pp_token') ? 'dashboard' : 'login');
  const [sessionToken, setSessionToken] = useState(() => localStorage.getItem('pp_token') || '');
  const [codeHash, setCodeHash] = useState(() => localStorage.getItem('pp_hash') || '');
  const [services, setServices] = useState([]);
  const [wallet, setWallet] = useState({ balance: 0, currency: 'GBP' });
  const [vpnNodes, setVpnNodes] = useState([]);
  const [expiresAt, setExpiresAt] = useState(() => localStorage.getItem('pp_expires') || '');
  const [switchCode, setSwitchCode] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showEsimGuide, setShowEsimGuide] = useState(false);
  const [showVpnGuide, setShowVpnGuide] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [servicesError, setServicesError] = useState('');
  const { toast } = useToast();
  const inputRef = useRef(null);

  // Persist session
  useEffect(() => {
    if (sessionToken) { localStorage.setItem('pp_token', sessionToken); localStorage.setItem('pp_hash', codeHash); localStorage.setItem('pp_expires', expiresAt); }
  }, [sessionToken, codeHash, expiresAt]);

  // Restore session on mount
  useEffect(() => {
    if (sessionToken && view === 'dashboard') {
      if (sessionToken === 'demo-token') {
        const d = new Date(); d.setDate(d.getDate() + 30);
        setExpiresAt(d.toISOString());
        setServices([
          { id: 'demo-vpn', type: 'VPN', status: 'ACTIVE', expiresAt: d.toISOString() },
          { id: 'demo-esim', type: 'ESIM', status: 'ACTIVE', expiresAt: d.toISOString(), esimDetails: { iccid: 'DEMO-8944500000000001', activationCode: 'DEMO', qrData: '', status: 'ACTIVE' } },
          { id: 'demo-vnum', type: 'VIRTUAL_NUMBER', status: 'ACTIVE', expiresAt: d.toISOString(), numberDetails: { phoneNumber: '+44 115 661 2336', smsEnabled: true, voiceEnabled: true, status: 'ACTIVE' } },
        ]);
        setWallet({ balance: 5.00, currency: 'GBP' });
        setVpnNodes([{ id: 'demo-au', name: 'australia-sydney-1', country: 'Australia', countryCode: 'AU', city: 'Sydney', status: 'ONLINE', load: 12 }]);
      } else {
        loadServices(sessionToken, codeHash);
        loadVpnNodes(sessionToken, codeHash);
      }
    }
  }, []);

  useEffect(() => { if (view === 'login' && inputRef.current) { inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }); inputRef.current.focus({ preventScroll: true }); } }, [view]);

  // Scroll to top when switching tabs
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeTab]);

  // PWA Back button navigation
  useEffect(() => {
    window.history.pushState({ page: 'dashboard' }, '', window.location.href);
    const handlePopState = () => {
      if (activeTab !== 'dashboard') {
        setActiveTab('dashboard');
        window.history.pushState({ page: 'dashboard' }, '', window.location.href);
      } else {
        window.history.pushState({ page: 'dashboard' }, '', window.location.href);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeTab, view]);

  // Navigate to tab with scroll reset
  const navigateToTab = (tab) => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.history.pushState({ tab }, '', window.location.href);
    setActiveTab(tab);
  };

  const hdrs = (t, h) => ({ 'x-session-token': t || sessionToken, 'x-code-hash': h || codeHash });
  const comingSoon = () => toast({ title: 'Private Beta', description: 'Payments are disabled during the private beta. Coming soon.' });

  const handleConnect = async (e) => {
    e.preventDefault();
    if (!accessCode.trim()) { toast({ title: 'Access Code Required', description: 'Please enter your PhantomPath access code.', variant: 'destructive' }); return; }
    setError(''); setView('loading');
    if (accessCode === '19961730') {
      setSessionToken('demo-token'); setCodeHash('demo-hash');
      const d = new Date(); d.setDate(d.getDate() + 30);
      setExpiresAt(d.toISOString());
      setServices([
        { id: 'demo-vpn', type: 'VPN', status: 'ACTIVE', expiresAt: d.toISOString() },
        { id: 'demo-esim', type: 'ESIM', status: 'ACTIVE', expiresAt: d.toISOString(), esimDetails: { iccid: 'DEMO-8944500000000001', activationCode: 'DEMO', qrData: '', status: 'ACTIVE' } },
        { id: 'demo-vnum', type: 'VIRTUAL_NUMBER', status: 'ACTIVE', expiresAt: d.toISOString(), numberDetails: { phoneNumber: '+44 115 661 2336', smsEnabled: true, voiceEnabled: true, status: 'ACTIVE' } },
      ]);
      setWallet({ balance: 5.00, currency: 'GBP' });
      setVpnNodes([{ id: 'demo-au', name: 'australia-sydney-1', country: 'Australia', countryCode: 'AU', city: 'Sydney', status: 'ONLINE', load: 12 }]);
      setView('dashboard'); toast({ title: 'Path Established', description: 'Secure tunnel active. Welcome, Ghost.' }); return;
    }
    try {
      const res = await fetch(`${API_BASE}/portal/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: accessCode }) });
      const data = await res.json();
      if (res.status === 429) { setError(data.message || 'Too many attempts.'); setView('login'); toast({ title: 'Locked Out', description: data.message, variant: 'destructive' }); return; }
      if (res.status === 401) { setError(data.message || 'Invalid access code'); setView('login'); toast({ title: 'Access Denied', description: data.message, variant: 'destructive' }); return; }
      if (data.activeSession) { setSwitchCode(accessCode); setView('switch'); return; }
      if (data.token) { setSessionToken(data.token); setCodeHash(data.codeHash); setExpiresAt(data.accessCodeExpiresAt); setView('dashboard'); loadServices(data.token, data.codeHash); loadVpnNodes(data.token, data.codeHash); toast({ title: 'Path Established', description: 'Secure tunnel active. Welcome, Ghost.' }); }
      else { setError(data.message || 'Access denied'); setView('login'); }
    } catch (err) { setError('Connection failed. Check your network.'); setView('login'); }
  };

  const handleSwitch = async () => {
    setView('loading');
    try { const res = await fetch(`${API_BASE}/portal/confirm-switch`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: switchCode }) }); const data = await res.json(); if (data.token) { setSessionToken(data.token); setCodeHash(data.codeHash); setExpiresAt(data.accessCodeExpiresAt); setView('dashboard'); loadServices(data.token, data.codeHash); loadVpnNodes(data.token, data.codeHash); toast({ title: 'Device Switched' }); } } catch (err) { setView('login'); }
  };

  const loadServices = async (t, h) => { try { const res = await fetch(`${API_BASE}/portal/services`, { headers: hdrs(t, h) }); const data = await res.json(); if (data.services) setServices(data.services); if (data.wallet) setWallet(data.wallet); } catch (err) {} };
  const loadVpnNodes = async (t, h) => { try { const res = await fetch(`${API_BASE}/portal/vpn-nodes`, { headers: hdrs(t, h) }); const data = await res.json(); if (data.nodes) setVpnNodes(data.nodes); } catch (err) {} };
  const switchVpnNode = async (sid, nid, country) => { toast({ title: 'Switching...', description: `Connecting to ${country}...` }); try { const res = await fetch(`${API_BASE}/portal/vpn-switch`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...hdrs() }, body: JSON.stringify({ serviceId: sid, targetNodeId: nid }) }); const data = await res.json(); if (data.success) { toast({ title: 'Server Switched' }); loadServices(sessionToken, codeHash); } } catch (err) {} };
  const downloadVpnConfig = async (sid) => { try { const res = await fetch(`${API_BASE}/portal/vpn-config/${sid}`, { headers: hdrs() }); if (!res.ok) throw new Error(); const blob = await res.blob(); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'phantompath.conf'; a.click(); URL.revokeObjectURL(a.href); toast({ title: 'Config Downloaded' }); } catch (err) { toast({ title: 'Not Available', variant: 'destructive' }); } };
  const handleLogout = () => { localStorage.removeItem('pp_token'); localStorage.removeItem('pp_hash'); localStorage.removeItem('pp_expires'); setSessionToken(''); setCodeHash(''); setServices([]); setWallet({ balance: 0, currency: 'GBP' }); setVpnNodes([]); setAccessCode(''); setError(''); setActiveTab('dashboard'); setView('login'); };

  const schemaPortal = { '@context': 'https://schema.org', '@type': 'WebPage', 'name': 'PhantomPath Portal', 'url': 'https://phantompathvpn.com/portal' };
  const daysLeft = expiresAt ? Math.max(0, Math.ceil((new Date(expiresAt) - new Date()) / 86400000)) : 0;
  const msgCost = 0.05;
  const minCost = 0.10;
  const messagesRemaining = Math.floor(wallet.balance / msgCost);
  const minutesRemaining = Math.floor(wallet.balance / minCost);
  const mono = { fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace" };

  /* LOGIN */
  if (view === 'login') return (
    <div className="h-screen w-full flex items-center justify-center bg-[#050b14] p-4 relative overflow-hidden">
      <Helmet><title>PhantomPath Portal | Secure Access Gateway</title><meta name="description" content="Log into your secure PhantomPath Portal." /><meta name="robots" content="index, follow" /><link rel="canonical" href="https://phantompathvpn.com/portal" /><script type="application/ld+json">{JSON.stringify(schemaPortal)}</script></Helmet>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none"><div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[#3affc2]/10 rounded-full blur-[120px]" /><div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-[#0ea5e9]/10 rounded-full blur-[120px]" /></div>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="w-full max-w-sm relative z-10">
        <div className="bg-[#0a1120]/95 backdrop-blur-2xl p-6 md:p-8 border border-[#3affc2]/20 shadow-[0_0_60px_rgba(58,255,194,0.15)] flex flex-col items-center text-center relative overflow-hidden rounded-2xl">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#3affc2] to-transparent opacity-70" />
          <div className="w-12 h-12 rounded-lg bg-[#050b14] border border-[#3affc2]/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(58,255,194,0.15)] relative group"><div className="absolute inset-0 bg-[#3affc2] blur-xl opacity-20 rounded-lg group-hover:opacity-40 transition-opacity" /><Lock className="w-6 h-6 text-[#3affc2] relative z-10" /></div>
          <h1 className="text-xl md:text-2xl font-black text-[#3affc2] mb-1 tracking-tight drop-shadow-[0_0_10px_rgba(58,255,194,0.3)]" style={mono}>PHANTOMPATH PORTAL</h1>
          <p className="text-gray-400 mb-6 text-sm">Secure Access Gateway</p>
          <form onSubmit={handleConnect} className="w-full flex flex-col gap-3 mb-6 relative z-20">
            <div className="relative group mb-3"><div className="absolute -inset-0.5 bg-gradient-to-r from-[#3affc2] to-[#0ea5e9] rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-500" /><Input ref={inputRef} type="text" placeholder="Enter Access Code" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} className="relative w-full h-11 bg-[#050b14] border border-white/10 text-white placeholder:text-gray-500 text-center text-base rounded-lg focus-visible:ring-1 focus-visible:ring-[#3affc2]/50 focus-visible:border-[#3affc2] transition-all" style={{ ...mono, letterSpacing: '3px' }} /></div>
            {error && <p className="text-red-400 text-xs text-center">{error}</p>}
            <Button type="submit" className="w-full h-11 bg-[#3affc2] text-[#050b14] hover:bg-[#2ee6ae] font-bold text-base rounded-lg transition-all group mt-1 glow-phantom glow-phantom-hover">Become a Phantom <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Button>
            <p className="text-xs text-gray-400 mt-3 text-center" style={mono}>[SIGNAL_LOCKED] // ENCRYPTION: AES-256 // STATUS: READY_TO_STRIKE</p>
          </form>
          <div className="w-full pt-6 border-t border-white/5 flex flex-col items-center relative z-20"><div className="flex items-center justify-center gap-5 mb-3 text-[#3affc2]/60"><Smartphone className="w-4 h-4" /><Laptop className="w-4 h-4" /><Tablet className="w-4 h-4" /><Gamepad2 className="w-4 h-4" /><Zap className="w-4 h-4" /><Tv className="w-4 h-4" /></div><p className="text-[11px] text-gray-500 max-w-[240px] font-medium leading-normal uppercase tracking-wider">Available on multiple platforms</p></div>
        </div>
      </motion.div>
    </div>
  );

  if (view === 'loading') return (<div className="h-screen w-full flex items-center justify-center bg-[#050b14]"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4"><div className="w-10 h-10 rounded-full animate-spin" style={{ border: '3px solid rgba(58,255,194,0.15)', borderTopColor: '#3affc2' }} /><p className="text-gray-400 text-sm tracking-wider" style={mono}>ESTABLISHING SECURE TUNNEL...</p></motion.div></div>);

  if (view === 'switch') return (
    <div className="h-screen w-full flex items-center justify-center bg-[#050b14] p-4 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm relative z-10">
        <div className="bg-[#0a1120]/95 backdrop-blur-2xl p-6 md:p-8 border border-amber-500/30 flex flex-col items-center text-center rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-70" />
          <AlertTriangle className="w-10 h-10 text-amber-400 mb-4" /><h2 className="text-lg font-bold text-white mb-2">Active Session Detected</h2><p className="text-gray-400 text-sm mb-4">Switch to this device? Previous session will be terminated.</p>
          <div className="flex gap-3 w-full"><Button onClick={() => { setView('login'); setError(''); }} variant="outline" className="flex-1 h-11 border-white/10 text-gray-400">Cancel</Button><Button onClick={handleSwitch} className="flex-1 h-11 bg-amber-500 text-black font-bold">Switch Device</Button></div>
        </div>
      </motion.div>
    </div>
  );

  /* DASHBOARD */
  const vpnService = services.find((s) => s.type === 'VPN');
  const esimService = services.find((s) => s.type === 'ESIM');
  const vnumService = services.find((s) => s.type === 'VIRTUAL_NUMBER');

  if (activeTab === 'messages' && vnumService && vnumService.numberDetails) return (
    <div className="fixed inset-0 z-50 bg-[#050b14] flex flex-col pt-16"><Helmet><title>PhantomPath | Messages</title></Helmet><div className="flex-1 flex flex-col min-h-0"><MessagingPanel sessionToken={sessionToken} codeHash={codeHash} virtualNumber={vnumService.numberDetails.phoneNumber} virtualNumberId={vnumService.id} onClose={() => setActiveTab('dashboard')} /></div></div>
  );

  if (activeTab === 'calls' && vnumService && vnumService.numberDetails) return (
    <div className="fixed inset-0 z-50 bg-[#050b14] flex flex-col pt-16"><Helmet><title>PhantomPath | Calls</title></Helmet><div className="flex-1 flex flex-col min-h-0"><CallPanel sessionToken={sessionToken} codeHash={codeHash} virtualNumber={vnumService.numberDetails.phoneNumber} virtualNumberId={vnumService.id} onClose={() => setActiveTab('dashboard')} /></div></div>
  );

  if (activeTab === 'rooms') return (
    <div className="fixed inset-0 z-50 bg-[#050b14] flex flex-col pt-16"><Helmet><title>PhantomPath | Group Chat</title></Helmet><div className="flex-1 flex flex-col min-h-0"><BurnerRoomsPanel sessionToken={sessionToken} codeHash={codeHash} onClose={() => setActiveTab('dashboard')} /></div></div>
  );

  if (activeTab === 'contacts') return (
    <div className="fixed inset-0 z-50 bg-[#050b14] flex flex-col pt-16"><Helmet><title>PhantomPath | Contacts</title></Helmet><div className="flex-1 flex flex-col min-h-0"><ContactsPanel sessionToken={sessionToken} codeHash={codeHash} onClose={() => setActiveTab('dashboard')} /></div></div>
  );

  return (
    <div className="min-h-screen bg-[#050b14] pt-16 px-4 flex flex-col relative overflow-hidden">
      <Helmet><title>PhantomPath Portal | Dashboard</title></Helmet>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="flex-1 flex flex-col justify-center container mx-auto max-w-5xl relative z-10 py-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3affc2] shadow-[0_0_10px_rgba(58,255,194,0.6)] animate-pulse" />
            <div><h1 className="text-[#3affc2] font-bold text-lg tracking-tight leading-none" style={mono}>PHANTOMPATH</h1><p className="text-gray-600 text-[11px] mt-0.5" style={mono}>Secure · {daysLeft} days remaining · 1 device</p></div>
          </div>
          <button onClick={handleLogout} className="h-8 px-3 rounded-lg border border-white/10 text-gray-500 hover:text-white hover:border-red-500/30 text-xs flex items-center gap-1.5 transition-all" style={mono}><LogOut className="w-3.5 h-3.5" />Exit</button>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            {/* Session Status */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-[#0a1120] border border-white/5 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-[#3affc2]/10 border border-[#3affc2]/20 flex items-center justify-center"><Clock className="w-4.5 h-4.5 text-[#3affc2]" /></div><div><h3 className="text-white font-semibold text-sm">Session Status</h3><p className="text-gray-600 text-[10px]">Active Pass</p></div></div>
                <span className="text-[10px] font-bold text-[#3affc2] bg-[#3affc2]/10 border border-[#3affc2]/20 px-2.5 py-1 rounded-lg" style={mono}>ACTIVE</span>
              </div>
              <div className="bg-[#050b14] rounded-xl p-4 grid grid-cols-3 gap-3 mb-4">
                <div className="text-center"><p className="text-gray-600 text-[8px] uppercase tracking-widest mb-1.5" style={mono}>Expires In</p><p className="text-[#3affc2] text-2xl font-bold" style={mono}>{daysLeft}</p><p className="text-gray-600 text-[9px]" style={mono}>days</p></div>
                <div className="text-center border-x border-white/5"><p className="text-gray-600 text-[8px] uppercase tracking-widest mb-1.5" style={mono}>Messages</p><p className="text-amber-400 text-2xl font-bold" style={mono}>{messagesRemaining}</p><p className="text-gray-600 text-[9px]" style={mono}>remaining</p></div>
                <div className="text-center"><p className="text-gray-600 text-[8px] uppercase tracking-widest mb-1.5" style={mono}>Minutes</p><p className="text-purple-400 text-2xl font-bold" style={mono}>{minutesRemaining}</p><p className="text-gray-600 text-[9px]" style={mono}>remaining</p></div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={comingSoon} className="h-9 bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#f59e0b] hover:bg-[#f59e0b]/20 hover:border-[#f59e0b]/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] active:scale-95 text-[10px] rounded-xl flex items-center justify-center gap-1 transition-all" style={mono}><Mail className="w-3 h-3" />Add Msgs</button>
                <button onClick={comingSoon} className="h-9 bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#f59e0b] hover:bg-[#f59e0b]/20 hover:border-[#f59e0b]/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] active:scale-95 text-[10px] rounded-xl flex items-center justify-center gap-1 transition-all" style={mono}><PhoneCall className="w-3 h-3" />Add Mins</button>
                <button onClick={comingSoon} className="h-9 bg-[#3affc2]/15 border border-[#3affc2]/30 text-[#3affc2] hover:bg-[#3affc2]/25 hover:border-[#3affc2]/50 hover:shadow-[0_0_20px_rgba(58,255,194,0.2)] active:scale-95 text-[10px] rounded-xl flex items-center justify-center gap-1 transition-all animate-pulse" style={mono}><Zap className="w-3 h-3" />Extend</button>
              </div>
            </motion.div>
            {/* Virtual Number */}
            {vnumService && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#0a1120] border border-white/5 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center"><Phone className="w-4.5 h-4.5 text-amber-400" /></div><div><h3 className="text-white font-semibold text-sm">Virtual Number</h3><p className="text-gray-600 text-[10px]">Private communication line</p></div></div>
                  <span className="text-[10px] font-bold text-[#3affc2] bg-[#3affc2]/10 border border-[#3affc2]/20 px-2.5 py-1 rounded-lg" style={mono}>{vnumService.status}</span>
                </div>
                {vnumService.numberDetails ? (
                  <div className="space-y-3">
                    <div className="bg-[#050b14] rounded-xl p-4 flex items-center justify-between">
                      <div><p className="text-gray-600 text-[9px] uppercase tracking-widest mb-1" style={mono}>Your Number</p><p className="text-amber-400 text-xl font-bold tracking-wider" style={mono}>{vnumService.numberDetails.phoneNumber}</p></div>
                      <div className="flex gap-2">
                        <div className="bg-[#0a1120] rounded-lg px-3 py-2 text-center border border-white/5"><p className="text-gray-600 text-[8px] uppercase" style={mono}>SMS</p><p className={`text-xs font-bold ${vnumService.numberDetails.smsEnabled ? 'text-[#3affc2]' : 'text-gray-600'}`} style={mono}>{vnumService.numberDetails.smsEnabled ? 'ON' : 'OFF'}</p></div>
                        <div className="bg-[#0a1120] rounded-lg px-3 py-2 text-center border border-white/5"><p className="text-gray-600 text-[8px] uppercase" style={mono}>Voice</p><p className={`text-xs font-bold ${vnumService.numberDetails.voiceEnabled ? 'text-[#3affc2]' : 'text-gray-600'}`} style={mono}>{vnumService.numberDetails.voiceEnabled ? 'ON' : 'OFF'}</p></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <button onClick={() => navigateToTab('messages')} className="h-10 bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 active:scale-95 text-[11px] rounded-xl flex items-center justify-center gap-1.5 transition-all" style={mono}><MessageCircle className="w-3.5 h-3.5" />Messages</button>
                      <button onClick={() => navigateToTab('calls')} className="h-10 bg-[#3affc2]/10 border border-[#3affc2]/20 text-[#3affc2] hover:bg-[#3affc2]/20 active:scale-95 text-[11px] rounded-xl flex items-center justify-center gap-1.5 transition-all" style={mono}><Phone className="w-3.5 h-3.5" />Calls</button>
                      <button onClick={() => navigateToTab('rooms')} className="h-10 bg-[#6B5CE7]/10 border border-[#6B5CE7]/20 text-[#6B5CE7] hover:bg-[#6B5CE7]/20 active:scale-95 text-[11px] rounded-xl flex items-center justify-center gap-1.5 transition-all" style={mono}><Users className="w-3.5 h-3.5" />Rooms</button>
                    </div>
                    <button onClick={() => navigateToTab('contacts')} className="w-full h-9 bg-[#050b14] border border-white/10 text-gray-400 hover:text-amber-400 hover:border-amber-400/20 text-[10px] rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95" style={mono}><Users className="w-3 h-3" />Contacts</button>
                  </div>
                ) : (<div className="bg-[#050b14] border border-dashed border-white/10 rounded-xl p-5 text-center"><p className="text-gray-600 text-xs" style={mono}>Provisioning...</p></div>)}
              </motion.div>
            )}
          </div>
          <div className="space-y-4">
            {/* VPN */}
            {vpnService && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-[#0a1120] border border-white/5 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-[#3affc2]/10 border border-[#3affc2]/20 flex items-center justify-center"><Shield className="w-4.5 h-4.5 text-[#3affc2]" /></div><div><h3 className="text-white font-semibold text-sm">VPN Service</h3><p className="text-gray-600 text-[10px]">WireGuard Encrypted Tunnel</p></div></div>
                  <span className="text-[10px] font-bold text-[#3affc2] bg-[#3affc2]/10 border border-[#3affc2]/20 px-2.5 py-1 rounded-lg" style={mono}>{vpnService.status}</span>
                </div>
                {vpnService.status === 'ACTIVE' ? (
                  <div className="space-y-3">
                    <button onClick={() => downloadVpnConfig(vpnService.id)} className="w-full h-10 bg-[#3affc2]/10 border border-[#3affc2]/15 text-[#3affc2] hover:bg-[#3affc2]/20 text-xs rounded-xl flex items-center justify-center gap-2 transition-all" style={mono}><Download className="w-4 h-4" />Download Config (.conf)</button>
                    {vpnNodes.length > 0 && (<div><p className="text-gray-600 text-[10px] mb-2 uppercase tracking-widest" style={mono}>Switch Server</p><div className="grid grid-cols-2 gap-2">{vpnNodes.map((n) => (<button key={n.id} onClick={() => switchVpnNode(vpnService.id, n.id, n.country)} className="bg-[#050b14] border border-white/5 rounded-xl py-2.5 px-3 hover:border-[#3affc2]/30 hover:bg-[#3affc2]/5 transition-all flex items-center gap-2.5"><span className="text-xl">{FLAGS[n.countryCode] || '🌍'}</span><div className="text-left"><span className="text-white text-xs font-medium block">{n.country}</span><span className="text-gray-600 text-[10px]">{n.city}</span></div></button>))}</div></div>)}
                  </div>
                ) : (<div className="bg-[#050b14] border border-dashed border-white/10 rounded-xl p-5 text-center"><p className="text-gray-600 text-xs" style={mono}>Provisioning...</p></div>)}
              </motion.div>
            )}
            {/* eSIM */}
            {esimService && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#0a1120] border border-white/5 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center"><Smartphone className="w-4.5 h-4.5 text-blue-400" /></div><div><h3 className="text-white font-semibold text-sm">eSIM Data</h3><p className="text-gray-600 text-[10px]">Mobile data via eSIM</p></div></div>
                  <span className="text-[10px] font-bold text-[#3affc2] bg-[#3affc2]/10 border border-[#3affc2]/20 px-2.5 py-1 rounded-lg" style={mono}>{esimService.status}</span>
                </div>
                {esimService.esimDetails ? (
                  <div className="space-y-3">
                    {esimService.esimDetails.qrData ? (
                      <div className="flex items-center gap-4"><div className="bg-white rounded-xl p-2.5 shadow-lg"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(esimService.esimDetails.qrData)}`} alt="eSIM QR" className="w-28 h-28" /></div><div className="flex-1"><p className="text-gray-500 text-[11px] leading-relaxed">Scan this QR code in <span className="text-white">Settings → Cellular → Add eSIM</span> to install your data plan.</p><p className="text-[10px] text-gray-600 mt-2" style={mono}>ICCID: <span className="text-blue-400">{esimService.esimDetails.iccid || '...'}</span></p></div></div>
                    ) : (
                      <div className="bg-[#050b14] border border-dashed border-white/10 rounded-xl p-5 text-center"><p className="text-gray-500 text-sm mb-1" style={mono}>QR pending activation</p><p className="text-[10px] text-gray-600" style={mono}>ICCID: <span className="text-blue-400">{esimService.esimDetails.iccid || '...'}</span></p></div>
                    )}
                  </div>
                ) : (<div className="bg-[#050b14] border border-dashed border-white/10 rounded-xl p-5 text-center"><p className="text-gray-600 text-xs" style={mono}>Provisioning...</p></div>)}
              </motion.div>
            )}
          </div>
        </div>
        {services.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0a1120] border border-white/5 rounded-2xl p-8 text-center mt-4">
            <p className="text-gray-600 text-sm mb-2" style={mono}>Provisioning services...</p>
            <Button onClick={() => loadServices(sessionToken, codeHash)} variant="outline" size="sm" className="border-white/10 text-gray-500 h-7 text-xs"><RefreshCw className="w-3 h-3 mr-1" />Refresh</Button>
          </motion.div>
        )}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="text-center mt-6">
          <p className="text-gray-800 text-[9px] tracking-widest" style={mono}>ENCRYPTED · WIREGUARD · EPHEMERAL</p>
        </motion.div>
      </div>
    </div>
  );
};

export default PortalPage;