<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Consultation;
use App\Models\ConsultationMessage;
use App\Models\InstructorAvailability;
use App\Models\InstructorMemberAssignment;
use App\Models\Membership;
use App\Models\Notification;
use App\Models\PointsLedger;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // 1. Fetch all active instructors/doctors
        $instructorRole = Role::where('slug', 'instructor')->first();
        $instructorIds = $instructorRole ? $instructorRole->users()->pluck('users.id') : [];

        $instructors = User::whereIn('id', $instructorIds)
            ->where('status', 'ACTIVE')
            ->get()
            ->map(function ($doc) {
                // Determine mock clinical specialty & credentials if not present
                $specialties = [
                    'Coach Nabila Sp.GK (Health Coach)' => [
                        'title' => 'dr. Nabila Ramadhani, Sp.GK',
                        'specialty' => 'Spesialis Gizi Klinis & Pre-Diabetes Remission',
                        'hospital' => 'RSUP Cipto Mangunkusumo / AEVYRA Clinical Hub',
                        'experience' => '8 Tahun Pengalaman',
                        'rating' => 4.95,
                        'reviews_count' => 128,
                        'str_number' => 'STR-317109283921820',
                        'badge' => 'Verified Clinical Lead',
                    ],
                    'default' => [
                        'title' => $doc->name,
                        'specialty' => 'Lifestyle & Metabolic Health Specialist',
                        'hospital' => 'AEVYRA Tele-Medicine Network',
                        'experience' => '5+ Tahun Pengalaman',
                        'rating' => 4.9,
                        'reviews_count' => 84,
                        'str_number' => 'STR-3171000' . $doc->id,
                        'badge' => 'Certified Practitioner',
                    ]
                ];

                $meta = $specialties[$doc->name] ?? $specialties['default'];

                return [
                    'id' => $doc->id,
                    'name' => $doc->name,
                    'email' => $doc->email,
                    'title' => $meta['title'],
                    'specialty' => $meta['specialty'],
                    'hospital' => $meta['hospital'],
                    'experience' => $meta['experience'],
                    'rating' => $meta['rating'],
                    'reviews_count' => $meta['reviews_count'],
                    'str_number' => $meta['str_number'],
                    'badge' => $meta['badge'],
                    'avatar' => '/image/doctor_bramantyo.jpg',
                ];
            });

        // 2. Fetch user's consultations (upcoming and past)
        $consultations = Consultation::where('member_id', $user->id)
            ->with(['instructor:id,name,email', 'cancelledBy:id,name'])
            ->orderBy('scheduled_start', 'desc')
            ->get()
            ->map(function ($c) {
                return [
                    'id' => $c->id,
                    'instructor_id' => $c->instructor_id,
                    'instructor_name' => $c->instructor?->name ?? 'Dokter Konsultan',
                    'scheduled_start' => $c->scheduled_start?->format('Y-m-d H:i'),
                    'scheduled_end' => $c->scheduled_end?->format('Y-m-d H:i'),
                    'purpose' => $c->purpose,
                    'status' => $c->status,
                    'meeting_url' => $c->meeting_url,
                    'notes' => $c->notes,
                    'cancellation_reason' => $c->cancellation_reason,
                    'cancelled_at' => $c->cancelled_at?->format('Y-m-d H:i'),
                    'cancelled_by_id' => $c->cancelled_by_id,
                    'cancelled_by_name' => $c->cancelledBy?->name,
                    'cancelled_by_role' => $c->cancelled_by_id === $c->instructor_id ? 'INSTRUCTOR' : ($c->cancelled_by_id === $c->member_id ? 'MEMBER' : null),
                    'is_upcoming' => $c->scheduled_start && $c->scheduled_start->isFuture() && !in_array($c->status, ['CANCELLED', 'COMPLETED']),
                ];
            });

        // 3. User active membership & dynamic consultation quota
        $quotaService = app(\App\Services\Membership\ConsultationQuotaService::class);
        $quota = $quotaService->getMemberQuota($user);

        // 3b. Fetch latest health metrics summary for clinical chat context
        $coreMetrics = ['blood_glucose', 'sleep_duration', 'steps', 'water_intake', 'calories'];
        $latestRecords = \App\Models\HealthRecord::where('user_id', $user->id)
            ->whereIn('metric_type', $coreMetrics)
            ->orderBy('recorded_at', 'desc')
            ->get()
            ->groupBy('metric_type')
            ->map(function ($items) {
                $first = $items->first();
                return [
                    'value' => (float) $first->value_numeric,
                    'unit' => $first->unit,
                    'recorded_at' => $first->recorded_at ? $first->recorded_at->format('d M H:i') : null,
                ];
            });

        // 3c. Fetch assigned instructors for fast access
        $assignedInstructorIds = InstructorMemberAssignment::where('member_id', $user->id)
            ->where('status', 'ACTIVE')
            ->pluck('instructor_id')
            ->toArray();

        // 4. Default available time slots template
        $defaultSlots = [
            '09:00', '10:00', '11:00', '13:30', '14:30', '16:00', '19:00', '20:00'
        ];

        return Inertia::render('Member/ConsultationsHub', [
            'instructors' => $instructors,
            'consultations' => $consultations,
            'assignedInstructorIds' => $assignedInstructorIds,
            'healthMetrics' => $latestRecords,
            'membership' => [
                'tier' => $quota['tier_name'],
                'tier_slug' => $quota['tier_slug'],
                'quota' => $quota,
            ],
            'defaultSlots' => $defaultSlots,
        ]);
    }

    public function getSlots(Request $request, User $instructor)
    {
        $date = $request->query('date', now()->addDay()->toDateString());
        $requestedDate = Carbon::parse($date);

        // Standard consultation timeslots (09:00 to 20:00 WIB)
        $standardSlots = [
            '09:00', '10:00', '11:00', '13:30', '14:30', '15:30', '17:00', '19:00', '20:00'
        ];

        // Fetch existing bookings for this instructor on this date
        $bookedTimes = Consultation::where('instructor_id', $instructor->id)
            ->whereDate('scheduled_start', $requestedDate->toDateString())
            ->whereNotIn('status', ['CANCELLED'])
            ->get()
            ->map(function ($c) {
                return $c->scheduled_start->format('H:i');
            })
            ->toArray();

        $availableSlots = array_values(array_filter($standardSlots, function ($slot) use ($bookedTimes, $requestedDate) {
            $slotDateTime = Carbon::parse($requestedDate->toDateString() . ' ' . $slot);
            if ($slotDateTime->isPast()) {
                return false;
            }
            return !in_array($slot, $bookedTimes);
        }));

        return response()->json([
            'date' => $requestedDate->toDateString(),
            'instructor_id' => $instructor->id,
            'slots' => $availableSlots,
        ]);
    }

    public function store(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $validated = $request->validate([
            'instructor_id' => 'required|exists:users,id',
            'scheduled_date' => 'required|date',
            'scheduled_time' => 'required|string',
            'purpose' => 'required|string|min:3|max:500',
            'health_context' => 'nullable|string|max:500',
        ]);

        // Check consultation quota according to active subscription tier
        $quotaService = app(\App\Services\Membership\ConsultationQuotaService::class);
        $quotaError = $quotaService->validateBooking($user);
        if ($quotaError) {
            return back()->withErrors(['general' => $quotaError]);
        }

        $start = Carbon::parse($validated['scheduled_date'] . ' ' . $validated['scheduled_time']);
        $end = (clone $start)->addMinutes(45);

        // Check double booking
        $conflict = Consultation::where('instructor_id', $validated['instructor_id'])
            ->where('scheduled_start', $start)
            ->whereNotIn('status', ['CANCELLED'])
            ->exists();

        if ($conflict) {
            return back()->withErrors(['scheduled_time' => 'Jadwal jam ini baru saja dipesan oleh pasien lain. Silakan pilih jam lain.']);
        }

        $purpose = $validated['purpose'];
        if (!empty($validated['health_context'])) {
            $purpose .= ' [Konteks Klinis: ' . $validated['health_context'] . ']';
        }

        $meetingId = 'AEVYRA-ROOM-' . strtoupper(substr(md5(uniqid()), 0, 8));
        $meetingUrl = 'https://telemed.aevyra.health/' . $meetingId;

        $consultation = Consultation::create([
            'member_id' => $user->id,
            'instructor_id' => $validated['instructor_id'],
            'status' => 'CONFIRMED',
            'scheduled_start' => $start,
            'scheduled_end' => $end,
            'purpose' => $purpose,
            'meeting_url' => $meetingUrl,
            'notes' => 'Sesi tele-konsultasi preventif terjadwal. Pasien dipersiapkan dengan data rekam medis 7 hari terakhir.',
        ]);

        // Auto-assign instructor to member if not already assigned
        InstructorMemberAssignment::firstOrCreate(
            [
                'member_id' => $user->id,
                'instructor_id' => $validated['instructor_id'],
            ],
            [
                'status' => 'ACTIVE',
                'starts_at' => now(),
                'assigned_by' => $user->id,
            ]
        );

        // Send notifications
        $formattedStart = $start->translatedFormat('l, d F Y H:i');
        try {
            // Notification for Instructor
            Notification::create([
                'user_id' => $validated['instructor_id'],
                'type' => 'CONSULTATION_BOOKED',
                'title' => 'Jadwal Tele-Konsultasi Baru Masuk',
                'body' => "Pasien {$user->name} telah memesan sesi bimbingan untuk {$formattedStart} WIB. Topik: {$purpose}",
                'data' => [
                    'category' => 'consultation',
                    'consultation_id' => $consultation->id,
                    'action_url' => '/instructor/consultations',
                ],
                'read_at' => null,
                'delivered_at' => now(),
            ]);

            // Notification for Member
            $instructor = User::find($validated['instructor_id']);
            $doctorName = $instructor?->name ?? 'Dokter Pendamping';
            Notification::create([
                'user_id' => $user->id,
                'type' => 'CONSULTATION_CONFIRMED',
                'title' => 'Jadwal Tele-Konsultasi Dikonfirmasi',
                'body' => "Sesi tele-konsultasi Anda bersama {$doctorName} telah berhasil dijadwalkan pada {$formattedStart} WIB.",
                'data' => [
                    'category' => 'consultation',
                    'consultation_id' => $consultation->id,
                    'action_url' => '/member/consultations-hub?tab=live_chat&consultation_id=' . $consultation->id,
                ],
                'read_at' => null,
                'delivered_at' => now(),
            ]);
        } catch (\Throwable $e) {
            // Ignore notification failure
        }

        // Initialize welcome message in room
        try {
            $doctor = User::find($validated['instructor_id']);
            $docName = $doctor?->name ?? 'Dokter Pendamping';
            ConsultationMessage::create([
                'consultation_id' => $consultation->id,
                'sender_id' => $validated['instructor_id'],
                'sender_role' => 'INSTRUCTOR',
                'message' => "Halo! Saya {$docName}. Sesi tele-konsultasi Anda telah dibuka dengan topik: \"{$consultation->purpose}\". Anda dapat bertanya, mendiskusikan keluhan, atau membagikan data biomarker terukur Anda di sini sebelum sesi dimulai.",
                'is_read' => true,
            ]);
        } catch (\Throwable $e) {
            // Ignore starter message failure
        }

        // Award +10 Gamification Points for booking preventive consultation
        PointsLedger::create([
            'user_id' => $user->id,
            'event_type' => 'CONSULTATION_BOOKED',
            'points' => 10,
            'reference_type' => 'Consultation',
            'reference_id' => (string) $consultation->id,
            'created_at' => now(),
        ]);

        // Audit Log
        AuditLog::log(
            $user->id,
            'MEMBER',
            'BOOK_CONSULTATION',
            'Consultation',
            $consultation->id,
            [
                'instructor_id' => $validated['instructor_id'],
                'scheduled_start' => $start->toDateTimeString(),
            ]
        );

        return redirect()->route('member.consultations.index')->with('success', 'Jadwal tele-konsultasi Anda berhasil dikonfirmasi. Tautan video call telah aktif.');
    }

    public function cancel(Request $request, Consultation $consultation)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($consultation->member_id !== $user->id) {
            abort(403, 'Akses dibatasi.');
        }

        if ($consultation->status === 'COMPLETED') {
            return back()->withErrors(['general' => 'Konsultasi yang telah selesai tidak dapat dibatalkan.']);
        }

        if ($consultation->status === 'CANCELLED') {
            return back()->withErrors(['general' => 'Konsultasi ini sudah dibatalkan sebelumnya.']);
        }

        $validated = $request->validate([
            'reason' => 'nullable|string|max:500',
        ]);

        $reason = !empty($validated['reason'])
            ? trim($validated['reason'])
            : 'Pasien berhalangan hadir pada jadwal yang telah ditentukan.';

        $formattedTime = now()->translatedFormat('d M Y H:i');

        $consultation->update([
            'status' => 'CANCELLED',
            'cancelled_at' => now(),
            'cancellation_reason' => $reason,
            'cancelled_by_id' => $user->id,
            'notes' => ($consultation->notes ? $consultation->notes . "\n" : '') . "[Dibatalkan oleh pasien pada {$formattedTime} WIB. Alasan: {$reason}]",
        ]);

        // Send Notification to Instructor
        try {
            $formattedStart = $consultation->scheduled_start ? $consultation->scheduled_start->translatedFormat('d M Y H:i') : 'terjadwal';
            Notification::create([
                'user_id' => $consultation->instructor_id,
                'type' => 'CONSULTATION_CANCELLED',
                'title' => 'Jadwal Konsultasi Dibatalkan oleh Pasien',
                'body' => "Pasien {$user->name} telah membatalkan sesi konsultasi jadwal {$formattedStart} WIB. Alasan: \"{$reason}\".",
                'data' => [
                    'category' => 'consultation',
                    'consultation_id' => $consultation->id,
                    'action_url' => '/instructor/consultations',
                ],
                'read_at' => null,
                'delivered_at' => now(),
            ]);
        } catch (\Throwable $e) {}

        // Send Notification to Member (Confirms Quota Refund)
        try {
            Notification::create([
                'user_id' => $user->id,
                'type' => 'CONSULTATION_CANCELLED',
                'title' => 'Konsultasi Berhasil Dibatalkan',
                'body' => "Jadwal konsultasi Anda telah dibatalkan dan 1 kuota sesi konsultasi telah dikembalikan ke akun Anda secara otomatis.",
                'data' => [
                    'category' => 'consultation',
                    'consultation_id' => $consultation->id,
                    'action_url' => '/member/consultations-hub?tab=booking',
                ],
                'read_at' => null,
                'delivered_at' => now(),
            ]);
        } catch (\Throwable $e) {}

        // Insert System Cancellation Notice into Chat Room
        ConsultationMessage::create([
            'consultation_id' => $consultation->id,
            'sender_id' => $user->id,
            'sender_role' => 'SYSTEM',
            'message' => "⚠️ [PEMBERITAHUAN SISTEM] Sesi konsultasi ini telah dibatalkan oleh pasien {$user->name} pada {$formattedTime} WIB.\nAlasan: \"{$reason}\".\nKuota sesi tele-konsultasi telah dikembalikan ke akun pasien.",
            'metric_payload' => [
                'event' => 'CANCELLED',
                'by' => 'MEMBER',
                'reason' => $reason,
                'cancelled_at' => now()->toIso8601String(),
            ],
            'is_read' => true,
        ]);

        AuditLog::log(
            $user->id,
            'MEMBER',
            'CANCEL_CONSULTATION',
            'Consultation',
            $consultation->id,
            ['reason' => $reason]
        );

        return back()->with('success', 'Jadwal tele-konsultasi berhasil dibatalkan. Kuota sesi konsultasi Anda telah dikembalikan secara utuh.');
    }

    public function getMessages(Request $request, Consultation $consultation)
    {
        $user = Auth::user();
        if ((int)$consultation->member_id !== (int)$user->id && (int)$consultation->instructor_id !== (int)$user->id) {
            abort(403, 'Akses ruang konsultasi dibatasi.');
        }

        // Mark incoming messages as read
        if ((int)$user->id === (int)$consultation->instructor_id) {
            \App\Models\ConsultationMessage::where('consultation_id', $consultation->id)
                ->where('sender_role', 'MEMBER')
                ->where('is_read', false)
                ->update(['is_read' => true]);
        } elseif ((int)$user->id === (int)$consultation->member_id) {
            \App\Models\ConsultationMessage::where('consultation_id', $consultation->id)
                ->where('sender_role', 'INSTRUCTOR')
                ->where('is_read', false)
                ->update(['is_read' => true]);
        }

        $messages = \App\Models\ConsultationMessage::where('consultation_id', $consultation->id)
            ->with('sender:id,name,email')
            ->orderBy('created_at', 'asc')
            ->get();

        if ($messages->isEmpty()) {
            $doctorName = $consultation->instructor?->name ?? 'Dokter Pendamping';
            $initial = \App\Models\ConsultationMessage::create([
                'consultation_id' => $consultation->id,
                'sender_id' => $consultation->instructor_id,
                'sender_role' => 'INSTRUCTOR',
                'message' => "Halo! Saya {$doctorName}. Sesi tele-konsultasi Anda telah dibuka dengan topik: \"{$consultation->purpose}\". Anda dapat bertanya, mendiskusikan keluhan, atau membagikan data biomarker terukur Anda di sini.",
                'is_read' => true,
            ]);
            $initial->load('sender:id,name,email');
            $messages = collect([$initial]);
        }

        $consultation->loadMissing(['cancelledBy:id,name', 'member:id,name,email', 'instructor:id,name,email']);

        return response()->json([
            'consultation' => [
                'id' => $consultation->id,
                'member_id' => $consultation->member_id,
                'member_name' => $consultation->member?->name ?? 'Member Binaan',
                'member_email' => $consultation->member?->email ?? '-',
                'meeting_url' => $consultation->meeting_url,
                'purpose' => $consultation->purpose,
                'status' => $consultation->status,
                'scheduled_start' => $consultation->scheduled_start?->format('Y-m-d H:i'),
                'scheduled_end' => $consultation->scheduled_end?->format('Y-m-d H:i'),
                'doctor_name' => $consultation->instructor?->name ?? 'Dokter Pendamping',
                'doctor_title' => 'Spesialis Gizi Klinis & Metabolik',
                'notes' => $consultation->notes,
                'cancellation_reason' => $consultation->cancellation_reason,
                'cancelled_at' => $consultation->cancelled_at?->format('Y-m-d H:i'),
                'cancelled_by_id' => $consultation->cancelled_by_id,
                'cancelled_by_name' => $consultation->cancelledBy?->name,
                'cancelled_by_role' => $consultation->cancelled_by_id === $consultation->instructor_id ? 'INSTRUCTOR' : ($consultation->cancelled_by_id === $consultation->member_id ? 'MEMBER' : null),
            ],
            'messages' => $messages,
        ]);
    }

    public function sendMessage(Request $request, Consultation $consultation)
    {
        $user = Auth::user();
        if ((int)$consultation->member_id !== (int)$user->id && (int)$consultation->instructor_id !== (int)$user->id) {
            abort(403, 'Akses ruang konsultasi dibatasi.');
        }

        if ($consultation->status === 'CANCELLED') {
            return response()->json(['error' => 'Sesi tele-konsultasi ini telah dibatalkan. Anda tidak dapat mengirim pesan baru.'], 422);
        }

        if ($consultation->status === 'COMPLETED') {
            return response()->json(['error' => 'Sesi tele-konsultasi ini telah selesai dan diarsipkan.'], 422);
        }

        $validated = $request->validate([
            'message' => 'required|string|max:2500',
            'metric_payload' => 'nullable|array',
        ]);

        $senderRole = (int)$user->id === (int)$consultation->instructor_id ? 'INSTRUCTOR' : 'MEMBER';

        $msg = \App\Models\ConsultationMessage::create([
            'consultation_id' => $consultation->id,
            'sender_id' => $user->id,
            'sender_role' => $senderRole,
            'message' => $validated['message'],
            'metric_payload' => $validated['metric_payload'] ?? null,
            'is_read' => false,
        ]);
        $msg->load('sender:id,name,email');

        // Send in-app notification to the recipient
        try {
            $recipientId = $senderRole === 'INSTRUCTOR' ? $consultation->member_id : $consultation->instructor_id;
            $senderName = $user->name;
            $truncatedText = \Illuminate\Support\Str::limit($validated['message'], 100);

            \App\Models\Notification::create([
                'user_id' => $recipientId,
                'type' => 'NEW_CHAT_MESSAGE',
                'title' => $senderRole === 'INSTRUCTOR' ? "Pesan Baru dari Dokter {$senderName}" : "Pesan Baru dari Pasien {$senderName}",
                'body' => $truncatedText,
                'data' => [
                    'category' => 'consultation',
                    'consultation_id' => $consultation->id,
                    'action_url' => $senderRole === 'INSTRUCTOR'
                        ? '/member/consultations-hub?tab=live_chat&consultation_id=' . $consultation->id
                        : '/instructor/chat?consultation_id=' . $consultation->id,
                ],
                'read_at' => null,
                'delivered_at' => now(),
            ]);
        } catch (\Throwable $e) {}

        return response()->json([
            'success' => true,
            'message' => $msg,
        ]);
    }
}
