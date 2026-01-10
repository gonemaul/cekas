<script setup>
import { useRouter } from 'vue-router'
import { dbService } from '@/services/dbService'
import {
  AcademicCapIcon,
  ChevronRightIcon,
  BookOpenIcon,
  ArrowLeftIcon,
} from '@heroicons/vue/24/outline'

const router = useRouter()
const lessons = dbService.getAllLessons()
</script>

<template>
  <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <button
      @click="router.push('/')"
      class="flex items-center gap-2 text-slate-400 font-bold text-sm mb-6 hover:text-blue-600"
    >
      <ArrowLeftIcon class="w-4 h-4" /> KEMBALI
    </button>
    <div class="flex items-center gap-3 mb-4">
      <div class="p-2 bg-primary rounded-xl text-white">
        <BookOpenIcon class="w-5 h-5" />
      </div>
      <div>
        <h2 class="text-xl font-black text-slate-800 uppercase tracking-tight">Kurikulum</h2>
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Metode Berhitung Cepat
        </p>
      </div>
    </div>

    <div class="grid gap-4">
      <button
        v-for="lesson in lessons"
        :key="lesson.id"
        @click="router.push(`/learn/${lesson.id}`)"
        class="group flex items-center justify-between p-5 bg-white border-2 border-slate-100 rounded-3xl hover:border-primary transition-all active:scale-95 shadow-sm text-left"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors"
          >
            <AcademicCapIcon class="w-6 h-6" />
          </div>
          <div>
            <span class="block text-[10px] font-black text-secondary uppercase mb-0.5">
              {{ lesson.difficulty }}
            </span>
            <h3 class="font-extrabold text-slate-700 leading-tight">
              {{ lesson.title }}
            </h3>
          </div>
        </div>
        <ChevronRightIcon
          class="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors"
        />
      </button>
    </div>

    <div v-if="lessons.length === 0" class="text-center py-10">
      <p class="text-slate-400 italic font-medium">Materi akan segera hadir...</p>
    </div>
  </div>
</template>
