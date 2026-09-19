<?php

namespace App\Services\Safety;

class ClinicalSafetyGuardService
{
    /**
     * Check if text triggers safety boundaries.
     *
     * @return array{is_safe: bool, trigger_type: ?string, safe_response: ?string, action_required: ?string}
     */
    public function inspect(string $input): array
    {
        $normalized = strtolower(trim($input));

        // 1. Prompt Injection / Jailbreak attempt (Highest Security Precedence)
        if ($this->detectPromptInjection($normalized)) {
            return [
                'is_safe' => false,
                'trigger_type' => 'PROMPT_INJECTION_DEFENSE',
                'safe_response' => "Permintaan tidak dapat diproses karena melanggar batasan etika dan keamanan sistem AEVYRA.",
                'action_required' => 'BLOCK',
            ];
        }

        // 2. Emergency Acute Crisis Detection (Priority 0 Clinical Safety)
        if ($this->detectEmergency($normalized)) {
            return [
                'is_safe' => false,
                'trigger_type' => 'ACUTE_EMERGENCY_REDIRECTION',
                'safe_response' => "PERINGATAN KESELAMATAN: Gejala yang Anda sebutkan mengindikasikan kondisi darurat medis. Segera hubungi Panggilan Darurat Nasional 119 / 112 atau datangi IGD Rumah Sakit terdekat sekarang. Platform ini tidak boleh digunakan untuk pertolongan kondisi gawat darurat.",
                'action_required' => 'DIAL_119_NOW',
            ];
        }

        // 3. Medication / Prescription Dosing Request
        if ($this->detectMedicationRequest($normalized)) {
            return [
                'is_safe' => false,
                'trigger_type' => 'MEDICATION_DOSING_REFUSAL',
                'safe_response' => "AEVYRA beroperasi murni sebagai platform pendamping gaya hidup preventif dan tidak memiliki kewenangan medis untuk meresepkan obat, menganjurkan jenis farmakoterapi, ataupun mengubah dosis obat. Mohon konsultasikan aturan resep obat Anda secara langsung kepada dokter atau apoteker berlisensi.",
                'action_required' => 'REFER_TO_DOCTOR',
            ];
        }

        // 4. Clinical Diagnosis Request
        if ($this->detectDiagnosisRequest($normalized)) {
            return [
                'is_safe' => false,
                'trigger_type' => 'DIAGNOSTIC_VERDICT_REFUSAL',
                'safe_response' => "Kami dapat membantu Anda mengamati pola kebiasaan dan tren kesehatan, namun AEVYRA bukan pengganti konsultasi medis dan tidak dapat mendiagnosis penyakit tertentu. Jika Anda merasakan gejala fisik yang mengkhawatirkan, disarankan untuk melakukan pemeriksaan fisik di fasilitas pelayanan kesehatan resmi.",
                'action_required' => 'NON_DIAGNOSTIC_REDIRECT',
            ];
        }

        return [
            'is_safe' => true,
            'trigger_type' => null,
            'safe_response' => null,
            'action_required' => null,
        ];
    }

    private function detectEmergency(string $text): bool
    {
        $patterns = [
            'nyeri dada', 'dada sakit', 'dada sesak', 'serangan jantung', 'menjalar ke lengan',
            'sesak nafas', 'sesak napas', 'tidak bisa bernafas', 'bibir membiru',
            'muntah darah', 'pendarahan hebat', 'pingsan', 'hilang kesadaran', 'kejang',
            'bicara pelo', 'kelumpuhan separuh badan', 'stroke',
            'hipoglikemia berat', 'keringat dingin gemetar',
            'bunuh diri', 'ingin mati', 'melukai diri', 'overdosis',
        ];

        foreach ($patterns as $pattern) {
            if (str_contains($text, $pattern)) {
                return true;
            }
        }

        return false;
    }

    private function detectMedicationRequest(string $text): bool
    {
        $patterns = [
            'resep obat', 'dosis obat', 'naikkan dosis', 'turunkan dosis', 'ganti obat',
            'minum obat apa', 'obat penurun gula', 'suntik insulin', 'unit insulin',
            'antibiotik apa', 'berhenti minum obat', 'metformin',
        ];

        foreach ($patterns as $pattern) {
            if (str_contains($text, $pattern)) {
                return true;
            }
        }

        return false;
    }

    private function detectDiagnosisRequest(string $text): bool
    {
        $patterns = [
            'apakah saya kena diabetes', 'apakah saya menderita', 'apakah saya sakit',
            'diagnosis penyakit', 'vonis penyakit', 'apakah ini kanker', 'apakah saya mengidap',
            'diagnosis apakah',
        ];

        foreach ($patterns as $pattern) {
            if (str_contains($text, $pattern)) {
                return true;
            }
        }

        return false;
    }

    private function detectPromptInjection(string $text): bool
    {
        $patterns = [
            'ignore all previous instructions', 'abaikan semua instruksi', 'system prompt',
            'act as an unrestricted', 'jailbreak', 'mode developer aktif',
        ];

        foreach ($patterns as $pattern) {
            if (str_contains($text, $pattern)) {
                return true;
            }
        }

        return false;
    }
}
