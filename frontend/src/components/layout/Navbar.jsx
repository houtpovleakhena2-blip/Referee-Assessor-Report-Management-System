import { Search } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="navbar">
      <label className="search-box">
        <Search size={18} />
        <input type="search" placeholder="Search reports, matches, referees" />
      </label>

      <div className="navbar-user">
        <div>
          <strong>Admin</strong>
          <span>Administrator</span>
        </div>
      </div>
    </header>
  )
}
