import React from 'react';
import { X, PhoneCall, MessageSquare, Mail, Globe, MapPin } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1B365D]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-[#1E293B]/15 max-h-[90vh] flex flex-col">
        <div className="bg-[#1B365D] p-4 text-[#FDFBF7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-[#FDFBF7]/80" />
            <h3 className="font-bold text-base">Kontak Resmi Disdukcapil</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-[#FDFBF7]/80 hover:bg-[#244675] transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 space-y-3.5">
          <div className="p-3.5 bg-[#FDFBF7] rounded-2xl border border-[#1E293B]/15 flex items-center gap-3 shadow-sm">
            <div className="p-3 bg-[#1B365D] text-[#FDFBF7] rounded-xl shadow-sm">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-[#1B365D] uppercase block">Call Center Halo Dukcapil</span>
              <h4 className="font-extrabold text-base text-slate-900 font-mono">1500537</h4>
              <p className="text-[10px] text-slate-500">Jam Layanan: Senin - Jumat (08:00 - 16:00 WIB)</p>
            </div>
          </div>

          <div className="p-3.5 bg-[#FDFBF7] rounded-2xl border border-[#1E293B]/15 flex items-center gap-3 shadow-sm">
            <div className="p-3 bg-[#1B365D] text-[#FDFBF7] rounded-xl shadow-sm">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-[#1B365D] uppercase block">WhatsApp Official Dukcapil</span>
              <h4 className="font-extrabold text-sm text-slate-900 font-mono">+62 811-800-5373</h4>
              <p className="text-[10px] text-slate-500">Respon cepat via Chatbot & Operator</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-700 pt-2 border-t border-[#1E293B]/15">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#1B365D]" />
              <span>Email: callcenter@dukcapil.kemendagri.go.id</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#1B365D]" />
              <span>Website: dukcapil.kemendagri.go.id</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#1B365D] flex-shrink-0 mt-0.5" />
              <span>Kantor Pusat: Jl. Raya Pasar Minggu KM 19, Jakarta Selatan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
