import React from 'react';
import { X, Navigation, Phone, ShieldCheck, MapPin, Truck } from 'lucide-react';
import { MOCK_USER } from '../../data/mockData';

export default function MapModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1B365D]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-[#1E293B]/15 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#1B365D] p-4 text-[#FDFBF7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-[#FDFBF7]/80 animate-pulse" />
            <div>
              <h3 className="font-bold text-sm leading-none">Peta Pelacakan Kurir Live</h3>
              <p className="text-[10px] text-[#FDFBF7]/80 mt-0.5">JNE Express • Resi {MOCK_USER.resiNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#FDFBF7]/80 hover:bg-[#244675] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Map Simulation Graphic */}
        <div className="relative h-64 bg-[#FDFBF7] overflow-hidden flex items-center justify-center">
          {/* Mock Map Background SVG Pattern */}
          <div className="absolute inset-0 bg-[#FDFBF7] opacity-90">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Roads / Routes */}
              <path d="M 20 20 Q 150 80, 220 180 T 380 220" fill="none" stroke="#94a3b8" strokeWidth="14" strokeLinecap="round" />
              <path d="M 20 20 Q 150 80, 220 180 T 380 220" fill="none" stroke="#1B365D" strokeWidth="4" strokeDasharray="8,6" strokeLinecap="round" />
            </svg>
          </div>

          {/* Destination Marker */}
          <div className="absolute top-12 right-12 flex flex-col items-center animate-bounce">
            <div className="bg-[#1B365D] text-[#FDFBF7] p-1.5 rounded-full shadow-lg ring-4 ring-[#1B365D]/40">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="bg-[#1B365D] text-[#FDFBF7] text-[10px] font-bold px-2 py-0.5 rounded shadow mt-1">
              Rumah Pemohon
            </span>
          </div>

          {/* Courier Moving Marker */}
          <div className="absolute bottom-16 left-20 flex flex-col items-center">
            <div className="bg-[#1B365D] text-[#FDFBF7] p-2 rounded-full shadow-xl ring-4 ring-[#1B365D]/40 animate-pulse">
              <Truck className="w-5 h-5" />
            </div>
            <div className="bg-[#1B365D] text-[#FDFBF7] text-[10px] font-bold px-2 py-0.5 rounded shadow mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#FDFBF7] rounded-full animate-ping"></span>
              Budi Santoso (Kurir)
            </div>
          </div>

          <div className="absolute bottom-3 right-3 bg-[#FDFBF7]/95 backdrop-blur px-2.5 py-1 rounded-lg border border-[#1E293B]/15 text-[10px] font-bold text-slate-700 shadow-sm">
            📍 Radius: ~1.2 km dari lokasi Anda
          </div>
        </div>

        {/* Courier Details */}
        <div className="p-4 bg-[#FDFBF7] space-y-3">
          <div className="flex items-center justify-between p-3 bg-[#FDFBF7] rounded-2xl border border-[#1E293B]/15 shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src={MOCK_USER.courierAvatar}
                alt={MOCK_USER.courierName}
                className="w-10 h-10 rounded-full object-cover border-2 border-[#1B365D] shadow-sm"
              />
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">{MOCK_USER.courierName}</h4>
                <p className="text-[11px] font-semibold text-slate-500">{MOCK_USER.courierService}</p>
                <span className="text-[10px] text-[#1B365D] font-mono">{MOCK_USER.courierVehicle}</span>
              </div>
            </div>

            <a
              href={`tel:${MOCK_USER.courierPhone}`}
              className="p-2.5 bg-[#1B365D] hover:bg-[#244675] text-[#FDFBF7] rounded-xl shadow-md transition flex items-center gap-1.5 text-xs font-bold"
            >
              <Phone className="w-4 h-4" /> Hubungi
            </a>
          </div>

          <div className="text-[11px] text-[#1B365D] bg-[#1B365D]/10 p-2.5 rounded-xl border border-[#1E293B]/15 flex items-start gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#1B365D] flex-shrink-0 mt-0.5" />
            <span>
              Kurir resmi mitra Disdukcapil wajib mengenakan identitas resmi & rompi JNE Express saat penyerahan e-KTP.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
