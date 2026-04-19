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
    accountCode: 'SIS-HN-2026',
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
    accountCode: 'BK-HN-2026',
    role: 'Guru BK',
    roleLabel: 'Student Support Lead',
    points: 3120,
    streak: 22,
    level: 'Care Leader',
    focus: 'Fokus hari ini: meninjau pola laporan, memberi dukungan awal, dan menindaklanjuti kasus prioritas.',
    department: 'Bimbingan Konseling',
    staffPermissions: {
      canVerify: true,
      canProcess: true,
      canComplete: false,
    },
  },
  {
    id: 'admin',
    name: 'Raka Aditya',
    email: 'raka.aditya@kindreach.id',
    school: 'SMA Harmoni Nusantara',
    schoolCode: 'HN-2026',
    accountCode: 'ADM-HN-2026',
    role: 'Admin Sekolah',
    roleLabel: 'School Safety Admin',
    points: 4280,
    streak: 31,
    level: 'System Guardian',
    focus: 'Fokus hari ini: memverifikasi laporan masuk, memantau respon cepat, dan mengoordinasikan tim sekolah.',
    department: 'Manajemen Sekolah',
    staffPermissions: {
      canVerify: false,
      canProcess: false,
      canComplete: true,
    },
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
    text: 'Peringatan sebelum pesan berisiko dikirim.',
    status: 'Pencegahan',
    color: 'teal',
  },
  {
    key: 'kindbot',
    title: 'KindBot',
    text: 'Teman chat untuk menyusun langkah aman.',
    status: 'Pendamping AI',
    color: 'violet',
  },
  {
    key: 'report',
    title: 'Laman Lapor',
    text: 'Kirim kronologi, lokasi, dan bukti secara aman.',
    status: 'Terlindungi',
    color: 'rose',
  },
  {
    key: 'quest',
    title: 'Kind-Quest',
    text: 'Game empati untuk melatih respons aman.',
    status: 'Misi Empati',
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
  { title: 'Tantangan Empati', xp: '+90 pts', progress: 55 },
  { title: 'Berani Bicara Aman', xp: '+140 pts', progress: 35 },
]

