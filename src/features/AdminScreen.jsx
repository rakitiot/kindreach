import {
  ArrowLeft,
  ArrowUpDown,
  CheckCircle2,
  Clock3,
  FileWarning,
  NotebookPen,
  Search,
  ShieldAlert,
  Users,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

const FILTERS = ['Semua', 'Menunggu verifikasi', 'Terverifikasi', 'Diproses', 'Selesai']
const SORT_OPTIONS = [
  { value: 'terbaru', label: 'Terbaru' },
  { value: 'priority', label: 'Prioritas' },
  { value: 'status', label: 'Status' },
]
const STATUS_ORDER = ['Menunggu verifikasi', 'Terverifikasi', 'Diproses', 'Selesai']
const STATUS_MILESTONES = [
  {
    status: 'Terverifikasi',
    label: 'Laporan diverifikasi staf sekolah',
    detail: 'Kasus lolos verifikasi awal dan siap masuk penanganan.',
  },
  {
    status: 'Diproses',
    label: 'Kasus masuk tahap penanganan',
    detail: 'Tim sekolah mulai melakukan koordinasi dan tindak lanjut.',
  },
  {
    status: 'Selesai',
    label: 'Kasus ditutup sebagai selesai',
    detail: 'Penanganan dinyatakan tuntas dan arsip kasus diperbarui.',
  },
]

function getStaffPermissions(user) {
  return {
    canVerify: user.staffPermissions?.canVerify ?? user.role === 'Guru BK',
    canProcess: user.staffPermissions?.canProcess ?? user.role === 'Guru BK',
    canComplete: user.staffPermissions?.canComplete ?? user.role === 'Admin Sekolah',
  }
}

function getPriorityRank(priority) {
  if (priority === 'Tinggi') return 0
  if (priority === 'Sedang') return 1
  return 2
}

function getStatusRank(status) {
  const statusIndex = STATUS_ORDER.indexOf(status)
  return statusIndex === -1 ? STATUS_ORDER.length : statusIndex
}

function formatCaseTimestamp(value) {
  if (!value) return 'Tahap aktif'

  const parsedDate = new Date(value)
  if (Number.isNaN(parsedDate.getTime())) {
    return value
  }

  return parsedDate.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).replace('.', ':')
}

function buildCaseTimeline(report, extraActivities) {
  const activities = extraActivities || []
  const loggedStatuses = new Set(
    activities
      .filter((item) => item.type === 'status' && item.status)
      .map((item) => item.status)
  )
  const currentStatusIndex = getStatusRank(report.status)

  const baseTimeline = [
    {
      id: `created-${report.id}`,
      label: 'Laporan diterima sistem',
      detail: `${report.reporterLabel} mengirim laporan ${report.type} di ${report.place}.`,
      at: report.createdAt,
      type: 'base',
    },
    ...STATUS_MILESTONES.filter((item) => getStatusRank(item.status) <= currentStatusIndex && !loggedStatuses.has(item.status)).map((item) => ({
      ...item,
      id: `base-${report.id}-${item.status}`,
      at: item.status === report.status ? 'Tahap aktif' : 'Tahap terdokumentasi',
      type: 'base',
    })),
  ]

  const staffTimeline = activities.map((item) => ({
    id: item.id,
    label: item.label,
    detail: item.actor ? `${item.detail} ${item.actor}` : item.detail,
    at: item.at,
    type: item.type,
  }))

  return [...baseTimeline, ...staffTimeline]
}

function getActionHint(selectedCase, permissions) {
  if (!selectedCase) {
    return ''
  }

  if (permissions.canVerify || permissions.canProcess) {
    if (selectedCase.status === 'Menunggu verifikasi') {
      return 'Guru BK dapat memverifikasi laporan ini untuk memulai penanganan awal.'
    }

    if (selectedCase.status === 'Terverifikasi') {
      return 'Laporan sudah diverifikasi. Langkah berikutnya adalah memindahkannya ke tahap Diproses.'
    }

    if (selectedCase.status === 'Diproses') {
      return 'Kasus sedang diproses. Finalisasi akhir dilakukan oleh Admin Sekolah setelah tindak lanjut selesai.'
    }

    return 'Kasus sudah selesai dan tersimpan sebagai arsip penanganan sekolah.'
  }

  if (permissions.canComplete) {
    if (selectedCase.status === 'Diproses') {
      return 'Admin Sekolah dapat menandai kasus ini sebagai selesai setelah tindak lanjut dinyatakan tuntas.'
    }

    if (selectedCase.status === 'Menunggu verifikasi' || selectedCase.status === 'Terverifikasi') {
      return 'Tahap awal ditangani Guru BK. Admin Sekolah memantau kasus sampai siap difinalisasi.'
    }

    return 'Kasus sudah selesai dan dapat dipantau sebagai referensi tindak lanjut berikutnya.'
  }

  return ''
}

