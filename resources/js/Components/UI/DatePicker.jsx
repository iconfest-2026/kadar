import React, { useState, useRef, useEffect } from 'react';

const MONTH_NAMES = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const DAY_NAMES = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export default function DatePicker({
    label,
    value,
    onChange,
    placeholder = 'Pilih tanggal...',
    minYear = 1930,
    maxYear = new Date().getFullYear(),
    disabled = false,
    leftIcon = 'calendar_today',
    error,
    helperText,
    containerClassName = '',
    id,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Parse value (YYYY-MM-DD) into initial view year & month
    const parsedDate = value ? new Date(value + 'T00:00:00') : null;
    const isValidDate = parsedDate && !isNaN(parsedDate.getTime());

    const [viewYear, setViewYear] = useState(() => (isValidDate ? parsedDate.getFullYear() : 1998));
    const [viewMonth, setViewMonth] = useState(() => (isValidDate ? parsedDate.getMonth() : 0));

    // Sync view year/month when value changes from outside
    useEffect(() => {
        if (isValidDate) {
            setViewYear(parsedDate.getFullYear());
            setViewMonth(parsedDate.getMonth());
        }
    }, [value]);

    // Close popover when clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    // Generate years array in descending order
    const years = [];
    for (let y = maxYear; y >= minYear; y--) {
        years.push(y);
    }

    // Days in current view month
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();

    // Previous month filler
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();
    const prevMonthDays = [];
    for (let i = firstDayIndex - 1; i >= 0; i--) {
        prevMonthDays.push(daysInPrevMonth - i);
    }

    const handlePrevMonth = () => {
        if (viewMonth === 0) {
            if (viewYear > minYear) {
                setViewYear(viewYear - 1);
                setViewMonth(11);
            }
        } else {
            setViewMonth(viewMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (viewMonth === 11) {
            if (viewYear < maxYear) {
                setViewYear(viewYear + 1);
                setViewMonth(0);
            }
        } else {
            setViewMonth(viewMonth + 1);
        }
    };

    const handleSelectDay = (day) => {
        const monthStr = String(viewMonth + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        const formatted = `${viewYear}-${monthStr}-${dayStr}`;
        onChange?.(formatted);
        setIsOpen(false);
    };

    const handleSelectToday = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();

        if (year >= minYear && year <= maxYear) {
            setViewYear(year);
            setViewMonth(month);
            const monthStr = String(month + 1).padStart(2, '0');
            const dayStr = String(day).padStart(2, '0');
            onChange?.(`${year}-${monthStr}-${dayStr}`);
        }
        setIsOpen(false);
    };

    const handleClear = () => {
        onChange?.('');
        setIsOpen(false);
    };

    // Formatted label for input trigger
    const formattedDisplay = isValidDate
        ? `${parsedDate.getDate()} ${MONTH_NAMES[parsedDate.getMonth()]} ${parsedDate.getFullYear()}`
        : '';

    // Calculate age if valid
    const age = isValidDate
        ? Math.floor((new Date() - parsedDate) / (365.25 * 24 * 60 * 60 * 1000))
        : null;

    const today = new Date();
    const isTodayYearMonth = today.getFullYear() === viewYear && today.getMonth() === viewMonth;

    return (
        <div className={`space-y-1.5 relative ${containerClassName}`} ref={containerRef}>
            {label && (
                <label className="block text-[11px] font-bold text-on-surface tracking-wider uppercase select-none">
                    {label}
                </label>
            )}

            {/* Custom Input Trigger */}
            <div className="relative">
                <button
                    type="button"
                    id={id}
                    disabled={disabled}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    className={`group w-full flex items-center justify-between pl-10 pr-3.5 py-2.5 rounded-2xl border transition-all shadow-2xs text-left cursor-pointer active:scale-[0.99] ${
                        isOpen
                            ? 'border-primary ring-4 ring-primary/10 bg-surface-container-lowest'
                            : 'border-surface-container-high bg-surface-container-lowest hover:border-primary/40'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant/60 group-hover:text-primary transition-colors text-[18px]">
                        {leftIcon}
                    </span>

                    <span className="truncate flex items-center gap-2">
                        {formattedDisplay ? (
                            <>
                                <span className="text-xs font-semibold text-on-surface font-sans">
                                    {formattedDisplay}
                                </span>
                                {age !== null && age >= 0 && (
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold shrink-0">
                                        {age} tahun
                                    </span>
                                )}
                            </>
                        ) : (
                            <span className="text-xs text-on-surface-variant/50 font-medium">
                                {placeholder}
                            </span>
                        )}
                    </span>

                    <span className="material-symbols-outlined text-on-surface-variant/60 group-hover:text-primary transition-colors text-[18px] shrink-0 ml-2">
                        {isOpen ? 'expand_less' : 'calendar_month'}
                    </span>
                </button>
            </div>

            {error && (
                <p className="text-[11px] text-rose-500 font-medium flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    {error}
                </p>
            )}

            {helperText && !error && (
                <p className="text-[11px] text-on-surface-variant mt-1">{helperText}</p>
            )}

            {/* Custom Calendar Popover Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 sm:left-auto right-auto sm:right-0 mt-2 z-50 w-72 sm:w-80 p-4 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-2xl space-y-3 animate-in fade-in zoom-in-95 duration-150">
                    {/* Header: Month & Year Dropdown Selectors + Navigation */}
                    <div className="flex items-center justify-between gap-1.5 pb-2 border-b border-surface-container">
                        <div className="flex items-center gap-1.5 flex-1 min-w-0">
                            {/* Month Dropdown */}
                            <select
                                value={viewMonth}
                                onChange={(e) => setViewMonth(Number(e.target.value))}
                                className="px-2 py-1 rounded-xl bg-surface-container text-xs font-bold text-on-surface border border-surface-container-high focus:outline-hidden focus:ring-2 focus:ring-primary/20 cursor-pointer flex-1 truncate"
                            >
                                {MONTH_NAMES.map((name, idx) => (
                                    <option key={name} value={idx}>
                                        {name}
                                    </option>
                                ))}
                            </select>

                            {/* Year Dropdown */}
                            <select
                                value={viewYear}
                                onChange={(e) => setViewYear(Number(e.target.value))}
                                className="px-2 py-1 rounded-xl bg-surface-container text-xs font-bold text-on-surface border border-surface-container-high focus:outline-hidden focus:ring-2 focus:ring-primary/20 cursor-pointer w-20 font-mono"
                            >
                                {years.map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Prev / Next Buttons */}
                        <div className="flex items-center gap-0.5 shrink-0">
                            <button
                                type="button"
                                onClick={handlePrevMonth}
                                className="w-7 h-7 rounded-lg hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors cursor-pointer"
                                title="Bulan Sebelumnya"
                            >
                                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                            </button>
                            <button
                                type="button"
                                onClick={handleNextMonth}
                                className="w-7 h-7 rounded-lg hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors cursor-pointer"
                                title="Bulan Berikutnya"
                            >
                                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                            </button>
                        </div>
                    </div>

                    {/* Weekday Names Header */}
                    <div className="grid grid-cols-7 gap-1 text-center">
                        {DAY_NAMES.map((dn, idx) => (
                            <span
                                key={dn}
                                className={`text-[10px] font-mono font-bold py-0.5 ${
                                    idx === 0 ? 'text-rose-500' : 'text-on-surface-variant/70'
                                }`}
                            >
                                {dn}
                            </span>
                        ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {/* Prev month padding days */}
                        {prevMonthDays.map((d) => (
                            <div
                                key={`prev-${d}`}
                                className="h-8 flex items-center justify-center text-[11px] text-on-surface-variant/25 font-mono select-none"
                            >
                                {d}
                            </div>
                        ))}

                        {/* Current month days */}
                        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
                            const isSelected =
                                isValidDate &&
                                parsedDate.getFullYear() === viewYear &&
                                parsedDate.getMonth() === viewMonth &&
                                parsedDate.getDate() === d;

                            const isToday = isTodayYearMonth && today.getDate() === d;

                            return (
                                <button
                                    key={`day-${d}`}
                                    type="button"
                                    onClick={() => handleSelectDay(d)}
                                    className={`h-8 rounded-xl text-xs font-mono font-medium transition-all flex items-center justify-center cursor-pointer active:scale-95 ${
                                        isSelected
                                            ? 'bg-primary text-white font-bold shadow-xs'
                                            : isToday
                                            ? 'bg-emerald-50 text-primary border border-primary/40 font-bold hover:bg-primary hover:text-white'
                                            : 'hover:bg-surface-container text-on-surface'
                                    }`}
                                >
                                    {d}
                                </button>
                            );
                        })}
                    </div>

                    {/* Popover Footer: Quick Actions */}
                    <div className="pt-2 border-t border-surface-container flex items-center justify-between text-xs font-semibold">
                        <button
                            type="button"
                            onClick={handleClear}
                            className="text-on-surface-variant hover:text-rose-600 transition-colors text-[11px] cursor-pointer"
                        >
                            Kosongkan
                        </button>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleSelectToday}
                                className="text-primary hover:text-primary-container text-[11px] font-bold transition-colors cursor-pointer"
                            >
                                Hari Ini
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-[11px] transition-colors cursor-pointer"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
