import { ArrowLeft, CheckCircle2, Clock3, FileWarning, ShieldAlert, Users } from 'lucide-react'
import { useState } from 'react'

const initialCases = [
  {
    id: 'CAS-001',
    reporter: 'Anonim',
    type: 'Verbal Bullying',
    location: 'Grup kelas online',
    status: 'Menunggu verifikasi',
  },
  {
    id: 'CAS-002',
    reporter: 'Anonim',
    type: 'Intimidasi',
    location: 'Koridor sekolah',
    status: 'Diproses',
  },
]

export default function AdminScreen({ user, onBackToApp, onLogout }) {
  const [cases, setCases] = useState(initialCases)

  const updateCaseStatus = (id, status) => {
    setCases((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    )
  }

  return (
    <div className="phone-page admin-page">
      <div className="admin-topbar">
        <button className="ghost-back" onClick={onBackToApp}>
          <ArrowLeft size={18} />
        </button>
        <button className="logout-btn" onClick={onLogout}>
          Keluar
        </button>
      </div>

      <div className="admin-header">
        <span className="small-caps mint">Admin Dashboard</span>
        <h2>Tim Penanganan Sekolah</h2>
        <p>
          Kelola laporan masuk, validasi kasus, dan tindak lanjuti penanganan secara terstruktur.
        </p>
      </div>

      <div className="admin-summary-grid">
        <div className="admin-summary-card">
          <FileWarning size={18} />
          <strong>{cases.length}</strong>
          <span>Laporan masuk</span>
        </div>
        <div className="admin-summary-card">
          <Clock3 size={18} />
          <strong>{cases.filter((c) => c.status === 'Menunggu verifikasi').length}</strong>
          <span>Menunggu verifikasi</span>
        </div>
        <div className="admin-summary-card">
          <ShieldAlert size={18} />
          <strong>{cases.filter((c) => c.status === 'Diproses').length}</strong>
          <span>Diproses</span>
        </div>
        <div className="admin-summary-card">
          <Users size={18} />
          <strong>4</strong>
          <span>Tim aktif</span>
        </div>
      </div>

      <div className="admin-case-list">
        {cases.map((item) => (
          <article key={item.id} className="admin-case-card">
            <div>
              <strong>{item.id}</strong>
              <p>{item.type}</p>
              <small>{item.location}</small>
            </div>

            <span className="admin-case-status">{item.status}</span>

            <div className="admin-case-actions">
              <button onClick={() => updateCaseStatus(item.id, 'Terverifikasi')}>
                <CheckCircle2 size={15} /> Verifikasi
              </button>
              <button onClick={() => updateCaseStatus(item.id, 'Diproses')}>
                <ShieldAlert size={15} /> Proses
              </button>
              <button onClick={() => updateCaseStatus(item.id, 'Selesai')}>
                <CheckCircle2 size={15} /> Selesai
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}