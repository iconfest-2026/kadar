<?php

namespace App\Enums;

enum UserRole: string
{
    case MEMBER = 'member';
    case INSTRUCTOR = 'instructor';
    case ADMIN = 'admin';

    public function label(): string
    {
        return match ($this) {
            self::MEMBER => 'Member',
            self::INSTRUCTOR => 'Instructor',
            self::ADMIN => 'Administrator',
        };
    }
}
