import React from 'react'

function pickTips(entries) {
  if (!entries || entries.length === 0) return ['Great start — add your first entry to get tips!']
  const latest = entries[0]
  const tips = []
  if (latest.travel && latest.travel.mode === 'car' && (latest.travel.km || 0) > 2) tips.push('Try public transport or carpool for short trips.')
  if ((latest.electricity_kwh || 0) > 5) tips.push('Lower AC usage by 1°C or use fans more.')
  if (latest.meals && (latest.meals.meat || 0) > (latest.meals.veg || 0)) tips.push('Try 1-2 vegetarian meals per week to reduce emissions.')
  if ((latest.shopping_count || 0) > 0) tips.push('Buy only what you need — avoid impulse purchases.')
  if (tips.length === 0) tips.push('Nice — keep the good habits up!')
  return tips
}

export default function Tips({ entries }) {
  const tips = pickTips(entries)
  return (
    <div className="card tips">
      <h3>Personalised Tips</h3>
      <ul>
        {tips.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  )
}
