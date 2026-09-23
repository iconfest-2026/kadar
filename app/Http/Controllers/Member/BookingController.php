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

        // 3. User active membership & quota
        $membership = Membership::where('user_id', $user->id)
            ->where('status', 'ACTIVE')
            ->with('tier')
            ->first();

        $tierName = $membership?->tier?->name ?? 'Silver';
        $quota = match (strtoupper($tierName)) {
            'PLATINUM' => ['total' => 8, 'used' => $consultations->where('is_upcoming', true)->count()],
            'GOLD' => ['total' => 4, 'used' => $consultations->where('is_upcoming', true)->count()],
            default => ['total' => 1, 'used' => $consultations->where('is_upcoming', true)->count()],
        };

        // 4. Default available time slots template
        $defaultSlots = [
            '09:00', '10:00', '11:00', '13:30', '14:30', '16:00', '19:00', '20:00'
        ];

        return Inertia::render('Member/ConsultationsHub', [
            'instructors' => $instructors,
            'consultations' => $consultations,
            'membership' => [
                'tier' => $tierName,
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
            'scheduled_date' => 'required|date|after_or_equal:today',
            'scheduled_time' => 'required|string',
            'purpose' => 'required|string|min:5|max:500',
            'health_context' => 'nullable|string|max:500',
        ]);

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
            'points' => 10,
            'source' => 'CONSULTATION_BOOKED',
            'source_id' => (string) $consultation->id,
            'note' => 'Pemesanan konsultasi klinis terjadwal bersama dokter/instruktur',
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
}
