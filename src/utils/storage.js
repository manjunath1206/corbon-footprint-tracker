const LS_KEY = 'carbon_entries_v1'

export function loadEntries() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return parsed
  } catch (e) {
    console.error('loadEntries failed', e)
    return []
  }
}

export function saveEntries(entries) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(entries))
  } catch (e) {
    console.error('saveEntries failed', e)
  }
}
