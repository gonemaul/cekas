<script setup>
import { useRouter } from 'vue-router'
import { ClockIcon } from '@heroicons/vue/24/solid'

const router = useRouter()
const props = defineProps(['score', 'totalTimeSpent'])
</script>
<template>
  <div class="text-center animate-in zoom-in duration-300">
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
</template>
