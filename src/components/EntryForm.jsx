import React, { useState } from 'react'
import { makeEmptyEntry } from '../utils/entryHelpers'

export default function EntryForm({ onAdd }) {
  const today = new Date().toISOString().slice(0, 10)
  const [entry, setEntry] = useState(makeEmptyEntry(today))

  function update(path, value) {
    setEntry(prev => {
      const copy = JSON.parse(JSON.stringify(prev))
      const keys = path.split('.')
      let obj = copy
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
      obj[keys[keys.length - 1]] = value
      return copy
    })
  }

  function submit(e) {
    e.preventDefault()
    // Ensure numeric fields are numbers
    const normalized = {
      ...entry,
      travel: { ...entry.travel, km: Number(entry.travel.km || 0) },
      electricity_kwh: Number(entry.electricity_kwh || 0),
      water_l: Number(entry.water_l || 0),
      meals: { meat: Number(entry.meals.meat || 0), veg: Number(entry.meals.veg || 0) },
      shopping_count: Number(entry.shopping_count || 0)
    }
    onAdd(normalized)
    setEntry(makeEmptyEntry(today))
  }

  return (
    <form className="card form" onSubmit={submit}>
      <h2>Add Daily Entry</h2>

      <label>Date
        <input type="date" value={entry.date} onChange={e => update('date', e.target.value)} required />
      </label>

      <fieldset>
        <legend>Travel</legend>
        <label>Mode
          <select value={entry.travel.mode} onChange={e => update('travel.mode', e.target.value)}>
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="bike">Bike</option>
            <option value="walk">Walk</option>
          </select>
        </label>
        <label>Kilometres
          <input type="number" min="0" value={entry.travel.km} onChange={e => update('travel.km', e.target.value)} />
        </label>
      </fieldset>

      <label>Electricity (kWh)
        <input type="number" min="0" step="0.1" value={entry.electricity_kwh} onChange={e => update('electricity_kwh', e.target.value)} />
      </label>

      <label>Water (litres)
        <input type="number" min="0" value={entry.water_l} onChange={e => update('water_l', e.target.value)} />
      </label>

      <fieldset>
        <legend>Meals</legend>
        <label>Meat meals
          <input type="number" min="0" value={entry.meals.meat} onChange={e => update('meals.meat', e.target.value)} />
        </label>
        <label>Veg meals
          <input type="number" min="0" value={entry.meals.veg} onChange={e => update('meals.veg', e.target.value)} />
        </label>
      </fieldset>

      <label>Shopping (non-essential items count)
        <input type="number" min="0" value={entry.shopping_count} onChange={e => update('shopping_count', e.target.value)} />
      </label>

      <label>Notes
        <input type="text" value={entry.notes} onChange={e => update('notes', e.target.value)} />
      </label>

      <div className="form-actions">
        <button type="submit">Save Entry</button>
      </div>
    </form>
  )
}
