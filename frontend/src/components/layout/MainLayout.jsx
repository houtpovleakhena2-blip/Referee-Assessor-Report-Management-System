import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function MainLayout({ children }) {
  return (
    <div className="app-shell">
      <div className="sidebar-wrap open">
        <Sidebar />
      </div>

      <div className="main-panel">
        <Navbar />
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  )
}
