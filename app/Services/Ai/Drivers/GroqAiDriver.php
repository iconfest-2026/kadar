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
                    'temperature' => 0.2,
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
