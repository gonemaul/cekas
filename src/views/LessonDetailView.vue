<script setup>
import { useRoute, useRouter } from 'vue-router'
import { dbService } from '@/services/dbService'
import { APP_IDENTITY } from '@/constants/appConfig'
import { 
  ArrowLeftIcon, 
  PlayIcon, 
  LightBulbIcon, 
  AcademicCapIcon,
  BeakerIcon 
} from '@heroicons/vue/24/solid'
import AppHeader from '@/components/layout/AppHeader.vue'

const route = useRoute()
const router = useRouter()
const lesson = dbService.getLessonById(route.params.id)

const startGuidedPractice = () => {
  router.push({
    name: 'game',
    params: {
      mode: lesson.config.mode,
      level: lesson.config.range,
    },
    query: { timer: 10, method: lesson.id },
  })
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <AppHeader :showBack="true" backRoute="/learn" title="DETAIL MATERI" subtitle="TEKNIK ARITMATIKA"/>

    <main v-if="lesson" class="flex-1 p-6 space-y-8 animate-in fade-in zoom-in-95 duration-300">
      
      <div class="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
        <div class="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
          <AcademicCapIcon class="w-40 h-40 text-blue-400" />
        </div>

        <div class="relative z-10">
          <span class="inline-block text-[9px] font-black bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full uppercase tracking-[0.2em] border border-blue-500/30 mb-4">
            Metode {{ lesson.category }}
          </span>
          <h2 class="text-3xl font-black leading-tight italic tracking-tighter">
            {{ lesson.title }}
          </h2>
        </div>
      </div>

      <div class="space-y-6">
        
        <div class="bg-white p-6 rounded-[2rem] border-2 border-slate-100 shadow-sm relative overflow-hidden">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <BeakerIcon class="w-5 h-5 text-blue-600" />
            </div>
            <h4 class="text-xs font-black text-slate-800 uppercase tracking-widest">Strategi Kilat</h4>
          </div>
          <p class="text-slate-600 leading-relaxed font-medium text-sm">
            {{ lesson.theory }}
          </p>
        </div>

        <div class="bg-emerald-500/5 border border-emerald-500/20 p-5 rounded-3xl flex gap-4 items-start">
          <div class="bg-emerald-500 rounded-full p-1.5 shrink-0 mt-1">
            <LightBulbIcon class="w-3 h-3 text-white" />
          </div>
          <div>
            <h4 class="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-1">Cekas Pro Tip</h4>
            <p class="text-xs text-emerald-900/70 italic font-medium leading-relaxed">
              {{ lesson.tips }}
            </p>
          </div>
        </div>

        <div class="bg-slate-950 p-6 rounded-[2rem] border-b-4 border-slate-800 relative">
          <h4 class="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Visual Simulation</h4>
          <div class="font-mono text-2xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent tracking-tighter">
            {{ lesson.example }}
          </div>
          <div class="absolute top-6 right-8 opacity-10">
            <span class="text-4xl font-black text-white italic">EX</span>
          </div>
        </div>

      </div>

      <div class="pt-6 pb-10">
        <button
          @click="startGuidedPractice"
          class="w-full py-5 bg-slate-900 text-white font-black rounded-[2rem] shadow-xl hover:shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-3 border-b-4 border-black"
        >
          <div class="bg-blue-500 p-1 rounded-full">
            <PlayIcon class="w-5 h-5 text-white" />
          </div>
          <span>MULAI LATIHAN MANDIRI</span>
        </button>
        <p class="text-center text-[9px] text-slate-400 mt-5 font-bold uppercase tracking-[0.2em] leading-relaxed">
          Selesaikan 10 soal untuk <br/> menguasai teknik ini
        </p>
      </div>

    </main>

    <main v-else class="flex-1 flex flex-col items-center justify-center p-12 text-center">
      <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <span class="text-4xl">🧐</span>
      </div>
      <p class="text-slate-400 font-black uppercase text-xs tracking-widest">Materi Hilang dari Radar</p>
      <button @click="router.push('/learn')" class="mt-4 text-blue-600 font-black text-sm underline decoration-2 underline-offset-4">
        Kembali ke Kurikulum
      </button>
    </main>
    
  </div>
</template>