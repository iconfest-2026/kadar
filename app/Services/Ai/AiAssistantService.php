<?php

namespace App\Services\Ai;

use App\Models\AiConversation;
use App\Models\AiMessage;
use App\Models\User;
use App\Services\Ai\Drivers\CloudflareAiDriver;
use App\Services\Ai\Drivers\FallbackAiDriver;
use App\Services\Ai\Drivers\GeminiAiDriver;
use App\Services\Ai\Drivers\GroqAiDriver;
use App\Services\Ai\RateLimiting\AiRateLimiter;
use App\Services\Safety\ClinicalSafetyGuardService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AiAssistantService
{
    public function __construct(
        protected ClinicalSafetyGuardService $safetyGuard,
        protected AiRateLimiter $rateLimiter,
        protected GeminiAiDriver $gemini,
        protected GroqAiDriver $groq,
        protected CloudflareAiDriver $cloudflare,
        protected FallbackAiDriver $fallback
    ) {}

    /**
     * Send message to AI assistant with clinical guardrails, multi-tier rate limiting, and failover:
     * Primary: Gemini -> Secondary: Groq -> Tertiary: Cloudflare -> Safety: Fallback Rule Engine.
     *
     * @return array{reply: string, is_safety_triggered: bool, trigger_type: ?string, conversation_id: int, provider_used: string}
     */
    public function chat(User $user, string $userMessage, ?int $conversationId = null): array
    {
        // 1. Clinical safety inspection first (P0 Guardrails)
        $safety = $this->safetyGuard->inspect($userMessage);

        // Find or create conversation
        $conversation = $conversationId
            ? AiConversation::where('id', $conversationId)->where('user_id', $user->id)->firstOrFail()
            : AiConversation::create([
                'user_id' => $user->id,
                'title' => mb_substr($userMessage, 0, 40) . (mb_strlen($userMessage) > 40 ? '...' : ''),
            ]);

        // Record User Message
        AiMessage::create([
            'conversation_id' => $conversation->id,
            'role' => 'user',
            'content' => $userMessage,
            'message_type' => 'TEXT',
        ]);

        // If safety boundary was breached (Prompt Injection, Acute Emergency, Medication Dosing, or Diagnosis)
        if (!$safety['is_safe']) {
            DB::table('ai_safety_events')->insert([
                'conversation_id' => $conversation->id,
                'message_id' => null,
                'classification' => $safety['trigger_type'],
                'reason_code' => $safety['action_required'] ?? 'CLINICAL_GUARD',
                'action_taken' => 'SAFE_REFUSAL_RESPONSE',
                'created_at' => now(),
            ]);

            $reply = $this->formatDirectResponse($safety['safe_response']);

            AiMessage::create([
                'conversation_id' => $conversation->id,
                'role' => 'assistant',
                'content' => $reply,
                'message_type' => 'TEXT',
            ]);

            return [
                'reply' => $reply,
                'is_safety_triggered' => true,
                'trigger_type' => $safety['trigger_type'],
                'conversation_id' => $conversation->id,
                'provider_used' => 'safety_guardrail',
            ];
        }

        // Resolve user role
        $userRole = 'Member';
        if ($user->hasRole('admin') || ($user->role ?? '') === 'admin') {
            $userRole = 'Administrator';
        } elseif ($user->hasRole('instructor') || ($user->role ?? '') === 'instructor') {
            $userRole = 'Instruktur Medis';
        }

        // Direct Account Identity Query handler (e.g. "siapa saya", "siapa nama saya", "nama akun saya apa", etc.)
        if ($this->isIdentityQuery($userMessage)) {
            $userName = $user->name ?: 'Member AEVYRA';
            $reply = "Anda adalah {$userName}, terdaftar sebagai {$userRole} di platform kesehatan metabolik AEVYRA. Saya siap mendampingi Anda memantau target glukosa harian, asupan nutrisi, pola hidrasi, dan kebiasaan hidup sehat Anda. Ada data kesehatan atau kebiasaan yang ingin Anda evaluasi hari ini?";
            $reply = $this->formatDirectResponse($reply);

            AiMessage::create([
                'conversation_id' => $conversation->id,
                'role' => 'assistant',
                'content' => $reply,
                'message_type' => 'TEXT',
            ]);

            return [
                'reply' => $reply,
                'is_safety_triggered' => false,
                'trigger_type' => null,
                'conversation_id' => $conversation->id,
                'provider_used' => 'identity_resolver',
            ];
        }

        // Gather recent messages for context
        $history = $conversation->messages()->latest()->take(6)->get()->reverse();
        $formatted = [];
        foreach ($history as $msg) {
            $formatted[] = [
                'role' => $msg->role,
                'content' => $msg->content,
            ];
        }

        // Context info (e.g. user details for preventive personalization)
        $context = [
            'user_id' => $user->id,
            'user_name' => $user->name,
            'user_role' => $userRole,
            'email' => $user->email,
            'gender' => $user->gender ?? 'UNKNOWN',
        ];

        // 2. Multi-tier failover chain: Gemini -> Groq -> Cloudflare -> Fallback Rule Engine
        $chain = [
            'gemini' => $this->gemini,
            'groq' => $this->groq,
            'cloudflare' => $this->cloudflare,
            'fallback' => $this->fallback,
        ];

        $reply = null;
        $providerUsed = 'fallback';

        foreach ($chain as $providerName => $driver) {
            if ($providerName !== 'fallback') {
                // Check Rate Limiter (RPM & RPD limits, and 429 cooldown)
                $rateCheck = $this->rateLimiter->check($providerName);
                if (!$rateCheck['allowed']) {
                    Log::info("AI Failover: Skipping [{$providerName}] due to rate limit/cooldown: {$rateCheck['reason']}");
                    continue;
                }
            }

            try {
                $response = $driver->generateResponse($formatted, $context);
                if (!empty($response)) {
                    $reply = $response;
                    $providerUsed = $providerName;

                    if ($providerName !== 'fallback') {
                        $this->rateLimiter->recordExecution($providerName);
                    }

                    Log::info("AI Response successfully generated by [{$providerName}]");
                    break;
                }
            } catch (\Throwable $e) {
                $msg = $e->getMessage();
                Log::warning("AI Provider [{$providerName}] encountered error, failing over to next tier: {$msg}");

                // If rate limit / quota 429 occurred, initiate cooldown
                if (str_contains($msg, '429') || str_contains(strtolower($msg), 'rate limit') || str_contains(strtolower($msg), 'quota')) {
                    $this->rateLimiter->recordRateLimitHit($providerName, 60, $msg);
                }
            }
        }

        // Safety fallback guarantees $reply is never null
        if (empty($reply)) {
            $reply = $this->fallback->generateResponse($formatted, $context);
            $providerUsed = 'fallback';
        }

        // Post-processing: strictly strip asterisks (*), remove opening greetings, and enforce direct answering
        $reply = $this->formatDirectResponse($reply);

        // Record Assistant Message
        AiMessage::create([
            'conversation_id' => $conversation->id,
            'role' => 'assistant',
            'content' => $reply,
            'message_type' => 'TEXT',
        ]);

        return [
            'reply' => $reply,
            'is_safety_triggered' => false,
            'trigger_type' => null,
            'conversation_id' => $conversation->id,
            'provider_used' => $providerUsed,
        ];
    }

    /**
     * Strictly format response:
     * 1. Remove all asterisks (*) completely (no bold, no italic, no * bullet)
     * 2. Remove opening pleasantries / greetings so the answer starts directly
     * 3. Clean trailing repetitive pleasantries
     */
    public function formatDirectResponse(string $text): string
    {
        // 1. Remove all asterisks (*) completely
        $text = str_replace('*', '', $text);

        // 2. Remove opening pleasantries, greetings, and chit-chat openers at the beginning
        $openingPatterns = [
            // "Halo! Senang sekali bisa menyapa Anda. 😊"
            '/^(\s|[\p{Emoji}\p{So}\p{Sk}])*(halo|hai|selamat (pagi|siang|sore|malam)|assalamu[\'\w]*|salam sejahtera)[^.\n?!]*[.\n?!]*/iu',
            // "Senang sekali bisa menyapa/berbincang dengan Anda hari ini..."
            '/^(\s|[\p{Emoji}\p{So}\p{Sk}])*senang sekali bisa (menyapa|berbincang|berdiskusi|membantu)[^.\n?!]*[.\n?!]*/iu',
            // "Bagaimana kabar dan kondisi Anda hari ini?..."
            '/^(\s|[\p{Emoji}\p{So}\p{Sk}])*bagaimana kabar[^.\n?!]*[.\n?!]*/iu',
            // "Semoga hari Anda berjalan dengan baik dan sehat, ya!..."
            '/^(\s|[\p{Emoji}\p{So}\p{Sk}])*semoga hari anda[^.\n?!]*[.\n?!]*/iu',
            // "Tentu, saya siap membantu!..." or "Tentu, ini adalah..."
            '/^(\s|[\p{Emoji}\p{So}\p{Sk}])*tentu( saja)?,? (saya siap membantu|mari kita bahas|berikut ini)[^.\n?!]*[.\n?!]*/iu',
            // "Apakah ada topik seputar gaya hidup sehat yang ingin Anda diskusikan hari ini?..."
            '/^(\s|[\p{Emoji}\p{So}\p{Sk}])*apakah ada topik seputar gaya hidup sehat[^.\n?!]*[.\n?!]*/iu',
            // "Kita bisa mendiskusikan berbagai hal, seperti:..."
            '/^(\s|[\p{Emoji}\p{So}\p{Sk}])*kita bisa (ngobrol|berdiskusi|mendiskusikan)[^.\n?!]*:?\s*/iu',
            // "Saya siap membantu!..."
            '/^(\s|[\p{Emoji}\p{So}\p{Sk}])*saya siap membantu[!.\s]*/iu',
            // "Terima kasih sudah bertanya..."
            '/^(\s|[\p{Emoji}\p{So}\p{Sk}])*terima kasih sudah (bertanya|menghubungi)[^.\n?!]*[.\n?!]*/iu',
        ];

        // Peel multiple consecutive greeting sentences & leading emojis (up to 6 iterations)
        for ($i = 0; $i < 6; $i++) {
            $prev = $text;
            // Strip leading emojis and whitespace
            $text = preg_replace('/^[\s\p{Emoji}\p{So}\p{Sk}\p{C}]+/u', '', $text);
            foreach ($openingPatterns as $pattern) {
                $text = preg_replace($pattern, '', $text);
                $text = preg_replace('/^[\s\p{Emoji}\p{So}\p{Sk}\p{C}]+/u', '', $text);
            }
            if ($text === $prev) {
                break;
            }
        }

        // 3. Remove trailing repetitive pleasantries if present at the end
        $trailingPatterns = [
            '/\s*semoga (informasi ini )?(membantu|bermanfaat)[\.!\s]*$/iu',
            '/\s*apakah ada hal lain yang ingin (anda )?tanyakan[\.\?!?\s]*$/iu',
            '/\s*saya siap membantu[\.!\s]*$/iu',
            '/\s*tetap semangat menjaga kesehatan[\.!\s]*$/iu',
        ];
        foreach ($trailingPatterns as $tPattern) {
            $text = preg_replace($tPattern, '', $text);
        }

        // 4. Normalize structured lists, bullet points, and headers so items are never squashed into a single paragraph
        // Ensure bullet points (- or •) are on their own lines with clear separation
        $text = preg_replace('/([^\n])\s*[-•]\s+/u', "$1\n- ", $text);
        // Ensure numbered list items (e.g. 1. , 2. ) are on their own lines
        $text = preg_replace('/([^\n])\s+(\d+)\.\s+/u', "$1\n$2. ", $text);
        // Ensure section titles (lines ending with colon :) have a line break before them
        $text = preg_replace('/([^\n])\n([A-Z\p{Lu}][^\n:]{2,60}:)/u', "$1\n\n$2", $text);

        $text = trim(preg_replace("/\n{3,}/", "\n\n", $text));

        // If stripped text became empty or only contains residual punctuation/emojis, provide direct guidance
        $meaningfulContent = trim(preg_replace('/[\p{P}\s\p{Emoji}\p{So}\p{Sk}\p{C}]+/u', '', $text));
        if (mb_strlen($meaningfulContent) < 10) {
            $text = "Silakan tanyakan hal spesifik seputar gizi harian, kontrol kadar gula darah, pola tidur, atau aktivitas fisik preventif Anda.";
        }

        return $text;
    }

    /**
     * Determine if user's prompt is asking about their identity, name, or account.
     */
    public function isIdentityQuery(string $text): bool
    {
        $normalized = mb_strtolower(trim($text), 'UTF-8');
        $clean = trim(preg_replace('/[^\p{L}\p{N}\s]/u', '', $normalized));
        $clean = preg_replace('/\s+/', ' ', $clean);

        if (empty($clean)) {
            return false;
        }

        $exactPatterns = [
            'siapa saya',
            'siapakah saya',
            'siapa diriku',
            'siapa nama saya',
            'nama saya siapa',
            'nama akun saya',
            'nama akun saya apa',
            'siapa nama akun saya',
            'nama akun',
            'kamu tahu siapa saya',
            'apakah kamu tahu siapa saya',
            'tahu siapa saya',
            'apakah anda tahu siapa saya',
            'kamu kenal saya',
            'kamu kenal saya gak',
            'kamu kenal saya tidak',
            'apakah kamu kenal saya',
            'apakah anda kenal saya',
            'kenal saya',
            'kenal saya gak',
            'kenal saya tidak',
            'kenal aku',
            'siapa aku',
            'nama aku siapa',
            'siapa nama aku',
            'siapa akun saya',
            'akun saya siapa',
            'siapa profil saya',
            'identitas saya',
            'siapa yang sedang bicara',
            'kamu bicara dengan siapa',
            'who am i',
            'what is my name',
            'do you know who i am',
            'do you know my name',
        ];

        foreach ($exactPatterns as $pattern) {
            if ($clean === $pattern || str_starts_with($clean, $pattern . ' ') || str_ends_with($clean, ' ' . $pattern) || str_contains($clean, ' ' . $pattern . ' ')) {
                return true;
            }
        }

        // Check stripped conversational fillers (e.g. "woi siapa saya", "halo siapa saya dong")
        $words = explode(' ', $clean);
        $filteredWords = array_values(array_filter($words, fn($w) => !in_array($w, ['halo', 'hai', 'woi', 'oi', 'hei', 'permisi', 'dong', 'ya', 'sih', 'coba', 'tolong', 'lah', 'kah', 'nih', 'tuh', 'bisa'])));
        $filteredText = implode(' ', $filteredWords);

        foreach ($exactPatterns as $pattern) {
            if ($filteredText === $pattern) {
                return true;
            }
        }

        if ((str_contains($clean, 'siapa') || str_contains($clean, 'kenal') || str_contains($clean, 'tahu')) &&
            (str_contains($clean, 'nama saya') || str_contains($clean, 'akun saya') || str_contains($clean, 'profil saya') || str_contains($clean, 'diri saya') || str_contains($clean, 'identitas saya') || str_contains($clean, 'nama aku') || str_contains($clean, 'akun aku'))) {
            return true;
        }

        return false;
    }

    /**
     * Get real-time health and rate limit telemetry of all AI providers.
     */
    public function getDiagnostics(): array
    {
        return $this->rateLimiter->getProvidersStatus();
    }
}
