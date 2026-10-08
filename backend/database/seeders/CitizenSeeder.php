<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CitizenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Citizen::truncate();

        \App\Models\Citizen::create([
            'slug_id' => 'dimas',
            'role' => 'warga',
            'name' => 'Dimas Aditya Pratama',
            'nik_masked' => '317305********80',
            'nik_full' => '3173051204050080',
            'reg_number' => 'REG-2026-KTP-88219',
            'resi_number' => 'JNE-9988231201',
            'courier_name' => 'Budi Santoso',
            'courier_service' => 'JNE Express (Garuda Yaksa)',
            'courier_vehicle' => 'Honda Vario (B 4219 BKO)',
            'courier_phone' => '+6281298765432',
            'eta_text' => 'Hari ini, sebelum 17:00',
            'eta_time_window' => 'Hari Ini, Pukul 14:30 – 16:00 WIB',
            'address' => 'Jl. Anggrek Cendrawasih No. 42, Palmerah, Jakarta Barat',
            'service_type' => 'PENCETAKAN KTP-EL BARU (PEMULA)',
            'status_badge' => 'Dalam Pengiriman Kurir',
            'status_category' => 'shipping',
            'avatar_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
            'courier_avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
            'submitted_at' => '18 Sept 2026, 09:15 WIB',
            'documents' => [
                ['name' => 'Kartu Keluarga (KK)', 'status' => 'Valid', 'fileUrl' => '#'],
                ['name' => 'Foto Biometrik Wajah', 'status' => 'Terverifikasi Disdukcapil', 'fileUrl' => '#']
            ],
            'internal_timeline' => [
                ['id' => 1, 'title' => 'Perekaman Biometrik', 'timestamp' => '18 Sept, 09:30', 'description' => 'Pengambilan foto wajah & sidik jari pemohon di Kantor Kec. Kebon Jeruk.', 'completed' => true],
                ['id' => 2, 'title' => 'Verifikasi Data Terpusat', 'timestamp' => '18 Sept, 14:15', 'description' => 'Pemeriksaan ketunggalan data identitas dinyatakan valid 100%.', 'completed' => true],
                ['id' => 3, 'title' => 'Blangko KTP Selesai Dicetak', 'timestamp' => '19 Sept, 10:00', 'description' => 'Pencetakan fisik selesai via Mesin Cetak Dukcapil Pusat & dikemas aman.', 'completed' => true],
            ],
            'shipping_timeline' => [
                ['id' => 1, 'title' => 'Paket Diserahkan ke Kurir', 'timestamp' => '19 Sept, 11:30', 'description' => 'Paket KTP-el telah di-pickup dari Hub Pusat Disdukcapil DKI Jakarta.', 'status' => 'completed', 'statusText' => null],
                ['id' => 2, 'title' => 'Kurir Menuju Alamat Pemohon', 'timestamp' => null, 'description' => 'Tujuan: Jl. Anggrek Cendrawasih No. 42, Palmerah, Jakarta Barat', 'status' => 'active', 'statusText' => 'Sedang Jalan'],
                ['id' => 3, 'title' => 'Penerimaan & Serah Terima', 'timestamp' => null, 'description' => 'Wajib menunjukkan Kartu Keluarga (KK) Asli fisik saat penyerahan dokumen.', 'status' => 'pending', 'statusText' => 'Menunggu'],
            ]
        ]);

        \App\Models\Citizen::create([
            'slug_id' => 'siti',
            'role' => 'warga',
            'name' => 'Siti Nurhaliza',
            'nik_masked' => '327301********12',
            'nik_full' => '3273014508060012',
            'reg_number' => 'REG-2026-KTP-44102',
            'resi_number' => 'POS-BDG-7712049',
            'courier_name' => 'Asep Sunandar',
            'courier_service' => 'POS Indonesia (Sameday)',
            'courier_vehicle' => 'Yamaha NMAX (D 3108 AD)',
            'courier_phone' => '+6282119845678',
            'eta_text' => 'Besok Pagi, 09:00 - 11:00 WIB',
            'eta_time_window' => 'Besok Pagi, Pukul 09:00 WIB',
            'address' => 'Jl. Ir. H. Juanda No. 108, Dago - Coblong, Kota Bandung',
            'service_type' => 'PENGGANTIAN KTP-EL HILANG',
            'status_badge' => 'Proses Pencetakan Blangko',
            'status_category' => 'printing',
            'avatar_url' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
            'courier_avatar' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
            'submitted_at' => '19 Sept 2026, 08:00 WIB',
            'documents' => [
                ['name' => 'Surat Kehilangan Polri (STPL)', 'status' => 'Terverifikasi', 'fileUrl' => '#'],
                ['name' => 'Kartu Keluarga (KK)', 'status' => 'Valid', 'fileUrl' => '#']
            ],
            'internal_timeline' => [
                ['id' => 1, 'title' => 'Verifikasi Surat Kehilangan Polri', 'timestamp' => '19 Sept, 08:30', 'description' => 'Surat kehilangan nomor STPL/881/IX/2026 dinyatakan sah.', 'completed' => true],
                ['id' => 2, 'title' => 'Pemeriksaan Ketunggalan Data', 'timestamp' => '19 Sept, 10:15', 'description' => 'Database terverifikasi aktif tanpa duplikasi data.', 'completed' => true],
                ['id' => 3, 'title' => 'Proses Antrean Pencetakan Blangko', 'timestamp' => '19 Sept, 13:00', 'description' => 'Dokumen dikirim ke mesin cetak e-KTP Disdukcapil Kota Bandung.', 'completed' => true],
            ],
            'shipping_timeline' => [
                ['id' => 1, 'title' => 'Persiapan Penyerahan ke Kurir POS', 'timestamp' => null, 'description' => 'Menunggu penyelesaian fisik dari ruang cetak.', 'status' => 'active', 'statusText' => 'Proses Cetak'],
                ['id' => 2, 'title' => 'Pengantaran Kurir ke Alamat', 'timestamp' => null, 'description' => 'Tujuan: Jl. Ir. H. Juanda No. 108, Dago - Coblong, Kota Bandung', 'status' => 'pending', 'statusText' => 'Menunggu'],
                ['id' => 3, 'title' => 'Serah Terima Fisik KTP', 'timestamp' => null, 'description' => 'Wajib menunjukkan Surat Keterangan Kepolisian Asli.', 'status' => 'pending', 'statusText' => 'Menunggu'],
            ]
        ]);

        \App\Models\Citizen::create([
            'slug_id' => 'budi_warga',
            'role' => 'warga',
            'name' => 'Budi Santoso Wibowo',
            'nik_masked' => '330801********09',
            'nik_full' => '3308011905020009',
            'reg_number' => 'REG-2026-KTP-99301',
            'resi_number' => 'PENDING-RESI',
            'courier_name' => '-',
            'courier_service' => 'Belum Ditugaskan',
            'courier_vehicle' => '-',
            'courier_phone' => '-',
            'eta_text' => 'Menunggu Verifikasi Petugas Admin',
            'eta_time_window' => 'Estimasi 1-2 Hari Kerja',
            'address' => 'Jl. Pemuda No. 15, Muntilan, Kabupaten Magelang',
            'service_type' => 'PERUBAHAN DATA ALAMAT & STATUS KAWIN',
            'status_badge' => 'Menunggu Verifikasi Admin',
            'status_category' => 'pending',
            'avatar_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
            'courier_avatar' => null,
            'submitted_at' => '20 Sept 2026, 10:45 WIB',
            'documents' => [
                ['name' => 'Buku Nikah / Akta Perkawinan', 'status' => 'Perlu Verifikasi', 'fileUrl' => '#'],
                ['name' => 'Surat Pengantar RT/RW', 'status' => 'Valid', 'fileUrl' => '#']
            ],
            'internal_timeline' => [
                ['id' => 1, 'title' => 'Pengajuan Diterima Web Admin', 'timestamp' => '20 Sept, 10:45', 'description' => 'Dokumen berhasil diunggah oleh warga dan masuk inbox permohonan.', 'completed' => true],
                ['id' => 2, 'title' => 'Pemeriksaan Berkas Petugas', 'timestamp' => 'Menunggu Admin', 'description' => 'Admin Disdukcapil sedang memverifikasi kelengkapan berkas.', 'completed' => false],
                ['id' => 3, 'title' => 'Pencetakan KTP Baru', 'timestamp' => 'Menunggu', 'description' => 'Antrean pencetakan fisik KTP-el.', 'completed' => false],
            ],
            'shipping_timeline' => [
                ['id' => 1, 'title' => 'Persiapan Kurir', 'timestamp' => null, 'description' => 'Menunggu penyelesaian fisik dari ruang cetak.', 'status' => 'pending', 'statusText' => 'Menunggu'],
                ['id' => 2, 'title' => 'Pengantaran Kurir', 'timestamp' => null, 'description' => 'Tujuan: Jl. Pemuda No. 15, Muntilan, Kab. Magelang', 'status' => 'pending', 'statusText' => 'Menunggu'],
                ['id' => 3, 'title' => 'Serah Terima Fisik KTP', 'timestamp' => null, 'description' => 'Wajib tunjukkan KK Asli.', 'status' => 'pending', 'statusText' => 'Menunggu'],
            ]
        ]);
    }
}
