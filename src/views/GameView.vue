<script setup>
import { ref, onMounted, onUnmounted,nextTick } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { dbService } from '@/services/dbService'
import { generateQuestionLogic } from '@/services/questionGenerator'
import { ClockIcon } from '@heroicons/vue/24/outline'

const props = defineProps(['mode', 'level'])
const router = useRouter()
const route = useRoute()

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

const focusInput = () => {
  nextTick(() => {
    if (inputField.value) {
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
  const newQuestion = generateQuestionLogic(
    props.mode, 
    props.level, 
    route.query.method
  );

  // Update state
  question.value = newQuestion;
  userInput.value = '';
  
  if (currentStep.value === 1 && !startTime.value) startGameTimer();
  resetTimer();
};

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
})
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
          :class="timeLeft < (timeLimit * 0.3) ? 'bg-red-500' : 'bg-blue-500'"
          :style="{ width: (timeLeft / timeLimit) * 100 + '%' }"
        ></div>
      </div>

      
      <div
        :class="[
          'font-black mb-10 text-slate-700 text-center italic tracking-tighter transition-all duration-300 drop-shadow-sm',
          question.display.length > 10 ? 'text-4xl' : 'text-6xl',
        ]"
      >
        {{ question.display }}
      </div>

      <div class="relative">
        <input
        ref="inputField"
          v-model="userInput"
          @input="checkAnswer"
          type="number"
          inputmode="numeric"
          :class="['w-full text-center text-5xl p-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:bg-white  outline-none transition-all font-black text-slate-800', isWrong ? 'animate-shake border-red-500 focus:border-red-500' : 'focus:border-blue-500']"
          placeholder="?"
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
