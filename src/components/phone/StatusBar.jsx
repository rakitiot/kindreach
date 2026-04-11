export default function StatusBar() {
  return (
    <div className="status-bar">
      <span>9:41</span>
      <div className="status-icons">
        <span className="signal" />
        <span className="wifi" />
        <span className="battery" />
      </div>
    </div>
  )
}
