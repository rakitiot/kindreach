import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Download,
  KeyRound,
  Mail,
  MapPin,
  ShieldCheck,
  UploadCloud,
  UserRound,
  UsersRound,
} from 'lucide-react'
import { useState } from 'react'

export default function InstitutionAccessScreen({ institution, onBack, onContinue }) {
  const [institutionName, setInstitutionName] = useState(institution.name)
  const [adminName, setAdminName] = useState(institution.adminName)
  const [schoolCode, setSchoolCode] = useState(institution.schoolCode)
  const [province, setProvince] = useState('Jawa Barat')
  const [institutionEmail, setInstitutionEmail] = useState('admin@smaharmoni.sch.id')
  const [counselorOne, setCounselorOne] = useState('Dinda Maharani')
  const [counselorTwo, setCounselorTwo] = useState('Andi Pratama')
  const [extraCounselors, setExtraCounselors] = useState('')
  const [studentRosterFile, setStudentRosterFile] = useState('')

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
        <h2>Silakan isi biodata sekolah</h2>
        <p>
          Data ini digunakan untuk menyiapkan akses admin sekolah, guru BK, dan siswa
          di KindReach agar pelaporan dan tindak lanjut berada dalam satu ruang aman sekolah.
        </p>
      </div>

      <div className="institution-card">
        <span className="institution-section-label">Data sekolah</span>

        <label>
          Nama institusi
          <div className="inline-input-icon">
            <Building2 size={16} />
            <input value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} />
          </div>
        </label>

        <label>
          Provinsi
          <div className="inline-input-icon">
            <MapPin size={16} />
            <input value={province} onChange={(e) => setProvince(e.target.value)} />
          </div>
        </label>

        <label>
          Email institusi
          <div className="inline-input-icon">
            <Mail size={16} />
            <input type="email" value={institutionEmail} onChange={(e) => setInstitutionEmail(e.target.value)} />
          </div>
        </label>

        <span className="institution-section-label">Tim pengelola</span>

        <label>
          Nama admin sekolah
          <div className="inline-input-icon">
            <UserRound size={16} />
            <input value={adminName} onChange={(e) => setAdminName(e.target.value)} />
          </div>
        </label>

        <label>
          Nama Guru BK 1
          <div className="inline-input-icon">
            <UsersRound size={16} />
            <input value={counselorOne} onChange={(e) => setCounselorOne(e.target.value)} />
          </div>
        </label>

        <label>
          Nama Guru BK 2
          <div className="inline-input-icon">
            <UsersRound size={16} />
            <input value={counselorTwo} onChange={(e) => setCounselorTwo(e.target.value)} />
          </div>
        </label>

        <label>
          Guru BK tambahan (opsional)
          <div className="inline-input-icon">
            <UsersRound size={16} />
            <input value={extraCounselors} onChange={(e) => setExtraCounselors(e.target.value)} placeholder="Tambah jika ada" />
          </div>
        </label>

        <label>
          Kode sekolah
          <div className="inline-input-icon">
            <KeyRound size={16} />
            <input value={schoolCode} onChange={(e) => setSchoolCode(e.target.value.toUpperCase())} />
          </div>
        </label>

        <div className="institution-upload-group">
          <span>Data siswa</span>
          <div className="institution-file-row">
            <a className="institution-template-link" href="/templates/template-data-siswa.xls" download>
              <Download size={15} />
              Unduh template Excel
            </a>
          </div>
          <label className="institution-file-drop">
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => setStudentRosterFile(e.target.files?.[0]?.name || '')}
            />
            <UploadCloud size={18} />
            <span>
              <strong>{studentRosterFile || 'Unggah file Excel data siswa'}</strong>
              <small>{studentRosterFile ? 'File siap dilampirkan ke registrasi.' : 'Format diterima: .xlsx, .xls, atau .csv'}</small>
            </span>
          </label>
        </div>

        <div className="institution-preview-card">
          <div>
            <span className="small-caps">Preview akses</span>
            <strong>{institutionName}</strong>
            <p>{province} - Admin sekolah: {adminName}</p>
            <p>Email tujuan: {institutionEmail}</p>
          </div>
          <span className="chip">{schoolCode}</span>
        </div>

        <button
          className="institution-primary-btn"
          onClick={() => onContinue({ institutionName, adminName, schoolCode })}
        >
          <ShieldCheck size={16} />
          Ajukan registrasi institusi
        </button>
      </div>

      <div className="institution-note">
        <strong>Informasi pengiriman akun</strong>
        <p>
          Kode akun admin sekolah, kode akun guru BK, dan akun siswa akan dikirim melalui
          email institusi setelah data diverifikasi.
        </p>
        <div className="institution-check-row">
          <span><CheckCircle2 size={14} /> Akun admin sekolah</span>
          <span><CheckCircle2 size={14} /> Akun guru BK</span>
          <span><CheckCircle2 size={14} /> Akun siswa</span>
        </div>
      </div>
    </div>
  )
}
