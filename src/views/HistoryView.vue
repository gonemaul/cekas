<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// Import Heroicons
import { 
  ChevronLeftIcon, 
  TrashIcon, 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon, 
  MinusIcon 
} from '@heroicons/vue/24/solid'

const router = useRouter()
const historyData = ref([])

// Fungsi pemetaan bahasa
const translateMode = (mode) => {
  const map = {
    addition: 'Penjumlahan',
    subtraction: 'Pengurangan',
    multiplication: 'Perkalian',
    division: 'Pembagian'
  }
  return map[mode] || mode
}

onMounted(() => {
  const data = localStorage.getItem('fastmath_history')
  historyData.value = data ? JSON.parse(data) : []
})

const clearHistory = () => {
  if (confirm('Hapus semua riwayat?')) {
    localStorage.removeItem('fastmath_history')
    historyData.value = []
  }
}
</script>

<template>
  <div class="bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
    <div class="flex items-center justify-between mb-8">
      <button 
        @click="router.push('/')" 
        class="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition text-slate-600"
      >
        <ChevronLeftIcon class="w-6 h-6" />
      </button>
      <h2 class="text-xl font-extrabold text-slate-800 tracking-tight">RIWAYAT SKOR</h2>
      <button @click="clearHistory" class="p-2 text-red-400 hover:bg-red-50 rounded-lg transition">
        <TrashIcon class="w-5 h-5" />
      </button>
    </div>

    <div v-if="historyData.length === 0" class="text-center py-20">
      <div class="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <MinusIcon class="w-8 h-8 text-slate-300" />
      </div>
      <p class="text-slate-400 italic font-medium">Belum ada catatan bermain.</p>
    </div>

    <div class="space-y-4">
      <div v-for="item in historyData" :key="item.id" class="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
        <div class="flex items-center gap-4">
          <div :class="{
            'text-green-600 bg-green-100': item.status === 'UP',
            'text-red-600 bg-red-100': item.status === 'DOWN',
            'text-blue-600 bg-blue-100': item.status === 'STABLE' || item.status === 'NEW'
          }" class="p-2.5 rounded-xl">
            <ArrowTrendingUpIcon v-if="item.status === 'UP'" class="w-5 h-5" />
            <ArrowTrendingDownIcon v-else-if="item.status === 'DOWN'" class="w-5 h-5" />
            <MinusIcon v-else class="w-5 h-5" />
          </div>
          
          <div>
            <p class="font-bold text-slate-700 text-sm">
              {{ translateMode(item.mode) }} 
              <span class="text-slate-400 font-normal">({{ item.level }})</span>
            </p>
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
              {{ item.date }}
            </p>
          </div>
        </div>
        
        <div class="text-right">
          <p class="text-2xl font-black text-slate-800">
            {{ item.score }}<span class="text-sm text-slate-300">/10</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>