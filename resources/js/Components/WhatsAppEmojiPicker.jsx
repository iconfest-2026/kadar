import React, { useState, useMemo, useRef, useEffect } from 'react';

// Comprehensive WhatsApp emoji categories and keyword indexing
const EMOJI_CATEGORIES = [
    {
        id: 'smileys',
        name: 'Ekspresi & Emosi',
        icon: 'sentiment_satisfied',
        emojis: [
            { char: '😀', name: 'senyum lebar', tags: ['senyum', 'bahagia', 'gembira', 'smile', 'happy'] },
            { char: '😃', name: 'senyum riang', tags: ['senyum', 'ceria', 'smile'] },
            { char: '😄', name: 'senyum tertawa', tags: ['senyum', 'ketawa', 'laugh'] },
            { char: '😁', name: 'senyum menyeringai', tags: ['senyum', 'gigi', 'grin'] },
            { char: '😆', name: 'tertawa mata terpejam', tags: ['ketawa', 'lucu', 'laugh'] },
            { char: '🥹', name: 'mata berkaca-kaca', tags: ['terharu', 'bangga', 'nangis', 'tears'] },
            { char: '😅', name: 'keringat dingin lega', tags: ['keringat', 'lega', 'sweat'] },
            { char: '😂', name: 'tertawa sampai menangis', tags: ['ngakak', 'lucu', 'lol', 'rofl'] },
            { char: '🤣', name: 'terpingkal-pingkal', tags: ['ngakak', 'parah', 'funny'] },
            { char: '🥲', name: 'senyum haru', tags: ['haru', 'tegar', 'sedih', 'kuat'] },
            { char: '☺️', name: 'senyum ramah', tags: ['hangat', 'senyum', 'sopan'] },
            { char: '😊', name: 'senyum manis', tags: ['senang', 'ramah', 'hangat', 'warm'] },
            { char: '😇', name: 'senyum malaikat', tags: ['baik', 'tulus', 'polos', 'angel'] },
            { char: '🙂', name: 'senyum tipis', tags: ['santai', 'senyum', 'oke'] },
            { char: '🙃', name: 'senyum terbalik', tags: ['canda', 'sarkas', 'upside'] },
            { char: '😉', name: 'kedip mata', tags: ['kedip', 'wink', 'akrab'] },
            { char: '😌', name: 'lega dan tenang', tags: ['tenang', 'lega', 'damai', 'relieved'] },
            { char: '😍', name: 'mata cinta', tags: ['suka', 'sayang', 'love', 'kagum'] },
            { char: '🥰', name: 'penuh cinta', tags: ['sayang', 'hangat', 'cinta', 'loved'] },
            { char: '😘', name: 'ciup peluk', tags: ['cium', 'sayang', 'kiss'] },
            { char: '😋', name: 'enak lezat', tags: ['makan', 'enak', 'lezat', 'yummy'] },
            { char: '😜', name: 'melet kedip', tags: ['lucu', 'bercanda', 'playful'] },
            { char: '🤪', name: 'gila lucu', tags: ['iseng', 'kocak', 'crazy'] },
            { char: '🤨', name: 'alis terangkat', tags: ['heran', 'curiga', 'ragu'] },
            { char: '🧐', name: 'kacamata pembesar', tags: ['analisis', 'periksa', 'kepo'] },
            { char: '🤓', name: 'kutu buku', tags: ['pintar', 'belajar', 'nerd'] },
            { char: '😎', name: 'keren kacamata', tags: ['keren', 'santai', 'cool'] },
            { char: '🥳', name: 'pesta perayaan', tags: ['selamat', 'pesta', 'celebrate'] },
            { char: '😏', name: 'senyum licik', tags: ['tahu', 'smirk'] },
            { char: '😒', name: 'cuek bosan', tags: ['bosan', 'males', 'unimpressed'] },
            { char: '😞', name: 'kecewa', tags: ['sedih', 'kecewa', 'down'] },
            { char: '😔', name: 'termenung sedih', tags: ['murung', 'sedih', 'pensive'] },
            { char: '😟', name: 'khawatir', tags: ['cemas', 'takut', 'worried'] },
            { char: '😕', name: 'bingung', tags: ['bingung', 'ragu', 'confused'] },
            { char: '🙁', name: 'cemberut', tags: ['cemberut', 'sedih'] },
            { char: '😣', name: 'menahan sakit', tags: ['sakit', 'susah', 'struggle'] },
            { char: '😖', name: 'frustrasi', tags: ['kesal', 'capek', 'frustrated'] },
            { char: '😫', name: 'lelah letih', tags: ['lelah', 'capek', 'tired'] },
            { char: '😩', name: 'letih lesu', tags: ['lelah', 'menyerah', 'weary'] },
            { char: '🥺', name: 'memohon manja', tags: ['sedih', 'tolong', 'pleading'] },
            { char: '😢', name: 'menangis satu air mata', tags: ['sedih', 'menangis', 'cry'] },
            { char: '😭', name: 'menangis kencang', tags: ['nangis', 'sedih parah', 'loud cry'] },
            { char: '😮‍💨', name: 'hembus napas lega', tags: ['hela napas', 'capek', 'sigh'] },
            { char: '😤', name: 'napas marah', tags: ['kesal', 'geram', 'proud'] },
            { char: '😠', name: 'marah', tags: ['marah', 'kesal', 'angry'] },
            { char: '😡', name: 'marah merah', tags: ['murka', 'emosi', 'rage'] },
            { char: '🤯', name: 'otak meledak', tags: ['kaget', 'overthinking', 'mindblown'] },
            { char: '😳', name: 'kaget malu', tags: ['tersipu', 'malu', 'flushed'] },
            { char: '🥵', name: 'kepanasan gerah', tags: ['panas', 'keringatan', 'hot'] },
            { char: '🥶', name: 'kedinginan beku', tags: ['dingin', 'menggigil', 'cold'] },
            { char: '😱', name: 'teriak takut', tags: ['panik', 'kaget', 'scream'] },
            { char: '😨', name: 'takut cemas', tags: ['takut', 'anxiety', 'fearful'] },
            { char: '😰', name: 'cemas keringat', tags: ['panik', 'anxious', 'gugup'] },
            { char: '😥', name: 'lega setelah cemas', tags: ['lega', 'degdegan', 'relieved'] },
            { char: '😓', name: 'keringat dingin capek', tags: ['lelah', 'capek', 'down'] },
            { char: '🤗', name: 'pelukan hangat', tags: ['peluk', 'hangat', 'hug', 'support'] },
            { char: '🤔', name: 'berpikir merenung', tags: ['mikir', 'tanya', 'thinking'] },
            { char: '🫣', name: 'mengintip takut', tags: ['intip', 'malu', 'peeking'] },
            { char: '🤭', name: 'tutup mulut cekikikan', tags: ['senyum', 'geli', 'giggle'] },
            { char: '🤫', name: 'tutup mulut rahasia', tags: ['diam', 'tenang', 'quiet'] },
            { char: '🫡', name: 'hormat siap', tags: ['siap', 'hormat', 'salute'] },
            { char: '🫠', name: 'meleleh pasrah', tags: ['pasrah', 'lelah', 'melting'] },
            { char: '😐', name: 'datar netral', tags: ['biasa', 'datar', 'neutral'] },
            { char: '😑', name: 'tanpa ekspresi', tags: ['capek', 'lelah', 'flat'] },
            { char: '😬', name: 'meringis tegang', tags: ['canggung', 'tegang', 'grimace'] },
            { char: '😴', name: 'tidur nyenyak', tags: ['tidur', 'ngantuk', 'sleep'] },
            { char: '😪', name: 'mengantuk lemas', tags: ['ngantuk', 'lelah', 'sleepy'] },
            { char: '😵', name: 'pusing pingsan', tags: ['pusing', 'dizzy', 'kliyengan'] },
            { char: '😷', name: 'masker medis', tags: ['sakit', 'masker', 'flu'] },
            { char: '🤒', name: 'termometer demam', tags: ['demam', 'sakit', 'fever'] },
            { char: '🤕', name: 'perban luka', tags: ['luka', 'cedera', 'hurt'] },
        ],
    },
    {
        id: 'hearts',
        name: 'Hati & Jiwa',
        icon: 'favorite',
        emojis: [
            { char: '💙', name: 'hati biru kesehatan', tags: ['hati', 'biru', 'tenang', 'blue heart', 'aevyra'] },
            { char: '❤️', name: 'hati merah cinta', tags: ['cinta', 'love', 'sayang', 'red heart'] },
            { char: '💚', name: 'hati hijau alami', tags: ['sehat', 'hijau', 'alam', 'green heart'] },
            { char: '🤍', name: 'hati putih tulus', tags: ['tulus', 'damai', 'white heart'] },
            { char: '🧡', name: 'hati oranye semangat', tags: ['semangat', 'hangat', 'orange'] },
            { char: '💛', name: 'hati kuning ceria', tags: ['ceria', 'sahabat', 'yellow heart'] },
            { char: '💜', name: 'hati ungu kasih', tags: ['kasih', 'purple'] },
            { char: '❤️‍🩹', name: 'hati pulih sembuh', tags: ['sembuh', 'pemulihan', 'mendingan', 'healing'] },
            { char: '❤️‍🔥', name: 'hati berkobar semangat', tags: ['semangat', 'membara', 'fire heart'] },
            { char: '💔', name: 'patah hati sedih', tags: ['patah', 'kecewa', 'broken heart'] },
            { char: '🫀', name: 'organ jantung klinis', tags: ['jantung', 'anatomi', 'kardio', 'heart organ'] },
            { char: '💕', name: 'dua hati cinta', tags: ['cinta', 'sayang', 'two hearts'] },
            { char: '💖', name: 'hati berkilau', tags: ['sayang', 'spesial', 'sparkle heart'] },
            { char: '💗', name: 'hati berdebar', tags: ['degdegan', 'tumbuh', 'growing heart'] },
            { char: '💓', name: 'detak jantung', tags: ['denyut', 'pulse', 'beating heart'] },
            { char: '💞', name: 'hati berputar', tags: ['kasih', 'revolving'] },
            { char: '🫂', name: 'pelukan erat suportif', tags: ['peluk', 'teman', 'dukungan', 'embrace', 'hug'] },
            { char: '🕊️', name: 'burung merpati damai', tags: ['damai', 'tenang', 'peace'] },
            { char: '🕯️', name: 'lilin ketenangan', tags: ['doa', 'tenang', 'hening', 'candle'] },
            { char: '✨', name: 'kilauan bintang harapan', tags: ['harapan', 'positif', 'berkilau', 'sparkles'] },
            { char: '🌟', name: 'bintang bersinar', tags: ['bersinar', 'hebat', 'star'] },
            { char: '💫', name: 'kilau pusing bintang', tags: ['energi', 'bintang'] },
            { char: '☀️', name: 'matahari pagi cerah', tags: ['pagi', 'cerah', 'semangat', 'sun'] },
            { char: '🌈', name: 'pelangi harapan', tags: ['pelangi', 'indah', 'harapan', 'rainbow'] },
            { char: '🌸', name: 'bunga sakura mekar', tags: ['bunga', 'cantik', 'lembut', 'sakura'] },
            { char: '🌺', name: 'bunga kembang sepatu', tags: ['bunga', 'cantik', 'flower'] },
            { char: '🌼', name: 'bunga mekar ceria', tags: ['ceria', 'bunga', 'blossom'] },
            { char: '🧘', name: 'meditasi ketenangan batin', tags: ['meditasi', 'napas', 'tenang', 'mindfulness'] },
            { char: '🧘‍♀️', name: 'wanita meditasi relaksasi', tags: ['meditasi', 'relaks', 'calm'] },
            { char: '🧘‍♂️', name: 'pria meditasi relaksasi', tags: ['meditasi', 'relaks', 'calm'] },
            { char: '💭', name: 'gelembung pikiran', tags: ['mikir', 'pikiran', 'curhat', 'thought'] },
            { char: '💬', name: 'balon percakapan ngobrol', tags: ['ngobrol', 'bicara', 'chat'] },
            { char: '💌', name: 'surat cinta kasih', tags: ['surat', 'pesan', 'love letter'] },
        ],
    },
    {
        id: 'gestures',
        name: 'Gestur & Tangan',
        icon: 'front_hand',
        emojis: [
            { char: '👍', name: 'jempol mantap setuju', tags: ['oke', 'bagus', 'setuju', 'thumbs up'] },
            { char: '👎', name: 'jempol bawah tidak setuju', tags: ['kurang', 'tidak', 'thumbs down'] },
            { char: '👏', name: 'tepuk tangan apresiasi', tags: ['hebat', 'selamat', 'applause', 'clap'] },
            { char: '🙌', name: 'angkat tangan bersyukur', tags: ['alhamdulillah', 'hore', 'praise'] },
            { char: '🫶', name: 'tangan bentuk hati', tags: ['cinta', 'sayang', 'heart hands'] },
            { char: '👐', name: 'tangan terbuka menyambut', tags: ['terbuka', 'ramah', 'open hands'] },
            { char: '🤲', name: 'tangan berdoa memohon', tags: ['doa', 'mohon', 'pray hands'] },
            { char: '🤝', name: 'jabat tangan sepakat', tags: ['sepakat', 'salam', 'handshake'] },
            { char: '🙏', name: 'terima kasih memohon', tags: ['makasih', 'maaf', 'tolong', 'pray', 'thanks'] },
            { char: '✌️', name: 'tanda damai peace', tags: ['damai', 'semangat', 'peace'] },
            { char: '🤞', name: 'silang jari berdoa beruntung', tags: ['beruntung', 'harapan', 'crossed fingers'] },
            { char: '🫰', name: 'saranghae love kecil', tags: ['cinta', 'finger heart'] },
            { char: '🤟', name: 'tanda sayang i love you', tags: ['sayang', 'cinta', 'love sign'] },
            { char: '🤘', name: 'rock on semangat', tags: ['semangat', 'rock'] },
            { char: '👌', name: 'tangan oke sempurna', tags: ['oke', 'pas', 'mantap', 'ok'] },
            { char: '🤌', name: 'tangan menguncup tanya', tags: ['maksud', 'kenapa', 'italian gesture'] },
            { char: '🤏', name: 'sedikit secuil', tags: ['dikit', 'sedikit', 'pinch'] },
            { char: '👈', name: 'tunjuk kiri', tags: ['kiri', 'lihat'] },
            { char: '👉', name: 'tunjuk kanan', tags: ['kanan', 'lihat'] },
            { char: '👆', name: 'tunjuk atas', tags: ['atas', 'poin'] },
            { char: '👇', name: 'tunjuk bawah', tags: ['bawah', 'cek'] },
            { char: '✋', name: 'tangan berhenti sapa', tags: ['stop', 'halo', 'hand'] },
            { char: '👋', name: 'lambaian tangan menyapa', tags: ['dadah', 'halo', 'bye', 'wave'] },
            { char: '🤙', name: 'telepon santai shaka', tags: ['santai', 'telepon', 'call'] },
            { char: '💪', name: 'otot lengan kuat sehat', tags: ['kuat', 'semangat', 'sehat', 'strong', 'muscle'] },
        ],
    },
    {
        id: 'food',
        name: 'Makanan & Nutrisi',
        icon: 'nutrition',
        emojis: [
            { char: '🍎', name: 'apel merah kaya serat', tags: ['apel', 'buah', 'serat', 'apple'] },
            { char: '🍏', name: 'apel hijau rendah gula', tags: ['apel hijau', 'sehat', 'green apple'] },
            { char: '🥑', name: 'alpukat lemak sehat', tags: ['alpukat', 'lemak baik', 'avocado'] },
            { char: '🥦', name: 'brokoli serat tinggi', tags: ['sayur', 'brokoli', 'fiber', 'broccoli'] },
            { char: '🥗', name: 'salad sayur segar', tags: ['salad', 'sayuran', 'sehat', 'diet'] },
            { char: '🥒', name: 'mentimun hidrasi', tags: ['timun', 'mentimun', 'segar', 'cucumber'] },
            { char: '🥕', name: 'wortel vitamin a', tags: ['wortel', 'sayur', 'carrot'] },
            { char: '🍅', name: 'tomat likopen', tags: ['tomat', 'antioksidan', 'tomato'] },
            { char: '🥬', name: 'sayuran hijau sawi', tags: ['sayur hijau', 'serat', 'greens'] },
            { char: '🫑', name: 'paprika hijau vitamin c', tags: ['paprika', 'sayur', 'bell pepper'] },
            { char: '🌽', name: 'jagung manis serat', tags: ['jagung', 'karbo', 'corn'] },
            { char: '🍠', name: 'ubi jalar karbo kompleks', tags: ['ubi', 'karbo baik', 'sweet potato'] },
            { char: '🥔', name: 'kentang rebus', tags: ['kentang', 'karbo', 'potato'] },
            { char: '🥚', name: 'telur protein murni', tags: ['telur', 'protein', 'egg'] },
            { char: '🍳', name: 'telur mata sapi sarapan', tags: ['sarapan', 'protein', 'cooking'] },
            { char: '🍲', name: 'sup hangat berkuah', tags: ['sup', 'sayur', 'hangat', 'soup'] },
            { char: '🥣', name: 'oatmeal mangkuk sarapan', tags: ['oats', 'oatmeal', 'sarapan glikemik', 'cereal'] },
            { char: '🍌', name: 'pisang kalium potasium', tags: ['pisang', 'buah', 'banana'] },
            { char: '🍓', name: 'stroberi rendah glikemik', tags: ['stroberi', 'buah berry', 'strawberry'] },
            { char: '🫐', name: 'blueberry antioksidan', tags: ['blueberry', 'antioksidan', 'berry'] },
            { char: '🍉', name: 'semangka segar air', tags: ['semangka', 'buah', 'watermelon'] },
            { char: '🍊', name: 'jeruk vitamin c', tags: ['jeruk', 'buah', 'orange'] },
            { char: '🍋', name: 'lemon detoks segar', tags: ['lemon', 'segar', 'sitrus'] },
            { char: '🍇', name: 'anggur segar', tags: ['anggur', 'buah', 'grape'] },
            { char: '💧', name: 'tetes air putih hidrasi', tags: ['air', 'minum', 'hidrasi', 'water drop'] },
            { char: '🧊', name: 'es batu dingin', tags: ['es', 'dingin', 'ice'] },
            { char: '🥛', name: 'segelas susu murni', tags: ['susu', 'kalsium', 'milk'] },
            { char: '🍵', name: 'teh hijau matcha hangat', tags: ['teh hijau', 'matcha', 'antistres', 'green tea'] },
            { char: '☕', name: 'kopi hangat santai', tags: ['kopi', 'kafein', 'coffee', 'istirahat'] },
            { char: '🫖', name: 'teko teh relaksasi', tags: ['teh', 'hangat', 'teapot'] },
            { char: '🥤', name: 'minuman gelas', tags: ['minum', 'jus', 'cup'] },
        ],
    },
    {
        id: 'wellness',
        name: 'Relaksasi & Alam',
        icon: 'spa',
        emojis: [
            { char: '🌿', name: 'herbal alami ketenangan', tags: ['herbal', 'daun', 'sehat', 'alam', 'herb'] },
            { char: '🍃', name: 'daun berhembus sepoi', tags: ['daun', 'sepoi', 'segar', 'leaf'] },
            { char: '☘️', name: 'daun semanggi damai', tags: ['keberuntungan', 'shamrock'] },
            { char: '🍀', name: 'daun empat keberuntungan', tags: ['hoki', 'beruntung', 'clover'] },
            { char: '🌱', name: 'tunas bertumbuh harapan', tags: ['tumbuh', 'mulai baru', 'seedling'] },
            { char: '🪴', name: 'tanaman hias ruangan', tags: ['tanaman', 'rumah', 'potted plant'] },
            { char: '🌲', name: 'pohon pinus asri', tags: ['alam', 'hutan', 'pine'] },
            { char: '🌳', name: 'pohon rindang teduh', tags: ['teduh', 'pohon', 'tree'] },
            { char: '🌴', name: 'pohon palem pantai', tags: ['liburan', 'santai', 'palm'] },
            { char: '🌊', name: 'ombak laut menenangkan', tags: ['laut', 'ombak', 'tenang', 'wave'] },
            { char: '🌤️', name: 'matahari di balik awan', tags: ['cuaca', 'teduh', 'sun behind cloud'] },
            { char: '🌧️', name: 'hujan rintik menenangkan', tags: ['hujan', 'sejuk', 'rain'] },
            { char: '🌙', name: 'bulan sabit malam istirahat', tags: ['malam', 'tidur', 'moon'] },
            { char: '🪐', name: 'planet ruang angkasa', tags: ['angkasa', 'planet'] },
            { char: '🪷', name: 'bunga teratai ketenangan', tags: ['teratai', 'zen', 'lotus'] },
            { char: '🛋️', name: 'sofa ruang santai', tags: ['santai', 'istirahat', 'couch'] },
            { char: '🛌', name: 'tempat tidur istirahat pulas', tags: ['tidur', 'ranjang', 'bed'] },
            { char: '🏡', name: 'rumah tempat pulang nyaman', tags: ['rumah', 'keluarga', 'home'] },
        ],
    },
    {
        id: 'fitness',
        name: 'Aktivitas & Kebugaran',
        icon: 'directions_run',
        emojis: [
            { char: '🚶', name: 'jalan kaki sehat', tags: ['jalan', 'langkah', 'walking'] },
            { char: '🚶‍♂️', name: 'pria jalan santai', tags: ['jalan', 'pria', 'man walking'] },
            { char: '🚶‍♀️', name: 'wanita jalan santai', tags: ['jalan', 'wanita', 'woman walking'] },
            { char: '🏃', name: 'lari kardio', tags: ['lari', 'kardio', 'running'] },
            { char: '🏃‍♂️', name: 'pria lari jogging', tags: ['lari', 'jogging'] },
            { char: '🏃‍♀️', name: 'wanita lari jogging', tags: ['lari', 'jogging'] },
            { char: '🏋️', name: 'angkat beban otot', tags: ['beban', 'gym', 'otot', 'weightlifter'] },
            { char: '🏋️‍♂️', name: 'pria latihan beban', tags: ['gym', 'beban'] },
            { char: '🏋️‍♀️', name: 'wanita latihan beban', tags: ['gym', 'beban'] },
            { char: '🚴', name: 'bersepeda santai', tags: ['sepeda', 'gowes', 'cycling'] },
            { char: '🚴‍♂️', name: 'pria bersepeda', tags: ['sepeda', 'gowes'] },
            { char: '🚴‍♀️', name: 'wanita bersepeda', tags: ['sepeda', 'gowes'] },
            { char: '🏊', name: 'berenang segar', tags: ['renang', 'swimming'] },
            { char: '🧗', name: 'panjat tebing tantangan', tags: ['panjat', 'climbing'] },
            { char: '👟', name: 'sepatu lari olahraga', tags: ['sepatu', 'sneakers', 'jalan'] },
            { char: '⏱️', name: 'stopwatch hitung waktu', tags: ['waktu', 'target', 'timer'] },
            { char: '🩺', name: 'stetoskop pemeriksaan medis', tags: ['stetoskop', 'dokter', 'medis', 'stethoscope'] },
            { char: '💊', name: 'kapsul suplemen vitamin', tags: ['obat', 'vitamin', 'suplemen', 'pill'] },
            { char: '🩹', name: 'plester pertolongan pertama', tags: ['luka', 'plester', 'bandage'] },
            { char: '🩸', name: 'tetes darah cek gula harian', tags: ['darah', 'gula darah', 'glukosa', 'blood'] },
            { char: '⚖️', name: 'timbangan berat seimbang', tags: ['timbangan', 'berat badan', 'seimbang', 'balance'] },
        ],
    },
];

