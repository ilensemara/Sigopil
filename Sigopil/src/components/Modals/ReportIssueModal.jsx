import React, { useState } from 'react';
import { X, AlertTriangle, Send, CheckCircle2 } from 'lucide-react';
import { MOCK_USER } from '../../data/mockData';

export default function ReportIssueModal({ isOpen, onClose, user, onSubmitReport }) {
  const [issueType, setIssueType] = useState("alamat_tidak_ditemukan");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");

  const activeUser = user || MOCK_USER;

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const tktId = `tkt-${Date.now()}`;
    const tktNum = `#TKT-DUK-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketNumber(tktNum);

    const categoryLabels = {
      alamat_tidak_ditemukan: "Alamat Rumah Sulit Ditemukan Kurir",
      kurir_belum_sampai: "Status Sedang Jalan Tapi Kurir Belum Tiba",
      penerima_tidak_di_rumah: "Penerima Tidak Ada di Rumah (Perubahan Jam Deliver)",
      dokumen_rusak_salah: "Data Dokumen Tidak Sesuai / Rusak",
      lainnya: "Kendala Lainnya"
    };

    if (onSubmitReport) {
      onSubmitReport({
        id: tktId,
        ticketNumber: tktNum,
        applicantName: activeUser.name,
        nik: activeUser.nikFull,
        resiNumber: activeUser.resiNumber,
        courierName: activeUser.courierName || 'Budi Santoso',
        courierService: activeUser.courierService || 'JNE Express',
        category: issueType,
        categoryLabel: categoryLabels[issueType] || issueType,
        description: description,
        submittedAt: "Baru saja",
        status: "Menunggu Tindak Lanjut"
      });
    }

    setSubmitted(true);
  };

  const handleCloseModal = () => {
    setSubmitted(false);
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1B365D]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-[#1E293B]/15 max-h-[90vh] flex flex-col">
        <div className="bg-[#1B365D] p-4 text-[#FDFBF7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#FDFBF7]/80" />
            <h3 className="font-bold text-base">Laporkan Masalah Pengiriman</h3>
          </div>
          <button
            onClick={handleCloseModal}
            className="p-1 rounded-full text-[#FDFBF7]/80 hover:bg-[#244675] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Laporan Masuk ke Web Admin</h4>
              <p className="text-xs text-slate-600 mt-2">
                Petugas Disdukcapil telah menerima pengaduan Anda dan segera berkoordinasi dengan kurir ekspedisi.
              </p>
              <div className="mt-3 p-3 bg-[#FDFBF7] rounded-xl text-left text-xs font-mono border border-[#1E293B]/15 shadow-inner space-y-1">
                <p>Tiket Pengaduan: <strong className="text-[#1B365D]">{ticketNumber}</strong></p>
                <p>Resi Terkait: {activeUser.resiNumber}</p>
                <p className="text-[11px] text-emerald-700 font-sans font-bold">✓ Tersambung ke Portal Admin Disdukcapil</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="mt-5 w-full py-2.5 bg-[#1B365D] hover:bg-[#244675] text-[#FDFBF7] rounded-xl font-bold text-xs transition"
              >
                Tutup Form
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="p-3 bg-[#1B365D]/10 rounded-xl border border-[#1E293B]/15 text-xs text-[#1B365D]">
                Laporan ini akan langsung diteruskan ke Tim Monitoring Ekspedisi Dukcapil & Kurir {MOCK_USER.courierName}.
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Kendala</label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full p-2.5 border border-[#1E293B]/15 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#1B365D] bg-[#FDFBF7]"
                >
                  <option value="alamat_tidak_ditemukan">Alamat Rumah Sulit Ditemukan Kurir</option>
                  <option value="kurir_belum_sampai">Status Sedang Jalan Tapi Kurir Belum Tiba</option>
                  <option value="penerima_tidak_di_rumah">Penerima Tidak Ada di Rumah (Perubahan Jam Deliver)</option>
                  <option value="dokumen_rusak_salah">Data Dokumen Tidak Sesuai / Rusak</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Detail Masalah / Catatan Tambahan</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tuliskan keterangan detail atau patokan lokasi rumah..."
                  className="w-full p-2.5 bg-[#FDFBF7] border border-[#1E293B]/15 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#1B365D]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#1B365D] hover:bg-[#244675] text-[#FDFBF7] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition"
              >
                <Send className="w-4 h-4" /> Kirim Pengaduan Kendala
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
