/**
 * Sidebar Navigation Configuration
 * 
 * Separates navigation data structures from layout logic.
 * Any addition or update to sidebar menu items can be done here
 * without modifying AppLayout or other layout components.
 */

export function getMemberNavSections() {
    return [
        {
            title: 'Menu Utama',
            items: [
                { id: 'dashboard', name: 'Dashboard', href: '/member/dashboard', icon: 'space_dashboard' },
                { id: 'tracker', name: 'Tracker & Baseline', href: '/member/tracker', icon: 'monitoring' },
                { id: 'vitality', name: 'Kesehatan Spesifik Gender', href: '/member/vitality', icon: 'vital_signs' },
                { id: 'scanner', name: 'Scanner Gizi (AI)', href: '/member/scanner', icon: 'photo_camera' },
                { id: 'timeline', name: 'Riwayat & Timeline', href: '/member/timeline', icon: 'history_edu' },
                { id: 'consultations', name: 'Konsultasi Dokter', href: '/member/consultations-hub', icon: 'support_agent' },
            ],
        },
        {
            title: 'Aktivitas & Komunitas',
            items: [
                { id: 'challenges', name: 'Tantangan Sehat', href: '/member/challenges', icon: 'emoji_events' },
                { id: 'community', name: 'Forum Komunitas', href: '/member/community', icon: 'groups' },
                { id: 'ai-consultation', name: 'Chat AI Asisten', action: 'open_ai_chat', icon: 'smart_toy', badge: 'AI' },
            ],
        },
        {
            title: 'Layanan & Darurat',
            items: [
                { id: 'emergency', name: 'Tanggap Darurat 119', href: '/member/emergency', icon: 'emergency', badge: 'SOS', badgeColor: 'bg-rose-600 text-white', iconColor: 'text-rose-600' },
                { id: 'menu', name: 'Menu & Akun', href: '/member/menu', icon: 'grid_view' },
                { id: 'faq', name: 'Pusat Bantuan & FAQ', href: '/faq', icon: 'help_outline' },
            ],
        },
    ];
}

export function getInstructorNavSections() {
    return [
        {
            title: 'Pengawasan Caseload & Sinyal',
            items: [
                { id: 'dashboard', name: 'Dashboard Caseload', href: '/instructor/dashboard', icon: 'dashboard' },
                { id: 'members', name: 'Member Binaan', href: '/instructor/members', icon: 'groups', badge: 'Kohor' },
            ],
        },
        {
            title: 'Tindakan Klinis & Intervensi',
            items: [
                { id: 'chat', name: 'Ruang Chat Pasien', href: '/instructor/chat', icon: 'forum', badge: 'Live' },
                { id: 'interventions', name: 'Rencana Intervensi', href: '/instructor/interventions', icon: 'clinical_notes', badge: 'HBE' },
                { id: 'consultations', name: 'Jadwal Tele-Konsultasi', href: '/instructor/consultations', icon: 'calendar_month' },
            ],
        },
        {
            title: 'Evaluasi & Layanan',
            items: [
                { id: 'reports', name: 'Laporan Klinis & Kohort', href: '/instructor/reports', icon: 'monitoring', badge: 'Fitur 9' },
                { id: 'emergency', name: 'Tanggap Darurat 119', href: '/demo/emergency', icon: 'emergency', badge: 'SOS', badgeColor: 'bg-rose-600 text-white', iconColor: 'text-rose-600' },
            ],
        },
    ];
}

export function getAdminNavSections() {
    return [
        {
            title: 'Manajemen & Pengguna',
            items: [
                { id: 'dashboard', name: 'Panel Ringkasan', href: '/admin/dashboard', icon: 'dashboard' },
                { id: 'users', name: 'Kelola Pengguna', href: '/admin/users', icon: 'group' },
                { id: 'instructors', name: 'Verifikasi Instruktur', href: '/admin/instructors', icon: 'verified_user' },
            ],
        },
        {
            title: 'Layanan Medis & AI',
            items: [
                { id: 'scanner', name: 'Scanner Kamera OCR', href: '/admin/scanner', icon: 'document_scanner' },
                { id: 'consultations', name: 'Konsultasi & Booking', href: '/admin/consultations', icon: 'forum' },
                { id: 'health-tracker', name: 'Tracker & Rekam Medis', href: '/admin/health-tracker', icon: 'vital_signs' },
                { id: 'recommendations', name: 'Rekomendasi & HBE', href: '/admin/recommendations', icon: 'psychology' },
            ],
        },
        {
            title: 'Program & Komunitas',
            items: [
                { id: 'programs', name: 'Program Kohor', href: '/admin/programs', icon: 'inventory_2' },
                { id: 'challenges', name: 'Challenge Komunitas', href: '/admin/challenges', icon: 'emoji_events' },
                { id: 'community', name: 'Forum & Diskusi', href: '/admin/community', icon: 'groups' },
                { id: 'gamification', name: 'Badge & Gamifikasi', href: '/admin/gamification', icon: 'military_tech' },
            ],
        },
        {
            title: 'Monetisasi & Tata Kelola',
            items: [
                { id: 'subscriptions', name: 'Langganan SaaS & Member', href: '/admin/subscriptions', icon: 'card_membership' },
                { id: 'memberships', name: 'Tier Membership', href: '/admin/memberships', icon: 'workspace_premium' },
                { id: 'emergency', name: 'Tanggap Darurat 119', href: '/admin/emergency', icon: 'emergency' },
                { id: 'reports', name: 'Laporan & Analitik', href: '/admin/reports', icon: 'analytics' },
                { id: 'audit', name: 'Audit Trail Forensik', href: '/admin/audit', icon: 'shield' },
                { id: 'settings', name: 'Konfigurasi Sistem', href: '/admin/settings', icon: 'tune' },
                { id: 'logs', name: 'Log Error Server', href: '/admin/logs', icon: 'terminal' },
            ],
        },
    ];
}
