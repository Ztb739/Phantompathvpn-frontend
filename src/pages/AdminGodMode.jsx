import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useToast } from '@/hooks/use-toast';

const API_BASE = 'https://api.phantompathvpn.com/api';
const ADMIN_PATH = 'pp-ctrl-9x7k';
const mono = { fontFamily: "'Courier New', Courier, monospace" };

const PASS_TYPES = [
  { label: 'VPN Only', sku: 'vpn-only', services: ['VPN'], price: 2.00 },
  { label: 'VPN + eSIM', sku: 'vpn-esim', services: ['VPN', 'ESIM'], price: 3.00 },
  { label: 'Full Privacy Pack', sku: 'full-pack', services: ['VPN', 'ESIM', 'VIRTUAL_NUMBER'], price: 5.00 },
];

const DURATIONS = [
  { label: '1 Hour', days: 0.042 },
  { label: '24 Hours', days: 1 },
  { label: '7 Days', days: 7 },
  { label: '14 Days', days: 14 },
  { label: '30 Days', days: 30 },
  { label: '90 Days', days: 90 },
];

const AdminGodMode = () => {
  const { toast } = useToast();
  const [token, setToken] = useState(() => localStorage.getItem('gm_token') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPass, setSelectedPass] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(4);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [loginError, setLoginError] = useState('');
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('gm_history') || '[]'); } catch { return []; }
  });

  useEffect(() => { if (token) localStorage.setItem('gm_token', token); else localStorage.removeItem('gm_token'); }, [token]);
  useEffect(() => { localStorage.setItem('gm_history', JSON.stringify(history)); }, [history]);

  const handleLogin = async () => {
    setLoginError('');
    try {
      const res = await fetch(`${API_BASE}/${ADMIN_PATH}/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.token) { setToken(data.token); toast({ title: 'Authenticated' }); }
      else { setLoginError(data.message || 'Login failed'); }
    } catch (err) { setLoginError('Connection failed'); }
  };

  const generateCode = async () => {
    setGenerating(true); setResult(null);
    const pass = PASS_TYPES[selectedPass];
    const duration = DURATIONS[selectedDuration];
    try {
      const res = await fetch(`${API_BASE}/${ADMIN_PATH}/generate-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ productSku: pass.sku, amount: pass.price, durationDays: duration.days, services: pass.services }),
      });
      if (res.status === 401) { setToken(''); toast({ title: 'Session expired', variant: 'destructive' }); setGenerating(false); return; }
      const data = await res.json();
      if (data.accessCode) {
        setResult(data);
        setHistory(prev => [{ ...data, passType: pass.label, duration: duration.label, generatedAt: new Date().toISOString() }, ...prev]);
        toast({ title: 'Code Generated' });
      } else { toast({ title: 'Error', description: data.message, variant: 'destructive' }); }
    } catch (err) { toast({ title: 'Error', description: 'Generation failed', variant: 'destructive' }); }
    setGenerating(false);
  };

  const logout = () => { setToken(''); localStorage.removeItem('gm_token'); };

  if (!token) return (
    <div className="min-h-screen bg-[#050b14] flex items-center justify-center p-4 pt-24">
      <Helmet><title>God Mode | PhantomPath Admin</title></Helmet>
      <div className="w-full max-w-sm bg-[#0a1120] border border-red-500/20 rounded-2xl p-6">
        <h1 className="text-red-400 text-lg font-bold mb-1 text-center" style={mono}>GOD MODE</h1>
        <p className="text-gray-500 text-xs text-center mb-6" style={mono}>Admin Authentication Required</p>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full h-10 bg-[#050b14] border border-white/10 text-white placeholder:text-gray-600 text-sm rounded-lg px-4 mb-3 outline-none focus:border-red-500/50" style={mono} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }} type="password" placeholder="Password" className="w-full h-10 bg-[#050b14] border border-white/10 text-white placeholder:text-gray-600 text-sm rounded-lg px-4 mb-3 outline-none focus:border-red-500/50" style={mono} />
        {loginError && <p className="text-red-400 text-xs text-center mb-3" style={mono}>{loginError}</p>}
        <button onClick={handleLogin} className="w-full h-10 bg-red-500/20 border border-red-500/40 text-red-400 font-bold text-sm rounded-lg hover:bg-red-500/30 active:scale-95 transition-all" style={mono}>Authenticate</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050b14] p-4 md:p-8 pt-28">
      <Helmet><title>God Mode | PhantomPath Admin</title></Helmet>
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#0a1120] border border-red-500/20 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-red-400 text-lg font-bold" style={mono}>GOD MODE</h1>
              <p className="text-gray-500 text-xs" style={mono}>Access Code Generator</p>
            </div>
            <button onClick={logout} className="text-gray-500 text-xs hover:text-red-400 transition-colors" style={mono}>Logout</button>
          </div>

          <div className="mb-5">
            <p className="text-white/60 text-[10px] uppercase tracking-widest mb-2" style={mono}>Pass Type</p>
            <div className="grid grid-cols-3 gap-2">
              {PASS_TYPES.map((p, i) => (
                <button key={i} onClick={() => setSelectedPass(i)} className={`h-16 rounded-lg border text-xs flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${selectedPass === i ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-[#050b14] border-white/10 text-gray-400 hover:border-white/20'}`} style={mono}>
                  <span className="font-bold">{p.label}</span>
                  <span className="text-[10px] opacity-60">£{p.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-white/60 text-[10px] uppercase tracking-widest mb-2" style={mono}>Duration</p>
            <div className="grid grid-cols-3 gap-2">
              {DURATIONS.map((d, i) => (
                <button key={i} onClick={() => setSelectedDuration(i)} className={`h-10 rounded-lg border text-xs transition-all active:scale-95 ${selectedDuration === i ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-[#050b14] border-white/10 text-gray-400 hover:border-white/20'}`} style={mono}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={generateCode} disabled={generating} className="w-full h-12 bg-red-500/20 border border-red-500/40 text-red-400 font-bold text-sm rounded-xl hover:bg-red-500/30 active:scale-95 transition-all disabled:opacity-50" style={mono}>
            {generating ? 'Generating...' : '⚡ GENERATE ACCESS CODE'}
          </button>

          {result && (
            <div className="bg-[#050b14] border border-[#3affc2]/30 rounded-xl p-5 mt-4 space-y-3">
              <div>
                <p className="text-[#3affc2]/60 text-[10px] uppercase tracking-widest mb-1" style={mono}>Access Code</p>
                <p className="text-[#3affc2] text-lg font-bold break-all select-all" style={mono}>{result.accessCode}</p>
              </div>
              {result.secretKey && (
                <div>
                  <p className="text-[#FFE600]/60 text-[10px] uppercase tracking-widest mb-1" style={mono}>Secret Key</p>
                  <p className="text-[#FFE600] text-base font-bold select-all" style={mono}>{result.secretKey}</p>
                </div>
              )}
              <div className="flex gap-3 text-[10px]" style={mono}>
                <span className="text-gray-500">Expires: {new Date(result.expiresAt).toLocaleDateString()}</span>
                <span className="text-gray-500">Services: {result.services?.map(s => s.type).join(', ')}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => { navigator.clipboard.writeText(result.accessCode); toast({ title: 'Copied' }); }} className="h-8 px-4 bg-[#3affc2]/10 border border-[#3affc2]/30 text-[#3affc2] text-xs rounded-lg hover:bg-[#3affc2]/20 active:scale-95 transition-all" style={mono}>Copy Code</button>
                {result.secretKey && <button onClick={() => { navigator.clipboard.writeText(result.secretKey); toast({ title: 'Copied' }); }} className="h-8 px-4 bg-[#FFE600]/10 border border-[#FFE600]/30 text-[#FFE600] text-xs rounded-lg hover:bg-[#FFE600]/20 active:scale-95 transition-all" style={mono}>Copy Key</button>}
              </div>
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="bg-[#0a1120] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-white/60 text-[10px] uppercase tracking-widest" style={mono}>Generation History ({history.length})</p>
              <button onClick={() => { setHistory([]); toast({ title: 'History cleared' }); }} className="text-gray-600 text-[10px] hover:text-red-400 transition-colors" style={mono}>Clear</button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {history.map((h, i) => (
                <div key={i} className="bg-[#050b14] border border-white/5 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#3affc2] text-xs font-bold truncate" style={mono}>{h.accessCode?.slice(0, 20)}...</span>
                      <span className="text-gray-600 text-[9px] flex-shrink-0" style={mono}>{h.passType}</span>
                      <span className="text-gray-600 text-[9px] flex-shrink-0" style={mono}>{h.duration}</span>
                    </div>
                    <div className="flex gap-3 text-[9px] text-gray-600" style={mono}>
                      <span>Generated: {h.generatedAt ? new Date(h.generatedAt).toLocaleString() : '-'}</span>
                      <span>Expires: {h.expiresAt ? new Date(h.expiresAt).toLocaleDateString() : '-'}</span>
                    </div>
                  </div>
                  <button onClick={() => { navigator.clipboard.writeText(h.accessCode); toast({ title: 'Copied' }); }} className="ml-2 text-[9px] text-gray-500 hover:text-[#3affc2] transition-colors flex-shrink-0" style={mono}>Copy</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGodMode;
