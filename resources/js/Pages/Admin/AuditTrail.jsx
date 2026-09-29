import React, { useState, useEffect, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminFilterBar from '@/Components/Admin/AdminFilterBar';
import AdminBadge from '@/Components/Admin/AdminBadge';
import { Table, Modal, Button } from '@/Components/UI';

export default function AuditTrail({ auditLogs = { data: [], links: [] }, filters = {} }) {
    const [action, setAction] = useState(filters.action || '');
    const [actorRole, setActorRole] = useState(filters.actor_role || '');
    const [selectedLog, setSelectedLog] = useState(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeoutId = setTimeout(() => {
            router.get('/admin/audit', { action, actor_role: actorRole }, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [action, actorRole]);

    const logResult = (res) => {
        if (!res || res === 'ALLOWED' || res === 'SUCCESS') return 'DIIZINKAN';
        return 'DITOLAK';
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return String(dateStr);
            return date.toLocaleString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
        } catch {
            return String(dateStr);
        }
    };

    const columns = [
        {
            key: 'action',
            label: 'Nama Aksi (Action Key)',
            render: (row) => (
                <AdminBadge variant="admin" size="xs">
                    {row.action || '-'}
                </AdminBadge>
            ),
        },
        {
            key: 'actor',
            label: 'Pelaku / Eksekutor',
            render: (row) => (
                <div>
                    <p className="font-bold text-xs text-on-surface">{row.actor?.name || 'Sistem Otomatis'}</p>
                    <p className="text-[10px] text-on-surface-variant font-label-mono">{row.actor?.email || 'internal://worker'}</p>
                </div>
            ),
        },
        {
            key: 'actor_role',
            label: 'Peran Pelaku',
            render: (row) => {
                const role = row.actor_role || row.actor?.roles?.[0]?.slug || 'system';
                return <AdminBadge variant={role} size="xs">{role}</AdminBadge>;
            },
        },
        {
            key: 'result',
            label: 'Hasil Otorisasi',
            render: (row) => {
                const isAllowed = row.result === 'ALLOWED' || row.result === 'SUCCESS' || !row.result;
                return (
                    <AdminBadge variant={isAllowed ? 'active' : 'suspended'}>
                        {logResult(row.result)}
                    </AdminBadge>
                );
            },
        },
        {
            key: 'created_at',
            label: 'Timestamp UTC',
            render: (row) => (
                <span className="font-label-mono text-[11px] text-on-surface-variant">
                    {formatDate(row.created_at)}
                </span>
            ),
        },
        {
            key: 'actions',
            label: 'Rincian',
            align: 'right',
            render: (row) => (
                <Button
                    type="button"
                    size="xs"
                    variant="outline"
                    leftIcon="data_object"
                    onClick={() => setSelectedLog(row)}
                >
                    Payload
                </Button>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="audit" title="Buku Besar Audit Forensik">
            <Head title="Audit Trail Forensik - AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Buku Besar Audit Forensik Imutabel (Append-Only)"
                    subtitle="Pencatatan kriptografis setiap perubahan state data, mutasi hak akses pengguna, otorisasi peran, dan tindakan sistemik platform AEVYRA."
                    icon="shield"
                    badge={<AdminBadge variant="active">Cryptographic Hash Validated</AdminBadge>}
                />

                <AdminFilterBar
                    searchPlaceholder="Cari nama aksi (e.g. user.status.toggle)..."
                    searchValue={action}
                    onSearchChange={setAction}
                    filters={[
                        {
                            value: actorRole,
                            onChange: setActorRole,
                            options: [
                                { label: 'Semua Peran Aktor', value: '' },
                                { label: 'Administrator', value: 'admin' },
                                { label: 'Instruktur', value: 'instructor' },
                                { label: 'Member', value: 'member' },
                                { label: 'Sistem Otomatis', value: 'system' },
                            ],
                        },
                    ]}
                    activeCount={(action ? 1 : 0) + (actorRole ? 1 : 0)}
                    onReset={() => {
                        setAction('');
                        setActorRole('');
                    }}
                />

                <Table
                    columns={columns}
                    data={auditLogs}
                    emptyMessage="Tidak ada rekaman audit log yang cocok."
                    emptyIcon="policy"
                />

                {/* Payload Inspection Modal */}
                <Modal
                    isOpen={Boolean(selectedLog)}
                    onClose={() => setSelectedLog(null)}
                    title="Metadata Konteks Audit Forensik"
                    subtitle={`Aksi: ${selectedLog?.action} • Aktor: ${selectedLog?.actor?.name || 'Sistem'}`}
                    icon="shield"
                    maxWidth="md"
                    footer={
                        <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            onClick={() => setSelectedLog(null)}
                        >
                            Tutup
                        </Button>
                    }
                >
                    {selectedLog && (
                        <div className="space-y-4">
                            <div className="bg-[#1e2926] text-emerald-300 p-4 rounded-2xl font-label-mono text-xs overflow-x-auto max-h-64 scrollbar-thin">
                                <pre>
                                    {typeof selectedLog.context === 'string'
                                        ? selectedLog.context
                                        : JSON.stringify(selectedLog.context || { info: 'Tidak ada perubahan state spesifik tercatat' }, null, 2)}
                                </pre>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <div className="p-3 bg-surface-container-low rounded-xl border border-primary/10">
                                    <span className="text-[10px] text-on-surface-variant font-medium block">Target Model:</span>
                                    <span className="font-label-mono font-bold text-primary truncate block">{selectedLog.target_type || 'Platform Global'}</span>
                                </div>
                                <div className="p-3 bg-surface-container-low rounded-xl border border-primary/10">
                                    <span className="text-[10px] text-on-surface-variant font-medium block">IP Reference:</span>
                                    <span className="font-label-mono font-bold text-primary truncate block">{selectedLog.ip_reference || '127.0.0.1'}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </AdminLayout>
    );
}
