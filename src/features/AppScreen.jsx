import { useMemo, useState } from 'react'
import {
  Bell,
  Bot,
  ChevronRight,
  FileWarning,
  LogOut,
  ShieldAlert,
  Siren,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { bottomTabs, featureCards, kindbotMessages, quests, reports } from '../data/appData.jsx'
import KindReachLogo from '../components/KindReachLogo'

function createAnimeAvatarSvg(name = 'Resty') {
  const initial = (name?.trim?.()?.charAt(0) || 'R').toUpperCase()

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#2de2cf"/>
          <stop offset="45%" stop-color="#617dff"/>
          <stop offset="100%" stop-color="#9f5fff"/>
        </linearGradient>
        <linearGradient id="hair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#2e2a7b"/>
          <stop offset="100%" stop-color="#5f3bd8"/>
        </linearGradient>
        <linearGradient id="shirt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1fdfc8"/>
          <stop offset="100%" stop-color="#4f7cff"/>
        </linearGradient>
      </defs>

      <rect width="320" height="320" rx="68" fill="url(#bg)"/>
      <circle cx="160" cy="160" r="136" fill="rgba(255,255,255,0.08)"/>

      <path d="M86 120c0-45 33-76 74-76h14c46 0 76 31 76 74 0 28-12 44-20 54-8-26-28-42-70-42-39 0-58 15-72 36-4-10-2-27-2-46z" fill="url(#hair)"/>
      <circle cx="160" cy="138" r="58" fill="#ffd9c7"/>
      <path d="M104 120c8-30 32-48 56-48 34 0 56 21 63 50-16-18-36-26-63-26-23 0-40 6-56 24z" fill="url(#hair)"/>

      <ellipse cx="139" cy="138" rx="7" ry="9" fill="#37446a"/>
      <ellipse cx="181" cy="138" rx="7" ry="9" fill="#37446a"/>
      <path d="M144 166c10 8 22 8 32 0" stroke="#cf7d8c" stroke-width="6" stroke-linecap="round" fill="none"/>
      <circle cx="120" cy="156" r="8" fill="#ffb0c0" fill-opacity="0.45"/>
      <circle cx="200" cy="156" r="8" fill="#ffb0c0" fill-opacity="0.45"/>

      <path d="M96 250c10-38 42-66 64-66s54 28 64 66" fill="url(#shirt)"/>
      <rect x="112" y="238" width="96" height="20" rx="10" fill="rgba(255,255,255,0.18)"/>

      <circle cx="245" cy="72" r="18" fill="rgba(255,255,255,0.18)"/>
      <circle cx="83" cy="248" r="14" fill="rgba(255,255,255,0.18)"/>
      <circle cx="265" cy="230" r="10" fill="rgba(255,255,255,0.12)"/>

      <text x="160" y="298" text-anchor="middle" font-size="34" font-family="Inter, Arial, sans-serif" font-weight="700" fill="rgba(255,255,255,0.92)">
        ${initial}
      </text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

function HomeTab({ user, onNavigate, onOpenSos }) {
  const heroAvatar = user.avatar || createAnimeAvatarSvg(user.name)

  return (
    <>
      <section className="app-hero-card">
        <div className="hero-copy">
          <span className="small-caps mint">Psychological Safety</span>

          <div className="hero-title-row">
            <div className="hero-avatar-wrap floating-avatar">
              <img src={heroAvatar} alt={user.name} className="hero-avatar-image" />
            </div>

            <div>
              <h2>Halo, {user.name.split(' ')[0]} 👋</h2>
              <p>Semua perlindungan, dukungan, dan edukasi anti-bullying ada dalam satu aplikasi.</p>
            </div>
          </div>
        </div>

        <div className="point-badge">
          <Sparkles size={15} /> {user.points} pts
        </div>
      </section>

      <section className="feature-card-grid">
        {featureCards.map((item) => (
          <article key={item.key} className={`feature-demo-card ${item.color}`}>
            <span>{item.status}</span>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="sos-card">
        <div>
          <span className="small-caps rose">Emergency</span>
          <strong>Aktifkan mode darurat dan panggil bantuan sekitar</strong>
        </div>
        <button onClick={onOpenSos}>
          <Siren size={16} /> SOS
        </button>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h3>Quick access</h3>
          <button onClick={() => onNavigate('report')}>
            Buka <ChevronRight size={15} />
          </button>
        </div>
        <div className="quick-access-row">
          <button className="mini-action" onClick={() => onNavigate('shield')}>
            <ShieldAlert size={16} /> Shield
          </button>
          <button className="mini-action" onClick={() => onNavigate('kindbot')}>
            <Bot size={16} /> KindBot
          </button>
          <button className="mini-action" onClick={() => onNavigate('report')}>
            <FileWarning size={16} /> Lapor
          </button>
          <button className="mini-action">
            <Bell size={16} /> Alert
          </button>
        </div>
      </section>
    </>
  )
}

function ShieldTab({
  shieldEnabled,
  setShieldEnabled,
  shieldInput,
  setShieldInput,
  hasWarning,
  detectedWords,
}) {
  return (
    <section className="panel grow">
      <div className="panel-head solid-bottom">
        <div>
          <span className="small-caps mint">Preventive Nudging</span>
          <h3>Cyber-Shield Keyboard</h3>
        </div>

        <label className="shield-toggle">
          <input
            type="checkbox"
            checked={shieldEnabled}
            onChange={(e) => setShieldEnabled(e.target.checked)}
          />
          <span>{shieldEnabled ? 'ON' : 'OFF'}</span>
        </label>
      </div>

      <div className="shield-info-card">
        <strong>Status Proteksi</strong>
        <p>
          Saat aktif, Cyber-Shield membantu mendeteksi kata atau kalimat yang berpotensi menyakiti orang lain sebelum dikirim.
        </p>
      </div>

      <div className="shield-typing-box">
        <label htmlFor="shield-demo">Coba ketik pesan</label>
        <textarea
          id="shield-demo"
          value={shieldInput}
          onChange={(e) => setShieldInput(e.target.value)}
          placeholder="Contoh: kamu bodoh banget..."
        />
      </div>

      {hasWarning ? (
        <div className="shield-warning-card">
          <strong>Peringatan Cyber-Shield</strong>
          <p>
            Sistem mendeteksi kata yang berisiko: <b>{detectedWords.join(', ')}</b>
          </p>
          <div className="shield-warning-actions">
            <button className="mini-action">Tinjau ulang pesan</button>
            <button className="mini-action">Ubah kalimat jadi lebih baik</button>
          </div>
        </div>
      ) : (
        <div className="shield-safe-card">
          <strong>{shieldEnabled ? 'Tidak ada kata berisiko terdeteksi' : 'Cyber-Shield sedang nonaktif'}</strong>
          <p>
            {shieldEnabled
              ? 'Pesan terlihat aman untuk dikirim.'
              : 'Aktifkan Cyber-Shield untuk mencoba simulasi proteksi keyboard.'}
          </p>
        </div>
      )}

      <div className="shield-system-note">
        <strong>Catatan Implementasi Nyata</strong>
        <p>
          Versi sistem keyboard sungguhan memerlukan pengembangan aplikasi native Android sebagai custom keyboard (IME). Versi web ini menyediakan simulasi perilaku dan alur pengalaman pengguna.
        </p>
      </div>
    </section>
  )
}

function KindbotTab() {
  return (
    <section className="panel grow">
      <div className="panel-head solid-bottom">
        <div>
          <span className="small-caps mint">AI Companion</span>
          <h3>KindBot Chat</h3>
        </div>
      </div>
      <div className="chat-list">
        {kindbotMessages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-actions">
        <button className="chat-cta primary">Butuh bantuan sekarang</button>
        <button className="chat-cta">Susun laporan aman</button>
      </div>
    </section>
  )
}

function ReportTab() {
  const [reportItems, setReportItems] = useState(reports)
  const [form, setForm] = useState({
    reporterRole: 'Saksi',
    incidentType: 'Verbal Bullying',
    incidentChannel: 'Grup kelas online',
    chronology:
      'Saya melihat teman saya diejek terus menerus oleh beberapa akun lain di grup kelas.',
    evidenceName: '',
    anonymousMode: true,
  })

  const timelineSteps = ['Terkirim', 'Diverifikasi', 'Diproses', 'Selesai']

  function updateField(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function handleEvidenceChange(event) {
    const file = event.target.files?.[0]
    if (!file) return
    updateField('evidenceName', file.name)
  }

  function handleSubmitReport() {
    const newReport = {
      id: `KR-${2400 + reportItems.length + 1}`,
      type: form.incidentType,
      place: form.incidentChannel,
      status: 'Terkirim',
      role: form.reporterRole,
    }

    setReportItems((prev) => [newReport, ...prev])

    setForm((prev) => ({
      ...prev,
      chronology: '',
      evidenceName: '',
    }))
  }

  return (
    <section className="panel grow">
      <div className="panel-head solid-bottom">
        <div>
          <span className="small-caps rose">Anonymous Reporting</span>
          <h3>Laman Lapor</h3>
        </div>
        <span className="chip">Protected</span>
      </div>

      <div className="report-security-card">
        <strong>Anonim dan terenkripsi</strong>
        <p>
          Laporan hanya diteruskan ke tim penanganan sekolah. Identitas pelapor tidak
          dibuka kepada siswa lain.
        </p>
      </div>

      <div className="report-form">
        <label>
          Saya melapor sebagai
          <select
            value={form.reporterRole}
            onChange={(e) => updateField('reporterRole', e.target.value)}
          >
            <option value="Saksi">Saksi</option>
            <option value="Korban">Korban</option>
            <option value="Teman Korban">Teman Korban</option>
          </select>
        </label>

        <label>
          Jenis kejadian
          <select
            value={form.incidentType}
            onChange={(e) => updateField('incidentType', e.target.value)}
          >
            <option value="Verbal Bullying">Verbal Bullying</option>
            <option value="Cyberbullying">Cyberbullying</option>
            <option value="Intimidasi">Intimidasi</option>
            <option value="Pengucilan Sosial">Pengucilan Sosial</option>
            <option value="Kekerasan Fisik">Kekerasan Fisik</option>
          </select>
        </label>

        <label>
          Lokasi / media kejadian
          <input
            value={form.incidentChannel}
            onChange={(e) => updateField('incidentChannel', e.target.value)}
            placeholder="Contoh: Koridor sekolah / Grup kelas online"
          />
        </label>

        <label>
          Kronologi singkat
          <textarea
            value={form.chronology}
            onChange={(e) => updateField('chronology', e.target.value)}
            placeholder="Jelaskan kejadian secara singkat dan jelas..."
          />
        </label>

        <label className="report-upload-box">
          Bukti pendukung
          <input type="file" onChange={handleEvidenceChange} />
          <span className="report-upload-note">
            {form.evidenceName ? `File terpilih: ${form.evidenceName}` : 'Unggah screenshot / foto / dokumen pendukung'}
          </span>
        </label>

        <label className="report-anon-toggle">
          <input
            type="checkbox"
            checked={form.anonymousMode}
            onChange={(e) => updateField('anonymousMode', e.target.checked)}
          />
        </label>

        <button className="submit-demo" type="button" onClick={handleSubmitReport}>
          Kirim laporan
        </button>
      </div>

      <div className="report-timeline-wrap">
        <div className="panel-head">
          <h3>Status tindak lanjut</h3>
          <span className="chip">Tracking</span>
        </div>

        <div className="report-timeline-row">
          {timelineSteps.map((step) => (
            <div key={step} className="report-step-pill">
              {step}
            </div>
          ))}
        </div>
      </div>

      <div className="report-status-list">
        {reportItems.map((report) => (
          <article key={report.id} className="report-card report-card-detailed">
            <div>
              <strong>{report.id}</strong>
              <p>
                {report.type} • {report.place}
              </p>
              {report.role && <small>Pelapor: {report.role}</small>}
            </div>
            <span>{report.status}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProfileTab({ user }) {
  const avatarSrc = user.avatar || createAnimeAvatarSvg(user.name)

  return (
    <section className="panel grow profile-panel">
      <div className="profile-avatar-stage">
        <div className="avatar-orbit orbit-a" />
        <div className="avatar-orbit orbit-b" />

        <div className="profile-hero-ring">
          <img src={avatarSrc} alt={user.name} className="profile-hero-image" />
        </div>

        <span className="avatar-badge-float badge-one">✨</span>
        <span className="avatar-badge-float badge-two">💜</span>
      </div>

      <h3>{user.name}</h3>
      <p>{user.school}</p>

      <div className="profile-stats">
        <div>
          <strong>{user.points}</strong>
          <span>Points</span>
        </div>
        <div>
          <strong>{user.streak}</strong>
          <span>Streak</span>
        </div>
        <div>
          <strong>Lv. 7</strong>
          <span>Level</span>
        </div>
      </div>

      <article className="level-card">
        <span className="small-caps mint">Current badge</span>
        <strong>{user.level}</strong>
        <p>Kamu aktif membantu menciptakan lingkungan sekolah yang suportif dan aman.</p>
      </article>

      <section className="quest-list" style={{ width: '100%' }}>
        {quests.map((quest) => (
          <article key={quest.title} className="quest-card">
            <div className="quest-top">
              <div>
                <strong>{quest.title}</strong>
                <p>{quest.xp}</p>
              </div>
              <Trophy size={18} />
            </div>

            <div className="progress-bar">
              <div style={{ width: `${quest.progress}%` }} />
            </div>
          </article>
        ))}
      </section>
    </section>
  )
}

function createResponderAvatarSvg(name = 'R') {
  const initial = (name?.trim?.()?.charAt(0) || 'R').toUpperCase()

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#6f5bff"/>
          <stop offset="100%" stop-color="#9b59ff"/>
        </linearGradient>
        <linearGradient id="hair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#23285e"/>
          <stop offset="100%" stop-color="#4f39a9"/>
        </linearGradient>
      </defs>

      <rect width="220" height="220" rx="56" fill="url(#bg)"/>
      <circle cx="110" cy="112" r="82" fill="rgba(255,255,255,0.08)"/>

      <path d="M62 86c0-29 21-50 50-50h5c31 0 52 21 52 50 0 16-6 28-15 37-6-19-20-30-46-30-24 0-38 9-48 25-4-7-3-18-3-32z" fill="url(#hair)"/>
      <circle cx="110" cy="98" r="39" fill="#ffd9c7"/>
      <path d="M75 85c7-20 22-31 36-31 24 0 40 14 45 33-12-11-26-16-45-16-14 0-25 4-36 14z" fill="url(#hair)"/>

      <ellipse cx="95" cy="99" rx="5" ry="6.5" fill="#38466d"/>
      <ellipse cx="125" cy="99" rx="5" ry="6.5" fill="#38466d"/>
      <path d="M99 118c6 5 16 5 22 0" stroke="#d67b8d" stroke-width="4.5" stroke-linecap="round" fill="none"/>

      <path d="M70 172c11-28 31-45 40-45s29 17 40 45" fill="rgba(255,255,255,0.18)"/>

      <text x="110" y="203" text-anchor="middle" font-size="24" font-family="Inter, Arial, sans-serif" font-weight="700" fill="rgba(255,255,255,0.92)">
        ${initial}
      </text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

function createEmergencyHeroSvg() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="520" height="320" viewBox="0 0 520 320">
      <defs>
        <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#d07b5b"/>
          <stop offset="100%" stop-color="#a95bff"/>
        </linearGradient>
        <linearGradient id="shirt1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#8f81ff"/>
          <stop offset="100%" stop-color="#6653ff"/>
        </linearGradient>
        <linearGradient id="shirt2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1e275f"/>
          <stop offset="100%" stop-color="#3348a1"/>
        </linearGradient>
      </defs>

      <rect width="520" height="320" rx="42" fill="rgba(255,255,255,0.04)"/>
      <rect x="278" y="26" width="190" height="236" rx="34" fill="url(#bg1)" opacity="0.9"/>

      <circle cx="347" cy="92" r="34" fill="#f7c0b7"/>
      <path d="M314 90c2-34 24-54 54-54 29 0 48 18 50 46-18-13-36-18-57-18-14 0-29 7-47 26z" fill="#9a5cff"/>
      <path d="M300 244c8-50 38-84 66-84s58 35 66 84" fill="url(#shirt1)"/>
      <path d="M286 178c16 12 25 21 35 38" stroke="#f7c0b7" stroke-width="12" stroke-linecap="round"/>
      <path d="M414 182c-12 10-20 20-29 35" stroke="#f7c0b7" stroke-width="12" stroke-linecap="round"/>

      <circle cx="404" cy="74" r="34" fill="#1d285e"/>
      <path d="M372 80c0-28 19-46 46-46 27 0 45 18 45 45 0 14-4 28-13 40-10-18-24-30-41-30-14 0-24 5-37 17z" fill="#1d285e"/>
      <path d="M372 242c8-54 33-89 58-89s50 34 58 89" fill="url(#shirt2)"/>
      <path d="M386 180c-9 14-13 25-16 43" stroke="#f1b39f" stroke-width="12" stroke-linecap="round"/>
      <path d="M454 176c8 14 12 25 15 42" stroke="#f1b39f" stroke-width="12" stroke-linecap="round"/>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

function SosScreen({ onClose }) {
  const [isCalling, setIsCalling] = useState(false)

  const emergencyHero = createEmergencyHeroSvg()

  const responders = [
    {
      name: 'Dina',
      role: 'Teman terdekat',
      pos: 'top-left',
      avatar: createResponderAvatarSvg('Dina'),
    },
    {
      name: 'Pak Budi',
      role: 'Guru BK',
      pos: 'top-right',
      avatar: createResponderAvatarSvg('Pak Budi'),
    },
    {
      name: 'Rani',
      role: 'Teman kelas',
      pos: 'bottom-left',
      avatar: createResponderAvatarSvg('Rani'),
    },
    {
      name: 'Bu Sinta',
      role: 'Wali kelas',
      pos: 'bottom-right',
      avatar: createResponderAvatarSvg('Bu Sinta'),
    },
  ]

  if (!isCalling) {
    return (
      <div className="phone-page sos-fullscreen sos-intro-screen">
        <button className="sos-close-btn" onClick={onClose}>
          Kembali
        </button>

        <section className="sos-intro-top">
          <div className="sos-intro-copy">
            <h2>Apakah anda dalam keadaan darurat?</h2>
            <p>
              Tekan tombol SOS, lokasi Anda saat ini akan dibagikan ke pusat bantuan
              terdekat dan kontak darurat sekolah.
            </p>
          </div>

          <div className="sos-intro-illustration">
            <img src={emergencyHero} alt="Ilustrasi keadaan darurat" />
          </div>
        </section>

        <section className="sos-intro-card">
          <button
            type="button"
            className="sos-intro-button"
            onClick={() => setIsCalling(true)}
          >
            <span className="sos-intro-button-main">SOS</span>
            <span className="sos-intro-button-sub">Tekan untuk panggil bantuan</span>
          </button>
        </section>
      </div>
    )
  }

  return (
    <div className="phone-page sos-fullscreen sos-calling-screen">
      <button className="sos-close-btn" onClick={onClose}>
        Kembali
      </button>

      <div className="sos-header">
        <h2>Panggilan Darurat</h2>
        <p>
          Sinyal bantuan sedang dikirim ke guru dan teman sekitar yang dapat membantu
          menjangkau lokasi Anda.
        </p>
      </div>

      <div className="sos-radar-area">
        <div className="radar-ring ring-1 active" />
        <div className="radar-ring ring-2 active" />
        <div className="radar-ring ring-3 active" />
        <div className="radar-ring ring-4 active" />

        <div className="sos-center-pulse active">
          <span>SOS</span>
        </div>

        {responders.map((person) => (
          <div
            key={person.name}
            className={`responder responder-${person.pos} show`}
          >
            <img src={person.avatar} alt={person.name} className="responder-avatar-img" />
            <span>{person.name}</span>
            <small>{person.role}</small>
          </div>
        ))}
      </div>

      <div className="sos-status-card show">
        <strong>Bantuan sedang dipanggil</strong>
        <p>Notifikasi prioritas berhasil dikirim bersama informasi lokasi darurat Anda.</p>
      </div>
    </div>
  )
}

export default function AppScreen({ user, activeTab, onTabChange, onLogout }) {
  const [showSosScreen, setShowSosScreen] = useState(false)
  const [shieldEnabled, setShieldEnabled] = useState(true)
  const [shieldInput, setShieldInput] = useState('')

  const flaggedWords = ['bodoh', 'tolol', 'jelek', 'goblok', 'idiot', 'bego', 'cupu']

  const detectedWords = useMemo(() => {
    const lower = shieldInput.toLowerCase()
    return flaggedWords.filter((word) => lower.includes(word))
  }, [shieldInput])

  const hasWarning = shieldEnabled && detectedWords.length > 0

  if (showSosScreen) {
    return <SosScreen onClose={() => setShowSosScreen(false)} />
  }

  return (
    <div className="phone-page app-page">
      <header className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <KindReachLogo size={32} rounded={10} />
          <div>
            <span className="small-caps">{user.role} • {user.schoolCode}</span>
            <h2>
              {activeTab === 'home'
                ? 'KindReach'
                : bottomTabs.find((tab) => tab.key === activeTab)?.label}
            </h2>
          </div>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          <LogOut size={16} />
        </button>
      </header>

      <main className="app-content">
        {activeTab === 'home' && (
          <HomeTab
            user={user}
            onNavigate={onTabChange}
            onOpenSos={() => setShowSosScreen(true)}
          />
        )}

        {activeTab === 'shield' && (
          <ShieldTab
            shieldEnabled={shieldEnabled}
            setShieldEnabled={setShieldEnabled}
            shieldInput={shieldInput}
            setShieldInput={setShieldInput}
            hasWarning={hasWarning}
            detectedWords={detectedWords}
          />
        )}

        {activeTab === 'kindbot' && <KindbotTab />}
        {activeTab === 'report' && <ReportTab />}
        {activeTab === 'profile' && <ProfileTab user={user} />}
      </main>

      <nav className="bottom-tabbar">
        {bottomTabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.key}
              className={activeTab === tab.key ? 'active' : ''}
              onClick={() => onTabChange(tab.key)}
            >
              <Icon size={17} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}