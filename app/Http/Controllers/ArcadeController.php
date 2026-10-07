<?php

namespace App\Http\Controllers;

use App\Models\ArcadeScore;
use App\Models\PointsLedger;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ArcadeController extends Controller
{
    /**
     * Render the Arcade gamification hub with live community leaderboard.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Arcade', [
            'leaderboard' => $this->getLeaderboardData(),
        ]);
    }

    /**
     * Save runner score from authenticated users and return refreshed leaderboard.
     */
    public function storeScore(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'score' => ['required', 'integer', 'min:0', 'max:500000'],
            'tir' => ['nullable', 'string', 'max:20'],
            'character' => ['nullable', 'string', 'max:100'],
            'distance' => ['nullable', 'integer', 'min:0'],
            'peak_glucose' => ['nullable', 'integer', 'min:0'],
        ]);

        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Silakan masuk terlebih dahulu untuk mencatatkan skor Anda ke papan peringkat komunitas.',
                'leaderboard' => $this->getLeaderboardData(),
            ], 401);
        }

        // Get user's previous highest score
        $bestExisting = ArcadeScore::where('user_id', $user->id)
            ->where('game_type', 'glucose_dash')
            ->orderByDesc('score')
            ->first();

        // Create score session entry
        $scoreRecord = ArcadeScore::create([
            'user_id' => $user->id,
            'game_type' => 'glucose_dash',
            'character_name' => $validated['character'] ?? 'Dimas Aryo',
            'score' => $validated['score'],
            'tir' => $validated['tir'] ?? '100%',
            'distance' => $validated['distance'] ?? 0,
            'peak_glucose' => $validated['peak_glucose'] ?? 95,
            'played_at' => now(),
        ]);

        $isNewBest = !$bestExisting || $validated['score'] > $bestExisting->score;

        // Reward points if new best record
        if ($isNewBest && $validated['score'] > 0) {
            PointsLedger::create([
                'user_id' => $user->id,
                'event_type' => 'GLUCOSE_DASH_RECORD',
                'points' => 20,
                'reference_type' => 'arcade_scores',
                'reference_id' => (string) $scoreRecord->id,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => $isNewBest ? 'Rekor baru berhasil disimpan di Papan Peringkat!' : 'Skor sesi permainan berhasil dicatat!',
            'is_new_best' => $isNewBest,
            'leaderboard' => $this->getLeaderboardData(),
        ]);
    }

    /**
     * Compute leaderboard from real users who have logged into the application.
     *
     * @return array<int, array<string, mixed>>
     */
    public function getLeaderboardData(): array
    {
        // Real accounts of users who have logged in and are active
        $users = User::query()
            ->whereNotNull('last_login_at')
            ->where('status', 'ACTIVE')
            ->with(['roles', 'memberProfile', 'arcadeScores'])
            ->get();

        $rows = [];

        foreach ($users as $user) {
            // Find highest score in glucose_dash
            $topArcade = $user->arcadeScores
                ->where('game_type', 'glucose_dash')
                ->sortByDesc('score')
                ->first();

            // Compute score and stats
            $score = $topArcade ? (int) $topArcade->score : max(100, $user->totalPoints() * 15);
            $tir = $topArcade ? $topArcade->tir : '90%';
            $character = $topArcade ? $topArcade->character_name : 'Dimas Aryo';

            $roleName = $user->roles->first()?->name ?? 'Member';
            $displayName = $user->memberProfile?->display_name ?: $user->name;

            $rows[] = [
                'user_id' => $user->id,
                'name' => $displayName,
                'email' => $user->email,
                'char' => $character . ' • ' . $roleName,
                'character_only' => $character,
                'role_label' => $roleName,
                'score' => $score,
                'tir' => $tir,
                'last_login_at' => $user->last_login_at?->diffForHumans(),
            ];
        }

        // Sort descending by highest score
        usort($rows, fn ($a, $b) => $b['score'] <=> $a['score']);

        // Assign ranking numbers
        foreach ($rows as $index => &$row) {
            $rank = $index + 1;
            $row['rank'] = $rank;
            $row['medal'] = (string) $rank;
        }

        return $rows;
    }
}
