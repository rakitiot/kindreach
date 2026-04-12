import {
  Activity,
  Bell,
  Bot,
  Camera,
  Calendar,
  FileWarning,
  Heart,
  LayoutDashboard,
  Mail,
  Map,
  MessageCircle,
  Music,
  Newspaper,
  Phone,
  Settings,
  Shield,
  ShieldAlert,
  Sparkles,
  Trophy,
  User,
  Users,
  Wallet,
} from 'lucide-react'

export const loginAccounts = [
  {
    id: 'student',
    name: 'Resty Kartika Sari',
    email: 'resty.kartika.sari@kindreach.id',
    school: 'SMA Harmoni Nusantara',
    schoolCode: 'HN-2026',
    role: 'Siswa',
    roleLabel: 'Kindness Warrior',
    points: 2480,
    streak: 16,
    level: 'Empathy Guardian',
    focus: 'Fokus hari ini: menyelesaikan simulasi Kind-Quest dan menjaga teman di ruang digital.',
    department: 'XI IPS 2',
  },
  {
    id: 'teacher',
    name: 'Dinda Maharani',
    email: 'dinda.maharani@kindreach.id',
    school: 'SMA Harmoni Nusantara',
    schoolCode: 'HN-2026',
    role: 'Guru BK',
    roleLabel: 'Student Support Lead',
    points: 3120,
    streak: 22,
    level: 'Care Leader',
    focus: 'Fokus hari ini: meninjau pola laporan, memberi dukungan awal, dan menindaklanjuti kasus prioritas.',
    department: 'Bimbingan Konseling',
  },
  {
    id: 'admin',
    name: 'Raka Aditya',
    email: 'raka.aditya@kindreach.id',
    school: 'SMA Harmoni Nusantara',
    schoolCode: 'HN-2026',
    role: 'Admin Sekolah',
    roleLabel: 'School Safety Admin',
    points: 4280,
    streak: 31,
    level: 'System Guardian',
    focus: 'Fokus hari ini: memverifikasi laporan masuk, memantau respon cepat, dan mengoordinasikan tim sekolah.',
    department: 'Manajemen Sekolah',
  },
]

export const phoneApps = [
  { label: 'FaceTime', icon: VideoCameraIcon, color: 'green' },
  { label: 'Calendar', icon: Calendar, color: 'white' },
  { label: 'Photos', icon: Sparkles, color: 'multi' },
  { label: 'Camera', icon: Camera, color: 'dark' },
  { label: 'Mail', icon: Mail, color: 'blue' },
  { label: 'Clock', icon: Activity, color: 'white' },
  { label: 'Maps', icon: Map, color: 'greenblue' },
  { label: 'Weather', icon: CloudIcon, color: 'blue' },
  { label: 'Reminders', icon: Bell, color: 'white' },
  { label: 'Notes', icon: FileWarning, color: 'white' },
  { label: 'Stocks', icon: Activity, color: 'dark' },
  { label: 'News', icon: Newspaper, color: 'white' },
  { label: 'Books', icon: BookIcon, color: 'orange' },
  { label: 'Podcasts', icon: RadioIcon, color: 'purple' },
  { label: 'App Store', icon: Sparkles, color: 'blue' },
  { label: 'Settings', icon: Settings, color: 'gray' },
  { label: 'Health', icon: Heart, color: 'white' },
  { label: 'Wallet', icon: Wallet, color: 'dark' },
  { label: 'KindReach', icon: ShieldAlert, color: 'kindreach', isKindReach: true },
]

export const dockApps = [
  { label: 'Phone', icon: Phone, color: 'green' },
  { label: 'Camera', icon: Camera, color: 'dark' },
  { label: 'Messages', icon: MessageCircle, color: 'green' },
  { label: 'Music', icon: Music, color: 'pink' },
]

