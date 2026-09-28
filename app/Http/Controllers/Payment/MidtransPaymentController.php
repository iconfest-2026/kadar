<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\MembershipPayment;
use App\Models\MembershipTier;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MidtransPaymentController extends Controller
{
    protected MidtransService $midtrans;

    public function __construct(MidtransService $midtrans)
    {
        $this->midtrans = $midtrans;
    }

    /**
     * Member initiates Snap checkout for a tier.
     */
    public function checkout(Request $request, MembershipTier $tier)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!$tier || $tier->status !== 'ACTIVE') {
            return response()->json([
                'success' => false,
                'message' => 'Paket membership ini tidak aktif atau tidak ditemukan.',
            ], 404);
        }

        $result = $this->midtrans->createSnapTransaction($user, $tier);

        if (!$result['success']) {
            return response()->json($result, 422);
        }

        return response()->json($result);
    }

    /**
     * Webhook notification from Midtrans.
     */
    public function notification(Request $request)
    {
        $payload = $request->all();
        $response = $this->midtrans->handleNotification($payload);

        if ($response['status'] === 'error') {
            return response()->json($response, 400);
        }

        return response()->json($response, 200);
    }

    /**
     * Post-payment finish callback.
     */
    public function finish(Request $request)
    {
        $orderId = $request->query('order_id');
        $payment = $orderId ? MembershipPayment::with('tier')->where('order_id', $orderId)->first() : null;

        return redirect()->route('member.dashboard')->with('success', 'Pembayaran paket membership Anda sedang diproses dan diverifikasi.');
    }
}
