<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { GAME_CONFIG } from '@/constants/GameConfig'
import {
  PlusIcon,
  MinusIcon,
  XMarkIcon,
  VariableIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  SparklesIcon,
  ClockIcon,
} from '@heroicons/vue/24/outline'
import AppHeader from '@/components/AppHeader.vue'
import { APP_IDENTITY } from '@/constants/appConfig'

const router = useRouter()
const step = ref(1)
const selectedMode = ref('')
const selectedLevel = ref('')

const modes = GAME_CONFIG.MODES
const levels = GAME_CONFIG.LEVELS
const difficulties = GAME_CONFIG.DIFFICULTIES

// Fungsi Navigasi State
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
    params: {
      mode: selectedMode.value,
      level: selectedLevel.value,
    },
    query: { timer: timeLimit },
  })
}
</script>

<template>
  <AppHeader class="mb-8" />
  <div class="space-y-6">
    <button
      v-if="step > 1"
      @click="step--"
      class="flex items-center gap-2 text-slate-400 font-bold text-sm mb-2 hover:text-blue-600 transition-colors"
    >
      <ArrowLeftIcon class="w-4 h-4" /> KEMBALI
    </button>

    <div v-if="step === 1" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2
        class="text-xl font-black text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-tight"
      >
        <span class="w-2 h-8 bg-blue-600 rounded-full"></span>
        Pilih Operasi
      </h2>

      <div class="grid gap-4">
        <button
          v-for="mode in modes"
          :key="mode.id"
          @click="handleSelectMode(mode.id)"
          class="group flex items-center justify-between p-5 bg-white border-2 border-slate-100 rounded-3xl hover:border-blue-500 transition-all active:scale-95 shadow-sm"
        >
          <div class="flex items-center gap-4 text-left">
            <div :class="[mode.color, 'p-3 rounded-2xl text-white shadow-lg shrink-0']">
              <component :is="mode.icon" class="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <span class="block font-extrabold text-slate-700 text-lg leading-tight">{{
                mode.name
              }}</span>
              <span class="block text-xs text-slate-400 font-medium mt-0.5">{{ mode.desc }}</span>
            </div>
          </div>
          <ChevronRightIcon
            class="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors shrink-0"
          />
        </button>
      </div>
    </div>

    <div v-if="step === 2" class="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 class="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight">
        Tingkat Kesulitan
      </h2>
      <div class="grid gap-4">
        <button
          v-for="lvl in levels"
          :key="lvl.id"
          @click="handleSelectLevel(lvl.id)"
          class="p-6 bg-white border-2 border-slate-100 rounded-3xl text-left hover:border-emerald-500 hover:bg-emerald-50 transition-all active:scale-95 shadow-sm group"
        >
          <p class="font-black text-slate-700 text-xl group-hover:text-emerald-700 uppercase">
            {{ lvl.name }}
          </p>
          <p class="text-sm text-slate-400 font-medium">{{ lvl.desc }}</p>
        </button>
      </div>
    </div>

    <div v-if="step === 3" class="animate-in fade-in zoom-in duration-300">
      <h2 class="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight">
        Target Waktu Per Soal
      </h2>
      <p class="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6 italic">
        Seberapa cepat kamu berpikir?
      </p>

      <div class="grid gap-4">
        <button
          v-for="diff in difficulties"
          :key="diff.id"
          @click="startGame(diff.id)"
          class="p-6 bg-white border-2 border-slate-100 rounded-[2rem] text-left hover:border-amber-500 transition-all active:scale-95 shadow-sm group flex items-center justify-between"
        >
          <div>
            <p class="font-black text-slate-700 text-xl uppercase group-hover:text-amber-600">
              {{ diff.label }}
            </p>
            <p class="text-sm text-slate-400 font-medium">{{ diff.desc }}</p>
          </div>
          <div
            class="text-2xl font-black text-amber-500 bg-amber-50 w-14 h-14 rounded-2xl flex items-center justify-center border border-amber-100"
          >
            {{ diff.time }}s
          </div>
        </button>
      </div>
    </div>

    <div v-if="step === 1" class="pt-4 space-y-3">
      <button
        @click="router.push('/learn')"
        class="w-full p-5 bg-slate-800 rounded-3xl text-white flex items-center justify-center gap-3 hover:bg-slate-700 transition-colors shadow-xl"
      >
        <SparklesIcon class="w-5 h-5 text-amber-400" />
        <span class="font-bold">Masuk ke Kursus Metode</span>
      </button>
      <button
        @click="router.push('/history')"
        class="w-full p-5 bg-white shadow-md border-2 border-slate-200 rounded-3xl text-slate-600 flex items-center justify-center gap-3 hover:border-blue-200 hover:bg-blue-50 transition-all active:scale-95"
      >
        <ClockIcon class="w-5 h-5 text-blue-500" />
        <span class="font-bold tracking-tight text-slate-700 uppercase text-sm"
          >Lihat Riwayat Skor</span
        >
      </button>
    </div>
  </div>
  <footer class="p-8 text-center border-t border-slate-100">
    <p class="text-[11px] text-slate-400 font-medium italic">
      &copy; {{ new Date().getFullYear() }} {{ APP_IDENTITY.copyright }}
    </p>
  </footer>
</template>
