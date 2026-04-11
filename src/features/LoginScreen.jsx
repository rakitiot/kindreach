import { ArrowLeft, BadgeCheck, KeyRound, ShieldCheck } from 'lucide-react'
import KindReachLogo from '../components/KindReachLogo'

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.233 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 16.108 19.001 13 24 13c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4c-7.682 0-14.347 4.337-17.694 10.691z"/>
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.144 35.091 26.689 36 24 36c-5.212 0-9.617-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.084 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
    </svg>
  )
}

export default function LoginScreen({
  institution,
  accounts,
  selectedAccount,
  selectedAccountId,
  onSelectAccount,
  onBack,
  onLogin,
}) {
  return (
    <div className="phone-page login-page">
      <button className="ghost-back" onClick={onBack}>
        <ArrowLeft size={18} />
      </button>

      <div className="login-brand">
        <div className="brand-tile">
          <KindReachLogo size={72} rounded={22} />
        </div>
        <span className="small-caps mint">Log In Pengguna</span>
        <h2>Masuk sebagai pengguna terverifikasi</h2>
        <p>
          Pilih peran untuk mensimulasikan pengalaman siswa, guru BK, atau admin sekolah.
        </p>
      </div>

      <div className="login-verify-card">
        <div>
          <span className="small-caps">Sekolah aktif</span>
          <strong>{institution.name}</strong>
          <p>{institution.verificationLabel}</p>
        </div>
        <span className="chip">{institution.schoolCode}</span>
      </div>

      <div className="role-selector">
        {accounts.map((account) => (
          <button
            key={account.id}
            className={`role-card ${selectedAccountId === account.id ? 'active' : ''}`}
            onClick={() => onSelectAccount(account.id)}
          >
            <div>
              <strong>{account.name}</strong>
              <p>{account.role}</p>
            </div>
            <span>{account.schoolCode}</span>
          </button>
        ))}
      </div>

      <div className="account-preview login-account-preview-strong">
        <div>
          <span className="small-caps">Akun terpilih</span>
          <h3>{selectedAccount.name}</h3>
          <p>{selectedAccount.email}</p>
          <p>{selectedAccount.department}</p>
        </div>
        <span className="chip">{selectedAccount.role}</span>
      </div>

      <div className="institution-note login-proof-box" style={{ marginTop: 12 }}>
        <strong>Alur verifikasi prototype</strong>
        <div className="login-proof-list">
          <span><ShieldCheck size={14} /> Sekolah terdaftar</span>
          <span><BadgeCheck size={14} /> Peran pengguna dipilih</span>
          <span><KeyRound size={14} /> Kode akses: {selectedAccount.schoolCode}</span>
        </div>
      </div>

      <button className="google-auth-btn" onClick={onLogin}>
        <GoogleIcon />
        <span>Masuk sebagai {selectedAccount.role}</span>
      </button>
    </div>
  )
}