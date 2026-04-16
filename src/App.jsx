import { useCallback, useEffect, useMemo, useState } from 'react'
import LayoutShell from './components/LayoutShell'
import PhoneFrame from './components/phone/PhoneFrame'
import HomeScreen from './features/HomeScreen'
import LoginScreen from './features/LoginScreen'
import WelcomeScreen from './features/WelcomeScreen'
import AppScreen, { SosScreen } from './features/AppScreen'
import InstitutionAccessScreen from './features/InstitutionAccessScreen'
import AdminScreen from './features/AdminScreen'
import SplashScreen from './features/SplashScreen'
import { initialReports, loginAccounts } from './data/appData.jsx'
import {
  createDemoReport,
  createReport,
  fetchReports,
  normalizeReports,
  sortReportsNewestFirst,
  updateReportStatus,
} from './lib/reportApi.js'

const DESKTOP_ZOOM_LOCK_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 900px)'
const STAGE_TRANSITION_MS = 360
const STAGE_ORDER = ['outside', 'splash', 'welcome', 'institution', 'login', 'app', 'admin']

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function getAccountCodePrefix(accountId) {
  if (accountId === 'admin') return 'ADM'
  if (accountId === 'teacher') return 'BK'

  return 'SIS'
}

function buildAccountCode(accountId, schoolCode) {
  return `${getAccountCodePrefix(accountId)}-${schoolCode}`
}

