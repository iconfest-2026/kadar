<?php

namespace App\Enums;

enum MetricType: string
{
    case BLOOD_GLUCOSE = 'blood_glucose';
    case SLEEP_DURATION = 'sleep_duration';
    case SLEEP_QUALITY = 'sleep_quality';
    case STEPS = 'steps';
    case ACTIVE_MINUTES = 'active_minutes';
    case WATER_INTAKE = 'water_intake';
    case WEIGHT = 'weight';
    case MOOD_SCORE = 'mood_score';
    case ENERGY_LEVEL = 'energy_level';
    case MEAL_RECORD = 'meal_record';

    public function canonicalUnit(): string
    {
        return match ($this) {
            self::BLOOD_GLUCOSE => 'mg/dL',
            self::SLEEP_DURATION, self::ACTIVE_MINUTES => 'minutes',
            self::STEPS => 'steps',
            self::WATER_INTAKE => 'ml',
            self::WEIGHT => 'kg',
            self::SLEEP_QUALITY, self::MOOD_SCORE, self::ENERGY_LEVEL => 'score',
            self::MEAL_RECORD => 'servings',
        };
    }

    public function label(): string
    {
        return match ($this) {
            self::BLOOD_GLUCOSE => 'Gula Darah',
            self::SLEEP_DURATION => 'Durasi Tidur',
            self::SLEEP_QUALITY => 'Kualitas Tidur',
            self::STEPS => 'Langkah Kaki',
            self::ACTIVE_MINUTES => 'Menit Aktif',
            self::WATER_INTAKE => 'Asupan Air',
            self::WEIGHT => 'Berat Badan',
            self::MOOD_SCORE => 'Suasana Hati',
            self::ENERGY_LEVEL => 'Tingkat Energi',
            self::MEAL_RECORD => 'Catatan Makanan',
        };
    }
}
