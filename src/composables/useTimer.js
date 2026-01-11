import { ref, onUnmounted } from 'vue'

export function useTimer(initialTime) {
  const timeLeft = ref(initialTime)
  let timerInterval = null

  const start = (onTimeout) => {
    timeLeft.value = initialTime
    clearInterval(timerInterval)
    timerInterval = setInterval(() => {
      timeLeft.value -= 0.1
      if (timeLeft.value <= 0) {
        clearInterval(timerInterval)
        onTimeout()
      }
    }, 100)
  }

  const stop = () => clearInterval(timerInterval)

  onUnmounted(() => stop())

  return { timeLeft, start, stop }
}
