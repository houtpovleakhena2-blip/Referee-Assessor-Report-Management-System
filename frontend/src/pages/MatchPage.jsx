const matches = [
  { id: 1, date: '2026-05-24', home: 'Phnom Penh Crown', away: 'Visakha', venue: 'Smart RSN Stadium', status: 'Scheduled' },
  { id: 2, date: '2026-05-28', home: 'Boeung Ket', away: 'NagaWorld', venue: 'Olympic Stadium', status: 'Scheduled' },
  { id: 3, date: '2026-06-02', home: 'Tiffy Army', away: 'Kirivong Sok Sen Chey', venue: 'Army Stadium', status: 'Draft' },
]

function MatchPage() {
  return (
    <div className="page-stack">
      <div className="page-title">
        <div>
          <span>Competition</span>
          <h1>Matches</h1>
        </div>
        <button className="primary-button" type="button">Add Match</button>
      </div>

      <section className="panel">
        <div className="data-table">
          <div className="data-head">
            <span>Date</span>
            <span>Match</span>
            <span>Venue</span>
            <span>Status</span>
          </div>
          {matches.map((match) => (
            <div className="data-row" key={match.id}>
              <span>{match.date}</span>
              <strong>{match.home} vs {match.away}</strong>
              <span>{match.venue}</span>
              <span className="status-pill">{match.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MatchPage
