import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, User, CreditCard } from 'lucide-react';

export default function ScheduleModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "Dimas Aditya Pratama",
    nik: "3173051204050080",
    phone: "081298765432",
    location: "Kecamatan Kebon Jeruk - Jakarta Barat",
    date: "2026-09-25",
    time: "09:00 - 10:00 WIB",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1B365D]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-[#1E293B]/15 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1B365D] via-[#244675] to-[#1B365D] p-4 text-[#FDFBF7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#FDFBF7]" />
            <h3 className="font-bold text-base">Jadwal Rekam KTP Pemula</h3>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              onClose();
            }}
            className="p-1 rounded-full text-[#FDFBF7]/80 hover:bg-[#1B365D] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-[#1B365D]/15 text-[#1B365D] rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Jadwal Berhasil Didaftarkan!</h4>
              <p className="text-xs text-slate-600 mt-2">
                Nomor Antrean Anda: <span className="font-extrabold text-[#1B365D] text-base">ANT-KBJ-042</span>
              </p>
              
              <div className="mt-4 p-3 bg-[#FDFBF7] rounded-xl text-left text-xs space-y-1.5 border border-[#1E293B]/15 shadow-inner">
                <p><strong>Nama:</strong> {formData.name}</p>
                <p><strong>NIK:</strong> {formData.nik}</p>
                <p><strong>Lokasi:</strong> {formData.location}</p>
                <p><strong>Waktu:</strong> {formData.date} ({formData.time})</p>
              </div>

              <p className="text-[11px] text-slate-500 mt-4">
                *Harap membawa Surat Pengantar/KK Asli & hadir 15 menit sebelum sesi antrean.
              </p>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-6 w-full py-2.5 bg-[#1B365D] hover:bg-[#244675] text-[#FDFBF7] rounded-xl font-bold text-sm shadow-md transition"
              >
                Selesai & Simpan Antrean
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap Pemohon</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#1B365D] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-[#FDFBF7] border border-[#1E293B]/15 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1B365D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">NIK (16 Digit)</label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-[#1B365D] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    maxLength={16}
                    value={formData.nik}
                    onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp Aktif</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#1E293B]/15 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1B365D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pilih Lokasi Perekaman</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#1B365D] absolute left-3 top-3" />
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-[#FDFBF7] border border-[#1E293B]/15 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1B365D]"
                  >
                    <option value="Kecamatan Kebon Jeruk - Jakarta Barat">Kecamatan Kebon Jeruk - Jakarta Barat</option>
                    <option value="Kecamatan Palmerah - Jakarta Barat">Kecamatan Palmerah - Jakarta Barat</option>
                    <option value="Kecamatan Grogol Petamburan - Jakarta Barat">Kecamatan Grogol Petamburan - Jakarta Barat</option>
                    <option value="Sudin Dukcapil Jakarta Barat">Sudin Dukcapil Jakarta Barat</option>
                    <option value="Layanan Keliling Jemput Bola">Layanan Keliling Jemput Bola</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pilih Tanggal</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#1E293B]/15 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1B365D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Sesi Jam</label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#1E293B]/15 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1B365D]"
                  >
                    <option value="08:00 - 09:00 WIB">08:00 - 09:00 WIB</option>
                    <option value="09:00 - 10:00 WIB">09:00 - 10:00 WIB</option>
                    <option value="10:00 - 11:00 WIB">10:00 - 11:00 WIB</option>
                    <option value="11:00 - 12:00 WIB">11:00 - 12:00 WIB</option>
                    <option value="13:00 - 14:00 WIB">13:00 - 14:00 WIB</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 w-full py-2.5 bg-[#1B365D] hover:bg-[#244675] text-[#FDFBF7] rounded-xl font-bold text-sm shadow-md transition"
              >
                Daftarkan Jadwal Rekam
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}