<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Consultation;
use App\Models\InstructorAvailability;
use App\Models\InstructorMemberAssignment;
use App\Models\Membership;
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
                    'avatar' => '/images/doctor-portrait.jpg',
                ];
            });

        // 2. Fetch user's consultations (upcoming and past)
        $consultations = Consultation::where('member_id', $user->id)
            ->with('instructor')
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

        $consultation->update([
            'status' => 'CANCELLED',
            'cancelled_at' => now(),
            'notes' => ($consultation->notes ?? '') . ' [Dibatalkan oleh pasien pada ' . now()->toDateTimeString() . ']',
        ]);

        AuditLog::log(
            $user->id,
            'MEMBER',
            'CANCEL_CONSULTATION',
            'Consultation',
            $consultation->id,
            ['reason' => $request->input('reason', 'Pasien membatalkan sesi')]
        );

        return back()->with('success', 'Jadwal konsultasi berhasil dibatalkan.');
    }

    public function getMessages(Request $request, Consultation $consultation)
    {
        $user = Auth::user();
        if ($consultation->member_id !== $user->id && $consultation->instructor_id !== $user->id) {
            abort(403, 'Akses ruang konsultasi dibatasi.');
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

        return response()->json([
            'consultation' => [
                'id' => $consultation->id,
                'purpose' => $consultation->purpose,
                'status' => $consultation->status,
                'scheduled_start' => $consultation->scheduled_start?->format('Y-m-d H:i'),
                'doctor_name' => $consultation->instructor?->name ?? 'Dokter Pendamping',
                'doctor_title' => 'Spesialis Gizi Klinis & Metabolik',
                'notes' => $consultation->notes,
            ],
            'messages' => $messages,
        ]);
    }

    public function sendMessage(Request $request, Consultation $consultation)
    {
        $user = Auth::user();
        if ($consultation->member_id !== $user->id && $consultation->instructor_id !== $user->id) {
            abort(403, 'Akses ruang konsultasi dibatasi.');
        }

        if ($consultation->status === 'CANCELLED') {
            return response()->json(['error' => 'Sesi tele-konsultasi ini telah dibatalkan.'], 422);
        }

        $validated = $request->validate([
            'message' => 'required|string|max:2500',
            'metric_payload' => 'nullable|array',
        ]);

        $senderRole = $user->id === $consultation->instructor_id ? 'INSTRUCTOR' : 'MEMBER';

        $msg = \App\Models\ConsultationMessage::create([
            'consultation_id' => $consultation->id,
            'sender_id' => $user->id,
            'sender_role' => $senderRole,
            'message' => $validated['message'],
            'metric_payload' => $validated['metric_payload'] ?? null,
            'is_read' => false,
        ]);
        $msg->load('sender:id,name,email');

        return response()->json([
            'success' => true,
            'message' => $msg,
        ]);
    }
}
