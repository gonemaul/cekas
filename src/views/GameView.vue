<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['mode', 'level'])
const router = useRouter()

const question = ref({ a: 0, b: 0, answer: 0, symbol: '' })
const userInput = ref('')
const score = ref(0)
const currentStep = ref(1)
const timeLeft = ref(5)
const isFinished = ref(false)
let timerInterval = null

const generateQuestion = () => {
  let min = 1, max = 9
  if (props.level === 'puluhan') { min = 10; max = 99 }
  if (props.level === 'ratusan') { min = 100; max = 999 }

  let a = Math.floor(Math.random() * (max - min + 1)) + min
  let b = Math.floor(Math.random() * (max - min + 1)) + min
  let answer, symbol

  // Logic Operasi
  if (props.mode === 'addition') { answer = a + b; symbol = '+' }
  else if (props.mode === 'subtraction') { if(a < b) [a, b] = [b, a]; answer = a - b; symbol = '-' }
  else if (props.mode === 'multiplication') { answer = a * b; symbol = '×' }
  else { answer = a; a = a * b; symbol = '÷' }

  question.value = { a, b, answer, symbol }
  userInput.value = ''
  resetTimer()
}

const translateMode = (mode) => {
  const map = {
    addition: 'Penjumlahan',
    subtraction: 'Pengurangan',
    multiplication: 'Perkalian',
    division: 'Pembagian'
  }
  return map[mode] || mode
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
  if (userInput.value.toString().length >= question.value.answer.toString().length) {
    if (parseInt(userInput.value) === question.value.answer) {
      score.value++
      nextQuestion()
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

const finishGame = () => {
  clearInterval(timerInterval)
  isFinished.value = true
  // Simpan History
  const history = JSON.parse(localStorage.getItem('fastmath_history') || '[]')
  const lastSession = history[0]
  
  let status = 'NEW'
  if (lastSession) {
    status = score.value > lastSession.score ? 'UP' : (score.value < lastSession.score ? 'DOWN' : 'STABLE')
  }
  history.unshift({
    id: Date.now(),
    mode: props.mode,
    level: props.level,
    score: score.value,
    date: new Date().toLocaleDateString()
  })
  localStorage.setItem('fastmath_history', JSON.stringify(history.slice(0, 10)))
}

onMounted(generateQuestion)
onUnmounted(() => clearInterval(timerInterval))
</script>

<template>
  <div class="max-w-md mx-auto">
    <div v-if="!isFinished" class="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-blue-500 text-center">
      <div class="flex justify-between items-center mb-6 text-sm font-bold text-slate-400">
        <span>SOAL {{ currentStep }}/10</span>
        <span class="text-red-500">{{ timeLeft.toFixed(1) }}s</span>
      </div>
      
      <div class="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden">
        <div class="bg-blue-500 h-full transition-all duration-100" :style="{ width: (timeLeft/5)*100 + '%' }"></div>
      </div>
  
      <div class="text-6xl font-black mb-8">{{ question.a }} {{ question.symbol }} {{ question.b }}</div>
  
      <input 
        v-model="userInput" 
        @input="checkAnswer"
        type="number" 
        class="w-full text-center text-4xl p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-500 outline-none"
        placeholder="?"
        autofocus
      />
    </div>
    <div v-else class="bg-white p-10 rounded-3xl shadow-2xl text-center border-b-8 border-green-500">
      <h2 class="text-2xl font-black text-slate-800 mb-2">SESI SELESAI!</h2>
      <p class="text-slate-500 mb-6 italic">
  Mode {{ translateMode(mode) }} - {{ level }}
</p>
      
      <div class="text-8xl font-black text-blue-600 mb-4">{{ score }}<span class="text-3xl text-slate-300">/10</span></div>
      
      <p class="text-slate-600 mb-8 font-medium">
        {{ score >= 8 ? 'Luar biasa! Pertahankan!' : 'Terus berlatih ya!' }}
      </p>

      <div class="flex flex-col gap-3">
        <button @click="router.push('/')" class="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition">
          Main Lagi
        </button>
        <button @click="router.push('/history')" class="w-full py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition">
          Lihat Riwayat
        </button>
      </div>
    </div>
  </div>
</template>