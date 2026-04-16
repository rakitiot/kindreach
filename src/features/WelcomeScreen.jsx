import KindReachLogo from '../components/KindReachLogo'

export default function WelcomeScreen({ onOpenInstitution, onOpenLogin }) {
  return (
    <div className="phone-page welcome-page">
      <div className="welcome-content welcome-kindness-screen">
        <div className="welcome-brand-row">
          <KindReachLogo size={42} rounded={12} />
          <strong>KindReach</strong>
        </div>

        <h2 className="welcome-main-title">
          <span>Selamat Datang</span>
          <span>Kindness Warrior</span>
        </h2>

        <p className="welcome-lead">
          Ruang aman untuk mendapat dukungan, melapor, dan belajar saling menjaga.
        </p>

        <div className="welcome-user-card welcome-role-card">
          <strong>Masuk sesuai kebutuhanmu</strong>
          <span>
            Jika sekolahmu sudah terdaftar dan kamu sudah memiliki akun, klik Log In.
            Jika institusi ingin mendaftar, klik Daftar / Registrasi Institusi.
          </span>
        </div>

        <div className="welcome-action-stack">
          <button className="welcome-continue-btn primary-login-btn" onClick={onOpenLogin}>
            Log In
          </button>

          <button className="welcome-continue-btn secondary-register-btn" onClick={onOpenInstitution}>
            Daftar / Registrasi Institusi
          </button>
        </div>
      </div>
    </div>
  )
}
