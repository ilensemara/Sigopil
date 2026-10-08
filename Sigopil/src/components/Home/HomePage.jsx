import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Megaphone, 
  Camera, 
  Package, 
  FileText, 
  Bot, 
  Fingerprint, 
  PhoneCall, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  HardDrive,
  Database,
  Layers
} from 'lucide-react';
import { MOCK_USER } from '../../data/mockData';

export default function HomePage({ 
  onNavigate, 
  onOpenSchedule, 
  onOpenRequirements, 
  onOpenNikValidation,
  onOpenContact,
  user
}) {
  const activeUser = user || MOCK_USER;
  const firstName = activeUser?.name?.split(' ')[0] || 'Warga';
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 16) {
      onOpenNikValidation();
    } else if (searchQuery.toLowerCase().includes('lacak') || searchQuery.toLowerCase().includes('ktp')) {
      onNavigate('tracking');
    } else {
      onOpenRequirements();
    }
  };

  return (
    <div className="pb-24 pt-4 space-y-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Official Banner Header */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1B365D]/10 border border-[#1E293B]/15 text-[#1B365D] text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-[#1B365D]" />
          Disdukcapil Kabupaten Magelang
        </span>
        <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1B365D] animate-ping"></span>
          Terintegrasi Online
        </span>
      </div>

      {/* Greeting Title */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Halo, Selamat Datang! <span className="animate-bounce inline-block">👋</span>
          </h2>
          <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
            Akses pencatatan sipil & identitas digital resmi dari genggaman atau web browser Anda.
          </p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-[#FDFBF7] border border-[#1E293B]/15 p-1 flex items-center justify-center flex-shrink-0 shadow-md">
          <img src="/logo-dukcapil.png" alt="Logo Kabupaten Magelang" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative max-w-2xl">
        <Search className="w-5 h-5 text-[#1B365D] absolute left-4 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari layanan atau Masukkan NIK (16 digit)..."
          className="w-full pl-12 pr-24 py-3 bg-[#FDFBF7] border border-[#1E293B]/15 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B365D] shadow-sm"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#1B365D] hover:bg-[#244675] text-[#FDFBF7] font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow"
        >
          Cari
        </button>
      </form>

      {/* Ticker Announcement Banner */}
      <div className="bg-gradient-to-r from-[#1B365D] via-[#244675] to-[#12243e] border border-[#1E293B]/15 rounded-2xl p-4 shadow-md flex items-start gap-3.5 text-[#FDFBF7]">
        <div className="p-2.5 bg-[#FDFBF7]/20 text-[#FDFBF7] rounded-xl flex-shrink-0 mt-0.5">
          <Megaphone className="w-5 h-5 animate-pulse" />
        </div>
        <div className="flex-1 text-xs sm:text-sm">
          <div className="flex items-center justify-between">
            <span className="font-black text-xs uppercase text-slate-200 tracking-wider">
              PENGUMUMAN TERKINI
            </span>
            <span className="text-xs text-slate-200/80 font-medium">Hari Ini</span>
          </div>
          <p className="text-[#FDFBF7] text-xs sm:text-sm mt-1 leading-snug font-medium">
            Layanan jemput bola perekaman <strong className="text-slate-200">KTP-el pemula di SMA/SMK Kabupaten Magelang</strong> minggu ini beroperasi aktif tanpa antrean umum.
          </p>
        </div>
      </div>

      {/* Ketersediaan Blangko Section - Simplified & To The Point */}
      <div className="bg-[#FDFBF7] border border-[#1E293B]/15 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                Stok Blangko KTP-el Tersedia
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-100/80 text-emerald-800 text-xs font-bold rounded-full border border-emerald-300/60">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Siap Cetak (Tanpa Inden)
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Stok fisik aman untuk pencetakan langsung di Kantor Disdukcapil & 21 Kecamatan Kab. Magelang.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#1B365D]/5 px-3.5 py-2 rounded-xl border border-[#1E293B]/10 self-start sm:self-center flex-shrink-0">
          <Database className="w-4 h-4 text-[#1B365D]" />
          <div className="text-xs">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Total Kuota Stok</span>
            <span className="font-mono font-extrabold text-[#1B365D]">14.850 Keping</span>
          </div>
        </div>
      </div>

      {/* Main Section Header */}
      <div className="flex items-center justify-between pt-2">
        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">Layanan Unggulan</h3>
        <span className="text-xs font-bold text-[#1B365D]">Cepat & Mandiri</span>
      </div>

      {/* HERO CARDS GRID: 1 column on mobile, 2 columns on tablet/desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* HERO CARD 1: Pendaftaran Rekam KTP Pemula */}
        <div 
          onClick={onOpenSchedule}
          className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1B365D] via-[#244675] to-[#12243e] border border-[#1E293B]/15 p-6 shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-[#1B365D]/30 shimmer-glow flex flex-col justify-between text-[#FDFBF7]"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#FDFBF7]/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-start justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDFBF7]/20 backdrop-blur-md text-[#FDFBF7] text-xs font-bold border border-[#FDFBF7]/30">
                <Sparkles className="w-3.5 h-3.5 text-slate-200" />
                Prioritas Usia 17 Thn
              </span>
              <div className="p-3 bg-[#FDFBF7]/20 border border-[#FDFBF7]/30 text-[#FDFBF7] rounded-2xl group-hover:scale-110 transition duration-300">
                <Camera className="w-7 h-7" />
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-xl font-extrabold text-[#FDFBF7] leading-tight">
                Pendaftaran Rekam KTP Pemula
              </h4>
              <p className="text-xs sm:text-sm text-slate-200/90 mt-2 leading-relaxed">
                Daftar jadwal antrean rekam biometrik di kelurahan atau kecamatan terdekat tanpa perlu mengantre manual.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between pt-3 border-t border-[#FDFBF7]/20">
            <span className="text-xs sm:text-sm font-bold text-[#FDFBF7] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
              Jadwalkan Rekam Sekarang <ArrowRight className="w-4 h-4 text-slate-200" />
            </span>
            <span className="px-3 py-1 bg-[#FDFBF7]/20 text-[#FDFBF7] font-bold text-xs rounded-full border border-[#FDFBF7]/30">
              Gratis 100%
            </span>
          </div>
        </div>

        {/* HERO CARD 2: Cek Status / Lacak KTP Saya */}
        <div 
          onClick={() => onNavigate('tracking')}
          className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#244675] via-[#1B365D] to-[#0f2038] border border-[#1E293B]/15 p-6 shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-[#1B365D]/40 shimmer-glow flex flex-col justify-between text-[#FDFBF7]"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#FDFBF7]/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-start justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDFBF7]/20 backdrop-blur-md text-[#FDFBF7] text-xs font-bold border border-[#FDFBF7]/30">
                <Package className="w-3.5 h-3.5 text-slate-200" />
                Real-time Ekspedisi
              </span>
              <div className="p-3 bg-[#FDFBF7]/20 border border-[#FDFBF7]/30 text-[#FDFBF7] rounded-2xl group-hover:scale-110 transition duration-300">
                <HardDrive className="w-7 h-7" />
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-xl font-extrabold text-[#FDFBF7] leading-tight">
                Cek Status / Lacak KTP Saya
              </h4>
              <p className="text-xs sm:text-sm text-slate-200/90 mt-2 leading-relaxed">
                Pantau status verifikasi, pencetakan blangko KTP-el, hingga pengantaran kurir paket ke rumah Anda.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between pt-3 border-t border-[#FDFBF7]/20">
            <span className="text-xs sm:text-sm font-bold text-[#FDFBF7] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
              Pantau Nomor Registrasi <ArrowRight className="w-4 h-4 text-slate-200" />
            </span>
            <span className="px-3 py-1 bg-[#FDFBF7]/20 text-[#FDFBF7] font-bold text-xs rounded-full border border-[#FDFBF7]/30 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#FDFBF7] rounded-full animate-ping"></span> Resi Aktif
            </span>
          </div>
        </div>
      </div>

      {/* Grid Fitur Pendukung: 2 columns mobile, 4 columns desktop */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">Fitur Pendukung</h3>
          <span className="text-xs font-medium text-slate-500">Layanan Warga</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Card 1: Persyaratan KTP */}
          <div 
            onClick={onOpenRequirements}
            className="cursor-pointer bg-[#FDFBF7] hover:bg-[#1B365D]/5 border border-[#1E293B]/15 p-4 rounded-2xl transition hover:border-[#1B365D]/40 shadow-sm group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1B365D]/10 text-[#1B365D] flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 leading-tight">Persyaratan KTP</h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Syarat KK, Akta Kelahiran & Surat Domisili
              </p>
            </div>
            <span className="text-xs font-bold text-[#1B365D] flex items-center gap-1 mt-3">
              Lihat Syarat <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 2: Chatbot Si-Bo AI */}
          <div 
            onClick={() => onNavigate('chatbot')}
            className="cursor-pointer bg-[#FDFBF7] hover:bg-[#1B365D]/5 border border-[#1E293B]/15 p-4 rounded-2xl transition hover:border-[#1B365D]/40 shadow-sm group relative flex flex-col justify-between"
          >
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#1B365D] rounded-full animate-ping"></span>
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1B365D]/10 text-[#1B365D] flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-slate-900 leading-tight">Chatbot Si-Bo</h4>
                <span className="text-[10px] font-black bg-[#1B365D] text-[#FDFBF7] px-1.5 py-0.5 rounded">AI</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Konsultasi asisten virtual 24 jam
              </p>
            </div>
            <span className="text-xs font-bold text-[#1B365D] flex items-center gap-1 mt-3">
              Tanya Si-Bo <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 3: Validasi NIK */}
          <div 
            onClick={onOpenNikValidation}
            className="cursor-pointer bg-[#FDFBF7] hover:bg-[#1B365D]/5 border border-[#1E293B]/15 p-4 rounded-2xl transition hover:border-[#1B365D]/40 shadow-sm group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1B365D]/10 text-[#1B365D] flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <Fingerprint className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 leading-tight">Validasi NIK</h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Cek keaktifan & sinkronisasi data NIK nasional
              </p>
            </div>
            <span className="text-xs font-bold text-[#1B365D] flex items-center gap-1 mt-3">
              Periksa Status <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 4: Kontak Dukcapil */}
          <div 
            onClick={onOpenContact}
            className="cursor-pointer bg-[#FDFBF7] hover:bg-[#1B365D]/5 border border-[#1E293B]/15 p-4 rounded-2xl transition hover:border-[#1B365D]/40 shadow-sm group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1B365D]/10 text-[#1B365D] flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 leading-tight">Kontak Dukcapil</h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Aduan resmi, call center & layanan WhatsApp
              </p>
            </div>
            <span className="text-xs font-bold text-[#1B365D] flex items-center gap-1 mt-3">
              Hubungi Tim <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>


    </div>
  );
}
