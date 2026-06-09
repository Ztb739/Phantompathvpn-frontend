import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Phone, PhoneOff, PhoneIncoming, PhoneOutgoing, PhoneMissed, Clock, Mic, MicOff, Volume2, Delete, Lock, Wifi, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const API_BASE = 'https://api.phantompathvpn.com/api';
const mono = { fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace" };

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
  const [webrtcReady, setWebrtcReady] = useState(false);
  const [webrtcLoading, setWebrtcLoading] = useState(false);
  const timerRef = useRef(null);
  const telnyxClientRef = useRef(null);
  const currentCallRef = useRef(null);

  const hdrs = () => ({ 'Content-Type': 'application/json', 'x-session-token': sessionToken, 'x-code-hash': codeHash });
  const isDemo = !sessionToken || sessionToken === '' || sessionToken === 'demo-token';

  const DEMO_CALLS = [
    { id: 'c1', contactNumber: '+44 7700 900123', direction: 'OUTBOUND', status: 'COMPLETED', durationSeconds: 185, createdAt: new Date(Date.now() - 3600000).toISOString() },
    { id: 'c2', contactNumber: '+1 555 234 5678', direction: 'INBOUND', status: 'COMPLETED', durationSeconds: 42, createdAt: new Date(Date.now() - 14400000).toISOString() },
    { id: 'c3', contactNumber: '+44 2079 460123', direction: 'INBOUND', status: 'MISSED', durationSeconds: 0, createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: 'c4', contactNumber: '+49 170 1234567', direction: 'OUTBOUND', status: 'COMPLETED', durationSeconds: 320, createdAt: new Date(Date.now() - 172800000).toISOString() },
    { id: 'c5', contactNumber: '+44 7700 900123', direction: 'INBOUND', status: 'COMPLETED', durationSeconds: 95, createdAt: new Date(Date.now() - 259200000).toISOString() },
    { id: 'c6', contactNumber: '+33 6 12 34 56 78', direction: 'OUTBOUND', status: 'COMPLETED', durationSeconds: 210, createdAt: new Date(Date.now() - 345600000).toISOString() },
  ];

  useEffect(() => { fetchCallHistory(); fetchMinutes(); initWebRTC(); return () => { if (telnyxClientRef.current) telnyxClientRef.current.disconnect(); }; }, []);

  useEffect(() => {
    if (activeCall) { timerRef.current = setInterval(() => setCallDuration((d) => d + 1), 1000); }
    else { clearInterval(timerRef.current); setCallDuration(0); }
    return () => clearInterval(timerRef.current);
  }, [activeCall]);

  const initWebRTC = async () => {
    if (isDemo) return;
    setWebrtcLoading(true);
    try {
      const res = await fetch(`${API_BASE}/portal/webrtc/token`, { method: 'POST', headers: hdrs() });
      if (!res.ok) { setWebrtcLoading(false); return; }
      const data = await res.json();
      if (data.token) {
        try {
          const { TelnyxRTC } = await import('@telnyx/webrtc');
          const client = new TelnyxRTC({ login_token: data.token });
          client.on('telnyx.ready', () => { setWebrtcReady(true); setWebrtcLoading(false); });
          client.on('telnyx.error', () => { setWebrtcLoading(false); });
          client.on('telnyx.notification', (notification) => {
            if (notification.call) {
              const call = notification.call;
              if (call.state === 'ringing' && call.direction === 'inbound') {
                setActiveCall({ to: call.options?.remoteCallerNumber || 'Unknown', status: 'incoming', webrtc: true });
                currentCallRef.current = call;
              }
            }
          });
          client.connect();
          telnyxClientRef.current = client;
        } catch (err) { setWebrtcLoading(false); }
      }
    } catch (err) { setWebrtcLoading(false); }
  };

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

    // Try WebRTC first if available
    if (webrtcReady && telnyxClientRef.current) {
      try {
        const call = telnyxClientRef.current.newCall({ destinationNumber: number.replace(/\s/g, ''), callerNumber: virtualNumber.replace(/\s/g, '') });
        currentCallRef.current = call;
        setActiveCall({ to: number, status: 'ringing', webrtc: true });
        call.on('telnyx.call.answered', () => setActiveCall((c) => c ? { ...c, status: 'connected' } : null));
        call.on('telnyx.call.hangup', () => { endCall(); });
        return;
      } catch (err) { /* Fall back to PSTN */ }
    }

    // PSTN fallback
    if (isDemo) { setActiveCall({ to: number, status: 'ringing' }); setTimeout(() => setActiveCall((c) => c ? { ...c, status: 'connected' } : null), 2000); return; }
    try {
      const res = await fetch(`${API_BASE}/portal/calls/initiate`, { method: 'POST', headers: hdrs(), body: JSON.stringify({ virtualNumberId, virtualNumber, to: number }) });
      const data = await res.json();
      if (res.status === 402) { toast({ title: "Minutes Depleted", description: 'Add more minutes to keep calling.', variant: 'destructive' }); return; }
      if (res.ok) { setActiveCall({ to: number, status: 'ringing', callId: data.id }); }
      else { toast({ title: 'Call Failed', description: data.message || 'Could not connect.', variant: 'destructive' }); }
    } catch (err) { toast({ title: 'Call Failed', variant: 'destructive' }); }
  };

  const answerCall = () => {
    if (currentCallRef.current) { currentCallRef.current.answer(); setActiveCall((c) => c ? { ...c, status: 'connected' } : null); }
  };

  const endCall = () => {
    if (currentCallRef.current) { try { currentCallRef.current.hangup(); } catch (e) {} currentCallRef.current = null; }
    setActiveCall(null); setIsMuted(false); setIsSpeaker(false); fetchCallHistory(); fetchMinutes();
  };

  const toggleMute = () => {
    if (currentCallRef.current) { isMuted ? currentCallRef.current.unmuteAudio() : currentCallRef.current.muteAudio(); }
    setIsMuted(!isMuted);
  };

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
        <div className={cn("w-[300px] h-[300px] rounded-full blur-[120px] transition-all duration-1000", activeCall.status === 'connected' ? "bg-[#00a884]/20" : activeCall.status === 'incoming' ? "bg-[#6B5CE7]/20 animate-pulse" : "bg-[#00a884]/10 animate-pulse")} />
      </div>
      <div className="relative z-10 flex flex-col items-center px-4">
        <div className={cn("w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-medium mb-6 shadow-lg", getAvatarColor(activeCall.to))}>
          {getInitials(activeCall.to)}
        </div>
        <p className="text-[#e9edef] text-lg sm:text-xl font-medium mb-1" style={mono}>{activeCall.to}</p>
        {activeCall.webrtc && <p className="text-[#6B5CE7] text-[10px] mb-1 flex items-center gap-1" style={mono}><Wifi className="w-3 h-3" />WebRTC</p>}
        <p className={cn("text-sm mb-8 sm:mb-10", activeCall.status === 'connected' ? "text-[#00a884]" : activeCall.status === 'incoming' ? "text-[#6B5CE7]" : "text-[#8696a0]")} style={mono}>
          {activeCall.status === 'ringing' ? 'Ringing...' : activeCall.status === 'incoming' ? 'Incoming call...' : fmtDuration(callDuration)}
        </p>
        <div className="flex items-center gap-6 sm:gap-8 mb-10 sm:mb-12">
          <button onClick={toggleMute} className={cn("w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all", isMuted ? "bg-white text-[#111b21]" : "bg-[#2a3942] text-[#aebac1] hover:bg-[#374a55]")}>
            {isMuted ? <MicOff className="w-5 h-5 sm:w-6 sm:h-6" /> : <Mic className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
          {activeCall.status === 'incoming' ? (
            <>
              <button onClick={answerCall} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#00a884] hover:bg-[#06cf9c] flex items-center justify-center transition-all shadow-[0_0_30px_rgba(0,168,132,0.3)]">
                <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </button>
              <button onClick={endCall} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                <PhoneOff className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </button>
            </>
          ) : (
            <button onClick={endCall} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <PhoneOff className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </button>
          )}
          <button onClick={() => setIsSpeaker(!isSpeaker)} className={cn("w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all", isSpeaker ? "bg-white text-[#111b21]" : "bg-[#2a3942] text-[#aebac1] hover:bg-[#374a55]")}>
            <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        <p className="text-[#8696a0] text-xs" style={mono}>via {virtualNumber}</p>
      </div>
    </div>
  );

  /* ═══ MAIN PANEL ═══ */
  return (
    <div className="flex h-full bg-[#111b21] overflow-hidden">
      {/* Left: Call History */}
      <div className="flex flex-col w-full md:w-[340px] lg:w-[400px] bg-[#111b21] border-r border-[#222d35] flex-shrink-0">
        <div className="flex items-center justify-between px-4 py-3 bg-[#202c33]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00a884]/20 flex items-center justify-center"><Phone className="w-5 h-5 text-[#00a884]" /></div>
            <div>
              <p className="text-[#e9edef] text-sm font-medium">Calls</p>
              <p className="text-[#8696a0] text-[11px]" style={mono}>{virtualNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${minutesRemaining > 10 ? 'bg-[#00a884]/10 text-[#00a884]' : minutesRemaining > 0 ? 'bg-[#f59e0b]/10 text-[#f59e0b]' : 'bg-[#ef4444]/10 text-[#ef4444]'}`} style={mono}>{minutesRemaining} min left</span>
            {webrtcReady && <span className="w-2 h-2 rounded-full bg-[#6B5CE7] animate-pulse" title="WebRTC Ready" />}
            {webrtcLoading && <Loader2 className="w-3 h-3 text-[#8696a0] animate-spin" />}
            <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-[#2a3942] flex items-center justify-center"><X className="w-5 h-5 text-[#aebac1]" /></button>
          </div>
        </div>

        {/* Dial Pad */}
        <div className="px-4 py-4 bg-[#0b141a] border-b border-[#222d35]">
          <div className="bg-[#202c33] rounded-xl p-3 mb-3 flex items-center">
            <input value={dialNumber} onChange={(e) => setDialNumber(e.target.value.replace(/[^0-9+\s]/g, ''))} placeholder="Enter number..." className="flex-1 bg-transparent text-[#e9edef] text-lg text-center outline-none placeholder:text-[#8696a0]" style={mono} />
            {dialNumber && <button onClick={dialPadDelete} className="w-8 h-8 rounded-full hover:bg-[#374a55] flex items-center justify-center"><Delete className="w-4 h-4 text-[#aebac1]" /></button>}
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {['1','2','3','4','5','6','7','8','9','*','0','#'].map((d) => (
              <button key={d} onClick={() => dialPadPress(d)} className="h-11 sm:h-12 bg-[#202c33] hover:bg-[#2a3942] active:scale-95 rounded-xl text-[#e9edef] text-lg font-medium transition-all" style={mono}>{d}</button>
            ))}
          </div>
          <button onClick={() => initiateCall(dialNumber)} disabled={!dialNumber.trim()} className={cn("w-full h-11 sm:h-12 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all active:scale-95", dialNumber.trim() ? "bg-[#00a884] hover:bg-[#06cf9c] text-[#111b21]" : "bg-[#2a3942] text-[#8696a0]")} style={mono}>
            <Phone className="w-4 h-4" />
            {webrtcReady ? 'Call via Browser' : 'Call'}
          </button>
        </div>

        {/* Call History */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-32"><Loader2 className="w-5 h-5 text-[#00a884] animate-spin" /></div>
          ) : callHistory.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-center"><p className="text-[#8696a0] text-sm">No call history</p></div>
          ) : callHistory.map((c) => (
            <button key={c.id} onClick={() => callFromHistory(c.contactNumber)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#202c33] transition-colors text-left border-b border-[#222d35]/50">
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0", getAvatarColor(c.contactNumber))}>
                {getInitials(c.contactNumber)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#e9edef] text-[14px] truncate">{c.contactNumber}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <CallIcon direction={c.direction} status={c.status} />
                  <span className="text-[#8696a0] text-[12px]">{fmtTime(c.createdAt)}</span>
                  {c.durationSeconds > 0 && <span className="text-[#8696a0] text-[12px]">· {fmtDuration(c.durationSeconds)}</span>}
                </div>
              </div>
              <Phone className="w-4 h-4 text-[#00a884] flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Right: Empty state (desktop) */}
      <div className="hidden md:flex flex-col items-center justify-center flex-1 bg-[#222e35] text-center">
        <div className="w-[320px]">
          <div className="w-20 h-20 rounded-full bg-[#2a3942] flex items-center justify-center mx-auto mb-6"><Phone className="w-9 h-9 text-[#8696a0]" /></div>
          <h3 className="text-[#e9edef] text-2xl font-light mb-2">PhantomPath Calls</h3>
          <p className="text-[#8696a0] text-sm leading-relaxed mb-4">Make and receive calls using your virtual number. {webrtcReady ? 'Browser calling is active.' : 'Calls are routed through Telnyx.'}</p>
          {webrtcReady && <p className="text-[#6B5CE7] text-xs flex items-center justify-center gap-1" style={mono}><Wifi className="w-3 h-3" /> WebRTC Active — Browser Calling Enabled</p>}
          <div className="mt-6 flex items-center justify-center gap-2 text-[#8696a0] text-xs"><Lock className="w-3 h-3" /><span>End-to-end secured</span></div>
        </div>
      </div>
    </div>
  );
};

export default CallPanel;
