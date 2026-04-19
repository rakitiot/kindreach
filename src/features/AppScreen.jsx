import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  FileWarning,
  LogOut,
  MapPin,
  Mic,
  Send,
  ShieldAlert,
  Siren,
  Sparkles,
  Trophy,
} from 'lucide-react'
import {
  bottomTabs,
  featureCards,
  kindbotPlaybook,
  rolePlayQuest,
  reportPresets,
  responderTeam,
  shieldFlaggedWords,
} from '../data/appData.jsx'
import KindReachLogo from '../components/KindReachLogo'

const TAB_TRANSITION_MS = 280

const shieldExampleDrafts = [
  'Kamu bodoh banget, kerja kelompok jadi kacau.',
  'Mending kamu diam saja, ide kamu jelek dan bikin malu.',
  'Dasar cupu, jangan ikut rapat lagi karena kamu bikin semua orang kesal.',
]

const reportLocationOptions = [
  'Ruang kelas',
  'Koridor sekolah',
  'Kantin',
  'Lapangan sekolah',
  'Grup kelas online',
  'Media sosial',
]

const reportChronologyDraft = 'Saya melihat teman saya mendapat perlakuan tidak nyaman secara berulang. Kejadian terjadi saat kegiatan sekolah dan saya ingin tim sekolah membantu menindaklanjuti dengan aman.'

const pointWeekOptions = [
  {
    key: 'this-week',
    label: 'Minggu ini',
    range: '12-18 Apr',
    items: [
      { day: 'Sun', points: 80 },
      { day: 'Mon', points: 82 },
      { day: 'Tue', points: 68 },
      { day: 'Wed', points: null },
      { day: 'Thu', points: null },
      { day: 'Fri', points: null },
      { day: 'Sat', points: null },
    ],
  },
  {
    key: 'last-week',
    label: 'Minggu lalu',
    range: '5-11 Apr',
    items: [
      { day: 'Sun', points: 72 },
      { day: 'Mon', points: 94 },
      { day: 'Tue', points: 66 },
      { day: 'Wed', points: 58 },
      { day: 'Thu', points: 118, tag: 'Baik' },
      { day: 'Fri', points: 34, tag: 'Buruk' },
      { day: 'Sat', points: 106 },
    ],
  },
  {
    key: 'two-weeks-ago',
    label: '2 minggu lalu',
    range: '29 Mar-4 Apr',
    items: [
      { day: 'Sun', points: 68 },
      { day: 'Mon', points: 76 },
      { day: 'Tue', points: 84 },
      { day: 'Wed', points: 42, tag: 'Buruk' },
      { day: 'Thu', points: 96 },
      { day: 'Fri', points: 112, tag: 'Baik' },
      { day: 'Sat', points: 90 },
    ],
  },
]

