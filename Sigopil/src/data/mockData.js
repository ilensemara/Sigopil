export const MOCK_ADMIN = {
  id: "admin-1",
  nik: "3308011204850001",
  nip: "19850412 201001 1 003",
  name: "Drs. Hendra Setiawan, M.Si",
  role: "admin",
  roleLabel: "Operator Verifikasi Disdukcapil",
  department: "Seksi Identitas Kependudukan Kab. Magelang",
  phone: "08112345678",
  avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250",
};

export const MOCK_USERS = [
  {
    id: "dimas",
    role: "warga",
    name: "Dimas Aditya Pratama",
    nikMasked: "317305********80",
    nikFull: "3173051204050080",
    regNumber: "REG-2026-KTP-88219",
    resiNumber: "JNE-9988231201",
    courierName: "Budi Santoso",
    courierService: "JNE Express (Garuda Yaksa)",
    courierVehicle: "Honda Vario (B 4219 BKO)",
    courierPhone: "+6281298765432",
    etaText: "Hari ini, sebelum 17:00",
    etaTimeWindow: "Hari Ini, Pukul 14:30 – 16:00 WIB",
    address: "Jl. Anggrek Cendrawasih No. 42, Palmerah, Jakarta Barat",
    serviceType: "PENCETAKAN KTP-EL BARU (PEMULA)",
    statusBadge: "Dalam Pengiriman Kurir",
    statusCategory: "shipping",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    courierAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    submittedAt: "18 Sept 2026, 09:15 WIB",
    documents: [
      { name: "Kartu Keluarga (KK)", status: "Valid", fileUrl: "#" },
      { name: "Foto Biometrik Wajah", status: "Terverifikasi Disdukcapil", fileUrl: "#" }
    ],
    internalTimeline: [
      { id: 1, title: "Perekaman Biometrik", timestamp: "18 Sept, 09:30", description: "Pengambilan foto wajah & sidik jari pemohon di Kantor Kec. Kebon Jeruk.", completed: true },
      { id: 2, title: "Verifikasi Data Terpusat", timestamp: "18 Sept, 14:15", description: "Pemeriksaan ketunggalan data identitas dinyatakan valid 100%.", completed: true },
      { id: 3, title: "Blangko KTP Selesai Dicetak", timestamp: "19 Sept, 10:00", description: "Pencetakan fisik selesai via Mesin Cetak Dukcapil Pusat & dikemas aman.", completed: true },
    ],
    shippingTimeline: [
      { id: 1, title: "Paket Diserahkan ke Kurir", timestamp: "19 Sept, 11:30", description: "Paket KTP-el telah di-pickup dari Hub Pusat Disdukcapil DKI Jakarta.", status: "completed", statusText: null },
      { id: 2, title: "Kurir Menuju Alamat Pemohon", timestamp: null, description: "Tujuan: Jl. Anggrek Cendrawasih No. 42, Palmerah, Jakarta Barat", status: "active", statusText: "Sedang Jalan" },
      { id: 3, title: "Penerimaan & Serah Terima", timestamp: null, description: "Wajib menunjukkan Kartu Keluarga (KK) Asli fisik saat penyerahan dokumen.", status: "pending", statusText: "Menunggu" },
    ]
  },
  {
    id: "siti",
    role: "warga",
    name: "Siti Nurhaliza",
    nikMasked: "327301********12",
    nikFull: "3273014508060012",
    regNumber: "REG-2026-KTP-44102",
    resiNumber: "POS-BDG-7712049",
    courierName: "Asep Sunandar",
    courierService: "POS Indonesia (Sameday)",
    courierVehicle: "Yamaha NMAX (D 3108 AD)",
    courierPhone: "+6282119845678",
    etaText: "Besok Pagi, 09:00 - 11:00 WIB",
    etaTimeWindow: "Besok Pagi, Pukul 09:00 WIB",
    address: "Jl. Ir. H. Juanda No. 108, Dago - Coblong, Kota Bandung",
    serviceType: "PENGGANTIAN KTP-EL HILANG",
    statusBadge: "Proses Pencetakan Blangko",
    statusCategory: "printing",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
    courierAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
    submittedAt: "19 Sept 2026, 08:00 WIB",
    documents: [
      { name: "Surat Kehilangan Polri (STPL)", status: "Terverifikasi", fileUrl: "#" },
      { name: "Kartu Keluarga (KK)", status: "Valid", fileUrl: "#" }
    ],
    internalTimeline: [
      { id: 1, title: "Verifikasi Surat Kehilangan Polri", timestamp: "19 Sept, 08:30", description: "Surat kehilangan nomor STPL/881/IX/2026 dinyatakan sah.", completed: true },
      { id: 2, title: "Pemeriksaan Ketunggalan Data", timestamp: "19 Sept, 10:15", description: "Database terverifikasi aktif tanpa duplikasi data.", completed: true },
      { id: 3, title: "Proses Antrean Pencetakan Blangko", timestamp: "19 Sept, 13:00", description: "Dokumen dikirim ke mesin cetak e-KTP Disdukcapil Kota Bandung.", completed: true },
    ],
    shippingTimeline: [
      { id: 1, title: "Persiapan Penyerahan ke Kurir POS", timestamp: null, description: "Menunggu penyelesaian fisik dari ruang cetak.", status: "active", statusText: "Proses Cetak" },
      { id: 2, title: "Pengantaran Kurir ke Alamat", timestamp: null, description: "Tujuan: Jl. Ir. H. Juanda No. 108, Dago - Coblong, Kota Bandung", status: "pending", statusText: "Menunggu" },
      { id: 3, title: "Serah Terima Fisik KTP", timestamp: null, description: "Wajib menunjukkan Surat Keterangan Kepolisian Asli.", status: "pending", statusText: "Menunggu" },
    ]
  },
  {
    id: "budi_warga",
    role: "warga",
    name: "Budi Santoso Wibowo",
    nikMasked: "330801********09",
    nikFull: "3308011905020009",
    regNumber: "REG-2026-KTP-99301",
    resiNumber: "PENDING-RESI",
    courierName: "-",
    courierService: "Belum Ditugaskan",
    courierVehicle: "-",
    courierPhone: "-",
    etaText: "Menunggu Verifikasi Petugas Admin",
    etaTimeWindow: "Estimasi 1-2 Hari Kerja",
    address: "Jl. Pemuda No. 15, Muntilan, Kabupaten Magelang",
    serviceType: "PERUBAHAN DATA ALAMAT & STATUS KAWIN",
    statusBadge: "Menunggu Verifikasi Admin",
    statusCategory: "pending",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    submittedAt: "20 Sept 2026, 10:45 WIB",
    documents: [
      { name: "Buku Nikah / Akta Perkawinan", status: "Perlu Verifikasi", fileUrl: "#" },
      { name: "Surat Pengantar RT/RW", status: "Valid", fileUrl: "#" }
    ],
    internalTimeline: [
      { id: 1, title: "Pengajuan Diterima Web Admin", timestamp: "20 Sept, 10:45", description: "Dokumen berhasil diunggah oleh warga dan masuk inbox permohonan.", completed: true },
      { id: 2, title: "Pemeriksaan Berkas Petugas", timestamp: "Menunggu Admin", description: "Admin Disdukcapil sedang memverifikasi kelengkapan berkas.", completed: false },
      { id: 3, title: "Pencetakan KTP Baru", timestamp: "Menunggu", description: "Antrean pencetakan fisik KTP-el.", completed: false },
    ],
    shippingTimeline: [
      { id: 1, title: "Persiapan Kurir", timestamp: null, description: "Menunggu penyelesaian fisik dari ruang cetak.", status: "pending", statusText: "Menunggu" },
      { id: 2, title: "Pengantaran Kurir", timestamp: null, description: "Tujuan: Jl. Pemuda No. 15, Muntilan, Kab. Magelang", status: "pending", statusText: "Menunggu" },
      { id: 3, title: "Serah Terima Fisik KTP", timestamp: null, description: "Wajib tunjukkan KK Asli.", status: "pending", statusText: "Menunggu" },
    ]
  }
];

