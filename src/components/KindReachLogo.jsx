export default function KindReachLogo({
  size = 72,
  rounded = 22,
  className = '',
}) {
  return (
    <div
      className={`kindreach-logo ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: rounded,
      }}
      aria-label="KindReach Logo"
    >
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="kindreachBg" x1="8" y1="8" x2="92" y2="92">
            <stop offset="0%" stopColor="#2C4196" />
            <stop offset="58%" stopColor="#1F4D86" />
            <stop offset="100%" stopColor="#156A86" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="100" height="100" rx="24" fill="url(#kindreachBg)" />

        <path
          fill="#FFFFFF"
          fillRule="evenodd"
          d="
            M 50.5,78.1
            L 49.4,77.9
            L 46.1,75.4
            L 31.2,62.3
            L 24.3,54.7
            L 20.4,48.3
            L 18.9,41.2
            L 20.1,33.5
            L 22.7,28.8
            L 26.0,25.4
            L 28.9,23.7
            L 34.2,22.2
            L 39.3,22.3
            L 44.1,23.8
            L 48.0,26.4
            L 44.3,30.5
            L 37.8,27.9
            L 33.2,28.3
            L 29.7,29.8
            L 25.4,34.6
            L 24.4,40.7
            L 25.4,45.6
            L 28.6,50.8
            L 37.2,59.8
            L 50.0,71.2
            L 55.8,66.5
            L 49.8,59.6
            L 49.6,57.7
            L 50.6,56.3
            L 52.0,55.5
            L 53.7,55.8
            L 60.3,62.9
            L 63.7,59.8
            L 57.6,52.7
            L 57.3,51.3
            L 58.3,49.5
            L 59.9,48.6
            L 61.7,49.2
            L 67.8,56.0
            L 71.4,51.5
            L 65.2,44.0
            L 61.8,41.8
            L 58.9,42.4
            L 48.0,51.2
            L 45.4,52.0
            L 41.5,51.4
            L 38.4,48.9
            L 36.9,45.5
            L 37.0,41.8
            L 38.9,38.1
            L 44.2,32.6
            L 52.4,25.4
            L 55.9,23.5
            L 61.3,22.1
            L 66.8,22.3
            L 72.4,24.5
            L 77.2,28.8
            L 79.8,33.3
            L 80.9,38.4
            L 80.8,43.9
            L 79.6,48.7
            L 77.1,53.3
            L 67.9,63.6
            L 50.5,78.1
            Z

            M 45.2,46.7
            L 55.9,37.7
            L 60.5,36.1
            L 63.6,36.3
            L 67.1,38.1
            L 74.7,45.7
            L 75.6,40.7
            L 75.2,36.8
            L 73.2,32.6
            L 69.1,29.3
            L 63.5,27.8
            L 58.7,28.5
            L 53.0,31.9
            L 42.3,42.2
            L 42.3,45.3
            L 43.5,46.5
            L 45.2,46.7
            Z
          "
        />
      </svg>
    </div>
  )
}