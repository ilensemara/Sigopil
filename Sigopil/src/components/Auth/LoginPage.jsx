import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  Phone, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Smartphone,
  UserCheck,
  Building2,
  User,
  MessageSquare,
  RefreshCw,
  BadgeCheck,
  Briefcase,
  FileText,
  MapPin,
  Check
} from 'lucide-react';
import { MOCK_ADMIN, MOCK_USERS } from '../../data/mockData';

export default function LoginPage({ onLoginSuccess }) {
  // Step state: 'input' | 'otp' | 'profile_setup'
  const [currentStep, setCurrentStep] = useState('input');
  
  // Single Unified Input or Tab
  const [identityInput, setIdentityInput] = useState('3173051204050080'); // Default 16-digit Warga NIK
  const [phoneInput, setPhoneInput] = useState('081298765432');
  
  // OTP / Sandi State
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [showWaSimulatedToast, setShowWaSimulatedToast] = useState(false);

  // Profile Setup State (Data Diri Warga)
  const [nameInput, setNameInput] = useState('Dimas Aditya Pratama');
  const [addressInput, setAddressInput] = useState('Jl. Anggrek Cendrawasih No. 42, Palmerah, Jakarta Barat');
  const [serviceTypeInput, setServiceTypeInput] = useState('PENCETAKAN KTP-EL BARU (PEMULA)');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Extract raw digits
  const rawDigits = identityInput.replace(/\D/g, '');
  const is18DigitNip = rawDigits.length === 18 || identityInput.includes('19850412');
  const is16DigitNik = rawDigits.length === 16 && !is18DigitNip;
  const detectedRole = is18DigitNip ? 'admin' : 'warga';

  // Handle Request OTP via WhatsApp
  const handleRequestOtp = (e) => {
    e.preventDefault();

    if (rawDigits.length !== 16 && rawDigits.length !== 18) {
      setErrorMsg('Masukkan 16 Digit NIK (Warga) atau 18 Digit NIP (Petugas Admin).');
      return;
    }

    if (!phoneInput || phoneInput.length < 9) {
      setErrorMsg('Nomor WhatsApp tidak valid. Masukkan nomor yang aktif.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    // Generate random 6 digit OTP/Sandi
    const code = is18DigitNip 
      ? Math.floor(800000 + Math.random() * 199999).toString() 
      : Math.floor(100000 + Math.random() * 900000).toString();
    
    setTimeout(() => {
      setIsLoading(false);
      setGeneratedOtp(code);
      setOtpInput(code); // Pre-fill for demo ease
      setCurrentStep('otp');
      setShowWaSimulatedToast(true);
    }, 800);
  };

  // Verify OTP & Proceed to Profile Setup or Admin Dashboard
  const handleVerifyOtpSubmit = (e) => {
    e.preventDefault();
    if (otpInput.length < 4) {
      setErrorMsg('Masukkan kode sandi / OTP 6-digit yang dikirim ke WhatsApp.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsLoading(false);
      if (detectedRole === 'admin') {
        onLoginSuccess('admin');
      } else {
        // Find existing user or pre-fill profile setup form
        const foundUser = MOCK_USERS.find(u => u.nikFull === rawDigits) || MOCK_USERS[0];
        setNameInput(foundUser.name);
        setAddressInput(foundUser.address);
        setServiceTypeInput(foundUser.serviceType);
        setCurrentStep('profile_setup');
      }
    }, 800);
  };

  // Save Profile Setup & Enter Portal Warga
  const handleProfileSetupSubmit = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      setErrorMsg('Harap isi Nama Lengkap Pemohon.');
      return;
    }
    if (!addressInput.trim()) {
      setErrorMsg('Harap isi Alamat Rumah Pemohon.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsLoading(false);
      const foundIndex = MOCK_USERS.findIndex(u => u.nikFull === rawDigits);
      onLoginSuccess(foundIndex >= 0 ? foundIndex : 0);
    }, 800);
  };

  // Quick Demo Login Shortcut
  const handleQuickDemoLogin = (targetRoleOrIdx) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (targetRoleOrIdx === 'admin') {
        setIdentityInput('19850412 201001 1 003');
        setPhoneInput('08112345678');
      } else if (targetRoleOrIdx === 0) {
        setIdentityInput('3173051204050080');
        setPhoneInput('081298765432');
      } else {
        setIdentityInput('3273014508060012');
        setPhoneInput('082119845678');
      }
      onLoginSuccess(targetRoleOrIdx);
    }, 500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 bg-[#FDFBF7] animate-fadeIn relative">
      
      {/* SIMULATED WHATSAPP PUSH NOTIFICATION TOAST */}
      {showWaSimulatedToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-bounce">
          <div className="bg-[#075E54] text-white p-4 rounded-2xl shadow-2xl border border-emerald-400 flex items-start gap-3">
            <div className="p-2 bg-emerald-700/80 rounded-xl flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-emerald-100" />
            </div>
            <div className="flex-1 text-xs">
              <div className="flex items-center justify-between font-bold text-emerald-200">
                <span>📱 WhatsApp - Sigopil Disdukcapil</span>
                <span className="text-[10px] text-emerald-300">Baru Saja</span>
              </div>
              <p className="mt-1 text-white font-medium">
                {detectedRole === 'admin' 
                  ? `[AKSES PETUGAS ADMIN] Sandi Otentikasi NIP 18-Digit: ${generatedOtp}. Rahasiakan data otentikasi!`
                  : `Kode Sandi Otentikasi NIK 16-Digit: ${generatedOtp}. Berlaku 5 menit.`}
              </p>
            </div>
            <button 
              type="button"
              onClick={() => setShowWaSimulatedToast(false)}
              className="text-emerald-300 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <div className="max-w-md w-full space-y-6">
        
        {/* Logo and Greeting Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-3xl bg-[#FDFBF7] border border-[#1E293B]/15 shadow-xl p-2 mx-auto flex items-center justify-center">
            <img 
              src="/logo-dukcapil.png" 
              alt="Logo Disdukcapil Kabupaten Magelang" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#1B365D] bg-[#1B365D]/10 px-3 py-1 rounded-full border border-[#1E293B]/15 inline-block">
              PORTAL PELAYANAN RESMI
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Sigopil Magelang
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
              KTP-el Disdukcapil Kabupaten Magelang
            </p>
          </div>
        </div>

        {/* MAIN AUTHENTICATION CARD */}
        <div className="bg-[#FDFBF7] border border-[#1E293B]/15 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
          
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: INPUT NIK ATAU NIP + WHATSAPP */}
          {currentStep === 'input' && (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800">
                    Nomor Identitas
                  </label>
                </div>

                <div className="relative">
                  <CreditCard className="w-4 h-4 text-[#1B365D] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={identityInput}
                    onChange={(e) => setIdentityInput(e.target.value)}
                    placeholder="16 Digit NIK Warga atau 18 Digit NIP Petugas"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#1E293B]/20 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B365D] shadow-sm"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Ketik <strong>16 digit NIK</strong> untuk Warga, atau <strong>18 digit NIP</strong> untuk Operator Dukcapil.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Nomor WhatsApp Aktif (Untuk Kirim Kode OTP)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-emerald-700 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#1E293B]/20 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#1B365D] hover:bg-[#244675] disabled:opacity-50 text-[#FDFBF7] rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-[0.98]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Menghubungkan WhatsApp...
                  </span>
                ) : (
                  <>
                    <span>Minta Kode Sandi / OTP WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: INPUT KODE SANDI / OTP */}
          {currentStep === 'otp' && (
            <form onSubmit={handleVerifyOtpSubmit} className="space-y-4 animate-fadeIn">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900">
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Sandi Terkirim ke WhatsApp
                </p>
                <p className="text-[11px] text-emerald-700 mt-1">
                  Kode otentikasi dikirimkan ke nomor <strong>{phoneInput}</strong>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 text-center mb-1">
                  Masukkan 6-Digit Kode Sandi Otentikasi
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  placeholder="6 Digit Sandi"
                  className="w-full text-center py-3 bg-white border-2 border-emerald-500 rounded-xl font-mono font-black text-xl text-emerald-900 tracking-[0.3em] focus:ring-4 focus:ring-emerald-200 outline-none shadow-md"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#1B365D] hover:bg-[#244675] text-[#FDFBF7] rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-[0.98]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Verifikasi Sandi...
                  </span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 
                    {detectedRole === 'admin' ? 'Masuk Portal Admin Disdukcapil' : 'Verifikasi OTP & Lanjut Isi Data Diri'}
                  </>
                )}
              </button>

              <div className="flex justify-between items-center text-xs pt-1">
                <button
                  type="button"
                  onClick={() => setCurrentStep('input')}
                  className="text-slate-500 hover:text-slate-800 font-medium underline"
                >
                  ← Ubah NIK / NIP Input
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const code = detectedRole === 'admin'
                      ? Math.floor(800000 + Math.random() * 199999).toString()
                      : Math.floor(100000 + Math.random() * 900000).toString();
                    setGeneratedOtp(code);
                    setOtpInput(code);
                    setShowWaSimulatedToast(true);
                  }}
                  className="text-[#1B365D] hover:underline font-bold flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Kirim Ulang Sandi WA
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: FORM PENGISIAN DATA DIRI WARGA */}
          {currentStep === 'profile_setup' && (
            <form onSubmit={handleProfileSetupSubmit} className="space-y-4 animate-fadeIn">
              <div className="p-3 bg-[#1B365D]/10 rounded-2xl border border-[#1E293B]/15 text-xs">
                <div className="flex items-center gap-2 text-[#1B365D] font-extrabold mb-1">
                  <UserCheck className="w-4 h-4" /> Form Kelengkapan Data Diri Pemohon
                </div>
                <p className="text-[11px] text-slate-600">
                  Verifikasi NIK (<strong>{rawDigits}</strong>) berhasil. Silakan lengkapi data diri Anda:
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Nama Lengkap Pemohon (Sesuai KK/KTP)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#1B365D] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Nama Lengkap..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#1E293B]/20 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B365D] shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Alamat Rumah Lengkap & RT/RW
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#1B365D] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    placeholder="Alamat Lengkap..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#1E293B]/20 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B365D] shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Jenis Layanan Kependudukan
                </label>
                <select
                  value={serviceTypeInput}
                  onChange={(e) => setServiceTypeInput(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#1E293B]/20 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B365D] shadow-sm"
                >
                  <option value="PENCETAKAN KTP-EL BARU (PEMULA)">PENCETAKAN KTP-EL BARU (PEMULA - 17 THN)</option>
                  <option value="PENGGANTIAN KTP-EL HILANG">PENGGANTIAN KTP-EL HILANG / RUSAK</option>
                  <option value="PERUBAHAN DATA ALAMAT & STATUS">PERUBAHAN DATA ALAMAT & STATUS KAWIN</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#1B365D] hover:bg-[#244675] text-[#FDFBF7] rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-[0.98]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Menyimpan Profil & Masuk...
                  </span>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" /> Simpan Data Diri & Masuk Portal Warga
                  </>
                )}
              </button>
            </form>
          )}

          {/* Quick Demo Login Shortcuts */}
          <div className="pt-3 border-t border-[#1E293B]/15 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 block text-center">⚡ Akses Cepat Simulasi Testing (1-Klik):</span>
            
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              disabled={isLoading}
              className="w-full py-2.5 bg-[#1B365D] hover:bg-[#244675] text-[#FDFBF7] border border-[#1E293B]/20 rounded-xl text-xs font-extrabold flex items-center justify-between px-3 transition shadow"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span className="text-left">🛡️ Login Admin (NIP 18-Digit: 198504122010011003)</span>
              </div>
              <span className="text-[10px] bg-[#FDFBF7]/20 text-[#FDFBF7] px-2 py-0.5 rounded font-mono border border-[#FDFBF7]/30">18 DIGIT</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin(0)}
              disabled={isLoading}
              className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-extrabold flex items-center justify-between px-3 transition"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-left">👤 Login Warga (NIK 16-Digit: 3173051204050080)</span>
              </div>
              <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-mono">16 DIGIT</span>
            </button>
          </div>

        </div>

        {/* Footnote Security Disclaimer */}
        <div className="text-center text-[11px] text-slate-500 space-y-1">
          <p className="flex items-center justify-center gap-1 font-semibold">
            <Lock className="w-3.5 h-3.5 text-emerald-600" /> Direct WhatsApp OTP Auth & Data Encryption AES-256
          </p>
          <p>© 2026 Sigopil Disdukcapil Kabupaten Magelang. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
}
