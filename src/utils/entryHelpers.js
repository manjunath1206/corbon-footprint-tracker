export function makeEmptyEntry(dateStr) {
  return {
    id: Date.now() + Math.random(),
    date: dateStr,
    travel: { mode: 'car', km: 0 },
    electricity_kwh: 0,
    water_l: 0,
    meals: { meat: 0, veg: 0 },
    shopping_count: 0,
    notes: ''
  }
}
