<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { dbService } from '@/services/dbService'
import { generateQuestionLogic } from '@/services/questionGenerator'
import FinishView from '@/components/FinishView.vue'
import Keypad from '@/components/game/Keypad.vue'
import GameHeader from '@/components/game/GameHeader.vue'
import GameStage from '@/components/game/QuestionStage.vue'

const props = defineProps(['mode', 'level'])
const route = useRoute()

const isMobile = ref(false)
const showKeypad = ref(true) // Opsi manual dari user
const inputField = ref(null)

const question = ref({ display: '', answer: 0 })
const userInput = ref('')
const score = ref(0)
const currentStep = ref(1)
const isFinished = ref(false)
const isWrong = ref(false)
const combo = ref(0)
const lives = ref(3)
// Ambil timer dari query (misal: 3, 5, atau 8). Default ke 5 jika tidak ada.
const timeLimit = ref(parseFloat(route.query.timer) || 5)
const timeLeft = ref(timeLimit.value)
const startTime = ref(null)
const totalTimeSpent = ref(0)
let timerInterval = null

const checkDevice = () => {
  isMobile.value = window.innerWidth < 768
  // Jika desktop, otomatis sembunyikan custom keypad agar bisa pakai keyboard fisik
  showKeypad.value = isMobile.value
}

const focusInput = () => {
  nextTick(() => {
    if (!showKeypad.value && inputField.value) {
      inputField.value.focus()
    }
  })
}
// Panggil ini saat game pertama kali dimulai (soal nomor 1)
const startGameTimer = () => {
  startTime.value = Date.now()
}

// Panggil ini saat soal ke-10 dijawab
const stopGameTimer = () => {
  if (startTime.value) {
    const endTime = Date.now()
    totalTimeSpent.value = Math.floor((endTime - startTime.value) / 1000)
  }
}

const resetTimer = () => {
  timeLeft.value = timeLimit.value
  clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    timeLeft.value -= 0.1
    if (timeLeft.value <= 0) nextQuestion()
  }, 100)
}

const toggleKeypad = () => {
  showKeypad.value = !showKeypad.value
  // Jika dimatikan, paksa fokus kembali ke input fisik (Desktop)
  if (!showKeypad.value) {
    setTimeout(() => inputField.value?.focus(), 100)
  }
}

const translateMode = (mode) => {
  const map = {
    addition: 'Penjumlahan',
    subtraction: 'Pengurangan',
    multiplication: 'Perkalian',
    division: 'Pembagian',
  }
  return map[mode] || mode
}
const translateLevel = (level) => {
  const map = {
    satuan: 'Satuan',
    puluhan: 'Puluhan',
    ratusan: 'Ratusan',
    berantai: 'Berantai',
  }
  return map[level] || level
}

const generateQuestion = () => {
  // Panggil logic dari file terpisah
  const newQuestion = generateQuestionLogic(props.mode, props.level, route.query.method)

  // Update state
  question.value = newQuestion
  userInput.value = ''

  if (currentStep.value === 1 && !startTime.value) startGameTimer()
  resetTimer()
}

const pressKey = (num) => {
  if (isWrong.value) isWrong.value = false // Reset status salah saat mulai ngetik lagi
  userInput.value += num.toString()
  // Haptic feedback (Hanya di Android/Chrome Mobile)
  if ('vibrate' in navigator) navigator.vibrate(15)
  // Panggil fungsi checkAnswer asli kamu
  checkAnswer()
}
const clearInput = () => {
  userInput.value = ''
  if (isWrong.value) isWrong.value = false
}
const checkAnswer = () => {
  const userAnsStr = userInput.value.toString()
  const targetAnsStr = question.value.answer.toString()
  if (userAnsStr.length >= targetAnsStr.length) {
    if (parseInt(userInput.value) === question.value.answer) {
      isWrong.value = false
      score.value++
      combo.value++
      nextQuestion()
    } else {
      lives.value--
      isWrong.value = true
      combo.value = 0
      if (lives.value <= 0) {
        gameOver() // Panggil fungsi selesai
      }
      setTimeout(() => {
        isWrong.value = false
        userInput.value = ''
      }, 800)
      userInput.value = ''
    }
  }
}

const nextQuestion = () => {
  if (currentStep.value < 10) {
    currentStep.value++
    generateQuestion()
    focusInput()
  } else {
    finishGame()
  }
}

