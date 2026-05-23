import { ClipboardCheck, FileText, TrendingUp, UsersRound } from 'lucide-react'
import ScoreChart from '../components/dashboard/ScoreChart'
import StatsCard from '../components/dashboard/StatsCard'

const recentReports = [
  { id: 'RPT-1001', match: 'Phnom Penh Crown vs Visakha', referee: 'Sok Dara', score: 91 },
  { id: 'RPT-1002', match: 'Boeung Ket vs NagaWorld', referee: 'Chan Bora', score: 86 },
  { id: 'RPT-1003', match: 'Tiffy Army vs Kirivong', referee: 'Vannak Rith', score: 83 },
]

function DashboardPage() {
  return (
    <div className="page-stack">
      <div className="page-title">
        <div>
          <span>Overview</span>
          <h1>Dashboard</h1>
        </div>
      </div>

      <section className="stats-grid">
        <StatsCard title="Matches" value="42" helper="8 upcoming" icon={ClipboardCheck} />
        <StatsCard title="Referees" value="18" helper="Active officials" icon={UsersRound} />
        <StatsCard title="Reports" value="126" helper="14 pending review" icon={FileText} />
        <StatsCard title="Avg. Score" value="86.8" helper="+3.2 this month" icon={TrendingUp} />
      </section>

      <div className="content-grid">
        <ScoreChart />
        <section className="panel">
          <div className="section-heading">
            <h2>Recent Reports</h2>
            <span>Latest assessments</span>
          </div>
          <div className="list-table">
            {recentReports.map((report) => (
              <div className="table-row" key={report.id}>
                <div>
                  <strong>{report.match}</strong>
                  <span>{report.id} · {report.referee}</span>
                </div>
                <b>{report.score}</b>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default DashboardPage
