const referees = [
  // { id: 1, name: 'Sok Dara', level: 'FIFA', matches: 16, averageScore: 91 },
  // { id: 2, name: 'Chan Bora', level: 'National', matches: 13, averageScore: 86 },
  // // { id: 3, name: 'Vannak Rith', level: 'National', matches: 11, averageScore: 83 },
]

function RefereePage() {
  return (
    <div className="page-stack">
      <div className="page-title">
        <div>
          <span>Officials</span>
          <h1>Referees</h1>
        </div>
        <button className="primary-button" type="button">Add Referee</button>
      </div>

      <section className="cards-grid">
        {referees.map((referee) => (
          <article className="profile-card" key={referee.id}>
            <div className="avatar">{referee.name.slice(0, 1)}</div>
            <div>
              <h2>{referee.name}</h2>
              <span>{referee.level}</span>
            </div>
            <dl>
              <div>
                <dt>Matches</dt>
                <dd>{referee.matches}</dd>
              </div>
              <div>
                <dt>Avg. score</dt>
                <dd>{referee.averageScore}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </div>
  )
}

export default RefereePage
