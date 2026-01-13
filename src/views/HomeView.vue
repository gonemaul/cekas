<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { GAME_CONFIG } from '@/constants/GameConfig'
import { APP_IDENTITY } from '@/constants/appConfig'

// Import Komponen Baru
import HomeHeader from '@/components/home/HomeHeader.vue'
import HomeHero from '@/components/home/HomeHero.vue'
import ModeSelector from '@/components/home/ModeSelector.vue'
import LevelSelector from '@/components/home/LevelSelector.vue'
import DifficultySelector from '@/components/home/DifficultySelector.vue'
import QuickNav from '@/components/home/QuickNav.vue'
import HomeFooter from '@/components/home/HomeFooter.vue'
import InfoModal from '@/components/modals/InfoModal.vue'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const step = ref(1)
const selectedMode = ref('')
const selectedLevel = ref('')
const isInfoOpen = ref(false)
const activeTab = ref('about')

const openInfo = (tab) => {
  activeTab.value = tab
  isInfoOpen.value = true
}

const handleSelectMode = (id) => {
  selectedMode.value = id
  step.value = 2
}

const handleSelectLevel = (id) => {
  selectedLevel.value = id
  step.value = 3
}

const startGame = (timeLimit) => {
  router.push({
    name: 'game',
    params: { mode: selectedMode.value, level: selectedLevel.value },
    query: { timer: timeLimit },
  })
}
</script>

<template>
  <InfoModal v-if="isInfoOpen" :initialTab="activeTab" @close="isInfoOpen = false" />
  <div class="min-h-screen bg-slate-50 flex flex-col shadow-2xl shadow-slate-200">
    <HomeHeader @open-info="openInfo('about')" />
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
      mode="out-in"
    >
      <main class="flex-1 p-4 space-y-6">
        <button
          v-if="step > 1"
          @click="step--"
          class="group flex items-center gap-2 text-slate-400 font-bold text-xs tracking-widest hover:text-blue-600 transition-all"
        >
          <ArrowLeftIcon class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          KEMBALI
        </button>
        <Transition name="step-fade" mode="out-in">
          <div :key="step">
            <HomeHero v-if="step === 1" class="mb-5" />
            <ModeSelector v-if="step === 1" :modes="GAME_CONFIG.MODES" @select="handleSelectMode" />

            <LevelSelector
              v-if="step === 2"
              :levels="GAME_CONFIG.LEVELS"
              @select="handleSelectLevel"
            />

            <DifficultySelector
              v-if="step === 3"
              :difficulties="GAME_CONFIG.DIFFICULTIES"
              @select="startGame"
            />

            <QuickNav v-if="step === 1" />
          </div>
        </Transition>
      </main>
    </Transition>

    <HomeFooter @open-patch="openInfo('patch')" />
  </div>
</template>
<style scoped>
/* Animasi Slide-Fade untuk perpindahan Step */
.step-fade-enter-active,
.step-fade-leave-active {
  transition: all 0.3s ease-out;
}

.step-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.step-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
