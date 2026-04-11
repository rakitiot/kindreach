const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

const dbPath = path.join(__dirname, 'db.json')

const readDb = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
const writeDb = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))

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
  const institution = db.institutions.find((i) => i.code === req.body.code)
  if (!institution) {
    return res.status(404).json({ message: 'Kode sekolah tidak ditemukan' })
  }
  res.json({ success: true, institution })
})

app.get('/api/reports', (req, res) => {
  const db = readDb()
  res.json(db.reports)
})

app.post('/api/reports', (req, res) => {
  const db = readDb()
  const report = {
    id: `REP-${Date.now()}`,
    status: 'Menunggu verifikasi',
    createdAt: new Date().toISOString(),
    ...req.body,
  }
  db.reports.push(report)
  writeDb(db)
  res.json(report)
})

app.patch('/api/reports/:id', (req, res) => {
  const db = readDb()
  db.reports = db.reports.map((r) =>
    r.id === req.params.id ? { ...r, ...req.body } : r
  )
  writeDb(db)
  res.json({ success: true })
})

app.listen(4000, () => {
  console.log('Backend running on http://localhost:4000')
})