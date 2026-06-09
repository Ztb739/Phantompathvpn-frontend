import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Plus, MessageCircle, Phone, Clock, Loader2, Check, CheckCheck, AlertCircle, ArrowLeft, Search, Paperclip, Mic, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import useSocket from '@/hooks/use-socket';

const API_BASE = 'https://api.phantompathvpn.com/api';

const MessagingPanel = ({ sessionToken, codeHash, virtualNumber, virtualNumberId, onClose, accessCodeId }) => {
  const { toast } = useToast();
  const [activeContact, setActiveContact] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showNewChat, setShowNewChat] = useState(false);
  const [newRecipient, setNewRecipient] = useState('');
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileView, setMobileView] = useState('list');
  const [walletBalance, setWalletBalance] = useState(5.00);
  const [showTopUp, setShowTopUp] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [typingContacts, setTypingContacts] = useState({});
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const pollRef = useRef(null);

  const { connected, on, emit } = useSocket(accessCodeId);

  const hdrs = () => ({ 'Content-Type': 'application/json', 'x-session-token': sessionToken, 'x-code-hash': codeHash });

  const DEMO_CONVERSATIONS = [
    { contactNumber: '+44 7700 900123', lastMessage: 'Thanks, the access code worked perfectly', lastMessageAt: new Date(Date.now() - 1800000).toISOString(), unreadCount: 2, direction: 'INBOUND' },
    { contactNumber: '+1 555 234 5678', lastMessage: 'Sure, I\'ll send the config file now', lastMessageAt: new Date(Date.now() - 7200000).toISOString(), unreadCount: 0, direction: 'OUTBOUND' },
    { contactNumber: '+44 2079 460123', lastMessage: 'Is the VPN still active?', lastMessageAt: new Date(Date.now() - 86400000).toISOString(), unreadCount: 1, direction: 'INBOUND' },
    { contactNumber: '+49 170 1234567', lastMessage: 'Connected from Berlin, all good', lastMessageAt: new Date(Date.now() - 172800000).toISOString(), unreadCount: 0, direction: 'OUTBOUND' },
    { contactNumber: '+33 6 12 34 56 78', lastMessage: 'Merci! eSIM is working great in Paris', lastMessageAt: new Date(Date.now() - 345600000).toISOString(), unreadCount: 0, direction: 'INBOUND' },
  ];

  const DEMO_THREADS = {
    '+44 7700 900123': [
      { id: 'd1', direction: 'OUTBOUND', body: 'Hi, your access code has been activated. You can log in now.', status: 'DELIVERED', createdAt: new Date(Date.now() - 7200000).toISOString() },
      { id: 'd2', direction: 'INBOUND', body: 'Got it, let me try now', status: 'RECEIVED', createdAt: new Date(Date.now() - 5400000).toISOString() },
      { id: 'd3', direction: 'INBOUND', body: 'I\'m in! The dashboard looks great. Really clean design.', status: 'RECEIVED', createdAt: new Date(Date.now() - 3600000).toISOString() },
      { id: 'd4', direction: 'OUTBOUND', body: 'Perfect. Your VPN config is ready to download from the portal. Just tap the download button on the VPN card.', status: 'DELIVERED', createdAt: new Date(Date.now() - 3000000).toISOString() },
      { id: 'd5', direction: 'INBOUND', body: 'Thanks, the access code worked perfectly', status: 'RECEIVED', createdAt: new Date(Date.now() - 1800000).toISOString() },
    ],
    '+1 555 234 5678': [
      { id: 'd6', direction: 'INBOUND', body: 'Hey, can you send me the WireGuard config for the US server?', status: 'RECEIVED', createdAt: new Date(Date.now() - 14400000).toISOString() },
      { id: 'd7', direction: 'OUTBOUND', body: 'Of course! Go to your portal dashboard and switch to the US node first, then download the config.', status: 'DELIVERED', createdAt: new Date(Date.now() - 10800000).toISOString() },
      { id: 'd8', direction: 'INBOUND', body: 'Got it, switching now', status: 'RECEIVED', createdAt: new Date(Date.now() - 9000000).toISOString() },
      { id: 'd9', direction: 'OUTBOUND', body: 'Sure, I\'ll send the config file now', status: 'DELIVERED', createdAt: new Date(Date.now() - 7200000).toISOString() },
    ],
    '+44 2079 460123': [
      { id: 'd10', direction: 'OUTBOUND', body: 'Your eSIM has been activated successfully', status: 'DELIVERED', createdAt: new Date(Date.now() - 259200000).toISOString() },
      { id: 'd11', direction: 'INBOUND', body: 'Thanks! Working great in Spain 🇪🇸', status: 'RECEIVED', createdAt: new Date(Date.now() - 172800000).toISOString() },
      { id: 'd12', direction: 'INBOUND', body: 'Is the VPN still active?', status: 'RECEIVED', createdAt: new Date(Date.now() - 86400000).toISOString() },
    ],
    '+49 170 1234567': [
      { id: 'd13', direction: 'INBOUND', body: 'Hi, just activated the number. How do I switch VPN servers?', status: 'RECEIVED', createdAt: new Date(Date.now() - 345600000).toISOString() },
      { id: 'd14', direction: 'OUTBOUND', body: 'Go to the VPN card on your dashboard and tap any country flag to switch instantly.', status: 'DELIVERED', createdAt: new Date(Date.now() - 259200000).toISOString() },
      { id: 'd15', direction: 'INBOUND', body: 'That was easy! Connected to Frankfurt now', status: 'RECEIVED', createdAt: new Date(Date.now() - 200000000).toISOString() },
      { id: 'd16', direction: 'OUTBOUND', body: 'Connected from Berlin, all good', status: 'DELIVERED', createdAt: new Date(Date.now() - 172800000).toISOString() },
    ],
    '+33 6 12 34 56 78': [
      { id: 'd17', direction: 'OUTBOUND', body: 'Your eSIM for Europe is now active. Enjoy your trip!', status: 'DELIVERED', createdAt: new Date(Date.now() - 432000000).toISOString() },
      { id: 'd18', direction: 'INBOUND', body: 'Merci! eSIM is working great in Paris', status: 'RECEIVED', createdAt: new Date(Date.now() - 345600000).toISOString() },
    ],
  };

  const isDemo = !sessionToken || sessionToken === '';

  const SMS_COST = 0.05;
  const messagesRemaining = Math.floor(walletBalance / SMS_COST);

  const fetchBalance = async () => {
    if (isDemo) { setWalletBalance(5.00); return; }
    try { const res = await fetch(`${API_BASE}/portal/wallet`, { headers: hdrs() }); const data = await res.json(); if (data.balance !== undefined) setWalletBalance(Number(data.balance)); } catch (err) {}
  };

  useEffect(() => {
    fetchConversations();
    fetchBalance();
    pollRef.current = setInterval(() => {
      if (!activeContact) fetchConversations();
      if (activeContact) fetchMessages(activeContact);
      fetchBalance();
    }, 5000);
    return () => clearInterval(pollRef.current);
  }, []);

  useEffect(() => { if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, [messages]);
  useEffect(() => { if (activeContact && inputRef.current) inputRef.current.focus({ preventScroll: true }); }, [activeContact]);

  // WebSocket: real-time message, delivery status, typing
  useEffect(() => {
    if (!connected || isDemo) return;

    const unsub1 = on('new_message', (msg) => {
      if (activeContact && msg.from === activeContact) {
        setMessages((prev) => [...prev, { id: msg.id, direction: 'INBOUND', body: msg.body || '', status: 'RECEIVED', createdAt: msg.createdAt }]);
      }
      fetchConversations();
    });

    const unsub2 = on('delivery_status', (data) => {
      setMessages((prev) => prev.map((m) => m.id === data.messageId ? { ...m, status: data.status } : m));
    });

    const unsub3 = on('typing', (data) => {
      if (data.contactNumber) {
        setTypingContacts((prev) => ({ ...prev, [data.contactNumber]: data.isTyping }));
        if (data.isTyping) setTimeout(() => setTypingContacts((prev) => ({ ...prev, [data.contactNumber]: false })), 5000);
      }
    });

    const unsub4 = on('balance_update', (data) => {
      if (data.balance !== undefined) setWalletBalance(Number(data.balance));
    });

    return () => { unsub1(); unsub2(); unsub3(); unsub4(); };
  }, [connected, activeContact, isDemo]);

  // Send typing indicator (debounced, separate from input onChange)
  const lastTypingRef = useRef(0);
  useEffect(() => {
    if (!newMessage || !connected || isDemo || !activeContact) return;
    const now = Date.now();
    if (now - lastTypingRef.current > 3000) {
      lastTypingRef.current = now;
      emit('typing', { contactNumber: activeContact, isTyping: true });
      setTimeout(() => emit('typing', { contactNumber: activeContact, isTyping: false }), 3000);
    }
  }, [newMessage]);

  // Keyboard-safe chat - Visual Viewport API
  useEffect(() => {
    if (!window.visualViewport) return;
    const handleResize = () => {
      const offset = window.innerHeight - window.visualViewport.height;
      setKeyboardOffset(offset > 50 ? offset : 0);
    };
    window.visualViewport.addEventListener('resize', handleResize);
    window.visualViewport.addEventListener('scroll', handleResize);
    return () => {
      window.visualViewport.removeEventListener('resize', handleResize);
      window.visualViewport.removeEventListener('scroll', handleResize);
    };
  }, []);

  const fetchConversations = async () => {
    if (isDemo) { setConversations(DEMO_CONVERSATIONS); setIsLoading(false); return; }
    try { const res = await fetch(`${API_BASE}/portal/messages`, { headers: hdrs() }); const data = await res.json(); if (data.conversations) setConversations(data.conversations); } catch (err) {}
    setIsLoading(false);
  };

  const fetchMessages = async (contact) => {
    if (isDemo) { setMessages(DEMO_THREADS[contact] || []); return; }
    try { const res = await fetch(`${API_BASE}/portal/messages/thread/${encodeURIComponent(contact)}`, { headers: hdrs() }); const data = await res.json(); if (data.messages) setMessages(data.messages); } catch (err) {}
  };

  const openThread = (contact) => { setActiveContact(contact); setMobileView('thread'); fetchMessages(contact); };

  const startNew = () => {
    if (!newRecipient.trim()) return;
    openThread(newRecipient.trim());
    setShowNewChat(false); setNewRecipient('');
  };

  const sendMsg = async () => {
    if (!newMessage.trim() || sending) return;
    const body = newMessage.trim();
    setNewMessage(''); setSending(true);
    const tempId = `temp-${Date.now()}`;
    setMessages((prev) => [...prev, { id: tempId, direction: 'OUTBOUND', body, status: 'QUEUED', createdAt: new Date().toISOString() }]);

    if (isDemo) {
      setTimeout(() => { setMessages((prev) => prev.map((m) => m.id === tempId ? { ...m, status: 'SENT' } : m)); setTimeout(() => { setMessages((prev) => prev.map((m) => m.id === tempId ? { ...m, status: 'DELIVERED' } : m)); }, 800); }, 400);
      setSending(false); return;
    }

    try {
      const res = await fetch(`${API_BASE}/portal/messages/send`, { method: 'POST', headers: hdrs(), body: JSON.stringify({ virtualNumberId, virtualNumber, to: activeContact, body }) });
      const data = await res.json();
      if (res.status === 402) { setMessages((prev) => prev.filter((m) => m.id !== tempId)); setShowTopUp(true); setSending(false); return; }
      if (!res.ok) { setMessages((prev) => prev.map((m) => m.id === tempId ? { ...m, status: 'FAILED' } : m)); setSending(false); return; }
      setMessages((prev) => prev.map((m) => m.id === tempId ? { ...m, id: data.id, status: data.status || 'SENT' } : m));
    } catch (err) { setMessages((prev) => prev.map((m) => m.id === tempId ? { ...m, status: 'FAILED' } : m)); }
    setSending(false);
  };

  const fmtTime = (d) => { const dt = new Date(d); const diff = Date.now() - dt.getTime(); if (diff < 60000) return 'now'; if (diff < 86400000) return dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); if (diff < 604800000) return dt.toLocaleDateString([], { weekday: 'short' }); return dt.toLocaleDateString([], { month: 'short', day: 'numeric' }); };
  const fmtMsgTime = (d) => new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const fmtDateLabel = (d) => { const dt = new Date(d); const today = new Date(); const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1); if (dt.toDateString() === today.toDateString()) return 'Today'; if (dt.toDateString() === yesterday.toDateString()) return 'Yesterday'; return dt.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' }); };

  const StatusTicks = ({ status }) => {
    if (status === 'QUEUED') return <Clock className="w-3.5 h-3.5 text-gray-500 inline-block ml-1" />;
    if (status === 'SENT') return <Check className="w-3.5 h-3.5 text-gray-500 inline-block ml-1" />;
    if (status === 'DELIVERED') return <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb] inline-block ml-1" />;
    if (status === 'FAILED') return <AlertCircle className="w-3.5 h-3.5 text-red-400 inline-block ml-1" />;
    return null;
  };

  const getInitials = (num) => { const clean = num.replace(/[^0-9+]/g, ''); return clean.slice(-2); };
  const getAvatarColor = (num) => { const colors = ['bg-[#00a884]', 'bg-[#6B5CE7]', 'bg-[#D4614C]', 'bg-[#E8A838]', 'bg-[#5B96E7]', 'bg-[#D45BA8]']; let hash = 0; for (let i = 0; i < num.length; i++) hash = num.charCodeAt(i) + ((hash << 5) - hash); return colors[Math.abs(hash) % colors.length]; };

  const filtered = searchQuery ? conversations.filter((c) => c.contactNumber.includes(searchQuery) || (c.lastMessage && c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))) : conversations;

  /* ═══ SIDEBAR - Conversation List ═══ */
  const Sidebar = () => (
    <div className={cn("flex flex-col bg-[#111b21] border-r border-[#222d35] h-full", activeContact ? "hidden md:flex md:w-[340px] lg:w-[400px] flex-shrink-0" : "w-full md:w-[340px] lg:w-[400px] flex-shrink-0")}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#202c33]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#00a884]/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-[#00a884]" />
          </div>
          <div>
            <p className="text-[#e9edef] text-sm font-medium">Messages</p>
            <p className="text-[#8696a0] text-[11px] font-mono">{virtualNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${messagesRemaining > 10 ? 'bg-[#00a884]/10 text-[#00a884]' : messagesRemaining > 0 ? 'bg-[#FFE600]/10 text-[#FFE600]' : 'bg-[#ef4444]/10 text-[#ef4444]'}`}>{messagesRemaining} msgs left</span>
          {connected && <span className="w-2 h-2 rounded-full bg-[#00a884] animate-pulse" title="Live" />}
          <button onClick={() => setShowNewChat(!showNewChat)} className="w-9 h-9 rounded-full hover:bg-[#2a3942] flex items-center justify-center transition-colors" title="New chat">
            <Plus className="w-5 h-5 text-[#aebac1]" />
          </button>
          <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-[#2a3942] flex items-center justify-center transition-colors" title="Close">
            <X className="w-5 h-5 text-[#aebac1]" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-2 bg-[#111b21]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8696a0]" />
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search or start new chat" className="w-full h-9 bg-[#202c33] text-[#e9edef] text-sm placeholder:text-[#8696a0] rounded-lg pl-10 pr-4 border-none outline-none focus:ring-0" />
        </div>
      </div>

      {/* New Chat Input */}
      <AnimatePresence>
        {showNewChat && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-3 py-2 bg-[#182229] border-b border-[#222d35] flex gap-2">
              <input value={newRecipient} onChange={(e) => setNewRecipient(e.target.value)} placeholder="+44 7xxx..." className="flex-1 h-9 bg-[#202c33] text-[#e9edef] text-sm placeholder:text-[#8696a0] rounded-lg px-3 border-none outline-none" onKeyDown={(e) => e.key === 'Enter' && startNew()} />
              <button onClick={startNew} className="h-9 px-4 bg-[#00a884] text-[#111b21] text-xs font-bold rounded-lg hover:bg-[#06cf9c] transition-colors">Chat</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-40"><Loader2 className="w-6 h-6 text-[#00a884] animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center px-6">
            <p className="text-[#8696a0] text-sm">{searchQuery ? 'No results found' : 'No conversations yet'}</p>
          </div>
        ) : filtered.map((c) => (
          <button key={c.contactNumber} onClick={() => openThread(c.contactNumber)}
            className={cn("w-full flex items-center gap-3 px-3 py-3 hover:bg-[#202c33] transition-colors text-left border-b border-[#222d35]/50", activeContact === c.contactNumber && "bg-[#2a3942]")}>
            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white font-medium text-sm", getAvatarColor(c.contactNumber))}>
              {getInitials(c.contactNumber)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[#e9edef] text-[15px] font-normal truncate">{c.contactNumber}</span>
                <span className={cn("text-[11px] flex-shrink-0 ml-2", c.unreadCount > 0 ? "text-[#00a884]" : "text-[#8696a0]")}>{fmtTime(c.lastMessageAt)}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[#8696a0] text-[13px] truncate pr-2">
                  {c.direction === 'OUTBOUND' && <StatusTicks status="DELIVERED" />}
                  {c.direction === 'OUTBOUND' ? ' ' : ''}{c.lastMessage}
                </p>
                {c.unreadCount > 0 && (
                  <span className="bg-[#00a884] text-[#111b21] text-[11px] font-medium min-w-[20px] h-[20px] px-1.5 rounded-full flex items-center justify-center flex-shrink-0">{c.unreadCount}</span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  /* ═══ THREAD - Chat View ═══ */
  const ThreadView = () => (
    <div className={cn("flex-1 flex flex-col h-full", !activeContact && "hidden md:flex")}>
      {activeContact ? (
        <>
          {/* Thread Header */}
          <div className="flex items-center gap-3 px-4 py-2.5 bg-[#202c33] border-b border-[#222d35]">
            <button onClick={() => { setActiveContact(null); setMobileView('list'); }} className="w-9 h-9 rounded-full hover:bg-[#2a3942] flex items-center justify-center md:hidden">
              <ArrowLeft className="w-5 h-5 text-[#aebac1]" />
            </button>
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm", getAvatarColor(activeContact))}>
              {getInitials(activeContact)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#e9edef] text-base font-normal">{activeContact}</p>
              <p className="text-[#8696a0] text-xs">via {virtualNumber}</p>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-[#2a3942] flex items-center justify-center">
              <X className="w-5 h-5 text-[#aebac1]" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-12 lg:px-16 py-3" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1.5\'/%3E%3Ccircle cx=\'103\' cy=\'103\' r=\'1\'/%3E%3Ccircle cx=\'53\' cy=\'153\' r=\'1.2\'/%3E%3Ccircle cx=\'153\' cy=\'53\' r=\'0.8\'/%3E%3C/g%3E%3C/svg%3E")', backgroundColor: '#0b141a' }}>
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="bg-[#182229] text-[#8696a0] text-xs px-4 py-2 rounded-lg shadow-sm font-mono">Messages are end-to-end secured</div>
              </div>
            ) : (
              <div className="space-y-0.5">
                {messages.map((m, i) => {
                  const isOut = m.direction === 'OUTBOUND';
                  const showDate = i === 0 || new Date(m.createdAt).toDateString() !== new Date(messages[i - 1].createdAt).toDateString();
                  return (
                    <React.Fragment key={m.id}>
                      {showDate && (
                        <div className="flex justify-center py-2 my-2">
                          <span className="bg-[#182229] text-[#8696a0] text-[11px] px-3 py-1 rounded-lg shadow-sm">{fmtDateLabel(m.createdAt)}</span>
                        </div>
                      )}
                      <div className={cn("flex mb-0.5", isOut ? "justify-end" : "justify-start")}>
                        <div className={cn(
                          "relative max-w-[65%] px-3 py-1.5 rounded-lg shadow-sm",
                          isOut
                            ? "bg-[#005c4b] rounded-tr-none"
                            : "bg-[#202c33] rounded-tl-none"
                        )}>
                          {/* Tail */}
                          <div className={cn("absolute top-0 w-2 h-3", isOut ? "-right-2" : "-left-2")}>
                            <svg viewBox="0 0 8 13" width="8" height="13">
                              {isOut
                                ? <path fill="#005c4b" d="M1.533 3.568 8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568Z" />
                                : <path fill="#202c33" d="M6.467 3.568 0 12.193V1h5.188c1.77 0 2.338 1.156 1.279 2.568Z" />
                              }
                            </svg>
                          </div>
                          <p className="text-[#e9edef] text-[14.2px] leading-[19px] break-words">{m.body}</p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-[10px] text-[#ffffff80]">{fmtMsgTime(m.createdAt)}</span>
                            {isOut && <StatusTicks status={m.status} />}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
                {activeContact && typingContacts[activeContact] && (
                  <div className="flex justify-start mb-1">
                    <div className="bg-[#202c33] rounded-lg rounded-tl-none px-4 py-2.5 shadow-sm">
                      <div className="flex gap-1 items-center">
                        <span className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Top-up prompt */}
          {showTopUp && (
            <div className="px-3 py-2.5 bg-[#182229] border-t border-[#222d35]">
              <div className="bg-[#1a2517] border border-[#FFE600]/20 rounded-xl p-4 text-center shadow-[0_0_20px_rgba(245,158,11,0.05)]">
                <p className="text-[#e9edef] text-sm font-medium mb-1">Messages Depleted</p>
                <p className="text-[#8696a0] text-xs mb-3">Add more to continue chatting</p>
                <div className="flex gap-2 justify-center mb-2">
                  <button onClick={() => { toast({ title: 'Private Beta', description: 'Top-ups coming soon.' }); setShowTopUp(false); }} className="h-8 px-4 bg-[#FFE600]/20 border border-[#FFE600]/40 text-[#FFE600] text-xs font-bold rounded-lg hover:bg-[#FFE600]/30 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] active:scale-95 transition-all">£1 — 20 msgs</button>
                  <button onClick={() => { toast({ title: 'Private Beta', description: 'Top-ups coming soon.' }); setShowTopUp(false); }} className="h-8 px-4 bg-[#FFE600]/20 border border-[#FFE600]/40 text-[#FFE600] text-xs font-bold rounded-lg hover:bg-[#FFE600]/30 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] active:scale-95 transition-all">£3 — 60 msgs</button>
                  <button onClick={() => { toast({ title: 'Private Beta', description: 'Top-ups coming soon.' }); setShowTopUp(false); }} className="h-8 px-4 bg-[#3affc2]/20 border border-[#3affc2]/40 text-[#3affc2] text-xs font-bold rounded-lg hover:bg-[#3affc2]/30 hover:shadow-[0_0_15px_rgba(58,255,194,0.2)] active:scale-95 transition-all animate-pulse">£5 — 100 msgs</button>
                </div>
                <button onClick={() => setShowTopUp(false)} className="text-[#8696a0] text-[11px] hover:text-[#e9edef] transition-colors">Dismiss</button>
              </div>
            </div>
          )}

          {/* Input - keyboard-safe with Visual Viewport API */}
          <div className="flex items-center gap-2 px-3 py-2.5 bg-[#202c33]" style={{ paddingBottom: keyboardOffset > 0 ? `${keyboardOffset + 10}px` : undefined, transition: 'padding-bottom 0.1s ease' }}>
            <button className="w-9 h-9 rounded-full hover:bg-[#2a3942] flex items-center justify-center flex-shrink-0" title="Attach">
              <Paperclip className="w-5 h-5 text-[#aebac1]" />
            </button>
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); } }}
                placeholder="Type a message"
                className="w-full h-10 bg-[#2a3942] text-[#e9edef] text-sm placeholder:text-[#8696a0] rounded-lg px-4 border-none outline-none focus:ring-0"
                maxLength={1600}
              />
            </div>
            {newMessage.trim() ? (
              <button onClick={sendMsg} disabled={sending} className="w-9 h-9 rounded-full bg-[#00a884] hover:bg-[#06cf9c] flex items-center justify-center flex-shrink-0 transition-colors">
                {sending ? <Loader2 className="w-4.5 h-4.5 text-[#111b21] animate-spin" /> : <Send className="w-4.5 h-4.5 text-[#111b21]" />}
              </button>
            ) : (
              <button className="w-9 h-9 rounded-full hover:bg-[#2a3942] flex items-center justify-center flex-shrink-0" title="Voice message">
                <Mic className="w-5 h-5 text-[#aebac1]" />
              </button>
            )}
          </div>
        </>
      ) : (
        /* Empty state - no conversation selected (desktop) */
        <div className="hidden md:flex flex-col items-center justify-center h-full bg-[#222e35] text-center">
          <div className="w-[320px]">
            <div className="w-20 h-20 rounded-full bg-[#2a3942] flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-9 h-9 text-[#8696a0]" />
            </div>
            <h3 className="text-[#e9edef] text-2xl font-light mb-2">PhantomPath Messages</h3>
            <p className="text-[#8696a0] text-sm leading-relaxed">Send and receive messages using your virtual number. Your conversations are private and controlled.</p>
            <div className="mt-6 flex items-center justify-center gap-2 text-[#8696a0] text-xs">
              <Lock className="w-3 h-3" />
              <span>End-to-end secured</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-full bg-[#111b21] overflow-hidden rounded-none md:rounded-lg">
      <Sidebar />
      <ThreadView />
    </div>
  );
};

export default MessagingPanel;