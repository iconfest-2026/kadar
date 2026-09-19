<?php

namespace App\Enums;

enum ResultType: string
{
    case IMPROVING = 'IMPROVING';
    case STABLE = 'STABLE';
    case UNCHANGED = 'UNCHANGED';
    case DECLINING = 'DECLINING';
    case INSUFFICIENT_DATA = 'INSUFFICIENT_DATA';
}
