import { useLayoutEffect, useRef, useState } from 'react'
import StatusBar from './StatusBar'

export default function PhoneFrame({ children }) {
  const initialDprRef = useRef(typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1)
  const [phoneScale, setPhoneScale] = useState(1)

  useLayoutEffect(() => {
    function updateScale() {
      const viewport = window.visualViewport
      const viewportWidth = viewport?.width || window.innerWidth
      const viewportHeight = viewport?.height || window.innerHeight
      const fitScale = Math.min(1, (viewportWidth - 20) / 390, (viewportHeight - 20) / 844)
      const currentDpr = window.devicePixelRatio || initialDprRef.current
      const zoomScale = Math.min(1, initialDprRef.current / currentDpr)
      const nextScale = Math.max(0.48, Math.min(1, fitScale * zoomScale))

      setPhoneScale(Number(nextScale.toFixed(4)))
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    window.visualViewport?.addEventListener('resize', updateScale)

    return () => {
      window.removeEventListener('resize', updateScale)
      window.visualViewport?.removeEventListener('resize', updateScale)
    }
  }, [])

  return (
    <div className="phone-stage" style={{ '--kr-phone-scale': phoneScale }}>
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
