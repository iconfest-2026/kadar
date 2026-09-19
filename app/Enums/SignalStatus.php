<?php

namespace App\Enums;

enum SignalStatus: string
{
    case DETECTED = 'DETECTED';
    case QUALIFIED = 'QUALIFIED';
    case PRESENTED = 'PRESENTED';
    case ACTED_ON = 'ACTED_ON';
    case RESOLVED = 'RESOLVED';
    case DISMISSED = 'DISMISSED';
}
