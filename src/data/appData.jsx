import {
  Activity,
  Bell,
  Bot,
  Camera,
  Calendar,
  FileWarning,
  Gamepad2,
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
    text: 'NLP nudging untuk mendeteksi kalimat berisiko sebelum terkirim.',
    status: 'Realtime Active',
    color: 'teal',
  },
  {
    key: 'kindbot',
    title: 'KindBot',
    text: 'Chatbot suportif untuk validasi emosi dan langkah bantuan awal.',
    status: 'AI Listener',
    color: 'violet',
  },
  {
    key: 'report',
    title: 'Laman Lapor',
    text: 'Pelaporan aman dengan bukti, kronologi, dan status tindak lanjut.',
    status: 'Protected',
    color: 'rose',
  },
  {
    key: 'quest',
    title: 'Kind-Quest',
    text: 'Misi interaktif dan simulasi sosial untuk melatih empati siswa.',
    status: 'Gamified',
    color: 'amber',
  },
]

export const kindbotMessages = [
  { from: 'bot', text: 'Hai, aku siap mendengarkan. Apa yang ingin kamu ceritakan hari ini?' },
  { from: 'user', text: 'Aku melihat temanku diejek terus di grup kelas.' },
  { from: 'bot', text: 'Terima kasih sudah peduli. Aku bisa bantu susun langkah aman untuk mendukung temanmu atau menyiapkan laporan.' },
]

export const reports = [
  { id: 'KR-2401', type: 'Verbal Bullying', status: 'Diproses', place: 'Grup kelas online' },
  { id: 'KR-2402', type: 'Intimidasi', status: 'Terverifikasi', place: 'Koridor sekolah' },
]

export const quests = [
  { title: 'Bela Temanmu', xp: '+120 pts', progress: 80 },
  { title: 'Empathy Challenge', xp: '+90 pts', progress: 55 },
  { title: 'Speak Up Safely', xp: '+140 pts', progress: 35 },
]

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