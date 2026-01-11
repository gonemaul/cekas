<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { GAME_CONFIG } from '@/constants/GameConfig'
import { dbService } from '@/services/dbService'
import { useKeyboard } from '@/composables/useKeyboard'
import { QuestionEngine } from '@/services/QuestionEngine'
import { GameEngine } from '@/services/GameEngine'
import { StorageService } from '@/services/StorageService'
import { useTimer } from '@/composables/useTimer'
import { audioService } from '@/services/AudioService'

// Components
import GameHeader from '@/components/game/GameHeader.vue'
import GameStage from '@/components/game/QuestionStage.vue'
import Keypad from '@/components/game/Keypad.vue'
import VisualAlert from '@/components/game/VisualAlert.vue'
import ResultOverlay from '@/components/game/ResultOverlay.vue'

const props = defineProps(['mode', 'level'])
const route = useRoute()

// --- RESPONSIVE LOGIC ---
const isMobile = ref(false)
const showKeypad = ref(true)

const checkDevice = () => {
  isMobile.value = window.innerWidth < 768
  // Jika desktop dan user belum set manual, default sembunyikan keypad
  if (!isMobile.value) showKeypad.value = false
}

// --- STATE ---
const question = ref({ display: '', answer: 0 })
const userInput = ref('')
const score = ref(0)
const lives = ref(3)
const combo = ref(0)
const currentStep = ref(1)
const isFinished = ref(false)
const isGameOver = ref(false)
const isWrong = ref(false)
const startTime = ref(null)
const totalTimeSpent = ref(0)
const modeInfo = GAME_CONFIG.getModeById(props.mode)
const levelInfo = GAME_CONFIG.getLevelById(props.level)
const diffInfo = GAME_CONFIG.getDiffById(route.query.timer)
const timeLimit = diffInfo?.time
// --- COMPOSABLES ---
const { inputField, forceFocus, handleKeyPress, handleClear } = useKeyboard(userInput)
const { timeLeft, start: startTimer, stop: stopTimer } = useTimer(timeLimit)

// --- CORE METHODS ---
const generateNewQuestion = () => {
  question.value = QuestionEngine.generate(props.mode, props.level, route.query.method)
  userInput.value = ''
  if (currentStep.value === 1 && !startTime.value) startTime.value = Date.now()
  startTimer(handleTimeout)
}

const checkAnswer = () => {
  if (QuestionEngine.isInputFull(userInput.value, question.value.answer)) {
    const isCorrect = QuestionEngine.isCorrect(userInput.value, question.value.answer)
    const result = GameEngine.updateStats(isCorrect, {
      score: score.value,
      lives: lives.value,
      combo: combo.value,
    })

    score.value = result.score
    lives.value = result.lives
    combo.value = result.combo
    isWrong.value = result.isWrong

    if (isCorrect) {
      audioService.play('success')
      nextStep()
    } else {
      audioService.play('wrong')
      if (lives.value <= 0) return finishGame('gameover')
      setTimeout(() => {
        isWrong.value = false
        userInput.value = ''
      }, 800)
    }
  }
}

const nextStep = () => {
  const isInfinite = route.query.timer === 'survive'
  if (isInfinite || currentStep.value < GAME_CONFIG.SETTINGS.TOTAL_STEPS) {
    currentStep.value++
    generateNewQuestion()
    forceFocus()
  } else {
    finishGame()
  }
}

const handleTimeout = () => {
  lives.value--
  if (lives.value <= 0) finishGame('gameover')
  else nextStep()
}

const averageTimePerQuestion = computed(() => {
  if (currentStep.value === 0) return 0
  // Menghitung rata-rata dengan satu angka di belakang koma
  return parseFloat((totalTimeSpent.value / currentStep.value).toFixed(1))
})

const finishGame = (status = 'finish') => {
  stopTimer()
  isFinished.value = true
  isGameOver.value = status === 'gameover'
  if (startTime.value) {
    totalTimeSpent.value = Math.floor((Date.now() - startTime.value) / 1000)
  }
  isFinished.value = true

  StorageService.saveHistory({
    mode: modeInfo?.name || props.mode,
    level: levelInfo?.name || props.level,
    score: score.value,
    time: totalTimeSpent.value,
    status: isGameOver.value ? 'FAILED' : 'SUCCESS',
  })
}

const handleRetry = () => window.location.reload()
const handleHome = () => router.push('/')
// Event Handlers untuk Keypad.vue
const pressKey = (num) => handleKeyPress(num, checkAnswer)
const clearInput = () => handleClear()

// --- LIFECYCLE ---
onMounted(() => {
  checkDevice()
  generateNewQuestion()
  window.addEventListener('resize', checkDevice)
  window.addEventListener('click', forceFocus)
  window.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') forceFocus()
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', checkDevice)
  window.removeEventListener('click', forceFocus)
})
</script>

<template>
  <div class="max-w-xl h-screen overflow-hidden">
    <div
      v-if="!isFinished"
      class="h-screen max-h-screen flex flex-col bg-gray-100 shadow-lg rounded-2xl overflow-hidden font-sans relative"
    >
      <VisualAlert
        :timeLimit="timeLimit"
        :timeLeft="timeLeft"
        :isFinished="isFinished"
        :isWrong="isWrong"
      />
      <GameHeader
        :mode="modeInfo?.name || props.mode"
        :level="levelInfo?.name || props.level"
        :diff="diffInfo?.label"
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
          :showKeypad="showKeypad"
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
    <ResultOverlay
      v-if="isFinished"
      :isGameOver="isGameOver"
      :score="score"
      :totalTime="totalTimeSpent"
      :avgTime="averageTimePerQuestion"
      :accuracy="Math.round((score / currentStep) * 100)"
      :mode="modeInfo?.name"
      :level="levelInfo?.name"
      :diff="diffInfo?.label"
      @retry="handleRetry"
      @home="handleHome"
    />
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
