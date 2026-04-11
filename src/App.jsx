import { useEffect, useMemo, useState } from 'react'
import LayoutShell from './components/LayoutShell'
import PhoneFrame from './components/phone/PhoneFrame'
import HomeScreen from './features/HomeScreen'
import LoginScreen from './features/LoginScreen'
import WelcomeScreen from './features/WelcomeScreen'
import AppScreen from './features/AppScreen'
import InstitutionAccessScreen from './features/InstitutionAccessScreen'
import AdminScreen from './features/AdminScreen'
import SplashScreen from './features/SplashScreen'
import { initialReports, loginAccounts } from './data/appData.jsx'

export default function App() {
  const [stage, setStage] = useState('outside')
  const [activeTab, setActiveTab] = useState('home')
  const [selectedAccountId, setSelectedAccountId] = useState('student')
  const [accounts, setAccounts] = useState(loginAccounts)
  const [reports, setReports] = useState(initialReports)
  const [institution, setInstitution] = useState({
    name: 'SMA Harmoni Nusantara',
    adminName: 'Raka Aditya',
    schoolCode: 'HN-2026',
    verificationLabel: 'Terverifikasi oleh sekolah',
  })

  const selectedUser = useMemo(() => {
    return accounts.find((item) => item.id === selectedAccountId) || accounts[0]
  }, [accounts, selectedAccountId])

  useEffect(() => {
    if (stage !== 'splash') return

    const timer = setTimeout(() => {
      setStage('welcome')
    }, 4200)

    return () => clearTimeout(timer)
  }, [stage])

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
        ...(account.id === 'admin' ? { name: payload.adminName, email: `${slugify(payload.adminName)}@kindreach.id` } : {}),
      }))
    )
    setSelectedAccountId('admin')
    setStage('admin')
  }

  function handleCreateReport(reportDraft) {
    setReports((prev) => [reportDraft, ...prev])
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === selectedAccountId
          ? { ...account, points: account.points + 80 }
          : account
      )
    )
    setActiveTab('report')
  }

  function handleResolveQuest(points) {
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === selectedAccountId
          ? { ...account, points: account.points + points }
          : account
      )
    )
  }

  function handleUpdateReportStatus(reportId, status) {
    setReports((prev) => prev.map((item) => (item.id === reportId ? { ...item, status } : item)))
  }

  return (
    <LayoutShell>
      <div className="app-root full-mobile-only">
        <PhoneFrame fullScreen>
          <div className={`screen-shell stage-${stage}`}>
            {stage === 'outside' && <HomeScreen onOpenApp={() => setStage('splash')} />}

            {stage === 'splash' && <SplashScreen />}

            {stage === 'welcome' && (
              <WelcomeScreen
                onOpenInstitution={() => setStage('institution')}
                onOpenLogin={() => setStage('login')}
              />
            )}

            {stage === 'institution' && (
              <InstitutionAccessScreen
                institution={institution}
                onBack={() => setStage('welcome')}
                onContinue={handleRegisterInstitution}
              />
            )}

            {stage === 'login' && (
              <LoginScreen
                institution={institution}
                accounts={accounts}
                selectedAccount={selectedUser}
                selectedAccountId={selectedAccountId}
                onSelectAccount={setSelectedAccountId}
                onBack={() => setStage('welcome')}
                onLogin={() => {
                  if (selectedUser.role === 'Admin Sekolah') {
                    setStage('admin')
                  } else {
                    setStage('app')
                  }
                }}
              />
            )}

            {stage === 'app' && (
              <AppScreen
                institution={institution}
                user={selectedUser}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onCreateReport={handleCreateReport}
                onResolveQuest={handleResolveQuest}
                reports={reports}
                onLogout={() => {
                  setActiveTab('home')
                  setStage('outside')
                }}
              />
            )}

            {stage === 'admin' && (
              <AdminScreen
                institution={institution}
                user={selectedUser}
                reports={reports}
                onUpdateReportStatus={handleUpdateReportStatus}
                onBackToApp={() => setStage('app')}
                onLogout={() => {
                  setActiveTab('home')
                  setStage('outside')
                }}
              />
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