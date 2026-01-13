<script setup>
import { useRouter } from 'vue-router'
import { SparklesIcon, ClockIcon } from '@heroicons/vue/24/outline'
const router = useRouter()
</script>

<template>
  <div class="pt-4 space-y-4">
    <button
      @click="router.push('/learn')"
      class="w-full p-5 bg-slate-900 rounded-3xl text-white flex items-center justify-between group active:scale-[0.98] transition-all border border-slate-800"
    >
      <div class="flex items-center gap-4">
        <div
          class="p-2.5 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl shadow-lg shadow-blue-500/20"
        >
          <SparklesIcon class="w-5 h-5 text-white" />
        </div>
        <span class="font-bold text-sm uppercase tracking-tight">Kursus Metode</span>
      </div>
      <ChevronRightIcon
        class="w-5 h-5 text-slate-600 group-hover:text-blue-400 transition-colors"
      />
    </button>

    <button
      @click="router.push('/history')"
      class="w-full p-5 bg-white border-2 border-slate-100 rounded-3xl text-slate-600 flex items-center gap-4 hover:border-blue-100 active:scale-[0.98] transition-all shadow-sm"
    >
      <div class="p-2.5 bg-slate-100 rounded-xl">
        <ClockIcon class="w-5 h-5 text-blue-600" />
      </div>
      <span class="font-bold uppercase text-sm tracking-tight text-slate-700">Riwayat Skor</span>
    </button>
  </div>
</template>
