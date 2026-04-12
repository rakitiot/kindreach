const REPORTS_API_URL = 'http://localhost:4000/api/reports'
const DEFAULT_REPORT_STATUS = 'Menunggu verifikasi'
const REPORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

function formatReportTime(value) {
  if (!value) return 'Baru saja'

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return value
  }

  const day = String(parsed.getDate()).padStart(2, '0')
  const month = REPORT_MONTHS[parsed.getMonth()]
  const hours = String(parsed.getHours()).padStart(2, '0')
  const minutes = String(parsed.getMinutes()).padStart(2, '0')

  return `${day} ${month} • ${hours}:${minutes}`
}

function getReportTimestamp(report) {
  const parsed = new Date(report.createdAtRaw || report.createdAt)
  const time = parsed.getTime()
  return Number.isNaN(time) ? 0 : time
}

async function requestJson(url, options) {
  const response = await fetch(url, options)
  let payload = null

  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok) {
    throw new Error(payload?.message || 'Gagal terhubung ke server laporan.')
  }

  return payload
}

export function normalizeReport(report = {}) {
  const createdAtRaw = report.createdAtRaw || report.createdAt || new Date().toISOString()
  const anonymousMode = typeof report.anonymousMode === 'boolean' ? report.anonymousMode : true

  return {
    id: report.id || `KR-DEMO-${Date.now()}`,
    type: report.type || 'Belum dikategorikan',
    place: report.place || 'Lokasi belum ditambahkan',
    status: report.status || DEFAULT_REPORT_STATUS,
    priority: report.priority || 'Sedang',
    reporterRole: report.reporterRole || 'Saksi',
    reporterLabel: report.reporterLabel || (anonymousMode ? 'Anonim' : 'Pelapor dikenali sekolah'),
    chronology: report.chronology || '',
    evidenceName: report.evidenceName || '',
    anonymousMode,
    createdAtRaw,
    createdAt: formatReportTime(createdAtRaw),
  }
}

export function sortReportsNewestFirst(reports) {
  return [...reports].sort((left, right) => getReportTimestamp(right) - getReportTimestamp(left))
}

export function normalizeReports(reports = []) {
  return sortReportsNewestFirst(reports.map((report) => normalizeReport(report)))
}

export async function fetchReports() {
  const reports = await requestJson(REPORTS_API_URL)
  return normalizeReports(reports)
}

export async function createReport(reportDraft) {
  const report = await requestJson(REPORTS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reportDraft),
  })

  return normalizeReport(report)
}

export async function updateReportStatus(reportId, status) {
  const report = await requestJson(`${REPORTS_API_URL}/${reportId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })

  return normalizeReport(report)
}

export function createDemoReport(reportDraft) {
  return normalizeReport({
    ...reportDraft,
    id: `KR-DEMO-${Date.now()}`,
    status: DEFAULT_REPORT_STATUS,
    createdAtRaw: new Date().toISOString(),
  })
}
