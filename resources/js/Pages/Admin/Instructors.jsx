import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminFilterBar from '@/Components/Admin/AdminFilterBar';
import AdminDataTable from '@/Components/Admin/AdminDataTable';
import AdminBadge from '@/Components/Admin/AdminBadge';
import { Button, Modal, Textarea, Avatar, Badge } from '@/Components/UI';

export default function Instructors({ instructors = { data: [], links: [] }, stats = {}, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

    const { data: rejectData, setData: setRejectData, post: postReject, processing: rejectProcessing, reset: resetReject } = useForm({
        reason: '',
    });

    const handleSearch = (newSearch) => {
        setSearch(newSearch);
        router.get('/admin/instructors', { search: newSearch, status }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleStatusFilter = (newStatus) => {
        setStatus(newStatus);
        router.get('/admin/instructors', { search, status: newStatus }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const openDetailModal = (inst) => {
        setSelectedInstructor(inst);
        setIsDetailModalOpen(true);
    };

    const approveInstructor = (instructor) => {
        router.post(`/admin/instructors/${instructor.id}/approve`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                setIsDetailModalOpen(false);
            },
        });
    };

    const openRejectModal = (instructor) => {
        setSelectedInstructor(instructor);
        resetReject();
        setIsRejectModalOpen(true);
    };

    const handleRejectSubmit = (e) => {
        e.preventDefault();
        if (!selectedInstructor) return;

        postReject(`/admin/instructors/${selectedInstructor.id}/reject`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsRejectModalOpen(false);
                setIsDetailModalOpen(false);
                resetReject();
            },
        });
    };

    const toggleRecommendation = (instructor) => {
        router.post(`/admin/instructors/${instructor.id}/recommend`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                if (selectedInstructor?.id === instructor.id) {
                    setSelectedInstructor((prev) => ({
                        ...prev,
                        instructor_profile: {
                            ...prev.instructor_profile,
                            is_recommended: !prev.instructor_profile?.is_recommended,
                        },
                    }));
                }
            },
        });
    };

    const toggleStatus = (instructor) => {
        router.post(`/admin/users/${instructor.id}/toggle-status`, {}, {
            preserveScroll: true,
        });
    };

    const columns = [
        {
            key: 'name',
            label: 'Identitas Instruktur',
            render: (row) => (
                <div className="flex items-center gap-3">
                    <Avatar name={row.name} size="md" />
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-bold text-on-surface text-sm">{row.name}</p>
                            {row.instructor_profile?.is_recommended && (
                                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
                                    <span className="material-symbols-outlined text-[12px] text-amber-600">star</span>
                                    Rekomendasi
                                </span>
                            )}
                        </div>
                        <p className="text-on-surface-variant font-label-mono text-[11px] mt-0.5">{row.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'specialty',
            label: 'Spesialisasi & Faskes',
            render: (row) => (
                <div>
                    <p className="font-semibold text-xs text-primary">
                        {row.instructor_profile?.specialization || 'Dokter Umum'}
                    </p>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                        {row.instructor_profile?.institution || 'Klinik Terdaftar'}
                    </p>
                </div>
            ),
        },
        {
            key: 'str',
            label: 'Legalitas (STR / SIP)',
            render: (row) => (
                <div className="font-mono text-xs">
                    <span className="text-on-surface font-medium block">
                        STR: {row.instructor_profile?.str_number || 'Belum diisi'}
                    </span>
                    {row.instructor_profile?.sip_number && (
                        <span className="text-on-surface-variant text-[11px] block mt-0.5">
                            SIP: {row.instructor_profile.sip_number}
                        </span>
                    )}
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Status Verifikasi',
            render: (row) => {
                const isVerified = row.instructor_profile?.is_verified;
                const status = row.status;

                if (status === 'PENDING_VERIFICATION') {
                    return (
                        <Badge variant="warning" dot pulse>
                            MENUNGGU VERIFIKASI
                        </Badge>
                    );
                }
                if (status === 'REJECTED') {
                    return (
                        <Badge variant="destructive" dot>
                            VERIFIKASI DITOLAK
                        </Badge>
                    );
                }
                if (status === 'SUSPENDED') {
                    return (
                        <Badge variant="destructive">
                            DIBEKUKAN
                        </Badge>
                    );
                }
                if (isVerified && status === 'ACTIVE') {
                    return (
                        <Badge variant="success" dot icon="verified">
                            TERVERIFIKASI RESMI
                        </Badge>
                    );
                }
                return (
                    <Badge variant="neutral">
                        {status}
                    </Badge>
                );
            },
        },
        {
            key: 'caseload',
            label: 'Beban Binaan',
            render: (row) => (
                <div className="text-xs">
                    <span className="font-bold text-primary block">
                        {row.assigned_members_count || 0} Member Aktif
                    </span>
                    <span className="text-[11px] text-on-surface-variant block mt-0.5">
                        {row.active_interventions_count || 0} Intervensi
                    </span>
                </div>
            ),
        },
        {
            key: 'actions',
            label: 'Tindakan & Audit',
            align: 'right',
            render: (row) => {
                return (
                    <div className="flex items-center justify-end gap-1.5">
                        <Button
                            type="button"
                            size="xs"
                            variant="outline"
                            leftIcon="visibility"
                            onClick={() => openDetailModal(row)}
                        >
                            Detail
                        </Button>

                        {row.status === 'PENDING_VERIFICATION' && (
                            <Button
                                type="button"
                                size="xs"
                                variant="success"
                                leftIcon="verified"
                                onClick={() => approveInstructor(row)}
                            >
                                Sahkan
                            </Button>
                        )}

                        {row.status === 'ACTIVE' && (
                            <Button
                                type="button"
                                size="xs"
                                variant={row.instructor_profile?.is_recommended ? 'secondary' : 'ghost'}
                                leftIcon="star"
                                onClick={() => toggleRecommendation(row)}
                                title="Atur Rekomendasi Unggulan"
                            >
                                {row.instructor_profile?.is_recommended ? 'Batal Rekomendasi' : 'Rekomendasikan'}
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];

    return (
        <AdminLayout activeNav="instructors" title="Verifikasi Instruktur">
            <Head title="Verifikasi & Kredensial Instruktur — AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Verifikasi & Kredensial Medis Instruktur"
                    subtitle="Validasi keabsahan nomor STR, SIP, institusi faskes praktik, serta atur rekomendasi instruktur unggulan untuk para member."
                    icon="verified_user"
                    badge={<AdminBadge variant="active">Human-In-The-Loop</AdminBadge>}
                />

                {/* Stat Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <AdminStatCard
                        title="Total Instruktur"
                        value={stats.totalInstructors || 0}
                        icon="medical_services"
                        trend="Tenaga Ahli Terdaftar"
                        color="teal"
                    />
                    <AdminStatCard
                        title="Menunggu Verifikasi STR"
                        value={stats.pendingCount || 0}
                        icon="pending_actions"
                        trend="Perlu Ditinjau Admin"
                        color="amber"
                    />
                    <AdminStatCard
                        title="Terverifikasi & Aktif"
                        value={stats.verifiedActiveCount || 0}
                        icon="verified"
                        trend="Siap Menerima Member"
                        color="emerald"
                    />
                    <AdminStatCard
                        title="Rekomendasi Unggulan"
                        value={stats.recommendedCount || 0}
                        icon="star"
                        trend="Prioritas Direktori Member"
                        color="indigo"
                    />
                </div>

                <AdminFilterBar
                    searchPlaceholder="Cari nama, email, nomor STR, atau spesialisasi..."
                    searchValue={search}
                    onSearchChange={handleSearch}
                    filters={[
                        {
                            value: status,
                            onChange: handleStatusFilter,
                            options: [
                                { label: 'Semua Status Verifikasi', value: '' },
                                { label: 'Menunggu Verifikasi (Pending)', value: 'PENDING_VERIFICATION' },
                                { label: 'Terverifikasi Resmi (Aktif)', value: 'ACTIVE' },
                                { label: 'Verifikasi Ditolak', value: 'REJECTED' },
                                { label: 'Akun Dibekukan (Suspended)', value: 'SUSPENDED' },
                            ],
                        },
                    ]}
                    activeCount={(search ? 1 : 0) + (status ? 1 : 0)}
                    onReset={() => {
                        setSearch('');
                        setStatus('');
                        router.get('/admin/instructors');
                    }}
                />

                <AdminDataTable
                    columns={columns}
                    data={instructors}
                    emptyMessage="Belum ada instruktur yang terdaftar sesuai kriteria pencarian."
                    emptyIcon="school"
                />

                {/* Detail & Verification Modal */}
                {selectedInstructor && (
                    <Modal
                        isOpen={isDetailModalOpen}
                        onClose={() => setIsDetailModalOpen(false)}
                        title="Verifikasi Kredensial Medis Instruktur"
                        subtitle={`Pemeriksaan berkas legalitas dan kompetensi untuk ${selectedInstructor.name}`}
                        maxWidth="2xl"
                    >
                        <div className="space-y-5 text-xs">
                            {/* Identity Header */}
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low border border-primary/10">
                                <Avatar name={selectedInstructor.name} size="lg" />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-base text-primary">{selectedInstructor.name}</h4>
                                        {selectedInstructor.instructor_profile?.is_recommended && (
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                                                Rekomendasi Unggulan
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-on-surface-variant font-mono">{selectedInstructor.email}</p>
                                    <div className="flex items-center gap-2 mt-1.5">
                                        <Badge
                                            variant={
                                                selectedInstructor.status === 'ACTIVE'
                                                    ? 'success'
                                                    : selectedInstructor.status === 'PENDING_VERIFICATION'
                                                    ? 'warning'
                                                    : 'destructive'
                                            }
                                        >
                                            Status Akun: {selectedInstructor.status}
                                        </Badge>
                                        <span className="text-[11px] text-on-surface-variant font-medium">
                                            Pengalaman: {selectedInstructor.instructor_profile?.years_of_experience || 0} Tahun
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Medical Credential Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div className="p-3.5 rounded-2xl bg-white border border-primary/15 shadow-2xs space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                                        Spesialisasi Klinis
                                    </span>
                                    <p className="font-bold text-sm text-primary">
                                        {selectedInstructor.instructor_profile?.specialization || 'Dokter Umum'}
                                    </p>
                                </div>

                                <div className="p-3.5 rounded-2xl bg-white border border-primary/15 shadow-2xs space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                                        Institusi / Fasilitas Kesehatan
                                    </span>
                                    <p className="font-semibold text-sm text-on-surface">
                                        {selectedInstructor.instructor_profile?.institution || 'Belum dicantumkan'}
                                    </p>
                                </div>

                                <div className="p-3.5 rounded-2xl bg-white border border-primary/15 shadow-2xs space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                                        Nomor STR (Surat Tanda Registrasi)
                                    </span>
                                    <p className="font-mono font-bold text-sm text-emerald-800">
                                        {selectedInstructor.instructor_profile?.str_number || 'Tidak Ada'}
                                    </p>
                                </div>

                                <div className="p-3.5 rounded-2xl bg-white border border-primary/15 shadow-2xs space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                                        Nomor SIP (Surat Izin Praktik)
                                    </span>
                                    <p className="font-mono font-bold text-sm text-teal-800">
                                        {selectedInstructor.instructor_profile?.sip_number || 'Tidak Ada'}
                                    </p>
                                </div>
                            </div>

                            {/* Bio & Clinical Approach */}
                            {selectedInstructor.instructor_profile?.bio && (
                                <div className="p-4 rounded-2xl bg-surface-container-low border border-primary/10 space-y-1">
                                    <span className="font-bold text-xs text-primary block">
                                        Pendekatan Klinis & Profil Profesional:
                                    </span>
                                    <p className="text-on-surface leading-relaxed text-xs">
                                        {selectedInstructor.instructor_profile.bio}
                                    </p>
                                </div>
                            )}

                            {/* Proof Document Download / View */}
                            <div className="p-4 rounded-2xl bg-white border border-primary/15 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[22px]">description</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-xs text-on-surface">Dokumen Bukti STR / SIP / Ijazah</p>
                                        <p className="text-[11px] text-on-surface-variant">
                                            {selectedInstructor.instructor_profile?.document_proof_path
                                                ? 'Berkas verifikasi terlampir'
                                                : 'Tidak ada berkas fisik yang diunggah'}
                                        </p>
                                    </div>
                                </div>

                                {selectedInstructor.instructor_profile?.document_proof_path ? (
                                    <a
                                        href={`/storage/${selectedInstructor.instructor_profile.document_proof_path}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-all"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                                        <span>Buka Dokumen</span>
                                    </a>
                                ) : (
                                    <span className="text-xs text-on-surface-variant italic">N/A</span>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-primary/10">
                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant={selectedInstructor.instructor_profile?.is_recommended ? 'secondary' : 'outline'}
                                        leftIcon="star"
                                        onClick={() => toggleRecommendation(selectedInstructor)}
                                    >
                                        {selectedInstructor.instructor_profile?.is_recommended
                                            ? 'Hapus Rekomendasi'
                                            : 'Rekomendasikan ke Member'}
                                    </Button>

                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        onClick={() => toggleStatus(selectedInstructor)}
                                    >
                                        {selectedInstructor.status === 'ACTIVE' ? 'Bekukan Akun' : 'Aktifkan Akun'}
                                    </Button>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="destructive"
                                        leftIcon="close"
                                        onClick={() => openRejectModal(selectedInstructor)}
                                    >
                                        Tolak Verifikasi
                                    </Button>

                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="success"
                                        leftIcon="verified"
                                        onClick={() => approveInstructor(selectedInstructor)}
                                    >
                                        Sahkan & Verifikasi
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                )}

                {/* Reject Reason Modal */}
                {selectedInstructor && (
                    <Modal
                        isOpen={isRejectModalOpen}
                        onClose={() => setIsRejectModalOpen(false)}
                        title="Tolak Verifikasi Instruktur"
                        subtitle={`Berikan catatan penolakan untuk ${selectedInstructor.name} agar dapat memperbaiki berkas.`}
                        maxWidth="md"
                    >
                        <form onSubmit={handleRejectSubmit} className="space-y-4 text-xs">
                            <Textarea
                                label="Alasan / Catatan Penolakan Medis"
                                required
                                rows={4}
                                value={rejectData.reason}
                                onChange={(e) => setRejectData('reason', e.target.value)}
                                placeholder="Contoh: Nomor STR tidak terdaftar di Konsil Kedokteran Indonesia (KKI) atau berkas dokumen yang diunggah buram / tidak terbaca..."
                                error={rejectData.errors?.reason}
                            />

                            <div className="flex justify-end gap-2 pt-3 border-t border-primary/10">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsRejectModalOpen(false)}
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    variant="destructive"
                                    size="sm"
                                    loading={rejectProcessing}
                                    leftIcon="gpp_bad"
                                >
                                    Kirim Penolakan
                                </Button>
                            </div>
                        </form>
                    </Modal>
                )}
            </div>
        </AdminLayout>
    );
}
