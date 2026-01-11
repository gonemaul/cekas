<script setup>
import { computed } from 'vue'
import { GAME_CONFIG } from '@/constants/GameConfig'
import { ArrowPathIcon, HomeIcon, TrophyIcon, HeartIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  isGameOver: Boolean, // Jika true = Nyawa Habis, Jika false = Finish 10 soal
  score: Number,
  totalTime: Number,
  avgTime: Number,
  accuracy: Number,
  mode: String,
  level: String,
  diff: String,
})

const emit = defineEmits(['retry', 'home'])

const title = computed(() => (props.isGameOver ? 'Game Over!' : 'Luar Biasa!'))
const subtitle = computed(() =>
  props.isGameOver ? 'Jangan menyerah, coba lagi!' : 'Kamu berhasil menyelesaikan tantangan.',
)
const themeColor = computed(() => (props.isGameOver ? 'text-red-600' : 'text-emerald-600'))
</script>

<template>
  <div
    class="fixed inset-0 z-[200] p-4 flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-md"
  >
    <div
      class="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300"
    >
      <div :class="['p-8 text-center', isGameOver ? 'bg-red-50' : 'bg-emerald-50']">
        <div
          :class="[
            'inline-flex p-4 rounded-full mb-4',
            isGameOver ? 'bg-red-100' : 'bg-emerald-100',
          ]"
        >
          <component :is="isGameOver ? HeartIcon : TrophyIcon" :class="['w-12 h-12', themeColor]" />
        </div>
        <h1 :class="['text-3xl font-black mb-1', themeColor]">{{ title }}</h1>
        <p class="text-slate-500 font-medium">{{ subtitle }}</p>
      </div>

      <div class="p-8 grid grid-cols-2 gap-4">
        <div class="bg-slate-50 p-4 rounded-2xl border shadow border-slate-100">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Skor Akhir</p>
          <p class="text-2xl font-black text-slate-800">{{ score }}</p>
        </div>
        <div class="bg-blue-50 p-4 rounded-2xl border shadow border-blue-100">
          <p class="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">Rata-rata</p>
          <div class="flex items-baseline gap-1">
            <p class="text-2xl font-black text-blue-700">{{ avgTime }}</p>
            <span class="text-xs font-bold text-blue-400">s/soal</span>
          </div>
        </div>
        <div class="bg-slate-50 p-4 rounded-2xl border shadow border-slate-100">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Waktu</p>
          <p class="text-2xl font-black text-slate-800">{{ totalTime }}s</p>
        </div>
        <div class="bg-slate-50 p-4 rounded-2xl border shadow border-slate-100">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Akurasi</p>
          <p class="text-2xl font-black text-slate-800">{{ accuracy }}%</p>
        </div>
        <div
          class="col-span-2 bg-slate-900 p-5 rounded-2xl flex justify-between items-center text-white shadow-inner"
        >
          <div class="flex flex-col">
            <p class="text-[10px] font-black opacity-40 uppercase tracking-widest mb-1">Mode</p>
            <p class="text-sm font-bold text-blue-400">{{ mode }}</p>
          </div>

          <div class="h-8 w-px bg-white/10"></div>

          <div class="flex flex-col items-center">
            <p class="text-[10px] font-black opacity-40 uppercase tracking-widest mb-1">Level</p>
            <p class="text-sm font-bold text-emerald-400">{{ level }}</p>
          </div>

          <div class="h-8 w-px bg-white/10"></div>

          <div class="flex flex-col items-end">
            <p class="text-[10px] font-black opacity-40 uppercase tracking-widest mb-1">
              Kesulitan
            </p>
            <p class="text-sm font-bold text-amber-400">{{ diff }}</p>
          </div>
        </div>
      </div>

      <div class="px-8 pb-8 flex flex-col gap-3">
        <button
          @click="emit('retry')"
          class="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <ArrowPathIcon class="w-5 h-5" /> Main Lagi
        </button>
        <button
          @click="emit('home')"
          class="w-full py-4 shadow-md bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-600 rounded-3xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <HomeIcon class="w-5 h-5" /> Menu Utama
        </button>
      </div>
    </div>
  </div>
</template>
