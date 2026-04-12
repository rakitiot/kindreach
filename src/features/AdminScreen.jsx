import { ArrowLeft, CheckCircle2, Clock3, FileWarning, ShieldAlert, Users } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

const FILTERS = ['Semua', 'Menunggu verifikasi', 'Terverifikasi', 'Diproses', 'Selesai']

export default function AdminScreen({
  institution,
  user,
  reports,
  isReportMutationPending,
  activeReportId,
  onUpdateReportStatus,
  onBackToApp,
  onLogout,
}) {
  const [activeFilter, setActiveFilter] = useState('Semua')
  const [selectedCaseId, setSelectedCaseId] = useState(reports[0]?.id ?? null)

  const filteredReports = useMemo(() => {
    if (activeFilter === 'Semua') return reports
    return reports.filter((item) => item.status === activeFilter)
  }, [activeFilter, reports])

  useEffect(() => {
    if (filteredReports.length === 0) {
      setSelectedCaseId(null)
      return
    }

    const hasSelectedCase = filteredReports.some((item) => item.id === selectedCaseId)
    if (!hasSelectedCase) {
      setSelectedCaseId(filteredReports[0].id)
    }
  }, [filteredReports, selectedCaseId])

  const selectedCase = filteredReports.find((item) => item.id === selectedCaseId) || filteredReports[0] || null
  const isUpdatingSelectedCase = Boolean(selectedCase) && isReportMutationPending && activeReportId === selectedCase.id

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

      <div className="admin-header admin-command-header">
        <span className="small-caps mint">Admin Dashboard</span>
        <h2>Command center sekolah</h2>
        <p>
          {institution.name} • {institution.schoolCode} • dikelola oleh {user.name}
        </p>
      </div>

      <div className="admin-summary-grid">
        <div className="admin-summary-card">
          <FileWarning size={18} />
          <strong>{reports.length}</strong>
          <span>Total laporan</span>
        </div>
        <div className="admin-summary-card">
          <Clock3 size={18} />
          <strong>{reports.filter((c) => c.status === 'Menunggu verifikasi').length}</strong>
          <span>Perlu verifikasi</span>
        </div>
        <div className="admin-summary-card">
          <ShieldAlert size={18} />
          <strong>{reports.filter((c) => c.priority === 'Tinggi').length}</strong>
          <span>Prioritas tinggi</span>
        </div>
        <div className="admin-summary-card">
          <Users size={18} />
          <strong>4</strong>
          <span>Tim aktif</span>
        </div>
      </div>

      <div className="admin-filter-row">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className={`mini-action ${activeFilter === filter ? 'active-chip' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="admin-case-list">
        {filteredReports.length > 0 ? (
          filteredReports.map((item) => (
            <article
              key={item.id}
              className={`admin-case-card ${selectedCaseId === item.id ? 'selected' : ''}`}
              onClick={() => setSelectedCaseId(item.id)}
            >
              <div>
                <div className="admin-case-title-row">
                  <strong>{item.id}</strong>
                  <span className="chip">{item.priority}</span>
                </div>
                <p>{item.type}</p>
                <small>{item.place} • {item.createdAt}</small>
              </div>

              <span className="admin-case-status">{item.status}</span>
            </article>
          ))
        ) : (
          <div className="empty-state-card">
            <strong>Belum ada kasus pada filter ini</strong>
            <p>Begitu laporan baru masuk atau status berubah, daftar admin akan diperbarui di sini.</p>
          </div>
        )}
      </div>

      {selectedCase && (
        <div className="admin-detail-card">
          <div className="panel-head solid-bottom">
            <div>
              <span className="small-caps rose">Detail kasus</span>
              <h3>{selectedCase.type}</h3>
            </div>
            <span className="chip">{selectedCase.status}</span>
          </div>

          <div className="admin-detail-grid">
            <div>
              <strong>Pelapor</strong>
              <p>{selectedCase.reporterLabel} • {selectedCase.reporterRole}</p>
            </div>
            <div>
              <strong>Lokasi / kanal</strong>
              <p>{selectedCase.place}</p>
            </div>
            <div>
              <strong>Bukti</strong>
              <p>{selectedCase.evidenceName || 'Belum ada lampiran'}</p>
            </div>
            <div>
              <strong>Kronologi</strong>
              <p>{selectedCase.chronology}</p>
            </div>
          </div>

          <div className="admin-case-actions admin-actions-wide">
            <button disabled={isUpdatingSelectedCase} onClick={() => onUpdateReportStatus(selectedCase.id, 'Terverifikasi')}>
              <CheckCircle2 size={15} /> {isUpdatingSelectedCase ? 'Menyimpan...' : 'Verifikasi'}
            </button>
            <button disabled={isUpdatingSelectedCase} onClick={() => onUpdateReportStatus(selectedCase.id, 'Diproses')}>
              <ShieldAlert size={15} /> Proses
            </button>
            <button disabled={isUpdatingSelectedCase} onClick={() => onUpdateReportStatus(selectedCase.id, 'Selesai')}>
              <CheckCircle2 size={15} /> Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
