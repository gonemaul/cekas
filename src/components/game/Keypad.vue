<script setup>
import { BackspaceIcon } from '@heroicons/vue/24/solid'

const emit = defineEmits(['pressKey', 'clearInput'])
</script>
<template>
  <div
    class="bg-slate-50/50 p-6 pb-10 border-t-2 border-slate-200 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.1)]"
  >
    <div class="grid grid-cols-3 gap-3 max-w-sm mx-auto">
      <button
        v-for="n in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
        :key="n"
        @click="emit('pressKey', n)"
        class="h-16 bg-white hover:bg-blue-50 active:scale-90 active:bg-blue-600 active:text-white text-3xl font-black text-slate-700 rounded-2xl transition-all flex items-center border-b-4 justify-center shadow-sm border border-slate-200/50"
      >
        {{ n }}
      </button>

      <button
        @click="emit('clearInput')"
        class="h-16 bg-slate-100/50 active:scale-90 active:bg-red-500 active:text-white text-red-400 rounded-2xl flex items-center justify-center transition-all border border-transparent"
      >
        <BackspaceIcon class="w-8 h-8" />
      </button>

      <button
        @click="emit('pressKey', 0)"
        class="h-16 bg-white hover:bg-blue-50 active:scale-90 active:bg-blue-600 active:text-white text-3xl font-black text-slate-700 rounded-2xl transition-all flex items-center justify-center shadow-sm border border-slate-200/50"
      >
        0
      </button>

      <div class="flex items-center justify-center">
        <span class="text-[10px] font-black text-slate-300 uppercase italic">Cekas.</span>
      </div>
    </div>
  </div>
</template>
