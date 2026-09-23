<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SystemSetting extends Model
{
    protected $fillable = [
        'key',
        'value',
        'type',
        'group',
        'description',
    ];

    /**
     * Get setting value with fallback
     */
    public static function get(string $key, mixed $default = null): mixed
    {
        $setting = static::where('key', $key)->first();
        if (!$setting) {
            return $default;
        }

        return match ($setting->type) {
            'integer' => (int) $setting->value,
            'boolean' => filter_var($setting->value, FILTER_VALIDATE_BOOLEAN),
            'json' => json_decode($setting->value, true) ?? $default,
            default => $setting->value,
        };
    }

    /**
     * Set or update setting value
     */
    public static function set(string $key, mixed $value, string $type = 'string', string $group = 'general', ?string $description = null): static
    {
        $formattedValue = is_array($value) || is_object($value) ? json_encode($value) : (string) $value;

        return static::updateOrCreate(
            ['key' => $key],
            [
                'value' => $formattedValue,
                'type' => $type,
                'group' => $group,
                'description' => $description,
            ]
        );
    }
}

