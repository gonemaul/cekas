<script setup>
import { APP_IDENTITY } from '@/constants/appConfig'
defineEmits(['open-patch'])
</script>

<template>
  <footer class="p-8 flex flex-col items-center gap-3">
    <button
      @click="$emit('open-patch')"
      class="text-[10px] font-black tracking-widest text-slate-400 hover:text-blue-600 transition-colors uppercase italic"
    >
      Apa yang baru di v{{ APP_IDENTITY.version }}?
    </button>

    <p class="text-[9px] text-slate-300 font-bold uppercase tracking-widest leading-none">
      &copy; {{ new Date().getFullYear() }} {{ APP_IDENTITY.name }} • {{ APP_IDENTITY.slogan }}
    </p>
  </footer>
</template>