const saveHistory = () => {
  const history = JSON.parse(localStorage.getItem('fastmath_history') || '[]')
  const lastSession = history[0]

  let status = 'NEW'
  if (lastSession) {
    status =
      score.value > lastSession.score ? 'UP' : score.value < lastSession.score ? 'DOWN' : 'STABLE'
  }
  const newEntry = {
    id: Date.now(),
    mode: props.mode,
    level: props.level,
    score: score.value,
    time: totalTimeSpent.value, // Simpan waktu dalam detik
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
    status: status,
  }

  history.unshift(newEntry)
  localStorage.setItem('fastmath_history', JSON.stringify(history.slice(0, 10)))
}

const finishGame = () => {
  clearInterval(timerInterval)
  stopGameTimer()
  isFinished.value = true
  saveHistory()
}

onMounted(() => {
  generateQuestion()
  focusInput()
  checkDevice()
  window.addEventListener('resize', checkDevice)
  setTimeout(focusInput, 500)
  window.addEventListener('click', focusInput)
  window.addEventListener('keydown', (e) => {
    if (!showKeypad.value) focusInput()
  })
})
onUnmounted(() => {
  clearInterval(timerInterval)
  window.removeEventListener('resize', checkDevice)
  window.removeEventListener('click', focusInput)
  window.removeEventListener('keydown', focusInput)
})
</script>

<template>
  <div class="max-w-xl mx-auto h-screen w-screen overflow-hidden">
    <div
      v-if="!isFinished"
      class="h-screen max-h-screen flex flex-col bg-gray-100 shadow-lg rounded-2xl overflow-hidden font-sans relative"
    >
      <div
        :class="[
          'fixed inset-y-0 left-0 w-1 z-[60] transition-all duration-500',
          timeLeft < 2 && !isFinished
            ? 'shadow-[15px_0_30px_rgba(239,68,68,0.3)] bg-red-500/20'
            : 'shadow-none bg-transparent',
          isWrong ? 'shadow-[30px_0_50px_rgba(239,68,68,0.5)] bg-red-600/40' : '',
        ]"
      ></div>

      <div
        :class="[
          'fixed inset-y-0 right-0 w-1 z-[60] transition-all duration-500',
          timeLeft < 2 && !isFinished
            ? 'shadow-[-15px_0_30px_rgba(239,68,68,0.3)] bg-red-500/20'
            : 'shadow-none bg-transparent',
          isWrong ? 'shadow-[-30px_0_50px_rgba(239,68,68,0.5)] bg-red-600/40' : '',
        ]"
      ></div>
      <GameHeader
        :mode="translateMode(props.mode)"
        :level="translateLevel(props.level)"
        :currentStep="currentStep"
        :timeLeft="timeLeft"
        :timeLimit="timeLimit"
        :score="score"
        :lives="lives"
      />

      <main
        :class="[
          'flex-1 flex flex-col justify-center px-6 transition-transform',
          isWrong ? 'animate-shake-screen' : '',
        ]"
      >
        <GameStage
          :display="question.display"
          :userInput="userInput"
          :isWrong="isWrong"
          :combo="combo"
          :methodTitle="dbService.getLessonById(route.query.method)?.title"
        />

        <div v-if="!isMobile" class="flex justify-center mt-4">
          <button
            @click="showKeypad = !showKeypad"
            class="text-[10px] font-black text-slate-400 uppercase border-b border-slate-200"
          >
            Mode: {{ showKeypad ? 'Keypad' : 'Keyboard' }}
          </button>
        </div>
      </main>

      <transition name="slide">
        <footer v-if="isMobile || showKeypad" class="bg-white border-t border-slate-100 pb-safe">
          <Keypad @pressKey="pressKey" @clearInput="clearInput" />
        </footer>
      </transition>

      <input
        v-if="!isMobile || !showKeypad"
        ref="inputField"
        v-model="userInput"
        @input="checkAnswer"
        class="opacity-0 absolute -z-10"
      />
    </div>
    <FinishView v-else :score="score" :totalTimeSpent="totalTimeSpent" />
    <div
      :class="[
        'fixed inset-0 pointer-events-none z-50 transition-opacity duration-300',
        timeLeft < 2 && !isFinished ? 'opacity-100' : 'opacity-0',
      ]"
      style="background: radial-gradient(circle, transparent 40%, rgba(239, 68, 68, 0.15) 100%)"
    >
      <div
        v-if="isWrong"
        class="absolute inset-0 bg-red-500/30 backdrop-blur-[1px] animate-flash"
      ></div>
    </div>
  </div>
</template>
<style scoped>
@keyframes breathe {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-breathe {
  animation: breathe 1.5s ease-in-out infinite;
}

/* Transisi halus agar tidak mengagetkan */
.transition-all {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes shake-screen {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-8px) rotate(-1deg);
  }
  75% {
    transform: translateX(8px) rotate(1deg);
  }
}
.animate-shake-screen {
  animation: shake-screen 0.2s ease-in-out infinite;
}
</style>
