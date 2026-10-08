# Sigopil (Sistem Informasi Ganti & Pengambilan KTP-el)

Aplikasi **Progressive Web App (PWA)** modern untuk monitoring status cetak KTP-el, lacak kurir pengantaran dokumen kependudukan, pengaduan warga, dan dashboard operator Disdukcapil Kabupaten Magelang.

Dibangun dengan arsitektur **React + Vite** pada frontend dan **Laravel REST API** pada backend.

---

## 🚀 Fitur Unggulan

- **🔍 Pelacakan Status KTP-el Realtime**: Lacak status permohonan cetak baru, rusak, atau hilang menggunakan NIK atau Nomor Resi.
- **🛵 Live Courier & Delivery Tracking**: Informasi profil kurir dinas, kontak langsung, estimasi waktu tiba (ETA), dan status pengantaran langsung ke alamat warga.
- **📱 Progressive Web App (PWA) & Offline Mode**: Mendukung instalasi aplikasi di perangkat Android/iOS (Add to Home Screen) serta banner deteksi status koneksi offline/online.
- **🤖 Chatbot Asisten Dukcapil**: Asisten interaktif 24/7 untuk tanya jawab persyaratan berkas, lokasi kantor layanan, jadwal, dan pelaporan kendala.
- **📊 Admin & Operator Dashboard**: Antarmuka bagi petugas Disdukcapil untuk mengelola permohonan, memvalidasi berkas, mengubah status cetak, dan menugaskan kurir.
- **📢 Formulir Pengaduan Cepat**: Pelaporan kendala distribusi atau permohonan yang langsung tersimpan ke database backend.

---

## 📁 Struktur Repositori

```text
Sigopil/
├── Sigopil/                 # Frontend React (PWA + Vite)
│   ├── public/              # Manifest PWA, Service Worker (sw.js), aset ikon
│   ├── src/
│   │   ├── components/      # Komponen UI (Admin, Auth, Chatbot, Modals, Tracking)
│   │   ├── data/            # Data fallback / mock data
│   │   ├── services/        # Integrasi REST API (api.js)
│   │   ├── App.jsx          # Logika navigasi utama & state aplikasi
│   │   └── main.jsx         # Entry point React
│   └── package.json
│
├── backend/                 # Backend Laravel REST API
│   ├── app/
│   │   ├── Http/Controllers/Api/SigopilController.php
│   │   └── Models/          # Model Citizen, Report, User
│   ├── database/
│   │   ├── migrations/      # Skema tabel data warga & laporan
│   │   └── seeders/         # Data dummy permohonan KTP-el
│   ├── routes/api.php       # Definisi endpoint RESTful
│   └── composer.json
│
├── .gitignore               # Konfigurasi ignore file rahasia & dependencies
└── README.md
```

---

## 🛠️ Panduan Instalasi & Menjalankan

### 1. Menjalankan Backend (Laravel API)

Pastikan telah terpasang **PHP >= 8.0** dan **Composer**.

```bash
cd backend

# Salin konfigurasi environment jika belum ada
cp .env.example .env

# Install dependensi
composer install

# Generate application key
php artisan key:generate

# Jalankan migrasi dan seeder data awal
php artisan migrate --seed

# Jalankan server API (default pada port 8000)
php artisan serve
```

API backend akan aktif di: `http://127.0.0.1:8000/api`

---

### 2. Menjalankan Frontend (React PWA)

Pastikan telah terpasang **Node.js >= 18** dan **npm**.

```bash
cd Sigopil

# Install dependensi frontend
npm install

# Jalankan server development
npm run dev
```

Aplikasi frontend akan aktif di: `http://localhost:5173`

> **Catatan Mode Offline/Fallback:** Frontend telah dilengkapi fallback data otomatis. Jika backend belum dinyalakan, fitur tracking dan navigasi tetap dapat dicoba dengan data simulasi bawaan.

---

## 📡 Daftar Endpoint API (Laravel)

| Metode | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/health` | Status pengecekan kesehatan server backend |
| `GET` | `/api/citizens` | Mengambil seluruh data permohonan warga (untuk Admin) |
| `GET` | `/api/tracking/{identifier}` | Tracking berdasarkan NIK, ID Permohonan, atau Nomor Resi |
| `POST` | `/api/login` | Otentikasi login Warga atau Operator Admin |
| `POST` | `/api/reports` | Mengirimkan laporan pengaduan kendala dokumen |

---

## 🔐 Konfigurasi Git & Deployment

Repositori ini disiapkan untuk sinkronisasi dengan GitHub:
`https://github.com/ilensemara/Sigopil.git`

```bash
# Push ke branch utama
git push -u origin main
```
