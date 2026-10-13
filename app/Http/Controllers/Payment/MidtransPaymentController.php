<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Membership;
use App\Models\MembershipPayment;
use App\Models\MembershipTier;
use App\Models\Notification;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class MidtransPaymentController extends Controller
{
    protected MidtransService $midtrans;

    public function __construct(MidtransService $midtrans)
    {
        $this->midtrans = $midtrans;
    }

    /**
     * Member initiates Snap checkout for a tier.
     * Enforces active tier verification and server-side pricing.
     */
    public function checkout(Request $request, MembershipTier $tier)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!$tier || $tier->status !== 'ACTIVE') {
            return response()->json([
                'success' => false,
                'message' => 'Paket keanggotaan ini tidak aktif atau tidak ditemukan.',
            ], 404);
        }

        $result = $this->midtrans->createSnapTransaction($user, $tier);

        if (!$result['success']) {
            return response()->json($result, 422);
        }

        return response()->json($result);
    }

    /**
     * Webhook notification from Midtrans with cryptographic signature and live server-to-server check.
     */
    public function notification(Request $request)
    {
        $payload = $request->all();
        $response = $this->midtrans->handleNotification($payload);

        if (($response['status'] ?? '') === 'error') {
            return response()->json($response, 400);
        }

        return response()->json($response, 200);
    }

    /**
     * Authenticated endpoint to actively check and verify payment status from Midtrans.
     * Includes anti-scripting regex validation, ownership check, and atomic database sync.
     */
    public function verifyStatus(Request $request)
    {
        $validated = $request->validate([
            'order_id' => ['required', 'string', 'regex:/^[A-Za-z0-9\-_]{5,100}$/'],
        ]);

        $orderId = $validated['order_id'];

        $payment = MembershipPayment::where('order_id', $orderId)->first();
        if (!$payment) {
            return response()->json([
                'success' => false,
                'message' => 'Pesanan transaksi tidak ditemukan.',
            ], 404);
        }

        // Anti-tampering authorization: User can only check their own transaction (unless Admin)
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $isAdmin = (method_exists($user, 'hasRole') && $user->hasRole('admin')) || ($user->role ?? '') === 'admin';
        if ($payment->user_id !== $user->id && !$isAdmin) {
            return response()->json([
                'success' => false,
                'message' => 'Akses ditolak. Anda tidak memiliki izin untuk transaksi ini.',
            ], 403);
        }

        $result = $this->midtrans->syncPaymentWithMidtrans($orderId);

        return response()->json($result);
    }

    /**
     * Post-payment finish callback from Midtrans Snap redirect.
     * Synchronizes status live and redirects to Member dashboard.
     */
    public function finish(Request $request)
    {
        $orderId = $request->query('order_id');

        if ($orderId && preg_match('/^[A-Za-z0-9\-_]{5,100}$/', $orderId)) {
            $payment = MembershipPayment::where('order_id', $orderId)->first();
            if ($payment && $payment->user_id === Auth::id()) {
                $sync = $this->midtrans->syncPaymentWithMidtrans($orderId);
                if ($sync['is_paid'] ?? false) {
                    return redirect()->route('member.dashboard')->with('success', 'Selamat! Pembayaran berhasil diverifikasi dan paket keanggotaan Anda telah aktif.');
                }
            }
        }

        return redirect()->route('member.dashboard')->with('info', 'Pembayaran paket membership Anda sedang diproses dan diverifikasi.');
    }

    /**
     * Netflix-style Subscription Downgrade.
     * Allows members to schedule a downgrade to a lower tier at their current billing cycle ends_at,
     * maintaining all current tier benefits until that date, or apply immediately if requested.
     */
    public function scheduleDowngrade(Request $request, MembershipTier $tier)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!$tier || $tier->status !== 'ACTIVE') {
            return response()->json([
                'success' => false,
                'message' => 'Paket tujuan tidak ditemukan atau sedang tidak aktif.',
            ], 404);
        }

        $membership = Membership::where('user_id', $user->id)
            ->where('status', 'ACTIVE')
            ->with('tier')
            ->first();

        if (!$membership) {
            return response()->json([
                'success' => false,
                'message' => 'Anda belum memiliki paket keanggotaan aktif untuk diturunkan.',
            ], 422);
        }

        if ($membership->tier_id === $tier->id) {
            return response()->json([
                'success' => false,
                'message' => 'Anda saat ini sudah berada pada paket ' . $tier->name . '.',
            ], 422);
        }

        $validated = $request->validate([
            'mode' => ['nullable', 'string', 'in:SCHEDULED,IMMEDIATE'],
            'reason' => ['nullable', 'string', 'max:500'],
        ]);

        $mode = $validated['mode'] ?? 'SCHEDULED';
        $reason = $validated['reason'] ?? null;
        $currentTier = $membership->tier;

        if ($mode === 'IMMEDIATE') {
            $isFree = ((float) $tier->price) <= 0;
            $membership->update([
                'tier_id' => $tier->id,
                'downgrade_to_tier_id' => null,
                'downgrade_at' => null,
                'downgrade_reason' => $reason,
                'starts_at' => now(),
                'ends_at' => $isFree ? null : now()->addMonth(),
                'status' => 'ACTIVE',
            ]);

            try {
                Notification::create([
                    'user_id' => $user->id,
                    'type' => 'MEMBERSHIP_DOWNGRADED_IMMEDIATELY',
                    'title' => "Paket Berhasil Dialihkan ke {$tier->name}",
                    'body' => "Paket langganan Anda telah berhasil dialihkan langsung ke {$tier->name}. Seluruh kuota dan kapabilitas telah disesuaikan.",
                    'data' => [
                        'category' => 'system',
                        'tier_name' => $tier->name,
                        'tier_slug' => $tier->slug,
                        'previous_tier' => $currentTier?->name,
                        'action_url' => '/paket',
                    ],
                    'read_at' => null,
                    'delivered_at' => now(),
                ]);

                AuditLog::log(
                    $user->id,
                    'member',
                    'membership.immediate_downgrade',
                    'Membership',
                    (string) $membership->id,
                    [
                        'from_tier' => $currentTier?->name,
                        'to_tier' => $tier->name,
                        'reason' => $reason,
                    ]
                );
            } catch (\Throwable $e) {
                Log::error('Error creating notification on immediate downgrade: ' . $e->getMessage());
            }

            return response()->json([
                'success' => true,
                'mode' => 'IMMEDIATE',
                'message' => "Paket Anda telah berhasil beralih ke {$tier->name}.",
                'current_tier' => $tier->name,
                'current_tier_slug' => $tier->slug,
            ]);
        }

        // Mode SCHEDULED (Netflix standard: keep benefits until ends_at)
        $effectiveDate = ($membership->ends_at && $membership->ends_at->isFuture())
            ? $membership->ends_at
            : now()->addMonth();

        $membership->update([
            'downgrade_to_tier_id' => $tier->id,
            'downgrade_at' => $effectiveDate,
            'downgrade_reason' => $reason,
        ]);

        $formattedDate = $effectiveDate->translatedFormat('d F Y');

        try {
            Notification::create([
                'user_id' => $user->id,
                'type' => 'MEMBERSHIP_DOWNGRADE_SCHEDULED',
                'title' => "Jadwal Penurunan Paket ke {$tier->name} Dikonfirmasi",
                'body' => "Paket Anda akan diturunkan ke {$tier->name} pada tanggal {$formattedDate}. Hingga tanggal tersebut, Anda tetap dapat menikmati seluruh fitur {$currentTier?->name}. Anda dapat membatalkan jadwal ini kapan saja.",
                'data' => [
                    'category' => 'system',
                    'tier_name' => $tier->name,
                    'tier_slug' => $tier->slug,
                    'previous_tier' => $currentTier?->name,
                    'effective_at' => $effectiveDate->toDateString(),
                    'action_url' => '/paket',
                ],
                'read_at' => null,
                'delivered_at' => now(),
            ]);

            AuditLog::log(
                $user->id,
                'member',
                'membership.schedule_downgrade',
                'Membership',
                (string) $membership->id,
                [
                    'from_tier' => $currentTier?->name,
                    'to_tier' => $tier->name,
                    'effective_at' => $effectiveDate->toIso8601String(),
                    'reason' => $reason,
                ]
            );
        } catch (\Throwable $e) {
            Log::error('Error creating notification on scheduled downgrade: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'mode' => 'SCHEDULED',
            'message' => "Paket Anda dijadwalkan turun ke {$tier->name} pada {$formattedDate}. Anda tetap memiliki akses penuh ke {$currentTier?->name} hingga saat itu.",
            'effective_at' => $effectiveDate->toDateString(),
            'formatted_effective_at' => $formattedDate,
            'downgrade_tier' => $tier->name,
            'downgrade_tier_slug' => $tier->slug,
        ]);
    }

    /**
     * Cancel a scheduled downgrade, keeping the current subscription intact.
     * Corresponds to Netflix's "Keep Current Plan" button.
     */
    public function cancelDowngrade(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $membership = Membership::where('user_id', $user->id)
            ->where('status', 'ACTIVE')
            ->with(['tier', 'downgradeTier'])
            ->first();

        if (!$membership || !$membership->hasPendingDowngrade()) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak ada jadwal penurunan paket yang aktif untuk dibatalkan.',
            ], 422);
        }

        $targetTierName = $membership->downgradeTier?->name;
        $currentTierName = $membership->tier?->name;

        $membership->update([
            'downgrade_to_tier_id' => null,
            'downgrade_at' => null,
            'downgrade_reason' => null,
        ]);

        try {
            Notification::create([
                'user_id' => $user->id,
                'type' => 'MEMBERSHIP_DOWNGRADE_CANCELLED',
                'title' => 'Penurunan Paket Berhasil Dibatalkan',
                'body' => "Jadwal penurunan paket ke {$targetTierName} telah dibatalkan. Anda tetap menikmati seluruh fitur {$currentTierName} seperti biasa.",
                'data' => [
                    'category' => 'system',
                    'current_tier' => $currentTierName,
                    'action_url' => '/paket',
                ],
                'read_at' => null,
                'delivered_at' => now(),
            ]);

            AuditLog::log(
                $user->id,
                'member',
                'membership.cancel_downgrade',
                'Membership',
                (string) $membership->id,
                [
                    'cancelled_target_tier' => $targetTierName,
                    'current_tier' => $currentTierName,
                ]
            );
        } catch (\Throwable $e) {
            Log::error('Error creating notification on cancel downgrade: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => "Jadwal penurunan paket dibatalkan. Anda tetap berlangganan {$currentTierName}.",
        ]);
    }
}
