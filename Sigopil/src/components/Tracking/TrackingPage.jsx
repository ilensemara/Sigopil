import React, { useState } from 'react';
import { 
  Truck, 
  HelpCircle, 
  Copy, 
  Check, 
  Phone, 
  Share2, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Info,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import { MOCK_USER, MOCK_INTERNAL_TIMELINE, MOCK_SHIPPING_TIMELINE } from '../../data/mockData';

export default function TrackingPage({ onOpenReportIssue, onOpenMap, user }) {
  const activeUser = user || MOCK_USER;
  const internalTimeline = activeUser.internalTimeline || MOCK_INTERNAL_TIMELINE;
  const shippingTimeline = activeUser.shippingTimeline || MOCK_SHIPPING_TIMELINE;

  const [copiedResi, setCopiedResi] = useState(false);
  const [sharedToast, setSharedToast] = useState(false);

  const handleCopyResi = () => {
    navigator.clipboard.writeText(activeUser.resiNumber);
    setCopiedResi(true);
    setTimeout(() => setCopiedResi(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Status Tracking KTP-el ${activeUser.name}`,
        text: `Status KTP-el ${activeUser.name} (${activeUser.regNumber}): ${activeUser.statusBadge} (${activeUser.resiNumber}).`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      setSharedToast(true);
      setTimeout(() => setSharedToast(false), 2500);
    }
  };

  const handleShareResi = handleShare;

  return (
    <div className="pb-28 pt-4 space-y-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {sharedToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#1B365D] text-[#FDFBF7] text-xs px-4 py-2.5 rounded-full shadow-2xl border border-[#1E293B]/15 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#FDFBF7]" />
          Tautan tracking disalin ke clipboard!
        </div>
      )}

      {/* Header Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1B365D]/10 border border-[#1E293B]/15 flex items-center justify-center text-[#1B365D]">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">Lacak KTP Saya</h2>
            <p className="text-xs text-slate-500">Update realtime berkas e-KTP & Ekspedisi</p>
          </div>
        </div>

        <button 
          onClick={() => window.open('https://dukcapil.kemendagri.go.id/', '_blank')}
          className="px-3.5 py-2 bg-[#FDFBF7] hover:bg-[#1B365D]/5 text-[#1B365D] rounded-xl text-xs font-bold border border-[#1E293B]/15 flex items-center gap-1.5 transition shadow-sm"
        >
          <HelpCircle className="w-4 h-4 text-[#1B365D]" /> Bantuan Dukcapil
        </button>
      </div>

      {/* HEADER CARD: Applicant Info & Main Status */}
      <div className="bg-[#FDFBF7] rounded-3xl p-5 sm:p-6 border border-[#1E293B]/15 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={activeUser.avatarUrl}
              alt={activeUser.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-[#1B365D] shadow-md flex-shrink-0"
            />
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-[#1B365D] uppercase tracking-wider bg-[#1B365D]/10 px-2.5 py-0.5 rounded-md inline-block">
                {activeUser.serviceType}
              </span>
              <h3 className="text-base sm:text-xl font-extrabold text-slate-900 leading-tight mt-0.5">
                {activeUser.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-mono mt-0.5">NIK: {activeUser.nikMasked}</p>
            </div>
          </div>

          <span className="self-start sm:self-center px-4 py-1.5 bg-[#1B365D]/10 text-[#1B365D] text-xs font-extrabold rounded-full border border-[#1E293B]/15 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1B365D] animate-ping"></span>
            {activeUser.statusBadge}
          </span>
        </div>

        <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center justify-between text-xs sm:text-sm bg-slate-100/50 p-3 rounded-2xl border border-[#1E293B]/15">
            <span className="text-slate-500 font-medium">Nomor Registrasi:</span>
            <span className="font-extrabold font-mono text-slate-900">{activeUser.regNumber}</span>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm bg-slate-100/50 p-3 rounded-2xl border border-[#1E293B]/15">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Resi Ekspedisi</span>
              <span className="font-extrabold font-mono text-[#1B365D] text-xs sm:text-sm">{activeUser.resiNumber}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopyResi}
                className="px-2.5 py-1.5 bg-[#1B365D]/10 hover:bg-[#1B365D]/20 text-[#1B365D] rounded-xl text-xs font-bold transition flex items-center gap-1 active:scale-95"
              >
                {copiedResi ? <Check className="w-3.5 h-3.5 text-[#1B365D]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedResi ? 'Tersalin' : 'Salin'}</span>
              </button>
              <button
                onClick={handleShareResi}
                className="px-2.5 py-1.5 bg-[#1B365D] hover:bg-[#244675] text-[#FDFBF7] rounded-xl text-xs font-bold transition flex items-center gap-1 active:scale-95 shadow"
              >
                <Share2 className="w-3.5 h-3.5 text-[#FDFBF7]" />
                <span>{sharedToast ? 'Tershare!' : 'Bagikan'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE SECTIONS GRID: 1 column on mobile (< 1024px), 2 columns on desktop (>= 1024px) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SECTION 1: Timeline Internal Disdukcapil */}
        <div className="bg-[#FDFBF7] rounded-3xl p-5 sm:p-6 shadow-xl border border-[#1E293B]/15 text-slate-900 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#1B365D] text-[#FDFBF7] font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">Proses Internal Disdukcapil</h3>
              </div>
              <span className="px-3 py-1 bg-[#1B365D]/10 text-[#1B365D] font-extrabold text-[11px] sm:text-xs rounded-full border border-[#1E293B]/15 flex items-center gap-1 flex-shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1B365D]" /> Tahap Selesai
              </span>
            </div>

            {/* Vertical Stepper */}
            <div className="relative pl-6 space-y-6 pt-2">
              <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-[#1B365D]"></div>

              {internalTimeline.map((item) => (
                <div key={item.id} className="relative flex items-start gap-3.5">
                  <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#1B365D] text-[#FDFBF7] flex items-center justify-center ring-4 ring-[#FDFBF7] shadow">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-0.5">
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">{item.title}</h4>
                      <span className="text-[11px] font-semibold text-slate-400">{item.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-[#1B365D]/10 rounded-2xl border border-[#1E293B]/15 text-xs text-[#1B365D] font-medium mt-4">
            ✅ Seluruh proses pencetakan fisik & sinkronisasi data Dukcapil terpusat telah 100% selesai disetujui.
          </div>
        </div>

        {/* SECTION 2: Timeline Pengiriman Ekspedisi */}
        <div className="bg-[#FDFBF7] rounded-3xl p-5 sm:p-6 shadow-xl border border-[#1E293B]/15 text-slate-900 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#1B365D] text-[#FDFBF7] font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                2
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">Pengiriman Ekspedisi</h3>
            </div>
            <span className="px-3 py-1 bg-[#1B365D]/10 text-[#1B365D] font-extrabold text-[11px] sm:text-xs rounded-full border border-[#1E293B]/15 flex items-center gap-1.5 flex-shrink-0">
              <span className="w-2 h-2 bg-[#1B365D] rounded-full animate-ping"></span> Tahap Aktif
            </span>
          </div>

          {/* Courier Info Card */}
          <div className="bg-slate-100/60 rounded-2xl p-4 border border-[#1E293B]/15 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <img
                    src={activeUser.courierAvatar}
                    alt={activeUser.courierName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#1B365D] shadow"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#1B365D] border-2 border-[#FDFBF7] rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1">
                    {activeUser.courierName}
                    <ShieldCheck className="w-4 h-4 text-[#1B365D]" />
                  </h4>
                  <p className="text-xs font-semibold text-slate-500">
                    Kurir {activeUser.courierService}
                  </p>
                </div>
              </div>

              <a
                href={`tel:${activeUser.courierPhone}`}
                className="p-3 bg-[#1B365D] hover:bg-[#244675] text-[#FDFBF7] rounded-2xl shadow transition active:scale-95"
                title="Hubungi Kurir"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-[#FDFBF7] p-3 rounded-xl border border-[#1E293B]/15 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#1B365D]" /> Estimasi Tiba:
              </span>
              <span className="font-extrabold text-[#1B365D]">{activeUser.etaText}</span>
            </div>

            <button
              onClick={onOpenMap}
              className="w-full py-2.5 bg-[#1B365D] hover:bg-[#244675] text-[#FDFBF7] rounded-xl font-bold text-xs shadow flex items-center justify-center gap-2 transition"
            >
              <MapPin className="w-4 h-4 text-[#FDFBF7]" /> Lacak Peta Perjalanan Kurir Live
            </button>
          </div>

          {/* Vertical Stepper */}
          <div className="relative pl-6 space-y-6 pt-1">
            <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-200"></div>

            {shippingTimeline.map((item) => {
              const isCompleted = item.status === 'completed';
              const isActive = item.status === 'active';

              return (
                <div key={item.id} className="relative flex items-start gap-3.5">
                  <div
                    className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-[#FDFBF7] shadow ${
                      isCompleted
                        ? 'bg-[#1B365D] text-[#FDFBF7]'
                        : isActive
                        ? 'bg-[#1B365D] ring-[#1B365D]/30 text-[#FDFBF7] animate-pulse'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : isActive ? (
                      <span className="w-2 h-2 rounded-full bg-[#FDFBF7]"></span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-0.5">
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">{item.title}</h4>
                      {item.timestamp ? (
                        <span className="text-[11px] font-semibold text-slate-400">{item.timestamp}</span>
                      ) : item.statusText ? (
                        <span
                          className={`text-xs font-bold ${
                            isActive ? 'text-[#1B365D] bg-[#1B365D]/10 px-2.5 py-0.5 rounded-full' : 'text-slate-400'
                          }`}
                        >
                          {item.statusText}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {item.description}
                    </p>

                    {item.id === 3 && (
                      <div className="mt-2.5 p-3 bg-[#1B365D]/10 border border-[#1E293B]/15 rounded-xl text-xs text-[#1B365D] font-medium flex items-start gap-2">
                        <Info className="w-4 h-4 text-[#1B365D] flex-shrink-0 mt-0.5" />
                        <span>Wajib menunjukkan Kartu Keluarga (KK) Asli fisik saat penyerahan dokumen.</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <button
          onClick={handleShare}
          className="w-full py-3.5 bg-[#1B365D] hover:bg-[#244675] text-[#FDFBF7] font-extrabold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
        >
          <Share2 className="w-4 h-4 text-[#FDFBF7]" /> Bagikan Status Tracking
        </button>

        <button
          onClick={onOpenReportIssue}
          className="w-full py-3.5 bg-[#FDFBF7] hover:bg-[#1B365D]/5 text-[#1B365D] font-bold rounded-2xl text-xs sm:text-sm border border-[#1E293B]/15 flex items-center justify-center gap-2 transition active:scale-95 shadow-sm"
        >
          <AlertTriangle className="w-4 h-4 text-[#1B365D]" /> Laporkan Masalah Pengiriman
        </button>
      </div>
    </div>
  );
}
