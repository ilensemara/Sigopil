import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import OfflineBanner from './components/Common/OfflineBanner';

// Pages
import HomePage from './components/Home/HomePage';
import TrackingPage from './components/Tracking/TrackingPage';
import ChatbotPage from './components/Chatbot/ChatbotPage';
import ProfilePage from './components/Profile/ProfilePage';
import LoginPage from './components/Auth/LoginPage';
import AdminDashboard from './components/Admin/AdminDashboard';

// Modals
import ScheduleModal from './components/Modals/ScheduleModal';
import RequirementsModal from './components/Modals/RequirementsModal';
import NikValidationModal from './components/Modals/NikValidationModal';
import MapModal from './components/Modals/MapModal';
import ReportIssueModal from './components/Modals/ReportIssueModal';
import ContactModal from './components/Modals/ContactModal';

import { MOCK_USERS, MOCK_ADMIN } from './data/mockData';
import { ShieldCheck, LogOut, User } from 'lucide-react';
import { fetchCitizensFromBackend } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#admin') return 'admin';
    return localStorage.getItem('dukcapil_active_tab') || 'home';
  });

  const [userRole, setUserRole] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#admin') return 'admin';
    const saved = localStorage.getItem('dukcapil_user_role');
    return saved === 'admin' ? 'admin' : 'warga';
  });

  const [userIndex, setUserIndex] = useState(() => {
    return parseInt(localStorage.getItem('dukcapil_user_index') || '0', 10);
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#admin') return true;
    return localStorage.getItem('dukcapil_is_logged_in') === 'true';
  });

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin') {
        setUserRole('admin');
        setIsLoggedIn(true);
        setActiveTab('admin');
      } else if (['home', 'tracking', 'chatbot', 'profile'].includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Stateful list of applications (so Admin changes update live for Warga)
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem('dukcapil_applications');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : MOCK_USERS;
    } catch (e) {
      return MOCK_USERS;
    }
  });

  // Sync with Laravel backend if server is active (graceful fallback to mock data)
  useEffect(() => {
    fetchCitizensFromBackend().then((backendData) => {
      if (backendData && backendData.length > 0) {
        setApplications(backendData);
      }
    });
  }, []);

  // Stateful admin profile
  const [adminProfile, setAdminProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('dukcapil_admin_profile');
      return saved ? JSON.parse(saved) : MOCK_ADMIN;
    } catch {
      return MOCK_ADMIN;
    }
  });

  const handleUpdateAdminProfile = (updatedFields) => {
    setAdminProfile((prev) => {
      const updated = { ...prev, ...updatedFields };
      try {
        localStorage.setItem('dukcapil_admin_profile', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Stateful list of complaints / kendala pengiriman
  const [complaints, setComplaints] = useState(() => {
    try {
      const saved = localStorage.getItem('dukcapil_complaints');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: "tkt-init-1",
          ticketNumber: "#TKT-DUK-881920",
          applicantName: "Dimas Aditya Pratama",
          nik: "3308051204050080",
          resiNumber: "JNE-9988231201",
          courierName: "Budi Santoso",
          courierService: "JNE Express (Garuda Yaksa)",
          category: "alamat_tidak_ditemukan",
          categoryLabel: "Alamat Rumah Sulit Ditemukan Kurir",
          description: "Patokan rumah pagar hitam di samping pos ronda RT 03/RW 04. Kurir tadi sempat keliru ke gang buntu sebelah.",
          submittedAt: "10 menit yang lalu",
          status: "Menunggu Tindak Lanjut"
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dukcapil_complaints', JSON.stringify(complaints));
    } catch {}
  }, [complaints]);

  const handleAddComplaint = (newComplaint) => {
    setComplaints(prev => [newComplaint, ...prev]);
  };

  const handleUpdateComplaintStatus = (ticketId, newStatus) => {
    setComplaints(prev => prev.map(c => c.id === ticketId ? { ...c, status: newStatus } : c));
  };

  useEffect(() => {
    try {
      localStorage.setItem('dukcapil_applications', JSON.stringify(applications));
    } catch (e) {}
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('dukcapil_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('dukcapil_user_role', userRole);
  }, [userRole]);

  // Modals state
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showRequirementsModal, setShowRequirementsModal] = useState(false);
  const [showNikValidationModal, setShowNikValidationModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showReportIssueModal, setShowReportIssueModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // PWA install prompt event
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted PWA installation');
        }
        setDeferredPrompt(null);
      });
    } else {
      alert('PWA Siap Di-install! Silakan tambahkan aplikasi ke layar utama melalui menu browser (Add to Home Screen).');
    }
  };

  // Handler for login success (target can be 'admin' or user index number)
  const handleLoginSuccess = (targetRoleOrIdx) => {
    localStorage.setItem('dukcapil_is_logged_in', 'true');
    if (targetRoleOrIdx === 'admin') {
      setUserRole('admin');
      setIsLoggedIn(true);
      setActiveTab('admin');
      window.location.hash = 'admin';
    } else {
      const idx = typeof targetRoleOrIdx === 'number' ? targetRoleOrIdx : 0;
      setUserRole('warga');
      setUserIndex(idx);
      localStorage.setItem('dukcapil_user_index', idx.toString());
      setIsLoggedIn(true);
      setActiveTab('home');
      window.location.hash = '';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('dukcapil_is_logged_in');
    setIsLoggedIn(false);
    window.location.hash = '';
  };

  // Handler for Admin updating application status
  const handleUpdateApplicationStatus = (appId, updatedFields) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, ...updatedFields } : app))
    );
  };

  const currentUser = userRole === 'admin' 
    ? MOCK_ADMIN 
    : (applications[userIndex] || applications[0] || MOCK_USERS[0]);

  // IF NOT LOGGED IN -> RENDER LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] text-slate-900 flex flex-col justify-between selection:bg-[#1B365D] selection:text-[#FDFBF7]">
        <OfflineBanner />
        <Header 
          activeTab="login"
          setActiveTab={() => {}}
          onOpenNotifications={() => {}}
          user={null}
          isLoggedIn={false}
        />
        <main className="flex-1 overflow-y-auto">
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        </main>
      </div>
    );
  }

  // IF LOGGED IN AS ADMIN -> RENDER ADMIN DASHBOARD VIEW
  if (userRole === 'admin') {
    return (
      <div className="min-h-screen bg-[#FDFBF7] text-slate-900 flex flex-col selection:bg-[#1B365D] selection:text-[#FDFBF7]">
        <OfflineBanner />
        
        {/* Top Admin Header Bar - Warm Navy Theme */}
        <header className="sticky top-0 z-30 bg-[#1B365D]/95 text-[#FDFBF7] backdrop-blur-md border-b border-[#1E293B]/15 px-4 sm:px-6 py-3 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FDFBF7] p-1.5 shadow-md flex items-center justify-center border border-[#FDFBF7]/40">
                <img 
                  src="/logo-dukcapil.png" 
                  alt="Logo Kabupaten Magelang" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-extrabold text-[#FDFBF7] tracking-tight">Sigopil Admin</h1>
                  <span className="text-[10px] bg-[#FDFBF7]/20 text-[#FDFBF7] px-2 py-0.5 rounded-full font-mono border border-[#FDFBF7]/30 font-bold uppercase">
                    PORTAL OPERATOR DISDUKCAPIL
                  </span>
                </div>
                <p className="text-xs text-slate-200/80 font-medium">Disdukcapil Kabupaten Magelang</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-800/80 hover:bg-red-900 text-xs font-bold text-red-100 border border-red-700/60 shadow transition active:scale-95"
              >
                <LogOut className="w-4 h-4" /> Keluar
              </button>
            </div>
          </div>
        </header>

        {/* Main Admin Body */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
          <AdminDashboard 
            adminUser={adminProfile}
            applications={applications}
            complaints={complaints}
            onUpdateComplaintStatus={handleUpdateComplaintStatus}
            onUpdateStatus={handleUpdateApplicationStatus}
            onUpdateAdminProfile={handleUpdateAdminProfile}
            onSwitchToWargaView={() => {
              localStorage.setItem('dukcapil_user_role', 'warga');
              setUserRole('warga');
              setActiveTab('home');
            }}
          />
        </main>
      </div>
    );
  }

  // IF LOGGED IN AS WARGA / MASYARAKAT -> RENDER WARGA PORTAL VIEW
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 flex flex-col justify-between selection:bg-[#1B365D] selection:text-[#FDFBF7]">
      <OfflineBanner />
      
      {/* Header Bar */}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNotifications={() => {}}
        user={currentUser}
        isLoggedIn={true}
      />

      {/* Dynamic Main View */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'home' && (
          <HomePage 
            onNavigate={setActiveTab}
            onOpenSchedule={() => setShowScheduleModal(true)}
            onOpenRequirements={() => setShowRequirementsModal(true)}
            onOpenNikValidation={() => setShowNikValidationModal(true)}
            onOpenContact={() => setShowContactModal(true)}
            user={currentUser}
          />
        )}

        {activeTab === 'tracking' && (
          <TrackingPage 
            onOpenReportIssue={() => setShowReportIssueModal(true)}
            onOpenMap={() => setShowMapModal(true)}
            user={currentUser}
          />
        )}

        {activeTab === 'chatbot' && (
          <ChatbotPage 
            onOpenMap={() => setShowMapModal(true)}
            onOpenRequirements={() => setShowRequirementsModal(true)}
            user={currentUser}
          />
        )}

        {activeTab === 'profile' && (
          <ProfilePage 
            deferredPrompt={deferredPrompt}
            onInstallPWA={handleInstallPWA}
            onLogout={handleLogout}
            user={currentUser}
          />
        )}
      </main>

      {/* Bottom Navigation Bar (Visible on mobile viewports < 768px) */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Global Modals */}
      <ScheduleModal 
        isOpen={showScheduleModal} 
        onClose={() => setShowScheduleModal(false)} 
      />

      <RequirementsModal 
        isOpen={showRequirementsModal} 
        onClose={() => setShowRequirementsModal(false)} 
      />

      <NikValidationModal 
        isOpen={showNikValidationModal} 
        onClose={() => setShowNikValidationModal(false)} 
      />

      <MapModal 
        isOpen={showMapModal} 
        onClose={() => setShowMapModal(false)} 
      />

      <ReportIssueModal 
        isOpen={showReportIssueModal} 
        onClose={() => setShowReportIssueModal(false)}
        user={currentUser}
        onSubmitReport={handleAddComplaint}
      />

      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </div>
  );
}
