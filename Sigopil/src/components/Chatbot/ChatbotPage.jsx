import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Paperclip, 
  Mic, 
  MapPin, 
  Phone, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  RefreshCw,
  AlertTriangle,
  FileText,
  Search,
  CheckCircle2
} from 'lucide-react';
import { MOCK_USER, INITIAL_CHAT_MESSAGES } from '../../data/mockData';

export default function ChatbotPage({ onOpenMap, onOpenRequirements, user }) {
  const activeUser = user || MOCK_USER;
  const userId = activeUser.id || 'default';
  const storageKey = `dukcapil_chat_messages_${userId}`;

  const getInitialChat = (u) => [
    {
      id: 'm1',
      sender: 'bot',
      time: '10:24 WIB',
      text: `Halo **${u?.name?.split(' ')[0] || 'Warga'}**! Saya **Si-Bo**, asisten virtual Sigopil. Ada yang bisa saya bantu terkait KTP-el atau dokumen kependudukan hari ini?`,
      chips: [
        { id: 'c1', label: 'Cek Posisi KTP Saya', icon: 'package' },
        { id: 'c2', label: 'Syarat KTP Pemula', icon: 'file-text' },
        { id: 'c3', label: 'Lokasi Kantor', icon: 'map-pin' },
        { id: 'c4', label: 'Estimasi Cetak', icon: 'clock' },
      ],
    },
  ];

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : getInitialChat(activeUser);
    } catch (e) {
      return getInitialChat(activeUser);
    }
  });
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedResi, setCopiedResi] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Re-sync messages state when active user changes (e.g. login switch between Siti & Dimas)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      setMessages(saved ? JSON.parse(saved) : getInitialChat(activeUser));
    } catch (e) {
      setMessages(getInitialChat(activeUser));
    }
  }, [userId]);

  // Persist messages whenever messages or storageKey changes
  useEffect(() => {
    scrollToBottom();
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch (e) {}
  }, [messages, isTyping, storageKey]);

  const handleResetChat = () => {
    const initial = getInitialChat(activeUser);
    setMessages(initial);
    localStorage.removeItem(storageKey);
  };

  const handleCopyResi = () => {
    navigator.clipboard.writeText(activeUser.resiNumber || '');
    setCopiedResi(true);
    setTimeout(() => setCopiedResi(false), 2000);
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      time: '10:25 WIB',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const lower = query.toLowerCase();

      if (lower.includes('posisi') || lower.includes('lacak') || lower.includes('317305') || lower.includes('nik') || lower.includes('ktp')) {
        const botCardMsg = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          time: '10:25 WIB',
          isTrackingCard: true,
        };

        const botWarningMsg = {
          id: (Date.now() + 2).toString(),
          sender: 'bot',
          time: '10:26 WIB',
          text: `⚠️ **Catatan Penting:** Pastikan Anda atau salah satu anggota keluarga yang tercantum dalam **1 Kartu Keluarga (KK)** siap menerima dengan menunjukkan dokumen fisik KK asli kepada kurir ya!\n\nAda pertanyaan lain yang ingin ditanyakan kepada Si-Bo?`,
          chips: [
            { id: 'c-req', label: 'Syarat KTP Pemula', icon: 'file-text' },
            { id: 'c-loc', label: 'Lokasi Kantor', icon: 'map-pin' },
          ],
        };

        setMessages((prev) => [...prev, botCardMsg, botWarningMsg]);
      } else if (lower.includes('syarat') || lower.includes('pemula')) {
        const botMsg = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          time: '10:25 WIB',
          text: `Persyaratan Perekaman **KTP-el Pemula (Usia 17 Tahun)**:\n\n1. Fotokopi Kartu Keluarga (KK) terbaru\n2. Berusia minimal 17 tahun\n3. Membawa Surat Pengantar RT/RW setempat.\n\nSemua pelayanan pencetakan dan pengantaran via ekspedisi **GRATIS 100%**.`,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else if (lower.includes('lokasi') || lower.includes('kantor')) {
        const botMsg = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          time: '10:25 WIB',
          text: `📍 **Lokasi Kantor Pelayanan Disdukcapil Terdekat:**\n\n- **Kecamatan Kebon Jeruk:** Jl. Raya Kebon Jeruk No. 2, Jakarta Barat\n- **Kecamatan Palmerah:** Jl. Palmerah Barat No. 34\n- **Jam Operasional:** Senin - Jumat (08:00 - 15:30 WIB)`,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const botMsg = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          time: '10:25 WIB',
          text: `Terima kasih! Saya telah mencatat pertanyaan Anda mengenai **"${query}"**. Silakan pilih topik di bawah ini atau masukkan 16 digit NIK Anda untuk langsung memantau status fisik KTP.`,
          chips: [
            { id: 'c1', label: 'Cek Posisi KTP Saya', icon: 'package' },
            { id: 'c2', label: 'Syarat KTP Pemula', icon: 'file-text' },
          ],
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto px-2 sm:px-6">
      {/* Header Chatbot */}
      <div className="bg-[#1B365D] text-[#FDFBF7] p-4 rounded-t-3xl border border-[#1E293B]/15 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#1B365D] to-[#244675] p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-[#0f2038] rounded-[14px] flex items-center justify-center">
                <Bot className="w-6 h-6 text-[#FDFBF7]" />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#FDFBF7] border-2 border-[#1B365D] rounded-full animate-pulse"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-base text-[#FDFBF7]">Si-Bo AI</h2>
              <span className="text-[10px] font-bold bg-[#FDFBF7]/20 text-[#FDFBF7] px-2 py-0.5 rounded border border-[#FDFBF7]/30">
                Resmi Dukcapil
              </span>
            </div>
            <p className="text-xs text-slate-200 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 bg-[#FDFBF7] rounded-full animate-ping"></span>
              Online • Siap melayani 24/7
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="p-2.5 text-slate-200 hover:text-[#FDFBF7] rounded-xl hover:bg-[#244675] transition"
          title="Reset Percakapan"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FDFBF7]/90 border-x border-[#1E293B]/15">
        <div className="text-center my-1">
          <span className="bg-[#FDFBF7] text-[#1B365D] text-xs font-bold px-4 py-1.5 rounded-full border border-[#1E293B]/15 shadow-sm">
            HARI INI • 10:24 WIB
          </span>
        </div>

        {messages.map((msg) => {
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex flex-col items-end">
                <div className="bg-[#1B365D] text-[#FDFBF7] p-4 rounded-2xl rounded-tr-none max-w-[85%] sm:max-w-[70%] text-xs sm:text-sm font-semibold shadow-md">
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 mr-1 flex items-center gap-1">
                  {msg.time} <CheckCircle2 className="w-3.5 h-3.5 text-[#1B365D] inline" />
                </span>
              </div>
            );
          }

          if (msg.isTrackingCard) {
            return (
              <div key={msg.id} className="flex items-start gap-3 max-w-[95%] sm:max-w-[80%]">
                <div className="w-8 h-8 rounded-xl bg-[#1B365D] text-[#FDFBF7] flex items-center justify-center flex-shrink-0 mt-1 shadow">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="space-y-2.5 flex-1">
                  {/* Courier Tracking Summary Card Embed */}
                  <div className="bg-[#FDFBF7] rounded-3xl p-5 shadow-xl border border-[#1E293B]/15 text-slate-900 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#1B365D]/10 text-[#1B365D] font-extrabold text-xs flex items-center justify-center">
                          {activeUser.courierService ? activeUser.courierService.split(' ')[0] : 'JNE'}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-slate-900">{activeUser.courierService || 'Ekspedisi e-KTP'}</h4>
                          <p className="text-xs text-slate-500">Layanan Antar Mandiri Dukcapil</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-[#1B365D]/10 text-[#1B365D] text-xs font-bold rounded-full border border-[#1E293B]/15">
                        {activeUser.statusBadge || 'Diantar Kurir'}
                      </span>
                    </div>

                    <div className="bg-slate-100/60 p-3 rounded-2xl border border-[#1E293B]/15 flex items-center justify-between text-xs sm:text-sm">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-extrabold block">
                          NOMOR RESI PENGIRIMAN
                        </span>
                        <span className="font-extrabold font-mono text-slate-900 text-sm">{activeUser.resiNumber}</span>
                      </div>
                      <button
                        onClick={handleCopyResi}
                        className="px-3 py-1.5 bg-[#1B365D]/10 hover:bg-[#1B365D]/20 text-[#1B365D] rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                      >
                        {copiedResi ? <Check className="w-3.5 h-3.5 text-[#1B365D]" /> : <Copy className="w-3.5 h-3.5 text-[#1B365D]" />}
                        {copiedResi ? 'Tersalin' : 'Salin'}
                      </button>
                    </div>

                    <div className="p-3.5 bg-[#1B365D] text-[#FDFBF7] rounded-2xl shadow-md flex items-center gap-3.5">
                      <div className="p-2.5 bg-[#FDFBF7]/20 rounded-xl">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-200 block">Estimasi Paket Tiba</span>
                        <h5 className="font-extrabold text-sm text-[#FDFBF7]">{activeUser.etaTimeWindow}</h5>
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-100/60 rounded-2xl border border-[#1E293B]/15 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={activeUser.courierAvatar}
                          alt={activeUser.courierName}
                          className="w-10 h-10 rounded-full object-cover border-2 border-[#1B365D]"
                        />
                        <div>
                          <span className="text-xs text-slate-500 block font-medium">Kurir Bertugas</span>
                          <h5 className="font-extrabold text-sm text-slate-900">{activeUser.courierName}</h5>
                          <p className="text-xs text-slate-500 font-mono">{activeUser.courierVehicle}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold bg-[#1B365D]/10 text-[#1B365D] px-3 py-1 rounded-full border border-[#1E293B]/15 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#1B365D]" /> Terverifikasi
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <button
                        onClick={onOpenMap}
                        className="py-2.5 bg-[#1B365D] hover:bg-[#244675] text-[#FDFBF7] font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition shadow"
                      >
                        <MapPin className="w-4 h-4 text-[#FDFBF7]" /> Lacak di Peta
                      </button>

                      <a
                        href={`tel:${activeUser.courierPhone}`}
                        className="py-2.5 bg-[#244675] hover:bg-[#12243e] text-[#FDFBF7] font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition shadow"
                      >
                        <Phone className="w-4 h-4 text-[#FDFBF7]" /> Hubungi Kurir
                      </a>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 pl-1">{msg.time}</span>
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className="flex items-start gap-3 max-w-[90%] sm:max-w-[75%]">
              <div className="w-8 h-8 rounded-xl bg-[#1B365D] text-[#FDFBF7] flex items-center justify-center flex-shrink-0 mt-1 shadow">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="bg-[#FDFBF7] text-slate-900 p-4 rounded-2xl rounded-tl-none text-xs sm:text-sm leading-relaxed border border-[#1E293B]/15 shadow-sm">
                  <p className="whitespace-pre-line">{msg.text.replace(/\*\*/g, '')}</p>
                </div>

                {msg.chips && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {msg.chips.map((chip) => (
                      <button
                        key={chip.id}
                        onClick={() => handleSendMessage(chip.label)}
                        className="px-3.5 py-2 bg-[#FDFBF7] hover:bg-[#1B365D] text-[#1B365D] hover:text-[#FDFBF7] rounded-full text-xs font-bold border border-[#1E293B]/15 transition flex items-center gap-1.5 shadow-sm active:scale-95"
                      >
                        {chip.icon === 'package' && <Search className="w-3.5 h-3.5 text-[#1B365D]" />}
                        {chip.icon === 'file-text' && <FileText className="w-3.5 h-3.5 text-[#1B365D]" />}
                        {chip.icon === 'map-pin' && <MapPin className="w-3.5 h-3.5 text-[#1B365D]" />}
                        {chip.icon === 'clock' && <Clock className="w-3.5 h-3.5 text-[#1B365D]" />}
                        {chip.label}
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[10px] text-slate-500 mt-1 pl-1 block">{msg.time}</span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-[#1B365D] text-xs font-medium">
            <Bot className="w-4 h-4 text-[#1B365D] animate-pulse" />
            <span className="italic">Si-Bo sedang mengetik...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3.5 bg-[#FDFBF7] border-x border-b border-[#1E293B]/15 rounded-b-3xl shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2.5"
        >
          <button
            type="button"
            onClick={onOpenRequirements}
            className="p-3 text-[#1B365D] hover:text-[#FDFBF7] bg-[#1B365D]/10 hover:bg-[#1B365D] rounded-xl transition"
            title="Lampirkan Dokumen"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ketik pertanyaan atau NIK di sini..."
            className="flex-1 bg-slate-100/70 text-slate-900 placeholder-slate-400 px-4 py-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1B365D] border border-[#1E293B]/15"
          />

          <button
            type="button"
            onClick={() => handleSendMessage(`Cek status KTP NIK ${activeUser.nikFull}`)}
            className="p-3 text-[#1B365D] hover:text-[#FDFBF7] bg-[#1B365D]/10 hover:bg-[#1B365D] rounded-xl transition"
            title="Voice Assistant Simulator"
          >
            <Mic className="w-4 h-4" />
          </button>

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-3 bg-[#1B365D] hover:bg-[#244675] disabled:opacity-50 text-[#FDFBF7] rounded-xl shadow transition active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-slate-500 text-center mt-2">
          Sigopil AI Dilindungi Enkripsi Negara BSSN
        </p>
      </div>
    </div>
  );
}
