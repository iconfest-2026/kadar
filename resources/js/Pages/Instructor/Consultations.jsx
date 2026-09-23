import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import InstructorLayout from '@/Layouts/InstructorLayout';

export default function Consultations({ consultations = { data: [], links: [] } }) {
    const [selectedConsultation, setSelectedConsultation] = useState(null);

    const { data, setData, patch, processing, reset } = useForm({
        notes: '',
    });

    const openCompleteModal = (cons) => {
        setSelectedConsultation(cons);
        setData('notes', cons.notes || '');
    };

    const handleCompleteSubmit = (e) => {
        e.preventDefault();
        patch(`/instructor/consultations/${selectedConsultation.id}/complete`, {
            onSuccess: () => {
                setSelectedConsultation(null);
                reset();
            }
        });
    };

    return (
        <InstructorLayout activeNav="consultations" title="Jadwal Konsultasi & Bimbingan 1-on-1">
            <Head title="Jadwal Konsultasi — Instruktur Kadar" />
            <Head title="Jadwal Konsultasi — Instruktur AEVYRA" />

            <div className="space-y-6">
                {/* Header Card */}
                <div className="bg-white/75 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-xs border border-primary/10 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary text-[22px]">calendar_month</span>
                            <h2 className="text-xl font-heading font-bold text-primary">Agenda Bimbingan Tatap Muka</h2>
                        </div>
                        <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                            Kelola jadwal video call sinkron, evaluasi mingguan, dan pencatatan ringkasan klinis bimbingan
                        </p>
                    </div>

                    <span className="px-3 py-1.5 rounded-full bg-secondary-fixed/40 text-secondary-container border border-secondary/20 text-xs font-label-mono font-bold self-start md:self-auto">
                        Maksimal 6 Sesi / Hari
                    </span>
                </div>

                {/* Consultations Table Card */}
                <div className="bg-white/75 backdrop-blur-md rounded-3xl shadow-xs border border-primary/10 overflow-hidden hover:border-primary/20 transition-all">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-primary/[0.03] text-on-surface-variant font-semibold border-b border-primary/10">
                                <tr>
                                    <th className="py-4 px-6">Member Binaan</th>
                                    <th className="py-4 px-6">Tujuan Konsultasi</th>
                                    <th className="py-4 px-6">Waktu Pelaksanaan</th>
                                    <th className="py-4 px-6">Status Sesi</th>
                                    <th className="py-4 px-6 text-right">Tindakan Sesi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-primary/5">
                                {consultations.data.map(cons => {
                                    const isCompleted = cons.status === 'COMPLETED';
                                    const isScheduled = cons.status === 'SCHEDULED' || cons.status === 'CONFIRMED';

                                    return (
                                        <tr key={cons.id} className="hover:bg-primary/[0.02] transition-colors">
                                            {/* Member */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary font-heading font-black flex items-center justify-center text-sm shadow-xs">
                                                        {cons.member?.name?.charAt(0) || 'M'}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-on-surface text-sm">{cons.member?.name || 'Member Terbina'}</div>
                                                        <div className="text-on-surface-variant font-label-mono text-[11px] mt-0.5">{cons.member?.email || '-'}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Purpose */}
                                            <td className="py-4 px-6 font-medium text-on-surface max-w-xs">
                                                <div className="font-semibold text-primary">{cons.purpose || 'Evaluasi Pola Makan Mingguan'}</div>
                                                {cons.notes && (
                                                    <div className="text-on-surface-variant text-[11px] italic mt-0.5 line-clamp-1">
                                                        Catatan: {cons.notes}
                                                    </div>
                                                )}
                                            </td>

                                            {/* Time */}
                                            <td className="py-4 px-6 font-label-mono text-on-surface-variant">
                                                <div>
                                                    {cons.scheduled_start ? new Date(cons.scheduled_start).toLocaleDateString('id-ID', {
                                                        weekday: 'short',
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    }) : 'Hari Ini'}
                                                </div>
                                                <div className="text-[11px] text-primary font-bold mt-0.5">
                                                    {cons.scheduled_start ? new Date(cons.scheduled_start).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '14:00'} - {cons.scheduled_end ? new Date(cons.scheduled_end).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '14:45'} WIB
                                                </div>
                                            </td>

                                            {/* Status Badge */}
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold border ${
                                                    isCompleted 
                                                    ? 'bg-primary/10 text-primary border-primary/20' 
                                                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                                }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-primary' : 'bg-emerald-500'}`} />
                                                    {cons.status || 'SCHEDULED'}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="py-4 px-6 text-right space-x-2">
                                                {isScheduled && (
                                                    <button
                                                        type="button"
                                                        onClick={() => openCompleteModal(cons)}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-xs transition-all active:scale-95"
                                                    >
                                                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                                        <span>Selesaikan Sesi</span>
                                                    </button>
                                                )}
                                                {isCompleted && (
                                                    <button
                                                        type="button"
                                                        onClick={() => openCompleteModal(cons)}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-primary/5 text-primary border border-primary/15 font-semibold text-xs transition-all shadow-xs"
                                                    >
                                                        <span className="material-symbols-outlined text-[14px]">edit_note</span>
                                                        <span>Lihat Catatan</span>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}

                                {consultations.data.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center text-on-surface-variant">
                                            <div className="flex flex-col items-center justify-center">
                                                <span className="material-symbols-outlined text-4xl text-primary/30 mb-2">event_busy</span>
                                                <p className="text-sm font-semibold text-on-surface">Tidak ada jadwal konsultasi mendatang.</p>
                                                <p className="text-xs text-on-surface-variant mt-1">Sesi baru yang diajukan member binaan akan muncul di sini.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {consultations.links && consultations.links.length > 3 && (
                        <div className="p-4 sm:p-5 border-t border-primary/10 flex flex-wrap gap-1.5 justify-center bg-white/40">
                            {consultations.links.map((link, k) => (
                                link.url ? (
                                    <Link
                                        key={k}
                                        href={link.url}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                                            link.active 
                                            ? 'bg-primary text-white border-primary shadow-xs' 
                                            : 'bg-white/80 border-primary/15 text-on-surface hover:bg-primary/5 hover:border-primary/30'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={k}
                                        className="px-3 py-1.5 rounded-xl border border-primary/10 text-on-surface-variant/40 bg-white/40 text-xs font-medium cursor-not-allowed"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Complete Consultation Modal */}
            {selectedConsultation && (
                <div 
                    className="fixed inset-0 z-50 bg-primary/20 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
                    onClick={() => setSelectedConsultation(null)}
                >
                    <div 
                        className="bg-white/95 backdrop-blur-2xl rounded-3xl border border-primary/15 shadow-2xl max-w-lg w-full p-6 space-y-4"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-primary/10 pb-3">
                            <div>
                                <h3 className="font-heading font-bold text-lg text-primary">Catatan Evaluasi Pasca-Konsultasi</h3>
                                <p className="text-xs text-on-surface-variant">Member: {selectedConsultation.member?.name}</p>
                            </div>
                            <button 
                                onClick={() => setSelectedConsultation(null)}
                                className="p-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-primary/5"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleCompleteSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="font-bold text-on-surface block mb-1">Catatan Bimbingan & Arahan</label>
                                <textarea
                                    rows="4"
                                    value={data.notes}
                                    onChange={e => setData('notes', e.target.value)}
                                    placeholder="Tuliskan kesimpulan evaluasi nutrisi, saran aktivitas fisik, atau komitmen kebiasaan baru yang disepakati..."
                                    className="w-full px-4 py-2.5 bg-white rounded-2xl border border-primary/15 focus:outline-none focus:border-primary text-xs"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-primary/10">
                                <button
                                    type="button"
                                    onClick={() => setSelectedConsultation(null)}
                                    className="px-4 py-2 rounded-xl bg-white border border-primary/15 text-on-surface font-semibold hover:bg-primary/5 transition-all"
                                >
                                    Tutup
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary-container shadow-xs transition-all disabled:opacity-50"
                                >
                                    Simpan & Tandai Selesai
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </InstructorLayout>
    );
}

