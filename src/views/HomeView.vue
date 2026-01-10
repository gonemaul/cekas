<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { APP_IDENTITY } from '@/constants/appConfig'
// Import Icons
import { 
  PlusIcon, MinusIcon, XMarkIcon, VariableIcon, 
  ChevronRightIcon, ArrowLeftIcon, SparklesIcon 
} from '@heroicons/vue/24/outline'

const router = useRouter()
const step = ref(1) // 1: Pilih Mode, 2: Pilih Level
const selectedMode = ref('')

const modes = [
  { 
    id: 'addition', 
    name: 'Penjumlahan', 
    desc: 'Asah kecepatan totalitas angka.', 
    icon: PlusIcon, 
    color: 'bg-blue-500' 
  },
  { 
    id: 'subtraction', 
    name: 'Pengurangan', 
    desc: 'Latih ketelitian selisih nilai.', 
    icon: MinusIcon, 
    color: 'bg-emerald-500' 
  },
  { 
    id: 'multiplication', 
    name: 'Perkalian', 
    desc: 'Tingkatkan daya ingat kelipatan.', 
    icon: XMarkIcon, 
    color: 'bg-amber-500' 
  },
  { 
    id: 'division', 
    name: 'Pembagian', 
    desc: 'Uji logika distribusi angka.', 
    icon: VariableIcon, 
    color: 'bg-indigo-500' 
  },
  { 
    id: 'random', 
    name: 'Campuran', 
    desc: 'Tantangan otak multifungsi.', 
    icon: SparklesIcon, 
    color: 'bg-rose-500' 
  }
]

const levels = [
  { id: 'satuan', name: 'Satuan', desc: 'Angka 1-9' },
  { id: 'puluhan', name: 'Puluhan', desc: 'Angka 10-99' },
  { id: 'ratusan', name: 'Ratusan', desc: 'Angka 100-999' },
  { id: 'berantai', name: 'Berantai', desc: '3-5 Angka Acak' }
]

const selectMode = (modeId) => {
  selectedMode.value = modeId
  step.value = 2
}

const startGame = (levelId) => {
  router.push({ name: 'game', params: { mode: selectedMode.value, level: levelId } })
}
</script>

<template>
  <div class="space-y-6">
    <div v-if="step === 1" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 class="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
        <span class="w-2 h-8 bg-blue-600 rounded-full"></span>
        PILIH OPERASI
      </h2>
      
      <div class="grid gap-4">
  <button 
    v-for="mode in modes" 
    :key="mode.id"
    @click="selectMode(mode.id)"
    class="group flex items-center justify-between p-5 bg-white border-2 border-slate-100 rounded-3xl hover:border-blue-500 transition-all active:scale-95 shadow-sm"
  >
    <div class="flex items-center gap-4 text-left">
      <div :class="[mode.color, 'p-3 rounded-2xl text-white shadow-lg shadow-blue-50/50 shrink-0']">
        <component :is="mode.icon" class="w-6 h-6 stroke-[3]" />
      </div>
      <div>
        <span class="block font-extrabold text-slate-700 text-lg leading-tight">
          {{ mode.name }}
        </span>
        <span class="block text-xs text-slate-400 font-medium mt-0.5">
          {{ mode.desc }}
        </span>
      </div>
    </div>
    
    <ChevronRightIcon class="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors shrink-0" />
  </button>
</div>
    </div>

    <div v-if="step === 2" class="animate-in fade-in zoom-in duration-300">
      <button @click="step = 1" class="flex items-center gap-2 text-slate-400 font-bold text-sm mb-6 hover:text-blue-600">
        <ArrowLeftIcon class="w-4 h-4" /> KEMBALI
      </button>

      <h2 class="text-xl font-black text-slate-800 mb-6">TINGKAT KESULITAN</h2>
      
      <div class="grid gap-4">
        <button 
          v-for="lvl in levels" 
          :key="lvl.id"
          @click="startGame(lvl.id)"
          class="p-6 bg-white border-2 border-slate-100 rounded-3xl text-left hover:border-emerald-500 hover:bg-emerald-50 transition-all active:scale-95 shadow-sm group"
        >
          <p class="font-black text-slate-700 text-xl group-hover:text-emerald-700">{{ lvl.name }}</p>
          <p class="text-sm text-slate-400 font-medium">{{ lvl.desc }}</p>
        </button>
      </div>
    </div>

    <div v-if="step === 1" class="pt-4">
      <button 
        @click="router.push('/learn')"
        class="w-full p-5 bg-slate-800 rounded-3xl text-white flex items-center justify-center gap-3 hover:bg-slate-700 transition-colors shadow-xl"
      >
        <SparklesIcon class="w-5 h-5 text-amber-400" />
        <span class="font-bold">Masuk ke Kursus Metode</span>
      </button>
    </div>
  </div>
</template>