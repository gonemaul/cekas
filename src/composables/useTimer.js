import { ref, onUnmounted } from 'vue'

export function useTimer(initialTime) {
  // Jika initialTime null/0, kita anggap mode survive (unlimited)
  const isUnlimited = initialTime === null || initialTime === 0
  const timeLeft = ref(isUnlimited ? 1 : initialTime)
  let timerInterval = null

  const start = (onTimeout) => {
    // 1. Jika mode survive, jangan jalankan interval apapun
    if (isUnlimited) {
      timeLeft.value = 1
      return
    }

    // 2. Jika mode normal, jalankan countdown seperti biasa
    timeLeft.value = initialTime
    clearInterval(timerInterval)

    timerInterval = setInterval(() => {
      // Perhitungan menggunakan toFixed untuk menghindari floating point error JS (0.1 + 0.2 != 0.3)
      timeLeft.value = parseFloat((timeLeft.value - 0.1).toFixed(1))

      if (timeLeft.value <= 0) {
        clearInterval(timerInterval)
        timeLeft.value = 0
        onTimeout()
      }
    }, 100)
  }

  const stop = () => {
    if (timerInterval) clearInterval(timerInterval)
  }

  onUnmounted(() => stop())

  return { timeLeft, start, stop, isUnlimited }
}
