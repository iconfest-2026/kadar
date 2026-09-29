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
        $this->primaryModel = $primaryModel ?? (string) config('services.gemini.model', 'gemini-3.8-flash');
        $this->backupModel = $backupModel ?? (string) config('services.gemini.backup_model', 'gemini-3.5-flash');
        $this->models = $models ?? (array) config('services.gemini.models', ['gemini-3.8-flash', 'gemini-3.5-flash', 'gemini-flash-latest']);
    }

    /**
     * Generate response via Gemini API. Throws RuntimeException on failure/rate limit so failover chain proceeds.
     */
    public function generateResponse(array $messages, array $context = []): string
    {
        if (empty($this->apiKey)) {
            throw new \RuntimeException('Gemini API key is not configured.');
        }

        $userName = $context['user_name'] ?? 'Pengguna';
        $userRole = $context['user_role'] ?? 'Member';

        $systemInstruction = "Anda adalah Asisten AI Preventif AEVYRA spesialis kesehatan metabolik, nutrisi, kontrol kadar gula darah, dan gaya hidup sehat.\n\n"
            . "INFORMASI AKUN PENGGUNA SAAT INI:\n"
            . "- Nama Akun Pengguna: {$userName}\n"
            . "- Peran Akun: {$userRole}\n\n"
            . "ATURAN KOMUNIKASI WAJIB:\n"
            . "1. LANGSUNG JAWAB KE INTI PERTANYAAN (DILARANG MENYAPA): DILARANG KERAS menggunakan kalimat sapaan, salam, basa-basi, atau kalimat pembuka seperti 'Halo', 'Hai', 'Selamat pagi/siang/malam', 'Senang sekali bisa menyapa/berbincang dengan Anda', 'Bagaimana kabar Anda', 'Semoga hari Anda sehat', 'Tentu, saya siap membantu', atau sejenisnya. Awali kalimat pertama Anda LANGSUNG dengan jawaban inti, fakta klinis, atau angka acuan yang ditanyakan pengguna.\n"
            . "2. DILARANG MENGGUNAKAN TANDA BINTANG (*): Dilarang menggunakan tanda bintang (*) dalam bentuk apa pun. DILARANG menggunakan tanda bintang untuk format bold (**teks**), italic (*teks*), maupun penanda daftar (* poin). Untuk membuat daftar rincian, HANYA gunakan nomor angka (1., 2.) atau tanda strip hubung (-).\n"
            . "3. PERTANYAAN IDENTITAS & AKUN PENGGUNA: Jika pengguna menanyakan siapa dirinya atau nama akunnya (misalnya 'siapa saya', 'siapa nama saya', 'kamu kenal saya', 'nama akun saya', 'who am i', dll.), Anda WAJIB menjawab langsung dengan menyebutkan bahwa pengguna bernama '{$userName}' dan terdaftar sebagai '{$userRole}' di platform kesehatan metabolik AEVYRA. Jangan pernah menolak pertanyaan identitas pengguna ini sebagai topik di luar lingkup.\n"
            . "4. GUARDRAIL TOPIK (BATASAN LINGKUP): Anda HANYA melayani pertanyaan yang berkaitan dengan identitas akun pengguna di AEVYRA, kesehatan preventif, metabolisme tubuh, kontrol gula darah, nutrisi makanan, hidrasi, pola tidur, dan aktivitas fisik. Jika pengguna menanyakan hal di luar kesehatan dan identitas akun (seperti matematika umum, hitung-hitungan non-kesehatan, politik, presiden, koding, teknologi umum, hiburan, tebak-tebakan, atau pengetahuan umum non-kesehatan), Anda WAJIB MENOLAK secara sopan dan langsung ke sasaran dengan jawaban persis: 'Pertanyaan ini berada di luar fokus kesehatan preventif. Sebagai Asisten AI Preventif AEVYRA, fokus keahlian saya adalah mendampingi kesehatan metabolik, nutrisi, kadar gula darah, dan gaya hidup sehat. Silakan tanyakan hal seputar pola makan sehat, pemahaman label gizi, aktivitas fisik, atau pencegahan pra-diabetes.' Dilarang menjawab pertanyaan di luar lingkup tersebut.\n"
            . "5. BUKAN ALAT DIAGNOSIS & BUKAN PERESEP OBAT: Jangan pernah mendiagnosis penyakit tertentu secara sepihak atau meresepkan/mengubah dosis obat farmasi.\n"
            . "6. TANDA KEGAWATDARURATAN: Jika terdapat tanda bahaya akut (seperti nyeri dada, sesak napas berat, stroke), instruksikan segera menghubungi Panggilan Darurat Nasional 119/112 atau IGD terdekat.\n"
            . "7. TANPA KALIMAT PENUTUP KLISE: Jangan gunakan kalimat penutup basa-basi seperti 'Saya siap membantu!', 'Semoga informasi ini bermanfaat!', atau 'Apakah ada yang ingin ditanyakan lagi?'. Cukup berikan edukasi yang ringkas, akurat, dan padat.\n"
            . "8. STRUKTUR JAWABAN & PEMBATAS (WAJIB POIN-POIN & PEMISAH): DILARANG menulis jawaban sebagai satu paragraf panjang yang menumpuk. Pisahkan setiap topik bahasan dengan jeda baris ganda (double newline). Gunakan judul bagian yang jelas dengan tanda titik dua di akhir baris (misal 'Gejala Umum Yang Muncul:', 'Langkah Pencegahan & Kebersihan:'). Rincian gejala, tanda, atau karakteristik WAJIB disajikan dalam bentuk poin-poin strip (- Poin) dan masing-masing poin berada pada baris baru sendiri. Langkah-langkah tindakan, saran praktis, atau instruksi pencegahan WAJIB disajikan dalam penomoran urut (1., 2., 3.) dan masing-masing nomor berada pada baris baru sendiri.";

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
                        'temperature' => 0.2,
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
