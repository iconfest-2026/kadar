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

        // Lifestyle & sleep queries
        if (str_contains($userText, 'tidur') || str_contains($userText, 'begadang') || str_contains($userText, 'istirahat')) {
            return "Kualitas dan durasi tidur sangat dipengaruhi oleh konsistensi ritme sirkadian kita. Berikut beberapa prinsip mikro preventif yang bisa Anda coba malam ini:\n\n"
                . "1. **Kurangi paparan cahaya biru (ponsel/laptop)** minimal 30 menit sebelum jam tidur target.\n"
                . "2. **Jaga suhu kamar tetap sejuk dan tenang** untuk mempermudah transisi fase relaksasi tubuh.\n"
                . "3. **Hindari asupan kafein atau makanan berat** dalam 4-6 jam sebelum waktu tidur.\n\n"
                . "*Catatan: Wawasan ini bersifat edukasi gaya hidup preventif untuk membantu membangun kebiasaan sehat mandiri.*";
        }

        // Hydration queries
        if (str_contains($userText, 'air') || str_contains($userText, 'minum') || str_contains($userText, 'hidrasi')) {
            return "Menjaga kecukupan cairan tubuh berperan penting dalam sirkulasi darah dan mencegah rasa lelah mendadak. Tips hidrasi harian praktis:\n\n"
                . "1. **Sediakan botol air 600ml di dekat meja kerja** agar mudah diminum berkala tanpa harus menanti haus.\n"
                . "2. **Awali pagi dengan 1 gelas air putih hangat** sesaat setelah bangun tidur.\n"
                . "3. **Pantau warna urin**: warna kuning sangat muda mengindikasikan hidrasi yang optimal.\n\n"
                . "*Catatan: Kebutuhan cairan dapat bervariasi sesuai tingkat aktivitas fisik dan kondisi lingkungan harian Anda.*";
        }

        // Activity & steps queries
        if (str_contains($userText, 'langkah') || str_contains($userText, 'jalan') || str_contains($userText, 'olahraga') || str_contains($userText, 'aktivitas')) {
            return "Konsistensi bergerak harian jauh lebih berdampak pada kesehatan metabolik jangka panjang dibandingkan latihan berat yang jarang dilakukan:\n\n"
                . "1. **Sisipkan jalan kaki 10-15 menit** setelah jam makan siang untuk membantu sensitivitas insulin.\n"
                . "2. **Lakukan jeda peregangan ringan** setiap 60-90 menit duduk statis di depan layar komputer.\n"
                . "3. **Gunakan tangga dibanding lift** untuk 1-2 lantai sebagai micro-exercise yang realistis.\n\n"
                . "*Mulailah dari target langkah yang nyaman, lalu tingkatkan secara bertahap bersama tantangan komunitas.*";
        }

        // Food & nutrition queries
        if (str_contains($userText, 'makan') || str_contains($userText, 'nutrisi') || str_contains($userText, 'gula') || str_contains($userText, 'kalori')) {
            return "Pola makan seimbang berprinsip pada keberlanjutan dan kesadaran porsi (*mindful eating*):\n\n"
                . "1. **Perbanyak porsi serat dan sayuran hijau** di awal suapan untuk meredam lonjakan glukosa darah.\n"
                . "2. **Waspadai gula tersembunyi** pada minuman kemasan berpemanis; cek selalu tabel informasi nilai gizi.\n"
                . "3. **Kombinasikan karbohidrat kompleks** dengan sumber protein sehat agar rasa kenyang bertahan lebih lama.\n\n"
                . "*Gunakan fitur Scanner kami untuk memeriksa perkiraan komposisi gula dan natrium pada label kemasan pangan Anda.*";
        }

        // General greeting & friendly preventive wellness guide
        return "Halo! Saya Asisten Edukasi Gaya Hidup Sehat AEVYRA. Saya siap mendampingi Anda memahami tren kebiasaan harian, pola tidur, kecukupan hidrasi, dan inspirasi langkah hidup sehat preventif.\n\n"
            . "Ada yang ingin Anda diskusikan mengenai rutinitas harian atau target kesehatan Anda hari ini?\n\n"
            . "*(Pengingat: Saya adalah pendamping gaya hidup preventif dan tidak memberikan vonis medis atau resep obat)*";
    }
}
