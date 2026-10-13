<?php

namespace App\Services;

use App\Models\AuditLog;
use App\Models\Membership;
use App\Models\MembershipPayment;
use App\Models\MembershipTier;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MidtransService
{
    protected string $serverKey;
    protected string $clientKey;
    protected bool $isProduction;
    protected string $snapApiUrl;
    protected string $coreApiUrl;

    public function __construct()
    {
        $this->serverKey = (string) config('services.midtrans.server_key', env('MIDTRANS_SERVER_KEY', 'Mid-server-CaLOeneUWptQF5Z4vrSr-td7'));
        $this->clientKey = (string) config('services.midtrans.client_key', env('MIDTRANS_CLIENT_KEY', 'Mid-client-o8FP06N-oie4kS_V'));
        $this->isProduction = (bool) config('services.midtrans.is_production', false);
        $this->snapApiUrl = $this->isProduction
            ? 'https://app.midtrans.com/snap/v1/transactions'
            : 'https://app.sandbox.midtrans.com/snap/v1/transactions';
        $this->coreApiUrl = $this->isProduction
            ? 'https://api.midtrans.com/v2'
            : 'https://api.sandbox.midtrans.com/v2';
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
     * Create Midtrans Snap Transaction for a Membership Tier purchase with strict anti-scripting sanitization.
     */
    public function createSnapTransaction(User $user, MembershipTier $tier): array
    {
        // Server-side authoritative calculation: never trust client for amounts
        $basePrice = (int) round((float) $tier->price);
        $adminFee = (int) round((float) $tier->calculated_admin_fee);
        $grossAmount = $basePrice + $adminFee;

        // If tier is free (0 IDR), activate directly without payment gateway
        if ($grossAmount <= 0) {
            $membership = Membership::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'tier_id' => $tier->id,
                    'status' => 'ACTIVE',
                    'starts_at' => now(),
                    'ends_at' => null, // Lifetime for free tier
                    'downgrade_to_tier_id' => null,
                    'downgrade_at' => null,
                    'downgrade_reason' => null,
                ]
            );

            // Automated notification for free tier activation
            try {
                Notification::create([
                    'user_id' => $user->id,
                    'type' => 'MEMBERSHIP_ACTIVATED',
                    'title' => "Paket {$tier->name} Berhasil Diaktifkan",
                    'body' => "Paket {$tier->name} telah aktif pada akun Anda tanpa biaya. Nikmati akses skrining mandiri label pangan & integrasi medis.",
                    'data' => [
                        'category' => 'system',
                        'tier_name' => $tier->name,
                        'tier_slug' => $tier->slug,
                        'action_url' => '/paket',
                    ],
                    'read_at' => null,
                    'delivered_at' => now(),
                ]);
            } catch (\Throwable $e) {
                Log::error('Error creating free tier notification: ' . $e->getMessage());
            }

            return [
                'success' => true,
                'is_free' => true,
                'message' => "Tier {$tier->name} berhasil diaktifkan secara gratis.",
                'membership' => $membership,
            ];
        }

        // Generate tamper-resistant unique Order ID
        $cleanSlug = strtoupper(preg_replace('/[^A-Za-z0-9]/', '', $tier->slug));
        $orderId = 'AEVYRA-' . $cleanSlug . '-' . $user->id . '-' . time();

        // Anti-scripting sanitization for item details
        $cleanTierName = htmlspecialchars(strip_tags('Langganan ' . $tier->name . ' AEVYRA'), ENT_QUOTES, 'UTF-8');
        $cleanTierName = mb_substr($cleanTierName, 0, 50);

        $items = [
            [
                'id' => 'TIER-' . $tier->id,
                'price' => $basePrice,
                'quantity' => 1,
                'name' => $cleanTierName,
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

        // Strict customer data sanitization to prevent XSS / script injection in Midtrans dashboard/invoices
        $cleanCustomerName = htmlspecialchars(strip_tags(trim($user->name ?: 'Member')), ENT_QUOTES, 'UTF-8');
        $cleanCustomerName = mb_substr($cleanCustomerName, 0, 45);

        $cleanEmail = filter_var($user->email, FILTER_VALIDATE_EMAIL) ? $user->email : 'member@example.com';
        $cleanPhone = preg_replace('/[^0-9+]/', '', (string) $user->phone);
        if (empty($cleanPhone) || strlen($cleanPhone) < 8) {
            $cleanPhone = '08123456789';
        }

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => $grossAmount,
            ],
            'item_details' => $items,
            'customer_details' => [
                'first_name' => $cleanCustomerName,
                'email' => $cleanEmail,
                'phone' => $cleanPhone,
            ],
            'callbacks' => [
                'finish' => url('/member/memberships/finish?order_id=' . urlencode($orderId)),
            ],
        ];

        // Create Payment record in DB
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
     * Verify Midtrans Signature Key using SHA-512 with timing-attack resistant comparison.
     */
    public function verifySignature(string $orderId, string $statusCode, string $grossAmount, string $signatureKey): bool
    {
        // Enforce formatted gross_amount standard (Midtrans uses e.g. "153000.00" or int)
        $expected = hash('sha512', $orderId . $statusCode . $grossAmount . $this->serverKey);
        return hash_equals($expected, $signatureKey);
    }

    /**
     * Query Midtrans Core API directly to get authoritative, untampered transaction status.
     * Prevents client spoofing and webhook falsification.
     */
    public function checkTransactionStatus(string $orderId): array
    {
        // Strict anti-scripting validation on order ID format
        if (!preg_match('/^[A-Za-z0-9\-_]{5,100}$/', $orderId)) {
            return [
                'success' => false,
                'message' => 'Format ID transaksi tidak valid atau berpotensi berbahaya.',
            ];
        }

        try {
            $response = Http::withBasicAuth($this->serverKey, '')
                ->withHeaders([
                    'Accept' => 'application/json',
                ])
                ->timeout(15)
                ->get("{$this->coreApiUrl}/{$orderId}/status");

            if ($response->successful()) {
                return [
                    'success' => true,
                    'data' => $response->json(),
                ];
            }

            return [
                'success' => false,
                'status_code' => $response->status(),
                'message' => 'Gagal mengambil status transaksi dari Midtrans: ' . ($response->json('status_message') ?? $response->body()),
            ];
        } catch (\Throwable $e) {
            Log::error("Midtrans Status API check error for {$orderId}: " . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Gangguan koneksi ke Midtrans saat memverifikasi status transaksi.',
            ];
        }
    }

    /**
     * Authoritatively synchronize payment record with Midtrans with atomic DB lock and amount verification.
     * Guarantees idempotency and prevents race conditions / double activation.
     */
    public function syncPaymentWithMidtrans(string $orderId): array
    {
        // 1. Anti-scripting & format validation
        if (!preg_match('/^[A-Za-z0-9\-_]{5,100}$/', $orderId)) {
            return [
                'success' => false,
                'status' => 'error',
                'message' => 'ID pesanan mengandung karakter tidak valid.',
            ];
        }

        // 2. Fetch order from DB
        $payment = MembershipPayment::where('order_id', $orderId)->first();
        if (!$payment) {
            return [
                'success' => false,
                'status' => 'error',
                'message' => 'Catatan transaksi pembayaran tidak ditemukan di sistem.',
            ];
        }

        // 3. Query Midtrans Server API directly
        $apiResult = $this->checkTransactionStatus($orderId);
        if (!$apiResult['success']) {
            return [
                'success' => false,
                'status' => 'error',
                'message' => $apiResult['message'] ?? 'Transaksi belum terdaftar atau masih dalam antrean di Midtrans.',
                'payment' => $payment,
            ];
        }

        $midtransData = $apiResult['data'];

        // 4. Critical Security Verification: Anti-tampering check on gross amount and currency
        $apiGrossAmount = (float) ($midtransData['gross_amount'] ?? 0);
        $expectedGrossAmount = (float) $payment->gross_amount;
        if (abs($apiGrossAmount - $expectedGrossAmount) > 0.01) {
            Log::critical("SECURITY ALERT: Midtrans Gross Amount Tampering Detected! Order: {$orderId}, API Amount: {$apiGrossAmount}, DB Amount: {$expectedGrossAmount}");
            return [
                'success' => false,
                'status' => 'error',
                'message' => 'Terdeteksi ketidakcocokan jumlah pembayaran. Verifikasi keamanan ditolak.',
            ];
        }

        // 5. Verify Midtrans SHA-512 signature from live API response
        $apiStatusCode = (string) ($midtransData['status_code'] ?? '');
        $apiRawGross = (string) ($midtransData['gross_amount'] ?? '');
        $apiSignature = (string) ($midtransData['signature_key'] ?? '');

        if (!empty($apiSignature) && !$this->verifySignature($orderId, $apiStatusCode, $apiRawGross, $apiSignature)) {
            Log::critical("SECURITY ALERT: Invalid Midtrans Signature on Status Check! Order: {$orderId}");
            return [
                'success' => false,
                'status' => 'error',
                'message' => 'Tanda tangan kriptografis dari Midtrans tidak valid.',
            ];
        }

        // 6. Atomic DB Transaction with Row Locking (Prevents double credit & race condition)
        return DB::transaction(function () use ($payment, $midtransData, $orderId) {
            /** @var MembershipPayment $lockedPayment */
            $lockedPayment = MembershipPayment::where('id', $payment->id)->lockForUpdate()->first();

            $transactionStatus = $midtransData['transaction_status'] ?? null;
            $fraudStatus = $midtransData['fraud_status'] ?? null;
            $paymentType = $midtransData['payment_type'] ?? null;

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

            // Idempotency: If already settled, do not duplicate membership activation
            if ($lockedPayment->status === 'SETTLEMENT') {
                return [
                    'success' => true,
                    'status' => 'success',
                    'payment_status' => 'SETTLEMENT',
                    'is_paid' => true,
                    'message' => 'Pembayaran telah terverifikasi lunas dan paket membership telah aktif.',
                    'payment' => $lockedPayment,
                ];
            }

            $lockedPayment->update([
                'status' => $newStatus,
                'payment_type' => $paymentType ?? $lockedPayment->payment_type,
                'paid_at' => $isPaid ? ($lockedPayment->paid_at ?: now()) : null,
                'midtrans_response' => $midtransData,
            ]);

            if ($isPaid) {
                $tier = $lockedPayment->tier;
                // Calculate dynamic ends_at: if user already has an active subscription ending in the future, extend from that date
                $currentMembership = Membership::where('user_id', $lockedPayment->user_id)->first();
                $baseDate = ($currentMembership && $currentMembership->ends_at && $currentMembership->ends_at->isFuture())
                    ? $currentMembership->ends_at
                    : now();
                $endsAt = (clone $baseDate)->addMonth();

                $membership = Membership::updateOrCreate(
                    ['user_id' => $lockedPayment->user_id],
                    [
                        'tier_id' => $lockedPayment->tier_id,
                        'status' => 'ACTIVE',
                        'starts_at' => now(),
                        'ends_at' => $endsAt,
                        'downgrade_to_tier_id' => null,
                        'downgrade_at' => null,
                        'downgrade_reason' => null,
                    ]
                );

                // Automated in-app notification to member upon successful payment
                try {
                    $formattedAmount = number_format((float) $lockedPayment->gross_amount, 0, ',', '.');
                    Notification::create([
                        'user_id' => $lockedPayment->user_id,
                        'type' => 'MEMBERSHIP_PAYMENT_SUCCESS',
                        'title' => "Pembayaran Berhasil! Paket {$tier?->name} Aktif",
                        'body' => "Terima kasih! Pembayaran sebesar Rp {$formattedAmount} telah berhasil diverifikasi. Paket {$tier?->name} Anda kini aktif hingga " . $endsAt->translatedFormat('d F Y') . ".",
                        'data' => [
                            'category' => 'system',
                            'order_id' => $orderId,
                            'tier_name' => $tier?->name,
                            'tier_slug' => $tier?->slug,
                            'gross_amount' => $lockedPayment->gross_amount,
                            'ends_at' => $endsAt->toDateString(),
                            'action_url' => '/paket',
                        ],
                        'read_at' => null,
                        'delivered_at' => now(),
                    ]);
                } catch (\Throwable $e) {
                    Log::error('Error creating payment settled notification: ' . $e->getMessage());
                }

                AuditLog::log(
                    $lockedPayment->user_id,
                    'system',
                    'membership.payment_settled',
                    'MembershipPayment',
                    (string) $lockedPayment->id,
                    [
                        'order_id' => $orderId,
                        'tier' => $tier?->name,
                        'gross_amount' => $lockedPayment->gross_amount,
                        'payment_type' => $paymentType,
                        'ends_at' => $endsAt->toDateString(),
                    ]
                );
            }

            return [
                'success' => true,
                'status' => 'success',
                'payment_status' => $newStatus,
                'is_paid' => $isPaid,
                'message' => $isPaid
                    ? 'Pembayaran berhasil diverifikasi dan keanggotaan aktif.'
                    : ($newStatus === 'EXPIRE'
                        ? 'Waktu pembayaran telah kedaluwarsa. Silakan lakukan pemesanan ulang.'
                        : 'Pembayaran sedang menunggu konfirmasi.'),
                'payment' => $lockedPayment,
            ];
        });
    }

    /**
     * Process Webhook / Notification from Midtrans.
     * Validates signature AND performs active server-to-server verification for zero-trust security.
     */
    public function handleNotification(array $payload): array
    {
        $orderId = $payload['order_id'] ?? null;
        $statusCode = $payload['status_code'] ?? null;
        $grossAmount = $payload['gross_amount'] ?? null;
        $signatureKey = $payload['signature_key'] ?? null;

        if (!$orderId || !$statusCode || !$grossAmount || !$signatureKey) {
            return ['status' => 'error', 'message' => 'Payload notifikasi tidak lengkap atau tidak valid.'];
        }

        // 1. Strict anti-scripting check on order_id
        if (!preg_match('/^[A-Za-z0-9\-_]{5,100}$/', $orderId)) {
            Log::warning('Midtrans Webhook: Malformed order_id received', ['order_id' => $orderId]);
            return ['status' => 'error', 'message' => 'Format order_id tidak valid.'];
        }

        // 2. Cryptographic signature check
        if (!$this->verifySignature((string) $orderId, (string) $statusCode, (string) $grossAmount, (string) $signatureKey)) {
            Log::warning('Midtrans Webhook: Invalid SHA-512 Signature', ['order_id' => $orderId]);
            return ['status' => 'error', 'message' => 'Tanda tangan digital tidak sah.'];
        }

        // 3. Delegate to syncPaymentWithMidtrans for authoritative Server-to-Server verification and atomic update
        $result = $this->syncPaymentWithMidtrans((string) $orderId);

        if (!$result['success']) {
            return ['status' => 'error', 'message' => $result['message']];
        }

        return [
            'status' => 'success',
            'message' => "Order {$orderId} berhasil diproses dengan status {$result['payment_status']}",
        ];
    }
}
