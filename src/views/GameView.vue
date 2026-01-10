<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { dbService } from '@/services/dbService'
import { ClockIcon } from '@heroicons/vue/24/outline'

const props = defineProps(['mode', 'level'])
const router = useRouter()
const route = useRoute()

const question = ref({ display: '', answer: 0 })
const userInput = ref('')
const isWrong = ref(false)
const combo = ref(0)
const score = ref(0)
const currentStep = ref(1)
const timeLeft = ref(5)
const isFinished = ref(false)
const startTime = ref(null)
const totalTimeSpent = ref(0) // Dalam detik
let timerInterval = null

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

const generateQuestion = () => {
  const methodId = route.query.method
  const methodConfig = methodId ? dbService.getGameConfigByLessonId(methodId) : null
  
  let finalAnswer = 0
  let displayStr = ''
  if (currentStep.value === 1 && !startTime.value) {
    startGameTimer()
  }

  if (methodId === 'trik-perkalian-11') {
    // Trik Perkalian 11: Pastikan salah satu angka adalah 11
    let min = 10, max = 99; // Default puluhan
    let a = Math.floor(Math.random() * (max - min + 1)) + min;
    let b = 11; 
    // Acak posisi 11 agar tidak bosan
    if (Math.random() > 0.5) [a, b] = [b, a];
    
    finalAnswer = a * b;
    displayStr = `${a} × ${b}`;
  }
  else if (methodId === 'pembulatan-sembilan') {
    // Trik Pembulatan 9: Pastikan angka kedua berakhiran 9
    let a = Math.floor(Math.random() * 90) + 10;
    let b = (Math.floor(Math.random() * 9) * 10) + 9; // Menghasilkan 9, 19, 29, ... 89
    
    finalAnswer = a + b;
    displayStr = `${a} + ${b}`;
  }
  else {
  // Fungsi untuk ambil operator berdasarkan pilihan Mode
  const getOpSymbol = () => {
    const activeMode =
      props.mode === 'random'
        ? ['addition', 'subtraction', 'multiplication', 'division'][Math.floor(Math.random() * 4)]
        : props.mode

    const symbols = { addition: '+', subtraction: '-', multiplication: '×', division: '÷' }
    return { name: activeMode, symbol: symbols[activeMode] }
  }

  if (props.level === 'berantai') {
    // --- LOGIKA BERANTAI (3-5 Angka Satuan) ---
    const count = Math.floor(Math.random() * 3) + 3 // 3, 4, atau 5 angka
    let currentVal = Math.floor(Math.random() * 9) + 1
    finalAnswer = currentVal
    displayStr = currentVal.toString()

    for (let i = 1; i < count; i++) {
      const nextVal = Math.floor(Math.random() * 9) + 1
      const op = getOpSymbol()

      // Eksekusi kalkulasi berdasarkan operator yang didapat
      if (op.name === 'addition') {
        finalAnswer += nextVal
      } else if (op.name === 'subtraction') {
        if (finalAnswer - nextVal < 0) {
          // Proteksi hasil negatif
          finalAnswer += nextVal
          displayStr += ` + ${nextVal}`
          continue
        }
        finalAnswer -= nextVal
      } else if (op.name === 'multiplication') {
        finalAnswer *= nextVal
      } else {
        // Division
        if (finalAnswer % nextVal === 0 && finalAnswer !== 0) {
          finalAnswer /= nextVal
        } else {
          // Jika tidak bulat, ganti jadi tambah saja
          finalAnswer += nextVal
          displayStr += ` + ${nextVal}`
          continue
        }
      }
      displayStr += ` ${op.symbol} ${nextVal}`
    }
  } else {
    // --- LOGIKA NORMAL (2 Angka: Satuan/Puluhan/Ratusan) ---
    let min = 1,
      max = 9
    if (props.level === 'puluhan') {
      min = 10
      max = 99
    }
    if (props.level === 'ratusan') {
      min = 100
      max = 999
    }

    let a = Math.floor(Math.random() * (max - min + 1)) + min
    let b = Math.floor(Math.random() * (max - min + 1)) + min
    const op = getOpSymbol()

    if (op.name === 'addition') {
      finalAnswer = a + b
    } else if (op.name === 'subtraction') {
      if (a < b) [a, b] = [b, a]
      finalAnswer = a - b
    } else if (op.name === 'multiplication') {
      if (props.level !== 'satuan') b = Math.floor(Math.random() * 10) + 1
      finalAnswer = a * b
    } else {
      // Division
      finalAnswer = a
      a = a * b // Teknik agar hasil bagi selalu bulat
      finalAnswer = a / b
    }
    displayStr = `${a} ${op.symbol} ${b}`
  }}

  question.value = { display: displayStr, answer: finalAnswer }
  userInput.value = ''
  resetTimer()
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

const resetTimer = () => {
  timeLeft.value = 5 // Detik per soal
  clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    timeLeft.value -= 0.1
    if (timeLeft.value <= 0) nextQuestion()
  }, 100)
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
    }else{
      isWrong.value = true
      combo.value = 0
      setTimeout(() => {
        isWrong.value = false
        userInput.value = ""
      }, 800)
      userInput.value = ''
    }
  }
}

