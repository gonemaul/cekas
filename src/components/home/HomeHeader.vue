<template>
  <header
    class="p-6 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-40"
  >
    <div class="flex items-center gap-3">
      <!-- <img 
        src="/icons/logo.webp" 
        :alt="APP_IDENTITY.name"
        class="w-12 h-12 rounded-2xl shadow-lg  object-cover"
      /> -->
      <div
        class="relative p-1 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-[1rem] shadow-xl shadow-blue-500/20"
      >
        <img
          src="/icons/logo.webp"
          class="w-10 h-10 rounded-[1.8rem] object-cover"
          alt="Cekas Logo"
        />
      </div>
      <div>
        <h1 class="font-black text-xl tracking-tighter text-slate-800 leading-none">
          {{ APP_IDENTITY.name.toUpperCase() }}
        </h1>
        <p class="text-[9px] font-bold text-slate-400 tracking-tighter uppercase italic">
          {{ APP_IDENTITY.slogan }}
        </p>
      </div>
    </div>

    <button
      @click="$emit('open-info')"
      class="p-2.5 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors"
    >
      <InformationCircleIcon class="w-5 h-5" />
    </button>
  </header>
</template>

<script setup>
import { APP_IDENTITY } from '@/constants/appConfig'
import { InformationCircleIcon } from '@heroicons/vue/24/solid'
defineEmits(['open-info'])
</script>
