<?php

namespace App\Enums;

enum SignalSeverity: string
{
    case INFO = 'INFO';
    case NOTICE = 'NOTICE';
    case ATTENTION = 'ATTENTION';
    case FOLLOW_UP = 'FOLLOW_UP';

    public function badgeColor(): string
    {
        return match ($this) {
            self::INFO => 'blue',
            self::NOTICE => 'amber',
            self::ATTENTION => 'orange',
            self::FOLLOW_UP => 'red',
        };
    }
}
