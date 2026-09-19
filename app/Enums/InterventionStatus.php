<?php

namespace App\Enums;

enum InterventionStatus: string
{
    case DRAFT = 'DRAFT';
    case ACTIVE = 'ACTIVE';
    case IN_REVIEW = 'IN_REVIEW';
    case RESOLVED = 'RESOLVED';
    case CANCELLED = 'CANCELLED';
    case ADJUSTED = 'ADJUSTED';
}
