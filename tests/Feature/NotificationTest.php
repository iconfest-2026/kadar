<?php

namespace Tests\Feature;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NotificationTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_authenticated_user_can_view_notifications_page(): void
    {
        $user = User::where('email', 'member@aevyra.health')->first() ?? User::factory()->create();

        $response = $this->actingAs($user)->get('/notifications');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Notifications/Index')
            ->has('notifications')
            ->has('stats')
        );
    }

    public function test_user_only_sees_their_own_notifications(): void
    {
        $userA = User::where('email', 'member@aevyra.health')->first() ?? User::factory()->create();
        $userB = User::where('email', 'instruktur@aevyra.health')->first() ?? User::factory()->create();

        $notifA = Notification::create([
            'user_id' => $userA->id,
            'type' => 'TEST_A',
            'title' => 'Notif A Unik',
            'body' => 'Body A',
            'data' => ['category' => 'test'],
        ]);

        $notifB = Notification::create([
            'user_id' => $userB->id,
            'type' => 'TEST_B',
            'title' => 'Notif B Unik',
            'body' => 'Body B',
            'data' => ['category' => 'test'],
        ]);

        $response = $this->actingAs($userA)->get('/notifications');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->where('notifications.data.0.user_id', $userA->id)
        );

        // User A cannot mark User B's notification as read
        $forbiddenResponse = $this->actingAs($userA)->patch("/notifications/{$notifB->id}/read");
        $forbiddenResponse->assertStatus(403);
    }

    public function test_user_can_mark_notification_as_read(): void
    {
        $user = User::where('email', 'member@aevyra.health')->first() ?? User::factory()->create();

        $notif = Notification::create([
            'user_id' => $user->id,
            'type' => 'TEST_UNREAD',
            'title' => 'Notif Belum Dibaca',
            'body' => 'Silakan baca notifikasi ini',
            'data' => ['category' => 'test'],
            'read_at' => null,
        ]);

        $this->assertNull($notif->fresh()->read_at);

        $response = $this->actingAs($user)->patch("/notifications/{$notif->id}/read");

        $response->assertRedirect();
        $this->assertNotNull($notif->fresh()->read_at);
    }

    public function test_user_can_mark_all_notifications_as_read(): void
    {
        $user = User::where('email', 'member@aevyra.health')->first() ?? User::factory()->create();

        Notification::create([
            'user_id' => $user->id,
            'type' => 'BULK_1',
            'title' => 'Bulk 1',
            'body' => 'Bulk 1',
            'read_at' => null,
        ]);

        Notification::create([
            'user_id' => $user->id,
            'type' => 'BULK_2',
            'title' => 'Bulk 2',
            'body' => 'Bulk 2',
            'read_at' => null,
        ]);

        $response = $this->actingAs($user)->post('/notifications/mark-all-read');

        $response->assertRedirect();
        $unreadCount = Notification::where('user_id', $user->id)->whereNull('read_at')->count();
        $this->assertEquals(0, $unreadCount);
    }

    public function test_user_can_delete_notification(): void
    {
        $user = User::where('email', 'member@aevyra.health')->first() ?? User::factory()->create();

        $notif = Notification::create([
            'user_id' => $user->id,
            'type' => 'TEST_DELETE',
            'title' => 'Notif Hapus',
            'body' => 'Body hapus',
            'read_at' => null,
        ]);

        $response = $this->actingAs($user)->delete("/notifications/{$notif->id}");

        $response->assertRedirect();
        $this->assertDatabaseMissing('notifications', ['id' => $notif->id]);
    }

    public function test_shared_inertia_props_contain_notifications_for_all_roles(): void
    {
        // 1. Member
        $member = User::where('email', 'member@aevyra.health')->first();
        $this->assertNotNull($member);
        $resp = $this->actingAs($member)->get('/member/dashboard');
        $resp->assertStatus(200);
        $resp->assertInertia(fn ($page) => $page
            ->has('notifications.unread_count')
            ->has('notifications.recent')
        );

        // 2. Instructor
        $instructor = User::where('email', 'instruktur@aevyra.health')->first();
        $this->assertNotNull($instructor);
        $resp = $this->actingAs($instructor)->get('/instructor/dashboard');
        $resp->assertStatus(200);
        $resp->assertInertia(fn ($page) => $page
            ->has('notifications.unread_count')
            ->has('notifications.recent')
        );

        // 3. Admin
        $admin = User::where('email', 'admin@aevyra.health')->first();
        $this->assertNotNull($admin);
        $resp = $this->actingAs($admin)->get('/admin/dashboard');
        $resp->assertStatus(200);
        $resp->assertInertia(fn ($page) => $page
            ->has('notifications.unread_count')
            ->has('notifications.recent')
        );
    }
}
