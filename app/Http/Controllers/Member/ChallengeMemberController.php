<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use App\Models\ChallengeParticipation;
use App\Models\PointsLedger;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChallengeMemberController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $profile = $user->memberProfile;

        // Ensure canonical challenges exist
        if (Challenge::count() === 0) {
            $this->seedCanonicalChallenges($user->id);
        }

        $allChallenges = Challenge::where('status', 'ACTIVE')
            ->with('tasks')
            ->get();

        $myParticipations = ChallengeParticipation::where('user_id', $user->id)
            ->with(['challenge.tasks', 'taskCompletions'])
            ->get()
            ->keyBy('challenge_id');

        return Inertia::render('Member/Challenges', [
            'profile' => $profile,
            'challenges' => $allChallenges,
            'myParticipations' => $myParticipations,
            'totalPoints' => $user->totalPoints(),
        ]);
    }

    public function join(Request $request, Challenge $challenge)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $participation = ChallengeParticipation::firstOrCreate(
            [
                'challenge_id' => $challenge->id,
                'user_id' => $user->id,
            ],
            [
                'status' => 'IN_PROGRESS',
                'progress_percent' => 0.00,
                'joined_at' => Carbon::now(),
                'started_at' => Carbon::now(),
            ]
        );

        return redirect()->back()->with('success', "Berhasil bergabung ke program {$challenge->name}!");
    }

    public function updateProgress(Request $request, ChallengeParticipation $participation)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        if ($participation->user_id !== $user->id) {
            abort(403);
        }

        $validated = $request->validate([
            'progress_percent' => 'required|numeric|min:0|max:100',
        ]);

        $participation->progress_percent = $validated['progress_percent'];
        if ($participation->progress_percent >= 100 && $participation->status !== 'COMPLETED') {
            $participation->status = 'COMPLETED';
            $participation->completed_at = Carbon::now();

            // Award reward points
            $reward = $participation->challenge->points_reward ?? 50;
            PointsLedger::create([
                'user_id' => $user->id,
                'event_type' => 'CHALLENGE_REWARD',
                'points' => $reward,
                'reference_type' => 'challenges',
                'reference_id' => (string) $participation->challenge_id,
                'created_at' => Carbon::now(),
            ]);
        }
        $participation->save();

        return redirect()->back()->with('success', 'Progress tantangan berhasil diperbarui!');
    }

    private function seedCanonicalChallenges($userId)
    {
        $c1 = Challenge::create([
            'name' => 'Tantangan 14 Hari Bebas Minuman Manis',
            'slug' => '14-days-sugar-free',
            'description' => 'Eliminasi total konsumsi minuman boba, kopi susu manis kemasan, dan soda selama 14 hari penuh untuk memulihkan sensitivitas insulin.',
            'goal_type' => 'NUTRITION',
            'duration_days' => 14,
            'points_reward' => 100,
            'status' => 'ACTIVE',
            'created_by' => $userId,
        ]);

        $c1->tasks()->createMany([
            ['title' => 'Ganti minuman manis dengan air mineral atau infused water herbal', 'type' => 'LOG_MEAL', 'target_value' => 14, 'target_unit' => 'hari', 'sort_order' => 1],
            ['title' => 'Pindai label informasi nilai gizi saat membeli minuman kemasan', 'type' => 'LOG_MEAL', 'target_value' => 5, 'target_unit' => 'scan', 'sort_order' => 2],
        ]);

        $c2 = Challenge::create([
            'name' => 'Tantangan 30 Hari 10.000 Langkah & Jalan Pasca-Makan',
            'slug' => '30-days-10k-steps',
            'description' => 'Aktivitas fisik teratur 10.000 langkah per hari dan jalan santai 15 menit sehabis makan siang/malam untuk meratakan kurva lonjakan glukosa.',
            'goal_type' => 'STEPS',
            'duration_days' => 30,
            'points_reward' => 200,
            'status' => 'ACTIVE',
            'created_by' => $userId,
        ]);

        $c2->tasks()->createMany([
            ['title' => 'Capai target 10.000 langkah harian', 'type' => 'STEPS_TARGET', 'target_value' => 10000, 'target_unit' => 'langkah', 'sort_order' => 1],
            ['title' => 'Jalan kaki santai 15 menit pasca makan besar', 'type' => 'STEPS_TARGET', 'target_value' => 30, 'target_unit' => 'sesi', 'sort_order' => 2],
        ]);

        $c3 = Challenge::create([
            'name' => 'Protokol 90 Hari Remisi HbA1c & Nutrisi Rendah Glikemik',
            'slug' => '90-days-remission-protocol',
            'description' => 'Program terstruktur berbasis panduan PERKENI: kombinasi diet utuh tinggi serat, tidur cukup 7–8 jam, dan pendampingan dokter konsultan untuk target HbA1c < 5.7%.',
            'goal_type' => 'NUTRITION',
            'duration_days' => 90,
            'points_reward' => 500,
            'status' => 'ACTIVE',
            'created_by' => $userId,
        ]);

        $c3->tasks()->createMany([
            ['title' => 'Catat kadar glukosa darah berkala (puasa / 2 jam postprandial)', 'type' => 'LOG_MEAL', 'target_value' => 30, 'target_unit' => 'catatan', 'sort_order' => 1],
            ['title' => 'Konsultasikan tren laporan kesehatan dengan dokter instruktur', 'type' => 'LOG_MEAL', 'target_value' => 3, 'target_unit' => 'konsultasi', 'sort_order' => 2],
        ]);
    }
}
