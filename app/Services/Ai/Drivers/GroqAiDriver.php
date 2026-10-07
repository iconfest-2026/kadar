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
        $modelsToAttempt = array_values(array_unique(array_filter(array_merge(
            ['openai/gpt-oss-120b', 'qwen/qwen3.8-27b', 'openai/gpt-oss-20b'],
            !empty($this->models) ? $this->models : [],
            [$this->primaryModel, $this->backupModel]
        ))));
        $lastException = null;

        foreach ($modelsToAttempt as $model) {
            try {
                $response = Http::withHeaders([
                    'Authorization' => 'Bearer ' . $this->apiKey,
                    'Content-Type' => 'application/json',
                ])->timeout(12)->post('https://api.groq.com/openai/v1/chat/completions', [
                    'model' => $model,
                    'messages' => $groqMessages,
                    'temperature' => 0.7,
                    'max_tokens' => 1200,
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
