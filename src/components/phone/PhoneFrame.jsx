import StatusBar from './StatusBar'

export default function PhoneFrame({ children, fullScreen = false }) {
  return (
    <div className={`phone-stage ${fullScreen ? 'fullscreen' : ''}`}>
      <div className={`phone-frame ${fullScreen ? 'fullscreen' : ''}`}>
        {!fullScreen && (
          <>
            <div className="side-button side-top" />
            <div className="side-button side-middle" />
            <div className="side-button side-bottom" />
            <div className="phone-notch" />
          </>
        )}

        <div className={`phone-screen ${fullScreen ? 'fullscreen' : ''}`}>
          <StatusBar />
          {children}
          <div className="home-indicator" />
        </div>
      </div>
    </div>
  )
}