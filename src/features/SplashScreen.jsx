import KindReachLogo from '../components/KindReachLogo'

const splashGreeters = [
  { id: 'student', side: 'left', hair: '#24324e', accent: '#63f2df', shirt: '#587dff', skin: '#f5c9a9' },
  { id: 'teacher', side: 'right', hair: '#2f2738', accent: '#ffc857', shirt: '#2de2cf', skin: '#f0bd99' },
  { id: 'counselor', side: 'bottom', hair: '#3b2b52', accent: '#ff7aa8', shirt: '#8b7cff', skin: '#e6b08f' },
]

function SplashGreeter({ id, side, hair, accent, shirt, skin }) {
  return (
    <div className={`splash-greeter ${side}`}>
      <svg viewBox="0 0 92 112" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id={`splashGreeterGlow-${id}`} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor={accent} stopOpacity=".34" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="46" cy="58" rx="42" ry="48" fill={`url(#splashGreeterGlow-${id})`} />
        <path className="greeter-arm back" d="M22 70 C5 64 8 45 24 44" stroke={skin} strokeWidth="9" strokeLinecap="round" fill="none" />
        <path className="greeter-body" d="M23 92 C25 71 34 60 46 60 C58 60 67 71 70 92 Z" fill={shirt} />
        <path d="M30 92 C34 78 39 71 46 71 C53 71 58 78 62 92" fill="rgba(255,255,255,.16)" />
        <circle cx="46" cy="42" r="22" fill={skin} />
        <path d="M24 39 C25 21 39 14 51 18 C65 22 70 33 67 45 C58 40 46 33 28 40 Z" fill={hair} />
        <circle cx="38" cy="44" r="2.4" fill="#1e2a3f" />
        <circle cx="54" cy="44" r="2.4" fill="#1e2a3f" />
        <path d="M39 53 C43 57 50 57 54 53" stroke="#1e2a3f" strokeWidth="3" strokeLinecap="round" fill="none" />
        <g className="greeter-wave-hand">
          <path className="greeter-arm wave" d="M67 68 C84 61 88 45 76 34" stroke={skin} strokeWidth="9" strokeLinecap="round" fill="none" />
          <circle cx="76" cy="34" r="6" fill={skin} />
        </g>
      </svg>
    </div>
  )
}

export default function SplashScreen() {
  return (
    <div className="phone-page welcome-page splash-page">
      <div className="splash-character-layer" aria-hidden="true">
        {splashGreeters.map((person) => (
          <SplashGreeter key={person.id} {...person} />
        ))}
      </div>

      <div className="splash-content">
        <div className="splash-logo-wrap">
          <div className="splash-logo-glow" />
          <div className="splash-logo-card">
            <KindReachLogo size={92} rounded={26} />
          </div>
        </div>

        <div className="splash-copy">
          <span className="small-caps mint">KindReach</span>
          <h2>Reach out. Stay kind.</h2>
          <p>
            Ruang aman digital untuk dukungan, pelaporan, dan edukasi anti-bullying di lingkungan sekolah.
          </p>
        </div>

        <div className="splash-status-stack">
          <div className="splash-progress-dots">
            <span className="active" />
            <span />
            <span />
          </div>

          <p>Loading kindness experience...</p>
        </div>
      </div>
    </div>
  )
}
