import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Button, Badge, Alert, Avatar, Modal, Select } from '@/Components/UI';

export default function Instructors({
    instructors = { data: [], links: [] },
    assignedInstructors = [],
    assignedInstructorIds = [],
    quota = { current: 0, max: 3, remaining: 3, canAssignMore: true },
    filters = {},
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [specialization, setSpecialization] = useState(filters.specialization || '');
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [actionProcessing, setActionProcessing] = useState(false);

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearch(val);
        router.get('/member/instructors', { search: val, specialization }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleSpecChange = (e) => {
        const val = e.target.value;
        setSpecialization(val);
        router.get('/member/instructors', { search, specialization: val }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const openDetailModal = (inst) => {
        setSelectedInstructor(inst);
        setIsDetailModalOpen(true);
    };

    const handleAssign = (instructor) => {
        setActionProcessing(true);
        router.post(`/member/instructors/${instructor.id}/assign`, {}, {
            preserveScroll: true,
            onFinish: () => {
                setActionProcessing(false);
                setIsDetailModalOpen(false);
            },
        });
    };

    const handleRelease = (instructor) => {
        if (!confirm(`Apakah Anda yakin ingin mengakhiri sesi bimbingan dengan ${instructor.name}? Kuota pendamping Anda akan bertambah 1.`)) {
            return;
        }

        setActionProcessing(true);
        router.post(`/member/instructors/${instructor.id}/release`, {}, {
            preserveScroll: true,
            onFinish: () => {
                setActionProcessing(false);
                setIsDetailModalOpen(false);
            },
        });
    };

    return (
        <AppLayout activeTab="instructors" title="Tim Instruktur Medis">
            <Head title="Tim Dokter & Instruktur Pendamping — AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {/* Header & Quota Status Banner */}
                <div className="bg-gradient-to-r from-primary to-primary-container text-white p-6 sm:p-8 rounded-3xl shadow-md relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="max-w-2xl space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-white/15 text-white border border-white/20">
                                <span className="material-symbols-outlined text-[14px]">medical_services</span>
                                <span>Human-in-the-Loop Clinical Guidance</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight">
                                Tim Dokter & Instruktur Medis Pendamping
                            </h1>
                            <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-normal">
                                Memiliki instruktur bersifat <strong>opsional</strong>. Anda dapat memilih hingga maksimal{' '}
                                <strong>{quota.max} tenaga ahli terverifikasi Kemenkes</strong> (contoh: Spesialis Gizi, Spesialis Kedokteran Olahraga, dan Dietisien) untuk membimbing target preventif Anda.
                            </p>
                        </div>

                        {/* Quota Counter Card */}
                        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 min-w-[240px] text-center space-y-2 shrink-0">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 block">
                                Kuota Pendamping Aktif
                            </span>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="font-heading font-black text-4xl text-white">{quota.current}</span>
                                <span className="font-heading font-bold text-xl text-white/70">/ {quota.max}</span>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-emerald-400 transition-all duration-300 rounded-full"
                                    style={{ width: `${(quota.current / quota.max) * 100}%` }}
                                />
                            </div>

                            <p className="text-[11px] text-white/80 font-medium">
                                {quota.canAssignMore
                                    ? `Tersedia ${quota.remaining} slot tambahan`
                                    : 'Batas maksimal 3 kuota telah tercapai'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* My Active Instructors Section (if any) */}
                {assignedInstructors.length > 0 && (
                    <div className="bg-white rounded-3xl p-6 border border-outline-variant/60 shadow-xs space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[22px]">verified_user</span>
                                <h3 className="font-heading font-bold text-base text-primary">
                                    Tim Pendamping Aktif Saya ({assignedInstructors.length}/{quota.max})
                                </h3>
                            </div>
                            <Badge variant="primary" size="xs">Bimbingan Aktif</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {assignedInstructors.map((inst) => (
                                <div
                                    key={inst.id}
                                    className="p-4 rounded-2xl bg-surface-container-low border border-primary/15 flex flex-col justify-between space-y-3"
                                >
                                    <div className="flex items-start gap-3">
                                        <Avatar name={inst.name} size="md" />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm text-primary truncate">{inst.name}</p>
                                            <p className="text-xs text-on-surface-variant truncate">
                                                {inst.instructor_profile?.specialization || 'Dokter Pendamping'}
                                            </p>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <Badge variant="success" size="xs" dot>
                                                    STR: {inst.instructor_profile?.str_number ? 'Terverifikasi' : 'Resmi'}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-primary/10 flex items-center justify-between gap-2">
                                        <Button
                                            type="button"
                                            size="xs"
                                            variant="outline"
                                            onClick={() => openDetailModal(inst)}
                                        >
                                            Lihat Profil
                                        </Button>
                                        <Button
                                            type="button"
                                            size="xs"
                                            variant="destructive"
                                            onClick={() => handleRelease(inst)}
                                            disabled={actionProcessing}
                                        >
                                            Lepas Sesi
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Filter & Search Bar */}
                <div className="bg-white p-4 rounded-2xl border border-outline-variant/60 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="relative w-full sm:w-80">
                        <input
                            type="text"
                            placeholder="Cari dokter, spesialisasi, atau rumah sakit..."
                            value={search}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-2 text-xs bg-surface-container-low rounded-xl border border-outline-variant/60 focus:outline-none focus:border-primary font-medium"
                        />
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                            search
                        </span>
                    </div>

                    <div className="w-full sm:w-72">
                        <select
                            value={specialization}
                            onChange={handleSpecChange}
                            className="w-full px-3 py-2 text-xs bg-surface-container-low rounded-xl border border-outline-variant/60 focus:outline-none focus:border-primary font-medium cursor-pointer"
                        >
                            <option value="">Semua Spesialisasi Medis</option>
                            <option value="Dokter Spesialis Gizi Klinis (Sp.GK)">Dokter Spesialis Gizi Klinis (Sp.GK)</option>
                            <option value="Dokter Spesialis Kedokteran Olahraga (Sp.KO)">Dokter Spesialis Kedokteran Olahraga (Sp.KO)</option>
                            <option value="Dokter Spesialis Penyakit Dalam (Sp.PD)">Dokter Spesialis Penyakit Dalam (Sp.PD)</option>
                            <option value="Dokter Umum Terverifikasi">Dokter Umum Terverifikasi</option>
                            <option value="Fisioterapis Klinis Berlisensi">Fisioterapis Klinis Berlisensi</option>
                            <option value="Dietisien / Registered Dietitian (RD)">Dietisien / Registered Dietitian (RD)</option>
                            <option value="Psikolog Kesehatan Perilaku">Psikolog Kesehatan Perilaku</option>
                        </select>
                    </div>
                </div>

                {/* Verified Instructors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {instructors.data.map((inst) => {
                        const isAssigned = assignedInstructorIds.includes(inst.id);
                        const isRecommended = inst.instructor_profile?.is_recommended;

                        return (
                            <div
                                key={inst.id}
                                className={`rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between shadow-2xs hover:shadow-md ${
                                    isRecommended
                                        ? 'bg-gradient-to-b from-amber-50/40 via-white to-white border-amber-300/80 ring-1 ring-amber-300/40'
                                        : 'bg-white border-outline-variant/60 hover:border-primary/30'
                                }`}
                            >
                                <div>
                                    {/* Top Badges */}
                                    <div className="flex items-start justify-between gap-2 mb-3">
                                        {isRecommended ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
                                                <span className="material-symbols-outlined text-[13px] text-amber-600">star</span>
                                                Rekomendasi AEVYRA
                                            </span>
                                        ) : (
                                            <Badge variant="success" size="xs" dot>
                                                STR Terverifikasi
                                            </Badge>
                                        )}

                                        {isAssigned && (
                                            <Badge variant="primary" size="xs">
                                                Pendamping Anda
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Doctor Info */}
                                    <div className="flex items-center gap-3.5 mb-3">
                                        <Avatar name={inst.name} size="lg" />
                                        <div>
                                            <h3 className="font-heading font-bold text-base text-primary leading-tight">
                                                {inst.name}
                                            </h3>
                                            <p className="text-xs font-semibold text-on-surface-variant mt-0.5">
                                                {inst.instructor_profile?.specialization || 'Dokter Umum'}
                                            </p>
                                            <p className="text-[11px] text-on-surface-variant/80 flex items-center gap-1 mt-0.5">
                                                <span className="material-symbols-outlined text-[13px] text-primary">apartment</span>
                                                {inst.instructor_profile?.institution || 'Faskes Terdaftar'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bio excerpt */}
                                    <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed mb-4 bg-surface-container-low/50 p-3 rounded-2xl border border-outline-variant/40">
                                        {inst.instructor_profile?.bio ||
                                            'Tenaga ahli berlisensi yang fokus pada optimalisasi gaya hidup sehat, pencegahan penyakit kronis, dan pemantauan baseline metabolik.'}
                                    </p>
                                </div>

                                {/* Footer & Action */}
                                <div className="pt-3 border-t border-outline-variant/40 space-y-3">
                                    <div className="flex items-center justify-between text-xs text-on-surface-variant">
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[15px] text-teal-600">workspace_premium</span>
                                            Pengalaman:
                                        </span>
                                        <span className="font-bold text-primary font-mono">
                                            {inst.instructor_profile?.years_of_experience || 1} Tahun
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="outline"
                                            onClick={() => openDetailModal(inst)}
                                            className="flex-1"
                                        >
                                            Detail Profil
                                        </Button>

                                        {isAssigned ? (
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleRelease(inst)}
                                                disabled={actionProcessing}
                                            >
                                                Lepas
                                            </Button>
                                        ) : (
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant={quota.canAssignMore ? 'primary' : 'outline'}
                                                onClick={() => handleAssign(inst)}
                                                disabled={!quota.canAssignMore || actionProcessing}
                                                leftIcon="person_add"
                                                className="flex-1"
                                            >
                                                {quota.canAssignMore ? 'Pilih Pendamping' : 'Kuota Penuh (3/3)'}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {instructors.data.length === 0 && (
                        <div className="col-span-full py-16 text-center text-on-surface-variant bg-white rounded-3xl border border-outline-variant/60">
                            <span className="material-symbols-outlined text-4xl text-primary/30 mb-2">medical_services</span>
                            <p className="text-sm font-semibold text-on-surface">Tidak ada dokter / instruktur yang cocok.</p>
                            <p className="text-xs text-on-surface-variant mt-1">
                                Coba ubah kata kunci pencarian atau ganti filter spesialisasi.
                            </p>
                        </div>
                    )}
                </div>

                {/* Instructor Profile Modal */}
                {selectedInstructor && (
                    <Modal
                        isOpen={isDetailModalOpen}
                        onClose={() => setIsDetailModalOpen(false)}
                        title="Profil Lengkap Tenaga Medis"
                        subtitle={`Kredensial & rekam jejak bimbingan ${selectedInstructor.name}`}
                        maxWidth="lg"
                    >
                        <div className="space-y-4 text-xs">
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low border border-primary/10">
                                <Avatar name={selectedInstructor.name} size="lg" />
                                <div>
                                    <h4 className="font-bold text-base text-primary">{selectedInstructor.name}</h4>
                                    <p className="text-xs font-semibold text-on-surface-variant">
                                        {selectedInstructor.instructor_profile?.specialization || 'Dokter Umum'}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant="success" size="xs" dot>
                                            STR Resmi: {selectedInstructor.instructor_profile?.str_number || 'Terverifikasi'}
                                        </Badge>
                                        {selectedInstructor.instructor_profile?.is_recommended && (
                                            <Badge variant="warning" size="xs" icon="star">
                                                Rekomendasi
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-white rounded-2xl border border-outline-variant/60">
                                    <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                                        Institusi / Faskes Praktik
                                    </span>
                                    <p className="font-semibold text-xs text-on-surface mt-0.5">
                                        {selectedInstructor.instructor_profile?.institution || 'RS Terdaftar'}
                                    </p>
                                </div>
                                <div className="p-3 bg-white rounded-2xl border border-outline-variant/60">
                                    <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                                        Pengalaman Klinis
                                    </span>
                                    <p className="font-bold text-xs text-primary mt-0.5">
                                        {selectedInstructor.instructor_profile?.years_of_experience || 1} Tahun Praktik
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 bg-surface-container-low rounded-2xl border border-primary/10 space-y-1">
                                <span className="font-bold text-xs text-primary block">
                                    Pendekatan Klinis & Filosofi Pencegahan:
                                </span>
                                <p className="text-on-surface leading-relaxed text-xs">
                                    {selectedInstructor.instructor_profile?.bio ||
                                        'Memberikan bimbingan gaya hidup terstruktur berbasis data fisiologis berkelanjutan.'}
                                </p>
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-primary/10">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsDetailModalOpen(false)}
                                >
                                    Tutup
                                </Button>

                                {assignedInstructorIds.includes(selectedInstructor.id) ? (
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleRelease(selectedInstructor)}
                                        disabled={actionProcessing}
                                    >
                                        Lepas Pendamping
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        variant="primary"
                                        size="sm"
                                        onClick={() => handleAssign(selectedInstructor)}
                                        disabled={!quota.canAssignMore || actionProcessing}
                                        leftIcon="person_add"
                                    >
                                        {quota.canAssignMore ? 'Pilih Sebagai Pendamping' : 'Kuota Penuh (3/3)'}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        </AppLayout>
    );
}

