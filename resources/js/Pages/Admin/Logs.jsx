import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import { 
    Table, 
    Modal, 
    Button, 
    Input, 
    Select, 
    Badge, 
    DropdownAction, 
    AdminDeleteConfirmModal,
    AdminBadge 
} from '@/Components/UI';

export default function Logs({
    logs = {},
    filters = {},
    counts = {},
    fileInfo = {}
}) {
    const [selectedLog, setSelectedLog] = useState(null);
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const [isClearing, setIsClearing] = useState(false);
    const [copiedMessage, setCopiedMessage] = useState(false);
    const [copiedTrace, setCopiedTrace] = useState(false);

    const [search, setSearch] = useState(filters.search || '');
    const [level, setLevel] = useState(filters.level || 'ALL');

    const handleFilter = (newLevel = level, newSearch = search) => {
        router.get('/admin/logs', {
            level: newLevel,
            search: newSearch,
        }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleFilter(level, search);
    };

    const handleResetFilter = () => {
        setSearch('');
        setLevel('ALL');
        router.get('/admin/logs', {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleClearLogs = () => {
        setIsClearing(true);
        router.post('/admin/logs/clear', {}, {
            preserveScroll: true,
            onFinish: () => {
                setIsClearing(false);
                setIsClearModalOpen(false);
            },
        });
    };

    const copyToClipboard = (text, type = 'message') => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        if (type === 'message') {
            setCopiedMessage(true);
            setTimeout(() => setCopiedMessage(false), 2000);
        } else {
            setCopiedTrace(true);
            setTimeout(() => setCopiedTrace(false), 2000);
        }
    };

    const getLevelBadgeVariant = (lvl) => {
        switch (lvl) {
            case 'EMERGENCY':
            case 'ALERT':
            case 'CRITICAL':
                return 'danger';
            case 'ERROR':
                return 'danger';
            case 'WARNING':
                return 'warning';
            case 'NOTICE':
            case 'INFO':
                return 'info';
            case 'DEBUG':
            default:
                return 'neutral';
        }
    };

    const columns = [
        {
            key: 'timestamp',
            label: 'Waktu Terjadi',
            width: '180px',
            render: (row) => (
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant shrink-0">
                        schedule
                    </span>
                    <span className="font-label-mono text-[11px] font-semibold text-on-surface whitespace-nowrap">
                        {row.timestamp}
                    </span>
                </div>
            ),
        },
        {
            key: 'level',
            label: 'Tingkat (Level)',
            width: '130px',
            render: (row) => (
                <Badge variant={getLevelBadgeVariant(row.level)}>
                    {row.level}
                </Badge>
            ),
        },
        {
            key: 'message',
            label: 'Pesan Error & File Lokasi',
            render: (row) => (
                <div className="space-y-1 max-w-xl">
                    <p 
                        className="font-mono text-xs font-semibold text-on-surface break-words line-clamp-2 hover:line-clamp-none cursor-pointer"
                        title={row.message}
                        onClick={() => setSelectedLog(row)}
                    >
                        {row.message}
                    </p>
                    {row.file_info && (
                        <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant font-mono truncate">
                            <span className="material-symbols-outlined text-[14px] text-primary/70 shrink-0">code</span>
                            <span className="truncate">{row.file_info.file}</span>
                            {row.file_info.line && (
                                <span className="px-1.5 py-0.2 rounded bg-surface-container font-bold text-primary shrink-0">
                                    :{row.file_info.line}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: 'environment',
            label: 'Env',
            width: '100px',
            render: (row) => (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-surface-container-high text-on-surface-variant">
                    {row.environment}
                </span>
            ),
        },
        {
            key: 'actions',
            label: 'Aksi',
            width: '90px',
            align: 'right',
            render: (row) => (
                <DropdownAction
                    align="right"
                    customActions={[
                        {
                            label: 'Detail Stack Trace',
                            icon: 'terminal',
                            onClick: () => setSelectedLog(row),
                        },
                        {
                            label: 'Salin Pesan Error',
                            icon: 'content_copy',
                            onClick: () => copyToClipboard(row.message, 'message'),
                        },
                    ]}
                />
            ),
        },
    ];

    return (
        <AdminLayout activeNav="logs" title="Log Error Server">
            <Head title="Log Error Server - Admin AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Log Error & Diagnostik Sistem"
                    subtitle="Inspeksi berkas laravel.log real-time untuk mendeteksi error sistem, peringatan runtime, dan exception stack trace tanpa perlu membuka terminal."
                    icon="terminal"
                    badge={
                        <AdminBadge variant={fileInfo.exists ? 'active' : 'inactive'}>
                            {fileInfo.exists ? `Log Size: ${fileInfo.size}` : 'Log Kosong'}
                        </AdminBadge>
                    }
                >
                    <div className="flex flex-wrap items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            leftIcon="refresh"
                            onClick={() => router.reload({ preserveScroll: true })}
                        >
                            Segarkan
                        </Button>
                        <a href="/admin/logs/download" download>
                            <Button
                                variant="outline"
                                size="sm"
                                leftIcon="download"
                            >
                                Unduh Log (.log)
                            </Button>
                        </a>
                        <Button
                            variant="outline"
                            size="sm"
                            leftIcon="delete_sweep"
                            className="text-rose-700 hover:text-rose-800 border-rose-200 hover:border-rose-300"
                            onClick={() => setIsClearModalOpen(true)}
                        >
                            Bersihkan Log
                        </Button>
                    </div>
                </AdminPageHeader>

                {/* KPI Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <div className="p-4 rounded-2xl bg-white border border-primary/10 shadow-2xs flex flex-col justify-between">
                        <div className="flex items-center justify-between text-on-surface-variant mb-1">
                            <span className="text-[11px] font-bold">Total Entri</span>
                            <span className="material-symbols-outlined text-[16px] text-primary">receipt_long</span>
                        </div>
                        <div className="font-heading font-black text-xl text-primary">
                            {counts.total ?? 0}
                        </div>
                        <span className="text-[10px] text-on-surface-variant mt-0.5">Entri tersimpan</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-rose-200 shadow-2xs flex flex-col justify-between">
                        <div className="flex items-center justify-between text-rose-700 mb-1">
                            <span className="text-[11px] font-bold">Error</span>
                            <span className="material-symbols-outlined text-[16px] text-rose-600">error</span>
                        </div>
                        <div className="font-heading font-black text-xl text-rose-700">
                            {counts.error ?? 0}
                        </div>
                        <span className="text-[10px] text-rose-600/80 mt-0.5">Tingkat ERROR</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-red-200 shadow-2xs flex flex-col justify-between">
                        <div className="flex items-center justify-between text-red-700 mb-1">
                            <span className="text-[11px] font-bold">Critical / SOS</span>
                            <span className="material-symbols-outlined text-[16px] text-red-600">report</span>
                        </div>
                        <div className="font-heading font-black text-xl text-red-700">
                            {(counts.critical ?? 0) + (counts.emergency ?? 0)}
                        </div>
                        <span className="text-[10px] text-red-600/80 mt-0.5">Kritis & Emergency</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-2xs flex flex-col justify-between">
                        <div className="flex items-center justify-between text-amber-700 mb-1">
                            <span className="text-[11px] font-bold">Warning</span>
                            <span className="material-symbols-outlined text-[16px] text-amber-600">warning</span>
                        </div>
                        <div className="font-heading font-black text-xl text-amber-700">
                            {counts.warning ?? 0}
                        </div>
                        <span className="text-[10px] text-amber-600/80 mt-0.5">Peringatan sistem</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-teal-200 shadow-2xs flex flex-col justify-between">
                        <div className="flex items-center justify-between text-teal-700 mb-1">
                            <span className="text-[11px] font-bold">Info / Debug</span>
                            <span className="material-symbols-outlined text-[16px] text-teal-600">info</span>
                        </div>
                        <div className="font-heading font-black text-xl text-teal-700">
                            {counts.info ?? 0}
                        </div>
                        <span className="text-[10px] text-teal-600/80 mt-0.5">Informasi & Audit</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-primary/10 shadow-2xs flex flex-col justify-between">
                        <div className="flex items-center justify-between text-on-surface-variant mb-1">
                            <span className="text-[11px] font-bold">Ukuran File</span>
                            <span className="material-symbols-outlined text-[16px] text-indigo-600">folder_open</span>
                        </div>
                        <div className="font-heading font-black text-xl text-on-surface">
                            {fileInfo.size || '0 KB'}
                        </div>
                        <span className="text-[10px] text-on-surface-variant mt-0.5 truncate">{fileInfo.path}</span>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="bg-white/95 rounded-3xl p-5 shadow-xs border border-primary/15">
                    <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-center gap-3">
                        <div className="flex-1 w-full">
                            <Input
                                placeholder="Cari pesan error, exception class, file, atau timestamp..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                leftIcon="search"
                            />
                        </div>

                        <div className="w-full md:w-56">
                            <Select
                                value={level}
                                onChange={(e) => {
                                    setLevel(e.target.value);
                                    handleFilter(e.target.value, search);
                                }}
                                options={[
                                    { value: 'ALL', label: 'Semua Tingkat (Level)' },
                                    { value: 'ERROR', label: 'ERROR' },
                                    { value: 'CRITICAL', label: 'CRITICAL' },
                                    { value: 'EMERGENCY', label: 'EMERGENCY' },
                                    { value: 'WARNING', label: 'WARNING' },
                                    { value: 'INFO', label: 'INFO' },
                                    { value: 'DEBUG', label: 'DEBUG' },
                                ]}
                            />
                        </div>

                        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                                leftIcon="filter_list"
                                className="w-full md:w-auto"
                            >
                                Terapkan Filter
                            </Button>
                            {(search || (level && level !== 'ALL')) && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="md"
                                    leftIcon="close"
                                    onClick={handleResetFilter}
                                >
                                    Reset
                                </Button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    data={logs}
                    emptyMessage="Tidak ada catatan log yang sesuai dengan filter."
                    emptyIcon="code_off"
                />
            </div>

            {/* Modal Detail Stack Trace */}
            <Modal
                isOpen={!!selectedLog}
                onClose={() => setSelectedLog(null)}
                title="Detail Exception & Stack Trace"
                size="xl"
            >
                {selectedLog && (
                    <div className="space-y-4">
                        {/* Header Badges */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-primary/10">
                            <div className="flex items-center gap-2">
                                <Badge variant={getLevelBadgeVariant(selectedLog.level)}>
                                    {selectedLog.level}
                                </Badge>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-surface-container-high text-on-surface-variant">
                                    Env: {selectedLog.environment}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-on-surface-variant font-label-mono">
                                <span className="material-symbols-outlined text-[16px]">schedule</span>
                                <span>{selectedLog.timestamp}</span>
                            </div>
                        </div>

                        {/* Message Box */}
                        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wide">
                                    Pesan Error (Exception Message)
                                </span>
                                <button
                                    type="button"
                                    onClick={() => copyToClipboard(selectedLog.message, 'message')}
                                    className="text-xs text-rose-700 hover:text-rose-900 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[14px]">
                                        {copiedMessage ? 'check' : 'content_copy'}
                                    </span>
                                    <span>{copiedMessage ? 'Tersalin!' : 'Salin Pesan'}</span>
                                </button>
                            </div>
                            <p className="font-mono text-xs text-rose-950 font-bold whitespace-pre-wrap break-words leading-relaxed select-all">
                                {selectedLog.message}
                            </p>
                            {selectedLog.file_info && (
                                <p className="text-[11px] font-mono text-rose-700 pt-1 border-t border-rose-200">
                                    Lokasi: {selectedLog.file_info.file}:{selectedLog.file_info.line}
                                </p>
                            )}
                        </div>

                        {/* Stack Trace Box */}
                        {selectedLog.stack_trace ? (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-primary">data_object</span>
                                        <span>Full Stack Trace & Konteks Error</span>
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => copyToClipboard(selectedLog.stack_trace, 'trace')}
                                        className="text-xs text-primary hover:text-primary-dim font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[14px]">
                                            {copiedTrace ? 'check' : 'content_copy'}
                                        </span>
                                        <span>{copiedTrace ? 'Tersalin ke Clipboard!' : 'Salin Stack Trace'}</span>
                                    </button>
                                </div>
                                <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 overflow-hidden shadow-inner">
                                    <pre className="font-mono text-[11px] text-slate-200 whitespace-pre-wrap break-words max-h-96 overflow-y-auto leading-relaxed select-all scrollbar-thin">
                                        {selectedLog.stack_trace}
                                    </pre>
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 rounded-xl bg-surface-container-low text-center text-xs text-on-surface-variant font-medium">
                                Tidak ada stack trace tambahan untuk entri log ini.
                            </div>
                        )}

                        <div className="flex justify-end pt-3 border-t border-primary/10">
                            <Button
                                variant="outline"
                                size="md"
                                onClick={() => setSelectedLog(null)}
                            >
                                Tutup
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Modal Bersihkan Log */}
            <AdminDeleteConfirmModal
                isOpen={isClearModalOpen}
                onClose={() => setIsClearModalOpen(false)}
                onConfirm={handleClearLogs}
                title="Kosongkan Seluruh File Log Server?"
                message="Seluruh catatan riwayat log pada berkas storage/logs/laravel.log akan dihapus permanen. Tindakan ini berguna untuk me-reset pemantauan atau menghemat ruang disk server. Anda disarankan mengunduh berkas log terlebih dahulu untuk cadangan arsip."
                confirmText={isClearing ? 'Mengosongkan...' : 'Ya, Kosongkan Log'}
                cancelText="Batal"
            />
        </AdminLayout>
    );
}

