<?php

namespace App\Services\Ai\Drivers;

use App\Services\Ai\AiDriverInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GroqAiDriver implements AiDriverInterface
{
    protected string $apiKey;
    protected string $primaryModel;
    protected string $backupModel;
    protected array $models;

    public function __construct(?string $apiKey = null, ?string $primaryModel = null, ?string $backupModel = null, ?array $models = null)
    {
        $this->apiKey = $apiKey ?? (string) config('services.groq.api_key', env('GROQ_API_KEY', ''));
        $this->primaryModel = $primaryModel ?? (string) config('services.groq.model', 'openai/gpt-oss-120b');
        $this->backupModel = $backupModel ?? (string) config('services.groq.backup_model', 'qwen/qwen3.8-27b');
        $this->models = $models ?? (array) config('services.groq.models', []);
    }

    /**
     * Generate response via Groq Cloud API. Throws RuntimeException on failure/rate limit so failover chain proceeds.
     */
    public function generateResponse(array $messages, array $context = []): string
    {
        if (empty($this->apiKey)) {
            throw new \RuntimeException('Groq API key is not configured.');
        }

        $systemInstruction = "Anda adalah Asisten Kesehatan Preventif AEVYRA yang ramah, berbasis bukti, dan empatis.\n"
            . "Prinsip Utama:\n"
            . "1. BUKAN ALAT DIAGNOSIS MEDIS. Jangan pernah mendiagnosis penyakit tertentu.\n"
            . "2. JANGAN PERNAH meresepkan obat atau menganjurkan pengubahan dosis obat farmasi.\n"
            . "3. Gunakan bahasa observasi terkalibrasi, fokus pada gaya hidup preventif (tidur, hidrasi, aktivitas, nutrisi).\n"
            . "4. Jika ada indikasi kegawatdaruratan, arahkan segera ke Panggilan Darurat Nasional 119/112.";

        $groqMessages = [
            ['role' => 'system', 'content' => $systemInstruction],
        ];

        foreach ($messages as $msg) {
            $role = in_array($msg['role'] ?? '', ['assistant', 'system']) ? $msg['role'] : 'user';
            $groqMessages[] = [
                'role' => $role,
                'content' => (string) ($msg['content'] ?? ''),
            ];
        }

        // Try primary, backup, and all models in the pool
        $modelsToAttempt = !empty($this->models)
            ? array_values(array_unique(array_filter(array_merge([$this->primaryModel, $this->backupModel], $this->models))))
            : [$this->primaryModel, $this->backupModel, 'openai/gpt-oss-20b'];
        $lastException = null;

        foreach ($modelsToAttempt as $model) {
            try {
                $response = Http::withHeaders([
                    'Authorization' => 'Bearer ' . $this->apiKey,
                    'Content-Type' => 'application/json',
                ])->timeout(12)->post('https://api.groq.com/openai/v1/chat/completions', [
                    'model' => $model,
                    'messages' => $groqMessages,
                    'temperature' => 0.5,
                    'max_tokens' => 800,
                ]);

                if ($response->successful()) {
                    $data = $response->json();
                    $reply = $data['choices'][0]['message']['content'] ?? null;
                    if (!empty($reply)) {
                        return trim($reply);
                    }
                }

                $status = $response->status();
                $body = $response->body();

                if ($status === 429) {
                    throw new \RuntimeException("Groq rate limit exceeded (HTTP 429) on model {$model}");
                }

                Log::warning("Groq model {$model} returned status {$status}: {$body}");
                $lastException = new \RuntimeException("Groq model {$model} failed with HTTP {$status}");
            } catch (\Throwable $e) {
                Log::warning("Groq attempt on {$model} failed: " . $e->getMessage());
                $lastException = $e;
                if ($e->getMessage() && str_contains(strtolower($e->getMessage()), '429')) {
                    throw $e;
                }
            }
        }

        throw $lastException ?? new \RuntimeException("Groq API could not generate response.");
    }
}
