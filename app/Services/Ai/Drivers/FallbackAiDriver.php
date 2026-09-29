<?php

namespace App\Services\Ai\Drivers;

use App\Services\Ai\AiDriverInterface;

class FallbackAiDriver implements AiDriverInterface
{
    /**
     * Rule-based preventive health response when AI API key is not configured or offline.
     */
    public function generateResponse(array $messages, array $context = []): string
    {
        $lastMessage = end($messages);
        $userText = strtolower(trim($lastMessage['content'] ?? ''));

        $userName = $context['user_name'] ?? 'Pengguna';
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
            return "Anda adalah {$userName}, terdaftar sebagai {$userRole} di platform kesehatan metabolik AEVYRA. Saya siap mendampingi Anda memantau target glukosa darah, asupan nutrisi, hidrasi, dan kebiasaan harian Anda. Ada data kesehatan atau kebiasaan yang ingin Anda evaluasi hari ini?";
        }

        // Kutu air / Tinea pedis / Jamur kaki
        if (str_contains($userText, 'kutu air') || str_contains($userText, 'tinea pedis') || str_contains($userText, 'jamur kaki') || str_contains($userText, 'gatal jari kaki')) {
            return "Kutu air (tinea pedis) adalah infeksi jamur superfisial pada kulit yang umumnya menyerang sela-sela jari kaki dan telapak kaki akibat jamur kelompok dermatofit yang berkembang di area lembap.\n\n"
                . "Gejala Umum Yang Muncul:\n"
                . "- Kulit gatal intens, memerah, bersisik, atau mengelupas di sela-sela jari kaki.\n"
                . "- Sensasi panas, perih, atau rasa terbakar pada area kulit yang terinfeksi.\n"
                . "- Kulit menebal, pecah-pecah, atau timbul lepuhan kecil (vesikel) berisi cairan.\n\n"
                . "Langkah Pencegahan & Perawatan:\n"
                . "1. Keringkan sela-sela jari kaki secara menyeluruh dengan handuk bersih setelah mandi atau wudhu.\n"
                . "2. Ganti kaos kaki bersih berbahan katun setiap hari atau saat terasa lembap.\n"
                . "3. Gunakan alas kaki terbuka atau sepatu dengan sirkulasi udara baik.\n"
                . "4. Hindari bertukar handuk, kaos kaki, atau sepatu dengan orang lain.\n"
                . "5. Gunakan sandal saat berada di fasilitas umum yang basah seperti kolam renang atau kamar bilas.\n\n"
                . "Catatan Klinis:\n"
                . "Jika infeksi menyebar, mengeluarkan nanah, atau dialami oleh individu dengan riwayat diabetes atau gula darah tinggi, segera konsultasikan ke fasilitas medis untuk penanganan antijamur yang terukur.";
        }

        // 1. Sugar Limits & Sugar Consumption (e.g. quick prompt: "Berapa batas konsumsi gula harian saya?")
        if (str_contains($userText, 'batas konsumsi gula') || str_contains($userText, 'batas gula') || (str_contains($userText, 'gula') && str_contains($userText, 'berapa'))) {
            return "Berdasarkan anjuran Kementerian Kesehatan RI (Permenkes No. 30 Tahun 2013) dan WHO, batas konsumsi gula harian bagi orang dewasa adalah maksimal 50 gram atau setara dengan 4 sendok makan per hari (sekitar 10% dari total kebutuhan energi harian 2000 kkal).\n\n"
                . "Bagi individu dengan risiko pra-diabetes atau resistensi insulin, batas aman asupan gula tambahan dianjurkan lebih ketat, yaitu di bawah 25 gram (2 sendok makan) per hari.\n\n"
                . "Langkah pencegahan praktis:\n"
                . "1. Periksa tabel informasi nilai gizi pada kemasan minuman dan makanan untuk mendeteksi gula tersembunyi.\n"
                . "2. Hindari minuman kemasan manis, sirup, boba, dan kental manis.\n"
                . "3. Utamakan rasa manis alami dari buah potong segar yang mengandung serat pelindung glukosa.";
        }

        // 2. Low Glycemic Breakfast (e.g. quick prompt: "Rekomendasi menu sarapan rendah glikemik")
        if (str_contains($userText, 'sarapan') || (str_contains($userText, 'glikemik') && str_contains($userText, 'menu'))) {
            return "Menu sarapan rendah glikemik bertujuan menjaga kestabilan glukosa darah agar energi bertahan stabil hingga jam makan siang tanpa lonjakan insulin mendadak:\n\n"
                . "1. Omelet telur sayur: 2 butir telur rebus atau orak-arik dengan minyak zaitun/kelapa secukupnya, bayam, tomat, dan potongan tahu kukus.\n"
                . "2. Rolled oats kaya serat: Seduh oatmeal utuh dengan susu skim atau susu almond tawar, tambahkan biji chia dan potongan buah alpukat atau stroberi.\n"
                . "3. Pepes ikan atau ayam dengan tumis buncis: Sumber protein bersih dan serat tinggi yang sangat ramah terhadap indeks glikemik.\n\n"
                . "Prinsip utama: selalu padukan serat pangan dan protein sebelum asupan karbohidrat kompleks.";
        }