export default function App() {
  const [stage, setStage] = useState('outside')
  const [stageTransition, setStageTransition] = useState(null)
  const [showGlobalSosScreen, setShowGlobalSosScreen] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [selectedAccountId, setSelectedAccountId] = useState('student')
  const [accounts, setAccounts] = useState(loginAccounts)
  const [reports, setReports] = useState(() => normalizeReports(initialReports))
  const [isReportMutationPending, setIsReportMutationPending] = useState(false)
  const [activeReportId, setActiveReportId] = useState(null)
  const [staffCaseNotes, setStaffCaseNotes] = useState({})
  const [staffCaseActivity, setStaffCaseActivity] = useState({})
  const [institution, setInstitution] = useState({
    name: 'SMA Harmoni Nusantara',
    adminName: 'Raka Aditya',
    schoolCode: 'HN-2026',
    verificationLabel: 'Terverifikasi oleh sekolah',
  })

  const selectedUser = useMemo(() => {
    return accounts.find((item) => item.id === selectedAccountId) || accounts[0]
  }, [accounts, selectedAccountId])

  const navigateStage = useCallback((nextStage, directionOverride) => {
    if (stage === nextStage) {
      return
    }

    const currentIndex = STAGE_ORDER.indexOf(stage)
    const nextIndex = STAGE_ORDER.indexOf(nextStage)
    const inferredDirection = currentIndex >= 0 && nextIndex >= 0 && nextIndex < currentIndex ? 'back' : 'forward'
    const direction = directionOverride || inferredDirection

    setStageTransition({
      from: stage,
      to: nextStage,
      direction,
      id: `${stage}-${nextStage}-${Date.now()}`,
    })

    setStage(nextStage)
  }, [stage])

  useEffect(() => {
    if (stage !== 'splash') return

    const timer = setTimeout(() => {
      navigateStage('welcome', 'forward')
    }, 4200)

    return () => clearTimeout(timer)
  }, [navigateStage, stage])

  useEffect(() => {
    if (!stageTransition) return

    const timer = setTimeout(() => {
      setStageTransition((currentTransition) =>
        currentTransition?.id === stageTransition.id ? null : currentTransition
      )
    }, STAGE_TRANSITION_MS)

    return () => clearTimeout(timer)
  }, [stageTransition])

  useEffect(() => {
    const root = document.documentElement
    const desktopQuery = window.matchMedia(DESKTOP_ZOOM_LOCK_QUERY)
    const initialDpr = window.devicePixelRatio || 1
    const baseDpr = initialDpr <= 1.35 ? 1 : initialDpr
    let frameId = 0

    function updateZoomLock() {
      if (!desktopQuery.matches) {
        root.style.setProperty('--kr-browser-zoom-lock', '1')
        return
      }

      const currentDpr = window.devicePixelRatio || baseDpr
      const zoomFactor = currentDpr / baseDpr
      const inverseScale = clampNumber(1 / zoomFactor, 0.72, 1.12)

      root.style.setProperty('--kr-browser-zoom-lock', inverseScale.toFixed(4))
    }

    function scheduleZoomLockUpdate() {
      window.cancelAnimationFrame(frameId)
      frameId = window.requestAnimationFrame(updateZoomLock)
    }

    updateZoomLock()
    window.addEventListener('resize', scheduleZoomLockUpdate)
    window.visualViewport?.addEventListener('resize', scheduleZoomLockUpdate)
    desktopQuery.addEventListener('change', scheduleZoomLockUpdate)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', scheduleZoomLockUpdate)
      window.visualViewport?.removeEventListener('resize', scheduleZoomLockUpdate)
      desktopQuery.removeEventListener('change', scheduleZoomLockUpdate)
      root.style.removeProperty('--kr-browser-zoom-lock')
    }
  }, [])

  useEffect(() => {
    if (stage !== 'app' && stage !== 'admin') return

    let cancelled = false

    async function syncReports() {
      try {
        const nextReports = await fetchReports()
        if (cancelled) return

        setReports(nextReports)
      } catch {
        if (cancelled) return

        setReports((prev) => (prev.length > 0 ? prev : normalizeReports(initialReports)))
      }
    }

    syncReports()

    return () => {
      cancelled = true
    }
  }, [stage])

  function rewardActiveUser(points) {
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === selectedAccountId
          ? { ...account, points: account.points + points }
          : account
      )
    )
  }

  function handleRegisterInstitution(payload) {
    const nextInstitution = {
      name: payload.institutionName,
      adminName: payload.adminName,
      schoolCode: payload.schoolCode,
      verificationLabel: 'Akses siap dibagikan ke siswa dan guru',
    }

    setInstitution(nextInstitution)
    setAccounts((prev) =>
      prev.map((account) => ({
        ...account,
        school: payload.institutionName,
        schoolCode: payload.schoolCode,
        accountCode: buildAccountCode(account.id, payload.schoolCode),
        ...(account.id === 'admin'
          ? { name: payload.adminName, email: `${slugify(payload.adminName)}@kindreach.id` }
          : {}),
      }))
    )
    setSelectedAccountId('admin')
    navigateStage('admin', 'forward')
  }

  async function handleCreateReport(reportDraft) {
    setIsReportMutationPending(true)

    try {
      const savedReport = await createReport(reportDraft)
      setReports((prev) =>
        sortReportsNewestFirst([
          savedReport,
          ...prev.filter((item) => item.id !== savedReport.id),
        ])
      )
      rewardActiveUser(80)
      setActiveTab('report')

      return {
        message: 'Laporan aman sudah dikirim ke tim sekolah.',
      }
    } catch {
      const demoReport = createDemoReport(reportDraft)
      setReports((prev) => sortReportsNewestFirst([demoReport, ...prev]))
      rewardActiveUser(80)
      setActiveTab('report')

      return {
        message: 'Laporan aman sudah dikirim ke tim sekolah.',
      }
    } finally {
      setIsReportMutationPending(false)
    }
  }

  function handleResolveQuest(points) {
    rewardActiveUser(points)
  }

  function handleSaveStaffCaseNote(reportId, noteText) {
    const trimmedNote = noteText.trim()

    if (!trimmedNote) {
      return
    }

    const savedAt = new Date().toISOString()

    setStaffCaseNotes((prev) => ({
      ...prev,
      [reportId]: {
        body: trimmedNote,
        updatedAt: savedAt,
        updatedBy: selectedUser.name,
        updatedRole: selectedUser.role,
      },
    }))

    setStaffCaseActivity((prev) => ({
      ...prev,
      [reportId]: [
        ...(prev[reportId] || []),
        {
          id: `note-${reportId}-${savedAt}`,
          type: 'note',
          label: 'Catatan tindak lanjut diperbarui',
          detail: trimmedNote,
          actor: `${selectedUser.name} • ${selectedUser.role}`,
          at: savedAt,
        },
      ],
    }))
  }

  async function handleUpdateReportStatus(reportId, status) {
    setIsReportMutationPending(true)
    setActiveReportId(reportId)
    const updatedAt = new Date().toISOString()
    const statusLabel = status === 'Terverifikasi'
      ? 'Laporan diverifikasi'
      : status === 'Diproses'
        ? 'Kasus masuk penanganan'
        : 'Kasus difinalisasi'

    try {
      const updatedReport = await updateReportStatus(reportId, status)
      setReports((prev) =>
        prev.map((item) => (item.id === reportId ? updatedReport : item))
      )
    } catch {
      setReports((prev) =>
        prev.map((item) => (item.id === reportId ? { ...item, status } : item))
      )
    } finally {
      setStaffCaseActivity((prev) => ({
        ...prev,
        [reportId]: [
          ...(prev[reportId] || []),
          {
            id: `status-${reportId}-${status}-${updatedAt}`,
            type: 'status',
            status,
            label: statusLabel,
            detail: `${selectedUser.name} (${selectedUser.role}) memperbarui status kasus ke ${status}.`,
            actor: `${selectedUser.name} • ${selectedUser.role}`,
            at: updatedAt,
          },
        ],
      }))
      setIsReportMutationPending(false)
      setActiveReportId(null)
    }
  }

  function renderStageContent(stageName) {
    if (stageName === 'outside') {
      return <HomeScreen onOpenApp={() => navigateStage('splash', 'forward')} />
    }

    if (stageName === 'splash') {
      return <SplashScreen />
    }

    if (stageName === 'welcome') {
      return (
        <WelcomeScreen
          onOpenInstitution={() => navigateStage('institution', 'forward')}
          onOpenLogin={() => navigateStage('login', 'forward')}
        />
      )
    }

    if (stageName === 'institution') {
      return (
        <InstitutionAccessScreen
          institution={institution}
          onBack={() => navigateStage('welcome', 'back')}
          onContinue={handleRegisterInstitution}
        />
      )
    }

    if (stageName === 'login') {
      return (
        <LoginScreen
          institution={institution}
          accounts={accounts}
          onBack={() => navigateStage('welcome', 'back')}
          onLogin={(account) => {
            const nextUser = account || selectedUser

            setSelectedAccountId(nextUser.id)

            if (nextUser.role === 'Siswa') {
              navigateStage('app', 'forward')
            } else {
              navigateStage('admin', 'forward')
            }
          }}
        />
      )
    }

    if (stageName === 'app') {
      return (
        <AppScreen
          institution={institution}
          user={selectedUser}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onCreateReport={handleCreateReport}
          onResolveQuest={handleResolveQuest}
          reports={reports}
          isReportMutationPending={isReportMutationPending}
          onLogout={() => {
            setActiveTab('home')
            navigateStage('outside', 'back')
          }}
        />
      )
    }

    if (stageName === 'admin') {
      return (
        <AdminScreen
          institution={institution}
          user={selectedUser}
          reports={reports}
          staffCaseNotes={staffCaseNotes}
          staffCaseActivity={staffCaseActivity}
          isReportMutationPending={isReportMutationPending}
          activeReportId={activeReportId}
          onUpdateReportStatus={handleUpdateReportStatus}
          onSaveStaffCaseNote={handleSaveStaffCaseNote}
          onLogout={() => {
            setActiveTab('home')
            navigateStage('outside', 'back')
          }}
        />
      )
    }

    return null
  }

  return (
    <LayoutShell>
      <div className="app-root full-mobile-only">
        <PhoneFrame fullScreen>
          <div className={`screen-shell stage-${stage}`}>
            {showGlobalSosScreen ? (
              <SosScreen onClose={() => setShowGlobalSosScreen(false)} />
            ) : (
              <>
                <div className="stage-transition-stack">
                  {stageTransition && (
                    <div
                      key={`exit-${stageTransition.id}`}
                      className={`stage-layer exit-${stageTransition.direction}`}
                      aria-hidden="true"
                    >
                      {renderStageContent(stageTransition.from)}
                    </div>
                  )}

                  <div
                    key={`active-${stage}`}
                    className={`stage-layer ${stageTransition ? `enter-${stageTransition.direction}` : 'active'}`}
                  >
                    {renderStageContent(stage)}
                  </div>
                </div>

                {stage !== 'app' && stage !== 'admin' && (
                  <button className="sos-floating-bubble global-sos-bubble" onClick={() => setShowGlobalSosScreen(true)}>
                    <span>SOS</span>
                  </button>
                )}
              </>
            )}
          </div>
        </PhoneFrame>
      </div>
    </LayoutShell>
  )
}

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '.').replace(/^\.|\.$/g, '')
}
