// Simple emission calculators and heuristics (very approximate)
export const EMISSION_FACTORS = {
  car_km: 0.192,
  bus_km: 0.089,
  electricity_kwh: 0.92,
  water_l: 0.0003,
  meat_meal: 3.0,
  veg_meal: 0.5,
  shopping_item: 2.0
}

export function calcEntryEmissions(entry) {
  const travelMode = entry.travel?.mode || 'car'
  const km = Number(entry.travel?.km || 0)
  let travelContribution = 0
  if (travelMode === 'car') travelContribution = km * EMISSION_FACTORS.car_km
  else if (travelMode === 'bus') travelContribution = km * EMISSION_FACTORS.bus_km
  // bike/walk -> 0

  const electricityContribution = (Number(entry.electricity_kwh) || 0) * EMISSION_FACTORS.electricity_kwh
  const waterContribution = (Number(entry.water_l) || 0) * EMISSION_FACTORS.water_l
  const foodContribution = (Number(entry.meals?.meat || 0) * EMISSION_FACTORS.meat_meal) + (Number(entry.meals?.veg || 0) * EMISSION_FACTORS.veg_meal)
  const shoppingContribution = (Number(entry.shopping_count) || 0) * EMISSION_FACTORS.shopping_item

  const total = travelContribution + electricityContribution + waterContribution + foodContribution + shoppingContribution

  return {
    total,
    travelContribution,
    electricityContribution,
    waterContribution,
    foodContribution,
    shoppingContribution
  }
}

export function calcEcoPoints(entry) {
  const emissionsObj = calcEntryEmissions(entry)
  const totalKg = emissionsObj.total
  let base = Math.max(0, Math.round(100 - totalKg))
  if ((entry.travel?.mode || 'car') === 'walk' || (entry.travel?.mode || 'car') === 'bike') base += 10
  if ((entry.meals?.veg || 0) > (entry.meals?.meat || 0)) base += 5
  return base
}

export function computeEmissionsAndPoints(entry) {
  const emissions = calcEntryEmissions(entry)
  const points = calcEcoPoints(entry)
  return {
    ...entry,
    emissions,
    points
  }
}
