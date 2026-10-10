import React, { useState, useMemo, useEffect } from 'react';
import { Link } from '@inertiajs/react';

/**
 * Standardized, Responsive Data Table Component with Built-in Search & Pagination
 * Supports both:
 * 1. Laravel / Inertia paginated dataset objects:
 *    { data: [...], links: [...], from: 1, to: 15, total: 100, current_page: 1, per_page: 15 }
 * 2. Regular JavaScript Arrays with automatic client-side searching and pagination:
 *    [ { id: 1, ... }, { id: 2, ... } ]
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
    // Search Props
    searchable = true,
    searchPlaceholder = 'Cari data di tabel...',
    searchValue,
    onSearch,
    searchKeys,
    // Pagination Props
    pagination = true,
    pageSize = 10,
    pageSizeOptions = [5, 10, 25, 50],
    showPageSizeSelector = true,
    // Extra Toolbar Slot (buttons, extra filters, etc.)
    toolbar,
}) {
    // Detect whether data is Laravel server-paginated
    const isServerPaginated = Boolean(data && typeof data === 'object' && Array.isArray(data.data));
    const rawRows = isServerPaginated ? data.data : (Array.isArray(data) ? data : []);
    const serverPaginationLinks = isServerPaginated ? (data.links || null) : null;

    // Search State
    const [internalSearch, setInternalSearch] = useState('');
    const currentSearch = searchValue !== undefined ? searchValue : internalSearch;

    // Pagination State (for client-side pagination)
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPerPage, setCurrentPerPage] = useState(pageSize);

    // Sync perPage if prop changes
    useEffect(() => {
        setCurrentPerPage(pageSize);
    }, [pageSize]);

    // Reset page to 1 when search changes
    const handleSearchChange = (val) => {
        if (searchValue === undefined) {
            setInternalSearch(val);
        }
        setCurrentPage(1);
        if (onSearch) onSearch(val);
    };

    const handleClearSearch = () => {
        handleSearchChange('');
    };

    // Client-side search filtering (only applies to array data or when not server-filtered)
    const filteredRows = useMemo(() => {
        if (!currentSearch || currentSearch.trim() === '') return rawRows;
        if (isServerPaginated && onSearch) {
            // When server handles search via onSearch callback, don't double-filter rawRows
            return rawRows;
        }

        const q = currentSearch.toLowerCase().trim();

        return rawRows.filter((row) => {
            if (!row || typeof row !== 'object') return false;

            // 1. Explicit searchKeys if provided
            if (Array.isArray(searchKeys) && searchKeys.length > 0) {
                return searchKeys.some((k) => {
                    const val = row[k];
                    return val !== null && val !== undefined && String(val).toLowerCase().includes(q);
                });
            }

            // 2. Search against column keys
            const colKeys = columns.map((c) => c.key).filter(Boolean);
            const matchInColumns = colKeys.some((k) => {
                const val = row[k];
                return val !== null && val !== undefined && String(val).toLowerCase().includes(q);
            });
            if (matchInColumns) return true;

            // 3. Search against all row values recursively
            return Object.values(row).some((val) => {
                if (val === null || val === undefined) return false;
                if (typeof val === 'string' || typeof val === 'number') {
                    return String(val).toLowerCase().includes(q);
                }
                if (typeof val === 'object' && !Array.isArray(val)) {
                    return Object.values(val).some((nested) =>
                        (typeof nested === 'string' || typeof nested === 'number') &&
                        String(nested).toLowerCase().includes(q)
                    );
                }
                return false;
            });
        });
    }, [rawRows, currentSearch, searchKeys, columns, isServerPaginated, onSearch]);

    // Client-side pagination slicing
    const totalItems = isServerPaginated ? (data.total ?? rawRows.length) : filteredRows.length;
    const totalPages = isServerPaginated
        ? (data.last_page || Math.ceil(totalItems / (data.per_page || 10)) || 1)
        : Math.max(1, Math.ceil(filteredRows.length / currentPerPage));

    // Clamp currentPage if out of bounds
    useEffect(() => {
        if (!isServerPaginated && currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage, isServerPaginated]);

    const displayedRows = useMemo(() => {
        if (isServerPaginated) return rawRows;
        if (!pagination) return filteredRows;

        const startIdx = (currentPage - 1) * currentPerPage;
        return filteredRows.slice(startIdx, startIdx + currentPerPage);
    }, [isServerPaginated, rawRows, pagination, filteredRows, currentPage, currentPerPage]);

    // Client pagination info
    const clientFrom = filteredRows.length === 0 ? 0 : (currentPage - 1) * currentPerPage + 1;
    const clientTo = Math.min(currentPage * currentPerPage, filteredRows.length);

    // Compute visible page numbers with smart ellipsis for client pagination
    const visiblePages = useMemo(() => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages = [];
        pages.push(1);

        if (currentPage > 3) {
            pages.push('...');
        }

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push('...');
        }

        pages.push(totalPages);
        return pages;
    }, [totalPages, currentPage]);

    return (
        <div className={`bg-white/95 dark:bg-surface/95 rounded-3xl border border-primary/10 shadow-[0_4px_24px_rgba(0,67,62,0.03)] overflow-hidden flex flex-col ${className}`}>
            {/* Top Toolbar: Search Bar & Actions Slot */}
            {(searchable || toolbar) && (
                <div className="p-3.5 sm:p-4 border-b border-primary/10 bg-surface-container-low/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {searchable ? (
                        <div className="relative flex-1 max-w-full sm:max-w-md">
                            <input
                                type="text"
                                value={currentSearch}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                placeholder={searchPlaceholder}
                                className="w-full pl-9 pr-8 py-2 bg-white dark:bg-surface text-xs text-on-surface rounded-2xl border border-primary/15 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-on-surface-variant/60 font-medium shadow-2xs"
                            />
                            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                                search
                            </span>
                            {currentSearch && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-0.5 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
                                    aria-label="Hapus kata kunci pencarian"
                                >
                                    <span className="material-symbols-outlined text-[16px]">close</span>
                                </button>
                            )}
                        </div>
                    ) : <div />}

                    <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
                        {/* Search Result Counter Badge */}
                        {currentSearch && (
                            <span className="px-2.5 py-1 rounded-xl bg-primary/10 text-primary text-[11px] font-label-mono font-bold shrink-0">
                                {filteredRows.length} hasil
                            </span>
                        )}
                        {toolbar && <div className="flex items-center gap-2">{toolbar}</div>}
                    </div>
                </div>
            )}

            {/* Table Core Container */}
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
                        ) : displayedRows.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length || 1} className="py-16 text-center text-on-surface-variant">
                                    <div className="flex flex-col items-center justify-center gap-2.5 max-w-sm mx-auto px-4">
                                        <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-on-surface-variant/60 shadow-2xs">
                                            <span className="material-symbols-outlined text-[28px]">
                                                {currentSearch ? 'search_off' : emptyIcon}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-xs text-on-surface">
                                                {currentSearch
                                                    ? `Tidak ada data yang cocok dengan "${currentSearch}"`
                                                    : emptyMessage}
                                            </p>
                                            {currentSearch && (
                                                <p className="text-[11px] text-on-surface-variant/80 mt-0.5">
                                                    Coba periksa ejaan atau gunakan kata kunci pencarian yang lain.
                                                </p>
                                            )}
                                        </div>
                                        {currentSearch && (
                                            <button
                                                type="button"
                                                onClick={handleClearSearch}
                                                className="mt-1 px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                                            >
                                                <span className="material-symbols-outlined text-[15px]">refresh</span>
                                                <span>Reset Pencarian</span>
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            displayedRows.map((row, rIdx) => {
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

            {/* Pagination Footer */}
            {pagination && (
                <>
                    {/* A. Server-Side Laravel / Inertia Pagination */}
                    {isServerPaginated && serverPaginationLinks && serverPaginationLinks.length > 3 && (
                        <div className="px-4 sm:px-6 py-3.5 border-t border-primary/10 bg-surface-container-low/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                            <div className="text-on-surface-variant font-medium text-[11px] sm:text-xs">
                                {data.total !== undefined ? (
                                    <span>
                                        Menampilkan <strong className="text-primary font-bold">{data.from || 1}</strong> - <strong className="text-primary font-bold">{data.to || displayedRows.length}</strong> dari <strong className="text-primary font-bold">{data.total}</strong> total data
                                    </span>
                                ) : (
                                    <span>Total {displayedRows.length} data</span>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                                {serverPaginationLinks.map((link, idx) => {
                                    if (!link.url) {
                                        return (
                                            <span
                                                key={idx}
                                                className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-primary/10 text-on-surface-variant/40 bg-white/40 dark:bg-surface/40 text-[11px] sm:text-xs font-medium cursor-not-allowed select-none"
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
                                            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold transition-all border ${
                                                link.active
                                                    ? 'bg-primary text-white border-primary shadow-xs'
                                                    : 'bg-white dark:bg-surface border-primary/15 text-on-surface hover:bg-primary/5 hover:border-primary/30'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* B. Client-Side Smart Pagination (For Array Datasets) */}
                    {!isServerPaginated && filteredRows.length > 0 && (
                        <div className="px-4 sm:px-6 py-3.5 border-t border-primary/10 bg-surface-container-low/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                            {/* Summary & Page Size Selector */}
                            <div className="flex flex-wrap items-center gap-3 text-on-surface-variant font-medium text-[11px] sm:text-xs">
                                <span>
                                    Menampilkan <strong className="text-primary font-bold">{clientFrom}</strong> - <strong className="text-primary font-bold">{clientTo}</strong> dari <strong className="text-primary font-bold">{filteredRows.length}</strong> data
                                    {rawRows.length !== filteredRows.length && (
                                        <span className="text-on-surface-variant/70 ml-1">
                                            (difilter dari {rawRows.length})
                                        </span>
                                    )}
                                </span>

                                {showPageSizeSelector && filteredRows.length > pageSizeOptions[0] && (
                                    <div className="flex items-center gap-1.5 ml-0 sm:ml-2">
                                        <span className="text-[11px] text-on-surface-variant/80">Tampilkan:</span>
                                        <select
                                            value={currentPerPage}
                                            onChange={(e) => {
                                                setCurrentPerPage(Number(e.target.value));
                                                setCurrentPage(1);
                                            }}
                                            className="px-2 py-0.5 rounded-lg bg-white dark:bg-surface border border-primary/15 text-[11px] font-semibold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                                        >
                                            {pageSizeOptions.map((opt) => (
                                                <option key={opt} value={opt}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            {/* Client Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex items-center gap-1 sm:gap-1.5">
                                    {/* Previous Button */}
                                    <button
                                        type="button"
                                        disabled={currentPage <= 1}
                                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                        className="p-1 sm:px-2.5 sm:py-1 rounded-xl border border-primary/15 bg-white dark:bg-surface text-on-surface hover:bg-primary/5 hover:border-primary/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer shadow-2xs"
                                        aria-label="Halaman sebelumnya"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                                        <span className="hidden sm:inline text-[11px] font-semibold ml-0.5">Sebelumnya</span>
                                    </button>

                                    {/* Mobile: Compact Page Indicator */}
                                    <span className="sm:hidden px-2 py-1 text-[11px] font-label-mono font-bold text-on-surface">
                                        {currentPage} / {totalPages}
                                    </span>

                                    {/* Desktop: Numeric Page Buttons with Ellipsis */}
                                    <div className="hidden sm:flex items-center gap-1">
                                        {visiblePages.map((pg, idx) => {
                                            if (pg === '...') {
                                                return (
                                                    <span
                                                        key={`ellipsis-${idx}`}
                                                        className="px-2 py-1 text-on-surface-variant/60 font-mono text-xs select-none"
                                                    >
                                                        ...
                                                    </span>
                                                );
                                            }

                                            const isCurrent = pg === currentPage;
                                            return (
                                                <button
                                                    key={pg}
                                                    type="button"
                                                    onClick={() => setCurrentPage(pg)}
                                                    className={`min-w-8 h-8 px-2 rounded-xl text-xs font-semibold transition-all border flex items-center justify-center cursor-pointer ${
                                                        isCurrent
                                                            ? 'bg-primary text-white border-primary shadow-xs font-bold'
                                                            : 'bg-white dark:bg-surface border-primary/15 text-on-surface hover:bg-primary/5 hover:border-primary/30'
                                                    }`}
                                                >
                                                    {pg}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Next Button */}
                                    <button
                                        type="button"
                                        disabled={currentPage >= totalPages}
                                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                        className="p-1 sm:px-2.5 sm:py-1 rounded-xl border border-primary/15 bg-white dark:bg-surface text-on-surface hover:bg-primary/5 hover:border-primary/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer shadow-2xs"
                                        aria-label="Halaman berikutnya"
                                    >
                                        <span className="hidden sm:inline text-[11px] font-semibold mr-0.5">Selanjutnya</span>
                                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
