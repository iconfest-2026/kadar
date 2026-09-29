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