export const rolePlayQuest = {
  modes: [
    {
      id: 'read',
      title: 'Ruang Baca',
      label: 'Materi anti-perundungan',
      status: 'Segera dibuka',
      locked: true,
      detail: 'Kartu ringkas untuk memahami jenis perundungan dan cara mencari bantuan.',
    },
    {
      id: 'victim',
      title: 'Simulasi sebagai Korban',
      label: 'Role-play percakapan aman',
      status: 'Aktif',
      locked: false,
      detail: 'Latih respons saat menerima perlakuan tidak nyaman di ruang digital.',
    },
    {
      id: 'witness',
      title: 'Simulasi sebagai Saksi',
      label: 'Active defender',
      status: 'Segera dibuka',
      locked: true,
      detail: 'Belajar membantu teman tanpa memperkeruh konflik atau membuka privasi korban.',
    },
  ],
  mapNodes: [
    {
      id: 'cyberbullying-group',
      title: 'Cyberbullying di Grup Kelas',
      status: 'Aktif',
      state: 'active',
      detail: 'Masuk ke simulasi percakapan 5 babak sebagai korban yang menerima ejekan di grup kelas.',
    },
    {
      id: 'verbal-teasing',
      title: 'Ejekan Verbal',
      status: 'Terkunci',
      state: 'locked',
      detail: 'Topik berikutnya tentang merespons ejekan langsung secara aman.',
    },
    {
      id: 'social-exclusion',
      title: 'Dikucilkan',
      status: 'Terkunci',
      state: 'locked',
      detail: 'Simulasi saat siswa dijauhi dalam kelompok belajar atau pergaulan.',
    },
    {
      id: 'threat-message',
      title: 'Ancaman',
      status: 'Terkunci',
      state: 'locked',
      detail: 'Latihan mengambil langkah aman saat menerima ancaman berulang.',
    },
  ],
  initialMeters: {
    empathy: 42,
    safety: 46,
    risk: 54,
  },
  stages: [
    {
      id: 'scene-1',
      chapter: 'Babak 1',
      antagonist: 'Foto presentasimu lucu banget. Mending kamu jangan maju lagi deh.',
      victim: 'Kamu mulai malu, panik, dan ingin membalas karena teman-teman lain membaca pesan itu.',
      prompt: 'Apa respons pertama yang paling aman?',
      choices: [
        {
          id: 's1-a',
          label: 'Tarik napas, jangan balas kasar, lalu simpan chat sebagai bukti.',
          feedback: 'Kamu menjaga diri tetap aman dan mulai mengamankan bukti tanpa memperbesar konflik.',
          points: 90,
          meter: { empathy: 8, safety: 14, risk: -12 },
        },
        {
          id: 's1-b',
          label: 'Balas dengan hinaan supaya dia ikut malu.',
          feedback: 'Membalas hinaan bisa membuat konflik makin besar dan membuatmu ikut terlihat menyerang.',
          points: 10,
          meter: { empathy: -8, safety: -12, risk: 18 },
        },
        {
          id: 's1-c',
          label: 'Keluar grup dan hapus semua chat agar tidak kepikiran.',
          feedback: 'Menjauh bisa menenangkan sesaat, tetapi bukti penting bisa hilang dan bantuan jadi lebih sulit.',
          points: 35,
          meter: { empathy: 0, safety: -4, risk: 8 },
        },
      ],
    },
    {
      id: 'scene-2',
      chapter: 'Babak 2',
      antagonist: 'Teman-teman, lihat ini. Dia baperan banget kalau bercanda.',
      victim: 'Ejekan mulai ramai. Kamu merasa disudutkan di depan banyak orang.',
      prompt: 'Bagaimana kamu merespons tanpa memperkeruh suasana?',
      choices: [
        {
          id: 's2-a',
          label: 'Kirim pesan singkat: "Aku tidak nyaman. Tolong berhenti."',
          feedback: 'Respons singkat dan jelas membantu memberi batas tanpa menyerang balik.',
          points: 80,
          meter: { empathy: 6, safety: 12, risk: -10 },
        },
        {
          id: 's2-b',
          label: 'Kirim stiker marah dan sindiran panjang di grup.',
          feedback: 'Sindiran panjang bisa memancing balasan baru dan membuat situasi lebih sulit dikendalikan.',
          points: 20,
          meter: { empathy: -4, safety: -8, risk: 14 },
        },
        {
          id: 's2-c',
          label: 'Diam saja dan berharap mereka bosan sendiri.',
          feedback: 'Diam kadang terasa aman, tetapi kejadian bisa berlanjut jika tidak ada batas atau bantuan.',
          points: 30,
          meter: { empathy: 1, safety: -2, risk: 6 },
        },
      ],
    },
    {
      id: 'scene-3',
      chapter: 'Babak 3',
      antagonist: 'Kalau kamu lapor, awas ya. Jangan sok paling benar.',
      victim: 'Pesan itu terasa seperti ancaman. Kamu mulai takut pergi ke sekolah besok.',
      prompt: 'Apa langkah paling aman setelah ada ancaman?',
      choices: [
        {
          id: 's3-a',
          label: 'Screenshot ancaman dan ceritakan ke Guru BK atau wali kelas.',
          feedback: 'Ancaman perlu ditangani orang dewasa tepercaya. Menyimpan bukti membuat tindak lanjut lebih kuat.',
          points: 100,
          meter: { empathy: 8, safety: 18, risk: -18 },
        },
        {
          id: 's3-b',
          label: 'Tantang balik agar dia tidak mengira kamu takut.',
          feedback: 'Menantang balik bisa meningkatkan risiko dan membuat situasi berpindah ke konflik langsung.',
          points: 10,
          meter: { empathy: -6, safety: -14, risk: 20 },
        },
        {
          id: 's3-c',
          label: 'Sembunyikan dari semua orang karena takut dianggap lemah.',
          feedback: 'Rasa takut itu wajar, tetapi menyimpan sendiri bisa membuatmu kehilangan perlindungan.',
          points: 20,
          meter: { empathy: 0, safety: -10, risk: 12 },
        },
      ],
    },
    {
      id: 'scene-4',
      chapter: 'Babak 4',
      antagonist: 'Ada teman baik mengirim DM: "Aku lihat chat tadi. Kamu baik-baik aja?"',
      victim: 'Kamu ingin cerita, tetapi masih khawatir masalahnya menyebar.',
      prompt: 'Apa respons yang membantu menjaga dukungan tetap aman?',
      choices: [
        {
          id: 's4-a',
          label: 'Terima dukungan dan minta ditemani menyusun laporan aman.',
          feedback: 'Memilih pendamping tepercaya membantu kamu tidak menghadapi situasi sendirian.',
          points: 90,
          meter: { empathy: 10, safety: 14, risk: -12 },
        },
        {
          id: 's4-b',
          label: 'Tolak semua bantuan karena takut membuat teman ikut terseret.',
          feedback: 'Khawatir pada teman itu wajar, tetapi bantuan yang tepat justru bisa membuat proses lebih aman.',
          points: 25,
          meter: { empathy: 2, safety: -6, risk: 8 },
        },
        {
          id: 's4-c',
          label: 'Minta temanmu menyerang balik pelaku di grup.',
          feedback: 'Membalas ramai-ramai berisiko mengubah dukungan menjadi konflik baru.',
          points: 15,
          meter: { empathy: -4, safety: -12, risk: 16 },
        },
      ],
    },
    {
      id: 'scene-5',
      chapter: 'Babak 5',
      antagonist: 'Ejekan masih ada, tetapi kamu sudah punya bukti dan satu teman yang mendukung.',
      victim: 'Sekarang kamu perlu memilih langkah akhir agar sekolah bisa membantu.',
      prompt: 'Apa tindakan akhir yang paling aman?',
      choices: [
        {
          id: 's5-a',
          label: 'Buat laporan aman berisi kronologi, bukti, lokasi/kanal, dan mode anonim bila perlu.',
          feedback: 'Laporan yang jelas membantu tim sekolah menindaklanjuti tanpa membuka identitasmu ke siswa lain.',
          points: 100,
          meter: { empathy: 8, safety: 20, risk: -18 },
        },
        {
          id: 's5-b',
          label: 'Posting curhatan publik agar semua orang tahu siapa pelakunya.',
          feedback: 'Curhatan publik bisa membuka privasi dan memicu konflik baru sebelum sekolah menangani.',
          points: 25,
          meter: { empathy: -2, safety: -8, risk: 12 },
        },
        {
          id: 's5-c',
          label: 'Hapus semua bukti dan pura-pura tidak terjadi apa-apa.',
          feedback: 'Menghapus bukti membuat kejadian lebih sulit ditindaklanjuti dan bisa membuatmu tetap tidak aman.',
          points: 10,
          meter: { empathy: 0, safety: -16, risk: 18 },
        },
      ],
    },
  ],
  resultSummary: [
    'Kamu belajar memberi batas tanpa membalas dengan agresi.',
    'Kamu menjaga bukti agar bantuan sekolah bisa lebih cepat.',
    'Kamu memilih dukungan tepercaya dan jalur laporan aman.',
  ],
}

export const questScenarios = [
  {
    id: 'quest-1',
    title: 'Chat Grup Kelas Memanas',
    badge: 'Skenario 01',
    summary: 'Seseorang mulai mengejek teman sekelas di grup dan siswa lain ikut menertawakan.',
    prompt: 'Jika kejadian ini terjadi di sekitarmu, tindakan paling aman dan empatik apa yang sebaiknya kamu lakukan terlebih dahulu?',
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
    badge: 'Skenario 02',
    summary: 'Korban bilang takut dibalas kalau sampai guru tahu siapa yang melapor.',
    prompt: 'Jika temanmu mengalami situasi ini, respons seperti apa yang paling membantu dan aman untuk dilakukan?',
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
]

export const shieldFlaggedWords = ['bodoh', 'tolol', 'jelek', 'goblok', 'idiot', 'bego', 'cupu', 'norak']

export const bottomTabs = [
  { key: 'home', label: 'Home', icon: Shield },
  { key: 'shield', label: 'Shield', icon: ShieldAlert },
  { key: 'kindbot', label: 'KindBot', icon: Bot },
  { key: 'report', label: 'Lapor', icon: FileWarning },
  { key: 'quest', label: 'Quest', icon: Trophy },
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
