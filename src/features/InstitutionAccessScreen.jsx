import { ArrowLeft, Building2, KeyRound, ShieldCheck, UserRound } from 'lucide-react'
import { useState } from 'react'

export default function InstitutionAccessScreen({ onBack, onContinue }) {
  const [institutionName, setInstitutionName] = useState('SMA Harmoni Nusantara')
  const [adminName, setAdminName] = useState('Raka Aditya')
  const [schoolCode, setSchoolCode] = useState('HN-2026')

  return (
    <div className="phone-page institution-page">
      <button className="ghost-back" onClick={onBack}>
        <ArrowLeft size={18} />
      </button>

      <div className="institution-header">
        <div className="institution-icon-tile">
          <Building2 size={30} />
        </div>
        <span className="small-caps mint">Registrasi Institusi</span>
        <h2>Daftarkan sekolah sebagai admin pusat</h2>
        <p>
          Registrasi institusi digunakan agar data warga sekolah, laporan,
          dan tindak lanjut dapat dikelola dalam satu ekosistem KindReach.
        </p>
      </div>

      <div className="institution-card">
        <label>
          Nama institusi
          <input
            value={institutionName}
            onChange={(e) => setInstitutionName(e.target.value)}
          />
        </label>

        <label>
          Nama admin sekolah
          <div className="inline-input-icon">
            <UserRound size={16} />
            <input
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
            />
          </div>
        </label>

        <label>
          Kode sekolah
          <div className="inline-input-icon">
            <KeyRound size={16} />
            <input
              value={schoolCode}
              onChange={(e) => setSchoolCode(e.target.value)}
            />
          </div>
        </label>

        <button className="institution-primary-btn" onClick={onContinue}>
          <ShieldCheck size={16} />
          Selesaikan registrasi
        </button>
      </div>

      <div className="institution-note">
        <strong>Catatan</strong>
        <p>
          Setelah institusi terverifikasi, siswa dan guru dapat masuk menggunakan
          akses yang tervalidasi oleh pihak sekolah.
        </p>
      </div>
    </div>
  )
}