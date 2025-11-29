import React, { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard'
import EntryForm from './components/EntryForm'
import { loadEntries, saveEntries } from './utils/storage'
import { computeEmissionsAndPoints } from './utils/emissions'

export default function App() {
  const [entries, setEntries] = useState(() => loadEntries())

  useEffect(() => {
    saveEntries(entries)
  }, [entries])

  function addEntry(rawEntry) {
    // compute emissions and points before saving
    const computed = computeEmissionsAndPoints(rawEntry)
    setEntries(prev => [computed, ...prev])
  }

  function removeEntry(id) {
    setEntries(prev => prev.filter(x => x.id !== id))
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Carbon Footprint Tracker 🌍</h1>
        <p className="subtitle">Track daily habits — earn eco-points — reduce CO₂</p>
      </header>
      <main className="app-grid">
        <section className="left">
          <EntryForm onAdd={addEntry} />
        </section>
        <section className="right">
          <Dashboard entries={entries} onRemove={removeEntry} />
        </section>
      </main>
      {/* <footer className="footer">Built for portfolio — demo app</footer> */}
    </div>
  )
}
