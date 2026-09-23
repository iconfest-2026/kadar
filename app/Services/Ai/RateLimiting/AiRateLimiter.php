<?php

namespace App\Services\Ai\RateLimiting;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class AiRateLimiter
{
    /**
     * Check if a given provider is within safe RPM, RPD, and not in cooldown.
     *
     * @return array{allowed: bool, reason: ?string, rpm_current: int, rpm_limit: int, rpd_current: int, rpd_limit: int}
     */
    public function check(string $provider): array
    {
        $cooldownKey = "ai_cooldown:{$provider}";
        if (Cache::has($cooldownKey)) {
            $remaining = Cache::get($cooldownKey . ':ttl', 60);
            return [
                'allowed' => false,
                'reason' => "Provider {$provider} sedang cooldown (menghindari HTTP 429 berulang)",
                'rpm_current' => 0,
                'rpm_limit' => $this->getRpmLimit($provider),
                'rpd_current' => 0,
                'rpd_limit' => $this->getRpdLimit($provider),
            ];
        }

        $nowMinute = now()->format('Y-m-d_H-i');
        $rpmKey = "ai_rpm:{$provider}:{$nowMinute}";
        $rpmCurrent = (int) Cache::get($rpmKey, 0);
        $rpmLimit = $this->getRpmLimit($provider);

        if ($rpmCurrent >= $rpmLimit) {
            return [
                'allowed' => false,
                'reason' => "Batas RPM provider {$provider} tercapai ({$rpmCurrent}/{$rpmLimit})",
                'rpm_current' => $rpmCurrent,
                'rpm_limit' => $rpmLimit,
                'rpd_current' => $this->getRpdCurrent($provider),
                'rpd_limit' => $this->getRpdLimit($provider),
            ];
        }

        $rpdCurrent = $this->getRpdCurrent($provider);
        $rpdLimit = $this->getRpdLimit($provider);

        if ($rpdCurrent >= $rpdLimit) {
            return [
                'allowed' => false,
                'reason' => "Batas kuota harian (RPD) provider {$provider} tercapai ({$rpdCurrent}/{$rpdLimit})",
                'rpm_current' => $rpmCurrent,
                'rpm_limit' => $rpmLimit,
                'rpd_current' => $rpdCurrent,
                'rpd_limit' => $rpdLimit,
            ];
        }

        return [
            'allowed' => true,
            'reason' => null,
            'rpm_current' => $rpmCurrent,
            'rpm_limit' => $rpmLimit,
            'rpd_current' => $rpdCurrent,
            'rpd_limit' => $rpdLimit,
        ];
    }

    /**
     * Record a successful request consumption for this provider.
     */
    public function recordExecution(string $provider): void
    {
        $nowMinute = now()->format('Y-m-d_H-i');
        $rpmKey = "ai_rpm:{$provider}:{$nowMinute}";
        
        $rpm = (int) Cache::get($rpmKey, 0) + 1;
        Cache::put($rpmKey, $rpm, now()->addSeconds(70));

        $today = now()->format('Y-m-d');
        $rpdKey = "ai_rpd:{$provider}:{$today}";
        $rpd = (int) Cache::get($rpdKey, 0) + 1;
        Cache::put($rpdKey, $rpd, now()->endOfDay());

        Log::info("AI RateLimiter: Recorded request for [{$provider}] (RPM: {$rpm}/{$this->getRpmLimit($provider)}, RPD: {$rpd}/{$this->getRpdLimit($provider)})");
    }

    /**
     * Put a provider in cooldown when HTTP 429 or quota exhaustion is encountered.
     */
    public function recordRateLimitHit(string $provider, int $cooldownSeconds = 60, string $errorDetails = ''): void
    {
        $cooldownKey = "ai_cooldown:{$provider}";
        Cache::put($cooldownKey, true, now()->addSeconds($cooldownSeconds));
        Cache::put($cooldownKey . ':ttl', $cooldownSeconds, now()->addSeconds($cooldownSeconds));

        Log::warning("AI RateLimiter: Provider [{$provider}] hit rate limit or 429, entering {$cooldownSeconds}s cooldown.", [
            'error' => $errorDetails,
        ]);
    }

    public function getRpdCurrent(string $provider): int
    {
        $today = now()->format('Y-m-d');
        return (int) Cache::get("ai_rpd:{$provider}:{$today}", 0);
    }

    public function getRpmLimit(string $provider): int
    {
        return (int) config("services.{$provider}.rpm_limit", 30);
    }

    public function getRpdLimit(string $provider): int
    {
        return (int) config("services.{$provider}.rpd_limit", 1000);
    }

    /**
     * Get real-time diagnostic status of all configured AI providers.
     */
    public function getProvidersStatus(): array
    {
        $providers = ['gemini', 'groq', 'cloudflare', 'fallback'];
        $status = [];

        foreach ($providers as $p) {
            if ($p === 'fallback') {
                $status[$p] = [
                    'provider' => 'Fallback Rule Engine',
                    'is_online' => true,
                    'in_cooldown' => false,
                    'rpm' => 'Unlimited',
                    'rpd' => 'Unlimited',
                ];
                continue;
            }

            $hasKey = !empty(config("services.{$p}.api_key") ?: config("services.{$p}.api_token"));
            $cooldown = Cache::has("ai_cooldown:{$p}");
            $nowMinute = now()->format('Y-m-d_H-i');
            $rpm = (int) Cache::get("ai_rpm:{$p}:{$nowMinute}", 0);
            $rpd = $this->getRpdCurrent($p);

            $status[$p] = [
                'provider' => ucfirst($p),
                'configured' => $hasKey,
                'is_online' => $hasKey && !$cooldown,
                'in_cooldown' => $cooldown,
                'rpm' => "{$rpm} / " . $this->getRpmLimit($p),
                'rpd' => "{$rpd} / " . $this->getRpdLimit($p),
                'model' => config("services.{$p}.model"),
            ];
        }

        return $status;
    }
}
