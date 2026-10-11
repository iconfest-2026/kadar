<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\CommunityComment;
use App\Models\CommunityPost;
use App\Models\CommunityReaction;
use App\Models\CommunityReport;
use App\Models\PointsLedger;
use App\Models\User;
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
        $search = $request->query('search', '');

        // Base query for published posts
        $query = CommunityPost::with([
            'user.memberProfile',
            'user.roles',
            'comments' => function ($q) {
                $q->with(['user.memberProfile', 'user.roles'])->latest();
            },
            'reactions.user',
        ])
        ->where('status', 'PUBLISHED')
        ->latest();

        // Search query
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('body', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($u) use ($search) {
                      $u->where('name', 'like', "%{$search}%");
                  });
            });
        }

        // Category filter
        $categoryMap = [
            'nutrition' => 1,
            'remission' => 2,
            'fitness' => 3,
            'consultation' => 4,
            'announcement' => 5,
        ];

        if ($category !== 'all' && isset($categoryMap[$category])) {
            $query->where('category_id', $categoryMap[$category]);
        }

        $posts = $query->paginate(12)->withQueryString();

        // Seed some sample community discussions if none exist yet
        if ($posts->total() === 0 && empty($search) && $category === 'all') {
            $this->seedInitialPosts($user->id);
            $posts = CommunityPost::with([
                'user.memberProfile',
                'user.roles',
                'comments' => function ($q) {
                    $q->with(['user.memberProfile', 'user.roles'])->latest();
                },
                'reactions.user',
            ])
            ->where('status', 'PUBLISHED')
            ->latest()
            ->paginate(12)
            ->withQueryString();
        }

        // Add user-specific interaction flags to posts
        $posts->getCollection()->transform(function ($post) use ($user) {
            $userReactions = $post->reactions->where('user_id', $user->id)->pluck('reaction_type')->toArray();
            $post->user_reaction = !empty($userReactions) ? $userReactions[0] : null;
            $post->is_owner = $post->user_id === $user->id;
            return $post;
        });

        // Category counts
        $categoryCounts = [
            'all' => CommunityPost::where('status', 'PUBLISHED')->count(),
            'nutrition' => CommunityPost::where('status', 'PUBLISHED')->where('category_id', 1)->count(),
            'remission' => CommunityPost::where('status', 'PUBLISHED')->where('category_id', 2)->count(),
            'fitness' => CommunityPost::where('status', 'PUBLISHED')->where('category_id', 3)->count(),
            'consultation' => CommunityPost::where('status', 'PUBLISHED')->where('category_id', 4)->count(),
            'announcement' => CommunityPost::where('status', 'PUBLISHED')->where('category_id', 5)->count(),
        ];

        // Top contributors
        $topContributors = User::whereHas('communityPosts')
            ->withCount('communityPosts')
            ->with(['memberProfile', 'roles'])
            ->orderByDesc('community_posts_count')
            ->take(5)
            ->get();

        // User's own total points from ledger
        $userTotalPoints = (int) PointsLedger::where('user_id', $user->id)->sum('points');

        return Inertia::render('Member/Community', [
            'profile' => $profile,
            'posts' => $posts,
            'activeCategory' => $category,
            'search' => $search,
            'categoryCounts' => $categoryCounts,
            'topContributors' => $topContributors,
            'userTotalPoints' => $userTotalPoints,
            'currentUser' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->pluck('slug'),
            ],
        ]);
    }

    public function storePost(Request $request)
    {
        // Support both 'body' and 'content' for flexibility
        $body = $request->input('body', $request->input('content'));
        $request->merge(['body' => $body]);

        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'body' => 'required|string|max:3000',
            'category_id' => 'required|integer|in:1,2,3,4,5',
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

        return redirect()->back()->with('success', 'Cerita Anda berhasil dibagikan ke komunitas! (+20 Poin)');
    }

    public function updatePost(Request $request, CommunityPost $post)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($post->user_id !== $user->id && !$user->hasRole('admin')) {
            abort(403, 'Anda tidak berwenang mengedit postingan ini.');
        }

        $body = $request->input('body', $request->input('content'));
        $request->merge(['body' => $body]);

        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'body' => 'required|string|max:3000',
            'category_id' => 'required|integer|in:1,2,3,4,5',
        ]);

        $post->update([
            'title' => $validated['title'],
            'body' => $validated['body'],
            'category_id' => $validated['category_id'],
        ]);

        return redirect()->back()->with('success', 'Postingan berhasil diperbarui.');
    }

    public function destroyPost(CommunityPost $post)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($post->user_id !== $user->id && !$user->hasRole('admin')) {
            abort(403, 'Anda tidak berwenang menghapus postingan ini.');
        }

        $post->comments()->delete();
        $post->delete();

        return redirect()->back()->with('success', 'Postingan berhasil dihapus.');
    }

    public function storeComment(Request $request)
    {
        $body = $request->input('body', $request->input('content'));
        $request->merge(['body' => $body]);

        $validated = $request->validate([
            'post_id' => 'required|exists:community_posts,id',
            'body' => 'required|string|max:1000',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();

        CommunityComment::create([
            'post_id' => $validated['post_id'],
            'user_id' => $user->id,
            'body' => $validated['body'],
            'status' => 'PUBLISHED',
        ]);

        // Award +5 points for community discussion participation
        PointsLedger::create([
            'user_id' => $user->id,
            'event_type' => 'COMMUNITY_COMMENT',
            'points' => 5,
            'reference_type' => 'community_comments',
            'reference_id' => (string) $validated['post_id'],
            'created_at' => Carbon::now(),
        ]);

        return redirect()->back()->with('success', 'Komentar berhasil ditambahkan (+5 Poin).');
    }

    public function destroyComment(CommunityComment $comment)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($comment->user_id !== $user->id && !$user->hasRole('admin')) {
            abort(403, 'Anda tidak berwenang menghapus komentar ini.');
        }

        $comment->delete();

        return redirect()->back()->with('success', 'Komentar berhasil dihapus.');
    }

    public function toggleReaction(Request $request)
    {
        $type = $request->input('reaction_type', $request->input('type', 'LIKE'));
        $request->merge(['reaction_type' => $type]);

        $validated = $request->validate([
            'post_id' => 'required|exists:community_posts,id',
            'reaction_type' => 'required|in:LIKE,SUPPORT,CELEBRATE,EMPATHY',
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

    public function storeReport(Request $request, CommunityPost $post)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($post->user_id === $user->id) {
            return redirect()->back()->with('error', 'Anda tidak dapat melaporkan postingan Anda sendiri.');
        }

        $validated = $request->validate([
            'reason' => 'required|in:SPAM,MEDICAL_MISINFO,HATE,PRIVACY_VIOLATION',
            'description' => 'nullable|string|max:1000',
        ]);

        $existing = CommunityReport::where('reporter_id', $user->id)
            ->where('target_type', CommunityPost::class)
            ->where('target_id', $post->id)
            ->first();

        if ($existing) {
            return redirect()->back()->with('info', 'Anda sudah pernah melaporkan postingan ini. Tim kami sedang meninjaunya.');
        }

        CommunityReport::create([
            'reporter_id' => $user->id,
            'target_type' => CommunityPost::class,
            'target_id' => $post->id,
            'reason' => $validated['reason'],
            'description' => $validated['description'] ?? null,
            'status' => 'PENDING',
        ]);

        // Auto flag under review if multiple distinct reports
        $reportCount = CommunityReport::where('target_type', CommunityPost::class)
            ->where('target_id', $post->id)
            ->where('status', 'PENDING')
            ->count();

        if ($reportCount >= 3) {
            $post->update(['status' => 'UNDER_REVIEW']);
        }

        return redirect()->back()->with('success', 'Laporan berhasil diajukan. Tim moderator AEVYRA akan meninjau kepatuhan pedoman medis.');
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

        CommunityPost::create([
            'user_id' => $userId,
            'category_id' => 5, // Official Announcement
            'title' => 'Pedoman Komunitas Sehat: Menjaga Keamanan Medis & Etika Berbagi',
            'body' => "Selamat datang di Forum Komunitas AEVYRA! Ingat 3 aturan pokok kami:\n1. Kiriman adalah pengalaman pribadi (UGC) dan bukan resep medis.\n2. Dilarang mempromosikan suplemen atau obat tidak terdaftar BPOM.\n3. Hormati privasi data biologis rekan Anda.",
            'visibility' => 'PUBLIC',
            'status' => 'PUBLISHED',
        ]);
    }
}
