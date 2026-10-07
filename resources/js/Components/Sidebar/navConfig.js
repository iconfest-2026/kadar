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
            title: 'Metabolisme & Biomarker',
            items: [
                { id: 'dashboard', name: 'Dashboard Baseline', href: '/member/dashboard', icon: 'monitoring', badge: 'HBE' },
                { id: 'scanner', name: 'Scanner Gizi & BPOM', href: '/member/scanner', icon: 'photo_camera', badge: 'OCR' },
                { id: 'timeline', name: 'Timeline & Riwayat', href: '/member/timeline', icon: 'history_edu' },
            ],
        },
        {
            title: 'Telemedisin & Tenaga Medis',
            items: [
                { id: 'consultations', name: 'Pusat Tele-Konsultasi', href: '/member/consultations-hub', icon: 'support_agent' },
                { id: 'instructors', name: 'Tim Dokter Pendamping', href: '/member/instructors', icon: 'medical_services' },
                { id: 'ai-consultation', name: 'Chat AI (WhatsApp)', action: 'open_ai_chat', icon: 'chat', badge: 'Online' },
                { id: 'emergency', name: 'Siaga Ambulans GPS', href: '/demo/emergency', icon: 'emergency', badge: '119' },
            ],
        },
        {
            title: 'Program & Komunitas',
            items: [
                { id: 'challenges', name: 'Tantangan Sehat', href: '/member/challenges', icon: 'emoji_events', badge: '14-90 H' },
                { id: 'community', name: 'Forum Komunitas', href: '/member/community', icon: 'groups' },
                { id: 'arcade', name: 'Game Edukasi 2D', href: '/arcade', icon: 'sports_esports' },
                { id: 'gender-vitality', name: 'Siklus & Vitalitas', href: '/demo/gender-vitality', icon: 'vital_signs', badge: 'AI' },
            ],
        },
        {
            title: 'Layanan & Bantuan',
            items: [
                { id: 'home', name: 'Beranda Utama Web', href: '/', icon: 'home', badge: 'Web' },
                { id: 'packages', name: 'Paket Langganan', href: '/paket', icon: 'workspace_premium' },
                { id: 'faq', name: 'Pusat Bantuan & FAQ', href: '/faq', icon: 'help_outline' },
            ],
        },
        {
            title: 'Pengaturan & Akun',
            items: [
                { id: 'onboarding', name: 'Profil & Gaya Hidup', href: '/member/onboarding', icon: 'tune' },
                { id: 'tier', name: 'Kelola Paket Member', action: 'tier_modal', icon: 'badge' },
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
                { id: 'interventions', name: 'Rencana Intervensi', href: '/instructor/interventions', icon: 'clinical_notes', badge: 'HBE' },
                { id: 'consultations', name: 'Jadwal Tele-Konsultasi', href: '/instructor/consultations', icon: 'calendar_month' },
            ],
        },
        {
            title: 'Evaluasi & Laporan',
            items: [
                { id: 'reports', name: 'Laporan Klinis & Kohort', href: '/instructor/reports', icon: 'monitoring', badge: 'Fitur 9' },
            ],
        },
    ];
}

export function getAdminNavSections() {
    return [
        {
            title: 'Tata Kelola Platform',
            items: [
                { id: 'admin', name: 'Tata Kelola & Audit', href: '/admin/dashboard', icon: 'dashboard' },
                { id: 'reports', name: 'Laporan & Ambulans', href: '/admin/reports', icon: 'analytics' },
            ],
        },
    ];
}
