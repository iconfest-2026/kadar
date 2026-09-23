<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\AiConversation;
use App\Services\Ai\AiAssistantService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AiChatController extends Controller
{
    public function __construct(
        protected AiAssistantService $aiService
    ) {}

    public function getHistory(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $conversation = AiConversation::where('user_id', $user->id)
            ->latest()
            ->with(['messages' => function ($query) {
                $query->orderBy('id', 'asc');
            }])
            ->first();

        return response()->json([
            'conversation_id' => $conversation?->id,
            'messages' => $conversation ? $conversation->messages->map(fn($m) => [
                'id' => $m->id,
                'role' => $m->role,
                'content' => $m->content,
                'created_at' => $m->created_at->toIso8601String(),
            ]) : [],
        ]);
    }

    public function sendMessage(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $validated = $request->validate([
            'message' => 'required|string|max:1000',
            'conversation_id' => 'nullable|integer|exists:ai_conversations,id',
        ]);

        $result = $this->aiService->chat(
            $user,
            $validated['message'],
            $validated['conversation_id'] ?? null
        );

        return response()->json($result);
    }

    /**
     * Get real-time status and rate-limiting telemetry of all AI providers.
     */
    public function getProviderStatus()
    {
        return response()->json([
            'providers' => $this->aiService->getDiagnostics(),
            'active_chain' => ['gemini', 'groq', 'cloudflare', 'fallback'],
            'timestamp' => now()->toIso8601String(),
        ]);
    }
}
