<?php

namespace Tests\Feature;

use App\Models\CommunityComment;
use App\Models\CommunityPost;
use App\Models\CommunityReaction;
use App\Models\CommunityReport;
use App\Models\ModerationAction;
use App\Models\PointsLedger;
use App\Models\User;
use Tests\TestCase;

class CommunityE2ETest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_member_and_admin_community_e2e_workflow(): void
    {
        // 1. Fetch member and admin users from seeded database
        $member = User::where('email', 'member@aevyra.health')->first();
        $admin = User::where('email', 'admin@aevyra.health')->first();

        $this->assertNotNull($member, 'Member user should exist.');
        $this->assertNotNull($admin, 'Admin user should exist.');

        // 2. Member loads community page
        $response = $this->actingAs($member)->get('/member/community');
        $response->assertStatus(200);

        // 3. Member creates a new community post
        $initialLedgerCount = PointsLedger::where('user_id', $member->id)->count();

        $postData = [
            'title' => 'Pengalaman Menu Sarapan Bebas Lonjakan Gula (E2E Test)',
            'body' => 'Mengganti roti tawar dengan telur rebus dan alpukat terbukti menstabilkan gula darah pagi saya. Salam sehat kawan-kawan!',
            'category_id' => 1,
        ];

        $storeResponse = $this->actingAs($member)->post('/member/community/post', $postData);
        $storeResponse->assertRedirect();

        $newPost = CommunityPost::where('title', $postData['title'])->first();
        $this->assertNotNull($newPost, 'New post should be persisted in database.');
        $this->assertEquals($member->id, $newPost->user_id);
        $this->assertEquals(1, $newPost->category_id);
        $this->assertEquals('PUBLISHED', $newPost->status);

        // Verify +20 points ledger entry
        $newLedgerCount = PointsLedger::where('user_id', $member->id)->count();
        $this->assertEquals($initialLedgerCount + 1, $newLedgerCount);
        $this->assertDatabaseHas('points_ledger', [
            'user_id' => $member->id,
            'event_type' => 'COMMUNITY_POST',
            'points' => 20,
            'reference_id' => (string) $newPost->id,
        ]);

        // 4. Member adds a comment to the post
        $commentData = [
            'post_id' => $newPost->id,
            'body' => 'Terima kasih atas tipsnya, sangat bermanfaat dan terbukti ilmiah!',
        ];

        $commentResponse = $this->actingAs($member)->post('/member/community/comment', $commentData);
        $commentResponse->assertRedirect();

        $comment = CommunityComment::where('post_id', $newPost->id)->first();
        $this->assertNotNull($comment);
        $this->assertEquals($commentData['body'], $comment->body);

        // Verify +5 points ledger entry
        $this->assertDatabaseHas('points_ledger', [
            'user_id' => $member->id,
            'event_type' => 'COMMUNITY_COMMENT',
            'points' => 5,
        ]);

        // 5. Member reacts to the post (LIKE)
        $reactResponse = $this->actingAs($member)->post('/member/community/react', [
            'post_id' => $newPost->id,
            'reaction_type' => 'LIKE',
        ]);
        $reactResponse->assertRedirect();

        $this->assertDatabaseHas('community_reactions', [
            'user_id' => $member->id,
            'reactable_id' => $newPost->id,
            'reaction_type' => 'LIKE',
        ]);

        // 6. Member toggles reaction to SUPPORT
        $reactResponse2 = $this->actingAs($member)->post('/member/community/react', [
            'post_id' => $newPost->id,
            'reaction_type' => 'SUPPORT',
        ]);
        $reactResponse2->assertRedirect();

        $this->assertDatabaseHas('community_reactions', [
            'user_id' => $member->id,
            'reactable_id' => $newPost->id,
            'reaction_type' => 'SUPPORT',
        ]);

        // 7. Member updates their post
        $updateResponse = $this->actingAs($member)->patch("/member/community/posts/{$newPost->id}", [
            'title' => 'Pengalaman Menu Sarapan Bebas Lonjakan Gula (Updated)',
            'body' => 'Update: Sudah seminggu gula darah konsisten 95 mg/dL pasca sarapan!',
            'category_id' => 1,
        ]);
        $updateResponse->assertRedirect();

        $newPost->refresh();
        $this->assertEquals('Pengalaman Menu Sarapan Bebas Lonjakan Gula (Updated)', $newPost->title);

        // 8. Another member reports this post for moderation review
        $reporterMember = User::firstOrCreate(
            ['email' => 'reporter.member@aevyra.health'],
            [
                'name' => 'Siti Aminah (Member Reporter)',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'status' => 'ACTIVE',
                'email_verified_at' => now(),
            ]
        );
        $memberRole = \App\Models\Role::where('slug', 'member')->first();
        if ($memberRole) {
            $reporterMember->roles()->syncWithoutDetaching([$memberRole->id]);
        }

        $reportResponse = $this->actingAs($reporterMember)->post("/member/community/posts/{$newPost->id}/report", [
            'reason' => 'MEDICAL_MISINFO',
            'description' => 'Menguji alur pelaporan konten E2E otomatis',
        ]);
        $reportResponse->assertRedirect();

        $report = CommunityReport::where('target_id', $newPost->id)->first();
        $this->assertNotNull($report);
        $this->assertEquals('PENDING', $report->status);
        $this->assertEquals('MEDICAL_MISINFO', $report->reason);

        // 9. Admin views the admin community governance portal
        $adminViewResponse = $this->actingAs($admin)->get('/admin/community');
        $adminViewResponse->assertStatus(200);

        // 10. Admin resolves report by hiding post (HIDE_POST)
        $resolveResponse = $this->actingAs($admin)->patch("/admin/community/reports/{$report->id}/resolve", [
            'action' => 'HIDE_POST',
            'resolution_notes' => 'Post disembunyikan berdasarkan hasil review standar medis E2E',
        ]);
        $resolveResponse->assertRedirect();

        $report->refresh();
        $newPost->refresh();
        $this->assertEquals('RESOLVED', $report->status);
        $this->assertEquals('CONTENT_HIDDEN', $report->resolution);
        $this->assertEquals('HIDDEN', $newPost->status);

        // Verify ModerationAction audit log created
        $this->assertDatabaseHas('moderation_actions', [
            'moderator_id' => $admin->id,
            'target_type' => CommunityReport::class,
            'target_id' => $report->id,
        ]);

        // 11. Admin publishes an official community announcement
        $announceResponse = $this->actingAs($admin)->post('/admin/community/posts', [
            'title' => 'Pemberitahuan Resmi: Pedoman Pola Hidup Sehat Kemenkes RI',
            'body' => 'Seluruh anggota diimbau menjaga asupan natrium dan gula harian sesuai rekomendasi resmi Kementerian Kesehatan RI.',
            'category_id' => 5,
            'status' => 'PUBLISHED',
        ]);
        $announceResponse->assertRedirect();

        $announcement = CommunityPost::where('title', 'Pemberitahuan Resmi: Pedoman Pola Hidup Sehat Kemenkes RI')->first();
        $this->assertNotNull($announcement);
        $this->assertEquals(5, $announcement->category_id);
        $this->assertEquals('PUBLISHED', $announcement->status);

        // Verify announcement moderation audit log
        $this->assertDatabaseHas('moderation_actions', [
            'moderator_id' => $admin->id,
            'target_type' => CommunityPost::class,
            'target_id' => $announcement->id,
            'action' => 'CREATE_ANNOUNCEMENT',
        ]);

        // 12. Cleanup test artifacts
        $newPost->comments()->delete();
        $newPost->delete();
        $announcement->delete();
        $report->delete();
    }
}
