import KindReachLogo from '../components/KindReachLogo'

export default function WelcomeScreen({ onOpenInstitution, onOpenLogin }) {
  return (
    <div className="phone-page welcome-page">
      <div className="welcome-content welcome-kindness-screen">
        <div className="welcome-logo-wrap welcome-centered-logo">
          <KindReachLogo size={88} rounded={26} />
        </div>

        <span className="small-caps mint welcome-kicker">Kindness Warrior</span>

        <h2 className="welcome-main-title">
          Selamat datang di
          <br />
          ekosistem KindReach
        </h2>

        <p className="welcome-lead">
          KindReach menghadirkan ruang aman digital untuk pencegahan, pelaporan,
          respon cepat, dan edukasi anti-bullying di lingkungan sekolah.
        </p>

        <div className="welcome-user-card welcome-role-card">
          <strong>Mulai sesuai peranmu</strong>
          <span>
            Sekolah mendaftar sebagai admin pusat. Siswa dan guru masuk menggunakan
            akses yang telah diverifikasi oleh sekolah.
          </span>
        </div>

        <div className="welcome-action-stack">
          <button className="welcome-continue-btn primary-login-btn" onClick={onOpenLogin}>
            Log In
          </button>

          <button className="welcome-continue-btn secondary-register-btn" onClick={onOpenInstitution}>
            Registrasi Institusi
          </button>
        </div>
      </div>
    </div>
  )
}
