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
import { loginAccounts } from './data/appData.jsx'

export default function App() {
  const [stage, setStage] = useState('outside')
  const [activeTab, setActiveTab] = useState('home')
  const [selectedAccountId, setSelectedAccountId] = useState('student')

  const selectedUser = useMemo(() => {
    return loginAccounts.find((item) => item.id === selectedAccountId) || loginAccounts[0]
  }, [selectedAccountId])

  useEffect(() => {
    if (stage !== 'splash') return

    const timer = setTimeout(() => {
      setStage('welcome')
    }, 4200)

    return () => clearTimeout(timer)
  }, [stage])

  return (
    <LayoutShell>
      <div className="app-root full-mobile-only">
        <PhoneFrame fullScreen>
          <div className={`screen-shell stage-${stage}`}>
            {stage === 'outside' && (
              <HomeScreen onOpenApp={() => setStage('splash')} />
            )}

            {stage === 'splash' && <SplashScreen />}

            {stage === 'welcome' && (
              <WelcomeScreen
                onOpenInstitution={() => setStage('institution')}
                onOpenLogin={() => setStage('login')}
              />
            )}

            {stage === 'institution' && (
              <InstitutionAccessScreen
                onBack={() => setStage('welcome')}
                onContinue={() => {
                  setSelectedAccountId('admin')
                  setStage('admin')
                }}
              />
            )}

            {stage === 'login' && (
              <LoginScreen
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
                user={selectedUser}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onLogout={() => {
                  setActiveTab('home')
                  setStage('outside')
                }}
              />
            )}

            {stage === 'admin' && (
              <AdminScreen
                user={selectedUser}
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