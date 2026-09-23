<?php

namespace App\Services\Ai\Drivers;

use App\Services\Ai\AiDriverInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiAiDriver implements AiDriverInterface
{
    protected string $apiKey;
    protected string $model;
    protected FallbackAiDriver $fallback;

    public function __construct(?string $apiKey = null, string $model = 'gemini-2.5-flash')
    {
        $this->apiKey = $apiKey ?? config('services.gemini.api_key', (string) env('GEMINI_API_KEY', ''));
        $this->model = $model;
        $this->fallback = new FallbackAiDriver();
    }

    public function generateResponse(array $messages, array $context = []): string
    {
        // If API key is empty, smoothly delegate to fallback driver
        if (empty($this->apiKey)) {
            return $this->fallback->generateResponse($messages, $context);
        }

        try {
            $systemInstruction = "Anda adalah Asisten Kesehatan Preventif AEVYRA yang ramah, berbasis bukti, dan empatis. "
                . "Prinsip mutlak: "
                . "1. BUKAN ALAT DIAGNOSIS MEDIS. Jangan pernah mendiagnosis penyakit tertentu. "
                . "2. JANGAN PERNAH meresepkan obat atau menganjurkan pengubahan dosis obat. "
                . "3. Gunakan bahasa observasi terkalibrasi dan dukung otonomi pengguna. "
                . "4. Jika ada indikasi kegawatdaruratan, arahkan segera ke 119/112.";

            $contents = [];
            foreach ($messages as $msg) {
                $role = $msg['role'] === 'assistant' ? 'model' : 'user';
                $contents[] = [
                    'role' => $role,
                    'parts' => [['text' => $msg['content']]],
                ];
            }

            $endpoint = "https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent?key={$this->apiKey}";

            $response = Http::timeout(10)->post($endpoint, [
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

            Log::warning('Gemini API returned unhandled status, falling back to rule engine.', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
        } catch (\Throwable $e) {
            Log::error('Gemini API call failed: ' . $e->getMessage());
        }

        return $this->fallback->generateResponse($messages, $context);
    }
}
