<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Consultation;
use App\Models\ConsultationMessage;
use App\Models\InstructorMemberAssignment;
use App\Models\Notification;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ConsultationController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $instructor */
        $instructor = Auth::user();

        $assignedMemberIds = InstructorMemberAssignment::where('instructor_id', $instructor->id)
            ->where('status', 'ACTIVE')
            ->pluck('member_id');

        $assignedMembers = User::whereIn('id', $assignedMemberIds)
            ->select('id', 'name', 'email')
            ->get();

        $consultations = Consultation::where('instructor_id', $instructor->id)
            ->with(['member:id,name,email', 'cancelledBy:id,name'])
            ->orderBy('scheduled_start', 'desc')
            ->paginate(15);

        return Inertia::render('Instructor/Consultations', [
            'consultations' => $consultations,
            'assignedMembers' => $assignedMembers,
        ]);
    }

    public function store(Request $request)
    {
        /** @var \App\Models\User $instructor */
        $instructor = Auth::user();

        $validated = $request->validate([
            'member_id' => 'required|exists:users,id',
            'scheduled_start' => 'required|date|after:now',
            'scheduled_end' => 'required|date|after:scheduled_start',
            'purpose' => 'required|string|max:255',
        ]);

        $isAssigned = InstructorMemberAssignment::where('instructor_id', $instructor->id)
            ->where('member_id', $validated['member_id'])
            ->where('status', 'ACTIVE')
            ->exists();

        if (!$isAssigned) {
            abort(403, 'Member ini tidak ditugaskan kepada Anda.');
        }

        $member = User::findOrFail($validated['member_id']);
        $quotaService = app(\App\Services\Membership\ConsultationQuotaService::class);
        $quotaError = $quotaService->validateBooking($member);
        if ($quotaError) {
            return back()->withErrors(['member_id' => $quotaError]);
        }

        $start = Carbon::parse($validated['scheduled_start']);
        $end = Carbon::parse($validated['scheduled_end']);

        // Check double booking for instructor
        $conflict = Consultation::where('instructor_id', $instructor->id)
            ->where('scheduled_start', $start)
            ->whereNotIn('status', ['CANCELLED'])
            ->exists();

        if ($conflict) {
            return back()->withErrors(['scheduled_start' => 'Anda sudah memiliki sesi konsultasi lain pada jam ini. Silakan tentukan waktu lain.']);
        }

        $meetingId = 'AEVYRA-ROOM-' . strtoupper(substr(md5(uniqid()), 0, 8));
        $meetingUrl = 'https://telemed.aevyra.health/' . $meetingId;

        $consultation = Consultation::create([
            'member_id' => $validated['member_id'],
            'instructor_id' => $instructor->id,
            'status' => 'SCHEDULED',
            'scheduled_start' => $start,
            'scheduled_end' => $end,
            'purpose' => $validated['purpose'],
            'meeting_url' => $meetingUrl,
            'notes' => 'Sesi bimbingan dijadwalkan oleh instruktur.',
        ]);

        // Send in-app notification to member
        try {
            $formattedDate = $start->translatedFormat('l, d F Y H:i');
            Notification::create([
                'user_id' => $member->id,
                'type' => 'CONSULTATION_CONFIRMED',
                'title' => 'Jadwal Konsultasi Baru Telah Ditetapkan',
                'body' => "Dokter/Instruktur {$instructor->name} telah menjadwalkan sesi bimbingan pada {$formattedDate} WIB. Topik: {$validated['purpose']}.",
                'data' => [
                    'category' => 'consultation',
                    'consultation_id' => $consultation->id,
                    'action_url' => '/member/consultations-hub?tab=live_chat&consultation_id=' . $consultation->id,
                ],
                'read_at' => null,
                'delivered_at' => now(),
            ]);
        } catch (\Throwable $e) {
            // Log notice if notification table failed
        }

        // Initialize welcome message
        ConsultationMessage::create([
            'consultation_id' => $consultation->id,
            'sender_id' => $instructor->id,
            'sender_role' => 'INSTRUCTOR',
            'message' => "Halo {$member->name}! Saya {$instructor->name}. Saya telah menjadwalkan sesi tele-konsultasi kita dengan agenda: \"{$consultation->purpose}\". Silakan sampaikan pertanyaan atau bagikan data kesehatan terukur Anda sebelum sesi dimulai.",
            'is_read' => false,
        ]);

        AuditLog::log(
            $instructor->id,
            'INSTRUCTOR',
            'SCHEDULE_CONSULTATION',
            'Consultation',
            $consultation->id,
            ['member_id' => $validated['member_id']]
        );

        return back()->with('success', 'Jadwal tele-konsultasi berhasil dibuat dan notifikasi telah dikirim ke member.');
    }

    public function complete(Request $request, Consultation $consultation)
    {
        /** @var \App\Models\User $instructor */
        $instructor = Auth::user();

        if ($consultation->instructor_id !== $instructor->id) {
            abort(403, 'Anda tidak memiliki hak akses ke konsultasi ini.');
        }

        if ($consultation->status === 'CANCELLED') {
            return back()->withErrors(['general' => 'Konsultasi yang telah dibatalkan tidak dapat diselesaikan.']);
        }

        if ($consultation->status === 'COMPLETED') {
            return back()->withErrors(['general' => 'Konsultasi ini sudah ditandai selesai sebelumnya.']);
        }

        $validated = $request->validate([
            'notes' => 'nullable|string|max:2000',
        ]);

        $consultation->update([
            'status' => 'COMPLETED',
            'completed_at' => now(),
            'notes' => $validated['notes'] ?? $consultation->notes,
        ]);

        // Send in-app notification to member
        try {
            Notification::create([
                'user_id' => $consultation->member_id,
                'type' => 'CONSULTATION_COMPLETED',
                'title' => 'Sesi Konsultasi Selesai & Evaluasi Tersimpan',
                'body' => "Dokter/Instruktur {$instructor->name} telah menyelesaikan sesi konsultasi Anda dan menyusun catatan evaluasi klinis.",
                'data' => [
                    'category' => 'consultation',
                    'consultation_id' => $consultation->id,
                    'action_url' => '/member/consultations-hub?tab=history',
                ],
                'read_at' => null,
                'delivered_at' => now(),
            ]);
        } catch (\Throwable $e) {
            // Ignore notification failure
        }

        // Add system message to consultation chat
        ConsultationMessage::create([
            'consultation_id' => $consultation->id,
            'sender_id' => $instructor->id,
            'sender_role' => 'SYSTEM',
            'message' => "✅ [PEMBERITAHUAN SISTEM] Sesi konsultasi telah ditandai selesai oleh Dokter/Instruktur {$instructor->name}. Catatan evaluasi dan arahan bimbingan telah dirangkum dalam rekam medis pasien.",
            'metric_payload' => [
                'event' => 'COMPLETED',
                'completed_at' => now()->toIso8601String(),
            ],
            'is_read' => true,
        ]);

        AuditLog::log(
            $instructor->id,
            'INSTRUCTOR',
            'COMPLETE_CONSULTATION',
            'Consultation',
            $consultation->id,
            ['has_notes' => !empty($validated['notes'])]
        );

        return back()->with('success', 'Konsultasi berhasil diselesaikan dan catatan evaluasi telah terekam.');
    }

    public function cancel(Request $request, Consultation $consultation)
    {
        /** @var \App\Models\User $instructor */
        $instructor = Auth::user();

        if ($consultation->instructor_id !== $instructor->id) {
            abort(403, 'Anda tidak memiliki hak akses ke konsultasi ini.');
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
            : 'Instruktur berhalangan hadir atau ada penyesuaian jadwal klinis.';

        $formattedTime = now()->translatedFormat('d M Y H:i');

        $consultation->update([
            'status' => 'CANCELLED',
            'cancelled_at' => now(),
            'cancellation_reason' => $reason,
            'cancelled_by_id' => $instructor->id,
            'notes' => ($consultation->notes ? $consultation->notes . "\n" : '') . "[Dibatalkan oleh instruktur pada {$formattedTime} WIB. Alasan: {$reason}]",
        ]);

        // Send in-app notification to member (Quota restored)
        try {
            $member = $consultation->member;
            Notification::create([
                'user_id' => $consultation->member_id,
                'type' => 'CONSULTATION_CANCELLED',
                'title' => 'Jadwal Konsultasi Dibatalkan oleh Instruktur',
                'body' => "Dokter/Instruktur {$instructor->name} telah membatalkan sesi konsultasi Anda. Kuota konsultasi Anda telah dikembalikan secara penuh. Alasan: \"{$reason}\".",
                'data' => [
                    'category' => 'consultation',
                    'consultation_id' => $consultation->id,
                    'action_url' => '/member/consultations-hub?tab=booking',
                ],
                'read_at' => null,
                'delivered_at' => now(),
            ]);
        } catch (\Throwable $e) {
            // Ignore notification failure
        }

        // Insert system message into chat room
        ConsultationMessage::create([
            'consultation_id' => $consultation->id,
            'sender_id' => $instructor->id,
            'sender_role' => 'SYSTEM',
            'message' => "⚠️ [PEMBERITAHUAN SISTEM] Sesi konsultasi telah dibatalkan oleh Dokter/Instruktur {$instructor->name} pada {$formattedTime} WIB.\nAlasan: \"{$reason}\".\nKuota sesi bimbingan telah dikembalikan secara penuh ke akun member.",
            'metric_payload' => [
                'event' => 'CANCELLED',
                'by' => 'INSTRUCTOR',
                'reason' => $reason,
                'cancelled_at' => now()->toIso8601String(),
            ],
            'is_read' => true,
        ]);

        AuditLog::log(
            $instructor->id,
            'INSTRUCTOR',
            'CANCEL_CONSULTATION',
            'Consultation',
            $consultation->id,
            ['reason' => $reason]
        );

        return back()->with('success', 'Jadwal konsultasi berhasil dibatalkan. Kuota sesi member telah otomatis dipulihkan.');
    }
}
