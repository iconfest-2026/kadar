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
            $reply = "Halo {$userName}! Anda terdaftar sebagai {$userRole} di platform kesehatan & kesejahteraan holistik AEVYRA.\n\nSebagai asisten AI dan teman curhat Anda, saya siap mendampingi target kesehatan fisik (glukosa, nutrisi, hidrasi, tidur) maupun kesehatan mental Anda (manajemen stres, overthinking, atau sekadar teman bicara saat Anda butuh didengarkan). Ada hal yang sedang Anda pikirkan atau ingin dievaluasi hari ini?";
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
     * Format response cleanly:
     * 1. Remove markdown asterisks (*) for clean plain-text reading
     * 2. Strip emojis from responses as instructed
     * 3. Normalize lists and spacing so bullet points and numbered points render cleanly
     */
    public function formatDirectResponse(string $text): string
    {
        // 1. Remove markdown asterisks (*)
        $text = str_replace('*', '', $text);

        // 2. Strip emojis from AI responses for clean, professional reading
        $text = preg_replace('/[\x{1F600}-\x{1F64F}\x{1F300}-\x{1F5FF}\x{1F680}-\x{1F6FF}\x{1F900}-\x{1F9FF}\x{1FA00}-\x{1FAFF}\x{2600}-\x{26FF}\x{2700}-\x{27BF}\x{FE0F}\x{200D}]/u', '', $text);
        $text = preg_replace('/[ ]{2,}/', ' ', $text);
        $text = preg_replace('/ ([.,!?:;])/', '$1', $text);

        // 3. Normalize structured lists, bullet points, and headers
        // Ensure bullet points (- or •) are on their own lines with clear separation
        $text = preg_replace('/([^\n])\s*[-•]\s+/u', "$1\n- ", $text);
        // Ensure numbered list items (e.g. 1. , 2. ) are on their own lines
        $text = preg_replace('/([^\n])\s+(\d+)\.\s+/u', "$1\n$2. ", $text);
        // Ensure section titles (lines ending with colon :) have clean separation
        $text = preg_replace('/([^\n])\n([A-Z\p{Lu}][^\n:]{2,60}:)/u', "$1\n\n$2", $text);

        // Remove excessive empty lines
        $text = trim(preg_replace("/\n{3,}/", "\n\n", $text));

        // If response is somehow empty, provide warm holistic welcome
        if (empty($text)) {
            $text = "Halo! Saya siap mendampingi Anda. Silakan ceritakan apa yang sedang Anda rasakan — baik seputar kesehatan fisik metabolik maupun curhat tentang pikiran dan emosi Anda.";
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
