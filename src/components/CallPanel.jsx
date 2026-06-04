import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Phone, PhoneOff, PhoneIncoming, PhoneOutgoing, PhoneMissed, Clock, Mic, MicOff, Volume2, Delete, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const API_BASE = 'https://api.phantompathvpn.com/api';

const CallPanel = ({ sessionToken, codeHash, virtualNumber, virtualNumberId, onClose }) => {
  const { toast } = useToast();
  const [callHistory, setCallHistory] = useState([]);
  const [dialNumber, setDialNumber] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [minutesRemaining, setMinutesRemaining] = useState(50);
  const [activeCall, setActiveCall] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const timerRef = useRef(null);

  const hdrs = () => ({ 'Content-Type': 'application/json', 'x-session-token': sessionToken, 'x-code-hash': codeHash });
  const isDemo = !sessionToken || sessionToken === '';

  const DEMO_CALLS = [
    { id: 'c1', contactNumber: '+44 7700 900123', direction: 'OUTBOUND', status: 'COMPLETED', durationSeconds: 185, createdAt: new Date(Date.now() - 3600000).toISOString() },
    { id: 'c2', contactNumber: '+1 555 234 5678', direction: 'INBOUND', status: 'COMPLETED', durationSeconds: 42, createdAt: new Date(Date.now() - 14400000).toISOString() },
    { id: 'c3', contactNumber: '+44 2079 460123', direction: 'INBOUND', status: 'MISSED', durationSeconds: 0, createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: 'c4', contactNumber: '+49 170 1234567', direction: 'OUTBOUND', status: 'COMPLETED', durationSeconds: 320, createdAt: new Date(Date.now() - 172800000).toISOString() },
    { id: 'c5', contactNumber: '+44 7700 900123', direction: 'INBOUND', status: 'COMPLETED', durationSeconds: 95, createdAt: new Date(Date.now() - 259200000).toISOString() },
    { id: 'c6', contactNumber: '+33 6 12 34 56 78', direction: 'OUTBOUND', status: 'COMPLETED', durationSeconds: 210, createdAt: new Date(Date.now() - 345600000).toISOString() },
  ];

  useEffect(() => { fetchCallHistory(); fetchMinutes(); }, []);

  useEffect(() => {
    if (activeCall) { timerRef.current = setInterval(() => setCallDuration((d) => d + 1), 1000); }
    else { clearInterval(timerRef.current); setCallDuration(0); }
    return () => clearInterval(timerRef.current);
  }, [activeCall]);

  const fetchCallHistory = async () => {
    if (isDemo) { setCallHistory(DEMO_CALLS); setIsLoading(false); return; }
    try { const res = await fetch(`${API_BASE}/portal/calls/history`, { headers: hdrs() }); const data = await res.json(); if (data.calls) setCallHistory(data.calls); } catch (err) {}
    setIsLoading(false);
  };

  const fetchMinutes = async () => {
    if (isDemo) { setMinutesRemaining(50); return; }
    try { const res = await fetch(`${API_BASE}/portal/calls/minutes`, { headers: hdrs() }); const data = await res.json(); if (data.minutesRemaining !== undefined) setMinutesRemaining(data.minutesRemaining); } catch (err) {}
  };

  const initiateCall = async (number) => {
    if (!number.trim()) return;
    if (isDemo) { setActiveCall({ to: number, status: 'ringing' }); setTimeout(() => setActiveCall((c) => c ? { ...c, status: 'connected' } : null), 2000); return; }
    try {
      const res = await fetch(`${API_BASE}/portal/calls/initiate`, { method: 'POST', headers: hdrs(), body: JSON.stringify({ virtualNumberId, virtualNumber, to: number }) });
      const data = await res.json();
      if (res.status === 402) { toast({ title: "You've used your minutes", description: 'Top up to keep calling.', variant: 'destructive' }); return; }
      if (res.ok) { setActiveCall({ to: number, status: 'ringing', callId: data.id }); }
      else { toast({ title: 'Call Failed', description: data.message || 'Could not connect.', variant: 'destructive' }); }
    } catch (err) { toast({ title: 'Call Failed', variant: 'destructive' }); }
  };

  const endCall = () => { setActiveCall(null); setIsMuted(false); setIsSpeaker(false); fetchCallHistory(); fetchMinutes(); };
  const dialPadPress = (digit) => setDialNumber((n) => n + digit);
  const dialPadDelete = () => setDialNumber((n) => n.slice(0, -1));
  const callFromHistory = (number) => { setDialNumber(number); initiateCall(number); };

  const fmtDuration = (s) => { const m = Math.floor(s / 60); const sec = s % 60; return `${m}:${sec.toString().padStart(2, '0')}`; };
  const fmtTime = (d) => { const dt = new Date(d); const diff = Date.now() - dt.getTime(); if (diff < 86400000) return dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); if (diff < 604800000) return dt.toLocaleDateString([], { weekday: 'short' }); return dt.toLocaleDateString([], { month: 'short', day: 'numeric' }); };
  const getAvatarColor = (num) => { const colors = ['bg-[#00a884]', 'bg-[#6B5CE7]', 'bg-[#D4614C]', 'bg-[#E8A838]', 'bg-[#5B96E7]', 'bg-[#D45BA8]']; let hash = 0; for (let i = 0; i < num.length; i++) hash = num.charCodeAt(i) + ((hash << 5) - hash); return colors[Math.abs(hash) % colors.length]; };
  const getInitials = (num) => num.replace(/[^0-9+]/g, '').slice(-2);

  const CallIcon = ({ direction, status }) => {
    if (status === 'MISSED') return <PhoneMissed className="w-3.5 h-3.5 text-red-400" />;
    if (direction === 'INBOUND') return <PhoneIncoming className="w-3.5 h-3.5 text-[#00a884]" />;
    return <PhoneOutgoing className="w-3.5 h-3.5 text-[#00a884]" />;
  };

  /* ═══ ACTIVE CALL OVERLAY ═══ */
  if (activeCall) return (
    <div className="flex h-full bg-[#050b14] items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={cn("w-[300px] h-[300px] rounded-full blur-[120px] transition-all duration-1000", activeCall.status === 'connected' ? "bg-[#00a884]/20" : "bg-[#00a884]/10 animate-pulse")} />
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <div className={cn("w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-medium mb-6 shadow-lg", getAvatarColor(activeCall.to))}>
          {getInitials(activeCall.to)}
        </div>
        <p className="text-[#e9edef] text-xl font-medium mb-2">{activeCall.to}</p>
        <p className={cn("text-sm font-mono mb-10", activeCall.status === 'connected' ? "text-[#00a884]" : "text-[#8696a0]")}>
          {activeCall.status === 'ringing' ? 'Ringing...' : fmtDuration(callDuration)}
        </p>
        <div className="flex items-center gap-8 mb-12">
          <button onClick={() => setIsMuted(!isMuted)} className={cn("w-14 h-14 rounded-full flex items-center justify-center transition-all", isMuted ? "bg-white text-[#111b21]" : "bg-[#2a3942] text-[#aebac1] hover:bg-[#374a55]")}>
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          <button onClick={endCall} className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all shadow-[0_0_30px_rgba(239,68,68,0.3)]">
            <PhoneOff className="w-7 h-7 text-white" />
          </button>
          <button onClick={() => setIsSpeaker(!isSpeaker)} className={cn("w-14 h-14 rounded-full flex items-center justify-center transition-all", isSpeaker ? "bg-white text-[#111b21]" : "bg-[#2a3942] text-[#aebac1] hover:bg-[#374a55]")}>
            <Volume2 className="w-6 h-6" />
          </button>
        </div>
        <p className="text-[#8696a0] text-xs font-mono">via {virtualNumber}</p>
      </div>
    </div>
  );

  /* ═══ SPLIT LAYOUT: HISTORY LEFT + DIALPAD RIGHT ═══ */
  return (
    <div className="flex h-full bg-[#111b21] overflow-hidden">

      {/* ── LEFT: Call History ── */}
      <div className="w-full md:w-[340px] lg:w-[400px] flex-shrink-0 flex flex-col border-r border-[#222d35]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#202c33]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00a884]/20 flex items-center justify-center"><Phone className="w-5 h-5 text-[#00a884]" /></div>
            <div>
              <p className="text-[#e9edef] text-sm font-medium">Calls</p>
              <p className="text-[#8696a0] text-[11px] font-mono">{virtualNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn("text-[10px] font-mono px-2 py-0.5 rounded-full", minutesRemaining > 10 ? 'bg-[#00a884]/10 text-[#00a884]' : minutesRemaining > 0 ? 'bg-[#f59e0b]/10 text-[#f59e0b]' : 'bg-[#ef4444]/10 text-[#ef4444]')}>{minutesRemaining} min left</span>
            <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-[#2a3942] flex items-center justify-center"><X className="w-5 h-5 text-[#aebac1]" /></button>
          </div>
        </div>

        {/* Call List */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-40"><div className="w-6 h-6 rounded-full animate-spin border-2 border-[#00a884]/20 border-t-[#00a884]" /></div>
          ) : callHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <Phone className="w-12 h-12 text-[#667781] mb-3" />
              <p className="text-[#8696a0] text-sm">No recent calls</p>
              <p className="text-[#667781] text-xs mt-1">Use the dial pad to make a call</p>
            </div>
          ) : callHistory.map((call) => (
            <button key={call.id} onClick={() => callFromHistory(call.contactNumber)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#202c33] transition-colors text-left border-b border-[#222d35]/50">
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0", getAvatarColor(call.contactNumber))}>
                {getInitials(call.contactNumber)}
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("text-[15px] truncate", call.status === 'MISSED' ? "text-red-400" : "text-[#e9edef]")}>{call.contactNumber}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <CallIcon direction={call.direction} status={call.status} />
                  <span className="text-[#8696a0] text-xs">
                    {call.status === 'MISSED' ? 'Missed' : call.direction === 'INBOUND' ? 'Incoming' : 'Outgoing'}
                    {call.durationSeconds > 0 && ` · ${fmtDuration(call.durationSeconds)}`}
                  </span>
                </div>
              </div>
              <span className="text-[#8696a0] text-[11px] flex-shrink-0">{fmtTime(call.createdAt)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── RIGHT: Dial Pad ── */}
      <div className="hidden md:flex flex-1 flex-col bg-[#0b141a]">
        {/* Dial pad header */}
        <div className="px-4 py-3 bg-[#202c33] border-b border-[#222d35]">
          <p className="text-[#e9edef] text-sm font-medium">Dial Pad</p>
          <p className="text-[#8696a0] text-xs mt-0.5">Enter a number to call via {virtualNumber}</p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Number display */}
          <div className="h-20 flex items-center justify-center w-full mb-2">
            <p className={cn("text-center font-mono tracking-wider transition-all", dialNumber ? "text-[#e9edef] text-3xl font-light" : "text-[#667781] text-lg")}>{dialNumber || 'Enter a number'}</p>
          </div>

          {/* Dial pad */}
          <div className="grid grid-cols-3 gap-3 mb-8 w-full max-w-[300px]">
            {[
              { d: '1', sub: '' }, { d: '2', sub: 'ABC' }, { d: '3', sub: 'DEF' },
              { d: '4', sub: 'GHI' }, { d: '5', sub: 'JKL' }, { d: '6', sub: 'MNO' },
              { d: '7', sub: 'PQRS' }, { d: '8', sub: 'TUV' }, { d: '9', sub: 'WXYZ' },
              { d: '*', sub: '' }, { d: '0', sub: '+' }, { d: '#', sub: '' },
            ].map(({ d, sub }) => (
              <button key={d} onClick={() => dialPadPress(d)}
                className="h-[72px] rounded-full bg-[#202c33] hover:bg-[#2a3942] active:bg-[#374a55] flex flex-col items-center justify-center transition-all">
                <span className="text-[#e9edef] text-2xl font-light">{d}</span>
                {sub && <span className="text-[#8696a0] text-[9px] tracking-[2px] mt-0.5">{sub}</span>}
              </button>
            ))}
          </div>

          {/* Call + Delete row */}
          <div className="flex items-center justify-center w-full max-w-[300px]">
            <div className="w-16" />
            <button onClick={() => { if (dialNumber.trim()) initiateCall(dialNumber); }} disabled={!dialNumber.trim()}
              className={cn("w-16 h-16 rounded-full flex items-center justify-center transition-all mx-auto", dialNumber.trim() ? "bg-[#00a884] hover:bg-[#06cf9c] shadow-[0_0_30px_rgba(0,168,132,0.3)]" : "bg-[#2a3942]")}>
              <Phone className={cn("w-7 h-7", dialNumber.trim() ? "text-[#111b21]" : "text-[#8696a0]")} />
            </button>
            <div className="w-16 flex items-center justify-center">
              {dialNumber && (
                <button onClick={dialPadDelete} className="w-12 h-12 rounded-full hover:bg-[#2a3942] flex items-center justify-center"><Delete className="w-6 h-6 text-[#8696a0]" /></button>
              )}
            </div>
          </div>

          {/* Security label */}
          <div className="mt-8 flex items-center gap-2 text-[#667781] text-xs">
            <Lock className="w-3 h-3" />
            <span>Calls are routed securely via PhantomPath</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallPanel;