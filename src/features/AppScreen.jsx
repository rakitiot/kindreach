import { useMemo, useState } from 'react'
import {
  Bell,
  Bot,
  CheckCircle2,
  ChevronRight,
  FileWarning,
  HeartHandshake,
  LogOut,
  MapPin,
  ShieldAlert,
  Siren,
  Sparkles,
  Trophy,
} from 'lucide-react'
import {
  bottomTabs,
  featureCards,
  kindbotPlaybook,
  missionCards,
  priorityOptions,
  questScenarios,
  reportPresets,
  responderTeam,
  shieldFlaggedWords,
} from '../data/appData.jsx'
import KindReachLogo from '../components/KindReachLogo'

const shieldExampleDrafts = [
  'Kamu bodoh banget, kerja kelompok jadi kacau.',
  'Mending kamu diam saja, ide kamu jelek dan bikin malu.',
  'Dasar cupu, jangan ikut rapat lagi karena kamu bikin semua orang kesal.',
]

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
      <path d="M96 250c10-38 42-66 64-66s54 28 64 66" fill="url(#shirt)"/>
      <text x="160" y="298" text-anchor="middle" font-size="34" font-family="Inter, Arial, sans-serif" font-weight="700" fill="rgba(255,255,255,0.92)">${initial}</text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

function makeSaferMessage(input) {
  const normalized = input.trim().toLowerCase()

  if (normalized === 'kamu bodoh banget, kerja kelompok jadi kacau.') {
    return 'Aku kecewa karena kerja kelompok jadi tidak teratur. Yuk kita rapikan pembagian tugasnya bersama.'
  }

  if (normalized === 'mending kamu diam saja, ide kamu jelek dan bikin malu.') {
    return 'Menurutku idenya masih perlu diperjelas. Yuk kita cari versi yang lebih kuat bersama.'
  }

  if (normalized === 'dasar cupu, jangan ikut rapat lagi karena kamu bikin semua orang kesal.') {
    return 'Rapat tadi terasa kurang nyaman. Akan lebih baik kalau kita atur giliran bicara dan peran masing-masing dengan lebih jelas.'
  }

  return input
    .replace(/bodoh|tolol|goblok|idiot|bego|cupu|jelek|norak/gi, 'kurang tepat')
    .replace(/banget/gi, '')
    .trim() || 'Aku kesal, tapi aku ingin menyampaikan ini dengan lebih sopan.'
}

function statusStepClass(status, index) {
  const order = ['Menunggu verifikasi', 'Terverifikasi', 'Diproses', 'Selesai']
  const currentIndex = order.indexOf(status)
  return index <= currentIndex ? 'active' : ''
}

function HomeTab({ user, reports, onNavigate }) {
  const heroAvatar = user.avatar || createAnimeAvatarSvg(user.name)
  const criticalCount = reports.filter((item) => item.priority === 'Tinggi').length

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
              <p>{user.focus}</p>
            </div>
          </div>
        </div>

        <div className="home-insight-grid">
          <div className="point-badge">
            <Sparkles size={15} /> {user.points} pts
          </div>
          <div className="point-badge ghost">
            <Bell size={15} /> {criticalCount} prioritas tinggi
          </div>
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
          <button className="mini-action" onClick={() => onNavigate('profile')}>
            <Trophy size={16} /> Quest
          </button>
        </div>
      </section>
    </>
  )
}

function ShieldTab({ shieldEnabled, setShieldEnabled, shieldInput, setShieldInput, detectedWords }) {
  const hasWarning = shieldEnabled && detectedWords.length > 0
  const saferMessage = makeSaferMessage(shieldInput)

  return (
    <section className="panel grow shield-panel">
      <div className="panel-head solid-bottom">
        <div>
          <span className="small-caps mint">Preventive Nudging</span>
          <h3>Cyber-Shield Keyboard</h3>
        </div>

        <label className="shield-toggle">
          <input type="checkbox" checked={shieldEnabled} onChange={(e) => setShieldEnabled(e.target.checked)} />
          <span>{shieldEnabled ? 'ON' : 'OFF'}</span>
        </label>
      </div>

      <p className="shield-guidance">
        Ketikkan pesan untuk agent cek Cyber-Shield sebelum dikirim. Kamu juga bisa memakai contoh di bawah untuk melihat bagaimana sistem menyarankan kalimat yang lebih aman.
      </p>

      <div className="shield-chat-shell">
        <div className="shield-message incoming">Resty, tolong kumpulkan tugasmu sebelum jam 2 ya.</div>
        <div className="shield-message outgoing muted">Draf balasan kamu akan dicek Cyber-Shield sebelum dikirim.</div>
      </div>

      <div className="shield-example-grid">
        {shieldExampleDrafts.map((example) => (
          <button key={example} className="shield-example-btn" onClick={() => setShieldInput(example)}>
            {example}
          </button>
        ))}
      </div>

      <div className="shield-typing-box">
        <label htmlFor="shield-demo">Draf pesan</label>
        <textarea
          id="shield-demo"
          value={shieldInput}
          onChange={(e) => setShieldInput(e.target.value)}
          placeholder="Contoh: kamu bodoh banget, kerja kelompok jadi kacau"
        />
      </div>

      {hasWarning ? (
        <div className="shield-warning-card">
          <strong>Peringatan Cyber-Shield</strong>
          <p>Sistem mendeteksi kata berisiko: <b>{detectedWords.join(', ')}</b>. Tahan kirim dulu dan gunakan jeda refleksi.</p>
          <div className="shield-rewrite-box">
            <span className="small-caps amber">Saran kalimat lebih aman</span>
            <p>{saferMessage}</p>
          </div>
          <div className="shield-warning-actions">
            <button className="mini-action" onClick={() => setShieldInput('')}>Hapus draf</button>
            <button className="mini-action" onClick={() => setShieldInput(saferMessage)}>Gunakan saran</button>
          </div>
        </div>
      ) : (
        <div className="shield-safe-card">
          <strong>{shieldEnabled ? 'Draf aman untuk dikirim' : 'Cyber-Shield sedang nonaktif'}</strong>
          <p>{shieldEnabled ? 'Belum ada kata berisiko terdeteksi pada draf pesanmu.' : 'Aktifkan Cyber-Shield untuk melihat simulasi proteksi keyboard.'}</p>
        </div>
      )}

    </section>
  )
}

