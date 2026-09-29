<?php

namespace App\Services;

use App\Models\AuditLog;
use App\Models\Membership;
use App\Models\MembershipPayment;
use App\Models\MembershipTier;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MidtransService
{
    protected string $serverKey;
    protected string $clientKey;
    protected bool $isProduction;
    protected string $snapApiUrl;

    public function __construct()
    {
        $this->serverKey = (string) config('services.midtrans.server_key', env('MIDTRANS_SERVER_KEY', 'Mid-server-CaLOeneUWptQF5Z4vrSr-td7'));
        $this->clientKey = (string) config('services.midtrans.client_key', env('MIDTRANS_CLIENT_KEY', 'Mid-client-o8FP06N-oie4kS_V'));
        $this->isProduction = (bool) config('services.midtrans.is_production', false);
        $this->snapApiUrl = $this->isProduction
            ? 'https://app.midtrans.com/snap/v1/transactions'
            : 'https://app.sandbox.midtrans.com/snap/v1/transactions';
    }

    public function getClientKey(): string
    {
        return $this->clientKey;
    }

    public function isProduction(): bool
    {
        return $this->isProduction;
    }

    /**
     * Create Midtrans Snap Transaction for a Membership Tier purchase.
     */
    public function createSnapTransaction(User $user, MembershipTier $tier): array
    {
        $basePrice = (int) round((float) $tier->price);
        $adminFee = (int) round((float) $tier->calculated_admin_fee);
        $grossAmount = $basePrice + $adminFee;

        // If tier is free, activate directly without payment gateway
        if ($grossAmount <= 0) {
            $membership = Membership::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'tier_id' => $tier->id,
                    'status' => 'ACTIVE',
                    'starts_at' => now(),
                    'ends_at' => null, // Lifetime for free tier
                ]
            );

            return [
                'success' => true,
                'is_free' => true,
                'message' => "Tier {$tier->name} berhasil diaktifkan secara gratis.",
                'membership' => $membership,
            ];
        }

        $orderId = 'AEVYRA-' . strtoupper($tier->slug) . '-' . $user->id . '-' . time();

        $items = [
            [
                'id' => 'TIER-' . $tier->id,
                'price' => $basePrice,
                'quantity' => 1,
                'name' => mb_substr('Langganan ' . $tier->name . ' AEVYRA', 0, 50),
            ],
        ];

        if ($adminFee > 0) {
            $items[] = [
                'id' => 'ADMIN-FEE-MIDTRANS',
                'price' => $adminFee,
                'quantity' => 1,
                'name' => 'Biaya Admin Gateway (Midtrans)',
            ];
        }

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => $grossAmount,
            ],
            'item_details' => $items,
            'customer_details' => [
                'first_name' => mb_substr($user->name ?: 'Member', 0, 45),
                'email' => $user->email ?: 'member@example.com',
                'phone' => !empty($user->phone) ? preg_replace('/[^0-9+]/', '', $user->phone) : '08123456789',
            ],
            'callbacks' => [
                'finish' => url('/member/memberships/finish?order_id=' . $orderId),
            ],
        ];

        // Create Payment record
        $payment = MembershipPayment::create([
            'user_id' => $user->id,
            'tier_id' => $tier->id,
            'order_id' => $orderId,
            'base_amount' => $basePrice,
            'admin_fee' => $adminFee,
            'gross_amount' => $grossAmount,
            'currency' => 'IDR',
            'status' => 'PENDING',
        ]);

        try {
            $response = Http::withBasicAuth($this->serverKey, '')
                ->withHeaders([
                    'Accept' => 'application/json',
                    'Content-Type' => 'application/json',
                ])
                ->timeout(20)
                ->post($this->snapApiUrl, $params);

            if ($response->successful()) {
                $snapData = $response->json();
                $token = $snapData['token'] ?? null;
                $redirectUrl = $snapData['redirect_url'] ?? null;

                $payment->update([
                    'snap_token' => $token,
                    'snap_redirect_url' => $redirectUrl,
                    'midtrans_response' => $snapData,
                ]);

                AuditLog::log(
                    $user->id,
                    'member',
                    'membership.snap_checkout_created',
                    'MembershipPayment',
                    (string) $payment->id,
                    [
                        'order_id' => $orderId,
                        'tier' => $tier->name,
                        'gross_amount' => $grossAmount,
                    ]
                );

                return [
                    'success' => true,
                    'is_free' => false,
                    'order_id' => $orderId,
                    'snap_token' => $token,
                    'redirect_url' => $redirectUrl,
                    'gross_amount' => $grossAmount,
                    'base_amount' => $basePrice,
                    'admin_fee' => $adminFee,
                    'client_key' => $this->clientKey,
                    'payment' => $payment,
                ];
            }

            Log::error('Midtrans Snap Error', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return [
                'success' => false,
                'message' => 'Gagal menginisiasi pembayaran Midtrans: ' . ($response->json('error_messages')[0] ?? $response->body()),
            ];
        } catch (\Throwable $e) {
            Log::error('Midtrans Exception: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return [
                'success' => false,
                'message' => 'Terjadi kesalahan koneksi ke gateway pembayaran: ' . $e->getMessage(),
            ];
        }
    }

    /**
     * Verify Midtrans Signature Key.
     */
    public function verifySignature(string $orderId, string $statusCode, string $grossAmount, string $signatureKey): bool
    {
        $expected = hash('sha512', $orderId . $statusCode . $grossAmount . $this->serverKey);
        return hash_equals($expected, $signatureKey);
    }

    /**
     * Process Webhook / Notification from Midtrans.
     */
    public function handleNotification(array $payload): array
    {
        $orderId = $payload['order_id'] ?? null;
        $statusCode = $payload['status_code'] ?? null;
        $grossAmount = $payload['gross_amount'] ?? null;
        $signatureKey = $payload['signature_key'] ?? null;
        $transactionStatus = $payload['transaction_status'] ?? null;
        $fraudStatus = $payload['fraud_status'] ?? null;
        $paymentType = $payload['payment_type'] ?? null;

        if (!$orderId || !$statusCode || !$grossAmount || !$signatureKey) {
            return ['status' => 'error', 'message' => 'Invalid payload missing required signature fields'];
        }

        if (!$this->verifySignature($orderId, $statusCode, $grossAmount, $signatureKey)) {
            Log::warning('Midtrans Invalid Signature', ['order_id' => $orderId]);
            return ['status' => 'error', 'message' => 'Invalid signature key'];
        }

        $payment = MembershipPayment::where('order_id', $orderId)->first();
        if (!$payment) {
            Log::warning('Midtrans Payment Order Not Found', ['order_id' => $orderId]);
            return ['status' => 'error', 'message' => 'Order not found'];
        }

        $newStatus = 'PENDING';
        $isPaid = false;

        if ($transactionStatus === 'capture') {
            if ($fraudStatus === 'accept') {
                $newStatus = 'SETTLEMENT';
                $isPaid = true;
            } elseif ($fraudStatus === 'challenge') {
                $newStatus = 'CHALLENGE';
            }
        } elseif ($transactionStatus === 'settlement') {
            $newStatus = 'SETTLEMENT';
            $isPaid = true;
        } elseif ($transactionStatus === 'pending') {
            $newStatus = 'PENDING';
        } elseif (in_array($transactionStatus, ['deny', 'cancel'])) {
            $newStatus = 'CANCEL';
        } elseif ($transactionStatus === 'expire') {
            $newStatus = 'EXPIRE';
        }

        $payment->update([
            'status' => $newStatus,
            'payment_type' => $paymentType,
            'paid_at' => $isPaid ? now() : $payment->paid_at,
            'midtrans_response' => $payload,
        ]);

        if ($isPaid) {
            // Activate or extend membership for user
            $tier = $payment->tier;
            $endsAt = now()->addMonth(); // Standard 1 month interval

            Membership::updateOrCreate(
                ['user_id' => $payment->user_id],
                [
                    'tier_id' => $payment->tier_id,
                    'status' => 'ACTIVE',
                    'starts_at' => now(),
                    'ends_at' => $endsAt,
                ]
            );

            AuditLog::log(
                $payment->user_id,
                'system',
                'membership.payment_settled',
                'MembershipPayment',
                (string) $payment->id,
                [
                    'order_id' => $orderId,
                    'tier' => $tier?->name,
                    'gross_amount' => $payment->gross_amount,
                    'ends_at' => $endsAt->toDateString(),
                ]
            );
        }

        return [
            'status' => 'success',
            'message' => "Payment {$orderId} successfully updated to {$newStatus}",
        ];
    }
}
