const API_BASE_URL = 'http://127.0.0.1:8000/api';

/**
 * Format data from Laravel (snake_case) to Frontend (camelCase)
 */
export function formatCitizenFromApi(item) {
  if (!item) return null;
  return {
    id: item.slug_id || item.id,
    role: item.role || 'warga',
    name: item.name,
    nikMasked: item.nik_masked || item.nikMasked,
    nikFull: item.nik_full || item.nikFull,
    regNumber: item.reg_number || item.regNumber,
    resiNumber: item.resi_number || item.resiNumber,
    courierName: item.courier_name || item.courierName,
    courierService: item.courier_service || item.courierService,
    courierVehicle: item.courier_vehicle || item.courierVehicle,
    courierPhone: item.courier_phone || item.courierPhone,
    etaText: item.eta_text || item.etaText,
    etaTimeWindow: item.eta_time_window || item.etaTimeWindow,
    address: item.address,
    serviceType: item.service_type || item.serviceType,
    statusBadge: item.status_badge || item.statusBadge,
    statusCategory: item.status_category || item.statusCategory,
    avatarUrl: item.avatar_url || item.avatarUrl,
    courierAvatar: item.courier_avatar || item.courierAvatar,
    submittedAt: item.submitted_at || item.submittedAt,
    documents: item.documents || [],
    internalTimeline: item.internal_timeline || item.internalTimeline || [],
    shippingTimeline: item.shipping_timeline || item.shippingTimeline || [],
  };
}

/**
 * Fetch citizens from Laravel backend with silent fallback
 */
export async function fetchCitizensFromBackend() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 detik timeout agar tidak lambat saat backend off

    const response = await fetch(`${API_BASE_URL}/citizens`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) return null;
    const json = await response.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data.map(formatCitizenFromApi);
    }
    return null;
  } catch (e) {
    // Backend sedang tidak berjalan atau belum dinyalakan, fallback aman ke mockData
    return null;
  }
}

/**
 * Submit complaint to Laravel backend
 */
export async function submitReportToBackend(reportData) {
  try {
    const response = await fetch(`${API_BASE_URL}/reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportData),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (e) {
    return null;
  }
}