export const featureCards = [
  {
    key: 'cyber',
    title: 'Cyber-Shield',
    text: 'Nudging real-time untuk menahan pesan kasar sebelum terkirim.',
    status: 'Preventive',
    color: 'teal',
  },
  {
    key: 'kindbot',
    title: 'KindBot',
    text: 'AI companion yang validatif, suportif, dan siap bantu susun langkah aman.',
    status: 'AI Listener',
    color: 'violet',
  },
  {
    key: 'report',
    title: 'Laman Lapor',
    text: 'Form anonim dengan bukti, kronologi, prioritas, dan status tindak lanjut.',
    status: 'Protected',
    color: 'rose',
  },
  {
    key: 'quest',
    title: 'Kind-Quest',
    text: 'Misi simulasi sosial untuk melatih empati dan active defending.',
    status: 'Gamified',
    color: 'amber',
  },
]

export const initialReports = [
  {
    id: 'KR-2401',
    type: 'Verbal Bullying',
    place: 'Grup kelas online',
    status: 'Diproses',
    priority: 'Tinggi',
    reporterRole: 'Saksi',
    reporterLabel: 'Anonim',
    chronology: 'Teman saya diejek berulang kali di grup kelas dengan kata-kata menjatuhkan.',
    evidenceName: 'screenshot-grup-kelas.png',
    anonymousMode: true,
    createdAt: '2026-04-08T10:15:00.000Z',
  },
  {
    id: 'KR-2402',
    type: 'Intimidasi',
    place: 'Koridor sekolah',
    status: 'Terverifikasi',
    priority: 'Sedang',
    reporterRole: 'Korban',
    reporterLabel: 'Anonim',
    chronology: 'Ada ancaman verbal saat jam istirahat di koridor lantai 2.',
    evidenceName: 'catatan-kronologi.pdf',
    anonymousMode: true,
    createdAt: '2026-04-09T13:40:00.000Z',
  },
  {
    id: 'KR-2403',
    type: 'Cyberbullying',
    place: 'DM media sosial',
    status: 'Menunggu verifikasi',
    priority: 'Tinggi',
    reporterRole: 'Saksi',
    reporterLabel: 'Anonim',
    chronology: 'Pesan menghina dikirim ke siswa kelas X secara personal sejak tiga hari terakhir.',
    evidenceName: 'chat-dm-3hari.jpg',
    anonymousMode: true,
    createdAt: '2026-04-10T08:05:00.000Z',
  },
]

export const missionCards = [
  { title: 'Bela Temanmu', xp: '+120 pts', progress: 80 },
  { title: 'Empathy Challenge', xp: '+90 pts', progress: 55 },
  { title: 'Speak Up Safely', xp: '+140 pts', progress: 35 },
]

export const questScenarios = [
  {
    id: 'quest-1',
    title: 'Chat Grup Kelas Memanas',
    badge: 'Scenario 01',
    summary: 'Seseorang mulai mengejek teman sekelas di grup dan siswa lain ikut menertawakan.',
    prompt: 'Apa tindakan paling aman dan empatik yang sebaiknya kamu lakukan?',
    reward: 120,
    options: [
      {
        id: 'q1-a',
        label: 'DM korban, beri dukungan, lalu laporkan bukti ke guru BK.',
        outcome: 'Pilihan ini menunjukkan active defending dan menjaga keselamatan korban.',
        points: 120,
      },
      {
        id: 'q1-b',
        label: 'Ikut diam supaya tidak jadi target berikutnya.',
        outcome: 'Diam memang terasa aman, tapi korban kehilangan dukungan dan kejadian bisa berlanjut.',
        points: 30,
      },
      {
        id: 'q1-c',
        label: 'Balas pelaku dengan hinaan yang sama kerasnya.',
        outcome: 'Membalas dengan agresi memperbesar konflik dan berisiko menambah korban.',
        points: 10,
      },
    ],
  },
  {
    id: 'quest-2',
    title: 'Temanmu Takut Melapor',
    badge: 'Scenario 02',
    summary: 'Korban bilang takut dibalas kalau sampai guru tahu siapa yang melapor.',
    prompt: 'Respons seperti apa yang paling membantu?',
    reward: 140,
    options: [
      {
        id: 'q2-a',
        label: 'Tawarkan fitur laporan anonim dan dampingi dia menyusun kronologi.',
        outcome: 'Kamu membantu korban merasa aman sekaligus menjaga peluang tindak lanjut sekolah.',
        points: 140,
      },
      {
        id: 'q2-b',
        label: 'Bilang saja untuk bersabar, nanti juga reda sendiri.',
        outcome: 'Masalah bisa makin lama berlangsung karena tidak ada intervensi.',
        points: 20,
      },
      {
        id: 'q2-c',
        label: 'Sebarkan cerita korban ke teman dekat agar ramai.',
        outcome: 'Ini justru bisa melukai privasi korban dan memperluas masalah.',
        points: 0,
      },
    ],
  },
]

