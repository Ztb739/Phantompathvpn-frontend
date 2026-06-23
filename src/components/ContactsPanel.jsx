import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Edit2, Trash2, Users, Search, Loader2, Phone, Save, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const API_BASE = 'https://api.phantompathvpn.com/api';
const mono = { fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace" };

const ContactsPanel = ({ sessionToken, codeHash, onClose, onSelectContact, onCall, onMessage }) => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ phoneNumber: '', displayName: '' });
  const [search, setSearch] = useState('');

  const hdrs = () => ({ 'Content-Type': 'application/json', 'x-session-token': sessionToken, 'x-code-hash': codeHash });
  const isDemo = !sessionToken || sessionToken === '' || sessionToken === 'demo-token';

  const DEMO_CONTACTS = [
    { id: 'd1', phoneNumber: '+44 7700 900123', displayName: 'Sarah M' },
    { id: 'd2', phoneNumber: '+1 555 234 5678', displayName: 'Alex W' },
    { id: 'd3', phoneNumber: '+49 170 1234567', displayName: 'Max B' },
    { id: 'd4', phoneNumber: '+33 6 12 34 56 78', displayName: 'Claire D' },
  ];

  useEffect(() => { fetchContacts(); }, []);

  const fetchContacts = async () => {
    if (isDemo) { setContacts(DEMO_CONTACTS); setIsLoading(false); return; }
    try {
      const res = await fetch(`${API_BASE}/portal/contacts`, { headers: hdrs() });
      const data = await res.json();
      if (data.contacts) setContacts(data.contacts);
    } catch (err) {}
    setIsLoading(false);
  };

  const saveContact = async () => {
    if (!form.phoneNumber.trim() || !form.displayName.trim()) return;
    if (isDemo) {
      if (editingId) { setContacts(contacts.map(c => c.id === editingId ? { ...c, displayName: form.displayName } : c)); }
      else { setContacts([...contacts, { id: `d${Date.now()}`, ...form }]); }
      resetForm(); return;
    }
    try {
      if (editingId) {
        await fetch(`${API_BASE}/portal/contacts/${editingId}`, { method: 'PUT', headers: hdrs(), body: JSON.stringify({ displayName: form.displayName }) });
      } else {
        await fetch(`${API_BASE}/portal/contacts`, { method: 'POST', headers: hdrs(), body: JSON.stringify(form) });
      }
      fetchContacts();
    } catch (err) { toast({ title: 'Error', description: 'Failed to save contact', variant: 'destructive' }); }
    resetForm();
  };

  const deleteContact = async (id) => {
    if (isDemo) { setContacts(contacts.filter(c => c.id !== id)); return; }
    try { await fetch(`${API_BASE}/portal/contacts/${id}`, { method: 'DELETE', headers: hdrs() }); fetchContacts(); } catch (err) {}
  };

  const startEdit = (c) => { setEditingId(c.id); setForm({ phoneNumber: c.phoneNumber, displayName: c.displayName }); setShowAdd(true); };
  const resetForm = () => { setShowAdd(false); setEditingId(null); setForm({ phoneNumber: '', displayName: '' }); };

  const filtered = contacts.filter(c => c.displayName.toLowerCase().includes(search.toLowerCase()) || c.phoneNumber.includes(search));
  const getColor = (name) => { const colors = ['bg-[#00a884]', 'bg-[#6B5CE7]', 'bg-[#D4614C]', 'bg-[#E8A838]', 'bg-[#5B96E7]', 'bg-[#D45BA8]']; let h = 0; for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h); return colors[Math.abs(h) % colors.length]; };

  return (
    <div className="flex flex-col h-full bg-[#111b21]">
      <div className="flex items-center justify-between px-4 py-3 bg-[#202c33]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center"><Users className="w-5 h-5 text-amber-400" /></div>
          <div><p className="text-[#e9edef] text-sm font-medium">Contacts</p><p className="text-[#8696a0] text-[11px]" style={mono}>{contacts.length} saved</p></div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { resetForm(); setShowAdd(!showAdd); }} className="w-9 h-9 rounded-full hover:bg-[#2a3942] flex items-center justify-center"><Plus className="w-5 h-5 text-[#aebac1]" /></button>
          <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-[#2a3942] flex items-center justify-center"><X className="w-5 h-5 text-[#aebac1]" /></button>
        </div>
      </div>

      {showAdd && (
        <div className="px-3 py-3 bg-[#182229] border-b border-[#222d35] space-y-2">
          <input value={form.displayName} onChange={(e) => setForm({...form, displayName: e.target.value})} placeholder="Display name..." className="w-full h-9 bg-[#202c33] text-[#e9edef] text-sm placeholder:text-[#8696a0] rounded-lg px-3 border-none outline-none" style={mono} />
          {!editingId && <input value={form.phoneNumber} onChange={(e) => setForm({...form, phoneNumber: e.target.value})} placeholder="Phone number (e.g. +44 7700 900123)..." className="w-full h-9 bg-[#202c33] text-[#e9edef] text-sm placeholder:text-[#8696a0] rounded-lg px-3 border-none outline-none" style={mono} />}
          <div className="flex gap-2">
            <button onClick={resetForm} className="flex-1 h-9 bg-[#2a3942] text-[#8696a0] text-xs rounded-lg active:scale-95" style={mono}>Cancel</button>
            <button onClick={saveContact} className="flex-1 h-9 bg-[#00a884] text-[#111b21] text-xs font-bold rounded-lg hover:bg-[#06cf9c] active:scale-95" style={mono}><Save className="w-3 h-3 inline mr-1" />{editingId ? 'Update' : 'Save'}</button>
          </div>
        </div>
      )}

      <div className="px-3 py-2 bg-[#111b21]">
        <div className="bg-[#202c33] rounded-lg flex items-center px-3 gap-2">
          <Search className="w-4 h-4 text-[#8696a0]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search contacts..." autoComplete="off" className="flex-1 h-9 bg-transparent text-[#e9edef] text-sm placeholder:text-[#8696a0] outline-none" style={mono} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-32"><Loader2 className="w-5 h-5 text-amber-400 animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <p className="text-[#8696a0] text-sm mb-1">No contacts found</p>
            <p className="text-[#8696a0] text-xs">Tap + to add a contact</p>
          </div>
        ) : filtered.map((c) => (
          <div key={c.id} className="flex items-center gap-3 px-4 py-3 hover:bg-[#202c33] transition-colors border-b border-[#222d35]/50">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0 ${getColor(c.displayName)}`}>
              {c.displayName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0" onClick={() => onSelectContact && onSelectContact(c)}>
              <p className="text-[#e9edef] text-[15px]">{c.displayName}</p>
              <p className="text-[#8696a0] text-[13px]" style={mono}>{c.phoneNumber}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => onMessage && onMessage(c.phoneNumber)} className="w-8 h-8 rounded-full hover:bg-[#00a884]/10 flex items-center justify-center" title="Message"><MessageCircle className="w-3.5 h-3.5 text-[#00a884]" /></button>
              <button onClick={() => onCall && onCall(c.phoneNumber)} className="w-8 h-8 rounded-full hover:bg-[#3affc2]/10 flex items-center justify-center" title="Call"><Phone className="w-3.5 h-3.5 text-[#3affc2]" /></button>
              <button onClick={() => startEdit(c)} className="w-8 h-8 rounded-full hover:bg-[#2a3942] flex items-center justify-center"><Edit2 className="w-3.5 h-3.5 text-[#8696a0]" /></button>
              <button onClick={() => deleteContact(c.id)} className="w-8 h-8 rounded-full hover:bg-red-500/10 flex items-center justify-center"><Trash2 className="w-3.5 h-3.5 text-[#8696a0] hover:text-red-400" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsPanel;