const questMapNodes = [
  {
    id: 'map-1',
    title: 'Cek Empati',
    meta: '+60 pts',
    status: 'Selesai',
    state: 'done',
    detail: 'Kamu berhasil memilih respons yang menenangkan dan tidak menyudutkan teman.',
  },
  {
    id: 'map-2',
    title: 'Balasan Aman',
    meta: '+90 pts',
    status: 'Selesai',
    state: 'done',
    detail: 'Kamu sudah melatih cara mengubah pesan kasar menjadi kalimat yang lebih aman.',
  },
  {
    id: 'map-3',
    title: 'Bantu Laporan',
    meta: '+120 pts',
    status: 'Aktif',
    state: 'active',
    detail: 'Bantu teman menyusun kronologi yang jelas tanpa membuka identitas ke siswa lain.',
  },
  {
    id: 'map-4',
    title: 'Lencana Teman Digital',
    meta: '+140 pts',
    status: 'Terkunci',
    state: 'locked',
    detail: 'Lencana ini terbuka setelah kamu menyelesaikan satu tantangan aktif berikutnya.',
  },
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

const featureIconMap = {
  cyber: ShieldAlert,
  kindbot: Bot,
  report: FileWarning,
  quest: Trophy,
}

const featureTabMap = {
  cyber: 'shield',
  kindbot: 'kindbot',
  report: 'report',
  quest: 'quest',
}

function QuestTrailMap({ nodes, selectedId, onSelect, onBackgroundClick, className = '', ariaLabel = 'Peta perjalanan Kind-Quest' }) {
  return (
    <div className={`quest-map-trail ${className}`.trim()} aria-label={ariaLabel} onClick={onBackgroundClick}>
      <svg className="quest-trail-svg" viewBox="0 0 320 430" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="questRoadGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7f8c90" />
            <stop offset="48%" stopColor="#59676c" />
            <stop offset="100%" stopColor="#354146" />
          </linearGradient>
        </defs>
        <path className="quest-trail-depth" d="M214 442 C184 374 64 374 54 306 C44 236 244 278 252 200 C260 130 100 154 122 96 C136 58 168 50 178 22" />
        <path className="quest-trail-outline" d="M214 442 C184 374 64 374 54 306 C44 236 244 278 252 200 C260 130 100 154 122 96 C136 58 168 50 178 22" />
        <path className="quest-trail-base" d="M214 442 C184 374 64 374 54 306 C44 236 244 278 252 200 C260 130 100 154 122 96 C136 58 168 50 178 22" />
        <path className="quest-trail-highlight" d="M214 442 C184 374 64 374 54 306 C44 236 244 278 252 200 C260 130 100 154 122 96 C136 58 168 50 178 22" />
        <path className="quest-trail-glow" d="M214 442 C184 374 64 374 54 306 C44 236 244 278 252 200 C260 130 100 154 122 96 C136 58 168 50 178 22" />
        <g className="quest-finish-flag">
          <line x1="178" y1="22" x2="178" y2="-18" />
          <path d="M178 -16 C196 -24 216 -18 226 -10 C220 2 198 -4 178 4 Z" />
          <circle cx="178" cy="22" r="6" />
        </g>
      </svg>
      {nodes.map((node, index) => (
        <button
          key={node.id}
          type="button"
          className={`quest-map-node trail-node quest-node-${index + 1} ${node.state} ${node.id === selectedId ? 'selected' : ''}`}
          onClick={(event) => {
            event.stopPropagation()
            onSelect?.(node.id)
          }}
          aria-label={`${node.title} - ${node.status}`}
        >
          <div className="quest-map-marker">
            <span className="quest-map-dot" aria-hidden="true" />
          </div>
          <div className="quest-map-copy">
            <strong>{node.title}</strong>
            <p>{node.meta ? `${node.status} - ${node.meta}` : node.status}</p>
          </div>
        </button>
      ))}
    </div>
  )
}

function HomeTab({ user, onTabChange }) {
  const heroAvatar = user.avatar || createAnimeAvatarSvg(user.name)
  const firstName = user.name.split(' ')[0]
  const weeklyProgress = 230
  const weeklyTarget = 320
  const weeklyProgressPercent = Math.min(100, Math.round((weeklyProgress / weeklyTarget) * 100))

  return (
    <>
      <section className="app-hero-card">
        <div className="hero-copy">
          <span className="small-caps mint">Keep your mental health</span>

          <div className="hero-title-row">
            <div className="hero-avatar-wrap floating-avatar">
              <img src={heroAvatar} alt={user.name} className="hero-avatar-image" />
            </div>

            <div>
              <h2>Halo, {firstName}</h2>
              <p>Kindness Warrior - XI IPS 2</p>
            </div>
          </div>

          <div className="home-score-panel">
            <div className="home-score-main">
              <span>Total poin</span>
              <strong>{user.points}</strong>
              <small>Empathy Guardian</small>
            </div>

            <div className="home-score-progress">
              <div className="home-score-progress-head">
                <span>Progress minggu ini</span>
                <strong>{weeklyProgress} / {weeklyTarget} pts</strong>
              </div>
              <div className="home-score-track" aria-hidden="true">
                <i style={{ width: `${weeklyProgressPercent}%` }} />
              </div>
            </div>
          </div>

          <div className="home-score-chip-row">
            <span><Sparkles size={12} /> +82 pts hari ini</span>
            <span><CheckCircle2 size={12} /> 2 quest selesai</span>
          </div>
        </div>
      </section>

      <section className="feature-card-grid home-feature-grid">
        {featureCards.map((item) => {
          const FeatureIcon = featureIconMap[item.key] || Sparkles

          return (
            <button
              key={item.key}
              type="button"
              className={`feature-demo-card ${item.color}`}
              onClick={() => onTabChange(featureTabMap[item.key] || 'home')}
            >
              <div className="feature-card-top">
                <span>{item.status}</span>
                <div className="feature-icon-badge">
                  <FeatureIcon size={15} />
                </div>
              </div>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </button>
          )
        })}
      </section>
    </>
  )
}

function ShieldTab({ shieldEnabled, setShieldEnabled, shieldInput, setShieldInput, detectedWords }) {
  const hasWarning = shieldEnabled && detectedWords.length > 0
  const saferMessage = makeSaferMessage(shieldInput)

  return (
    <section className="shield-flow-panel">
      <div className="shield-intro-card">
        <div className="panel-head solid-bottom">
          <div>
            <span className="small-caps mint">Preventive Nudging</span>
            <h3>Cyber-Shield Keyboard</h3>
          </div>

          <label className={`shield-toggle ${shieldEnabled ? 'is-on' : ''}`}>
            <input
              type="checkbox"
              checked={shieldEnabled}
              onChange={(e) => setShieldEnabled(e.target.checked)}
              aria-label="Aktifkan Cyber-Shield"
            />
            <span className="shield-toggle-track"><span className="shield-toggle-thumb" /></span>
            <span className="shield-toggle-label">{shieldEnabled ? 'Aktif' : 'Nonaktif'}</span>
          </label>
        </div>

        <p className="shield-guidance">
          Jika Cyber-Shield aktif, pesan yang mengandung kata kasar, kurang pantas, atau mengarah ke bullying akan diberi peringatan sebelum dikirim.
        </p>
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

      <div className="shield-example-block">
        <span className="small-caps">Coba contoh kalimat</span>
        <div className="shield-example-grid">
          {shieldExampleDrafts.map((example) => (
            <button key={example} className="shield-example-btn" onClick={() => setShieldInput(example)}>
              {example}
            </button>
          ))}
        </div>
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

function KindbotTab() {
  const [messages, setMessages] = useState(kindbotPlaybook.opening)
  const chatListRef = useRef(null)

  useEffect(() => {
    const chatList = chatListRef.current

    if (!chatList) {
      return
    }

    chatList.scrollTo({
      top: chatList.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages])

  function continueConversation() {
    const autoFlow = [
      ...kindbotPlaybook.flows.ditemani,
      ...kindbotPlaybook.flows.laporan,
    ]
    const nextMessage = autoFlow[messages.length - kindbotPlaybook.opening.length]

    if (!nextMessage) {
      return
    }

    setMessages((prev) => [...prev, nextMessage])
  }

  function handleConversationKeyDown(event) {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return
    }

    event.preventDefault()
    continueConversation()
  }

  return (
    <section
      className="kindbot-flow-panel"
      onClick={continueConversation}
      onKeyDown={handleConversationKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Ketuk area chat untuk melanjutkan percakapan KindBot"
    >
      <div className="kindbot-inline-head">
        <div>
          <span className="small-caps mint">AI Companion</span>
          <h3>KindBot Chat</h3>
        </div>
      </div>

      <div className="chat-list chat-list-grow" ref={chatListRef}>
        {messages.map((msg, idx) => (
          <div key={`${msg.from}-${idx}`} className={`chat-bubble ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="kindbot-fake-input" aria-hidden="true">
        <Mic size={18} className="kindbot-input-icon" aria-hidden="true" />
        <span className="kindbot-caret" />
        <span className="kindbot-input-spacer" />
        <span className="kindbot-send-chip">
          <Send size={17} aria-hidden="true" />
        </span>
      </div>

    </section>
  )
}

function ReportTab({ reports, onCreateReport, isSubmittingReport }) {
  const [form, setForm] = useState({
    reporterRole: '',
    incidentType: '',
    incidentPlace: '',
    chronology: '',
    evidenceName: '',
    anonymousMode: true,
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

  function fillChronologyDraft() {
    if (form.chronology.trim()) {
      return
    }

    updateField('chronology', reportChronologyDraft)
  }

  async function handleSubmitReport() {
    if (!form.reporterRole || !form.incidentType || !form.incidentPlace || !form.chronology.trim()) {
      setSubmitError('Lengkapi peran, jenis kejadian, lokasi, dan kronologi terlebih dahulu.')
      return
    }

    setSubmitError('')
    setSubmitFeedback('')

    const result = await onCreateReport({
      type: form.incidentType,
      place: form.incidentPlace,
      priority: 'Sedang',
      reporterRole: form.reporterRole,
      reporterLabel: form.anonymousMode ? 'Anonim' : 'Pelapor dikenali sekolah',
      chronology: form.chronology,
      evidenceName: form.evidenceName,
      anonymousMode: form.anonymousMode,
    })

    setSubmitFeedback(result.message)

    setForm((prev) => ({
      ...prev,
      reporterRole: '',
      incidentType: '',
      incidentPlace: '',
      chronology: '',
      evidenceName: '',
      anonymousMode: true,
    }))
  }

  return (
    <section className="report-flow-panel">
      <div className="report-intro-card">
        <div className="panel-head solid-bottom">
          <div>
            <span className="small-caps rose">Anonymous Reporting</span>
            <h3>Laman Lapor</h3>
          </div>
          <span className="chip">Protected</span>
        </div>

        <div className="report-security-card">
          <strong>Anonim, aman, dan langsung ke tim sekolah</strong>
        </div>
      </div>

      <div className="report-form report-form-card">
        <label>
          Saya melapor sebagai
          <select value={form.reporterRole} onChange={(e) => updateField('reporterRole', e.target.value)}>
            <option value="" disabled>Pilih peran</option>
            <option value="Saksi">Saksi</option>
            <option value="Korban">Korban</option>
            <option value="Teman dekat korban">Teman dekat korban</option>
          </select>
        </label>

        <label>
          Jenis kejadian
          <select value={form.incidentType} onChange={(e) => updateField('incidentType', e.target.value)}>
            <option value="" disabled>Pilih jenis kejadian</option>
            {reportPresets.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>

        <label>
          Lokasi
          <select value={form.incidentPlace} onChange={(e) => updateField('incidentPlace', e.target.value)}>
            <option value="" disabled>Pilih lokasi</option>
            {reportLocationOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>

        <label>
          Kronologi
          <textarea
            value={form.chronology}
            onChange={(e) => updateField('chronology', e.target.value)}
            onFocus={fillChronologyDraft}
            onClick={fillChronologyDraft}
            placeholder="Klik untuk mengisi contoh kronologi"
          />
        </label>

        <label className="report-upload-box">
          Bukti pendukung
          <input type="file" onChange={handleEvidenceChange} />
          <span className="report-upload-note">{form.evidenceName || 'Belum ada file dipilih'}</span>
        </label>

        <label className="report-anon-toggle">
          <input type="checkbox" checked={form.anonymousMode} onChange={(e) => updateField('anonymousMode', e.target.checked)} />
          <span>Sembunyikan identitas</span>
        </label>

        {submitError && <div className="report-inline-feedback error">{submitError}</div>}
        {submitFeedback && <div className="report-inline-feedback success">{submitFeedback}</div>}

        <button className="submit-demo" onClick={handleSubmitReport} disabled={isSubmittingReport}>
          {isSubmittingReport ? 'Mengirim laporan...' : 'Kirim laporan aman'}
        </button>
      </div>

      <div className="report-history-heading">
        <span>Riwayat Laporan</span>
      </div>

      <div className="report-status-list">
        {reports.length > 0 ? (
          reports.slice(0, 3).map((item) => (
            <article key={item.id} className="report-card report-card-stack">
              <div>
                <div className="admin-case-title-row">
                  <strong>{item.id}</strong>
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

function QuestTab({ user, onResolveQuest, onGameModeChange }) {
  const [selectedQuestId, setSelectedQuestId] = useState(rolePlayQuest.mapNodes[0].id)
  const [questMapCalloutId, setQuestMapCalloutId] = useState('')
  const [questMapCalloutMode, setQuestMapCalloutMode] = useState('summary')
  const [isSimulationOpen, setIsSimulationOpen] = useState(false)
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
  const [selectedChoiceId, setSelectedChoiceId] = useState('')
  const [sceneFeedback, setSceneFeedback] = useState('')
  const [sessionPoints, setSessionPoints] = useState(0)
  const [completedQuestIds, setCompletedQuestIds] = useState([])
  const [isMissionComplete, setIsMissionComplete] = useState(false)
  const [selectedPointWeekKey, setSelectedPointWeekKey] = useState(pointWeekOptions[0].key)
  const challengeCardRef = useRef(null)
  const selectedPointWeek = pointWeekOptions.find((week) => week.key === selectedPointWeekKey) || pointWeekOptions[0]
  const recordedPointItems = selectedPointWeek.items.filter((item) => typeof item.points === 'number')
  const highestPoint = recordedPointItems.reduce((highest, item) => item.points > highest.points ? item : highest, recordedPointItems[0])
  const lowestPoint = recordedPointItems.reduce((lowest, item) => item.points < lowest.points ? item : lowest, recordedPointItems[0])
  const maxDailyPoints = Math.max(...recordedPointItems.map((item) => item.points), 1)
  const questMapProgress = rolePlayQuest.mapNodes.map((node) => {
    if (completedQuestIds.includes(node.id)) {
      return { ...node, status: 'Selesai', state: 'done' }
    }

    return node
  })
  const selectedQuestIndex = Math.max(0, questMapProgress.findIndex((node) => node.id === selectedQuestId))
  const selectedQuestNode = questMapProgress[selectedQuestIndex] || questMapProgress[0]
  const questMapCalloutNode = questMapProgress.find((node) => node.id === questMapCalloutId)
  const selectedQuestLocked = selectedQuestNode.state === 'locked'
  const currentScene = rolePlayQuest.stages[currentSceneIndex] || rolePlayQuest.stages[0]
  const selectedChoice = currentScene.choices.find((choice) => choice.id === selectedChoiceId)
  const sceneMaxPoints = Math.max(...currentScene.choices.map((choice) => choice.points), 0)
  const selectedChoiceIsBest = Boolean(selectedChoice && selectedChoice.points >= sceneMaxPoints)
  const totalScenes = rolePlayQuest.stages.length
  const maxSessionPoints = rolePlayQuest.stages.reduce((total, scene) => total + Math.max(...scene.choices.map((choice) => choice.points), 0), 0)
  const finalLevel = sessionPoints >= maxSessionPoints * 0.78 ? 'Aman dan Empatik' : sessionPoints >= maxSessionPoints * 0.48 ? 'Cukup Aman, Perlu Ditingkatkan' : 'Perlu Pendampingan Aman'
  const finalBadge = sessionPoints >= maxSessionPoints * 0.78 ? 'Penyintas Aman' : 'Pejuang Refleksi'
  const savedQuestHistory = {
    'cyberbullying-group': {
      points: 430,
      level: 'Aman dan Empatik',
      badge: 'Penyintas Aman',
    },
  }
  const questMapCalloutHistory = questMapCalloutNode?.state === 'done'
    ? savedQuestHistory[questMapCalloutNode.id] || {
      points: sessionPoints,
      level: finalLevel,
      badge: finalBadge,
    }
    : null
  const isQuestHistoryCallout = questMapCalloutMode === 'history' && questMapCalloutHistory

  useEffect(() => {
    resetSimulationState()
  }, [selectedQuestId])

  useEffect(() => {
    onGameModeChange?.(isSimulationOpen)

    return () => onGameModeChange?.(false)
  }, [isSimulationOpen, onGameModeChange])

  useEffect(() => {
    if (!isSimulationOpen) {
      return
    }

    const frame = window.requestAnimationFrame(() => {
      challengeCardRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [currentSceneIndex, isMissionComplete, isSimulationOpen])

  function resetSimulationState() {
    setIsSimulationOpen(false)
    setCurrentSceneIndex(0)
    setSelectedChoiceId('')
    setSceneFeedback('')
    setSessionPoints(0)
    setIsMissionComplete(false)
  }

  function closeGameScreen() {
    setIsSimulationOpen(false)
  }

  function startSimulation() {
    if (selectedQuestLocked) {
      return
    }

    setQuestMapCalloutMode('summary')
    setCurrentSceneIndex(0)
    setSelectedChoiceId('')
    setSceneFeedback('')
    setSessionPoints(0)
    setIsMissionComplete(false)
    setIsSimulationOpen(true)
  }

  function selectQuestMapNode(nodeId) {
    setSelectedQuestId(nodeId)
    setQuestMapCalloutId(nodeId)
    setQuestMapCalloutMode('summary')
  }

  function hideQuestMapCallout() {
    setQuestMapCalloutId('')
    setQuestMapCalloutMode('summary')
  }

  function handleQuestCalloutAction() {
    if (!questMapCalloutNode || questMapCalloutNode.state === 'locked') {
      return
    }

    if (questMapCalloutNode.state === 'done') {
      if (questMapCalloutMode === 'history') {
        hideQuestMapCallout()
        return
      }

      setQuestMapCalloutMode('history')
      return
    }

    startSimulation()
  }

  function selectChoice(choice) {
    if (selectedChoiceId || isMissionComplete) {
      return
    }

    setSelectedChoiceId(choice.id)
    setSceneFeedback(choice.feedback)
    setSessionPoints((points) => points + choice.points)
  }

  function continueSimulation() {
    if (!selectedChoice) {
      return
    }

    if (currentSceneIndex >= totalScenes - 1) {
      setIsMissionComplete(true)
      if (!completedQuestIds.includes(selectedQuestNode.id)) {
        onResolveQuest(sessionPoints)
        setCompletedQuestIds((prev) => [...prev, selectedQuestNode.id])
      }
      return
    }

    setCurrentSceneIndex((index) => index + 1)
    setSelectedChoiceId('')
    setSceneFeedback('')
  }

  if (isSimulationOpen) {
    return (
      <section className="quest-game-screen">
        {!isMissionComplete ? (
          <div ref={challengeCardRef} className={`quest-game-panel ${sceneFeedback ? 'has-feedback' : ''}`}>
            <div className="quest-game-hud">
              <button type="button" className="quest-game-back" onClick={closeGameScreen} aria-label="Kembali ke peta KindQuest">
                <ArrowLeft size={17} />
              </button>
              <div className="quest-game-title">
                <span>Game role-play</span>
                <strong>{selectedQuestNode.title}</strong>
              </div>
              <div className="quest-level-chip">
                <span>Skor</span>
                <strong>{sessionPoints}</strong>
              </div>
            </div>

            <div className="quest-stage-strip" aria-label={`Babak ${currentSceneIndex + 1} dari ${totalScenes}`}>
              {Array.from({ length: totalScenes }).map((_, index) => {
                const state = index < currentSceneIndex ? 'done' : index === currentSceneIndex ? 'active' : ''

                return <span key={`stage-${index}`} className={state} />
              })}
            </div>

            <div className="panel-head solid-bottom quest-arcade-head">
              <div>
                <span className="small-caps amber">{currentScene.chapter} / {totalScenes}</span>
                <h3>Game sebagai korban</h3>
              </div>
            </div>

            <div className="quest-dialogue-stack" aria-label="Percakapan game">
              <div className="quest-dialogue-bubble antagonist">
                <span>Karakter tidak baik</span>
                <p>{currentScene.antagonist}</p>
              </div>
              <div className="quest-dialogue-bubble victim">
                <span>Kamu</span>
                <p>{currentScene.victim}</p>
              </div>
            </div>

            <div className="quest-question-copy">
              <span className="small-caps mint">Pilih respons</span>
              <p className="quest-prompt">{currentScene.prompt}</p>
            </div>

            <div className="quest-option-list">
              {currentScene.choices.map((choice, index) => {
                const isSelected = selectedChoiceId === choice.id
                const isDimmed = selectedChoiceId && !isSelected

                return (
                  <button
                    type="button"
                    key={choice.id}
                    className={`quest-option-card quest-arcade-option ${isSelected ? 'selected' : ''} ${isDimmed ? 'dimmed' : ''}`}
                    style={{ '--option-order': index }}
                    onClick={() => selectChoice(choice)}
                    aria-pressed={isSelected}
                  >
                    <span className="quest-choice-index">{index + 1}</span>
                    <span>{choice.label}</span>
                    {isSelected && <strong className="quest-reward-pop">+{choice.points} pts</strong>}
                  </button>
                )
              })}
            </div>

            {sceneFeedback && (
              <div className={`quest-feedback-card quest-arcade-feedback ${selectedChoiceIsBest ? 'best' : 'needs-growth'}`}>
                <span className="quest-feedback-sparkle" aria-hidden="true" />
                <CheckCircle2 size={16} />
                <div>
                  <span className="quest-feedback-kicker">Kesimpulan pilihanmu</span>
                  <strong>{selectedChoiceIsBest ? 'Pilihan paling aman' : 'Strategi aman perlu ditingkatkan'}</strong>
                  <p>{sceneFeedback}</p>
                  {selectedChoice && <span className="quest-feedback-points">+{selectedChoice.points} pts</span>}
                </div>
              </div>
            )}

            {selectedChoice && (
              <button type="button" className="mini-action quest-next-btn" onClick={continueSimulation}>
                {currentSceneIndex >= totalScenes - 1 ? 'Lihat hasil akhir' : 'Lanjut ke babak berikutnya'}
              </button>
            )}
          </div>
        ) : (
          <div ref={challengeCardRef} className="quest-result-card quest-game-result">
            <div className="quest-result-head">
              <div className="quest-result-topline">
                <button type="button" className="quest-game-back" onClick={closeGameScreen} aria-label="Kembali ke peta KindQuest">
                  <ArrowLeft size={17} />
                </button>
                <span className="small-caps mint">Game selesai</span>
              </div>
              <h3>{finalLevel}</h3>
              <p>Kamu menyelesaikan game sebagai korban dalam {totalScenes} babak.</p>
            </div>

            <div className="quest-result-score">
              <div>
                <span>Total poin sesi</span>
                <strong>{sessionPoints}</strong>
              </div>
              <div>
                <span>Badge akhir</span>
                <strong>{finalBadge}</strong>
              </div>
            </div>

            <div className="quest-result-summary">
              {rolePlayQuest.resultSummary.map((item) => (
                <span key={item}><CheckCircle2 size={14} /> {item}</span>
              ))}
            </div>

            <button type="button" className="mini-action quest-next-btn" onClick={startSimulation}>
              Main ulang
            </button>
          </div>
        )}
      </section>
    )
  }

  return (
    <section className="quest-journey-panel">
      <div className="quest-hero-card">
        <div>
          <span className="small-caps amber">Perjalanan Kind-Quest</span>
          <h3>{user.name}</h3>
          <p>{user.roleLabel} - {user.department}</p>
        </div>

        <div className="quest-points-pill">
          <Sparkles size={16} />
          <strong>{user.points}</strong>
          <span>pts</span>
        </div>
      </div>

      <div className="quest-map-card">
        <div className="weekly-points-head quest-topic-head">
          <div className="quest-topic-inline">
            <span className="small-caps mint">Peta Quest</span>
          </div>
          <div className="quest-topic-trophy" aria-hidden="true">
            <Trophy size={17} />
          </div>
        </div>

        <div className="quest-map-stage">
          <QuestTrailMap
            nodes={questMapProgress}
            selectedId={selectedQuestNode.id}
            onSelect={selectQuestMapNode}
            onBackgroundClick={hideQuestMapCallout}
            className="quest-page-trail"
          />

          {questMapCalloutNode && (
            <div
              className={`quest-map-floating-card ${questMapCalloutNode.state} quest-callout-${questMapCalloutNode.id} ${isQuestHistoryCallout ? 'history' : ''}`}
              onClick={(event) => event.stopPropagation()}
            >
              <div>
                <span className="small-caps amber">{isQuestHistoryCallout ? 'Riwayat game' : questMapCalloutNode.status}</span>
                <strong>{questMapCalloutNode.title}</strong>
                {isQuestHistoryCallout ? (
                  <p>{questMapCalloutHistory.points} pts - {questMapCalloutHistory.level}</p>
                ) : (
                  <p>{questMapCalloutNode.detail}</p>
                )}
              </div>
              <button
                type="button"
                className="mini-action"
                onClick={handleQuestCalloutAction}
                disabled={questMapCalloutNode.state === 'locked'}
              >
                {questMapCalloutNode.state === 'locked'
                  ? 'Belum terbuka'
                  : questMapCalloutNode.state === 'done'
                    ? isQuestHistoryCallout ? 'Tutup' : 'Lihat riwayat game'
                    : 'Mulai game'}
              </button>
            </div>
          )}
          </div>
        </div>

      <div className="weekly-points-card">
        <div className="weekly-points-head">
          <div>
            <div className="weekly-points-label-row">
              <span className="small-caps">Rekap poin</span>
              <span>{selectedPointWeek.range}</span>
            </div>
          </div>
          <div className="point-week-switch">
            <select value={selectedPointWeekKey} onChange={(event) => setSelectedPointWeekKey(event.target.value)} aria-label="Pilih minggu rekap poin">
              {pointWeekOptions.map((week) => (
                <option key={week.key} value={week.key}>{week.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="weekly-points-chart" aria-label={`Grafik rekap poin ${selectedPointWeek.label}`}>
          {selectedPointWeek.items.map((item) => {
            const hasPoint = typeof item.points === 'number'
            const pointTag = hasPoint && item.day === highestPoint?.day ? 'Tertinggi' : hasPoint && item.day === lowestPoint?.day ? 'Terendah' : ''

            return (
              <div key={item.day} className={`weekly-point-bar ${hasPoint ? '' : 'is-empty'}`.trim()}>
                <div className="weekly-point-track">
                  {pointTag && <span className={`weekly-point-tag ${pointTag.toLowerCase()}`}>{pointTag}</span>}
                  {hasPoint && <div className="weekly-point-fill" style={{ height: `${Math.max(22, Math.round((item.points / maxDailyPoints) * 100))}%` }} />}
                </div>
                <span className="weekly-point-day">{item.day}</span>
              </div>
            )
          })}
        </div>
        {highestPoint && lowestPoint && (
          <div className="weekly-points-extremes">
            <span>Tertinggi: {highestPoint.day} - {highestPoint.points} pts</span>
            <span>Terendah: {lowestPoint.day} - {lowestPoint.points} pts</span>
          </div>
        )}
      </div>
    </section>
  )
}

export function SosScreen({ onClose }) {
  const [dispatchStarted, setDispatchStarted] = useState(false)

  if (!dispatchStarted) {
    return (
      <div className="phone-page sos-fullscreen sos-intro-screen">
        <button className="sos-close-btn icon-only" onClick={onClose} aria-label="Kembali">
          <ArrowLeft size={18} />
        </button>

        <section className="sos-intro-top solo-copy">
          <div className="sos-intro-copy">
            <h2>Butuh bantuan sekarang?</h2>
            <p>Tekan tombol SOS jika kamu membutuhkan bantuan segera. Guru BK akan menerima sinyal prioritas dan membantu dari lokasi terdekat.</p>
          </div>
        </section>

        <section className="sos-intro-card">
          <button type="button" className="sos-intro-button" onClick={() => setDispatchStarted(true)}>
            <span className="sos-intro-button-main">SOS</span>
          </button>
        </section>
      </div>
    )
  }

  return (
    <div className="phone-page sos-fullscreen sos-calling-screen">
      <button className="sos-close-btn icon-only" onClick={onClose} aria-label="Kembali">
        <ArrowLeft size={18} />
      </button>

      <div className="sos-header">
        <h2>Respon cepat sedang berjalan</h2>
        <p>Sinyal bantuan prioritas sudah dikirim bersama titik lokasi darurat ke Guru BK terdekat.</p>
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
        <p>Guru BK sedang memantau status bantuan dan menyiapkan pendampingan langsung dari lokasi terdekat.</p>
      </div>
    </div>
  )
}

export default function AppScreen({
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
  const [tabTransition, setTabTransition] = useState(null)
  const [isQuestGameMode, setIsQuestGameMode] = useState(false)
  const previousTabRef = useRef(activeTab)

  const detectedWords = useMemo(() => {
    const lower = shieldInput.toLowerCase()
    return shieldFlaggedWords.filter((word) => lower.includes(word))
  }, [shieldInput])

  useLayoutEffect(() => {
    const previousTab = previousTabRef.current

    if (previousTab === activeTab) {
      return
    }

    const previousIndex = bottomTabs.findIndex((tab) => tab.key === previousTab)
    const nextIndex = bottomTabs.findIndex((tab) => tab.key === activeTab)
    const direction = previousIndex >= 0 && nextIndex >= 0 && nextIndex < previousIndex ? 'back' : 'forward'

    setTabTransition({
      from: previousTab,
      to: activeTab,
      direction,
      id: `${previousTab}-${activeTab}-${Date.now()}`,
    })
    previousTabRef.current = activeTab
  }, [activeTab])

  useEffect(() => {
    if (!tabTransition) {
      return
    }

    const timer = setTimeout(() => {
      setTabTransition((currentTransition) =>
        currentTransition?.id === tabTransition.id ? null : currentTransition
      )
    }, TAB_TRANSITION_MS)

    return () => clearTimeout(timer)
  }, [tabTransition])

  useEffect(() => {
    if (activeTab !== 'quest') {
      setIsQuestGameMode(false)
    }
  }, [activeTab])

  function renderTabContent(tabKey) {
    if (tabKey === 'home') {
      return <HomeTab user={user} onTabChange={onTabChange} />
    }

    if (tabKey === 'shield') {
      return <ShieldTab shieldEnabled={shieldEnabled} setShieldEnabled={setShieldEnabled} shieldInput={shieldInput} setShieldInput={setShieldInput} detectedWords={detectedWords} />
    }

    if (tabKey === 'kindbot') {
      return <KindbotTab />
    }

    if (tabKey === 'report') {
      return <ReportTab reports={reports} onCreateReport={onCreateReport} isSubmittingReport={isReportMutationPending} />
    }

    if (tabKey === 'quest') {
      return <QuestTab user={user} onResolveQuest={onResolveQuest} onGameModeChange={setIsQuestGameMode} />
    }

    return null
  }

  if (showSosScreen) {
    return <SosScreen onClose={() => setShowSosScreen(false)} />
  }

  return (
    <div className={`phone-page app-page ${isQuestGameMode ? 'quest-game-mode' : ''}`}>
      {!isQuestGameMode && (
        <header className="app-header">
          <div className="app-header-brand">
            <KindReachLogo size={32} rounded={10} />
            <div className="app-header-title">
              <h2>{activeTab === 'home' ? 'KindReach' : bottomTabs.find((tab) => tab.key === activeTab)?.label}</h2>
            </div>
          </div>

          <button className="logout-btn" onClick={onLogout}>
            <LogOut size={18} />
          </button>
        </header>
      )}

      <main className="app-content tab-transition-stack">
        {tabTransition && (
          <div
            key={`tab-exit-${tabTransition.id}`}
            className={`tab-layer tab-layer-exit exit-${tabTransition.direction}`}
            aria-hidden="true"
          >
            {renderTabContent(tabTransition.from)}
          </div>
        )}

        <div
          key={`tab-active-${activeTab}`}
          className={`tab-layer tab-layer-current ${tabTransition ? `enter-${tabTransition.direction}` : 'active'}`}
        >
          {renderTabContent(activeTab)}
        </div>
      </main>

      {!isQuestGameMode && (
        <>
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
        </>
      )}
    </div>
  )
}
