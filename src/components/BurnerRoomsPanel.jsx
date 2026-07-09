import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Plus, Users, Clock, Loader2, ArrowLeft, Trash2, LogOut as LeaveIcon, Lock, Timer, AlertTriangle, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const API_BASE = 'https://api.phantompathvpn.com/api';

const BurnerRoomsPanel = ({ sessionToken, codeHash, onClose }) => {
  const { toast } = useToast();
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteNumber, setInviteNumber] = useState('');
  const [createForm, setCreateForm] = useState({ name: '', autoDeleteHours: 24, displayName: 'Ghost' });
  const [joinId, setJoinId] = useState('');
  const [joinName, setJoinName] = useState('Ghost');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const pollRef = useRef(null);

  const hdrs = () => ({ 'Content-Type': 'application/json', 'x-session-token': sessionToken, 'x-code-hash': codeHash });
  const mono = { fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace" };

  const isDemo = !sessionToken || sessionToken === '' || sessionToken === 'demo-token';

  const DEMO_ROOMS = [
    { id: 'demo-room-1', name: 'Ghost Lounge', memberCount: 4, expiresAt: new Date(Date.now() + 3600000).toISOString(), autoDeleteHours: 1, isCreator: true, lastMessage: { body: 'Welcome to the room', senderName: 'Phantom1', createdAt: new Date(Date.now() - 300000).toISOString() }, createdAt: new Date(Date.now() - 1800000).toISOString() },
    { id: 'demo-room-2', name: 'Secure Channel', memberCount: 2, expiresAt: new Date(Date.now() + 86400000).toISOString(), autoDeleteHours: 24, isCreator: false, lastMessage: { body: 'Config shared', senderName: 'Agent', createdAt: new Date(Date.now() - 600000).toISOString() }, createdAt: new Date(Date.now() - 7200000).toISOString() },
  ];

  const DEMO_MESSAGES = [
    { id: 'm1', senderName: 'Phantom1', senderAccessCodeId: 'creator', body: 'Welcome to the Ghost Lounge', createdAt: new Date(Date.now() - 1800000).toISOString() },
    { id: 'm2', senderName: 'Agent', senderAccessCodeId: 'other', body: 'Connected. All channels secure.', createdAt: new Date(Date.now() - 1200000).toISOString() },
    { id: 'm3', senderName: 'Spectre', senderAccessCodeId: 'other2', body: 'Ready when you are', createdAt: new Date(Date.now() - 600000).toISOString() },
    { id: 'm4', senderName: 'Phantom1', senderAccessCodeId: 'creator', body: 'Room auto-destructs in 1 hour. Share what you need.', createdAt: new Date(Date.now() - 300000).toISOString() },
  ];

  useEffect(() => {
    fetchRooms();
    pollRef.current = setInterval(() => {
      if (!activeRoom) fetchRooms();
      if (activeRoom) fetchMessages(activeRoom.id);
    }, 5000);
    return () => clearInterval(pollRef.current);
  }, []);

  useEffect(() => { if (messagesEndRef.current) { const container = messagesEndRef.current.parentElement; if (container) container.scrollTop = container.scrollHeight; } }, [messages]);
  useEffect(() => { if (activeRoom && inputRef.current) inputRef.current.focus({ preventScroll: true }); }, [activeRoom]);

  const fetchRooms = async () => {
    if (isDemo) { setRooms(DEMO_ROOMS); setIsLoading(false); return; }
    try { const res = await fetch(`${API_BASE}/portal/rooms`, { headers: hdrs() }); const data = await res.json(); if (data.rooms) setRooms(data.rooms); } catch (err) {}
    setIsLoading(false);
  };

  const fetchMessages = async (roomId) => {
    if (isDemo) { setMessages(DEMO_MESSAGES); return; }
    try { const res = await fetch(`${API_BASE}/portal/rooms/${roomId}/messages`, { headers: hdrs() }); const data = await res.json(); if (data.messages) setMessages(data.messages); } catch (err) {}
  };

  const createRoom = async () => {
    if (!createForm.name.trim()) return;
    if (isDemo) { toast({ title: 'Chat Created', description: `"${createForm.name}" is live` }); setShowCreate(false); return; }
    try {
      const res = await fetch(`${API_BASE}/portal/rooms/create`, { method: 'POST', headers: hdrs(), body: JSON.stringify(createForm) });
      const data = await res.json();
      if (data.room) { toast({ title: 'Chat Created', description: `"${data.room.name}" is live` }); fetchRooms(); }
    } catch (err) { toast({ title: 'Error', description: 'Failed to create room', variant: 'destructive' }); }
    setShowCreate(false);
  };

  const joinRoom = async () => {
    if (!joinId.trim()) return;
    if (isDemo) { toast({ title: 'Joined Chat' }); setShowJoin(false); return; }
    try {
      const res = await fetch(`${API_BASE}/portal/rooms/${joinId.trim()}/join`, { method: 'POST', headers: hdrs(), body: JSON.stringify({ displayName: joinName || 'Ghost' }) });
      if (res.ok) { toast({ title: 'Joined Chat' }); fetchRooms(); }
      else { const data = await res.json(); toast({ title: 'Error', description: data.message, variant: 'destructive' }); }
    } catch (err) { toast({ title: 'Error', description: 'Failed to join room', variant: 'destructive' }); }
    setShowJoin(false); setJoinId('');
  };

  const inviteUser = async () => {
    if (!inviteNumber.trim() || !activeRoom) return;
    if (isDemo) { toast({ title: 'Invited', description: `${inviteNumber} added to chat` }); setShowInvite(false); setInviteNumber(''); return; }
    try {
      const res = await fetch(`${API_BASE}/portal/rooms/${activeRoom.id}/invite`, { method: 'POST', headers: hdrs(), body: JSON.stringify({ phoneNumber: inviteNumber.trim() }) });
      if (res.ok) { toast({ title: 'Invited', description: `${inviteNumber} added to chat` }); fetchRooms(); }
      else { const data = await res.json(); toast({ title: 'Error', description: data.message, variant: 'destructive' }); }
    } catch (err) { toast({ title: 'Error', description: 'Failed to invite user', variant: 'destructive' }); }
    setShowInvite(false); setInviteNumber('');
  };

  const leaveRoom = async (roomId) => {
    if (isDemo) { setRooms(rooms.filter(r => r.id !== roomId)); setActiveRoom(null); return; }
    try { await fetch(`${API_BASE}/portal/rooms/${roomId}/leave`, { method: 'POST', headers: hdrs() }); setActiveRoom(null); fetchRooms(); toast({ title: 'Left Chat' }); } catch (err) {}
  };

  const destroyRoom = async (roomId) => {
    if (isDemo) { setRooms(rooms.filter(r => r.id !== roomId)); setActiveRoom(null); return; }
    try { await fetch(`${API_BASE}/portal/rooms/${roomId}`, { method: 'DELETE', headers: hdrs() }); setActiveRoom(null); fetchRooms(); toast({ title: 'Chat Destroyed' }); } catch (err) {}
  };

  const sendMsg = async () => {
    if (!newMessage.trim() || sending || !activeRoom) return;
    const body = newMessage.trim();
    setNewMessage(''); setSending(true);

    if (isDemo) {
      setMessages(prev => [...prev, { id: `temp-${Date.now()}`, senderName: 'You', senderAccessCodeId: 'self', body, createdAt: new Date().toISOString() }]);
      setSending(false); return;
    }

    try {
      const res = await fetch(`${API_BASE}/portal/rooms/${activeRoom.id}/send`, { method: 'POST', headers: hdrs(), body: JSON.stringify({ body }) });
      if (res.ok) fetchMessages(activeRoom.id);
    } catch (err) {}
    setSending(false);
  };

  const openRoom = (room) => { setActiveRoom(room); fetchMessages(room.id); };
  const fmtTime = (d) => { const dt = new Date(d); const diff = Date.now() - dt.getTime(); if (diff < 60000) return 'now'; if (diff < 86400000) return dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); return dt.toLocaleDateString([], { month: 'short', day: 'numeric' }); };
  const fmtMsgTime = (d) => new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const fmtExpiry = (d) => { if (!d) return 'No expiry'; const diff = new Date(d) - Date.now(); if (diff <= 0) return 'Expired'; const hrs = Math.floor(diff / 3600000); const mins = Math.floor((diff % 3600000) / 60000); return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`; };
  const getRoomColor = (name) => { const colors = ['bg-[#6B5CE7]', 'bg-[#D4614C]', 'bg-[#E8A838]', 'bg-[#5B96E7]', 'bg-[#D45BA8]', 'bg-[#00a884]']; let hash = 0; for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash); return colors[Math.abs(hash) % colors.length]; };

  /* ═══ ROOM LIST ═══ */
  const RoomList = () => (
    <div className={cn("flex flex-col bg-[#111b21] border-r border-[#222d35] h-full", activeRoom ? "hidden md:flex md:w-[340px] lg:w-[400px] flex-shrink-0" : "w-full md:w-[340px] lg:w-[400px] flex-shrink-0")}>
      <div className="flex items-center justify-between px-4 py-3 bg-[#202c33]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#6B5CE7]/20 flex items-center justify-center"><Users className="w-5 h-5 text-[#6B5CE7]" /></div>
          <div><p className="text-[#e9edef] text-sm font-medium">Group Chat</p><p className="text-[#8696a0] text-[11px]" style={mono}>Temporary · Encrypted</p></div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowJoin(!showJoin)} className="w-9 h-9 rounded-full hover:bg-[#2a3942] flex items-center justify-center transition-colors" title="Join"><Users className="w-4 h-4 text-[#aebac1]" /></button>
          <button onClick={() => setShowCreate(!showCreate)} className="w-9 h-9 rounded-full hover:bg-[#2a3942] flex items-center justify-center transition-colors" title="New Room"><Plus className="w-5 h-5 text-[#aebac1]" /></button>
          <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-[#2a3942] flex items-center justify-center transition-colors"><X className="w-5 h-5 text-[#aebac1]" /></button>
        </div>
      </div>

      <AnimatePresence>
        {showCreate && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-3 py-3 bg-[#182229] border-b border-[#222d35] space-y-2">
              <input value={createForm.name} onChange={(e) => setCreateForm({...createForm, name: e.target.value})} placeholder="Room name..." className="w-full h-9 bg-[#202c33] text-[#e9edef] text-sm placeholder:text-[#8696a0] rounded-lg px-3 border-none outline-none" style={mono} />
              <input value={createForm.displayName} onChange={(e) => setCreateForm({...createForm, displayName: e.target.value})} placeholder="Your display name..." className="w-full h-9 bg-[#202c33] text-[#e9edef] text-sm placeholder:text-[#8696a0] rounded-lg px-3 border-none outline-none" style={mono} />
              <div className="flex gap-2">
                <select value={createForm.autoDeleteHours} onChange={(e) => setCreateForm({...createForm, autoDeleteHours: Number(e.target.value)})} className="flex-1 h-9 bg-[#202c33] text-[#e9edef] text-xs rounded-lg px-3 border-none outline-none" style={mono}>
                  <option value={1}>Self-destruct: 1 hour</option>
                  <option value={6}>Self-destruct: 6 hours</option>
                  <option value={24}>Self-destruct: 24 hours</option>
                  <option value={72}>Self-destruct: 3 days</option>
                </select>
                <button onClick={createRoom} className="h-9 px-4 bg-[#6B5CE7] text-white text-xs font-bold rounded-lg hover:bg-[#5a4bd6] active:scale-95 transition-all" style={mono}>Create</button>
              </div>
            </div>
          </motion.div>
        )}
        {showJoin && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-3 py-3 bg-[#182229] border-b border-[#222d35] space-y-2">
              <input value={joinId} onChange={(e) => setJoinId(e.target.value)} placeholder="Phone number..." className="w-full h-9 bg-[#202c33] text-[#e9edef] text-sm placeholder:text-[#8696a0] rounded-lg px-3 border-none outline-none" style={mono} />
              <div className="flex gap-2">
                <input value={joinName} onChange={(e) => setJoinName(e.target.value)} placeholder="Display name..." className="flex-1 h-9 bg-[#202c33] text-[#e9edef] text-sm placeholder:text-[#8696a0] rounded-lg px-3 border-none outline-none" style={mono} />
                <button onClick={joinRoom} className="h-9 px-4 bg-[#6B5CE7] text-white text-xs font-bold rounded-lg hover:bg-[#5a4bd6] active:scale-95 transition-all" style={mono}>Join</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-40"><Loader2 className="w-6 h-6 text-[#6B5CE7] animate-spin" /></div>
        ) : rooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center px-6">
            <p className="text-[#8696a0] text-sm mb-2">No active chats</p>
            <p className="text-[#8696a0] text-xs">Create or join a group chat</p>
          </div>
        ) : rooms.map((r) => (
          <button key={r.id} onClick={() => openRoom(r)} className={cn("w-full flex items-center gap-3 px-3 py-3 hover:bg-[#202c33] transition-colors text-left border-b border-[#222d35]/50", activeRoom?.id === r.id && "bg-[#2a3942]")}>
            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white font-medium text-lg", getRoomColor(r.name))}>
              {r.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[#e9edef] text-[15px] truncate">{r.name}</span>
                <span className="text-[#8696a0] text-[11px] flex-shrink-0 ml-2">{r.lastMessage ? fmtTime(r.lastMessage.createdAt) : ''}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[#8696a0] text-[13px] truncate pr-2">{r.lastMessage ? `${r.lastMessage.senderName}: ${r.lastMessage.body}` : 'No messages yet'}</p>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-[9px] text-[#f59e0b] bg-[#f59e0b]/10 px-1.5 py-0.5 rounded" style={mono}><Timer className="w-2.5 h-2.5 inline mr-0.5" />{fmtExpiry(r.expiresAt)}</span>
                  <span className="text-[9px] text-[#8696a0] bg-[#2a3942] px-1.5 py-0.5 rounded" style={mono}>{r.memberCount}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  /* ═══ ROOM CHAT ═══ */
  const RoomChat = () => (
    <div className={cn("flex-1 flex flex-col h-full", !activeRoom && "hidden md:flex")}>
      {activeRoom ? (
        <>
          <div className="flex items-center gap-3 px-4 py-2.5 bg-[#202c33] border-b border-[#222d35]">
            <button onClick={() => setActiveRoom(null)} className="w-9 h-9 rounded-full hover:bg-[#2a3942] flex items-center justify-center md:hidden"><ArrowLeft className="w-5 h-5 text-[#aebac1]" /></button>
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-lg", getRoomColor(activeRoom.name))}>{activeRoom.name.charAt(0).toUpperCase()}</div>
            <div className="flex-1 min-w-0">
              <p className="text-[#e9edef] text-base font-normal">{activeRoom.name}</p>
              <p className="text-[#8696a0] text-xs" style={mono}>{activeRoom.memberCount} members · <Timer className="w-3 h-3 inline" /> {fmtExpiry(activeRoom.expiresAt)}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setShowInvite(!showInvite)} className="w-9 h-9 rounded-full hover:bg-[#6B5CE7]/20 flex items-center justify-center" title="Invite by number"><UserPlus className="w-4 h-4 text-[#6B5CE7]" /></button>
              {activeRoom.isCreator ? (
                <button onClick={() => destroyRoom(activeRoom.id)} className="w-9 h-9 rounded-full hover:bg-red-500/20 flex items-center justify-center" title="Delete Chat"><Trash2 className="w-4 h-4 text-red-400" /></button>
              ) : (
                <button onClick={() => leaveRoom(activeRoom.id)} className="w-9 h-9 rounded-full hover:bg-[#2a3942] flex items-center justify-center" title="Leave Chat"><LeaveIcon className="w-4 h-4 text-[#aebac1]" /></button>
              )}
              <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-[#2a3942] flex items-center justify-center"><X className="w-4 h-4 text-[#aebac1]" /></button>
            </div>
          </div>
          {showInvite && (
            <div className="px-4 py-3 bg-[#182229] border-b border-[#222d35] flex gap-2">
              <input value={inviteNumber} onChange={(e) => setInviteNumber(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') inviteUser(); }} placeholder="Enter phone number to invite..." className="flex-1 h-9 bg-[#202c33] text-[#e9edef] text-sm placeholder:text-[#8696a0] rounded-lg px-3 border-none outline-none" style={mono} autoFocus />
              <button onClick={inviteUser} className="h-9 px-4 bg-[#6B5CE7] text-white text-xs font-bold rounded-lg hover:bg-[#5a4bd6] active:scale-95 transition-all" style={mono}>Invite</button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-4 sm:px-12 lg:px-16 py-3" style={{ backgroundColor: '#0b141a' }}>
            <div className="flex justify-center py-2 mb-3">
              <span className="bg-[#182229] text-[#f59e0b] text-[10px] px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5" style={mono}><AlertTriangle className="w-3 h-3" /> Chat expires in {fmtExpiry(activeRoom.expiresAt)}</span>
            </div>
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-32">
                <div className="bg-[#182229] text-[#8696a0] text-xs px-4 py-2 rounded-lg shadow-sm" style={mono}>No messages yet. Start the conversation.</div>
              </div>
            ) : (
              <div className="space-y-1">
                {messages.map((m) => {
                  const isSelf = m.senderAccessCodeId === 'self' || m.isOwn;
                  return (
                    <div key={m.id} className={cn("flex mb-0.5", isSelf ? "justify-end" : "justify-start")}>
                      <div className={cn("relative max-w-[65%] px-3 py-1.5 rounded-lg shadow-sm", isSelf ? "bg-[#005c4b] rounded-tr-none" : "bg-[#202c33] rounded-tl-none")}>
                        {!isSelf && <p className="text-[11px] font-medium mb-0.5" style={{ color: getRoomColor(m.senderName).replace('bg-[', '').replace(']', '') === '#00a884' ? '#00a884' : '#6B5CE7' }}>{m.senderName}</p>}
                        <p className="text-[#e9edef] text-[14.2px] leading-[19px] pr-12 break-words">{m.body}</p>
                        <div className="flex items-center justify-end gap-0.5 -mt-3 float-right relative top-3">
                          <span className="text-[11px] text-[#ffffff99]">{fmtMsgTime(m.createdAt)}</span>
                        </div>
                        <div className="clear-both" />
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 px-3 py-2.5 bg-[#202c33]">
            <div className="flex-1 relative">
              <input ref={inputRef} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); } }} placeholder="Type a message" autoComplete="new-password" data-form-type="other" data-lpignore="true" className="w-full h-10 bg-[#2a3942] text-[#e9edef] text-sm placeholder:text-[#8696a0] rounded-lg px-4 border-none outline-none focus:ring-0" maxLength={1600} />
            </div>
            <button onMouseDown={(e) => e.preventDefault()} onClick={() => { sendMsg(); setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 50); }} disabled={sending || !newMessage.trim()} className={cn("w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all", newMessage.trim() ? "bg-[#6B5CE7] hover:bg-[#5a4bd6] active:scale-95" : "bg-[#2a3942]")}>
              {sending ? <Loader2 className="w-4.5 h-4.5 text-white animate-spin" /> : <Send className="w-4.5 h-4.5 text-white" />}
            </button>
          </div>
        </>
      ) : (
        <div className="hidden md:flex flex-col items-center justify-center h-full bg-[#222e35] text-center">
          <div className="w-[320px]">
            <div className="w-20 h-20 rounded-full bg-[#2a3942] flex items-center justify-center mx-auto mb-6"><Users className="w-9 h-9 text-[#8696a0]" /></div>
            <h3 className="text-[#e9edef] text-2xl font-light mb-2">Group Chat</h3>
            <p className="text-[#8696a0] text-sm leading-relaxed">Temporary group chats that auto-expire. No history, no traces.</p>
            <div className="mt-6 flex items-center justify-center gap-2 text-[#8696a0] text-xs"><Lock className="w-3 h-3" /><span>Auto-expire · No logs</span></div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-full bg-[#111b21] overflow-hidden rounded-none md:rounded-lg">
      {RoomList()}
      {RoomChat()}
    </div>
  );
};

export default BurnerRoomsPanel;
