<script setup>
import { useRoute, useRouter } from 'vue-router'
import { dbService } from '@/services/dbService'
import { ArrowLeftIcon, PlayIcon, LightBulbIcon } from '@heroicons/vue/24/solid'

const route = useRoute()
const router = useRouter()
const lesson = dbService.getLessonById(route.params.id)

const startGuidedPractice = () => {
  // Mengirim info mode, level, DAN id materi ke GameView
  router.push({
    name: 'game',
    params: {
      mode: lesson.config.mode,
      level: lesson.config.range,
    },
    query: { timer: 10, method: lesson.id }, // ID ini dibaca GameView untuk logika khusus
  })
}
</script>

<template>
  <div v-if="lesson" class="space-y-6 animate-in fade-in zoom-in-95 duration-300">
    <button
      @click="router.push('/learn')"
      class="flex items-center gap-2 text-slate-400 font-bold text-sm hover:text-primary transition-colors"
    >
      <ArrowLeftIcon class="w-4 h-4" /> KEMBALI KE KURIKULUM
    </button>

    <div
      class="bg-primary p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-100 relative overflow-hidden"
    >
      <div class="relative z-10">
        <span
          class="text-[10px] font-black bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest"
        >
          Metode {{ lesson.category }}
        </span>
        <h2 class="text-3xl font-black mt-3 leading-tight">{{ lesson.title }}</h2>
      </div>
      <LightBulbIcon class="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 rotate-12" />
    </div>

    <div class="space-y-4">
      <div class="bg-white p-6 rounded-3xl border-2 border-slate-100">
        <h4
          class="text-xs font-black text-primary uppercase tracking-widest mb-3 flex items-center gap-2"
        >
          <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>
          Penjelasan Strategi
        </h4>
        <p class="text-slate-600 leading-relaxed font-medium">
          {{ lesson.theory }}
        </p>
      </div>
      <div class="bg-blue-50 p-4 rounded-2xl border-2 border-dashed border-blue-200">
        <div class="flex items-center gap-2 mb-1">
          <LightBulbIcon class="w-4 h-4 text-primary" />
          <h4 class="text-[10px] font-black text-primary uppercase tracking-widest">Pro Tip</h4>
        </div>
        <p class="text-xs text-slate-500 italic leading-relaxed">
          {{ lesson.tips }}
        </p>
      </div>

      <div class="bg-emerald-50 p-6 rounded-3xl border-2 border-emerald-100 relative">
        <h4 class="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">
          Simulasi Cepat
        </h4>
        <div class="font-mono text-lg font-black text-emerald-800 tracking-tight">
          {{ lesson.example }}
        </div>
        <div class="absolute top-4 right-6 text-emerald-200 uppercase font-black text-xs italic">
          Example
        </div>
      </div>
    </div>

    <div class="pt-4">
      <button
        @click="startGuidedPractice"
        class="w-full py-5 bg-slate-800 text-white font-black rounded-[2rem] shadow-2xl hover:bg-slate-700 transition-all active:scale-95 flex items-center justify-center gap-3 border-b-4 border-slate-950"
      >
        <PlayIcon class="w-6 h-6 text-secondary" />
        MULAI LATIHAN KHUSUS
      </button>
      <p class="text-center text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-tighter">
        Latihan ini akan berfokus pada teknik {{ lesson.title }} saja.
      </p>
    </div>
  </div>

  <div v-else class="text-center py-20">
    <p class="text-slate-400 font-bold">Materi tidak ditemukan.</p>
    <button @click="router.push('/learn')" class="text-primary font-black mt-4 underline">
      Kembali
    </button>
  </div>
</template>
