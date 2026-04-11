import KindReachLogo from '../components/KindReachLogo'

export default function SplashScreen() {
  return (
    <div className="phone-page welcome-page">
      <div
        className="welcome-content"
        style={{
          justifyContent: 'center',
          minHeight: '100%',
          gap: 22,
        }}
      >
        <div
          className="welcome-logo-wrap"
          style={{
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 120,
              height: 120,
              borderRadius: '999px',
              background: 'radial-gradient(circle, rgba(74,255,223,.22), transparent 68%)',
              filter: 'blur(8px)',
            }}
          />
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              padding: 14,
              borderRadius: 28,
              background: 'rgba(255,255,255,.06)',
              border: '1px solid rgba(255,255,255,.08)',
              boxShadow: '0 18px 40px rgba(0,0,0,.25)',
            }}
          >
            <KindReachLogo size={92} rounded={26} />
          </div>
        </div>

        <div style={{ display: 'grid', gap: 10, textAlign: 'center' }}>
          <span className="small-caps mint">KindReach</span>
          <h2 style={{ margin: 0, fontSize: '2rem', lineHeight: 1.15 }}>
            Reach out. Stay kind.
          </h2>
          <p
            style={{
              margin: 0,
              color: '#aab8d6',
              lineHeight: 1.7,
              maxWidth: 290,
            }}
          >
            Ruang aman digital untuk dukungan, pelaporan, dan edukasi anti-bullying di lingkungan sekolah.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 6,
          }}
        >
          <span
            style={{
              width: 26,
              height: 8,
              borderRadius: 999,
              background: 'linear-gradient(90deg, #29d7c4, #7b67ff)',
              boxShadow: '0 0 16px rgba(72, 214, 197, .35)',
            }}
          />
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '999px',
              background: 'rgba(255,255,255,.26)',
            }}
          />
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '999px',
              background: 'rgba(255,255,255,.16)',
            }}
          />
        </div>

        <p
          style={{
            margin: 0,
            fontSize: '.88rem',
            color: '#8fa1c6',
            letterSpacing: '.04em',
          }}
        >
          Loading kindness experience...
        </p>
      </div>
    </div>
  )
}