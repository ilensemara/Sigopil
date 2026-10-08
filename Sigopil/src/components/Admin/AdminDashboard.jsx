import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  FileCheck, 
  Clock, 
  Printer, 
  Truck, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  Eye, 
  FileText, 
  ChevronRight, 
  AlertTriangle, 
  Download, 
  Plus, 
  Sparkles,
  RefreshCw,
  Building2,
  ExternalLink,
  MapPin,
  Phone,
  ArrowUpRight,
  Edit3,
  UserCheck,
  Send,
  MessageSquare
} from 'lucide-react';

export default function AdminDashboard({ 
  adminUser, 
  applications, 
  complaints = [],
  onUpdateComplaintStatus,
  onUpdateStatus, 
  onUpdateAdminProfile,
  onSwitchToWargaView 
}) {
  const [adminSection, setAdminSection] = useState('applications'); // 'applications' | 'complaints'
  const [complaintFilter, setComplaintFilter] = useState('all'); // 'all' | 'pending' | 'forwarded' | 'resolved'
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'pending' | 'printing' | 'shipping' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [courierInput, setCourierInput] = useState('JNE Express (Garuda Yaksa)');
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Edit Admin Profile State
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editProfileForm, setEditProfileForm] = useState({
    name: '',
    nip: '',
    roleLabel: '',
    department: '',
    avatarUrl: ''
  });

  const handleOpenEditProfile = () => {
    setEditProfileForm({
      name: adminUser?.name || '',
      nip: adminUser?.nip || '',
      roleLabel: adminUser?.roleLabel || '',
      department: adminUser?.department || '',
      avatarUrl: adminUser?.avatarUrl || ''
    });
    setShowEditProfileModal(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (onUpdateAdminProfile) {
      onUpdateAdminProfile(editProfileForm);
    }
    setShowEditProfileModal(false);
  };

  // Metrics count
  const totalApps = applications.length;
  const pendingApps = applications.filter(a => a.statusCategory === 'pending').length;
  const printingApps = applications.filter(a => a.statusCategory === 'printing').length;
  const shippingApps = applications.filter(a => a.statusCategory === 'shipping').length;
  const completedApps = applications.filter(a => a.statusCategory === 'completed').length;

  // Filtered applications
  const filteredApps = applications.filter(app => {
    const matchesFilter = activeFilter === 'all' || app.statusCategory === activeFilter;
    const matchesSearch = 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.nikFull.includes(searchQuery) ||
      app.regNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleApproveAndPrint = (appId) => {
    onUpdateStatus(appId, {
      statusCategory: 'printing',
      statusBadge: 'Proses Pencetakan Blangko',
      etaText: 'Besok Pagi, 09:00 WIB',
    });
    if (selectedApp?.id === appId) {
      setSelectedApp(prev => ({
        ...prev,
        statusCategory: 'printing',
        statusBadge: 'Proses Pencetakan Blangko'
      }));
    }
  };

  const handleAssignCourier = (appId) => {
    const randomResi = `RES-MAG-${Math.floor(100000 + Math.random() * 900000)}`;
    onUpdateStatus(appId, {
      statusCategory: 'shipping',
      statusBadge: 'Dalam Pengiriman Kurir',
      resiNumber: randomResi,
      courierName: 'Budi Santoso',
      courierService: courierInput,
      etaText: 'Hari ini, sebelum 17:00 WIB',
    });
    if (selectedApp?.id === appId) {
      setSelectedApp(prev => ({
        ...prev,
        statusCategory: 'shipping',
        statusBadge: 'Dalam Pengiriman Kurir',
        resiNumber: randomResi
      }));
    }
  };

  const handleReject = (appId) => {
    if (!rejectReason) return;
    onUpdateStatus(appId, {
      statusCategory: 'rejected',
      statusBadge: 'Permohonan Ditolak / Perlu Perbaikan',
      rejectionNote: rejectReason
    });
    setShowRejectModal(false);
    setRejectReason('');
    setSelectedApp(null);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 p-4 sm:p-6 lg:p-8 animate-fadeIn pb-24">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Info Banner matching Warga Theme */}
        <div className="bg-gradient-to-r from-[#1B365D] via-[#244675] to-[#12243e] text-[#FDFBF7] border border-[#1E293B]/15 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-[#FDFBF7]/20 text-[#FDFBF7] rounded-2xl border border-[#FDFBF7]/30 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-black text-[#FDFBF7]">Portal Petugas Operator & Admin Disdukcapil</h2>
                <span className="px-2.5 py-0.5 bg-[#FDFBF7]/20 text-[#FDFBF7] text-[10px] font-black rounded-full border border-[#FDFBF7]/30 uppercase">
                  Kabupaten Magelang
                </span>
              </div>
              <p className="text-xs text-slate-200 mt-0.5">
                Verifikasi permohonan warga, setujui cetak KTP, dan atur kurir pengiriman secara terpusat di sini.
              </p>
            </div>
          </div>
        </div>

        {/* Admin Header & Operator Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FDFBF7] p-5 rounded-3xl border border-[#1E293B]/15 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <img 
                src={adminUser?.avatarUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250"} 
                alt={adminUser?.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#1B365D] shadow-md"
              />
              <button
                type="button"
                onClick={handleOpenEditProfile}
                title="Ganti Foto Profil"
                className="absolute -bottom-1 -right-1 p-1 bg-[#1B365D] text-white rounded-lg shadow hover:bg-[#244675] transition"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg font-extrabold text-slate-900">
                  {adminUser?.name}
                </h1>
                <button
                  type="button"
                  onClick={handleOpenEditProfile}
                  className="px-2.5 py-1 bg-[#1B365D]/10 hover:bg-[#1B365D] hover:text-white text-[#1B365D] text-[11px] font-bold rounded-lg border border-[#1E293B]/15 flex items-center gap-1 transition"
                >
                  <Edit3 className="w-3 h-3" /> Edit Profil
                </button>
              </div>
              <p className="text-xs font-semibold text-[#1B365D]">
                {adminUser?.roleLabel} • NIP: {adminUser?.nip}
              </p>
              <p className="text-[11px] text-slate-600 mt-0.5 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#1B365D]" />
                {adminUser?.department}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="bg-[#1B365D]/10 px-4 py-2 rounded-2xl border border-[#1E293B]/15 text-center flex-1 sm:flex-none">
              <span className="text-[10px] uppercase font-bold text-slate-600 block">Stok Blangko KTP</span>
              <span className="text-sm font-black text-[#1B365D] font-mono">1,420 Keping</span>
            </div>
            <div className="bg-[#1B365D]/10 px-4 py-2 rounded-2xl border border-[#1E293B]/15 text-center flex-1 sm:flex-none">
              <span className="text-[10px] uppercase font-bold text-slate-600 block">Status Mesin Cetak</span>
              <span className="text-sm font-black text-emerald-700 flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span> Online
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Statistics Grid - Warm Theme */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <button
            onClick={() => setActiveFilter('all')}
            className={`p-4 rounded-2xl border text-left transition shadow-sm ${
              activeFilter === 'all'
                ? 'bg-[#1B365D] text-[#FDFBF7] border-[#1B365D] shadow-md'
                : 'bg-[#FDFBF7] border-[#1E293B]/15 text-slate-800 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between opacity-90 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Masuk</span>
              <Users className="w-4 h-4" />
            </div>
            <div className="text-2xl font-black font-mono">{totalApps}</div>
            <span className="text-[10px] opacity-80 mt-1 block">Semua Permohonan</span>
          </button>

          <button
            onClick={() => setActiveFilter('pending')}
            className={`p-4 rounded-2xl border text-left transition shadow-sm ${
              activeFilter === 'pending'
                ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                : 'bg-amber-50/70 border-amber-200 text-amber-900 hover:bg-amber-100'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Perlu Verifikasi</span>
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-2xl font-black font-mono">{pendingApps}</div>
            <span className="text-[10px] opacity-80 mt-1 block">Menunggu Cek Admin</span>
          </button>

          <button
            onClick={() => setActiveFilter('printing')}
            className={`p-4 rounded-2xl border text-left transition shadow-sm ${
              activeFilter === 'printing'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                : 'bg-indigo-50/70 border-indigo-200 text-indigo-900 hover:bg-indigo-100'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Proses Cetak</span>
              <Printer className="w-4 h-4" />
            </div>
            <div className="text-2xl font-black font-mono">{printingApps}</div>
            <span className="text-[10px] opacity-80 mt-1 block">Antrean Mesin KTP</span>
          </button>

          <button
            onClick={() => setActiveFilter('shipping')}
            className={`p-4 rounded-2xl border text-left transition shadow-sm ${
              activeFilter === 'shipping'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                : 'bg-emerald-50/70 border-emerald-200 text-emerald-900 hover:bg-emerald-100'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Dikirim Kurir</span>
              <Truck className="w-4 h-4" />
            </div>
            <div className="text-2xl font-black font-mono">{shippingApps}</div>
            <span className="text-[10px] opacity-80 mt-1 block">Dalam Antaran Kurir</span>
          </button>
        </div>

        {/* Main Section Navigation: Permohonan Dokumen vs Pengaduan Kendala */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3 flex-wrap">
          <button
            onClick={() => setAdminSection('applications')}
            className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs flex items-center gap-2 transition ${
              adminSection === 'applications'
                ? 'bg-[#1B365D] text-[#FDFBF7] shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Permohonan Dokumen</span>
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-mono">
              {applications.length}
            </span>
          </button>

          <button
            onClick={() => setAdminSection('complaints')}
            className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs flex items-center gap-2 transition ${
              adminSection === 'complaints'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Tiket Pengaduan Kendala Pengiriman</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
              complaints.filter(c => c.status === 'Menunggu Tindak Lanjut').length > 0
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-slate-200 text-slate-800'
            }`}>
              {complaints.length}
            </span>
          </button>
        </div>

        {adminSection === 'complaints' ? (
          /* COMPLAINTS MANAGEMENT CARD */
          <div className="bg-[#FDFBF7] rounded-3xl border border-[#1E293B]/15 overflow-hidden shadow-xl space-y-4 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  Daftar Tiket Pengaduan Kendala Pengiriman
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Laporan kendala kurir yang diajukan langsung oleh warga melalui portal Sigopil
                </p>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap text-xs font-bold">
                <button
                  onClick={() => setComplaintFilter('all')}
                  className={`px-3 py-1.5 rounded-xl border transition ${
                    complaintFilter === 'all'
                      ? 'bg-[#1B365D] text-white border-[#1B365D]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Semua ({complaints.length})
                </button>
                <button
                  onClick={() => setComplaintFilter('pending')}
                  className={`px-3 py-1.5 rounded-xl border transition ${
                    complaintFilter === 'pending'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Menunggu ({complaints.filter(c => c.status === 'Menunggu Tindak Lanjut').length})
                </button>
                <button
                  onClick={() => setComplaintFilter('forwarded')}
                  className={`px-3 py-1.5 rounded-xl border transition ${
                    complaintFilter === 'forwarded'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Diteruskan ({complaints.filter(c => c.status === 'Diteruskan ke Kurir').length})
                </button>
                <button
                  onClick={() => setComplaintFilter('resolved')}
                  className={`px-3 py-1.5 rounded-xl border transition ${
                    complaintFilter === 'resolved'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Selesai ({complaints.filter(c => c.status === 'Selesai Ditangani').length})
                </button>
              </div>
            </div>

            {complaints.length === 0 ? (
              <div className="py-12 text-center text-slate-500">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-800">Tidak ada pengaduan kendala aktif</p>
                <p className="text-xs text-slate-500">Semua pengiriman berjalan lancar tanpa kendala.</p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {complaints
                  .filter(c => {
                    if (complaintFilter === 'pending') return c.status === 'Menunggu Tindak Lanjut';
                    if (complaintFilter === 'forwarded') return c.status === 'Diteruskan ke Kurir';
                    if (complaintFilter === 'resolved') return c.status === 'Selesai Ditangani';
                    return true;
                  })
                  .map((c) => (
                    <div 
                      key={c.id}
                      className="p-4 sm:p-5 bg-white border border-[#1E293B]/15 rounded-2xl shadow-sm hover:border-[#1B365D]/30 transition space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-black text-[#1B365D] bg-[#1B365D]/10 px-2.5 py-1 rounded-lg">
                            {c.ticketNumber}
                          </span>
                          <span className="text-xs font-bold text-slate-900">
                            {c.applicantName}
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            NIK: {c.nik}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-500 font-medium">
                            {c.submittedAt}
                          </span>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                            c.status === 'Menunggu Tindak Lanjut'
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : c.status === 'Diteruskan ke Kurir'
                              ? 'bg-blue-100 text-blue-900 border-blue-300'
                              : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          }`}>
                            {c.status}
                          </span>
                        </div>
                      </div>

                      {/* Complaint Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <div>
                          <span className="text-slate-500 font-bold block text-[10px] uppercase">Kategori Kendala:</span>
                          <span className="font-extrabold text-amber-900">{c.categoryLabel}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-bold block text-[10px] uppercase">Resi & Ekspedisi:</span>
                          <span className="font-mono font-bold text-[#1B365D]">{c.courierService} • {c.resiNumber}</span>
                          <span className="text-slate-600 block text-[11px]">Kurir: {c.courierName}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl text-xs text-amber-950 font-medium space-y-1">
                        <span className="font-bold text-[10px] text-amber-800 uppercase block tracking-wider">
                          Uraian Masalah / Catatan Warga:
                        </span>
                        <p className="leading-relaxed">"{c.description}"</p>
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 flex-wrap">
                        <a
                          href={`https://wa.me/6281298765432?text=Halo%20${encodeURIComponent(c.courierName)},%20ada%20kendala%20pengiriman%20KTP-el%20nomor%20resi%20${c.resiNumber}%20untuk%20pemohon%20${encodeURIComponent(c.applicantName)}:%20${encodeURIComponent(c.description)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm"
                        >
                          <Phone className="w-3.5 h-3.5" /> Hubungi Kurir WA ({c.courierName})
                        </a>

                        <div className="flex items-center gap-2">
                          {c.status !== 'Diteruskan ke Kurir' && c.status !== 'Selesai Ditangani' && (
                            <button
                              onClick={() => onUpdateComplaintStatus && onUpdateComplaintStatus(c.id, 'Diteruskan ke Kurir')}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm"
                            >
                              <Send className="w-3.5 h-3.5" /> Diteruskan ke Kurir
                            </button>
                          )}

                          {c.status !== 'Selesai Ditangani' && (
                            <button
                              onClick={() => onUpdateComplaintStatus && onUpdateComplaintStatus(c.id, 'Selesai Ditangani')}
                              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Tandai Selesai
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ) : (
          /* APPLICATIONS LIST CONTAINER */
          <>

        {/* Search & Filter Bar */}
        <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#1E293B]/15 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#1B365D] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari NIK, Nama Warga, No. Reg..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#1E293B]/15 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B365D] font-medium shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs font-bold">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl border transition ${
                activeFilter === 'all'
                  ? 'bg-[#1B365D] text-[#FDFBF7] border-[#1B365D]'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Semua ({totalApps})
            </button>
            <button
              onClick={() => setActiveFilter('pending')}
              className={`px-3.5 py-1.5 rounded-xl border transition ${
                activeFilter === 'pending'
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Menunggu ({pendingApps})
            </button>
            <button
              onClick={() => setActiveFilter('printing')}
              className={`px-3.5 py-1.5 rounded-xl border transition ${
                activeFilter === 'printing'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Cetak ({printingApps})
            </button>
            <button
              onClick={() => setActiveFilter('shipping')}
              className={`px-3.5 py-1.5 rounded-xl border transition ${
                activeFilter === 'shipping'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Kurir ({shippingApps})
            </button>
          </div>
        </div>

        {/* Inbox Applications List Card */}
        <div className="bg-[#FDFBF7] rounded-3xl border border-[#1E293B]/15 overflow-hidden shadow-xl">
          <div className="p-4 sm:p-5 bg-[#1B365D] text-[#FDFBF7] border-b border-[#1E293B]/15 flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-[#FDFBF7] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#FDFBF7]" />
              Daftar Inbox Permohonan Warga ({filteredApps.length})
            </h3>
            <span className="text-xs text-slate-200 font-mono">Real-time Sync Active</span>
          </div>

          {filteredApps.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-2">
              <FileCheck className="w-12 h-12 mx-auto text-slate-400" />
              <p className="text-sm font-bold text-slate-700">Tidak ada permohonan dalam kategori ini.</p>
              <p className="text-xs text-slate-500">Gunakan kolom pencarian atau ubah filter di atas.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {filteredApps.map((app) => (
                <div key={app.id} className="p-4 sm:p-5 hover:bg-slate-100/70 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  
                  {/* Applicant Details */}
                  <div className="flex items-start gap-3.5">
                    <img
                      src={app.avatarUrl}
                      alt={app.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-[#1B365D]/20 flex-shrink-0 mt-0.5 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-extrabold text-slate-900">{app.name}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-200 text-slate-800 rounded font-bold border border-slate-300">
                          {app.regNumber}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-mono mt-0.5">
                        NIK: {app.nikFull}
                      </p>
                      <p className="text-xs text-[#1B365D] font-extrabold mt-1">
                        {app.serviceType}
                      </p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#1B365D]" />
                        {app.address}
                      </p>
                      {app.resiNumber && (
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded-lg text-xs font-mono font-bold shadow-sm">
                            <Truck className="w-3.5 h-3.5 text-amber-700" />
                            <span>{app.courierService ? app.courierService.split(' ')[0] : 'JNE'}:</span>
                            <span className="font-black text-[#1B365D]">{app.resiNumber}</span>
                          </span>
                          {app.courierName && (
                            <span className="text-[11px] text-slate-600 font-medium">
                              Kurir: <strong>{app.courierName}</strong>
                            </span>
                          )}
                          {complaints.some(c => c.resiNumber === app.resiNumber && c.status !== 'Selesai Ditangani') && (
                            <button
                              type="button"
                              onClick={() => setAdminSection('complaints')}
                              className="inline-flex items-center gap-1 text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300 px-2 py-0.5 rounded-lg hover:bg-rose-200 transition"
                            >
                              <AlertTriangle className="w-3 h-3 text-rose-600" /> Ada Kendala Pengiriman
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Badge & Action Buttons */}
                  <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-200">
                    <div className="text-left md:text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${
                        app.statusCategory === 'pending'
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : app.statusCategory === 'printing'
                          ? 'bg-indigo-100 text-indigo-900 border-indigo-300'
                          : app.statusCategory === 'shipping'
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : app.statusCategory === 'rejected'
                          ? 'bg-rose-100 text-rose-900 border-rose-300'
                          : 'bg-blue-100 text-blue-900 border-blue-300'
                      }`}>
                        {app.statusBadge}
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-1">
                        {app.submittedAt}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 flex items-center gap-1 transition shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#1B365D]" /> Detail
                      </button>

                      {app.statusCategory === 'pending' && (
                        <button
                          onClick={() => handleApproveAndPrint(app.id)}
                          className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl flex items-center gap-1 transition shadow-md active:scale-95"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Setujui & Cetak
                        </button>
                      )}

                      {app.statusCategory === 'printing' && (
                        <button
                          onClick={() => handleAssignCourier(app.id)}
                          className="px-3 py-2 bg-[#1B365D] hover:bg-[#244675] text-[#FDFBF7] text-xs font-extrabold rounded-xl flex items-center gap-1 transition shadow-md active:scale-95"
                        >
                          <Truck className="w-3.5 h-3.5 text-emerald-300" /> Kirim Kurir
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
        </>
      )}

      </div>

      {/* DETAIL VERIFIKASI MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-[#1B365D]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FDFBF7] border border-[#1E293B]/20 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-slate-900 p-6 space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-extrabold text-[#1B365D] uppercase tracking-widest block">
                  Verifikasi Berkas Permohonan
                </span>
                <h3 className="text-lg font-black text-slate-900">{selectedApp.name}</h3>
                <p className="text-xs font-mono text-slate-600">NIK: {selectedApp.nikFull} • Reg: {selectedApp.regNumber}</p>
              </div>
              <button 
                onClick={() => setSelectedApp(null)}
                className="p-1.5 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-200 transition"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Applicant Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4 rounded-2xl border border-slate-200 text-xs shadow-sm">
              <div>
                <span className="text-slate-500 font-bold block">Jenis Layanan:</span>
                <span className="text-[#1B365D] font-extrabold">{selectedApp.serviceType}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block">Alamat Tujuan Pengiriman:</span>
                <span className="text-slate-800">{selectedApp.address}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block">Waktu Pengajuan:</span>
                <span className="text-slate-800">{selectedApp.submittedAt}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block">Status Saat Ini:</span>
                <span className="text-emerald-700 font-bold">{selectedApp.statusBadge}</span>
              </div>
            </div>

            {/* Uploaded Documents List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Lampiran Berkas Syarat:</h4>
              <div className="space-y-2">
                {selectedApp.documents?.map((doc, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs shadow-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#1B365D]" />
                      <span className="font-bold text-slate-900">{doc.name}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-[10px] font-bold">
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => setShowRejectModal(true)}
                className="w-full sm:w-auto px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl transition"
              >
                Tolak / Minta Perbaikan Berkas
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {selectedApp.statusCategory === 'pending' && (
                  <button
                    onClick={() => handleApproveAndPrint(selectedApp.id)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Setujui & Mulai Cetak Blangko
                  </button>
                )}

                {selectedApp.statusCategory === 'printing' && (
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select
                      value={courierInput}
                      onChange={(e) => setCourierInput(e.target.value)}
                      className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                    >
                      <option value="JNE Express (Mitra Sigopil Magelang)">JNE Express Magelang</option>
                      <option value="POS Indonesia Magelang (Sameday)">POS Indonesia Sameday</option>
                      <option value="Kurir Khusus Disdukcapil (Jemput Bola)">Kurir Khusus Disdukcapil</option>
                    </select>

                    <button
                      onClick={() => handleAssignCourier(selectedApp.id)}
                      className="px-4 py-2.5 bg-[#1B365D] hover:bg-[#244675] text-[#FDFBF7] text-xs font-extrabold rounded-xl shadow-lg transition flex items-center gap-1.5"
                    >
                      <Truck className="w-4 h-4 text-emerald-300" /> Tugaskan Kurir
                    </button>
                  </div>
                )}

                {selectedApp.statusCategory === 'shipping' && (
                  <button
                    onClick={() => setShowPrintModal(true)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                  >
                  <Printer className="w-4 h-4" /> Cetak Label Pengiriman / Resi
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    )}

      {/* REJECT MODAL */}
      {showRejectModal && selectedApp && (
        <div className="fixed inset-0 z-50 bg-[#1B365D]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] border border-[#1E293B]/20 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-slate-900">
            <h3 className="text-base font-bold text-rose-700 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" /> Penolakan Permohonan Warga
            </h3>
            <p className="text-xs text-slate-600">
              Kirimkan alasan penolakan atau berkas perbaikan untuk <strong>{selectedApp.name}</strong>. Pesan ini akan muncul di aplikasi warga.
            </p>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Contoh: Lampiran Kartu Keluarga buram, mohon unggah ulang foto KK yang lebih jelas."
              className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 bg-slate-200 text-slate-800 rounded-xl text-xs font-bold hover:bg-slate-300"
              >
                Batal
              </button>
              <button
                onClick={() => handleReject(selectedApp.id)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md"
              >
                Kirim Penolakan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIMULATED PRINT RESI STICKER MODAL */}
      {showPrintModal && selectedApp && (
        <div className="fixed inset-0 z-50 bg-[#1B365D]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl font-mono text-xs border border-slate-300">
            <div className="border-b-2 border-dashed border-slate-300 pb-3 text-center">
              <h2 className="text-base font-black text-slate-900">DISDUKCAPIL KABUPATEN MAGELANG</h2>
              <p className="text-[10px] text-slate-600 font-sans">LABEL RESI PENGIRIMAN DOKUMEN KEPENDUDUKAN</p>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>NO. RESI:</span>
                <span className="font-extrabold text-[#1B365D]">{selectedApp.resiNumber || 'JNE-9988231201'}</span>
              </div>
              <div className="flex justify-between">
                <span>NO. REG:</span>
                <span className="font-bold">{selectedApp.regNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>KURIR:</span>
                <span className="font-bold">{selectedApp.courierService}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-300 space-y-1 font-sans">
              <span className="font-extrabold text-slate-900 block text-[11px]">PENERIMA:</span>
              <p className="font-bold text-sm text-[#1B365D]">{selectedApp.name}</p>
              <p className="text-[11px] text-slate-700">{selectedApp.address}</p>
            </div>

            <div className="p-2 border border-amber-300 bg-amber-50 rounded text-center text-[10px] font-sans text-amber-900">
              ⚠️ PERHATIAN: Wajib tunjukkan KK Asli fisik saat penyerahan paket KTP-el.
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 font-sans">
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 bg-slate-200 text-slate-800 rounded-xl text-xs font-bold hover:bg-slate-300"
              >
                Tutup Pratinjau
              </button>
              <button
                onClick={() => {
                  alert('Instruksi cetak resi dikirim ke printer thermal Disdukcapil!');
                  setShowPrintModal(false);
                }}
                className="px-4 py-2 bg-[#1B365D] text-white rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-[#244675] shadow"
              >
                <Printer className="w-3.5 h-3.5" /> Cetak Thermal Label
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT ADMIN PROFILE MODAL */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 bg-[#1B365D]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FDFBF7] border border-[#1E293B]/20 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#1B365D]/10 text-[#1B365D] rounded-xl">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Edit Profil Petugas Operator</h3>
                  <p className="text-xs text-slate-500">Perbarui informasi identitas akun admin Disdukcapil</p>
                </div>
              </div>
              <button 
                onClick={() => setShowEditProfileModal(false)}
                className="p-1.5 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-200 transition"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                <input 
                  type="text"
                  required
                  value={editProfileForm.name}
                  onChange={(e) => setEditProfileForm({ ...editProfileForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#1E293B]/20 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B365D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">NIP (Nomor Induk Pegawai)</label>
                <input 
                  type="text"
                  required
                  value={editProfileForm.nip}
                  onChange={(e) => setEditProfileForm({ ...editProfileForm, nip: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#1E293B]/20 rounded-xl text-xs font-mono font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B365D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Jabatan / Role Label</label>
                <input 
                  type="text"
                  required
                  value={editProfileForm.roleLabel}
                  onChange={(e) => setEditProfileForm({ ...editProfileForm, roleLabel: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#1E293B]/20 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B365D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Seksi / Departemen / Unit Kerja</label>
                <input 
                  type="text"
                  required
                  value={editProfileForm.department}
                  onChange={(e) => setEditProfileForm({ ...editProfileForm, department: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#1E293B]/20 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B365D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">URL Foto Avatar</label>
                <input 
                  type="url"
                  value={editProfileForm.avatarUrl}
                  onChange={(e) => setEditProfileForm({ ...editProfileForm, avatarUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#1E293B]/20 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B365D]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1B365D] hover:bg-[#244675] text-[#FDFBF7] text-xs font-extrabold rounded-xl shadow-md transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> Simpan Profil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
