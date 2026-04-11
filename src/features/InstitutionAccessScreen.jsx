import { ArrowLeft, Building2, CheckCircle2, KeyRound, ShieldCheck, UserRound } from 'lucide-react'
import { useState } from 'react'

export default function InstitutionAccessScreen({ institution, onBack, onContinue }) {
  const [institutionName, setInstitutionName] = useState(institution.name)
  const [adminName, setAdminName] = useState(institution.adminName)
  const [schoolCode, setSchoolCode] = useState(institution.schoolCode)

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
          Halaman ini merepresentasikan proses sekolah bergabung ke ekosistem KindReach
          agar kode akses, laporan, dan tindak lanjut berada dalam satu sistem sekolah.
        </p>
      </div>

      <div className="institution-card">
        <label>
          Nama institusi
          <input value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} />
        </label>

        <label>
          Nama admin sekolah
          <div className="inline-input-icon">
            <UserRound size={16} />
            <input value={adminName} onChange={(e) => setAdminName(e.target.value)} />
          </div>
        </label>

        <label>
          Kode sekolah
          <div className="inline-input-icon">
            <KeyRound size={16} />
            <input value={schoolCode} onChange={(e) => setSchoolCode(e.target.value.toUpperCase())} />
          </div>
        </label>

        <div className="institution-preview-card">
          <div>
            <span className="small-caps">Preview akses</span>
            <strong>{institutionName}</strong>
            <p>Admin sekolah: {adminName}</p>
          </div>
          <span className="chip">{schoolCode}</span>
        </div>

        <button
          className="institution-primary-btn"
          onClick={() => onContinue({ institutionName, adminName, schoolCode })}
        >
          <ShieldCheck size={16} />
          Selesaikan registrasi
        </button>
      </div>

      <div className="institution-note">
        <strong>Status prototype</strong>
        <p>
          Setelah institusi aktif, siswa dan guru akan masuk menggunakan kode sekolah yang sama.
        </p>
        <div className="institution-check-row">
          <span><CheckCircle2 size={14} /> Kode sekolah tervalidasi</span>
          <span><CheckCircle2 size={14} /> Admin pusat siap mengelola laporan</span>
        </div>
      </div>
    </div>
  )
}