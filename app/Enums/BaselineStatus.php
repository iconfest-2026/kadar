<?php

namespace App\Enums;

enum BaselineStatus: string
{
    case NOT_STARTED = 'NOT_STARTED';
    case COLLECTING = 'COLLECTING';
    case INSUFFICIENT_DATA = 'INSUFFICIENT_DATA';
    case AVAILABLE = 'AVAILABLE';
    case STALE = 'STALE';
    case REBUILDING = 'REBUILDING';

    public function label(): string
    {
        return match ($this) {
            self::NOT_STARTED => 'Belum Dimulai',
            self::COLLECTING => 'Sedang Mengumpulkan Data',
            self::INSUFFICIENT_DATA => 'Data Belum Cukup',
            self::AVAILABLE => 'Garis Acuan Siap',
            self::STALE => 'Perlu Pembaruan',
            self::REBUILDING => 'Sedang Dihitung Ulang',
        };
    }
}