const nextQuestion = () => {
  if (currentStep.value < 10) {
    currentStep.value++
    generateQuestion()
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

onMounted(generateQuestion)
onUnmounted(() => clearInterval(timerInterval))
</script>

<template>
  <div class="max-w-md mx-auto">
    <div v-if="!isFinished" class="space-y-4">
    <div class="text-center mb-2">
      <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
        {{ translateMode(props.mode) }} • {{ translateLevel(props.level) }}
      </h2>
    </div>

    <div 
      :class="[
        'bg-white p-8 rounded-[2.5rem] shadow-xl border-t-8 transition-all duration-300',
        isWrong ? 'border-red-500 animate-shake' : 'border-blue-500'
      ]"
    >
      <div v-if="route.query.method" class="mb-4 flex justify-center">
        <div class="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-amber-100 shadow-sm">
          <SparklesIcon class="w-3 h-3" />
          Materi: {{ dbService.getLessonById(route.query.method)?.title }}
        </div>
      </div>

      <div v-if="combo > 1" class="animate-bounce text-secondary font-black text-sm">
  🔥 {{ combo }} COMBO!
</div>
      <div class="flex justify-between items-center mb-6 text-sm font-black uppercase tracking-tighter">
        <span class="text-slate-400">SOAL : <span class="text-slate-800">{{ currentStep }}</span>/10</span>
        <span :class="timeLeft < 2 ? 'text-red-500 animate-pulse' : 'text-slate-400'">
          {{ timeLeft.toFixed(1) }}s
        </span>
      </div>

      <div class="w-full bg-slate-100 h-2.5 rounded-full mb-10 overflow-hidden">
        <div
          class="h-full transition-all duration-100 ease-linear"
          :class="timeLeft < 2 ? 'bg-red-500' : 'bg-blue-500'"
          :style="{ width: (timeLeft / 5) * 100 + '%' }"
        ></div>
      </div>

      
      <div
        :class="[
          'font-black mb-10 text-slate-700 text-center italic transition-all duration-300 drop-shadow-sm',
          question.display.length > 10 ? 'text-4xl' : 'text-6xl',
        ]"
      >
        {{ question.display }}
      </div>

      <div class="relative">
        <input
          v-model="userInput"
          @input="checkAnswer"
          type="number"
          inputmode="numeric"
          :class="['w-full text-center text-5xl p-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:bg-white  outline-none transition-all font-black text-slate-800', isWrong ? 'animate-shake border-red-500 focus:border-red-500' : 'focus:border-blue-500']"
          placeholder="?"
          ref="inputField"
          autofocus
        />
        
        <transition name="slide-up">
  <p 
    v-if="isWrong" 
    class="absolute -bottom-6 left-0 right-0 text-center text-red-500 text-[10px] font-black uppercase tracking-widest"
  >
    Jawaban Kurang Tepat! Coba lagi...
  </p>
</transition>
      </div>
    </div>
  </div>
    <div v-else class="text-center animate-in zoom-in duration-300">
      <h2 class="text-3xl font-black text-slate-800 mb-2">SESI SELESAI!</h2>
      <p class="text-slate-500 mb-8 italic">Hasil performa Anda:</p>

      <div class="grid grid-cols-2 gap-4 mb-8">
        <div class="bg-blue-50 p-6 rounded-3xl border-2 border-blue-100">
          <p class="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Skor Akhir</p>
          <p class="text-4xl font-black text-blue-700">
            {{ score }}<span class="text-xl text-blue-400">/10</span>
          </p>
        </div>

        <div class="bg-amber-50 p-6 rounded-3xl border-2 border-amber-100">
          <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">Waktu Total</p>
          <p class="text-4xl font-black text-amber-700">
            {{ totalTimeSpent }}<span class="text-xl text-amber-400">s</span>
          </p>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <button
          @click="router.push('/')"
          class="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 transition-colors shadow-xl"
        >
          Main Lagi
        </button>
        <button
        @click="router.push('/history')"
        class="w-full p-4 bg-white shadow-md border-2 border-slate-200 rounded-2xl text-slate-600 flex items-center justify-center gap-3 hover:border-blue-200 hover:bg-blue-50 transition-all active:scale-95"
      >
        <ClockIcon class="w-5 h-5 text-blue-500" />
        <span class="font-bold tracking-tight text-slate-700">Lihat Riwayat Skor</span>
      </button>
      </div>
    </div>
  </div>
</template>
