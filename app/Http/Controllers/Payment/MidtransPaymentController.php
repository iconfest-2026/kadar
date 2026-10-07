<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\MembershipPayment;
use App\Models\MembershipTier;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
}