        // 3. Post-Lunch Drowsiness / Sugar Crash (e.g. quick prompt: "Bagaimana cara mencegah kantuk setelah makan siang?")
        if (str_contains($userText, 'kantuk') || str_contains($userText, 'mengantuk') || str_contains($userText, 'food coma')) {
            return "Rasa kantuk hebat setelah makan siang (sugar crash) umumnya dipicu oleh lonjakan dan penurunan drastis glukosa darah akibat asupan karbohidrat sederhana berlebih. Cara pencegahannya:\n\n"
                . "1. Atur urutan makan: habiskan sayuran berserat dan lauk berprotein terlebih dahulu sebelum menyentuh nasi atau karbohidrat.\n"
                . "2. Kurangi porsi nasi putih atau ganti dengan nasi merah, beras shirataki, atau kentang kukus dengan kulitnya.\n"
                . "3. Lakukan jalan santai ringan selama 10-15 menit segera setelah selesai makan untuk mempercepat pembersihan glukosa oleh otot.\n"
                . "4. Pastikan hidrasi tercukupi dengan 1-2 gelas air putih dan hindari es teh manis atau minuman berpemanis sebagai penutup makan siang.";
        }

        // 4. Natural Insulin Resistance Reduction (e.g. quick prompt: "Tips menurunkan resistensi insulin secara alami")
        if (str_contains($userText, 'resistensi insulin') || (str_contains($userText, 'insulin') && str_contains($userText, 'tips'))) {
            return "Menurunkan resistensi insulin secara alami berpusat pada optimalisasi sensitivitas reseptor seluler terhadap glukosa:\n\n"
                . "1. Latihan kekuatan otot (resistance training): Melatih massa otot 2-3 kali seminggu secara signifikan meningkatkan penyerapan glukosa tanpa bergantung penuh pada insulin.\n"
                . "2. Pola makan berbasis serat: Targetkan minimal 25-30 gram serat per hari dari sayuran hijau, kacang-kacangan, dan biji-bijian utuh.\n"
                . "3. Cukupi tidur 7-8 jam per malam: Kurang tidur 1 malam saja dapat menurunkan sensitivitas insulin hingga 25-30%.\n"
                . "4. Waktu jeda makan (intermittent fasting ringan): Berikan jeda malam 12 jam (misal selesai makan malam jam 19.00 dan sarapan jam 07.00) untuk mengistirahatkan sekresi hormon insulin tubuh.";
        }

        // 5. Sleep & Rest queries
        if (str_contains($userText, 'tidur') || str_contains($userText, 'begadang') || str_contains($userText, 'istirahat')) {
            return "Kualitas dan durasi tidur berpengaruh langsung terhadap regulasi hormon leptin, ghrelin, dan sensitivitas insulin harian:\n\n"
                . "1. Jauhkan layar gadget minimal 45 menit sebelum tidur untuk memungkinkan produksi hormon melatonin secara alami.\n"
                . "2. Atur jadwal tidur dan bangun pada jam yang konsisten setiap hari, termasuk di akhir pekan.\n"
                . "3. Hindari konsumsi kafein atau makanan berat dalam rentang 4-6 jam sebelum waktu tidur.";
        }

        // 6. Hydration queries
        if (str_contains($userText, 'air') || str_contains($userText, 'minum') || str_contains($userText, 'hidrasi')) {
            return "Kecukupan cairan tubuh menjaga viskositas plasma darah dan membantu fungsi ginjal menyaring kelebihan metabolit:\n\n"
                . "1. Targetkan 2 liter atau 8 gelas air putih per hari untuk orang dewasa dengan aktivitas harian moderat.\n"
                . "2. Awali hari dengan satu gelas air putih hangat sesaat setelah bangun tidur.\n"
                . "3. Pantau kejernihan urin: warna kuning jerami sangat pucat menandakan tingkat hidrasi yang optimal.";
        }

        // 7. Physical activity & steps
        if (str_contains($userText, 'langkah') || str_contains($userText, 'jalan') || str_contains($userText, 'olahraga') || str_contains($userText, 'aktivitas')) {
            return "Aktivitas fisik teratur adalah pilar utama pemulihan metabolisme dan pencegahan pra-diabetes:\n\n"
                . "1. Jalan kaki 10-15 menit segera setelah sesi makan utama membantu otot menyerap glukosa darah secara mandiri.\n"
                . "2. Kurangi waktu duduk statis: lakukan jeda peregangan atau jalan 2 menit setiap 60 menit kerja di meja.\n"
                . "3. Bangun target langkah bertahap menuju 7.500 hingga 10.000 langkah harian.";
        }

        // 8. General Food / Nutrition queries
        if (str_contains($userText, 'makan') || str_contains($userText, 'nutrisi') || str_contains($userText, 'gula') || str_contains($userText, 'kalori')) {
            return "Prinsip nutrisi preventif berfokus pada keseimbangan porsi piring model T dari Kemenkes RI:\n\n"
                . "1. Setengah piring diisi oleh sayuran hijau dan buah segar yang kaya serat dan antioksidan.\n"
                . "2. Seperempat piring diisi oleh sumber protein berkualitas (ikan, telur, tahu, tempe, dada ayam).\n"
                . "3. Seperempat piring sisa diisi oleh karbohidrat kompleks rendah glikemik (nasi merah, kentang rebus, ubi, atau jagung).\n"
                . "4. Gunakan fitur Scanner Kemasan kami untuk memeriksa kandungan gula dan natrium produk pangan kemasan.";
        }

        // Default direct guidance
        return "Pertanyaan ini berada di luar fokus kesehatan preventif. Sebagai Asisten AI Preventif AEVYRA, fokus keahlian saya adalah mendampingi kesehatan metabolik, nutrisi, kadar gula darah, dan gaya hidup sehat. Silakan tanyakan hal seputar pola makan sehat, pemahaman label gizi, aktivitas fisik, atau pencegahan pra-diabetes.";
    }
}
