import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setShowReconnected(true);
      setTimeout(() => setShowReconnected(false), 3000);
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (showReconnected) {
    return (
      <div className="bg-[#1B365D] text-[#FDFBF7] text-xs font-bold px-4 py-2 text-center flex items-center justify-center gap-2 animate-fadeIn z-50">
        <Wifi className="w-4 h-4 text-[#FDFBF7]" />
        <span>Koneksi Internet Kembali Terhubung. Aplikasi Sinkronisasi Otomatis!</span>
      </div>
    );
  }

  if (!isOffline) return null;

  return (
    <div className="bg-amber-900 text-amber-100 text-xs font-bold px-4 py-2 text-center flex items-center justify-center gap-2 animate-fadeIn z-50 border-b border-amber-800">
      <WifiOff className="w-4 h-4 text-amber-200 animate-pulse" />
      <span>Mode Offline: Menampilkan data cache lokal Sigopil.</span>
      <button
        onClick={() => window.location.reload()}
        className="ml-2 px-2 py-0.5 bg-amber-800 hover:bg-amber-700 text-amber-100 rounded text-[10px] font-mono flex items-center gap-1"
      >
        <RefreshCw className="w-3 h-3" /> Muat Ulang
      </button>
    </div>
  );
}
