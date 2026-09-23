import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AuditTrail({ auditLogs = { data: [], links: [] }, filters = {} }) {
    const [action, setAction] = useState(filters.action || '');
    const [actorRole, setActorRole] = useState(filters.actor_role || '');
    const [selectedLog, setSelectedLog] = useState(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get('/admin/audit', { action, actor_role: actorRole }, {
                preserveState: true,
                preserveScroll: true,
                replace: true
            });
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [action, actorRole]);

    return (
        <AdminLayout activeNav="audit" title="Buku Besar Audit Forensik">
            <Head title="Audit Trail Forensik — Admin AEVYRA" />

            <div className="space-y-6">
                {/* Header & Filter Card */}
                <div className="bg-white/75 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-xs border border-primary/10 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[22px]">verified_user</span>
                            <h2 className="text-xl font-heading font-bold text-primary">Buku Besar Audit Imutabel</h2>
                        </div>
                        <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                            Perekaman append-only atas setiap mutasi data, otorisasi peran, dan akses informasi sensitif
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Action Search */}
                        <div className="relative flex-1 sm:w-60">
                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/50 text-[18px]">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Cari nama aksi (e.g. user.role)..."
                                value={action}
                                onChange={e => setAction(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white/90 backdrop-blur-sm rounded-2xl border border-primary/15 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-xs text-on-surface transition-all placeholder:text-on-surface-variant/50"
                            />
                        </div>

                        {/* Role Filter */}
                        <div className="relative">
                            <select
                                value={actorRole}
                                onChange={e => setActorRole(e.target.value)}
                                className="w-full sm:w-auto px-4 py-2 bg-white/90 backdrop-blur-sm rounded-2xl border border-primary/15 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-xs text-on-surface font-medium transition-all cursor-pointer"
                            >
                                <option value="">Semua Peran Aktor</option>
                                <option value="admin">Admin</option>
                                <option value="instructor">Instruktur</option>
                                <option value="member">Member</option>
                                <option value="system">Sistem Otomatis</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Audit Table Card */}
                <div className="bg-white/75 backdrop-blur-md rounded-3xl shadow-xs border border-primary/10 overflow-hidden hover:border-primary/20 transition-all">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-primary/[0.03] text-on-surface-variant font-semibold border-b border-primary/10">
                                <tr>
                                    <th className="py-4 px-6">Nama Aksi (Action Key)</th>
                                    <th className="py-4 px-6">Pelaku / Aktor</th>
                                    <th className="py-4 px-6">Peran Pelaku</th>
                                    <th className="py-4 px-6">Hasil Otorisasi</th>
                                    <th className="py-4 px-6">Timestamp UTC</th>
                                    <th className="py-4 px-6 text-right">Rincian Forensik</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-primary/5">
                                {auditLogs.data.map(log => {
                                    const isAllowed = log.result === 'ALLOWED' || log.result === 'SUCCESS' || !log.result;

                                    return (
                                        <tr key={log.id} className="hover:bg-primary/[0.02] transition-colors">
                                            {/* Action Name */}
                                            <td className="py-4 px-6">
                                                <span className="font-label-mono text-[11px] font-bold px-2.5 py-1 rounded-xl bg-primary/10 text-primary border border-primary/15 inline-block">
                                                    {log.action}
                                                </span>
                                            </td>

                                            {/* Actor */}
                                            <td className="py-4 px-6">
                                                <div className="font-bold text-on-surface text-sm">
                                                    {log.actor?.name || 'Sistem Otomatis'}
                                                </div>
                                                <div className="text-on-surface-variant font-label-mono text-[11px]">
                                                    {log.actor?.email || 'internal://worker'}
                                                </div>
                                            </td>

                                            {/* Actor Role */}
                                            <td className="py-4 px-6">
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold uppercase bg-white border border-primary/15 text-primary">
                                                    {log.actor_role || log.actor?.roles?.[0]?.slug || 'system'}
                                                </span>
                                            </td>

                                            {/* Result */}
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold border ${
                                                    isAllowed 
                                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                                                    : 'bg-rose-50 text-rose-800 border-rose-200'
                                                }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${isAllowed ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                                    {log.result || 'ALLOWED'}
                                                </span>
                                            </td>

                                            {/* Timestamp */}
                                            <td className="py-4 px-6 text-on-surface-variant font-label-mono text-[11px]">
                                                {new Date(log.created_at).toLocaleString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit'
                                                })}
                                            </td>

                                            {/* Details Modal Trigger */}
                                            <td className="py-4 px-6 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedLog(log)}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-primary/5 text-primary border border-primary/15 font-semibold text-xs transition-all shadow-xs"
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">data_object</span>
                                                    <span>Payload</span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {auditLogs.data.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center text-on-surface-variant">
                                            <div className="flex flex-col items-center justify-center">
                                                <span className="material-symbols-outlined text-4xl text-primary/30 mb-2">policy</span>
                                                <p className="text-sm font-semibold text-on-surface">Tidak ada rekaman audit log yang cocok.</p>
                                                <p className="text-xs text-on-surface-variant mt-1">Gunakan kata kunci atau reset filter pencarian.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {auditLogs.links && auditLogs.links.length > 3 && (
                        <div className="p-4 sm:p-5 border-t border-primary/10 flex flex-wrap gap-1.5 justify-center bg-white/40">
                            {auditLogs.links.map((link, k) => (
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

            {/* Context Payload Inspection Modal */}
            {selectedLog && (
                <div 
                    className="fixed inset-0 z-50 bg-primary/20 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
                    onClick={() => setSelectedLog(null)}
                >
                    <div 
                        className="bg-white/95 backdrop-blur-2xl rounded-3xl border border-primary/15 shadow-2xl max-w-xl w-full p-6 space-y-4"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-primary/10 pb-3">
                            <div>
                                <h3 className="font-heading font-bold text-lg text-primary">Metadata Konteks Audit</h3>
                                <p className="text-xs text-on-surface-variant font-label-mono">{selectedLog.action}</p>
                            </div>
                            <button 
                                onClick={() => setSelectedLog(null)}
                                className="p-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-primary/5"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        <div className="bg-[#1e2926] text-emerald-300 p-4 rounded-2xl font-label-mono text-xs overflow-x-auto max-h-64 scrollbar-thin">
                            <pre>{JSON.stringify(selectedLog.context || { info: 'Tidak ada perubahan state spesifik tercatat' }, null, 2)}</pre>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                            <div className="p-3 bg-primary/[0.03] rounded-xl border border-primary/10">
                                <span className="text-[10px] text-on-surface-variant font-medium block">Target Model:</span>
                                <span className="font-label-mono font-bold text-primary truncate block">{selectedLog.target_type || 'Platform Global'}</span>
                            </div>
                            <div className="p-3 bg-primary/[0.03] rounded-xl border border-primary/10">
                                <span className="text-[10px] text-on-surface-variant font-medium block">IP Anonymized Hash:</span>
                                <span className="font-label-mono font-bold text-primary truncate block">{selectedLog.ip_reference ? `${selectedLog.ip_reference.substring(0, 16)}...` : '127.0.0.1'}</span>
                            </div>
                        </div>

                        <div className="text-right pt-2">
                            <button
                                type="button"
                                onClick={() => setSelectedLog(null)}
                                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary-container transition-colors"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

