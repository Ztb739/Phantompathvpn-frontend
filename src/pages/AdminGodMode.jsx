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

const StatCard = ({ label, value, sub, color }) => (
  <div className="bg-[#0a1120] border border-white/5 rounded-xl p-4">
    <p className="text-gray-500 text-[9px] uppercase tracking-widest mb-1" style={mono}>{label}</p>
    <p className="text-2xl font-black" style={{ ...mono, color }}>{value}</p>
    {sub && <p className="text-gray-600 text-[9px] mt-1" style={mono}>{sub}</p>}
  </div>
);

const AdminGodMode = () => {
  const { toast } = useToast();
  const [token, setToken] = useState(() => localStorage.getItem('gm_token') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedPass, setSelectedPass] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(4);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [loginError, setLoginError] = useState('');
  const [telemetry, setTelemetry] = useState(null);
  const [telemetryLoading, setTelemetryLoading] = useState(false);
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('gm_history') || '[]'); } catch { return []; }
  });

  useEffect(() => { if (token) localStorage.setItem('gm_token', token); else localStorage.removeItem('gm_token'); }, [token]);
  useEffect(() => { localStorage.setItem('gm_history', JSON.stringify(history)); }, [history]);
  useEffect(() => { if (token) fetchTelemetry(); }, [token]);

  const hdrs = () => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });

  const fetchTelemetry = async () => {
    setTelemetryLoading(true);
    try {
      const res = await fetch(`${API_BASE}/${ADMIN_PATH}/telemetry`, { headers: hdrs() });
      if (res.status === 401) { setToken(''); return; }
      const data = await res.json();
      setTelemetry(data);
    } catch (err) { console.error('Telemetry fetch failed'); }
    setTelemetryLoading(false);
  };

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
        method: 'POST', headers: hdrs(),
        body: JSON.stringify({ productSku: pass.sku, amount: pass.price, durationDays: duration.days, services: pass.services }),
      });
      if (res.status === 401) { setToken(''); toast({ title: 'Session expired', variant: 'destructive' }); setGenerating(false); return; }
      const data = await res.json();
      if (data.accessCode) {
        setResult(data);
        setHistory(prev => [{ ...data, passType: pass.label, duration: duration.label, generatedAt: new Date().toISOString() }, ...prev]);
        toast({ title: 'Code Generated' });
        fetchTelemetry();
      } else { toast({ title: 'Error', description: data.message, variant: 'destructive' }); }
    } catch (err) { toast({ title: 'Error', description: 'Generation failed', variant: 'destructive' }); }
    setGenerating(false);
  };

  const logout = () => { setToken(''); localStorage.removeItem('gm_token'); };

  const fmtUptime = (s) => {
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    return d > 0 ? `${d}d ${h}h ${m}m` : h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const fmtBytes = (b) => {
    if (b > 1073741824) return `${(b / 1073741824).toFixed(1)} GB`;
    if (b > 1048576) return `${(b / 1048576).toFixed(0)} MB`;
    return `${(b / 1024).toFixed(0)} KB`;
  };

  const fmtDate = (d) => new Date(d).toLocaleString();
  const fmtDateShort = (d) => new Date(d).toLocaleDateString();

  if (!token) return (
    <div className="min-h-screen bg-[#050b14] flex items-center justify-center px-4 pt-28 pb-4">
      <Helmet><title>Admin | PhantomPath</title></Helmet>
      <div className="w-full max-w-sm bg-[#0a1120] border border-red-500/20 rounded-2xl p-6">
        <h1 className="text-red-400 text-lg font-bold mb-1 text-center" style={mono}>ADMIN PANEL</h1>
        <p className="text-gray-500 text-xs text-center mb-6" style={mono}>Authentication Required</p>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" autoComplete="off" className="w-full h-10 bg-[#050b14] border border-white/10 text-white placeholder:text-gray-600 text-sm rounded-lg px-4 mb-3 outline-none focus:border-red-500/50" style={mono} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }} type="password" placeholder="Password" autoComplete="off" className="w-full h-10 bg-[#050b14] border border-white/10 text-white placeholder:text-gray-600 text-sm rounded-lg px-4 mb-3 outline-none focus:border-red-500/50" style={mono} />
        {loginError && <p className="text-red-400 text-xs text-center mb-3" style={mono}>{loginError}</p>}
        <button onClick={handleLogin} className="w-full h-10 bg-red-500/20 border border-red-500/40 text-red-400 font-bold text-sm rounded-lg hover:bg-red-500/30 active:scale-95 transition-all" style={mono}>Authenticate</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050b14] px-4 md:px-8 pt-28 pb-8">
      <Helmet><title>Admin | PhantomPath</title></Helmet>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-red-400 text-lg font-bold" style={mono}>PHANTOMPATH ADMIN</h1>
            <p className="text-gray-500 text-xs" style={mono}>Unified Control Panel</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchTelemetry} className="text-gray-500 text-xs hover:text-[#3affc2] transition-colors" style={mono}>↻ Refresh</button>
            <button onClick={logout} className="text-gray-500 text-xs hover:text-red-400 transition-colors" style={mono}>Logout</button>
          </div>
        </div>

        <div className="flex gap-1 mb-6 bg-[#0a1120] p-1 rounded-xl border border-white/5 w-fit">
          {['dashboard', 'generate', 'orders', 'logs'].map(v => (
            <button key={v} onClick={() => setActiveView(v)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeView === v ? 'bg-red-500/20 border border-red-500/40 text-red-400' : 'text-gray-500 hover:text-white'}`} style={mono}>
              {v === 'dashboard' ? '◉ Dashboard' : v === 'generate' ? '⚡ Generate' : v === 'orders' ? '📋 Orders' : '📜 Logs'}
            </button>
          ))}
        </div>

        {activeView === 'dashboard' && (
          <div className="space-y-6">
            {telemetryLoading && !telemetry ? (
              <div className="text-center py-20"><p className="text-gray-500 text-sm" style={mono}>Loading telemetry...</p></div>
            ) : telemetry ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <StatCard label="Uptime" value={fmtUptime(telemetry.system.uptime)} color="#3affc2" />
                  <StatCard label="Memory" value={`${telemetry.system.memoryUsage.usedPercent}%`} sub={`${fmtBytes(telemetry.system.memoryUsage.free)} free`} color={telemetry.system.memoryUsage.usedPercent > 80 ? '#ef4444' : '#3affc2'} />
                  <StatCard label="CPU Load" value={telemetry.system.loadAvg[0].toFixed(2)} sub={`${telemetry.system.loadAvg[1].toFixed(2)} / ${telemetry.system.loadAvg[2].toFixed(2)}`} color={telemetry.system.loadAvg[0] > 2 ? '#ef4444' : '#3affc2'} />
                  <StatCard label="Active Codes" value={telemetry.activeAccessCodes} color="#FFE600" />
                </div>

                <div>
                  <p className="text-white/60 text-[10px] uppercase tracking-widest mb-3" style={mono}>VPN Nodes</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {telemetry.nodes.map(node => (
                      <div key={node.id} className="bg-[#0a1120] border border-white/5 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${node.isHealthy ? 'bg-[#3affc2] animate-pulse' : 'bg-red-400'}`} />
                            <span className="text-white text-sm font-bold" style={mono}>{node.country}</span>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${node.status === 'ONLINE' ? 'bg-[#3affc2]/10 text-[#3affc2]' : 'bg-red-500/10 text-red-400'}`} style={mono}>{node.status}</span>
                        </div>
                        <div className="flex justify-between text-xs mb-2">
                          <span className="text-gray-500" style={mono}>Peers</span>
                          <span className="text-white" style={mono}>{node.activePeers} / {node.maxPeers}</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#050b14] rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all ${node.loadPercent > 80 ? 'bg-red-400' : node.loadPercent > 50 ? 'bg-[#FFE600]' : 'bg-[#3affc2]'}`} style={{ width: `${node.loadPercent}%` }} />
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-gray-600 text-[9px]" style={mono}>{node.city}</span>
                          <span className="text-gray-600 text-[9px]" style={mono}>{node.loadPercent}% load</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <StatCard label="Active Services" value={telemetry.services.active} color="#3affc2" />
                  <StatCard label="Pending" value={telemetry.services.pending} color="#FFE600" />
                  <StatCard label="Failed" value={telemetry.services.failed} color={telemetry.services.failed > 0 ? '#ef4444' : '#3affc2'} />
                  <StatCard label="Orders Today" value={telemetry.orderStats.today} color="#6B5CE7" />
                  <StatCard label="Orders Total" value={telemetry.orderStats.total} color="#6B5CE7" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-white/60 text-[10px] uppercase tracking-widest" style={mono}>Recent Orders</p>
                    <button onClick={() => setActiveView('orders')} className="text-gray-500 text-[10px] hover:text-white transition-colors" style={mono}>View All →</button>
                  </div>
                  <div className="bg-[#0a1120] border border-white/5 rounded-xl overflow-hidden">
                    {telemetry.recentOrders.slice(0, 5).map((o, i) => (
                      <div key={o.id} className={`flex items-center justify-between px-4 py-3 ${i < 4 ? 'border-b border-white/5' : ''}`}>
                        <div className="flex items-center gap-3">
                          <span className={`text-[9px] px-2 py-0.5 rounded-full ${o.paymentProvider === 'DMB' ? 'bg-blue-500/10 text-blue-400' : o.paymentProvider === 'STRIPE' ? 'bg-purple-500/10 text-purple-400' : 'bg-yellow-500/10 text-yellow-400'}`} style={mono}>{o.paymentProvider}</span>
                          <span className="text-gray-400 text-xs" style={mono}>{o.productSku}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-white text-xs" style={mono}>£{parseFloat(o.amount).toFixed(2)}</span>
                          <span className="text-gray-600 text-[9px]" style={mono}>{fmtDateShort(o.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-20"><p className="text-gray-500 text-sm" style={mono}>Failed to load telemetry</p></div>
            )}
          </div>
        )}

        {activeView === 'generate' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-[#0a1120] border border-red-500/20 rounded-2xl p-6">
              <p className="text-white/60 text-[10px] uppercase tracking-widest mb-3" style={mono}>Pass Type</p>
              <div className="grid grid-cols-3 gap-2 mb-5">
                {PASS_TYPES.map((p, i) => (
                  <button key={i} onClick={() => setSelectedPass(i)} className={`h-16 rounded-lg border text-xs flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${selectedPass === i ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-[#050b14] border-white/10 text-gray-400 hover:border-white/20'}`} style={mono}>
                    <span className="font-bold">{p.label}</span>
                    <span className="text-[10px] opacity-60">£{p.price.toFixed(2)}</span>
                  </button>
                ))}
              </div>

              <p className="text-white/60 text-[10px] uppercase tracking-widest mb-3" style={mono}>Duration</p>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {DURATIONS.map((d, i) => (
                  <button key={i} onClick={() => setSelectedDuration(i)} className={`h-10 rounded-lg border text-xs transition-all active:scale-95 ${selectedDuration === i ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-[#050b14] border-white/10 text-gray-400 hover:border-white/20'}`} style={mono}>
                    {d.label}
                  </button>
                ))}
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
                    <span className="text-gray-500">Expires: {fmtDate(result.expiresAt)}</span>
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
                          <span>Generated: {h.generatedAt ? fmtDate(h.generatedAt) : '-'}</span>
                          <span>Expires: {h.expiresAt ? fmtDateShort(h.expiresAt) : '-'}</span>
                        </div>
                      </div>
                      <button onClick={() => { navigator.clipboard.writeText(h.accessCode); toast({ title: 'Copied' }); }} className="ml-2 text-[9px] text-gray-500 hover:text-[#3affc2] transition-colors flex-shrink-0" style={mono}>Copy</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeView === 'orders' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <StatCard label="Today" value={telemetry?.orderStats?.today || 0} color="#6B5CE7" />
              <StatCard label="This Week" value={telemetry?.orderStats?.thisWeek || 0} color="#6B5CE7" />
              <StatCard label="All Time" value={telemetry?.orderStats?.total || 0} color="#6B5CE7" />
            </div>
            <div className="bg-[#0a1120] border border-white/5 rounded-xl overflow-hidden">
              <div className="grid grid-cols-5 px-4 py-2 border-b border-white/5 text-[9px] text-gray-500 uppercase tracking-widest" style={mono}>
                <span>Provider</span><span>Product</span><span>Amount</span><span>Status</span><span>Date</span>
              </div>
              {(telemetry?.recentOrders || []).map((o) => (
                <div key={o.id} className="grid grid-cols-5 px-4 py-3 border-b border-white/5 items-center">
                  <span className={`text-xs ${o.paymentProvider === 'DMB' ? 'text-blue-400' : o.paymentProvider === 'STRIPE' ? 'text-purple-400' : 'text-yellow-400'}`} style={mono}>{o.paymentProvider}</span>
                  <span className="text-gray-300 text-xs" style={mono}>{o.productSku}</span>
                  <span className="text-white text-xs" style={mono}>£{parseFloat(o.amount).toFixed(2)}</span>
                  <span className={`text-xs ${o.status === 'CONFIRMED' ? 'text-[#3affc2]' : 'text-[#FFE600]'}`} style={mono}>{o.status}</span>
                  <span className="text-gray-600 text-[10px]" style={mono}>{fmtDate(o.createdAt)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'logs' && (
          <div className="bg-[#0a1120] border border-white/5 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 px-4 py-2 border-b border-white/5 text-[9px] text-gray-500 uppercase tracking-widest" style={mono}>
              <span>Action</span><span>Entity</span><span>Date</span>
            </div>
            {(telemetry?.recentAuditLogs || []).map((l) => (
              <div key={l.id} className="grid grid-cols-3 px-4 py-3 border-b border-white/5 items-center">
                <span className={`text-xs ${l.action === 'GENERATE_CODE' ? 'text-[#3affc2]' : 'text-gray-400'}`} style={mono}>{l.action}</span>
                <span className="text-gray-400 text-xs" style={mono}>{l.entityType}</span>
                <span className="text-gray-600 text-[10px]" style={mono}>{fmtDate(l.createdAt)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGodMode;
