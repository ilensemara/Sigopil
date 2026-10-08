<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Citizen;
use App\Models\Report;

class SigopilController extends Controller
{
    /**
     * Get list of all citizens / applications (for admin & selection)
     */
    public function getCitizens()
    {
        $citizens = Citizen::all();
        return response()->json([
            'success' => true,
            'data' => $citizens
        ]);
    }

    /**
     * Get tracking status by NIK or Registration / Resi Number
     */
    public function getTracking($identifier)
    {
        $cleanId = trim($identifier);

        $citizen = Citizen::where('nik_full', $cleanId)
            ->orWhere('slug_id', $cleanId)
            ->orWhere('reg_number', $cleanId)
            ->orWhere('resi_number', $cleanId)
            ->first();

        if (!$citizen) {
            return response()->json([
                'success' => false,
                'message' => 'Data permohonan atau NIK tidak ditemukan dalam sistem.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $citizen
        ]);
    }

    /**
     * Authenticate citizen or admin
     */
    public function login(Request $request)
    {
        $nik = $request->input('nik');
        $nip = $request->input('nip');
        $role = $request->input('role', 'warga');

        if ($role === 'admin' || $nip) {
            return response()->json([
                'success' => true,
                'role' => 'admin',
                'user' => [
                    'id' => 'admin-1',
                    'nik' => '3308011204850001',
                    'nip' => $nip ?: '19850412 201001 1 003',
                    'name' => 'Drs. Hendra Setiawan, M.Si',
                    'role' => 'admin',
                    'roleLabel' => 'Operator Verifikasi Disdukcapil',
                    'department' => 'Seksi Identitas Kependudukan Kab. Magelang',
                    'phone' => '08112345678',
                    'avatarUrl' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
                ]
            ]);
        }

        $citizen = Citizen::where('nik_full', $nik)->first();
        if ($citizen) {
            return response()->json([
                'success' => true,
                'role' => 'warga',
                'user' => $citizen
            ]);
        }

        // Fallback for default or test NIK
        $defaultCitizen = Citizen::first();
        return response()->json([
            'success' => true,
            'role' => 'warga',
            'user' => $defaultCitizen ?: [
                'id' => 'default',
                'name' => 'Warga Pemohon',
                'nikFull' => $nik ?: '3173051204050080',
                'role' => 'warga'
            ]
        ]);
    }

    /**
     * Store complaint or problem report from citizen
     */
    public function submitReport(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string',
            'category' => 'nullable|string',
            'reporter_name' => 'nullable|string',
            'reporter_phone' => 'nullable|string',
            'nik' => 'nullable|string',
        ]);

        $report = Report::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Laporan pengaduan berhasil dicatat oleh sistem Sigopil.',
            'data' => $report
        ], 201);
    }
}
