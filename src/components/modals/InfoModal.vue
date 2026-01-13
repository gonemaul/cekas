<script setup>
import { ref } from 'vue'
import { APP_IDENTITY } from '@/constants/appConfig'
import { HELP_GUIDE, PATCH_NOTES } from '@/constants/appContent'
import {
  XMarkIcon,
  SparklesIcon,
  InformationCircleIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps(['initialTab'])
const emit = defineEmits(['close'])

const currentTab = ref(props.initialTab || 'about')

const tabs = [
  { id: 'about', name: 'Tentang', icon: InformationCircleIcon },
  { id: 'guide', name: 'Bantuan', icon: QuestionMarkCircleIcon },
  { id: 'patch', name: 'Update', icon: DocumentTextIcon },
]
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
    <div
      class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
      @click="$emit('close')"
    ></div>

    <Transition name="modal">
      <div
        class="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-300"
      >
        <div class="flex border-b border-slate-100 px-6 pt-6">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="currentTab = tab.id"
            :class="[
              'flex-1 flex flex-col items-center gap-2 pb-4 border-b-2 transition-all',
              currentTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-400',
            ]"
          >
            <component :is="tab.icon" class="w-6 h-6" />
            <span class="text-[10px] font-bold uppercase tracking-widest">{{ tab.name }}</span>
          </button>
        </div>
  
        <div class="p-8 max-h-[60vh] overflow-y-auto">
          <div v-if="currentTab === 'about'" class="space-y-6">
            <div class="flex justify-center">
              <div
                class="relative p-1 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-[1rem] shadow-xl shadow-blue-500/20"
              >
                <img
                  src="/icons/logo.webp"
                  class="w-20 h-20 rounded-[1.8rem] object-cover"
                  alt="Cekas Logo"
                />
              </div>
            </div>
  
            <div class="text-center">
              <h3 class="font-black text-2xl text-slate-900 tracking-tighter">
                {{ APP_IDENTITY.name }}
              </h3>
              <p class="text-[10px] font-bold text-blue-600 uppercase tracking-[0.3em] mb-4">
                {{ APP_IDENTITY.version }}
              </p>
              <p class="text-slate-500 text-sm leading-relaxed px-4">
                {{ APP_IDENTITY.description }}
              </p>
            </div>
  
            <div class="grid grid-cols-2 gap-3 mt-4">
              <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p class="text-[8px] font-black text-slate-400 uppercase mb-1">Release</p>
                <p class="text-xs font-bold text-slate-700">{{ APP_IDENTITY.release_name }}</p>
              </div>
              <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p class="text-[8px] font-black text-slate-400 uppercase mb-1">Build</p>
                <p class="text-xs font-bold text-slate-700">Production Ready</p>
              </div>
            </div>
          </div>
  
          <div v-if="currentTab === 'guide'" class="space-y-6">
            <div
              v-for="(item, index) in HELP_GUIDE"
              :key="index"
              class="relative pl-4 border-l-2 border-slate-100"
            >
              <h4 class="font-black text-slate-800 uppercase text-xs mb-1">{{ item.title }}</h4>
              <p class="text-slate-500 text-sm leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
  
          <div v-if="currentTab === 'patch'" class="space-y-6">
            <div v-for="note in PATCH_NOTES" :key="note.version" class="relative">
              <div class="flex items-center gap-2 mb-2">
                <span
                  class="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100"
                >
                  {{ note.version }}
                </span>
                <span class="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{{
                  note.date
                }}</span>
              </div>
              <h4
                class="font-bold text-slate-800 text-sm mb-2 italic underline decoration-emerald-400 underline-offset-4"
              >
                {{ note.title }}
              </h4>
              <ul class="space-y-1.5">
                <li
                  v-for="(change, i) in note.changes"
                  :key="i"
                  class="text-xs text-slate-500 flex gap-2"
                >
                  <span class="text-emerald-500">•</span> {{ change }}
                </li>
              </ul>
            </div>
          </div>
        </div>
  
        <div class="p-6 bg-slate-50">
          <button
            @click="$emit('close')"
            class="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] active:scale-95 transition-transform"
          >
            Tutup
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
<style scoped>
  /* Animasi khusus untuk modal agar terasa membal (bouncy) */
.modal-enter-active {
  animation: modal-in 0.3s ease-out;
}
.modal-leave-active {
  animation: modal-in 0.2s ease-in reverse;
}

@keyframes modal-in {
  0% {
    transform: scale(0.9) translateY(20px);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
</style>