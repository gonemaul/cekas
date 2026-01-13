<script setup>
import { useRouter } from 'vue-router'
import { dbService } from '@/services/dbService'
import { APP_IDENTITY } from '@/constants/appConfig' // Mengambil config global
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import {
  AcademicCapIcon,
  ChevronRightIcon,
  BookOpenIcon,
  ArrowLeftIcon,
  SparklesIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const lessons = dbService.getAllLessons()

// Utility untuk warna kesulitan (Optional)
const getDiffClass = (diff) => {
  if (diff.toLowerCase() === 'mudah') return 'text-emerald-500 bg-emerald-500/10'
  if (diff.toLowerCase() === 'menengah') return 'text-blue-500 bg-blue-500/10'
  return 'text-amber-500 bg-amber-500/10'
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto relative overflow-x-hidden">
    <AppHeader 
      :showBack="true"
      backRoute="/"
      title="KURSUS" 
      subtitle="METODE KILAT" 
    />

    <main class="flex-1 p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div class="bg-slate-900 p-6 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
        <div class="absolute -right-4 -top-6 opacity-20 rotate-12 group-hover:scale-110 transition-transform duration-700">
          <BookOpenIcon class="w-24 h-24 text-emerald-400" />
        </div>
        
        <div class="relative z-10">
          <div class="flex items-center gap-2 mb-2 text-blue-400">
            <SparklesIcon class="w-4 h-4" />
            <span class="text-[10px] font-black uppercase tracking-[0.3em]">Kurikulum Cekas</span>
          </div>
          <h2 class="text-2xl font-black italic tracking-tight leading-tight mb-2">
            Metode Berhitung <br/>
            <span class="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent underline decoration-blue-500/30">Tanpa Kertas</span>
          </h2>
          <p class="text-xs text-slate-400 font-medium leading-relaxed max-w-[80%]">
            Kuasai trik mental aritmatika untuk menjawab soal dalam hitungan detik.
          </p>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 px-2">
          <span class="w-4 h-px bg-slate-200"></span>
          Daftar Materi
        </h3>

        <div class="grid gap-4">
          <button
            v-for="lesson in lessons"
            :key="lesson.id"
            @click="router.push(`/learn/${lesson.id}`)"
            class="group flex items-center justify-between p-5 bg-white border-2 border-slate-100 rounded-[2rem] hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/5 transition-all active:scale-[0.97] text-left relative overflow-hidden"
          >
            <div class="flex items-center gap-4 relative z-10">
              <div class="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm">
                <AcademicCapIcon class="w-7 h-7 stroke-[2]" />
              </div>
              
              <div>
                <span :class="[getDiffClass(lesson.difficulty), 'inline-block text-[8px] font-black uppercase px-2 py-0.5 rounded-full mb-1 tracking-widest']">
                  {{ lesson.difficulty }}
                </span>
                <h3 class="font-black text-slate-800 leading-tight text-base tracking-tight group-hover:text-blue-600 transition-colors">
                  {{ lesson.title }}
                </h3>
              </div>
            </div>
            
            <ChevronRightIcon class="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all shrink-0" />
          </button>
        </div>

        <div v-if="lessons.length === 0" class="text-center py-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem]">
          <p class="text-slate-400 italic text-sm font-bold uppercase tracking-widest">
            Materi akan segera hadir...
          </p>
        </div>
      </div>
    </main>

    <AppFooter/>
  </div>
</template>