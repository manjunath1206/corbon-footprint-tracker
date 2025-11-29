import React from 'react'
import Charts from './Charts'
import Tips from './Tips'

export default function Dashboard({ entries, onRemove }) {
  const totalCO2 = entries.reduce((s, e) => s + (e.emissions?.total || 0), 0)
  const totalPoints = entries.reduce((s, e) => s + (e.points || 0), 0)

  return (
    <div>
      <div className="card stats">
        <h2>Overview</h2>
        <p><strong>Total CO₂:</strong> {totalCO2.toFixed(2)} kg</p>
        <p><strong>Total Eco Points:</strong> {totalPoints}</p>
        <p><strong>Entries:</strong> {entries.length}</p>
      </div>

      <Charts entries={entries} />

      <div className="card entries">
        <h3>Recent Entries</h3>
        {entries.length === 0 && <p>No entries yet — add one!</p>}
        <ul>
          {entries.map(e => (
            <li key={e.id} className="entry">
              <div>
                <div className="entry-head">
                  <strong>{e.date}</strong>
                  <span>CO₂: { (e.emissions?.total ?? 0).toFixed(2) } kg</span>
                  <span>Pts: {e.points ?? 0}</span>
                </div>
                <div className="entry-body">{e.notes}</div>
              </div>
              <div>
                <button className="btn small" onClick={() => onRemove(e.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Tips entries={entries} />
    </div>
  )
}
