const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const dbPath = path.join(__dirname, 'db.json')
const validReportStatuses = new Set(['Menunggu verifikasi', 'Terverifikasi', 'Diproses', 'Selesai'])
const validPriorities = new Set(['Tinggi', 'Sedang', 'Rendah'])

app.use(cors())
app.use(express.json())

function readDb() {
  const raw = fs.readFileSync(dbPath, 'utf-8')
  const db = JSON.parse(raw)

  return {
    institutions: Array.isArray(db.institutions) ? db.institutions : [],
    reports: Array.isArray(db.reports) ? db.reports : [],
  }
}

function writeDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
}

function cleanText(value, fallback = '') {
  if (typeof value !== 'string') return fallback
  const trimmed = value.trim()
  return trimmed || fallback
}

function getReportTimestamp(report) {
  const parsed = new Date(report.createdAt)
  const time = parsed.getTime()
  return Number.isNaN(time) ? 0 : time
}

function sortReportsNewestFirst(reports) {
  return [...reports].sort((left, right) => getReportTimestamp(right) - getReportTimestamp(left))
}

function normalizeReportPayload(payload = {}, existingReport = {}) {
  const anonymousMode =
    typeof payload.anonymousMode === 'boolean'
      ? payload.anonymousMode
      : typeof existingReport.anonymousMode === 'boolean'
        ? existingReport.anonymousMode
        : true

  return {
    type: cleanText(payload.type, existingReport.type || 'Belum dikategorikan'),
    place: cleanText(payload.place, existingReport.place || 'Lokasi belum ditambahkan'),
    priority: validPriorities.has(payload.priority) ? payload.priority : existingReport.priority || 'Sedang',
    reporterRole: cleanText(payload.reporterRole, existingReport.reporterRole || 'Saksi'),
    reporterLabel: cleanText(
      payload.reporterLabel,
      existingReport.reporterLabel || (anonymousMode ? 'Anonim' : 'Pelapor dikenali sekolah')
    ),
    chronology: cleanText(payload.chronology, existingReport.chronology || ''),
    evidenceName: cleanText(payload.evidenceName, existingReport.evidenceName || ''),
    anonymousMode,
  }
}

app.get('/api/institutions', (req, res) => {
  const db = readDb()
  res.json(db.institutions)
})

app.post('/api/institutions', (req, res) => {
  const db = readDb()
  const newInstitution = {
    id: `SCH-${Date.now()}`,
    ...req.body,
  }

  db.institutions.push(newInstitution)
  writeDb(db)
  res.json(newInstitution)
})

app.post('/api/login/access-code', (req, res) => {
  const db = readDb()
  const institution = db.institutions.find((item) => item.code === req.body.code)

  if (!institution) {
    return res.status(404).json({ message: 'Kode sekolah tidak ditemukan' })
  }

  res.json({ success: true, institution })
})

app.get('/api/reports', (req, res) => {
  const db = readDb()
  res.json(sortReportsNewestFirst(db.reports))
})

app.post('/api/reports', (req, res) => {
  const db = readDb()
  const report = {
    id: `REP-${Date.now()}`,
    status: 'Menunggu verifikasi',
    createdAt: new Date().toISOString(),
    ...normalizeReportPayload(req.body),
  }

  db.reports = sortReportsNewestFirst([report, ...db.reports])
  writeDb(db)
  res.status(201).json(report)
})

app.patch('/api/reports/:id', (req, res) => {
  const db = readDb()
  const reportIndex = db.reports.findIndex((item) => item.id === req.params.id)

  if (reportIndex === -1) {
    return res.status(404).json({ message: 'Laporan tidak ditemukan' })
  }

  const currentReport = db.reports[reportIndex]
  const nextStatus = validReportStatuses.has(req.body.status) ? req.body.status : currentReport.status
  const updatedReport = {
    ...currentReport,
    ...normalizeReportPayload(req.body, currentReport),
    status: nextStatus,
  }

  db.reports[reportIndex] = updatedReport
  writeDb(db)
  res.json(updatedReport)
})

app.listen(4000, () => {
  console.log('Backend running on http://localhost:4000')
})
