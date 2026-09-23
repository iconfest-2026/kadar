<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\CommunityComment;
use App\Models\CommunityPost;
use App\Models\CommunityReaction;
use App\Models\PointsLedger;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CommunityController extends Controller
{
    public function index(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $profile = $user->memberProfile;

        $category = $request->query('category', 'all');

        $query = CommunityPost::with(['user.memberProfile', 'comments.user.memberProfile', 'reactions'])
            ->where('status', 'PUBLISHED')
            ->latest();

        if ($category !== 'all') {
            $categoryMap = [
                'nutrition' => 1,
                'remission' => 2,
                'fitness' => 3,
                'consultation' => 4,
            ];
            if (isset($categoryMap[$category])) {
                $query->where('category_id', $categoryMap[$category]);
            }
        }

        $posts = $query->paginate(15);

        // Seed some sample community discussions if none exist yet
        if ($posts->total() === 0) {
            $this->seedInitialPosts($user->id);
            $posts = CommunityPost::with(['user.memberProfile', 'comments.user.memberProfile', 'reactions'])
                ->where('status', 'PUBLISHED')
                ->latest()
                ->paginate(15);
        }

        return Inertia::render('Member/Community', [
            'profile' => $profile,
            'posts' => $posts,
            'activeCategory' => $category,
        ]);
    }

    public function storePost(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'body' => 'required|string|max:2500',
            'category_id' => 'required|integer',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $post = CommunityPost::create([
            'user_id' => $user->id,
            'category_id' => $validated['category_id'],
            'title' => $validated['title'],
            'body' => $validated['body'],
            'visibility' => 'PUBLIC',
            'status' => 'PUBLISHED',
        ]);

        // Award +20 points for contributing to community
        PointsLedger::create([
            'user_id' => $user->id,
            'event_type' => 'COMMUNITY_POST',
            'points' => 20,
            'reference_type' => 'community_posts',
            'reference_id' => (string) $post->id,
            'created_at' => Carbon::now(),
        ]);

        return redirect()->back()->with('success', 'Cerita berhasil dibagikan ke komunitas! (+20 Poin)');
    }

    public function storeComment(Request $request, CommunityPost $post)
    {
        $validated = $request->validate([
            'body' => 'required|string|max:1000',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();

        CommunityComment::create([
            'post_id' => $post->id,
            'user_id' => $user->id,
            'body' => $validated['body'],
            'status' => 'PUBLISHED',
        ]);

        // Award +5 points for discussion
        PointsLedger::create([
            'user_id' => $user->id,
            'event_type' => 'COMMUNITY_COMMENT',
            'points' => 5,
            'reference_type' => 'community_comments',
            'reference_id' => (string) $post->id,
            'created_at' => Carbon::now(),
        ]);

        return redirect()->back()->with('success', 'Komentar berhasil ditambahkan.');
    }

    public function toggleReaction(Request $request)
    {
        $validated = $request->validate([
            'post_id' => 'required|exists:community_posts,id',
            'reaction_type' => 'required|in:LIKE,SUPPORT,CELEBRATE',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $existing = CommunityReaction::where('user_id', $user->id)
            ->where('reactable_type', CommunityPost::class)
            ->where('reactable_id', $validated['post_id'])
            ->first();

        if ($existing) {
            if ($existing->reaction_type === $validated['reaction_type']) {
                $existing->delete();
            } else {
                $existing->reaction_type = $validated['reaction_type'];
                $existing->save();
            }
        } else {
            CommunityReaction::create([
                'user_id' => $user->id,
                'reactable_type' => CommunityPost::class,
                'reactable_id' => $validated['post_id'],
                'reaction_type' => $validated['reaction_type'],
                'created_at' => Carbon::now(),
            ]);
        }

        return redirect()->back();
    }

    private function seedInitialPosts($userId)
    {
        $p1 = CommunityPost::create([
            'user_id' => $userId,
            'category_id' => 2, // Remission
            'title' => 'HbA1c Turun dari 6.2% ke 5.4% dalam 90 Hari! Ini Rahasia Menu Sarapan Saya',
            'body' => "Halo semua kawan seperjuangan! Tiga bulan lalu dokter memvonis saya masuk pra-diabetes. Langkah pertama yang saya ubah: memotong minuman boba dan mengganti nasi putih dengan nasi merah dan tempe bacem panggang. Hasil lab kemarin: HbA1c turun ke 5.4%! Jangan putus asa, pra-diabetes benar-benar bisa dibalik!",
            'visibility' => 'PUBLIC',
            'status' => 'PUBLISHED',
        ]);

        CommunityComment::create([
            'post_id' => $p1->id,
            'user_id' => $userId,
            'body' => "Luar biasa! Apakah Anda juga membatasi buah-buahan manis seperti mangga dan pisang matang?",
            'status' => 'PUBLISHED',
        ]);

        CommunityPost::create([
            'user_id' => $userId,
            'category_id' => 1, // Nutrition
            'title' => 'Waspada Gula Tersembunyi pada Kecap Manis & Saus Kemasan!',
            'body' => "Saya baru coba scan label botol kecap dan saus sambal kemasan pakai kamera AEVYRA. Ternyata per sendok makan bisa ada 4-6 gram gula cair! Sekarang saya mulai masak bumbu sendiri pakai bawang putih, lada, dan sedikit garam rendah natrium.",
            'visibility' => 'PUBLIC',
            'status' => 'PUBLISHED',
        ]);

        CommunityPost::create([
            'user_id' => $userId,
            'category_id' => 3, // Fitness
            'title' => 'Jalan Kaki 15 Menit Pasca Makan: Solusi Ampuh Hilangkan Kantuk Siang',
            'body' => "Sebelumnya sehabis makan siang selalu mengantuk hebat (tanda lonjakan glukosa tinggi). Dokter AEVYRA menyarankan jalan santai 15 menit keliling kantor sesudah makan. Terbukti energi jauh lebih segar dan tidak ada lagi sugar crash!",
            'visibility' => 'PUBLIC',
            'status' => 'PUBLISHED',
        ]);
    }
}
