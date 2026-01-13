<script setup>
import { useRouter } from 'vue-router'
import { APP_IDENTITY } from '@/constants/appConfig'
import { ArrowLeftIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  showBack: { type: Boolean, default: false },
  backRoute: { type: String, default: '/' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' }
})

const router = useRouter()
const emit = defineEmits(['open-info'])

const handleNavigate = () => {
  router.push(props.backRoute)
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-6 py-5 flex items-center justify-between border-b border-slate-100">
    <div class="flex items-center gap-3">
      <button v-if="showBack" @click="handleNavigate" class="p-2 -ml-2 text-slate-400 hover:text-blue-600 transition-all">
        <ArrowLeftIcon class="w-5 h-5 stroke-[3]" />
      </button>
      
      <img v-else src="/icons/logo.webp" class="w-10 h-10 rounded-xl shadow-md rotate-2 object-cover" />

      <div>
        <h1 class="text-xl font-black tracking-tighter text-slate-900 leading-none uppercase">
          {{ title || APP_IDENTITY.name }}
        </h1>
        <p class="text-[9px] font-bold text-blue-600 tracking-[0.2em] uppercase italic">
          {{ subtitle || APP_IDENTITY.slogan }}
        </p>
      </div>
    </div>

    <button v-if="!showBack" @click="emit('open-info')" class="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
      <InformationCircleIcon class="w-5 h-5" />
    </button>
  </header>
</template>