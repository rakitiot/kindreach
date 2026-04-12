import StatusBar from './StatusBar'

export default function PhoneFrame({ children }) {
  return (
    <div className="phone-stage">
      <div className="phone-frame iphone-bezel">
        <span className="side-button side-top" />
        <span className="side-button side-middle" />
        <span className="side-button side-bottom" />

        <div className="phone-screen">
          <div className="phone-wallpaper" />
          <div className="phone-glass-overlay" />
          <div className="dynamic-island" />
          <StatusBar />

          <div className="phone-content">
            {children}
          </div>

          <div className="home-indicator" />
        </div>
      </div>
    </div>
  )
}