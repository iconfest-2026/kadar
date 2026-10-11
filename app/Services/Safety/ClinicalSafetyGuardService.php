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
            // Empathetic mental health crisis redirection
            if (str_contains($normalized, 'bunuh diri') || str_contains($normalized, 'ingin mati') || str_contains($normalized, 'melukai diri') || str_contains($normalized, 'overdosis')) {
                return [
                    'is_safe' => false,
                    'trigger_type' => 'MENTAL_HEALTH_CRISIS_REDIRECTION',
                    'safe_response' => "Saya sangat peduli dengan keselamatan dan kondisi perasaan Anda saat ini. Anda sangat berharga dan Anda tidak sendirian menghadapi beban ini. Mohon segera hubungi Layanan SEJIWA Kementerian Kesehatan RI di hotline 119 (ekstensi 8), Halo Kemenkes 1500-567, atau bicarakan segera dengan orang terdekat yang Anda percayai sekarang. Bantuan dan pendampingan selalu tersedia untuk Anda.",
                    'action_required' => 'DIAL_SEJIWA_119_EXT_8',
                ];
            }

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
                'safe_response' => "AEVYRA beroperasi murni sebagai platform pendamping gaya hidup preventif dan kesehatan mental suportif, serta tidak memiliki kewenangan medis untuk meresepkan obat keras atau mengubah dosis obat farmasi. Mohon konsultasikan resep obat Anda secara langsung kepada dokter atau apoteker berlisensi.",
                'action_required' => 'REFER_TO_DOCTOR',
            ];
        }

        // 4. Clinical Diagnosis Request
        if ($this->detectDiagnosisRequest($normalized)) {
            return [
                'is_safe' => false,
                'trigger_type' => 'DIAGNOSTIC_VERDICT_REFUSAL',
                'safe_response' => "Kami dapat membantu Anda mengamati pola kebiasaan, tren metabolisme tubuh, serta mendengarkan curhat dan emosi Anda. Namun AEVYRA bukan pengganti konsultasi medis langsung dan tidak dapat mengeluarkan diagnosis definitif penyakit tertentu. Jika ada keluhan fisik yang mengkhawatirkan, disarankan untuk berkonsultasi ke fasilitas layanan kesehatan resmi.",
                'action_required' => 'NON_DIAGNOSTIC_REDIRECT',
            ];
        }

        // 5. Out of Scope / Non-Health Domain Guardrail (Math, Politics, Coding, Entertainment, Trivia)
        if ($this->detectOutOfScope($normalized)) {
            return [
                'is_safe' => false,
                'trigger_type' => 'OUT_OF_SCOPE_GUARDRAIL',
                'safe_response' => "Pertanyaan ini berada di luar fokus kesehatan dan kesejahteraan holistik AEVYRA. Sebagai Asisten AI & Sahabat Curhat Anda, fokus saya adalah mendampingi kesehatan metabolik, nutrisi gizi seimbang, kebugaran fisik, serta mendengarkan curhat, kecemasan, stres, dan kesehatan mental Anda. Silakan ceritakan apa yang sedang Anda rasakan atau tanyakan seputar gaya hidup sehat Anda.",
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

        // 1. Whitelist: If text mentions health, nutrition, metabolic, mental health, psychology, curhat, or emotional wellbeing, do NOT block
        $healthKeywords = [
            // Physical & Metabolic Health
            'gula', 'glukosa', 'diabetes', 'insulin', 'makan', 'minum', 'nutrisi', 'gizi',
            'kalori', 'karbo', 'karbohidrat', 'lemak', 'protein', 'serat', 'kolesterol',
            'tensi', 'darah', 'tekanan darah', 'jantung', 'tidur', 'istirahat', 'olahraga',
            'langkah', 'jalan kaki', 'berat badan', 'diet', 'bmi', 'imt', 'hidrasi',
            'air putih', 'pola hidup', 'sehat', 'kadar', 'hba1c', 'puasa', 'intermittent',
            'metabolik', 'suplemen', 'vitamin', 'sayur', 'buah', 'garam', 'natrium',
            'pankreas', 'ginjal', 'asam urat', 'kebugaran', 'kardio', 'porsi', 'pangan',
            'lemak jenuh', 'aktivitas', 'sakit kepala', 'demam', 'gejala', 'pusing',
            'kebiasaan', 'begadang', 'sarapan', 'snack', 'camilan', 'harian', 'kesehatan',
            'tubuh', 'fisik', 'pasien', 'medis', 'klinis', 'glikemik', 'obesitas',
            'hipertensi', 'anemia', 'otot', 'tulang', 'pencernaan', 'lambung', 'maag',
            'gerd', 'usus', 'mata', 'kulit', 'paru', 'napas', 'nafas',

            // Mental Health, Psychology & Teman Curhat
            'mental', 'jiwa', 'psikolog', 'psikologi', 'psikologis', 'konseling', 'curhat',
            'curahan', 'stres', 'stress', 'cemas', 'kecemasan', 'anxiety', 'panik', 'panic',
            'sedih', 'kesedihan', 'menangis', 'nangis', 'galau', 'kecewa', 'kesepian',
            'sendirian', 'burnout', 'lelah mental', 'capek', 'lelah', 'penat', 'mumet',
            'overthinking', 'insecure', 'perasaan', 'emosi', 'mood', 'suasana hati',
            'pikiran', 'beban', 'masalah', 'tekanan', 'trauma', 'takut', 'ketakutan',
            'khawatir', 'bingung', 'hampa', 'putus asa', 'down', 'kehilangan arah',
            'teman bicara', 'teman ngobrol', 'teman curhat', 'ngobrol', 'cerita', 'dengarkan',
            'mindfulness', 'meditasi', 'relaksasi', 'self care', 'self-care', 'self love',
            'self-compassion', 'motivasi', 'semangat', 'lega', 'tenang', 'ketenangan',
            'bahagia', 'kebahagiaan', 'afirmasi', 'batin',

            // Friendly Greetings & Conversational Icebreakers
            'halo', 'hai', 'hello', 'hey', 'hei', 'selamat pagi', 'selamat siang',
            'selamat sore', 'selamat malam', 'apa kabar', 'assalam', 'terima kasih',
            'makasih', 'thank you', 'thanks'
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
