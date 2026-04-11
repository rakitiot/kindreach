import { Search } from 'lucide-react'
import KindReachLogo from '../components/KindReachLogo'
import { dockApps, phoneApps } from '../data/appData.jsx'

function AppIcon({ icon: Icon, label, color, onClick, isKindReach }) {
  return (
    <button className="app-icon-wrap" onClick={onClick}>
      <div className={`app-icon ${color} ${isKindReach ? 'kindreach-glow' : ''}`}>
        {isKindReach ? (
          <KindReachLogo size={54} rounded={14} iconOnly />
        ) : (
          <Icon size={24} strokeWidth={2} />
        )}
      </div>
      <span>{label}</span>
    </button>
  )
}

export default function HomeScreen({ onOpenApp }) {
  return (
    <div className="phone-page ios-home">
      <div className="ios-wallpaper" />
      <div className="app-grid">
        {phoneApps.map((app) => (
          <AppIcon
            key={app.label}
            {...app}
            onClick={app.isKindReach ? onOpenApp : undefined}
          />
        ))}
      </div>

      <div className="search-pill">
        <Search size={16} />
        <span>Search</span>
      </div>

      <div className="dock">
        {dockApps.map((app) => (
          <AppIcon key={app.label} {...app} />
        ))}
      </div>
    </div>
  )
}