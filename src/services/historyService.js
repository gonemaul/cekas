import { APP_IDENTITY } from '@/constants/appConfig'

const STORAGE_KEY = APP_IDENTITY.storage_key // 'cekas_history_v1'

export const historyService = {
  getAll() {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  },

  save(payload) {
    const history = this.getAll()
    const lastSession = history[0]

    // Logika Status Performa (UP/DOWN/STABLE)
    let trend = 'STABLE'
    if (payload.isSuccess && lastSession) {
      if (payload.score > lastSession.score) trend = 'UP'
      else if (payload.score < lastSession.score) trend = 'DOWN'
    } else if (!payload.isSuccess) {
      trend = 'FAILED'
    }

    const newEntry = {
      id: Date.now(),
      mode: payload.mode,
      level: payload.level,
      score: payload.score,
      timeUsed: payload.time, // Konsisten dengan nama baru
      accuracy: payload.accuracy || 0,
      status: trend, // Menyimpan UP/DOWN/STABLE/FAILED
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      timestamp: new Date().getTime(),
    }

    history.unshift(newEntry)
    // Simpan 20 data terakhir agar history lebih panjang dari sebelumnya (10)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 20)))
    return newEntry
  },

  getStats() {
    const history = this.getAll()
    if (history.length === 0) return { bestScore: 0, avgAccuracy: 0 }

    const bestScore = Math.max(...history.map((h) => h.score))
    const avgAccuracy = Math.round(
      history.reduce((acc, curr) => acc + (curr.accuracy || 0), 0) / history.length,
    )
    return { bestScore, avgAccuracy }
  },
}
