<script setup>
import { TrophyIcon, ClockIcon, HeartIcon, Squares2X2Icon } from '@heroicons/vue/24/solid'

defineProps({
  mode: String,
  level: String,
  diff: String,
  currentStep: Number,
  timeLeft: Number,
  timeLimit: Number,
  score: Number,
  lives: { type: Number, default: 3 },
})
</script>

<template>
  <header class="w-full bg-white flex flex-col shadow-sm z-20 select-none">
    <div class="px-6 py-3 flex justify-between items-center border-b border-slate-50">
      <div class="flex items-center gap-2">
        <div class="w-1.5 h-4 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.3)]"></div>
        <span class="text-base font-black tracking-tighter text-slate-800 italic uppercase">
          CEKAS<span class="text-blue-600 NOT-italic">.</span>
        </span>
      </div>

      <div
        class="flex items-center gap-1.5 font-black uppercase tracking-wider italic text-[9px] text-slate-400"
      >
        <Squares2X2Icon class="w-3 h-3" />
        <span class="text-slate-500">{{ mode }}</span>
        <span class="opacity-30">/</span>
        <span class="text-slate-500">{{ level }}</span>
        <span v-if="diff" class="opacity-30">/</span>
        <span v-if="diff" class="text-slate-500">{{ diff }}</span>
      </div>
    </div>

    <div class="px-6 py-4 grid grid-cols-3 items-center">
      <div class="flex flex-col gap-1.5">
        <div class="flex items-center gap-0.5">
          <HeartIcon
            v-for="i in 3"
            :key="i"
            :class="[
              'w-3.5 h-3.5 transition-all duration-300',
              i <= lives ? 'text-red-500 drop-shadow-sm' : 'text-slate-100',
            ]"
          />
        </div>
        <div class="flex items-baseline gap-1">
          <span class="text-xl font-black text-slate-800 leading-none tabular-nums">{{
            currentStep
          }}</span>
          <span class="text-[10px] font-bold text-slate-300 uppercase tracking-tighter"
            >/ {{ timeLimit ? '10 SOAL' : '∞' }}</span
          >
        </div>
      </div>

      <div class="flex flex-col items-center gap-1.5">
        <div
          :class="[
            'flex items-center gap-1 tabular-nums',
            timeLeft < 3 && timeLimit ? 'text-red-500 animate-pulse' : 'text-slate-400',
          ]"
        >
          <ClockIcon v-if="timeLimit" class="w-3 h-3" />
          <span class="text-[11px] font-black tracking-widest">{{
            timeLimit ? timeLeft.toFixed(1) + 's' : '∞'
          }}</span>
        </div>
        <div class="w-full max-w-[100px] bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div
            class="h-full transition-all duration-100 ease-linear rounded-full"
            :class="timeLeft < timeLimit * 0.3 ? 'bg-red-500' : 'bg-blue-600'"
            :style="{ width: (timeLeft / timeLimit) * 100 + '%' }"
          ></div>
        </div>
      </div>

      <div class="flex flex-col items-end">
        <span
          class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1"
          >Score</span
        >
        <div class="flex items-center gap-1.5">
          <span
            class="text-2xl font-black text-blue-600 leading-none tracking-tighter italic drop-shadow-sm"
            >{{ score }}</span
          >
          <TrophyIcon class="w-3 h-3 text-blue-100" />
        </div>
      </div>
    </div>
  </header>
</template>
