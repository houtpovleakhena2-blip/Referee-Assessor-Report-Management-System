import { useState } from 'react'
import { ChevronDown, ClipboardList, FileText, LayoutDashboard, ShieldCheck, Users } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

const menuItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/matches', label: 'Matches', icon: ClipboardList },
  { to: '/referees', label: 'Referees', icon: Users },
]

const reportItems = ['WCL', 'CPL', 'U16', 'Futsal']

export default function Sidebar() {
  const location = useLocation()
  const [isReportOpen, setIsReportOpen] = useState(location.pathname.startsWith('/reports'))

  return (
    <aside className="sidebar">
      <div className="brand">
        <ShieldCheck size={28} />
        <div>
          <strong>Referee System</strong>
          <span>Assessor Portal</span>
        </div>
      </div>

      <nav className="nav-list">
        {menuItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}

        <button
          className={`nav-link nav-button${location.pathname.startsWith('/reports') ? ' active' : ''}`}
          type="button"
          onClick={() => setIsReportOpen((value) => !value)}
        >
          <FileText size={20} />
          <span>Reports</span>
          <ChevronDown className={`nav-chevron${isReportOpen ? ' open' : ''}`} size={16} />
        </button>

        {isReportOpen ? (
          <div className="nav-submenu">
            {reportItems.map((competition) => (
              <NavLink
                key={competition}
                to={`/reports?competition=${competition}`}
                className={({ isActive }) => `nav-sublink${isActive && location.search.includes(competition) ? ' active' : ''}`}
              >
                {competition}
              </NavLink>
            ))}
          </div>
        ) : null}
      </nav>
    </aside>
  )
}
