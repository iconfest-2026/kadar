import React from 'react';
import { Link } from '@inertiajs/react';

export default function AdminDataTable({
    columns = [],
    data = [],
    emptyMessage = 'Tidak ada data ditemukan.',
    emptyIcon = 'inbox',
    loading = false,
    keyField = 'id',
    onRowClick,
}) {
    const isPaginated = data && typeof data === 'object' && Array.isArray(data.data);
    const rows = isPaginated ? data.data : (Array.isArray(data) ? data : []);
    const paginationLinks = isPaginated ? data.links : null;

    return (
        <div className="bg-white/95 rounded-3xl border border-primary/10 shadow-[0_4px_24px_rgba(0,67,62,0.03)] overflow-hidden flex flex-col gpu-layer">
            <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-primary/10 bg-surface-container-low/80">
                            {columns.map((col, idx) => (
                                <th
                                    key={idx}
                                    className={`px-4 sm:px-6 py-3.5 text-[11px] font-label-mono font-bold uppercase tracking-wider text-on-surface-variant ${
                                        col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                                    }`}
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/5 text-xs text-on-surface">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length} className="py-16 text-center text-on-surface-variant">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                        <span className="font-label-mono text-xs">Memuat data...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : rows.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="py-16 text-center text-on-surface-variant">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-on-surface-variant/60">
                                            <span className="material-symbols-outlined text-[28px]">{emptyIcon}</span>
                                        </div>
                                        <p className="font-medium text-xs">{emptyMessage}</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            rows.map((row, rIdx) => (
                                <tr
                                    key={row[keyField] || rIdx}
                                    onClick={() => onRowClick && onRowClick(row)}
                                    className={`transition-colors duration-100 ${
                                        onRowClick ? 'cursor-pointer hover:bg-primary/5' : 'hover:bg-primary/5'
                                    }`}
                                >
                                    {columns.map((col, cIdx) => (
                                        <td
                                            key={cIdx}
                                            className={`px-4 sm:px-6 py-3.5 align-middle ${
                                                col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                                            }`}
                                        >
                                            {col.render ? col.render(row, rIdx) : row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {paginationLinks && paginationLinks.length > 3 && (
                <div className="px-4 sm:px-6 py-3.5 border-t border-primary/10 bg-white/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-on-surface-variant">
                    <span className="font-label-mono text-[11px]">
                        Menampilkan {data.from || 0} - {data.to || 0} dari {data.total || 0} data
                    </span>

                    <div className="flex items-center gap-1">
                        {paginationLinks.map((link, lIdx) => {
                            if (!link.url && link.label.includes('...')) {
                                return (
                                    <span key={lIdx} className="px-2.5 py-1 text-on-surface-variant/50">
                                        ...
                                    </span>
                                );
                            }

                            const cleanLabel = link.label
                                .replace('&laquo; Previous', '← Prev')
                                .replace('Next &raquo;', 'Next →');

                            return (
                                <Link
                                    key={lIdx}
                                    href={link.url || '#'}
                                    preserveScroll
                                    preserveState
                                    className={`px-3 py-1.5 rounded-xl font-label-mono text-xs font-semibold transition-all ${
                                        link.active
                                            ? 'bg-primary text-white shadow-xs'
                                            : link.url
                                            ? 'bg-white hover:bg-primary/10 text-on-surface border border-primary/10'
                                            : 'opacity-40 pointer-events-none'
                                    }`}
                                >
                                    {cleanLabel}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
