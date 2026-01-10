<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { dbService } from '@/services/dbService'
import { generateQuestionLogic } from '@/services/questionGenerator'
import FinishView from '@/components/FinishView.vue'
import Keypad from '@/components/Keypad.vue'
import { SparklesIcon } from '@heroicons/vue/24/solid'

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
      isWrong.value = true
      combo.value = 0
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
})
onUnmounted(() => {
  clearInterval(timerInterval)
  window.removeEventListener('resize', checkDevice)
})
</script>

<template>
  <div class="max-w-xl mx-auto">
    <div
      v-if="!isFinished"
      class="h-screen max-h-screen flex flex-col bg-gray-100 shadow-lg rounded-2xl overflow-hidden font-sans relative"
    >
      <input
        v-if="!isMobile || !showKeypad"
        ref="inputField"
        v-model="userInput"
        @input="checkAnswer"
        type="number"
        inputmode="numeric"
        class="opacity-0 absolute -z-10 pointer-events-none"
        autofocus
      />

      <div class="flex-1 flex flex-col px-6 pt-8 justify-between pb-4">
        <div class="flex justify-between items-end px-2">
          <div class="flex flex-col">
            <span
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1"
              >Soal</span
            >
            <span class="text-xl font-black text-slate-800 leading-none"
              >{{ currentStep }}<span class="text-slate-300">/10</span></span
            >
          </div>

          <div class="flex flex-col items-center flex-1 px-8">
            <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-1">
              <div
                class="h-full transition-all duration-100 ease-linear"
                :class="timeLeft < timeLimit * 0.3 ? 'bg-red-500' : 'bg-blue-600'"
                :style="{ width: (timeLeft / timeLimit) * 100 + '%' }"
              ></div>
            </div>
            <span
              :class="[
                'text-[10px] font-bold tracking-tighter',
                timeLeft < 2 ? 'text-red-500' : 'text-slate-400',
              ]"
            >
              {{ timeLeft.toFixed(1) }} DETIK
            </span>
          </div>

          <div class="text-right flex flex-col">
            <span
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1"
              >Skor</span
            >
            <span class="text-xl font-black text-secondary leading-none">{{ score }}</span>
          </div>
        </div>

        <!-- <div class="flex-1 flex flex-col justify-center items-center py-4"> -->
        <div
          :class="[
            'flex-1 flex flex-col px-6 pt-8 transition-all duration-500 ease-in-out mx-auto w-full max-w-2xl',
            showKeypad ? 'justify-between pb-4' : 'justify-center max-h-[70vh] my-auto pb-10',
          ]"
        >
          <transition name="pop">
            <div
              v-if="combo > 1"
              class="mb-4 bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-xs font-black italic shadow-sm border border-orange-200"
            >
              🔥 {{ combo }} COMBO!
            </div>
          </transition>

          <div class="text-center">
            <h2
              :class="[
                'font-black text-slate-800 tracking-tighter italic leading-none transition-all mb-4',
                question.display.length > 8 ? 'text-5xl' : 'text-7xl',
              ]"
            >
              {{ question.display }}
            </h2>

            <div
              @click="focusInput"
              class="inline-flex items-center justify-center border-2 px-8 py-2 min-w-[140px] min-h-[70px] rounded-3xl transition-all duration-200 cursor-pointer"
              :class="
                isWrong
                  ? 'bg-red-50 text-red-600 border-red-500'
                  : userInput
                    ? 'bg-blue-50 text-blue-600 border-blue-600'
                    : 'bg-slate-100 text-slate-200 border-slate-300'
              "
            >
              <span class="text-5xl font-black tracking-widest">{{ userInput || '?' }}</span>
            </div>
          </div>

          <div class="mt-10 flex flex-col items-center gap-4">
            <button
              @click="toggleKeypad"
              class="group flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-full shadow-sm hover:border-blue-400 hover:bg-white transition-all duration-300"
            >
              <div class="p-1 rounded-full bg-slate-100 group-hover:bg-blue-100 transition-colors">
                <component
                  :is="showKeypad ? 'KeyboardIcon' : 'CalculatorIcon'"
                  class="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-600"
                />
              </div>
              <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest pr-1">
                {{ showKeypad ? 'Mode Keyboard' : 'Mode Layar Sentuh' }}
              </span>
            </button>

            <p
              v-if="!showKeypad"
              class="text-[9px] font-bold text-blue-400 animate-pulse uppercase tracking-tighter"
            >
              Keyboard Fisik Aktif
            </p>
          </div>
        </div>
      </div>

      <transition name="slide-up">
        <div v-if="isMobile || showKeypad" class="w-full">
          <Keypad @pressKey="pressKey" @clearInput="clearInput" />
        </div>
      </transition>
    </div>
    <FinishView v-else :score="score" :totalTimeSpent="totalTimeSpent" />
  </div>
</template>
<style scoped>
.pop-enter-active {
  animation: pop-in 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
@keyframes pop-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

/* Memastikan tidak ada seleksi teks saat tombol ditekan cepat */
button {
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}
/* Tambahkan di Style Scoped */
.keypad-slide-enter-active,
.keypad-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.keypad-slide-enter-from,
.keypad-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* Membuat konten utama bergeser mulus saat keypad muncul */
.flex-1 {
  transition:
    padding 0.5s ease,
    max-height 0.5s ease;
}
</style>
