import { ArrowLeft, Building2, KeyRound, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import KindReachLogo from '../components/KindReachLogo'

function normalizeText(value) {
  return value.trim().toLowerCase().replace(/\s+/g, ' ')
}

function normalizeCode(value) {
  return value.trim().toUpperCase().replace(/\s+/g, '')
}

function findVerifiedAccount(accounts, institution, schoolName, fullName, accountCode) {
  const normalizedSchool = normalizeText(schoolName)
  const normalizedName = normalizeText(fullName)
  const normalizedCode = normalizeCode(accountCode)

  return accounts.find((account) => {
    const accountSchool = normalizeText(account.school || institution.name)
    const institutionSchool = normalizeText(institution.name)
    const schoolMatches = normalizedSchool === accountSchool || normalizedSchool === institutionSchool
    const nameMatches = normalizedName === normalizeText(account.name)
    const codeMatches = normalizedCode === normalizeCode(account.accountCode || '')

    return schoolMatches && nameMatches && codeMatches
  })
}

export default function LoginScreen({
  institution,
  accounts,
  onBack,
  onLogin,
}) {
  const [schoolName, setSchoolName] = useState('')
  const [selectedLoginAccountId, setSelectedLoginAccountId] = useState('')
  const [accountCode, setAccountCode] = useState('')
  const [loginError, setLoginError] = useState('')
  const availableAccounts = useMemo(
    () => accounts.filter((account) => account.role === 'Siswa'),
    [accounts]
  )
  const primaryAccount = availableAccounts[0] || accounts[0]

  const selectedNameAccount = useMemo(
    () => availableAccounts.find((account) => account.id === selectedLoginAccountId),
    [availableAccounts, selectedLoginAccountId]
  )
  const fullName = selectedNameAccount?.name || ''
  const verifiedAccount = useMemo(
    () => findVerifiedAccount(availableAccounts, institution, schoolName, fullName, accountCode),
    [accountCode, availableAccounts, fullName, institution, schoolName]
  )

  function handleSubmit(event) {
    event.preventDefault()

    if (!verifiedAccount) {
      setLoginError('Data akun belum cocok. Pastikan nama sekolah, nama lengkap, dan kode akun sesuai akses yang diberikan sekolah.')
      return
    }

    setLoginError('')
    onLogin(verifiedAccount)
  }

  function fillCredentials() {
    setLoginError('')

    if (!primaryAccount) {
      return
    }

    setSchoolName(primaryAccount.school || institution.name)
    setSelectedLoginAccountId(primaryAccount.id)
    setAccountCode(primaryAccount.accountCode || '')
  }

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
        <h2>Masuk ke akun KindReach</h2>
      </div>

      <form className="credential-login-form" onSubmit={handleSubmit}>
        <label>
          Nama sekolah
          <div className="inline-input-icon credential-input">
            <Building2 size={16} />
            <input
              value={schoolName}
              onChange={(event) => setSchoolName(event.target.value)}
              onPointerDown={fillCredentials}
              onFocus={fillCredentials}
              onClick={fillCredentials}
              readOnly
            />
          </div>
        </label>

        <label>
          Nama lengkap
          <div
            className="inline-input-icon credential-input"
            onPointerDown={fillCredentials}
          >
            <UserRound size={16} />
            <input
              value={fullName}
              onPointerDown={fillCredentials}
              onFocus={fillCredentials}
              onClick={fillCredentials}
              readOnly
            />
          </div>
        </label>

        <label>
          Kode akun
          <div
            className="inline-input-icon credential-input"
            onPointerDown={fillCredentials}
          >
            <KeyRound size={16} />
            <input
              value={accountCode}
              onPointerDown={fillCredentials}
              onFocus={fillCredentials}
              onClick={fillCredentials}
              readOnly
            />
          </div>
        </label>

        {loginError && <div className="report-inline-feedback error">{loginError}</div>}

        <button className="credential-login-btn" type="submit" disabled={!verifiedAccount}>
          Masuk ke KindReach
        </button>
      </form>
    </div>
  )
}
