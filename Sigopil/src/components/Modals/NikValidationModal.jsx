import React, { useState } from 'react';
import { X, Fingerprint, Search, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function NikValidationModal({ isOpen, onClose }) {
  const [nikInput, setNikInput] = useState("3173051204050080");
  const [statusResult, setStatusResult] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleValidate = (e) => {
    e.preventDefault();
    if (nikInput.length < 16) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (nikInput.includes("317305")) {
        setStatusResult({
          valid: true,
          name: "Dimas Aditya Pratama",
          provinsi: "DKI Jakarta",
          kabupaten: "Kota Jakarta Barat",
          kecamatan: "Kebon Jeruk",
          statusDukcapil: "TERCATAT AKTIF DUKCAPIL PUSAT",
          statusKTP: "Blangko KTP Sudah Dicetak (Dalam Pengiriman Kurir)",
        });
      } else {
        setStatusResult({
          valid: true,
          name: "SITI NURHALIZA",
          provinsi: "Jawa Barat",
          kabupaten: "Kota Bandung",
          kecamatan: "Coblong",
          statusDukcapil: "TERCATAT AKTIF DUKCAPIL PUSAT",
          statusKTP: "KTP-el Aktif Terverifikasi",
        });
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1B365D]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-[#1E293B]/15 max-h-[90vh] flex flex-col">
        <div className="bg-[#1B365D] p-4 text-[#FDFBF7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-[#FDFBF7]/80" />
            <h3 className="font-bold text-base">Validasi NIK Nasional</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#FDFBF7]/80 hover:bg-[#244675] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          <p className="text-xs text-slate-600">
            Periksa keaktifan Nomor Induk Kependudukan (NIK) 16 digit pada database Terpusat Ditjen Dukcapil Kemendagri.
          </p>

          <form onSubmit={handleValidate} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nomor Induk Kependudukan (NIK)</label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={16}
                  value={nikInput}
                  onChange={(e) => setNikInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="Masukkan 16 digit NIK..."
                  className="w-full pl-3 pr-24 py-2.5 bg-[#FDFBF7] border border-[#1E293B]/15 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B365D]"
                />
                <button
                  type="submit"
                  disabled={loading || nikInput.length !== 16}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#1B365D] hover:bg-[#244675] disabled:opacity-50 text-[#FDFBF7] rounded-lg font-bold text-xs flex items-center gap-1 transition"
                >
                  {loading ? (
                    <span className="animate-spin text-xs">🌀</span>
                  ) : (
                    <>
                      <Search className="w-3.5 h-3.5" /> Validasi
                    </>
                  )}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Format: 16 Digit angka NIK sesuai Kartu Keluarga.</p>
            </div>
          </form>

          {statusResult && (
            <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#1E293B]/15 animate-fadeIn space-y-3 shadow-sm">
              <div className="flex items-center gap-2 pb-2 border-b border-[#1E293B]/15">
                <CheckCircle2 className="w-5 h-5 text-[#1B365D]" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{statusResult.name}</h4>
                  <span className="text-[10px] font-bold text-[#1B365D] bg-[#1B365D]/10 px-2 py-0.5 rounded-full inline-block mt-0.5">
                    {statusResult.statusDukcapil}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Provinsi</span>
                  <span className="font-semibold text-slate-800">{statusResult.provinsi}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Kota/Kabupaten</span>
                  <span className="font-semibold text-slate-800">{statusResult.kabupaten}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Kecamatan</span>
                  <span className="font-semibold text-slate-800">{statusResult.kecamatan}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Status KTP-el</span>
                  <span className="font-semibold text-[#1B365D]">{statusResult.statusKTP}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
