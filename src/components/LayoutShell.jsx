export default function LayoutShell({ children }) {
  return (
    <div className="page-shell">
      <div className="bg-orb orb-a" />
      <div className="bg-orb orb-b" />
      {children}
    </div>
  )
}