export default function AdminScreen({
  institution,
  user,
  reports,
  staffCaseNotes,
  staffCaseActivity,
  isReportMutationPending,
  activeReportId,
  onUpdateReportStatus,
  onSaveStaffCaseNote,
  onLogout,
}) {
  const [activeFilter, setActiveFilter] = useState('Semua')
  const [selectedCaseId, setSelectedCaseId] = useState(reports[0]?.id ?? null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortMode, setSortMode] = useState('terbaru')
  const [noteDraft, setNoteDraft] = useState('')
  const permissions = getStaffPermissions(user)
  const roleActionCopy = permissions.canComplete
    ? 'Memantau keseluruhan kasus dan menutup tindak lanjut yang sudah diproses.'
    : 'Memverifikasi laporan masuk, memberi catatan awal, dan memulai penanganan bersama tim sekolah.'

  const filteredReports = useMemo(() => {
    if (activeFilter === 'Semua') return reports
    return reports.filter((item) => item.status === activeFilter)
  }, [activeFilter, reports])

  const visibleReports = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    const nextReports = filteredReports.filter((item) => {
      if (!normalizedQuery) return true

      const searchableText = [
        item.id,
        item.type,
        item.place,
        item.reporterRole,
        item.reporterLabel,
        item.chronology,
      ]
        .join(' ')
        .toLowerCase()

      return searchableText.includes(normalizedQuery)
    })

    if (sortMode === 'priority') {
      return [...nextReports].sort((left, right) => getPriorityRank(left.priority) - getPriorityRank(right.priority))
    }

    if (sortMode === 'status') {
      return [...nextReports].sort((left, right) => getStatusRank(left.status) - getStatusRank(right.status))
    }

    return nextReports
  }, [filteredReports, searchQuery, sortMode])

  useEffect(() => {
    if (visibleReports.length === 0) {
      setSelectedCaseId(null)
      return
    }

    const hasSelectedCase = visibleReports.some((item) => item.id === selectedCaseId)
    if (!hasSelectedCase) {
      setSelectedCaseId(visibleReports[0].id)
    }
  }, [visibleReports, selectedCaseId])

  const selectedCase = visibleReports.find((item) => item.id === selectedCaseId) || visibleReports[0] || null
  const selectedCaseNote = selectedCase ? staffCaseNotes[selectedCase.id] : null
  const selectedCaseTimeline = selectedCase
    ? buildCaseTimeline(selectedCase, staffCaseActivity[selectedCase.id])
    : []
  const isUpdatingSelectedCase = Boolean(selectedCase) && isReportMutationPending && activeReportId === selectedCase.id
  const canVerifySelectedCase = Boolean(selectedCase) && permissions.canVerify && selectedCase.status === 'Menunggu verifikasi'
  const canProcessSelectedCase = Boolean(selectedCase) && permissions.canProcess && selectedCase.status === 'Terverifikasi'
  const canCompleteSelectedCase = Boolean(selectedCase) && permissions.canComplete && selectedCase.status === 'Diproses'
  const actionHint = getActionHint(selectedCase, permissions)

  useEffect(() => {
    setNoteDraft(selectedCaseNote?.body || '')
  }, [selectedCase?.id, selectedCaseNote?.body])

  function handleSaveNote() {
    if (!selectedCase) {
      return
    }

    onSaveStaffCaseNote(selectedCase.id, noteDraft)
  }

  return (
    <div className="phone-page admin-page">
      <div className="admin-topbar admin-topbar-end">
        <button className="logout-btn" onClick={onLogout} aria-label="Keluar dari dashboard staf">
          <ArrowLeft size={18} />
        </button>
      </div>

      <div className="admin-header admin-command-header">
        <span className="small-caps mint">Dashboard Staf Sekolah</span>
        <h2>Command center sekolah</h2>
        <p>
          {institution.name} • {institution.schoolCode} • akses aktif: {user.role}
        </p>
        <div className="admin-role-summary">
          <span className="chip">{user.name}</span>
          <p>{roleActionCopy}</p>
        </div>
      </div>

      <div className="admin-summary-grid">
        <div className="admin-summary-card admin-summary-highlight">
          <FileWarning size={18} />
          <strong>{reports.length}</strong>
          <span>Total laporan</span>
        </div>
        <div className="admin-summary-card">
          <Clock3 size={18} />
          <strong>{reports.filter((item) => item.status === 'Menunggu verifikasi').length}</strong>
          <span>Perlu verifikasi</span>
        </div>
        <div className="admin-summary-card">
          <ShieldAlert size={18} />
          <strong>{reports.filter((item) => item.status === 'Diproses').length}</strong>
          <span>Sedang diproses</span>
        </div>
        <div className="admin-summary-card">
          <Users size={18} />
          <strong>{reports.filter((item) => item.priority === 'Tinggi').length}</strong>
          <span>Prioritas tinggi</span>
        </div>
      </div>

      <div className="admin-toolbar-card">
        <label className="admin-search-field">
          <Search size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Cari ID, jenis kejadian, lokasi, atau pelapor"
          />
        </label>

        <label className="admin-sort-field">
          <ArrowUpDown size={16} />
          <select value={sortMode} onChange={(event) => setSortMode(event.target.value)} aria-label="Urutkan daftar kasus">
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
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
        {visibleReports.length > 0 ? (
          visibleReports.map((item) => (
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
            <strong>Belum ada kasus yang cocok</strong>
            <p>Ubah filter, pencarian, atau pengurutan untuk melihat daftar kasus lainnya.</p>
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

          <div className="admin-action-hint">
            <strong>Langkah berikutnya</strong>
            <p>{actionHint}</p>
          </div>

          <div className="admin-case-actions admin-actions-wide">
            <button
              disabled={isUpdatingSelectedCase || !canVerifySelectedCase}
              onClick={() => onUpdateReportStatus(selectedCase.id, 'Terverifikasi')}
            >
              <CheckCircle2 size={15} /> {isUpdatingSelectedCase ? 'Menyimpan...' : 'Verifikasi'}
            </button>
            <button
              disabled={isUpdatingSelectedCase || !canProcessSelectedCase}
              onClick={() => onUpdateReportStatus(selectedCase.id, 'Diproses')}
            >
              <ShieldAlert size={15} /> Proses
            </button>
            <button
              disabled={isUpdatingSelectedCase || !canCompleteSelectedCase}
              onClick={() => onUpdateReportStatus(selectedCase.id, 'Selesai')}
            >
              <CheckCircle2 size={15} /> Selesai
            </button>
          </div>

          <div className="admin-timeline-card">
            <div className="admin-section-head">
              <Clock3 size={16} />
              <strong>Riwayat penanganan</strong>
            </div>
            <div className="admin-timeline-list">
              {selectedCaseTimeline.map((item) => (
                <article key={item.id} className={`admin-timeline-item ${item.type === 'note' ? 'is-note' : ''}`}>
                  <span className="admin-timeline-dot" aria-hidden="true" />
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.detail}</p>
                    <small>{formatCaseTimestamp(item.at)}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="admin-note-card">
            <div className="admin-section-head">
              <NotebookPen size={16} />
              <strong>Catatan tindak lanjut</strong>
            </div>
            <textarea
              value={noteDraft}
              onChange={(event) => setNoteDraft(event.target.value)}
              placeholder="Tulis ringkasan tindak lanjut, koordinasi, atau langkah berikutnya untuk kasus ini."
            />
            {selectedCaseNote && (
              <p className="admin-note-meta">
                Terakhir diperbarui oleh {selectedCaseNote.updatedBy} ({selectedCaseNote.updatedRole}) • {formatCaseTimestamp(selectedCaseNote.updatedAt)}
              </p>
            )}
            <button
              type="button"
              className="mini-action admin-note-save"
              disabled={!noteDraft.trim() || noteDraft.trim() === (selectedCaseNote?.body || '').trim()}
              onClick={handleSaveNote}
            >
              Simpan catatan
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