export const MOCK_USER = MOCK_USERS[0];
export const MOCK_INTERNAL_TIMELINE = MOCK_USERS[0].internalTimeline;
export const MOCK_SHIPPING_TIMELINE = MOCK_USERS[0].shippingTimeline;

export const MOCK_REQUIREMENTS = [
  {
    title: "KTP-el Pemula (Usia 17 Tahun)",
    items: [
      "Fotokopi Kartu Keluarga (KK) terbaru",
      "Telah berusia 17 tahun atau sudah menikah",
      "Surat Pengantar RT/RW (opsional / tergantung daerah)",
      "Tidak perlu surat pindah jika alamat tetap",
    ],
  },
  {
    title: "KTP-el Hilang / Rusak",
    items: [
      "Surat Keterangan Kehilangan dari Kepolisian (untuk KTP hilang)",
      "Fisik KTP-el lama yang rusak (untuk KTP rusak)",
      "Fotokopi Kartu Keluarga (KK)",
    ],
  },
  {
    title: "Perubahan Data KTP-el",
    items: [
      "KTP-el Asli lama",
      "Fotokopi Kartu Keluarga (KK)",
      "Dokumen pendukung perubahan data (Ijazah / Akta Nikah / Surat Pindah)",
    ],
  },
];

export const INITIAL_CHAT_MESSAGES = [
  {
    id: "m1",
    sender: "bot",
    time: "10:24 WIB",
    text: "Halo Warga! Saya **Si-Bo**, asisten virtual Sigopil. Ada yang bisa saya bantu terkait KTP-el atau dokumen kependudukan hari ini?",
    chips: [
      { id: "c1", label: "Cek Posisi KTP Saya", icon: "package" },
      { id: "c2", label: "Syarat KTP Pemula", icon: "file-text" },
      { id: "c3", label: "Lokasi Kantor", icon: "map-pin" },
      { id: "c4", label: "Estimasi Cetak", icon: "clock" },
    ],
  },
];
