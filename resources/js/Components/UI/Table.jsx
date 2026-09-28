import React from 'react';
import { Link } from '@inertiajs/react';

/**
 * Standardized, Reusable Data Table Component
 * Supports both raw arrays and Laravel/Inertia paginated dataset objects:
 * { data: [...], links: [...], from: 1, to: 15, total: 100, current_page: 1 }
 */
export default function Table({
    columns = [],
    data = [],
    emptyMessage = 'Tidak ada data ditemukan.',
    emptyIcon = 'inbox',
    loading = false,
    keyField = 'id',
    onRowClick,
    hoverable = true,
    striped = false,
    className = '',
    headerClassName = '',
    rowClassName = '',
}) {
    const isPaginated = data && typeof data === 'object' && Array.isArray(data.data);
    const rows = isPaginated ? data.data : (Array.isArray(data) ? data : []);
    const paginationLinks = isPaginated ? data.links : null;

    return (
        <div className={`bg-white/95 dark:bg-surface/95 rounded-3xl border border-primary/10 shadow-[0_4px_24px_rgba(0,67,62,0.03)] overflow-hidden flex flex-col ${className}`}>
            <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className={`border-b border-primary/10 bg-surface-container-low/80 ${headerClassName}`}>
                            {columns.map((col, idx) => (
                                <th
                                    key={col.key || idx}
                                    style={col.width ? { width: col.width } : undefined}
                                    className={`px-4 sm:px-6 py-3.5 text-[11px] font-label-mono font-bold uppercase tracking-wider text-on-surface-variant ${
                                        col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                                    } ${col.headerClassName || ''}`}
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/5 text-xs text-on-surface">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length || 1} className="py-16 text-center text-on-surface-variant">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                        <span className="font-label-mono text-xs">Memuat data...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : rows.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length || 1} className="py-16 text-center text-on-surface-variant">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-on-surface-variant/60">
                                            <span className="material-symbols-outlined text-[28px]">{emptyIcon}</span>
                                        </div>
                                        <p className="font-medium text-xs">{emptyMessage}</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            rows.map((row, rIdx) => {
                                const rowKey = row[keyField] !== undefined ? row[keyField] : rIdx;
                                const isStripe = striped && rIdx % 2 === 1;

                                return (
                                    <tr
                                        key={rowKey}
                                        onClick={() => onRowClick && onRowClick(row, rIdx)}
                                        className={`transition-colors duration-150 ${
                                            isStripe ? 'bg-surface-container-lowest/50' : ''
                                        } ${
                                            onRowClick ? 'cursor-pointer hover:bg-primary/5' : hoverable ? 'hover:bg-primary/5' : ''
                                        } ${rowClassName}`}
                                    >
                                        {columns.map((col, cIdx) => (
                                            <td
                                                key={col.key || cIdx}
                                                className={`px-4 sm:px-6 py-3.5 align-middle ${
                                                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                                                } ${col.cellClassName || ''}`}
                                            >
                                                {col.render ? col.render(row, rIdx) : (row[col.key] !== undefined && row[col.key] !== null ? String(row[col.key]) : '-')}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Standard Inertia / Laravel Pagination Bar */}
            {paginationLinks && paginationLinks.length > 3 && (
                <div className="px-6 py-4 border-t border-primary/10 bg-surface-container-low/40 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="text-on-surface-variant font-medium">
                        {data.total !== undefined ? (
                            <span>
                                Menampilkan <strong className="text-primary font-bold">{data.from || 1}</strong> - <strong className="text-primary font-bold">{data.to || rows.length}</strong> dari <strong className="text-primary font-bold">{data.total}</strong> total data
                            </span>
                        ) : (
                            <span>Total {rows.length} data</span>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                        {paginationLinks.map((link, idx) => {
                            if (!link.url) {
                                return (
                                    <span
                                        key={idx}
                                        className="px-3 py-1.5 rounded-xl border border-primary/10 text-on-surface-variant/40 bg-white/40 text-xs font-medium cursor-not-allowed"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            }

                            return (
                                <Link
                                    key={idx}
                                    href={link.url}
                                    preserveScroll
                                    preserveState
                                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                                        link.active
                                            ? 'bg-primary text-white border-primary shadow-xs'
                                            : 'bg-white border-primary/15 text-on-surface hover:bg-primary/5 hover:border-primary/30'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