export const kindbotPlaybook = {
  opening: [
    { from: 'bot', text: 'Hai, aku KindBot. Aku siap mendengar tanpa menghakimi. Kamu sedang butuh ditemani, disusun langkah aman, atau ingin membuat laporan?' },
  ],
  flows: {
    ditemani: [
      { from: 'user', text: 'Aku cuma ingin ditemani dulu.' },
      { from: 'bot', text: 'Tentu. Tarik napas pelan. Apa yang paling bikin kamu tidak nyaman saat ini?' },
      { from: 'bot', text: 'Kamu tidak harus menyelesaikan semuanya sekarang. Kita bisa mulai dari satu kejadian yang paling penting.' },
    ],
    laporan: [
      { from: 'user', text: 'Aku ingin menyusun laporan yang aman.' },
      { from: 'bot', text: 'Baik. Fokuskan pada siapa, apa, kapan, dan di mana. Kalau kamu mau tetap anonim, aktifkan mode anonim di Laman Lapor.' },
      { from: 'bot', text: 'Aku sarankan sertakan bukti seperti tangkapan layar, kronologi singkat, dan lokasi kejadian agar tim sekolah lebih cepat memverifikasi.' },
    ],
    dukungTeman: [
      { from: 'user', text: 'Aku ingin bantu temanku yang jadi korban.' },
      { from: 'bot', text: 'Langkah aman: validasi perasaannya, jangan menyalahkan, tawarkan ditemani saat melapor, dan hindari menyebarkan cerita tanpa izin.' },
      { from: 'bot', text: 'Kalau situasinya mendesak, kamu bisa gunakan tombol SOS atau langsung hubungi guru BK.' },
    ],
  },
}

export const reportPresets = [
  'Verbal Bullying',
  'Cyberbullying',
  'Intimidasi',
  'Pengucilan Sosial',
]

export const priorityOptions = ['Tinggi', 'Sedang', 'Rendah']

export const responderTeam = [
  { name: 'Pak Budi', role: 'Guru BK', eta: '2 menit', status: 'Menuju lokasi' },
  { name: 'Bu Sinta', role: 'Wali Kelas', eta: '4 menit', status: 'Stand by' },
  { name: 'Rani', role: 'Teman Aman', eta: '1 menit', status: 'Paling dekat' },
]

export const shieldFlaggedWords = ['bodoh', 'tolol', 'jelek', 'goblok', 'idiot', 'bego', 'cupu', 'norak']

export const bottomTabs = [
  { key: 'home', label: 'Home', icon: Shield },
  { key: 'shield', label: 'Shield', icon: ShieldAlert },
  { key: 'kindbot', label: 'KindBot', icon: Bot },
  { key: 'report', label: 'Lapor', icon: FileWarning },
  { key: 'profile', label: 'Profil', icon: User },
]

export const adminMenu = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'reports', label: 'Laporan', icon: FileWarning },
  { key: 'cases', label: 'Tindak Lanjut', icon: ShieldAlert },
  { key: 'members', label: 'Anggota', icon: Users },
]

function VideoCameraIcon(props) {
  return <Phone {...props} />
}

function CloudIcon(props) {
  return <Sparkles {...props} />
}

function BookIcon(props) {
  return <Users {...props} />
}

function RadioIcon(props) {
  return <Trophy {...props} />
}
