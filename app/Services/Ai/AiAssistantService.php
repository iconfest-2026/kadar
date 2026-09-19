<?php

namespace App\Services\Ai;

use App\Models\AiConversation;
use App\Models\AiMessage;
use App\Models\User;
use App\Services\Ai\Drivers\GeminiAiDriver;
use App\Services\Safety\ClinicalSafetyGuardService;
use Illuminate\Support\Facades\DB;

class AiAssistantService
{
    public function __construct(
        protected ClinicalSafetyGuardService $safetyGuard,
        protected GeminiAiDriver $driver
    ) {}

    /**
     * Send message to AI assistant and receive safe, context-aware reply.
     *
     * @return array{reply: string, is_safety_triggered: bool, trigger_type: ?string, conversation_id: int}
     */
    public function chat(User $user, string $userMessage, ?int $conversationId = null): array
    {
        // 1. Clinical safety inspection first
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

        // If safety boundary was breached
        if (!$safety['is_safe']) {
            // Log safety event
            DB::table('ai_safety_events')->insert([
                'conversation_id' => $conversation->id,
                'message_id' => null,
                'classification' => $safety['trigger_type'],
                'reason_code' => $safety['action_required'] ?? 'CLINICAL_GUARD',
                'action_taken' => 'SAFE_REFUSAL_RESPONSE',
                'created_at' => now(),
            ]);

            $reply = $safety['safe_response'];

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

        // Call AI Driver
        $reply = $this->driver->generateResponse($formatted);

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
        ];
    }
}
