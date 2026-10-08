import React, { useState } from 'react';
import { 
  User, 
  CreditCard, 
  ShieldCheck, 
  QrCode, 
  Download, 
  Phone, 
  Settings, 
  HelpCircle,
  Smartphone,
  CheckCircle2,
  Lock,
  LogOut
} from 'lucide-react';
import { MOCK_USER } from '../../data/mockData';

export default function ProfilePage({ deferredPrompt, onInstallPWA, onLogout, user }) {
  const activeUser = user || MOCK_USER;
  const [showQR, setShowQR] = useState(false);
  const [installed, setInstalled] = useState(false);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          setInstalled(true);
        }
      });
    } else {
      onInstallPWA();
      setInstalled(true);
    }
  };

  return (
    <div className="pb-28 pt-4 space-y-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-br from-[#1B365D] via-[#244675] to-[#12243e] rounded-3xl p-6 border border-[#1E293B]/15 text-[#FDFBF7] shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={activeUser.avatarUrl}
              alt={activeUser.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-[#FDFBF7] shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#FDFBF7] border-2 border-[#1B365D] rounded-full"></span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#FDFBF7] leading-tight">{activeUser.name}</h2>
            <p className="text-xs sm:text-sm text-slate-200 font-mono mt-1">NIK: {activeUser.nikMasked}</p>
            <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-[#FDFBF7]/20 text-[#FDFBF7] text-xs font-bold border border-[#FDFBF7]/30">
              <ShieldCheck className="w-4 h-4 text-[#FDFBF7]" /> Identitas Digital Terverifikasi
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Digital KTP Card Preview */}
        <div className="bg-[#FDFBF7] border border-[#1E293B]/15 rounded-3xl p-5 space-y-4 shadow-lg text-slate-900 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#1B365D]" />
              KTP Digital (IKD Simulator)
            </h3>
            <button
              onClick={() => setShowQR(!showQR)}
              className="text-xs font-bold text-[#1B365D] hover:text-[#244675] flex items-center gap-1"
            >
              <QrCode className="w-4 h-4" /> {showQR ? 'Sembunyikan QR' : 'Tampilkan QR Validasi'}
            </button>
          </div>

          {showQR ? (
            <div className="bg-slate-100/60 p-5 rounded-2xl border border-[#1E293B]/15 text-center space-y-2 animate-fadeIn">
              <div className="w-36 h-36 bg-[#1B365D] mx-auto rounded-xl p-2 flex items-center justify-center shadow">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#FDFBF7] fill-current">
                  <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h20 v20 h-20 z M40,40 h20 v20 h-20 z M70,70 h30 v10 h-30 z M70,90 h10 v10 h-10 z M90,80 h10 v20 h-10 z" />
                </svg>
              </div>
              <p className="text-xs text-slate-500 font-mono">Kode QR Keamanan Ditjen Dukcapil</p>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-[#1B365D] to-[#244675] p-5 rounded-2xl border border-[#1E293B]/15 text-[#FDFBF7] space-y-3 shadow-md">
              <div className="flex justify-between items-center text-xs text-slate-200 uppercase tracking-wider font-extrabold">
                <span>DITJEN DUKCAPIL KEMENDAGRI</span>
                <span>STATUS DUKCAPIL</span>
              </div>
              <div className="text-base font-mono font-extrabold text-[#FDFBF7]">
                {activeUser.nikFull}
              </div>
              <div className="text-xs space-y-1 text-slate-100">
                <p><strong>Nama:</strong> {activeUser.name}</p>
                <p><strong>Alamat:</strong> {activeUser.address}</p>
                <p><strong>Status KTP:</strong> {activeUser.statusBadge}</p>
              </div>
            </div>
          )}
        </div>

        {/* PWA Install Banner & Settings */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-[#1B365D] to-[#244675] border border-[#1E293B]/15 rounded-3xl p-5 text-[#FDFBF7] shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-[#FDFBF7]/20 text-[#FDFBF7] rounded-2xl">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#FDFBF7]">Install PWA Sigopil</h4>
                <p className="text-xs text-slate-200">Akses cepat dari Home Screen device Anda</p>
              </div>
            </div>

            <button
              onClick={handleInstallClick}
              disabled={installed}
              className="px-4 py-2.5 bg-[#FDFBF7] text-[#1B365D] hover:bg-[#1B365D]/10 font-bold text-xs rounded-xl shadow transition active:scale-95 flex items-center gap-1.5"
            >
              {installed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#1B365D]" /> Terpasang
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#1B365D]" /> Install App
                </>
              )}
            </button>
          </div>

          <div className="bg-[#FDFBF7] border border-[#1E293B]/15 rounded-3xl overflow-hidden divide-y divide-slate-200 text-xs sm:text-sm shadow-sm">
            <div className="p-4 flex items-center justify-between hover:bg-[#1B365D]/5 transition cursor-pointer">
              <div className="flex items-center gap-3 text-slate-800">
                <Lock className="w-5 h-5 text-[#1B365D]" />
                <span className="font-semibold">Keamanan Biometrik & PIN</span>
              </div>
              <span className="text-xs font-bold text-[#1B365D]">Aktif</span>
            </div>

            <div className="p-4 flex items-center justify-between hover:bg-[#1B365D]/5 transition cursor-pointer">
              <div className="flex items-center gap-3 text-slate-800">
                <Phone className="w-5 h-5 text-[#1B365D]" />
                <span className="font-semibold">Call Center Hotline Dukcapil</span>
              </div>
              <span className="font-mono text-[#1B365D] font-bold text-sm">1500537</span>
            </div>

            <div className="p-4 flex items-center justify-between hover:bg-[#1B365D]/5 transition cursor-pointer">
              <div className="flex items-center gap-3 text-slate-800">
                <Settings className="w-5 h-5 text-[#1B365D]" />
                <span className="font-semibold">Versi Aplikasi</span>
              </div>
              <span className="text-xs font-mono text-slate-500">v2.4.0 (PWA Ready)</span>
            </div>

            {onLogout && (
              <div 
                onClick={onLogout}
                className="p-4 flex items-center justify-between hover:bg-red-50 text-red-600 transition cursor-pointer font-bold"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5 text-red-600" />
                  <span>Keluar / Ganti Akun NIK</span>
                </div>
                <span className="text-xs text-red-500">Log Out →</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
