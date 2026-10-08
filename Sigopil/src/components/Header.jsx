import React, { useState } from 'react';
import { Bell, User, CheckCircle2, ShieldCheck, X, Home, PackageCheck, Bot, UserCheck } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenNotifications, user, isLoggedIn = true }) {
  const isGuest = !isLoggedIn || activeTab === 'login';
  const firstName = isGuest ? 'Masuk' : (user?.name?.split(' ')[0] || 'Warga');
  const [unreadCount, setUnreadCount] = useState(2);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "KTP-el Dalam Pengantaran!",
      desc: "Kurir Budi Santoso sedang menuju alamat rumah Anda.",
      time: "10 menit yang lalu",
      unread: true,
    },
    {
      id: 2,
      title: "Verifikasi Data Selesai",
      desc: "Data kependudukan Anda dinyatakan valid 100%.",
      time: "2 jam yang lalu",
      unread: true,
    },
    {
      id: 3,
      title: "Perekaman Biometrik Berhasil",
      desc: "Perekaman sidik jari dan foto di Kec. Kebon Jeruk tercatat.",
      time: "Kemarin",
      unread: false,
    },
  ];

  const handleOpenBell = () => {
    setUnreadCount(0);
    setShowNotificationModal(true);
  };

  const desktopNavItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'tracking', label: 'Lacak Status', icon: PackageCheck, badge: 'Aktif' },
    { id: 'chatbot', label: 'Si-Bo AI', icon: Bot },
    { id: 'profile', label: 'Profil Saya', icon: UserCheck },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#1B365D]/95 text-[#FDFBF7] backdrop-blur-md border-b border-[#1E293B]/15 px-4 sm:px-6 lg:px-8 py-3 shadow-lg transition-all">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {/* Logo & Title */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FDFBF7] p-1 shadow-md shadow-[#1B365D]/30 flex items-center justify-center group-hover:scale-105 transition border border-[#FDFBF7]/40">
              <img
                src="/logo-dukcapil.png"
                alt="Logo Kabupaten Magelang"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold text-[#FDFBF7] tracking-tight leading-none">
                  Sigopil
                </h1>
                <span className="text-xs font-black tracking-wider text-slate-100 uppercase bg-[#FDFBF7]/15 px-2 py-0.5 rounded-full border border-[#FDFBF7]/25">
                  MAGELANG
                </span>
              </div>
              <p className="text-xs font-medium text-slate-200/80 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FDFBF7]" />
                Kabupaten Magelang
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links (Visible on md+ screens) */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0f2038]/80 p-1.5 rounded-2xl border border-[#1E293B]/15">
            {desktopNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${isActive
                      ? 'bg-[#244675] text-[#FDFBF7] shadow-md'
                      : 'text-slate-200 hover:text-[#FDFBF7] hover:bg-[#244675]/50'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.2 bg-[#FDFBF7]/20 text-[#FDFBF7] text-[9px] font-black rounded-full border border-[#FDFBF7]/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2.5">
            {/* Notification Button */}
            <button
              onClick={handleOpenBell}
              className="relative p-2.5 rounded-xl bg-[#244675] text-slate-100 hover:text-[#FDFBF7] hover:bg-[#12243e] transition-all border border-[#1E293B]/15 active:scale-95"
              aria-label="Notifikasi"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#FDFBF7] rounded-full ring-2 ring-[#1B365D] animate-pulse" />
              )}
            </button>

            {/* Profile Button */}
            <button
              onClick={() => setActiveTab('profile')}
              className="p-2 rounded-xl bg-gradient-to-r from-[#1B365D] to-[#244675] text-[#FDFBF7] hover:opacity-95 transition-all border border-[#1E293B]/15 shadow-sm flex items-center gap-2 active:scale-95"
              aria-label="Profil User"
            >
              <div className="w-6 h-6 rounded-full bg-[#FDFBF7]/20 text-[#FDFBF7] flex items-center justify-center font-bold text-xs border border-[#FDFBF7]/30">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="hidden sm:inline-block text-xs font-bold pr-1">{firstName}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Notifications Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 z-50 bg-[#0f2038]/60 backdrop-blur-sm flex items-start justify-center p-4 pt-16 animate-fadeIn">
          <div className="bg-[#FDFBF7] text-slate-800 rounded-2xl max-w-sm w-full shadow-2xl border border-[#1E293B]/15 overflow-hidden">
            <div className="p-4 bg-[#1B365D] text-[#FDFBF7] flex items-center justify-between border-b border-[#1E293B]/15">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-slate-200" />
                <h3 className="font-bold text-base">Notifikasi Sistem</h3>
              </div>
              <button
                onClick={() => setShowNotificationModal(false)}
                className="p-1 text-slate-200 hover:text-[#FDFBF7] rounded-lg hover:bg-[#244675] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="divide-y divide-slate-200 max-h-[70vh] overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className={`p-3.5 hover:bg-slate-100 transition ${n.unread ? 'bg-[#1B365D]/10' : ''}`}>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-[#1B365D] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#1B365D] flex-shrink-0" />
                      {n.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 flex-shrink-0">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 pl-5">{n.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#FDFBF7] text-center border-t border-[#1E293B]/15">
              <button
                onClick={() => setShowNotificationModal(false)}
                className="text-xs font-bold text-[#1B365D] hover:text-[#244675]"
              >
                Tutup Notifikasi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
