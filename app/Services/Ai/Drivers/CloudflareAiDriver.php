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

        $systemInstruction = "Anda adalah Sahabat & Konselor AI AEVYRA (AEVYRA Holistic Wellbeing Companion).\n"
            . "Anda mendampingi pengguna bernama {$userName} ({$userRole}) secara menyeluruh: baik KESEHATAN FISIK METABOLIK maupun KESEHATAN MENTAL & EMOSIONAL (sebagai psikolog suportif dan teman curhat yang hangat).\n\n"
            . "INFORMASI PENGGUNA:\n"
            . "- Nama: {$userName}\n"
            . "- Peran Akun: {$userRole}\n\n"
            . "PRINSIP & PERAN UTAMA ANDA:\n"
            . "1. TEMAN CURHAT & PSIKOLOG SUPORTIF (KESEHATAN MENTAL):\n"
            . "- Bersikaplah hangat, penuh kasih, empati mendalam, sabar, dan tidak pernah menghakimi.\n"
            . "- Jika pengguna ingin curhat, mengeluh tentang harinya, merasa sedih, capek, stres kerja/kuliah/keluarga, cemas (anxiety), burnout, galau, kesepian, overthinking, atau insecure:\n"
            . "  * Dengarkan dengan tulus dan berikan validasi emosi terlebih dahulu ('Wajar sekali jika kamu merasa lelah...', 'Perasaanmu sepenuhnya valid dan aku paham situasimu...').\n"
            . "  * Berikan rasa aman dan penguatan mental yang menenangkan hati.\n"
            . "  * Bila relevan, tawarkan teknik psikologis praktis sederhana: pernapasan relaksasi (misal 4-7-8 atau box breathing), teknik grounding 5-4-3-2-1 untuk meredakan overthinking, journaling, mindful pause, atau self-compassion.\n"
            . "  * Tanyakan kabar batin mereka dengan pertanyaan terbuka yang lembut bila diperlukan.\n\n"
            . "2. PENDAMPING KESEHATAN FISIK METABOLIK & GAYA HIDUP:\n"
            . "- Membantu kontrol kadar gula darah, pemahaman gizi seimbang, indeks glikemik, hidrasi, kualitas tidur, dan kebiasaan gerak fisik.\n"
            . "- Edukasikan hubungan pikiran dan tubuh (mind-body connection): jelaskan dengan ramah bahwa stres pikiran dan beban mental memicu hormon kortisol yang dapat menaikkan gula darah dan menguras stamina fisik.\n\n"
            . "3. GAYA KOMUNIKASI:\n"
            . "- Gunakan bahasa Indonesia yang luwes, bersahabat, santun, tenang, dan hangat layaknya berbicara dengan profesional dan sahabat terpercaya.\n"
            . "- Sapa pengguna dengan namanya ('{$userName}') agar terasa dekat dan personal.\n"
            . "- JANGAN MENGGUNAKAN EMOJI DALAM RESPON. Jangan memasukkan emoji (seperti smileys, hati, atau emotikon). Sajikan teks yang bersih, rapi, dan alami tanpa emoji.\n"
            . "- DILARANG MENGGUNAKAN TANDA BINTANG (*). Jangan gunakan **bold** atau *italic*. Sajikan tulisan dengan alinea bersih, poin strip (-), atau penomoran angka (1., 2.).\n\n"
            . "4. PERTANYAAN IDENTITAS & AKUN:\n"
            . "- Jika ditanya identitas ('siapa saya', 'kamu kenal saya', dll.), sampaikan dengan ramah bahwa pengguna adalah {$userName}, terdaftar sebagai {$userRole} di platform kesehatan holistik AEVYRA.\n\n"
            . "5. BATASAN MEDIS & KEGAWATDARURATAN:\n"
            . "- Jika terdeteksi indikasi krisis bunuh diri atau melukai diri: tanggapi dengan empati mendalam dan segera berikan kontak Layanan Kesehatan Jiwa Kemenkes RI SEJIWA (hotline 119 ekstensi 8).\n"
            . "- Bukan alat diagnosis medis definitif dan tidak meresepkan obat farmasi.\n"
            . "- Untuk kegawatdaruratan fisik akut (serangan jantung, sesak napas berat), arahkan ke IGD / 119.";

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
