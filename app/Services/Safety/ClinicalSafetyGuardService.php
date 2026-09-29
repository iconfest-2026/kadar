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

        // 5. Out of Scope / Non-Health Domain Guardrail (Math, Politics, Coding, Entertainment, Trivia)
        if ($this->detectOutOfScope($normalized)) {
            return [
                'is_safe' => false,
                'trigger_type' => 'OUT_OF_SCOPE_GUARDRAIL',
                'safe_response' => "Pertanyaan ini berada di luar fokus kesehatan preventif. Sebagai Asisten AI Preventif AEVYRA, fokus keahlian saya adalah mendampingi kesehatan metabolik, nutrisi, kadar gula darah, dan gaya hidup sehat. Silakan tanyakan hal seputar pola makan sehat, pemahaman label gizi, aktivitas fisik, atau pencegahan pra-diabetes.",
                'action_required' => 'NON_HEALTH_SCOPE_REDIRECT',
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

    /**
     * Detect general out-of-scope non-health queries (pure math, politics, coding, gossip, entertainment).
     */
    private function detectOutOfScope(string $text): bool
    {
        // 0. Whitelist User Identity / Account Queries (e.g. "siapa saya", "siapa nama saya", "nama akun saya")
        $identityKeywords = [
            'siapa saya', 'siapakah saya', 'siapa nama saya', 'nama saya siapa',
            'kamu tahu siapa saya', 'apakah kamu tahu siapa saya', 'kamu kenal saya',
            'apakah kamu kenal saya', 'tahu nama saya', 'kenal saya', 'nama akun saya',
            'nama akun saya apa', 'siapa nama akun saya', 'siapa akun saya', 'akun saya siapa',
            'nama saya', 'siapa profil saya', 'identitas saya', 'who am i', 'what is my name'
        ];
        foreach ($identityKeywords as $ik) {
            if (str_contains($text, $ik)) {
                return false;
            }
        }

        // 1. Whitelist: If text mentions any health, nutrition, metabolic, organ, or lifestyle topics, do NOT block
        $healthKeywords = [
            'gula', 'glukosa', 'diabetes', 'insulin', 'makan', 'minum', 'nutrisi', 'gizi',
            'kalori', 'karbo', 'karbohidrat', 'lemak', 'protein', 'serat', 'kolesterol',
            'tensi', 'darah', 'tekanan darah', 'jantung', 'tidur', 'istirahat', 'olahraga',
            'langkah', 'jalan kaki', 'berat badan', 'diet', 'bmi', 'imt', 'hidrasi',
            'air putih', 'pola hidup', 'sehat', 'kadar', 'hba1c', 'puasa', 'intermittent',
            'metabolik', 'suplemen', 'vitamin', 'sayur', 'buah', 'garam', 'natrium',
            'pankreas', 'ginjal', 'asam urat', 'kebugaran', 'kardio', 'porsi', 'pangan',
            'lemak jenuh', 'aktivitas', 'sakit kepala', 'demam', 'gejala', 'pusing',
            'kebiasaan', 'begadang', 'stress', 'stres', 'sarapan', 'snack', 'camilan',
            'harian', 'kesehatan', 'tubuh', 'fisik', 'pasien', 'medis', 'klinis',
            'glikemik', 'obesitas', 'hipertensi', 'anemia', 'otot', 'tulang', 'pencernaan',
            'lambung', 'maag', 'gerd', 'usus', 'mata', 'kulit', 'paru', 'napas', 'nafas',
        ];

        foreach ($healthKeywords as $hk) {
            if (str_contains($text, $hk)) {
                return false;
            }
        }

        // 2. Pure Math / Arithmetic (e.g. "berapa 1+1", "1+1", "5*5", "hitung 10+20")
        if (preg_match('/^(berapa\s+)?\d+\s*[\+\-\*\/xX\^]\s*\d+/i', $text) ||
            preg_match('/^\s*\d+\s*[\+\-\*\/xX]\s*\d+\s*=?\s*$/', $text) ||
            preg_match('/^hitung\w*\s+\d+/i', $text)) {
            return true;
        }

        // 3. Politics, Government, Elections (e.g. "siapa presiden indonesia", "pemilu", "dpr")
        $politicsKeywords = [
            'presiden', 'wakil presiden', 'menteri', 'dpr', 'mpr', 'partai', 'pemilu',
            'pilpres', 'pilkada', 'gubernur', 'bupati', 'walikota', 'politik', 'kabinet',
            'pemerintah', 'prabowo', 'gibran', 'jokowi', 'anies', 'ganjar', 'soekarno',
            'soeharto', 'pdip', 'gerindra', 'golkar', 'partai politik'
        ];
        foreach ($politicsKeywords as $pk) {
            if (str_contains($text, $pk)) {
                return true;
            }
        }

        // 4. Software Development / Coding / IT non-health
        $techKeywords = [
            'buatkan kode', 'buatkan code', 'bikin kodingan', 'script python', 'html css',
            'javascript', 'php artisan', 'fungsi rekursif', 'source code', 'coding',
            'bahasa pemrograman', 'debug error', 'react component', 'sql query',
            'bikin web', 'bikin aplikasi', 'algoritma sorting'
        ];
        foreach ($techKeywords as $tk) {
            if (str_contains($text, $tk)) {
                return true;
            }
        }

        // 5. General Trivia, Entertainment, Jokes non-health
        $triviaKeywords = [
            'ramalan zodiak', 'ramalan bintang', 'horoskop', 'ceritakan lelucon',
            'tebak-tebakan', 'film bioskop', 'chord gitar', 'lirik lagu',
            'pemenang piala dunia', 'juara liga', 'harga bitcoin', 'saham hari ini',
            'cuaca hari ini', 'siapa penemu', 'ibukota negara'
        ];
        foreach ($triviaKeywords as $trk) {
            if (str_contains($text, $trk)) {
                return true;
            }
        }

        return false;
    }
}