export default function WhatsAppEmojiPicker({ onSelect, onClose, isOpen }) {
    const [activeTab, setActiveTab] = useState('smileys');
    const [searchQuery, setSearchQuery] = useState('');
    const [hoveredEmoji, setHoveredEmoji] = useState(null);
    const containerRef = useRef(null);
    const searchInputRef = useRef(null);

    // Auto-focus search when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    // Filter emojis based on search query
    const filteredResults = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return null;

        const results = [];
        const seen = new Set();

        for (const cat of EMOJI_CATEGORIES) {
            for (const item of cat.emojis) {
                if (seen.has(item.char)) continue;
                const matchName = item.name.toLowerCase().includes(q);
                const matchTag = item.tags.some((t) => t.toLowerCase().includes(q));
                if (matchName || matchTag || item.char.includes(q)) {
                    results.push(item);
                    seen.add(item.char);
                }
            }
        }
        return results;
    }, [searchQuery]);

    // Handle outside click without conflicting with the toggle trigger button
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target) &&
                !e.target.closest('[data-emoji-trigger="true"]')
            ) {
                onClose?.();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const currentCategory = EMOJI_CATEGORIES.find((c) => c.id === activeTab) || EMOJI_CATEGORIES[0];
    const displayEmojis = filteredResults !== null ? filteredResults : currentCategory.emojis;

    return (
        <div
            ref={containerRef}
            className="absolute bottom-full mb-2 left-2 right-2 sm:left-4 sm:right-4 z-40 bg-white rounded-2xl shadow-[0_12px_36px_rgba(11,20,26,0.22)] border border-[#d1d7db] overflow-hidden flex flex-col animate-fade-in select-none"
            style={{ maxHeight: '360px' }}
            role="region"
            aria-label="Pemilih Emoji Gaya WhatsApp"
        >
            {/* 1. Header: Search Bar & Close */}
            <div className="p-2.5 bg-[#f0f2f5] border-b border-[#e9edef] flex items-center gap-2 shrink-0">
                <div className="flex-1 relative flex items-center">
                    <span className="material-symbols-outlined absolute left-2.5 text-[#54656f] text-[18px] pointer-events-none">
                        search
                    </span>
                    <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari emoji (misal: senyum, hati, cemas, kopi)..."
                        className="w-full bg-white rounded-xl pl-8 pr-7 py-1.5 text-xs text-[#111b21] placeholder-[#8696a0] border border-transparent focus:outline-none focus:ring-1 focus:ring-[#00a884] shadow-2xs"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-2 text-[#54656f] hover:text-[#111b21] p-0.5 rounded-full cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                    )}
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="p-1 rounded-full text-[#54656f] hover:text-[#111b21] hover:bg-black/5 transition-colors cursor-pointer shrink-0"
                    title="Tutup Emoji"
                >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
            </div>

            {/* 2. Category Nav Tabs (WhatsApp style) */}
            {!searchQuery && (
                <div className="flex items-center justify-between px-2 py-1 bg-[#f7f8fa] border-b border-[#e9edef] shrink-0 overflow-x-auto no-scrollbar">
                    {EMOJI_CATEGORIES.map((cat) => {
                        const isActive = activeTab === cat.id;
                        return (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => setActiveTab(cat.id)}
                                className={`flex items-center justify-center p-2 rounded-xl transition-all cursor-pointer relative shrink-0 ${
                                    isActive
                                        ? 'text-[#008069] bg-[#e7fed9]'
                                        : 'text-[#54656f] hover:text-[#111b21] hover:bg-black/5'
                                }`}
                                title={cat.name}
                            >
                                <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                                {isActive && (
                                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#008069] rounded-full" />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* 3. Section Title / Search Feedback */}
            <div className="px-3 py-1.5 bg-[#fcfdfd] border-b border-[#f0f2f5] flex items-center justify-between text-[11px] font-semibold text-[#54656f] shrink-0">
                <span>
                    {searchQuery
                        ? `Hasil pencarian: "${searchQuery}" (${displayEmojis.length})`
                        : currentCategory.name}
                </span>
                <span className="text-[10px] text-[#8696a0] font-normal">Klik untuk menyisipkan</span>
            </div>

            {/* 4. Emoji Grid Stream */}
            <div className="flex-1 p-2.5 overflow-y-auto min-h-42.5 max-h-55">
                {displayEmojis.length === 0 ? (
                    <div className="py-8 text-center text-xs text-[#8696a0]">
                        <span className="material-symbols-outlined text-3xl mb-1 block text-[#cbd5e1]">
                            sentiment_dissatisfied
                        </span>
                        Emoji tidak ditemukan untuk "{searchQuery}"
                    </div>
                ) : (
                    <div className="grid grid-cols-7 sm:grid-cols-8 gap-1.5 sm:gap-2">
                        {displayEmojis.map((item, idx) => (
                            <button
                                key={`${item.char}-${idx}`}
                                type="button"
                                onClick={() => onSelect(item.char)}
                                onMouseEnter={() => setHoveredEmoji(item)}
                                onMouseLeave={() => setHoveredEmoji(null)}
                                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-xl sm:text-2xl rounded-xl hover:bg-[#e7fed9] active:scale-90 transition-all cursor-pointer select-none"
                                title={item.name}
                                aria-label={item.name}
                            >
                                <span className="transition-transform hover:scale-125 duration-100">
                                    {item.char}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* 5. Footer Preview Bar (WhatsApp Style Preview) */}
            <div className="px-3 py-1.5 bg-[#f0f2f5] border-t border-[#e9edef] flex items-center justify-between text-[11px] text-[#54656f] shrink-0">
                {hoveredEmoji ? (
                    <div className="flex items-center gap-2 truncate">
                        <span className="text-xl leading-none">{hoveredEmoji.char}</span>
                        <span className="truncate capitalize font-medium text-[#111b21]">
                            {hoveredEmoji.name}
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5 text-[#8696a0] text-[10px]">
                        <span className="material-symbols-outlined text-[14px]">touch_app</span>
                        <span>Dukungan ekspresi emosi &amp; kesehatan AEVYRA</span>
                    </div>
                )}

                <div className="flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25d366]" />
                    <span className="text-[10px] text-[#008069] font-medium">WhatsApp Style</span>
                </div>
            </div>
        </div>
    );
}
