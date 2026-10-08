import React, { useState } from 'react';
import { X, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { MOCK_REQUIREMENTS } from '../../data/mockData';

export default function RequirementsModal({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1B365D]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-[#1E293B]/15 max-h-[90vh] flex flex-col">
        <div className="bg-[#1B365D] p-4 text-[#FDFBF7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#FDFBF7]/80" />
            <h3 className="font-bold text-base">Persyaratan Berkas KTP-el</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#FDFBF7]/80 hover:bg-[#244675] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 bg-[#FDFBF7] border-b border-[#1E293B]/15 flex gap-2 overflow-x-auto scrollbar-none">
          {MOCK_REQUIREMENTS.map((req, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeCategory === idx
                  ? 'bg-[#1B365D] text-[#FDFBF7] shadow-sm'
                  : 'bg-[#FDFBF7] text-slate-700 border border-[#1E293B]/15 hover:bg-[#1B365D]/10'
              }`}
            >
              {req.title.split(' ')[0]} {req.title.split(' ')[1]}
            </button>
          ))}
        </div>

        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          <div>
            <h4 className="font-extrabold text-sm text-slate-900 mb-1">
              {MOCK_REQUIREMENTS[activeCategory].title}
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              Pastikan berkas dokumen di bawah ini telah disiapkan secara lengkap sebelum datang ke kantor Disdukcapil/Kecamatan.
            </p>

            <ul className="space-y-2.5">
              {MOCK_REQUIREMENTS[activeCategory].items.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5 bg-[#FDFBF7] p-3 rounded-xl border border-[#1E293B]/15 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#1B365D] flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-800 font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-[#1B365D]/10 rounded-xl border border-[#1E293B]/15 text-[11px] text-[#1B365D]">
            💡 <strong>Info Penting:</strong> Pembuatan KTP-el baru dan pengiriman via ekspedisi resmi Dukcapil tidak dipungut biaya apapun (Gratis).
          </div>
        </div>

        <div className="p-4 border-t border-[#1E293B]/15 bg-[#FDFBF7]">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#1B365D] hover:bg-[#244675] text-[#FDFBF7] font-bold rounded-xl text-xs transition"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
