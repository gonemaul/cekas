export const StorageService = {
  saveHistory(payload) {
    const history = JSON.parse(localStorage.getItem('fastmath_history') || '[]')
    const lastSession = history[0]

    let status = 'FAILED'
    if (payload.status === 'SUCCESS') {
      if (lastSession) {
        status =
          payload.score > lastSession.score
            ? 'UP'
            : payload.score < lastSession.score
              ? 'DOWN'
              : 'STABLE'
      }
    }

    const newEntry = {
      id: Date.now(),
      ...payload,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
      status: status,
    }

    history.unshift(newEntry)
    localStorage.setItem('fastmath_history', JSON.stringify(history.slice(0, 10)))
  },
}