function KindbotTab({ onNavigate }) {
  const [messages, setMessages] = useState(kindbotPlaybook.opening)

  function runFlow(flowKey) {
    setMessages([...kindbotPlaybook.opening, ...kindbotPlaybook.flows[flowKey]])
  }

  return (
    <section className="panel grow">
      <div className="panel-head solid-bottom">
        <div>
          <span className="small-caps mint">AI Companion</span>
          <h3>KindBot Chat</h3>
        </div>
      </div>

      <div className="chat-list chat-list-grow">
        {messages.map((msg, idx) => (
          <div key={`${msg.from}-${idx}`} className={`chat-bubble ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="kindbot-chip-row">
        <button className="mini-action" onClick={() => runFlow('ditemani')}>Temani aku dulu</button>
        <button className="mini-action" onClick={() => runFlow('laporan')}>Bantu susun laporan</button>
        <button className="mini-action" onClick={() => runFlow('dukungTeman')}>Aku ingin bantu teman</button>
      </div>

      <div className="chat-actions">
        <button className="chat-cta primary" onClick={() => onNavigate('report')}>Buka Laman Lapor</button>
        <button className="chat-cta">Hubungi guru BK</button>
      </div>
    </section>
  )
}

function ReportTab({ reports, onCreateReport, isSubmittingReport }) {
  const [form, setForm] = useState({
    reporterRole: 'Saksi',
    incidentType: 'Verbal Bullying',
    incidentPlace: 'Grup kelas online',
    chronology: 'Saya melihat teman saya diejek terus menerus oleh beberapa akun lain di grup kelas.',
    evidenceName: '',
    anonymousMode: true,
    priority: 'Tinggi',
  })
  const [submitFeedback, setSubmitFeedback] = useState('')
  const [submitError, setSubmitError] = useState('')

  const timelineSteps = ['Menunggu verifikasi', 'Terverifikasi', 'Diproses', 'Selesai']

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleEvidenceChange(event) {
    const file = event.target.files?.[0]
    if (!file) return
    updateField('evidenceName', file.name)
  }

  async function handleSubmitReport() {
    if (!form.chronology.trim()) {
      setSubmitError('Kronologi perlu diisi agar admin sekolah bisa memahami kasusnya.')
      return
    }

    setSubmitError('')
    setSubmitFeedback('')

    const result = await onCreateReport({
      type: form.incidentType,
      place: form.incidentPlace,
      priority: form.priority,
      reporterRole: form.reporterRole,
      reporterLabel: form.anonymousMode ? 'Anonim' : 'Pelapor dikenali sekolah',
      chronology: form.chronology,
      evidenceName: form.evidenceName,
      anonymousMode: form.anonymousMode,
    })

    setSubmitFeedback(result.message)

    setForm((prev) => ({
      ...prev,
      chronology: '',
      evidenceName: '',
      anonymousMode: true,
      priority: 'Tinggi',
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
        <strong>Anonim, aman, dan langsung ke tim sekolah</strong>
        <p>Untuk prototype, fokus utama yang ditonjolkan adalah rasa aman pelapor, bukti, kronologi, dan alur verifikasi sekolah.</p>
      </div>

      <div className="report-form">
        <label>
          Saya melapor sebagai
          <select value={form.reporterRole} onChange={(e) => updateField('reporterRole', e.target.value)}>
            <option>Saksi</option>
            <option>Korban</option>
            <option>Teman dekat korban</option>
          </select>
        </label>

        <label>
          Jenis kejadian
          <select value={form.incidentType} onChange={(e) => updateField('incidentType', e.target.value)}>
            {reportPresets.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>

        <label>
          Lokasi / kanal kejadian
          <input value={form.incidentPlace} onChange={(e) => updateField('incidentPlace', e.target.value)} />
        </label>

        <label>
          Tingkat urgensi
          <select value={form.priority} onChange={(e) => updateField('priority', e.target.value)}>
            {priorityOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>

        <label>
          Kronologi
          <textarea value={form.chronology} onChange={(e) => updateField('chronology', e.target.value)} />
        </label>

        <label className="report-upload-box">
          Bukti pendukung
          <input type="file" onChange={handleEvidenceChange} />
          <span className="report-upload-note">{form.evidenceName || 'Belum ada file dipilih'}</span>
        </label>

        <label className="report-anon-toggle">
          <input type="checkbox" checked={form.anonymousMode} onChange={(e) => updateField('anonymousMode', e.target.checked)} />
          <span>Sembunyikan identitas saya dari siswa lain</span>
        </label>

        {submitError && <div className="report-inline-feedback error">{submitError}</div>}
        {submitFeedback && <div className="report-inline-feedback success">{submitFeedback}</div>}

        <button className="submit-demo" onClick={handleSubmitReport} disabled={isSubmittingReport}>
          {isSubmittingReport ? 'Mengirim laporan...' : 'Kirim laporan aman'}
        </button>
      </div>

      <div className="report-timeline-wrap">
        <span className="small-caps">Alur tindak lanjut</span>
        <div className="report-timeline-row">
          {timelineSteps.map((step) => (
            <div key={step} className="report-step-pill">{step}</div>
          ))}
        </div>
      </div>

      <div className="report-status-list">
        {reports.length > 0 ? (
          reports.slice(0, 3).map((item) => (
            <article key={item.id} className="report-card report-card-stack">
              <div>
                <div className="admin-case-title-row">
                  <strong>{item.id}</strong>
                  <span className="chip">{item.priority}</span>
                </div>
                <p>{item.type} • {item.place}</p>
                <small>{item.reporterLabel} • {item.createdAt}</small>
              </div>
              <div className="report-step-status-row">
                {timelineSteps.map((step, index) => (
                  <span key={step} className={`report-mini-step ${statusStepClass(item.status, index)}`}>{step}</span>
                ))}
              </div>
            </article>
          ))
        ) : (
          <div className="empty-state-card">
            <strong>Belum ada laporan masuk</strong>
            <p>Laporan baru dari user akan langsung muncul di sini begitu tersimpan.</p>
          </div>
        )}
      </div>
    </section>
  )
}

function ProfileTab({ user, onResolveQuest }) {
  const [activeScenario, setActiveScenario] = useState(questScenarios[0])
  const [feedback, setFeedback] = useState('')
  const [completedIds, setCompletedIds] = useState([])

  function selectOption(option) {
    setFeedback(`${option.outcome} (+${option.points} pts)`)
    if (!completedIds.includes(activeScenario.id)) {
      onResolveQuest(option.points)
      setCompletedIds((prev) => [...prev, activeScenario.id])
    }
  }

  return (
    <section className="panel grow profile-panel">
      <div className="avatar-circle large-avatar">
        <img src={createAnimeAvatarSvg(user.name)} alt={user.name} className="profile-avatar-img" />
      </div>
      <h3>{user.name}</h3>
      <span className="chip">{user.roleLabel}</span>

      <div className="level-card">
        <strong>{user.level}</strong>
        <p>{user.school} • {user.department}</p>
        <div className="profile-stats-grid">
          <div>
            <span>Poin</span>
            <strong>{user.points}</strong>
          </div>
          <div>
            <span>Streak</span>
            <strong>{user.streak} hari</strong>
          </div>
        </div>
      </div>

      <div className="quest-list compact-quest-list">
        {missionCards.map((quest) => (
          <article key={quest.title} className="quest-card">
            <div className="quest-top">
              <strong>{quest.title}</strong>
              <span>{quest.xp}</span>
            </div>
            <div className="progress-bar"><div style={{ width: `${quest.progress}%` }} /></div>
          </article>
        ))}
      </div>

      <div className="quest-simulator-card">
        <div className="panel-head solid-bottom">
          <div>
            <span className="small-caps amber">Kind-Quest simulator</span>
            <h3>{activeScenario.title}</h3>
          </div>
          <span className="chip">{activeScenario.badge}</span>
        </div>

        <p className="quest-summary">{activeScenario.summary}</p>
        <p className="quest-prompt">{activeScenario.prompt}</p>

        <div className="quest-tab-row">
          {questScenarios.map((scenario) => (
            <button key={scenario.id} className={`mini-action ${scenario.id === activeScenario.id ? 'active-chip' : ''}`} onClick={() => { setActiveScenario(scenario); setFeedback('') }}>
              {scenario.badge}
            </button>
          ))}
        </div>

        <div className="quest-option-list">
          {activeScenario.options.map((option) => (
            <button key={option.id} className="quest-option-card" onClick={() => selectOption(option)}>
              <HeartHandshake size={16} />
              <span>{option.label}</span>
            </button>
          ))}
        </div>

        {feedback && (
          <div className="quest-feedback-card">
            <CheckCircle2 size={16} />
            <span>{feedback}</span>
          </div>
        )}
      </div>
    </section>
  )
}

function SosScreen({ onClose }) {
  const [dispatchStarted, setDispatchStarted] = useState(false)

  if (!dispatchStarted) {
    return (
      <div className="phone-page sos-fullscreen sos-intro-screen">
        <button className="sos-close-btn" onClick={onClose}>Kembali</button>

        <section className="sos-intro-top solo-copy">
          <div className="sos-intro-copy">
            <h2>Butuh bantuan sekarang?</h2>
            <p>Mode SOS menonjolkan alur yang diminta PDF: sinyal darurat, lokasi, dan kontak respon cepat sekolah dalam satu layar.</p>
          </div>
        </section>

        <section className="sos-intro-card">
          <button type="button" className="sos-intro-button" onClick={() => setDispatchStarted(true)}>
            <span className="sos-intro-button-main">SOS</span>
            <span className="sos-intro-button-sub">Aktifkan respon cepat sekolah</span>
          </button>
        </section>
      </div>
    )
  }

  return (
    <div className="phone-page sos-fullscreen sos-calling-screen">
      <button className="sos-close-btn" onClick={onClose}>Kembali</button>

      <div className="sos-header">
        <h2>Respon cepat sedang berjalan</h2>
        <p>Sinyal bantuan prioritas sudah dikirim bersama titik lokasi darurat dan penerima terdekat.</p>
      </div>

      <div className="sos-location-pill">
        <MapPin size={15} /> Koridor lantai 2 • Gedung Timur
      </div>

      <div className="sos-radar-area compact-radar">
        <div className="radar-ring ring-1 active" />
        <div className="radar-ring ring-2 active" />
        <div className="radar-ring ring-3 active" />
        <div className="sos-center-pulse active"><span>SOS</span></div>
      </div>

      <div className="sos-responder-list">
        {responderTeam.map((person) => (
          <article key={person.name} className="sos-responder-card">
            <div>
              <strong>{person.name}</strong>
              <p>{person.role}</p>
            </div>
            <div className="sos-responder-meta">
              <span>{person.status}</span>
              <strong>{person.eta}</strong>
            </div>
          </article>
        ))}
      </div>

      <div className="sos-status-card show">
        <strong>Bantuan berhasil dipanggil</strong>
        <p>Prototype ini menonjolkan elemen lokasi, tim sekolah, dan status respon agar fungsi SOS lebih terasa sesuai deskripsi PDF.</p>
      </div>
    </div>
  )
}

export default function AppScreen({
  institution,
  user,
  activeTab,
  onTabChange,
  onCreateReport,
  onResolveQuest,
  reports,
  isReportMutationPending,
  onLogout,
}) {
  const [showSosScreen, setShowSosScreen] = useState(false)
  const [shieldEnabled, setShieldEnabled] = useState(true)
  const [shieldInput, setShieldInput] = useState('')

  const detectedWords = useMemo(() => {
    const lower = shieldInput.toLowerCase()
    return shieldFlaggedWords.filter((word) => lower.includes(word))
  }, [shieldInput])

  if (showSosScreen) {
    return <SosScreen onClose={() => setShowSosScreen(false)} />
  }

  return (
    <div className="phone-page app-page">
      <header className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <KindReachLogo size={32} rounded={10} />
          <div>
            <span className="small-caps">{institution.schoolCode} • {user.role}</span>
            <h2>{activeTab === 'home' ? 'KindReach' : bottomTabs.find((tab) => tab.key === activeTab)?.label}</h2>
          </div>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          <LogOut size={16} />
        </button>
      </header>

      <main className="app-content">
        {activeTab === 'home' && <HomeTab user={user} reports={reports} onNavigate={onTabChange} />}
        {activeTab === 'shield' && <ShieldTab shieldEnabled={shieldEnabled} setShieldEnabled={setShieldEnabled} shieldInput={shieldInput} setShieldInput={setShieldInput} detectedWords={detectedWords} />}
        {activeTab === 'kindbot' && <KindbotTab onNavigate={onTabChange} />}
        {activeTab === 'report' && <ReportTab reports={reports} onCreateReport={onCreateReport} isSubmittingReport={isReportMutationPending} />}
        {activeTab === 'profile' && <ProfileTab user={user} onResolveQuest={onResolveQuest} />}
      </main>

      <button className="sos-floating-bubble" onClick={() => setShowSosScreen(true)}>
        <Siren size={18} />
        <span>SOS</span>
      </button>

      <nav className="bottom-tabbar">
        {bottomTabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button key={tab.key} className={activeTab === tab.key ? 'active' : ''} onClick={() => onTabChange(tab.key)}>
              <Icon size={17} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
