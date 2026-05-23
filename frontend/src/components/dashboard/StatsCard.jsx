function StatsCard({ title, value, helper, icon: Icon }) {
  return (
    <article className="stats-card">
      <div>
        <span>{title}</span>
        <strong>{value}</strong>
        {helper ? <small>{helper}</small> : null}
      </div>
      {Icon ? (
        <div className="stats-icon">
          <Icon size={22} />
        </div>
      ) : null}
    </article>
  )
}

export default StatsCard
