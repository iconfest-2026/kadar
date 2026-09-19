<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\BehaviorInsight;
use App\Models\Intervention;
use App\Models\Recommendation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InsightController extends Controller
{
    public function dismiss(Request $request, BehaviorInsight $insight)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($insight->user_id !== $user->id) {
            abort(403);
        }

        $insight->update([
            'dismissed_at' => now(),
            'dismissed_reason' => $request->input('reason', 'MEMBER_DISMISSED'),
        ]);

        return back()->with('success', 'Insight telah diarsipkan.');
    }

    public function acceptRecommendation(Request $request, Recommendation $recommendation)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($recommendation->user_id !== $user->id) {
            abort(403);
        }

        $recommendation->update(['status' => 'ACCEPTED']);

        // Create an active micro-intervention based on this recommendation
        Intervention::create([
            'user_id' => $user->id,
            'title' => $recommendation->title,
            'description' => $recommendation->description,
            'type' => 'MICRO_HABIT',
            'status' => 'ACTIVE',
            'start_date' => now()->toDateString(),
            'end_date' => now()->addDays(7)->toDateString(),
            'metadata' => [
                'recommendation_id' => $recommendation->id,
                'target_behavior' => $recommendation->action_type,
            ],
        ]);

        return back()->with('success', 'Rekomendasi diaktifkan! Komitmen mikro-kebiasaan baru telah ditambahkan ke rencana Anda.');
    }
}
