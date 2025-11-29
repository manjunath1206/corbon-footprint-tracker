import React, { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#16a34a', '#60a5fa', '#f97316', '#a78bfa', '#f43f5e']

export default function Charts({ entries }) {
  const byDate = useMemo(() => {
    const map = {}
    entries.slice().reverse().forEach(e => {
      const date = e.date
      if (!map[date]) map[date] = 0
      map[date] += e.emissions?.total || 0
    })
    return Object.entries(map).map(([date, co2]) => ({ date, co2: Number(co2.toFixed(2)) }))
  }, [entries])

  const breakdown = useMemo(() => {
    const latest = entries[0]
    if (!latest) return []
    const parts = [
      { name: 'Travel', value: latest.emissions?.travelContribution || 0 },
      { name: 'Electricity', value: latest.emissions?.electricityContribution || 0 },
      { name: 'Water', value: latest.emissions?.waterContribution || 0 },
      { name: 'Food', value: latest.emissions?.foodContribution || 0 },
      { name: 'Shopping', value: latest.emissions?.shoppingContribution || 0 }
    ]
    return parts.filter(p => p.value > 0)
  }, [entries])

  return (
    <div className="card charts">
      <h3>Trends</h3>
      <div style={{ height: 220 }}>
        <ResponsiveContainer>
          <LineChart data={byDate}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="co2" stroke="#16a34a" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {breakdown.length > 0 && (
        <div style={{ height: 220, marginTop: 12 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={breakdown} dataKey="value" nameKey="name" outerRadius={70} label>
                {breakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
