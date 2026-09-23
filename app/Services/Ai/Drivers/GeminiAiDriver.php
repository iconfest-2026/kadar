<?php

namespace App\Services\Ai\Drivers;

use App\Services\Ai\AiDriverInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiAiDriver implements AiDriverInterface
{
    protected string $apiKey;
    protected string $primaryModel;
    protected string $backupModel;
    protected array $models;

    public function __construct(?string $apiKey = null, ?string $primaryModel = null, ?string $backupModel = null, ?array $models = null)
    {
        $this->apiKey = $apiKey ?? (string) config('services.gemini.api_key', env('GEMINI_API_KEY', ''));
        $this->primaryModel = $primaryModel ?? (string) config('services.gemini.model', 'gemini-2.5-flash');
        $this->backupModel = $backupModel ?? (string) config('services.gemini.backup_model', 'gemini-1.5-flash');
        $this->models = $models ?? (array) config('services.gemini.models', []);
    }

    /**
     * Generate response via Gemini API. Throws RuntimeException on failure/rate limit so failover chain proceeds.
     */
    public function generateResponse(array $messages, array $context = []): string
    {
        if (empty($this->apiKey)) {
            throw new \RuntimeException('Gemini API key is not configured.');
        }

        $systemInstruction = "Anda adalah Asisten Kesehatan Preventif AEVYRA yang ramah, berbasis bukti, dan empatis.\n"
            . "Prinsip Utama:\n"
            . "1. BUKAN ALAT DIAGNOSIS MEDIS. Jangan pernah mendiagnosis penyakit tertentu.\n"
            . "2. JANGAN PERNAH meresepkan obat atau menganjurkan pengubahan dosis obat farmasi.\n"
            . "3. Gunakan bahasa observasi terkalibrasi, fokus pada gaya hidup preventif (tidur, hidrasi, aktivitas, nutrisi).\n"
            . "4. Jika ada indikasi kegawatdaruratan, arahkan segera ke Panggilan Darurat Nasional 119/112.";

        $contents = [];
        foreach ($messages as $msg) {
            $role = ($msg['role'] ?? '') === 'assistant' ? 'model' : 'user';
            $contents[] = [
                'role' => $role,
                'parts' => [['text' => (string) ($msg['content'] ?? '')]],
            ];
        }

        // Try primary, backup, and all models in the pool
        $modelsToAttempt = !empty($this->models)
            ? array_values(array_unique(array_filter(array_merge([$this->primaryModel, $this->backupModel], $this->models))))
            : [$this->primaryModel, $this->backupModel, 'gemini-1.5-flash-8b'];
        $lastException = null;

        foreach ($modelsToAttempt as $model) {
            try {
                $endpoint = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key=" . urlencode($this->apiKey);

                $response = Http::timeout(12)->post($endpoint, [
                    'system_instruction' => [
                        'parts' => [['text' => $systemInstruction]],
                    ],
                    'contents' => $contents,
                    'generationConfig' => [
                        'temperature' => 0.4,
                        'maxOutputTokens' => 800,
                    ],
                ]);

                if ($response->successful()) {
                    $data = $response->json();
                    $reply = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;
                    if (!empty($reply)) {
                        return trim($reply);
                    }
                }

                $status = $response->status();
                $body = $response->body();

                // If 429 Rate Limit or Quota Exceeded
                if ($status === 429) {
                    throw new \RuntimeException("Gemini rate limit exceeded (HTTP 429) on model {$model}");
                }

                Log::warning("Gemini model {$model} returned status {$status}: {$body}");
                $lastException = new \RuntimeException("Gemini model {$model} failed with HTTP {$status}");
            } catch (\Throwable $e) {
                Log::warning("Gemini attempt on {$model} failed: " . $e->getMessage());
                $lastException = $e;
                if ($e->getMessage() && str_contains(strtolower($e->getMessage()), '429')) {
                    throw $e; // Immediately propagate 429 so failover handles cooldown
                }
            }
        }

        throw $lastException ?? new \RuntimeException("Gemini API could not generate response.");
    }
}
