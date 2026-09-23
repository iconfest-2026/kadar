<?php

namespace App\Services\Ai\Drivers;

use App\Services\Ai\AiDriverInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CloudflareAiDriver implements AiDriverInterface
{
    protected string $apiToken;
    protected ?string $accountId;
    protected string $model;
    protected array $models;

    public function __construct(?string $apiToken = null, ?string $accountId = null, ?string $model = null, ?array $models = null)
    {
        $this->apiToken = $apiToken ?? (string) config('services.cloudflare.api_token', env('CLOUDFLARE_API_TOKEN', ''));
        $this->accountId = $accountId ?? config('services.cloudflare.account_id', env('CLOUDFLARE_ACCOUNT_ID'));
        $this->model = $model ?? (string) config('services.cloudflare.model', '@cf/meta/llama-3.1-8b-instruct');
        $this->models = $models ?? (array) config('services.cloudflare.models', []);
    }

    /**
     * Generate response via Cloudflare Workers AI. Throws RuntimeException on failure/rate limit so failover chain proceeds.
     */
    public function generateResponse(array $messages, array $context = []): string
    {
        if (empty($this->apiToken)) {
            throw new \RuntimeException('Cloudflare API token is not configured.');
        }

        if (empty($this->accountId)) {
            throw new \RuntimeException('Cloudflare Account ID is required for Workers AI.');
        }

        $systemInstruction = "Anda adalah Asisten Kesehatan Preventif AEVYRA yang ramah, berbasis bukti, dan empatis.\n"
            . "Prinsip Utama:\n"
            . "1. BUKAN ALAT DIAGNOSIS MEDIS. Jangan pernah mendiagnosis penyakit tertentu.\n"
            . "2. JANGAN PERNAH meresepkan obat atau menganjurkan pengubahan dosis obat farmasi.\n"
            . "3. Gunakan bahasa observasi terkalibrasi, fokus pada gaya hidup preventif (tidur, hidrasi, aktivitas, nutrisi).\n"
            . "4. Jika ada indikasi kegawatdaruratan, arahkan segera ke Panggilan Darurat Nasional 119/112.";

        $cfMessages = [
            ['role' => 'system', 'content' => $systemInstruction],
        ];

        foreach ($messages as $msg) {
            $role = in_array($msg['role'] ?? '', ['assistant', 'system']) ? $msg['role'] : 'user';
            $cfMessages[] = [
                'role' => $role,
                'content' => (string) ($msg['content'] ?? ''),
            ];
        }

        $modelsToAttempt = !empty($this->models)
            ? array_values(array_unique(array_filter(array_merge([$this->model], $this->models))))
            : [$this->model, '@cf/meta/llama-3.3-70b-instruct', '@cf/mistral/mistral-7b-instruct-v0.2'];

        $lastException = null;

        foreach ($modelsToAttempt as $model) {
            try {
                $endpoint = "https://api.cloudflare.com/client/v4/accounts/{$this->accountId}/ai/run/{$model}";

                $response = Http::withHeaders([
                    'Authorization' => 'Bearer ' . $this->apiToken,
                    'Content-Type' => 'application/json',
                ])->timeout(12)->post($endpoint, [
                    'messages' => $cfMessages,
                    'max_tokens' => 800,
                ]);

                if ($response->successful()) {
                    $data = $response->json();
                    $reply = $data['result']['response'] ?? null;
                    if (!empty($reply)) {
                        return trim($reply);
                    }
                }

                $status = $response->status();
                $body = $response->body();

                if ($status === 429) {
                    throw new \RuntimeException("Cloudflare Workers AI rate limit exceeded (HTTP 429) on model {$model}");
                }

                Log::warning("Cloudflare Workers AI model {$model} returned status {$status}: {$body}");
                $lastException = new \RuntimeException("Cloudflare Workers AI model {$model} failed with HTTP {$status}");
            } catch (\Throwable $e) {
                Log::warning("Cloudflare attempt on {$model} failed: " . $e->getMessage());
                $lastException = $e;
                if ($e->getMessage() && str_contains(strtolower($e->getMessage()), '429')) {
                    throw $e;
                }
            }
        }

        throw $lastException ?? new \RuntimeException("Cloudflare Workers AI failed to generate response.");
    }
}
