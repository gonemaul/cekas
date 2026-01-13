<script setup>
import { ref, onMounted } from 'vue'

const bestScore = ref(0)
const accuracy = ref(0)

onMounted(() => {
  // Ambil data dari history yang tersimpan di localStorage
  const history = JSON.parse(localStorage.getItem('cekas_history') || '[]')
  if (history.length > 0) {
    bestScore.value = Math.max(...history.map((h) => h.score))
    const totalAcc = history.reduce((acc, curr) => acc + curr.accuracy, 0)
    accuracy.value = Math.round(totalAcc / history.length)
  }
})
</script>
<template>
  <div
    class="relative overflow-hidden bg-slate-950 p-6 rounded-[2.5rem] text-white shadow-2xl group transition-all duration-500 hover:shadow-blue-500/10"
  >
    <div class="absolute -right-4 -top-10 w-40 h-40 bg-blue-500/20 blur-[50px] rounded-full"></div>
    <div
      class="absolute -left-10 -bottom-10 w-32 h-32 bg-emerald-500/10 blur-[40px] rounded-full"
    ></div>

    <p class="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-1">
      Capaian Terbaik
    </p>

    <div class="flex items-baseline gap-2 relative z-10">
      <h2
        class="text-5xl px-2 font-black italic tracking-tighter bg-gradient-to-br from-blue-400 to-emerald-400 bg-clip-text text-transparent"
      >
        {{ bestScore }}
      </h2>
      <span class="text-xs font-bold text-slate-500 uppercase">Poin</span>
    </div>

    <div class="mt-6 flex gap-6 relative z-10">
      <div>
        <p class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Rerata Akurasi</p>
        <p class="text-lg font-black text-white">{{ accuracy }}%</p>
      </div>
      <div class="w-px h-8 bg-slate-800"></div>
      <div>
        <p class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Status</p>
        <p
          class="text-lg font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent italic"
        >
          Tangkas
        </p>
      </div>
    </div>
  </div>
</template>
