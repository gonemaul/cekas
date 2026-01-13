<script setup>
import { ref, onMounted } from 'vue'
import { historyService } from '@/services/historyService'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { TrashIcon, ClockIcon, TrophyIcon,ArrowTrendingUpIcon,ArrowTrendingDownIcon,MinusIcon } from '@heroicons/vue/24/outline'

const historyData = ref([])
const stats = ref({ bestScore: 0, avgAccuracy: 0 })

const translateMode = (mode) => {
  const map = { addition: 'Penjumlahan', subtraction: 'Pengurangan', multiplication: 'Perkalian', division: 'Pembagian', random: 'Campuran' }
  return map[mode] || mode
}

onMounted(() => {
  refreshData()
})

const refreshData = () => {
  historyData.value = historyService.getAll()
  stats.value = historyService.getStats()
}

const handleClear = () => {
  if (confirm('Hapus semua riwayat skor?')) {
    historyService.clear()
    refreshData()
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto">
    <AppHeader :showBack="true" backRoute="/" title="RIWAYAT" subtitle="PENCAPAIAN KAMU" />

    <main class="flex-1 p-6 space-y-6">
      <div class="grid grid-cols-2 gap-4" v-if="historyData.length > 0">
        <div class="bg-white p-4 rounded-3xl border-2 border-slate-100 flex items-center gap-3">
          <div class="p-2 bg-amber-50 rounded-xl text-amber-500"><TrophyIcon class="w-5 h-5" /></div>
          <div>
            <p class="text-[8px] font-black text-slate-400 uppercase">Best Score</p>
            <p class="text-sm font-black text-slate-800">{{ stats.bestScore }}</p>
          </div>
        </div>
        <div class="bg-white p-4 rounded-3xl border-2 border-slate-100 flex items-center gap-3">
          <div class="p-2 bg-emerald-50 rounded-xl text-emerald-500"><ClockIcon class="w-5 h-5" /></div>
          <div>
            <p class="text-[8px] font-black text-slate-400 uppercase">Avg. Acc</p>
            <p class="text-sm font-black text-slate-800">{{ stats.avgAccuracy }}%</p>
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <div v-if="historyData.length === 0" class="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
           <p class="text-slate-400 font-bold text-xs uppercase tracking-widest">Belum ada data</p>
        </div>

        <div 
          v-for="item in historyData" :key="item.id"
          class="bg-white p-5 rounded-[2rem] border-2 border-slate-100 flex justify-between items-center group active:scale-95 transition-all"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
              <span class="font-black text-lg italic text-slate-400 group-hover:text-blue-600">
                {{ translateMode(item.mode).charAt(0) }}
              </span>
            </div>
            <div>
              <p class="font-black text-slate-800 leading-none text-sm uppercase tracking-tight">{{ translateMode(item.mode) }}</p>
              <p class="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-tighter italic">
                {{ item.date }} • {{ item.level }}
              </p>
            </div>
          </div>
          <!-- <div class="text-right">
            <p class="text-lg font-black bg-gradient-to-br from-blue-600 to-emerald-500 bg-clip-text text-transparent italic leading-none">
              {{ item.score }}
            </p>
            <p class="text-[8px] font-black text-emerald-500 uppercase mt-1">{{ item.accuracy }}% Acc</p>
          </div> -->
          <div class="text-right flex flex-col items-end">
  <div class="flex items-center gap-1">
    <ArrowTrendingUpIcon v-if="item.status === 'UP'" class="w-3 h-3 text-emerald-500" />
    <ArrowTrendingDownIcon v-if="item.status === 'DOWN'" class="w-3 h-3 text-red-400" />
    <MinusIcon v-if="item.status === 'STABLE'" class="w-3 h-3 text-slate-300" />
    
    <p class="text-lg font-black bg-gradient-to-br from-blue-600 to-emerald-500 bg-clip-text text-transparent italic leading-none">
      {{ item.score }}
    </p>
  </div>
  <p class="text-[8px] font-black text-slate-400 uppercase mt-1 italic">
    {{ item.timeUsed }}s • {{ item.accuracy }}% Acc
  </p>
</div>
        </div>
      </div>

      <button v-if="historyData.length > 0" @click="handleClear" class="w-full py-4 text-red-400 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-50 rounded-2xl transition-colors">
        Reset History
      </button>
    </main>

    <AppFooter />
  </div>
</template>