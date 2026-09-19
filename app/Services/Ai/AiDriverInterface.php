<?php

namespace App\Services\Ai;

interface AiDriverInterface
{
    /**
     * Generate response for conversation messages with context.
     *
     * @param array<int, array{role: string, content: string}> $messages
     * @param array<string, mixed> $context
     */
    public function generateResponse(array $messages, array $context = []): string;
}
