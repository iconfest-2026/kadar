<?php

namespace App\Services\Ai\Drivers;

use App\Services\Ai\AiDriverInterface;

class FallbackAiDriver implements AiDriverInterface
{
    /**
     * Rule-based holistic health & mental companion fallback engine.
     * Guarantees warm, empathetic, and clinically safe responses when offline or during failover.
     */
    public function generateResponse(array $messages, array $context = []): string
    {
        $lastMessage = end($messages);
        $userText = strtolower(trim($lastMessage['content'] ?? ''));

        $userName = $context['user_name'] ?? 'Sahabat AEVYRA';
        $userRole = $context['user_role'] ?? 'Member';

        // 0. Identity / Account Query (e.g. "siapa saya", "siapa nama saya", "nama akun saya")
        if (
            str_contains($userText, 'siapa saya') ||
            str_contains($userText, 'siapakah saya') ||
            str_contains($userText, 'siapa diriku') ||
            str_contains($userText, 'siapa nama saya') ||
            str_contains($userText, 'nama saya siapa') ||
            str_contains($userText, 'nama akun saya') ||
            str_contains($userText, 'nama akun') ||
            str_contains($userText, 'kenal saya') ||
            str_contains($userText, 'tahu saya') ||
            str_contains($userText, 'tahu siapa saya') ||
            str_contains($userText, 'kenal aku') ||
            str_contains($userText, 'siapa aku') ||
            str_contains($userText, 'nama aku') ||
            str_contains($userText, 'who am i') ||
            str_contains($userText, 'what is my name') ||
            (str_contains($userText, 'siapa') && (str_contains($userText, 'saya') || str_contains($userText, 'akun') || str_contains($userText, 'aku')))
        ) {
            return "Halo {$userName}! Anda terdaftar sebagai {$userRole} di platform kesehatan & kesejahteraan holistik AEVYRA.\n\n"
                . "Saya adalah asisten AI dan teman curhat Anda di sini. Saya siap mendampingi target kesehatan fisik Anda (glukosa, nutrisi, hidrasi, tidur) maupun kesehatan mental Anda (manajemen stres, overthinking, atau sekadar teman bicara saat Anda butuh didengarkan). Ada hal yang sedang Anda pikirkan atau ingin dievaluasi hari ini?";
        }

        // 1. Warm Greetings & Conversational Icebreakers (e.g. "halo", "hai", "selamat pagi", "apa kabar")
        if (
            preg_match('/^(halo|hai|hey|hei|hello|pagi|siang|sore|malam|assalamu[\'\w]*|apa kabar)[\s!.\?]*$/i', $userText) ||
            $userText === 'halo' || $userText === 'hai' || $userText === 'selamat pagi' || $userText === 'selamat siang' || $userText === 'selamat sore' || $userText === 'selamat malam'
        ) {
            return "Halo {$userName}! Senang sekali bisa menyapa dan menemani Anda hari ini.\n\n"
                . "Bagaimana kabar dan perasaan Anda hari ini? Di AEVYRA, saya di sini bukan hanya untuk membahas gula darah, makanan, atau kebugaran fisik — tapi juga siap menjadi teman curhat dan pendengar yang baik jika ada hal yang sedang membebani pikiran Anda.\n\n"
                . "Ceritakan saja dengan leluasa, baik seputar gaya hidup sehat maupun apa yang sedang Anda rasakan saat ini.";
        }

        // 2. Curhat, Emosi Sedih, Kelelahan Mental & Kesepian (e.g. "aku lagi sedih", "capek banget", "butuh teman curhat")
        if (
            str_contains($userText, 'curhat') || str_contains($userText, 'sedih') || str_contains($userText, 'nangis') ||
            str_contains($userText, 'menangis') || str_contains($userText, 'capek mental') || str_contains($userText, 'lelah batin') ||
            str_contains($userText, 'lelah mental') || str_contains($userText, 'kesepian') || str_contains($userText, 'sendirian') ||
            str_contains($userText, 'hampa') || str_contains($userText, 'down') || (str_contains($userText, 'capek') && str_contains($userText, 'banget'))
        ) {
            return "Halo {$userName}, terima kasih sudah berani membuka diri dan berbagi cerita ini. Saya di sini mendengarkan Anda dengan sepenuh hati.\n\n"
                . "Perasaan lelah, sedih, atau penat yang Anda rasakan adalah hal yang sangat manusiawi dan sepenuhnya valid. Terkadang hidup berjalan begitu cepat dan menuntut banyak hal, sampai kita lupa memberi ruang untuk diri sendiri beristirahat.\n\n"
                . "Mari kita ambil jeda sejenak bersama:\n"
                . "1. Tarik napas perlahan melalui hidung selama 4 detik, tahan 2 detik, lalu hembuskan lembut lewat mulut selama 6 detik. Lakukan ini 3 kali.\n"
                . "2. Izinkan diri Anda untuk merasa tidak baik-baik saja saat ini tanpa perlu menyalahkan diri sendiri.\n"
                . "3. Minum segelas air putih hangat untuk membantu menenangkan sistem saraf parasimpatis Anda.\n\n"
                . "Jika ada hal spesifik yang sedang mengganjal atau membuat Anda merasa berat, ceritakan saja kelanjutannya. Saya siap mendengarkan tanpa menghakimi.";
        }

        // 3. Stres, Tekanan & Burnout Kerja/Kuliah (e.g. "stres kerjaan", "burnout", "penat", "banyak pikiran")
        if (
            str_contains($userText, 'stres') || str_contains($userText, 'stress') || str_contains($userText, 'burnout') ||
            str_contains($userText, 'penat') || str_contains($userText, 'mumet') || str_contains($userText, 'banyak pikiran') ||
            str_contains($userText, 'tekanan') || str_contains($userText, 'pusing mikirin')
        ) {
            return "Saya sangat memahami betapa menguras tenaganya saat berada di titik burnout dan stres tinggi, {$userName}.\n\n"
                . "Ketika kita mengalami stres mental berkepanjangan, tubuh akan terus memproduksi hormon kortisol dan adrenalin. Selain membuat kepala tegang dan dada sesak, lonjakan kortisol juga memicu hati melepaskan glukosa cadangan ke darah — itu sebabnya orang yang stres sering mengalami gula darah tidak stabil dan gampang lapar (emotional eating).\n\n"
                . "Langkah pemulihan yang bisa Anda coba sekarang:\n"
                . "1. Tetapkan batasan tegas (boundary): bila memungkinkan, hentikan sejenak urusan pekerjaan/tugas di luar jamnya.\n"
                . "2. Jalan kaki santai 10 menit tanpa melihat layar HP: melihat pemandangan hijau atau merasakan hembusan udara membantu menurunkan ketegangan amygdala di otak.\n"
                . "3. Tuliskan beban pikiran di selembar kertas (brain dump): memindahkan beban dari kepala ke tulisan membantu otak membedakan mana yang bisa dikontrol dan mana yang di luar kendali kita.\n\n"
                . "Ingat, istirahat bukanlah tanda kegagalan, melainkan kebutuhan biologis yang wajib dipenuhi. Ada bagian tertentu dari pekerjaan atau hari ini yang paling membuat Anda tertekan?";
        }

        // 4. Cemas, Anxiety & Overthinking (e.g. "overthinking", "cemas", "anxiety", "takut masa depan", "panik")
        if (
            str_contains($userText, 'overthinking') || str_contains($userText, 'cemas') || str_contains($userText, 'anxiety') ||
            str_contains($userText, 'takut') || str_contains($userText, 'khawatir') || str_contains($userText, 'gelisah') ||
            str_contains($userText, 'panik')
        ) {
            return "Tarik napas dalam-dalam, {$userName}. Anda berada di tempat yang aman saat ini.\n\n"
                . "Overthinking dan kecemasan sering kali membuat otak kita memproyeksikan skenario terburuk yang belum tentu terjadi, membuat jantung berdebar dan pikiran berputar tanpa henti.\n\n"
                . "Mari kita lakukan teknik grounding 5-4-3-2-1 untuk membawa pikiran Anda kembali ke saat ini (here and now):\n"
                . "- Sebutkan 5 benda di sekitar yang bisa Anda lihat sekarang.\n"
                . "- Sentuh 4 tekstur benda di dekat Anda (misal kain baju, meja, layar HP).\n"
                . "- Dengarkan 3 suara berbeda di ruangan Anda saat ini.\n"
                . "- Sadari 2 aroma di sekitar Anda.\n"
                . "- Rasakan 1 sensasi rasa di lidah Anda atau teguk seteguk air.\n\n"
                . "Katakan pada diri Anda: 'Aku aman saat ini. Aku tidak harus menyelesaikan semua masalah hidupku dalam satu malam ini.' Apa hal yang paling membuat Anda cemas saat ini?";
        }

        // 5. Insecure, Galau & Masalah Percaya Diri (e.g. "insecure", "minder", "galau", "rendah diri")
        if (
            str_contains($userText, 'insecure') || str_contains($userText, 'minder') || str_contains($userText, 'galau') ||
            str_contains($userText, 'rendah diri') || str_contains($userText, 'kurang percaya diri') || str_contains($userText, 'bandingkan diri')
        ) {
            return "Perasaan insecure atau galau sering kali muncul saat kita tanpa sadar membandingkan bab pertama hidup kita dengan bab kesepuluh orang lain, {$userName}.\n\n"
                . "Setiap orang memiliki ritme, tantangan, dan titik awal yang berbeda. Apa yang Anda lihat di media sosial hanyalah cuplikan terbaik (highlight reel), bukan kenyataan utuh perjuangan mereka.\n\n"
                . "Refleksi untuk Anda renungkan:\n"
                . "1. Hargai setiap proses kecil yang sudah Anda capai hingga hari ini. Anda sudah bertahan sejauh ini melewati hari-hari sulit sebelumnya.\n"
                . "2. Sadari bahwa nilai diri Anda tidak ditentukan oleh standar orang lain, penampilan fisik semata, atau pencapaian instan.\n"
                . "3. Perlakukan diri Anda sebagaimana Anda memperlakukan sahabat terbaik yang sedang sedih — dengan kelembutan, bukan celaan.\n\n"
                . "Apa yang sedang membuat Anda merasa insecure atau ragu pada diri sendiri akhir-akhir ini?";
        }

        // 6. Hubungan Stres & Gula Darah / Metabolisme
        if (
            (str_contains($userText, 'stres') || str_contains($userText, 'pikiran')) &&
            (str_contains($userText, 'gula') || str_contains($userText, 'glukosa') || str_contains($userText, 'metabolisme') || str_contains($userText, 'kortisol'))
        ) {
            return "Stres mental dan metabolisme tubuh memiliki keterikatan biologis yang sangat kuat melalui sumbu HPA (Hypothalamic-Pituitary-Adrenal axis), {$userName}:\n\n"
                . "Mekanisme Hubungan Stres & Glukosa:\n"
                . "- Saat stres atau cemas, kelenjar adrenal memompa hormon kortisol dan epinefrin (respons fight-or-flight).\n"
                . "- Kortisol merangsang organ hati melepaskan cadangan glikogen menjadi glukosa darah dan menurunkan sensitivitas reseptor insulin di sel tubuh.\n"
                . "- Akibatnya, kadar gula darah bisa melonjak tinggi meskipun Anda tidak makan makanan manis.\n"
                . "- Stres kronis juga memicu keinginan ngemil karbohidrat sederhana (craving) sebagai kompensasi dopamin otak.\n\n"
                . "Solusi Terpadu Fisik & Mental:\n"
                . "1. Latihan relaksasi pernapasan 5 menit setiap kali merasa tegang untuk menurunkan stimulasi saraf simpatis.\n"
                . "2. Tetap makan teratur kaya protein dan serat agar gula darah tidak anjlok mendadak.\n"
                . "3. Hindari melampiaskan emosi ke minuman boba atau camilan manis berlebih; ganti dengan teh chamomile hangat atau air lemon dingin.";
        }

        // 7. Tidur, Begadang & Insomnia
        if (str_contains($userText, 'tidur') || str_contains($userText, 'begadang') || str_contains($userText, 'insomnia') || str_contains($userText, 'istirahat')) {
            return "Kualitas tidur adalah fondasi utama bagi pemulihan kesehatan mental sekaligus regulasi insulin tubuh, {$userName}:\n\n"
                . "Tips Tidur Berkualitas & Menenangkan Pikiran:\n"
                . "1. Jauhkan layar ponsel atau gadget minimal 45-60 menit sebelum tidur untuk memberi sinyal pada hormon melatonin alami tubuh.\n"
                . "2. Hindari membawa beban pikiran ke atas kasur: lakukan 'brain dump' dengan menuliskan daftar hal yang harus diselesaikan besok di buku catatan.\n"
                . "3. Lakukan teknik pernapasan 4-7-8 di tempat tidur: tarik napas 4 detik, tahan 7 detik, hembuskan perlahan 8 detik untuk merilekskan otot.\n"
                . "4. Hindari kafein (kopi, teh pekat) di atas jam 14.00 siang agar reseptor adenosin di otak bekerja optimal saat malam hari.";
        }

        // 8. Sugar Limits & Batas Konsumsi Gula
        if (str_contains($userText, 'batas konsumsi gula') || str_contains($userText, 'batas gula') || (str_contains($userText, 'gula') && str_contains($userText, 'berapa'))) {
            return "Berdasarkan anjuran Kementerian Kesehatan RI (Permenkes No. 30/2013) dan WHO, batas konsumsi gula harian bagi orang dewasa adalah maksimal 50 gram atau setara dengan 4 sendok makan per hari (sekitar 10% dari total kebutuhan kalori harian 2000 kkal).\n\n"
                . "Bagi individu dengan pra-diabetes atau riwayat resistensi insulin, batas aman asupan gula tambahan dianjurkan lebih ketat, yaitu di bawah 25 gram (2 sendok makan) per hari.\n\n"
                . "Langkah pencegahan praktis:\n"
                . "1. Periksa tabel informasi nilai gizi pada kemasan minuman dan makanan untuk mendeteksi gula tersembunyi.\n"
                . "2. Hindari minuman kemasan manis, sirup, boba, dan kental manis.\n"
                . "3. Utamakan rasa manis alami dari buah potong segar yang mengandung serat pelindung glukosa.";
        }

        // 9. Sarapan Rendah Glikemik
        if (str_contains($userText, 'sarapan') || (str_contains($userText, 'glikemik') && str_contains($userText, 'menu'))) {
            return "Menu sarapan rendah glikemik bertujuan menjaga kestabilan glukosa darah agar energi bertahan stabil hingga jam makan siang tanpa lonjakan insulin mendadak:\n\n"
                . "1. Omelet telur sayur: 2 butir telur rebus atau orak-arik dengan minyak zaitun/kelapa secukupnya, bayam, tomat, dan potongan tahu kukus.\n"
                . "2. Rolled oats kaya serat: Seduh oatmeal utuh dengan susu skim atau susu almond tawar, tambahkan biji chia dan potongan buah alpukat atau stroberi.\n"
                . "3. Pepes ikan atau ayam dengan tumis buncis: Sumber protein bersih dan serat tinggi yang sangat ramah terhadap indeks glikemik.\n\n"
                . "Prinsip utama: selalu padukan serat pangan dan protein sebelum asupan karbohidrat kompleks.";
        }

        // 10. Kantuk Siang / Sugar Crash
        if (str_contains($userText, 'kantuk') || str_contains($userText, 'mengantuk') || str_contains($userText, 'food coma')) {
            return "Rasa kantuk hebat setelah makan siang (sugar crash) umumnya dipicu oleh lonjakan dan penurunan drastis glukosa darah akibat asupan karbohidrat sederhana berlebih:\n\n"
                . "1. Atur urutan makan: habiskan sayuran berserat dan lauk berprotein terlebih dahulu sebelum menyentuh nasi atau karbohidrat.\n"
                . "2. Kurangi porsi nasi putih atau ganti dengan nasi merah, beras shirataki, atau kentang kukus dengan kulitnya.\n"
                . "3. Lakukan jalan santai ringan selama 10-15 menit segera setelah selesai makan untuk mempercepat pembersihan glukosa oleh otot.\n"
                . "4. Pastikan hidrasi tercukupi dengan 1-2 gelas air putih dan hindari es teh manis atau minuman berpemanis sebagai penutup makan siang.";
        }

        // 11. Resistensi Insulin
        if (str_contains($userText, 'resistensi insulin') || (str_contains($userText, 'insulin') && str_contains($userText, 'tips'))) {
            return "Menurunkan resistensi insulin secara alami berpusat pada optimalisasi sensitivitas reseptor seluler terhadap glukosa:\n\n"
                . "1. Latihan beban atau kekuatan otot (resistance training): Melatih massa otot 2-3 kali seminggu secara signifikan meningkatkan penyerapan glukosa tanpa bergantung penuh pada insulin.\n"
                . "2. Pola makan berbasis serat: Targetkan minimal 25-30 gram serat per hari dari sayuran hijau, kacang-kacangan, dan biji-bijian utuh.\n"
                . "3. Cukupi tidur 7-8 jam per malam: Kurang tidur 1 malam saja dapat menurunkan sensitivitas insulin hingga 25-30%.\n"
                . "4. Manajemen stres: Redakan stres kronis karena hormon kortisol adalah pemicu resistensi insulin nomor satu.";
        }

        // 12. Kutu Air / Jamur Kaki
        if (str_contains($userText, 'kutu air') || str_contains($userText, 'tinea pedis') || str_contains($userText, 'jamur kaki') || str_contains($userText, 'gatal jari kaki')) {
            return "Kutu air (tinea pedis) adalah infeksi jamur superfisial pada kulit akibat jamur kelompok dermatofit yang berkembang di area lembap.\n\n"
                . "Gejala Umum Yang Muncul:\n"
                . "- Kulit gatal intens, memerah, bersisik, atau mengelupas di sela-sela jari kaki.\n"
                . "- Sensasi panas, perih, atau rasa terbakar pada area kulit yang terinfeksi.\n\n"
                . "Langkah Pencegahan & Perawatan:\n"
                . "1. Keringkan sela-sela jari kaki secara menyeluruh dengan handuk bersih setelah mandi atau wudhu.\n"
                . "2. Ganti kaos kaki katun bersih setiap hari.\n"
                . "3. Gunakan alas kaki terbuka atau sepatu dengan sirkulasi udara baik.\n"
                . "4. Jika dialami oleh individu dengan riwayat diabetes atau gula darah tinggi, segera konsultasikan ke dokter untuk penanganan antijamur medis terukur.";
        }

        // 13. Hidrasi & Air Putih
        if (str_contains($userText, 'air') || str_contains($userText, 'minum') || str_contains($userText, 'hidrasi')) {
            return "Kecukupan cairan tubuh menjaga kestabilan sirkulasi darah dan membantu ginjal menyaring metabolit tubuh secara optimal:\n\n"
                . "1. Targetkan minimal 2 liter atau 8 gelas air putih per hari untuk orang dewasa dengan aktivitas harian moderat.\n"
                . "2. Awali hari dengan satu gelas air putih hangat sesaat setelah bangun tidur.\n"
                . "3. Pantau kejernihan urin: warna kuning jerami sangat pucat menandakan tingkat hidrasi yang optimal.";
        }

        // 14. Aktivitas Fisik & Olahraga
        if (str_contains($userText, 'langkah') || str_contains($userText, 'jalan') || str_contains($userText, 'olahraga') || str_contains($userText, 'aktivitas')) {
            return "Aktivitas fisik teratur adalah pilar utama pemulihan metabolisme dan pencegahan pra-diabetes, {$userName}:\n\n"
                . "1. Jalan kaki 10-15 menit segera setelah sesi makan utama membantu otot menyerap glukosa darah secara mandiri.\n"
                . "2. Kurangi waktu duduk statis: lakukan jeda peregangan atau jalan 2 menit setiap 60 menit kerja di meja.\n"
                . "3. Bangun target langkah bertahap menuju 7.500 hingga 10.000 langkah harian.";
        }

        // 15. General Food / Nutrition queries
        if (str_contains($userText, 'makan') || str_contains($userText, 'nutrisi') || str_contains($userText, 'kalori')) {
            return "Prinsip nutrisi preventif berfokus pada piring seimbang model T dari Kemenkes RI:\n\n"
                . "1. Setengah piring diisi oleh sayuran hijau dan buah segar yang kaya serat dan antioksidan.\n"
                . "2. Seperempat piring diisi oleh sumber protein berkualitas (ikan, telur, tahu, tempe, dada ayam).\n"
                . "3. Seperempat piring sisa diisi oleh karbohidrat kompleks rendah glikemik (nasi merah, kentang rebus, ubi).\n"
                . "4. Gunakan fitur Scanner Kemasan kami untuk memeriksa kandungan gula dan natrium produk pangan kemasan.";
        }

        // Universal Holistic Companion Default
        return "Halo {$userName}! Sebagai asisten AI dan sahabat pendamping holistik Anda di AEVYRA, saya siap menemani Anda baik seputar kesehatan fisik maupun kesehatan mental.\n\n"
            . "Anda bisa berkonsultasi seputar:\n"
            . "- Pola makan sehat, kontrol gula darah, dan indeks glikemik\n"
            . "- Kualitas tidur, hidrasi, dan target aktivitas fisik\n"
            . "- Curhat tentang hari Anda, kelelahan mental, stres kerja, atau overthinking\n"
            . "- Teknik relaksasi, mindfulness, dan manajemen kecemasan\n\n"
            . "Silakan ceritakan apa yang sedang Anda rasakan atau tanyakan hal yang ingin Anda diskusikan hari ini. Saya siap mendengarkan!";
    }
}
