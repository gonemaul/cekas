import { ref, onUnmounted } from 'vue'

export function useGameLogic(initialTime) {
  const score = ref(0)
  const currentStep = ref(1)
  const lives = ref(3)
  const timeLeft = ref(initialTime)
  const isWrong = ref(false)
  const combo = ref(0)
  const isFinished = ref(false)

  let timerInterval = null
  const startTime = ref(null)

  const startGlobalTimer = () => (startTime.value = Date.now())

  const getDuration = () => {
    if (!startTime.value) return 0
    return Math.floor((Date.now() - startTime.value) / 1000)
  }

  const runTick = (onTimeout) => {
    clearInterval(timerInterval)
    timeLeft.value = initialTime
    timerInterval = setInterval(() => {
      timeLeft.value -= 0.1
      if (timeLeft.value <= 0) onTimeout()
    }, 100)
  }

  const stopTimer = () => clearInterval(timerInterval)

  onUnmounted(() => clearInterval(timerInterval))

  return {
    score,
    currentStep,
    lives,
    timeLeft,
    isWrong,
    combo,
    isFinished,
    startGlobalTimer,
    getDuration,
    runTick,
    stopTimer,
  }
}
